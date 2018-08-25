<template>
  <div v-if="thread && user" class="thread">
    <div class="col-sm-12">
      <router-link :to="{name: 'ThreadShow', params: {id: thread['.key']}}">
        {{thread.title}} <span class="badge badge-secondary">{{repliesCount}} replies</span>
      </router-link>
    </div>
    <div class="col-sm-12">
      <p class="text-faded text-xsmall">
        By <a href="#">{{user.name}}</a>, <AppDate :timestamp="thread.publishedAt"/>.
      </p>
    </div>
    <hr>
  </div>
</template>

<script>
  export default {
    props: {
      thread: {
        required: true,
        type: Object
      }
    },

    computed: {
      repliesCount () {
        return this.$store.getters['threads/threadRepliesCount'](this.thread['.key'])
      },
      user () {
        return this.$store.state.users.items[this.thread.userId]
      }
    }
  }
</script>
<style scoped>
  .thread {
    font-size: 1rem;
  }
</style>
