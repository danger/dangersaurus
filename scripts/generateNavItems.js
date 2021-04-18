const fs = require("fs");
const path = require("path");

const names = ["JS", "Ruby", "Swift", "Kotlin", "Dart", "Python"];

const generateNavItems = () => {
  const items = [];

  names.forEach((name) => {
    const files = fs.readdirSync(`docs/${name.toLowerCase()}`);
    const hasSections = files.includes("guides")
    const siteRoot= "/" + name.toLowerCase() + "/"
    const docsPathRoot = "docs/" + name.toLowerCase()

    if (!hasSections) {
      items.push({
        href: siteRoot,
        label: name,
        position: "left",
      })

    } else {
      const known = ["guides", "tutorials", "usage"]
      const subnav = known.filter(folder => fs.existsSync(docsPathRoot + "/" + folder))
      items.push({
        to: siteRoot,
        activeBasePath: "/",
        label: name,
        position: "left",
        items: [
          ...subnav.map(s => ({
            href: `${siteRoot}${s}`,
            label: toTitleCase(path.basename(s)),
          })),
          {
            href: `https://github.com/danger/${name}`,
            label: "GitHub Repo",
          }
        ]
      })
    }
  });

  // Right side images
  items.push({
    href: "https://github.com/danger",
    label: "GitHub Org",
    position: "right",
  });

  return items;
};


function toTitleCase(str) {
  return str.toLowerCase().replace(/\.\s*([a-z])|^[a-z]/gm, s => s.toUpperCase());
 }


module.exports = {
  generateNavItems,
  names
}
