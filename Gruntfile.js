(function () {
    'use strict';

    var deployer = require('./');

    module.exports = function (grunt) {

        // automatically load grunt tasks
        require('load-grunt-tasks')(grunt);

        // Project configuration.
        var auth = { username: 'admin', password: 'admin123' };
        var deployOptions = {
            release: {
                groupId: 'nexus-deployer',
                artifactId: 'nexus-deployer',
                version: '1.2',
                packaging: 'zip',
                auth: {
                    username: auth.username,
                    password: auth.password
                },
                pomDir: 'test/actual/releases',
                url: 'http://localhost:8081/repository/npmLibraries',
                artifact: 'test/fixtures/example.zip',
                noproxy: 'localhost',
                cwd: '',
                quiet: true
            },
            snapshot: {
                groupId: 'nexus-deployer',
                artifactId: 'nexus-deployer',
                version: '1.2-SNAPSHOT',
                packaging: 'zip',
                auth: {
                    username: auth.username,
                    password: auth.password
                },
                pomDir: 'test/actual/snapshots',
                url: 'http://localhost:8081/repository/npmLibraries',
                artifact: 'test/fixtures/example.zip',
                noproxy: 'localhost',
                cwd: '',
                quiet: false,
                insecure: true
            }
        };

        grunt.initConfig({
            // auth: auth,
            jshint: {
                all: [
                    'Gruntfile.js',
                    'tasks/*.js',
                    'test/*.js'
                ],
                options: {
                    jshintrc: '.jshintrc'
                }
            },

            // Set environment variable to trigger mocking for tests
            env: {
                mock: {
                    MOCK_NEXUS: 1
                }
            },

            // Before generating any new files, remove any previously-created files.
            clean: {
                tests: [
                    'test/actual/releases/**',
                    'test/actual/nodeReleases/**',
                    'test/actual/snapshots/**',
                    'test/actual/nodeSnapshots/**'
                ]
            },

            // Configuration to be run (and then tested).
            nexusDeployer: {
                release: {
                    options: deployOptions.release
                },

                snapshot: {
                    options: deployOptions.snapshot
                }
            },

            mochaTest: {
                grunt: {
                    options: {
                        reporter: 'spec'
                    },
                    src: ['test/specs/**/*.js']
                }
            }

        });

        grunt.loadTasks('tasks');  // to load main nexusDeployer task

        grunt.registerTask('nodeRelease', function () {
            var done = this.async();

            var options = deployOptions.release;

            options.pomDir = 'test/actual/nodeReleases';
            options.url = 'http://localhost:8081/repository/npmLibraries';

            deployer.deploy(options, function () {
                done();
            });
        });

        grunt.registerTask('nodeSnapshot', function () {
            var done = this.async();

            var options = deployOptions.snapshot;

            options.pomDir = 'test/actual/nodeSnapshots';
            options.url = 'http://localhost:8081/repository/npmSnapshots';

            deployer.deploy(options, function () {
                done();
            });
        });

        grunt.registerTask('test', ['clean', 'env:mock', 'nexusDeployer', 'nodeRelease', 'nodeSnapshot', 'mochaTest']);

        grunt.registerTask('default', ['jshint', 'test']);

    };
})();