var parser = require('ua-parser-js');

function injectMask(svg) {
    const clonedSvg = svg.cloneNode(true);

    // Remove clipPath node
    const svgInner = clonedSvg.querySelector('clipPath').innerHTML;
    clonedSvg.innerHTML = '';
    clonedSvg.innerHTML = svgInner;

    // Generate img element from SVG
    const image = new Image();
    const wrapper = document.createElement('div');
    wrapper.appendChild(clonedSvg);
    const data = `data:image/svg+xml;base64,${window.btoa(wrapper.innerHTML)}`;
    image.src = data;
    return image;
}

function isClipPathSupported() {
    const userAgentParser = new parser();
    const result = userAgentParser.getResult();
    const browsersNotSupported = ['Edge', 'Opera'];
    return browsersNotSupported.indexOf(result.browser.name) === -1;
    return false;
}

// eslint-disable-next-line func-names
const convertClip = function (clipWrapper, maskId) {
    if (isClipPathSupported()) return;

    // Init Canvas
    const canvas = document.createElement('canvas');
    canvas.style.width = '100';
    canvas.style.height = '100';
    const ctx = canvas.getContext('2d');

    // Fetch SVG Mask
    const clipPathSvg = document.getElementById(maskId).closest('svg');

    // Get Mask node
    const mask = injectMask(clipPathSvg);

    // Get window image & dimensions
    const windowImage = clipWrapper.querySelector('img');
    const windowImageWidth = windowImage.offsetWidth;
    const windowImageHeight = windowImage.offsetHeight;

    // Add canvas info container
    clipWrapper.appendChild(canvas);

    // Append mask & window image into Canvas
    const img = new Image();
    const maskImg = new Image();
    img.onload = () => {
        // Morph canvas to original image size
        canvas.width = windowImageWidth;
        canvas.height = windowImageHeight;

        // Draw mask
        maskImg.onload = () => {
            ctx.drawImage(
                maskImg,
                0,
                0,
                maskImg.width,
                maskImg.height,
                0,
                0,
                windowImageWidth,
                windowImageHeight,
            );
            ctx.globalCompositeOperation = 'source-in';

            // Draw image into mask
            ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, windowImageWidth, windowImageHeight);

            // Append image as child node for accesibility reasons
            canvas.appendChild(img);

            // Remove original image
            windowImage.remove();
        };
    };
    img.src = windowImage.src;
    maskImg.src = mask.src;
}

module.exports = {
    convertClip
};
