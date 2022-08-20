import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import Card from "../components/Card";
import card_styles from '../styles/Card.module.scss'
import {BsArrowDown, BsArrowUp, BsSearch} from "react-icons/bs";
import {useTable, usePagination} from "react-table";
import styles from '../styles/Products.module.scss'
import {Button, Checkbox, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import Pagination from "../components/Pagination";
import ControlledPagination from "../components/ControlledPagination";
import DataTable from "../components/DataTable";
import {FaEdit} from "react-icons/fa";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import store from "../store/store";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import DeleteBtn from "../components/table/DeleteBtn";

const Products = () => {
    const data = useMemo(() => shop.products, [shop.products])

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
            Header: 'Картинка',
            accessor: 'img',
        },
        {
            Header: 'Название',
            accessor: 'title',
        },
        {
            Header: 'Категория',
            accessor: 'category_id',
        },
        {
            Header: 'В наличии',
            accessor: 'inStock',
            filter: 'inStock',
        },
        {
            Header: 'Цена',
            accessor: 'price',
            filter: 'between'
        }
    ], [])

    const custom_filters = [
        {
            title: 'Цена',
            accessor: 'price',
            type: 'between',
            value: []
        },
        {
            title: 'В наличии',
            accessor: 'inStock',
            type: 'check',
        },
        {
            title: 'Категория',
            accessor: 'category_id',
            type: 'select',
            options: shop.categories ? shop.categories.map(cat => {
                return {value: cat.id, text: cat.title}
            }) : []
        },
        {
            title: 'Поиск',
            accessor: 'title',
            type: 'search',
            value: ''
        },
    ]

    const actions = [
        (row) => <EditProduct
            {...row.original}
        />,
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deleteProduct(id)}
            requestItems={() => shop.requestProducts()}
        />
    ]

    const custom_tds = {
        img: (row, cell) => <Td {...cell.getCellProps()}>
            <img style={{maxWidth: 70}} src={row.original.preview_url} alt={`${row.original.title}`}/>
        </Td>,
        inStock: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            {cell.render('Cell')} шт.
        </Td>,
        price: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            ${cell.render('Cell')}
        </Td>,
        category_id: (row, cell) => <Td {...cell.getCellProps()}>
            {() => {
                const category = shop.categories.find(cat => cat.id === row.original.category_id)
                return category ? category.title : '';
            }}
        </Td>,
    }

    const numeric_ths = [
        'inStock',
        'price',
    ]

    useEffect(() => {
        shop.requestProducts()
    }, [])

    return (
        <>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Товары</h1>

            <DataTable
                title={`Все товары (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => shop.deleteProducts(ids)}
                requestItems={() => shop.requestProducts()}
            />

            <AddProduct />
        </>
    );
};

export default observer(Products);