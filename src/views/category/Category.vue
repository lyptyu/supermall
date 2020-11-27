<template>
  <div class="wrapper">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>分列列表1</li>
      <li>分列列表2</li>
      <li>分列列表3</li>
      <li>分列列表4</li>
      <li>分列列表5</li>
      <li>分列列表6</li>
      <li>分列列表7</li>
      <li>分列列表8</li>
      <li>分列列表9</li>
      <li>分列列表10</li>
      <li>分列列表11</li>
      <li>分列列表12</li>
      <li>分列列表13</li>
      <li>分列列表14</li>
      <li>分列列表15</li>
      <li>分列列表16</li>
      <li>分列列表17</li>
      <li>分列列表18</li>
      <li>分列列表19</li>
      <li>分列列表20</li>
      <li>分列列表21</li>
      <li>分列列表22</li>
      <li>分列列表23</li>
      <li>分列列表24</li>
      <li>分列列表25</li>
      <li>分列列表26</li>
      <li>分列列表27</li>
      <li>分列列表28</li>
      <li>分列列表29</li>
      <li>分列列表30</li>
      <li>分列列表31</li>
      <li>分列列表32</li>
      <li>分列列表33</li>
      <li>分列列表34</li>
      <li>分列列表35</li>
      <li>分列列表36</li>
      <li>分列列表37</li>
      <li>分列列表38</li>
      <li>分列列表39</li>
      <li>分列列表40</li>
      <li>分列列表41</li>
      <li>分列列表42</li>
      <li>分列列表43</li>
      <li>分列列表44</li>
      <li>分列列表45</li>
      <li>分列列表46</li>
      <li>分列列表47</li>
      <li>分列列表48</li>
      <li>分列列表49</li>
      <li>分列列表50</li>
      <li>分列列表51</li>
      <li>分列列表52</li>
      <li>分列列表53</li>
      <li>分列列表54</li>
      <li>分列列表55</li>
      <li>分列列表56</li>
      <li>分列列表57</li>
      <li>分列列表58</li>
      <li>分列列表59</li>
      <li>分列列表60</li>
      <li>分列列表61</li>
      <li>分列列表62</li>
      <li>分列列表63</li>
      <li>分列列表64</li>
      <li>分列列表65</li>
      <li>分列列表66</li>
      <li>分列列表67</li>
      <li>分列列表68</li>
      <li>分列列表69</li>
      <li>分列列表70</li>
      <li>分列列表71</li>
      <li>分列列表72</li>
      <li>分列列表73</li>
      <li>分列列表74</li>
      <li>分列列表75</li>
      <li>分列列表76</li>
      <li>分列列表77</li>
      <li>分列列表78</li>
      <li>分列列表79</li>
      <li>分列列表80</li>
      <li>分列列表81</li>
      <li>分列列表82</li>
      <li>分列列表83</li>
      <li>分列列表84</li>
      <li>分列列表85</li>
      <li>分列列表86</li>
      <li>分列列表87</li>
      <li>分列列表88</li>
      <li>分列列表89</li>
      <li>分列列表90</li>
      <li>分列列表91</li>
      <li>分列列表92</li>
      <li>分列列表93</li>
      <li>分列列表94</li>
      <li>分列列表95</li>
      <li>分列列表96</li>
      <li>分列列表97</li>
      <li>分列列表98</li>
      <li>分列列表99</li>
      <li>分列列表100</li>
    </ul>
  </div>

</template>

<script>
import BScroll from "better-scroll"

export default {
  name: "Category",
  data() {
    return {
      scroll: null
    }
  },
  created() {
    // this.scroll = new BScroll('.wrapper',{
    //
    // })
  },
  mounted() {
    this.scroll = new BScroll(".wrapper", {
      probeType: 3,
      pullUpLoad: true
    })

    this.scroll.on("scroll", position => {
      // console.log(position)
    })
    this.scroll.on("pullingUp", () => {
      console.log("上拉加载更多")
    })
  },
  methods:{
    btnClick(){
      console.log('------')
    }
  }

}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;


}
</style>
