import Noty from "noty";

export const showError = (text) => {
    new Noty({
        type: 'error', text
    }).show()
}