<template>
  <div class="container">
    <h1>Список Веток</h1>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Ветка</th>
          <th scope="col">Редактировать</th>
          <th scope="col">Удалить</th>
        </tr>
      </thead>
      <tbody>
        <AdminThreadsListItem
          v-for="thread in threads"
          :thread="thread"
          :key="thread['.key']"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
    import AdminThreadsListItem from './AdminThreadsListItem'
    export default {
      components: {
        AdminThreadsListItem
      },

      props: {
        threads: {
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
