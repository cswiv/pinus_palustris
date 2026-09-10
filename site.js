/* Dark-mode toggle. Follows system preference on first visit, then remembers the choice.
   Storage is wrapped in try/catch: some browsers block localStorage on file:// or in sandboxed frames. */
(function () {
  function read()  { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function write(v){ try { localStorage.setItem('theme', v); } catch (e) {} }

  var saved = read();
  var dark = saved ? saved === 'dark'
                   : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (dark) document.body.classList.add('dark');

  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  function label() { btn.textContent = document.body.classList.contains('dark') ? 'light mode' : 'dark mode'; }
  label();
  btn.addEventListener('click', function () {
    var on = document.body.classList.toggle('dark');
    write(on ? 'dark' : 'light');
    label();
  });
})();
