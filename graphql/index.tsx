'use client'

import { ROUTES } from '@/config'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

function createApolloClient() {
  const httpLink = new HttpLink({
    uri: ROUTES.api_route,
    fetchOptions: {
      credentials: 'include',
    },
  })

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

const client = createApolloClient()

export const GraphQLProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
