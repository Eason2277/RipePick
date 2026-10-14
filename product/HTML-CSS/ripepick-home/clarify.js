const promptKey = 'ripepickPrototypeContext';
const dairyKey = 'ripepickPrototypeDairy';
const extraContextKey = 'ripepickPrototypeExtraContext';
const prompt = sessionStorage.getItem(promptKey) || '昨晚吃得比较油腻，今天早上想吃得清淡些。';
const form = document.querySelector('#clarify-form');

document.querySelector('#clarify-prompt').textContent = prompt;

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const dairy = form.querySelector('input[name="dairy"]:checked')?.value || 'available';
  const extraContext = document.querySelector('#extra-context').value.trim();
  sessionStorage.setItem(dairyKey, dairy);
  sessionStorage.setItem(extraContextKey, extraContext);
  window.location.assign('./recommendation.html');
});
