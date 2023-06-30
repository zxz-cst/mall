<template>
    <el-menu 
    default-active="1-4-1"
    class="el-menu-vertical-demo" 
    :collapse="isCollapse"
    background-color="#303133"
    text-color="#fff"
    >
                <h3>{{ isCollapse ? '商城' : '游戏商城管理系统' }} </h3>
                <el-menu-item @click="clickMenu(item)" v-for="item of menuData" :key="item.name" :index="item.name" >
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </el-menu-item>
                
    </el-menu>
</template>


<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {}
    },
    methods: {
        clickMenu(item) {
            this.$router.push(item.path)
            this.$store.commit('selectMenu',item);
            
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.tab.isCollapse;
        },
        menuData() {
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu;
        }
    }
}

</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
        
    }

    .el-menu {
        height: 100%;
        border-right: none;
        h3 {        
            margin-top: 11px;
            color: #fff;
            text-align: center;
            line-height: 48px;
            font-size: 16px;
            font-weight: 500;
            border-bottom : 1px solid;
        }
    }
</style>