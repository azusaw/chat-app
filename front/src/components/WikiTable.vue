<script>
export default {
  name: "WikiTable",
  props: {
    contents: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editingContent: null,
      editingId: 0,
    };
  },
  methods: {
    isEditing: function (id) {
      return this.editingId === id;
    },
    changeToEditing: function (id) {
      this.editingId = id;
      this.editingContent = this.contents.find((content) => content.id === id);
    },
    submit: function () {
      let data = this.contents;
      data[this.editingId - 1] = this.editingContent;
      this.$emit("saveInfo", data);
      this.editingId = 0;
    },
  },
};
</script>

<template>
  <el-table :data="contents" row-key="id" border class="table">
    <el-table-column type="expand">
      <template #default="props">
        <div class="table-expand-contents">
          <el-button
            v-if="!isEditing(props.row.id)"
            :disabled="editingId !== 0"
            class="edit-button"
            type="primary"
            :onclick="() => changeToEditing(props.row.id)"
          >
            Edit
          </el-button>
          <div class="edit-contents">
            <h3>Description</h3>
            <el-input
              v-if="isEditing(props.row.id)"
              v-model="this.editingContent.description"
              type="textarea"
              rows="4"
            />
            <p v-else>{{ props.row.description }}</p>
            <h3>Features</h3>
            <el-input
              v-if="isEditing(props.row.id)"
              v-model="editingContent.features"
              type="textarea"
              rows="4"
            />
            <ul v-else v-for="item in props.row.features.split('\n')">
              <li>{{ item }}</li>
            </ul>
            <h3>Used for</h3>
            <el-input
              v-if="isEditing(props.row.id)"
              v-model="editingContent.used"
              type="textarea"
              rows="4"
            />
            <ul v-else v-for="item in props.row.used.split('\n')">
              <li>{{ item }}</li>
            </ul>
            <h3>Pros & Cons</h3>
            <div class="pros-cons">
              <h4>Pros</h4>
              <el-input
                v-if="isEditing(props.row.id)"
                v-model="editingContent.pros"
                type="textarea"
                rows="4"
              />
              <ul v-else v-for="item in props.row.pros.split('\n')">
                <li>{{ item }}</li>
              </ul>
              <h4>Cons</h4>
              <el-input
                v-if="isEditing(props.row.id)"
                v-model="editingContent.cons"
                type="textarea"
                rows="4"
              />
              <ul v-else v-for="item in props.row.cons.split('\n')">
                <li>{{ item }}</li>
              </ul>
            </div>
          </div>
          <el-button
            v-if="isEditing(props.row.id)"
            class="edit-button"
            type="primary"
            :onclick="submit"
          >
            Save
          </el-button>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="img" width="70">
      <template #default="scope">
        <img :src="`/assets/icons/${scope.row.img}`" width="40" />
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="name" width="150" />
    <el-table-column label="Year" prop="year" width="70" />
    <el-table-column label="Inventor" prop="inventor" />
  </el-table>
</template>

<style scoped>
.table {
  border-radius: 5px;
  margin: 50px 0;
}
.table-expand-contents {
  padding: 10px 30px;
}
.edit-button {
  float: right;
}
.edit-contents {
  margin: 20px 0;
}
.pros-cons {
  margin-left: 20px;
}
h3 {
  margin-top: 30px;
}
p {
  /* apply <br> */
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
