import React, {useEffect, useState} from 'react';
import styles from '../styles/Sidebar.module.scss'
import {Icon} from "@chakra-ui/react";
import {FiUsers} from "react-icons/fi";
import {GoHome} from "react-icons/go";
import {IoConstructOutline} from "react-icons/io5";
import {AiOutlineAppstore} from "react-icons/ai";
import Link from "next/link";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";

function SidebarItem({ children, icon, href, externalLink=false }) {
    const [itemClass, setItemClass] = useState(styles.sidebar__item);
    const router = useRouter()

    useEffect(() => {
        if(router.pathname === href) setItemClass(styles.sidebar__item + ' ' + styles.active)
        else setItemClass(styles.sidebar__item)
    }, [router.pathname])

    return externalLink ? <a target={'_blank'} href={href} rel="noreferrer">
            <div className={itemClass}>
                {icon} {children}
            </div>
        </a> : <Link href={href}>
            <div className={itemClass}>
                {icon} {children}
            </div>
        </Link>;
}

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <SidebarItem icon={<Icon as={GoHome} w={6} h={6} />} href={$routes.index}>Личный кабинет</SidebarItem>
            <SidebarItem icon={<Icon as={AiOutlineAppstore} w={6} h={6} />} href={$routes.products}>Склад</SidebarItem>
            <SidebarItem icon={<Icon as={FiUsers} w={6} h={6} />} href={$routes.users}>Клиенты</SidebarItem>
            <SidebarItem icon={<Icon as={IoConstructOutline} w={6} h={6} />} href={process.env.NEXT_PUBLIC_CONSTRUCTOR_LINK} externalLink>Конструктор</SidebarItem>
        </div>
    );
};

export default Sidebar;