import React, {useEffect, useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import randomstring from "randomstring";
import store from "../store/store";
import styles from "../styles/Login.module.scss";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button} from "@chakra-ui/react";

const NoShop = observer(() => {

    const router = useRouter();

    useEffect(() => {

    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h4 className={styles.title}>Для продолжения необходимо выбрать магазин</h4>

            </div>
        </div>
    );
});

export default NoShop;