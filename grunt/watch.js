module.exports = {
	scripts: {
		files: '<%= lint.dirs %>',
		tasks: ['clear', 'lint', 'browserify:default'],
		options: {
			spawn: false
		}
	}
};
