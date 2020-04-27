<template>
  <svg class="menu_icon icon--md">
    <use :xlink:href="`#${icon_menu.id}`"></use>
  </svg>
</template>

<script>
  import icon_menu from '../assets/img/svg/menu.svg?sprite'
  import icon_construction from '../assets/img/svg/construction.svg?sprite'

  export default {
    name: "SvgIcon",
    data() {
      return {
        icon_menu,
        icon_construction,
      }
    },
    props: {
      dataIcon: {
        type: String,
        default: () => `#${icon_construction.id}`
      }
    }
  }
</script>

<style scoped>

</style>
