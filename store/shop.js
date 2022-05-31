import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import {defaultOptions} from "../utils/options";

class Shop {
    id = null
    options = defaultOptions
    domain = ''
    products = []
    categories = []

    constructor() {
        makeAutoObservable(this)
    }

    setId(id) {
        this.id = id
    }

    setDomain(domain) {
        this.domain = domain;
    }

    setOptions(options) {
        this.options = options;
    }

    setProducts(products) {
        this.products = products;
    }

    setCategories(categories) {
        this.categories = categories;
    }

    async createProduct(data) {
        const rs = await ShopService.createProduct(this.id, {shop_id: this.id, ...data})

        this.setProducts([...this.products, rs.data.data])

        return rs;
    }

    async createCategory(data) {
        const rs = await ShopService.createCategory(this.id, {shop_id: this.id, ...data})

        this.setCategories([...this.categories, rs.data.data])

        return rs;
    }

    async updateProduct(id, data) {
        const rs = await ShopService.updateProduct(this.id, id, data)

        return rs;
    }
}

export default new Shop()