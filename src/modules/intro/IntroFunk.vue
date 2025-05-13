<template>
  <v-app>
    <v-main>
      
      <GalaxyView />
    
    </v-main>
  </v-app>
</template>

<script>
import GalaxyView from '../../components/GalaxyView.vue'
export default {

  name: "IntroFunk",
  components: {
    GalaxyView
  }
}
</script>

<style scoped>
@font-face {
  font-family: 'arldbd';
  src: url('../../css/ARLRDBD.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}


.background-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.content-wrapper {
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 2;
}

.logo-img {
  max-width: 35%;
  height: auto;
  margin-bottom: 2rem;
}

.text-content {
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.main-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  font-family: 'arldbd';
}

.mission-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.mission-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'arldbd';
}

.mission-text {
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'arldbd';
}

.about-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.about-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'arldbd';
  color: white;
}

.about-text {
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'arldbd';
  color: white;
}

.universe-section {
  background: rgba(0, 0, 0, 0.5);
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
}

.universe-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'arldbd';
  color: white;
}

.universe-text {
  font-size: 1.5rem;
  line-height: 1.6;
  font-family: 'arldbd';
  color: white;
}

.nav-drawer {
  background: rgba(0, 0, 0, 0.8) !important;
}

.nav-item {
  color: white !important;
  font-family: 'arldbd';
}

.v-navigation-drawer {
  right: 0 !important;
  left: auto !important;
}

.v-app-bar {
  background: transparent !important;
  box-shadow: none !important;
}

.v-app-bar-nav-icon {
  margin-right: 16px;
}
</style>