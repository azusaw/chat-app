<script></script>

<template>
  <div class="container">
    <h1>Summary of development</h1>
    <img src="/assets/summary.png" alt="cat_with_pc" width="300" />
    <div class="toc">
      <ol>
        <li><a href="#sum-1" class="anchor">Final outputs</a></li>
        <li><a href="#sum-2" class="anchor">Analyse requirement</a></li>
        <li><a href="#sum-3" class="anchor">Create wireframe</a></li>
        <li>
          <a href="#sum-4" class="anchor"
            >Choose a technologies and frameworks
          </a>
        </li>
        <li><a href="#sum-5" class="anchor">Prepare independent library</a></li>
        <li><a href="#sum-6" class="anchor">Figure out Socket.io</a></li>
        <li><a href="#sum-7" class="anchor">Figure out r/w JSON file</a></li>
        <li><a href="#sum-8" class="anchor">Implement elements to Vue</a></li>
        <li><a href="#sum-9" class="anchor">Implement designs to CSS</a></li>
        <li><a href="#sum-10" class="anchor">Check it works in Codio</a></li>
        <li><a href="#sum-11" class="anchor">Refactoring</a></li>
      </ol>
    </div>
    <div class="summary">
      <h3 id="sum-1">1. Final outputs</h3>
      <h3 id="sum-2">2. Analyse requirement</h3>
      <p>First, I checked the requirement from documents and organized.</p>
      <ul>
        <li>Home page: general information</li>
        <li>About page: how to use it</li>
        <li>Summary page: development process</li>
        <li>Chat page: real time chat function</li>
      </ul>
      <p>About chat function...</p>
      <ul>
        <li>Notification to existing users when a new users’ joins</li>
        <li>Show a list of users currently within a chat</li>
        <li>
          Inform below event to users
          <ul>
            <li>When a new user joins a chat users</li>
            <li>when a user exits a chat</li>
            <li>when other connected users are typing</li>
          </ul>
        </li>
      </ul>

      <h3 id="sum-3">3. Create wireframe</h3>

      <h3 id="sum-4">4. Choose a technologies and frameworks</h3>
      <p>The framework I have chosen and reasons.</p>
      <blockquote>
        <strong>Vue.js</strong> is an open-source model–view–viewmodel front end
        JavaScript framework for building user interfaces and single-page
        applications. It was created by Evan You, and is maintained by him and
        the rest of the active core team members.
      </blockquote>
      <h4>Server side (back-end)</h4>
      <ul>
        <li>Express ... Web application frameworks available in Node.js</li>
        <li>
          Socket.io ... Providing real-time communication between server and
          client
        </li>
      </ul>
      <h4>Client side (front-end)</h4>
      <ul>
        <li>
          Vue.js @3.2.45 ... JavaScript Framework
          <ul>
            <li>I have no experience</li>
            <li>Easy to introduction</li>
            <li>popular in Japan</li>
          </ul>
        </li>
        <li>
          Element+ ... UI framework for Vue.js
          <ul>
            <li>Well written English document</li>
            <li>Easy to introduction</li>
            <li>Using material design</li>
            <li>
              18.4K stars in
              <a
                href="https://github.com/element-plus/element-plus"
                target="__blank"
                >Github</a
              >
            </li>
          </ul>
        </li>
      </ul>

      <h3 id="sum-5">5. Prepare independent library</h3>
      <h4>Vue.js</h4>
      <p>
        followed official
        <a href="https://vuejs.org/guide/quick-start.html" target="_blank"
          >Quick start guide.</a
        >
      </p>
      <pre>
        <code>
          > npm init vue@latest

          // commands for build, develop
          > npm run build
          > npm run dev
        </code>
      </pre>
      <h4>Element+</h4>
      <p>
        followed official
        <a
          href="https://element-plus.org/en-US/guide/quickstart.html"
          target="_blank"
          >Quick start guide.</a
        >
      </p>
      <pre>
        <code>
          > npm install element-plus
        </code>
      </pre>
      <pre>
        <code>
          // main.js

          import { createApp } from "vue";
          import App from "./App.vue";
          import router from "./router";
          import ElementPlus from "element-plus";
          import * as ElementPlusIconsVue from "@element-plus/icons-vue";
          import "element-plus/dist/index.css";
          import "./styles/main.css";

          const app = createApp(App);
              app.use(router);
              app.use(ElementPlus);
              for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
              app.component(key, component);
          }

          app.mount("#app");
        </code>
      </pre>

      <h3 id="sum-6">6. Figure out Socket.io</h3>
      <p>
        Referring to the samples distributed, the processes of Socket.io
        performed by the client and server respectively were checked. <br />
        Socket.io has two main functions: sending<code>emit</code> and
        receiving<code>on</code>.<br />
        Clients use <code>emit</code> to notify that an event was happen to
        server, then severs received an event from client, then broadcast it to
        every clients by using <code>emit</code> as a callback of
        <code>on</code>.
      </p>
      <h4>Server side (back-end)</h4>
      <ul>
        <li>
          io.on: <code>connection</code>
          <ul>
            <li>Reserved action by socket.io</li>
            <li>When a client generate socket.io, receive an event</li>
          </ul>
        </li>
        <li>
          socket.on: <code>user connected</code>
          <ul>
            <li>
              Created for receiving an event from clients when new client
              connected
            </li>
            <li>Callback: io.emit("new user connected")</li>
          </ul>
        </li>
        <li>
          socket.on: <code>chat message</code>
          <ul>
            <li>
              Created for receiving an event from clients when new message was
              sent
            </li>
            <li>Callback: io.emit("chat message")</li>
          </ul>
        </li>
        <li>
          socket.on: "start typing"
          <ul>
            <li>
              Created for receiving an event from clients when user started
              typing
            </li>
            <li>Callback: io.emit("typing")</li>
          </ul>
        </li>
        <li>
          socket.on: <code>stop typing</code>
          <ul>
            <li>
              Created for receiving an event from clients when user stopped
              typing
            </li>
            <li>Callback: io.emit("typing")</li>
          </ul>
        </li>
        <li>
          io.on: <code>disconnect</code>
          <ul>
            <li>Reserved action by socket.io</li>
            <li>
              When a client leave or reload page socket.io, receive an event
            </li>
            <li>Callback: io.emit("user disconnected"), io.emit("typing")</li>
          </ul>
        </li>
        <li>
          io.on: <code>user disconnect</code>
          <ul>
            <li>
              Created for receiving an event from clients when user unmounted a
              page
            </li>
            <li>When a client destroy socket.io, receive an event</li>
            <li>Callback: io.emit("user disconnected"), io.emit("typing")</li>
          </ul>
        </li>
      </ul>
      <h4>Client side (front-end)</h4>
      <ul>
        <li>
          socket.emit: <code>chat messages</code>
          <ul>
            <li>
              Created for sending an event to clients when new message was sent
            </li>
          </ul>
        </li>
        <li>
          socket.emit: <code>start typing</code>
          <ul>
            <li>
              Created for sending an event from clients when user started typing
            </li>
          </ul>
        </li>
        <li>
          socket.emit: <code>stop typing</code>
          <ul>
            <li>
              Created for sending an event from clients when user stopped typing
            </li>
          </ul>
        </li>
        <li>
          socket.on <code>new user connected</code>
          <ul>
            <li>
              Created for receiving an event from clients when new client
              connected
            </li>
            <li>When a client destroy socket.io, receive an event</li>
            <li>Callback: io.emit("user disconnected"), io.emit("typing")</li>
          </ul>
        </li>
        <li>
          socket.on: <code>user connected</code>
          <ul>
            <li>
              Created for receiving an event from clients when new client
              connected
            </li>
            <li>Callback: update active users</li>
          </ul>
        </li>
        <li>
          socket.on: <code>chat message</code>
          <ul>
            <li>
              Created for receiving an event from clients when new message was
              sent
            </li>
            <li>Callback: update messages</li>
          </ul>
        </li>
        <li>
          socket.on: <code>typing</code>
          <ul>
            <li>
              Created for receiving an event from clients when new message was
              sent
            </li>
            <li>Callback: update typing users</li>
          </ul>
        </li>
        <li>
          socket.on: <code>user disconnect</code>
          <ul>
            <li>
              Created for receiving an event from clients when user unmounted a
              page
            </li>
            <li>When a client destroy socket.io, receive an event</li>
            <li>Callback: update active users</li>
          </ul>
        </li>
      </ul>
      <img src="/assets/socket-test.jpg" />
      <p>
        I tested and figured out how socket.io works between client and server
        with a brief UI.
      </p>

      <h3 id="sum-7">7. Figure out r/w JSON file</h3>
      <p>
        For the development of the editable wiki, I decided to use Express with
        <code>GET</code>and<code>PUT</code> requests from the client to the
        server implemented by Express. About the data storage method, read/write
        a data from/to the <code>JSON</code> file located server local was
        adopted as this is less expensive to develop than using a database.
      </p>
      <h4>Server side (back-end)</h4>
      <pre>
        <code>
        // index.js
        const dataFile = "data.json";

        app.get("/info", (req, res) => {
          const data = JSON.parse(fs.readFileSync(dataFile, "utf8"));
          res.send(data);
        });

        app.put("/info", (req, res) => {
          let data = JSON.stringify({ contents: req.body.contents });
          fs.writeFileSync(dataFile, data);
          res.send(200);
        });
        </code>
      </pre>
      <ul>
        <li>
          GET<code>/info</code>... read data from data.json, convert string to
          JSON object and send it
        </li>
        <li>
          PUT<code>/info</code>... convert JSON object to string and write it to
          data.json
        </li>
      </ul>
      <h4>Client side (front-end)</h4>
      <pre>
        <code>
          // Wiki.vue

          methods: {
            getInfo: function () {
              fetch("/info", {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => (this.contents = data.contents))
            },
            saveInfo: function (data) {
              fetch("/info", {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              })
                .then(() => {
                  this.getInfo();
                })
            },
        </code>
      </pre>
      <ul>
        <li>
          <code>getInfo</code>... send get request to server and assign data to
          a variable
        </li>
        <li>
          <code>saveInfo</code>... send post request with edited data, after
          that send get request to update data
        </li>
      </ul>

      <h3 id="sum-8">8. Implement elements to Vue</h3>
      <p>
        Now that the functionality has been implemented, the necessary pages and
        components are prepared.
      </p>

      <h3 id="sum-9">9. Implement designs to CSS</h3>

      <h3 id="sum-10">10. Check it works in Codio</h3>

      <h3 id="sum-11">11. Refactoring</h3>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}

.toc {
  text-align: left;
  padding: 5px 10px;
  color: #646b69;
  background-color: #eee;
  font-weight: 600;
  border-radius: 5px;
  margin: 0 0 40px;
  line-height: 2;
}

.summary {
  text-align: left;
}

img {
  margin: 1.5rem auto 1rem;
  max-width: 500px;
}

h3 {
  /* adjust anchor position*/
  padding-top: 120px;
  margin-top: calc(var(--header-height) * -1);
  font-weight: bolder;
}

h4 {
  margin: 30px 0 5px;
  text-decoration: underline;
  font-weight: bolder;
}

blockquote {
  padding: 20px 20px 40px;
  margin: 2rem 0;
  color: #eee;
  background-color: #646b69;
  line-height: 1.5rem;
  border-radius: 5px;
}

blockquote:after {
  margin-top: 5px;
  float: right;
  content: "quoted from Wikipedia";
  text-decoration: underline;
}

code {
  color: #555;
  font-family: "Quicksand", "Noto Sans JP", "sans-serif";
  line-height: 1.5rem;
  margin: 0;
  padding: 0;
}

pre {
  background-color: #eee;
  border-radius: 5px;
  font-size: 0.9rem;
}

p {
  line-height: 1.8rem;
}

ul {
  line-height: 2;
}

p > code,
ul > li > code {
  font-size: 0.8rem;
  padding: 0.2em 0.3em;
  margin: 0 0.3em;
  color: #ff3c7b;
  border: #ccc 1px solid;
  border-radius: 3px;
  background-color: #eee;
}
</style>
