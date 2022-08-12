export const $routes = {
    index: '/',
    login: '/login',
    no_shop: '/no_shop',
    categories: '/categories',
    modules: '/modules',
    modules_shop: '/modules/shop',
    products: '/products',
    users: '/users',
    shop: (id) => `/constructor/${id}`,
    undefined: '/undefined',
    shops: {
        create: '/shop/create'
    }
}

export const $apiRoutes = {
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
    token: '/oauth/token',
    domains: {
        list: 'user/domains',
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
        products: {
            list: (id) => `/shops/${id}/products`,
            create: (id) => `/shops/${id}/products`,
            update: (shop_id, product_id) => `/shops/${shop_id}/products/${product_id}`,
            delete: (shop_id, product_id) => `/shops/${shop_id}/products/${product_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/products/deleteMany`,
        },
        categories: {
            list: (id) => `/shops/${id}/categories`,
            create: (id) => `/shops/${id}/categories`,
            update: (shop_id, category_id) => `/shops/${shop_id}/categories/${category_id}`,
            delete: (shop_id, category_id) => `/shops/${shop_id}/categories/${category_id}`,
            deleteMany: (shop_id) => `/shops/${shop_id}/categories/deleteMany`,
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