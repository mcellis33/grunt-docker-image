module.exports = function(grunt) {

	// This will hold all files and directories to clean with the 'clean' task
	var cleanFiles = ['static/hq/static/compiled/'];

	var lessFiles = [{
		'expand': true,
		'cwd': 'static/hq/static',
		'src': ['**/*.less', '!**/_*.less', '!**/bootstrap-3.1/**'],
		'dest': 'static/hq/static/compiled/',
		'ext': '.css'
	}];

	// Igneous javascript code, excludes external script packages
	var jsFiles = ["Gruntfile.js", "static/hq/static/*.js", "static/hq/static/public/**/*.js", "static/hq/static/staff/**/*.js", "static/hq/static/tests/**/*.js"];

	grunt.initConfig({
		'pkg': grunt.file.readJSON('package.json'),
		'clean': {
			'src': cleanFiles
		},
		'less': {
			'development': {
				'options': {
					'compress': true,
					'yuicompress': true,
					'optimization': 2
				},
				'files': lessFiles
			}
		},
		'watch': {
			'scripts': {
				'options': {
					'spawn': false,
					'interrupt': false,
					'atBegin': true
				},
				'files': ['**/*.less'],
				'tasks': ['less']
			},
			'tests': {
				'files': ['tests/*.js', 'tests/*.html', 'src/*.js'],
				'tasks': ['qunit']
			}
		},
		'qunit': {
			'all': ['static/hq/static/tests/common.html', 'static/hq/static/tests/public.html']
		},
		'jshint': {
			'all': jsFiles,
			'options': {
				'loopfunc': true
			}
		},
		"jsbeautifier": {
			'files': jsFiles,
			'options': {
				'js': {
					indentWithTabs: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-jsbeautifier');

	grunt.registerTask('default', ['less']);
	grunt.registerTask("format", ["jshint", "jsbeautifier"]);
	grunt.registerTask('test', ['format', 'qunit']);

};
