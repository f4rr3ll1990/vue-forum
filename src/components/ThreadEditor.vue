<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input v-model="form.title" type="text" id="thread_title" class="form-input" name="title">
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <!-- <textarea v-model="form.text" id="thread_content" class="form-input" name="content" rows="8" cols="140"></textarea> -->
      <vue-mce v-model="form.text" :config="config" />
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
        },
        text: {
          type: String,
          default: ''
        }
      },

      data () {
        return {
          form: {
            title: this.title,
            text: this.text
          },
          config: {
            theme: 'modern',
            fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 39px 34px 38px 42px 48px",
            plugins: 'print preview fullpage image searchreplace autolink',
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
          this.$emit('save', {title: this.form.title, text: this.form.text})
        },

        cancel () {
          this.$emit('cancel')
        }
      }
    }
</script>

<style scoped>

</style>
