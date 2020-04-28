<template>
  <div class="clipBoardBox">
    <div class="clipBoardBox_grid" :class="{ 'clipBoardBox_grid--noContent': !swInfo }">
      <div class="clipBoardBox_codeBox" v-if="swInfo">
        <code class="clipBoardBox_code" id="codeDiv">{{ swInfo }}</code>
        <textarea class="clipBoardBox_code--hide" id="codeToCopy" name="codeToCopy" v-model="swInfo"></textarea>
      </div>

      <button @click="copyContent"
              class="clipBoardBox_btn"
              id="copyBtn"
              type="button" v-if="swInfo">Copiar</button>
      <button @click="checkData"
              class="clipBoardBox_btn"
              id="checkSwInfoBtn"
              type="button" v-if="!swInfo">Buscar Dados</button>
    </div>

    <div class="loader" v-if="showLoader"></div>
  </div>
</template>

<script>
  export default {
    name: 'ClipBoard',
    computed: {},
    data() {
      return {
        swInfo: window.swInfo,
        showLoader: false
      }
    },
    methods: {
      checkData() {
        this.showLoader = true;

        if (window.swInfo) {
          this.swInfo = window.swInfo;
          this.showLoader = false;
        } else {
          window.setTimeout(this.checkData, 1500);
        }
      },
      async copyContent() {
        if (!navigator.clipboard) {
          this.copyContentFallback();
        } else {
          await navigator.clipboard.writeText(this.swInfo).then(() => {
            alert('Endpoint e chaves copiados');
          });
        }
      },
      copyContentFallback() {
        let copy = document.getElementById('codeToCopy');

        copy.focus();
        copy.select();
        document.execCommand('copy');
      },
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .clipBoardBox {
    &_grid {
      background-color: $color-gray2;
      align-items: center;
      display: flex;
      justify-content: space-between;
      padding: pxToRem(12);

      &--noContent {
        justify-content: center;

        .clipBoardBox_btn {
          width: pxToRem(164);
        }
      }
    }

    &_codeBox {
      padding: pxToRem(4) pxToRem(8);
      position: relative;
      overflow-x: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      @include calc(width, '100% - #{pxToRem(112)}', null);
    }

    &_code {
      &--hide {
        color: transparent;
        height: pxToRem(2);
        opacity: 0;
        position: absolute;
        width: pxToRem(2);
      }
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

    &--noContent {}
  }

  .loader {
    background-color: rgba($color-dark, .6);
    bottom: 0;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    &:before {
      animation: rotate .68s linear infinite;
      border: pxToRem(6) solid;
      border-color: $color-white $color-white transparent transparent;
      border-radius: 50%;
      content: '';
      display: inline-block;
      height: pxToRem(72);
      @include calc(margin-top, '((100vh - 3rem) / 2)', null);
      width: pxToRem(72);
    }
  }
</style>
