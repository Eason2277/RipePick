const promptKey = 'ripepickPrototypeContext';
const form = document.querySelector('#prompt-form');
const input = document.querySelector('#prompt');
const sendButton = document.querySelector('.send-button');
const status = document.querySelector('#input-status');
const promptButtons = document.querySelectorAll('[data-prompt]');

function updateInput() {
  sendButton.disabled = !input.value.trim();
  input.style.height = 'auto';
  input.style.height = `${Math.min(input.scrollHeight, 132)}px`;
}

input.addEventListener('input', () => {
  promptButtons.forEach((button) => button.removeAttribute('aria-pressed'));
  status.textContent = input.value.trim() ? '可以提交当前场景。' : '请输入当前饮食状态。';
  updateInput();
});

promptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    promptButtons.forEach((item) => item.removeAttribute('aria-pressed'));
    button.setAttribute('aria-pressed', 'true');
    input.value = button.dataset.prompt;
    updateInput();
    input.focus({ preventScroll: true });
    status.textContent = '已填入场景，可以修改后提交。';
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const prompt = input.value.trim();
  if (!prompt) {
    input.focus();
    return;
  }

  sessionStorage.setItem(promptKey, prompt);
  window.location.assign('./analysis.html');
});

input.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    form.requestSubmit();
  }
});

updateInput();
