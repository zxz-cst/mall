import Cookie from 'js-cookie'
export default {
    state: {
        tabList:[
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        imgData: [
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
            
        ],
        hrData:[
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
            
           
        ],
        isCollapse:false,
        menu:[]
    },
    mutations: {
        selectMenu(state,val) {
            if(val.name !== 'home') {
            const index = state.tabList.findIndex(item => item.name === val.name);
            if(index === -1) {
                state.tabList.push(val);
            } 
            }
        },
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        closeTag(state,item) {
            const index = state.tabList.findIndex(val => val.name === item.name)
            state.tabList.splice(index,1)
        },
        resetMenu(state) {
            state.tabList = [
                {
                    path: '/',
                    name: 'home',
                    label: '首页',
                    icon: 's-home',
                    url: 'Home/Home'
                }
            ]
           
        },
        setMenu(state,val) {
            state.menu = val;
            Cookie.set('menu',JSON.stringify(val))
        },
        addMenu(state,router) {
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu

            const menuArray = []
            menu.forEach(item => {
                if(item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`) // 给menu中每一项增加组件属性
                        return item
                    })
                    menuArray.push(...item.children) // push整个数组
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            menuArray.forEach(item => {
                router.addRoute('Main',item)
            })

        },
        setImg(state,data) {
            state.imgData.push(data);
        },
        delImg(state,data) {
            state.imgData.splice(data,1);
        },
        setHr(state,data) {
            state.hrData.push(data);
        },
        delHr(state,data) {
            state.hrData.splice(data,1);
        }
    }
}