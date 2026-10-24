// v1.8.7 integrated Zhuyin materials: shared page layout and bilingual labels.
;
(function(){
  let materialsLoaded=false;
  try {
    Object.assign(PATCH_I18N.zh,{materials_title:'注音手冊與聲調影音中心',materials_nav:'注音手冊／影音'});
    Object.assign(PATCH_I18N.en,{materials_title:'Zhuyin Manual & Tone Practice Media',materials_nav:'Zhuyin Manual / Media'});
    PATCH_I18N.bi.materials_title='注音手冊與聲調影音中心\nZhuyin Manual & Tone Practice Media';
    PATCH_I18N.bi.materials_nav='注音手冊／影音\nZhuyin Manual / Media';
  } catch(e) {}
  function currentLang(){const s=document.getElementById('uiLanguage');return (s&&s.value)||'zh';}
  function applyMaterialsLanguage(){
    const lang=currentLang();
    const navText=lang==='en'?'Zhuyin Manual / Media':lang==='bi'?'注音手冊／影音\nZhuyin Manual / Media':'注音手冊／影音';
    document.querySelectorAll('[data-i18n="materials_nav"]').forEach(el=>{el.textContent=navText;el.classList.toggle('langline',lang==='bi')});
    const page=document.getElementById('view-materials');
    const note=page&&page.querySelector(':scope > p.muted.tiny');
    if(note){const zh='首次開啟會載入內建教材，檔案較大，請稍候。PDF 畫布閱讀需要網路載入 PDF.js；若無法載入，仍可嘗試瀏覽器 PDF 備援檢視。';const en='The embedded materials may take a moment to load on first use. Canvas-based PDF reading loads PDF.js from the internet; if it fails, try the browser PDF fallback.';note.textContent=lang==='en'?en:lang==='bi'?zh+'\n'+en:zh;note.classList.toggle('langline',lang==='bi')}
    const title=document.getElementById('pageTitle');
    if(title&&page&&page.classList.contains('active')){const val=typeof t==='function'?t('materials_title'):(lang==='en'?'Zhuyin Manual & Tone Practice Media':'注音手冊與聲調影音中心');title.textContent=val;title.classList.toggle('langline',lang==='bi')}
    if(!page)return;
    page.lang=lang==='en'?'en':'zh-Hant';
    const map={
      '正在準備內建教材…':['Preparing built-in materials…','正在準備內建教材…\nPreparing built-in materials…'],
      '📖 PDF 閱讀器':['📖 PDF Reader','📖 PDF 閱讀器 / PDF Reader'],
      '🎧 影片播放器':['🎧 Video Player','🎧 影片播放器 / Video Player'],
      '🗂️ 教材書庫':['🗂️ Material Library','🗂️ 教材書庫 / Material Library'],
      'PDF READING ROOM':['PDF READING ROOM','PDF 閱讀區 / PDF READING ROOM'],
      '📖 注音符號手冊':['📖 Zhuyin Symbols Manual','📖 注音符號手冊 / Zhuyin Symbols Manual'],
      '使用 PDF.js 顯示頁面，可切換頁碼、縮放、搜尋本文，也能匯入其他 PDF。內建手冊會在首次開啟時存入瀏覽器資料庫。':['Use PDF.js to view pages, change pages and zoom, search the text, or import other PDFs. The built-in manual is saved to this browser on first use.','使用 PDF.js 顯示頁面、切換頁碼、縮放、搜尋本文，也可匯入其他 PDF。\nUse PDF.js to view pages, change pages and zoom, search the text, or import other PDFs.'],
      '← 上一頁':['← Previous Page','← 上一頁 / Previous Page'], '頁碼':['Page','頁碼 / Page'], '下一頁 →':['Next Page →','下一頁 / Next Page →'],
      '符合寬度':['Fit Width','符合寬度 / Fit Width'], '搜尋':['Search','搜尋 / Search'], '上一個':['Previous Match','上一個 / Previous Match'], '下一個':['Next Match','下一個 / Next Match'], '瀏覽器開啟':['Open in Browser','瀏覽器開啟 / Open in Browser'],
      '搜尋本文中的字詞（例如：tone）':['Search text (e.g. tone)','搜尋本文中的字詞（例如：tone） / Search text'],
      '正在載入 PDF 閱讀器…':['Loading PDF reader…','正在載入 PDF 閱讀器…\nLoading PDF reader…'], '準備載入內建 PDF。':['Preparing built-in PDF.','準備載入內建 PDF。\nPreparing built-in PDF.'],
      '📚 電子書架':['📚 PDF Bookshelf','📚 電子書架 / PDF Bookshelf'], '選擇已儲存的 PDF，或匯入你自己的手冊。':['Choose a saved PDF or import your own manual.','選擇已儲存的 PDF，或匯入自己的手冊。\nChoose a saved PDF or import your own manual.'], '＋ 匯入 PDF':['＋ Import PDF','＋ 匯入 PDF / Import PDF'], '內建手冊首次初始化中。':['Initializing built-in manual.','內建手冊首次初始化中。\nInitializing built-in manual.'],
      '閱讀小提示':['Reading Tips','閱讀小提示 / Reading Tips'], '用上一頁、下一頁或直接輸入頁碼跳轉。':['Use Previous/Next or enter a page number to jump.','用上一頁、下一頁或輸入頁碼跳轉。\nUse Previous/Next or enter a page number to jump.'], '縮放按鈕可調整頁面大小；「符合寬度」會配合閱讀區。':['Use zoom buttons to resize the page; Fit Width matches the reading area.','縮放按鈕可調整頁面大小；「符合寬度」會配合閱讀區。\nUse zoom buttons to resize the page; Fit Width matches the reading area.'], '搜尋結果會跳至含有關鍵字的頁面。':['Search results jump to pages containing the keyword.','搜尋結果會跳至含有關鍵字的頁面。\nSearch results jump to pages containing the keyword.'], '若 PDF.js CDN 無法連線，可改用瀏覽器內建 PDF 檢視器。':['If the PDF.js CDN is unavailable, use the browser’s built-in PDF viewer.','若 PDF.js CDN 無法連線，可改用瀏覽器內建 PDF 檢視器。\nIf the PDF.js CDN is unavailable, use the browser’s built-in PDF viewer.'],
      'TONE & LISTENING CENTER':['TONE & LISTENING CENTER','聲調與聆聽中心 / TONE & LISTENING CENTER'], '🎧 四聲與韻母練習':['🎧 Four Tones & Finals Practice','🎧 四聲與韻母練習 / Four Tones & Finals Practice'], '內建聲調練習影片。可調整播放速度、循環播放，亦可加入電腦或手機中的其他影音檔，並保存在本機影音書庫。':['Built-in tone practice video. Adjust playback speed, loop playback, or add media from your computer or phone to the local library.','內建聲調練習影片，可調整速度、循環播放，也可將電腦或手機中的影音加入本機書庫。\nBuilt-in tone practice video. Adjust playback speed, loop playback, or add media to the local library.'],
      '▶ 目前播放':['▶ Now Playing','▶ 目前播放 / Now Playing'], '內建影片':['Built-in Video','內建影片 / Built-in Video'], '準備載入聲調練習影片':['Preparing tone practice video','準備載入聲調練習影片 / Preparing tone practice video'], '影片資料會在首次開啟時存入本機資料庫。':['The video is saved to the local database on first use.','影片資料會在首次開啟時存入本機資料庫。\nThe video is saved to the local database on first use.'],
      '⏮ 上一部':['⏮ Previous Video','⏮ 上一部 / Previous Video'], '下一部 ⏭':['Next Video ⏭','下一部 / Next Video ⏭'], '播放速度':['Playback Speed','播放速度 / Playback Speed'], '單曲循環':['Loop One','單曲循環 / Loop One'], '↻ 從頭播放':['↻ Restart','↻ 從頭播放 / Restart'], '另開影片檔':['Open Video File','另開影片檔 / Open Video File'], '↓ 下載影片':['↓ Download Video','↓ 下載影片 / Download Video'], '■ 停止':['■ Stop','■ 停止 / Stop'], '內建影片正在初始化。':['Initializing built-in video.','內建影片正在初始化。\nInitializing built-in video.'],
      '🎞️ 影片清單':['🎞️ Video Playlist','🎞️ 影片清單 / Video Playlist'], '選擇影片即可播放。':['Select a video to play it.','選擇影片即可播放。\nSelect a video to play it.'], '＋ 匯入影音檔':['＋ Import Media','＋ 匯入影音檔 / Import Media'], '準備就緒。':['Ready.','準備就緒。\nReady.'], '📝 建議練習方式':['📝 Suggested Practice','📝 建議練習方式 / Suggested Practice'],
      '先完整看一次，了解影片安排的四聲與韻母練習。':['Watch once to understand the four-tone and finals exercises.','先完整看一次，了解四聲與韻母練習。\nWatch once to understand the four-tone and finals exercises.'], '再以 0.5× 或 0.75× 慢速播放，聽清楚後跟讀。':['Replay at 0.5× or 0.75× and repeat after listening carefully.','再以 0.5× 或 0.75× 慢速播放，聽清楚後跟讀。\nReplay at 0.5× or 0.75× and repeat after listening carefully.'], '每次聽到一組發音，先模仿，再暫停自行重複。':['Imitate each sound group, then pause and repeat it yourself.','每次聽到一組發音，先模仿，再暫停自行重複。\nImitate each sound group, then pause and repeat it yourself.'], '最後回到 1× 速度，確認能自然跟上。':['Return to 1× speed and check that you can follow naturally.','最後回到 1× 速度，確認能自然跟上。\nReturn to 1× speed and check that you can follow naturally.'],
      'LOCAL MATERIALS LIBRARY':['LOCAL MATERIALS LIBRARY','本機教材書庫 / LOCAL MATERIALS LIBRARY'], 'PDF 與影音分開管理，檔案內容保存在這個瀏覽器的 IndexedDB。本頁提供書庫摘要及匯入方式；若清除瀏覽器網站資料，已儲存檔案也可能被清除。':['PDFs and media are managed separately and stored in this browser’s IndexedDB. Clearing browser site data may erase saved files.','PDF 與影音分開管理，檔案保存在此瀏覽器的 IndexedDB；清除網站資料可能會刪除已保存的檔案。\nPDFs and media are managed separately and stored in this browser’s IndexedDB. Clearing site data may erase saved files.'],
      '📖 PDF 電子書':['📖 PDF E-books','📖 PDF 電子書 / PDF E-books'], '本已保存 PDF':['PDFs saved','本已保存 PDF / PDFs saved'], '可從 PDF 閱讀器分頁匯入、開啟或刪除。':['Import, open, or delete files from the PDF Reader tab.','可從 PDF 閱讀器分頁匯入、開啟或刪除。\nImport, open, or delete files from the PDF Reader tab.'], '前往 PDF 閱讀器':['Go to PDF Reader','前往 PDF 閱讀器 / Go to PDF Reader'], '🎬 影音檔案':['🎬 Media Files','🎬 影音檔案 / Media Files'], '個已保存影音檔':['media files saved','個已保存影音檔 / media files saved'], '可從影片播放器分頁匯入、播放或刪除。':['Import, play, or delete files from the Video Player tab.','可從影片播放器分頁匯入、播放或刪除。\nImport, play, or delete files from the Video Player tab.'], '前往影片播放器':['Go to Video Player','前往影片播放器 / Go to Video Player'],
      '📦 備份與資料說明':['📦 Backup & Data','📦 備份與資料說明 / Backup & Data'], '檔案存在瀏覽器的本機資料庫，不會上傳到伺服器。請保留原始 PDF 與影片作為備份。這個 HTML 內含兩個初始教材，因此檔案本身較大；PDF.js 程式庫需要網路連線，若無法載入，可使用瀏覽器備用檢視器。':['Files stay in the browser’s local database and are not uploaded. Keep original PDFs and videos as backups. This HTML includes two starter materials, so the file is large. PDF.js requires internet access; use the browser fallback if it cannot load.','檔案保存在瀏覽器本機，不會上傳。請保留原始 PDF 與影片備份。此 HTML 內含兩份初始教材，因此檔案較大；PDF.js 需要網路，無法載入時可使用瀏覽器備援檢視器。\nFiles stay in the browser’s local database and are not uploaded. Keep original PDFs and videos as backups.'],
      '重新整理書庫':['Refresh Library','重新整理書庫 / Refresh Library'], '匯出書庫清單 JSON':['Export Library List JSON','匯出書庫清單 JSON / Export Library List JSON'], '尚未更新。':['Not updated yet.','尚未更新。\nNot updated yet.'], '單一 HTML 檔案｜教材首次載入後儲存在瀏覽器本機｜建議使用最新版 Chrome 或 Edge':['Single HTML file | Materials are stored locally after first load | Latest Chrome or Edge recommended','單一 HTML 檔案｜教材首次載入後儲存在瀏覽器本機｜建議使用最新版 Chrome 或 Edge\nSingle HTML file | Materials stored locally after first load | Latest Chrome or Edge recommended'],
      '首頁':['Home','首頁 / Home'], '課程':['Lessons','課程 / Lessons'], '地圖':['Curriculum Map','地圖 / Curriculum Map'], '個人化學習':['Personalized Learning','個人化學習 / Personalized Learning'], '單字':['Vocabulary','單字 / Vocabulary'], '測驗':['Quiz','測驗 / Quiz'], '設定':['Settings','設定 / Settings'], '教材':['Materials','教材 / Materials'],
      '注音學習中心｜PDF 閱讀器與影音中心':['Zhuyin Learning Center | PDF Reader & Media','注音學習中心｜PDF 閱讀器與影音中心\nZhuyin Learning Center | PDF Reader & Media'],
       '閱讀':['Open','閱讀 / Open'], '刪除':['Delete','刪除 / Delete'], '播放':['Play','播放 / Play'],
       '內建教材':['Built-in material','內建教材 / Built-in material'], '本機匯入':['Imported locally','本機匯入 / Imported locally'],
       '書架目前是空的。':['The bookshelf is empty.','書架目前是空的。\nThe bookshelf is empty.'], '尚無影音檔。':['No media files yet.','尚無影音檔。\nNo media files yet.'],
       'PDF.js 無法從 CDN 載入；可點「瀏覽器開啟」使用內建 PDF 檢視器。':['PDF.js could not load from the CDN. Use “Open in Browser” to view the built-in PDF.','PDF.js 無法從 CDN 載入；可點「瀏覽器開啟」使用內建 PDF 檢視器。\nPDF.js could not load from the CDN. Use “Open in Browser” to view the built-in PDF.'],
       'PDF.js 無法載入或解析文件。可嘗試「瀏覽器開啟」。':['PDF.js could not load or parse this file. Try “Open in Browser”.','PDF.js 無法載入或解析文件。可嘗試「瀏覽器開啟」。\nPDF.js could not load or parse this file. Try “Open in Browser”.'],
       '請先輸入要搜尋的字詞。':['Enter a search term first.','請先輸入要搜尋的字詞。\nEnter a search term first.'],
       '初始化失敗':['Initialization failed','初始化失敗 / Initialization failed'],
       '內建教材已就緒':['Built-in materials ready','內建教材已就緒 / Built-in materials ready'],
       '內建 PDF 已加入書架。':['Built-in PDF added to the bookshelf.','內建 PDF 已加入書架。\nBuilt-in PDF added to the bookshelf.'],
       '內建影片已加入影音清單。':['Built-in video added to the media list.','內建影片已加入影音清單。\nBuilt-in video added to the media list.'],
       '內建影片已就緒。按播放鍵開始練習。':['Built-in video is ready. Press Play to begin.','內建影片已就緒。按播放鍵開始練習。\nBuilt-in video is ready. Press Play to begin.'],
       '初始化本機書庫…':['Initializing local library…','初始化本機書庫…\nInitializing local library…'],
       '準備載入內建 PDF。':['Preparing built-in PDF.','準備載入內建 PDF。\nPreparing built-in PDF.'],
       '內建手冊首次初始化中。':['Initializing the built-in manual.','內建手冊首次初始化中。\nInitializing the built-in manual.'],
       '內建影片正在初始化。':['Initializing the built-in video.','內建影片正在初始化。\nInitializing the built-in video.'],
       '已停止播放。':['Playback stopped.','已停止播放。\nPlayback stopped.'],
       '書庫已重新整理。':['Library refreshed.','書庫已重新整理。\nLibrary refreshed.'],
       '已匯出清單。此 JSON 不包含影音檔案本體。':['Manifest exported. This JSON does not include the media files themselves.','已匯出清單。此 JSON 不包含影音檔案本體。\nManifest exported. This JSON does not include the media files themselves.']
    };
    const own=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
    const reverseMap=new Map();
    for(const [key,pair] of Object.entries(map)){if(Array.isArray(pair)){reverseMap.set(pair[0],key);reverseMap.set(pair[1],key)}}
    const dynamicText=(value,locale)=>{
      const text=String(value??'').trim();
      const rules=[
        [/^初始化失敗[:：]\s*(.*)$/s,m=>`Initialization failed: ${m[1]}`,m=>`初始化失敗：${m[1]}\nInitialization failed: ${m[1]}`],
        [/^正在載入：(.+)$/,m=>`Loading: ${m[1]}`,m=>`正在載入：${m[1]}\nLoading: ${m[1]}`],
        [/^已開啟：(.+)（共\s*(\d+)\s*頁）$/,m=>`Opened: ${m[1]} (${m[2]} pages total)`,m=>`已開啟：${m[1]}（共 ${m[2]} 頁）\nOpened: ${m[1]} (${m[2]} pages total)`],
        [/^頁面顯示失敗：(.+)$/,m=>`Page rendering failed: ${m[1]}`,m=>`頁面顯示失敗：${m[1]}\nPage rendering failed: ${m[1]}`],
        [/^找不到「(.+)」。$/,m=>`No matches found for “${m[1]}”.`,m=>`找不到「${m[1]}」。\nNo matches found for “${m[1]}”.`],
        [/^搜尋「(.+)」：第\s*(\d+)\s*\/\s*(\d+)\s*個符合頁面（目前第\s*(\d+)\s*頁）。$/,m=>`Search “${m[1]}”: match ${m[2]} of ${m[3]} (current page ${m[4]}).`,m=>`搜尋「${m[1]}」：第 ${m[2]} / ${m[3]} 個符合頁面（目前第 ${m[4]} 頁）。\nSearch “${m[1]}”: match ${m[2]} of ${m[3]} (current page ${m[4]}).`],
        [/^匯入完成：(\d+) 個成功。(.*)$/s,m=>`Import complete: ${m[1]} successful.${m[2]||''}`,m=>`匯入完成：${m[1]} 個成功。${m[2]||''}\nImport complete: ${m[1]} successful.${m[2]||''}`],
        [/^匯入完成：(\d+) 個檔案已保存至本機書庫。$/,m=>`Import complete: ${m[1]} file(s) saved to the local library.`,m=>`匯入完成：${m[1]} 個檔案已保存至本機書庫。\nImport complete: ${m[1]} file(s) saved to the local library.`],
        [/^正在播放清單中的「(.+)」。$/,m=>`Playing “${m[1]}” from the playlist.`,m=>`正在播放清單中的「${m[1]}」。\nPlaying “${m[1]}” from the playlist.`],
        [/^已刪除\s*(.+)$/,m=>`Deleted ${m[1]}`,m=>`已刪除 ${m[1]}\nDeleted ${m[1]}`],
        [/^正在搜尋|^搜尋中…$/,m=>'Searching…',m=>`正在搜尋\nSearching…`]
      ];
      for(const [re,enFn,biFn] of rules){const m=text.match(re);if(m)return locale==='en'?enFn(m):locale==='bi'?biFn(m):text}
      if(locale==='zh')return text;
      // Translate recognized fragments inside status messages while leaving user filenames untouched.
      const phrases=[['不是 PDF','not a PDF'],['檔案太小','file is too small'],['檔案內容不正確','invalid file content'],['已保存至本機書庫','saved to the local library'],['使用內建 PDF 檢視器','use the built-in PDF viewer']];
      let result=text;for(const [zh,en] of phrases){if(result.includes(zh))result=result.split(zh).join(locale==='en'?en:`${zh}\n${en}`)}
      return result;
    };
    const localizeText=(raw)=>{
      const current=String(raw??''),trimmed=current.trim();
      const key=own(map,trimmed)?trimmed:reverseMap.get(trimmed);
      if(key!==undefined&&Array.isArray(map[key])){const replacement=lang==='en'?map[key][0]:lang==='bi'?map[key][1]:key;return current.replace(trimmed,replacement)}
      const replacement=dynamicText(trimmed,lang);
      return replacement===trimmed?current:current.replace(trimmed,replacement);
    };
    const walker=document.createTreeWalker(page,NodeFilter.SHOW_TEXT);let n;
    while((n=walker.nextNode())){
      if(!own(n,'__zhuyinOriginal')){
        const raw=n.nodeValue,trimmed=raw.trim(),key=own(map,trimmed)?trimmed:reverseMap.get(trimmed);
        n.__zhuyinOriginal=key!==undefined?raw.replace(trimmed,key):raw;
      }
      const translated=localizeText(n.__zhuyinOriginal);
      if(n.nodeValue!==translated)n.nodeValue=translated;
    }
    page.querySelectorAll('[title],[aria-label],[placeholder]').forEach(el=>{for(const a of ['title','aria-label','placeholder']){
      const prop='orig_'+a.replace(/[^a-z0-9]/gi,'_'),cur=el.getAttribute(a)||'';
      if(!own(el.dataset,prop)){const trimmed=cur.trim(),key=own(map,trimmed)?trimmed:reverseMap.get(trimmed);el.dataset[prop]=key!==undefined?cur.replace(trimmed,key):cur;}
      const translated=localizeText(el.dataset[prop]);if(el.getAttribute(a)!==translated)el.setAttribute(a,translated);
    }});
  }
  function openMaterials(){applyMaterialsLanguage();}
  document.querySelectorAll('[data-page="materials"]').forEach(btn=>btn.addEventListener('click',openMaterials));
  const oldGo=window.go;
  if(typeof oldGo==='function')window.go=function(page){oldGo(page);if(page==='materials')openMaterials();};
  const sel=document.getElementById('uiLanguage'), settings=document.getElementById('settingsLanguage');
  function syncLanguageSelectors(source){
    const value=source&&source.value?source.value:currentLang();
    if(sel&&sel.value!==value)sel.value=value;
    if(settings&&settings.value!==value)settings.value=value;
    setTimeout(applyMaterialsLanguage,0);
  }
  if(sel)sel.addEventListener('change',()=>syncLanguageSelectors(sel));
  if(settings)settings.addEventListener('change',()=>syncLanguageSelectors(settings));
  const oldRenderI18n=window.renderI18n;
  if(typeof oldRenderI18n==='function')window.renderI18n=function(){const r=oldRenderI18n.apply(this,arguments);applyMaterialsLanguage();return r;};
  window.applyMaterialsLanguage=applyMaterialsLanguage;
  // The PDF/media module writes status labels and shelf buttons asynchronously. Watch only
  // this sub-tree, and avoid repeated writes when a text node is already correctly localized.
  const materialsRoot=document.getElementById('view-materials');
  if(materialsRoot&&typeof MutationObserver==='function'){
    let refreshTimer=null,refreshing=false;
    const observer=new MutationObserver(records=>{
      if(refreshing||!records.some(r=>r.type==='childList'||r.type==='characterData'))return;
      if(refreshTimer)clearTimeout(refreshTimer);
      refreshTimer=setTimeout(()=>{
        refreshTimer=null;refreshing=true;
        try{applyMaterialsLanguage();}catch(e){console.warn('[i18n] Materials localization refresh failed:',e)}
        finally{refreshing=false;}
      },40);
    });
    observer.observe(materialsRoot,{subtree:true,childList:true,characterData:true});
  }
})();
