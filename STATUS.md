# STATUS

- 階段：半自動協作試跑（GitHub 公開倉庫 `semi-auto-practice`，無部署）
- CI：GitHub Actions `test`（PR 與 main 推送時執行 `node --test`）
- 技術：純 HTML ＋ ES module，測試用 Node 內建 `node:test`，不安裝套件
- 指令：
  - 局部測試：`node --test todo.test.js`
  - 全套測試：`node --test`
  - lint／型別檢查：無
  - 本機預覽：`npx --yes http-server -p 4173 -c-1`（Claude 審查時使用；Codex 沙盒無網路，不使用）
- 正式站：無
