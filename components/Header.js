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

const Header = () => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear()
        router.push($routes.login)
    }

    const handleShopChange = (e) => {
        store.requestShop(e.target.value).then(() => {
            router.push($routes.index)
        })
    }

    return (
        <div className={styles.header}>
            <Flex style={{width: '100%'}} align={'center'} justify={'space-between'}>
                <Flex gap={5} align={'center'}>
                    <Logo />
                    <Select onChange={handleShopChange}>
                        {store.shops.map((sh, i) => <option selected={shop.id === sh.options.id} key={'shop-'+i} value={sh.id}>{sh.options.title}</option>)}
                    </Select>
                </Flex>
                {store.user && <Menu>
                    <MenuButton>
                        <User name={store.user.fio || store.user.email} />
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