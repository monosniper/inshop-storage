import React, {useEffect, useMemo, useState} from 'react';
import {useRouter} from "next/router";
import Head from "next/head";
import DataTable from "../../components/DataTable";
import AddProduct from "../../components/AddProduct";
import Card from "../../components/Card";
import store from "../../store/store";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import {
    Button,
    Grid,
    GridItem,
    Input,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalFooter, ModalHeader,
    ModalOverlay,
    Select, Skeleton, Switch,
    Text, Textarea, Tooltip,
    useDisclosure, useToast, VStack
} from "@chakra-ui/react";
import {$routes} from "../../http/routes";
import ItemList from "../../components/ItemList";
import styles from "../../styles/Form.module.scss";
import shop from "../../store/shop";
import LayoutOption from "../../components/LayoutOption";
import ColorPicker from "../../components/ColorPicker";
import SocialNetwork from "../../components/SocialNetwork";
import {showMessage} from "../../utils/showMessage";
import ImageInput from "../../components/ImageInput";
import {useModules} from "../../hooks/useModules";
import {$modules} from "../../utils/config";
import ShopFilter from "../../components/ShopFilter";

function OrderTextForm({onOrderTextChange, orderText, addInstLink}) {
    return <>
        <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Текст заказа</Text>
        <div className={styles.row}>
            <Button mb={2} onClick={addInstLink}>Вставить инстаграмм ссылку</Button>
            <Textarea onChange={onOrderTextChange} placeholder='Для заказа обратитесь в наш инстаграмм' value={orderText} />
        </div>
    </>;
}

