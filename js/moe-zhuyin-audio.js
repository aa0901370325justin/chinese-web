/* 教育部《國語注音符號手冊》開放部件：音檔依手冊注音符號順序對應；CC BY 4.0。 */
(()=>{
const MOE_ZHUYIN_AUDIO=[{"symbol":"ㄅ","name":"F1.WAV","url":"./assets/audio/moe/f1.wav"},{"symbol":"ㄆ","name":"F2.WAV","url":"./assets/audio/moe/f2.wav"},{"symbol":"ㄇ","name":"F3.WAV","url":"./assets/audio/moe/f3.wav"},{"symbol":"ㄈ","name":"F4.WAV","url":"./assets/audio/moe/f4.wav"},{"symbol":"ㄉ","name":"F5.WAV","url":"./assets/audio/moe/f5.wav"},{"symbol":"ㄊ","name":"F6.WAV","url":"./assets/audio/moe/f6.wav"},{"symbol":"ㄋ","name":"F7.WAV","url":"./assets/audio/moe/f7.wav"},{"symbol":"ㄌ","name":"F8.WAV","url":"./assets/audio/moe/f8.wav"},{"symbol":"ㄍ","name":"F9.WAV","url":"./assets/audio/moe/f9.wav"},{"symbol":"ㄎ","name":"F10.WAV","url":"./assets/audio/moe/f10.wav"},{"symbol":"ㄏ","name":"F11.WAV","url":"./assets/audio/moe/f11.wav"},{"symbol":"ㄐ","name":"F12.WAV","url":"./assets/audio/moe/f12.wav"},{"symbol":"ㄑ","name":"F13.WAV","url":"./assets/audio/moe/f13.wav"},{"symbol":"ㄒ","name":"F14.WAV","url":"./assets/audio/moe/f14.wav"},{"symbol":"ㄓ","name":"F15.WAV","url":"./assets/audio/moe/f15.wav"},{"symbol":"ㄔ","name":"F16.WAV","url":"./assets/audio/moe/f16.wav"},{"symbol":"ㄕ","name":"F17.WAV","url":"./assets/audio/moe/f17.wav"},{"symbol":"ㄖ","name":"F18.WAV","url":"./assets/audio/moe/f18.wav"},{"symbol":"ㄗ","name":"F19.WAV","url":"./assets/audio/moe/f19.wav"},{"symbol":"ㄘ","name":"F20.WAV","url":"./assets/audio/moe/f20.wav"},{"symbol":"ㄙ","name":"F21.WAV","url":"./assets/audio/moe/f21.wav"},{"symbol":"ㄚ","name":"F22.WAV","url":"./assets/audio/moe/f22.wav"},{"symbol":"ㄛ","name":"F23.WAV","url":"./assets/audio/moe/f23.wav"},{"symbol":"ㄜ","name":"F24.WAV","url":"./assets/audio/moe/f24.wav"},{"symbol":"ㄝ","name":"F25.WAV","url":"./assets/audio/moe/f25.wav"},{"symbol":"ㄞ","name":"F26.WAV","url":"./assets/audio/moe/f26.wav"},{"symbol":"ㄟ","name":"F27.WAV","url":"./assets/audio/moe/f27.wav"},{"symbol":"ㄠ","name":"F28.WAV","url":"./assets/audio/moe/f28.wav"},{"symbol":"ㄡ","name":"F29.WAV","url":"./assets/audio/moe/f29.wav"},{"symbol":"ㄢ","name":"F30.WAV","url":"./assets/audio/moe/f30.wav"},{"symbol":"ㄣ","name":"F31.WAV","url":"./assets/audio/moe/f31.wav"},{"symbol":"ㄤ","name":"F32.WAV","url":"./assets/audio/moe/f32.wav"},{"symbol":"ㄥ","name":"F33.WAV","url":"./assets/audio/moe/f33.wav"},{"symbol":"ㄦ","name":"F34.WAV","url":"./assets/audio/moe/f34.wav"},{"symbol":"ㄧ","name":"F35.WAV","url":"./assets/audio/moe/f35.wav"},{"symbol":"ㄨ","name":"F36.WAV","url":"./assets/audio/moe/f36.wav"},{"symbol":"ㄩ","name":"F37.WAV","url":"./assets/audio/moe/f37.wav"}];
const embeddedMoeAudioBlobCache=new Map();
window.getEmbeddedMoeZhuyinAudioSymbols=()=>MOE_ZHUYIN_AUDIO.map(item=>item.symbol);
window.getEmbeddedMoeZhuyinAudioBlob=async function(symbol){
 const item=MOE_ZHUYIN_AUDIO.find(entry=>entry.symbol===String(symbol||'').trim());
 if(!item)return null;
 if(embeddedMoeAudioBlobCache.has(item.symbol))return embeddedMoeAudioBlobCache.get(item.symbol);
 const audioResponse=await fetch(item.url);
 if(!audioResponse.ok)throw new Error('Bundled audio could not be loaded: '+item.name);
 const blob=new Blob([await audioResponse.arrayBuffer()],{type:'audio/wav'});
 embeddedMoeAudioBlobCache.set(item.symbol,blob);
 return blob;
};
async function installMoeZhuyinAudio(){
 try{
  if(!window.AudioEngine||!AudioEngine.storage)return;
  let added=0,kept=0;
  for(const item of MOE_ZHUYIN_AUDIO){
   const existing=await AudioEngine.storage.get("core",item.symbol);
   if(existing){kept++;continue;}
   const audioResponse=await fetch(item.url);if(!audioResponse.ok)throw new Error("Bundled audio could not be loaded: "+item.name);const audioBlob=new Blob([await audioResponse.arrayBuffer()],{type:"audio/wav"});
   await AudioEngine.storage.put("core",{key:item.symbol,symbol:item.symbol,blob:audioBlob,fileName:item.name,source:"Ministry of Education, R.O.C. (Taiwan), The Manual of the Phonetic Symbols of Mandarin Chinese",license:"CC BY 4.0",attribution:"2017 © Ministry of Education, R.O.C. (Taiwan), The Manual of the Phonetic Symbols of Mandarin Chinese — CC BY 4.0",addedAt:new Date().toISOString()});added++;
  }
  if(typeof refreshCoreAudioStatus==="function")await refreshCoreAudioStatus();
  if(added&&typeof toast==="function")toast("已內建教育部注音錄音：新增 "+added+" 個符號音檔。來源：教育部《國語注音符號手冊》，CC BY 4.0。");
 }catch(e){console.warn("MOE Zhuyin audio initialization failed",e);}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installMoeZhuyinAudio,{once:true});else installMoeZhuyinAudio();
})();
