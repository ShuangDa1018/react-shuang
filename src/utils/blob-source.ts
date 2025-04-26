const cacheName = 'rs-cache';
let cache: Cache | null = null;
window.caches.open(cacheName).then((res) => {
  console.log('Opened cache', res);
  cache = res;
});

export const getBlobUrl = (src: string): Promise<string> => {
  return new Promise((resolve) => {
    cache?.match(src).then((res) => {
      if (res) {
        res.blob().then((blobUrl) => {
          resolve(URL.createObjectURL(blobUrl));
        });
      } else {
        fetch(src)
          .then((res) => {
            cache?.put(src, res);
            return res.blob();
          })
          .then((myBlob) => {
            resolve(URL.createObjectURL(myBlob));
          })
          .catch(() => {
            resolve(src);
          });
      }
    });
  });
};
