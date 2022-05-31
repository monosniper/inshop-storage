export const $routes = {
    index: '/',
    login: '/login',
    categories: '/categories',
    products: '/products',
    users: '/users',
    shop: (id) => `/constructor/${id}`,
    undefined: '/undefined'
}

export const $apiRoutes = {
    getMe: (name) => `/get-shop?domain_name=${name}`,
    user: '/user',
    token: '/oauth/token',
    domains: {
        list: 'user/domains',
    },
    shops: {
        list: 'user/shops',
        products: {
            list: (id) => `/shops/${id}/products`,
            create: (id) => `/shops/${id}/products`,
            update: (shop_id, product_id) => `/shops/${shop_id}/products/${product_id}`,
        },
        categories: {
            list: (id) => `/shops/${id}/categories`,
            create: (id) => `/shops/${id}/categories`,
            update: (shop_id, category_id) => `/shops/${shop_id}/categories/${category_id}`,
        },
        create: 'shops',
        update: (id) => `shops/${id}`,
        get: (id) => `/shops/${id}`
    }
}

export const $serverRoutes = Object.fromEntries(Object.entries({
    domains: '/domains/register',
}).map(([key, route]) => [key, process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL + route]))