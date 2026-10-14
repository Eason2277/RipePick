const promptKey = 'ripepickPrototypeContext';
const prompt = sessionStorage.getItem(promptKey) || '昨晚吃得比较油腻，今天早上我吃什么比较好？';
const hasBreakfast = /早上|早餐|早饭/.test(prompt);
const isLight = /清淡|油腻|舒服/.test(prompt);
const wantsSeasonal = /当季|应季/.test(prompt);
const isQuick = /简单|赶时间|时间不多/.test(prompt);

document.querySelector('#recognized-time').textContent = hasBreakfast ? '今天早上' : '待进一步确认';
document.querySelector('#recognized-goal').textContent = isLight
  ? '吃得清淡一些'
  : wantsSeasonal
    ? '选择当季水果'
    : isQuick
      ? '准备简单早餐'
      : '寻找合适的水果早餐';
document.querySelector('#recognized-context').textContent = /昨晚.*油腻|油腻/.test(prompt)
  ? '近期饮食偏油腻'
  : '根据描述继续理解';
document.querySelector('#submitted-prompt').textContent = `“${prompt}”`;

if (!sessionStorage.getItem(promptKey)) sessionStorage.setItem(promptKey, prompt);
