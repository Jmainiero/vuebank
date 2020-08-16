import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";
// import { componentsPlugin } from "bootstrap-vue";


Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        loggedIn: false,
        username: ''
    },
    mutations: {
        flipStatus(state) {
            state.loggedIn = !state.loggedIn;
        },
        setUser(state, payload) {
            state.username = payload;
            // console.log(state.username);

        },
        resetUser(state) {
            state.username = '';
        }
    },
    actions: {
        setStatus(context) {
            context.commit('flipStatus');
        },
        setUser(context, username) {
            context.commit('setUser', username);
        },
        resetUser(context){
            context.commit('resetUser');
        }
    },
    modules: {},
    getters: {
        grabStatus: state => {
            return state.loggedIn;
        },
        grabUsername: state => { return state.username; }

    }
});