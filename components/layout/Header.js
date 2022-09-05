import React, {useEffect, useMemo} from 'react';
import styles from '../../styles/Header.module.scss'
import {Flex, Menu, MenuButton, MenuItem, MenuList, Select} from "@chakra-ui/react";
import Logo from "../Logo";
import User from "../User";
import {$routes} from "../../http/routes";
import {useRouter} from "next/router";
import store from "../../store/store";
import shop from "../../store/shop";
import {observer} from "mobx-react-lite";
import useUser from "../../hooks/useUser";
import {toJS} from "mobx";

const Header = () => {
    const router = useRouter()
    const user = useUser()

    const handleLogout = () => {
        localStorage.clear()
        router.push($routes.login)
    }

    const handleShopChange = (e) => {
        store.requestShop(e.target.value)
        shop.requestProducts().then(() => {
            router.push({
                pathname: router.pathname,
                query: {url: 'url'}
            })
        })
    }

    const handleGoTo = (route) => {
        router.push(route)
    }

    return (
        <div className={styles.header}>
            <Flex style={{width: '100%'}} align={'center'} justify={'space-between'}>
                <Flex gap={5} align={'center'}>
                    <Logo />
                    <Select placeholder={'Выберите магазин'} onChange={handleShopChange}>
                        {store.shops.map((sh, i) => <option selected={shop.id === sh.id} key={'home-'+i} value={sh.id}>{sh.options.title}</option>)}
                    </Select>
                </Flex>
                {store.authorized && user && <Menu>
                    <MenuButton>
                        <User name={user.name || user.email} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => handleGoTo($routes.profile)}>
                            Профиль
                        </MenuItem>
                        <MenuItem onClick={() => handleGoTo($routes.domains)}>
                            Домены
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            Выход
                        </MenuItem>
                    </MenuList>
                </Menu>}
            </Flex>
        </div>
    );
};

export default observer(Header);