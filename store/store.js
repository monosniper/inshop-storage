import {makeAutoObservable, toJS} from "mobx";
import UserService from "../services/UserService";
import ShopService from "../services/ShopService";
import {defaultOptions} from "../utils/options";
import shop from "./shop";

class Store {
    user = null;
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
    }
    shops = []

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user = user
    }

    setShops(shops) {
        this.shops = shops;
    }

    setShop(shop) {
        this.shop = shop
    }

    async requestAccessToken(code) {
        const access_token = await UserService.requestAccessToken(code);

        localStorage.setItem(this.localStorage.token, access_token);

        return access_token;
    }

    async requestUser() {
        const user = await UserService.requestUser();

        localStorage.setItem(this.localStorage.user, JSON.stringify(user));
        this.setUser(user);

        return user;
    }

    async requestShop(id) {
        const data = this.shops.find(shop => shop.id+'' === id+'');

        shop.setCategories(data.categories);
        shop.setOptions(data.options);
        shop.setId(data.id);

        const rs = await ShopService.requestProducts(id);

        shop.setProducts(rs.data.data);

        return data;
    }

    async requestShops() {
        const shops = await UserService.requestShops();

        localStorage.setItem(this.localStorage.shops, JSON.stringify(shops));
        this.setShops(shops);

        return shops;
    }

    async getDomains() {
        const domains = await UserService.requestDomains();

        return domains;
    }
}

export default new Store()