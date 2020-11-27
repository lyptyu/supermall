<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']"
                 @tabClick="tabClick"></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper"
import RecommendView from "@/views/home/childComps/RecommendView"
import FeatureView from "@/views/home/childComps/FeatureView"
import GoodsList from "@/components/content/goods/GoodsList"

import NavBar from "@/components/common/navbar/NavBar"
import TabControl from "@/components/content/tabControl/TabControl"

import {getHomeMultidata, getHomeGoods} from "network/home"


export default {
  name: "Home",
  components: {
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        "pop": {page: 0, list: []},
        "new": {page: 0, list: []},
        "sell": {page: 0, list: []},

      },
      currentType: "pop"
    }
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求数据
    this.getHomeMultidata()
    this.getHomeGoods("pop")
    this.getHomeGoods("new")
    this.getHomeGoods("sell")
  },
  methods: {
    /*
    * 事件监听相关方法
    * */

    tabClick(index) {
      switch (index) {
        case 0 :
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
    },
    /*
    * 网络请求相关方法
    * */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list
          }
      )
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 43px;
  z-index: 9;
}
</style>