const Shop = (props) => {
    const toast = useToast()
    const router = useRouter()
    const {id} = router.query
    const data = useMemo(() => store.requestShop(id), [store.shops])

    const domains = useMemo(() => store.domains, [store.domains]);

    const [domain_id, setDomainId] = useState(null);
    const [startTitle, setStartTitle] = useState('');
    const [orderText, setOrderText] = useState('');
    const [title, setTitle] = useState('');
    const [slogan, setSlogan] = useState('');
    const [language, setLanguage] = useState('');
    const [shopName, setShopName] = useState('');
    const [qiwiPublicKey, setQiwiPublicKey] = useState('');
    const [qiwiTheme, setQiwiTheme] = useState('');
    const [qiwiPay, setQiwiPay] = useState(false);
    const [currency, setCurrency] = useState('$');
    const [delivery, setDelivery] = useState(0);
    const modules = useModules()

    const layoutOptions = useMemo(() => generateLayoutOptions(), [shop.layoutOptions]);
    const filters = useMemo(() => shop.filters, [shop.filters]);
    const colors = useMemo(() => shop.colors, [shop.colors]);
    const social_networks = useMemo(() => shop.social_networks, [shop.social_networks]);

    useEffect(() => {
        if(data) {
            setStartTitle(data.options.title)
            setTitle(data.options.title)
            setSlogan(data.options.slogan)
            setLanguage(data.options.language)
            setDomainId(data.domain_id)
            setQiwiPay(data.options.qiwiPay)
            setQiwiPublicKey(data.options.qiwiPublicKey)
            setQiwiTheme(data.options.qiwiTheme)
            setCurrency(data.options.currency)
            setDelivery(data.options.delivery)
        }
    }, [data])

    const onOrderTextChange = (e) => setOrderText(e.target.value)
    const onDomainIdChange = (e) => setDomainId(e.target.value)
    const onTitleChange = (e) => setTitle(e.target.value)
    const onSloganChange = (e) => setSlogan(e.target.value)
    const onLanguageChange = (e) => setLanguage(e.target.value)
    const onShopNameChange = (e) => setShopName(e.target.value)
    const onQiwiPublicKeyChange = (e) => setQiwiPublicKey(e.target.value)
    const onQiwiThemeChange = (e) => setQiwiTheme(e.target.value)
    const onCurrencyChange = (e) => setCurrency(e.target.value)
    const handleQiwiPayChange = (e) => setQiwiPay(e.target.checked)
    const handleDeliveryChange = (e) => setDelivery(e.target.value)

    const handleSave = () => {
        shop.update({
            title,
            slogan,
            language,
            domain_id,
        })
        router.push($routes.index)
    }

    const handleSavePayment = () => {
        shop.update({
            orderText,
            qiwiPay,
            qiwiPublicKey,
            qiwiTheme,
            currency,
            delivery,
        }).then(() => showMessage('Изменения сохранены'))
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleDelete = () => {
        if(shopName === startTitle) {
            shop.delete(id).then(rs => {
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
        } else {
            onClose()
            toast({
                title: 'Названия не совпадают',
                description: '',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const addInstLink = () => {
        setOrderText(orderText + '%instagram%')
    }

    function generateLayoutOptions() {
        let options = [];
        let allChildren = [];
        shop.layoutOptions.forEach(option => {
            const children = shop.layoutOptions.filter(opt => opt.parent_id === option.id)

            allChildren = [...allChildren, ...children.map(child => child.id)]

            options.push({
                ...option, children
            })
        })

        options = options.filter(option => !allChildren.includes(option.id))

        return options;
    }

    useEffect(() => {
        store.requestDomains()
        shop.requestColors()
    }, [])

    return (
        <>
            <Head>
                <title>Склад - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
                {/*<link rel="icon" href="/favicon.ico" />*/}
            </Head>

            <Grid templateColumns='repeat(2, 1fr)' mb={4} gap={4}>
                <GridItem w='100%'>
                    {data ? (
                        <>
                            <Card
                                title={'Магазин '+data.options.title}
                                linkText={'Назад'}
                                linkHref={'/'}
                            >
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Логотип</Text>
                                    <ImageInput images={[data.logo_name]} uuid={data.uuid} />
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
                                        ].map(lang => language === lang.value ? (
                                            <option value={lang.value} selected>{lang.label}</option>
                                        ) : (
                                            <option value={lang.value}>{lang.label}</option>
                                        ))}
                                    </Select>
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Домен</Text>
                                    <Select onChange={onDomainIdChange} placeholder={'Выберите домен'}>
                                        {domains.map(domain => {
                                            console.log(domain_id, domain.id)
                                            if(domain.id === domain_id) return <option selected value={domain.id}>{domain.fullname}</option>
                                            else return <option value={domain.id}>{domain.fullname}</option>
                                        })}
                                    </Select>
                                </div>

                                <Button colorScheme={'facebook'} onClick={handleSave} mr={3}>Сохранить</Button>
                                <Button colorScheme={'red'} onClick={onOpen}>Удалить</Button>

                                <Modal isOpen={isOpen} onClose={onClose} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Удаление магазина</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <p>Чтобы удалить магазин, введите его полное название (<b>{startTitle}</b>) ниже:</p>
                                            <Input mt={2} placeholder={startTitle} value={shopName} onChange={onShopNameChange} />
                                        </ModalBody>

                                        <ModalFooter>
                                            <Button onClick={handleDelete} colorScheme='red' mr={3}>
                                                Удалить
                                            </Button>
                                            <Button variant='ghost' onClick={onClose}>Отмена</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Card>
                            <Card
                                title={'Социальные сети'}
                            >
                                <VStack spacing={2}>
                                    {social_networks.map((social_network, i) => <SocialNetwork key={'social-'+i} social_network={social_network} />)}
                                </VStack>
                            </Card>
                            <Card
                                title={'Фильтры'}
                            >
                                {filters.map((filter, i) => <ShopFilter key={'filter-'+i} filter={filter} />)}
                            </Card>
                        </>
                    ) : <Skeleton height={100} />}
                </GridItem>
                <GridItem w='100%'>
                    {data ? (
                        <Card
                            title={'Визуальные настройки'}
                        >
                            {layoutOptions.map((option, i) => <LayoutOption key={'layout-'+i} option={option} />)}
                            <br/>
                            {colors.map((color, i) => <ColorPicker key={'picker-'+i} color={color} />)}
                        </Card>
                    ) : <p>Загрузка...</p>}
                    <Card
                        title={'Платежи'}
                    >
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Валюта</Text>
                            <Select onChange={onCurrencyChange}>
                                {[
                                    {label: 'Доллар США ($)', value: '$'},
                                    {label: 'Российский рубль (₽)', value: '₽'},
                                    {label: 'Украинская гривна (₴)', value: '₴'},
                                ].map(curr => currency === curr.value ? (
                                    <option value={curr.value} selected>{curr.label}</option>
                                ) : (
                                    <option value={curr.value}>{curr.label}</option>
                                ))}
                            </Select>
                        </div>
                        <div className={styles.row}>
                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Стоимость доставки</Text>
                            <Input onChange={handleDeliveryChange} type={'number'} placeholder='Стоимость доставки' min={0} value={delivery}/>
                        </div>
                        {modules.get($modules.payment.qiwi) ? <>
                                <div className={styles.switch__text}>Оплата по киви</div>
                                <Switch sx={{mb:4}} isChecked={qiwiPay} onChange={handleQiwiPayChange} />
                                {qiwiPay ? <>
                                    <div className={styles.row}>
                                        <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Qiwi Public key</Text>
                                        <Input onChange={onQiwiPublicKeyChange} placeholder='Название' value={qiwiPublicKey}/>
                                    </div>
                                    <div className={styles.row}>
                                        <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Qiwi Theme name</Text>
                                        <Input onChange={onQiwiThemeChange} placeholder='Название' value={qiwiTheme} />
                                    </div>
                                </> : <OrderTextForm addInstLink={addInstLink} onOrderTextChange={onOrderTextChange} orderText={orderText} />}
                            </>
                            : <OrderTextForm addInstLink={addInstLink} onOrderTextChange={onOrderTextChange} orderText={orderText} />}
                        <Button colorScheme={'facebook'} onClick={handleSavePayment}>Сохранить</Button>
                    </Card>
                </GridItem>
            </Grid>
        </>
    );
};

export default observer(Shop);