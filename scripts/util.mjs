import { execSync } from "child_process"

export const exec = (cmd, opts) => {
  console.log(`> ${cmd} ${opts ? JSON.stringify(opts) : ""}`);
  try {
    return execSync(cmd, opts);
  } catch (error) {
    console.log("Command Failed:")
    console.log("STDOUT:" + error.stdout.toString())
    console.log("STDERR:" + error.stderr.toString())
    throw error
  }
};


// From https://github.com/Vibrant-Colors/node-vibrant/blob/master/src/util.ts
// MIT: https://github.com/Vibrant-Colors/node-vibrant/blob/master/LICENSE.md

export function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7)
}

export function rgbToHsl(r, g, b) {
  r /= 255
  g /= 255
  b /= 255
  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let h
  let s
  let l = (max + min) / 2
  if (max === min) {
    h = s = 0
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    // @ts-ignore
    h /= 6
  }
  // @ts-ignore
  return [h, s, l]
}



export function hslToRgb(h, s, l) {
  let r
  let g
  let b

  function hue2rgb(p, q, t) {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }

  if (s === 0) {
    r = g = b = l
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - (l * s)
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - (1 / 3))
  }
  return [
    r * 255,
    g * 255,
    b * 255
  ]
}
