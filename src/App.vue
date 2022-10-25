<template>
  <nav>
    <router-link to="/">List</router-link> |
    <router-link to="/home">Home</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}

table {
  width: 80%;
  margin: 0px 30px;
}

.time {
  display: flex;
  margin-left: 15px;
}

form {
  display: flex;
}

p {
  margin: 0px 10px;
}

input {
  margin-right: 15px;
}
</style>
