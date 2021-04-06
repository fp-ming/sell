<template>
    <div class="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{seller.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家{{seller.rankRate}}%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <Star :size="36" :score="seller.serviceScore"></Star>
              <span class="score">{{seller.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评价</span>
              <Star :size="36" :score="seller.foodScore"></Star>
              <span class="score">{{seller.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <Split></Split>
        <Ratingselect
          :selectedType="selectedType"
          @changeSelectType="changeSelectType($event)"
          :onlyContent="onlyContent"
          @changeOnlyContent="changeOnlyContent"
          :ratings="ratings"
        >
        </Ratingselect>
        <div class="ratings-wrapper">
          <div class="ratings-null" v-show="isRatingsNull">
            暂无评论数据...
          </div>
          <ul
            class="ratings-list"
            v-show="!isRatingsNull">
            <li
              class="rating-item border-1px"
              v-for="(rating,idx) in ratings" :key="idx"
              v-show="needShow(rating.rateType,rating.text)"
            >
              <div class="rating-left">
                <div class="avatar">
                  <img :src="rating.avatar" alt="">
                </div>
              </div>
              <div class="rating-right">
                <div class="user-name">
                  {{rating.username}}
                  <span class="rate-time">{{dateFormat(rating.rateTime)}}</span>
                </div>
                <div class="star-wrapper">
                  <span class="star">
                    <Star :size="24" :score="rating.score"></Star>
                  </span>
                  <span class="delivery-time">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div class="text">{{rating.text}}</div>
                <div class="rate">
                  <span class="rateType" :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                  <span
                    class="recommend"
                    v-for="(item,idx1) in rating.recommend" :ket="idx1"
                  >
                    {{item}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import Star from '../star/Star'
  import Split from '../split/Split'
  import Ratingselect from "../ratingselect/Ratingselect";
  import {formatDate} from "../../common/js/date";
  // const POSITIVE = 0;
  // const NEGETIVE = 1;
  const ALL = 2;
  export default {
    props : {
      seller : {
        type : Object,
        default : {}
      }
    },
    components : {
      Star,
      Split,
      Ratingselect
    },
    data () {
      return {
        ratings : [],
        selectedType : ALL,
        onlyContent : true
      }
    },
    created () {
      this.http();
    },
    computed : {
      isRatingsNull () {
        let test = !(this.ratings && this.ratings.length)
        return test;
      }
    },
    methods : {
      http () {
        this.axios.get('/api/ratings')
        .then((res) => {
          this.ratings = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
      },
      dateFormat (date) {
        let time = formatDate(new Date(date),'yyyy-MM-dd hh:mm');
        return time;
      },
      needShow (type,text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectedType === ALL) {
          return true
        } else {
          return type === this.selectedType;
        }
      },
      changeSelectType (type) {
        this.selectedType = type;
      },
      changeOnlyContent () {
        this.onlyContent = !this.onlyContent;
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .ratings
    position : absolute
    top : 174px
    left : 0
    bottom : 46px
    width : 100%
    overflow-x : hidden
    overflow-y : scroll
    &::-webkit-scrollbar
      display : none
    .overview
      display : flex
      padding : 18px 0
      .overview-left
        flex : 0 0 137px
        width : 137px
        border-right : 1px solid rgba(7,17,27,0.1)
        text-align : center
        @media only screen and (max-width 320px)
          flex : 0 0 100px
          width : 100px
        .score
          line-height : 28px
          font-size : 24px
          color : rgb(255,153,0)
          margin-bottom : 6px
        .title
          line-height : 12px
          font-size : 12px
          color : rgb(7,17,27)
          margin-bottom : 8px
        .rank
          line-height : 10px
          font-size : 10px
          color : rgb(147,153,159)
          margin-bottom 6px
      .overview-right
        flex : 1
        padding : 0 12px
        .score-wrapper
          margin-bottom : 8px
          font-size : 0
          .title
            margin-right : 12px
            display : inline-block
            vertical-align : top
            font-size : 12px
            color : rgb(7,17,27)
          .star
            display : inline-block
            vertical-align : top
            margin-right : 12px
          .score
            display : inline-block
            vertical-align : top
            font-size : 12px
            color : rgb(255,153,0)
        .delivery-wrapper
          line-height : 18px
          font-size : 0
          .title
            margin-right : 12px
            font-size : 12px
            color : rgb(7,17,27)
          .delivery-time
            font-size : 12px
            color : rgb(147,153,159)
        @media only screen and (max-width 320px)
          padding : 0 6px
          .delivery-wrapper,.score-wrapper
            .title
              margin-right : 6px
            .star
              margin-right : 6px
    .ratings-wrapper
      padding : 0 18px
      font-size : 0
      .rating-item
        display : flex
        padding : 18px 0
        border-1px(rgba(7,17,27,0.1))
        .rating-left
          flex : 0 0 28px
          width : 28px
          margin-right : 12px
          .avatar
            img
              width : 28px
              height : 28px
              border-radius : 50%
        .rating-right
          flex : 1
          .user-name
            line-height : 12px
            font-size : 10px
            color : rgb(7,17,27)
            margin-bottom : 4px
            .rate-time
              float : right
              font-width: 200
              color : rgb(147,153,159)
          .star-wrapper
            margin-bottom : 6px
            .star
              display : inline-block
              vertical-align : top
              margin-right : 6px
            .delivery-time
              display : inline-block
              vertical-align : top
              line-height : 12px
              font-size : 10px
              font-weight : 200
              margin-left : 6
          .text
            line-height : 18px
            font-size : 12px
            color : rgb(7,17,27)
            margin-bottom : 8px
          .rate
            .icon-thumb_up,.icon-thumb_down
              display : inline-block
              vertical-align : top
              margin-right : 4px
              margin-bottom : 4px
              line-height : 16px
              font-size : 12px
            .icon-thumb_up
              color : rgb(0,160,220)
            .icon-thumb_down
              color : rgb(183,187,191)
            .recommend
              display : inline-block
              vertical-align : top
              margin : 0 4px
              padding : 0 6px
              height : 16px
              max-width : 60px
              line-height : 16px
              font-size : 9px
              color : rgb(147,153,159)
              border : 1px solid rgba(7,17,27,.1)
              border-radius : 2px
              background-color : rgb(255,255,255)
              textOverflow()
</style>
