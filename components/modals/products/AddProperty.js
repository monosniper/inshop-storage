import React, {useEffect, useState} from 'react';
import styles from "../../../styles/AddProduct.module.scss";
import {HiPlus} from "react-icons/hi";
import {
    Box, Button, HStack, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid,
    Stack, Tag, TagCloseButton, TagLabel, Text, useToast
} from "@chakra-ui/react";
import {v4 as uuidv4} from "uuid";
import {$config} from "../../../utils/config";
import {showError} from "../../../utils/showError";
import {useMessage} from "../../../hooks/useMessage";

const Option = ({ name, handleRemoveOption }) => {
    return <Tag
        size={'md'}
        borderRadius='full'
        variant='solid'
        colorScheme='blue'
    >
        <TagLabel>{name}</TagLabel>
        <TagCloseButton onClick={() => handleRemoveOption(name)} />
    </Tag>
}

const AddProperty = ({ hasProperty, addProperty }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [name, setName] = useState('')
    const [options, setOptions] = useState([])
    const [uuid, setUuid] = useState(uuidv4());
    const toast = useToast()
    const showMessage = useMessage()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = (e) => setTitle(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)

    const handleSubmit = () => {
        const value = title.trim();

        if(options.length >= 1) {
            if(value !== '') {
                if(!hasProperty(value)) {
                    addProperty(value, options)
                    setTitle('')
                    handleClose()
                    showMessage('Опция создана')
                } else {
                    showMessage('Такая опция уже существует', true)
                }
            } else {
                showMessage('Необходимо заполнить поле название', true)
            }
        } else {
            showMessage('Добавьте хотя-бы одно значение', true)
        }
    }

    const handleAddOption = () => {
        const value = name.trim();

        if(options.length < $config.options_limit) {
            if(value !== '') {
                if(!options.includes(value)) {
                    setOptions([...options, value])
                    setName('')
                } else {
                    showMessage('Такое значение уже существует', true)
                }
            }
        } else {
            showMessage('Максимальное количество значений для опции - ' + $config.options_limit, true)
        }
    }

    const handleRemoveOption = (name) => {
        setOptions(options.filter(opt => opt !== name))
    }

    return (
        <>
            <Button onClick={handleOpen}>Добавить</Button>

            <Modal onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Добавить опцию</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
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
                                    <Text mb='8px'>Значение</Text>
                                    <HStack spacing={2}>
                                        <Input
                                            value={name}
                                            onChange={handleNameChange}
                                            placeholder=''
                                            size='sm'
                                        />
                                        <Button onClick={handleAddOption} size={'sm'}><HiPlus /></Button>
                                    </HStack>
                                </Box>
                            </SimpleGrid>
                            <Box>
                                <HStack gap={1} wrap={'wrap'}>
                                    {options.map((opt, i) => (
                                        <Option handleRemoveOption={handleRemoveOption} name={opt} key={'opt-'+uuid+'-'+i} />
                                    ))}
                                </HStack>
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

export default AddProperty;