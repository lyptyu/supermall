<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll"
          class="check-button"
          @click.native="checkClick"
      />
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <div class="calculate" @click="clacClick">
      去结算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton"

import {mapGetters} from "vuex"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return "¥" + this.cartList.filter(item => item.checked).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.cartList.filter(item => !item.checked).length)
      if (this.cartList.length === 0) return false
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      } else {
        this.cartList.forEach(item => item.checked = true)
      }

    },
    clacClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择商品")
      } else {
        this.$toast.show("进入结算页面")
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;


  height: 40px;
  line-height: 40px;


  background-color: #eee;
  font-size: 14px;
}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background: red;
  color: #fff;
  text-align: center;
}
</style>