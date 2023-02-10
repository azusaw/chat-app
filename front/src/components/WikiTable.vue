<script>
/* Information table in wiki page */
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
    /* Check the item which has given ID is editing or not */
    /* return: Boolean */
    isEditing: function (id) {
      return this.editingId === id;
    },
    /* Change the ID of item which is editing */
    changeToEditing: function (id) {
      this.editingId = id;
      this.editingContent = this.contents.find((content) => content.id === id);
    },
    /* Discard the item changes */
    cancel: function () {
      this.editingContent = null;
      this.editingId = 0;
    },
    /* Call /info PUT request and reset the temporary values for editing */
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
  <el-table
    row-key="id"
    :data="contents"
    :expand-row-keys="[1]"
    border
    class="table"
  >
    <!-- Column which is expandable -->
    <el-table-column type="expand">
      <template #default="props">
        <div class="table-expand-contents">
          <!-- Hide "Edit" button if it is editing -->
          <el-button
            v-if="!isEditing(props.row.id)"
            :disabled="editingId !== 0"
            class="control-button"
            type="primary"
            :onclick="() => changeToEditing(props.row.id)"
          >
            Edit
          </el-button>
          <!-- Switch each element of content <p>,<ul><li> to <el-input> if it is editing -->
          <div class="editable-contents">
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
          <!-- Show "Cancel" and "Save" buttons if it is editing-->
          <div v-if="isEditing(props.row.id)" class="control-button">
            <el-button :onclick="cancel"> Cancel </el-button>
            <el-button
              v-if="isEditing(props.row.id)"
              type="primary"
              :onclick="submit"
            >
              Save
            </el-button>
          </div>
        </div>
      </template>
    </el-table-column>
    <!-- Columns which are always shown -->
    <el-table-column prop="img" width="70">
      <template #default="scope">
        <img :src="`/assets/icons/${scope.row.img}`" width="40" />
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="name" width="110" />
    <el-table-column label="Year" prop="year" width="70" />
    <el-table-column label="Inventor" prop="inventor" />
  </el-table>
</template>

<style scoped>
.table {
  border-radius: 5px;
  margin: 50px 0;
  max-width: 95vw;
}

.table-expand-contents {
  padding: 10px 30px;
}

.control-button {
  float: right;
  margin-bottom: 20px;
}

.editable-contents {
  margin: 20px 0;
}

.pros-cons {
  margin-left: 20px;
}

h3 {
  margin-top: 30px;
}
</style>
