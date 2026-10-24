# 拆分檢查報告｜1.9.17

來源檔：`Taiwan_Mandarin_Learning_1.9.17_Zhuyin_Final_Audio_Order_Fix.html`  
來源大小：77,647,944 bytes  
專案版本：Taiwan Mandarin 1.9.17「韻母音檔順序修正版」

## 拆分結果

- HTML 主頁：`index.html`
- CSS：4 個外部樣式檔
- JavaScript：將原本 10 個內嵌 script 拆成外部檔案與資料檔
- 詞彙資料：2,960 筆
- 筆順 ID：6,063 筆
- 筆順圖片資料：6,063 筆，分成 8 個資料腳本
- 教育部注音音檔：37 個 WAV，依原本符號順序保存；metadata 中每個符號對應的檔名未重新排序
- PDF：`assets/media/zhuyin-manual.pdf`，9,190,618 bytes，檔頭檢查通過
- MP4：`assets/media/tone-practice.mp4`，22,843,191 bytes，MP4 `ftyp` 檔頭檢查通過

## 自動檢查

- 通過：原始 4 個 style 區塊已外移為 CSS 檔
- 通過：原始 10 個 script 區塊已外移；HTML 不再包含內嵌 script 或 style
- 通過：HTML 內所有相對路徑 CSS／JavaScript 引用均存在
- 通過：20 個外部 JavaScript 檔案全部通過 `node --check` 語法檢查
- 通過：詞彙／筆順 ID／筆順圖片筆數核對
- 通過：37 個 WAV 檔均有 RIFF/WAVE 檔頭
- 通過：PDF 與 MP4 檔頭檢查

## 尚未驗證

- 尚未完成真實瀏覽器中的全頁點擊測試。嘗試使用 Chromium 開啟本機 HTTP 網址與檔案網址時，執行環境均回傳 `ERR_BLOCKED_BY_ADMINISTRATOR`，因此未能進行真實點擊測試。請部署至 GitHub Pages 或用本機 HTTP 伺服器後，依序測試今日課程、測驗、單字庫、注音播放、韻母音檔順序、手冊／影音載入、筆順查詢、匯出與還原備份。
- 外部 MOE 筆順服務需要網路，服務本身不可由這個靜態專案保證可用。
- 如以公開 Repository 發佈，請先確認影片與 PDF 等資產的再散布授權；原始 HTML 內含媒體不等於授權已獲確認。
- AI 家教使用的 API 金鑰不可放在公開前端程式碼中；應確認原功能的設定方式與安全風險。

## 重要提醒

此拆分保留原始前端儲存設計，不會自動把舊網站網域的 localStorage／IndexedDB 搬到新的 GitHub Pages 網址。更換網址前請從舊站匯出學習紀錄並保留備份。
