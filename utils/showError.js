import Noty from "noty";
import {useToast} from "@chakra-ui/react";

export const showError = (text) => {
    const toast = useToast()
    console.log(toast)
    new Noty({
        type: 'error', text
    }).show()

}