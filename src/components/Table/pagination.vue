<template>
  <!--分页begin-->
  <el-pagination class="tc mg"
                 :current-page="filter.offset"
                 :page-sizes="[10, 20, 50, 100, 200, 500]"
                 :page-size="filter.limit"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="total_rows"
                 @size-change="pageSizeChange"
                 @current-change="pageCurrentChange">
  </el-pagination>
  <!--分页end-->
</template>
<script>
  /* eslint-disable */
  export default {
    name: 'pagination',
    props: {
      'filter': {
      },
      'total_rows': {
      }
    },
    methods: {
      pageCurrentChange(val) {
        this.filter.offset = val;
        this.$emit('get-event');
      },
      pageSizeChange(val) {
        this.filter.limit = val;
        this.filter.offset = 1;
        this.$emit('get-event');
      }
    }
  }
</script>
