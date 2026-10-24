(()=>{'use strict';
const root=document.getElementById('view-materials'); const $=id=>root.querySelector('#'+id);
const DB='zhuyin-study-center-v1', STORE='assets';
let db=null,pdfs=[],videos=[],activePdf=null,pdfDoc=null,pdfPage=1,zoom=1,pdfjs=null,searchPages=[],searchIndex=-1,activeVideo=null,videoUrl=null,renderSerial=0;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>{if(!Number.isFinite(n))return '';const u=['B','KB','MB','GB'];let i=0;while(n>=1024&&i<u.length-1){n/=1024;i++}return (i?n.toFixed(n>=100?0:1):Math.round(n))+' '+u[i]};
const status=(id,msg)=>$(id).textContent=msg;
function openDb(){return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE,{keyPath:'id'})};r.onsuccess=()=>{db=r.result;resolve(db)};r.onerror=()=>reject(r.error)})}
function req(mode,fn){return new Promise((resolve,reject)=>{const tx=db.transaction(STORE,mode),r=fn(tx.objectStore(STORE));tx.oncomplete=()=>{};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
const allAssets=()=>req('readonly',s=>s.getAll());
const put=a=>req('readwrite',s=>s.put(a));
const del=id=>req('readwrite',s=>s.delete(id));
async function fetchBuiltinAsset(url, type){
  const response = await fetch(url);
  if(!response.ok) throw new Error('無法載入內建教材：'+url+' ('+response.status+')');
  const blob = await response.blob();
  return new Blob([blob], {type});
}
async function seedBuiltins(){
  let list=await allAssets();
  if(!list.some(x=>x.id==='builtin-pdf')){
    const blob=await fetchBuiltinAsset(EMBEDDED_PDF_URL,'application/pdf');
    await put({id:'builtin-pdf',name:EMBEDDED_PDF_NAME,kind:'pdf',builtin:true,blob,addedAt:Date.now(),lastPage:1});
  }
  if(!list.some(x=>x.id==='builtin-video')){
    const blob=await fetchBuiltinAsset(EMBEDDED_VIDEO_URL,'video/mp4');
    await put({id:'builtin-video',name:EMBEDDED_VIDEO_NAME,kind:'video',builtin:true,blob,addedAt:Date.now()});
  }
}
async function refresh(){
 const a=await allAssets();pdfs=a.filter(x=>x.kind==='pdf').sort((x,y)=>x.addedAt-y.addedAt);videos=a.filter(x=>x.kind!=='pdf').sort((x,y)=>x.addedAt-y.addedAt);
 renderPdfShelf();renderVideoShelf();$('libraryPdfCount').textContent=pdfs.length;$('libraryVideoCount').textContent=videos.length;
}
function renderPdfShelf(){$('pdfShelf').innerHTML=pdfs.map(x=>`<div class="item ${activePdf?.id===x.id?'selected':''}"><div class="item-main"><strong>📕 ${esc(x.name)}</strong><small>${fmt(x.blob?.size||0)}${x.builtin?' · 內建教材':' · 本機匯入'}</small></div><div class="item-actions"><button data-open-pdf="${esc(x.id)}">閱讀</button>${x.builtin?'':`<button data-delete="${esc(x.id)}" data-kind="pdf">刪除</button>`}</div></div>`).join('')||'<p class="muted">書架目前是空的。</p>'}
function renderVideoShelf(){$('videoShelf').innerHTML=videos.map(x=>`<div class="item ${activeVideo?.id===x.id?'selected':''}"><div class="item-main"><strong>🎬 ${esc(x.name)}</strong><small>${fmt(x.blob?.size||0)}${x.builtin?' · 內建影片':' · 本機匯入'}</small></div><div class="item-actions"><button data-play-video="${esc(x.id)}">播放</button>${x.builtin?'':`<button data-delete="${esc(x.id)}" data-kind="video">刪除</button>`}</div></div>`).join('')||'<p class="muted">尚無影音檔。</p>'}
async function loadPdfJs(){
 if(pdfjs)return pdfjs;if(window.pdfjsLib){pdfjs=window.pdfjsLib;return pdfjs}
 const urls=['https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js','https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js','https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js'];
 for(const url of urls){try{await new Promise((resolve,reject)=>{const sc=document.createElement('script');sc.src=url;sc.onload=resolve;sc.onerror=()=>reject(new Error('載入失敗'));document.head.appendChild(sc)});if(window.pdfjsLib){pdfjs=window.pdfjsLib;pdfjs.GlobalWorkerOptions.workerSrc=url.replace('pdf.min.js','pdf.worker.min.js');return pdfjs}}catch(e){}}
 throw new Error('PDF.js 無法從 CDN 載入；可點「瀏覽器開啟」使用內建 PDF 檢視器。');
}
async function openPdf(id){
 const item=pdfs.find(x=>x.id===id);if(!item)return;activePdf=item;pdfPage=item.lastPage||1;zoom=item.zoom||1;pdfDoc=null;renderPdfShelf();$('pageNumber').value=pdfPage;$('pdfStatus').textContent='正在載入：'+item.name;
 try{const lib=await loadPdfJs();const bytes=new Uint8Array(await item.blob.arrayBuffer());pdfDoc=await lib.getDocument({data:bytes}).promise;$('pageCount').textContent='/ '+pdfDoc.numPages;pdfPage=Math.min(pdfPage,pdfDoc.numPages);$('pageNumber').value=pdfPage;await renderPage();status('pdfStatus','已開啟：'+item.name+'（共 '+pdfDoc.numPages+' 頁）');}
 catch(e){$('pdfStage').innerHTML='<div class="muted">PDF.js 無法載入或解析文件。可嘗試「瀏覽器開啟」。<br>'+esc(e.message)+'</div>';status('pdfStatus',e.message)}
}
async function renderPage(){
 if(!pdfDoc)return;const serial=++renderSerial;try{const page=await pdfDoc.getPage(pdfPage);const stage=$('pdfStage'),base=page.getViewport({scale:1});const maxWidth=Math.max(250,stage.clientWidth-28);const scale=zoom===-1?maxWidth/base.width:zoom;const viewport=page.getViewport({scale});const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');canvas.width=Math.ceil(viewport.width);canvas.height=Math.ceil(viewport.height);canvas.style.width=viewport.width+'px';canvas.style.maxWidth='100%';canvas.style.height='auto';stage.replaceChildren(canvas);await page.render({canvasContext:ctx,viewport}).promise;if(serial!==renderSerial)return;$('pageNumber').value=pdfPage;$('zoomLabel').textContent=(zoom===-1?'寬度':Math.round(zoom*100)+'%');$('prevPage').disabled=pdfPage<=1;$('nextPage').disabled=pdfPage>=pdfDoc.numPages;if(activePdf){activePdf.lastPage=pdfPage;activePdf.zoom=zoom;put(activePdf).catch(()=>{})}}
 catch(e){status('pdfStatus','頁面顯示失敗：'+e.message)}}
async function searchPdf(dir=1){if(!pdfDoc)return;const q=$('pdfSearch').value.trim().toLowerCase();if(!q){status('pdfStatus','請先輸入要搜尋的字詞。');return}if(!searchPages.length||dir===0){searchPages=[];for(let i=1;i<=pdfDoc.numPages;i++){const p=await pdfDoc.getPage(i),c=await p.getTextContent(),t=c.items.map(x=>x.str).join(' ').toLowerCase();if(t.includes(q))searchPages.push(i)}searchIndex=-1}
 if(!searchPages.length){status('pdfStatus','找不到「'+q+'」。');return}searchIndex=(searchIndex+dir+searchPages.length)%searchPages.length;pdfPage=searchPages[searchIndex];await renderPage();status('pdfStatus','搜尋「'+q+'」：第 '+(searchIndex+1)+' / '+searchPages.length+' 個符合頁面（目前第 '+pdfPage+' 頁）。')}
$('prevPage').onclick=()=>{if(pdfPage>1){pdfPage--;renderPage()}};$('nextPage').onclick=()=>{if(pdfDoc&&pdfPage<pdfDoc.numPages){pdfPage++;renderPage()}};$('pageNumber').onchange=()=>{if(pdfDoc){pdfPage=Math.max(1,Math.min(pdfDoc.numPages,Number($('pageNumber').value)||1));renderPage()}};$('zoomOut').onclick=()=>{zoom=Math.max(.5,(zoom===-1?1:zoom)-.1);renderPage()};$('zoomIn').onclick=()=>{zoom=Math.min(2.5,(zoom===-1?1:zoom)+.1);renderPage()};$('fitWidth').onclick=()=>{zoom=-1;renderPage()};$('searchBtn').onclick=()=>searchPdf(0);$('searchPrev').onclick=()=>searchPdf(-1);$('searchNext').onclick=()=>searchPdf(1);
$('openPdfFallback').onclick=()=>{if(!activePdf)return;const u=URL.createObjectURL(activePdf.blob);window.open(u,'_blank','noopener');setTimeout(()=>URL.revokeObjectURL(u),60000)};
$('importPdfBtn').onclick=()=>$('pdfFileInput').click();
$('pdfFileInput').onchange=async e=>{let ok=0,fail=[];for(const f of e.target.files){try{if(f.type!=='application/pdf'&&!f.name.toLowerCase().endsWith('.pdf'))throw Error('不是 PDF');if(f.size<5)throw Error('檔案太小');const head=await f.slice(0,5).text();if(!head.startsWith('%PDF'))throw Error('檔案內容不正確');await put({id:'pdf-'+crypto.randomUUID(),name:f.name,kind:'pdf',builtin:false,blob:f,addedAt:Date.now(),lastPage:1});ok++}catch(err){fail.push(f.name+': '+err.message)}}await refresh();status('pdfImportStatus',`匯入完成：${ok} 個成功。${fail.length?'\\n'+fail.join('\\n'):''}`);e.target.value=''};
$('importVideoBtn').onclick=()=>$('videoFileInput').click();
$('videoFileInput').onchange=async e=>{let ok=0;for(const f of e.target.files){if(f.size){await put({id:'media-'+crypto.randomUUID(),name:f.name,kind:f.type.startsWith('audio/')?'audio':'video',builtin:false,blob:f,addedAt:Date.now()});ok++}}await refresh();status('videoImportStatus','匯入完成：'+ok+' 個檔案已保存至本機書庫。');e.target.value=''};
function playVideo(id){const item=videos.find(x=>x.id===id);if(!item)return;activeVideo=item;if(videoUrl)URL.revokeObjectURL(videoUrl);videoUrl=URL.createObjectURL(item.blob);const stage=$('videoStage'),el=document.createElement(item.kind==='audio'?'audio':'video');el.controls=true;el.playsInline=true;el.preload='metadata';el.src=videoUrl;el.loop=$('videoLoop').checked;el.playbackRate=Number($('videoSpeed').value)||1;if(item.kind==='audio'){el.style.width='100%';el.style.padding='20px';el.style.background='#fff'}else{el.style.width='100%';el.style.maxHeight='68vh'}stage.replaceChildren(el);$('videoMeta').textContent=item.name+' · '+fmt(item.blob.size)+(item.builtin?' · 內建教材':' · 本機匯入');status('videoStatus','正在播放清單中的「'+item.name+'」。');renderVideoShelf();el.addEventListener('ended',()=>{if(!$('videoLoop').checked&&$('videoAutoNextToggle')?.checked)nextVideo(1)})}
function nextVideo(step){if(!videos.length)return;let i=videos.findIndex(x=>x.id===activeVideo?.id);i=(i+step+videos.length)%videos.length;playVideo(videos[i].id)}
$('videoSpeed').onchange=()=>{const el=$('videoStage').querySelector('video,audio');if(el)el.playbackRate=Number($('videoSpeed').value)};$('videoLoop').onchange=()=>{const el=$('videoStage').querySelector('video,audio');if(el)el.loop=$('videoLoop').checked};$('videoPrev').onclick=()=>nextVideo(-1);$('videoNext').onclick=()=>nextVideo(1);$('videoRestart').onclick=()=>{const el=$('videoStage').querySelector('video,audio');if(el){el.currentTime=0;el.play().catch(()=>{})}};$('videoStop').onclick=()=>{const el=$('videoStage').querySelector('video,audio');if(el){el.pause();el.currentTime=0}status('videoStatus','已停止播放。')};$('videoOpenSource').onclick=()=>{if(videoUrl)window.open(videoUrl,'_blank','noopener')};$('videoDownload').onclick=()=>{if(!activeVideo)return;const a=document.createElement('a');a.href=videoUrl||URL.createObjectURL(activeVideo.blob);a.download=activeVideo.name;a.click()}; 
root.addEventListener('click',async e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.openPdf)await openPdf(b.dataset.openPdf);if(b.dataset.playVideo)playVideo(b.dataset.playVideo);if(b.dataset.delete){const item=[...pdfs,...videos].find(x=>x.id===b.dataset.delete);if(item&&!item.builtin&&confirm('確定刪除「'+item.name+'」？')){await del(item.id);await refresh();status(b.dataset.kind==='pdf'?'pdfImportStatus':'videoImportStatus','已刪除 '+item.name);}}});
root.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{root.querySelectorAll('nav button').forEach(x=>x.classList.toggle('active',x===b));root.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+b.dataset.materialPage));if(b.dataset.materialPage==='reader'&&pdfDoc)renderPage()});
$('goReader').onclick=()=>root.querySelector('nav button[data-material-page="reader"]').click();$('goVideo').onclick=()=>root.querySelector('nav button[data-material-page="video"]').click();
$('refreshAll').onclick=async()=>{await refresh();status('libraryStatus','書庫已重新整理。')};
$('exportManifest').onclick=()=>{const data={format:'zhuyin-study-center-library',exportedAt:new Date().toISOString(),pdfs:pdfs.map(x=>({id:x.id,name:x.name,size:x.blob?.size,builtin:x.builtin})),videos:videos.map(x=>({id:x.id,name:x.name,size:x.blob?.size,builtin:x.builtin}))};const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),u=URL.createObjectURL(blob),a=document.createElement('a');a.href=u;a.download='注音學習中心書庫清單.json';a.click();URL.revokeObjectURL(u);status('libraryStatus','已匯出清單。此 JSON 不包含影音檔案本體。')};
(async()=>{try{status('bootStatus','初始化本機書庫…');await openDb();await seedBuiltins();await refresh();status('bootStatus','內建教材已就緒');status('pdfImportStatus','內建 PDF 已加入書架。');status('videoImportStatus','內建影片已加入影音清單。');await openPdf('builtin-pdf');playVideo('builtin-video');status('videoStatus','內建影片已就緒。按播放鍵開始練習。')}catch(e){status('bootStatus','初始化失敗');status('pdfStatus','初始化失敗：'+e.message);status('videoStatus','初始化失敗：'+e.message)}})();
})();
