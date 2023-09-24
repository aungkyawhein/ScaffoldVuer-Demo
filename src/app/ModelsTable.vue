<template>
  <div>
    <el-row :gutter="10" :type="'flex'" :align="'middle'">
      <el-col :span="14">
        <el-input
          v-model="search"
          size="mini"
          placeholder="Type to search"
        />
      </el-col>
      <el-col :span="5">
        <el-checkbox
          v-model="hideNote"
        >
          Hide Note
        </el-checkbox>
      </el-col>
      <el-col :span="5">
        <el-button
          size="mini"
          @click="downloadData"
        >
          Download Data
        </el-button>
      </el-col>
    </el-row>
    <el-table
      :data="modifiedTableData"
      style="width: 100%;"
      @sort-change="updateSortData"
      max-height="600"
    >
      <el-table-column
        prop="Organ"
        label="Organ"
        width="100"
        sortable="custom"
      />
      <el-table-column
        prop="Species"
        label="Species"
        width="100"
        sortable="custom"
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
        sortable="custom"
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
      sortKey: '',
      sortOrder: '',
    }
  },
  created: function() {
    this.getModelsInformation();
  },
  computed: {
    modifiedTableData() {
      return this.tableData
        .filter(this.searchFilter)
        .sort(this.sortData)
        .map(this.noteFilter);
    }
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
    searchFilter: function(data) {
      return !this.search ||
        data.Organ.toLowerCase().includes(this.search.toLowerCase()) ||
        data.Species.toLowerCase().includes(this.search.toLowerCase()) ||
        data.Note.toLowerCase().includes(this.search.toLowerCase());
    },
    sortData: function(a, b) {
      if (this.sortOrder) {
        const sortKey = this.sortKey;
        const sortOrder = this.sortOrder === 'ascending' ? 1 : -1;
        const lastModified = 'Last modified';
        const isLastModifiedKey = sortKey === lastModified;
        const sortA = isLastModifiedKey ? new Date(a[lastModified]) : a[sortKey];
        const sortB = isLastModifiedKey ? new Date(b[lastModified]) : b[sortKey];

        return sortOrder * (sortA < sortB ? -1 : 1);
      }

      return 0;
    },
    updateSortData: function(sortObj) {
      this.sortKey = sortObj.prop;
      this.sortOrder = sortObj.order;
    },
    noteFilter: function(data) {
      const filteredData = {...data};
      if (this.hideNote) {
        delete filteredData.Note;
      }
      return filteredData;
    },
    downloadData: function() {
      const modifiedTableDataString = JSON.stringify(this.modifiedTableData);
      const blob = new Blob([modifiedTableDataString], {
        type: 'application/json'
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Models_table_data.json';
      a.click();
      window.URL.revokeObjectURL(url);
    },
  }
};
</script>

<style scoped lang="scss">
@import "~element-ui/packages/theme-chalk/src/input";
@import "~element-ui/packages/theme-chalk/src/table";
@import "~element-ui/packages/theme-chalk/src/table-column";
</style>
