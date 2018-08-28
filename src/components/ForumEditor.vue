<template>
  <form @submit.prevent="save">
    <div class="form-group" v-if="!categoryId">
      <label for="thread_title">Category:</label>
      <select v-model="form.categoryId">
          <option :value="category['.key']" v-for="category in categories" v-bind:key="category['.key']">
              {{category.name}}
          </option>
      </select>
      selected:{{ form.categoryId }}
    </div>
    <div class="form-group">
      <label for="thread_title">Name:</label>
      <input v-model="form.name" type="text" id="thread_title" class="form-input" name="name">
    </div>

    <div class="form-group">
      <label for="thread_content">Slug:</label>
      <input v-model="form.slug" id="thread_content" class="form-input" name="content" rows="8" cols="140" />    
    </div>

    <div class="form-group">
      <label for="thread_content">Description:</label>
      <froala :tag="'textarea'" v-model="form.description"></froala>
    </div>

    <div class="btn-group">
      <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{isUpdate ? 'Update' : 'Publish'}}</button>
    </div>
  </form>
</template>

<script>
import VueFroala from 'vue-froala-wysiwyg';
import {mapActions} from 'vuex'
    export default {
      props: {
        categoryId: {
          type: String,
          default: ''
        },
        name: {
          type: String,
          default: ''
        },
        slug: {
          type: String,
          default: ''
        },
        description: {
          type: String,
          default: ''
        }
      },

      data () {
        return {
          form: {
            categoryId: this.categoryId,
            name: this.name,
            slug: this.slug,
            description: this.description
          }
        }
      },

      computed: {        
        categories () {
            return Object.values(this.$store.state.categories.items)
        },
        isUpdate () {
          return !!this.name
        }
      },

      methods: {        
        ...mapActions('categories', ['fetchAllCategories']),
        save () {
          let data = {
              categoryId: this.form.categoryId,
              name: this.form.name,
              slug: this.form.slug,
              description: this.form.description
          }
          this.$emit('save', data)
        },

        cancel () {
          this.$emit('cancel')
        }
      },
      created () {
        this.fetchAllCategories()
      }
    }
</script>

<style scoped>

</style>
