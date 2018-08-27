<template>
  <div v-if="asyncDataStatus_ready" class="row">
    <AdminNav />
    <div class="col-sm-9">
        <AdminThreadsList :threads="threads"/>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import AdminNav from '@/components/AdminNav'
import AdminThreadsList from '@/components/AdminThreadsList'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  components: {
    AdminThreadsList,
    AdminNav
  },

  mixins: [asyncDataStatus],

  computed: {
    threads () {
      return Object.values(this.$store.state.threads.items)
    }
  },

  methods: {
    ...mapActions('forums', ['fetchAllThreads'])
  },

  created () {
    this.fetchAllThreads()
      .then(() => {
        this.asyncDataStatus_fetched()
      })
  }
}
</script>

<style scoped>


</style>

