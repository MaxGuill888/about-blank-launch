// sw.js : affiche une notification quand le serveur envoie un push (sans contenu)
// Si tu as déjà un sw.js, fusionne seulement les deux écouteurs ci-dessous.

self.addEventListener('push', event => {
  event.waitUntil(
    self.registration.showNotification('Nouveau message', {
      body: 'Tu as reçu un message sur about:blank',
      tag: 'about-blank-msg',
      renotify: true,
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list =>
      list.length ? list[0].focus() : clients.openWindow('./')
    )
  );
});
