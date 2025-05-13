<template>
  <div class="w-25 p-3 product-container d-flex flex-column">
    <div class="d-flex flex-row justify-content-center">
        <img style="height: 400px; width:100%; cursor:pointer;" :src="product.img" @click="showModal = true"/>
    </div>    

      <div class="modal" v-if="showModal">

           <img  :src="product.img"/>


       </div> 
  <div>
    <h5>{{ product.title }}</h5>
    <hr>
  </div>


  <div>
    <p>{{ product.description}}</p>
  </div>

  <div>
    <span>{{ product.price | price}}</span>

    <button @click="addOne(product)" class="btn btn-primary btn-sm float-right">Acheter</button>
  </div>
  </div>
</template>

<script>

import { mapMutations } from 'vuex';

export default {
 props: ['product'],

data() {
  return{ 
    
    showModal:true
  
  }



},

 methods:{

      
      ...mapMutations('cart', ['addOne'])


   }

 }
 

</script>

<style>

body{ 
  

  background-color:rgba(90, 74, 66);
  color: white

}



.product-container{
  height: 600px;

}

p {

  font-size: 12px;

}

button {

  position: relative;
  left: 9rem;




}



</style>