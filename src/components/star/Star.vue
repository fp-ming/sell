<template>
    <div :class="starType" class="star">
      <span
        class="star-item"
        v-for="(itemClass,idx) in itemClasses" :key="idx"
        :class="itemClass"
      >
      </span>
    </div>
</template>

<script>

  const LEN = 5;
  const CLS_ON = "on";
  const CLS_OFF = "off";
  const CLS_HALF = "half";

  export default {
      props : {
        size : Number,
        score : Number
      },
    computed : {
      starType () {
        return 'star-' + this.size;
      },
      itemClasses () {
        let itemClasses = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);
        for (let i = 0;i < integer;i++) {
          itemClasses.push(CLS_ON);
        }
        if (hasDecimal) {
          itemClasses.push(CLS_HALF);

        }
        while (itemClasses.length < LEN) {
          itemClasses.push(CLS_OFF);
        }
        return itemClasses;
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    font-size : 0
    .star-item
      display : inline-block
    &.star-24
      .star-item
        width : 10px
        height : 10px
        margin-right : 3px
        &:last-child
          margin-right : 0
        &.on
          bg-img('star24_on')
        &.off
          bg-img('star24_off')
        &.half
          bg-img('star24_half')
    &.star-36
      .star-item
        width : 15px
        height : 15px
        margin-right : 12px
        &:last-child
          margin-right : 0
        &.on
          bg-img('star36_on')
        &.off
          bg-img('star36_off')
        &.half
          bg-img('star36_half')
    &.star-48
      .star-item
        width : 20px
        height : 20px
        margin-right : 22px
        &:last-child
          margin-right : 0
        &.on
          bg-img('star48_on')
        &.off
          bg-img('star48_off')
        &.half
          bg-img('star48_half')
</style>
