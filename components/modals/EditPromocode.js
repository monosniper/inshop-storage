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
    Select,
    Stack, Switch,
    Text,
    useToast
} from "@chakra-ui/react";
import shop from "../../store/shop";
import {FaEdit} from "react-icons/fa";

const EditPromocode = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const [code, setCode] = useState(props.code)
    const [type, setType] = useState(props.type);
    const [value, setValue] = useState(props.value);
    const [limit, setLimit] = useState(props.limit,);
    const [infinite, setInfinite] = useState(props.infinite);
    const [actual_until, setActualUntil] = useState(props.actual_until);

    const id = props.id
    const toast = useToast()

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleCodeChange = e => setCode(e.target.value)
    const handleTypeChange = e => setType(e.target.value)
    const handleValueChange = e => setValue(e)
    const handleLimitChange = e => setLimit(e)
    const handleInfiniteChange = e => setInfinite(e.target.checked)
    const handleActualUntilChange = e => setActualUntil(e.target.value)

    const handleSubmit = () => {
        shop.updatePromocode(id, {
            code,
            type,
            value,
            limit,
            infinite,
            actual_until,
        }).then(() => {
            shop.requestPromocodes()
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
                                <Text mb='8px'>Код</Text>
                                <Input
                                    value={code}
                                    onChange={handleCodeChange}
                                    placeholder=''
                                    size='sm'
                                />
                            </Box>
                            <Box>
                                <Text mb='8px'>Тип</Text>
                                <Select
                                    value={type}
                                    onChange={handleTypeChange}
                                    placeholder=''
                                    size='sm'
                                >
                                    <option value="percent">Процент</option>
                                    <option value="sum">Сумма</option>
                                </Select>
                            </Box>
                            <Box>
                                <Text mb='8px'>Значение</Text>
                                <NumberInput
                                    size='sm'
                                    value={value}
                                    onChange={handleValueChange}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text mb='8px'>Лимит активаций</Text>
                                <NumberInput
                                    size='sm'
                                    value={limit}
                                    onChange={handleLimitChange}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                            <Box>
                                <Text mb='8px'>Бесконечный</Text>
                                <Switch isChecked={infinite} onChange={handleInfiniteChange} />
                            </Box>
                            <Box>
                                <Text mb='8px'>Активен до</Text>
                                <Input
                                    value={actual_until}
                                    onChange={handleActualUntilChange}
                                    placeholder=''
                                    size='sm'
                                    type={'date'}
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

export default EditPromocode;