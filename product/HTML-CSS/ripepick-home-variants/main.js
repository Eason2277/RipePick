const variants = {
  calm: {
    number: "01",
    title: "Calm chat",
    description: "把首页做成一个安静的对话入口，适合用户已经知道自己想问什么的场景。"
  },
  canvas: {
    number: "02",
    title: "Open canvas",
    description: "把输入区域变成一张开放画布，降低用户组织语言的压力，适合更探索式的表达。"
  },
  native: {
    number: "03",
    title: "Native iOS",
    description: "更接近原生 AI 对话应用：历史入口、新对话标题和底部输入框都更熟悉。"
  },
  context: {
    number: "04",
    title: "Context cards",
    description: "把最常见的饮食场景变成可选卡片，降低第一次使用的输入成本，同时保留自由输入。"
  },
  night: {
    number: "05",
    title: "Quiet night",
    description: "深色主题强调陪伴感和专注感，适合晚间或用户希望减少视觉刺激的使用场景。"
  }
};

const tabs = [...document.querySelectorAll("[data-variant]")];
const screens = [...document.querySelectorAll("[data-screen]")];
const title = document.querySelector("#variant-title");
const description = document.querySelector("#variant-description");
const number = document.querySelector(".variant-number");
const status = document.querySelector("#interaction-status");

function selectVariant(key) {
  const variant = variants[key];
  tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.variant === key));
  screens.forEach((screen) => screen.classList.toggle("is-hidden", screen.dataset.screen !== key));
  number.textContent = variant.number;
  title.textContent = variant.title;
  description.textContent = variant.description;
  status.textContent = "点击任意快捷选项，再点击箭头，查看输入状态。";
}

tabs.forEach((tab) => tab.addEventListener("click", () => selectVariant(tab.dataset.variant)));

document.querySelectorAll("[data-fill]").forEach((control) => {
  control.addEventListener("click", () => {
    const screen = control.closest("[data-screen]");
    const input = screen?.querySelector("[data-input]");
    if (!input) return;
    input.value = control.dataset.fill;
    input.focus();
    status.textContent = "已填入一个真实场景，你可以继续修改后提交。";
  });
});

document.querySelectorAll("[data-submit]").forEach((button) => {
  button.addEventListener("click", () => {
    const screen = button.closest("[data-screen]");
    const input = screen?.querySelector("[data-input]");
    if (!input || !input.value.trim()) {
      status.textContent = "先输入或选择一个饮食场景，再开始分析。";
      input?.focus();
      return;
    }
    button.textContent = "…";
    status.textContent = "已提交场景。下一步进入理解、澄清或推荐结果状态。";
    window.setTimeout(() => { button.textContent = "↑"; }, 700);
  });
});

selectVariant("calm");
