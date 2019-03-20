<template>
  <div class="layout">
    <Layout :style="{minHeight: '100vh'}">
      <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu  :active-name="1" theme="dark" width="auto" :accordion="true" :class="menuitemClasses">

          <div v-for="(item,index) in menuList">
            <Submenu name="index">
              <template slot="title">
                <Icon type="ios-filing" />
                {{item.name}}
              </template>
              <MenuItem name="indexc" :to="child.path" v-for="(child,indexc) in item.children">
                  {{child.name}}
              </MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
        <Content :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Card>
            <div style="height: 600px">
              <router-view/>
              <!--<Button type="primary" @click="getNewsList">点击</Button>-->
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  import menuList from '@/router/menu'
  export default {
    data () {
      return {
        isCollapsed: false,
        // 导航菜单
        menuList: menuList,
      }
    },
    computed: {
      menuitemClasses: function () {
        return [
          'menu-item',
          this.isCollapsed ? 'collapsed-menu' : ''
        ]
      }
    },
    created () {
        console.log('created')
        console.log(menuList)
    },
    methods: {

    }
  }
</script>
<style>
  .layout-con{
    height: 100%;
    width: 100%;
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
</style>
