function hslToRgb(h: string, s: string, l: string): [number, number, number] {
  const s_int = parseFloat(s) / 100;
  const l_int = parseFloat(l) / 100;
  const h_int = parseFloat(h) / 100;

  let c = (1 - Math.abs(2 * l_int - 1)) * s_int;
  let x = c * (1 - Math.abs(((h_int / 60) % 2) - 1));
  let m = l_int - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h_int && h_int < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h_int && h_int < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h_int && h_int < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h_int && h_int < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h_int && h_int < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h_int && h_int < 360) {
    r = c;
    g = 0;
    b = x;
  }
  // Having obtained RGB, we can now convert to [0, 255] range
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return [r, g, b];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function convertHslToHexInCss(css: string): string {
  const hslRegex = /(\d+(\.\d+)?)\s+(\d+(\.\d+)?%)\s+(\d+(\.\d+)?%)/g;
  return css.replace(hslRegex, function (match, h, _, s, __, l) {
    const [r, g, b] = hslToRgb(h, s, l);
    return rgbToHex(r, g, b);
  });
}
