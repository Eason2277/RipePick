# RipePick Frontend Handoff

更新时间：2026-10-12（Asia/Shanghai）

## 当前目标

在浏览器版 RipePick 中显示适合移动端的底部导航。用户希望自己编写和修改代码，因此后续以分步指导、检查用户改动为主；除非用户明确要求，不代为编辑组件。

## 范围与边界

- 本轮只涉及 Web 导航布局与其遮挡检查。
- 保留 iOS/Android 的原生 `NativeTabs` 实现，不改原生导航。
- 不扩展到账号、个人资料或其他 MVP 之外的功能。

## 已确认事实

- 前端位于 `frontend/`，使用 Expo SDK `~57.0.27`、React Native、TypeScript 与 Expo Router。
- 用户已在本地启动开发服务，浏览器地址为 `http://localhost:8081/`。
- 本对话实际检查了页面：主输入卡片正常显示，导航目前在页面顶部，内容为 `Expo Starter / Home / Explore / Docs`，不是底部导航。
- Web 文件 [`src/components/app-tabs.web.tsx`](../src/components/app-tabs.web.tsx) 使用 `expo-router/ui` 自定义 Tabs。其 TabList 使用绝对定位，但缺少 `bottom` 定位，并仍包含 Expo 模板品牌和 Docs 链接。
- 通用/原生组件 [`src/components/app-tabs.tsx`](../src/components/app-tabs.tsx) 使用 `NativeTabs`。导航文件选择由平台后缀处理，因此浏览器改动应落在 `.web.tsx` 文件。
- 路由组为 `src/app/(tabs)/`，包含首页 `index.tsx` 和探索页 `explore.tsx`；组名不会出现在 URL 中，两个页面地址分别是 `/` 与 `/explore`。
- 对话中已经给用户一份可替换 `app-tabs.web.tsx` 的 Web 底栏示例：`TabList` 绝对定位至 `bottom: 0`，使用“首页 / 探索”两个触发项、主题色选中态和底部栏样式。用户尚未确认已应用。

## 当前工作区状态

最近一次 `git status --short` 显示以下现存改动；它们属于用户工作，后续应先检查并保留，不要重置或覆盖：

```text
A  src/app/(tabs)/_layout.tsx
R  src/app/explore.tsx -> src/app/(tabs)/explore.tsx
R  src/app/index.tsx -> src/app/(tabs)/index.tsx
 M src/app/_layout.tsx
```

本次交接只新增了本文档，没有修改导航源文件。`frontend/docs/` 在本次之前不存在。

## 已做验证

- 已在本地浏览器查看 `http://localhost:8081/` 的实际渲染结果，确认导航位于顶部且仍是 Expo Starter 样式。
- 本轮未应用导航修改，也未在本轮重新运行 TypeScript、lint 或应用交互验证。因此不能认为底部导航修复已经完成。

## 下一步

1. 用户手动编辑 `src/components/app-tabs.web.tsx`，按本对话给出的示例将 Web TabList 放到底部，并移除 `Expo Starter` 与 `Docs`。
2. 保存后在浏览器确认底栏显示在底部；点击“首页 / 探索”确认 `/` 与 `/explore` 切换正常。
3. 检查探索页滚动内容是否被固定底栏遮挡；若遮挡，为 Web 滚动内容增加足够的 `paddingBottom`。
4. 通过 `npx tsc --noEmit` 检查类型；按项目说明检查 lint，但留意项目历史上 Expo lint 可能触发配置变更，执行前先查看当前脚本/提示。
5. 如版面调整影响响应式布局，再按项目约定检查手机宽度（320 / 390 / 430 px）及桌面回归。

## 不确定事项

- 用户是否已在新对话或本地应用此前提供的替换代码，尚未确认；开始后先查看当前文件和 `git status`，再决定从哪一步继续。
- 浏览器底栏显示后，探索页是否发生遮挡尚未实测。
