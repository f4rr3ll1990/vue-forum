<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link
            :to="{name: 'Home'}"
            class="nav-link">Главная
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
    <ul v-if="user" class="navbar-nav mr-right">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img class="avatar-small" :src="user.avatar" alt="">
          <span>
            {{user.name}}
          </span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <router-link :to="{name: 'Profile'}" class="dropdown-item">Профиль</router-link>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" @click.prevent="$store.dispatch('auth/signOut')">Выход</a>
        </div>
      </li>      
    </ul>
    <ul v-else>
      <li class="navbar-item">
        <router-link :to="{name: 'SignIn'}" class="nav-link">Войти</router-link>
      </li>
      <li class="navbar-item">
        <router-link :to="{name: 'Register'}" class="nav-link">Регистрация</router-link>
      </li>
    </ul>
  </div>
</nav>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        userDropdownOpen: false,
        hamburgerOpen: false
      }
    },
    computed: {
      ...mapGetters({
        'user': 'auth/authUser'
      })
    }
  }
</script>

<style scoped>

</style>
