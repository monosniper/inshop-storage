import React, {useMemo} from 'react';
import styles from "../styles/Shops.module.scss";
import {Button, HStack, Stack, Switch} from "@chakra-ui/react";
import GetButton from "./GetButton";
import Link from "next/link";
import ShopImg from '../public/assets/img/shop.png';
import Image from "next/image";
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/ru';
import {$routes} from "../http/routes";
import {FaExternalLinkAlt} from "react-icons/fa";
import {MdOutlineMobileScreenShare} from "react-icons/md";

const Shop = ({ shop }) => {
    return (
        <div className={styles.shop}>
            <div className={styles.shop__header}>
                <div className={styles.shop__left}>
                    <div className={styles.shop__logo}>
                        <img src={shop.logo_url} alt={shop.options.title} width={60} height={60}/>
                        {/*<Image src={shop.logo_url} width={60} height={60} />*/}
                    </div>
                    <div className={styles.shop__title}>{shop.options.title}</div>
                </div>
                <a rel={'noreferrer'} target={'_blank'} href={'https://'+shop.domain}>
                    <FaExternalLinkAlt />
                </a>
            </div>
            {shop.options.slogan ? <div className={styles.shop__descriprion}>
                {shop.options.slogan.length > 100 ? shop.options.slogan.substring(0, 100) + '...' : shop.options.slogan}
            </div> : null}
            <div className={styles.shop__footer}>
                <div className={styles.shop__date}>
                    {shop.last_update ? (
                        <Moment
                            date={shop.last_update}
                            fromNow
                            locale={'ru'}

                            local
                        />
                    ) : null}
                </div>
                <HStack spacing={2} className={styles.shop__btn}>
                    <Link href={$routes.convertation(shop.id)}>
                        <Button size={'sm'}><MdOutlineMobileScreenShare /></Button>
                    </Link>
                    <Link href={$routes.shop(shop.id)}>
                        <Button size={'sm'}>Настройки</Button>
                    </Link>
                </HStack>
            </div>
        </div>
    );
};

export default Shop;