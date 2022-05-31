import Noty from "noty";

export const showMessage = (text) => {
    new Noty({
        type: 'success', text
    }).show()
}