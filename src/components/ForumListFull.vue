<template>
  <ul class="list-group list-group-flush">
    <ForumListItemFull
      v-for="forum in forums"
      :forum="forum"
      :key="forum['.key']"
    />
  </ul>
</template>

<script>
    import ForumListItemFull from './ForumListItemFull'
    export default {
      components: {
        ForumListItemFull
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
