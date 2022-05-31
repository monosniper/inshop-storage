import {makeAutoObservable} from "mobx";
import shop from "./shop";

class Constructor {
    stepsCount = 1;
    currentStep = 1;
    layoutOptions = [
        {
            title: 'Шапка',
            items: [
                {
                    name: 'logo',
                    title: 'Логотип'
                },
                {
                    name: 'title',
                    title: 'Название'
                },
                {
                    name: 'subtitle',
                    title: 'Слоган'
                },
                {
                    name: 'avatar',
                    title: 'Аватарка'
                },
                {
                    name: 'full-name',
                    title: 'Полное имя'
                },
            ]
        },
        {
            title: 'Категории',
            items: [
                {
                    name: 'icons',
                    title: 'Иконки'
                },
            ]
        },
        {
            title: 'Карточка товара',
            items: [
                {
                    name: 'blackout',
                    title: 'Затемнение'
                },
            ]
        },
        {
            title: 'Пагинация',
            items: [
                {
                    name: 'border-radius',
                    title: 'Округленные кнопки'
                },
                {
                    name: 'end-button',
                    title: 'Кнопка “в конец”'
                },
            ]
        },
    ]
    palettes = [
        [
            '#9B40BF',
            '#E195FF',
            '#6C56F1',
        ],
        [
            '#2CF0D9',
            '#23B870',
            '#82EEBA',
        ],
        [
            '#FBC63E',
            '#DE4F22',
            '#FE9A7B',
        ],
        [
            '#64D7FC',
            '#3C8AFE',
            '#8CBAFF',
        ],
    ]
    modules = [
        {
            name: 'auth',
            title: 'Регистрация и авторизация',
        },
        {
            name: 'basket',
            title: 'Корзина',
        },
        {
            name: 'search',
            title: 'Поиск по сайту',
        },
        {
            name: 'multi-language',
            title: 'Мультиязычность',
        },
        {
            name: 'hide-watermark',
            title: 'Убрать значок “Сделано с помощью Inshop”',
        },
        {
            name: 'wishlist',
            title: 'Избранное',
        },
        {
            name: 'chat',
            title: 'Онлайн чат',
        },
        {
            name: 'themes',
            title: 'Светлый и темный режим',
        },
        {
            name: 'delivery',
            title: 'Доставки',
        },
    ]

    constructor() {
        makeAutoObservable(this)
    }

    setStepsCount(stepsCount) {
        this.stepsCount = stepsCount
    }

    nextStep() {
        this.currentStep = this.currentStep + 1
    }

    prevStep() {
        this.currentStep = this.currentStep - 1
    }

    resetSteps() {
        this.currentStep = 1
    }

    processLayout() {
        let allItems = []
        let layout = {}

        this.layoutOptions.forEach(group => {
            allItems = [...allItems, ...group.items]
        })

        allItems.forEach(item => {
            layout[item.name] = true
        });

        return layout;
    }
}

export default new Constructor()