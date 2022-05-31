import React, {useState} from 'react';
import Noty from "noty";
import shop from "../store/shop";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import styles from "../styles/AddProduct.module.scss";
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

const AddCategory = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [files, setFiles] = useState([])

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
    }

    const handleSubmit = () => {
        if(title === '') {
            validationError('title')
        } else {
            shop.createCategory({
                title,
            }).then(() => {
                new Noty({
                    type: 'success',
                    text: 'Категория добавлена успещно.'
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
                    <ModalHeader>Добавить категорию</ModalHeader>
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