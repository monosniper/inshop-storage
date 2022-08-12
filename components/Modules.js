import React, {useEffect} from 'react';
import styles from '../styles/Modules.module.scss'
import Module from "./Module";
import shop from "../store/shop";

const Modules = ({ data, hasModule=false }) => {
    return (
        <div className={styles.modules}>
            {data.map((module, i) => <Module hasModule={hasModule} key={'module-'+i} module={module} />)}
        </div>
    );
};

export default Modules;