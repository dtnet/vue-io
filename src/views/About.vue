<template>
  <el-table
      :data="items"
      style="width: 100%">
    <el-table-column
        prop="id"
        label="日期"
        width="240">
    </el-table-column>
    <el-table-column
        prop="testinc"
        label="姓名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="updatedAt"
        label="地址">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
        <el-button
            size="mini"
            type="primary"
            @click="handleAdd(scope.$index, scope.row)">加
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ data
  data() {
    return {
      // items: []
    }
  },
  computed: {
    ...mapGetters({
      items:'out_job/items'
    })
  },
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ data

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ method
  methods: {

    handleDelete(index, data) {
     this.$store.dispatch('out_job/delItem',data.id)
    },
    handleEdit(index, item) {

      this.$store.dispatch('out_job/updateItem',{id:item.id,testinc:15})
    },
    handleAdd(){
      this.$store.dispatch('out_job/addItem',{testinc:15})
    }
  },
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ method

  // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ life
  created() {
    this.$store.dispatch('out_job/pullItems')
  }
  // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ life
}
</script>

<style scoped>

</style>
