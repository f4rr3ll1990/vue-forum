<template>
  <div>
    <li class="list-group-item">
      <div>
        <router-link
          class=""
          :to="{name: 'Forum', params: {id: forum['.key']}}"
        >
          {{forum.name}}
          <span class="badge badge-secondary">
            {{threadsCount}}
            {{threadsCount === 1 ? 'thread' : 'threads'}}
          </span>
        </router-link>
       </div>
       <div>
        <p class="link-descr" v-html="forum.description"></p>
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
  .link-descr {
    font-size: .850rem;
  }
</style>
