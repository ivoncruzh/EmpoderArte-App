const app = document.getElementById("app");

const demo = {
  student: {
    name: "Mariana López",
    id: "EA-0001",
    plan: "Paquete Mensual",
    valid: "30/09/2026",
    classes: [
      ["Jazz", "5:00 PM - 6:00 PM", "Salón 1 · Prof. Andrea"],
      ["Ballet", "6:00 PM - 7:00 PM", "Salón 2 · Prof. Mariana"],
      ["Hip Hop", "5:00 PM - 6:00 PM", "Salón 3 · Prof. Carlos"],
      ["Contemporáneo", "6:00 PM - 7:00 PM", "Salón 1 · Prof. Andrea"]
    ]
  }
};

const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[c]));

function logo(cls = "logo-large") {
  return `<img class="${cls}" src="assets/logo.png" alt="EmpoderArte Escuela de Danza">`;
}

function login() {
  app.innerHTML = `
    <main class="shell login-wrap">
      <section class="login-card">
        ${logo()}
        <div class="login-brand">Escuela de Danza</div>
        <div class="field">
          <span class="ico">♙</span>
          <input id="email" type="text" placeholder="Número de alumno o correo" autocomplete="username">
        </div>
        <div class="field">
          <span class="ico">▣</span>
          <input id="pass" type="password" placeholder="Contraseña" autocomplete="current-password">
        </div>
        <label class="remember"><input id="remember" type="checkbox"> Recordarme</label>
        <button class="btn full" id="loginBtn">Iniciar sesión</button>
        <p class="forgot">¿Olvidaste tu contraseña?</p>
        <div class="slogan">SUEÑA <span>•</span> BAILA <span>•</span> LOGRA</div>
      </section>
    </main>`;
  document.getElementById("loginBtn").addEventListener("click", doLogin);
}

function doLogin() {
  const email = (document.getElementById("email").value || "").trim().toLowerCase();
  sessionStorage.setItem("role", email.includes("admin") ? "admin" : "student");
  render("home");
}

function top(title = "", back = false) {
  return `
    <header class="top">
      ${back
        ? `<button class="back" id="backBtn" aria-label="Regresar">‹</button>`
        : `<div class="brand-mini">${logo("brand-mini-logo")}</div>`}
      <h1>${esc(title)}</h1>
      <button class="icon-btn" id="noticeBtn" aria-label="Avisos">◆</button>
    </header>`;
}

function nav(active) {
  const items = [
    ["home", "⌂", "Inicio"],
    ["classes", "♫", "Clases"],
    ["payments", "$", "Pagos"],
    ["notices", "◆", "Avisos"],
    ["more", "•••", "Más"]
  ];
  return `<nav class="nav">${items.map(([id, icon, text]) => `
    <button class="${active === id ? "active" : ""}" data-page="${id}">
      <span class="ni">${icon}</span><span>${text}</span>
    </button>`).join("")}</nav>`;
}

function shell(body, active = "home", title = "", back = false) {
  return `<main class="shell screen"><div class="screen-bg"></div>${top(title, back)}${body}${nav(active)}</main>`;
}

function bindShell() {
  document.querySelectorAll("[data-page]").forEach((button) => {
    button.addEventListener("click", () => render(button.dataset.page));
  });
  const back = document.getElementById("backBtn");
  if (back) back.addEventListener("click", () => render("home"));
  const notice = document.getElementById("noticeBtn");
  if (notice) notice.addEventListener("click", () => render("notices"));
}

function home() {
  const s = demo.student;
  return shell(`
    <section class="content home-content">
      <div class="welcome"><p class="eyebrow">EMPODERARTE</p><h1>¡Hola, ${esc(s.name.split(" ")[0])}!</h1><p>Qué bueno verte de nuevo</p></div>
      <div class="quick-grid">
        <button class="quick" data-page="classes"><span class="qicon">♫</span><span>Clases</span></button>
        <button class="quick" data-page="schedule"><span class="qicon">◷</span><span>Mi horario</span></button>
        <button class="quick" data-page="schedule"><span class="qicon">▦</span><span>Calendario</span></button>
        <button class="quick" data-page="payments"><span class="qicon">$</span><span>Pagos</span></button>
        <button class="quick" data-page="notices"><span class="qicon">◆</span><span>Avisos</span></button>
        <button class="quick" data-page="more"><span class="qicon">•••</span><span>Más</span></button>
      </div>
      <section class="section">
        <div class="section-head"><h2>Próxima clase</h2><button data-page="classes">Ver todas</button></div>
        <div class="card schedule-card">
          <img class="thumb" src="assets/dancer-bg.jpg" alt="">
          <div class="item-main"><strong>Jazz</strong><small>Hoy · 5:00 PM - 6:00 PM</small><small>Salón 1 · Prof. Andrea</small></div>
          <span class="arrow">›</span>
        </div>
      </section>
    </section>`, "home");
}

function classes() {
  const cards = demo.student.classes.map((c) => `
    <div class="card class-card">
      <img class="thumb" src="assets/dancer-bg.jpg" alt="">
      <div class="item-main"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p><p>${esc(c[2])}</p></div><span class="arrow">›</span>
    </div>`).join("");
  return shell(`<section class="content"><div class="tabs"><button class="active">Todas</button><button>Infantil</button><button>Juvenil</button><button>Adultos</button></div>${cards}</section>`, "classes", "Clases", true);
}

