<template>


<div>
    
     
     <v-navigation-drawer 
     
        
      v-model="drawer"
      app
      
      expand
      right
      dark
      class="backgroundDrawer"
    > 

     <span  @click="drawer =!drawer">&times;</span>
      

      


      <v-list  >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          class="decoration"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>
    
    </div>
    
</template>

<script>
export default {
  name: 'Home2',
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Home', link:'/home' },
        { title: 'Clothes', link:'/clothes' },
        { title: 'Profil',link:'/profil' },
        {title : 'Panier', link:"/cart"}
      ]
    }
  }
}
</script>

<style scoped>

.backgroundDrawer{

background-color:rgba(90, 74, 66, 0.9)!important;
font-family: 'Arial Rounded MT Bold Regular';





}

.decoration {
text-decoration:none!important;


}

.whiteText{

color: white;
font-size: 3rem!important;
}


.icon-burger {

position: absolute;
top: 30px;
right:200px;

}




</style>