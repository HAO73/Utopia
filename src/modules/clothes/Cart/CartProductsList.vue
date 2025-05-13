<template>
  <div class="d-flex flex-column p-5"  >
    
       <cart-product-item v-for="item in cart" :key="item.id" :item="item" ></cart-product-item>
      <template v-if="cart.length" class="totalStyle">
      <hr class="w-100"/>
      <span >Total : {{ total }} € </span>
      </template>
  </div>
</template>

<script>
  import CartProductItem from './CartProductItem.vue'
  import {mapGetters} from 'vuex';
export default {
  components:{
    CartProductItem
  },
  props: [ 'cart'],
  computed :{
   ...mapGetters('cart', ['total'])

  }
 
}
</script> 

<style scoped>

.totalStyle {

font-size: 1rem !important;

}


</style>