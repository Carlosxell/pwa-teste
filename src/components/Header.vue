<template>
  <header class="header">
    <div class="header_content">
      <button class="header_menuBtn" @click="openCloseMenu" type="button">
        <svg class="header_menuBtn_icon icon">
          <use :xlink:href="`#${icon_menu.id}`"></use>
        </svg>
      </button>

      <figure class="header_logoBox">
        <img class="header_logoBox_img" src="../assets/img/logo.svg" alt="Logo site" />
      </figure>
    </div>
  </header>
</template>

<script>
  import icon_menu from '../assets/img/svg/menu.svg?sprite'
  import { mapGetters } from "vuex";

  export default {
    name: 'Header',
    computed: {
      ...mapGetters(['getMenuStatus', 'getMenuInfo']),
    },
    data() {
      return {
        icon_menu,
      }
    },
    methods: {
      openCloseMenu() {
        let menuInfo = { open: !this.getMenuStatus };
        this.$store.dispatch('menuStatus', menuInfo).then(() => {});
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports.scss';

  .header {
    background-color: $color-dark;
    // altura do header
    height: pxToRem(60);
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 12;

    &_content {
      align-items: center;
      display: flex;
      height: 100%;
      padding: 0 pxToRem(12);
    }

    &_menuBtn {
      background-color: transparent;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      line-height: 0;
      height: pxToRem(42);
      position: relative;
      outline: none;
      transition: background-color .15s linear;
      width: pxToRem(42);

      &_icon {
        fill: darken($color-white, 12%);
        padding: pxToRem(2);
      }

      &:hover,
      &:focus {
        background-color: lighten($color-dark, 4%);
        outline: none;
      }

      &:before {
        background-color: transparent;
        content: '';
        display: inline-block;
        height: pxToRem(2);
        left: pxToRem(-2);
        position: fixed;
        transition: background-color .15s linear, width .15s linear, left .15s linear, right .15s linear;
        transform-origin: left top;
        top: pxToRem(-2);
        will-change: top, left, right, width, height, background-color;
        width: pxToRem(2);
      }
    }

    &_logoBox {
      height: pxToRem(52);
      display: inline-block;
      margin-left: auto;
      width: pxToRem(192);

      &_img {
        height: 100%;
        max-width: 100%;
      }
    }
  }
</style>
