# 台灣華語 Taiwan Mandarin — GitHub Pages 拆分版

這是從原始 HTML 拆分出的靜態網站專案，原始單一 HTML 檔不會被覆寫。

## 專案結構

- `index.html`：頁面結構與內容。
- `css/main.css`：原本嵌入 HTML 的三段 CSS，依原順序合併。
- `js/app.js`：主要學習程式。
- `js/modules/`：教材中心、注音音檔安裝、語言標籤、口說練習與筆順互動等模組。
- `js/data/vocabulary.js`：原本嵌入主程式的 2,960 筆詞彙資料。
- `js/data/moe-zhuyin-audio.js`：教育部注音音檔清單。
- `js/data/stroke-order-ids.js`、`stroke-order-png-*.js`：筆順 ID 與原有 PNG 資料（分成小檔便於上傳）。
- `assets/`：PDF、MP4、37 個 WAV 音檔。

## 發佈到 GitHub Pages

1. 建立一個新的 GitHub repository。
2. 將此資料夾內的**所有檔案與資料夾**上傳到 repository 根目錄（不要只上傳 `index.html`）。建議用 GitHub Desktop 或 Git 命令列，避免大量檔案需要逐個上傳。
3. 開啟 repository 的 **Settings → Pages**。
4. 在 Build and deployment 選 `Deploy from a branch`，分支選 `main`，資料夾選 `/ (root)`，儲存。
5. 等 GitHub Pages 顯示網站網址後即可使用。

## 本地測試

請用本地 HTTP 伺服器開啟，不要直接雙擊 `index.html`，因為內建教材與音檔會透過 `fetch()` 載入。若已安裝 Python，可在此資料夾執行：

```bash
python -m http.server 8000
```

再開啟 `http://localhost:8000/`。

## 注意事項

- 使用同一個瀏覽器存放原有學習進度的 localStorage／IndexedDB；換網域或換瀏覽器時，瀏覽器本機資料不會自動搬移。上線前建議先用原網站的備份功能匯出資料。
- 這個專案仍使用原始 HTML 中的外部教育部筆順頁與原本的線上依賴；離線使用不保證完整。
- 教育部注音錄音的來源與授權聲明請見 `ATTRIBUTION.md`。
