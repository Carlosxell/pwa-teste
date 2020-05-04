<template>
  <div class="page--home">
    <div v-if="this.getSwInfo.permission !== 'granted'">
      <p class="paragraph">Olá, bem vindo ao PWA <span class="error">99Leads</span>, por favor, autorize as notificações para estar sempre informado!</p>
      <button class="home_btnNotes"
              id="getNotifications"
              type="button"
              @click="getNotificationPermission">Autorizar notificações</button>
    </div>

    <div v-else>
      <p class="paragraph">Olá, bem vindo ao PWA <span class="error">99Leads</span>. Suas Notificações estão ativas atualmente.</p>
      <ClipBoard />
    </div>

    <p class="paragraph--sm error"
       v-if="!notificationSupport">Infelizmente seu browser não suporta notificações...</p>
  </div>
</template>

<script>
  import ClipBoard from '../components/ClipBoard';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Home',
    components: { ClipBoard },
    computed: {
      ...mapGetters(['getSwInfo']),
    },
    data() {
      return {
        notification: null,
        swInfo: window.swInfo,
        notificationSupport: !!('serviceWorker' in navigator && 'PushManager' in window),
      }
    },
    methods: {
      getNotificationPermission() {
        Notification.requestPermission().then(permission => {
          this.notification = permission;

          if (permission === 'granted') {
            this.$store.dispatch('setPermission', permission).then(() => {});
            window.location.reload(true);
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/css/_utilities/_exports';

  .home {
    &_btnNotes {
      background-color: lighten($color-gray, 12%);
      color: darken($color-dark, 8%);
      border: none;
      border-radius: pxToRem(4);
      cursor: pointer;
      font-size: pxToRem(14);
      font-weight: 700;
      max-width: pxToRem(292);
      margin-top: pxToRem(32);
      min-width: pxToRem(212);
      padding: pxToRem(12) pxToRem(18);
      width: 100%;
    }
  }

  .paragraph {
    font-size: pxToRem(24);

    &--sm {
      font-size: pxToRem(18);
    }
  }
</style>
