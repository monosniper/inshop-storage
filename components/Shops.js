import React from 'react';
import styles from "../styles/Shops.module.scss";
import Shop from "./Shop";

const Shops = ({ data }) => {
    return (
        <div className={styles.shops}>
            {data.map((shop, i) => <Shop key={'home-'+i} shop={shop} />)}
        </div>
    );
};

export default Shops;