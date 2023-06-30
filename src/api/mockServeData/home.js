// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = []
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          绝地求生: Mock.Random.float(100, 8000, 0, 0),
          王者荣耀: Mock.Random.float(100, 8000, 0, 0),
          英雄联盟: Mock.Random.float(100, 8000, 0, 0),
          守望先锋: Mock.Random.float(100, 8000, 0, 0),
          火影忍者: Mock.Random.float(100, 8000, 0, 0),
          第五人格: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '第五人格',
            value: 2999
          },
          {
            name: '绝地求生',
            value: 5999
          },
          {
            name: '王者荣耀',
            value: 1500
          },
          {
            name: '英雄联盟',
            value: 1999
          },
          {
            name: '守望先锋',
            value: 2200
          },
          {
            name: '火影忍者',
            value: 4500
          }
        ],
        // 柱状图
        userData: [
          {
            date: '英雄联盟',
            new: 5000,
            active: 70000
          },
          {
            date: '王者荣耀',
            new: 8000,
            active: 50000
          },
          {
            date: '绝地求生',
            new: 1200,
            active: 45000
          },
          {
            date: '第五人格',
            new: 4000,
            active: 30000
          },
          {
            date: '火影忍者',
            new: 3650,
            active: 22000
          },
          {
            date: '守望先锋',
            new: 4530,
            active: 11000
          },
         
        ],
        // 折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007'],
          data: List
        },
        tableData: [
          {
            name: '英雄联盟',
            todayBuy: 5000,
            monthBuy: 35000,
            totalBuy: 220000
          },
          {
            name: '王者荣耀',
            todayBuy: 3000,
            monthBuy: 22000,
            totalBuy: 240000
          },
          {
            name: '绝地求生',
            todayBuy: 8000,
            monthBuy: 45000,
            totalBuy: 650000
          },
          {
            name: '第五人格',
            todayBuy: 1200,
            monthBuy: 65000,
            totalBuy: 450000
          },
          {
            name: '火影忍者',
            todayBuy: 3000,
            monthBuy: 20000,
            totalBuy: 340000
          },
          {
            name: '守望先锋',
            todayBuy: 3500,
            monthBuy: 30000,
            totalBuy: 220000
          },
          {
            name: '穿越火线',
            todayBuy: 2700,
            monthBuy: 15000,
            totalBuy: 188000
          },
          {
            name: '永劫无间',
            todayBuy: 1500,
            monthBuy: 20000,
            totalBuy: 243000
          },
          {
            name: '三国杀',
            todayBuy: 3300,
            monthBuy: 34000,
            totalBuy: 452000
          },
          {
            name: '梦幻西游',
            todayBuy: 3200,
            monthBuy: 42000,
            totalBuy: 111000
          },
          {
            name: '逆水寒',
            todayBuy: 4200,
            monthBuy: 51000,
            totalBuy: 555000
          },
          {
            name: '最终幻想',
            todayBuy: 1700,
            monthBuy: 34000,
            totalBuy: 321000
          },
        ]
      }
    }
  }
}

