<template>
  <div>
    <transition name="foodFade">
      <div v-show="showFlag" class="food" id="food">
        <div class="food-content">
          <div class="food-header">
            <div class="img">
              <img :src="food.image" alt="">
            </div>
            <div class="back" v-show="showBack" @click="hide">
              <span class="icon-arrow_lift"></span>
            </div>
          </div>
          <div class="food-msg">
            <div class="name">{{food.name}}</div>
            <div class="sell">
              <span class="sellCount">月售{{food.sellCount}}份</span><span
                class="rating">{{food.rating}}</span>
            </div>
            <div class="price">
              <span class="nowPrice">￥<span class="num">{{food.price}}</span></span><span class="oldPrice">
              ￥<span class="num">{{food.oldPrice}}</span></span>
            </div>
            <div class="cartcontrol-wrapper" v-show="food.count&&food.count!==0">
              <Cartcontrol :food="food" @drop="drop"></Cartcontrol>
            </div>
            <transition name="buyFade">
              <div
                class="buy"
                v-show="!food.count||food.count===0"
                @click="buyFood($event)"
              >
                加入购物车
              </div>
            </transition>
          </div>
          <Split></Split>
          <div class="food-introduate">
            <div class="title">
              商品介绍
            </div>
            <div class="info">
              {{food.info}}
            </div>
          </div>
          <Split></Split>
          <div class="ratings-wrapper">
            <div class="ratings">
              <div class="title">商品评价</div>
              <Ratingselect
                :selectedType="selectedType"
                @changeSelectType="changeSelectType($event)"
                :onlyContent="onlyContent"
                @changeOnlyContent="changeOnlyContent"
                :description="description"
                :ratings="food.ratings"
              >
              </Ratingselect>
              <div class="no-ratings" v-show="isRatingsNull">
                暂无评论数据...
              </div>
              <ul v-show="!isRatingsNull">
                <li
                  class="rating-item border-1px"
                  v-for="(rating,idx) in food.ratings" :key="idx"
                  v-show="needShow(rating.rateType,rating.text)"
                >
                  <div class="msg">
                    <span class="rateTime">{{formatDate(rating.rateTime)}}</span>
                    <span class="user">
                      <span class="username">{{rating.username}}</span>
                      <span class="avatar">
                        <img :src="rating.avatar" alt="">
                      </span>
                    </span>
                  </div>
                  <div class="text-wrapper">
                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                    <span class="text">{{rating.text}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="return" v-show="!showBack&&showFlag" @click="hide" :style="backOpacity">
      <span class="icon-arrow_lift"></span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Cartcontrol from "../cartcontrol/Cartcontrol";
  import Split from "../split/Split";
  import Ratingselect from "../ratingselect/Ratingselect";
  import BScroll from 'better-scroll';
  import {formatDate} from '../../common/js/date'
  // const POSITIVE = 0;
  // const NEGETIVE = 1;
  const ALL = 2;
    export default {
      components : {
        Cartcontrol,
        Split,
        Ratingselect
      },
      props : {
        food : Object
      },
      data () {
          return {
            showFlag : false,
            selectedType : ALL,
            onlyContent: true,
            description : {
              all : '全部',
              positive : '推荐',
              negative : '吐槽'
            },
            showBack : true,
            backOpacity : {opacity:0}
          }
      },
      methods : {
        show () {
          this.showFlag = true;
          this.selectedType = ALL;
          this.onlyContent = true;
          this.$nextTick( () => {
            if (this.bs) {
              this.bs.refresh();
              this.bs.scrollTo(0,0,0);
            } else {
              this.initScroll();
            }
          });
        },
        hide () {
          this.showFlag = false;
          this.showBack = true;
        },
        drop (target) {
          this.$emit('drop',target);
        },
        buyFood (event) {
          if (!event.constructor) {
            return;
          }
          this.$emit('drop',event.target);
          if(!this.food.count){
            Vue.set(this.food,'count',1);
          } else {
            this.count++;
          }
        },
        changeSelectType (type) {
          this.selectedType = type;
          this.$nextTick( () => {
            this.bs.refresh();
          });
        },
        changeOnlyContent () {
          this.onlyContent = !this.onlyContent;
          this.$nextTick( () => {
            this.bs.refresh();
          });
        },
        initScroll () {
          this.bs = new BScroll('#food',{
            movable: true,
            zoom: true,
            click: true,
            scrollX:false,
            probeType: 3
          });
          this.bs.on('scroll',(pos) => {
            let top = Math.abs(pos.y);
            let opacity = top / 130;
            opacity = opacity > 1 ? 1 : opacity;
            if(top > 50) {
              this.showBack = false;
              this.backOpacity = {
                opacity
              }
            } else {
              this.showBack = true
            }
          });
        },
        formatDate (rateTime) {
          let date = new Date(rateTime);
          return formatDate(date,'yy-MM-dd hh:mm');
        },
      },
      computed : {
        isRatingsNull () {
          let test = !(this.food.ratings && this.food.ratings.length);
          return test;
        },
        needShow () {
          return function (type,text) {
            if (this.onlyContent && !text) {
              return false;
            }
            if (this.selectedType === ALL) {
              return true
            } else {
              return type === this.selectedType;
            }
          }
        }
      },
    }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .foodFade-enter-active, .foodFade-leave-active
    transition: transform  .5s
    transform : translate3d(0,0,0)
  .foodFade-enter, .foodFade-leave-to
    transform : translate3d(100%,0,0)
  .buyFade-enter-active,.buyFade-leave-active
    transition : transform .4s, opacity .4s
    transform : translate3d(0,0,0)
    opacity: 1
  .buyFade-enter,.buyFade-leave-to
    transform : translate3d(100%,0,0)
    opacity : 0
  .return
    position : fixed
    top : 0
    left : 0
    height : 32px
    line-height : 32px
    font-size : 16px
    width : 100%
    color : #fff
    background : rgba(0,0,0,.5)
    padding-left : 16px
  .food
    position : fixed
    top :0
    bottom : 46px
    left : 0
    right : 0
    width : 100%
    background : #fff
    overflow : hidden
    &::-webkit-scrollbar
      display : none
    .food-header
      position : relative
      .img
        position : relative
        width : 100%
        height : 0
        padding-top : 100%
        img
          position : absolute
          left : 0
          top : 0
          width : 100%
          height : 100%
      .back
        position : absolute
        display : block
        height : 32px
        width : 32px
        line-height : 32px
        font-size : 16px
        color : rgba(255,255,255,.7)
        top : 18px
        left : 18px
        background : rgba(0,0,0,.3)
        border-radius : 50%
        text-align :center
    .food-msg
      position :relative
      width : 100%
      padding : 18px
      box-sizing : border-box
      .name
        line-height: 14px
        font-size : 14px
        font-weight : 700
        color : rgb(7,17,27)
      .sell
        margin-top : 8px
        line-height : 10px
        font-size : 10px
        .sellCount
          margin-right : 12px
      .price
        line-height : 24px
        font-size : 10px
        font-weight : normal
        margin-top : 18px
        .nowPrice
          color : rgb(240,20,20)
          .num
            font-weight : 700
        .oldPrice
          margin-left : 8px
          text-decoration : line-through
          color : rgb(147,153,159)
      .cartcontrol-wrapper,.buy
        position : absolute
        right : 18px
        bottom : 18px
      .buy
        padding : 6px 12px
        background : rgb(0,160,220)
        border-radius : 12px
        line-height : 12px
        font-size : 10px
        color : rgb(255,255,255)

    .food-introduate
      padding : 18px
      box-sizing : border-box
      width : 100%
      .title
        line-height : 24px
        font-size : 14px
        marg-bottom: 6px
        color : rgb(7,17,27)
        font-weight : 500
      .info
        padding : 0 8px
        line-height: 24px
        font-size : 12px
        font-weight : 200
        color : rgb(77,85,93)
    .ratings-wrapper
      width : 100%
      .ratings
        width : 100%
        box-sizing : border-box
        .title
          margin-top : 18px
          margin-left : 18px
        .no-ratings
          margin : 18px 0 30px 18px
          line-height : 12px
          font-size : 12px
          color : rgb(147,153,159)
        .rating-item
          padding : 16px 0
          margin 0 16px
          border-1px(rgba(7,17,27,.1))
          .msg
            line-height : 12px
            font-size : 10px
            color : rgb(147,153,159)
            margin-bottom : 6px
            .user
              margin-right : 6px
              float : right
            .avatar
              display : inline-block
              width : 12px
              height: 12px
              vertical-align : top
              img
                width : 100%
                height : 100%
                border-radius : 50%
          .text-wrapper
            font-size : 0
            .icon-thumb_down,.icon-thumb_up
              line-height : 24px
              font-size : 12px
            .icon-thumb_down
              color : rgb(147,153,159)
            .icon-thumb_up
              color : rgb(0,160,220)
            .text
              line-height: 16px
              font-size : 12px
              color : rgb(7,17,27)
              margin-left : 4px
</style>
