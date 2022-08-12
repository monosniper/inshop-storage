import store from "../store/store";
import shop from "../store/shop";
import {useMemo} from "react";

export const useModules = () => {
    const modules = useMemo(() => shop.modules, [shop.modules])

    return {
        get: (name) => {
            const module = modules.find(module => module.slug === name)
            return modules && module && module.isActive
        }
    }
}