module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['client/app/app.js', 'client/app/services/mapfactory.js', 'client/app/services/uberapifactory.js', 'client/app/services/yelpapifactory.js', 'client/app/map/mapController.js', 'client/app/loader/loader.js'],
        dest: 'dist/built.js',
      }
    },
    jshint: {
      beforeconcat: ['client/app/app.js', 'client/app/services/mapfactory.js', 'client/app/services/uberapifactory.js', 'client/app/services/yelpapifactory.js', 'client/app/map/mapController.js', 'client/app/loader/loader.js'],
      afterconcat: ['dist/built.js']
    },
    uglify: {
      my_target: {
        files: {
          'client/dist/app.min.js': ['dist/built.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jshint', 'uglify']);

};
