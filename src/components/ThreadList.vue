<template>
  <div class="col-sm-12">
    <div class="card">
      <div class="card-body">
        <ThreadListItem
          v-for="thread in threads"
          :thread="thread"
          :key="thread['.key']"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import ThreadListItem from './ThreadListItem'
  export default {
    components: {
      ThreadListItem
    },

    props: {
      threads: {
        required: true,
        type: Array
      }
    }
  }
</script>
