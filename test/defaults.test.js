const defaults = require('./../lib/defaults');

test('returns array of unsupported browsers', () => {
  expect(Array.isArray(defaults.default.getUnsupportedBrowsers())).toBe(true);
});
