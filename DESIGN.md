---
name: 待辦清單
description: 安靜、單一主色的個人待辦工具
colors:
  quiet-teal: "#0f766e"
  quiet-teal-deep: "#0b5e57"
  mist-page: "#f8faf9"
  paper-white: "#ffffff"
  sage-line: "#d9e2df"
  forest-ink: "#19312d"
  moss-gray: "#60736e"
  faded-moss: "#84938f"
  alert-brick: "#b42318"
typography:
  headline:
    fontFamily: "Noto Sans TC, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.3
  title:
    fontFamily: "Noto Sans TC, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
  body:
    fontFamily: "Noto Sans TC, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Noto Sans TC, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.12em"
rounded:
  control: "0.75rem"
spacing:
  "1": "0.5rem"
  "2": "1rem"
  "3": "1.5rem"
  "4": "2rem"
components:
  button-primary:
    backgroundColor: "{colors.quiet-teal}"
    textColor: "{colors.paper-white}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  button-primary-hover:
    backgroundColor: "{colors.quiet-teal-deep}"
  input-text:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.forest-ink}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: 待辦清單

> 2026-10-02 由 Claude 依 Task 1 實作整理（Impeccable document，scan mode）；視覺方向經使用者核可。質性用語由 Claude 依既有設計擬定，未另行訪談。

## Overview

**Creative North Star: "The Quiet Notebook"**

像一本攤開在桌上的筆記本：淺色紙面、一支青綠色的筆，其他一律退後。畫面只有一欄、內容置中，視線從標題往下走到輸入框，再到清單，沒有側欄或干擾。

密度偏鬆，留白多於裝飾。唯一的色彩聲音是青綠主色，只出現在主要動作與焦點上；狀態變化靠文字與明度表達，不靠額外色塊。

**Key Characteristics:**
- 單欄、寬度上限 560px、置中
- 單一主色，灰階分三層
- 平面、無陰影，以細線分隔
- 一處微動效：新項目淡入

## Colors

一個安靜的青綠主色，搭配帶綠調的中性灰。

### Primary
- **Quiet Teal**：主要按鈕、焦點框、標籤小字、勾選框。
- **Quiet Teal Deep**：主要按鈕的 hover。

### Neutral
- **Mist Page**：頁面背景。
- **Paper White**：輸入框底色。
- **Sage Line**：輸入框邊框與清單分隔線。
- **Forest Ink**：主要文字。
- **Moss Gray**：次要說明、空狀態文字。
- **Faded Moss**：已完成待辦的文字（搭配刪除線）。

### Semantic
- **Alert Brick**：錯誤提示文字與錯誤輸入框邊框。狀態一定同時有文字說明，不只靠顏色。

**The One Voice Rule.** 畫面上只有 Quiet Teal 一個強調色；新增的狀態（例如逾期）優先用文字標籤與既有色票表達，不引入新的鮮豔色。

## Typography

**Body Font:** Noto Sans TC（後備 sans-serif）

**Character:** 單一字族，靠字重與大小拉開層次，閱讀感平穩。

### Hierarchy
- **Headline**（700, 2rem；手機 1.75rem, 1.3）：頁面主標。
- **Title**（700, 1.125rem）：區塊標題，例如「我的待辦」。
- **Body**（400, 1rem, 1.625）：待辦文字與說明。
- **Label**（600, 0.875rem, 字距 0.12em）：頁首小標與表單標籤。

**The Two-Step Rule.** 相鄰層級至少在大小或字重上差兩級。

## Layout

單欄，內容寬度上限 560px，左右內距 20px，頂部留白在手機 64px、桌機 96px。間距使用 0.5／1／1.5／2rem 的節奏；表單與清單之間留較大的段落間距（3rem）。375px 寬度不可出現橫向捲動，長文字自動換行。

## Elevation & Depth

完全平面，不使用陰影。層次靠背景與白色輸入框的明度差，以及 1px 的 Sage Line 分隔線。

**The Flat Paper Rule.** 不加陰影；需要分隔時用細線或留白。

## Shapes

控制項使用柔和圓角（0.75rem）；清單項目沒有外框，只用底部分隔線。

## Components

### Buttons
- **Shape:** 柔和圓角（0.75rem）
- **Primary:** Quiet Teal 底、白字、600 字重，內距 12px 20px
- **Hover / Focus:** hover 加深為 Quiet Teal Deep；按下縮放 0.97；focus 為 3px Quiet Teal 外框、間距 3px

### Inputs / Fields
- **Style:** 白底、1px Sage Line 邊框、0.75rem 圓角，內距 12px 16px
- **Focus:** 3px Quiet Teal 外框、間距 3px
- **Error:** 邊框改為 Alert Brick，下方顯示錯誤文字

### 待辦項目（Signature Component）
勾選框（Quiet Teal）＋文字，上下內距 16px，項目間以 Sage Line 分隔。完成後文字變 Faded Moss 並加刪除線。新增時淡入並上移 4px（180ms），`prefers-reduced-motion` 時不播放。附屬資訊（例如期限）放在文字下方，使用較小字級與 Moss Gray。

## Do's and Don'ts

### Do:
- **Do** 讓 Quiet Teal 只出現在主要動作、焦點與勾選框。
- **Do** 用文字標籤表達狀態（如「已逾期」），顏色只作輔助。
- **Do** 所有可互動元素都有清楚的 focus 外框（3px Quiet Teal）。

### Don't:
- **Don't** 加陰影、漸層或卡片外框。
- **Don't** 引入第二個強調色。
- **Don't** 只靠顏色傳達狀態。
