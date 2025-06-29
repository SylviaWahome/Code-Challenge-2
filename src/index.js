// ===== DOM Elements =====
const form = document.querySelector('#guest-form');
const input = document.querySelector('#guest-input');
const guestListEl = document.querySelector('#guest-list');
const counterEl = document.querySelector('#counter');

// ===== Data =====
const guests = [];

// ===== Functions =====
function renderCounter() {
  counterEl.textContent = `${guests.length} / 10 spots taken`;
}

function buildGuestItem(guest, index) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.textContent = guest.name;

  const rsvpBtn = document.createElement('button');
  rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
  rsvpBtn.className = 'rsvp-btn';
  rsvpBtn.addEventListener('click', () => {
    guest.attending = !guest.attending;
    rsvpBtn.textContent = guest.attending ? 'Attending' : 'Not Attending';
    li.classList.toggle('attending', guest.attending);
  });

  const removeBtn = document.createElement('button');
  removeBtn.textContent = 'Remove';
  removeBtn.addEventListener('click', () => {
    guests.splice(index, 1);
    renderList();
  });

  li.append(span, rsvpBtn, removeBtn);
  li.classList.toggle('attending', guest.attending);
  return li;
}

function renderList() {
  guestListEl.innerHTML = '';
  guests.forEach((guest, i) => {
    const li = buildGuestItem(guest, i);
    guestListEl.appendChild(li);
  });
  renderCounter();
}

// ===== Event Listener =====
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = input.value.trim();

  if (!name) return;
  if (guests.length >= 10) {
    alert("Guest limit reached (10 max)");
    return;
  }

  guests.push({ name, attending: false });
  input.value = '';
  renderList();
});

// ===== Init =====
renderCounter();
