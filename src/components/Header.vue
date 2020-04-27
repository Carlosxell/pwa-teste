<template>
  <header class="header">
    <div class="header_content">
      <figure class="header_logoBox">
        <img class="header_logoBox_img" src="../assets/img/logo.svg" alt="Logo site" />
      </figure>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports.scss';

  .header {
    background-color: $color-gray;
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

    &_logoBox {
      height: pxToRem(52);
      display: inline-block;
      width: pxToRem(192);

      &_img {
        height: 100%;
        max-width: 100%;
      }
    }
  }
</style>
