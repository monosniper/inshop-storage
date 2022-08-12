import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";
import {showError} from "../utils/showError";
import {$errors} from "../utils/errors";
import {$messages} from "../utils/messages";
import {showMessage} from "../utils/showMessage";

export default class ShopService {
    static status(code) {
        return code >= 200 && code < 301;
    }

    static async sendUpdate(id, options) {
        const response = await $api.put($apiRoutes.shops.update(id), options);

        const status = this.status(response.status);

        if(!status) return false;

        return response.data.data.options;
    }

    static async requestData(id) {
        const response = await $api.get($apiRoutes.shops.get(id));

        return response.data.data;
    }

    static async getModules(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.modules.list(id))
            return {
                ok: true,
                data: rs.data.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async getCategories(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.categories.list(id))
            return {
                ok: true,
                data: rs.data.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async getClients(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.clients.list(id))
            return {
                ok: true,
                data: rs.data.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async getModule(shop_id, id) {
        try {
            await $api.get($apiRoutes.shops.get_module(shop_id, id))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async toggleModule(shop_id, id, bool) {
        try {
            await $api.get($apiRoutes.shops.modules.toggle(shop_id, id, bool))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async toggleLayout(shop_id, id, bool) {
        try {
            await $api.get($apiRoutes.shops.layoutOptions.toggle(shop_id, id, bool))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async delete(id) {
        try {
            await $api.delete($apiRoutes.shops.delete(id))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteProduct(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.products.delete(shop_id, id))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteCategory(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.categories.delete(shop_id, id))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteClient(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.clients.delete(shop_id, id))
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteProducts(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.products.deleteMany(shop_id), {ids})
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteCategories(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.categories.deleteMany(shop_id), {ids})
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteClients(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.clients.deleteMany(shop_id), {ids})
            return {
                ok: true,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async requestModules() {
        const response = await $api.get($apiRoutes.modules.list);

        return response.data;
    }

    static async requestProducts(id) {
        const response = await $api.get($apiRoutes.shops.products.list(id));

        return response.data.data;
    }

    static async requestLayoutOptions(id) {
        const response = await $api.get($apiRoutes.shops.layoutOptions.list(id));

        return response.data.data;
    }

    static async requestClients(id) {
        const response = await $api.get($apiRoutes.shops.clients.list(id));

        return response.data.data;
    }


    static async createProduct(shop_id, data) {
        return await $api.post($apiRoutes.shops.products.create(shop_id), data);
    }

    static async createCategory(shop_id, data) {
        const response = await $api.post($apiRoutes.shops.categories.create(shop_id), data);

        return response;
    }

    static async updateProduct(shop_id, product_id, data) {
        const response = await $api.put($apiRoutes.shops.products.update(shop_id, product_id), data);

        return response;
    }

    static async register(domain_id, options) {
        let response = {data: {data: null}}

        try {
            response =  await $api.post($apiRoutes.shops.create, {domain_id, options});

            showMessage($messages.created.shop)
        } catch (e) {
            showError(e.response.data.message)
        }

        return response.data.data;
    }

    static async requestShop() {
        // const response = await $api.get($apiRoutes.getMe(window.location.host.split('.')[0]));
        const response = await $api.get($apiRoutes.getMe('magaz'));

        return response.data.data;
    }

    static async create(data) {
        try {
            const response = await $api.post($apiRoutes.shops.create, data);
            return {
                ok: true,
                data: response.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
                data: null,
            }
        }
    }

    static async save(id, options) {
        const response = await $api.put($apiRoutes.shops.update(id), options);

        return response.data;
    }
}