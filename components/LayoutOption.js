import React, {useEffect, useMemo, useState} from 'react';
import styles from "../styles/LayoutOption.module.scss";
import {Switch, Tooltip} from "@chakra-ui/react";
import shop from "../store/shop";

const LayoutOption = ({ option, className='' }) => {
    const [children, setChildren] = useState([])
    const [active, setActive] = useState(option.isActive)

    useEffect(() => {
        if(option.children) setChildren(option.children)
    }, [option])

    const handleChange = (e) => {
        setActive(e.target.checked)
        shop.toggleLayout(option.id, e.target.checked).then(() => {
            shop.requestLayoutOptions()
        })
    }

    return (
        <div className={styles.option + ' ' + className}>
            <div className={styles.option__header}>
                <Tooltip label={option.description} aria-label='A tooltip'>
                    <div className={styles.option__title}>{option.name}</div>
                </Tooltip>
                <Switch isChecked={active} onChange={handleChange} />
            </div>
            {children.length ? <div className={styles.option__children}>
                {children.map(child => <LayoutOption className={styles.child} option={child} />)}
            </div> : null}
        </div>
    );
};

export default LayoutOption;