Vue.component('product', {
    template: `
    <div class="product">
    <div class="product-image">
        <img v-bind:src="image" alt="">
    </div>
    <div class="product-info">
        <h1>{{title}}</h1>
        <p v-if="inStock"> In Stock </p>
        <p v-else :class="{outOfStock: !inStock}"> Out Of Stock</p>
        <p v-show="inStock"> Show elements ( more efficient than v-if which removes the element from DOM)</p>
        <p> {{sale}} </p>

        <ul>
            <li v-for="val in details"> {{val}} </li>
        </ul>

        <ul>
            <li v-for="size in sizes" v-bind:key="size"> {{size}} </li>
        </ul>

        <div v-for="(val, index) in variants" v-bind:key="val.variantId" class="color-box"
            :style="{backgroundColor:val.variantColor}" @mouseover="updateProduct(index)">
        </div>

        <button v-on:click="addToCart" :disabled="!inStock" :class="{disabledButton: !inStock}"> Add to Cart
        </button>
        <button @click="removeFromCart"> Remove from Cart</button>

        <div class="cart">
            <p>Cart {{cart}}</p>
        </div>

    </div>

    <div class="product-link">
        <a v-bind:href="linkurl"> Link to SO stuff</a>
    </div>

</div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            linkurl: 'https://stackoverflow.com/questions/57927644/nodejs-express-how-to-get-an-element-which-made-an-http-get-request',
            onSale: true,
            details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    image: './assets/socks-green.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    image: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                },
            ],
            sizes: ["XS", "Small", "Medium", "Lg", "Xl"],
            cart: 0,
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart -= 1
            }
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].image
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return this.brand + ' ' + this.product + ' are on sale!'
            }
            return this.brand + ' ' + this.product + ' are not on sale!'
        }
    }
})


Vue.component('test-product', {
    props: {
        message: {
            type: String,
            required: true,
            default: "Hi"
        }
    },
    template: ` <div> <h1> {{message}}</h1>
    <h2> Arent I beautiful? </h2>
    </div> `,
    data() {
        return {

        }
    }
})


var app = new Vue({
    el: '#app'

})


