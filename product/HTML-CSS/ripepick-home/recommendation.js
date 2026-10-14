const promptKey = 'ripepickPrototypeContext';
const dairyKey = 'ripepickPrototypeDairy';
const extraContextKey = 'ripepickPrototypeExtraContext';
const prompt = sessionStorage.getItem(promptKey) || '昨晚吃得比较油腻，今天早上我吃什么比较好？';
const extraContext = sessionStorage.getItem(extraContextKey) || '';
const dairyAvailable = sessionStorage.getItem(dairyKey) !== 'unavailable';
const dairyRestriction = !dairyAvailable || /不耐受|过敏|不能|不方便|不吃/.test(extraContext);
const hasBreakfast = /早上|早餐|早饭/.test(prompt);
const goal = /清淡|油腻|舒服/.test(prompt) ? '想清淡一些' : '寻找合适的水果早餐';
const context = /昨晚.*油腻|油腻/.test(prompt) ? '昨晚饮食偏油腻' : '根据描述继续理解';

document.querySelector('#result-context').textContent = `已理解：${hasBreakfast ? '今天早上' : '待进一步确认'} · ${goal} · ${context}`;
document.querySelector('#pairing-text').textContent = dairyRestriction
  ? '早餐搭配待数据确认'
  : '无糖酸奶 + 全麦吐司';
document.querySelector('#pairing-caption').textContent = dairyRestriction
  ? '当前候选数据没有经过核验的无乳制品搭配'
  : '完成一顿简单早餐';
document.querySelector('#rationale-text').textContent = dairyRestriction
  ? '你选择了不方便搭配乳制品。现有候选文案含酸奶，因此不作为适用建议展示；无乳制品搭配待结构化数据确认。'
  : '候选原型文案：口感柔和，搭配酸奶和全麦吐司，比只吃水果更接近一顿完整早餐。';
document.querySelector('#alternative-text').textContent = dairyRestriction
  ? '暂无已核验的无乳制品替代搭配'
  : '香蕉半根 + 无糖酸奶';
document.querySelector('#data-disclaimer').textContent = dairyRestriction
  ? '这是原型候选内容，尚未由结构化水果与搭配数据核验；当前条件下没有可确认的早餐搭配。'
  : '这是原型候选内容，尚未由结构化水果与搭配数据核验；接入数据前不代表实际推荐。';

document.querySelector('#new-prompt').addEventListener('click', () => {
  sessionStorage.removeItem(promptKey);
  sessionStorage.removeItem(dairyKey);
  sessionStorage.removeItem(extraContextKey);
});
