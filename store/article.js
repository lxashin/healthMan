import { data } from 'uview-ui/libs/mixin/mixin'
import Vue from 'vue'
import Vuex from 'vuex'

const state = {
	articles:{}
}

const mutations = {
	setArticles(state,data){
		state.articles = data
	}
}

export default {
	state,
	mutations,
}