'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    autoprefixer: {
      options: {
        // Options go here, eg browsers: ['ie 8', 'ie 10']
        browsers: ['last 2 versions']
      },
      no_dest_multiple: {
        expand: true,
        src: 'css/**/*.css'
      },
    },

    drush: {
      clearCache: {
        args: ['cr']
      },
    },

    sass_globbing: {
      targets: {
        files: {
          'sass/components/_components.scss': 'sass/components/**/*.scss',
          'sass/fonts/_fonts.scss': 'sass/fonts/**/*.scss',
          'sass/layouts/_layouts.scss': 'sass/layouts/**/*.scss',
          'sass/mixins/_mixins.scss': 'sass/mixins/**/*.scss',
          'sass/variables/_variables.scss': 'sass/variables/**/*.scss'
        },
        options: {
          signature: false
        }
      }
    },

    sass: {
      options: {
        sourceMap: false,
        includePaths: [
          'libraries/compass-mixins/lib',
          'libraries/breakpoint-sass/stylesheets',
          'libraries/singularitygs/stylesheets',
          'libraries/sass-toolkit/stylesheets'
        ]
      },

      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      },

      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['**/*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },

    sasslint: {
      options: {
        configFile: '.sass-lint.yml'
      },
      target: ['sass/**/*.scss']
    },

    watch: {
      sass_globbing: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['sass_globbing']
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      livereload: {
        files: ['*.html', '*.php', 'js/**/*.{js,json}', 'css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
        options: {
          livereload: true
        }
      }
    }
  });
  // Load plugins
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webfont');
  grunt.loadNpmTasks('grunt-autoprefixer');
  // Tasks
  grunt.registerTask('default', ['sass:dist', 'watch']);
  grunt.registerTask('build', ['sass_globbing', 'sass:dist', 'autoprefixer']);
  grunt.registerTask('build-dev', ['webfont:icons', 'sass_globbing', 'sass:dev', 'autoprefixer']);
};
