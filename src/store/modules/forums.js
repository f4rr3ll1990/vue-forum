import {makeAppendChildToParentMutation} from '@/store/assetHelpers'
import firebase from 'firebase'

export default {
  namespaced: true,

  state: {
    items: {},
    forums: []
  },

  actions: {
    fetchForum: ({dispatch}, {id}) => dispatch('fetchItem', {resource: 'forums', id, emoji: '🌧'}, {root: true}),
    fetchForums: ({dispatch}, {ids}) => dispatch('fetchItems', {resource: 'forums', ids, emoji: '🌧'}, {root: true}),
    fetchAllForums ({state, commit}) {
      // console.log('🔥', '🏷', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('forums').once('value', snapshot => {
          const forumsObject = snapshot.val()
          Object.keys(forumsObject).forEach(forumId => {
            const forum = forumsObject[forumId]
            commit('setItem', {resource: 'forums', id: forumId, item: forum}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    },
    fetchAllThreads ({state, commit}) {
      // console.log('🔥', '🏷', 'all')
      return new Promise((resolve, reject) => {
        firebase.database().ref('threads').once('value', snapshot => {
          const threadsObject = snapshot.val()
          Object.keys(threadsObject).forEach(threadId => {
            const thread = threadsObject[threadId]
            commit('setItem', {resource: 'threads', id: threadId, item: thread}, {root: true})
          })
          resolve(Object.values(state.items))
        })
      })
    },
    deleteForum ({commit, state, rootState}, forum) {
      console.log(forum)
      firebase.database().ref('forums').child(forum.id).remove()
      firebase.database().ref('categories/' + forum.category + '/forums').child(forum.id).remove()

      Object.keys(forum.threads).forEach( (key) => {
        console.log('forum key' + key);

        firebase.database().ref(`threads/${key}/posts`).once('value', snapshot => {
          const postsObject = snapshot.val()
          console.log('delete forum key' + key);
          firebase.database().ref('threads').child(key).remove()
          Object.keys(postsObject).forEach(postId => {
            console.log('delete post key' + postId);
            firebase.database().ref('posts').child(postId).remove()
          })
        })       
        
      })
      
    },
    createForum ({commit, state, rootState}, forum) {
      const forumtId = firebase.database().ref('forums').push().key
      const updates = {}
      
      updates[`forums/${forumtId}`] = forum

      firebase.database().ref().update(updates)
      firebase.database().ref(`categories/${forum.categoryId}/forums/${forumtId}`).set(forumtId)
    },
    updateForum ({state, commit, rootState}, {id, name, slug, description}) {
      const update = {}
      update.name = name
      update.slug = slug
      update.description = description

      firebase.database().ref('forums').child(id).update(update)
    }
  },

  mutations: {
    appendThreadToForum: makeAppendChildToParentMutation({parent: 'forums', child: 'threads'})
  }
}
