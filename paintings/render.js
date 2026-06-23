const RAMP = " .·,:-=+*%#@";
const BOOST = 1.8;

function renderPixel(hex) {
    const pr = (hex >> 24) & 0xff;
    const pg = (hex >> 16) & 0xff;
    const pb = (hex >> 8) &  0xff;

    const r2 = Math.min(255, Math.floor(pr * BOOST));
    const g2 = Math.min(255, Math.floor(pg * BOOST));
    const b2 = Math.min(255, Math.floor(pb * BOOST));


    const brightness = ( pr * 0.299 + pg * 0.587 + pb * 0.114) / 255;
    const char = RAMP[Math.floor(brightness * (RAMP.length - 1))]

    return `\x1b[38;2;${r2};${g2};${b2}m${char}\x1b[0m`;

}

module.exports = { renderPixel };