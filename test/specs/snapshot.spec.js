'use strict';


var should = require('should'), mockexec = require('../../tasks/lib/mockexec'), fs = require('fs');

describe('Nexus Deployer Snapshots', function () {
    
    describe('Snapshots generated via grunt', function () {

        var snapshotHistory;
        var INNER_METADATA_FILE_PATTERN = /inner\.xml/;

        beforeEach(function () {
            var exec = mockexec();
            snapshotHistory = mockexec().data('snapshots');
        });

        describe('After deployment', function () {

            it('12 artifacts are uploaded for snapshot', function () {
                snapshotHistory.length.should.equal(12);
            });


            it('snapshot uploads must contain 3 extra metadata files', function () {
                snapshotHistory.filter(function (uploadCmd) {
                    return INNER_METADATA_FILE_PATTERN.test(uploadCmd);
                }).length.should.equal(3);
            });

            it('ssl certificate errors can be skipped', function () {
                snapshotHistory.forEach(function (callParams) {
                    if (callParams) {
                        callParams.should.match(/--insecure/);
                    }
                });
            });

    		
    		it('inner.xml should be generated correctly', function() {
    			var expected = fs.readFileSync('test/expected/snapshot/inner.xml', 'utf8');
    			var actual = fs.readFileSync('test/actual/snapshots/inner.xml', 'utf8');
    			actual.should.equal(expected);
    		});
    		
    		it('outer.xml should be generated correctly', function() {
    			var expected = fs.readFileSync('test/expected/snapshot/outer.xml', 'utf8');
    			var actual = fs.readFileSync('test/actual/snapshots/outer.xml', 'utf8');
    			actual.should.equal(expected);
    		});
    		
    		it('pom.xml should be generated correctly', function() {
    			var expected = fs.readFileSync('test/expected/snapshot/pom.xml', 'utf8');
    			var actual = fs.readFileSync('test/actual/snapshots/pom.xml', 'utf8');
    			actual.should.equal(expected);
    		});

        });

    });


    describe('Snapshots generated via grunt', function () {

        var snapshotHistory;
        var INNER_METADATA_FILE_PATTERN = /inner\.xml/;

        beforeEach(function () {
            var exec = mockexec();
            snapshotHistory = mockexec().data('nodeSnapshots');
        });

        describe('After deployment', function () {

            it('12 artifacts are uploaded for snapshot', function () {
                snapshotHistory.length.should.equal(12);
            });


            it('snapshot uploads must contain 3 extra metadata files', function () {
                snapshotHistory.filter(function (uploadCmd) {
                    return INNER_METADATA_FILE_PATTERN.test(uploadCmd);
                }).length.should.equal(3);
            });

            it('ssl certificate errors can be skipped', function () {
                snapshotHistory.forEach(function (callParams) {
                    if (callParams) {
                        callParams.should.match(/--insecure/);
                    }
                });
            });

            
            it('inner.xml should be generated correctly', function() {
                var expected = fs.readFileSync('test/expected/snapshot/inner.xml', 'utf8');
                var actual = fs.readFileSync('test/actual/nodeSnapshots/inner.xml', 'utf8');
                actual.should.equal(expected);
            });
            
            it('outer.xml should be generated correctly', function() {
                var expected = fs.readFileSync('test/expected/snapshot/outer.xml', 'utf8');
                var actual = fs.readFileSync('test/actual/nodeSnapshots/outer.xml', 'utf8');
                actual.should.equal(expected);
            });
            
            it('pom.xml should be generated correctly', function() {
                var expected = fs.readFileSync('test/expected/snapshot/pom.xml', 'utf8');
                var actual = fs.readFileSync('test/actual/nodeSnapshots/pom.xml', 'utf8');
                actual.should.equal(expected);
            });

        });

    });

});
