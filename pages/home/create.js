import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {Button, Grid, GridItem, Input, Select, Text, useToast} from "@chakra-ui/react";
import Card from "../../components/Card";
import styles from "../../styles/Form.module.scss";
import {useRouter} from "next/router";
import store from "../../store/store";
import shop from "../../store/shop";
import {$routes} from "../../http/routes";
import {observer} from "mobx-react-lite";
import {showError} from "../../utils/showError";
import {v4 as uuidv4} from "uuid";
import ImageInput from "../../components/ImageInput";

const Create = () => {
    const router = useRouter()
    const toast = useToast()

    const domains = useMemo(() => store.domains, [store.domains]);

    const [uuid, setUuid] = useState(uuidv4());
    const [domain_id, setDomainId] = useState(null);
    const [title, setTitle] = useState('');
    const [slogan, setSlogan] = useState('');
    const [language, setLanguage] = useState('ru');

    const onDomainIdChange = (e) => setDomainId(e.target.value)
    const onTitleChange = (e) => setTitle(e.target.value)
    const onSloganChange = (e) => setSlogan(e.target.value)
    const onLanguageChange = (e) => setLanguage(e.target.value)

    const save = () => {
        shop.create(domain_id, uuid, {
            title,
            slogan,
            language,
        }).then(rs => {
            if(rs.ok) router.push($routes.index)
            else {
                toast({
                    title: rs.message ? rs.message : 'Произошла какая-то ошибка.',
                    description: '',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        })

    }

    useEffect(() => {
        store.requestDomains().then(() => {
            if(domains.length) {
                setDomainId(domains[0].id)
            }
        })
    }, [])

    return (
        <>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                <GridItem w='100%'>
                    <Card
                        title={'Создать магазин'}
                        linkText={'Назад'}
                        linkHref={'/'}
                    >
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Логотип</Text>
                            <ImageInput uuid={uuid} />
                        </div>
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Домен</Text>
                            <Select onChange={onDomainIdChange} placeholder={'Выберите домен'}>
                                {domains.map((domain, i) => <option key={'domain-option-'+i} value={domain.id}>{domain.fullname}</option>)}
                            </Select>
                        </div>
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Название</Text>
                            <Input onChange={onTitleChange} placeholder='Название' value={title} />
                        </div>
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Слоган</Text>
                            <Input onChange={onSloganChange} placeholder='Слоган' value={slogan} />
                        </div>
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Язык</Text>
                            <Select onChange={onLanguageChange}>
                                {[
                                    {label: 'Русский', value: 'ru'},
                                    {label: 'Английский', value: 'en'},
                                ].map((lang, i) => <option key={'option-'+i} value={lang.value}>{lang.label}</option>)}
                            </Select>
                        </div>
                        <Button colorScheme={'facebook'} onClick={save}>Сохранить</Button>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default observer(Create);