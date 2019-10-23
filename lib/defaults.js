var browsers = require('./constants/browsers');

function getUnsupportedBrowsers() {
    return browsers.BROWSERS_UNSUPPORTED
}

module.exports = {
    getUnsupportedBrowsers
};
