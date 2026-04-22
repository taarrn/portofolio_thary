/* ===== CURSOR ===== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});
(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(loop);
})();

/* ===== NAV ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  const ids = ['biodata','skills','projects','contact'];
  let cur = '';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 130) cur = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.classList.toggle('active-link', a.getAttribute('href') === '#' + cur)
  );
});

function toggleDrawer() {
  document.getElementById('navDrawer').classList.toggle('open');
  document.getElementById('navToggle').classList.toggle('open');
}
function closeDrawer() {
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('navToggle').classList.remove('open');
}



/* ===== SKILLS PROGRESS BAR ANIMATION ===== */
function animateSkills() {
  const bars = document.querySelectorAll('.skill-bar');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => observer.observe(bar));
}

/* ===== INIT ===== */
animateSkills();

/* ===== EMAIL MODAL ===== */
function openEmailModal() {
  document.getElementById('emailModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeEmailModal(e) {
  if (e && e.target !== document.getElementById('emailModal')) return;
  document.getElementById('emailModal').classList.remove('open');
  document.body.style.overflow = '';
}

function sendEmail() {
  const name    = document.getElementById('emailName').value.trim();
  const subject = document.getElementById('emailSubject').value.trim();
  const body    = document.getElementById('emailBody').value.trim();
  const notice  = document.getElementById('emailNotice');

  if (!name)    { showEmailNotice('⚠ Tulis namamu dulu ya!', false); return; }
  if (!subject) { showEmailNotice('⚠ Subjeknya belum diisi!', false); return; }
  if (!body)    { showEmailNotice('⚠ Pesannya kosong nih!', false); return; }

  const fullBody = `Halo Thary,\n\nPerkenalkan, nama saya ${name}.\n\n${body}`;
  const mailto = `mailto:tharynabila2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`;
  window.location.href = mailto;

  showEmailNotice('✓ Membuka aplikasi email kamu...', true);
}

function showEmailNotice(msg, success) {
  const el = document.getElementById('emailNotice');
  el.textContent = msg;
  el.className = 'email-notice' + (success ? ' success' : '');
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('emailModal').classList.remove('open');
    document.body.style.overflow = '';
  }
});
