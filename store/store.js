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

    setOptions(options) {
        this.shop.options = {...this.shop.options, ...options};
    }

    setUser(user) {
        this.user = user
    }

    setAuthorized(bool) {
        this.authorized = bool
    }

    setShopId(id) {
        this.shop.id = id
    }

    setShops(shops) {
        this.shops = shops;
    }

    setShopData(id, options) {
        const newShops = toJS(this.shops)

        newShops.map(shop => {
            if(shop.id === id) shop.options = options;
        })

        this.shops = newShops;
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

    async requestShop() {
        const data = await ShopService.requestShop();

        if(data) {
            shop.setCategories(data.categories);
            shop.setOptions(data.options);
            shop.setId(data.id);

            const rs = await ShopService.requestProducts(data.id);

            shop.setProducts(rs.data.data);
        }

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