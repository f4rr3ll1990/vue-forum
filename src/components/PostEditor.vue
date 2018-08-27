<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <!-- <froala :tag="'textarea'" :config="config" v-model="text" class="form-input" name="content"></froala> -->
        <vue-mce v-model="text" :config="config" />
    </div>
    <div class="form-actions">
      <button v-if="isUpdate" @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
      props: {
        threadId: {
          required: false
        },

        post: {
          type: Object,
          validator: obj => {
            const keyIsValid = typeof obj['.key'] === 'string'
            const textIsValid = typeof obj.text === 'string'
            const valid = keyIsValid && textIsValid
            if (!textIsValid) {
              console.error('😳 The post prop object must include a `text` attribute.')
            }
            if (!keyIsValid) {
              console.error('😳 The post prop object must include a `.key` attribute.')
            }
            return valid
          }
        }
      },

      data () {
        return {
          text: this.post ? this.post.text : '',
          config: {
            theme: 'modern',
            fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 39px 34px 38px 42px 48px",
            plugins: 'print preview fullpage image searchreplace autolink',
          },
        }
      },

      computed: {
        isUpdate () {
          return !!this.post
        }
      },

      methods: {
        ...mapActions('posts', ['createPost', 'updatePost']),

        save () {
          this.persist()
            .then(post => {
              this.$emit('save', {post})
            })
        },

        cancel () {
          this.$emit('cancel')
        },

        create () {
          const post = {
            text: this.text,
            threadId: this.threadId
          }
          this.text = ''

          return this.createPost(post)
        },

        update () {
          const payload = {
            id: this.post['.key'],
            text: this.text
          }
          return this.updatePost(payload)
        },

        persist () {
          return this.isUpdate ? this.update() : this.create()
        }
      }
    }
</script>

<style scoped>

</style>
