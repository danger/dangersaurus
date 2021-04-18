const path = require('path');

function theme(context, pluginOptions) {
  const preset = context.siteConfig.presets.find(p => p[0] === "@docusaurus/preset-classic")
  if (!preset) throw new Error("Couldn't find a preset of @docusaurus/preset-classic")

  if (!preset[1].docs) preset[1].docs = {}
  if (!preset[1].docs.beforeDefaultRemarkPlugins)  preset[1].docs.beforeDefaultRemarkPlugins = []

  preset[1].docs.beforeDefaultRemarkPlugins.push(
    [require("remark-shiki-twoslash").default, { 
      theme: "github-light",
      useNodeModules: true,
      nodeModulesTypesPath: path.join(__dirname, "node_modules"),
      ...pluginOptions
     }]
  )

  return {
    name: 'docusaurus-theme-shiki-twoslash',
    getThemePath() {
      return path.resolve(__dirname, './theme');
    },
    getClientModules() {1
      return [require.resolve('./twoslash.css')];
    },
  };
}

module.exports = theme;
