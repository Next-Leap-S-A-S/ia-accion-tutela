(function () {
  const stage = document.getElementById("stage");
  const slides = [...document.querySelectorAll(".slide")];
  const bar = document.getElementById("progress"), counter = document.getElementById("counter");
  let i = 0;
  function ir(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach((s, k) => s.classList.toggle("active", k === i));
    bar.style.width = ((i + 1) / slides.length) * 100 + "%";
    counter.textContent = `${i + 1} / ${slides.length}`;
    history.replaceState(null, "", "#" + (i + 1));
  }
  function escalar() { stage.style.transform = `translate(-50%,-50%) scale(${Math.min(innerWidth / 1600, innerHeight / 900)})`; }
  addEventListener("resize", escalar);
  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) { if (e.target.closest("a")) return; e.preventDefault(); ir(i + 1); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(e.key)) { e.preventDefault(); ir(i - 1); }
    else if (e.key === "Home") ir(0);
    else if (e.key === "End") ir(slides.length - 1);
    else if (e.key.toLowerCase() === "f") { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); }
  });
  let x0 = null, deslizo = false;
  addEventListener("touchstart", (e) => { x0 = e.touches[0].clientX; deslizo = false; }, { passive: true });
  addEventListener("touchend", (e) => { if (x0 === null) return; const d = e.changedTouches[0].clientX - x0; if (Math.abs(d) > 40) { deslizo = true; ir(i + (d < 0 ? 1 : -1)); } x0 = null; }, { passive: true });
  addEventListener("click", (e) => { if (deslizo || e.target.closest("a") || String(getSelection())) return; ir(i + (e.clientX < innerWidth / 3 ? -1 : 1)); });
  addEventListener("hashchange", () => ir((parseInt(location.hash.slice(1), 10) || 1) - 1));
  escalar();
  ir((parseInt(location.hash.slice(1), 10) || 1) - 1);
})();
