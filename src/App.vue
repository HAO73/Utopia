<template>
  <v-app>
    
    <v-main>
      <IntroFunk />
    </v-main>
  </v-app>
</template>

<script>
import IntroFunk from './modules/intro/IntroFunk.vue';

export default {
  name: 'App',

  components: {
    IntroFunk,
  },

  data: () => ({
    //
  }),
};
</script>
