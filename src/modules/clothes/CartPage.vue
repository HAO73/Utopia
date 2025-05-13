<template>

    <div>
    <Home2> </Home2>
    <div class="title">Panier</div>
  <cart :cart="cart" class="w-25"></cart>
  
    <router-link to="/login">
    <button>Passer la Commande</button>
    </router-link>

     <div v-if="!paidFor">
      <h1>Total : {{ total }} € </h1>

       <p>
       </p>

    </div>

    <div v-if="paidFor">
      <h1>Noice, you bought a beautiful lamp!</h1>
    </div>

    <div ref="paypal"></div>



  </div>
</template>

<script>

import Home2 from "../home/Home2.vue"
import Cart from "./Cart/Cart.vue"
import {mapState} from 'vuex';
import {mapGetters} from 'vuex';



export default {
props: ['item'] [ 'cart'],
    name:"CartPage",

 components:{
     Home2, 
     Cart, 
     

 },


 computed:{
   ...mapState('product',{
     products:'datas'

   }),

   ...mapState('cart',{
     cart:'datas'

   }),

   
   ...mapGetters('cart', ['total'])

  

},

 data: function() {
    return {
      loaded: false,
      paidFor: false,
      product: {
        price: this.total,
        description: this.cart
        
      }
    };
  },
mounted: function() {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=ARkcFjfc-iqNVeKxFzcyonAHUQ14n9ZF-SmFA1C2Ju0cL_BUXxBfN0q6MpU7EbV1_ijvIrrC_5nbjl0z";
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.total
                  }
                }
              ]
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            this.paidFor = true;
            console.log(order);
          },
          onError: err => {
            console.log(err);
          }
        })
        .render(this.$refs.paypal);
    }
  }


}
</script>

<style scoped>

.title {
font-family: 'Arial Rounded MT Bold Regular';
font-size:3rem;
margin-left: 2rem;

}

button{
font-family: 'Arial Rounded MT Bold Regular';
font-size:1.5rem;
background-color:rgba(251, 176, 65);
border-radius: 16px;
padding: 0.5rem    



}


</style>