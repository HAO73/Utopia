<template>
 
<div>

  
  
  
 
     
  <Home2>
   
  </Home2>
  <div>username : {{ user.username }}</div>
  <div>email : {{ user.email }}</div>

</div>
</template>

<script>

import Home2 from "../home/Home2.vue"
import { mapGetters } from "vuex";
export default {
name: "Profil",

   components: {Home2},

    data () {
      return {
        items: [
          { title: 'Home', icon: 'mdi-home-city', link:'/home' },
          { title: 'Music', icon: 'mdi-account', link:'/music' },
          { title: 'Clothes', icon: 'mdi-account-group-outline', link:'/clothes' },
          { title: 'My Profil', icon: 'mdi-account-group-outline',link:'/profil' },
        ],
      }
    },
 


computed: {
  ...mapGetters("user", { user: "currentUser" })
}
};
</script>
