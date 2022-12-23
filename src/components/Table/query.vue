<template>
  <ul class="btn-edit" v-bind:class="{fl: isFl}">
    <li class="">
      <el-form :inline="true" class="demo-form-inline" :model="query_form" id="#form">
        <template v-for="(_,name) in query_form"
                  v-if="typeof(column_info_dict[name])!=='undefined' && column_info_dict[name].search == true">
          <el-form-item :label="column_info_dict[name].label"
                        v-if="column_info_dict[name].type=='input' || !column_info_dict[name].type">
            <el-input @keyup.enter.native="query" v-model="query_form[name]"
                      :placeholder="column_info_dict[name].query_placeholder"></el-input>
          </el-form-item>
          <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='select'"
                        style="width:auto">
            <el-select :placeholder="column_info_dict[name].query_placeholder" v-model="query_form[name]"
                       @change="option_change" filterable clearable>
              <el-option
                v-for="item in column_info_dict[name].options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='date'">
            <el-date-picker
              v-model="query_form[name]"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='datetimerange'">
            <el-date-picker
              v-model="query_form[name]"
              type="datetimerange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions1"
              value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='daterange'">
            <el-date-picker
              unlink-panels
              v-model="query_form[name]"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '00:00:00']"
              value-format="yyyy-MM-dd hh:mm:ss">
            </el-date-picker>
          </el-form-item>
        </template>

      </el-form>
    </li>
  </ul>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'query_options',
    props: {
      'columns': {
        type: Array,
        default: function () {
          return []
        }
      },
      'filter': {
        type: Object,
        default: function () {
          return {}
        }
      },
      'query_form': {
        type: Object,
        default: function () {
          return {}
        }
      },
      'column_info_dict': {
        type: Object,
        default: function () {
          return {}
        }
      },
      'isFl': {
        type: Boolean,
        default: function () {
          return true
        }
      },
    },
    methods: {
      option_change() {
        this.$emit("query_select_option_change", this.query_form)
        this.query()
      },
      query() {
        this.filter.offset = 1
        this.$emit("query-event")
      }
    },
    data: function() {
      return {
        pickerOptions1: {
          shortcuts: [
            {
              text: '最近一天',
              onClick(picker) {
                const end = new Date(new Date(new Date().toLocaleDateString()).getTime());
                const start = new Date(new Date(new Date().toLocaleDateString()).getTime());
                start.setTime(start.getTime() - 3600 * 1000 * 24 - 1);
                end.setTime(end.getTime() - 1 + 3600 * 1000 * 12);
                picker.$emit('pick', [start, end]);
              }
            }
            ]
        },
        pickerOptions2: {
          shortcuts: [
            {
              text: '最近一天',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
        }
      }
    }
  }
</script>

