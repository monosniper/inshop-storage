export const $routes = {
    index: '/home',
    login: '/login',
    banners: '/banners',
    custom_pages: {
        index: '/custom_pages',
        create: '/custom_pages/create',
        page: (id) => `/custom_pages/${id}`,
    },
    no_shop: '/no_shop',
    categories: '/categories',
    modules: '/modules',
    modules_shop: '/modules/home',
    products: '/products',
    users: '/users',
    reviews: '/reviews',
    shop: (id) => `/home/${id}`,
    undefined: '/undefined',
    profile: '/profile',
    domains: '/domains',
    shops: {
        create: '/home/create'
    }
}

export const $apiRoutes = {
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: {
        index: '/user',
        change_password: '/user/change-password',
        update: '/user/update',
    },
    token: '/oauth/token',
    files: {
        delete: '/files/delete',
    },
    banners: {
        types: '/banners/types'
    },
    domains: {
        list: 'user/domains',
        delete: (id) => `domains/${id}`,
        deleteMany: `domains/deleteMany`,
    },
    modules: {
        list: 'modules',
    },
    shops: {
        list: 'user/shops',
        get_module: (shop_id, id) => `/shops/${shop_id}/modules/get/${id}`,
        clients: {
            list: (id) => `/shops/${id}/clients`,
            create: (id) => `/shops/${id}/clients`,
            update: (shop_id, client_id) => `/shops/${shop_id}/clients/${client_id}`,
            delete: (shop_id, client_id) => `/shops/${shop_id}/clients/${client_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/clients/deleteMany`,
        },
        banners: {
            list: (id) => `/shops/${id}/banners`,
            create: (id) => `/shops/${id}/banners`,
            update: (shop_id, banner_id) => `/shops/${shop_id}/banners/${banner_id}`,
            delete: (shop_id, banner_id) => `/shops/${shop_id}/banners/${banner_id}`,
        },
        colors: {
            list: (id) => `/shops/${id}/colors`,
            create: (id) => `/shops/${id}/colors`,
            update: (shop_id, color_id) => `/shops/${shop_id}/colors/${color_id}`,
            save: (shop_id, color_id) => `/shops/${shop_id}/colors/${color_id}/save`,
            reset: (shop_id, color_id) => `/shops/${shop_id}/colors/${color_id}/reset`,
            delete: (shop_id, color_id) => `/shops/${shop_id}/colors/${color_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/colors/deleteMany`,
        },
        social_networks: {
            list: (id) => `/shops/${id}/social_networks`,
            create: (id) => `/shops/${id}/social_networks`,
            update: (shop_id, social_network_id) => `/shops/${shop_id}/social_networks/${social_network_id}`,
            save: (shop_id, social_network_id) => `/shops/${shop_id}/social_networks/${social_network_id}/save`,
            delete: (shop_id, social_network_id) => `/shops/${shop_id}/social_networks/${social_network_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/social_networks/deleteMany`,
        },
        products: {
            list: (id) => `/shops/${id}/products`,
            create: (id) => `/shops/${id}/products`,
            update: (shop_id, product_id) => `/shops/${shop_id}/products/${product_id}`,
            delete: (shop_id, product_id) => `/shops/${shop_id}/products/${product_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/products/deleteMany`,
        },
        reviews: {
            list: (id) => `/shops/${id}/reviews`,
            create: (id) => `/shops/${id}/reviews`,
            update: (shop_id, review_id) => `/shops/${shop_id}/reviews/${review_id}`,
            delete: (shop_id, review_id) => `/shops/${shop_id}/reviews/${review_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/reviews/deleteMany`,
        },
        categories: {
            list: (id) => `/shops/${id}/categories`,
            create: (id) => `/shops/${id}/categories`,
            update: (shop_id, category_id) => `/shops/${shop_id}/categories/${category_id}`,
            delete: (shop_id, category_id) => `/shops/${shop_id}/categories/${category_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/categories/deleteMany`,
        },
        customPages: {
            list: (id) => `/shops/${id}/customPages`,
            create: (id) => `/shops/${id}/customPages`,
            update: (shop_id, custom_page_id) => `/shops/${shop_id}/customPages/${custom_page_id}`,
            delete: (shop_id, custom_page_id) => `/shops/${shop_id}/customPages/${custom_page_id}`,
            toggle: (shop_id, custom_page_id, bool) => `/shops/${shop_id}/customPages/${custom_page_id}/${bool ? 'activate' : 'deactivate'}`,
        },
        modules: {
            list: (id) => `/shops/${id}/modules`,
            toggle: (shop_id, id, bool) => `/shops/${shop_id}/modules/${id}/${bool ? 'activate' : 'deactivate'}`,
        },
        layoutOptions: {
            list: (id) => `/shops/${id}/layoutOptions`,
            toggle: (shop_id, id, bool) => `/shops/${shop_id}/layoutOptions/${id}/${bool ? 'activate' : 'deactivate'}`,
        },
        create: 'shops',
        update: (id) => `shops/${id}`,
        get: (id) => `/shops/${id}`,
        delete: (id) => `/shops/${id}`,
    }
}

export const $externalRoutes = {
    constructor: (shop_id) => process.env.NEXT_PUBLIC_CONSTRUCTOR_LINK + '/constructor/' + shop_id
}

export const $serverRoutes = Object.fromEntries(Object.entries({
    domains: '/domains/register',
}).map(([key, route]) => [key, process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + route]))