function schedule() {
  const days = Array.from({length:31}, (_,i)=>i+1).map(d =>
    `<div class="day ${[9,13,16,20,23,27,30].includes(d)?"mark":""} ${d===6?"selected":""}">${d}</div>`).join("");
  return shell(`<section class="content">
    <div class="tabs"><button>Mi horario</button><button class="active">Calendario</button></div>
    <div class="card calendar"><div class="month"><button class="round">‹</button><strong>Octubre 2026</strong><button class="round">›</button></div>
    <div class="week"><div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div><div>DOM</div></div>
    <div class="days">${days}</div></div>
    <div class="card schedule-card"><img class="thumb" src="assets/dancer-bg.jpg" alt=""><div class="item-main"><strong>Jazz</strong><small>5:00 PM - 6:00 PM</small><small>Salón 1 · Prof. Andrea</small></div><span class="arrow">›</span></div>
  </section>`, "classes", "Mi horario", true);
}

function payments() {
  const items = [["▣","Realizar un pago","Paga tu mensualidad o inscripción"],["▤","Historial de pagos","Consulta tus pagos realizados"],["▣","Métodos de pago","Tarjetas y opciones disponibles"],["▤","Comprobantes","Descarga tus recibos"]];
  return shell(`<section class="content">${items.map(([i,t,d])=>`<div class="card payment-item"><span class="round-icon">${i}</span><div class="item-main"><strong>${t}</strong><small>${d}</small></div><span class="arrow">›</span></div>`).join("")}</section>`,"payments","Pagos",true);
}

function notices() {
  const items = [["!","Suspensión de clases","12 de octubre, 2026 · El lunes 12 no habrá clases por día festivo."],["★","Inicio de temporada","5 de octubre, 2026 · Ya estamos en temporada de presentaciones."],["▦","Junta informativa","30 de septiembre, 2026 · Reunión con padres de familia."]];
  return shell(`<section class="content"><div class="tabs"><button class="active">Todos</button><button>Generales</button><button>Eventos</button></div>${items.map(([i,t,d])=>`<div class="card notice-item"><span class="round-icon">${i}</span><div class="item-main"><strong>${t}</strong><small>${d}</small></div><span class="arrow">›</span></div>`).join("")}</section>`,"notices","Avisos",true);
}

function profile() {
  const s=demo.student;
  return shell(`<section class="content profile"><img class="avatar" src="assets/dancer-bg.jpg" alt=""><h2>${esc(s.name)}</h2><div class="gold">ALUMNA</div>
  <div class="card payment-item"><span class="round-icon">♙</span><div class="item-main"><strong>Número de alumno</strong><small>${esc(s.id)}</small></div></div>
  <div class="card payment-item"><span class="round-icon">✉</span><div class="item-main"><strong>Correo</strong><small>alumno@empoderarte.mx</small></div></div>
  <div class="card payment-item"><span class="round-icon">⌕</span><div class="item-main"><strong>Grupo</strong><small>Jazz Intermedio</small></div></div></section>`,"more","Mi perfil",true);
}

function more() {
  return shell(`<section class="content">
    <div class="card more-item"><span class="round-icon">♙</span><div class="item-main"><strong>${esc(demo.student.name)}</strong><small>Alumno · ${esc(demo.student.id)}</small></div></div>
    <div class="card more-item" data-page="profile"><span class="round-icon">♙</span><div class="item-main"><strong>Mi perfil</strong><small>Consulta y actualiza tus datos</small></div><span class="arrow">›</span></div>
    <div class="card more-item"><span class="round-icon">▤</span><div class="item-main"><strong>Mis documentos</strong><small>Documentos de inscripción</small></div><span class="arrow">›</span></div>
    <div class="card more-item"><span class="round-icon">▣</span><div class="item-main"><strong>Credencial</strong><small>Tu credencial digital</small></div><span class="arrow">›</span></div>
    <div class="card more-item"><span class="round-icon">⚙</span><div class="item-main"><strong>Configuración</strong><small>Preferencias de la aplicación</small></div><span class="arrow">›</span></div>
    <button class="btn full" id="logoutBtn">Cerrar sesión</button>
  </section>`,"more","Más",true);
}

function admin() {
  return `<main class="shell screen"><div class="screen-bg"></div>${top("Administración")}<section class="content">
  <div class="card stat"><div class="muted">Alumnos</div><div class="big gold">247</div></div>
  <div class="card stat"><div class="muted">Asistencias hoy</div><div class="big">183</div></div>
  <div class="card stat"><div class="muted">Pagos recibidos</div><div class="big">$18,450</div></div>
  <button class="btn full" id="logoutBtn">Cerrar sesión</button></section></main>`;
}

function logout(){sessionStorage.clear();login();}

function render(page="home"){
  if(!sessionStorage.getItem("role")) return login();
  if(sessionStorage.getItem("role")==="admin"){
    app.innerHTML=admin();
    document.getElementById("logoutBtn")?.addEventListener("click",logout);
    bindShell(); return;
  }
  const pages={home,classes,schedule,payments,notices,more,profile};
  app.innerHTML=(pages[page]||home)();
  bindShell();
  document.getElementById("logoutBtn")?.addEventListener("click",logout);
}

window.addEventListener("error",(e)=>{
  console.error("EmpoderArte:", e.error || e.message);
});
render();
