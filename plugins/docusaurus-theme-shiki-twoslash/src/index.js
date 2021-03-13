const path = require('path');
// const {validateThemeConfig} = require('./validateThemeConfig');

function theme(a, b) {
  console.log(a,b)

  const preset = a.siteConfig.presets.find(p => p[0] === "@docusaurus/preset-classic")
  if (!preset) throw new Error("Couldn't find a preset of @docusaurus/preset-classic")

  if (!preset[1].docs) preset[1].docs = {}
  if (!preset[1].docs.beforeDefaultRemarkPlugins)  preset[1].docs.beforeDefaultRemarkPlugins = []

  preset[1].docs.beforeDefaultRemarkPlugins.push(
    // require('remark-shiki-twoslash') 
    // [require("remark-shiki-twoslash").default, { 
    //   theme: "github-light",
    //   useNodeModules: true,
    //   nodeModulesTypesPath: path.join(__dirname, "node_modules"),
    //  }]
  )

  return {
    name: 'docusaurus-theme-shiki-twoslash',
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
  };
}

module.exports = theme;

// theme.validateThemeConfig = validateThemeConfig;
