import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.scss'
import Layout from "../components/Layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import store from "../store/store";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(store.authorized);

  useEffect(() => {
    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [$routes.login];
    const path = url.split('?')[0];

    if (!store.user && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: $routes.login,
        query: { returnUrl: router.asPath }
      });
    } else {
      setAuthorized(true);

      store.requestShops().then(() => store.requestShop())
    }
  }

  return <ChakraProvider>
    <Layout {...pageProps}>
      {authorized && <Component {...pageProps} />}
    </Layout>
  </ChakraProvider>
}

export default MyApp
