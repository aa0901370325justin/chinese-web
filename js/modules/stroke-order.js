(function(){
 const $id=(id)=>document.getElementById(id);
 const input=$id('strokeCharacterInput'), status=$id('strokeOrderStatus');
 const frame=$id('strokeOrderFrame'), placeholder=$id('strokeFramePlaceholder');
 const openCharBtn=$id('strokeOpenCharBtn');
 const openSiteBtn=$id('strokeOpenSiteBtn');
 if(!input||!status||!frame)return;
 let currentId='';
 const searchUrl='https://stroke-order.learningweb.moe.edu.tw/searchW.jsp?ID2=1';
 function showEmbedHelp(){
   status.textContent='正在使用教育部官方 dictFrame 嵌入網址載入「'+(input.value||'').trim()+'」筆順動畫。若仍空白，請按「直接開啟目前中文字動畫」。';
 }
 function openCurrentCharacter(){
   if(currentId){window.open('https://stroke-order.learningweb.moe.edu.tw/dictView.jsp?ID='+encodeURIComponent(currentId),'_blank','noopener');}
   else {window.open(searchUrl,'_blank','noopener');}
 }
 if(openCharBtn){openCharBtn.textContent='直接開啟目前中文字動畫 ↗';openCharBtn.addEventListener('click',openCurrentCharacter);}
 if(openSiteBtn)openSiteBtn.addEventListener('click',()=>window.open(searchUrl,'_blank','noopener'));
 frame.addEventListener('load',()=>{
   if(!frame.hidden){status.textContent='教育部筆順動畫頁已回應。若動畫未顯示或空白，請按「直接開啟目前中文字動畫」在新分頁觀看。';}
 });
 function lookup(){
   const raw=(input.value||'').trim();
   const ch=Array.from(raw).find(c=>window.STROKE_ORDER_IDS[c]||window.STROKE_ORDER_PNG[c]) || Array.from(raw)[0];
   if(!ch){status.textContent='請輸入一個中文字。';return;}
   input.value=ch;
   const id=window.STROKE_ORDER_IDS[ch];
   currentId=id||'';
   if(id){
     frame.hidden=false;
     placeholder.hidden=true;
     const target='https://stroke-order.learningweb.moe.edu.tw/dictFrame.jsp?ID='+encodeURIComponent(id);
     if(frame.src!==target)frame.src=target;
     showEmbedHelp();
     status.textContent='已找到「'+ch+'」的教育部動畫編號（'+id+'），正在以教育部官方 dictFrame 嵌入網址載入筆順動畫。';
   } else {
     currentId='';frame.removeAttribute('src');frame.hidden=true;placeholder.hidden=false;
     placeholder.textContent='字庫中沒有找到「'+ch+'」的教育部動畫編號。可開啟教育部國字查詢網站自行查詢。';
     status.textContent='字庫中沒有這個字的動畫編號，請確認字形或使用教育部網站查詢。';
   }
 }
 $id('strokeSearchBtn').addEventListener('click',lookup);
 input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();lookup();}});
 $id('strokeClearBtn').addEventListener('click',()=>{
   input.value='';
   currentId='';frame.removeAttribute('src');frame.hidden=true;placeholder.hidden=false;
   placeholder.innerHTML='輸入中文字後，這裡會載入對應的教育部筆順動畫。';
   status.textContent='請輸入一個中文字。';input.focus();
 });
 lookup();
})();
