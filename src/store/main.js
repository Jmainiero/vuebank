import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        loggedIn: false
    },
    mutations:{
        flipStatus(state){
            state.loggedIn = !state.loggedIn;
        }
    },
    actions:{
        setStatus(context) {
            context.commit('flipStatus', 'true');
        }
    },
    modules:{},
    getters: {
        statusOk: state => state.loggedIn
    }
});