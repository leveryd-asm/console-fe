<template>
  <div id="cute_table">
    <section class="main-content-wrapper wrapper">
      <section id="main-content">
        <div class="row">
          <div class="col-md-12">
            <!-- 查询 -->
            <query_page :isFl="isFl" @query-event="my_query" @query_select_option_change="query_select_option_change"
                        :columns="columns" :filter="filter" :query_form="query_form"
                        :column_info_dict="column_info_dict"
                        v-if="query_flag"></query_page>
            <!-- 操作 -->
            <ul class="btn-edit">
              <li>
                <el-button type="danger" class="danger" icon="el-icon-search" @click="my_query" v-if="query_flag">查询
                </el-button>
                <el-button type="info" class="info" icon="back" @click="reset" v-if="query_flag">重置</el-button>

                <el-button type="primary" @click="$refs.create.createDialog()" v-if="create_flag">新增</el-button>
                <el-button type="primary" @click="export_xls()" v-if="export_xls_flag">导出</el-button>
                <el-button type="primary" icon="delete" :disabled="selected.length==0" @click="batch_delete()"
                           v-if="batch_delete_flag">批量删除
                </el-button>
                <el-button type="primary" icon="delete" @click="batch_delete_by_query_options()"
                           v-if="batch_delete_by_query_options_flag">删除所有
                </el-button>

                <slot v-bind:selected="selected" name="custom_multi_operation"></slot>

              </li>
            </ul>
            <!-- 数据列表-->
            <el-table :data="rows_list"
                      border
                      v-loading="loading"
                      element-loading-text="拼命加载中..."
                      style="width: 100%"
                      @sort-change="tableSortChange"
                      @selection-change="tableSelectionChange">
              <el-table-column type="selection"
                               width="60">
              </el-table-column>
              <template v-for="col in columns">
                <el-table-column :sortable="col.sortable" :label="col.label" :width="col.width" :prop="col.name"
                                 :fixed="col.fixed" v-if="col.view">
                  <template slot-scope="scope">
                    <slot v-bind:row="scope.row" v-bind:col="col" name="custom_template"
                          v-if="col['custom_template']"></slot>
                    <span v-else-if="col['inline-template']" v-html="scope.row[col.name]"></span>
                    <span v-else-if="typeof(col['render'])==='function'" v-html="col['render'](scope.row)"></span>
                    <template v-else>{{scope.row[col.name]}}</template>
                  </template>
                </el-table-column>
              </template>
              <el-table-column fixed="right" label="操作" v-if="edit_delete_tag" :width="op_width">
                <template slot-scope="scope">
                  <slot v-bind:row="scope.row" name="custom_operation">

                  </slot>
                  <div v-if="scope.row.enable || typeof(scope.row.enable) === 'undefined'">
                    <el-button @click="$refs.update.setCurrent(scope.row)" type="text" size="small" v-if="update_flag">
                      修改
                    </el-button>
                    <el-button @click="deleteOneRow(scope.row)" type="text" size="small" v-if="delete_flag">删除
                    </el-button>
                  </div>
                  <div v-else>
                    已删除
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!--分页begin-->
            <pagination :total_rows="total_rows" v-bind:filter="filter" @get-event="get"></pagination>
            <!--分页end-->
          </div>
        </div>
      </section>
    </section>
    <update ref="update" :columns="columns" :update_api_endpoint="update_api_endpoint"
            @update_select_option_change="update_select_option_change" @get-event="get" v-if="update_flag"></update>
    <create ref="create" :columns="columns" :add_api_endpoint="add_api_endpoint" @get-event="get"
            @create_select_option_change="create_select_option_change" v-if="create_flag"></create>
  </div>
</template>
<script>
  /* eslint-disable */
  import Crud from '../../components/Table/mixin/crud'
  import pagination from '@/components/Table/pagination.vue'
  import query_page from '@/components/Table/query.vue'
  import update from '@/components/Table/update.vue'
  import create from '@/components/Table/create.vue'

  export default {
    name: 'cute_table',
    mixins: [Crud],
    components: {
      query_page,
      pagination,
      update,
      create
    },
    props: {
      'module_name': '',
      'columns': {
        type: Array,
        default: function () {
          return []
        }
      },
      // 表单增删改查、导出功能控制
      update_flag: {
        default: true
      },
      delete_flag: {
        default: true
      },
      create_flag: {
        default: true
      },
      query_flag: {
        default: true
      },
      batch_delete_flag: {
        default: true
      },
      batch_delete_by_query_options_flag: {
        default: false
      },
      export_xls_flag: {
        default: true
      },
      edit_delete_tag: {
        default: true
      },
      url: {
        default: process.env.SOC_API
      },
      // 操作列表的宽度
      op_width: {
        default: 150
      },
      'isFl': {
        type: Boolean,
        default: function () {
          return true
        }
      }
    },
    methods: {
      query_select_option_change(new_query_form) {
        this.$emit("query_select_option_change", new_query_form)
      },
      update_select_option_change(new_update_form) {
        this.$emit("update_select_option_change", new_update_form)
      },
      create_select_option_change(new_create_form) {
        this.$emit("create_select_option_change", new_create_form)
      },
      init_query_form() {
        let temp_query_form = {}
        for (let index in this.columns) {
          let column = this.columns[index]
          if (column.search === true) {
            this.column_info_dict[column.name] = column
            temp_query_form[column.name] = column.val
          }
        }
        this.query_form = temp_query_form
      },
      my_query() {
        this.filter.offset = 1
        this.query(this.query_form)
      },
      reset() {
        for (let i in this.query_form) {
          this.query_form[i] = ''
        }

        /*
        // 非官方文档用法,清除搜索框
        for (let i in this.$refs.my_input) {
          this.$refs.my_input[i].setCurrentValue()
        }*/
        this.reset_query()
      }
    },
    created() {
      this.init_query_form()
    }
  }
</script>
