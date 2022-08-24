import React, {useEffect, useMemo, useState} from 'react';
import styles from '../styles/AddProduct.module.scss'
import {HiPlus} from "react-icons/hi";
import {
    Box,
    Button,
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
    Stack,
    Text, Textarea, useToast
} from "@chakra-ui/react";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import shop from "../store/shop";
import Noty from "noty";
import { v4 as uuidv4 } from 'uuid';
import {API_URL} from "../http";
import {$routes} from "../http/routes";
import {$modules} from "../utils/config";
import CategorySelect from "./CategorySelect";
import {useModules} from "../hooks/useModules";

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

    const validationError = (type) => {
        const errors = {
            'title': 'Название обязательно к заполнению.',
            'price': 'Цена обязательна к заполнению.',
            'category': 'Выберите категорию.',
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
        setUuid(uuidv4())
        setFiles([])
    }

    const toast = useToast()

    const handleSubmit = () => {
        if(title.trim() === '') {
            validationError('title')
        } else if(price.trim() === '') {
            validationError('price')
        } else if(category.trim() === '') {
            validationError('category')
        } else {
            shop.createProduct({
                title,
                subtitle,
                price,
                inStock,
                discount,
                category_id: category,
                description,
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

            <Modal onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
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
                                <Text mb='8px'>Описание</Text>
                                <Textarea
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    placeholder='Описание...'
                                    size='sm'
                                />
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