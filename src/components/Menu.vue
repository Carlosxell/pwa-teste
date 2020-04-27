<template>
  <div class="menu">
    <div class="menu_content">
      <div class="menu_item menu_item--menu" @click="openCloseMenu">
        <svg class="menu_icon icon--sm">
          <use :xlink:href="`#${icon_menu.id}`"></use>
        </svg>
      </div>

      <div class="menu_item">
        <svg class="menu_icon icon--md">
          <use :xlink:href="`#${icon_construction.id}`"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  import icon_menu from '../assets/img/svg/menu.svg?sprite'
  import icon_construction from '../assets/img/svg/construction.svg?sprite'
  import { mapGetters } from 'vuex';

  export default {
    name: 'Menu',
    computed: {
      ...mapGetters(['getMenuStatus', 'getMenuInfo']),
    },
    data() {
      return {
        icon_menu,
        icon_construction,
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

  .menu {
    background-color: lighten($color-gray, 35%);
    position: fixed;
    transition: width .2s linear, height .2s linear;
    @include calc(height, '100vh - #{pxToRem(60)}', null);
    top: pxToRem(60);
    width: pxToRem(64);
    z-index: 10;

    &_content {
      text-align: center;
      width: 100%;
    }

    &_item {
      cursor: pointer;
      margin-bottom: pxToRem(12);

      &--menu {
        cursor: pointer;
        padding: pxToRem(12);

        &:hover,
        &:focus {
          cursor: pointer;
        }

        .menu_icon {
          fill: $color-black;
        }
      }
    }

    &_icon {}

    &_link {}
  }
</style>
