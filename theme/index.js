export const themeColors = {
  bgWhite: opacity => RGBAToHexA(255, 255, 255, opacity),
  bgGrey: opacity => RGBAToHexA(179, 188, 185, opacity),
  bgBlack: opacity => RGBAToHexA(31, 41, 55, opacity),
  chartBlue: opacity => RGBAToHexA(26, 105, 133, opacity),
  chartRed: opacity => RGBAToHexA(133, 54, 26, opacity),
  chartGreen : opacity => RGBAToHexA(51, 133, 26, opacity),
}   

function RGBAToHexA(r,g,b,a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a

  return "#" + r + g + b + a;
}