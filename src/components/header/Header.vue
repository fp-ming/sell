<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}&nbsp;/&nbsp;{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="seller.supports[0].class"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div
        class="support-count"
        v-if="seller.supports"
        @click="showDetail"
      >
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-content">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div
        class="detail"
        v-show="isShowDetail"
      >
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <div class="detail-main-name">
              {{seller.name}}
            </div>
            <div class="detail-main-star">
              <Star :size="48" :score="seller.score"></Star>
            </div>
            <div class="detail-main-wrapper">
              <div class="title">
                <span class="line"></span>
                <span class="text">优惠信息</span>
                <span class="line"></span>
              </div>
              <ul
                class="detail-main-supports"
                v-if="seller.supports"
              >
                <li
                  class="support-item"
                  v-for="(supportItem,idx) in seller.supports" :key="idx"
                >
                  <span class="support-item-title" :class="supportItem.class"></span>
                  <span class="support-item-text">
                  {{supportItem.description}}
                </span>
                </li>
              </ul>

              <div class="title">
                <span class="line"></span>
                <span class="text">商家公告</span>
                <span class="line"></span>
              </div>
              <div class="detail-main-bulletin">
                {{seller.bulletin }}
              </div>

            </div>
          </div>
        </div>
        <div
          class="detail-close"
          @click="hideDetail"
        >
          <span class="icon-close"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from '../star/Star.vue'

  export default {
    components: {
      Star
    },
    props: {
      seller: Object,
    },
    data() {
      return {
        isShowDetail: false,
      }
    },
    methods: {
      showDetail() {
        this.isShowDetail = true;
      },
      hideDetail() {
        this.isShowDetail = false;
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .header
    position: relative
    color: #ffffff
    background: rgba(7, 17, 27, 0.5)
    width: 100%

    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
      display: flex

      .avatar
        vertical-align: top

        img
          width: 64px
          height: 64px
          border-radius: 2px

      .content
        flex: 1
        margin-left: 16px
        font-size: 14px

        .title
          margin: 2px 0 8px 0

          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-img('brand')

          .name
            line-height: 18px
            margin-left: 6px
            font-size: 16px
            font-weight: bold

        .description
          line-height: 12px
          font-size: 12px
          fontweght: 200
          margin-bottom: 8px

        .support
          margin-bottom: 2px
          font-size: 0

          .icon
            display: inline-block
            width: 12px
            height: 12px
            vertical-align: top

            &.decrease
              bg-img('decrease_1')

            &.discount
              bg-img('discount_1')

            &.guarantee
              bg-img('guarantee_1')

            &.invoice
              bg-img('invoice_1')

            &.special
              bg-img('special_1')

          .text
            line-height: 12px
            font-size: 10px
            margin-left: 4px

      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        height: 24px
        line-height: 24px
        padding: 0 8px
        border-radius: 7px
        background: rgba(0, 0, 0, 0.2)

        .count
          font-size: 10px
          margin-right: 2px
          vertical-align: top

        .icon-keyboard_arrow_right
          line-height: 24px
          font-size: 10px

    .bulletin-wrapper
      width: 100%
      height: 28px
      line-height: 28px
      background: rgba(7, 17, 27, 0.2)
      display: flex
      textOverflow()

      .bulletin-title
        margin-left: 12px
        width: 22px
        bg-img('bulletin')
        background-size: 22px 12px

      .bulletin-content
        flex: 1
        margin: 0 4px
        font-size: 10px
        textOverflow()

      .icon-keyboard_arrow_right
        margin-right: 12px
        line-height: 28px
        font-size: 10px

    .background
      position: absolute
      left: 0
      top: 0
      width: 100%
      height: 100%
      filter: blur(10px)
      z-index: -1

      img
        width: 100%
        height: 100%

    .detail
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      overflow: auto
      z-index: 99
      color: rgb(255, 255, 255)
      background: rgba(7, 17, 27, 0.8)

      .detail-wrapper
        width: 100%
        min-height: 100%

        .detail-main
          width: 100%
          margin-top: 64px
          padding-bottom: 128px

          .detail-main-name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center

          .detail-main-star
            margin: 16px auto 0
            padding: 2px
            text-align: center

          .detail-main-wrapper
            width: 80%
            height: auto
            margin: 0 auto

            .title
              display: flex
              margin: 28px 0 24px 0

              .line
                flex: 1
                position: relative
                top: 7px
                border-top: 1px solid rgba(255, 255, 255, 0.2)

              .text
                display: inline-block
                padding: 0 12px
                height: 14px
                line-height 14px
                font-size: 14px
                font-weight: 700

            .detail-main-supports
              width: 100%
              padding: 0 12px

              .support-item
                margin-bottom: 12px
                font-size: 0

                .support-item-title
                  display: inline-block
                  margin-right: 6px
                  width: 16px
                  height: 16px
                  vertical-align: top

                  &.decrease
                    bg-img('decrease_2')

                  &.discount
                    bg-img('discount_2')

                  &.guarantee
                    bg-img('guarantee_2')

                  &.invoice
                    bg-img('invoice_2')

                  &.special
                    bg-img('special_2')

                .support-item-text
                  display: inline-block
                  line-height: 12px
                  font-size 12px
                  font-weight: 200
                  margin-top: 2px

            .detail-main-bulletin
              padding: 0 12px
              line-height: 24px
              font-size: 12px
              font-weight: 200

      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        font-size: 32px
        clear: both
        color: rgba(255, 255, 255, 0.5)

    .fade-enter-active, .fade-leave-active
      transition: opacity 1s

    .fade-enter, .fade-leave-to
      opacity: 0
</style>
