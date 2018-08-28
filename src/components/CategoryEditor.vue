<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Name:</label>
      <input v-model="form.name" type="text" id="thread_title" class="form-input" name="name">
    </div>

    <div class="form-group">
      <label for="thread_content">Slug:</label>
      <input v-model="form.slug" id="thread_content" class="form-input" name="content" rows="8" cols="140" />
    </div>

    <div class="btn-group">
      <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{isUpdate ? 'Update' : 'Publish'}}</button>
    </div>
  </form>
</template>

<script>

    export default {
      props: {
        name: {
          type: String,
          default: ''
        },
        slug: {
          type: String,
          default: ''
        }
      },

      data () {
        return {
          form: {
            name: this.name,
            slug: this.slug
          }
        }
      },

      computed: {
        isUpdate () {
          return !!this.name
        }
      },

      methods: {
        save () {
          this.$emit('save', {name: this.form.name, slug: this.form.slug})
        },

        cancel () {
          this.$emit('cancel')
        }
      }
    }
</script>

<style scoped>

</style>
