import React, {useState} from 'react';
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
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text, Textarea,
    useToast
} from "@chakra-ui/react";
import shop from "../../store/shop";
import {FaEdit} from "react-icons/fa";

const EditReview = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [author_name, setAuthorName] = useState(props.row.author_name)
    const [author_url, setAuthorUrl] = useState(props.row.author_url)
    const [content, setContent] = useState(props.row.content)
    const [rating, setRating] = useState(props.row.rating)
    const [date, setDate] = useState(props.row.date)
    const {id} = props.row
    const toast = useToast()
    console.log(date)
    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleAuthorNameChange = e => setAuthorName(e.target.value)
    const handleAuthorUrlChange = e => setAuthorUrl(e.target.value)
    const handleContentChange = e => setContent(e.target.value)
    const handleDateChange = e => setDate(e.target.value)

    const handleSubmit = () => {
        shop.updateReview(id, {
            author_name,
            author_url,
            content,
            rating,
            date,
        }).then(() => {
            shop.requestReviews()
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

            <Modal onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Редактировать</ModalHeader>
                    <ModalCloseButton />
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

export default EditReview;