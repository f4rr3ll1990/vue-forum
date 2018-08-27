<template>
  <div v-if="asyncDataStatus_ready" class="col-full push-top">

    <h1>Edit forum<i></i></h1>

    <ForumEditor
      ref="editor"
      :categoryId="categoryId"
      :name="name"
      :slug="slug"
      :description="description"
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
          categoryId: this.$route.params.categoryId,
          forumId: this.$route.params.forumId,
          name: this.$route.params.name,
          slug: this.$route.params.slug,
          description: this.$route.params.description,
          saved: false
        }
      },

      computed: {
        hasUnsavedChanges () {
          return (this.$refs.editor.form.name || this.$refs.editor.form.slug) && !this.saved
        }
      },

      methods: {
        ...mapActions('forums', ['updateForum']),

        save ({categoryId, name, slug, description}) {
          console.log('Save Init');
          this.updateForum({
            id: this.forumId,
            name,
            slug,
            description
          }).then(thread => {
            console.log('SAVED');
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
