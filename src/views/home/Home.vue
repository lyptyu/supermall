<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tab-control"
        v-show="isTabFixed"
    ></tab-control>
    <scroll
        class="content"
        ref="scroll"
        :probe-type="3"
        @scroll="contentScroll"
        :pull-up-load="true"
        @pullingUp="loadMore"
    >
      <home-swiper
          :banners="banners"
          @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "@/views/home/childComps/HomeSwiper";
import RecommendView from "@/views/home/childComps/RecommendView";
import FeatureView from "@/views/home/childComps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";

import {getHomeMultidata, getHomeGoods} from "network/home";
import {debounce} from "@/common/utils";
import {itemListenerMixin, backTopMixin} from "@/common/mixin";

export default {
  name: "Home",
  mixins: [itemListenerMixin, backTopMixin],
  components: {
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []},
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //请求数据
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听item中图片加载完成
  },
  mounted() {
    // //图片加载完成事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 200)
    // //保存监听的事件
    // this.itemImgListener= () => {
    //   // this.$refs.scroll.refresh()
    //   refresh()
    // }
    // this.$bus.$on("itemImageLoad",this.itemImgListener)
    // // console.log(this.saveY + 'mounted')
  },
  methods: {
    /*
     * 事件监听相关方法
     * */
    //防抖函数
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      //判断BackTop是否显示
      this.isShowBackTop = -position.y > 1000 ? true : false;
      //决定tabControl是否吸顶(position:fixed)
      this.listenShowBackTop(position)
      this.isTabFixed = -position.y > this.tabOffsetTop ? true : false
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /*
     * 网络请求相关方法
     * */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.refresh();
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  activated() {
    // console.log(this.goods)
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // console.log(this.$refs.scroll.getScrollY)
    //保存y值
    this.saveY = this.$refs.scroll.getScrollY();
    //取消全局事件的监听
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/
}

.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;

  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}

/*.content{*/
/*  margin-top: 44px;*/
/*  height: calc(100% - 44px - 49px);*/
/*  overflow: hidden;*/
/*}*/
</style>
