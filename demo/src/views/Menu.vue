<template>
  <div>
    <div style="margin: 10px 0">
      <el-input style="width: 200px" prefix-icon="el-icon-search" placeholder="请输入名称" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button type="warning" @click="reset">重置</el-button>
    </div>
    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus-outline" style="margin-left: 5px"></i></el-button>
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
              row-key="id"
              @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="path" label="路径"></el-table-column>
      <el-table-column prop="pagePath" label="页面路径"></el-table-column>
      <el-table-column label="图标" align="center">
        <template slot-scope="scope">
          <i :class="scope.row.icon" style="font-size: 20px"></i>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-button type="primary" @click="addChildren(scope.row.id)" v-if="!scope.row.pid && !scope.row.path">新增子菜单<i class="el-icon-edit" style="margin-left: 5px"></i></el-button>
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit" style="margin-left: 5px"></i></el-button>
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

    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%">
      <el-form v-model="form" label-width="80px" size="small">
        <el-form-item label="名称"><el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="路径"><el-input v-model="form.path" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="页面路径"><el-input v-model="form.pagePath" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <template slot-scope="scope">
            <el-select clearable v-model="form.icon" placeholder="请选择" style="width: 100%">
              <el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.value">
                <i :class="item.value"> {{ item.name }} </i>
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="描述"><el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Role",
  data(){
    return {
      tableData: [],
      name: "",
      path: "",
      icon: "",
      description: "",
      dialogFormVisible: false,
      menuDialogVisible: false,
      form: {},
      multipleSelection: [],
      id: "1",
      options: [],
      menuData: [
        {
          id: 1,
          label: '主页',
          children: []
        },
        {
          id: 2,
          label: '系统管理',
          children: [
            {
              id: 3,
              label: '用户管理',
              children: []
            },
            {
              id: 4,
              label: '文件管理',
              children: []
            },
            {
              id: 5,
              label: '角色管理',
              children: []
            },
            {
              id: 6,
              label: '菜单管理',
              children: []
            }]
        }]
    }
  },
  methods: {
    load() {
      this.request.get("/menu",{
        params: {
          name: this.name,
        }
      }).then(res => {
            this.tableData = res.data
          })
    },
    reset() {
      this.name = ""
      this.description = ""
      this.pageNum = 1
      this.pageSize = 10
      this.load()
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum
      this.load()
    },
    handleAdd() {
      this.dialogFormVisible = true
      this.form = {}
    },
    addChildren(pid){
      this.dialogFormVisible = true
      this.form = {}
      if (pid) {
        this.form.pid = pid
      }
    },
    save() {
      this.request.post("/menu",this.form)
          .then(res =>{
            if(res.code === '200'){
              this.$message.success("保存成功")
              this.dialogFormVisible = false
              this.load()
            }else{
              this.$message.error("失败，请重新输入")
            }
          })
    },
    handleEdit(row){
      this.form = row
      this.dialogFormVisible = true

      // 请求图标的数据
      this.request.get("/menu/icons").then(res => {
        this.options = res.data
      })
    },
    handleDelete(id){
      this.request.delete("/menu/"+id,id)
          .then(res =>{
            if(res.code === '200'){
              this.$message.success("删除成功")
              this.load()
            }else{
              this.$message.error("删除失败")
            }
          })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.multipleSelection = val;
    },
    deleteBatch(){
      let ids=this.multipleSelection.map(v => v.id)  // [{},{},{}] => [1,2,3]
      this.request.post("/menu/del/batch",ids)
          .then(res =>{
            if(res.data){
              this.$message.success("删除成功")
              this.load()
            }else{
              this.$message.error("删除失败")
            }
          })
    },
    tableHead() {
      return "background-color: gray;color: black;"
    },
  },
  created() {
    this.load()
  },
}
</script>

<style scoped>

</style>