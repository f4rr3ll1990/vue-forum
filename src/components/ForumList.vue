<template>
  <ul class="list-group list-group-flush">
    <ForumListItem
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </ul>
</template>

<script>
    import ForumListItem from './ForumListItem'
    export default {
      components: {
        ForumListItem
      },

      props: {
        forums: {
          required: true,
          type: Array
        }
      }
    }
</script>

<style scoped>

</style>
