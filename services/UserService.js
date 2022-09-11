import {$api, $server} from "../http";
import {$apiRoutes} from "../http/routes";
import {showError} from "../utils/showError";
import {$errors} from "../utils/errors";

export default class UserService {
    static async requestUser() {
        try {
            const response = await $api.get($apiRoutes.user.index);

            return {
                ok: true,
                data: response.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data ? e.response.data.message : 'Произошла какая-то ошибка.',
                data: null,
            }
        }
    }

    static async deleteDomain(id) {
        try {
            await $api.delete($apiRoutes.domains.delete(id))
            return {
                ok: true,
            }
        } catch (e) {
            showError(e.response.data.message)
            return {
                ok: false,
                message: e.response.data.message,
            }
        }
    }

    static async deleteDomains(ids) {
        try {
            await $api.post($apiRoutes.domains.deleteMany, {ids})
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

    static async updateUser(data) {
        try {
            const response = await $api.put($apiRoutes.user.update, data);

            return {
                ok: true,
                data: response.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data ? e.response.data.message : 'Произошла какая-то ошибка.',
                data: null,
            }
        }
    }

    static async changePassword(data) {
        try {
            const response = await $api.post($apiRoutes.user.change_password, data);

            return {
                ok: true,
                data: response.data,
            }
        } catch (e) {
            return {
                ok: false,
                message: e.response.data ? e.response.data.message : 'Произошла какая-то ошибка.',
                data: null,
            }
        }
    }

    static async requestAccessToken(code) {
        const response = await $server.post($apiRoutes.token, {
            client_id: process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
            client_secret: process.env.NEXT_PUBLIC_OAUTH_CLIENT_SECRET,
            redirect_uri: process.env.NEXT_PUBLIC_OAUTH_CLIENT_REDIRECT_URI,
            grant_type: 'authorization_code',
            code
        })

        return response.data.access_token;
    }

    static async requestShops() {
        let response = {data: []}

        try {
            response =  await $api.get($apiRoutes.shops.list);
        } catch (e) {
            // showError($errors.network_error)
        }

        return response.data;
    }

    static async requestDomains() {
        const response = await $api.get($apiRoutes.domains.list);

        return response.data;
    }
}