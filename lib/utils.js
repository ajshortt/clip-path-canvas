var parser = require('ua-parser-js');
var defaults = require('./defaults');

function isClipPathSupported() {
    const userAgentParser = new parser();
    const result = userAgentParser.getResult();
    const browsersNotSupported = defaults.getUnsupportedBrowsers();
    return browsersNotSupported.indexOf(result.browser.name) === -1;
}

module.exports = {
    isClipPathSupported
};
