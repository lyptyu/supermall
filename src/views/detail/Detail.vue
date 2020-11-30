<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar"
import DetailSwiper from "@/views/detail/childComps/DetailSwiper"
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo"
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo"

import {getDetail,Goods,Shop} from "@/network/detail"

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      topImages:[],
      goods: {},
      shop:{}
    }
  },
  created() {
    //保存传入的iid
    this.iid=this.$route.params.iid
    //根据iid请求详情数据
    getDetail(this.iid).then(res=>{
      console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages
      //获取商品信息
      this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //获取店铺信息的对象
      this.shop= new Shop(data.shopInfo)
    })

  }
}
</script>

<style scoped>

</style>