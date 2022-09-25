import React, {useEffect, useMemo} from 'react';
import Head from "next/head";
import {Td} from "@chakra-ui/react";
import DataTable from "../components/DataTable";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import AddCategory from "../components/modals/AddCategory";
import EditProduct from "../components/modals/products/EditProduct";
import DeleteBtn from "../components/table/DeleteBtn";
import EditCategory from "../components/modals/EditCategory";
import AddPromocode from "../components/modals/AddPromocode";
import EditPromocode from "../components/modals/EditPromocode";
import {FaTimesCircle} from "react-icons/fa";
import {AiFillCheckCircle} from "react-icons/ai";

const Promocodes = () => {
    const data = useMemo(() => shop.promocodes, [shop.promocodes])

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
            Header: 'Код',
            accessor: 'code',
        },
        {
            Header: 'Тип',
            accessor: 'type',
        },
        {
            Header: 'Значение',
            accessor: 'value',
        },
        {
            Header: 'Лимит',
            accessor: 'limit',
        },
        {
            Header: 'Активировано',
            accessor: 'activated_count',
        },
        {
            Header: 'Бесконечный',
            accessor: 'infinite',
        },
        {
            Header: 'Активен до',
            accessor: 'actual_until',
        }
    ], [])

    const custom_filters = [
        {
            title: 'Поиск',
            accessor: 'code',
            type: 'search',
            value: ''
        },
    ]

    const actions = [
        (row) => <EditPromocode
            {...row.original}
        />,
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deletePromocode(id)}
            requestItems={() => shop.requestPromocodes()}
        />
    ]

    const custom_tds = {
        infinite: (row, cell) => <Td {...cell.getCellProps()}>
            {row.original.infinite ? <AiFillCheckCircle /> : <FaTimesCircle /> }
        </Td>,
    }

    const numeric_ths = [
        'limit',
        'activated_count',
        'value',
    ]

    useEffect(() => {
        shop.requestPromocodes()
    }, [])

    return (
        <>
            <Head>
                <title>Промокоды - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Промокоды</h1>

            <DataTable
                title={`Все промокоды (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => shop.deletePromocodes(ids)}
                requestItems={() => shop.requestPromocodes()}
            />

            <AddPromocode />
        </>
    );
};

export default observer(Promocodes);