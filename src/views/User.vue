<template>
    <div class="manage">
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%"
            :before-close="handleClose"
            > 
            <!-- 用户的表单信息 -->
            <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="80px">
                <el-form-item label="姓名" prop="name"> 
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="花费(精粹)" prop="age">
                    <el-input placeholder="请输入花费" v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="form.sex" placeholder="请选择">  
                        <!-- v-model获取的是value值 -->
                        <el-option label="男" :value="1"></el-option>
                        <el-option label="女" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="出生日期" prop="birth">
                    <el-date-picker
                    v-model="form.birth"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-DD">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button @click="handelAdd" type="primary">
                + 新增
            </el-button>
             <!-- form搜索区域 -->
             <el-form :inline="true" :v-model="userForm">
                <el-form-item >
                    <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>

             </el-form>
        </div>
        <div class="common-table">
            <el-table
                stripe
                :data="tableData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                height= 90%>
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span >{{ scope.row.sex == 1 ? '男' :'女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    sortable
                    prop="age"
                    label="花费(精粹)">
                </el-table-column>
                <el-table-column
                    sortable
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page">
                <el-pagination
                    layout="prev, pager, next"
                    :total="total"
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </div>  
    </div>
</template>

<script>
import { getUser,addUser,editUser,delUser } from '../api'
export default {
    data() {  // data不是对象而是函数的好处：每个实例可以维护一份被返回对象的独立的拷贝，如果 data 是一个对象则会影响到其他实例
        
        return {
            dialogVisible:false,
            form:{
                name:'',
                age:'',
                sex:'',
                birth:'',
                addr:''
            },
            rules: {
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            
            age: [
                { required: true, message: '请输入花费', trigger: 'blur' },
            ],
            sex: [
                { required: true, message: '请选择性别', trigger: 'blur' },
            ],
            birth: [
                { required: true, message: '请选择出生日期', trigger: 'blur' },
            ],
            addr: [
                { required: true, message: '请填写地址', trigger: 'blur' },
            ],
            },
            tableData: [],
            modalType: 0,
            total:0,
            pageData: {
                page:1,
                limit: 10
            },
            userForm: {
                name:''
            }
    }
    },
    methods: {
        submit() {
            this.$refs.form.validate((vaild) => {
                if(vaild) {
                    if(this.modalType === 0) {
                        addUser(this.form).then(() => {
                            this.getList()
                        })
                    } 
                    else {
                        editUser(this.form).then(() => {
                            this.getList()
                        }) 
                    }
                    this.$refs.form.resetFields()
                    this.dialogVisible = false
                }
                
            })
        },
        handleClose() {
            this.$refs.form.resetFields()
            this.dialogVisible = false;
        },
        cancel() {
            this.handleClose()
        },
        handleEdit(row) {
            this.dialogVisible = true;
            this.modalType = 1;
            
            // 需要对当前数据进行深拷贝，否则会出错
            this.form = JSON.parse(JSON.stringify(row))
        },
        handleDelete(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => { // 点击确认
                    delUser({id : row.id}).then(() => { 
                        this.getList()
                    }),
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => { // 点击取消
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
                },
        getList() {
            getUser({params:{...this.userForm,...this.pageData}}).then(({data}) => {
            this.tableData = data.list
            this.total = data.count || 0

        })
        },
        handelAdd() {
            this.dialogVisible = true;
            this.modalType = 0;
        },
        // 选择页码的回调函数
        handlePage(val) {
            this.pageData.page = val
            this.getList()
        },
        // 列表查询
        onSubmit() {
            this.getList()
        }
    },
    mounted () { // 首次进入界面调用
        this.getList()
    }
   
}
</script>

<style lang="less" scoped>
.manage {
    height: 90vh;
    .manage-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table {
        position: relative;
        height: calc(100% - 62px);  // 动态计算高度
        .page {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}

</style>