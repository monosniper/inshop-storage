import React, {useEffect, useState} from 'react';
import OAuth2Login from "react-simple-oauth2-login";
import randomstring from "randomstring";
import store from "../store/store";
import styles from "../styles/Login.module.scss";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";
import {Button} from "@chakra-ui/react";
import {$routes} from "../http/routes";

const Login = observer(() => {

    const router = useRouter();
    const [state, setState] = useState()
    const {returnUrl} = router.query

    const getState = () => {
        let state = localStorage.getItem('state')

        if(!state) {
            state = randomstring.generate()

            localStorage.setItem('state', state);
        }

        return state;
    }

    const onSuccess = (data) => {
        data.state === state && store.requestAccessToken(data.code).then(() => {
            store.requestUser()
        })
    }

    useEffect(() => {
        setState(getState())

        const user = localStorage.getItem(store.localStorage.user);
        const token = localStorage.getItem(store.localStorage.token);

        if(user && token) {
            store.setUser(JSON.parse(user))

            if (store.authorized) {
                router.push(returnUrl ? returnUrl : $routes.index);
            }
        }
    }, [store.user])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h4 className={styles.title}>Для продолжения необходимо авторизоваться</h4>
                <OAuth2Login
                    authorizationUrl={process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + "/oauth/authorize"}
                    responseType="code"
                    clientId={process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}
                    redirectUri={process.env.NEXT_PUBLIC_OAUTH_CLIENT_REDIRECT_URI}
                    onSuccess={onSuccess}
                    className={styles.button + ' button'}
                    buttonText={'Авторизация'}
                    onFailure={(rs) => console.log(rs)}
                    state={state}
                    render={({onClick}) => <Button onClick={onClick} colorScheme={'blue'}>Авторизация</Button>}
                />
            </div>
        </div>
    );
});

export default Login;