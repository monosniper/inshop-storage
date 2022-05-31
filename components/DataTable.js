import React, {useState} from 'react';
import {Button, Checkbox, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import styles from "../styles/Products.module.scss";
import {BsArrowDown, BsArrowUp, BsSearch} from "react-icons/bs";
import Card from "./Card";
import {usePagination, useTable, useFilters, useGlobalFilter, useSortBy} from "react-table";
import card_styles from "../styles/Card.module.scss";
import ControlledPagination from "./ControlledPagination";

function ToolBox({
                     custom_filters,
                     filters,
                     setFilters,
                     setActiveRows,
                     data,
                     activeRows,
                     preGlobalFilteredRows,
                     globalFilter,
                     setGlobalFilter,
                     setFilter,
                     rows,
                 }) {
    const handleFilterChange = (accessor, value, isGlobal=false) => {
        const newFilters = [...filters]

        newFilters.map(filter => {
            if (filter.accessor === accessor) {
                filter.value = value;
            }

            return filter
        })

        setFilter(accessor, value)

        isGlobal && setGlobalFilter(value || undefined)
    }

    const getValue = (accessor) => filters.find(filter => filter.accessor === accessor).value

    const generateFilter = {
        select: ({i, accessor, options, title}) => <div key={'filter-select-' + i}
                                                        className={card_styles.field + ' ' + card_styles.field_min}>
            <Select placeholder={title} className={card_styles.field__input}
                    onChange={e => handleFilterChange(accessor, e.target.value)}>
                {options.map((option, i) => <option value={option.value}>{option.text}</option>)}
            </Select>
        </div>,
        check: ({i, accessor, title}) => <div key={'filter-check-' + i}
                                              className={card_styles.field + ' ' + card_styles.field_out + ' ' + card_styles.field_check}>
            <Checkbox isChecked={getValue(accessor)} size={'lg'}
                      onChange={e => handleFilterChange(accessor, e.target.checked)}></Checkbox>
            <span onClick={e => handleFilterChange(accessor, !getValue(accessor))}
                  className={card_styles.field__title}>{title}</span>
        </div>,
        search: ({i, accessor}) => <div key={'filter-search-' + i} className={card_styles.field}>
            <span className={card_styles.field__icon}><BsSearch/></span>
            <input type="text" className={card_styles.field__input}
                   onChange={e => handleFilterChange(accessor, e.target.value, true)} placeholder={'Поиск'}
                   value={getValue(accessor)}/>
        </div>,
        equal: ({i, accessor, title}) => <div key={'filter-equal-' + i} className={card_styles.field + ' ' + card_styles.field_out + ' ' + card_styles.field_check}>
            <span className={card_styles.field__title}>{title}</span>
            <div key={'filter-equal-' + i} className={card_styles.field + ' ' + card_styles.field_xs}>

                <input type="number" className={card_styles.field__input}
                       onChange={e => handleFilterChange(accessor, e.target.value, true)} placeholder={'18'}
                       value={getValue(accessor)}/>
            </div>
        </div>,
        between: ({i, accessor, title}) => <div key={'filter-between-' + i} className={card_styles.field_between}>
            <div className={card_styles.field + ' ' + card_styles.field_xs}>
                <input type="number" className={card_styles.field__input}
                       onChange={e => handleFilterChange(accessor, (old = []) => [e.target.value ? parseInt(e.target.value, 10) : undefined, old[1]])} placeholder={'От'}
                       value={getValue(accessor)[0]}/>
            </div>
            <span> - </span>
            <div className={card_styles.field + ' ' + card_styles.field_xs}>
                <input type="number" className={card_styles.field__input}
                       onChange={e => handleFilterChange(accessor, (old = []) => [old[0], e.target.value ? parseInt(e.target.value, 10) : undefined])} placeholder={'До'}
                       value={getValue(accessor)[1]}/>
            </div>
        </div>
    }

    const handleSelectAll = () => {
        setActiveRows(rows.map(row => row.values['id']))
    }

    const handleUnselectAll = () => {
        setActiveRows([])
    }

    const handleDeleteAll = () => {
        console.log('handleDeleteAll', activeRows)
    }

    return <div className={card_styles.card__toolbox}>
        <div className={card_styles.card__toolbox__top}>
            {custom_filters.map((filter, i) => generateFilter[filter.type]({...filter, i}))}
        </div>
        <div className={card_styles.card__toolbox__footer}>
            <Button colorScheme='blue' onClick={handleSelectAll}>Выбрать все</Button>
            <Button colorScheme='blue' onClick={handleUnselectAll}>Снять выделение</Button>
            <Button colorScheme='red' onClick={handleDeleteAll}>Удалить выбранное</Button>
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
                       title,
                       data,
                       columns,
                       numeric_ths = [],
                       custom_tds = [],
                       check = true,
                       custom_filters = []
                   }) => {

    const [filters, setFilters] = useState(custom_filters)
    const [activeRows, setActiveRows] = useState([])

    const handleCheck = (id) => {
        setActiveRows(activeRows.includes(id) ? activeRows.filter(i => i !== id) : [...activeRows, id])
    }

    if (check) custom_tds.check = (row, cell) => <Td {...cell.getCellProps()}>
        <Checkbox isChecked={activeRows.includes(row.original.id)} size={'lg'}
                  onChange={() => handleCheck(row.original.id)}></Checkbox>
    </Td>

    function inStockFilterFn(rows, id, filterValue) {
        return rows.filter(row => filterValue ? row.values['inStock'] > 0 : row.values['inStock'] >= 0);
    }

    const filterTypes = React.useMemo(
        () => ({
            inStock: inStockFilterFn,
        }),
        []
    )

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: {pageIndex: 0, pageSize: 10},
            // defaultColumn,
            filterTypes,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
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
        setGlobalFilter,
        preGlobalFilteredRows,
        setFilter,
        rows,
        state: {
            pageIndex,
            pageSize,
            globalFilter,
        },
    } = tableInstance

    return (
        <Card
            title={title}
            toolBox={<ToolBox
                filters={filters}
                custom_filters={custom_filters}
                setFilters={setFilters}
                setActiveRows={setActiveRows}
                data={data}
                activeRows={activeRows}
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                setFilter={setFilter}
                rows={rows}
            />}
            footer={<TableFooter
                pageIndex={pageIndex}
                totalCount={data.length}
                pageSize={pageSize}
                gotoPage={gotoPage}
                nextPage={nextPage}
                previousPage={previousPage}
                setPageSize={setPageSize}
            />}
        >
            <TableContainer>
                <Table variant='simple'>
                    <Thead {...getTableProps()}>
                        {
                            headerGroups.map((headerGroup, tr_i) => (
                                <Tr key={'data-head-tr-' + tr_i} {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column, th_i) => (
                                        <Th
                                            key={'data-head-th-' + th_i}
                                            className={styles.th}
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            isNumeric={numeric_ths.indexOf(column.id) !== -1}
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
                            page.map((row, tr_i) => {
                                prepareRow(row)
                                return (
                                    <Tr key={'data-body-tr-' + tr_i} {...row.getRowProps()}>
                                        {
                                            row.cells.map(cell => {
                                                return custom_tds[cell.column.id] ? custom_tds[cell.column.id](row, cell) : (
                                                    <Td isNumeric={numeric_ths.indexOf(cell.column.id) !== -1} {...cell.getCellProps()}>{cell.render('Cell')}</Td>
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