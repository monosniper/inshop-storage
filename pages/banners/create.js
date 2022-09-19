import React, {Component, useEffect, useState} from 'react';
import Head from "next/head";
import Card from "../../components/Card";
import styles from "../../styles/CustomPages.module.scss";
import Link from "next/link";
import {$routes} from "../../http/routes";
import {useRouter, withRouter} from "next/router";
import {
    Button,
    Input, NumberDecrementStepper, NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import store from "../../store/store";
import shop from "../../store/shop";
import {observer} from "mobx-react-lite";
import $lang from "../../utils/lang";
import ImageInput from "../../components/ImageInput";
import {v4 as uuidv4} from "uuid";


const Create = () => {
    const router = useRouter()
    const toast = useToast()
    const [types, setTypes] = useState([])

    const [type, setType] = useState('text');
    const [order, setOrder] = useState(0);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [color, setColor] = useState('');
    const [background, setBackground] = useState('');
    const [button_text, setButtonText] = useState('');
    const [button_link, setButtonLink] = useState('');
    const [button_background, setButtonBackground] = useState('');
    const [button_color, setButtonColor] = useState('');
    const [uuid, setUuid] = useState(uuidv4());
    const [desktop_image_name, setDesktopImageName] = useState('');
    const [mobile_image_name, setMobileImageName] = useState('');

    const onTypeChange = (e) => setType(e.target.value)
    const onOrderChange = (e) => setOrder(e)
    const onTitleChange = (e) => setTitle(e.target.value)
    const onTextChange = (e) => setText(e.target.value)
    const onColorChange = (e) => setColor(e.target.value)
    const onBackgroundChange = (e) => setBackground(e.target.value)
    const onButtonTextChange = (e) => setButtonText(e.target.value)
    const onButtonLinkChange = (e) => setButtonLink(e.target.value)
    const onButtonBackgroundChange = (e) => setButtonBackground(e.target.value)
    const onButtonColorChange = (e) => setButtonColor(e.target.value)

    useEffect(() => {
        shop.getBannerTypes().then((rs) => {
            setTypes(rs.data)
        })
        shop.requestBanners()
    }, [])

    const save = () => {
        shop.createBanner({
            type,
            priority: order,
            title,
            text,
            button_text,
            button_link,
            button_color,
            button_background,
            background,
            color,
            uuid,
        }).then(rs => {
            if(rs.ok) {
                shop.requestBanners()
                router.push($routes.banners.index)
            }
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

    const containsType = (_type) => {
        return type.indexOf(_type) !== -1;
    }

    return (
        <div>
            <Head>
                <title>Баннеры - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <Card
                title={'Новый баннер'}
                linkText={'Назад'}
                linkHref={$routes.banners.index}
            >
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Тип баннера</Text>
                    <Select defaultValue={type} onChange={onTypeChange}>
                        {types.map((type, i) => <option key={'type-'+i} value={type}>{$lang[type]}</option>)}
                    </Select>
                </div>
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Порядок (от меньшего к большему)</Text>
                    <NumberInput
                        size='sm'
                        value={order}
                        onChange={onOrderChange}
                    >
                        <NumberInputField/>
                        <NumberInputStepper>
                            <NumberIncrementStepper/>
                            <NumberDecrementStepper/>
                        </NumberInputStepper>
                    </NumberInput>
                </div>
                {
                    containsType('text')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Заголовок</Text>
                            <Input placeholder={'Заголовок'} value={title} onChange={onTitleChange} />
                        </div>
                        : null
                }
                {
                    containsType('text')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Текст</Text>
                            <Input placeholder={'Текст'} value={text} onChange={onTextChange} />
                        </div>
                        : null
                }
                {
                    containsType('button')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Текст кнопки</Text>
                            <Input placeholder={'Текст кнопки'} value={button_text} onChange={onButtonTextChange} />
                        </div>
                        : null
                }
                {
                    containsType('button')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Ссылка кнопки</Text>
                            <Input placeholder={'Ссылка кнопки'} value={button_link} onChange={onButtonLinkChange} />
                        </div>
                        : null
                }

                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Фон</Text>
                    <Input placeholder={'#000000'} value={background} onChange={onBackgroundChange} />
                </div>
                <div className={styles.row}>
                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Цвет текста</Text>
                    <Input placeholder={'#000000'} value={color} onChange={onColorChange} />
                </div>

                {
                    containsType('button')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Фон кнопки</Text>
                            <Input placeholder={'#000000'} value={button_background} onChange={onButtonBackgroundChange} />
                        </div>
                        : null
                }
                {
                    containsType('button')
                        ? <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Цвет текста кнопки</Text>
                            <Input placeholder={'#000000'} value={button_color} onChange={onButtonColorChange} />
                        </div>
                        : null
                }

                {
                    containsType('image')
                        ? <>
                            <div className={styles.row}>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Картинка <small>(Рекомендуемый размер: 300 пикселей в высоту)</small></Text>
                                <ImageInput
                                    images={[desktop_image_name]}
                                    uuid={uuid}
                                    prefix={'desktop'}
                                />
                            </div>
                            <div className={styles.row}>
                                <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Картинка для маленьких экранов
                                    {/*<small>(Рекомендуемый размер: 300 пикселей в высоту)</small>*/}
                                </Text>
                                <ImageInput
                                    images={[mobile_image_name]}
                                    uuid={uuid}
                                    prefix={'mobile'}
                                />
                            </div>
                        </>
                        : null
                }
                <Button colorScheme={'facebook'} onClick={save}>Сохранить</Button>
            </Card>
        </div>
    );
};

export default observer(Create);