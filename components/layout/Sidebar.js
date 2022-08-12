import React, {useEffect, useState} from 'react';
import styles from '../../styles/Sidebar.module.scss'
import {Icon} from "@chakra-ui/react";
import {FiUsers} from "react-icons/fi";
import {GoHome} from "react-icons/go";
import {IoConstructOutline} from "react-icons/io5";
import {AiOutlineAppstore} from "react-icons/ai";
import Link from "next/link";
import {$externalRoutes, $routes} from "../../http/routes";
import {useRouter} from "next/router";
import {BiCategoryAlt} from "react-icons/bi";
import {BiPlug} from "react-icons/bi";
import {FaRegMoneyBillAlt} from "react-icons/fa";
import {useModules} from "../../hooks/useModules";
import {observer} from "mobx-react-lite";
import shop from "../../store/shop";
import {toJS} from "mobx";

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
    const modules = useModules()

    return (
        <div className={styles.sidebar}>
            <SidebarItem icon={<Icon as={GoHome} w={6} h={6} />} href={$routes.index}>Личный кабинет</SidebarItem>
            <SidebarItem icon={<Icon as={AiOutlineAppstore} w={6} h={6} />} href={$routes.products}>Склад</SidebarItem>
            {modules.get('auth') ? <SidebarItem icon={<Icon as={FiUsers} w={6} h={6} />} href={$routes.users}>Клиенты</SidebarItem> : null}
            <SidebarItem icon={<Icon as={BiCategoryAlt} w={6} h={6} />} href={$routes.categories}>Категории</SidebarItem>
            <SidebarItem icon={<Icon as={BiPlug} w={6} h={6} />} href={$routes.modules}>Модули</SidebarItem>
            <SidebarItem icon={<Icon as={FaRegMoneyBillAlt} w={6} h={6} />} href={$routes.modules}>Финансы</SidebarItem>
            {/*{shop.id  && <SidebarItem icon={<Icon as={IoConstructOutline} w={6} h={6} />} href={$externalRoutes.constructor(shop.id)} externalLink>Конструктор</SidebarItem>}*/}
        </div>
    );
};

export default observer(Sidebar);