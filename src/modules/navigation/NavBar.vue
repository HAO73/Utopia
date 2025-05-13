
<template>
    <div class="hidden">
<vs-navbar>
      <template #right>
          <vs-button @click="activeSidebar = !activeSidebar" flat icon>
            <i class="fas fa-bars"></i>
          </vs-button>
        </template>
          <template #left>
          <vs-button transparent size="xl" flat >Login</vs-button>
          <vs-button transparent size="xl" >Join</vs-button>
        </template>
        </vs-navbar> 
      <vs-sidebar
         right
        absolute
        v-model="active" 
        :open.sync="activeSidebar"
        >
       
        <vs-sidebar-item id="Home">
             Home
        </vs-sidebar-item>
        <vs-sidebar-item id="Music">
           Music
        </vs-sidebar-item>
        <vs-sidebar-item id="Clothes">
           Clothes
        </vs-sidebar-item>
        <vs-sidebar-item id="Profil">
           Profil
        </vs-sidebar-item>
          
        
         
              
         
      </vs-sidebar>
    </div>
  </template>
<script>
  export default {
    data:() => ({
      active: 'home',
      activeSidebar: false
    })
  }
  </script>

  <style scoped>

    
  </style>         