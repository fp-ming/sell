<template>
    <div class="seller">
      <div class="seller-wrappper">
          <div class="seller-msg border-1px">
            <h1 class="name">{{seller.name}}</h1>
            <div class="sell">
              <span class="star">
                <star :size="36" :score="seller.score"></star>
              </span>
              <span class="mount">(661)</span>
              <span class="count">月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="delivery">
            <span class="inline nim-price">
              <div class="title">起送价</div>
              <div><span class="num">{{seller.minPrice}}</span><span class="text">元</span></div>
            </span>
            <span class="inline delivery-price">
              <div class="title">商家配送</div>
              <div><span class="num">{{seller.deliveryPrice}}</span><span class="text">元</span></div>
            </span>
            <span class="inline delivery-time">
              <div class="title">平均配送时间</div>
              <div><span class="num">{{seller.deliveryTime}}</span><span class="text">分钟</span></div>
            </span>
          </div>
          <span class="collection" @click="toggleCollection">
            <span class="collection-favorite">
              <span class="icon-favorite" :class="{'highlight':isCollection}"></span>
            </span>
            <span class="collection-title">{{collection}}</span>
          </span>
      </div>
      <Split></Split>
      <div class="notice-wrapper">
        <div class="notice">
          <div class="notice-title">公告与活动</div>
          <div class="notice-content">
            {{seller.bulletin}}
          </div>
        </div>
        <ul class="supports">
          <li
            class="support-item"
            v-for="(support,idx) in seller.supports" :key="idx"
          >
            <div class="border border-1px"></div>
            <div class="container">
              <span class="icon" :class="supportsList[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </div>
          </li>
        </ul>
      </div>
      <Split></Split>
      <div class="picture">
        <div class="picture-title">
          商家实景
        </div>
        <div class="picture-wrapper">
          <div class="picture-list">
            <span
              class="picture-item"
              v-for="(pic,idx) in seller.pics" :key="idx"
            >
              <span class="img"><img :src="pic" alt=""></span>
            </span>
          </div>
        </div>
      </div>
      <Split></Split>
      <div class="infos">
        <h1 class="infos-title">商家信息</h1>
        <ul class="infos-list">
          <li
            class="infos-item"
            v-for="(info,idx) in seller.infos" :key="idx"
          >
            <div class="border border-1px"></div>
            <div class="text">{{info}}</div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import Star from '../star/Star'
  import Split from "../split/Split";
  export default {
    components : {
      Star,
      Split,
    },
    props : {
      seller : {
        type : Object,
        default : {}
      }
    },
    data () {
      return {
        isCollection : false,
        supportsList : ['decrease','discount','guarantee','invoice','special'],
      }
    },
    methods : {
      toggleCollection () {
        this.isCollection = !this.isCollection;
      },
    },
    computed : {
      collection () {
        if (this.isCollection === true) {
          return '已收藏';
        } else {
          return '收藏';
        }
        return '收藏';
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .seller
    position : absolute
    top : 174px
    left : 0
    right : 0
    bottom : 0
    overflow-x : hidden
    overflow-y : scroll
    &::-webkit-scrollbar
      display : none
    .seller-wrappper
      position : relative
      width : 100%
      box-sizing : border-box
      padding : 18px
      .seller-msg
        padding-bottom : 18px
        border-1px(rgba(7,17,27,.1))
        font-size : 0
        .name
          line-height : 14px
          font-size : 14px
          margin-bottom : 8px
          color : rgb(7,17,27)
        .star
          margin-right : 8px
          display : inline-block
          vertical-align : top
        .mount,.count
          display : inline-block
          vertical-align : top
          line-height : 18px
          font-size : 10px
          color : rgb(77,85,93)
        .mount
          margin-right : 12px

      .delivery
        display : flex
        padding-top : 18px
        text-align : center
        align-content : center
        justify-items : center
        .inline
          flex : 1
          .title
            line-height : 10px
            font-size : 10px
            color : rgb(147,153,159)
            margin-bottom : 4px
          .mun
            line-height : 24px
            font-size : 24px
            font-weight : 200
            color : rgb(7,17,27)
          .text
            font-size : 10px
        .delivery-price
          border-right : 1px solid rgba(7,17,27,.1)
          border-left : 1px solid rgba(7,17,27,.1)
      .collection
        position : absolute
        top : 18px
        right : 18px
        width : 36px
        display : flex
        flex-direction : column
        justify-content : center
        align-items : center
        font-size : 0
        .collection-favorite
          line-height : 24px
          font-size : 24px
          margin-bottom : 4px
          color : rgb(183,187,191)
          .highlight
            color : rgb(240,20,20)
        .collection-title
          line-height : 10px
          font-size : 10px
          color : rgb(77,85,93)
    .notice-wrapper
      padding : 18px 18px 0
      .notice
        font-size : 0
        .notice-title
          line-height : 14px
          font-size : 14px
          color : rgb(7,17,27)
          margin-bottom :  8px
        .notice-content
          line-height : 24px
          font-size : 12px
          font-weight : 200
          color : rgb(240,20,20)
          margin-left : 12px
          margin-bottom : 16px
      .supports
        .support-item
          .border
            border-1px(rgba(7,17,27,.1))
          .container
            padding : 16px 12px
            font-size : 0
            .icon
              display : inline-block
              vertical-align : top
              width : 16px
              height : 16px
              &.decrease
                bg-img('decrease_4')
              &.discount
                bg-img('discount_4')
              &.guarantee
                bg-img('guarantee_4')
              &.invoice
                bg-img('invoice_4')
              &.special
                bg-img('special_4')
            .text
              display : inline-block
              vertical-align : top
              line-height : 16px
              font-size : 12px
              font-weight 200
              color : rgb(7,17,27)
              margin-left : 6px
    .picture
      padding : 18px
      .picture-title
        line-height : 14px
        font-size : 14px
        color : rgb(7,17,27)
        margin-bottom : 12px
      .picture-wrapper
        width : 100%
        white-space : nowrap
        overflow-x : scroll
        overflow-y : hidden
        &::-webkit-scrollbar
          display : none
        .picture-list
          font-size : 0
          width : 504px
          height : 90px
          .picture-item
            display : inline-block
            width : 120px
            height : 90px
            margin-right : 6px
            &:last-child
              margin : 0
            .img
              width : 120px
              height : 90px
              img
                width : 100%
                height : 100%
    .infos
      padding : 18px 18px 0 18px
      .infos-title
        line-height : 14px
        font-size : 14px
        color : rgb(7,17,27)
        margin-bottom : 12px
      .infos-item
        .border
          border-1px(rgba(7,17,27,.1))
        .text
          padding : 16px 12px
          line-height: 16px
          font-size : 12px
          font-weight : 200
          color : rgb(7,17,27)

</style>
