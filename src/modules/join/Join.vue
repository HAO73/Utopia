<template>
	<div >
	<img src="../../assets/form/image4.png"/>
	
    <div class="form">
	
			<label>Name/Alias</label>
			<input/>
			<label>Email</label>		
			<input/>
			<label>Password</label>	
			<input/>
			<button>Join</button>
    </div>
	</div>
</template>

<script>
export default {
  name: "Join",
  data() {
    return {
      errors: [],
      form: {
        email: '',
        username: '',
        password: ''
      }
    }
  },
  mounted() {
    // Si tu veux faire une action au montage, ajoute-la ici
  },
  methods: {
    trySubmit(e) {
      e.preventDefault()
      if (this.isValid()) {
        this.$store.dispatch('user/trySignin', this.form)
      }
    },
    isValid() {
      this.errors = []
      if (!this.form.email || !this.form.username || !this.form.password) {
        this.errors.push('Tous les champs sont obligatoires.')
      }
      // Ajoute d'autres vérifications si besoin
      return this.errors.length === 0
    }
  }
}
</script>

<!--
// beforeCreate () {
//     document.querySelector('form').setAttribute('style', 'background:#007bed z-index:-1000')
// }
-->

<style scoped>
.form{

display:flex;
flex-direction:column;
position: fixed;
transform: translate(-50%,-33.33%);
 top: 50%;
 left: 50%;
background-color: rgba(90, 74, 66, 0.5);
width:25%;
height:53%;
color:white;
border-radius: 16px;

}

input{

background-color: rgba(90, 74, 66, 0.5);
border:0;

}

button{

color:white;
border-radius: 16px;
background-color: rgba(251, 176, 65);
border:0;
}

img{

	position:fixed;
	top:50%;
	left:50%;
transform: translate(-50%, -250%);

}

</style>
