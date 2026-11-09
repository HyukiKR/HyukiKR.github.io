// 작은 화면: 카테고리 메뉴 열고 닫기
(function () {
  var btn = document.querySelector('.menu-btn');
  var side = document.getElementById('sidebar');
  if (!btn || !side) return;
  btn.addEventListener('click', function () {
    var open = side.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
})();

// 검색 페이지
(function () {
  var list = document.getElementById('search-results');
  if (!list || !window.SEARCH_INDEX_URL) return;
  var input = document.getElementById('search-q');
  var status = document.getElementById('search-status');
  var posts = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function snippet(text, word) {
    var i = text.toLowerCase().indexOf(word);
    if (i < 0) return '';
    var start = Math.max(0, i - 40);
    return (start > 0 ? '…' : '') + text.slice(start, i + 80) + '…';
  }

  function run() {
    var q = input.value.trim().toLowerCase();
    var url = q ? '?q=' + encodeURIComponent(q) : location.pathname;
    history.replaceState(null, '', url);
    if (!q) { list.innerHTML = ''; status.textContent = ''; return; }
    if (!posts) { status.textContent = '불러오는 중…'; return; }

    var words = q.split(/\s+/);
    var hits = posts.filter(function (p) {
      var hay = (p.title + ' ' + p.tags.join(' ') + ' ' + p.summary + ' ' + p.text).toLowerCase();
      return words.every(function (w) { return hay.indexOf(w) !== -1; });
    });

    status.textContent = '"' + input.value.trim() + '" 검색 결과 ' + hits.length + '개';
    list.innerHTML = hits.map(function (p) {
      var inTitle = p.title.toLowerCase().indexOf(words[0]) !== -1;
      var extra = p.summary || (inTitle ? '' : snippet(p.text, words[0]));
      return '<li><p class="meta"><time>' + esc(p.date) + '</time> <span class="cat ' +
        (p.kind === '개발일지' ? 'cat-devlog' : 'cat-study') + '">' + esc(p.kind) + '</span>' +
        (p.tags.length ? ' ' + esc(p.tags.join(', ')) : '') + '</p>' +
        '<a href="' + esc(p.url) + '">' + esc(p.title) + '</a>' +
        (extra ? '<p>' + esc(extra) + '</p>' : '') + '</li>';
    }).join('');
  }

  var initial = new URLSearchParams(location.search).get('q');
  if (initial) input.value = initial;

  fetch(window.SEARCH_INDEX_URL)
    .then(function (r) { return r.json(); })
    .then(function (data) { posts = data; run(); })
    .catch(function () { status.textContent = '검색 목록을 불러오지 못했어요. 페이지를 새로고침해 보세요.'; });

  input.addEventListener('input', run);
  input.closest('form').addEventListener('submit', function (e) { e.preventDefault(); run(); });
  input.focus();
})();
