import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'wasmX',
  tagline: 'the only WASM-modular blockchain engine capable of regeneration and metamorphosis',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://wasmx.provable.dev',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'loredanacirstea', // Usually your GitHub org/user name.
  projectName: 'wasmx-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  trailingSlash: false, // works well with custom domain name & SEO

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'WebSite',
        name: "wasmX: the only WASM-modular blockchain engine capable of regeneration and metamorphosis",
        description: "wasmX: the only WASM-modular blockchain engine capable of regeneration and metamorphosis",
        url: "https://wasmx.provable.dev",
        logo: 'https://wasmx.provable.dev/img/wasmx.png',
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org/',
        '@type': 'SoftwareApplication',
        name: 'WasmX',
        alternateName: ['WasmX', 'MythosX'],
        operatingSystem: "Cross-platform",
        applicationCategory: "DeveloperApplication",
        url: "https://wasmx.provable.dev",
        description: "wasmX is the most flexible WebAssembly-based execution engine for smart contracts."
      }),
    },
  ],

  themes: ['@docusaurus/theme-mermaid'],
  // In order for Mermaid code blocks in Markdown to work,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      {
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
        },
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/loredanacirstea/wasmx-docs/tree/main',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/loredanacirstea/wasmx-docs/tree/main',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {name: 'keywords', content: 'wasm, blockchain, smart contracts, webassembly, cosmos sdk, ethereum, vm, cosmwasm, crypto'},
      {name: 'author', content: 'WasmX Team'},
      {name: 'theme-color', content: '#4a5568'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@lorecirstea'},
      {name: 'og:type', content: 'website'},
    ],
    // Replace with your project's social card
    image: 'img/wasmx.png',
    navbar: {
      title: 'wasmX',
      logo: {
        alt: 'wasmX logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'overview',
          to: '/docs/overview/introduction',
        },
        {to: '/blog', label: 'blog', position: 'left'},
        {
          href: 'https://github.com/loredanacirstea/wasmx-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Overview',
              to: '/docs/overview/introduction',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/wasmX',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/8W5jeBke4f',
            },
            {
              label: 'X',
              href: 'https://x.com/lorecirstea',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/loredanacirstea/wasmx-docs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} wasmX. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
      // default, neutral, dark, forest, base
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
