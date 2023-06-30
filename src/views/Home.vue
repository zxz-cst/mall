<template>
    
    <div>
        <el-card class="box-card" style="margin-top: 0;">

            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                <!-- 用户的表单信息 -->
                <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="150px" >
                    <el-form-item label="添加活动名称" prop="label">
                        <el-select v-model="form.label"   placeholder="请选择">  
                            <!-- v-model获取的是value值 -->
                            <el-option v-for="item of imgAll" :key="item.src" :label="item.label" :value="item.label" ></el-option>
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
                    <el-form-item label="请选择要删除的活动：" prop="label">
                        <el-checkbox-group v-model="form2.label">
                            <el-checkbox v-for="item of imgData" :key="item.url" :label="item.label" :value="item.label" :name="item.label"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="cancel2">取 消</el-button>
                    <el-button type="primary" @click="submit2">确 定</el-button>
                </span>
            </el-dialog>

            <div class="top-button" v-if="canChange">
                <el-button @click="handleInput" type="primary">
                    + 新增
                </el-button>
                <el-button @click="handleOutput" type="primary">
                    - 删除
                </el-button>
            </div>

            <div class="top-box">
                <template>
                    <el-carousel :interval="5000" arrow="always" type="card" >
                        <el-carousel-item v-for="item in imgData" :key="item.label" :label="item.label">
                        <a :href="item.url" target="_blank"> <img  :src="item.src" /></a>
                        </el-carousel-item>
                    </el-carousel>
                </template>
            </div>
        
        </el-card>
        
        <el-row >
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-card class="box-card">
                        <el-table
                            stripe
                            :data="tableData"
                            height= '650px'
                            style="width: 100%;"
                            >
                            <el-table-column 
                                v-for="(value,key) in tablelabel"
                                :prop="key"
                                :label="value"
                                height="100px"
                                >
                            </el-table-column>
                        </el-table>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="16">
                <div class="grid-content bg-purple-light">
                        <el-card class="box-card">
                        <div ref="echarts1" style="height: 300px;"></div>  
                        </el-card>
                    <div class="charts">
                        <el-card class="box-card">
                        <div ref="echarts2" style="height: 270px;"></div>  
                        </el-card>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>


