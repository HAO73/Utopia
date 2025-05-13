<template>
  <div class="d-flex flex-row flex-wrap"  >
       <shop-productitem v-for="product in products" :key="product.id" :product="product" ></shop-productitem>
      
  </div>
</template>

<script>
  import ShopProductitem from './ShopProductitem.vue'

export default {
  components:{
    ShopProductitem
  },
  props: [ 'products']
 
}
</script>

<style>

</style>