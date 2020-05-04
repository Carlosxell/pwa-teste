<template>
  <div class="app" id="app">
    <Header />
    <Menu />

    <div class="main">
      <div class="contentBox">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import Menu from './components/Menu'
import { mapGetters } from "vuex";
// import Banner from './components/Banner'

export default {
  components: { Header, Menu },
  data() {
    return {
      sw: null,
    }
  },
  computed: {
    ...mapGetters(['getSwInfo']),
  },
  beforeCreate() {
    this.sw = window.swInfo;

    if(Notification) {
      this.$store.dispatch('setPermission', Notification.permission).then(() => {});
    }
  },
  created: function () {
    window.addEventListener('resize',this.windowResize);
    window.addEventListener('swInfo',this.swInfChange);
  },
  destroyed: function () {
    window.removeEventListener('resize', this.windowResize);
    window.removeEventListener('swInfo', this.swInfChange);
  },
  methods: {
    swInfChange (val) {
      this.$store.dispatch('setSwInfo', val.detail).then(() => false);
    },
    windowResize () {
      let sizes = { h: window.innerHeight, w: window.innerWidth };
      this.$store.dispatch('resizeWindow', sizes).then(() => false);
    },
  },
  watch: {
    sw(newObj, oldObj) {
      if(newObj !== null) {
        this.$store.dispatch('setSwInfo', newObj).then(() => false);
      }
    }
  }
}
</script>

<style lang="scss">
  @import './assets/css/app.scss';
</style>
