---
title: "Claude Code 實戰：用 AI 加速開發工作流"
date: "2025-03-10"
category: "Claude Code"
description: "深入介紹 Anthropic 的 Claude Code 如何改變開發者日常工作流，從程式撰寫、除錯到架構設計，AI 助手能做到哪些事？"
image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80"
featured: true
---

## 什麼是 Claude Code？

Claude Code 是由 Anthropic 推出的 AI 程式設計助手，能直接在終端機中運作，理解整個程式碼庫的結構，並執行從撰寫到重構的各種任務。

與一般 AI 聊天工具不同，Claude Code 的核心優勢在於它能：

- **直接讀寫檔案**：不只是建議，而是真正執行修改
- **理解上下文**：掌握整個專案的結構與依賴關係
- **多步驟任務**：自動規劃並執行需要多個步驟的複雜工作

## 我如何在教育平台開發中使用它

在開發 ezai.today 的課程平台時，我用 Claude Code 完成了幾個過去需要耗費大量時間的工作：

### 1. 元件重構

```bash
# 告訴 Claude Code 你想做什麼
"把所有課程卡片元件統一改為 dark theme，使用我們現有的 CSS 變數"
```

它會自動掃描所有相關檔案，找出需要修改的地方，並一次完成更新。

### 2. 自動化建置錯誤修復

遇到 TypeScript 錯誤時，Claude Code 能：
1. 閱讀完整的錯誤訊息
2. 找到出錯的檔案與行數
3. 理解錯誤根源
4. 提出並執行修復方案

### 3. 文件生成

```bash
"根據 lib/posts.ts 的函式，自動生成 JSDoc 文件"
```

## 實用 Prompt 模板

以下是我常用的幾個 Claude Code prompt：

**架構分析**
```
分析這個 Next.js 專案的整體結構，指出潛在的效能問題
```

**功能開發**
```
在 app/blog 下新增一個支援 Markdown 渲染的文章詳細頁面，
使用現有的設計系統 (globals.css 中的 CSS 變數)
```

**除錯輔助**
```
build 時出現這個錯誤: [錯誤訊息]，請找出原因並修復
```

## 結語

Claude Code 不是要取代工程師，而是讓工程師能把精力放在真正需要創意與判斷的工作上。對於教育工作者來說，這也意味著我們有更多時間思考「教什麼」，而不是被「怎麼做到」的技術細節拖住。

下一篇我會分享更進階的 Prompt 撰寫技巧，敬請期待。
