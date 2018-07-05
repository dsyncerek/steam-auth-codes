module.exports = (io, authCodesEmitter) => {
    authCodesEmitter.on('new auth codes', accounts => {
        io.to('auth codes room').emit('auth codes', accounts);
    });
};