
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
};

export async function ensurePushSubscribed({ apiSubscribe }) {
  if (!("serviceWorker" in navigator)) return { ok: false, reason: "NO_SW" };
  if (!("PushManager" in window)) return { ok: false, reason: "NO_PUSH" };

  //SW 등록
  const reg = await navigator.serviceWorker.register("/sw.js");

  //권한 요청
  const perm = await Notification.requestPermission();
  if (perm !== "granted") return { ok: false, reason: "DENIED" };

  //기존 구독 있으면 재사용
  let sub = await reg.pushManager.getSubscription();

  if (!sub) {
    const publicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
    if (!publicKey) return { ok: false, reason: "NO_VAPID_KEY" };

    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  }

  // 백엔드로 저장
  const json = sub.toJSON();
  await apiSubscribe(json);

  return { ok: true };
}
