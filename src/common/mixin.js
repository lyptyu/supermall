import { debounce } from "./utils";
export const itemListenerMixin = {
  data(){
    return {
      itemImgListener: null,
      refresh:null
    };
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  }
};
