<template>
  <link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.min.css">
  <div id="nav">
    <router-link @click="check_user_login" to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link @click="check_user_logout" to="/logout">Logout</router-link>
  </div>
  <router-view />
</template>

<script>

import { Options, Vue } from 'vue-class-component'

@Options({
  methods: {
    check_user_login: function() {
      let status = localStorage.getItem('status');
      if(status == 'loggedin') {
        this.$router.push('/');
      }
      else {
        this.$router.push('/auth');
      }
    },
    check_user_logout: function() {
      let status = localStorage.getItem('status');
      if(status == 'loggedin') {
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
