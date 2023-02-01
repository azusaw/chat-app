<script>
import WikiTable from "@/components/WikiTable.vue";
export default {
  components: { WikiTable },
  data() {
    return {
      contents: [],
      editingContent: null,
      editingId: "0",
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
        .then((data) => (this.contents = data.contents));
    },
    saveInfo: function (data) {
      fetch("http://localhost:5001/info", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
    <h2>Wiki of programing languages</h2>
    <WikiTable :contents="this.contents" @saveInfo="saveInfo($data)" />
  </div>
</template>

<style scoped></style>
