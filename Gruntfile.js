module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['client/app/**/**.js'],
        dest: 'client/dist/built.js',
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'client/dist/app.min.js': ['client/dist/built.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};
