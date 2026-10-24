(function(){
 const $id=(id)=>document.getElementById(id);
 const input=$id('strokeCharacterInput'), status=$id('strokeOrderStatus');
 const frame=$id('strokeOrderFrame'), placeholder=$id('strokeFramePlaceholder');
 const openCharBtn=$id('strokeOpenCharBtn');
 const openSiteBtn=$id('strokeOpenSiteBtn');
 const searchBtn=$id('strokeSearchBtn'), clearBtn=$id('strokeClearBtn');
 if(!input||!status||!frame)return;
 let currentId='',currentChar='',frameReady=false;
 const searchUrl='https://stroke-order.learningweb.moe.edu.tw/searchW.jsp?ID2=1';
 function tr(zh,en){const lang=$id('uiLanguage')?.value||'zh';return lang==='en'?en:lang==='bi'?zh+'\n'+en:zh;}
 function foundMessage(){return tr('已找到「'+currentChar+'」的教育部動畫編號（'+currentId+'），正在以教育部官方 dictFrame 嵌入網址載入筆順動畫。','Found the MOE animation ID ('+currentId+') for “'+currentChar+'”. Loading the official embedded stroke-order animation.');}
 function loadedMessage(){return tr('教育部筆順動畫頁已回應。若動畫未顯示或空白，請按「直接開啟目前中文字動畫」在新分頁觀看。','The MOE stroke-order page responded. If the animation is blank, open the current character animation in a new tab.');}
 function missingMessage(){return tr('字庫中沒有找到「'+currentChar+'」的教育部動畫編號。可開啟教育部國字查詢網站自行查詢。','No MOE animation ID was found for “'+currentChar+'”. Open the MOE character lookup site to search manually.');}
 function refreshLanguage(){
   if(searchBtn)searchBtn.textContent=tr('查詢筆順','Search stroke order');
   if(clearBtn)clearBtn.textContent=tr('清除','Clear');
   if(openCharBtn)openCharBtn.textContent=tr('直接開啟目前中文字動畫 ↗','Open current character animation ↗');
   if(openSiteBtn)openSiteBtn.textContent=tr('開啟教育部國字查詢 ↗','Open MOE character lookup ↗');
   if(!currentChar){status.textContent=tr('請輸入一個中文字。','Enter a Chinese character.');if(!placeholder.hidden)placeholder.textContent=tr('輸入中文字後，這裡會載入對應的教育部筆順動畫。','Enter a Chinese character to load its MOE stroke-order animation here.');}
   else if(currentId){status.textContent=frameReady?loadedMessage():foundMessage();}
   else{status.textContent=missingMessage();if(!placeholder.hidden)placeholder.textContent=missingMessage();}
 }
 function showEmbedHelp(){status.textContent=tr('正在使用教育部官方 dictFrame 嵌入網址載入「'+currentChar+'」筆順動畫。若仍空白，請按「直接開啟目前中文字動畫」。','Loading the MOE character animation for “'+currentChar+'” in the embedded viewer. If it remains blank, open the character animation in a new tab.');}
 function openCurrentCharacter(){if(currentId){window.open('https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID='+encodeURIComponent(currentId),'_blank','noopener');}else{window.open(searchUrl,'_blank','noopener');}}
 if(openCharBtn)openCharBtn.addEventListener('click',openCurrentCharacter);
 if(openSiteBtn)openSiteBtn.addEventListener('click',()=>window.open(searchUrl,'_blank','noopener'));
 frame.addEventListener('load',()=>{if(!frame.hidden){frameReady=true;status.textContent=loadedMessage();}});
 function lookup(){
   const raw=(input.value||'').trim();
   const ch=Array.from(raw).find(c=>STROKE_ORDER_IDS[c]||STROKE_ORDER_PNG[c])||Array.from(raw)[0];
   if(!ch){currentChar='';currentId='';frameReady=false;refreshLanguage();return;}
   currentChar=ch;input.value=ch;
   const id=STROKE_ORDER_IDS[ch];currentId=id||'';frameReady=false;
   if(id){
     frame.hidden=false;placeholder.hidden=true;
     const target='https://stroke-order.learningweb.moe.edu.tw/dictFrame.jsp?ID='+encodeURIComponent(id);
     if(frame.src!==target)frame.src=target;
     showEmbedHelp();status.textContent=foundMessage();
   }else{
     frame.removeAttribute('src');frame.hidden=true;placeholder.hidden=false;
     placeholder.textContent=missingMessage();status.textContent=missingMessage();
   }
 }
 if(searchBtn)searchBtn.addEventListener('click',lookup);
 input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();lookup();}});
 if(clearBtn)clearBtn.addEventListener('click',()=>{input.value='';currentId='';currentChar='';frameReady=false;frame.removeAttribute('src');frame.hidden=true;placeholder.hidden=false;placeholder.textContent=tr('輸入中文字後，這裡會載入對應的教育部筆順動畫。','Enter a Chinese character to load its MOE stroke-order animation here.');refreshLanguage();input.focus();});
 window.refreshStrokeOrderIntegrationLanguage=refreshLanguage;
 lookup();
})();
