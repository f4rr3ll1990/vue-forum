import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {}
  },

  actions: {
    fetchAllCategories ({state, commit}) {
      // console.log('🔥', '🏷', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('categories').once('value', snapshot => {
          const categoriesObject = snapshot.val()
          Object.keys(categoriesObject).forEach(categoryId => {
            const category = categoriesObject[categoryId]
            commit('setItem', {resource: 'categories', id: categoryId, item: category}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    },
    createCategory ({commit, state, rootState}, category) {
      const cattId = firebase.database().ref('categories').push().key
      const updates = {}
      
      updates[`categories/${cattId}`] = category
      firebase.database().ref().update(updates)
    },
    deleteCategory ({commit, state, rootState}, id) {
      firebase.database().ref('categories').child(id).remove()
    },
    updateCategory ({state, commit, rootState}, {id, name, slug}) {
        const update = {}
        update.name = name
        update.slug = slug

        firebase.database().ref('categories').child(id).update(update)
    },

    fetchCategory: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'categories', id, emoji: '🏷'}, {root: true}),
    fetchCategories: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'categories', ids, emoji: '🏷'}, {root: true})
  }
}
