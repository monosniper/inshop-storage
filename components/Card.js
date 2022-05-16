import React from 'react';
import styles from '../styles/Card.module.scss'
import Link from "next/link";

const Card = ({ children, title, linkText, linkHref, toolBox, footer }) => {
    return (
        <div className={styles.card}>
            {title ?
                <div className={styles.card__header}>
                    <span>{title}</span>
                    {toolBox}
                    {
                        linkText ? <span className={styles.card__link}><Link href={linkHref}>
                            {linkText}
                        </Link></span> : null
                    }
                </div>
                : null
            }
            <div className={styles.card__content}>
                {children}
            </div>
            <div className={styles.card__footer}>
                {footer}
            </div>
        </div>
    );
};

export default Card;