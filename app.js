
const app=document.getElementById('app');
const demo={student:{name:'Mariana López',id:'EA-0001',plan:'Mensualidad',valid:'30/09/2026',next:'$499',classes:[['Ballet','Lunes · 6:00 PM','Salón 2'],['Jazz','Miércoles · 5:00 PM','Salón 1'],['Hip Hop','Viernes · 5:00 PM','Salón 3']]},admin:{name:'Administradora'}};
const A='assets/';
function logo(){return `<img class="login-logo" src="${A}logo-empoderarte.png" alt="EmpoderArte Escuela de Danza">`}
function login(){
 app.innerHTML=`<main class="shell"><section class="screen login">
 ${logo()}<div class="login-tag">SUEÑA · BAILA · LOGRA</div>
 <div class="form">
  <div class="field"><label>NÚMERO DE ALUMNO O CORREO</label><div class="input-wrap"><span>♙</span><input id="email" type="text" placeholder="Correo electrónico"></div></div>
  <div class="field"><label>CONTRASEÑA</label><div class="input-wrap"><span>🔒</span><input id="pass" type="password" placeholder="••••••••"></div></div>
  <label class="remember"><input type="checkbox"> Recordarme</label>
  <button class="btn full" onclick="doLogin()">Iniciar sesión</button>
  <button class="link">¿Olvidaste tu contraseña?</button>
 </div></section></main>`;
}
function doLogin(){const v=(document.getElementById('email').value||'').toLowerCase();sessionStorage.role=v.includes('admin')?'admin':'student';render()}
function top(title,back=false){return `<header class="top">${back?`<button class="back" onclick="render('home')">‹</button>`:`<img class="brand-mini" src="${A}logo-empoderarte.png">`}<div class="top-title">${title}</div><button class="logout" onclick="logout()">Salir</button></header>`}
function nav(active){return `<nav class="bottom-nav">
 <button class="${active==='home'?'active':''}" onclick="render('home')"><span>⌂</span>Inicio</button>
 <button class="${active==='classes'?'active':''}" onclick="render('classes')"><span>▦</span>Clases</button>
 <button class="${active==='payments'?'active':''}" onclick="render('payments')"><span>▣</span>Pagos</button>
 <button class="${active==='profile'?'active':''}" onclick="render('profile')"><span>♙</span>Perfil</button>
 </nav>`}
