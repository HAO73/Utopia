<template>
  <div>
      <Home2> </Home2>
      <div class="title">Clothes</div>
      <div class="d-flex flex-row shopStyle">
      <transition name="left" appear>
      <shop :products="products" class="w-75"></shop>
      </transition>
       <transition name="right" appear>
         <font-awesome-icon icon="fa-thin fa-cart-shopping" />
      <!-- <cart :cart="cart" class="w-25"></cart> -->
      </transition>
    </div> 
      
  </div>




</template>

<script>
 
import Shop from './Shop/Shop.vue';

import Home2 from "../home/Home2.vue"
import {mapState} from 'vuex';

export default {
 components:{
   Shop,
    
   Home2

 },
 computed:{
   ...mapState('product',{
     products:'datas'

   }),

   ...mapState('cart',{
     cart:'datas'

   })


 },

created(){
this.$store.dispatch('product/fetchDatas')

}

}
</script>

<style scoped>

.title {
font-family: 'Arial Rounded MT Bold Regular';
font-size:3rem;
margin-left: 2rem;

}

.shopStyle{

font-family: 'Arial Rounded MT Bold Regular';
font-size:1.5rem !important



}

</style>