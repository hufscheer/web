import { Client } from '@stomp/stompjs';
import { useRef } from 'react';

type useSocketParams<T> = {
  url: string;
  destination: string;
  callback: (message: T) => void;
};

export default function useSocket<T>({
  url,
  destination,
  callback,
}: useSocketParams<T>) {
  const stompRef = useRef<Client | null>(null);
  const client = new Client({
    brokerURL: url,
  });

  const connect = () => {
    if (stompRef.current) return;

    stompRef.current = client;

    client.activate();
    client.onConnect = () => {
      client.subscribe(destination, message => {
        try {
          callback(JSON.parse(message.body));
        } catch (error) {
          throw new Error('소켓이 제대로 연결되지 않은 것 같아요!');
        }
      });
    };
  };

  const disconnect = () => {
    if (!stompRef.current) return;

    client.deactivate();
  };

  return { connect, disconnect, stompRef };
}
