const path = require("path")

/** @type import("@docusaurus/types").DocusaurusConfig */
module.exports = {
  title: "My Site",
  tagline: "The tagline of my site",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "danger",
  projectName: "danger",
  themeConfig: {
    navbar: {
      title: "Danger",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "js/",
          activeBasePath: "/",
          label: "JS",
          position: "left",
          items: [
            {
              label: "Get Started",
              href: "...",
            },
            {
              label: "Guides",
              href: "...",
            },
            {
              label: "Usage",
              href: "...",
            },
            {
              label: "Reference",
              href: "...",
            },
            {
              label: "Playground",
              href: "...",
            },
            {
              label: "Repo",
              href: "https://github.com/danger/danger-js",
            },
          ],
        },
        {
          to: "swift/",
          activeBasePath: "/",
          label: "Swift",
          position: "left",
          items: [
            {
              label: "Get Started",
              href: "...",
            },
            {
              label: "Guides",
              href: "...",
            },
            {
              label: "Usage",
              href: "...",
            },
            {
              label: "Reference",
              href: "...",
            },
            {
              label: "Playground",
              href: "...",
            },
            {
              label: "Repo",
              href: "https://github.com/danger/swift",
            },
          ],
        },
        {
          to: "js/",
          activeBasePath: "/",
          label: "Kotlin",
          position: "left",
          items: [
            {
              label: "Get Started",
              href: "...",
            },
            {
              label: "Guides",
              href: "...",
            },
            {
              label: "Usage",
              href: "...",
            },
            {
              label: "Reference",
              href: "...",
            },
            {
              label: "Playground",
              href: "...",
            },
            {
              label: "Repo",
              href: "https://github.com/danger/danger-js",
            },
          ],
        },

        {
          to: "/ruby",
          activeBasePath: "/",
          label: "Ruby",
          position: "left",
          items: [
            {
              label: "Get Started",
              href: "...",
            },
            {
              label: "Guides",
              href: "...",
            },
            {
              label: "Usage",
              href: "...",
            },
            {
              label: "Reference",
              href: "...",
            },
            {
              label: "Playground",
              href: "...",
            },
            {
              label: "Repo",
              href: "https://github.com/danger/danger-js",
            },
          ],
        },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Style Guide",
              to: "docs/",
            },
            {
              label: "Second Doc",
              to: "docs/doc2/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  themes: ['./plugins/docusaurus-theme-shiki-twoslash'],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/facebook/docusaurus/edit/master/website/",
          routeBasePath: "/",
          // beforeDefaultRemarkPlugins: [
          //   // require('remark-shiki-twoslash') 
          //   [require("remark-shiki-twoslash").default, { 
          //     theme: "github-light",
          //     useNodeModules: true,
          //     nodeModulesTypesPath: path.join(__dirname, "node_modules"),
          //    }]
          // ],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
