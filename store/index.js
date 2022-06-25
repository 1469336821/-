import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		text:"",
		index:null,
		schoolName:"",
		datalist:{},
		id:null,
		title:"",
	},
	mutations: {
		// 传递参数
		changeindex(state,index){
			state.index = index
			console.log(state.index);
		},
		// 传递内容标题
		changetext(state,text){
			state.text = text
			console.log(state.text);
		},	
		// 传递校区
		changeschoolName(state,schoolName){
			state.schoolName = schoolName
			console.log(state.schoolName);
		},	
		// 详情传递日期
		changesaveDate(state,datalist){
			state.datalist = datalist
		},
		// 传递id值
		changeId(state,id){
			state.id = null
			state.id = id
		},
		// 传递title
		changeTitle(state,title){
			state.title = title
		}
	},
	actions: {

	}
})
export default store