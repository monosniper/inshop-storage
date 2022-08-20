import React, {useState} from 'react';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {
    Box,
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Select,
    SimpleGrid,
    Stack,
    Text, useToast
} from "@chakra-ui/react";
import {FaEdit} from "react-icons/fa";
import {API_URL} from "../../http";
import ImageInput from "../ImageInput";
import shop from "../../store/shop";

const EditCategory = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [title, setTitle] = useState(props.title)
    const {id, uuid, icon_url, icon_name} = props.row
    const toast = useToast()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleTitleChange = e => setTitle(e.target.value)

    const handleSubmit = () => {
        shop.updateCategory(id, {title}).then(() => {
            shop.requestCategories()
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

    registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

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
                                <Text mb='8px'>Название</Text>
                                <Input
                                    value={title}
                                    onChange={handleTitleChange}
                                    placeholder=''
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <ImageInput
                                    uuid={uuid}
                                    images={[icon_name]}
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

export default EditCategory;