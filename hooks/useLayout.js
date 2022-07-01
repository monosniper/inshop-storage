import store from "../store/store";
import shop from "../store/shop";

export const useLayout = () => {
    // console.log(store.options)
    return {
        get: (name) => shop.options.layout && shop.options.layout[name]
    }
}