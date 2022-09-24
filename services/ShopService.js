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

    static async saveColor(shop_id, color_id, value) {
        try {
            const rs = await $api.put($apiRoutes.shops.colors.save(shop_id, color_id), {value})
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

    static async updateCategory(shop_id, id, data) {
        try {
            const rs = await $api.put($apiRoutes.shops.categories.update(shop_id, id), data)
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

    static async updatePromocode(shop_id, id, data) {
        try {
            const rs = await $api.put($apiRoutes.shops.promocodes.update(shop_id, id), data)
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

    static async createCustomPage(shop_id, data) {
        try {
            const rs = await $api.post($apiRoutes.shops.customPages.create(shop_id), data)
            console.log(rs)
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

    static async saveBanner(shop_id, data, banner_id) {
        try {
            const rs = await $api.put($apiRoutes.shops.banners.update(shop_id, banner_id), data)
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

    static async createBanner(shop_id, data) {
        try {
            const rs = await $api.post($apiRoutes.shops.banners.create(shop_id), data)
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

    static async saveSocialNetwork(shop_id, social_network_id, value) {
        try {
            const rs = await $api.put($apiRoutes.shops.social_networks.save(shop_id, social_network_id), {value})
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

    static async updateCustomPage(shop_id, id, data) {
        try {
            const rs = await $api.put($apiRoutes.shops.customPages.update(shop_id, id), data)
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

    static async resetColor(shop_id, color_id) {
        try {
            const rs = await $api.get($apiRoutes.shops.colors.reset(shop_id, color_id))
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

    static async getBanners(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.banners.list(id))
            return {
                ok: true,
                data: rs.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async requestCustomPages(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.customPages.list(id))
            return {
                ok: true,
                data: rs.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async getColors(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.colors.list(id))
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

    static async getOrders(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.orders.list(id))
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

    static async getPromocodes(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.promocodes.list(id))
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

    static async getReviews(id) {
        try {
            const rs = await $api.get($apiRoutes.shops.reviews.list(id))
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

    static async getBannerTypes() {
        try {
            const rs = await $api.get($apiRoutes.banners.types)
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

    static async toggleFilter(shop_id, id, bool) {
        try {
            await $api.get($apiRoutes.shops.filters.toggle(shop_id, id, bool))
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

    static async deleteOrder(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.orders.delete(shop_id, id))
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

    static async deleteBanner(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.banners.delete(shop_id, id))
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

    static async deletePromocode(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.promocodes.delete(shop_id, id))
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

    static async deleteReview(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.reviews.delete(shop_id, id))
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

    static async deleteCustomPage(shop_id, id) {
        try {
            await $api.delete($apiRoutes.shops.customPages.delete(shop_id, id))
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

    static async deletePromocodes(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.promocodes.deleteMany(shop_id), {ids})
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

    static async deleteReviews(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.reviews.deleteMany(shop_id), {ids})
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

    static async deleteOrders(shop_id, ids) {
        try {
            await $api.post($apiRoutes.shops.orders.deleteMany(shop_id), {ids})
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

    static async requestFilters(id) {
        const response = await $api.get($apiRoutes.shops.filters.list(id));

        return response.data.data;
    }

    static async requestClients(id) {
        const response = await $api.get($apiRoutes.shops.clients.list(id));

        return response.data.data;
    }

    static async createReview(shop_id, data) {
        try {
            const response = await $api.post($apiRoutes.shops.reviews.create(shop_id), data);
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

    static async createProduct(shop_id, data) {
        try {
            const response = await $api.post($apiRoutes.shops.products.create(shop_id), data);
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

    static async createCategory(shop_id, data) {
        return await $api.post($apiRoutes.shops.categories.create(shop_id), data);
    }

    static async createPromocode(shop_id, data) {
        return await $api.post($apiRoutes.shops.promocodes.create(shop_id), data);
    }

    static async updateProduct(shop_id, product_id, data) {
        return await $api.put($apiRoutes.shops.products.update(shop_id, product_id), data);
    }

    static async updateReview(shop_id, review_id, data) {
        return await $api.put($apiRoutes.shops.reviews.update(shop_id, review_id), data);
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