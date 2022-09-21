import {useToast} from "@chakra-ui/react";
import {$config} from "../utils/config";
import Noty from "noty";

export const useMessage = () => (text, error=false) => {
    new Noty({
        type: error ? 'error' : 'success', text
    }).show()
}