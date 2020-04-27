<template>
  <div class="page--home">
    <div v-if="checkNotifications">
      <p class="paragraph">Olá, bem vindo ao PWA <span class="error">99Leads</span>, por favor, autorize as notificações abaixo para estar sempre informado!</p>

      <button class="home_btnNotes" type="button"
              @click="getNotificationPermission">Autorizar notificações</button>
    </div>

    <p class="paragraph" v-else>Olá, bem vindo ao PWA <span class="error">99Leads</span>. Suas Notificações estão ativas atualmente.</p>

    <p class="paragraph--sm error"
       v-if="!notificationSupport">Infelizmente seu browser não suporta notificações...</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
  computed: {
    checkNotifications: () => {
      let check = !!('serviceWorker' in navigator && 'PushManager' in window);

      if(!check) return false;
      return Notification.permission === 'denied' || Notification.permission === 'default';
    }
  },
  data() {
    return {
      notificationSupport: !!('serviceWorker' in navigator && 'PushManager' in window),
    }
  },
  methods: {
    getNotificationPermission() {
      Notification.requestPermission().then(permission => {
        console.info(permission, 'resultado');

        if(!('permission' in Notification)) {
          Notification.permission = permission;
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
