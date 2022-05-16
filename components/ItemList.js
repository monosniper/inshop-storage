import React, {useEffect, useMemo, useState} from 'react';
import styles from '../styles/ItemList.module.scss'
import Pagination from "./Pagination";

let PageSize = 10;

const ItemList = ({pagination=false, items}) => {
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        setCurrentPage(1)
    }, [])

    const currentListData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;

        return items.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

    return (
        <div className={styles.list}>
            <div className={styles.list__items}>
                {currentListData}
            </div>
            {pagination ?
                <div className={styles.list__footer}>
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={items.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            : null}
        </div>
    );
};

export default ItemList;