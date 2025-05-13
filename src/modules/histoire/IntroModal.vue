<template>
  <div class="intro-modal-overlay" @click.self="$emit('close')">
    <div class="intro-modal-content">
      <button class="intro-modal-close" @click="$emit('close')">×</button>
      <h2>Partage ton intro !</h2>
      <form @submit.prevent="handleSubmit" class="intro-form">
        <label for="name">Ton nom :</label>
        <input id="name" v-model="name" type="text" required placeholder="Prénom ou pseudo" />
        <label for="message">Ton message :</label>
        <textarea id="message" v-model="message" required placeholder="Écris ton histoire..."></textarea>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IntroModal',
  emits: ['close'],
  data() {
    return {
      name: '',
      message: ''
    }
  },
  methods: {
    handleSubmit() {
      alert(`Merci ${this.name} !\nTon message :\n${this.message}`);
      this.name = '';
      this.message = '';
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
.intro-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.intro-modal-content {
  background: #fff;
  border-radius: 2vw;
  padding: 4vw 7vw;
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
  width: 96vw;
  min-width: 320px;
  max-width: 1200px;
  height: auto;
  min-height: 400px;
  max-height: none;
  overflow: visible;
  position: relative;
  font-family: 'ARLRDBD', Arial, Helvetica, sans-serif;
  color: #9400d3;
}
@media (max-width: 600px) {
  .intro-modal-content {
    padding: 4vw 2vw;
    width: 98vw;
    max-width: 98vw;
  }
}
.intro-modal-close {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(30%,-30%);
  background: #fff;
  border: none;
  font-size: 3rem;
  color: #9400d3;
  cursor: pointer;
  font-family: inherit;
  border-radius: 50%;
  width: 2.5em;
  height: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px 0 rgba(148,0,211,0.10);
  z-index: 10;
  padding: 0;
}
.intro-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
  align-items: stretch;
}
.intro-form label {
  font-size: 1.7rem;
  color: #9400d3;
}
.intro-form input,
.intro-form textarea {
  font-family: 'ARLRDBD', Arial, Helvetica, sans-serif;
  font-size: 1.5rem;
  border-radius: 1vw;
  border: 1.5px solid #9400d3;
  padding: 0.7em 1em;
  background: #f8f5ff;
  color: #222;
  resize: none;
}
.intro-form textarea {
  min-height: 14em;
  max-height: 30vh;
  resize: vertical;
}
.intro-form button[type="submit"] {
  align-self: center;
  background: linear-gradient(90deg, #9400d3 60%, #8e2de2 100%);
  color: #fff;
  font-family: 'ARLRDBD', Arial, Helvetica, sans-serif;
  font-size: 2rem;
  border: none;
  border-radius: 2vw;
  padding: 0.7em 2em;
  margin-top: 1rem;
  box-shadow: 0 2px 12px 0 rgba(148,0,211,0.15);
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.intro-form button[type="submit"]:hover {
  background: linear-gradient(90deg, #8e2de2 60%, #9400d3 100%);
  transform: scale(1.04);
}
</style>
