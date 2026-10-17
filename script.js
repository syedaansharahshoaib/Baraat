/* =====================================================
   EDIT YOUR DETAILS HERE
   ===================================================== */
   const INVITE = {
    bride: "Syeda Ansharah Shoaib",
    groom: "Hamza Shakeel",
    brideParents: "Daughter of late Hafiz Syed Muhammad Shoaib",
    groomParents: "Son of Abdul Shakeel",
    dateISO: "2026-11-13T18:00:00",
    dateText: "Friday, 13th November 2026",
    timeText: "8:00 PM",
    venue: "Shayan Banquet & Lawn",
    address: "PAF Plot #2, Shaheed-e-Millat Flyover, Baloch Colony, Karachi-75350.",
    mapLink: "https://maps.app.goo.gl/XuwAqfj7vmtuDHSUA?g_st=aw",
    rsvpNote: "Kindly let us know you're joining the baraat",
    rsvpWhatsApp: "923000000000",
    schedule: [
      { t: "8:00 PM", h: "Baraat Arrival", p: "The groom's procession arrives with dhol and dance." },
      { t: "9:00 PM", h: "Welcome & Milni", p: "Families greet each other with warmth." },
      { t: "10:00 PM", h: "Dinner", p: "A grand feast for all our guests." },
      { t: "11:30 PM", h: "Rukhsati", p: "A tearful, beautiful farewell." }
    ]
  };
  
  const $ = id => document.getElementById(id);
  const initial = value => (value.trim()[0] || "?").toUpperCase();
  $("n-bride").textContent = INVITE.bride;
  $("n-groom").textContent = INVITE.groom;
  $("p-bride").textContent = INVITE.brideParents;
  $("p-groom").textContent = INVITE.groomParents;
  $("mono-b").textContent = initial(INVITE.bride);
  $("mono-g").textContent = initial(INVITE.groom);
  $("date-line").textContent = INVITE.dateText;
  $("d-date").textContent = INVITE.dateText;
  $("d-time").textContent = INVITE.timeText;
  $("d-venue").textContent = INVITE.venue;
  $("d-address").textContent = INVITE.address;
  // Map embed — build iframe src from venue+address, link goes to original mapLink
  (function(){
    const wrap = document.getElementById("map-wrap");
    const frame = document.getElementById("map-frame");
    if (!wrap || !frame) return;
    const q = encodeURIComponent(INVITE.venue + " " + INVITE.address);
    frame.src = "https://maps.google.com/maps?q=" + q + "&output=embed&z=16";
    wrap.href = INVITE.mapLink;
  })();
  $("rsvp-note").textContent = INVITE.rsvpNote;
  $("foot-names").textContent = `${INVITE.bride} & ${INVITE.groom}`;
  
  $("timeline").innerHTML = INVITE.schedule
    .map(e => `<li><time>${e.t}</time><h5>${e.h}</h5><p>${e.p}</p></li>`).join("");
  
  /* ---------- shared envelope opening ---------- */
  const envelope = $("envelope");
  function openInvite() {
    if (envelope.classList.contains("open")) return;
    envelope.classList.add("open");
    fireworks(innerWidth / 2, innerHeight * .4);
    setTimeout(() => fireworks(innerWidth * .25, innerHeight * .3), 350);
    setTimeout(() => fireworks(innerWidth * .75, innerHeight * .35), 700);
    $("card").classList.remove("hidden");
    setTimeout(() => {
      $("intro").classList.add("gone");
      document.body.classList.remove("locked");
      window.scrollTo(0, 0);
      const audio = new Audio("assets/baraat.mp3");
      audio.loop = true;
      audio.volume = 0.7;
      audio.play().catch(() => {});
      reveal();
    }, matchMedia("(prefers-reduced-motion: reduce)").matches ? 100 : 2550);
  }
  envelope.addEventListener("click", openInvite);
  
  /* ---------- reveal ---------- */
  function reveal() {
    const els = document.querySelectorAll(".reveal,.timeline li");
    els.forEach((el, i) => el.style.setProperty("--d", (i % 4) * .12 + "s"));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: .2 });
    els.forEach(el => io.observe(el));
  }
  
  /* ---------- countdown ---------- */
  const target = new Date(INVITE.dateISO).getTime();
  const cd = { d: $("c-d"), h: $("c-h"), m: $("c-m"), s: $("c-s") };
  function tick() {
    const diff = Math.max(0, target - Date.now());
    const v = { d: Math.floor(diff / 864e5), h: Math.floor(diff % 864e5 / 36e5), m: Math.floor(diff % 36e5 / 6e4), s: Math.floor(diff % 6e4 / 1e3) };
    for (const k in v) {
      const t = String(v[k]).padStart(2, "0");
      if (cd[k].textContent !== t) {
        cd[k].textContent = t;
        cd[k].classList.remove("tick"); void cd[k].offsetWidth; cd[k].classList.add("tick");
      }
    }
  }
  tick(); setInterval(tick, 1000);
  
  /* ---------- fireworks / confetti ---------- */
  const cv = $("fx"), ctx = cv.getContext("2d");
  let W, H, sparks = [];
  function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight; }
  resize(); addEventListener("resize", resize);
  const PAL = ["#ffd45e", "#ff5a73", "#ffffff", "#ff9d2e", "#d3213f", "#f0d390"];
  function fireworks(x, y) {
    const n = 90, c1 = PAL[(Math.random() * PAL.length) | 0];
    for (let i = 0; i < n; i++) {
      const a = (Math.PI * 2 / n) * i, sp = 2 + Math.random() * 5;
      sparks.push({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 80 + Math.random() * 40, max: 120,
        c: Math.random() < .6 ? c1 : PAL[(Math.random() * PAL.length) | 0], r: 1.5 + Math.random() * 2 });
    }
  }
  function confetti() {
    for (let i = 0; i < 140; i++) {
      sparks.push({ x: Math.random() * W, y: -10, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 4,
        life: 200, max: 200, c: PAL[(Math.random() * PAL.length) | 0], r: 3, rect: true, rot: Math.random() * 6 });
    }
  }
  $("celebrate").addEventListener("click", () => {
    confetti();
    for (let i = 0; i < 4; i++) setTimeout(() => fireworks(Math.random() * W, Math.random() * H * .5 + 40), i * 280);
  });
  addEventListener("pointerdown", e => { if ($('intro').classList.contains('gone')) return; fireworks(e.clientX, e.clientY); });
  
  function loop() {
    ctx.clearRect(0, 0, W, H);
    sparks.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (!p.rect) { p.vy += .06; p.vx *= .985; } else { p.rot += .1; p.vx += Math.sin(p.rot) * .05; }
      p.life--;
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.c;
      if (p.rect) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillRect(-p.r, -p.r * 1.6, p.r * 2, p.r * 3.2); ctx.restore(); }
      else { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
    sparks = sparks.filter(p => p.life > 0 && p.y < H + 20);
    requestAnimationFrame(loop);
  }
  loop();
  
