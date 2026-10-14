/* ========= НАСТРОЙКИ ДЕМО — поменяйте под себя ========= */
const DEMO={
 contactText:'@your_instagram',            // ← ваш ник
 contactUrl:'https://instagram.com/your_instagram', // ← ссылка на ваш Instagram / Telegram / сайт
 l1Tasks:5, l2Tasks:4                      // сколько заданий в демо на каждом уровне
};

/* ========= 1. ДАННЫЕ ========= */
const L1=[
 {k:'table',s:'table',p:'tables',n:1,fs:1.3,pos:[[58,57]]},
 {e:'🪑',s:'chair',p:'chairs',n:4,fs:2.6,pos:[[52,63],[76,63],[54,73],[73,73]]},
 {e:'🛏️',s:'bed',p:'beds',n:1,fs:5,pos:[[22,50]]},
 {e:'🛋️',s:'sofa',p:'sofas',n:1,fs:5.5,pos:[[40,52]]},
 {e:'💺',s:'armchair',p:'armchairs',n:2,fs:3.2,pos:[[82,58],[90,58]]},
 {k:'rug',s:'rug',p:'rugs',n:2,fs:1.2,pos:[[20,84],[58,86]]},
 {k:'picture',e:'🖼️',s:'picture',p:'pictures',n:3,fs:3.2,pos:[[6,5],[17,5],[28,5]]},
 {e:'📺',s:'TV',p:'TVs',n:1,fs:3.6,pos:[[67,33]]},
 {k:'curtain',s:'curtain',p:'curtains',n:1,fs:1.5,pos:[[81,5]]},
 {k:'wardrobe',s:'wardrobe',p:'wardrobes',n:2,fs:1.4,pos:[[2,41],[11,41]]},
 {k:'shelf',s:'shelf',p:'shelves',n:3,fs:1.2,pos:[[4,27],[15,27],[26,27]]}
];
const LOCS=['on the table','on the sofa','under the table','on the shelves','on the windowsill','on the armchair','on the bed','under the bed'];
const L2=[
 {e:'💐',s:'flower vase',p:'flower vases',n:2,fs:2.2,loc:'on the table',pos:[[59,48],[63,48]]},
 {e:'📕',es:['📕','📗','📘','📙','📕','📗','📘','📙','📕','📗'],s:'book',p:'books',n:10,fs:1.5,loc:'on the shelves',pos:[[5,21],[7.6,21],[10.2,21],[12.8,21],[16,21],[18.6,21],[21.2,21],[27,21],[29.6,21],[32.2,21]]},
 {e:'🧸',es:['🧸','🪀','🪁','🎲','🧩'],s:'toy',p:'toys',n:5,fs:1.8,loc:'on the sofa',pos:[[40.5,54],[42.5,54],[44.5,54],[46.5,54],[48.5,54]]},
 {e:'🚗',s:'car',p:'cars',n:2,fs:1.6,loc:'under the table',pos:[[61,68],[66,68]]},
 {e:'🪔',s:'lamp',p:'lamps',n:1,fs:2,loc:'on the windowsill',pos:[[84,29]]},
 {e:'🪴',s:'plant',p:'plants',n:1,fs:2.2,loc:'on the windowsill',pos:[[90,29]]},
 {e:'🎒',s:'backpack',p:'backpacks',n:1,fs:2,loc:'under the table',pos:[[70,68]]},
 {e:'🐱',s:'cat',p:'cats',n:1,fs:2,loc:'on the armchair',pos:[[83,54]]},
 {e:'🍎',s:'apple',p:'apples',n:3,fs:1.4,loc:'on the table',pos:[[67,50],[69,50],[71,50]]}
];
const NUM=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
const $=id=>document.getElementById(id),rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>[...a].sort(()=>Math.random()-.5);
const art=w=>/^[aeiou]/i.test(w)?'an':'a';
const np=(n,g)=>n==1?`${art(g.s)} ${g.s}`:`${NUM[n]} ${g.p}`;
let level=1,list=[],idx=0,mist=0,locked=true,said=false,stars=0,streak=0,lastQ='',cur=null,done={};
let tries=0,pendingNext=null,gen=0,timers=[],afterNext=null,target='',SRok=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
const later=(fn,ms)=>{const id=setTimeout(()=>{timers=timers.filter(x=>x!==id);fn()},ms);timers.push(id);return id};
const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};

