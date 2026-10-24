(function(){
  'use strict';
  const currentLanguage=()=>{
    const el=document.getElementById('uiLanguage')||document.getElementById('settingsLanguage');
    const value=el&&el.value;
    return ['zh','en','bi'].includes(value)?value:'zh';
  };
  const bilingual=(zh,en)=>`${zh}\n${en}`;
  function setText(el,zh,en){
    if(!el)return;
    const lang=currentLanguage();
    const value=lang==='en'?en:lang==='bi'?bilingual(zh,en):zh;
    el.textContent=value;
    if(el.classList)el.classList.toggle('langline',lang==='bi');
  }
  function setAttr(el,name,zh,en){
    if(!el)return;
    const lang=currentLanguage();
    el.setAttribute(name,lang==='en'?en:lang==='bi'?bilingual(zh,en):zh);
  }
  function applyUnmappedStaticLabels(){
    const lang=currentLanguage();
    // Navigation and the stroke-order view had static headings outside data-i18n.
    setText(document.querySelector('[data-page="strokeorder"] span:not(.ico)'),'國字筆順','Stroke Order');
    const stroke=document.getElementById('view-strokeorder');
    if(stroke){
      setText(stroke.querySelector('.page-intro .eyebrow'),'筆順練習','STROKE ORDER');
      setText(stroke.querySelector('.page-intro h2'),'國字筆順與寫字練習','Chinese Character Stroke Order');
      setText(stroke.querySelector('#strokeOrderPractice > .pill'),'國字筆順 · 筆順練習','Stroke Order · Character Writing');
      setText(stroke.querySelector('#strokeOrderPractice > h3'),'國字筆順與寫字練習（已整合）','Chinese Character Stroke Order (Integrated)');
    }
    // This button was hard-coded and never had a translation key.
    setText(document.querySelector('button[onclick*="playToneSequence"]'),'▶ 連續播放五聲調','▶ Play All Five Tones');
    // Two grammar-card headings were examples of Chinese-English mixing, not localized UI.
    const grammarHeadings=document.querySelectorAll('#view-grammar .extra-card h3');
    if(grammarHeadings[0])setText(grammarHeadings[0],'想要 + noun / 想要 + verb','Want + noun / want to + verb');
    if(grammarHeadings[1])setText(grammarHeadings[1],'可以 + verb + 嗎？','Can I + verb?');
    // Keep the default dialogue status localized until a practice result has been recorded.
    const dialogueResult=document.getElementById('dialogueResult');
    if(dialogueResult&&dialogueResult.dataset.messageZh===undefined)setText(dialogueResult,'尚未開始','Not started');
    // The daily-conversation lab mixed Chinese-only instructions with bilingual buttons.
    const dialogue=document.getElementById('dailyConversationLab');
    if(dialogue){
      const head=dialogue.querySelector('.card-heading');
      if(head){setText(head.querySelector('.pill'),'每日情境對話','DAILY CONVERSATION');setText(head.querySelector('h3'),'日常情境對話','Daily conversations');}
      setText(dialogue.querySelector(':scope > p.muted'),'選擇情境，聽標準句，再用麥克風跟讀。辨識結果只能比較文字，不等於聲調或口音評分。','Choose a situation, listen to the model sentence, then repeat using the microphone. Recognition compares text only; it does not score tones or accent.');
      setText(dialogue.querySelector('.two-col > .card:first-child .eyebrow'),'你可以這樣說','YOU CAN SAY');
      setText(dialogue.querySelector('.two-col > .card:nth-child(2) .eyebrow'),'你的練習','YOUR PRACTICE');
      setText(document.getElementById('dialoguePrompt'),'先聽一次，再清楚地說出整句。','Listen once, then say the full sentence clearly.');
      setText(document.getElementById('dialogueListen'),'🔊 聽句子','🔊 Play sentence');
      setText(document.getElementById('dialogueSpeak'),'🎙 跟讀辨識','🎙 Speak and check');
      setText(document.getElementById('dialoguePrev'),'← 上一句','← Previous sentence');
      setText(document.getElementById('dialogueNext'),'下一句 →','Next sentence →');
      const scenarios={market:['購物','Shopping'],food:['餐廳','Restaurant'],transport:['交通','Transportation'],cafe:['咖啡店','Café'],help:['尋求協助','Asking for help'],social:['日常社交','Small talk']};
      const select=document.getElementById('dialogueScenario');
      if(select)for(const option of Array.from(select.options)){const pair=scenarios[option.value];if(pair)option.textContent=lang==='en'?pair[1]:lang==='bi'?bilingual(pair[0],pair[1]):pair[0];}
      const label=dialogue.querySelector('label[for="dialogueScenario"]');setText(label,'情境','Situation');
      const privacy=dialogue.querySelector(':scope > p.muted.tiny');
      setText(privacy,'隱私提醒：瀏覽器語音辨識在部分環境會使用線上服務；請勿在不願上傳語音的情況下啟用。單一 HTML 的其他學習功能可離線使用，但語音辨識不保證離線。','Privacy: Browser speech recognition may use an online service in some environments. Do not enable it if you do not want your speech uploaded. Other features in this single HTML file can work offline, but speech recognition is not guaranteed to work offline.');
    }
    if(typeof window.refreshDialogueLanguage==='function')window.refreshDialogueLanguage();
    // The full local-backup card is intentionally separate from the regular settings dictionary.
    const settings=document.getElementById('view-settings');
    const backupCard=settings&&Array.from(settings.children).find(el=>el.classList&&el.classList.contains('card')&&el.querySelector('#fullBackupExport'));
    if(backupCard){
      setText(backupCard.querySelector('.card-heading h3'),'本機資料備份','Local Data Backup');
      setText(backupCard.querySelector(':scope > p'),
        '匯出本系統的 localStorage 學習進度與設定；匯入會覆蓋相同名稱的系統資料。PDF／影音庫資料由 IndexedDB 管理，不包含在此 JSON 備份內。',
        'Export this app’s localStorage learning progress and settings. Importing overwrites records with matching names. PDF and media library data is managed by IndexedDB and is not included in this JSON backup.');
      setText(backupCard.querySelector('#fullBackupExport'),'匯出完整學習資料','Export Full Learning Backup');
      setText(backupCard.querySelector('#fullBackupImport'),'匯入備份','Import Backup');
    }
    setAttr(document.getElementById('weeklyChart'),'aria-label','最近七天學習時間','Study time over the last seven days');
    setAttr(document.getElementById('coreAudioMapping'),'aria-label','核心錄音符號對應','Core recording symbol mapping');
    // Keep select controls in sync even when the language is changed from Settings.
    for(const id of ['uiLanguage','settingsLanguage']){
      const select=document.getElementById(id);if(!select)continue;
      const labels=lang==='en'?{zh:'Traditional Chinese',en:'English',bi:'Chinese / English'}:
        lang==='bi'?{zh:'繁體中文 / Traditional Chinese',en:'英文 / English',bi:'中文 / English'}:
        {zh:'繁體中文',en:'English',bi:'中文 / English'};
      for(const option of Array.from(select.options))if(labels[option.value])option.textContent=labels[option.value];
      select.value=lang;
    }
  }
  function refreshDynamicViews(){
    const active=document.querySelector('.view.active');
    const page=active?active.id.replace(/^view-/,''):'';
    // Refresh components whose labels are created in JavaScript rather than data-i18n markup.
    if(page==='flashcards'&&typeof window.renderFlashcard==='function')window.renderFlashcard();
    if(page==='learning'&&typeof window.renderLearningEngine==='function')window.renderLearningEngine();
    if(page==='zhuyin'&&typeof window.renderZhuyin==='function')window.renderZhuyin();
    if(page==='reading'&&typeof window.renderArticleLibrary==='function')window.renderArticleLibrary();
    if(typeof window.renderStrokeOrderLanguage==='function')window.renderStrokeOrderLanguage();
    if(typeof window.refreshStrokeOrderIntegrationLanguage==='function')window.refreshStrokeOrderIntegrationLanguage();
    if(page==='settings'){
      if(typeof window.renderCoreAudioMapping==='function')window.renderCoreAudioMapping();
      if(typeof window.refreshCoreAudioStatus==='function')Promise.resolve(window.refreshCoreAudioStatus()).catch(()=>{});
    }
    if(page==='materials'&&typeof window.applyMaterialsLanguage==='function')window.applyMaterialsLanguage();
    if(page==='tutor'&&typeof window.renderTutorGreetingIfUntouched==='function')window.renderTutorGreetingIfUntouched();
    applyUnmappedStaticLabels();
  }
  const originalRender=window.renderI18n;
  let applying=false;
  window.renderI18n=function(){
    const result=typeof originalRender==='function'?originalRender.apply(this,arguments):undefined;
    if(!applying){
      applying=true;
      try{refreshDynamicViews();}
      catch(error){console.warn('[i18n repair] A dynamic view could not be refreshed:',error);}
      finally{applying=false;}
    }
    return result;
  };
  // Apply the repair to the restored language and render once so the initial page is consistent too.
  try{window.renderI18n();}catch(error){console.warn('[i18n repair] Initial language refresh failed:',error);applyUnmappedStaticLabels();}
})();
