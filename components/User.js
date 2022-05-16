import React from 'react';
import {Avatar, Flex} from "@chakra-ui/react";

const User = (props) => {
    return (
        <Flex align={'center'} gap={'1rem'}>
            <Avatar src='https://bit.ly/dan-abramo32v' />
            <p>{props.name}</p>
        </Flex>
    );
};

export default User;