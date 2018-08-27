<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i></i></h1>

    <ForumEditor
      ref="editor"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import ForumEditor from '@/components/ForumEditor'
import asyncDataStatus from '@/mixins/asyncDataStatus'

    export default {
      components: {
        ForumEditor
      },

      mixins: [asyncDataStatus],

      data () {
        return {
          saved: false
        }
      },

      computed: {
        hasUnsavedChanges () {
          return (this.$refs.editor.form.name || this.$refs.editor.form.text) && !this.saved
        }
      },

      methods: {
        ...mapActions('forums', ['createForum']),

        save (data) {
          console.log(data);
          this.createForum(data).then(thread => {
            this.saved = true
            this.$router.push({name: 'AdminForums'})
          })
        },

        cancel () {
          this.$router.push({name: 'AdminForums'})
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
