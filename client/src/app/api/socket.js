import io from 'socket.io-client';
import socketStates from './socketStates';
import { SOCKET_URL } from '../../config';

const socket = io(SOCKET_URL);

function onInit(callback) {
  socket.on('init', ({ statusCode, username, accounts }) =>
    callback({ statusCode, username, accounts }));
}

function onAccountsChanged(callback) {
  socket.on('accounts', ({ accounts }) =>
    callback({ accounts }));
}

function onSocketStateChanged(callback) {
  socket.on('connect', () =>
          callback(socketStates.connected))
        .on('connect_error', () =>
          callback(socketStates.error))
        .on('disconnect', () =>
          callback(socketStates.loading));
}

export default {
  onInit,
  onAccountsChanged,
  onSocketStateChanged,
};
