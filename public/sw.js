self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    data = { title: "YESOD", body: event.data.text() };
  }

  const title = data.title || "YESOD";
  const options = {
    body: data.body || "",
    data: {
      url: "/board", // 알림클릭 시 이동
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification?.data?.url || "/board";

  event.waitUntil(
    (async () => {
      const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });

      // 이미 열린 탭이 있으면 포커스랑 이동
      for (const client of allClients) {
        if ("focus" in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      // 없으면 ->> 새로 열기
      if (clients.openWindow) return clients.openWindow(url);
    })()
  );
});
