import { createStore } from "vuex";
import axios from "axios";
import router from "./router/routes.js";


const user ={

    namespaced:true,

    state:{
        data:{},
        isLoading: false,
        isLoggedIn:null,
        jwtToken: localStorage.getItem("jwtToken"),
        errors:[]

    },

    getters:{
        isLoggedIn: state => state.isLoggedIn,
        isLoading : state => state.isLoading,
        errors: state => state.errors,
        currentUser: state => state.data,
        jwtToken: state => state.jwtToken,

    },

     actions:{
        async trySignin(context, credentials){
            try {
                context.commit('updateIsLoading', true);
                const response = await axios.post("http://localhost:3000/api/auth",credentials);  
                context.commit('signinSuccess', response.data);
                router.push('/home');
            }catch(err){

                context.commit('signError',err)
            }


    },
         async trySignUp(context, user){
             try{
             context.commit('updateIsLoading', true); 
             await axios.post('http://localhost:3000/api/user', user);
              context.commit('signupSuccess');   
             router.push('/home')
            }catch(err){context.commit('signError',err)}   
           
            },
        async fetchCurrentUser(context){
            try{
                context.commit("updateIsLoading", true);
                const user = await axios.get("http://localhost:3000/api/user/current");
                context.commit('fetchCurrentUserSuccess', user);

            }catch (err){

               context.commit('signError',err); 

            }


        }
     },

     mutations: {
        updateIsLoading(state, isLoading) {
          state.isLoading = isLoading;
        },
        signupSuccess(state) {
          state.isLoading = false;
          state.errors = [];
        },
        signError(state, errors) {
          state.isLoading = false;
          state.errors = errors.response.data;
        },
        signinSuccess(state, data) {
          state.isLoading = false;
          state.errors = [];
          state.isLoggedIn = true;
          delete data.user.password;
          state.data = data.user;
          state.jwtToken = data.jwtToken;
          localStorage.setItem("jwtToken", data.jwtToken);
        },
        signOut(state) {
          state.jwtToken = null;
          state.data = null;
          state.isLoggedIn = false;
          localStorage.removeItem("jwtToken");
        },
        fetchCurrentUserSuccess(state, user) {
          state.data = user;
          state.isLoading = false;
          state.isLoggedIn = true;
          state.errors = [];
        },
        refreshTokenSuccess(state, data) {
          state.data = data.user;
          state.isLoggedIn = true;
          state.jwtToken = data.jwtToken;
          localStorage.setItem("jwtToken", data.jwtToken);
        },
        refreshTokenError(state) {
          state.data = null;
          state.isLoggedIn = false;
          state.jwtToken = null;
          localStorage.removeItem("jwtToken");
        }
      }

}

const product = {
  namespaced: true,
  state: {

      datas: []



  },
  mutations: {
      addOne(state, product) {
          state.datas.push(product);
      },
      addMany(state, products) {

          state.datas = products

      }


  },


  actions: {

      fetchDatas(context) {
          axios.get('products.json')
              .then(res => {
                  const data = res.data;
                  context.commit('addMany', Object.keys(data).map(key => data[key]))

              })




      },
      saveOne(context, product) {

          axios.post('products.json', product)
              .then(() => {

                  context.commit('addOne', product);

              })


      }


  }



}

const cart = {
  namespaced: true,
  state: {

      datas: []

  },
  getters: {
      total(state) {
          return state.datas.reduce((acc, p) => {

              acc += p.price
              return acc

          }, 0

          );

      }

  },

  mutations: {

      addOne(state, product) {

          state.datas.push(product);

      }

  ,

  deleteOne(state, id) {
      const index = state.datas.findIndex(d => d.id === id);
      state.datas.splice(index, 1);

  }

}
}








const store = createStore({
  modules: {
    user,
    product,
    cart
  }
});

export default store;