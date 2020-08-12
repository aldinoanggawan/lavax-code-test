import { useMemo } from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  })
}

export const initializeApollo = (initialState: any = null) => {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If the page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const useApollo = (initialState: any) => {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
