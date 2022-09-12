import {makeAutoObservable, toJS} from "mobx";
import ShopService from "../services/ShopService";
import store from "./store";
import UserService from "../services/UserService";

class Shop {
    loaded = false
    id = null
    q = ''
    domain = ''
    products = []
    clients = []
    modules = []
    categories = []
    options = {}
    layoutOptions = []
    colors = []
    social_networks = []
    banners = []
    customPages = []
    reviews = []
    orders = []
    filters = []

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

    setFilters(filters) {
        this.filters = filters;
    }

    setOrders(orders) {
        this.orders = orders;
    }

    setReviews(reviews) {
        this.reviews = reviews;
    }

    setDomain(domain) {
        this.domain = domain;
    }

    setBanners(banners) {
        this.banners = banners;
    }

    setProducts(products) {
        this.products = products
    }

    setClients(clients) {
        this.clients = clients
    }

    setColors(colors) {
        this.colors = colors
    }

    setSocialNetworks(social_networks) {
        this.social_networks = social_networks
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

    setCustomPages(customPages) {
        this.customPages = customPages
    }

    hasModule(id) {
        return this.modules.find(module => module.id === id) !== undefined;
    }

    async requestData() {
        const data = await ShopService.requestShop();

        if (data) {
            this.setCategories(data.categories);
            this.setOptions(data.options);
            this.setLayoutOptions(data.layout);
            this.setId(data.id);
            this.setDomain(data.domain);
        }

        return data;
    }

    async requestProducts() {
        const rs = await ShopService.requestProducts(this.id);

        this.setProducts(rs)

        return rs
    }

    async requestCustomPages() {
        const rs = await ShopService.requestCustomPages(this.id);

        this.setCustomPages(rs.data.data)

        return rs;
    }

    async requestLayoutOptions() {
        const rs = await ShopService.requestLayoutOptions(this.id);

        this.setLayoutOptions(rs)

        return rs;
    }

    async requestFilters() {
        const rs = await ShopService.requestFilters(this.id);

        this.setFilters(rs)

        return rs;
    }

    async makeOrder(shipping_data, products) {
        const response = await ShopService.makeOrder(shipping_data, products)

        return response.status
    }

    getProduct(id) {
        return this.products.find(product => product.id + '' === id + '')
    }

    async createProduct(data) {
        return await ShopService.createProduct(this.id, {shop_id: this.id, ...data})
    }

    async createCategory(data) {
        const rs = await ShopService.createCategory(this.id, {shop_id: this.id, ...data})

        this.setCategories([...this.categories, rs.data.data])

        return rs;
    }

    async createReview(data) {
        return await ShopService.createReview(this.id, {shop_id: this.id, ...data})
    }

    async updateProduct(id, data) {
        return await ShopService.updateProduct(this.id, id, data)
    }

    async updateReview(id, data) {
        return await ShopService.updateReview(this.id, id, data)
    }

    async updateCustomPage(id, data) {
        return await ShopService.updateCustomPage(this.id, id, data)
    }

    async requestModules() {
        const rs = await ShopService.getModules(this.id)
        if (rs.data) {
            this.setModules(rs.data)
        }
        return rs;
    }

    async requestBanners() {
        const rs = await ShopService.getBanners(this.id)
        if (rs.data) {
            this.setBanners(rs.data)
        }
        return rs;
    }

    async requestClients() {
        const rs = await ShopService.getClients(this.id)
        if (rs.data) {
            this.setClients(rs.data)
        }
        return rs;
    }

    async requestColors() {
        const rs = await ShopService.getColors(this.id)
        if (rs.data) {
            this.setColors(rs.data)
        }
        return rs;
    }

    async requestCategories() {
        const rs = await ShopService.getCategories(this.id)
        if (rs.data) {
            this.setCategories(rs.data)
        }
        return rs;
    }

    async requestOrders() {
        const rs = await ShopService.getOrders(this.id)
        if (rs.data) {
            this.setOrders(rs.data)
        }
        return rs;
    }

    async requestReviews() {
        const rs = await ShopService.getReviews(this.id)
        if (rs.data) {
            this.setReviews(rs.data)
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

    async create(domain_id, uuid, options) {
        return await ShopService.create({
            user_id: store.user.data.id, domain_id, uuid, options
        })
    }

    async delete(id) {
        return await ShopService.delete(id)
    }

    async deleteProduct(id) {
        return await ShopService.deleteProduct(this.id, id)
    }

    async deleteCustomPage(id) {
        return await ShopService.deleteCustomPage(this.id, id)
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

    async deleteReview(id) {
        return await ShopService.deleteReview(this.id, id)
    }

    async deleteReviews(ids) {
        return await ShopService.deleteReviews(this.id, ids)
    }

    async deleteClients(ids) {
        return await ShopService.deleteClients(this.id, ids)
    }

    async deleteOrders(ids) {
        return await ShopService.deleteOrders(this.id, ids)
    }

    async deleteBanner(id) {
        return await ShopService.deleteBanner(this.id, id)
    }

    async deleteOrder(id) {
        return await ShopService.deleteOrder(this.id, id)
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

    async toggleFilter(id, bool) {
        return await ShopService.toggleFilter(this.id, id, bool)
    }

    async saveColor(id, value) {
        return await ShopService.saveColor(this.id, id, value)
    }

    getCustomPage(id) {
        return this.customPages.find(page => page.id + '' === id)
    }

    async createCustomPage(data) {
        return await ShopService.createCustomPage(this.id, data)
    }

    async saveSocialNetwork(id, value) {
        return await ShopService.saveSocialNetwork(this.id, id, value)
    }

    async resetColor(id) {
        return await ShopService.resetColor(this.id, id)
    }

    async getBannerTypes() {
        return await ShopService.getBannerTypes(this.id)
    }

    async createBanner(data) {
        return await ShopService.createBanner(this.id, data)
    }

    async saveBanner(data, order) {
        return await ShopService.saveBanner(this.id, data, order)
    }

    async updateCategory(id, data) {
        return await ShopService.updateCategory(this.id, id, data)
    }
}

export default new Shop()