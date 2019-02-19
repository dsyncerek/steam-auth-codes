import { EventEmitter } from 'fbemitter';
import io from 'socket.io-client';
import { socketStatus } from './enums';

const emitter = new EventEmitter();

io(process.env.REACT_APP_SOCKET_URL)
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
