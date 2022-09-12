import React, {useEffect, useState} from 'react';
import shop from "../store/shop";
import styles from "../styles/LayoutOption.module.scss";
import {Switch, Tooltip} from "@chakra-ui/react";

const ShopFilter = ({ filter }) => {
    const [active, setActive] = useState(filter.isActive)

    const handleChange = (e) => {
        setActive(e.target.checked)
        shop.toggleFilter(filter.id, e.target.checked).then(() => {
            shop.requestFilters()
        })
    }

    return (
        <div className={styles.option}>
            <div className={styles.option__header + ' ' + styles.option__header_filter}>
                <div className={styles.option__title}>{filter.title}</div>
                <Switch isChecked={active} onChange={handleChange} />
            </div>
        </div>
    );
};

export default ShopFilter;