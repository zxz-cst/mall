<template>
    <div>
        <el-container>
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <el-container>
                <el-header style="padding : 0">
                    <Head></Head>
                </el-header>
                 <Tag />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import Head from '../components/Head.vue'
import  Aside from '../components/Aside.vue'
import  Tag from '../components/Tag.vue'
export default {
    data() {
        return {}
    },
    components: {
        Head,
        Aside,
        Tag
    }
}

</script>

<style lang="less" scoped>

</style>