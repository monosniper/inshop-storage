import React, {useEffect, useMemo, useState} from 'react';
import Head from "next/head";
import {
    Button,
    Grid,
    GridItem,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Skeleton,
    Text,
    Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import Card from "../../components/Card";
import styles from "../../styles/Form.module.scss";
import {useRouter} from "next/router";
import shop from "../../store/shop";
import {$routes} from "../../http/routes";
import {observer} from "mobx-react-lite";
import ImageInput from "../../components/ImageInput";
import $lang from "../../utils/lang";

const CustomPage = () => {
    const toast = useToast()
    const router = useRouter()
    const {id} = router.query
    const data = useMemo(() => shop.getBanner(id), [shop.banners])
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
    const [uuid, setUuid] = useState('');
    const [desktop_image_name, setDesktopImageName] = useState('');
    const [mobile_image_name, setMobileImageName] = useState('');

    useEffect(() => {
        if(data) {
            setType(data.type)
            setOrder(data.priority)
            setTitle(data.title)
            setText(data.text)
            setColor(data.color)
            setBackground(data.background)
            setButtonText(data.button_text)
            setButtonLink(data.button_link)
            setButtonBackground(data.button_background)
            setButtonColor(data.button_color)
            setUuid(data.uuid)
            setDesktopImageName(data.desktop_image_name)
            setMobileImageName(data.mobile_image_name)
        }
    }, [data])

    useEffect(() => {
        shop.getBannerTypes().then((rs) => {
            setTypes(rs.data)
        })
        shop.requestBanners()
    }, [])

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

    const handleSave = () => {
        shop.saveBanner({
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
        }, id).then(() => {
            shop.requestBanners()
            toast({
                title: `Изменения сохранены.`,
                status: 'success',
                isClosable: true,
            })
            router.push($routes.banners.index)
        })
    }

    const handleDelete = () => {
        shop.deleteBanner(id).then(() => {
            shop.requestBanners()
            onClose()
        })
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const containsType = (_type) => {
        return type.indexOf(_type) !== -1;
    }

    return (
        <div>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>



            <Card
                title={'Баннер #'+data.order}
                linkText={'Назад'}
                linkHref={$routes.banners.index}
            >
                <Grid templateColumns='repeat(2, 1fr)' mb={4} gap={4}>
                    {data ? (
                        <>
                            <GridItem w='100%'>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Тип баннера</Text>
                                    <Select value={type} onChange={onTypeChange}>
                                        {types.map((t, i) => <option key={'type-'+i} value={t}>{$lang[t]}</option>)}
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
                            </GridItem>
                            <GridItem w='100%'>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Фон</Text>
                                    <Input placeholder={'#000000'} value={background} onChange={onBackgroundChange} />
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Цвет текста</Text>
                                    <Input placeholder={'#000000'} value={color} onChange={onColorChange} />
                                </div>
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
                            </GridItem>
                        </>
                    ) : <Skeleton height={100} />}

                </Grid>

                <Button colorScheme={'facebook'} onClick={handleSave} mr={3}>Сохранить</Button>
                <Button colorScheme={'red'} onClick={onOpen}>Удалить</Button>

                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Удаление баннера</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>Вы уверены?</p>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleDelete} colorScheme='red' mr={3}>
                                Да, удалить
                            </Button>
                            <Button variant='ghost' onClick={onClose}>Отмена</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Card>
        </div>
    );
};

export default observer(CustomPage);