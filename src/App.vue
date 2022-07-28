<template>
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
  <div id="nav">
    <router-link @click="check_user_login" to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link @click="check_user_logout" to="/logout">Logout</router-link>
  </div>
  <router-view />
  <div class="footer">
    Made with <a href="https://vuejs.org/">Vue JS</a> and <a href="https://djangoproject.com/">Django</a>
  </div>
</template>

<script>

import { Options, Vue } from 'vue-class-component'

@Options({
  methods: {
    check_user_login: function () {
      let status = localStorage.getItem('status');
      if (status == 'loggedin') {
        this.$router.push('/');
      }
      else {
        this.$router.push('/auth');
      }
    },
    check_user_logout: function () {
      let status = localStorage.getItem('status');
      if (status == 'loggedin') {
        this.$router.push('/logout');
      }
      else {
        this.$router.push('/auth');
      }
    }
  },
  beforeMount() {
    this.check_user_login()
  }
})

export default class App extends Vue { }

</script>

<style>
body {
  overflow-x: hidden;
  background-image: url('~@/assets/AstronautAndJellyfish.jpg');
  background-size: cover;
  background-attachment: fixed;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #fff;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn, .btn-primary {
  border-radius: 4px;
  background-color: #42b983;
  color: #242424 !important;
  font-weight: bolder;
  padding: 12px !important;
  cursor: pointer;
}
</style>
