<template>
    <tr>
      <td>{{ thread.title }}</td>
      <td><router-link :to="{name: 'AdminThreadEdit', params: {threadId: thread['.key'], title: thread.title}}"><i class="fa fa-edit"></i></router-link></td>
      <td><button class="btn btn-outline btn-danger" @click="delThread"><i class="fa fa-trash"></i></button></td>
    </tr>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
      props: {
        thread: {
          required: true,
          type: Object
        }
      },
      methods: {
        ...mapActions('threads', ['deleteThread']),
        delThread() {
          let data = {
            id: this.thread['.key'],
            forumId: this.thread.forumId,
            posts: this.thread.posts
          }
          this.deleteThread(data)
          this.$router.push({name: 'AdminThreads'})
        }
      }
    }
</script>

<style scoped>

</style>
