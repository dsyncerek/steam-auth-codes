module.exports = (io, authCodesEmitter) => {

    authCodesEmitter.on('new auth codes', authCodes => {
        io.to('auth codes room').emit('auth codes', authCodes);
    });

};