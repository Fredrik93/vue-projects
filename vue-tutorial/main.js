var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './assets/socks-green.jpg',
        linkurl: 'https://stackoverflow.com/questions/57927644/nodejs-express-how-to-get-an-element-which-made-an-http-get-request',
        inventory: 100,
        inStock: true,
        onSale: false,
        details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                image: './assets/socks-green.jpg',
            },
            {
                variantId: 2235,
                variantColor: "blue",
                image: './assets/vmSocks-blue-onWhite.jpg',
            },
        ],
        sizes: ["XS", "Small", "Medium", "Lg", "Xl"],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(variantImage) {
            this.image = variantImage
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        }
    }
})

var todoList = new Vue({
    el: '#todo-list',
    data: {
        todos: [
            { text: 'Learn JavaScript' },
            { text: 'Learn Vue' },
            { text: 'Build something awesome' }
        ]
    }
})