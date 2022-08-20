import React, {useMemo} from 'react';
import styles from "../styles/Shops.module.scss";
import {Button, Switch} from "@chakra-ui/react";
import GetButton from "./GetButton";
import Link from "next/link";
import ShopImg from '../public/assets/img/shop.png';
import Image from "next/image";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
import {$routes} from "../http/routes";

const Shop = ({ shop }) => {
    const { title, slogan } = useMemo(() => shop.options.slogan ? shop.options : {title:'',slogan:''}, [shop.options]);

    return (
        <div className={styles.shop}>
            <div className={styles.shop__header}>
                <div className={styles.shop__logo}>
                    <Image src={ShopImg} />
                </div>
                <div className={styles.shop__title}>{title}</div>
            </div>
            <div className={styles.shop__descriprion}>
                {slogan.length > 100 ? slogan.substring(0, 100) + '...' : slogan}
            </div>
            <div className={styles.shop__footer}>
                <div className={styles.shop__date}>
                    {shop.last_update ? (
                        <Moment
                            date={shop.last_update}
                            fromNow
                            locale={'ru'}

                            local
                        />
                    ) : null}
                </div>
                <div className={styles.shop__btn}>
                    <Link href={$routes.shop(shop.id)}>
                        <Button>Настройки</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Shop;