<template>
  <div class="menu">
    <div class="menu_content">
      <div class="menu_item" :key="ind" v-for="(item, ind) in listIcons">
        <svg class="menu_icon icon--md">
          <use :xlink:href="`#${ item.icon.id }`"></use>
        </svg>

        <span class="menu_text">{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import icon_construction from '../assets/img/svg/construction.svg?sprite'
  import icon_content from '../assets/img/svg/content.svg?sprite'
  import icon_contract from '../assets/img/svg/contract.svg?sprite'
  import icon_idea from '../assets/img/svg/idea.svg?sprite'
  import icon_marketing from '../assets/img/svg/marketing.svg?sprite'
  import icon_prototype from '../assets/img/svg/prototype.svg?sprite'
  import icon_share from '../assets/img/svg/share.svg?sprite'
  import icon_statistics from '../assets/img/svg/statistics.svg?sprite'
  import icon_teamManagement from '../assets/img/svg/team-management.svg?sprite'
  import { mapGetters } from 'vuex';

  export default {
    name: 'Menu',
    computed: {
      ...mapGetters(['getMenuStatus', 'getMenuInfo']),
    },
    data() {
      return {
        listIcons: [{
          id: 1,
          text: '',
          icon: icon_teamManagement,
        }, {
          id: 2,
          text: '',
          icon: icon_construction,
        }, {
          id: 3,
          text: '',
          icon: icon_content,
        }, {
          id: 4,
          text: '',
          icon: icon_contract,
        }, {
          id: 5,
          text: '',
          icon: icon_idea,
        }, {
          id: 6,
          text: '',
          icon: icon_marketing,
        }, {
          id: 7,
          text: '',
          icon: icon_prototype,
        }, {
          id: 8,
          text: '',
          icon: icon_share,
        }, {
          id: 9,
          text: '',
          icon: icon_statistics,
        }],
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
    background-color: $color-white;
    position: fixed;
    transition: left .2s linear;
    height: 100vh;
    left: pxToRem(-300);
    top: 0;
    width: pxToRem(292);
    z-index: 12;

    &_content {
      @include scrollbars(pxToRem(6), $color-black);
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
      width: 100%;
    }

    &_item {
      cursor: pointer;
      margin-bottom: pxToRem(12);
      padding: pxToRem(4) pxToRem(8);
    }

    &_link {}

    &_icon {}

    &_text {}
  }
</style>
