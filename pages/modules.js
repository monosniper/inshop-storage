import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import Modules from "../components/Modules";
import Card from "../components/Card";
import {$routes} from "../http/routes";
import store from "../store/store";

const ModulesPage = () => {
    const installedModules = useMemo(() => shop.modules, [shop.modules])
    const allModules = useMemo(() => store.modules, [store.modules])

    useEffect(() => {
        store.requestModules();
        shop.requestModules();
    }, [])

    return (
        <>
            <Head>
                <title>Модули - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Модули</h1>

            <Card
                title={`Установленные модули (${installedModules.length})`}
            >
                <Modules hasModule data={installedModules} />
            </Card>

            <Card
                title={`Все модули (${allModules.length})`}
            >
                <Modules data={allModules} />
            </Card>
        </>
    );
};

export default observer(ModulesPage);