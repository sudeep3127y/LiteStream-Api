const CACHE = {};

async function increaseViewCount(referer) {
  try {
    let website = referer;

    if (referer) {
      try {
        website = new URL(referer).origin;
      } catch (e) {
        console.log(e);
      }
    }

    console.log(website);

    if (CACHE[website]) {
      CACHE[website]++;
    } else {
      CACHE[website] = 1;
    }

    if (CACHE[website] < 10) {
      return;
    }

    const url = 'https://statsapi-production-871f.up.railway.app/increaseViews';
    await fetch(url, { headers: { 'Referer': website } });

    CACHE[website] = 0;
  } catch (e) {
    console.log(e);
  }
}