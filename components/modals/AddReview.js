import React, {useState} from 'react';
import shop from "../../store/shop";
import styles from "../../styles/AddProduct.module.scss";
import {HiPlus} from "react-icons/hi";
import {
    Box, Button, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
    Stack, Text, Textarea, useToast
} from "@chakra-ui/react";

const AddReview = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [author_name, setAuthorName] = useState('')
    const [author_url, setAuthorUrl] = useState('')
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    const [date, setDate] = useState(null)
    const toast = useToast()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleAuthorNameChange = e => setAuthorName(e.target.value)
    const handleAuthorUrlChange = e => setAuthorUrl(e.target.value)
    const handleContentChange = e => setContent(e.target.value)
    const handleDateChange = e => setDate(e.target.value)

    const validationError = (type) => {
        const errors = {
            'author_name': 'Поле автор обязательно к заполнению.',
            'content': 'Поле контент обязательно к заполнению.',
            'date': 'Поле дата обязательно к заполнению.',
        }
        toast({
            title: errors[type],
            description: '',
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }

    const resetFields = () => {
        setAuthorName('')
        setAuthorUrl('')
        setContent('')
        setRating(0)
        setDate(null)
    }

    const handleSubmit = () => {
        if(content.trim() === '') {
            validationError('content')
        } else if(author_name.trim() === '') {
            validationError('author_name')
        } else if(date.trim() === '') {
            validationError('date')
        } else {
            shop.createReview({
                author_name,
                author_url,
                content,
                rating,
                date,
            }).then(() => {
                shop.requestReviews()
                toast({
                    title: 'Отзыв добавлен успешно.',
                    description: '',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })

                setIsOpen(false)
                resetFields()
            })
        }
    }

    return (
        <>
            <div onClick={handleOpen} className={styles.button}>
                <HiPlus/>
            </div>

            <Modal onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить отзыв</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
                            <Box>
                                <Text mb='8px'>Автор</Text>
                                <Input
                                    value={author_name}
                                    onChange={handleAuthorNameChange}
                                    placeholder=''
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Ссылка на автора</Text>
                                <Input
                                    value={author_url}
                                    onChange={handleAuthorUrlChange}
                                    placeholder=''
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Оценка</Text>
                                <NumberInput
                                    size='sm'
                                    value={rating}
                                    onChange={setRating}
                                >
                                    <NumberInputField/>
                                    <NumberInputStepper>
                                        <NumberIncrementStepper/>
                                        <NumberDecrementStepper/>
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text mb='8px'>Контент</Text>
                                <Textarea
                                    value={content}
                                    onChange={handleContentChange}
                                    placeholder=''
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Дата</Text>
                                <Input
                                    value={date}
                                    onChange={handleDateChange}
                                    placeholder=''
                                    type={'date'}
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

export default AddReview;