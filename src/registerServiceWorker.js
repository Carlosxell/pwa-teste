/* eslint-disable no-console */
import { register } from 'register-service-worker'

window.swInfo = null;
const applicationServerPublicKey = 'BKkjVFJgOEY76v5Z3CDZ7slT2Z7oCGIO8-fqJg4jcaSXiJvu04WSzXFUWszlvF-opmlanekBhrgkjeSotTTHNB4';
let permission = Notification.permission;
let swInfo;

function urlB64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let ind = 0; ind < rawData.length; ++ind) {
    outputArray[ind] = rawData.charCodeAt(ind);
  }
  return outputArray;
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    async ready (swReg) {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )

      if (permission === 'granted') {
        await swReg.pushManager.getSubscription().then(result => {
          window.swInfo = JSON.stringify(result);
          swInfo = new CustomEvent('swInfo', { detail: JSON.stringify(result) });
          window.dispatchEvent(swInfo);
          console.info('resultado de cache', JSON.stringify(result));
        });
      }
    },
    async registered (swReg) {
      const serverKey = urlB64ToUint8Array(applicationServerPublicKey);

      console.log(swReg, '\nService worker has been registered.');

      if (permission === 'granted') {
        await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: serverKey,
        }).then(res => {
          window.swInfo = JSON.stringify(res);
          swInfo = new CustomEvent('swInfo', { detail: JSON.stringify(res) });
          window.dispatchEvent(swInfo);
          console.info('Foi sobreescrito: \n', JSON.stringify(res));
        });
      }

      self.addEventListener('push', (event) => {
        let { data } = event;
        const options = {
          body: data.notification.body,
          icon: data.notification.icon,
          badge: data.notification.badge
        };
        const notificationPromisse = self.registration.showNotification(data.title, options);

        console.info(data, 'push options');

        event.waitUntil(notificationPromisse);
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
