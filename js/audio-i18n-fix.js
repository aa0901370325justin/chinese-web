(()=>{
  const patch={
    zh:{
      audio_core_recordings_desc:'本 HTML 已內嵌 37 個教育部注音符號錄音，不需另外下載或匯入即可播放。若要替換錄音，可在下方匯入音檔並對應符號。',
      audio_core_note:'內嵌教育部錄音可直接播放；額外匯入的音檔會存放在目前瀏覽器的 IndexedDB。若 IndexedDB 不可用，內嵌錄音仍可播放，但自訂音檔可能無法保存。',
      audio_engine_store_unavailable:'IndexedDB 不可用；自訂錄音可能無法保存，但 HTML 內嵌的教育部錄音仍可播放。',
      audio_symbol_missing:'此符號沒有可用錄音，且未提供例字備援。',
      audio_symbol_fallback:'符號錄音暫時無法使用，改播放例字作為備援。'
    },
    en:{
      audio_core_recordings_desc:'This HTML includes all 37 MOE Zhuyin recordings. These are used by default; newly imported mapped files replace a symbol only when explicitly imported. Official files named F1.WAV–F37.WAV are matched automatically.',
      audio_core_note:'Built-in MOE recordings can play directly. Additional imported files are stored in this browser’s IndexedDB. If IndexedDB is unavailable, the built-in recordings still work, but custom files may not persist.',
      audio_engine_store_unavailable:'IndexedDB is unavailable; custom recordings may not persist, but the MOE recordings embedded in this HTML can still play.',
      audio_symbol_missing:'No recording is available for this symbol, and no example-word fallback was provided.',
      audio_symbol_fallback:'The symbol recording is unavailable. Playing the example word as a fallback.'
    },
    bi:{
      audio_core_recordings_desc:'本 HTML 已內嵌 37 個教育部注音符號錄音，預設優先使用正確的內嵌錄音。若要自訂替換，請重新匯入並確認符號對應；F1.WAV–F37.WAV 會自動對應。\nThis HTML includes all 37 MOE Zhuyin recordings and uses them by default. Newly imported mapped files can explicitly replace a symbol; F1.WAV–F37.WAV filenames are recognized automatically.',
      audio_core_note:'內嵌教育部錄音可直接播放；額外匯入的音檔會存放在目前瀏覽器的 IndexedDB。若 IndexedDB 不可用，內嵌錄音仍可播放，但自訂音檔可能無法保存。\nBuilt-in MOE recordings can play directly. Additional imported files are stored in this browser’s IndexedDB. If IndexedDB is unavailable, the built-in recordings still work, but custom files may not persist.',
      audio_engine_store_unavailable:'IndexedDB 不可用；自訂錄音可能無法保存，但 HTML 內嵌的教育部錄音仍可播放。\nIndexedDB is unavailable; custom recordings may not persist, but the MOE recordings embedded in this HTML can still play.',
      audio_symbol_missing:'此符號沒有可用錄音，且未提供例字備援。\nNo recording is available for this symbol, and no example-word fallback was provided.',
      audio_symbol_fallback:'符號錄音暫時無法使用，改播放例字作為備援。\nThe symbol recording is unavailable. Playing the example word as a fallback.'
    }
  };
  try{for(const [lang,dict] of Object.entries(patch))if(typeof PATCH_I18N!=='undefined'&&PATCH_I18N[lang])Object.assign(PATCH_I18N[lang],dict);}catch(e){console.warn('[i18n] audio translation patch could not be applied',e)}
  const refresh=()=>{try{if(typeof window.renderI18n==='function')window.renderI18n();if(typeof window.renderZhuyin==='function')window.renderZhuyin();if(typeof window.refreshCoreAudioStatus==='function')Promise.resolve(window.refreshCoreAudioStatus()).catch(()=>{});}catch(e){console.warn('[audio] final refresh failed',e)}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',refresh,{once:true});else refresh();
})();
