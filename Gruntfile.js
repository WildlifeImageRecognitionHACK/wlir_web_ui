module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
  
  grunt.initConfig({
    'dart-sass': {
      target: {
        files: [{
          expand: true,
          cwd: 'src/sass',
          src: ['wlir.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    sync: {
      scripts: {
        files: [
          { 
            cwd: 'src',
            src: [
                  '**/*.html',
                  'img/**/*',
                  '!node_modules/**/*'
                 ], 
            dest: 'dist' 
          }
        ]
      }
    },
    uglify: {
      options: {
        mangle: false,
        sourceMap: true
      },
      app: {
        files: {
          'dist/js/wlir.min.js' : 'src/js/**/*.js',
          'dist/js/thirdparty.min.js' : [
            'node_modules/lodash/lodash.min.js',
            'node_modules/angular-google-auth2/angular-google-auth2.js'
          ]
        }
      }
    },
    watch: {
      html: {
        files: ['src/**/*.html', 'src_micro/**/*.html'],
        tasks: ['sync']
      },
      img: {
        files: ['src/img/**/*', 'src_micro/**/img/**/*'],
        tasks: ['sync']
      },
      scss: {
        files: ['src/sass/**/*.scss', 'src_micro/**/sass/**/*.scss'],
        tasks: ['dart-sass']
      },
      dev: {
        files: ['src/js/**/*.js','src_micro/**/js/**/*.js'],
        tasks: ['uglify']
      },
      grunt: {
        files: 'Gruntfile.js',
        tasks: ['build']
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'dist',
          middleware: function(connect, options, middlewares) {
            middlewares.unshift(function(req, res, next) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              next();
            });
            return middlewares;
          }
        }
      }
    }
  });
           
  // > grunt build  - compiles project
  grunt.registerTask('build', ['dart-sass', 'sync', 'uglify']);    
  // > grunt start  - compiles project, runs localhost server, re-builds project when files change
  grunt.registerTask('start', ['build', 'connect', 'watch']);
  // > grunt        - compiles project (defining default task)
  grunt.registerTask('default', ['build']);
}