const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);let currentUrl='', currentQr=null, logoData=null;const els={url:$('#urlInput'),heroUrl:$('#heroUrl'),generate:$('#generateBt[...]
const saved=()=>JSON.parse(localStorage.getItem('qr-ai-history')||'[]');const persist=x=>localStorage.setItem('qr-ai-history',JSON.stringify(x));const metrics=()=>JSON.parse(localStorage.getItem('q[...]
function toast(msg){els.toast.textContent=msg;els.toast.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>els.toast.classList.remove('show'),2600)}
function normalize(value){let v=value.trim();if(!v)return '';if(!/^https?:\/\//i.test(v)&&/^[\w.-]+\.[a-z]{2,}/i.test(v))v='https://'+v;return v}
function inspect(v){try{const u=new URL(v),h=u.hostname.toLowerCase();let type='website';if(h.includes('youtube')||h.includes('youtu.be'))type='YouTube video';else if(h.includes('instagram')||h.inc[...]
function validate(){const raw=els.url.value.trim(),v=normalize(raw);if(!raw){els.generate.disabled=true;els.validation.className='validation';els.validation.textContent='Enter a URL to unlock gener[...]
function qrOptions(){return{size:+$('#qrSize').value,level:$('#errorLevel').value,dark:$('#darkColor').value,light:$('#lightColor').value,margin:+$('#margin').value,style:$('#moduleStyle').value,ey[...]
function makeQr(text,target,sizeOverride){const o=qrOptions(),q=qrcode(0,o.level);q.addData(text);q.make();const size=sizeOverride||o.size,cell=size/q.getModuleCount(),canvas=document.createElement[...]
function generate(value){const v=normalize(value||els.url.value);try{new URL(v)}catch{return}if(typeof qrcode!=='function'){toast('QR engine is still loading — please try again');return}els.gener[...]
function saveHistory(v){let h=saved().filter(x=>x.url!==v);h.unshift({url:v,date:new Date().toISOString()});persist(h.slice(0,20));$('#historyCount').textContent=h.length;renderHistory()}
function renderHistory(filter=''){const h=saved().filter(x=>x.url.toLowerCase().includes(filter.toLowerCase()));els.history.innerHTML=h.length?h.map((x,i)=>`<div class="history-item"><div class="h[...]
function download(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function switchView(view){$$('.workspace-view').forEach(x=>x.classList.add('hidden'));$(`#${view}View`).classList.remove('hidden');$$('.side-link').forEach(x=>x.classList.toggle('active',x.dataset[...]
$('#heroForm').addEventListener('submit',e=>{e.preventDefault();els.url.value=els.heroUrl.value;validate();if(!els.generate.disabled){document.querySelector('#generator').scrollIntoView({behavior:[...]
$$('.side-link').forEach(b=>b.addEventListener('click',()=>switchView(b.dataset.view)));$('#historySearch').addEventListener('input',e=>renderHistory(e.target.value));$('#clearHistory').addEventLi[...]
$$('[data-scroll]').forEach(b=>b.addEventListener('click',()=>document.querySelector(b.dataset.scroll).scrollIntoView({behavior:'smooth'})));$$('.suggestion-chips button').forEach(b=>b.addEventLis[...]
['qrSize','errorLevel','darkColor','lightColor','moduleStyle','margin','eyeStyle','logoSize'].forEach(id=>$('#'+id).addEventListener('input',()=>{if(id==='darkColor')$('#darkColorValue').textConte[...]
$('#downloadPng').addEventListener('click',()=>currentQr&&currentQr.canvas.toBlob(b=>{download('qr-ai-studio.png',b);bump('downloads')},'image/png'));$('#downloadJpeg').addEventListener('click',()[...]
els.history.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const url=b.dataset.url;if(b.dataset.action==='delete'){persist(saved().filter(x=>x.url!==url));renderHisto[...]
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#chatInput'),text=input.value.trim();if(!text)return;const box=$('#chatMessages');box.innerHTML+=`<div class="message[...]
$('#themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');localStorage.setItem('qr-ai-theme',document.body.classList.contains('dark')?'dark':'light')});if(localStorage.getItem('qr-ai-theme')==='dark')document.body.classList.add('dark');

$('#removeLogo').addEventListener('click',()=>{logoData=null;$('#logoPreview').style.backgroundImage='';$('#logoPreview').textContent='＋';$('#logoStatus').textContent='Optional · PNG or SVG, ma[...]

function csvRows(text){return text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).map((line,i)=>{const parts=line.split(',').map(x=>x.trim().replace(/^\"|\"$/g,''));if(i===0&&parts[0].toLowerCase[...]

$('#createDynamic').addEventListener('click',async()=>{const destination=$('#dynamicUrl').value.trim(),password=$('#dynamicPassword').value,expiresAt=$('#dynamicExpires').value?new Date($('#dynami[...]
