(function () {
    'use strict';

    var should = require('should'), mockexec = require('../../tasks/lib/mockexec'), fs = require('fs');

    xdescribe('Nexus Deployer Releases', function () {

        describe('Releases generated via grunt', function () {

            var releaseHistory;
            var INNER_METADATA_FILE_PATTERN = /inner\.xml/;

            beforeEach(function () {
                var exec = mockexec();
                releaseHistory = exec.data('releases');
            });

            describe('After deployment', function () {

                it('9 artifacts are uploaded for release', function () {
                    releaseHistory.length.should.equal(9);
                });

                it('release uploads must not contain metadata files', function () {
                    releaseHistory.filter(function (cmd) {
                        return INNER_METADATA_FILE_PATTERN.test(cmd);
                    }).length.should.equal(0);
                });

                it('ssl certificate errors are not skipped by default', function () {
                    releaseHistory.forEach(function (callParams) {
                        if (callParams) {
                            callParams.should.not.match(/--insecure/);
                        }
                    });
                });

                it('inner.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/inner.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/releases/inner.xml', 'utf8');
                    actual.should.equal(expected);
                });

                it('outer.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/outer.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/releases/outer.xml', 'utf8');
                    actual.should.equal(expected);
                });

                it('pom.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/pom.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/releases/pom.xml', 'utf8');
                    actual.should.equal(expected);
                });

            });

        });

        describe('Releases generated via grunt', function () {

            var releaseHistory;
            var INNER_METADATA_FILE_PATTERN = /inner\.xml/;

            beforeEach(function () {
                var exec = mockexec();
                releaseHistory = exec.data('nodeReleases');
            });

            describe('After deployment', function () {

                it('9 artifacts are uploaded for release2', function () {
                    releaseHistory.length.should.equal(9);
                });

                it('release uploads must not contain metadata files', function () {
                    releaseHistory.filter(function (cmd) {
                        return INNER_METADATA_FILE_PATTERN.test(cmd);
                    }).length.should.equal(0);
                });

                it('ssl certificate errors are not skipped by default', function () {
                    releaseHistory.forEach(function (callParams) {
                        if (callParams) {
                            callParams.should.not.match(/--insecure/);
                        }
                    });
                });

                it('inner.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/inner.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/nodeReleases/inner.xml', 'utf8');
                    actual.should.equal(expected);
                });

                it('outer.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/outer.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/nodeReleases/outer.xml', 'utf8');
                    actual.should.equal(expected);
                });

                it('pom.xml should be generated correctly', function () {
                    var expected = fs.readFileSync('test/expected/release/pom.xml', 'utf8');
                    var actual = fs.readFileSync('test/actual/nodeReleases/pom.xml', 'utf8');
                    actual.should.equal(expected);
                });
            });
        });
    });
})();