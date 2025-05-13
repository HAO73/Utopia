<template>
  <div class="pdf-bg-container">
    <iframe
      class="pdf-bg-iframe"
      :src="pdfUrl"
      frameborder="0"
      width="100%"
      height="100%"
      :style="(pdf === 'Funkthetown_combo_flyers.pdf' || pdf === 'Club - Titine.PDF') ? 'position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;filter:blur(1px);transform: rotate(90deg); transform-origin: center center;' : 'position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:0;pointer-events:none;filter:blur(1px);'"
    ></iframe>
    <div class="pdf-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PdfBackground',
  props: {
    pdf: {
      type: String,
      required: true
    }
  },
  computed: {
    pdfUrl() {
      // Pour Vite, les assets sont dans /src/assets et accessibles ainsi :
      return `/src/assets/${this.pdf}#toolbar=0&navpanes=0&scrollbar=0`;
    }
  }
}
</script>

<style scoped>
.pdf-bg-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.pdf-content {
  position: relative;
  z-index: 1;
  padding: 3rem;
}
</style>
