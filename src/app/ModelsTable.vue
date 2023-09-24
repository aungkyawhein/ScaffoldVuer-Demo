<template>
  <div>
    <el-row :gutter="10" :type="'flex'" :align="'middle'">
      <el-col>
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>
      <el-col>
        <el-checkbox v-model="hideNote">
          Hide Note
        </el-checkbox>
      </el-col>
    </el-row>
    <el-table
      :data="tableData.filter(
        data => !search ||
          data.Organ.toLowerCase().includes(search.toLowerCase()) ||
          data.Species.toLowerCase().includes(search.toLowerCase()) ||
          data.Note.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%;"
      max-height="600"
    >
      <el-table-column
        prop="Organ"
        label="Organ"
        width="100"
        sortable
      />
      <el-table-column
        prop="Species"
        label="Species"
        width="100"
        sortable
      />
      <el-table-column
        prop="Note"
        label="Note"
        width="200"
        v-if="!hideNote"
      />
      <el-table-column
        prop="Last modified"
        label="Last modified"
        width="250"
        sortable
        :sort-method="sortByModifiedDate"
      />
      <el-table-column
        fixed="right"
        label="Action"
        width="300"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleView(scope.row)"
          >
            View
          </el-button>
          <el-button
            v-if="scope.row.Discover !== 'Not even'"
            size="mini"
            @click="handleDiscover(scope.row)"
          >
            Discover
          </el-button>
          <el-button
            v-if="scope.row['Blackfynn dataset'] !== '/'"
            size="mini"
            @click="handleBlackfynn(scope.row)"
          >
            Blackfynn
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
/* eslint-disable no-alert, no-console */
import { Button, Input, Table, TableColumn } from "element-ui";
import locale from "element-ui/lib/locale";
import lang from "element-ui/lib/locale/lang/en";
import Vue from "vue";
import models from './ModelsInformation';

locale.use(lang);
Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);


export default {
  name: "ModelsTable",
  mixins: [models],
  data() {
    return {
      search: '',
      hideNote: false,
    }
  },
  created: function() {
    this.getModelsInformation();
  },
  methods: {
    handleView: function(row) {
      this.$emit("viewModelClicked", row.Location);
    },
    handleDiscover: function(row) {
      window.open(row.Discover, "_blank");
    },
    handleBlackfynn: function(row) {
      window.open(row['Blackfynn dataset'], "_blank");
    },
    sortByModifiedDate: function(a, b) {
      const lastModified = 'Last modified';
      const dateA = new Date(a[lastModified]);
      const dateB = new Date(b[lastModified]);

      return dateA - dateB;
    },
  }
};
</script>

<style scoped lang="scss">
@import "~element-ui/packages/theme-chalk/src/input";
@import "~element-ui/packages/theme-chalk/src/table";
@import "~element-ui/packages/theme-chalk/src/table-column";
</style>
