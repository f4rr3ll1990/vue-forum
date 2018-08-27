<template>
  <div class="container">
    <h1>Список форумов</h1>
    <router-link :to="{name: 'AdminForumCreate'}">
        Создать
    </router-link>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Форум</th>
          <th scope="col">Редактировать</th>
          <th scope="col">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <AdminForumsListItem
        v-for="forum in forums"
        :forum="forum"
        :key="forum['.key']"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
    import AdminForumsListItem from './AdminForumsListItem'
    export default {
      components: {
        AdminForumsListItem
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
