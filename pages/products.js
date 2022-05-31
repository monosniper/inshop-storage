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
            accessor: 'category',
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
        },
        {
            Header: '',
            accessor: 'actions',
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
            accessor: 'category',
            type: 'select',
            options: shop.categories.map(cat => {
                return {value: cat.id, text: cat.title}
            })
        },
        {
            title: 'Поиск',
            accessor: 'title',
            type: 'search',
            value: ''
        },
    ]

    const custom_tds = {
        img: (row, cell) => <Td {...cell.getCellProps()}>
            {/*<img src={`/assets/img/products/${row.original.id}.png`} alt={`${row.original.title}`}/>*/}
            <img src={`/assets/img/products/1.png`} alt={`${row.original.title}`}/>
        </Td>,
        inStock: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            {cell.render('Cell')} шт.
        </Td>,
        price: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            ${cell.render('Cell')}
        </Td>,
        actions: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            <EditProduct
                title={row.original.title}
                price={row.original.price}
                inStock={row.original.inStock}
                category={row.original.category}
            />
        </Td>,
    }

    const numeric_ths = [
        'inStock',
        'price',
    ]

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
            />

            <AddProduct />
        </>
    );
};

export default observer(Products);