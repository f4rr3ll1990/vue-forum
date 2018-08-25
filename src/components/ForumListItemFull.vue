<template>
  <div>
    <li class="list-group-item">
      <div class="col-sm-12">
        <router-link
          class="link"
          :to="{name: 'Forum', params: {id: forum['.key']}}"
        >
          {{forum.name}}
          <span class="badge badge-secondary">
            {{threadsCount}}
            {{threadsCount === 1 ? 'thread' : 'threads'}}
          </span>
        </router-link>
       </div>
       <div class="col-sm-12">
        <p class="link-descr">{{forum.description}}</p>
       </div>
    </li>
  </div>
</template>

<script>
    import {countObjectProperties} from '@/utils'

    export default {
      props: {
        forum: {
          required: true,
          type: Object
        }
      },

      computed: {
        threadsCount () {
          return countObjectProperties(this.forum.threads)
        }
      }
    }
</script>

<style scoped>
  .link {
    font-size: 1rem;
  }
  .link-descr {
    font-size: 1rem;
  }
</style>
