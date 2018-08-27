<template>
  <div class="col-sm-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <router-link :to="{name: 'Category', params: {id: category['.key']}}">
            {{ category.name }}
          </router-link>
        </h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      </div>
      <hr>
      <ForumList v-if="categoryForums" :forums="categoryForums" />
    </div>
  </div>
</template>

<script>
    import ForumList from './ForumList'

    export default {
      components: {
        ForumList
      },
      data() {
        return {
          list: false
        }
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
      },
      created() {
      }
    }
</script>

<style scoped>

</style>
