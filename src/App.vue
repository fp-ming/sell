<template>
  <div id="app" class="app">
    <Header :seller="seller"></Header>
    <div class="tab">
      <div class="tab-item border-1px">
        <router-link to="/" exact>商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from './components/header/Header'
export default {
  components: {
    Header,
  },
  data () {
    return{
      seller:{},
    }
  },
  methods:{
    http () {
      this.axios.get('/api/seller').then( (res) => {
        this.seller = res.data.data;
      }).catch( (err) => {
        console.log(err);
      })
    }
  },
  mounted () {
    this.http();
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl'
  .app
    .tab
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex:1
        text-align:center
        & > a
          display:block
          color:rgb(77,85,93)
          font-size:14px
          &.active
            color:rgb(240,20,20)
</style>
