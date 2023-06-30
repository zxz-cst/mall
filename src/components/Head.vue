<template>
    <div class="box">
        <div class="lbox">
            <el-button style="margin-right: 20px;;" @click="handleMenu" icon="el-icon-menu" size="mini"></el-button>
            <el-breadcrumb  separator=">" >
                <el-breadcrumb-item  v-for="item of tags" :to="{ path: item.path }" :key="item.path">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="rbox">
            <el-dropdown  @command="handleClick">
                <span class="el-dropdown-link">
                    <img class="el-icon-arrow-down el-icon--right" src="../assets/logo.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="cancel">登出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import Cookie from 'js-cookie'
export default {
    data() {
        return {

        }
    },
    methods: {
        handleMenu() {
            this.$store.commit('collapseMenu');
        },
        handleClick(command) {
            if(command === 'cancel') {
                Cookie.remove('token')
                Cookie.remove('menu')
                this.$store.commit('resetMenu')
                this.$router.push('/login')
            }
        }
    },
    computed: {
        ...mapState({
            tags:state => state.tab.tabList
        })
    }
}

</script>

<style lang="less" scoped>
    .box {
        padding: 0 20px;
        width: auto;
        height: 60px;
        background: #000000;
        display: flex;
        justify-content: space-between;
        align-items: center;
    
        .lbox {
        display: flex;
        justify-content: space-between;
        align-items: center; 
        color: #fff;
        /deep/.el-breadcrumb__item {
                .el-breadcrumb__inner {
                    font-weight: normal;
                    &.is-link {
                        color: #8d8585;
                    }
                }
                &:last-child {
                    .el-breadcrumb__inner {
                        color: #fff;
                    }
                }
            }
        }
        .rbox{
            
            img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>