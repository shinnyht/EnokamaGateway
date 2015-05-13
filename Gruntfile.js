module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    
    grunt.initConfig({
        concat: {
            enoshimap_sox_client: {
                src: [
                    './SoxJS/js/lib/jquery-1.10.2.js',
                    './SoxJS/js/lib/jquery.dropotron.min.js',
                    './SoxJS/js/lib/config.js',
                    './SoxJS/js/lib/underscore-min.js',
                    './SoxJS/js/lib/backbone.js',
                    './SoxJS/js/lib/strophe.js',
                    './SoxJS/js/lib/sox.strophe.pubsub.js',
                    './SoxJS/js/lib/strope.x.js',
                    './SoxJS/js/lib/jscron.js',
                    './SoxJS/js/sox/SoxClient.js',
                    './SoxJS/js/sox/SoxEventListener.js',
                    './SoxJS/js/sox/Device.js',
                    './SoxJS/js/sox/Transducer.js',
                    './SoxJS/js/sox/SensorData.js',
                    './SoxJS/js/sox/EnodenTimetable.js',
                    './bower_components/Processing.js/processing.js'
                ],
                dest: 'dist/Enoshimap.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 9999,
                    base: ""
                }
            }
        },
        watch: {}
    });

    // Load depedencies from package.json
    var taskName;
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // Default task(s).
    grunt.registerTask('default', ['concat', 'connect', 'watch']);
    grunt.registerTask('create', ['concat']);

};
