import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const useSocket = (url: string): [SocketIOClient.Socket, string] => {
  const [socket] = useState(io(url, { autoConnect: false }));
  const [socketState, setSocketState] = useState('loading');

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => setSocketState('connected'));
    socket.on('connect_error', () => setSocketState('error'));
    socket.on('disconnect', () => setSocketState('loading'));

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [socket]);

  return [socket, socketState];
};

export default useSocket;
