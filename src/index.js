/* =========================================================
   Guest List Manager with categories, timestamps & editing
   ========================================================= */

// ----- DOM refs -----
const form           = document.querySelector('#guest-form');
const input          = document.querySelector('#guest-input');
const categorySelect = document.querySelector('#category-select');
const guestListEl    = document.querySelector('#guest-list');
const counterEl      = document.querySelector('#counter');

// ----- State -----
const guests = []; // each guest: {name, category, attending, addedAt}

// ----- Helpers -----
const formatTimestamp = ms =>
  new Date(ms).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

function renderCounter() {
  counterEl.textContent = `${guests.length} / 10 spots taken`;
}

function buildGuestItem(guest, index) {
  // container
  const li = document.createElement('li');
  if (guest.attending) li.classList.add('attending');

  // left‑side info (name + badge + time)
  const infoWrap = document.createElement('div');
  infoWrap.style.flex = '1'; // use flex space

  const nameSpan = document.createElement('span');
  nameSpan.className = 'name';
  nameSpan.textContent = guest.name;

  const badge = document.createElement('span');
  badge.className = `badge ${guest.category.toLowerCase()}`;
  badge.textContent = guest.category;

  const timestamp = document.createElement('div');
  timestamp.className = 'timestamp';
  timestamp.textContent = `Added: ${formatTimestamp(guest.addedAt)}`;

  infoWrap.append(nameSpan, badge, timestamp);

  // RSVP toggle
  const rsvpBtn = document.createElement('button');
  rsvpBtn.className = 'rsvp-btn';
  rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
  rsvpBtn.addEventListener('click', () => {
    guest.attending = !guest.attending;
    renderList(); // simplest: re-render
  });

  // Edit
  const editBtn = document.createElement('button');
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Edit';
  editBtn.addEventListener('click', () => {
    const newName = prompt('Edit guest name:', guest.name);
    if (newName && newName.trim()) {
      guest.name = newName.trim();
      renderList();
    }
  });

  // Remove
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn';
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    guests.splice(index, 1);
    renderList();
  });

  li.append(infoWrap, rsvpBtn, editBtn, removeBtn);
  return li;
}

function renderList() {
  guestListEl.innerHTML = '';
  guests.forEach((guest, idx) => guestListEl.appendChild(buildGuestItem(guest, idx)));
  renderCounter();
}

// ----- Form submit -----
form.addEventListener('submit', e => {
  e.preventDefault();          // 🔑 stop page reload
  const name = input.value.trim();
  const category = categorySelect.value;

  if (!name) return;
  if (guests.length >= 10) {
    alert('Guest limit reached (10 max)');
    return;
  }

  guests.push({
    name,
    category,
    attending: false,
    addedAt: Date.now()
  });

  input.value = '';
  renderList();
});

// ----- Init -----
renderCounter();
