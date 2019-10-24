import Bowser from "bowser"
import defaults from './defaults';

function isClipPathSupported() {
    const userAgentParser = Bowser.getParser(window.navigator.userAgent);
    const result = userAgentParser.getBrowserName();
    const browsersNotSupported = defaults.getUnsupportedBrowsers();
    return browsersNotSupported.indexOf(result) === -1;
}

export default {
    isClipPathSupported
};
