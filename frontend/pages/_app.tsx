import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { apolloClient, createApolloClient } from '../graphql'
import Toasts from '../components/Toast/Toasts'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  return (
    <ApolloProvider client={apolloClient}>
      {!pathname.includes('authorization') && <Navbar />}
      <Component {...pageProps} />
      <Toasts />
    </ApolloProvider>
  )
}

export default MyApp
