import React, {useState} from 'react';
import {v4 as uuidv4} from "uuid";
import {
    Box,
    Button, HStack, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid, Stack, Tag, TagCloseButton, TagLabel, Text,
    useToast
} from "@chakra-ui/react";
import {useMessage} from "../../../hooks/useMessage";
import {$config} from "../../../utils/config";
import {HiPlus} from "react-icons/hi";

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

const EditProperty = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [options, setOptions] = useState(props.options)
    const [uuid, setUuid] = useState(uuidv4());
    const showMessage = useMessage()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleNameChange = (e) => setName(e.target.value)

    const handleSubmit = () => {
        if(options.length >= 1) {
            props.updateProperty(props.title, options)
            handleClose()
            showMessage('Опция создана')
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
            <Button size={'sm'} onClick={handleOpen}>Редактировать</Button>

            <Modal onClose={handleClose} closeOnOverlayClick={false} isOpen={isOpen} isCentered>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Редактировать опцию</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack spacing={2}>
                            <SimpleGrid columns={{sm: 1, md: 2}} spacing={1}>
                                <Box>
                                    <Text mb='8px'>Название</Text>
                                    <Input
                                        value={props.title}
                                        readonly
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

export default EditProperty;