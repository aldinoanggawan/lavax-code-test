import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import { useApollo } from '../apollo/client'
import GlobalStyle from '../styles/globalStyle'

const MyApp = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
