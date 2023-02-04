<script>
import WikiTable from "@/components/WikiTable.vue";
import { openSuccess, openError } from "@/components/notification";
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
      fetch("/info", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.contents = data.contents))
        .catch((err) => openError(err));
    },
    // FIXME
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
          openSuccess("The page was updated.");
          this.getInfo();
        })
        .catch((err) => openError(err));
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<template>
  <div class="container">
    <h1>Wiki of programing languages</h1>
    <img src="/assets/wiki.png" alt="girl_with_pc" width="300" />
    <WikiTable :contents="this.contents" @saveInfo="saveInfo($data)" />
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}
</style>
