import React, {useEffect, useMemo, useState} from 'react';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import Card from "../components/Card";
import Head from "next/head";
import {
    Button,
    HStack,
    Input, Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select, Skeleton,
    Text, useDisclosure, useToast
} from "@chakra-ui/react";
import shop from "../store/shop";
import styles from "../styles/Form.module.scss";
import {v4 as uuidv4} from "uuid";
import {API_URL} from "../http";
import {FilePond, registerPlugin} from "react-filepond";
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";
import {toJS} from "mobx";
import ImageInput from "../components/ImageInput";

function ToolBox({ banners_count, onChange, current }) {
    const buttons = [];

    for (let i=0;i<banners_count;i++) {
        buttons.push(<Button colorScheme={current === (i + 1) ? 'facebook' : 'gray'} onClick={() => onChange(i+1)}>Баннер #{i+1}</Button>);
    }

    return <HStack spacing={2}>
        {buttons}
    </HStack>;
}

const Banners = () => {
    const getArrayFromBanner = (name) => {
        return [1,2,3].map(i => shop.banners.find(banner => banner.order === i)
            ? shop.banners.find(banner => banner.order === i)[name]
            : undefined)
    }

    const getObjectFromBanner = (name) => {
        const object = {}

        for(let i=1;i<=3;i++) {
            object[i] = shop.banners.find(banner => banner.order === 1)
                ? shop.banners.find(banner => banner.order === 1)[name]
                : undefined
        }

        return object;
    }

    // const getFilesFromBanner = () => {
    //     const object = {}
    //
    //     for(let i=1;i<=3;i++) {
    //         object[i] = useState(shop.banners.find(banner => banner.order === 1)
    //             ? [{
    //                 source: 'image',
    //                 options: {
    //                     type: 'local'
    //                 }
    //             }] : [])
    //     }
    //
    //     return object;
    // }

    const banners = useMemo(() => shop.banners, [shop.banners])
    const [currentBanner, setCurrentBanner] = useState(1)
    const [types, setTypes] = useState([])
    const orders = useMemo(() => shop.banners.map(banner => banner.order), [shop.banners])
    const ids = useMemo(() => getObjectFromBanner('id'), [shop.banners])
    const [titles, setTitles] = useState(banners.map(banner => banner.title))
    const [texts, setTexts] = useState(banners.map(banner => banner.text))
    const [colors, setColors] = useState(banners.map(banner => banner.color))
    const [backgrounds, setBackgrounds] = useState(banners.map(banner => banner.background))
    const [button_texts, setButtonTexts] = useState(banners.map(banner => banner.button_text))
    const [button_links, setButtonLinks] = useState(banners.map(banner => banner.button_link))
    const [button_backgrounds, setButtonBackgrounds] = useState(banners.map(banner => banner.button_background))
    const [button_colors, setButtonColors] = useState(banners.map(banner => banner.button_color))
    const _types = useMemo(() => getArrayFromBanner('type'), [shop.banners])
    const uuids = useMemo(() => getArrayFromBanner('uuid'), [shop.banners])
    const image_names = useMemo(() => getArrayFromBanner('image_name'), [shop.banners])
    const [uuid, setUuid] = useState(uuids ? uuids[currentBanner-1] : null);
    // const files = useMemo(() => getFilesFromBanner(), [home.banners])
    const [isLoadings, setIsLoadings] = useState([false,false,false])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const lang = {
        text: 'Простой текст',
        text_button: 'Текст с кнопкой',
        text_button_image: 'текст с кнопкой и картинкой',
        text_image: 'Текст с картинкой',
        image: 'Картинка',
    }

    // registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

    useEffect(() => {
        if(shop.id) {
            shop.getBannerTypes().then((rs) => {
                setTypes(rs.data)
            })

            shop.requestBanners()
        }
    }, [shop.id])

    useEffect(() => {
        setTitles(getObjectFromBanner('title'))
        setTexts(getObjectFromBanner('text'))
        setColors(getObjectFromBanner('color'))
        setBackgrounds(getObjectFromBanner('background'))
        setButtonTexts(getObjectFromBanner('button_text'))
        setButtonLinks(getObjectFromBanner('button_link'))
        setButtonBackgrounds(getObjectFromBanner('button_background'))
        setButtonColors(getObjectFromBanner('button_color'))
    }, [shop.banners])

    useEffect(() => {
        setUuid(uuids[currentBanner-1])
    }, [currentBanner])

    const handleTitleChange = (e) => {
        const newObj = {...titles}
        newObj[currentBanner] = e.target.value
        setTitles(newObj)
    }

    const handleTextChange = (e) => {
        const newObj = {...texts}
        newObj[currentBanner] = e.target.value
        setTexts(newObj)
    }

    const handleButtonTextChange = (e) => {
        const newObj = {...button_texts}
        newObj[currentBanner] = e.target.value
        setButtonTexts(newObj)
    }

    const handleButtonLinkChange = (e) => {
        const newObj = {...button_links}
        newObj[currentBanner] = e.target.value
        setButtonLinks(newObj)
    }

    const handleColorChange = (e) => {
        const newObj = {...colors}
        newObj[currentBanner] = e.target.value
        setColors(newObj)
    }

    const handleBackgroundChange = (e) => {
        const newObj = {...backgrounds}
        newObj[currentBanner] = e.target.value
        setBackgrounds(newObj)
    }

    const handleButtonBackgroundChange = (e) => {
        const newObj = {...button_backgrounds}
        newObj[currentBanner] = e.target.value
        setButtonBackgrounds(newObj)
    }

    const handleButtonColorChange = (e) => {
        const newObj = {...button_colors}
        newObj[currentBanner] = e.target.value
        setButtonColors(newObj)
    }

    const handle_typeChange = (e) => {
        shop.saveBanner({type: e.target.value}, ids[currentBanner]).then(() => {
            shop.requestBanners()
        })
    }

    const containsType = (type) => {
        return _types[currentBanner-1] ? _types[currentBanner-1].indexOf(type) !== -1 : false;
    }

    const handleCreate = () => {
        const newList = [...isLoadings];
        newList[currentBanner-1] = true
        setIsLoadings(newList)

        shop.createBanner({order: currentBanner, uuid: uuidv4()}).then(() => shop.requestBanners())
    }

    const handleSave = () => {
        shop.saveBanner({
            type: _types[currentBanner],
            title: titles[currentBanner],
            text: texts[currentBanner],
            button_text: button_texts[currentBanner],
            button_link: button_links[currentBanner],
            button_color: button_colors[currentBanner],
            button_background: button_backgrounds[currentBanner],
            background: backgrounds[currentBanner],
            color: colors[currentBanner],
        }, ids[currentBanner]).then(() => {
            toast({
                title: `Изменения сохранены.`,
                status: 'success',
                isClosable: true,
            })
        })
    }

    const handleDelete = () => {
        shop.deleteBanner(ids[currentBanner]).then(() => {
            shop.requestBanners()
            onClose()
        })
    }

    return (
        <div>
            <Head>
                <title>Баннеры - {process.env.NEXT_PUBLIC_APP_NAME}</title>
                <meta name="description" content='{ props.description }'/>
            </Head>

            <Card
                title={'Баннеры'}
                toolBox={<ToolBox
                    current={currentBanner}
                    onChange={setCurrentBanner}
                    banners_count={3}
                />}
            >
                {
                    orders.includes(currentBanner)
                        ? (
                            <>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Тип баннера</Text>
                                    <Select onChange={handle_typeChange}>
                                        {types.map((type, i) => _types[currentBanner-1] === type
                                            ? <option selected key={'type-'+i} value={type}>{lang[type]}</option>
                                            : <option key={'type-'+i} value={type}>{lang[type]}</option>
                                        )}
                                    </Select>
                                </div>
                                {
                                    containsType('text')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Заголовок</Text>
                                            <Input placeholder={'Заголовок'} value={titles[currentBanner] ? titles[currentBanner] : ''} onChange={handleTitleChange} />
                                        </div>
                                        : null
                                }
                                {
                                    containsType('text')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Текст</Text>
                                            <Input placeholder={'Текст'} value={texts[currentBanner] ? texts[currentBanner] : ''} onChange={handleTextChange} />
                                        </div>
                                        : null
                                }
                                {
                                    containsType('button')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Текст кнопки</Text>
                                            <Input placeholder={'Текст кнопки'} value={button_texts[currentBanner] ? button_texts[currentBanner] : ''} onChange={handleButtonTextChange} />
                                        </div>
                                        : null
                                }
                                {
                                    containsType('button')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Ссылка кнопки</Text>
                                            <Input placeholder={'Ссылка кнопки'} value={button_links[currentBanner] ? button_links[currentBanner] : ''} onChange={handleButtonLinkChange} />
                                        </div>
                                        : null
                                }

                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Фон</Text>
                                    <Input placeholder={'#000000'} value={backgrounds[currentBanner] ? backgrounds[currentBanner] : ''} onChange={handleBackgroundChange} />
                                </div>
                                <div className={styles.row}>
                                    <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Цвет текста</Text>
                                    <Input placeholder={'#000000'} value={colors[currentBanner] ? colors[currentBanner] : ''} onChange={handleColorChange} />
                                </div>

                                {
                                    containsType('button')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Фон кнопки</Text>
                                            <Input placeholder={'#000000'} value={button_backgrounds[currentBanner] ? button_backgrounds[currentBanner] : ''} onChange={handleButtonBackgroundChange} />
                                        </div>
                                        : null
                                }
                                {
                                    containsType('button')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Цвет текста кнопки</Text>
                                            <Input placeholder={'#000000'} value={button_colors[currentBanner] ? button_colors[currentBanner] : ''} onChange={handleButtonColorChange} />
                                        </div>
                                        : null
                                }

                                {
                                    containsType('image')
                                        ? <div className={styles.row}>
                                            <Text sx={{marginBottom: '.3rem'}} fontSize='md'>Картинка <small>(Рекомендуемый размер: 300 пикселей в высоту)</small></Text>
                                            <ImageInput
                                                images={[image_names[currentBanner-1]]}
                                                uuid={uuids[currentBanner-1]}
                                            />
                                        </div>
                                        : null
                                }

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
                            </>
                        ) : banners ? <Button colorScheme={'facebook'} onClick={handleCreate} isLoading={isLoadings[currentBanner-1]}>Создать баннер</Button> : <Skeleton height={'20px'} />
                }
            </Card>
        </div>
    );
};

export default observer(Banners);