<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" prefix-icon="el-icon-search" placeholder="请输入名称" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-upload action="http://localhost:8888/file/upload" :show-file-list="false" :on-success-="handleFileUploadSuccess"  style="display: inline-block">
      <el-button type="primary">上传文件<i class="el-icon-upload" style="margin-left: 5px"></i></el-button>
      </el-upload>
      <el-popconfirm
          confirm-button-text='好的'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="确定删除吗？"
          @confirm="deleteBatch"
          class="ml-5"
      >
        <el-button type="danger" slot="reference">批量删除<i class="el-icon-remove-outline" style="margin-left: 5px"></i></el-button>
      </el-popconfirm>
    </div>
    <el-table :data="tableData"
              border
              max-height="480px"
              stripe
              :header-cell-style="tableHead"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="140"></el-table-column>
      <el-table-column prop="name" label="文件名称" width="140"></el-table-column>
      <el-table-column prop="type" label="文件类型" width="120"></el-table-column>
      <el-table-column prop="size" label="文件大小（kb）"></el-table-column>
      <el-table-column label="下载">
        <template slot-scope="scope">
          <el-button type="primary" @click="download(scope.row.url)">下载</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="enable" label="启用">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.enable" active-color="#13ce66" inactive-color="#ccc" @change="changeEnable(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-popconfirm
              confirm-button-text='好的'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
              @confirm="handleDelete(scope.row.id)"
          >
            <el-button type="danger" slot="reference" class="ml-5">删除<i class="el-icon-remove-outline" style="margin-left: 5px"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "File",
  data() {
    return {
      tableData: [],
      name:'',
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  created() {
    this.load()
  },
  methods: {
    load() {
      this.request.get("file/page",{
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          username: this.username,
          phone: this.phone,
          address: this.address
        }
      }).then(res => {
            this.total = res.data.total
            this.tableData = res.data.records
          })
    },
    reset() {
      this.name = ""
    },
    handleDelete(id){
      this.request.delete("/file/"+id,id)
          .then(res =>{
            if(res.code === '200'){
              this.$message.success("删除成功")
              this.load()
            }else{
              this.$message.error("删除失败")
            }
          })
    },
    deleteBatch(){
      let ids=this.multipleSelection.map(v => v.id)  // [{},{},{}] => [1,2,3]
      this.request.post("/file/del/batch",ids)
          .then(res =>{
            if(res.code === '200'){
              this.$message.success("删除成功")
              this.load()
            }else{
              this.$message.error("删除失败")
            }
          })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },
    handleEdit(row){
      this.form = row
      this.dialogFormVisible = true
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    tableHead() {
      return "background-color: gray;color: black;"
    },
    handleFileUploadSuccess(){
      this.$message.success("上传成功")
      this.load()
    },
    download(url){
      window.open(url)
    },
    changeEnable(row){
      this.request.post("/file/update", row).then(res => {
        if(res.code === '200'){
          this.$message.success("操作成功")
        }
      })
    },
  }
}
</script>

<style scoped>

</style>