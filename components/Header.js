import React from 'react';
import styles from '../styles/Header.module.scss'
import {Flex, Menu, MenuButton, MenuItem, MenuList, Select} from "@chakra-ui/react";
import Logo from "./Logo";
import User from "./User";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import store from "../store/store";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import useUser from "../hooks/useUser";

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
                pathname: router.asPath,
                query: {url: 'url'}
            })
        })
    }

    return (
        <div className={styles.header}>
            <Flex style={{width: '100%'}} align={'center'} justify={'space-between'}>
                <Flex gap={5} align={'center'}>
                    <Logo />
                    <Select placeholder={'Выберите магазин'} onChange={handleShopChange}>
                        {store.shops.map((sh, i) => <option selected={shop.id === sh.id} key={'shop-'+i} value={sh.id}>{sh.options.title}</option>)}
                    </Select>
                </Flex>
                {store.authorized && <Menu>
                    <MenuButton>
                        <User name={user.fio || user.email} />
                    </MenuButton>
                    <MenuList>
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