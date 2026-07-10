/* PL GAME DATA — the shared spine. Every game calls this to be REAL:
   real archive pieces (R2 manifest), real voice-clean seeds (D1), the live Oracle (RAG),
   and saved progress (D1, per signed-in member; localStorage fallback when signed out).
   Load before a game's own script: <script src="pl-game-data.js"></script> */
(function () {
  var CRON = 'https://pl-cron.psychedluxuries.com';
  var MANIFEST = 'https://pub-4420dc4349624d6bbed7eb9555f42661.r2.dev/manifest.json';
  var _pieces = null, _loading = null;

  function ptk() {
    try { return new URLSearchParams(location.search).get('ptk') || sessionStorage.getItem('pl_ptk') || ''; }
    catch (e) { return ''; }
  }

  function loadArchive() {
    if (_pieces) return Promise.resolve(_pieces);
    if (_loading) return _loading;
    _loading = fetch(MANIFEST)
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var arr = Array.isArray(d) ? d : (d.pieces || d.items || d.works || []);
        _pieces = arr.filter(function (p) { return p && (p.url || p.image || p.thumb); });
        return _pieces;
      })
      .catch(function () { _pieces = []; return _pieces; });
    return _loading;
  }

  function pick(arr) { return arr && arr.length ? arr[Math.floor(Math.random() * arr.length)] : null; }

  function randomPiece() { return loadArchive().then(function (p) { return pick(p); }); }
  function randomPieces(n) {
    return loadArchive().then(function (p) {
      var copy = p.slice(), out = [];
      for (var i = 0; i < n && copy.length; i++) out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
      return out;
    });
  }
  function piecesBy(field, value) {
    return loadArchive().then(function (p) {
      return p.filter(function (x) { return String(x[field] || '').toLowerCase() === String(value).toLowerCase(); });
    });
  }

  function seeds(n) {
    return fetch(CRON + '/api/game/seeds?n=' + (n || 1))
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.seeds) || []; })
      .catch(function () { return []; });
  }
  function seed() { return seeds(1).then(function (s) { return s[0] || null; }); }

  function oracle(q) {
    return fetch(CRON + '/api/oracle', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: q })
    })
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && (d.answer || d.response || d.text || d.message)) || ''; })
      .catch(function () { return ''; });
  }

  function lsave(game, data) { try { localStorage.setItem('plgs_' + game, JSON.stringify(data)); } catch (e) {} }
  function lload(game) { try { return JSON.parse(localStorage.getItem('plgs_' + game) || 'null'); } catch (e) { return null; } }

  function save(game, data) {
    lsave(game, data); // always keep a local copy
    var token = ptk();
    if (!token) return Promise.resolve(false);
    return fetch(CRON + '/api/game/state', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token, game: game, data: data })
    }).then(function () { return true; }).catch(function () { return false; });
  }
  function load(game) {
    var token = ptk();
    if (!token) return Promise.resolve(lload(game));
    return fetch(CRON + '/api/game/state?token=' + encodeURIComponent(token) + '&game=' + encodeURIComponent(game))
      .then(function (r) { return r.json(); })
      .then(function (d) { return (d && d.data != null) ? d.data : lload(game); })
      .catch(function () { return lload(game); });
  }

  window.PLGames = {
    loadArchive: loadArchive,
    randomPiece: randomPiece,
    randomPieces: randomPieces,
    piecesBy: piecesBy,
    seeds: seeds,
    seed: seed,
    oracle: oracle,
    save: save,
    load: load,
    signedIn: function () { return !!ptk(); },
    manifestURL: MANIFEST
  };
})();
