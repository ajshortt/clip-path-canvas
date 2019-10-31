# ClipPathCanvas.js
[![npm version](https://img.shields.io/npm/v/clip-path-canvas)](https://npmjs.org/package/clip-path-canvas "View this project on npm")
[![Build Status](https://travis-ci.com/ajshortt/clip-path-canvas.svg?branch=master)](https://travis-ci.com/ajshortt/clip-path-canvas)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


Do you enjoy using the SVG masks with `clip-path` CSS attribute on images in your web pages/applications? Annoyed that some browsers still doesn't support the attribute? [https://caniuse.com/#feat=css-clip-path](https://caniuse.com/#feat=css-clip-path). Well now you can allow users from all un-supported browsers
enjoy you the visual qualities of your site with `ClipPathCanvas`.

Simply put, this package will detect if the current browser cannot support `clip-path` then mimics the style by replacing the image with a canvas replica whilst retaining the style and other attributes on the initial image element.


* Author    : Alex Shortt <<hello@alex-shortt.com>>
* Source    : https://github.com/ajshortt/clip-path-canvas

## Installaltion

### NPM

```sh
$ npm install clip-path-canvas
```

### Yarn

```sh
$ yarn add clip-path-canvas
```

### Import
If you are using a bundler, import the package to your application like so:
```javascript
import convertClipPath from 'clip-path-canvas';
```

### Script
If you want to add the script directly, add the following to your HTML:
```javascript
<script src="path/to/clip-path-canvas/dist/clip-path-canvas.min.js"></script>
```

## Usage

### Example HTML
You need to make sure the image that you want to clip has a parent container element which is required by ClipPathCanvas to
create the fallback canvas.
```html
<div id="clip-path-wrapper">
    <img class="clip-path-image" src="..." alt="...">
</div>
```

### Example SVG Mask
You will obviously need your SVG mask within your markup. It is recommended that you hide the mask visually as it is simply referenced by
CSS to create the clip-path. Make sure the SVG internal definitions e.g a `path` is wrapped in a `clipPath` element with the corresponding id
which the CSS references when creating the clip-path.
```html
<div class="masks">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        viewBox="0 0 180 180"
    >
        <defs>
            <clipPath
                id="clip-path-mask-id"
                clipPathUnits="objectBoundingBox"
                transform="scale(0.00558 0.00555)"
            >
                <path d="M0 .674v178.952h178.667l-63.33-94.968L175.247.674z" />
            </clipPath>
        </defs>
    </svg>
</div>
```

### Example CSS (prior to ClipPathCanvas usage)
```css
.clip-path-image {
    clip-path: url('#clip-path-mask-id');
}

/* Make sure to visually hide the SVG mask */
.masks {
    max-height: 0;
    max-width: 0;
    overflow: hidden;
}
```

Great, this looks sweet...but not on unsupported browsers. In steps `ClipPathCanvas`!

### ClipPathCanvas usage
```javascript
// Get the wrapping element
var wrapper = document.getElementById('clip-path-canvas-wrapper');

// Run ClipPathCanvas passing in the wrapping element and the ID of the desired mask
ClipPathCanvas(wrapper, 'clip-path-mask-id');
```

## Development

### Roadmap
- 🔥 Add custom user agent sniffer to decrease distribution payload weight
- 🔥 Add full un-supported list of browsers
- 🔥 Add linting & unit tests
- ⚠️ Add target element by string functionality

### Contribute

* Submit an issue in the issues section of the Github repo
* Fork and clone this repository
* Make some changes as required on a branch `change/#{issue-id}` e.g `change/#123`
* ~~Write a unit test for your change~~ coming soon
* ~~Run the test suites to confirm none braking code `$ npm run test`~~ coming soon
* Commit and push to your own repository
* Submit a pull request to this repository to the `development` branch

### Build

```sh
$ cd /path/to/local/clip-path-canvas
$ npm install
$ npm run build
```

## Donate

All donations welcome

[![Support via PayPal](https://cdn.rawgit.com/twolfson/paypal-github-button/1.0.0/dist/button.svg)](https://www.paypal.me/ajshortt)


## License

MIT License

Copyright (c) 2012-2019 Alex Shortt <<hello@alex-shortt.com>>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
