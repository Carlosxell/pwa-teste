<template>
  <div class="banner">
    <p class="banner_text">Você está acessando a conta blarghhhh | Antes de alterar qualquer informação, verifique se está acessando a conta correta.</p>
  </div>
</template>

<script>
  export default {
    name: "Banner",
    created() {
      const body = document.querySelector('body');
      body.classList.add('banner--active');
    },
    beforeDestroy() {
      const body = document.querySelector('body');
      body.classList.remove('banner--active');
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports.scss';

  .banner {
    background-color: $color-yellow;
    left: 0;
    position: fixed;
    top: 0;
    right: 0;

    &_text {
      font-size: pxToRem(14);
      text-align: center;
    }
  }
</style>
