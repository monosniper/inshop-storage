import React, {useEffect, useMemo} from 'react';
import shop from "../store/shop";
import EditProduct from "../components/modals/products/EditProduct";
import DeleteBtn from "../components/table/DeleteBtn";
import {Td} from "@chakra-ui/react";
import Head from "next/head";
import DataTable from "../components/DataTable";
import AddProduct from "../components/modals/products/AddProduct";
import {observer} from "mobx-react-lite";
import {AiFillCheckCircle} from "react-icons/ai";
import styles from '../styles/Orders.module.scss'

const Orders = () => {
    const data = useMemo(() => shop.orders, [shop.orders])

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
            Header: 'Клиент',
            accessor: 'shipping_data',
        },
        {
            Header: 'Товары',
            accessor: 'products',
        },
        {
            Header: 'Общая сумма',
            accessor: 'sum',
        },
        {
            Header: 'Оплачен',
            accessor: 'payed',
        },
        {
            Header: 'Дата создания',
            accessor: 'created_at',
        },
    ], [])

    const custom_filters = []

    const actions = [
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deleteOrder(id)}
            requestItems={() => shop.requestOrders()}
        />
    ]

    const trans_shipping_data = {
        name: 'Имя',
        email: 'Почта',
        phone: 'Телефон',
        address: 'Адрес',
    }

    const custom_tds = {
        shipping_data: (row, cell) => <Td {...cell.getCellProps()}>
            {Object.entries(row.original.shipping_data).map((user_row, i) => {
                return <div className={styles['shipping-data']} key={'shipping_data-' + row.original.id + '-' + i}>
                    <span className={styles['shipping-data__key']}>{trans_shipping_data[user_row[0]]}</span>
                    <span className={styles['shipping-data__value']}>{user_row[1]}</span>
                </div>
            })}
        </Td>,
        products: (row, cell) => {
            return <Td {...cell.getCellProps()}>
                {row.original.products.map((product, i) => <div style={{margin: '.5rem 0'}} key={'props-'+row.original.id+'-'+i}>
                    <b>{product.title}</b> <br/>
                    {product.selectedProps.map((prop, i) => {
                        return <div className={styles['shipping-data']} key={'shipping_data-' + row.original.id + '-' + i}>
                            <span className={styles['shipping-data__key']}>{prop.title}</span>
                            <span className={styles['shipping-data__value']}>{prop.value}</span>
                        </div>
                    })}
                </div>)}
            </Td>
        },
        payed: (row, cell) => <Td {...cell.getCellProps()}>
            {row.original.payed ? <AiFillCheckCircle /> : null}
        </Td>,
    }

    const numeric_ths = [
        'sum',
    ]

    useEffect(() => {
        shop.requestOrders()
    }, [])

    return (
        <>
            <Head>
                <title>Заказы - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <h1 className={'page-title'}>Заказы</h1>

            <DataTable
                title={`Все заказы (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => shop.deleteOrders(ids)}
                requestItems={() => shop.requestOrders()}
            />
        </>
    );
};

export default observer(Orders);