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
- 審查結果（2026-10-02）：**通過**（退件 0 輪）
  - 機器檢查：`node --test` 10 通過、0 失敗（Claude 重跑）；Impeccable detect 無發現。
  - 瀏覽器實測：「已逾期」計算後顏色 #19312d、字重 600；期限文字 #60736e；今天到期無標籤；勾選隱藏、取消重現；375px 無橫向捲動。
  - 改善提案：顏色以 inline style 設定，與專案其他樣式（CSS 類別）寫法不一致，可改成 `.todo-overdue` 類別；新測試以子元素索引定位，結構一改就容易壞。
  - 提交：Claude 提交並推送分支、開 PR；等 GitHub 檢查通過與使用者說「合併 Task 1」。

### Codex 填寫（施工）

狀態：完成
- 修改內容：`index.html` 讓「已逾期」單獨引用既有 Forest Ink `--color-text`；`todo.test.js` 補一個標籤顏色與字重測試，期限仍沿用 `.todo-meta` 的 Moss Gray。未改逾期判斷、顯示／隱藏流程或新增色票。
- 測試指令與結果摘要：基線 `node --test todo.test.js` 9/9；新增測試後 9 通過、1 失敗（預期顏色為 `var(--color-text)`，實際未設定）；實作後局部 10/10、全套 `node --test` 10/10 通過。`git diff --check` 退出碼 0（只有 Git 的 LF/CRLF 提示）；Impeccable `detect --json index.html` 回傳 `[]`。分支 `task-1-overdue-emphasis`，程式與測試尚未提交；全測後僅改本施工紀錄，程式、相依與設定未變。
- 簡短 QA：以待辦使用者與 UI 可讀性角度，檢查逾期待辦仍顯示文字標籤、勾選後隱藏與取消後重現，且期限與標籤保有不同明度；以設計系統角度核對 `DESIGN.md` 色票與 `git diff`，確認只改標籤顏色、保留粗體。無已證實缺陷。依專案 `AGENTS.md`，真實瀏覽器操作及桌機／手機兩輪截圖與八項自評交由 Claude 審查，施工方未宣稱已完成畫面驗收。
- 教學重點：設計理由：逾期提醒要比期限容易掃到，沿用主要文字的 Forest Ink，仍靠「已逾期」字樣傳達狀態。替代方案：加新警示色更醒目，但會破壞已核可的單一主色系並增加色票維護；因此採現有文字色。剩餘限制：本輪只改視覺層次，跨午夜停留頁面時仍需下一次操作才重算逾期；瀏覽器實際畫面待 Claude 審查。
- 範圍外需求：無。
- 退件回覆：無。
