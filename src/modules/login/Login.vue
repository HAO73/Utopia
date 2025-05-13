 <template>

	
   <div class="modalLogin">
	<div>
	<img class="logoLogin" src="../../assets/F2T_logo_color.png"/>
	</div>

	<h1>Connectez-vous</h1>	
	<form class="formulaire" @submit="trySubmit">
	
	<input class="loginInput" type="email" placeholder="Email..." v-model="form.email">
	
	<input class="loginPassword" type="password" placeholder="Password..." v-model="form.password">
	<ul v-if="errors.length">
	<li class="text-danger" v-for="error in errors" :key="error">{{error}}</li>	

	</ul>
	<button class="connexion" :class="{ 'disabled': isLoading }">Connexion</button>
	</form>
	<router-link to="/join">
		<p class="memo">Créer un compte </p>
	</router-link>	
  
  </div> 
  
 </template>




<script>
import { mapGetters } from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },

    }
  },
  computed: {
    ...mapGetters("user", ["isLoading", "errors"])
  },
  methods: {
    trySubmit(e) {
      e.preventDefault();
      if (this.isValid()) {
        this.$store.dispatch('user/trySignin', this.form);
      }
    },
    isValid() {
      // Validation locale temporaire (affichage immédiat seulement)
      if (!this.form.email || !this.form.password) {
        alert('Tous les champs sont obligatoires.');
        return false;
      }
      // Ajoute d'autres vérifications si besoin
      return true;
    }
  }
}
</script>

<style scoped>




.logoLogin{

margin: 0;
height: 15%;
width: 15%;


}
.formulaire {

display: flex;
flex-direction: column;

text-align: center;
align-items: center;
align-content: center;

}



.modalLogin{

  font-family: 'Arial Rounded MT Bold Regular';	
 
 
 opacity:1;
 
 text-align:center;
 


 
 



}

.loginInput{

color:black;

width:25%;
background-color:white;
padding:1rem;
margin: 1rem;
border-radius: 8px;

}

.loginPassword{

color:black;

width:25%;
background-color:white;
padding:1rem;
margin: 1rem;
border-radius: 8px;

}



label{

color:white;
font-size: 2rem;

}

.connexion{

width:25%;
background-color: rgba(251, 176, 65);
padding:0.5rem;
color:white;
margin:2rem 1rem 1rem 1rem ;
font-size: 2rem;
border-radius:16px;
left:0;


}

.connexion:hover{



}

.memo {

font-size:16px;
text-decoration: underline;
color: white;

}

</style>