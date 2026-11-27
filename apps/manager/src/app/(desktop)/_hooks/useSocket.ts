import { Client, type StompSubscription } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';

// 관객 웹 apps/spectator/src/hooks/useSocket.ts 와 같은 방식이다. 주소마다 STOMP 연결 하나를 나눠 쓴다.
// @stomp/stompjs 기본값: 하트비트 10초/10초, 끊기면 5초 뒤 다시 붙는다(Cloudflare 2분 유휴 끊김 대비).

interface UseSocketParams<T> {
  url: string;
  destination: string;
  callback: (message: T) => void;
  onReconnect?: () => void;
}

interface Listener {
  destination: string;
  onMessage: (body: string) => void;
  onReconnect: () => void;
  subscription: StompSubscription | null;
}

interface SharedClient {
  client: Client;
  listeners: Set<Listener>;
  hasConnected: boolean;
}

const sharedClients = new Map<string, SharedClient>();

const subscribeListener = (client: Client, listener: Listener) => {
  listener.subscription = client.subscribe(listener.destination, (message) =>
    listener.onMessage(message.body),
  );
};

const getSharedClient = (url: string) => {
  const existing = sharedClients.get(url);
  if (existing) return existing;

  const shared: SharedClient = {
    client: new Client({ brokerURL: url }),
    listeners: new Set(),
    hasConnected: false,
  };

  shared.client.onConnect = () => {
    const isReconnect = shared.hasConnected;
    shared.hasConnected = true;

    shared.listeners.forEach((listener) => {
      subscribeListener(shared.client, listener);
      if (isReconnect) listener.onReconnect();
    });
  };

  shared.client.activate();
  sharedClients.set(url, shared);

  return shared;
};

const addListener = (url: string, listener: Listener) => {
  const shared = getSharedClient(url);

  shared.listeners.add(listener);
  if (shared.client.connected) subscribeListener(shared.client, listener);

  return () => {
    if (shared.client.connected) listener.subscription?.unsubscribe();
    shared.listeners.delete(listener);

    if (shared.listeners.size === 0) {
      sharedClients.delete(url);
      void shared.client.deactivate();
    }
  };
};

export const useSocket = <T>({ url, destination, callback, onReconnect }: UseSocketParams<T>) => {
  const callbackRef = useRef(callback);
  const onReconnectRef = useRef(onReconnect);

  callbackRef.current = callback;
  onReconnectRef.current = onReconnect;

  useEffect(() => {
    if (!url) return;

    return addListener(url, {
      destination,
      subscription: null,
      onMessage: (body) => {
        let message: T;
        try {
          message = JSON.parse(body);
        } catch {
          return;
        }
        callbackRef.current(message);
      },
      onReconnect: () => onReconnectRef.current?.(),
    });
  }, [url, destination]);
};
