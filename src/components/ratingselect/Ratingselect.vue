<template>
  <div class="ratingselect">
    <div class="ratings-type border-1px">
      <span
        class="block all"
        :class="{'active':selectedType===2}"
        @click="select(2)"
      >
        {{description.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span
        class="block positive"
        :class="{'active':selectedType===0}"
        @click="select(0)"
      >
        {{description.positive}}<span class="count">{{positives.length}}</span>
      </span>
      <span
        class="block negative"
        :class="{'active':selectedType===1}"
        @click="select(1)"
      >
        {{description.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="only-content" @click="toggleShowHasContent">
      <span
        class="icon-check_circle"
        :class="{'active':onlyContent}"
      >
      </span><span class="content">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;
  const NEGETIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectedType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      description: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives () {
        return this.ratings.filter( (rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives () {
        return this.ratings.filter( (rating) => {
          return rating.rateType === NEGETIVE;
        });
      },
    },
    methods: {
      toggleShowHasContent () {
        this.$emit('changeOnlyContent')
      },
      select (type) {
        this.$emit('changeSelectType',type);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    .ratings-type
      margin : 0 18px
      padding : 18px 0
      font-size : 0
      border-1px(rgba(7,17,27,.1))
      .block
        padding : 8px 12px
        border-radius : 1px
        line-height : 16px
        font-size : 12px
        margin-right : 8px
        .count
          font-size : 8px
          margin-left : 2px
        &.active
          color : rgb(255,255,255)
        &.positive,&.all
          background : rgba(0,160,220,.2)
          &.active
            background : rgb(0,160,220)
        &.negative
          background : rgba(7,85,93,.2)
          &.active
            background : rgb(7,85,93)
    .only-content
      padding : 12px 18px
      color : rgb(147,153,159)
      border-bottom : 1px solid rgba(7,17,27,.1)
      .icon-check_circle,.content
        display : inline-block
        height : 24px
        line-height : 24px
        vertical-align : top
      .icon-check_circle
        font-size : 24px
        &.active
          color : #00c850
      .content
        font-size : 12px
</style>
