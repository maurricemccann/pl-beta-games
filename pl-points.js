/* PL points reporter — playing earns the climb.
   Captures ?ptk= (minted by /api/games/launch on the main site), keeps it for the tab,
   and reports one play per game per day after real engagement (20s with the page visible).
   The server enforces the true rules: 5 points a play, 25 a day. Hub pages never award. */
(function () {
  var API = 'https://psychedluxuries.com/api/games/points';
  try {
    var params = new URLSearchParams(window.location.search);
    var ptk = params.get('ptk') || '';
    if (ptk) { sessionStorage.setItem('pl_ptk', ptk); }
    else { ptk = sessionStorage.getItem('pl_ptk') || ''; }
    if (!ptk) return; // not launched from an account — play free, no points
    var game = (window.location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
    if (!game || game === 'index' || game === 'games') return;
    var day = new Date().toISOString().slice(0, 10);
    var key = 'pl_played_' + game + '_' + day;
    if (localStorage.getItem(key)) return;
    var elapsed = 0, REQUIRED = 20;
    var timer = setInterval(function () {
      if (document.hidden) return;
      elapsed++;
      if (elapsed >= REQUIRED) {
        clearInterval(timer);
        localStorage.setItem(key, '1');
        fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: ptk, game: game })
        }).catch(function () {});
      }
    }, 1000);
  } catch (e) { /* points are a gift, never a crash */ }
})();
