/* eslint-disable no-unused-vars */
const errorHandler = (err, vm, info) => {
  console.log('Vue [error handler]: ', err, info)
  const jwtErrors = ['jwt malformed', 'jwt expired', 'jwt not active', 'invalid token']
  if (jwtErrors.some(jwtError => err.message.includes(jwtError))) {
    vm.$router.push({
      path: '/login',
      query: { redirect: vm.$route.path }
    })
  }
}

const formatError = message => {
  const messageSplit = message.split(':')
  return messageSplit[messageSplit.length - 1].trim()
}

const groupBy = (array, key, makeCurrentKey) => {
  return array.reduce((accumulated, item) => {
    const currentKey = makeCurrentKey(item, key)
    return {
      ...accumulated,
      [currentKey]: [
        ...(accumulated[currentKey] || []),
        item
      ]
    }
  }, {})
}

const idx = (object, keyPath) => {
  const keys = keyPath.split('.')
  return keys.reduce(
    (obj, current) => (obj && obj[current] !== undefined) ? obj[current] : null, object
  )
}

const generateChartConfings = (opts) => {
  const { type } = opts

  return {
    type
  }
}

const currencyFormatter = ({ locale, currency } = { locale: 'pt-MZ', currency: 'MZN' }) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency
  })
}

const registerVuexModule = (rootStore, moduleName, store) => {
  if (!(moduleName in rootStore._modules.root._children)) {
    rootStore.registerModule(moduleName, store)
  }
}

export {
  currencyFormatter,
  groupBy,
  errorHandler,
  formatError,
  registerVuexModule
}
