define([], function () {
    'use strict';

    function parseSemver(semver) {
        let [major, minor, patch] = semver.split('.');
        return [parseInt(major, 10), parseInt(minor, 10), parseInt(patch, 10)];
    }

    // function compareSemver(semverString1, semverString2) {
    //     let [major1, minor1, patch1] = parseSemver(semverString1);
    //     let [major2, minor2, patch2] = parseSemver(semverString2);

    //     if (major1 < major2) {
    //         return -1;
    //     } else if (major1 > major2) {
    //         return 1;
    //     } else {
    //         if (minor1 < minor2) {
    //             return -1;
    //         } else if (major1 < major2) {
    //             return 1;
    //         } else {
    //             if (patch1 < patch2) {
    //                 return -1;
    //             } else if (patch1 > patch2) {
    //                 return 1;
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     }
    // }

    function semverIsAtLeast(baseSemver, semver) {
        let [majorBase, minorBase, patchBase] = parseSemver(baseSemver);
        let [major, minor, patch] = parseSemver(semver);


        if (major !== majorBase) {
            return 'major-incompatible';
        }

        if (minor > minorBase) {
            return 'minor-too-low';
        }

        if (minor === minorBase && patch > patchBase) {
            return 'patch-too-low';
        }

        return true;
    }

    return {parseSemver, semverIsAtLeast};
});