import React, {useEffect, useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import randomstring from "randomstring";
import store from "../store/store";
import styles from "../styles/Login.module.scss";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button} from "@chakra-ui/react";
import {$routes} from "../http/routes";
import shop from "../store/shop";

const NoShop = () => {
    const router = useRouter();

    useEffect(() => {
        if(shop.id) router.push({
            pathname: router.pathname,
            query: {url: 'url'}
        })
    }, [shop.id])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h4 className={styles.title}>Для продолжения необходимо выбрать магазин</h4>
            </div>
        </div>
    );
};

export default observer(NoShop);