/**
 * WattWhy LK — client-side behaviour
 * Sections: menu, mockup languages, tariff engine + calculator, FAQ,
 * pilot form, modals, scroll effects.
 */
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initMockupLanguages();
  initCalculator();
  initFaq();
  initPilotForm();
  initModals();
  initScrollReveal();
  initSpotlight();
  initScrollUi();
});

const $ = (id) => document.getElementById(id);
const fmt = (n) => n.toLocaleString('en-US');

/* ---------- 1. Mobile menu ---------- */
function initMobileMenu() {
  const btn = $('mobileMenuBtn');
  const menu = $('mobileMenu');
  if (!btn || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', String(open));
  };

  btn.addEventListener('click', () => setOpen(menu.classList.contains('hidden')));
  menu.querySelectorAll('.mobile-link').forEach((a) => a.addEventListener('click', () => setOpen(false)));
}

/* ---------- 2. Phone mockup: EN / සිංහල / தமிழ் ---------- */
const MOCKUP_TEXT = {
  en: {
    'app-header-sub': 'Colombo 05 Residence',
    'app-header-title': 'Monthly Bill Tracker',
    'app-card-curr-label': 'Current Metered Spend',
    'app-card-curr-val': 'Rs. 6,770',
    'app-card-proj-label': 'Projected Bill',
    'app-card-proj-val': 'Rs. 9,690',
    'app-breakdown-title': 'Where the Watts Went This Week',
    'app-appliance-ac': 'Master Bedroom AC',
    'app-appliance-ref': 'Inverter Refrigerator',
    'app-appliance-heater': 'Water Heater (Hardwired)'
  },
  si: {
    'app-header-sub': 'කොළඹ 05 නිවස',
    'app-header-title': 'මාසික විදුලි බිල්පත් වාර්තාව',
    'app-card-curr-label': 'මේ දක්වා වියදම',
    'app-card-curr-val': 'රු. 6,770',
    'app-card-proj-label': 'මාසික පුරෝකථනය',
    'app-card-proj-val': 'රු. 9,690',
    'app-breakdown-title': 'වැඩිපුරම විදුලිය වැය වූ උපකරණ',
    'app-appliance-ac': 'ප්‍රධාන කාමරයේ AC යන්ත්‍රය',
    'app-appliance-ref': 'ඉන්වර්ටර් ශීතකරණය',
    'app-appliance-heater': 'වතුර හීටරය (Hardwired)'
  },
  ta: {
    'app-header-sub': 'கொழும்பு 05 இல்லம்',
    'app-header-title': 'மாதாந்திர மின்கட்டண விபரம்',
    'app-card-curr-label': 'தற்போதைய செலவு',
    'app-card-curr-val': 'ரூ. 6,770',
    'app-card-proj-label': 'கணிக்கப்பட்ட கட்டணம்',
    'app-card-proj-val': 'ரூ. 9,690',
    'app-breakdown-title': 'அதிக மின்சாரம் பயன்படுத்தியவை',
    'app-appliance-ac': 'முக்கிய படுக்கையறை AC',
    'app-appliance-ref': 'இன்வெர்ட்டர் குளிர்சாதன பெட்டி',
    'app-appliance-heater': 'நீர் சூடாக்கி (வயர் இணைப்பு)'
  }
};

// These two contain markup, so they are set as HTML (static strings only).
const MOCKUP_HTML = {
  en: {
    'app-tier-warning-desc': '⚠️ Crossing 180 units adds <strong>+Rs. 500</strong> in fixed charge and raises the rate to <strong>Rs. 65/unit</strong>.',
    'app-action-tip': '<strong>Smart Tip:</strong> Set the AC timer to switch off at 5:00 AM to stay below 180 units and save <strong>Rs. 1,170</strong>.'
  },
  si: {
    'app-tier-warning-desc': '⚠️ ඒකක 180 ඉක්මවුවහොත් ස්ථාවර ගාස්තුව <strong>+රු. 500</strong>කින් සහ ඒකක ගාස්තුව <strong>රු. 65</strong> දක්වා ඉහළ යයි.',
    'app-action-tip': '<strong>ස්මාර්ට් උපදෙස:</strong> AC යන්ත්‍රය පාන්දර 5:00 ට ක්‍රියා විරහිත කිරීමෙන් ඒකක 180 ට අඩුවෙන් රැඳී <strong>රු. 1,170ක්</strong> ඉතිරි කරගන්න.'
  },
  ta: {
    'app-tier-warning-desc': '⚠️ 180 அலகுகளை கடந்தால் நிலையான கட்டணம் <strong>+ரூ. 500</strong> மற்றும் அலகு கட்டணம் <strong>ரூ. 65</strong> ஆக அதிகரிக்கும்.',
    'app-action-tip': '<strong>ஸ்மார்ட் குறிப்பு:</strong> AC ஐ காலை 5:00 மணிக்கு அணைப்பதன் மூலம் 180 அலகுகளுக்குள் இருந்து <strong>ரூ. 1,170</strong> சேமிக்கலாம்.'
  }
};

function initMockupLanguages() {
  const tabs = document.querySelectorAll('.lang-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const lang = tab.dataset.lang;
      tabs.forEach((t) => {
        const on = t === tab;
        t.classList.toggle('active', on);
        t.classList.toggle('text-slate-400', !on);
      });
      Object.entries(MOCKUP_TEXT[lang]).forEach(([id, text]) => { if ($(id)) $(id).textContent = text; });
      Object.entries(MOCKUP_HTML[lang]).forEach(([id, html]) => { if ($(id)) $(id).innerHTML = html; });
    });
  });
}

