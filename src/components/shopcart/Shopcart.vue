<template>
    <div class="shopcart">
      <div class="content">
       <div
         class="content-left"
         @click="toggleShopcartShow"
       >
         <div class="logo-wrapper">
           <div class="logo" :class="{highlight:totalCount>0}">
             <span class="icon-shopping_cart"></span>
           </div>
           <div class="count" v-show="totalCount>0">{{totalCount}}</div>
         </div>
         <div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
         <div class="description">另需配送费￥{{deliveryPrice}}元</div>
       </div>
       <div class="content-right" :class="payClass"><span class="min-price">{{payDescription}}</span></div>
     </div>
      <div class="ball-container">
        <div v-for="(ball,idx) in balls" :key="idx">
          <transition
            name="drop"
            @before-enter="dropBeforeEnter"
            @enter="dropEnter"
            @after-enter="dropAfterEnter"
          >
            <div  class="ball" v-show="ball.show">
              <div class="inner inner-hook icon-add_circle"></div>
            </div>
          </transition>
        </div>
      </div>
      <transition name="fold">
        <div class="shopcart-list-wrapper" v-show="isShowShopcart&&this.totalCount>0">
            <div class="container">
              <div class="shopcart-content">
                <div class="shopcart-header">
                  <span class="header-title">购物车</span>
                  <span class="header-empty" @click="empty">清空</span>
                </div>
                <div class="shopcart-list">
                  <div
                    class="shop-item border-1px"
                    v-for="(shopItem,idx) in selectedFoods"
                    :key="idx"
                  >
                    <span class="shop-name">{{shopItem.name}}</span>
                    <span class="price">￥<span class="num">{{shopItem.price*shopItem.count}}</span></span>
                    <span class="cartcontrol-wrapper">
                      <Cartcontrol :food="shopItem"></Cartcontrol>
                    </span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </transition>
      <transition name="background">
        <div
          class="background"
          v-show="isShowShopcart&&this.totalCount>0"
          @click="toggleShopcartShow"
        >
        </div>
      </transition>
    </div>
</template>

