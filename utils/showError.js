import Noty from "noty";
import {useToast} from "@chakra-ui/react";

export const showError = (text) => {
    // const toast = useToast()
    new Noty({
        type: 'error', text
    }).show()
    // toast({
    //     title,
    //     description,
    //     status: 'error',
    //     duration: 9000,
    //     isClosable: true,
    // })
}