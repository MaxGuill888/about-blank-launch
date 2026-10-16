// sw.js : affiche une notification quand le serveur envoie un push
// Le contenu (nom de l'expéditeur + aperçu) arrive chiffré depuis le worker.

self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; }
  catch (e) { try { data = { body: event.data.text() }; } catch (e2) {} }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Nouveau message', {
      body: data.body || 'Tu as reçu un message sur about:blank',
      tag: data.tag || 'about-blank-msg',
      renotify: true,
      data: { kind: data.kind || null, convId: data.convId || null },
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
