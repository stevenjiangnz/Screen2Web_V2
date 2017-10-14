// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const settings = {
  apiBaseUrl: 'http://localhost:8002/api',
  general: {
    stockWindow: 40000,
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
  },
  chartTheme: {
    colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#2a2a2b'],
          [1, '#3e3e40']
        ]
      },
      plotBorderColor: '#606063',
      lineWidth: 1
    },

    title: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '20px'
      }
    },
    subtitle: {
      style: {
        color: '#E0E0E3',
        textTransform: 'uppercase',
        fontSize: '13px'
      }
    },
    xAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3',
          fontSize: '13px'
        }
      },
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      title: {
        style: {
          color: '#A0A0A3',
          fontSize: '13px'
        }
      }
    },
    yAxis: {
      gridLineColor: '#707073',
      labels: {
        style: {
          color: '#E0E0E3',
          fontSize: '13px'
        }
      },
      offset: 30,
      lineColor: '#707073',
      minorGridLineColor: '#505053',
      tickColor: '#707073',
      tickWidth: 1,
      title: {
        style: {
          color: '#A0A0A3',
          fontSize: '13px'
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      style: {
        color: '#000000',
        fontSize: '14px'
      },
      hideDelay: 0
    },
    plotOptions: {
      series: {
        dataLabels: {
          color: '#B0B0B3'
        },
        marker: {
          lineColor: '#333'
        }
      },
      boxplot: {
        fillColor: '#505053'
      },
      candlestick: {
        lineColor: 'white'
      },
      errorbar: {
        color: 'white'
      }
    },
    legend: {
      itemStyle: {
        color: '#E0E0E3'
      },
      itemHoverStyle: {
        color: '#FFF'
      },
      itemHiddenStyle: {
        color: '#606063'
      }
    },
    credits: {
      style: {
        color: '#666'
      },
      enabled: false
    },


    labels: {
      style: {
        color: '#707073'
      }
    },

    drilldown: {
      activeAxisLabelStyle: {
        color: '#F0F0F3'
      },
      activeDataLabelStyle: {
        color: '#F0F0F3'
      }
    },

    navigation: {
      buttonOptions: {
        symbolStroke: '#DDDDDD',
        theme: {
          fill: '#505053'
        }
      }
    },
    // scroll charts
    rangeSelector: {
      buttonTheme: {
        fill: '#505053',
        stroke: '#000000',
        style: {
          color: '#CCC'
        },
        states: {
          hover: {
            fill: '#707073',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          },
          select: {
            fill: '#000003',
            stroke: '#000000',
            style: {
              color: 'white'
            }
          }
        }
      },
      inputBoxBorderColor: '#505053',
      inputStyle: {
        backgroundColor: '#333',
        color: 'silver'
      },
      labelStyle: {
        color: 'silver'
      }
    },

    navigator: {
      handles: {
        backgroundColor: '#666',
        borderColor: '#AAA'
      },
      outlineColor: '#CCC',
      maskFill: 'rgba(255,255,255,0.1)',
      series: {
        color: '#7798BF',
        lineColor: '#A6C7ED'
      },
      xAxis: {
        gridLineColor: '#505053'
      }
    },
    scrollbar: {
      barBackgroundColor: '#808083',
      barBorderColor: '#808083',
      buttonArrowColor: '#CCC',
      buttonBackgroundColor: '#606063',
      buttonBorderColor: '#606063',
      rifleColor: '#FFF',
      trackBackgroundColor: '#404043',
      trackBorderColor: '#404043'
    },
    // special colors for some of the
    legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    background2: '#505053',
    dataLabelsColor: '#B0B0B3',
    textColor: '#C0C0C0',
    contrastTextColor: '#F0F0F3',
    maskColor: 'rgba(255,255,255,0.3)'
  }
};

export const environment = {
  production: false,
  testProp: 'from dev',
  appSettings: settings
};

