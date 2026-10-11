const homeScreen = document.querySelector('#home-screen');
const analysisScreen = document.querySelector('#analysis-screen');
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

function describeContext(prompt) {
  const hasBreakfast = /早上|早餐|早饭/.test(prompt);
  const isLight = /清淡|油腻|舒服/.test(prompt);
  const wantsSeasonal = /当季|应季/.test(prompt);
  const isQuick = /简单|赶时间|时间不多/.test(prompt);

  return {
    time: hasBreakfast ? '今天早上' : '待进一步确认',
    goal: isLight ? '吃得清淡一些' : wantsSeasonal ? '选择当季水果' : isQuick ? '准备简单早餐' : '寻找合适的水果早餐',
    context: /昨晚.*油腻|油腻/.test(prompt) ? '近期饮食偏油腻' : '根据描述继续理解',
  };
}

function showAnalysis(prompt) {
  const context = describeContext(prompt);
  document.querySelector('#recognized-time').textContent = context.time;
  document.querySelector('#recognized-goal').textContent = context.goal;
  document.querySelector('#recognized-context').textContent = context.context;
  document.querySelector('#submitted-prompt').textContent = `“${prompt}”`;
  homeScreen.hidden = true;
  analysisScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: 'auto' });
  document.querySelector('#back-home').focus({ preventScroll: true });
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
  showAnalysis(prompt);
});

input.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
    event.preventDefault();
    form.requestSubmit();
  }
});

document.querySelector('#back-home').addEventListener('click', () => {
  analysisScreen.hidden = true;
  homeScreen.hidden = false;
  window.scrollTo({ top: 0, behavior: 'auto' });
  input.focus({ preventScroll: true });
});

updateInput();
