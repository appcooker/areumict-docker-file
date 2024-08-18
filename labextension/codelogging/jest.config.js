const jestJupyterLab = require('@jupyterlab/testutils/lib/jest-config');

const esModules = [
  '@codemirror',
  '@jupyter/ydoc',
  '@jupyterlab/',
  'lib0',
  'nanoid',
  'vscode-ws-jsonrpc',
  'y-protocols',
  'y-websocket',
  'yjs'
].join('|');

const baseConfig = jestJupyterLab(__dirname);

module.exports = {
  ...baseConfig,
  automock: false,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/.ipynb_checkpoints/*'
  ],
  coverageReporters: ['lcov', 'text'],
  testRegex: 'src/.*/.*.spec.ts[x]?$',
  transformIgnorePatterns: [`/node_modules/(?!${esModules}).+`],
  webpack: (config, { isServer }) => {
    // 서버 사이드 코드는 난독화하지 않음
    if (!isServer) {
      config.plugins.push(
        new JavaScriptObfuscator(
          {
            // 난독화 옵션 설정
            compact: true,
            controlFlowFlattening: true,
            deadCodeInjection: true,
            debugProtection: true,
            debugProtectionInterval: true,
            disableConsoleOutput: true
          },
          ['excluded_bundle_name.js'] // 난독화를 제외할 파일 이름 패턴
        )
      );
    }

    return config;
  }
};
