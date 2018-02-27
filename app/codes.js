module.exports = (io, authCodesEmitter) => {
    authCodesEmitter.on('new auth codes', newAuthCodes => {
        io.to('auth codes room').emit('auth codes', newAuthCodes);
    });
};