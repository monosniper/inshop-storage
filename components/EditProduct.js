import React, {useMemo, useState} from 'react';
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
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import {FaEdit} from "react-icons/fa";
import {useModules} from "../hooks/useModules";
import {$modules} from "../utils/config";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import ImageInput from "./ImageInput";
import CategorySelect from "./CategorySelect";

const EditProduct = (props) => {
    console.log(props.discount || 0)
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [subtitle, setSubtitle] = useState(props.subtitle)
    const [price, setPrice] = useState(props.price)
    const [inStock, setInStock] = useState(props.inStock)
    const [category, setCategory] = useState(props.category_id)
    const [discount, setDiscount] = useState(props.discount || 0)
    const [description, setDescription] = useState(props.description || '')
    const [uuid, setUuid] = useState(props.uuid);
    const categories = useMemo(() => shop.categories, [shop.categories])
    const {id} = props
    const modules = useModules()
    const toast = useToast()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = e => setTitle(e.target.value)
    const handleSubtitleChange = e => setSubtitle(e.target.value)
    const handlePriceChange = e => setPrice(e)
    const handleInStockChange = e => setInStock(e)
    const handleCategoryChange = e => setCategory(e.target.value)
    const handleDiscountChange = e => setDiscount(e)
    const handleDescriptionChange = e => setDescription(e.target.value)

    const handleSubmit = () => {
        shop.updateProduct(id, {
            title,
            subtitle,
            description,
            price,
            inStock,
            category_id: category,
            discount,
        }).then(() => {
            shop.requestProducts()
            toast({
                title: 'Изменения сохранены',
                description: '',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setIsOpen(false)
        })
    }

    return (
        <>
            <Button mx={1} onClick={handleOpen} colorScheme={'green'}><FaEdit /></Button>

            <Modal
                onClose={handleClose}
                closeOnOverlayClick={false}
                isOpen={isOpen}
                isCentered
                scrollBehavior={'inside'}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редактировать</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={2}>
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
                            <SimpleGrid columns={{sm: 1, md: 2}} spacing={2}>
                                <Box>
                                    <Text mb='8px'>Цена</Text>
                                    <NumberInput
                                        size='sm'
                                        value={price}
                                        onChange={handlePriceChange}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                                <Box>
                                    <Text mb='8px'>В наличии (кол-во)</Text>
                                    <NumberInput
                                        size='sm'
                                        value={inStock}
                                        onChange={handleInStockChange}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper>
                                            <NumberIncrementStepper />
                                            <NumberDecrementStepper />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Box>
                            </SimpleGrid>
                            {modules.get($modules.discounts) ? <SimpleGrid columns={{sm: 1, md: 2}} spacing={2}>
                                <CategorySelect
                                    category={category}
                                    category_id={props.category_id}
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
                                category={category}
                                category_id={props.category_id}
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
                                    value={description}
                                />
                            </Box>
                            <Box>
                                <ImageInput
                                    uuid={uuid}
                                    images={props.images_names}
                                    multiple={true}
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

export default observer(EditProduct);