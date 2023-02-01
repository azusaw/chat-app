<script></script>

<template>
  <div class="container">
    <h1>Summary of development</h1>
    <img src="/public/summary.png" alt="cat_with_pc" width="300" />
    <div class="summary">
      <blockquote>
        <strong>Nuxt.js</strong> is a free and open source web application
        framework based on Vue.js, Node.js, Webpack and Babel.js. Nuxt is
        inspired by <strong>Next.js</strong>, which is a framework of similar
        purpose, based on React.js.
      </blockquote>
      <p>
        <br />Vue is popular in Japan, so even if you search for Next.js, most
        Nuxt.js articles will be hit...<br />
      </p>
      <pre>
    <code>
    //nuxt.config.js
    export default {
      /* SPA(default) */
      ssr: false

      /* SSR */
      ssr: false,
      target: "server"

      /* SSG */
      ssr: false,
      target: "static"
    }
    </code>
  </pre>
      <p>
        <br />In the case of SSR setting, SSR functions such as
        <code>asyncData</code> and <code>fetch</code> are called for each
        request. <br />On the other hand, in the case of SSG setting, SSR
        functions such as <code>asyncData</code> and <code>fetch</code> are
        called only once when during <code>nuxt generate</code>. Since
        <code>created</code> and <code>beforeCreate</code> are client side, you
        can call the API which you want to call like CSR.<br />Details in
        <a
          href="https://nuxtjs.org/docs/2.x/concepts/nuxt-lifecycle/"
          target="_blank"
          rel="noopener noreferrer"
          >Nuxt Lifecycle</a
        >.<br /><br /><strong><u>Hot Reloading</u></strong
        ><br />Code under development is synced with the screen to improve your
        development experience.<br />
      </p>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
img {
  margin: 1rem auto;
  max-width: 300px;
}
h4 {
  text-decoration: underline;
  font-weight: bolder;
}
blockquote {
  padding: 1.5em;
  margin: 2em 0;
  color: #fff;
  background-color: #646b69;
  border-radius: 5px;
}
blockquote:after {
  float: right;
  content: "quoted from Wikipedia";
  text-decoration: underline;
}
pre {
  padding: 1.5em;
  margin: 2em 0;
  background-color: #eee;
  border-radius: 5px;
  font-size: 0.8rem;
}
p > code,
ul > li > code {
  font-size: 0.8rem;
  padding: 0.2em 0.3em;
  margin: 0 0.3em;
  color: #ff3c7b;
  border: #ccc 1px solid;
  border-radius: 3px;
}
</style>
