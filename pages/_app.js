import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.scss'
import Layout from "../components/layout/Layout";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {$routes} from "../http/routes";
import store from "../store/store";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import NoShop from "./no_shop";
import Loading from "../components/layout/Loading";
import '@draft-js-plugins/static-toolbar/lib/plugin.css';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const [isNoShop, setIsNoShop] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const publicPaths = [
      $routes.index,
      $routes.no_shop,
      $routes.shops.create
  ]

  useEffect(() => {
      store.checkAuth().then(rs => {
          store.requestShops()

          setLoading(false)

          if(!rs.ok) {
              router.push({
                  pathname: $routes.login,
                  query: { returnUrl: router.asPath }
              });
          }

          if(!publicPaths.includes(router.asPath.split('?')[0]) && !shop.id) {
              setIsNoShop(true)
          }
      })
  }, [])

    useEffect(() => {
        if(store.authorized && !publicPaths.includes(router.asPath.split('?')[0]) && !shop.id) {
            setIsNoShop(true)
        } else {
            setIsNoShop(false)
        }
    }, [router.asPath])

  return <ChakraProvider>
    <Layout {...pageProps}>
        {isLoading ? <Loading /> : isNoShop ? <NoShop /> : <Component {...pageProps} />}
    </Layout>
  </ChakraProvider>
}

export default observer(MyApp)
