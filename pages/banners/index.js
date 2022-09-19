import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import Card from "../../components/Card";
import styles from "../../styles/CustomPages.module.scss";
import {
    Button, HStack,
    Input,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select, Skeleton,
    Text
} from "@chakra-ui/react";
import shop from "../../store/shop";
import {observer} from "mobx-react-lite";
import Link from "next/link";
import {$routes} from "../../http/routes";

const CustomPages = () => {
    const banners = useMemo(() => shop.banners, [shop.banners]);

    useEffect(() => {
        if(shop.id) {
            shop.requestBanners()
        }
    }, [shop.id])

    return (
        <div>
            <Head>
                <title>Баннеры - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <Card
                title={'Баннеры'}
            >
                <div className={styles.pages}>
                    {banners.map((banner, i) => <Link key={'link-'+i} href={$routes.banners.page(banner.id)}>
                        <div className={styles.page} key={'page-'+i}>
                            <div className={styles.page__title}>Баннер #{banner.priority}</div>
                        </div>
                    </Link>)}
                    {banners.length >= 3 ? null : <Link href={$routes.banners.create}><div className={styles.page}>Добавить баннер</div></Link>}
                </div>
            </Card>
        </div>
    );
};

export default observer(CustomPages);