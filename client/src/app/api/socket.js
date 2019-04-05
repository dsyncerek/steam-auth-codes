import { EventEmitter } from 'fbemitter';
import io from 'socket.io-client';
import { socketStatusEnum } from './enums';

const emitter = new EventEmitter();

io('/')
  .on('init', ({ statusCode, accounts }) => {
    emitter.emit('status', { responseStatus: statusCode });
    emitter.emit('new accounts', { accounts });
  })
  .on('accounts', ({ accounts }) => {
    emitter.emit('new accounts', { accounts });
  })
  .on('connect', () => {
    emitter.emit('status', { socketStatus: socketStatusEnum.connected });
  })
  .on('connect_error', () => {
    emitter.emit('status', { socketStatus: socketStatusEnum.error });
  })
  .on('disconnect', () => {
    emitter.emit('status', { socketStatus: socketStatusEnum.loading });
  });

export default emitter;
