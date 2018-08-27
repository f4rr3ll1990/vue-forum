<template>
  <div class="container">
    <h1>Список категорий</h1>
    <router-link :to="{name: 'AdminCategoryCreate'}">
        Создать
    </router-link>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Категория</th>
          <th scope="col">Редактировать</th>
          <th scope="col">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <AdminCategoryListItem
          v-for="category in categories"
          :category="category"
          :key="category['.key']"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
    import AdminCategoryListItem from './AdminCategoryListItem'
    export default {
      components: {
        AdminCategoryListItem
      },

      props: {
        categories: {
          required: true,
          type: Array
        }
      }
    }
</script>

<style scoped>
  .table {
    width: 100%;
  }
</style>
