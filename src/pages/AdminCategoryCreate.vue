<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Create new thread in <i></i></h1>

    <CategoryEditor
      ref="editor"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import CategoryEditor from '@/components/CategoryEditor'
    import asyncDataStatus from '@/mixins/asyncDataStatus'

    export default {
      components: {
        CategoryEditor
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
        ...mapActions('categories', ['createCategory']),

        save ({name, slug}) {
          this.createCategory({
            name,
            slug
          }).then(thread => {
            this.saved = true
            this.$router.push({name: 'AdminCategories'})
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