<script>
  import Cartcontrol from "../cartcontrol/Cartcontrol";
  export default {
    components : {
      Cartcontrol
    },
    props : {
      deliveryPrice : {
        type : Number,
        default : 0
      },
      minPrice : {
        type : Number,
        default : 0
      },
      selectedFoods : {
        type : Array,
        default () {
          return [];
        }
      }
    },
    data () {
      return {
        isShowShopcart : false,
        balls : [
          {
            show : false,
          },
          {
            show : false,
          },
          {
            show : false,
          },
          {
            show : false,
          },
          {
            show : false,
          },
        ],
        dropBalls : [],
      }
    },
    computed : {
      totalPrice () {
        let total = 0;
        this.selectedFoods.forEach( (food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectedFoods.forEach( (food) => {
          count += food.count;
        });
        return count;
      },
      payDescription () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}起送`;
        } else {
          return "去结算";
        }
       return '';
      },
      payClass () {
        if (this.totalPrice >= this.minPrice) {
          return 'enough';
        }
        return 'not-enough';
      }
    },
    methods : {
      toggleShopcartShow () {
        if(!this.totalCount) {
          this.isShowShopcart = false;
          return;
        }
        this.isShowShopcart = !this.isShowShopcart;
      },
      empty () {
        this.selectedFoods.forEach( (food) => {
          food.count = 0;
        });
        this.isShowShopcart = false;
      },
      drop (el) {
        for (let i = 0;i < this.balls.length;i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      dropBeforeEnter (el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            console.log(rect.left,rect.width,rect.top,window.innerHeight);
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      dropEnter (el,done) {
        /* eslient-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick( () => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend',done);
        });
      },
      dropAfterEnter (el) {
        let that = this;
        let ball = that.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position : fixed
    left : 0
    bottom : 0
    right : 0
    width : 100%
    height : 46px
    z-index : 50
    .content
      display : flex
      background : #141d27
      height : 100%
      .content-left
        font-size : 0
        flex : 1
        .logo-wrapper
          display : inline-block
          position : relative
          top : -14px
          margin : 0 12px
          width : 58px
          height : 58px
          box-sizing : border-box
          border-radius : 50%
          background : #141d27
          text-align : center
          padding : 6px
          .logo
            width : 46px
            height : 46px
            line-height : 46px
            font-size : 24px
            background : #2d343c
            border-radius : 50%
            color : #80858a
            &.highlight
              background : rgb(0,160,220)
              color : rgb(255,255,255)
          .count
            position : absolute
            right : 0
            top : 0
            width : 24px
            height : 16px
            line-height : 16px
            text-align : center
            border-radius : 8px
            background : rgb(240,20,20)
            font-size : 9px
            font-weight : 700
            color : rgb(255,255,255)
            box-shadow : 0px 4px 8px 0px rgba(0,0,0,0.4)
        .price
          display : inline-block
          height : 24px
          line-height : 24px
          font-size : 10px
          font-weight : 700
          color : rgba(255,255,255,0.2)
          vertical-align : top
          margin-top : 12px
          position : relative
          border-right : 1px solid rgba(255,255,255,0.1)
          padding-right: 12px
          margin-right : 12px
          &.highlight
            color : rgb(255,255,255)
        .description
          display : inline-block
          vertical-align : top
          margin-top 12px
          height : 24px
          line-height : 24px
          font-size : 10px
          color : rgba(255,255,255,0.4)
      .content-right
        flex : 0 0 105px
        width : 105px
        text-align : center
        color : rgba(255,255,255,0.4)
        &.not-enough
          background : #2d333b
        &.enough
          background : #00b43c
        .min-price
          display : inline-block
          height : 24px
          line-height : 24px
          font-size : 12px
          font-weight : 700
          margin : 12px 6px
    .ball-container
      .ball
        position : fixed
        left : 32px
        bottom : 22px
        z-index : 200
        transition : all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width : 16px
          height : 16px
          border-radius : 50%
          font-size : 16px
          color : rgb(0,160,220)
          transition : all 0.4s linear
    .shopcart-list-wrapper
      position : fixed
      left : 0
      right : 0
      bottom : 46px
      height : 260px
      width : 100%
      z-index : -1
      .container
        position : relative
        width : 100%
        height :100%
        .shopcart-content
          position : absolute
          left : 0
          bottom : 0
          right : 0
          height : auto
          width : 100%
          .shopcart-header
            height : 40px
            background : #f3f5f7
            border-bottom : 1px solid rgba(7,17,27,0.1)
            padding : 0 18px
            .header-title
              line-height : 40px
              font-size : 14px
              font-weight : 200
              color : rgb(7,17,27)
            .header-empty
              line-height : 40px
              font-size : 12px
              color : rgb(0,160,220)
              float : right
          .shopcart-list
            background : #fff
            max-height : 220px
            overflow-y : scroll
            padding : 0 18px
            &::-webkit-scrollbar
              display : none
            .shop-item
              padding : 12px 0
              width : 100%
              height : 24px
              border-1px(rgba(7,17,27,0.1))
              line-height : 24px
              display : flex
              .shop-name
                font-size : 14px
                color : rgb(7,17,27)
                flex : 1
              .price
                font-size : 10px
                font-weight : normal
                margin-left : 18px
                margin-right : 12px
                color : rgb(240,20,20)
                .num
                  font-weight 700
                  font-size : 14px
    .fold-enter-active, .fold-leave-active
      transition: transform  .4s
      transform : translate3d(0,0,0)
    .fold-enter, .fold-leave-to
      transform : translate3d(0,100%,0)
    .background
      position : fixed
      top : 0
      left : 0
      right : 0
      bottom : 46px
      width : 100%
      background : rgba(7,17,27,0.6)
      z-index : -2
    .background-enter-active,.background-leave-active
      transition : opacity .4s
    .background-enter,.background-leave-to
      opacity: 0
</style>
