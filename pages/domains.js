import React, {useEffect, useMemo} from 'react';
import shop from "../store/shop";
import EditCategory from "../components/table/EditCategory";
import DeleteBtn from "../components/table/DeleteBtn";
import {Td} from "@chakra-ui/react";
import Head from "next/head";
import DataTable from "../components/DataTable";
import AddCategory from "../components/AddCategory";
import {observer} from "mobx-react-lite";
import store from "../store/store";
import Link from "next/link";
import {$routes} from "../http/routes";
import AddDomain from "../components/AddDomain";

const Domains = () => {
    const data = useMemo(() => store.domains, [store.domains])

    const columns = useMemo(() => [
        {
            Header: '',
            accessor: 'check',
        },
        {
            Header: '#',
            accessor: 'id',
        },
        {
            Header: 'Имя',
            accessor: 'fullname',
        },
        {
            Header: 'Магазин',
            accessor: 'shop',
        },
    ], [])

    const custom_filters = [
        {
            title: 'Магазин',
            accessor: 'shop',
            type: 'search',
            value: ''
        },
        {
            title: 'Поиск',
            accessor: 'name',
            type: 'search',
            value: ''
        },
    ]

    const actions = [
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => store.deleteDomain(id)}
            requestItems={() => store.requestDomains()}
        />
    ]

    const custom_tds = {
        shop: (row, cell) => <Td {...cell.getCellProps()}>
            {row.original.shop_id ? <Link href={$routes.shop(row.original.shop_id)}>
                {store.requestShop(row.original.shop_id).options.title}
            </Link> : null}
        </Td>,
    }

    const numeric_ths = []

    useEffect(() => {
        store.requestDomains()
    }, [])

    return (
        <>
            <Head>
                <title>Домены - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Домены</h1>

            <DataTable
                title={`Все Домены (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => store.deleteDomains(ids)}
                requestItems={() => store.requestDomains()}
            />

            <AddDomain />
        </>
    );
};

export default observer(Domains);