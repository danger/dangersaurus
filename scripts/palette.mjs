import Vibrant from "node-vibrant";
import { hslToRgb, rgbToHex } from "./util.mjs"

import fs from "fs";
import Jimp from "jimp";

const conwayImagePath = "scripts/images/downloaded/image.jpg";;
let v = new Vibrant(conwayImagePath);

const swatchJSONMap = (swatch) => ({
  hex: swatch.getHex(),
  hsl: swatch.getHsl(),
});

const modifySwatchByLuminenceIfMax = (swatch, lumDiff, max) => {
  const l = swatch.hsl[2];
  if (l > lumDiff) {
    const rgb = hslToRgb(swatch.hsl[0], swatch.hsl[1], swatch.hsl[2] - lumDiff);
    swatch.hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  }
  return swatch;
};

v.getPalette((err, palette) => {
  // Need a lot of fallbacks :D
  try {
    const swatches = {
      vibrant: swatchJSONMap(palette.Vibrant || palette.LightVibrant || palette.DarkVibrant),
      "vibrant-light": swatchJSONMap(palette.LightVibrant || palette.Vibrant || palette.DarkVibrant),
      "vibrant-dark": swatchJSONMap(palette.DarkVibrant || palette.Vibrant || palette.LightVibrant),
      muted: swatchJSONMap(palette.Muted || palette.LightMuted || palette.DarkMuted),
      "muted-light": swatchJSONMap(palette.LightMuted || palette.Muted || palette.DarkMuted),
      "muted-dark": swatchJSONMap(palette.DarkMuted || palette.Muted || palette.LightMuted),
    };


    // Ensure a max lightness: https://gitlab.com/danger-systems/danger.systems/issues/112
    swatches["muted"] = modifySwatchByLuminenceIfMax(swatches["muted"], 0.2, 0.8);
    swatches["muted-light"] = modifySwatchByLuminenceIfMax(swatches["muted-light"], 0.05, 0.8);
    swatches["muted-dark"] = modifySwatchByLuminenceIfMax(swatches["muted-dark"], 0.25, 0.8);

    writeJSON(swatches);
    writeSCSS(swatches);
    // updateSVGs(swatches);
    writeDangerLogos();

    console.log("Shipped palette");
  } catch (error) {
    console.error("Could not ship this palette");
    console.log(palette)
    console.error(error);
    return;
  }
});

const writeJSON = (swatches) => {
  const jsonPath = "src/data/colorScheme.js";
  fs.writeFileSync(jsonPath, JSON.stringify(swatches));
};

const writeSCSS = (swatches) => {
  const scssPath = "src/css/siteColors.css";
  const scss = Object.keys(swatches).map((key) => `--${key}: ${swatches[key].hex};`);
  fs.writeFileSync(scssPath, ` :root { \n` + scss.join("\n") + "}");
};

// const updateSVGs = (swatches) => {
//   const originalCSSHex = "#F0D34B";
//   const after = "static/source/images/js/_after.svg";
//   const afterRender = "static/source/images/js/after.svg";

//   const updateFile = (file, newFile, oldColor, newColor) => {
//     const original = fs.readFileSync(file, "utf8");
//     const modified = original.replace(RegExp(oldColor, "g"), newColor);
//     fs.writeFileSync(newFile, modified);
//   };
//   updateFile(after, afterRender, originalCSSHex, swatches["muted"].hex);
// };

const maskFolder = "scripts/images/masks"
const output = "static/img/logos"

const writeDangerLogos = () => {
  const largeMaskPath = maskFolder + "/danger-logo-mask-hero@2x.png";
  const heroImagePath = output + "/danger-logo-hero@2x.png";

  const heroUncachedImagePath = output + "/danger-logo-hero-cachable@2x.png";
  const smallLogoPath = output + "/danger-logo-small@2x.png";

  Promise.all([Jimp.read(conwayImagePath), Jimp.read(largeMaskPath)])
    .then(([bg, mask]) => {
      bg.cover(mask.bitmap.width, mask.bitmap.height)
        .mask(mask, 0, 0)
        .crop(0, 0, mask.bitmap.width, mask.bitmap.height)
        .write(heroImagePath)
        .write(heroUncachedImagePath)
        .resize(252, 80)
        .write(smallLogoPath);
    })
    .catch(function (err) {
      console.error(err);
    });

  const renderMask = (mask, to) => {
    return Promise.all([Jimp.read(conwayImagePath), Jimp.read(mask)])
      .then(([bg, mask]) => {
        bg.cover(mask.bitmap.width, mask.bitmap.height).mask(mask, 0, 0).crop(0, 0, mask.bitmap.width, mask.bitmap.height).write(to);
      })
      .catch(function (err) {
        console.error(err);
      });
  };
  const jsRenderedPath = output + "/js-logo@2x.png";
  const jsMaskPath = maskFolder + "/js-logo-mask@2x.png";
  renderMask(jsMaskPath, jsRenderedPath);

  const swiftMaskPath = maskFolder + "/swift-logo-mask@2x.png";
  const swiftRenderedPath = output + "/swift-logo@2x.png";
  renderMask(swiftMaskPath, swiftRenderedPath);

  const jsSwiftMaskPath = maskFolder + "/danger-logo-js-sw-mask-hero@2x.png";
  const jsSwiftRenderedPath = output + "/danger-js-sw-logo-hero-cachable@2x.png";
  renderMask(jsSwiftMaskPath, jsSwiftRenderedPath);

  const jsKotlinMaskPath = maskFolder + "/kotlin-logo-mask@2x.png";
  const jsKotlinRenderedPath = output + "/danger-js-ktln-logo-hero-cachable@2x.png";
  renderMask(jsKotlinMaskPath, jsKotlinRenderedPath);

  const jsPythonMaskPath = maskFolder + "/python-logo-mask@2x.png";
  const jsPythonRenderedPath = output + "/danger-js-py-logo-hero-cachable@2x.png";
  renderMask(jsPythonMaskPath, jsPythonRenderedPath);

  const dartSwiftMaskPath = maskFolder + "/dart-logo-mask@2x.png";
  const dartSwiftRenderedPath = output + "/danger-js-dart-logo-hero-cachable@2x.png";
  renderMask(dartSwiftMaskPath, dartSwiftRenderedPath);
};