function classImg(i){return `<img class="class-img" src="${A}fondo-bailarina.jpg" alt="">`}
function studentPage(page='home'){
 const s=demo.student; let body='';
 if(page==='home') body=`<section class="content">
  <div class="hero"><div class="header-user"><div><div class="eyebrow">ESCUELA DE DANZA</div><h1>¡Hola, ${s.name.split(' ')[0]}!</h1><p class="subtitle">Qué gusto verte en EmpoderArte</p></div><div class="avatar">M</div></div></div>
  <div class="menu-grid">
   <button class="glass menu-card" onclick="render('classes')"><span class="menu-icon">▦</span><b>Mis clases</b></button>
   <button class="glass menu-card" onclick="render('attendance')"><span class="menu-icon">✓</span><b>Asistencias</b></button>
   <button class="glass menu-card" onclick="render('payments')"><span class="menu-icon">▣</span><b>Mensualidad</b></button>
   <button class="glass menu-card" onclick="render('profile')"><span class="menu-icon">♙</span><b>Mi perfil</b></button>
  </div>
  <div class="glass membership">${classImg(0)}<div><span class="small">Membresía</span><strong>${s.plan}</strong><span class="small">Vigente hasta: ${s.valid}</span></div></div>
  <div class="pay-card glass"><div class="small">Próximo pago</div><div class="amount">${s.next}</div><div class="small">Vence el 30 de septiembre</div><button class="btn" onclick="render('payments')">Pagar ahora</button></div>
  <div class="section-title">Próximas clases</div>${s.classes.slice(0,2).map((c,i)=>`<div class="glass class-row">${classImg(i)}<div class="class-info"><b>${c[0]}</b><div>${c[1]} · ${c[2]}</div></div><span class="chev">›</span></div>`).join('')}
 </section>${nav('home')}`;
 if(page==='classes') body=`${top('Mis clases',true)}<section class="content"><div class="glass" style="padding:6px;display:grid;grid-template-columns:1fr 1fr;margin-bottom:12px"><button class="btn">Mi horario</button><button class="btn alt">Calendario</button></div><div class="section-title">Mi horario</div>${s.classes.map((c,i)=>`<div class="glass class-row">${classImg(i)}<div class="class-info"><b>${c[0]}</b><div>${c[1]}</div><div>${c[2]} · Prof. ${i===0?'Mariana':i===1?'Andrea':'Carlos'}</div></div><span class="chev">›</span></div>`).join('')}</section>${nav('classes')}`;
 if(page==='attendance') body=`${top('Asistencias',true)}<section class="content"><div class="stat-grid"><div class="glass stat"><div class="ring"><div><div class="num">18</div><div class="small">Asistencias</div></div></div></div><div class="glass stat"><div class="ring dark"><div><div class="num">2</div><div class="small">Faltas</div></div></div></div></div><div class="section-title">Septiembre 2026</div><div class="glass table-card"><table class="table"><tr><th>Fecha</th><th>Clase</th><th>Hora</th><th>Estado</th></tr><tr><td>23 Sep</td><td>Jazz</td><td>5:00 PM</td><td class="status-ok">●</td></tr><tr><td>22 Sep</td><td>Ballet</td><td>6:00 PM</td><td class="status-ok">●</td></tr><tr><td>20 Sep</td><td>Hip Hop</td><td>5:00 PM</td><td class="status-no">●</td></tr><tr><td>18 Sep</td><td>Contemporáneo</td><td>6:00 PM</td><td class="status-ok">●</td></tr><tr><td>16 Sep</td><td>Jazz</td><td>5:00 PM</td><td class="status-ok">●</td></tr></table></div><button class="btn action">▦ Escanear QR de clase</button></section>${nav('home')}`;
 if(page==='payments') body=`${top('Mensualidad / Pagos',true)}<section class="content"><div class="pay-card glass payment-summary"><div class="small">Mensualidad de septiembre 2026</div><div class="amount">$499</div><div class="small">Vencimiento: 30/09/2026</div><div style="margin-top:8px;font-weight:800">Pendiente de pago</div></div><div class="section-title">Selecciona tu forma de pago</div><button class="glass payment-method action" onclick="alert('Aquí conectaremos el pago con tarjeta.')"><span>▣</span><b>Tarjeta de crédito o débito　›</b></button><button class="glass payment-method action" onclick="alert('Aquí mostraremos los datos bancarios y carga de comprobante.')"><span>⌂</span><b>Transferencia bancaria　›</b></button><button class="glass payment-method action" onclick="alert('El administrador registrará el pago en efectivo.')"><span>▣</span><b>Efectivo en escuela　›</b></button><div class="section-title">¿Tienes un código de promoción?</div><div class="code-row"><input placeholder="Ingresar código"><button class="btn">Aplicar</button></div></section>${nav('payments')}`;
 if(page==='profile') body=`${top('Mi perfil',true)}<section class="content"><div class="glass profile"><div class="profile-avatar">M</div><h2>${s.name}</h2><div class="id">#${s.id}</div><div class="info-list"><div class="info"><i>♙</i><span>Fecha de nacimiento<br><b>12/03/2010</b></span></div><div class="info"><i>☎</i><span>Teléfono<br><b>55 1234 5678</b></span></div><div class="info"><i>✉</i><span>Correo<br><b>alumno@empoderarte.mx</b></span></div><div class="info"><i>▣</i><span>Membresía<br><b>${s.plan}</b></span></div><div class="info"><i>◷</i><span>Vigencia<br><b>${s.valid}</b></span></div></div><button class="btn action">Editar información</button></div></section>${nav('profile')}`;
 app.innerHTML=`<main class="shell"><div class="screen">${body}</div></main>`;
}
function adminPage(){app.innerHTML=`<main class="shell"><div class="screen">${top('Administración')}<section class="content"><div class="hero"><div class="eyebrow">PANEL ADMINISTRATIVO</div><h1>EmpoderArte</h1><p class="subtitle">Control general de la escuela</p></div><div class="stat-grid"><div class="glass stat"><div class="num gold">247</div><div class="small">Alumnos</div></div><div class="glass stat"><div class="num">183</div><div class="small">Asistencias hoy</div></div><div class="glass stat"><div class="num">$18,450</div><div class="small">Pagos recibidos</div></div><div class="glass stat"><div class="num">32</div><div class="small">Pendientes</div></div></div></section></div></main>`}
function render(page='home'){if(!sessionStorage.role)return login();if(sessionStorage.role==='admin')return adminPage();studentPage(page)}
function logout(){sessionStorage.clear();login()}
window.addEventListener('error',e=>{
  console.error('EmpoderArte:',e.error||e.message);
});
window.addEventListener('unhandledrejection',e=>{
  console.error('EmpoderArte:',e.reason);
});
try{
  render();
}catch(e){
  console.error('EmpoderArte error de inicio:',e);
  app.innerHTML='<main style="min-height:100vh;background:#050505;color:#fff;display:grid;place-items:center;padding:24px;text-align:center;font-family:system-ui"><div><h2>EmpoderArte</h2><p>No se pudo iniciar la aplicación.</p><button onclick="location.reload()" style="padding:12px 18px;border-radius:10px">Recargar</button></div></main>';
}
