<template>
  <div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <h1 class="card-title">
            {{ category.name }}
        </h1>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <hr>
      <ForumListFull :forums="categoryForums"/>
    </div>
  </div>
</template>

<script>
    import ForumListFull from './ForumListFull'

    export default {
      components: {
        ForumListFull
      },

      props: {
        category: {
          required: true,
          type: Object
        }
      },

      computed: {
        categoryForums () {
          return Object.values(this.$store.state.forums.items)
            .filter(forum => forum.categoryId === this.category['.key'])
        }
      }
    }
</script>

<style scoped>

</style>
