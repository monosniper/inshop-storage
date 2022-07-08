import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import {defaultOptions} from "../utils/options";

class Shop {
    id = null
    q = ''
    products = []
    clients = []
    categories = null
    options = {}

    constructor() {
        makeAutoObservable(this)
    }

    setId(id) {
        this.id = id
    }

    setOptions(options) {
        this.options = options;
    }

    setProducts(products) {
        this.products = products
    }

    setClients(clients) {
        this.clients = clients
    }

    setCategories(categories) {
        this.categories = categories
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if(data) {
            console.log(data.categories)
            this.setCategories(data.categories);
            this.setOptions(data.options);
            this.setId(data.id);
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.requestProducts(this.id);

        this.setProducts(rs)

        return rs;
    }

    async makeOrder(shipping_data, products) {
        const response = await ShopService.makeOrder(shipping_data, products)

        return response.status
    }

    getProduct(id) {
        return this.products.find(product => product.id+'' === id+'')
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