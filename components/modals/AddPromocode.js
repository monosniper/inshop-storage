import React, {useState} from 'react';
import Noty from "noty";
import shop from "../../store/shop";
import styles from "../../styles/AddProduct.module.scss";
import {HiPlus} from "react-icons/hi";
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
} from "@chakra-ui/react";
import {showError} from "../../utils/showError";

const AddPromocode = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [code, setCode] = useState('')
    const [type, setType] = useState('percent');
    const [value, setValue] = useState('');
    const [limit, setLimit] = useState('');
    const [infinity, setInfinity] = useState(false);
    const [actual_until, setActualUntil] = useState(null);

    const handleOpen = () => setIsOpen(true)
    const handleClose = () => setIsOpen(false)

    const handleCodeChange = e => setCode(e.target.value)
    const handleTypeChange = e => setType(e.target.value)
    const handleValueChange = e => setValue(e)
    const handleLimitChange = e => setLimit(e)
    const handleInfinityChange = e => setInfinity(e.target.checked)
    const handleActualUntilChange = e => setActualUntil(e.target.value)

    const validationError = (type) => {
        const errors = {
            'code': 'Необходимо заполнить поле код.',
            'value': 'Необходимо заполнить поле значение.',
        }

        new Noty({
            type: 'error',
            text: errors[type],
        }).show()
    }

    const resetFields = () => {
        setCode('')
        setType('percent')
        setValue('')
        setLimit('')
        setInfinity('')
        setActualUntil('')
    }

    const handleSubmit = () => {
        if(code.trim() === '') {
            validationError('code')
        } else if(value.trim() === '') {
            validationError('value.')
        } else {
            shop.createPromocode({
                code,
                type,
                value,
                limit,
                infinity,
                actual_until,
            }).then((rs) => {
                new Noty({
                    type: 'success',
                    text: 'Промокод добавлен успешно.'
                }).show()
                resetFields()
                setIsOpen(false)

            }).catch(() => {
                new Noty({
                    type: 'error',
                    text: 'Произошла какая-то ошибка. Возможно, такой промокод уже существует.'
                }).show()
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
                    <ModalHeader>Добавить промокод</ModalHeader>
                    <ModalCloseButton/>
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
                                <Switch isChecked={infinity} onChange={handleInfinityChange} />
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

export default AddPromocode;