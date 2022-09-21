import React, {useEffect, useMemo} from 'react';
import shop from "../store/shop";
import EditCategory from "../components/modals/EditCategory";
import DeleteBtn from "../components/table/DeleteBtn";
import {Td} from "@chakra-ui/react";
import Head from "next/head";
import DataTable from "../components/DataTable";
import AddCategory from "../components/modals/AddCategory";
import AddReview from "../components/modals/AddReview";
import EditReview from "../components/modals/EditReview";

const Reviews = () => {
    const data = useMemo(() => shop.reviews, [shop.reviews])

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
            Header: 'Автор',
            accessor: 'author_name',
        },
        {
            Header: 'Контент',
            accessor: 'content',
        },
        {
            Header: 'Оценка',
            accessor: 'rating',
        },
        {
            Header: 'Дата',
            accessor: 'date',
        }
    ], [])

    const custom_filters = [
        {
            title: 'Поиск',
            accessor: 'author_name',
            type: 'search',
            value: ''
        },
    ]

    const actions = [
        (row) => <EditReview
            row={row.original}
        />,
        (row) => <DeleteBtn
            id={row.values.id}
            deleteItem={(id) => shop.deleteReview(id)}
            requestItems={() => shop.requestReviews()}
        />
    ]

    const custom_tds = {
        author_name: (row, cell) => <Td {...cell.getCellProps()}>
            <a href={row.original.author_url}>{row.original.author_name}</a>
        </Td>,
    }

    const numeric_ths = [
        'rating',
    ]

    useEffect(() => {
        shop.requestReviews()
    }, [])

    return (
        <>
            <Head>
                <title>Отзывы - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <h1 className={'page-title'}>Отзывы</h1>

            <DataTable
                title={`Все категории (${data.length})`}
                data={data}
                columns={columns}
                numeric_ths={numeric_ths}
                custom_tds={custom_tds}
                custom_filters={custom_filters}
                actions={actions}
                deleteMany={(ids) => shop.deleteReview(ids)}
                requestItems={() => shop.requestReviews()}
            />

            <AddReview />
        </>
    );
};

export default Reviews;