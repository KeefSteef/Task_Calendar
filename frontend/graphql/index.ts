import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const SERVER_URI: string = 'http://localhost:5000/graph'

const createApolloClient = () => {
  const link = new HttpLink({
    uri: SERVER_URI,
  })

  const authLink = setContext((_, { header }) => {
    return {
      ...header,
      authorization: localStorage.getItem('token') || '',
    }
  })

  return new ApolloClient({
    link: authLink.concat(link),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'network-only',
      },
    },
  })
}

export const apolloClient = createApolloClient()
