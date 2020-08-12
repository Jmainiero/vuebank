import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
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
            context.commit('flipStatus');
        }
    },
    modules:{},
    getters: {
        grabStatus: state => {
            return state.loggedIn;
        }
    }
});