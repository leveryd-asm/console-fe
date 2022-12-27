<template>
  <cute_table :batch_delete_by_query_options_flag=true :create_flag=false :export_xls_flag=false :module_name="module_name" :columns="columns" ref="cute_table">
    <template slot-scope="scope" slot="custom_multi_operation">
      <el-button type="primary" @click="multi_nodeal(scope.selected)" :disabled="scope.selected.length==0">批量无须处理
      </el-button>
      <el-button type="primary" @click="multi_deal(scope.selected)" :disabled="scope.selected.length==0">批量已处理
      </el-button>
    </template>
  </cute_table>
</template>
<script>
  /* eslint-disable */
  import cute_table from '@/components/Table/table.vue'
  import {bbscan_multinodeal, bbscan_multideal} from '@/api/soc'

  export default {
    name: 'app',
    components: {
      cute_table
    },
    methods: {
      // 批量无须处理
      multi_nodeal(selected) {
        this.$confirm('此操作将更新 ' + selected.length + ' 条记录, 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            let ids = [];
            // 提取选中项的id
            $.each(selected, (i, row) => {
              let number = new Number(row.id)
              ids.push(number.toString());
            });
            // 请求服务端更新
            bbscan_multinodeal(ids)
            //this.$refs.cute_table.reset()
            this.$message.success('批量操作成功！')
            this.$refs.cute_table.my_query()
          })
          .catch(() => {
            this.$message.info('已取消操作!');
          });
      },

      // 批量已处理
      multi_deal(selected) {
        this.$confirm('此操作将更新 ' + selected.length + ' 条记录, 是否继续?', '提示', {type: 'warning'})
          .then(() => {
            let ids = [];
            // 提取选中项的id
            $.each(selected, (i, row) => {
              let number = new Number(row.id)
              ids.push(number.toString());
            });
            // 请求服务端更新
            bbscan_multideal(ids)
            this.$message.success('批量操作成功！')
            //this.$refs.cute_table.reset()
            this.$refs.cute_table.my_query()
          })
          .catch(() => {
            this.$message.info('已取消操作!');
          });
      },
    },
    data: function () {
      return {
        module_name: 'alarm/bbscan',
        columns: [
          {
            'name': 'id',
            'label': 'ID',
            'create': false,
            'update': false,
            'width': '100'
          },
          {
            'name': 'alarminfo',
            'label': '报警内容',
            'inline-template': true,
            'search': true,
            'width': '800'
          },
          {
            'name': 'uploaddate',
            'label': '上传时间',
          },
          {
            'name': 'status',
            'label': '状态',
            'type': 'select',
            'options': [
              {
                "label": "待处理",
                "value": "待处理"
              },
              {
                "label": "无须处理",
                "value": "无须处理"
              },
              {
                "label": "已处理",
                "value": "已处理"
              }
            ],
            'search': true
          }
        ],
      };
    },
  }
</script>
