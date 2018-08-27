<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Edit thread<i></i></h1>

    <AdminThreadEditor
      ref="editor"
      :title="title"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import AdminThreadEditor from '@/components/AdminThreadEditor'
    import asyncDataStatus from '@/mixins/asyncDataStatus'

    export default {
      components: {
        AdminThreadEditor
      },

      mixins: [asyncDataStatus],

      data () {
        return {
          threadId: this.$route.params.threadId,
          title: this.$route.params.title,
          saved: false
        }
      },

      computed: {
        hasUnsavedChanges () {
          return (this.$refs.editor.form.title) && !this.saved
        }
      },

      methods: {
        ...mapActions('threads', ['editThread']),

        save (title) {
          console.log('Save Init');
          this.editThread({
            id: this.threadId,
            title
          }).then(thread => {
            console.log('SAVED');
            this.saved = true
            this.$router.push({name: 'AdminThreads'})
          })
        },

        cancel () {
          this.$router.push({name: 'AdminCategories'})
        }
      },

      created () {
          this.asyncDataStatus_fetched()
      },

      beforeRouteLeave (to, from, next) {
        if (this.hasUnsavedChanges) {
          const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost.')
          if (confirmed) {
            next()
          } else {
            next(false)
          }
        } else {
          next()
        }
      }
    }
</script>

<style scoped>

</style>
