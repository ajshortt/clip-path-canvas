import utils from './utils';

function injectMask(svg) {
    var clonedSvg = svg.cloneNode(true);

    // Remove clipPath node
    var svgInner = clonedSvg.querySelector('clipPath').innerHTML;
    clonedSvg.innerHTML = '';
    clonedSvg.innerHTML = svgInner;

    // Generate img element from SVG
    var image = new Image();
    var wrapper = document.createElement('div');
    wrapper.appendChild(clonedSvg);
    var data = `data:image/svg+xml;base64,${window.btoa(wrapper.innerHTML)}`;
    image.src = data;
    return image;
}

var convertClipPath = function (clipWrapper, maskId) {
    // Is clip-path-canvas even required?
    if (utils.isClipPathSupported()) return;

    // Validate wrapper
    if(!clipWrapper) return;

    // Fetch SVG Mask
    var clipPathSvgInner = document.getElementById(maskId);

    // Get to be clipped image
    var toBeClippedImage = clipWrapper.querySelector('img');

    // Validate both mask & image
    if(!clipPathSvgInner || !toBeClippedImage) return;

    // Init Canvas
    var canvas = document.createElement('canvas');
    canvas.style.width = '100';
    canvas.style.height = '100';
    var ctx = canvas.getContext('2d');

    // Get wrapping SVG node of clipPath node
    var clipPathSvg = clipPathSvgInner.closest('svg')

    // Get Mask node
    var mask = injectMask(clipPathSvg);

    var toBeClippedImageAttributes = {
        src: toBeClippedImage.src,
        alt: toBeClippedImage.alt,
        classes: toBeClippedImage.className
    };

    var windowImage = new Image();
    windowImage.onload = () => {
        var windowImageWidth = windowImage.width;
        var windowImageHeight = windowImage.height;

        // Add canvas info container
        clipWrapper.appendChild(canvas);

        // Append mask & window image into Canvas
        var img = new Image();
        var maskImg = new Image();
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

                // Add any current img attributes to nested fallback image
                img.alt = toBeClippedImageAttributes.alt

                // Append image as child node for accesibility reasons
                canvas.appendChild(img);

                // Re-add img classes to canvas
                canvas.className = toBeClippedImageAttributes.classes;

                // Remove original image
                toBeClippedImage.remove();
            };
        };
        img.src = windowImage.src;
        maskImg.src = mask.src;
    };
    windowImage.src = toBeClippedImageAttributes.src
}


export default convertClipPath;
