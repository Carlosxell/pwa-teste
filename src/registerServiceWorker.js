/* eslint-disable no-console */
import { register } from 'register-service-worker'

window.swInfo = null;
const applicationServerPublicKey = 'BKkjVFJgOEY76v5Z3CDZ7slT2Z7oCGIO8-fqJg4jcaSXiJvu04WSzXFUWszlvF-opmlanekBhrgkjeSotTTHNB4';

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
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered (swReg) {
      const serverKey = urlB64ToUint8Array(applicationServerPublicKey);
      let isSubScribed = null;

      console.log(swReg, '\nService worker has been registered.');

      swReg.pushManager.getSubscription().then(result => {
        isSubScribed = result;
        window.swInfo = result;
      });

      if (isSubScribed === null) {
        swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: serverKey,
        }).then(res => {
          window.swInfo = JSON.stringify(res);
          console.info('Foi sobreescrito: \n', JSON.stringify(res));
        });
      }

      if (Notification.permission === 'granted') {
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
      }
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
