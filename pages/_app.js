import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.scss'
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return <ChakraProvider>
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
}

export default MyApp
