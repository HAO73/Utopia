<template>
  <div class="d-flex flex-row justify-content-between p-2 cartStyle">
             <span> {{ item.title }}  </span>
      <span><strong>{{ item.price | price}}  </strong></span>
     
      <button @click="deleteOne(item.id)" class="close">
        <span>&times;</span>
      </button>
      
  </div>
</template>

<script>

import {mapMutations} from 'vuex'

export default {
 props: ['item'],
 methods : {
   ...mapMutations('cart',['deleteOne'])


 }
}
</script>

<style scoped>

html{

  overflow: hidden;

}


.cartStyle {

font-size: 1rem !important;
 


}

button{

margin: 0 !important;
padding: 0 !important;

}


</style>