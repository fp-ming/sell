<template>
      <div class="cartcontrol">
      <transition name="subFade">
        <div
          class="cart-sub icon-remove_circle_outline"
          v-show="food.count>0"
          @click.stop.prevent="subCart()"
        ></div>
      </transition>
        <div class="cart-count" ><span v-show="food.count>0">{{food.count}}</span></div>
      <div
        class="cart-add icon-add_circle"
        @click.stop.prevent="addCart($event)"
      >
      </div>
    </div>
</template>

<script>
  import Vue from 'vue';
    export default {
        props : {
          food : {
            type : Object
          }
        },
        methods : {
          addCart (event) {
            if (!this.food.count) {
              Vue.set(this.food,'count',1);
            } else {
              this.food.count++;
            }
            this.$emit('drop',event.target)
          },
          subCart (event) {
            this.food.count--;
          }
        }
    }
</script>

<style scoped lang="stylus">
  .subFade-enter-active,.subFade-leave-active
    transition : transform .5s
    transform : translate3d(0,0,0) rotate(0deg)
  .subFade-enter,.subFade-leave-to
    transform : translate3d(200%,0,0) rotate(180deg)
  .cartcontrol
    font-size : 0
    .cart-sub,.cart-add
      display : inline-block
      line-height : 24px
      font-size : 24px
      color : rgb(0,160,220)
    .cart-count
      display : inline-block
      width : 24px
      line-height : 24px
      font-size : 10px
      text-align : center
      color : rgb(147,153,159)
      vertical-align : top
</style>
