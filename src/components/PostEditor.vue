<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <froala :tag="'textarea'" :config="config" v-model="text" class="form-input" name="content"></froala>
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
            imageUpload: true,
            	toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
            imageInsertButtons: ['imageBack', '|', 'imageManager'],
            imageUploadURL: '/upload_image',
            placeholderText: 'Введите текст',
            events: {
              'froalaEditor.initialized': function () {
                console.log('initialized')
              }
            }
          }
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
