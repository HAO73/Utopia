<template>
  <shop-products-list :products="products" class="p-3"></shop-products-list>
</template>

<script>
import ShopProductsList from './ShopProductsList.vue'




export default {
  props:['products'],
 components: {
   ShopProductsList

 },
 
}
</script>

<style>

</style>