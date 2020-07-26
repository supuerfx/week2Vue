<template>
  <el-container>
    <h1 style="text-align: center">员工管理系统</h1>
    <el-header style="text-align: right; font-size: 12px">
      <el-button @click="handleInsert()">增加员工</el-button>
      <el-button @click="handleSelect()">查询员工</el-button>
    </el-header>
    <el-main>
      <el-table :data="tableData" stripe border>
        <el-table-column prop="staffId" label="staffId" width="400">
        </el-table-column>
        <el-table-column prop="staffName" label="staffName" width="540">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    export default {
      name: "MainPage",
      data() {
        return {
          tableData: [],
          input: ""
        }
      },created(){
        this.$axios.get('http://localhost:8090/staff/getStaffList').then(res=>this.tableData=res.data).catch(function(error){
          console.log(error)
        })},
      methods: {
        handleDelete(row) {
          this.$axios.get('http://localhost:8090/staff/deleteStaffById', {
              params: {
                "staffId": row.staffId
              }
            }
          ).then(res => this.tableData = res.data, this.$message({
            type:'info',
            message:'删除成功'
          })).catch(function (error) {
            console.log(error)
          })
        },
        handleEdit(row) {
          this.$prompt('请输入修改后的员工姓名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$axios.get('http://localhost:8090/staff/updateStaff',{
              params:{
                "staffName":value,
                "staffId":row.staffId
              }
            }).then(res=>this.tableData=res.data,this.$message({
              type:'info',
              message:'修改成功'
            })).catch(function (error) {
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        handleInsert(){
          this.$prompt('请输入新增员工姓名', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$axios.get('http://localhost:8090/staff/saveStaff',{
              params:{
                "staffName":value
              }
            }).then(res=>this.tableData=res.data,this.$message({
              type:'info',
              message:'增加成功'
            })).catch(function (error) {
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        },
        handleSelect(){
          this.$prompt('请输入要查询的员工id', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            this.$axios.get('http://localhost:8090/staff/getStaffById',{
              params:{
                "staffId":value
              }
            }).then(res=>this.$alert(res.data,'查询到的员工为'),{
                confirmButtonText: '确定',
            }).catch(function (error) {
              console.log(error)
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '取消输入'
            });
          });
        }
      }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
</style>
