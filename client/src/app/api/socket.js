import { EventEmitter } from 'fbemitter';
import io from 'socket.io-client';
import socketStatusEnum from '../enums/socketStatus.enum';

const emitter = new EventEmitter();

io('/')
  .on('init', ({ responseStatus, accounts, steamid }) => {
    emitter.emit('response status', { responseStatus, steamid });
    emitter.emit('accounts', { accounts });
  })
  .on('accounts', ({ accounts }) => {
    emitter.emit('accounts', { accounts });
  })
  .on('connect', () => {
    emitter.emit('socket status', { socketStatus: socketStatusEnum.connected });
  })
  .on('connect_error', () => {
    emitter.emit('socket status', { socketStatus: socketStatusEnum.error });
  })
  .on('disconnect', () => {
    emitter.emit('socket status', { socketStatus: socketStatusEnum.loading });
  });

export default emitter;
