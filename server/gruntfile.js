module.exports = function(grunt) {
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      
    copy: {
      build: {
        cwd: '<%= pkg.src %>',
        src: [ '**' ],
        dest: 'dist',
        expand: true
      },
    }, 
    clean: {
      build: {
        src: [ 'dist' ]
      }
    },
    jshint: {
        files: ['gruntfile.js', 'app/*.js'],
		options: {
			maxlen: 80,
			quotmark: 'single'
		}
    },
    simplemocha: {
		options: {
			timeout: 3000,
			ignoreLeaks: false,
		},
		all: { src: ['test/*.js'] }
	}
  });
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
   
   grunt.registerTask(
      'build', 
      'Checks code standars, tests, and copies' + 
      'the files to the build directory.', 
      ['clean', 'simplemocha', 'jshint', 'copy' ]
    );
};