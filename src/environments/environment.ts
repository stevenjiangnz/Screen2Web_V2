// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const settings = {
  apiBaseUrl: 'http://localhost:8002/api',
  general: {
    stockWindow: 20000,
    zone: 'current',
  },
  indicatorSettings: {
    'sma5': {
      'parameter': 'sma,5',
      'ownPane': false,
      'color': '#aaa'
    },
    'sma10': {
      'parameter': 'sma,10',
      'ownPane': false,
      'color': '#FFD455'
    },
    'sma30': {
      'parameter': 'sma,30',
      'ownPane': false,
      'color': '#61B60C'
    },
    'sma50': {
      'parameter': 'sma,50',
      'color': '#00FF00',
      'ownPane': false
    },
    'sma200': {
      'parameter': 'sma,200',
      'ownPane': false,
      'color': '#0FE4E4'
    },
    'ema10': {
      'parameter': 'ema,10',
      'ownPane': false,
      'color': '#AE2EAE'
    },
    'ema20': {
      'parameter': 'ema,20',
      'ownPane': false,
      'color': '#FF0055'
    },
    'bb': {
      'parameter': 'bb,20,2.5',
      'ownPane': false,
      'color': '#ffffff'
    },
    'closemain': {
      'parameter': 'closemain',
      'color': '#FFFF55',
      'ownPane': false
    },
    // 'macd': {
    //   'parameter': 'macd',
    //   'ownPane': true,
    //   'color': '#55D4FF',
    //   'height': 120
    // },
    'rsi': {
      'parameter': 'rsi,6',
      'ownPane': true,
      'color': '#7F2AFF',
      'colorRsi': '#AAFFFF',
      'height': 100
    },
    'adx': {
      'parameter': 'adx',
      'ownPane': true,
      'color': '#FF55AA',
      'colorAdx': '#FFFFFF',
      'colorDiPlus': '#2AFF2A',
      'colorDiMinus': '#FF55D4',
      'height': 180
    },
    'macd': {
      'parameter': 'macd,26,12,9',
      'ownPane': true,
      'color': '#FF55AA',
      'colorMacd': '#2AFF2A',
      'colorSignal': '#FF55D4',
      'colorHist': '#E1E1E1',
      'height': 150
    },
    'heikin': {
      'parameter': 'heikin',
      'ownPane': true,
      'color': '#AAAAFF',
      'height': 150
    },
    'stochastic': {
      'parameter': 'stochastic,14,3',
      'ownPane': true,
      'color': '#FFAA00',
      'colorK': '#2AFF2A',
      'colorD': '#FF55D4',
      'height': 120,
      'threshold1': 30,
      'threshold2': 70
    },
    'william': {
      'parameter': 'william,14',
      'ownPane': true,
      'color': '#AAFF2A',
      'colorWilliam': '#FFFF2A',
      'height': 100,
      'threshold1': -20,
      'threshold2': -80
    }
  }
};

export const environment = {
  production: false,
  testProp: 'from dev',
  appSettings: settings
};

