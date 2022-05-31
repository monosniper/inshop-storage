import React from 'react';
import PrevIcon from '../public/assets/icons/prev.svg';
import NextIcon from '../public/assets/icons/next.svg';
import styles from '../styles/Pagination.module.scss'
import {DOTS, usePagination} from "../hooks/usePagination";

const ControlledPagination = (props) => {

    const paginationRange = usePagination({
        currentPage: props.pageIndex,
        totalCount: props.totalCount,
        siblingCount: 1,
        pageSize: props.pageSize
    });

    const currentPage = props.pageIndex+1;

    return (
        <ul
            className={styles.pagination__items}
        >
            <li
                className={
                    styles.pagination__item + ' ' + (currentPage === 1 ? styles.pagination__item_disabled : '')
                }
                onClick={props.previousPage}
            >
                <span className={styles.pagination__item + ' ' + styles.pagination__arrow}>
                    {<PrevIcon />}
                </span>
            </li>
            {paginationRange.map((pageNumber, i) => {
                if (pageNumber === DOTS) {
                    return <li className={styles.pagination__item}>&#8230;</li>;
                }

                return (
                    <li
                        key={'page-'+i}
                        className={
                            styles.pagination__item + ' ' + styles.pagination__page + ' ' + (pageNumber === currentPage ? styles.pagination__page_active : '')
                        }
                        onClick={() => props.gotoPage(pageNumber-1)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={
                    styles.pagination__item + ' ' + (currentPage === props.pageCount ? styles.pagination__item_disabled : '')
                }
                onClick={props.nextPage}
            >
                <div className={styles.pagination__item + ' ' + styles.pagination__arrow}>
                    <NextIcon />
                </div>
            </li>
        </ul>
    );
};

export default ControlledPagination;