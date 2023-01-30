<script>
export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getInfo: function () {
      fetch("http://localhost:5001/info", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.users = data));
    },
    saveInfo: function () {
      const json = {
        id: 5,
        name: "piyo",
      };
      fetch("http://localhost:5001/info", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      })
        .then(() => this.getInfo())
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<template>
  <div>
    <h2>json file contents</h2>
    {{ users }}<br /><br />
    <el-button :onclick="saveInfo"> save </el-button>
  </div>
</template>
