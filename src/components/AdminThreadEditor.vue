<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="name">
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
        title: {
          type: String,
          default: ''
        }
      },

      data () {
        return {
          form: {
            title: this.title
          }
        }
      },

      computed: {
        isUpdate () {
          return !!this.title
        }
      },

      methods: {
        save () {
          this.$emit('save', this.form.title)
        },

        cancel () {
          this.$emit('cancel')
        }
      }
    }
</script>

<style scoped>

</style>
