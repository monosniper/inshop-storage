import React from 'react';
import { usePagination, DOTS } from '../hooks/usePagination';
import PrevIcon from '../public/assets/icons/prev.svg';
import NextIcon from '../public/assets/icons/next.svg';
import styles from '../styles/Pagination.module.scss'

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={styles.pagination__items}
        >
            <li
                className={
                    styles.pagination__item + ' ' + (currentPage === 1 ? styles.pagination__item_disabled : '')
                }
                onClick={onPrevious}
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
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={
                    styles.pagination__item + ' ' + (currentPage === lastPage ? styles.pagination__item_disabled : '')
                }
                onClick={onNext}
            >
                <div className={styles.pagination__item + ' ' + styles.pagination__arrow}>
                    <NextIcon />
                </div>
            </li>
        </ul>
    );
};

export default Pagination;