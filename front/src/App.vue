<script>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
const input = ref('')
import io from 'socket.io-client';
import SocketioService from './services/socketio.service.js';

export default {
  data() {
    return {
      messages: [],
      socket: io('localhost:5001', {
      withCredentials: true
    })
    }
  },
  methods: {
    sendMessage(message) {
      // send a message to server
      this.socket.emit('SEND_MESSAGE', {message});
    }
  },
  mounted() {
    // receive an update from server
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    });
  }
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
<!--      <HelloWorld msg="You did it!" />-->
<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
      <div>
        <h1>Chat</h1>
        <ul>
          <li v-for="(msg, index) in messages" :key="index">{{msg}}</li>
        </ul>
        <div>
          <input type="text" @keyup.enter="sendMessage()" v-model="message">
        </div>
      </div>

    </div>
  </header>

<!--  <RouterView />-->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
