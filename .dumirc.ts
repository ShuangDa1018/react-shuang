import { defineConfig } from 'dumi';
import type { SiteThemeConfig } from 'dumi-theme-antd-style';

import { homepage, name } from './package.json';

const themeConfig: SiteThemeConfig = {
  name,
  logo: 'https://github.githubassets.com/favicons/favicon-dark.svg',

  socialLinks: { github: homepage },
  apiHeader: {
    pkg: name,
    sourceUrl: `{github}/tree/master/src/components/{atomId}/index.tsx`,
    docUrl: `{github}/tree/master/example/docs/components/{atomId}.{locale}.md`,
  },
  footer: 'Made with ❤️ by 蚂蚁集团 - AFX & 数字科技',
};

export default defineConfig({
  themeConfig,
  html2sketch: {},
  favicons: ['https://github.githubassets.com/favicons/favicon-dark.svg'],
  locales: [
    { id: 'en-US', name: 'English' },
    // { id: 'zh-CN', name: '中文' },
  ],
  alias: {
    // 'dumi-theme-antd-style': path.join(__dirname, '../src'),
  },
  styles: [
    `html, body { background: transparent;  }

  @media (prefers-color-scheme: dark) {
    html, body { background: #0E1116; }
  }`,
  ],
  // extraBabelPlugins: ['antd-style'],
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
});
