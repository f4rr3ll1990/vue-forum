<template>
  <div class="container">
    <div class="col-sm-6">

      <form @submit.prevent="signIn" class="card card-form">
        <h1 class="text-center">Вход</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" id="email" type="text" class="form-input">
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input v-model="form.password" id="password" type="password" class="form-input">
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Войти</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{name: 'Register'}">Не зарегистрированы?</router-link>
        </div>
      </form>

      <div class="push-top text-center">
        <button @click="signInWithGoogle" class="btn-red btn-xsmall"><i class="fa fa-google fa-btn"></i>Войти с помощю Google</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      data () {
        return {
          form: {
            email: null,
            password: null
          }
        }
      },

      methods: {
        signIn () {
          this.$store.dispatch('auth/signInWithEmailAndPassword', {
            email: this.form.email,
            password: this.form.password
          })
            .then(() => this.successRedirect())
            .catch(error => alert('🤷‍️' + error.message))
        },
        signInWithGoogle () {
          this.$store.dispatch('auth/signInWithGoogle')
            .then(() => this.successRedirect())
            .catch(error => alert('🤷‍️' + error.message))
        },
        successRedirect () {
          const redirectTo = this.$route.query.redirectTo || {name: 'Home'}
          this.$router.push(redirectTo)
        }
      },

      created () {
        this.$emit('ready')
      }
    }
</script>

<style scoped>

</style>
