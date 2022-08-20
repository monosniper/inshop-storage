import Head from 'next/head'
import React, {useEffect, useMemo, useState} from "react";
import {Grid, GridItem} from "@chakra-ui/react";
import Card from "../components/Card";
import Product from "../components/Product";
import ItemList from "../components/ItemList";
import UserItem from "../components/UserItem";
import {$routes} from "../http/routes";
import store from "../store/store";
import Shops from "../components/Shops";
import {observer} from "mobx-react-lite";

const Home = () => {
    const [topSellers, setTopSellers] = useState([])
    const [lastClients, setLastClients] = useState([])
    const shops = useMemo(() => store.shops, [store.shops])

    useEffect(() => {
        store.requestShops()
        setTopSellers([
            {
                id: 1,
                title: 'asd',
                sell_count: 22,
            },
            {
                id: 1,
                title: 'asd',
                sell_count: 22,
            },
            {
                id: 1,
                title: 'asd',
                sell_count: 22,
            },
        ].map((item, i) => <Product key={'top-seller-product-'+i} {...item} />))

        setLastClients([
            {
                id: 1,
                name: 'asd',
                age: 22,
                last_visit: new Date(Date.now() - 3600 * 1000 * 4),
                isOnline: true,
            },
            {
                id: 1,
                name: 'asd',
                age: 22,
                last_visit: new Date(Date.now() - 3600 * 1000 * 4),
                isOnline: false,
            },
            {
                id: 1,
                name: 'asd',
                age: 22,
                last_visit: new Date(Date.now() - 3600 * 1000 * 4),
                isOnline: true,
            },
        ].map((item, i) => <UserItem key={'last-client-'+i} {...item} />))
    }, [])

    return <>
        <Head>
            <title>Личный кабинет - {process.env.NEXT_PUBLIC_APP_NAME}</title>
            <meta name="description" content='{ props.description }' />
            {/*<link rel="icon" href="/favicon.ico" />*/}
        </Head>

        <h1 className={'page-title'}>Личный кабинет</h1>

        <Card
            title={`Ваши магазины (${store.shops.length})`}
            style={{marginBottom: '1rem'}}
            linkHref={$routes.shops.create}
            linkText={'Создать магазин'}
        >
            <Shops data={shops} />
        </Card>

        <Grid templateColumns='repeat(2, 1fr)' gap={4}>
            <GridItem w='100%'>
                <Card
                    title='Самое продаваемое'
                    linkText={'Все товары'}
                    linkHref={$routes.products}
                >
                    <ItemList
                        items={topSellers}
                        pagination
                    />
                </Card>
            </GridItem>
            <GridItem w='100%'>
                <Card
                    title='Новые клиенты'
                    linkText={'Все клиенты'}
                    linkHref={$routes.users}
                >
                    <ItemList
                        items={lastClients}
                        pagination
                    />
                </Card>
            </GridItem>
        </Grid>
    </>
};

export default observer(Home);