export const themeColors = {
  bgWhite: (opacity) => RGBAToHexA(255, 255, 255, opacity),
  bgGrey: (opacity) => RGBAToHexA(179, 188, 185, opacity),
  bgBlack: (opacity) => RGBAToHexA(31, 41, 55, opacity),
  chartBlue: (opacity) => RGBAToHexA(42, 94, 167, opacity),
  chartRed: (opacity) => RGBAToHexA(186, 26, 26, opacity),
  chartGreen: (opacity) => RGBAToHexA(0, 110, 69, opacity),

  primary: "#90B6FF",
  onPrimary: "#002f66",
  primaryContainer: "#07458e",
  onPrimaryContainer: "#d7e2ff",
  secondary: "#bec6dc",
  onSecondary: "#283141",
  secondaryContainer: "#3e4759",
  onSecondaryContainer: "#dae2f9",
  tertiary: "#dcbce0",
  onTertiary: "#3f2844",
  tertiaryContainer: "#573e5c",
  onTertiaryContainer: "#f9d8fd",
  error: "#ffb4ab",
  onError: "#690005",
  errorContainer: "#93000a",
  onErrorContainer: "#ffdad6",
  background: "#1a1b1e",
  onBackground: "#e3e2e6",
  surface: "#1a1b1e",
  onSurface: "#e3e2e6",
  outline: "#8e9099",
  surfaceVariant: "#44474e",
  onSurfaceVariant: "#c4c6d0",
  success: "#006e45",
  onSuccess: "#f2ffff",
};

export function RGBAToHexA(r, g, b, a) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = Math.round(a * 255).toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}

export function hexToRGBA(hex, opacity) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  };
}