/* ---------- 3. Tariff engine + What-If calculator ---------- */
// Sri Lankan domestic block tariff (illustrative rates used across the page).
const TARIFF = {
  low: { // up to 60 units/month
    blocks: [[30, 12], [30, 20]],
    fixed: (u) => (u <= 30 ? 180 : 360)
  },
  regular: { // above 60 units/month
    blocks: [[60, 30], [30, 37], [30, 42], [60, 50], [Infinity, 65]],
    fixed: (u) => (u <= 90 ? 650 : u <= 120 ? 1000 : u <= 180 ? 1500 : 2000)
  }
};

function calculateBill(units) {
  units = Math.max(0, Math.round(units));
  const plan = units <= 60 ? TARIFF.low : TARIFF.regular;
  let remaining = units;
  let energy = 0;
  for (const [size, rate] of plan.blocks) {
    const used = Math.min(remaining, size);
    energy += used * rate;
    remaining -= used;
    if (remaining <= 0) break;
  }
  return energy + plan.fixed(units);
}

function tierNoteHtml(title, detail) {
  return `
    <p class="font-semibold text-indigo-700">✓ ${title}</p>
    <p class="text-[11px] text-slate-600 leading-snug mt-1">${detail}</p>`;
}

function initCalculator() {
  const ac = $('acHours');
  const base = $('baseUnits');
  const fridge = $('fridgeDefrost');
  if (!ac || !base) return;

  function update() {
    const acHours = parseFloat(ac.value);
    const baseUnits = parseInt(base.value, 10);

    $('acHoursDisplay').textContent = acHours === 0 ? '0 Hours' : `${acHours} Hours Less`;
    $('baseUnitsDisplay').textContent = `${baseUnits} Units`;

    const kwhSaved = Math.round(acHours * 0.9 * 30 + (fridge && fridge.checked ? 15 : 0));
    const newUnits = Math.max(10, baseUnits - kwhSaved);
    const saving = Math.max(0, calculateBill(baseUnits) - calculateBill(newUnits));

    $('savingsRupees').textContent = fmt(saving);
    $('savingsAnnual').textContent = `Rs. ${fmt(saving * 12)}`;

    const note = $('tariffTierNote');
    if (baseUnits > 180 && newUnits <= 180) {
      note.innerHTML = tierNoteHtml('Dropped below the 180-unit cliff!',
        'Cuts the fixed charge by <strong>Rs. 500</strong> and avoids the <strong>Rs. 65/unit</strong> top rate.');
    } else if (baseUnits > 120 && newUnits <= 120) {
      note.innerHTML = tierNoteHtml('Dropped into the 91–120 block!',
        'Fixed charge falls to <strong>Rs. 1,000</strong> and your top unit rate drops to <strong>Rs. 42</strong>.');
    } else if (kwhSaved === 0) {
      note.innerHTML = tierNoteHtml('Move a slider to see your saving.',
        'Try cutting AC hours or tidying up your fridge.');
    } else {
      note.innerHTML = tierNoteHtml(`Saving about ${kwhSaved} units every month.`,
        'WattWhy block warnings alert you before you creep back up.');
    }
  }

  [ac, base].forEach((el) => el.addEventListener('input', update));
  if (fridge) fridge.addEventListener('change', update);
  update();
}

/* ---------- 4. FAQ accordion (one open at a time) ---------- */
function initFaq() {
  const items = document.querySelectorAll('#faqAccordion .faq-item');
  items.forEach((item) => {
    const btn = item.querySelector('button');
    const panel = item.querySelector('p');
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      items.forEach((other) => {
        other.querySelector('button').setAttribute('aria-expanded', 'false');
        other.querySelector('p').classList.add('hidden');
      });
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
      }
    });
  });
}

/* ---------- 5. Pilot form ---------- */
function initPilotForm() {
  const form = $('pilotForm');
  const success = $('formSuccess');
  const submit = $('submitBtn');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submit.disabled = true;
    submit.textContent = 'Processing application…';

    // Demo only: replace with a real request (fetch to your backend / form service).
    setTimeout(() => {
      submit.classList.add('hidden');
      success.classList.remove('hidden');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
      form.reset();
    }, 900);
  });
}

/* ---------- 6. Modals ---------- */
function initModals() {
  const modals = [
    { modal: $('privacyModal'), open: $('openPrivacyModal'), close: $('closePrivacyModal') },
    { modal: $('termsModal'), open: $('openTermsModal'), close: $('closeTermsModal') }
  ];

  const setOpen = (modal, open) => {
    modal.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  modals.forEach(({ modal, open, close }) => {
    if (!modal) return;
    if (open) open.addEventListener('click', () => setOpen(modal, true));
    if (close) close.addEventListener('click', () => setOpen(modal, false));
    modal.addEventListener('click', (e) => { if (e.target === modal) setOpen(modal, false); });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') modals.forEach(({ modal }) => modal && setOpen(modal, false));
  });
}

/* ---------- 7. Scroll reveal ---------- */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('revealed'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  els.forEach((el) => io.observe(el));
}

/* ---------- 8. Cursor spotlight on cards ---------- */
function initSpotlight() {
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - r.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - r.top}px`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--mouse-x', '-500px');
      card.style.setProperty('--mouse-y', '-500px');
    });
  });
}

/* ---------- 9. Progress bar, sticky header, back-to-top ---------- */
function initScrollUi() {
  const bar = $('scrollProgress');
  const top = $('backToTop');
  const header = $('mainHeader');

  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 20);
    if (bar && max > 0) bar.style.width = `${Math.min(100, (y / max) * 100)}%`;
    if (top) top.classList.toggle('show', y > 450);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (top) top.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
