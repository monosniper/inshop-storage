import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import {Td} from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import AddCategory from "../components/AddCategory";
import EditProduct from "../components/EditProduct";
import DeleteBtn from "../components/table/DeleteBtn";
import EditCategory from "../components/table/EditCategory";

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

    const actions = [
        (row) => <EditCategory
            row={row.original}
            title={row.original.title}
        />,
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deleteCategory(id)}
            requestItems={() => shop.requestCategories()}
        />
    ]

    const custom_tds = {
        icon: (row, cell) => <Td {...cell.getCellProps()}>
            <img style={{maxWidth: 70}} src={row.original.icon_url} alt={`${row.original.title}`}/>
        </Td>,
    }

    const numeric_ths = [
        'products_count',
    ]

    useEffect(() => {
        shop.requestCategories()
    }, [])

    return (
        <>
            <Head>
                <title>Категории - {process.env.NEXT_PUBLIC_APP_NAME}</title>
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
                actions={actions}
                deleteMany={(ids) => shop.deleteCategories(ids)}
                requestItems={() => shop.requestCategories()}
            />

            <AddCategory />
        </>
    );
};

export default observer(Categories);