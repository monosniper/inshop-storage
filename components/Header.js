import React from 'react';
import styles from '../styles/Header.module.scss'
import {Flex, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import Logo from "./Logo";
import User from "./User";

const Header = () => {
    return (
        <div className={styles.header}>
            <Flex style={{width: '100%'}} align={'center'} justify={'space-between'}>
                <Logo />
                <Menu>
                    <MenuButton>
                        <User name={'Замалдинов Равиль'} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>
                            Выход
                        </MenuItem>
                    </MenuList>
                </Menu>

            </Flex>
        </div>
    );
};

export default Header;