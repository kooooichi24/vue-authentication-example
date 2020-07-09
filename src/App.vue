<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account">Acount</router-link> |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  created: function () {
    axios.intercept.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) { // eslint-disable-line
        if (err.status === 401 && err.config && err.config.__isRetryRequest) {
          this.$store.dispatch('AUTH_LOGOUT');
        }
        throw err;
      })
    })
  }
}
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
