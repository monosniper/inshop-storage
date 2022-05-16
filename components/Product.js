import React from 'react';
import styles from '../styles/Product.module.scss'

const Product = ({id, title, sell_count}) => {
    return (
        <div className={styles.product}>
            <div className={styles.product__left}>
                <div className={styles.product__img}>
                    <img src="/assets/img/products/1.png" alt={title} />
                </div>
                <div className={styles.product__title}>
                    {title}
                </div>
            </div>
            <div className={styles.product__tag}>
                {sell_count} продано за сутки
            </div>
        </div>
    );
};

export default Product;