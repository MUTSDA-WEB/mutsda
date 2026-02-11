import Ax from "./helpers/axios";

async function pingBackend() {
  try {
    const res = await Ax.get('/');
    // expose result in console and return it
    // eslint-disable-next-line no-console
    console.log('backend response:', res.data);
    return res.data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('ping failed', err?.message || err);
    throw err;
  }
}

// Expose for easy testing in browser console
window.pingBackend = pingBackend;

export { pingBackend };
