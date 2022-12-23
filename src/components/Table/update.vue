<template>
  <el-dialog title="修改信息" :visible.sync="dialogUpdateVisible" :close-on-click-modal="true"
             :close-on-press-escape="false">
    <el-form id="#update" label-width="150px" v-model="update_form" label-position="top">
      <template v-for="(_,name) in update_form" v-if="column_info_dict[name].update != false">
        <el-form-item :label="column_info_dict[name].label"
                      v-if="column_info_dict[name].type=='input' || !column_info_dict[name].type">
          <el-input v-model="update_form[name]" :placeholder="column_info_dict[name].placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='select'">
          <el-select class="item" :placeholder="column_info_dict[name].placeholder" v-model="update_form[name]"
                     filterable clearable multiple v-if="column_info_dict[name].multiple" style="width: 100%">
            <el-option
              v-for="item in column_info_dict[name].options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select class="item" :placeholder="column_info_dict[name].placeholder" v-model="update_form[name]"
                     filterable clearable v-else style="width: 100%" @change="option_change">
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
            v-model="update_form[name]"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
      </template>
    </el-form label-position="top">

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogUpdateVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>

  </el-dialog>
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'create_dialog',
    data: function () {
      return {
        'dialogUpdateVisible': false,
        'update_form': {},
        'column_info_dict': {},
        'pickerOptions': {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
      }
    },
    props: {
      'update_api_endpoint': {
        type: Function
      },
      'columns': {
        type: Array,
        default: function () {
          return []
        }
      },
    },
    created() {
      // https://cn.vuejs.org/v2/guide/reactivity.html
      // 后添加的属性不会双向绑定,注意这个特性
      let temp_update_form = {}
      for (let index in this.columns) {
        let column = this.columns[index]
        this.column_info_dict[column.name] = column
        temp_update_form[column.name] = column.val
      }
      /*this.update_form = {
        'id': 1,
        'type': 'x',
      }*/
      this.update_form = temp_update_form
      //this.update_form.id = 1
      //this.update_form.type = 'x'
    },
    methods: {
      option_change() {
        this.$emit("update_select_option_change", this.update_form)
      },
      // 更新接口
      setCurrent(row) {
        for (let key in row) {
          for (let name in this.update_form) {
            if (key === name) {
              this.update_form[name] = row[key]
            }
          }
        }
        for (let index in this.columns) {
          // select multiple组件需要value值,且类型为[].否则组件操作报错
          let column = this.columns[index]
          if (column.type === 'select' && column.multiple === true){
            this.update_form[column.name] = [this.update_form[column.name]]
          }
        }
        this.dialogUpdateVisible = true;
      },
      update() {
        this.updateLoading = true;
        let actions = {
          update: {method: 'post'}
        }
        this.$emit('get-event');
        let resource = this.$resource(this.update_api_endpoint(), {}, actions);
        resource.save(this.update_form)
          .then((response) => {
            this.$message.success('修改成功！');
            this.dialogUpdateVisible = false;
            this.updateLoading = false;
            this.$emit('get-event');
          })
          .catch((response) => {
            let data = response.data;
            if (data instanceof Array) {
              this.$message.error(data[0]["message"]);
            }
            else if (data instanceof Object) {
              this.$message.error(data["message"]);
            }
            this.updateLoading = false;
          });
      },
    },
  }
</script>
