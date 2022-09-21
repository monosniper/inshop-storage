import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import {Checkbox, Td} from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import shop from "../store/shop";
import EditProduct from "../components/modals/products/EditProduct";
import DeleteBtn from "../components/table/DeleteBtn";
import {observer} from "mobx-react-lite";

const Users = () => {
    const data = useMemo(() => shop.clients, [shop.clients])

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
            Header: 'Почта',
            accessor: 'email',
        },
        {
            Header: 'ФИО',
            accessor: 'fio',
        },
        // {
        //     Header: 'Возраст',
        //     accessor: 'age',
        //     filter: 'equal'
        // },
        {
            Header: 'Телефон',
            accessor: 'phone',
            filter: 'equal'
        },
        {
            Header: 'Адрес',
            accessor: 'address',
            filter: 'search'
        },
    ], [])

    const custom_filters = [
        {
            title: 'Телефон',
            accessor: 'phone',
            type: 'search',
        },
        {
            title: 'ФИО',
            accessor: 'fio',
            type: 'search',
            value: ''
        },
        {
            title: 'Адрес',
            accessor: 'address',
            type: 'search',
            value: ''
        },
    ]

    const custom_tds = {}

    const numeric = [
        'phone',
    ]

    const actions = [
        (row) => <EditProduct
            id={row.values.id}
            title={row.original.title}
            price={row.original.price}
            inStock={row.original.inStock}
            category={row.original.category}
        />,
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deleteClient(id)}
            requestItems={() => shop.requestClients()}
        />
    ]

    useEffect(() => {
        shop.requestClients()
    }, [])

    return (
        <>
            <Head>
                <title>Клиенты - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Клиенты</h1>

            <DataTable
                title={`Все клиенты (${data.length})`}
                data={data}
                columns={columns}
                numeric={numeric}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => shop.deleteClients(ids)}
                requestItems={() => shop.requestClients()}
            />
        </>
    );
};

export default observer(Users);