Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
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
        <p> Shipping: {{shipping}} </p>

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
                    variantQuantity: 10
                },
            ],
            sizes: ["XS", "Small", "Medium", "Lg", "Xl"],

        }
    },
    methods: {
        addToCart() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
        updateProduct(index) {
            this.selectedVariant = index
            console.log(index)
        },
        removeFromCart() {
            this.$emit("remove-from-cart", this.variants[this.selectedVariant].variantId)

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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return 2.99
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

Vue.component(("product-details"), {
    props: {
        details: {
            type: Array,
            required: true,

        }
    },
    template: `
    <ul>
    <li v-for="detail in details">{{ detail }}</li>
  </ul>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeFromCart(id) {
            for (var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }

})


