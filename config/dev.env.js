'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  POC_API: '"http://127.0.0.1/api"',
  SOC_API: '"http://127.0.0.1/api"',
  // POC_API: '"http://x.com:30274/api"',
  // SOC_API: '"http://x.com:30274/api"',
})
