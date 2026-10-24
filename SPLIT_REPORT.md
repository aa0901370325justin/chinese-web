# 拆分與檢查報告

## 已完成

- 將 HTML 內的 3 段 CSS 合併到 `css/main.css`，並從 `index.html` 移除內嵌樣式。
- 將主功能 JavaScript 移到 `js/app.js`，並將教材、語言補丁、口說練習、注音音檔與筆順互動拆成獨立模組。
- 將 2,960 筆詞彙資料分離到 `js/data/vocabulary.js`。
- 將 PDF、MP4 與 37 個 WAV 音檔解碼為真正的獨立二進位檔案；教材中心和注音音檔初始化改由相對路徑 `fetch()` 讀取。
- 將 6,063 筆筆順 ID 與 6,063 筆 PNG 資料完整分離；PNG 資料切成 7 個 JavaScript 檔案，以避免單一檔案過大。
- 原始 HTML 檔保持不變。

## 已完成的自動檢查

| 檢查 | 結果 |
|---|---|
| JavaScript 語法檢查（所有拆出的 .js） | 通過 |
| HTML 結構解析 | 通過 |
| HTML 本機 CSS／JS 路徑存在性 | 通過，未發現缺檔 |
| 內嵌 script/style 是否已移除 | 通過，均為外部檔案 |
| 詞彙資料筆數 | 2,960 筆，通過 |
| 注音音檔清單與檔案 | 37 個，通過 |
| 筆順 ID 與 PNG 資料筆數 | 各 6,063 筆，通過 |
| PDF／MP4／WAV 二進位檔標頭檢查 | 通過 |
| 將資料模組載入 Node 執行環境後核對筆數 | 通過 |

## 尚未能驗證

- 本執行環境的 Chromium 導覽受到 `ERR_BLOCKED_BY_ADMINISTRATOR` 阻擋，無法完成真實瀏覽器的整頁互動測試。
- 尚未部署到使用者的 GitHub repository，因此 GitHub Pages 線上網址與部署後外部依賴尚未驗證。
- 請部署後實際測試教材 PDF／影片載入、注音錄音播放、筆順頁、單字測驗、設定備份與學習紀錄。

## 重要提醒

教材和錄音現在透過 `fetch()` 讀取，建議使用 GitHub Pages 或本地 HTTP 伺服器測試，不要直接雙擊 `index.html`。同時，瀏覽器本機資料會依網域與瀏覽器分開保存；部署到新網址不保證自動沿用舊網址的 localStorage／IndexedDB。上線前請先從舊版本匯出備份。
