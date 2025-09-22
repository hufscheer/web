import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef } from 'react';

type useSocketParams<T> = {
  url: string;
  destination: string;
  callback: (message: T) => void;
};

export default function useSocket<T>({ url, destination, callback }: useSocketParams<T>) {
  const stompRef = useRef<Client | null>(null);
  const clientRef = useRef<Client | null>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  if (!clientRef.current) {
    clientRef.current = new Client({
      brokerURL: url,
    });
  }

  const connect = useCallback(() => {
    if (stompRef.current || !clientRef.current) return;

    stompRef.current = clientRef.current;

    clientRef.current.activate();
    clientRef.current.onConnect = () => {
      clientRef.current?.subscribe(destination, message => {
        try {
          callbackRef.current(JSON.parse(message.body));
        } catch (error) {
          console.error('소켓 메시지 파싱 실패:', error);
          console.error('원본 메시지:', message.body);
        }
      });
    };
  }, [destination]);

  const disconnect = useCallback(() => {
    if (!stompRef.current) return;

    clientRef.current?.deactivate();
    stompRef.current = null;
  }, []);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return { connect, disconnect, stompRef };
}
