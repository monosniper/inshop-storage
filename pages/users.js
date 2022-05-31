import React, {useMemo} from 'react';
import Head from "next/head";
import {Checkbox, Td} from "@chakra-ui/react";
import DataTable from "../components/DataTable";

const Users = () => {
    const data = useMemo(() => [
        {
            id: 1,
            fio: 'Имя Фамилия',
            age: 22,
            email: 'testemail@example.com',
        },
        {
            id: 1,
            fio: 'Имя Фамилия',
            age: 22,
            email: 'testemail@example.com',
        },
        {
            id: 1,
            fio: 'Имя Фамилия',
            age: 22,
            email: 'testemail@example.com',
        },
        {
            id: 1,
            fio: 'Имя Фамилия',
            age: 22,
            email: 'testemail@example.com',
        },
        {
            id: 1,
            fio: 'Имя Фамилия',
            age: 22,
            email: 'testemail@example.com',
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
            Header: 'ФИО',
            accessor: 'fio',
        },
        {
            Header: 'Возраст',
            accessor: 'age',
            filter: 'equal'
        },
        {
            Header: 'Почта',
            accessor: 'email',
        },
    ], [])

    const custom_filters = [
        {
            title: 'Возраст',
            accessor: 'age',
            type: 'equal',
        },
        {
            title: 'Поиск',
            accessor: 'fio',
            type: 'search',
            value: ''
        },
    ]

    const custom_tds = {
        fio: (row, cell) => <Td {...cell.getCellProps()} style={{display: 'flex', gap: '.3rem', alignItems: 'center'}}>
            <img src={`/assets/img/users/${row.original.id}.png`} style={{width: 40}} alt={`${row.original.fio}`}/>
            <span>{row.original.fio}</span>
        </Td>,
    }

    const numeric = [
        'age',
    ]

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
            />
        </>
    );
};

export default Users;