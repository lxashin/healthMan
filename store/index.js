import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Home from './home.js'
import Patients from './patients.js'
import Articles from './article.js' 
import User from './user.js'
export default new Vuex.Store({
    modules:{
        Home,
        Patients,
		Articles,
		User
    }
})