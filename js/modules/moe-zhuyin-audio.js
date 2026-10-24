/* 教育部《國語注音符號手冊》開放部件：音檔依手冊注音符號順序對應；CC BY 4.0。 */
(()=>{
const MOE_ZHUYIN_AUDIO = window.MOE_ZHUYIN_AUDIO_FILES;;
async function installMoeZhuyinAudio(){
 try{
  if(!window.AudioEngine||!AudioEngine.storage)return;
  let added=0,kept=0;
  for(const item of MOE_ZHUYIN_AUDIO){
   const existing=await AudioEngine.storage.get("core",item.symbol);
   if(existing){kept++;continue;}
   const response=await fetch(item.url);
   if(!response.ok) throw new Error('無法載入注音音檔：'+item.name+' ('+response.status+')');
   const audioBytes=await response.arrayBuffer();
   await AudioEngine.storage.put("core",{key:item.symbol,symbol:item.symbol,blob:new Blob([audioBytes],{type:"audio/wav"}),fileName:item.name,source:"Ministry of Education, R.O.C. (Taiwan), The Manual of the Phonetic Symbols of Mandarin Chinese",license:"CC BY 4.0",attribution:"2017 © Ministry of Education, R.O.C. (Taiwan), The Manual of the Phonetic Symbols of Mandarin Chinese — CC BY 4.0",addedAt:new Date().toISOString()});added++;
  }
  if(typeof refreshCoreAudioStatus==="function")await refreshCoreAudioStatus();
  if(added&&typeof toast==="function")toast("已內建教育部注音錄音：新增 "+added+" 個符號音檔。來源：教育部《國語注音符號手冊》，CC BY 4.0。");
 }catch(e){console.warn("MOE Zhuyin audio initialization failed",e);}
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",installMoeZhuyinAudio,{once:true});else installMoeZhuyinAudio();
})();
