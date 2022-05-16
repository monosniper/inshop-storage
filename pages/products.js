import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import Card from "../components/Card";
import card_styles from '../styles/Card.module.scss'
import {BsArrowDown, BsArrowUp, BsSearch} from "react-icons/bs";
import {useTable, usePagination} from "react-table";
import styles from '../styles/Products.module.scss'
import {Checkbox, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import Pagination from "../components/Pagination";
import ControlledPagination from "../components/ControlledPagination";
import DataTable from "../components/DataTable";

const Products = () => {
    const data = useMemo(() => [
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
        {
            id: 1,
            title: 'Super puper sneackers u know',
            category: 'Кроссовки',
            inStock: 42,
            price: 180,
        },
    ], [])

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
        },
        {
            Header: 'Цена',
            accessor: 'price',
        }
    ], [])

    const custom_tds = {
        check: (row, cell) => <Td {...cell.getCellProps()}>
            <Checkbox size={'lg'} onChange={() => handleCheck(row.original.id)}></Checkbox>
        </Td>,
        img: (row, cell) => <Td {...cell.getCellProps()}>
            <img src={`/assets/img/products/${row.original.id}.png`} alt={`${row.original.title}`}/>
        </Td>,
        inStock: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            {cell.render('Cell')} шт.
        </Td>,
        price: (row, cell) => <Td {...cell.getCellProps()} isNumeric>
            ${cell.render('Cell')}
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
            />
        </>
    );
};

export default Products;