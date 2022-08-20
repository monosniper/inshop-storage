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
    const customPages = useMemo(() => shop.customPages, [shop.customPages]);

    useEffect(() => {
        if(shop.id) {
            shop.requestCustomPages()
        }
    }, [shop.id])
    useEffect(() => {
        console.log(customPages)
    }, [shop.customPages])

    return (
        <div>
            <Head>
                <title>Дополнительные страницы - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <Card
                title={'Дополнительные страницы'}
            >
                <div className={styles.pages}>
                    {customPages.map((page, i) => <Link href={$routes.custom_pages.page(page.id)}><div className={styles.page} key={'page-'+i}>
                        <div className={styles.page__title}>{page.title}</div>
                        <div className={styles.page__slug}>/{page.slug}</div>
                    </div></Link>)}
                    {customPages.length >= 3 ? null : <Link href={$routes.custom_pages.create}><div className={styles.page}>Добавить страницу</div></Link>}
                </div>
            </Card>
        </div>
    );
};

export default observer(CustomPages);