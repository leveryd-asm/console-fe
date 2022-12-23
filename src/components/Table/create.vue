<template>
  <el-dialog title="新增信息" :visible.sync="dialogCreateVisible" :close-on-click-modal="false"
             :close-on-press-escape="false"
             @close="reset">
    <el-form id="#create" label-width="150px" v-model="create_form" ref="create_form">
      <template v-for="(_,name) in create_form" v-if="column_info_dict[name].create != false">
        <el-form-item :label="column_info_dict[name].label"
                      v-if="column_info_dict[name].type=='input' || !column_info_dict[name].type">
          <el-input v-model="create_form[name]" :placeholder="column_info_dict[name].create_placeholder"></el-input>
        </el-form-item>
        <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='select'" style="width:100%">
          <el-select :placeholder="column_info_dict[name].create_placeholder" v-model="create_form[name]" filterable clearable multiple v-if="column_info_dict[name].multiple" style="width:100%">
            <el-option
              v-for="item in column_info_dict[name].options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select :placeholder="column_info_dict[name].create_placeholder" v-model="create_form[name]" filterable clearable v-else style="width:100%" @change="option_change">
            <el-option
              v-for="item in column_info_dict[name].options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select style="width:100%">
        </el-form-item>
        <el-form-item :label="column_info_dict[name].label" v-if="column_info_dict[name].type=='date'">
          <el-date-picker
            v-model="create_form[name]"
            type="datetime"
            placeholder="选择日期时间"
            align="right"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCreateVisible = false">取 消</el-button>
      <el-button type="primary" :loading="createLoading" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  /* eslint-disable */

  export default {
    name: 'create_dialog',
    data: function () {
      return {
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
        'dialogCreateVisible': false,
        'createLoading': false,
        'rules': {
          task_name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ]
        },
        'create_form': {},
        'column_info_dict': {}
      }
    },
    props: {
      'add_api_endpoint': {
        type: Function
      },
      'columns': {
        default: function () {
          return []
        }
      },
    },
    created() {
      this.init_create_form()
    },
    methods: {
      option_change() {
        this.$emit("create_select_option_change", this.create_form)
      },
      // 重置表单
      reset() {
        this.init_create_form()
        // 官方的方法不起作用
        // this.$refs.create_form.resetFields()
      },
      createDialog() {
        this.dialogCreateVisible = true;
      },
      // 添加接口
      add() {
        // 主动校验
        this.createLoading = true;
        let resource = this.$resource(this.add_api_endpoint());
        resource.save(this.create_form)
          .then((response) => {
            this.$message.success('添加成功！');
            this.dialogCreateVisible = false;
            this.createLoading = false;
            this.reset();
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
            this.createLoading = false;
          });
      },
      init_create_form() {
        let temp_create_form = {}
        for (let index in this.columns) {
          let column = this.columns[index]
          if (column.create !== false){
            this.column_info_dict[column.name] = column
            temp_create_form[column.name] = column.val
          }
        }
        this.create_form = temp_create_form
      }
    },
  }
</script>
