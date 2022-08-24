import {makeAutoObservable} from "mobx";
import UserService from "../services/UserService";
import ShopService from "../services/ShopService";
import shop from "./shop";

class Store {
    user = {
        auth: false,
        data: null
    };
    authorized = false;
    localStorage = {
        token: 'token',
        user: 'user',
        shops: 'shops',
    }
    shop = {
        id: null,
        options: {
            title: '',
            subtitle: '',
        },
        categories: [],
        products: [],
        clients: [],
    }
    shops = []
    modules = []
    domains = []

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user.auth = true
        this.user.data = user
    }

    setAuthorized(bool) {
        this.authorized = bool;
    }

    setShops(shops) {
        this.shops = shops;
    }

    setDomains(domains) {
        this.domains = domains;
    }

    setShop(shop) {
        this.shop = shop
    }

    setModules(modules) {
        this.modules = modules
    }

    async requestAccessToken(code) {
        const access_token = await UserService.requestAccessToken(code);

        localStorage.setItem(this.localStorage.token, access_token);

        return access_token;
    }

    async requestUser() {
        const user = await UserService.requestUser();

        localStorage.setItem(this.localStorage.user, JSON.stringify(user));
        this.setUser(user.data);

        return user.data;
    }

    async requestModules() {
        const modules = await ShopService.requestModules();

        this.setModules(modules);

        return modules;
    }

    async updateUser(data) {
        return await UserService.updateUser(data)
    }

    async changePassword(data) {
        return await UserService.changePassword(data)
    }

    requestShop(id) {
        const data = this.shops.find(shop => shop.id === parseInt(id));

        if(data) {
            shop.setCategories(data.categories);
            shop.setOptions(data.options);
            shop.setId(data.id);
            shop.setProducts(data.products);
            shop.setClients(data.clients);
            shop.setModules(data.modules);
            shop.setLayoutOptions(data.layout);
            shop.setColors(data.colors);
            shop.setSocialNetworks(data.social_networks);
            shop.setDomain(data.domain);
            shop.setReviews(data.reviews);
        }

        return data;
    }

    async requestShops() {
        const shops = await UserService.requestShops();

        localStorage.setItem(this.localStorage.shops, JSON.stringify(shops));
        this.setShops(shops);

        shops.length && this.requestShop(shops[0].id)

        return shops;
    }

    async requestDomains() {
        const domains = await UserService.requestDomains();
        this.setDomains(domains)
        return domains;
    }

    async checkAuth() {
        const rs = await UserService.requestUser();

        if(rs.ok) {
            localStorage.setItem(this.localStorage.user, JSON.stringify(rs.data));
            this.setUser(rs.data);
            this.setAuthorized(true)
        }

        return rs;
    }
}

export default new Store()