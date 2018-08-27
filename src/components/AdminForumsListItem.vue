<template>
    <tr>
      <td>{{ forum.name }}</td>
      <td><router-link :to="{name: 'AdminForumEdit', params: {categoryId: this.forum.categoryId, forumId: forum['.key'], name: forum.name, slug: forum.slug, description: forum.description}}"><i class="fa fa-edit"></i></router-link></td>
      <td><button class="btn btn-outline btn-danger" @click="deleteFor"><i class="fa fa-trash"></i></button></td>
    </tr>
</template>

<script>
import {mapActions} from 'vuex'
import asyncDataStatus from '@/mixins/asyncDataStatus'

    export default {
      props: {
        forum: {
          required: true,
          type: Object
        }
      },
      mixins: [asyncDataStatus],
      methods: {
        ...mapActions('forums', ['deleteForum']),
        ...mapActions('forums', ['fetchAllForums']),
        deleteFor() {
          let data = {
              id: this.forum['.key'],
              category: this.forum.categoryId,
              threads: this.forum.threads
          }
          this.deleteForum(data)
          
        }
      }
    }
</script>

<style scoped>

</style>
