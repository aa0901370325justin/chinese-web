// Assemble the split pronunciation stroke image maps before the integration script runs.
const STROKE_ORDER_PNG = Object.assign({}, ...(window.__STROKE_ORDER_PNG_PARTS || []));
delete window.__STROKE_ORDER_PNG_PARTS;
