const menu = [
  {
    path: '/index',
    name: 'index',
    icon: 'icon-dynamic_fill',
    level: 1,
    sort: 1,
    children: [],
    fixed: false
  },
  {
    path: '/',
    name: '列表页',
    icon: 'icon-createtask_fill',
    level: 0,
    fixed: false,
    children: [
      {
        path: '/chart',
        name: 'chart',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      },
      {
        level: 1,
        path: '/filter',
        name: 'filter',
        children: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      }
    ]
  },
  {
    path: '/',
    name: '风控图书馆',
    icon: 'icon-createtask_fill',
    level: 0,
    fixed: false,
    children: [
      {
        path: '/riskinfo',
        name: 'HelloWorld',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      },
      {
        path: '/RiskInfoClaimQuery',
        name: '典型案例分析',
        icon: 'icon-dynamic_fill',
        level: 1,
        children: [],
        fixed: false
      },
      {
        level: 1,
        path: '/filter',
        name: 'filter',
        children: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      }
    ]
  }

]

export default menu
