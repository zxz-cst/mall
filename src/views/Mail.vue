<template>
    <div>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <!-- 用户的表单信息 -->
            <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="150px" >
                <el-form-item label="添加活动名称" prop="name">
                    <el-select v-model="form.name"   placeholder="请选择">  
                        <!-- v-model获取的是value值 -->
                        <el-option v-for="item of allData" :key="item.src" :label="item.name" :value="item.name" ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="提示"
            :visible.sync="dialogVisible2"
            width="30%"
            :before-close="handleClose2">
            <!-- 用户的表单信息 -->
            <el-form ref="form2" :inline="true" :rules="rules2" :model="form2" label-width="200px">
                <el-form-item label="请选择要删除的活动：" prop="name">
                    <el-checkbox-group v-model="form2.name">
                        <el-checkbox v-for="item of hrData" :key="item.name" :label="item.name" :value="item.name" :name="item.name"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel2">取 消</el-button>
                <el-button type="primary" @click="submit2">确 定</el-button>
            </span>
        </el-dialog>
        <div class="box-top"  >
            <div class="ip-op" >
                <el-button v-if="canChange()" @click="handleInput" type="primary" >
                    + 新增
                </el-button>
                <el-button v-if="canChange()" @click="handleOutput" type="primary" >
                    - 删除
                </el-button>
            </div>
            <div class="allPS">
                <span>{{ "总计 "+allNum+" 件"+" 共花费 "+totalPrice+" 精粹  " }}</span>
                <el-button type="primary">确认<i class="el-icon-check el-icon--right"></i></el-button>
            </div>
        </div>
        <el-row>
            <el-col :span="6" v-for="item in hrData" :key="item.name" >
                <el-card :body-style="{ padding: '0px' }">
                    <div class="card-top">
                        <a :href="item.url" target="_blank"  ><img :src="item.src" class="image" /></a>
                        <div class="card-name">
                            <p>{{ item.name+" $"+item.price }}</p>
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div class="bottom clearfix">
                        <template>
                            <el-input-number v-model="item.num" @change="handleChange" :min="0" :max="1" label="描述文字"></el-input-number>
                        </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            allNum:0,
            hrData:[],
            allData:[
                {
                    src:require("../assets/hr1.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=1&datatype=5v5',
                    name:'黑暗之女',
                    price:1350,
                    num:0
                },
                {
                    src:require("../assets/hr2.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=2&datatype=5v5',
                    name:'狂战士',
                    price:3150,
                    num:0
                },
                {
                    src:require("../assets/hr3.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=3&datatype=5v5',
                    name:'正义巨像',
                    price:6300,
                    num:0
                },
                {
                    src:require("../assets/hr4.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=4&datatype=5v5',
                    name:'卡牌大师',
                    price:3150,
                    num:0
                },
                {
                    src:require("../assets/hr5.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=5&datatype=5v5',
                    name:'德邦总管',
                    price:3150,
                    num:0
                },
                {
                    src:require("../assets/hr6.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=6&datatype=5v5',
                    name:'无畏战车',
                    price:6300,
                    num:0
                },
                {
                    src:require("../assets/hr7.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=7&datatype=5v5',
                    name:'诡术妖姬',
                    price:6300,
                    num:0
                },
                {
                    src:require("../assets/hr8.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=8&datatype=5v5',
                    name:'猩红收割者',
                    price:3150,
                    num:0
                },
                {
                    src:require("../assets/hr9.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=9&datatype=5v5',
                    name:'远古恐惧',
                    price:1350,
                    num:0
                },
                {
                    src:require("../assets/hr10.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=10&datatype=5v5',
                    name:'正义天使',
                    price:1350,
                    num:0
                },
                {
                    src:require("../assets/hr11.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=11&datatype=5v5',
                    name:'无极剑圣',
                    price:450,
                    num:0
                },
                {
                    src:require("../assets/hr12.webp"),
                    url:'https://101.qq.com/#/hero-detail?heroid=12&datatype=5v5',
                    name:'牛头酋长',
                    price:1350,
                    num:0
                },
               
            ],
            totalPrice : 0,
            form:{
                name:''
            },
            form2:{
                name:[]
            },
            rules: {
            label: [
                { required: true, message: '请选择英雄', trigger: 'blur' },
            ],
            },
            rules2:{
            label: [
                { required: true, message: '请选择英雄', trigger: 'blur' },
            ],
            },
            dialogVisible:false,
            dialogVisible2:false
        }
    },
    methods: {
        handleChange() {
            this.totalPrice = 0;
            this.allNum = 0;
            for(let i=0; i<this.hrData.length; i++) {
                this.allNum += this.hrData[i].num
                this.totalPrice += this.hrData[i].num * this.hrData[i].price;
            }
        },
        handleInput() {
            this.dialogVisible = true;
        },
        submit() {
            this.$refs.form.validate((vaild) => {
                if(vaild) {
                    const index = this.hrData.findIndex(item => item.name === this.form.name);
                    const id = this.allData.findIndex(item => item.name === this.form.name);
                    if(index === -1) {
                      this.$store.commit('setHr',this.allData[id]) 
                      this.hrData = this.$store.state.tab.hrData;
                    }
                    this.cancel()
                }
            })
        },
        cancel() {
            this.$refs.form.resetFields()
            this.dialogVisible = false;
        },
        handleOutput() {
            this.dialogVisible2 = true;
        },
        cancel2() {
            this.$refs.form2.resetFields()
            this.dialogVisible2 = false;
        },
        submit2() {
            this.$refs.form2.validate((vaild) => {
                if(vaild) {
                    for(let i=0; i<this.form2.name.length; i++) {
                        let index = this.hrData.findIndex(val => this.form2.name[i] === val.name);
                        console.log(index)
                        this.$store.commit('delHr',index) 
                        this.hrData = this.$store.state.tab.hrData;
                    }
                    this.cancel2()
                }
            })
        },
        handleClose() {
            this.cancel();
        },
        handleClose2() {
            this.cancel2();
        },
        canChange() {
            return (Cookie.get('change')==='false') ? false : true;
        }
    },
    mounted() {
        this.hrData = this.$store.state.tab.hrData;
    }
}

</script>

<style lang="less" scoped>
    .box-top {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .el-card {
        text-align: center;
        margin: 20px;
        height: 450px;
        .card-top {
            height: 390px;
            position: relative;
            .card-name {
                width: 100%;
                height: 40px;                
                background: #000;
                color: white;
                position: absolute;
                bottom: 0;
                p {
                    margin-top: 10px;
                }
            }
            img {
                width: 100%;
                // height: 100%;
            }
        }
    .card-bottom {
        margin-top: 10px;
    }
}
</style>