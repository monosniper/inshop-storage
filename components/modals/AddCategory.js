import React, {useState} from 'react';
import Noty from "noty";
import shop from "../../store/shop";
import styles from "../../styles/AddProduct.module.scss";
import {HiPlus} from "react-icons/hi";
import {
    Box, Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import {v4 as uuidv4} from "uuid";
import ImageInput from "../ImageInput";

const AddCategory = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [uuid, setUuid] = useState(uuidv4());

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = e => setTitle(e.target.value)

    const validationError = (type) => {
        const errors = {
            'title': 'Название обязательно к заполнению.',
        }

        new Noty({
            type: 'error',
            text: errors[type],
        }).show()
    }

    const resetFields = () => {
        setTitle('')
        setUuid(uuidv4())
    }

    const handleSubmit = () => {
        if(title.trim() === '') {
            validationError('title')
        } else {
            shop.createCategory({
                title,
                uuid,
            }).then(() => {
                new Noty({
                    type: 'success',
                    text: 'Категория добавлена успешно.'
                }).show()

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
                    <ModalHeader>Добавить категорию</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
                            <Box>
                                <ImageInput
                                    uuid={uuid}
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Название</Text>
                                <Input
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder=''
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

export default AddCategory;