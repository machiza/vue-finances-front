import apollo from '@/plugins/apollo'

import AccontsQuery from './../graphql/Accounts.gql'

const accounts = async () => {
  const response = await apollo.query({
    query: AccontsQuery
  })
  return response.data.accounts
}

export default {
  accounts
}
