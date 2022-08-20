import React, {useState} from 'react';
import {Button, Input, InputGroup, InputLeftElement, InputRightElement, Tooltip, useToast} from "@chakra-ui/react";
import styles from '../styles/ColorPicker.module.scss'
import {FaSave} from "react-icons/fa";
import shop from "../store/shop";
import {GrPowerReset} from "react-icons/gr";
import {observer} from "mobx-react-lite";

const ColorPicker = ({ color }) => {
    const [value, setValue] = useState(color.value ? color.value : color.default_value)
    const toast = useToast()

    const handleChange = (e) => setValue(e.target.value)

    const handleSave = () => {
        shop.saveColor(color.id, value).then(() => {
            toast({
                title: `Цвет сохранён.`,
                status: 'success',
                isClosable: true,
            })
        })
    }

    const handleReset = () => {
        setValue(color.default_value)

        shop.resetColor(color.id).then(() => {
            shop.requestColors().then(() => {
                toast({
                    title: `Цвет сброшен.`,
                    status: 'success',
                    isClosable: true,
                })
            })
        })
    }

    return (
        <div className={styles.row}>
            <Tooltip label={color.description}>
                <div className={styles.title}>{color.name}</div>
            </Tooltip>
            <InputGroup>
                <InputLeftElement
                    pointerEvents='none'
                    children={<div className={styles.value} style={{background:value}} />}
                />
                <Input type='text' value={value} onChange={handleChange} placeholder='#000000' />
                <InputRightElement children={<>
                    <Button mr={1} onClick={handleReset} size={'sm'} colorScheme='green'><GrPowerReset /></Button>
                    <Button onClick={handleSave} size={'sm'} colorScheme='facebook'><FaSave /></Button>
                </>} />
            </InputGroup>
        </div>
    );
};

export default observer(ColorPicker);