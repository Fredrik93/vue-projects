var eventBus = new Vue()

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

    <product-tabs :reviews="reviews" > </product-tabs>


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
            reviews: [],
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
        },

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
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
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


Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
    <b> Please correct the following error(s):  </b>
    <ul>
    <li v-for="error in errors" > {{error}}  </li>
    </ul>
    </p>

    <p>
      <label for="name">Name:</label>
      <input id="name" v-model="name" placeholder="name">
    </p>
    
    <p>
      <label for="review">Review:</label>      
      <textarea id="review" v-model="review"  ></textarea>
    </p>
    
    <p>
      <label for="rating">Rating:</label>
      <select id="rating" v-model.number="rating">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </p>

    <p>Would you recommend this product?</p>
    <label>
      Yes
      <input type="radio" value="Yes" v-model="recommend"/>
    </label>
    <label>
      No
      <input type="radio" value="No" v-model="recommend"/>
    </label>
        

        
    <p>
      <input type="submit" value="Submit">  
    </p>    
  
  </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []

        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
            } else {
                if (!this.name) {
                    this.errors.push("Name Required. ")
                }
                if (!this.review) {
                    this.errors.push("Review Required. ")
                }
                if (!this.rating) {
                    this.errors.push("Rating Required. ")
                }
                if (!this.recommend) {
                    this.errors.push("Recommendation Required. ")
                }
            }
        }

    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: false
        }
    },
    template: `
    <div>
      
    <ul>
      <span class="tabs" 
            :class="{ activeTab: selectedTab === tab }"
            v-for="(tab, index) in tabs"
            @click="selectedTab = tab"
            :key="tab"
      >{{ tab }}</span>
    </ul>

    <div v-show="selectedTab === 'Reviews'">
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul v-else>
            <li v-for="(review, index) in reviews" :key="index">
              <p>{{ review.name }}</p>
              <p>Rating:{{ review.rating }}</p>
              <p>{{ review.review }}</p>
            </li>
        </ul>
    </div>

    <div v-show="selectedTab === 'Make a Review'">
      <product-review></product-review>
    </div>

  </div>
    `,
    data() {
        return {
            tabs: ["Reviews", "Make a Review"],
            selectedTab: "Reviews"
        }
    }
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


