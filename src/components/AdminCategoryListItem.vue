<template>
    <tr>
      <td>{{ category.name }}</td>
      <td><router-link :to="{name: 'AdminCategoryEdit', params: {categoryId: category['.key'], name: category.name, slug: category.slug}}"><i class="fa fa-edit"></i></router-link></td>
      <td><button class="btn btn-outline btn-danger" @click="deleteCat"><i class="fa fa-trash"></i></button></td>
    </tr>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
      props: {
        category: {
          required: true,
          type: Object
        }
      },
      methods: {
        ...mapActions('categories', ['deleteCategory']),
        deleteCat() {
          console.log(this.category['.key'])
          this.deleteCategory(this.category['.key'])
        }
      }
    }
</script>

<style scoped>

</style>
