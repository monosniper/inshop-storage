import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";

class Shop {
    loaded = false
    id = null
    q = ''
    products = []
    clients = []
    modules = []
    categories = []
    options = {}
    layoutOptions = []

    constructor() {
        makeAutoObservable(this)
    }

    setId(id) {
        this.loaded = true
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

    setModules(modules) {
        this.modules = modules
    }

    setCategories(categories) {
        this.categories = categories
    }

    setLayoutOptions(layoutOptions) {
        this.layoutOptions = layoutOptions
    }

    hasModule(id) {
        return this.modules.find(module => module.id === id) !== undefined;
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if(data) {
            this.setCategories(data.categories);
            this.setOptions(data.options);
            this.setLayoutOptions(data.layout);
            this.setId(data.id);
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.requestProducts(this.id);

        this.setProducts(rs)

        return rs;
    }

    async requestLayoutOptions() {
        const rs = await ShopService.requestLayoutOptions(this.id);

        this.setLayoutOptions(rs)

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
        return await ShopService.updateProduct(this.id, id, data)
    }

    async requestModules() {
        const rs = await ShopService.getModules(this.id)
        if(rs.data) {
            this.setModules(rs.data)
        }
        return rs;
    }

    async requestClients() {
        const rs = await ShopService.getClients(this.id)
        if(rs.data) {
            this.setClients(rs.data)
        }
        return rs;
    }

    async requestCategories() {
        const rs = await ShopService.getCategories(this.id)
        if(rs.data) {
            this.setCategories(rs.data)
        }
        return rs;
    }

    async save() {
        await ShopService.save(this.id, this.options);
    }

    async update(options) {
        this.setOptions(Object.assign(this.options, options))
        return await this.save()
    }

    async create(domain_id, options) {
        return await ShopService.create({
            user_id: store.user.data.id, domain_id, options
        })
    }

    async delete(id) {
        return await ShopService.delete(id)
    }

    async deleteProduct(id) {
        return await ShopService.deleteProduct(this.id, id)
    }

    async deleteClient(id) {
        return await ShopService.deleteClient(this.id, id)
    }

    async deleteProducts(ids) {
        return await ShopService.deleteProducts(this.id, ids)
    }

    async deleteCategory(id) {
        return await ShopService.deleteCategory(this.id, id)
    }

    async deleteCategories(ids) {
        return await ShopService.deleteCategories(this.id, ids)
    }

    async deleteClients(ids) {
        return await ShopService.deleteClients(this.id, ids)
    }

    async getModule(id) {
        return await ShopService.getModule(this.id, id)
    }

    async toggleModule(id, bool) {
        return await ShopService.toggleModule(this.id, id, bool)
    }

    async toggleLayout(id, bool) {
        return await ShopService.toggleLayout(this.id, id, bool)
    }
}

export default new Shop()