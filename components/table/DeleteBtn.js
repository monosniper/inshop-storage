import React from 'react';
import {AiFillDelete} from "react-icons/ai";
import {Button} from "@chakra-ui/react";
import shop from "../../store/shop";

const DeleteBtn = ({ id, deleteItem, requestItems }) => {
    const handleClick = () => {
        deleteItem(id).then(() => {
            requestItems && requestItems()
        })
    }

    return (
        <Button mx={1} onClick={handleClick} colorScheme={'red'}><AiFillDelete /></Button>
    );
};

export default DeleteBtn;