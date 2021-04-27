<template>
  <div class="goods">
    <div class="menu-wrapper" id="menu-wrapper">
      <ul id="menu-content">
        <li
          class="goods-item"
          v-for="(goodsName,idx) in goods" :key="idx"
          :class="{'current':currentIndex===idx}"
          @click="selectMenu(idx,$event)"
        >
         <span class="text border-1px">
           <span
             class="title"
             v-if="goodsName.type > 0"
             :class="classMap[goodsName.type]"
           ></span>{{goodsName.name}}
         </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" id="foods-wrapper">
      <ul id="foods-content">
        <li
          v-for="(goodsItem,idx1) in goods" :key="idx1"
          class="food-list foods-list-hook"
        >
          <h1 class="food-title">{{goodsItem.name}}</h1>
          <ul>
            <li
              class="food-item border-1px"
              v-for="(foodItem,idx2) in goodsItem.foods" :key="idx2"
              @click="showFoodDetail(foodItem)"
            >
              <div class="food-icon">
                <img :src="foodItem.icon" alt="">
              </div>
              <div class="food-msg">
                <div class="name">{{foodItem.name}}</div>
                <div
                  class="description"
                  v-if="foodItem.description"
                >
                  {{foodItem.description}}
                </div>
                <div class="sell">
                  <span class="sell-count">月售{{foodItem.sellCount}}份</span><span
                  class="rating">好评率{{foodItem.rating}}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice">￥<span class="nowPriceNum">{{foodItem.price}}</span></span><span
                  class="oldPrice" v-if="foodItem.oldPrice">
                  ￥<span class="oldPriceNum">{{foodItem.oldPrice}}</span></span>
                </div>
              </div>
              <div class="cartcontrol-wrapper">
                <Cartcontrol :food="foodItem" @drop="drop"></Cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shopcart
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :selectedFoods="selectedFoods"
      ref="shopcart"
    >
    </Shopcart>
    <Food
      :food="selectedFood"
      ref="food"
      @drop="drop"
    >
    </Food>
  </div>
</template>

<script>

  import BetterScroll from 'better-scroll';
  import Shopcart from '../shopcart/Shopcart'
  import Cartcontrol from "../cartcontrol/Cartcontrol";
  import Food from "../food/Food";

  export default {
    props: {
      seller: Object
    },
    components: {
      Shopcart,
      Cartcontrol,
      Food

    },
    data() {
      return {
        goods: [],
        classMap: [],
        scrollY: 0,
        foodListHeight: [],
        selectedFood: {},
      }
    },
    created() {
      this.http(); 
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
    },
    computed: {
      currentIndex() {
        let len = this.foodListHeight.length;
        for (let i = 0; i < len; i++) {
          let height1 = this.foodListHeight[i];
          let height2 = this.foodListHeight[i + 1];
          let getIndex = (this.scrollY >= height1 && this.scrollY < height2)
          if (!height2 || getIndex) {
            return i;
          }
        }
        return 0;
      },
      selectedFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    methods: {
      http() {
        this.axios.get('/api/goods')
          .then((res) => {
            this.goods = res.data.data;
            // 初始化better-scroll
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          })
          .catch((err) => {
            console.log(err)
          })
      },
      _initScroll() {
        if (!this.menuScroll) {
          this.menuScroll = new BetterScroll('#menu-wrapper', {
            movable: true,
            zoom: true,
            click: true
          })
        } else {
          this.menuScroll.refresh();
        }
        if (!this.foodsScroll) {
          this.foodsScroll = new BetterScroll('#foods-wrapper', {
            movable: false,
            zoom: true,
            click: true,
            probeType: 3
          });
        } else {
          this.foodsScroll.refresh();
        }
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodListEl = document.getElementsByClassName('foods-list-hook');
        let height = 0;
        this.foodListHeight.push(height);
        for (let i = 0; i < foodListEl.length; i++) {
          height += foodListEl[i].clientHeight;
          this.foodListHeight.push(height);
        }
      },
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = document.getElementsByClassName('foods-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
      },
      showFoodDetail(food) {
        this.selectedFood = food;
        this.$refs.food.show();
      },
      drop(target) {
        this.$refs.shopcart.drop(target);
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/mixin.styl'
  .goods
    display: flex
    position: absolute
    left: 0
    right: 0
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .goods-item
        display: table
        width: 56px
        height: 54px
        padding: 0 12px
        line-height: 14px

        &.current
          background: #ffffff
          position: relative
          margin-top: -1px
          font-weight: 700
          color: #ff0000

          .next
            border-none()

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          font-weight: 300
          border-1px(rgba(7, 17, 27, 0.1))

          .title
            display: inline-block
            width: 12px
            height: 12px

            &.decrease
              bg-img('decrease_3')

            &.discount
              bg-img('discount_3')

            &.guarantee
              bg-img('guarantee_3')

            &.invoice
              bg-img('invoice_3')

            &.special
              bg-img('special_3')

    .foods-wrapper
      flex: 1

      .food-title
        background: #f3f5f7
        border-left: 2px solid #d9dde1
        padding-left: 14px
        height: 26px
        line-height: 26px
        font-size: 12px
        color: rgb(147, 153, 159)

      .food-item
        position: relative
        padding: 18px 0
        margin: 0 18px
        display: flex
        border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()

        .food-icon
          width: 60px
          height: 0
          padding-bottom: 60px
          position: relative

          img
            position: absolute
            top: 0
            left: 0
            width: 60px
            height: 60px

        .food-msg
          flex: 1
          margin-left: 10px

          .name
            margin-top: 2px
            ling-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .description
            width: 60px
            textOverflow()

          .description, .sell
            margin-top: 8px
            color: rgb(147, 153, 159)
            line-height: 10px
            font-size: 10px

          .sell
            .rating
              margin-left: 12px

          .price
            font-size: 10px
            font-weight: normal
            line-height: 24px

            .nowPrice
              color: rgb(240, 20, 20)

              .nowPriceNum
                font-size: 14px
                font-weight: 700

            .oldPrice
              margin-left: 8px
              color: rgb(147, 153, 159)
              text-decoration: line-through

              .oldPriceNum
                font-weight: 700

        .cartcontrol-wrapper
          position: absolute
          bottom: 18px
          right: 0
</style>
