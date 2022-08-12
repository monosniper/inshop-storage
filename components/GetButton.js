import React, {useEffect, useMemo, useState} from 'react';
import {Button, Tag} from "@chakra-ui/react";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";

const GetButton = ({ id, price, onClick=()=>{} }) => {
    const hasModule = useMemo(() => shop.hasModule(id), [shop.modules])
    const _price = parseFloat(price);

    return hasModule ? (
        <Tag style={{height: 32}}>Добавлен</Tag>
    ) : (
        <Button onClick={onClick} size='sm' colorScheme='facebook'>
            {_price ? 'Купить' : 'Получить'}
        </Button>
    );
};

export default observer(GetButton);