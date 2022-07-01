import React, {useMemo} from 'react';
import Head from "next/head";
import {Td} from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import AddCategory from "../components/AddCategory";

const Categories = () => {
    const data = useMemo(() => shop.categories, [shop.categories])

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
            Header: 'Иконка',
            accessor: 'icon',
        },
        {
            Header: 'Название',
            accessor: 'title',
        },
        {
            Header: 'Кол-во товаров',
            accessor: 'products_count',
        },
        {
            Header: '',
            accessor: 'actions',
        }
    ], [])

    const custom_filters = [
        {
            title: 'Кол-во товаров',
            accessor: 'products_count',
            type: 'between',
            value: []
        },
        {
            title: 'Поиск',
            accessor: 'title',
            type: 'search',
            value: ''
        },
    ]

    const custom_tds = {
        icon: (row, cell) => <Td {...cell.getCellProps()}>
            {/*<img src={`/assets/img/products/${row.original.id}.png`} alt={`${row.original.title}`}/>*/}
            <img src={`/assets/img/products/1.png`} alt={`${row.original.title}`}/>
        </Td>,
        actions: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            {/*<EditProduct*/}
            {/*    title={row.original.title}*/}
            {/*    price={row.original.price}*/}
            {/*    inStock={row.original.inStock}*/}
            {/*    category={row.original.category}*/}
            {/*/>*/}
        </Td>,
    }

    const numeric_ths = [
        'products_count',
    ]

    return (
        <>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Категории</h1>

            <DataTable
                title={`Все категории (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
            />

            <AddCategory />
        </>
    );
};

export default observer(Categories);