import React, {useState} from 'react';
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
    Text, Textarea
} from "@chakra-ui/react";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import shop from "../store/shop";
import Noty from "noty";

const AddProduct = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [price, setPrice] = useState('')
    const [inStock, setInStock] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [properties, setProperties] = useState([])
    const [files, setFiles] = useState([])

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = e => setTitle(e.target.value)
    const handleSubtitleChange = e => setSubtitle(e.target.value)
    const handlePriceChange = e => setPrice(e)
    const handleInStockChange = e => setInStock(e)
    const handleCategoryChange = e => setCategory(e.target.value)
    const handleDescriptionChange = e => setDescription(e.target.value)

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
    }

    const handleSubmit = () => {
        if(title === '') {
            validationError('title')
        } else if(price === '') {
            validationError('price')
        } else if(category === '') {
            validationError('category')
        } else {
            shop.createProduct({
                title,
                subtitle,
                price,
                inStock,
                category_id: category,
                description,
            }).then(() => {
                new Noty({
                    type: 'success',
                    text: 'Позиция добавлена успещно.'
                }).show()

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
                                    server="/api"
                                    name="logo"
                                    labelIdle='Выберите картинку'
                                    credits={false}
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
                            <SimpleGrid columns={{sm: 1, md: 3}} spacing={1}>
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
                                <Box>
                                    <Text mb='8px'>Категория</Text>
                                    <Select
                                        onChange={handleCategoryChange}
                                        placeholder='Категория'
                                        size='sm'
                                    >
                                        {shop.categories.map((cat, i) => <option value={cat.id}
                                                                                       key={'category-option-' + i}>{cat.title}</option>)}
                                    </Select>
                                </Box>
                            </SimpleGrid>
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