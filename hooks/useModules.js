import store from "../store/store";
import shop from "../store/shop";

export const useModules = () => {
    return {
        get: (name) => shop.options.modules && shop.options.modules.includes(name)
    }
}