'use client'

import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const hardcodedToken =
  '52ae95c456043efe140927cb569de1a6cfb5c041b263afa539a702ac68b223e27f49143e343e34f5b1d42423ca299f6aa048f3ae8eef589d3c7e6da845234dc7'

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: 'https://take-home-be.onrender.com/api',
  })

  const authLink = setContext((_, { headers }) => {
    const token = typeof window !== 'undefined' ? hardcodedToken : ''
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  if (typeof window === 'undefined') {
    return new ApolloClient({
      ssrMode: true,
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
  }

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'wss://take-home-be.onrender.com/api',
      connectionParams: () => {
        const token = hardcodedToken
        return { authToken: token }
      },
    })
  )

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    authLink.concat(httpLink)
  )

  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  })
}

const client = createApolloClient()

export const GraphQLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
