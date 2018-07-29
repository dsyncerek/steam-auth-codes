import io from 'socket.io-client';

const socket = io('localhost:3005/');

function socketStateChanged(callback) {
    socket.on('connect', () => callback('connected'))
          .on('connect_error', () => callback('errored'))
          .on('disconnect', () => callback('disconnected'));
}

function userStateChanged(callback) {
    socket.on('userState', state => callback(state));
}

function authCodesChanged(callback) {
    socket.on('auth codes', data => callback(data));
}

export default {socketStateChanged, userStateChanged, authCodesChanged};