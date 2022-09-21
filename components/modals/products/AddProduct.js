import React, {useEffect, useMemo, useState} from 'react';
import styles from '../../../styles/AddProduct.module.scss'
import {HiPlus} from "react-icons/hi";
import {
    Box,
    Button, HStack,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    SimpleGrid,
    Stack, Tag, TagLabel,
    Text, Textarea, useToast
} from "@chakra-ui/react";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import shop from "../../../store/shop";
import Noty from "noty";
import { v4 as uuidv4 } from 'uuid';
import {API_URL} from "../../../http";
import {$routes} from "../../../http/routes";
import {$modules} from "../../../utils/config";
import CategorySelect from "../../CategorySelect";
import {useModules} from "../../../hooks/useModules";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";

const Option = ({ name }) => {
    return <Tag
        size={'md'}
        borderRadius='full'
        variant='solid'
        colorScheme='blue'
    >
        <TagLabel>{name}</TagLabel>
    </Tag>
}

const Property = (props) => {
    return <Box mb={2}>
        <Text fontWeight={'bold'} mb='8px'>{props.title}</Text>
        <HStack align={'flex-start'} justify={'flex-start'} gap={1} wrap={'wrap'}>
            {props.options.map((opt, i) => (
                <Option name={opt} key={'prop-'+props.title+'-'+i} />
            ))}
        </HStack>
        <Box mt={2}>
            <EditProperty updateProperty={props.updateProperty} hasProperty={props.hasProperty} {...props} />
            <Button ml={2} onClick={() => props.deleteProperty(props.title)} size={'sm'}>Удалить опцию</Button>
        </Box>
    </Box>
}

const AddProduct = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [uuid, setUuid] = useState(uuidv4());
    const server = {
        url: API_URL,
        process: 'files/upload/' + uuid + '/images',
        revert: {
            url: 'files/delete/',
            method: 'POST'
        },
    };
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [price, setPrice] = useState('')
    const [inStock, setInStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [discount, setDiscount] = useState(0)
    const [order, setOrder] = useState(0)
    const [properties, setProperties] = useState([])
    const [files, setFiles] = useState([])
    const categories  = useMemo(() => shop.categories, [shop.categories])
    const modules = useModules()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = e => setTitle(e.target.value)
    const handleSubtitleChange = e => setSubtitle(e.target.value)
    const handlePriceChange = e => setPrice(e)
    const handleInStockChange = e => setInStock(e)
    const handleCategoryChange = e => setCategory(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)
    const handleDiscountChange = e => setDiscount(e)
    const handleOrderChange = e => setOrder(e)

    useEffect(() => {
        if(categories && categories.length) setCategory(categories[0].id)
    }, [categories])

    const validationError = (type) => {
        const errors = {
            'title': 'Название обязательно к заполнению.',
            'price': 'Цена обязательна к заполнению.',
            'category': 'Выберите категорию.',
            'order.min': 'Порядок не может быть меньше нуля.',
            'inStock.min': 'Кол-во товара не может быть меньше нуля.',
        }

        new Noty({
            type: 'error',
            text: errors[type],
        }).show()
    }

    const resetFields = () => {
        setTitle('')
        setSubtitle('')
        setPrice('')
        setInStock('')
        setCategory('')
        setDescription('')
        setDiscount('')
        setOrder(0)
        setUuid(uuidv4())
        setFiles([])
        setProperties([])
    }

    const toast = useToast()

    const hasProperty = (title) => {
        return properties.find(prop => prop.title === title)
    }

    const updateProperty = (title, options) => {
        setProperties(properties.map(prop => {
            if(prop.title === title) {
                prop.options = options
            }
            return prop;
        }))
    }

    const addProperty = (title, options) => {
        setProperties([...properties, {
            title, options
        }])
    }

    const deleteProperty = (title) => {
        setProperties(properties.filter(prop => prop.title !== title))
    }

    const handleSubmit = () => {
        if(title.trim() === '') {
            validationError('title')
        } else if(price.trim() === '') {
            validationError('price')
        } else if(category.trim() === '') {
            validationError('category')
        } else if(order < 0) {
            validationError('order.min')
        } else if(inStock < 0) {
            validationError('inStock.min')
        } else {
            shop.createProduct({
                title,
                subtitle,
                price,
                inStock,
                discount,
                priority: order,
                category_id: category,
                description,
                properties,
                uuid,
            }).then((rs) => {
                if(rs.ok) {
                    toast({
                        title: 'Позиция добавлена успешно.',
                        description: '',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                    })

                    shop.requestProducts()
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

                setIsOpen(false)
                resetFields()
            })
        }
    }

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

    return (
        <>
            <div onClick={handleOpen} className={styles.button}>
                <HiPlus/>
            </div>

            <Modal scrollBehavior={'inside'} onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить позицию</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
                            <Box>
                                <FilePond
                                    files={files}
                                    onupdatefiles={setFiles}
                                    server={server}
                                    name="image"
                                    labelIdle='Выберите картинки (макс. 10)'
                                    credits={false}
                                    allowMultiple={true}
                                    maxFiles={10}
                                />
                            </Box>
                            <SimpleGrid columns={{sm: 1, md: 2}} spacing={1}>
                                <Box>
                                    <Text mb='8px'>Название</Text>
                                    <Input
                                        value={title}
                                        onChange={handleTitleChange}
                                        placeholder=''
                                        size='sm'
                                    />
                                </Box>
                                <Box>
                                    <Text mb='8px'>Подзаголовок</Text>
                                    <Input
                                        value={subtitle}
                                        onChange={handleSubtitleChange}
                                        placeholder=''
                                        size='sm'
                                    />
                                </Box>
                            </SimpleGrid>
                            <SimpleGrid columns={{sm: 1, md: 2}} spacing={1}>
                                <Box>
                                    <Text mb='8px'>Цена</Text>
                                    <NumberInput
                                        size='sm'
                                        value={price}
                                        onChange={handlePriceChange}
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper/>
                                            <NumberDecrementStepper/>
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                                <Box>
                                    <Text mb='8px'>В нал.</Text>
                                    <NumberInput
                                        size='sm'
                                        value={inStock}
                                        onChange={handleInStockChange}
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper/>
                                            <NumberDecrementStepper/>
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                            </SimpleGrid>
                            {modules.get($modules.discounts) ? <SimpleGrid columns={{sm: 1, md: 2}} spacing={2}>
                                <CategorySelect
                                    categories={categories}
                                    handleCategoryChange={handleCategoryChange}
                                />
                                <Box>
                                    <Text mb='8px'>Скидка (%)</Text>
                                    <NumberInput
                                        size='sm'
                                        value={discount}
                                        onChange={handleDiscountChange}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                            </SimpleGrid> : <CategorySelect
                                categories={categories}
                                handleCategoryChange={handleCategoryChange}
                            />}
                            <Box>
                                <Text mb='8px'>Приоритет</Text>
                                <NumberInput
                                    size='sm'
                                    value={order}
                                    onChange={handleOrderChange}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text mb='8px'>Описание</Text>
                                <Textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder='Описание...'
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Опции</Text>
                                <AddProperty addProperty={addProperty} hasProperty={hasProperty} />
                                {properties.map((prop, i) => <Property
                                    deleteProperty={deleteProperty}
                                    {...prop}
                                    key={'prop-'+i}
                                    updateProperty={updateProperty}
                                    hasProperty={hasProperty}
                                />)}
                            </Box>
                        </Stack>
                    </ModalBody>
                    <ModalFooter display='flex' alignItems='center' gap={2}>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button onClick={handleSubmit} colorScheme={'blue'}>Сохранить</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AddProduct;