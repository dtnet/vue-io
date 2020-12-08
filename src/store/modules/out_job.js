const DB = 'test'
import http from '@/plugins/sailsIo'
// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ state
const getDefaultState = () => {
    return {
        items: []
    }
}
const state = getDefaultState()
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ state

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ getters
const getters = {
    items: state => state.items
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ getters

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ mutations
const mutations = {
    pushItems(state, items) {
        state.items = state.items.concat(items)
    },
    updateItem(state, item) {
        let index = state.items.findIndex(i => i.id === item.id)
        state.items.splice(index, 1, item)
    },
    delItem(state, item) {
        let index = state.items.findIndex(i => i.id === item.id)
        state.items.splice(index, 1)
    }
}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ mutations

// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ actions
const actions = {
    async pullItems({commit}) {
        try {
            let items = await http.get(DB)
            commit('pushItems', items)
        } catch (e) {
            console.log(e, '<----<<<out_job.js-31')
        }
    },
    async updateItem({commit}, data) {
        try {
            let item = await http.update(DB, data)
            commit('updateItem', item)
        } catch (e) {
            console.log(e, '<----<<<out_job.js-40')
        }
    },
    async delItem({commit},id) {
        try {
            let item=await http.del(DB,id)
            commit('delItem',item)
        }catch (e) {
            console.log(e, '<----<<<out_job.js-58')
        }
    },
    async addItem({commit}, data) {
        try {
            let item = await http.post(DB, data)
            commit('pushItems', item)
        } catch (e) {
            console.log(e, '<----<<<out_job.js-40')
        }
    },

}
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ actions

export default {namespaced: true, state, getters, mutations, actions}