<script>
import { getData } from '../api/index'
import * as echarts from 'echarts'
import Cookie from 'js-cookie'
export default {
    data() {
        return {
            tableData:[],
            tablelabel: {
                name : '游戏名称',
                todayBuy : '今日购买',
                monthBuy : '本月购买',
                totalBuy : '总购买',
            },
            imgData:[],
            imgAll:[
            {
                    label:'魔王宝藏',
                    src:require("../assets/img1.jpeg"),
                    url:'https://lol.qq.com/act/a20230615teemolottery/stone.html?e_code=500130&exchangeType=1'
                },
                {
                    label:'山海绘卷',
                    src:require("../assets/img2.jpeg"),
                    url:'https://lol.qq.com/act/a20230519shanhaiscroll/?e_code=500131'
                },
                {
                    label:'山海宝箱',
                    src:require("../assets/img3.jpeg"),
                    url:'https://lol.qq.com/act/a20230616shanhaichests/index.html?e_code=500132'
                },
                {
                    label:'剑灵夺宝',
                    src:require("../assets/img4.jpeg"),
                    url:'https://lol.qq.com/act/a20230619treasure/index.html?e_code=500133'
                },
                {
                    label:'星之守护者主题产品',
                    src:require("../assets/img5.jpeg"),
                    url:'https://lolriotmall.qq.com/list.shtml?ADTAG=lolriotmall.pc.lolgw.ad&e_code=500134&tagid=631'
                },
                {
                    label:'东方来客',
                    src:require("../assets/img6.webp"),
                    url:'https://pvp.qq.com/cp/a20230406ztz/'
                },
                {
                    label:'开航',
                    src:require("../assets/img7.webp"),
                    url:'https://pvp.qq.com/cp/a20221226ztz/'
                },
                {
                    label:'幻海映月',
                    src:require("../assets/img8.webp"),
                    url:'https://pvp.qq.com/cp/a20220914sfqsp/'
                },
                {
                    label:'沙海飞舟',
                    src:require("../assets/img9.webp"),
                    url:'https://pvp.qq.com/cp/a20220530bbztz/'
                },
               
                {
                    label:'玉城之子',
                    src:require("../assets/img10.webp"),
                    url:'https://pvp.qq.com/cp/a20211202yczzp/'
                },
            ],
            form:{
                label:''
            },
            form2:{
                label:[]
            },
            rules: {
            label: [
                { required: true, message: '请选择活动', trigger: 'blur' },
            ],
            },
            rules2:{
            label: [
                { required: true, message: '请选择活动', trigger: 'blur' },
            ],
            },
            dialogVisible:false,
            dialogVisible2:false,
            canChange:true
        }
    },
    methods: {
        handleInput() {
            this.dialogVisible = true;
        },
        submit() {
            this.$refs.form.validate((vaild) => {
                if(vaild) {
                    const index = this.imgData.findIndex(item => item.label === this.form.label);
                    const id = this.imgAll.findIndex(item => item.label === this.form.label); 
                    if(index === -1) {
                        this.$store.commit('setImg',this.imgAll[id]);
                        this.imgData =  this.$store.state.tab.imgData;
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
                    for(let i=0; i<this.form2.label.length; i++) {
                        let index = this.imgData.findIndex(val => this.form2.label[i] === val.label);
                        this.$store.commit('delImg',index);
                        this.imgData =  this.$store.state.tab.imgData;
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
    },
    mounted() {
        getData().then(({ data }) => {  
            const { tableData } = data.data;
            this.tableData = tableData;

            const echarts1 = echarts.init(this.$refs.echarts1);
            const { orderData , userData } = data.data
            const xAxis = Object.keys(orderData.data[0])
            const echartsOption1 = {}
            const xAxisData = {
                data:xAxis
            }
            echartsOption1.title={text:'平均销售量'}
            echartsOption1.tooltip={trigger:'axis'}
            echartsOption1.xAxis = xAxisData
            echartsOption1.yAxis = {}
            echartsOption1.legend = xAxisData
            echartsOption1.series =[]
            echartsOption1.color = ['#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4']
            xAxis.forEach(key => {
                echartsOption1.series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: 'line'
            })
            })
            echarts1.setOption(echartsOption1);

            const echarts2 = echarts.init(this.$refs.echarts2);
            var echarts2Option = {
                        legend: {
                    // 图例文字颜色
                    textStyle: {
                    color: "#333",
                    },
                        },
                        grid: {
                            left: "20%",
                        },
                        // 提示框
                        tooltip: {
                            trigger: "axis",
                        },
                        xAxis: {
                            type: "category", // 类目轴
                            data: userData.map(item => item.date),
                            axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                            },
                            axisLabel: {
                            interval: 0,
                            color: "#333",
                            },
                        },
                        yAxis: [
                            {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                color: '#fc8452',
                                },
                            },
                            },
                        ],
                        color: ['#73c0de','#fac858' ],
                        series: [
                            {
                                name:'新增用户',
                                data:userData.map(item => item.new),
                                type:'bar'
                            },
                            {
                                name:'活跃用户',
                                data:userData.map(item => item.active),
                                type:'bar'
                            },
                        ],
                     };

            // 使用刚指定的配置项和数据显示图表。
            echarts2.setOption(echarts2Option);
        })
        this.canChange  = (Cookie.get('change')==='false') ? false : true;
        this.imgData =  this.$store.state.tab.imgData; 
    },
}

</script>

<style lang="less" scoped>
    .box-card {
        margin: 20px;
    }
    .top-box {
        width: 100%;
        text-align: center;
        
        img {
            width: 100%;
            height: 100%;
        }
      
    }
    .charts {
        display: flex;
        justify-content: space-between;
        .el-card {
            width: 100%;
        }
    }
</style>