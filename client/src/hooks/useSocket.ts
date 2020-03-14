import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { SocketStateEnum } from '../models/SocketStateEnum';

export const useSocket = (url: string): [SocketIOClient.Socket, string] => {
  const [socket] = useState(io(url, { autoConnect: false }));
  const [socketState, setSocketState] = useState(SocketStateEnum.Loading);

  useEffect(() => {
    socket.connect();
    socket.on('connect', () => setSocketState(SocketStateEnum.Connected));
    socket.on('connect_error', () => setSocketState(SocketStateEnum.Error));
    socket.on('disconnect', () => setSocketState(SocketStateEnum.Loading));

    return () => {
      socket.removeAllListeners();
      socket.close();
    };
  }, [socket]);

  return [socket, socketState];
};
