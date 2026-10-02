# HANDOFF

## 本輪目標

GitHub 版半自動協作試跑：驗證推送分支、開 PR、GitHub Actions 自動檢查、分支保護、使用者批准後合併。程式碼沿用本地練習專案（Task 1、Task 2 已完成，紀錄見 `docs/handoff-archive/`）。

## 目前狀態

- 分支：`main`
- 遠端：GitHub 公開倉庫 `semi-auto-practice`；部署：無
- 自動檢查：`.github/workflows/test.yml`（PR 與 main 推送時跑 `node --test`）
- 下一步：使用者設定 `main` 分支保護 → 半自動執行 GitHub Task 1（「已逾期」標籤改用 Forest Ink）
