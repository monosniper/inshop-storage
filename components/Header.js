import React from 'react';
import styles from '../styles/Header.module.scss'
import {Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import Logo from "./Logo";
import User from "./User";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import store from "../store/store";

const Header = () => {
    const router = useRouter()

    const handleLogout = () => {
        localStorage.clear()
        router.push($routes.login)
    }

    return (
        <div className={styles.header}>
            <Flex style={{width: '100%'}} align={'center'} justify={'space-between'}>
                <Logo />
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

export default Header;