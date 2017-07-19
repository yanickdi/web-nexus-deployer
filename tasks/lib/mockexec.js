(function () {
    'use strict';
    var exitFn, stdFn, ef;
    var data = { releases: [], nodeReleases: [], snapshots: [], nodeSnapshots: [] };
    var childProcess = {
        on: function (type, fn) {
            exitFn = fn;
        },
        stdout: {
            on: function (type, fn) {
                stdFn = fn;
            }
        },
        stderr: {
            on: function (type, fn) {
                ef = fn;
            }
        },
        data: function (key) {
            return data[key];
        }
    };

    module.exports = function (cmd) {
        if (/repositories\/releases/.test(cmd)) {
            data.releases.push(cmd);
        } else if (/repositories\/nodeReleases/.test(cmd)) {
            data.nodeReleases.push(cmd);
        } else if (/repositories\/snapshots/.test(cmd)) {
            data.snapshots.push(cmd);
        } else if (/repositories\/nodeSnapshots/.test(cmd)) {
            data.nodeSnapshots.push(cmd);
        }

        setTimeout(function () {
            stdFn("200");
            exitFn(0);
        }, 100);
        return childProcess;
    };

})();