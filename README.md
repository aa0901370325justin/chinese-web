# 台灣華語 Taiwan Mandarin · 1.9.17 GitHub Pages 專案

這個資料夾是由 `Taiwan_Mandarin_Learning_1.9.17_Zhuyin_Final_Audio_Order_Fix.html` 拆分而來的靜態網站專案。原始上傳檔未修改。

## 檔案結構

- `index.html`：網頁結構
- `css/`：主畫面、筆順元件、教材版面樣式
- `js/app.js`：主要學習程式
- `js/data/vocabulary-data.js`：原始 2,960 筆詞彙資料
- `js/data/stroke-order-ids.js` 與 `stroke-order-png-*.js`：筆順 ID 與圖片資料分割檔
- `js/moe-zhuyin-audio.js`：注音音訊載入功能與符號對應
- `assets/audio/moe/`：37 個教育部注音 WAV 檔
- `assets/media/`：注音手冊 PDF、聲調練習 MP4
- `SPLIT_REPORT.md`：拆分及自動檢查結果

## 在 GitHub Pages 發佈

1. 將 ZIP 解壓縮。
2. 建立新的 GitHub Repository，將此資料夾內的**所有內容**放在 Repository 根目錄。
3. Commit 並 Push。
4. 開啟 Repository 的 **Settings → Pages**。
5. 在 Build and deployment 中選擇 **Deploy from a branch**，分支選 `main`，資料夾選 `/(root)`，然後儲存。
6. 等 GitHub Pages 顯示部署網址後開啟網站，測試各項功能。

建議使用 GitHub Desktop 上傳整個資料夾，避免漏掉 `assets/` 或 `js/data/` 內的檔案。不要只上傳 `index.html`。

## 本機測試

由於網站會使用 `fetch()` 讀取教材、音訊與資料檔，請使用本機 HTTP 伺服器，不要直接雙擊 `index.html`。例如在此資料夾開啟終端機並執行：

```bash
python -m http.server 8000
```

再用瀏覽器打開 `http://localhost:8000/`。

## 注意事項

- 本版本保留原本 localStorage / IndexedDB 的瀏覽器端儲存設計。不同網站網域或網址的本機資料不會自動同步；發布前請先匯出原站學習紀錄。
- GitHub Pages 是靜態主機；若使用 AI 家教功能中的外部 API，API 金鑰不應硬編碼到公開前端程式。請勿把個人金鑰提交至公開 Repository。
- 請參閱 `ATTRIBUTION.md` 確認媒體資產的公開散布權限。
