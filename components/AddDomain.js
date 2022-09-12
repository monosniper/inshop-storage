import React, {useState} from 'react';
import Noty from "noty";
import shop from "../store/shop";
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
    Stack, Switch,
    Text,
} from "@chakra-ui/react";
import {v4 as uuidv4} from "uuid";
import ImageInput from "./ImageInput";
import store from "../store/store";

const AddDomain = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [isSubdomain, setIsSubdomain] = useState(true)

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleNameChange = e => setName(e.target.value)
    const handleIsSubdomainChange = e => setIsSubdomain(e.target.checked)

    const validationError = (type) => {
        const errors = {
            'name': 'Имя обязательно к заполнению.',
        }

        new Noty({
            type: 'error',
            text: errors[type],
        }).show()
    }

    const resetFields = () => {
        setName('')
    }

    const handleSubmit = () => {
        if(name.trim() === '') {
            validationError('title')
        } else {
            store.addDomain({
                name, isSubdomain
            }).then((rs) => {
                new Noty({
                    type: rs.ok ? 'success' : 'error',
                    text: rs.ok ? 'Доменное имя было успешно добавлено.' : rs.message
                }).show()

                setIsOpen(false)
                resetFields()
                store.requestDomains()
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
                    <ModalHeader>Добавить домен</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
                            <label>Поддомен (*.inshop-app.site)</label>
                            <Switch isChecked={isSubdomain} onChange={handleIsSubdomainChange} />
                            <Box>
                                <Text mb='8px'>Имя</Text>
                                <Input
                                    value={name}
                                    onChange={handleNameChange}
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

export default AddDomain;