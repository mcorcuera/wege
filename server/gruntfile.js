module.exports = function(grunt) {
  grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
    packageModules: {
        dist: {
          src: 'package.json',
          dest: '<%= pkg.buildDir %>'
        },
      },
    copy: {
      build: {
        cwd: '<%= pkg.src %>',
        src: [ '**' ],
        dest: '<%= pkg.buildDir %>',
        expand: true
      },
    },
    clean: {
      build: {
        src: [ '<%= pkg.buildDir %>', '<%= pkg.reports %>' ]
      }
    },
    jshint: {
        files: ['gruntfile.js', '<%= pkg.src %>/**/*.js'],
		options: grunt.file.readJSON('jshint.conf.json')
    },
    simplemocha: {
  		options: {
  			timeout: 3000,
  			ignoreLeaks: false,
  		},
		all: { src: ['<%= pkg.testSrc %>/**/*.js'] }
	},
	watch: {
	    app: {
	        files: ['gruntfile.js', '<%= pkg.src %>/**/*.js'],
	        tasks: ['jshint', 'simplemocha']
	    },
	    test: {
	        files: ['<%= pkg.testSrc %>/**/*.js'],
	        tasks: ['simplemocha']
	    }
	},
	shell: {
	    debug: {
	        command: 'node <%= pkg.main %> | ./node_modules/.bin/bunyan',
	        options: {
	            stdout: true,
	            stderr: true
	        }
	    }
	},
	mocha_istanbul: {
      coveralls: {
          src: ['test'],
          options: {
              coverageFolder: '<%= pkg.reports %>/coverage',
              coverage:false, 
              root: './<%= pkg.src %>',
              reportFormats: ['cobertura','lcovonly']
          }
      }
    }
    
  });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-package-modules');
    grunt.loadNpmTasks('grunt-mocha-istanbul');


    grunt.registerTask('test',
    ['mocha_istanbul:coveralls']);

    grunt.registerTask(
      'build',
      'Checks code standars, tests, and copies' +
      'the files to the build directory.',
      ['clean', 'jshint', 'test', 'copy', 'packageModules' ]
    );

    grunt.registerTask(
        'default',
        ['build', 'watch']
    );

    grunt.registerTask('debug',
    ['shell:debug']);
};
