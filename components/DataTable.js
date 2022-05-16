import React, {useState} from 'react';
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import styles from "../styles/Products.module.scss";
import {BsArrowDown, BsArrowUp, BsSearch} from "react-icons/bs";
import Card from "./Card";
import {usePagination, useTable} from "react-table";
import card_styles from "../styles/Card.module.scss";
import ControlledPagination from "./ControlledPagination";

function ToolBox() {
    const [query, setQuery] = useState('')

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    return <div className={card_styles.card__toolbox}>
        <div className={card_styles.field}>
            <span className={card_styles.field__icon}><BsSearch/></span>
            <input type="text" className={card_styles.field__input} onChange={handleSearch} placeholder={'Поиск'}
                   value={query}/>
        </div>
    </div>;
}

function TableFooter(props) {
    return <>
        <ControlledPagination
            {...props}
        />

        <div className={card_styles.field} style={{width: 160}}>
                        <span className={card_styles.field__icon}>
                            Страница:
                        </span>
            <input
                type="number"
                className={card_styles.field__input}
                defaultValue={props.pageIndex + 1}
                onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    props.gotoPage(page)
                }}
            />
        </div>

        <div className={card_styles.field} style={{width: 150}}>
            <select
                value={props.pageSize}
                className={card_styles.field__input}
                onChange={e => {
                    props.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Показать {pageSize}
                    </option>
                ))}
            </select>
        </div>
    </>;
}

const DataTable = ({
                       title, data, columns, numeric=[], custom_tds=[]
                   }) => {

    const tableInstance = useTable(
        {columns, data, initialState: {pageIndex: 0, pageSize: 2}}
        , usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = tableInstance

    const handleCheck = (id) => {
        console.log(id)
    }

    return (
        <Card
            title={title}
            toolBox={<ToolBox/>}
            footer={<TableFooter
                pageIndex={pageIndex}
                totalCount={data.length}
                pageSize={pageSize}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
            />}
        >
            <TableContainer>
                <Table variant='simple'>
                    <Thead {...getTableProps()}>
                        {
                            headerGroups.map(headerGroup => (
                                <Tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <Th
                                            className={styles.th}
                                            {...column.getHeaderProps()}
                                            isNumeric={numeric.indexOf(column.id) !== -1}
                                        >
                                            {column.render('Header')}
                                            <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? <BsArrowDown/>
                                                            : <BsArrowUp/>
                                                        : ''}
                                                </span>
                                        </Th>
                                    ))}
                                </Tr>
                            ))
                        }
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {
                            page.map(row => {
                                prepareRow(row)
                                return (
                                    <Tr {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return custom_tds[cell.column.id] ? custom_tds[cell.column.id](row, cell) : (
                                                    <Td isNumeric={numeric.indexOf(cell.column.id) !== -1} {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                                                )
                                            })}

                                    </Tr>
                                )
                            })
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    );
};

export default DataTable;