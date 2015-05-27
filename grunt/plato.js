module.exports = {
	analysis: {
		options: {
			jshint: false
		},
		files: {
			'reports/plato': '<%= lint.dirs %>'
		}
	}
};
