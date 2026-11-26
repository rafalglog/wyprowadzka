const storageKey = 'spokojna-przeprowadzka-progress-v1';
const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('[data-task-id]'));
const categories = Array.from(document.querySelectorAll<HTMLDetailsElement>('[data-category]'));
const filter = document.querySelector<HTMLInputElement>('#unfinished-filter')!;
const storageError = document.querySelector<HTMLElement>('#storage-error')!;

function showStorageError(message: string) {
  storageError.textContent = message;
  storageError.hidden = false;
}

function readProgress(): string[] {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved === null) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string')) {
      throw new Error('Nieprawidłowy format zapisanych danych');
    }
    return parsed;
  } catch {
    showStorageError('Nie udało się odczytać zapisanego postępu. Sprawdź ustawienia pamięci przeglądarki.');
    return [];
  }
}

function saveProgress() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(inputs.filter((input) => input.checked).map((input) => input.dataset.taskId)));
    storageError.hidden = true;
  } catch {
    showStorageError('Nie udało się zapisać postępu. Zmiany mogą zniknąć po zamknięciu strony.');
  }
}

function todayString() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function update() {
  const completed = inputs.filter((input) => input.checked).length;
  const percent = Math.round(completed / inputs.length * 100);
  document.querySelector('#overall-percent')!.innerHTML = `${percent}<span>%</span>`;
  document.querySelector('#completed-count')!.textContent = String(completed);
  document.querySelector('#remaining-count')!.textContent = `${inputs.length - completed} pozostało`;
  document.querySelector<HTMLElement>('#overall-fill')!.style.width = `${percent}%`;
  document.querySelector('#overall-progress')!.setAttribute('aria-valuenow', String(percent));
  document.querySelector<HTMLElement>('#all-done')!.hidden = !(filter.checked && completed === inputs.length);

  categories.forEach((category) => {
    const categoryInputs = Array.from(category.querySelectorAll<HTMLInputElement>('[data-task-id]'));
    const done = categoryInputs.filter((input) => input.checked).length;
    const categoryPercent = Math.round(done / categoryInputs.length * 100);
    category.querySelector('.category-count')!.textContent = `${done} / ${categoryInputs.length}`;
    category.querySelector('.category-percent')!.textContent = `${categoryPercent}%`;
    category.querySelector<HTMLElement>('.category-progress span')!.style.width = `${categoryPercent}%`;
    const overdue = (category.dataset.deadline ?? '') < todayString() && done < categoryInputs.length;
    category.classList.toggle('is-overdue', overdue);
    category.querySelector<HTMLElement>('.overdue-label')!.hidden = !overdue;
    category.querySelector<HTMLElement>('.overdue-summary')!.hidden = !overdue;
    category.querySelector<HTMLElement>('.category-empty')!.hidden = !(filter.checked && done === categoryInputs.length);
    categoryInputs.forEach((input) => {
      const row = input.closest<HTMLElement>('.task-row')!;
      row.classList.toggle('is-complete', input.checked);
      row.hidden = filter.checked && input.checked;
    });
  });
}

function updateCountdown() {
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((Date.UTC(2027, 6, 30) - today) / 86_400_000);
  const number = document.querySelector<HTMLElement>('#countdown-number')!;
  const label = document.querySelector<HTMLElement>('#countdown-label')!;
  const notice = document.querySelector<HTMLElement>('#deadline-notice')!;
  number.textContent = String(Math.max(0, days));
  const dayWord = Math.abs(days) === 1 ? 'dzień' : 'dni';
  label.textContent = days < 0 ? `${dayWord} od terminu przygotowania` : days === 0 ? 'dziś mija termin przygotowania' : `${dayWord} do przygotowania mieszkania`;
  if (days < 0) number.textContent = String(-days);
  notice.hidden = days > 30;
  if (days < 0) notice.textContent = 'Termin przygotowania minął. Sprawdź niewykonane zadania i ustal dalsze kroki z właścicielem.';
  else if (days <= 7) notice.textContent = days === 0 ? 'Pilne: dziś mija termin przygotowania mieszkania do przekazania.' : `Pilne: do przygotowania mieszkania ${days === 1 ? 'został' : 'zostało'} ${days} ${dayWord}. Sprawdź pozostałe zadania.`;
  else if (days <= 14) notice.textContent = `Ważne przypomnienie: do przygotowania mieszkania zostało ${days} dni.`;
  else if (days <= 30) notice.textContent = `Przypomnienie: do przygotowania mieszkania zostało ${days} dni.`;
  notice.classList.toggle('urgent', days <= 7);
  update();
}

const saved = new Set(readProgress());
inputs.forEach((input) => {
  input.checked = saved.has(input.dataset.taskId ?? '');
  input.addEventListener('change', () => { update(); saveProgress(); });
});
filter.addEventListener('change', update);
document.querySelector('#expand-all')!.addEventListener('click', () => categories.forEach((category) => { category.open = true; }));
document.querySelector('#collapse-all')!.addEventListener('click', () => categories.forEach((category) => { category.open = false; }));
document.querySelector('#reset-progress')!.addEventListener('click', () => {
  if (!window.confirm('Czy na pewno chcesz zresetować cały postęp? Tej operacji nie można cofnąć.')) return;
  inputs.forEach((input) => { input.checked = false; });
  update();
  saveProgress();
});
document.querySelector('#print-checklist')!.addEventListener('click', () => window.print());

let openBeforePrint: boolean[] | null = null;
window.addEventListener('beforeprint', () => {
  openBeforePrint = categories.map((category) => category.open);
  categories.forEach((category) => { category.open = true; });
  document.querySelectorAll<HTMLElement>('.task-row').forEach((row) => { row.hidden = false; });
});
window.addEventListener('afterprint', () => {
  if (openBeforePrint) categories.forEach((category, index) => { category.open = openBeforePrint![index]; });
  openBeforePrint = null;
  update();
});
window.addEventListener('storage', (event) => {
  if (event.key !== storageKey && event.key !== null) return;
  const latest = new Set(readProgress());
  inputs.forEach((input) => { input.checked = latest.has(input.dataset.taskId ?? ''); });
  update();
});
updateCountdown();
setInterval(updateCountdown, 60_000);
