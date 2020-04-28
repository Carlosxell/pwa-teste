<template>
  <div class="clipBoardBox">
    <div class="clipBoardBox_grid">
      <div class="clipBoardBox_codeBox">
        <code class="clipBoardBox_code" id="codeToCopy">{{ swInfo }}</code>
      </div>
      <button class="clipBoardBox_btn" id="copyBtn" type="button">Copiar</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ClipBoard',
    computed: {
      swInfo() {
        return window.swInfo;
      }
    },
    data() {
      return {
        dataSw: window.swInfo
      }
    },
    methods: {
      copyContent() {},
      copyContentFallback() {},
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .clipBoardBox {
    &_grid {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    &_codeBox {
      overflow-x: scroll;
      padding: pxToRem(4) pxToRem(8);
      @include scrollbars(pxToRem(8), $color-dark);
      @include calc(width, '100% - #{pxToRem(112)}', null);
    }

    &_code {
    }

    &_btn {
      background-color: lighten($color-gray, 12%);
      color: darken($color-dark, 8%);
      border: none;
      border-radius: pxToRem(4);
      cursor: pointer;
      font-size: pxToRem(14);
      font-weight: 700;
      padding: pxToRem(12) pxToRem(18);
      width: pxToRem(92);
    }
  }
</style>
