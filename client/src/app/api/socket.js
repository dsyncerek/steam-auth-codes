import io from 'socket.io-client';
import { EventEmitter } from 'fbemitter';
import { SOCKET_URL } from '../config';
import { socketStatus } from './enums';

const emitter = new EventEmitter();

io(SOCKET_URL)
  .on('init', ({ statusCode, username, accounts }) => {
    emitter.emit('status', { statusCode, username });
    emitter.emit('accounts', { accounts });
  })
  .on('accounts', ({ accounts }) => {
    emitter.emit('accounts', { accounts });
  })
  .on('connect', () => {
    emitter.emit('status', { socketState: socketStatus.connected });
  })
  .on('connect_error', () => {
    emitter.emit('status', { socketState: socketStatus.error });
  })
  .on('disconnect', () => {
    emitter.emit('status', { socketState: socketStatus.loading });
  });

export default emitter;