/* ========= 2. ЗВУК ========= */
let actx,musicOn=true,mt=null,mi=3;
const ctx=()=>{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();return actx};
function tone(f,t=0,d=.15,type='sine',v=.15,to=null){try{const a=ctx(),o=a.createOscillator(),g=a.createGain(),s=a.currentTime+t;o.type=type;o.frequency.setValueAtTime(f,s);if(to)o.frequency.exponentialRampToValueAtTime(to,s+d);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(a.destination);o.start(s);o.stop(s+d+.02)}catch(e){}}
const P=[523,587,659,784,880,1047,1175,1319];
const sfx={
 pop:()=>tone(300,0,.12,'sine',.25,900),
 boing:()=>{tone(200,0,.4,'sine',.25,700);tone(700,.15,.3,'sine',.12,250)},
 giggle:()=>[0,1,2,3,4].forEach(i=>tone(600+i*80,i*.09,.08,'square',.07,900+i*80)),
 oooh:()=>{tone(300,0,.7,'sine',.2,520);tone(305,0,.7,'triangle',.1,525)},
 squeak:()=>{tone(2200,0,.07,'square',.05,3000);tone(2800,.09,.07,'square',.05,3400)},
 wrong:()=>{tone(330,0,.15,'sine',.2,260);tone(260,.15,.25,'sine',.2,180)},
 win:()=>[0,2,4,5,7].forEach((n,i)=>tone(P[n],i*.09,.3,'triangle',.16)),
 fanfare:()=>[0,2,4,2,4,5,7,7].forEach((n,i)=>tone(P[n],i*.1,.35,'triangle',.18)),
 star:()=>{tone(1318,0,.1,'sine',.15);tone(1760,.08,.3,'sine',.15)}
};
function music(){clearInterval(mt);mt=null;if(!musicOn)return;mt=setInterval(()=>{if(Math.random()<.25)return;mi=Math.max(0,Math.min(7,mi+pick([-2,-1,-1,1,1,2])));tone(P[mi]/2,0,.9,'sine',.05);if(Math.random()<.3)tone(P[mi],.02,.5,'triangle',.02)},420)}
$('musicBtn').onclick=()=>{musicOn=!musicOn;$('musicBtn').textContent=musicOn?'🎵':'🔇';music();ctx()};
let voice=null;
function pickVoice(){const v=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));voice=v.find(x=>/Samantha|Google US|Zira|Aria|Jenny|Female/i.test(x.name))||v[0]||null}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
function speak(t,pitch=1.3,rate=.8){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';if(voice)u.voice=voice;u.pitch=Math.min(pitch,1.3);u.rate=rate*.85;speechSynthesis.speak(u)}catch(e){}}
function speakThen(t,cb){const g0=gen;let f=false;const go=()=>{if(f||g0!==gen)return;f=true;cb()};
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';if(voice)u.voice=voice;u.pitch=1.25;u.rate=.7;u.onend=()=>later(go,400);speechSynthesis.speak(u)}catch(e){}
 later(go,Math.max(4000,t.length*220))}
function say(t){const s=$('speech');s.textContent=t;s.style.animation='none';void s.offsetWidth;s.style.animation=''}

/* ========= 3. ПРИЗРАК БУ ========= */
let mouse={x:.5,y:.5};
addEventListener('pointermove',e=>{const r=$('ghost').getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width;mouse.y=(e.clientY-r.top)/r.height});
function react(k){const w=$('ghostWrap');w.className='';void w.offsetWidth;w.className=k;setTimeout(()=>w.className='',900)}
(function ghost(){
 const g=$('ghost').getContext('2d');let blink=0;
 (function loop(t){g.clearRect(0,0,380,380);const y=190+Math.sin(t/400)*12,m=$('ghostWrap').className,w=Math.sin(t/200);if(Math.random()<.008)blink=8;
  g.fillStyle='#fff';g.shadowColor='#7ee8c7';g.shadowBlur=25;g.beginPath();g.moveTo(90,y+110);g.lineTo(90,y-20);g.bezierCurveTo(90,y-130,290,y-130,290,y-20);g.lineTo(290,y+110);
  for(let i=0;i<4;i++){const x=290-i*50,k=Math.sin(t/180+i)*10;g.quadraticCurveTo(x-12,y+150+k,x-25,y+110);g.quadraticCurveTo(x-37,y+75-k,x-50,y+110)}g.fill();
  [[85,-1],[295,1]].forEach(([x,s])=>{g.beginPath();g.ellipse(x,y+40+w*s*15,28,16,s*(.5+w*.4),0,7);g.fill()});g.shadowBlur=0;
  const ex=(mouse.x-.5)*14,ey=(mouse.y-.5)*10;
  [150,230].forEach(x=>{g.fillStyle='#fff';g.strokeStyle='#2b1b5a';g.lineWidth=3;g.beginPath();g.ellipse(x,y-20,19,blink?3:22,0,0,7);g.fill();g.stroke();if(!blink){g.fillStyle='#2b1b5a';g.beginPath();g.arc(x+ex,y-18+ey,10,0,7);g.fill()}});
  if(blink)blink--;g.strokeStyle='#2b1b5a';g.lineWidth=6;g.lineCap='round';g.beginPath();
  if(m==='sad')g.arc(190,y+55,22,Math.PI*1.1,Math.PI*1.9);else if(m==='happy'){g.fillStyle='#2b1b5a';g.arc(190,y+22,24,0,Math.PI);g.fill()}else g.arc(190,y+20,26,.15*Math.PI,.85*Math.PI);
  g.stroke();g.fillStyle='#ff9bc4aa';g.beginPath();g.arc(125,y+15,13,0,7);g.arc(255,y+15,13,0,7);g.fill();requestAnimationFrame(loop)})(0)
})();
$('ghost').onclick=e=>{react('happy');pick([sfx.giggle,sfx.oooh,sfx.boing])();spark(e.clientX,e.clientY);const p=pick(["Hee-hee! That tickles!","Boo! Did I scare you?","I love my castle!","Let's play!"]);say(p);speak(p)};

/* ========= 4. ЭФФЕКТЫ И ДЕКОР ========= */
function spark(x,y,em=['✨','⭐','💫']){for(let i=0;i<7;i++){const s=document.createElement('div');s.className='spark';s.textContent=pick(em);s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--x',rnd(-70,70)+'px');s.style.setProperty('--y',rnd(-90,-20)+'px');document.body.appendChild(s);setTimeout(()=>s.remove(),1000)}}
function wig(el){el.classList.remove('wiggle');void el.offsetWidth;el.classList.add('wiggle');setTimeout(()=>el.classList.remove('wiggle'),650)}
$('moon').onclick=e=>{wig(e.target);sfx.star();spark(e.clientX,e.clientY,['⭐','🌟']);say('Good night, Moon!');speak('Good night, Moon!')};
$('bat').onclick=e=>{sfx.squeak();spark(e.clientX,e.clientY,['🦇','💨']);say('Squeak! Hello, bat!')};
$('pumpkin').onclick=e=>{sfx.giggle();wig($('pumpkin'));spark(e.clientX,e.clientY,['🎃','✨']);say('Ha-ha-ha!')};
$('spider').onclick=()=>{const s=$('spider');sfx.boing();s.style.transform='translateY(-90px)';setTimeout(()=>s.style.transform='',900);say('Eek! A tiny spider!')};
for(let i=0;i<9;i++){const f=document.createElement('i');f.className='ff';f.style.left=rnd(5,95)+'%';f.style.top=rnd(25,85)+'%';f.style.setProperty('--t',rnd(2,5)+'s');f.style.setProperty('--x',rnd(-80,80)+'px');f.style.setProperty('--y',rnd(-60,60)+'px');$('room').appendChild(f)}
for(let i=0;i<8;i++){const s=document.createElement('span');s.className='tw';s.textContent='✦';s.style.left=rnd(5,85)+'%';s.style.top=rnd(8,90)+'%';s.style.animationDelay=rnd(0,1.2)+'s';$('win').appendChild(s)}

/* ========= 5. МЕБЕЛЬ В КОМНАТЕ ========= */
function placeGroup(g,lv,instant){
 g.pos.forEach((p,i)=>{
  const d=document.createElement('div');d.className='f '+(g.k||'')+(instant?'':' in');d.dataset.lv=lv;
  if(g.e&&(!g.k||g.k==='picture'))d.textContent=g.es?g.es[i]:g.e;
  d.style.cssText=`left:${p[0]}%;top:${p[1]}%;font-size:${g.fs}em;--b:${rnd(1.6,3.2)}s`;
  d.onclick=e=>{wig(d);sfx.boing();spark(e.clientX,e.clientY);const t=`${art(g.s)} ${g.s}`;say(t);speak(t,1.4,.85)};
  if(instant)$('items').appendChild(d);else later(()=>{$('items').appendChild(d);sfx.pop()},i*220);
 });
}

/* ========= 6. ХОД ИГРЫ ========= */
function setQ(t){lastQ=t;$('question').textContent=t;$('question').classList.remove('peek');speak(t)}
function setS(t,cls=''){const s=$('sentence');s.textContent=t;s.className=cls;s.classList.remove('peek')}
document.querySelectorAll('#question,#sentence').forEach(el=>el.onclick=()=>document.body.classList.contains('notext')&&el.classList.toggle('peek'));
$('eyeBtn').onclick=()=>{const o=document.body.classList.toggle('notext');$('eyeBtn').classList.toggle('on',o);$('eyeBtn').textContent=o?'🙈':'👁️'};
$('listenBtn').onclick=()=>{sfx.pop();speak(lastQ)};
function listen(tg,cb){
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR)return cb(null);
 try{const r=new SR();r.lang='en-US';r.maxAlternatives=3;
  r.onresult=e=>{const alts=[...e.results[0]].map(a=>a.transcript.toLowerCase()).join(' ');const W=x=>x.toLowerCase().replace(/[^a-z' ]/g,' ').split(/\s+/).filter(Boolean);
   const hs=new Set(W(alts)),tw=W(tg);cb({heard:e.results[0][0].transcript,score:tw.filter(w=>hs.has(w)).length/tw.length})};
  r.onerror=()=>cb(null);r.onnomatch=()=>cb({heard:'',score:0});try{speechSynthesis.cancel()}catch(e){}r.start()}catch(e){cb(null)}}
$('sayBtn').onclick=e=>{if(said)return;const b=$('sayBtn');
 const award=()=>{said=true;stars++;updHud();sfx.star();spark(e.clientX,e.clientY);const p=pick(['Great speaking!','Perfect!','I heard you!']);say(p);speak(p);b.hidden=true;revealNext()};
 if(!SRok)return award();
 b.textContent='🎤 Listening…';
 listen(target,r=>{if(r===null){SRok=false;return award()}
  if(r.score>=.7)award();else{tries++;b.textContent='🎤 Try again!';say(r.heard?`I heard: "${r.heard}". Try again!`:"I can't hear you. Try again!");if(tries>=2)revealNext()}})};
function updHud(){$('stars').textContent='⭐ '+stars;$('streak').textContent='🔥 '+streak;[$('stars'),$('streak')].forEach(p=>{p.classList.remove('bump');void p.offsetWidth;p.classList.add('bump')})}
function good(text){
 locked=true;target=text;tries=0;stars+=mist?1:2;streak++;updHud();setS(text);react('happy');sfx.win();burst();
 const c=pick(['Yay!','Super!','Great job!','Hooray!','Wow!']);say(c);speak(c+' '+text,1.5,.9);
 said=false;const sb=$('sayBtn');sb.hidden=false;sb.textContent=SRok?'🎤 Now you say it! +⭐':'🗣️ I said it! +⭐';
 afterNext=()=>{idx++;next()};pendingNext='Next ➡️'}
function showNext(t){const b=$('nextBtn');b.textContent=t;b.hidden=false}
function revealNext(){if(pendingNext){showNext(pendingNext);pendingNext=null}}
$('nextBtn').onclick=()=>{sfx.pop();$('nextBtn').hidden=true;$('sayBtn').hidden=true;const f=afterNext;afterNext=null;if(f)f()};
function bad(hint,btn){mist++;streak=0;updHud();if(btn){btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),450)}
 setS(hint,'bad');const o=pick(['Oops! Try again!','Almost! Think!','Hmm, look again!']);say(o);speak(o,1.2);react('sad');sfx.wrong()}

function startLevel(n){
 if(n>2)return showBuy();   // уровни 3–5 — только в полной версии
 gen++;clearTimers();try{speechSynthesis.cancel()}catch(e){}
 afterNext=null;pendingNext=null;cur=null;locked=true;idx=0;level=n;
 ['nextBtn','sayBtn'].forEach(i=>$(i).hidden=true);
 $('cart').innerHTML='';$('question').textContent='';setS('');
 $('task').textContent=n===1?'Count and say. Use there is / there are.':'Look at the room. Answer Yes or No!';
 if(n===1){$('items').innerHTML='';done={}}
 else{$('items').innerHTML='';L1.forEach(g=>placeGroup(g,1,true))}
 document.querySelectorAll('.pill[data-lv]').forEach(b=>b.classList.toggle('on',+b.dataset.lv===n));
 list=n===1?shuffle(L1).slice(0,DEMO.l1Tasks):shuffle(L2).slice(0,DEMO.l2Tasks);
 $('controls').innerHTML=n===1?'<div class="row" style="--c:5">'+[1,2,3,4,5].map(v=>`<button class="big" data-v="${v}">${v}</button>`).join('')+'</div>':'<div class="row" id="yn"></div>';
 const intro=["Let's decorate my castle!","Look at my room. Be a detective!"][n-1];
 say(intro);speakThen(intro,next);
}
document.querySelectorAll('.pill[data-lv]').forEach(b=>b.onclick=()=>startLevel(+b.dataset.lv));
function next(){if(idx>=list.length)return levelDone();mist=0;locked=false;$('sayBtn').hidden=true;$('nextBtn').hidden=true;setS('');cur=list[idx];(level===1?r1:r2)(cur)}
function levelDone(){
 if(level===2)return demoEnd();
 const m="My castle looks great! Now Level 2!";
 say(m);setS('🎉 '+m);sfx.fanfare();burst();burst();speak(m);react('happy');
 afterNext=()=>startLevel(2);showNext('Level 2 ➡️')}
function demoEnd(){
 const m="You did it! Want more levels? Ask my teacher for the full game!";
 say(m);setS('🏆 '+m);speak(m);sfx.fanfare();burst();burst();burst();react('happy');
 $('controls').innerHTML=`<div class="row" style="--c:2"><button class="big yes" id="buyNow">🔓 Full version: 5 levels</button><button class="big" id="again">🔄 Play demo again</button></div>`;
 $('buyNow').onclick=showBuy;$('again').onclick=()=>{stars=0;streak=0;updHud();startLevel(1)}}

/* --- Уровень 1: How many...? --- */
function r1(g){
 const cart=$('cart');cart.innerHTML='';
 for(let i=0;i<g.n;i++){const s=document.createElement('span');s.className='f '+(g.k||'');s.style.cssText=`font-size:${Math.min(g.fs*.55,2.8)}rem;--i:${i*.15}s;position:relative`;if(g.e&&(!g.k||g.k==='picture'))s.textContent=g.e;cart.appendChild(s)}
 setQ(pick([`How many ${g.p} are there?`,`How many ${g.p} can you see?`,`Count the ${g.p}! How many are there?`]));
}
$('cart').onclick=()=>{if(cur&&level===1){sfx.pop();speak(`${art(cur.s)} ${cur.s}`,1.3,.8)}};
$('controls').onclick=e=>{const b=e.target.closest('button[data-v]');if(!b||locked||!cur)return;
 if(level===1){
  if(+b.dataset.v!==cur.n){bad(mist?`Hint: count them one by one! 👆`:'Hmm, count again! 🤔',b);if(mist>=2)document.querySelector(`#controls [data-v="${cur.n}"]`).classList.add('glow');return}
  good(`There ${cur.n==1?'is':'are'} ${NUM[cur.n]} ${cur.n==1?cur.s:cur.p}.`);placeGroup(cur,1);later(()=>$('cart').innerHTML='',600);
 }else{
  const ok=(b.dataset.v==='yes')===cur.q.truth;
  if(!ok){bad('Look at the room again! 👀',b);if(mist>=2)document.querySelector(`#yn [data-v="${cur.q.truth?'yes':'no'}"]`).classList.add('glow');return}
  const q=cur.q;good(q.truth?`Yes, there ${q.be}.`:`No, there ${q.be==='is'?"isn't":"aren't"}. There ${cur.n==1?'is':'are'} ${np(cur.n,cur)} ${cur.loc}.`);
 }};

/* --- Уровень 2: Are there...? --- */
function r2(g){
 $('yn').innerHTML='';placeGroup(g,2);
 later(()=>{
  const truth=Math.random()<.5;let an=g.n,al=g.loc;
  if(!truth){if(Math.random()<.5){an=pick([g.n+1,g.n+2,g.n-1,g.n-2].filter(x=>x>=1&&x<=10&&x!==g.n))}else al=pick(LOCS.filter(l=>l!==g.loc))}
  const be=an==1?'is':'are',npA=np(an,g);
  g.q={truth,be,np:npA,loc:al};
  setQ(`${an==1?'Is':'Are'} there ${npA} ${al}?`);
  $('yn').innerHTML=`<button class="big yes" data-v="yes">✅ Yes, there ${be}.</button><button class="big no" data-v="no">❌ No, there ${be==='is'?"isn't":"aren't"}.</button>`;
 },1400+g.pos.length*220);
}

/* ========= 7. ПОКУПКА / КОНТАКТ ========= */
function showBuy(){sfx.star();$('buy').hidden=false}
$('buyClose').onclick=()=>{$('buy').hidden=true};
document.querySelectorAll('.cta').forEach(a=>{a.href=DEMO.contactUrl;a.target='_blank';a.rel='noopener'});
document.querySelectorAll('.cta-text').forEach(s=>s.textContent=DEMO.contactText);

/* ========= 8. КОНФЕТТИ ========= */
const cv=$('confetti'),cx=cv.getContext('2d');let parts=[];
function fit(){cv.width=innerWidth;cv.height=innerHeight}addEventListener('resize',fit);fit();
function burst(){const run=!parts.length;for(let i=0;i<80;i++)parts.push({x:innerWidth/2,y:innerHeight/3,vx:rnd(-8,8),vy:-rnd(3,14),c:`hsl(${rnd(0,360)},90%,60%)`,r:rnd(4,9),l:100});if(run)tick()}
function tick(){cx.clearRect(0,0,cv.width,cv.height);parts=parts.filter(p=>p.l>0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.45;p.l--;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r,p.r)});if(parts.length)requestAnimationFrame(tick)}
setInterval(()=>{if(!locked&&Math.random()<.4){react('happy');say(pick(["Can you count?","Boo-tiful day!","I see you!","Tap my things!"]))}},10000);

/* ========= 9. СТАРТ ========= */
$('helpBtn').onclick=$('helpGo').onclick=()=>{$('help').hidden=false};$('helpClose').onclick=()=>{$('help').hidden=true};
$('go').onclick=()=>{$('start').remove();ctx();music();startLevel(1)};