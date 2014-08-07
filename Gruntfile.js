module.exports = function(grunt) {

    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    'js/*.js', // All js in the libs folder
                ],
                dest: 'js/build/global.js'
            }
        },

        uglify: {
            build: {
                src: 'js/build/global.js',
                dest: 'js/build/global.min.js'
            }
        },

        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'css/build/global.css': 'scss/global.scss'
                }
            } 
        },

         autoprefixer: {
            single_file: {
                options: {
                    browsers: ['last 2 version', 'ie 8', 'ie 9']
                },
                src: 'css/build/global.css',
                dest: 'css/build/prefixed/global.css'
            },
        },

        // watch js/css files + livereload css
        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'autoprefixer'],
                options: {
                    spawn: false,
                }
            } 
        }

    });  // end config


    grunt.loadNpmTasks('grunt-contrib-concat'); // load concat
    grunt.loadNpmTasks('grunt-contrib-uglify'); // load uglify
    grunt.loadNpmTasks('grunt-contrib-sass'); // load sass
    grunt.loadNpmTasks('grunt-autoprefixer'); // load autoprefixer
    grunt.loadNpmTasks('grunt-contrib-watch'); // load watch

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer']); // tell grunt what to do
    grunt.registerTask('dev', ['watch']); // let grunt watch files

};