module.exports = {
    js: {
        src: '<%= lint.dirs %>',
        options: {
            globals: {
                // configure JSHint to not complain about the following globals
                console: true,
                module: true,
                require: true,
                __dirname: true,
                process: true
            }
        }
    }
};
