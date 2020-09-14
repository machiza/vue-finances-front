import actions from './actions'
import mutations from './mutetions'

const state = {
  filters: undefined,
  isFiltering: false,
  month: undefined
}

export default {
  namespace: true,
  state,
  actions,
  mutations
}
