<template>
  <div id='app'>
      <Header :seller="seller">
       I am header!
      </Header>
      <div class="tab border-1px">
          <div class="tab-item">
            <router-link to="/goods">商品</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/ratings">评论</router-link>
          </div>
          <div class="tab-item">
            <router-link to="/seller">商家</router-link>
          </div>
      </div>
      <!-- 路由匹配到的 组件将渲染在这里 -->
      <router-view></router-view>
  </div>
</template>
<script>
import Header from './components/header/header.vue';

const ERR_OK = 0;

export default{

  data() {
    return {
      seller:{}
    }
  },
  components:{Header},
  created(){
    this.$http.get("/seller").then(response=>{
      response = response.body;
      if(response.errno === ERR_OK){
          this.seller = response.data;
         
      }

    })
  },

  // components: {
  //   'v-header': header
  // }
};
</script>

<style lang="stylus">
  @import './common/stylus/mixin.styl'
  .tab
    display: flex
    width 100%
    height :40px
    // border-bottom: 1px solid rgba(7,17,27,0.1)
      //引入伪类  边框成真正的1像素了
    boder-1px(rgba(7,17,27,0.1))
    line-height :40px
    .tab-item
      flex:1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color:rgb(77,85,93)
        &.active
          color:rgb(240,20,20)
      
</style>
