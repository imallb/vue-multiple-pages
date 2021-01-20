<template>
  <div id="app">
    <div class="swipe">
      <mt-swipe :show-indicators="banner.length > 1" :auto="4000">
        <mt-swipe-item v-for="(item, i) in banner" :key="i">
          <img :src="item.image" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="list-box">
      <div class="list-title" data-locale="list title"></div>
      <div class="list-main">
        <a class="item" v-for="(item, i) in list" :key="i" :href="item.url">
          <span>
            <img :src="item.icon" />
          </span>
          <p>{{ $t(item.text) }}</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// import { adppDanner } from "@/apis/common";
export default {
  name: "App",
  data() {
    return {
      userInfo: {},
      banner: [],
      list: [
        {
          icon: require("@/assets/images/dapp/dapp-list_01.png"),
          text: "list.i001",
          url: "https://egg.fmchain.cc/#/?" + new Date().getTime()
        },
        {
          icon: require("@/assets/images/dapp/dapp-list_02.png"),
          text: "list.i002",
          url: "./develop.html?name="
        },
        {
          icon: require("@/assets/images/dapp/dapp-list_03.png"),
          text: "list.i003",
          url: "./develop.html?name="
        },
        {
          icon: require("@/assets/images/dapp/dapp-list_04.png"),
          text: "list.i004",
          url: "./develop.html?name="
        },
        {
          icon: require("@/assets/images/dapp/dapp-list_05.png"),
          text: "list.i005",
          url: "./develop.html?name="
        }
      ]
    };
  },
  mounted() {
    // this.getBanner();
  },
  methods: {
    // getBanner() {
    //   adppDanner({type: 5}).then(data => {
    //       console.log(data)
    //   })
    // }
  }
};
</script>
