
const {names} = require("../scripts/generateNavItems")
const fs = require("fs")
const path = require("path");

function docsRootPlugin(context, options) {
  return {
    name: 'danger-docusaurus-plugin',
    async contentLoaded({content, actions}) {

      const {createData, addRoute} = actions;
      for (const name of names) {
        
        const docsPathRoot = "docs/" + name.toLowerCase()
        const files = fs.readdirSync(docsPathRoot);
        const hasSections = files.includes("guides")

        const allFiles = recursiveReadDirSync(docsPathRoot)

        const siteRoot= "/" + name.toLowerCase() + "/"
        const props = {
          name
        }

        
        // Only render the README and bail
        if (!hasSections) {
          const renderer = () => {}
          renderer.type = 'mdx',
          renderer.permalink = siteRoot,
          renderer.source =  `${docsPathRoot}/README.md`, // "@site/" + `${docsPathRoot}/README.md`,
          renderer.frontMatter = {
            title: "ABC",
            description: "BCD"
          }
          renderer.metadata = {
            permalink: siteRoot,
          }
          renderer.toc = []

          const rootProps = await createData(`root-${name}.json`, JSON.stringify(props));

          addRoute({
            path: siteRoot,
            component: '@theme/MDXPage',
            modules: {
              content: rootProps
            },
            exact: true,
          });
          return
        }

        const rootProps = await createData(`root-${name}.json`, JSON.stringify(props));
        addRoute({
          path: siteRoot,
          component: '@site/src/templates/root.tsx',
          modules: {
            friends: rootProps,
          },
          exact: true,
        });

        if (!hasSections) return

        const known = ["guides", "tutorials", "usage"]
        const subnav = known.map(folder => docsPathRoot + "/" + folder ).filter(fs.existsSync)
  
        for (const section of subnav) {
          addRoute({
            path: siteRoot + path.basename(section),
            component: '@site/src/templates/section.tsx',
            modules: {
              friends: rootProps,
            },
            exact: true,
          });  
        }
      }
    },
  };
}

module.exports = docsRootPlugin

/**
 * @param {string} folderPath 
 * @returns {string[]}
 */
const recursiveReadDirSync = folderPath => {
  if (!fs.existsSync(folderPath)) return []

  const entryPaths = fs
    .readdirSync(folderPath)
    .map(entry => path.join(folderPath, entry))
  const filePaths = entryPaths.filter(entryPath =>
    fs.statSync(entryPath).isFile()
  )
  const dirPaths = entryPaths.filter(
    entryPath => !filePaths.includes(entryPath)
  )
  const dirFiles = dirPaths.reduce(
    (prev, curr) => prev.concat(recursiveReadDirSync(curr)),
    []
  )

  return [...filePaths, ...dirFiles].filter(f => !f.endsWith(".DS_Store"))
}
