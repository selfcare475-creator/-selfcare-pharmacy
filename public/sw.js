importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDWnqH3oR9IkxarG-pW9za4dHZVsJ5-qBI",
  authDomain: "self-care-487ca.firebaseapp.com",
  projectId: "self-care-487ca",
  storageBucket: "self-care-487ca.firebasestorage.app",
  messagingSenderId: "555397036454",
  appId: "1:555397036454:web:83f472588229bbee76b767"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  const title = (payload.notification && payload.notification.title) || "طلب جديد";
  const body = (payload.notification && payload.notification.body) || "وصل طلب جديد";
  self.registration.showNotification(title, {
    body: body,
    icon: "icon-192.png",
    badge: "icon-192.png",
    vibrate: [200,100,200],
    tag: "sc-order-"+Date.now()
  });
});

self.addEventListener("message", (e)=>{ if(e.data==="skipWaiting") self.skipWaiting(); });
self.addEventListener("install", ()=> self.skipWaiting());
self.addEventListener("activate", (e)=> e.waitUntil(self.clients.claim()));

self.addEventListener("notificationclick", function(event){
  event.notification.close();
  event.waitUntil(clients.matchAll({type:"window"}).then(function(list){
    for(const c of list){ if("focus" in c) return c.focus(); }
    if(clients.openWindow) return clients.openWindow("./");
  }));
});
