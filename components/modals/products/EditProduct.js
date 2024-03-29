import React, {useMemo, useState} from 'react';
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
    Stack, Tag, TagCloseButton, TagLabel,
    Text, Textarea, useToast, VStack
} from "@chakra-ui/react";
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import "filepond/dist/filepond.min.css";
import {FaEdit} from "react-icons/fa";
import {useModules} from "../../../hooks/useModules";
import {$modules} from "../../../utils/config";
import shop from "../../../store/shop";
import {observer} from "mobx-react-lite";
import ImageInput from "../../ImageInput";
import CategorySelect from "../../CategorySelect";
import Noty from "noty";
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

const EditProduct = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(props.title)
    const [subtitle, setSubtitle] = useState(props.subtitle)
    const [price, setPrice] = useState(props.price)
    const [inStock, setInStock] = useState(props.inStock)
    const [category, setCategory] = useState(props.category_id)
    const [order, setOrder] = useState(props.priority || 0)
    const [discount, setDiscount] = useState(props.discount || 0)
    const [properties, setProperties] = useState(props.properties || [])
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
    const handleOrderChange = e => setOrder(e)

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
        } else if(price === '') {
            validationError('price')
        } else if(category === '') {
            validationError('category')
        } else if(order < 0) {
            validationError('order.min')
        } else if(inStock < 0) {
            validationError('inStock.min')
        } else {
            shop.updateProduct(id, {
                title,
                subtitle,
                description,
                price,
                inStock,
                priority: order,
                category_id: category,
                discount,
                properties,
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