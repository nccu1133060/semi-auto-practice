# HANDOFF

## 本輪目標

GitHub 版半自動協作試跑：驗證推送分支、開 PR、GitHub Actions 自動檢查、分支保護、使用者批准後合併。程式碼沿用本地練習專案（Task 1、Task 2 已完成，紀錄見 `docs/handoff-archive/`）。

## 目前狀態

- 遠端：GitHub 公開倉庫 `semi-auto-practice`；部署：無
- 自動檢查：`.github/workflows/test.yml`（PR 與 main 推送時跑 `node --test`）
- 分支：`task-1-overdue-emphasis`（GitHub Task 1 進行中）

## Task 1：「已逾期」標籤加強顯示

### Claude 填寫（交派與審查）

- 負責人：Codex（實作）｜審查：Claude
- 分支：task-1-overdue-emphasis
- 風險等級：一般
- 推理強度：中等
- 需要網路：否
- 規格：無獨立規格（小幅樣式調整，使用者 2026-10-02 選定改善提案①）
- 檔案範圍：
  - index.html
  - todo.test.js（如需補測試）
- 必讀檔案：
  - DESIGN.md
  - docs/handoff-archive/2026-10-02-task-2.md（改善提案①的來源）
  - AGENTS.md
- 驗收標準：
  1. 「已逾期」文字改用 DESIGN.md 的 Forest Ink（`--color-text`），維持粗體；期限文字維持 Moss Gray。
  2. 不新增任何顏色或 CSS 變數。
  3. Task 2 的逾期判斷與顯示／隱藏行為不變；`node --test` 全數通過。
- 測試指令：局部 `node --test todo.test.js`｜全套 `node --test`｜lint 無｜型別檢查 無
- 審查輪次：0 / 2
- 審查結果：
  - （尚未審查）

### Codex 填寫（施工）

狀態：
- 修改內容：
- 測試指令與結果摘要：
- 簡短 QA：
- 教學重點：設計理由／替代方案／剩餘限制
- 範圍外需求：
- 退件回覆：
