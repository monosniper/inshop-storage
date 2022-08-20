import React, {useState} from 'react';
import {
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Stack,
    useToast,
    VStack
} from "@chakra-ui/react";
import styles from "../styles/ColorPicker.module.scss";
import {GrPowerReset} from "react-icons/gr";
import {FaSave} from "react-icons/fa";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const SocialNetwork = ({ social_network }) => {
    const [value, setValue] = useState(social_network.value)
    const toast = useToast()
    console.log(toJS(social_network))
    const handleChange = (e) => setValue(e.target.value)

    const handleSave = () => {
        shop.saveSocialNetwork(social_network.id, value).then(() => {
            toast({
                title: `Изменения сохранены.`,
                status: 'success',
                isClosable: true,
            })
        })
    }

    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents='none'
                children={<img style={{padding: 7}} src={social_network.icon_url} alt={social_network.slug}/>}
            />
            <Input type='text' value={value} onChange={handleChange} placeholder='https://your-link.here' />
            <InputRightElement children={<>
                <Button onClick={handleSave} size={'sm'} colorScheme='facebook'><FaSave /></Button>
            </>} />
        </InputGroup>
    );
};

export default observer(SocialNetwork);