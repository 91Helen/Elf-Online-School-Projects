/* ========= 1. ДАННЫЕ ========= */
// k — CSS-мебель, e — эмодзи; fs — размер (em), pos — [left%, top%]
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
const L3=[
 {e:'🚂',s:'train',p:'trains',n:3},{e:'🪁',s:'kite',p:'kites',n:5},{e:'🪆',s:'doll',p:'dolls',n:1},
 {e:'⚽',s:'ball',p:'balls',n:6},{e:'🎈',s:'balloon',p:'balloons',n:1},{e:'🚗',s:'car',p:'cars',n:4},
 {e:'🤖',s:'robot',p:'robots',n:7},{e:'⌚',s:'watch',p:'watches',n:1},{e:'📷',s:'camera',p:'cameras',n:1},
 {e:'📱',s:'phone',p:'phones',n:1},{e:'🚚',s:'lorry',p:'lorries',n:2}
];
// Уровень 5: предмет, число, зона-«место» в комнате. Зоны: [left%,top%,width%,height%, фикс.слоты]
const ZP={tableOn:'on the table',tableUnder:'under the table',tableAround:'around the table',sofaOn:'on the sofa',sofaBehind:'behind the sofa',sofaFront:'in front of the sofa',sofaNext:'next to the sofa',shelvesOn:'on the shelves',sillOn:'on the windowsill',bedAbove:'above the bed',between:'between the bed and the sofa',wardrobeIn:'in the wardrobe'};
const ZN={tableOn:{r:[58,44,14,12]},tableUnder:{r:[59,63,13,11]},tableAround:{r:[49,54,31,25],tl:1,s:[[53,60],[75,60],[54,76],[73,76]]},sofaOn:{r:[40,48,10,9]},sofaBehind:{r:[40,43,10,6]},sofaFront:{r:[37,74,15,10]},sofaNext:{r:[51,57,7,15]},shelvesOn:{r:[4,14,33,12]},sillOn:{r:[82,24,14,11]},bedAbove:{r:[20,31,12,9]},between:{r:[31,57,8,13],s:[[33,61]]},wardrobeIn:{r:[2,41,17,34],s:[[3.5,62],[12.5,62],[8,50]]}};
const L5=[
 {prep:'on',n:2,e:'💐',s:'flower vase',p:'flower vases',z:'tableOn'},{prep:'on',n:3,e:'🍎',s:'apple',p:'apples',z:'tableOn'},
 {prep:'on',n:3,e:'📕',s:'book',p:'books',z:'shelvesOn'},{prep:'on',n:1,e:'🪴',s:'plant',p:'plants',z:'sillOn'},
 {prep:'under',n:2,e:'🚗',s:'car',p:'cars',z:'tableUnder'},{prep:'under',n:1,e:'🎒',s:'backpack',p:'backpacks',z:'tableUnder'},
 {prep:'above',n:3,e:'🎈',s:'balloon',p:'balloons',z:'bedAbove'},{prep:'above',n:2,e:'🦋',s:'butterfly',p:'butterflies',z:'bedAbove'},
 {prep:'behind',n:1,e:'🪴',s:'plant',p:'plants',z:'sofaBehind'},{prep:'behind',n:2,e:'🐱',s:'cat',p:'cats',z:'sofaBehind'},
 {prep:'in front of',n:2,e:'⚽',s:'ball',p:'balls',z:'sofaFront'},{prep:'in front of',n:3,e:'🧸',s:'teddy bear',p:'teddy bears',z:'sofaFront'},
 {prep:'next to',n:1,e:'🐶',s:'dog',p:'dogs',z:'sofaNext'},{prep:'next to',n:1,e:'🎁',s:'present',p:'presents',z:'sofaNext'},
 {prep:'around',n:3,e:'🐱',s:'cat',p:'cats',z:'tableAround'},{prep:'around',n:4,e:'🍪',s:'cookie',p:'cookies',z:'tableAround'},
 {prep:'between',n:1,e:'🪔',s:'lamp',p:'lamps',z:'between'},{prep:'between',n:1,e:'🐸',s:'frog',p:'frogs',z:'between'},
 {prep:'in',n:1,e:'🧸',s:'teddy bear',p:'teddy bears',z:'wardrobeIn'},{prep:'in',n:2,e:'🦋',s:'butterfly',p:'butterflies',z:'wardrobeIn'}
];
const pickBy=(arr,key)=>{const m={};arr.forEach(x=>(m[key(x)]=m[key(x)]||[]).push(x));return shuffle(Object.values(m).map(pick))};
const NUM=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
const $=id=>document.getElementById(id),rnd=(a,b)=>a+Math.random()*(b-a),pick=a=>a[Math.floor(Math.random()*a.length)],shuffle=a=>[...a].sort(()=>Math.random()-.5);
const art=w=>/^[aeiou]/i.test(w)?'an':'a';
const np=(n,g)=>n==1?`${art(g.s)} ${g.s}`:`${NUM[n]} ${g.p}`;
let level=1,list=[],idx=0,mist=0,locked=false,said=false,stars=0,streak=0,lastQ='',cur=null,done={};
let tries=0,pendingNext=null,gen=0,timers=[],afterNext=null,target='',tiles=[],chosen=[],SRok=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
const later=(fn,ms)=>{const id=setTimeout(()=>{timers=timers.filter(x=>x!==id);fn()},ms);timers.push(id);return id};
const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
const L4=[
 {t:['There','are','three','pictures','on','the wall'],hl:['picture']},
 {t:['There','is','a','TV','on','the wall'],hl:['TV']},
 {t:['There','are','ten','books','on','the shelves'],hl:['book']},
 {t:['There','are','two','flower vases','on','the table'],hl:['flower vase']},
 {t:['There','is','a','lamp','on','the windowsill'],hl:['lamp']},
 {t:['There','is','a','cat','on','the armchair'],hl:['cat']},
 {t:['There','are','five','toys','on','the sofa'],hl:['toy']},
 {t:['There','are','two','rugs','on','the floor'],hl:['rug']},
 {t:['There','are','two','cars','under','the table'],hl:['car']},
 {t:['There','is','a','backpack','under','the table'],hl:['backpack']},
 {t:['There','are','three','shelves','above','the wardrobes'],hl:['shelf','wardrobe']},
 {t:['There','is','a','curtain','next to','the window'],hl:['curtain']},
 {t:['There','are','four','chairs','around','the table'],hl:['chair']},
 {t:['There','is','a','TV','behind','the table'],hl:['TV']},
 {t:['There','is','a','sofa','between','the bed and the table'],hl:['sofa']},
 {t:['There','is','a','TV','between','the sofa and the window'],hl:['TV']},
 {t:['There','is','a','rug','in front of','the bed'],hl:['rug']},
 {t:['There','are','two','armchairs','in front of','the window'],hl:['armchair']},
 {t:['There','are','two','wardrobes','in','the corner'],hl:['wardrobe']},
 {t:['There','is','a','ghost','in','the castle'],hl:['ghost']}
];

/* ========= 2. ЗВУК ========= */
let actx,musicOn=true,mt=null,mi=3;
const ctx=()=>{actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume();return actx};
function tone(f,t=0,d=.15,type='sine',v=.15,to=null){try{const a=ctx(),o=a.createOscillator(),g=a.createGain(),s=a.currentTime+t;o.type=type;o.frequency.setValueAtTime(f,s);if(to)o.frequency.exponentialRampToValueAtTime(to,s+d);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+d);o.connect(g);g.connect(a.destination);o.start(s);o.stop(s+d+.02)}catch(e){}}
const P=[523,587,659,784,880,1047,1175,1319];
const sfx={
 pop:()=>tone(300,0,.12,'sine',.25,900),
 boing:()=>{tone(200,0,.4,'sine',.25,700);tone(700,.15,.3,'sine',.12,250)},
 sparkle:()=>[0,1,2,3,4].forEach(i=>tone(P[i+2]*1.5,i*.06,.18,'triangle',.1)),
 giggle:()=>[0,1,2,3,4].forEach(i=>tone(600+i*80,i*.09,.08,'square',.07,900+i*80)),
 oooh:()=>{tone(300,0,.7,'sine',.2,520);tone(305,0,.7,'triangle',.1,525)},
 whoosh:()=>tone(1200,0,.4,'sawtooth',.05,150),
 squeak:()=>{tone(2200,0,.07,'square',.05,3000);tone(2800,.09,.07,'square',.05,3400)},
 wrong:()=>{tone(330,0,.15,'sine',.2,260);tone(260,.15,.25,'sine',.2,180)},
 win:()=>[0,2,4,5,7].forEach((n,i)=>tone(P[n],i*.09,.3,'triangle',.16)),
 fanfare:()=>[0,2,4,2,4,5,7,7].forEach((n,i)=>tone(P[n],i*.1,.35,'triangle',.18)),
 star:()=>{tone(1318,0,.1,'sine',.15);tone(1760,.08,.3,'sine',.15)}
};
function music(){clearInterval(mt);mt=null;if(!musicOn)return;mt=setInterval(()=>{if(Math.random()<.25)return;mi=Math.max(0,Math.min(7,mi+pick([-2,-1,-1,1,1,2])));tone(P[mi]/2,0,.9,'sine',.05);if(Math.random()<.3)tone(P[mi],.02,.5,'triangle',.02)},420)}
$('musicBtn').onclick=()=>{musicOn=!musicOn;$('musicBtn').textContent=musicOn?'🎵':'🔇';music();ctx()};
addEventListener('pointerdown',()=>{ctx();if(!mt&&musicOn)music()},{once:true});
let voice=null;
function pickVoice(){const v=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));voice=v.find(x=>/Samantha|Google US|Zira|Aria|Jenny|Female/i.test(x.name))||v[0]||null}
try{pickVoice();speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
function speak(t,pitch=1.3,rate=.8){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';if(voice)u.voice=voice;u.pitch=Math.min(pitch,1.3);u.rate=rate*.85;speechSynthesis.speak(u)}catch(e){}}
function speakThen(t,cb){const g0=gen;let f=false;const go=()=>{if(f||g0!==gen)return;f=true;cb()};
 try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';if(voice)u.voice=voice;u.pitch=1.25;u.rate=.7;u.onend=()=>later(go,400);speechSynthesis.speak(u)}catch(e){}
 later(go,Math.max(4000,t.length*220))}
function say(t){const s=$('speech');s.textContent=t;s.style.animation='none';void s.offsetWidth;s.style.animation=''}

/* ========= 3. АНИМАЦИЯ ПРИЗРАКА (БУ) ========= */
let mouse={x:.5,y:.5};
addEventListener('pointermove',e=>{const r=$('ghost').getBoundingClientRect();mouse.x=(e.clientX-r.left)/r.width;mouse.y=(e.clientY-r.top)/r.height});
function initRive(){ startFallbackGhost(); }
function react(k){const w=$('ghostWrap');w.className='';void w.offsetWidth;w.className=k;setTimeout(()=>w.className='',900);}
function startFallbackGhost(){
 const g=$('ghost').getContext('2d');let blink=0;
 (function loop(t){
  g.clearRect(0,0,380,380);
  const y=190+Math.sin(t/400)*12,m=$('ghostWrap').className,w=Math.sin(t/200);
  if(Math.random()<.008)blink=8;
  g.fillStyle='#fff';g.shadowColor='#7ee8c7';g.shadowBlur=25;g.beginPath();
  g.moveTo(90,y+110);g.lineTo(90,y-20);g.bezierCurveTo(90,y-130,290,y-130,290,y-20);g.lineTo(290,y+110);
  for(let i=0;i<4;i++){const x=290-i*50,k=Math.sin(t/180+i)*10;g.quadraticCurveTo(x-12,y+150+k,x-25,y+110);g.quadraticCurveTo(x-37,y+75-k,x-50,y+110)}
  g.fill();
  [[85,-1],[295,1]].forEach(([x,s])=>{g.beginPath();g.ellipse(x,y+40+w*s*15,28,16,s*(.5+w*.4),0,7);g.fill()});
  g.shadowBlur=0;
  const ex=(mouse.x-.5)*14,ey=(mouse.y-.5)*10;
  [150,230].forEach(x=>{
   g.fillStyle='#fff';g.strokeStyle='#2b1b5a';g.lineWidth=3;g.beginPath();
   g.ellipse(x,y-20,19,blink?3:22,0,0,7);g.fill();g.stroke();
   if(!blink){g.fillStyle='#2b1b5a';g.beginPath();g.arc(x+ex,y-18+ey,10,0,7);g.fill()}
  });
  if(blink)blink--;
  g.strokeStyle='#2b1b5a';g.lineWidth=6;g.lineCap='round';g.beginPath();
  if(m==='sad')g.arc(190,y+55,22,Math.PI*1.1,Math.PI*1.9);
  else if(m==='happy'){g.fillStyle='#2b1b5a';g.arc(190,y+22,24,0,Math.PI);g.fill()}
  else g.arc(190,y+20,26,.15*Math.PI,.85*Math.PI);
  g.stroke();
  g.fillStyle='#ff9bc4aa';g.beginPath();g.arc(125,y+15,13,0,7);g.arc(255,y+15,13,0,7);g.fill();
  requestAnimationFrame(loop)
 })(0);
}
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

/* ========= 5. ПОМЕЩЕНИЕ ПРЕДМЕТОВ В КОМНАТУ ========= */
function placeGroup(g,lv,instant){
 g.pos.forEach((p,i)=>{
  const d=document.createElement('div');d.className='f '+(g.k||'')+(g.k&&g.k!=='picture'?'':'')+(instant?'':' in');d.dataset.lv=lv;d.dataset.g=g.s;
  if(g.e&&(!g.k||g.k==='picture'))d.textContent=g.es?g.es[i]:g.e;
  d.style.cssText=`left:${p[0]}%;top:${p[1]}%;font-size:${g.fs}em;--b:${rnd(1.6,3.2)}s`;
  d.onclick=e=>{wig(d);sfx.boing();spark(e.clientX,e.clientY);const t=`${art(g.s)} ${g.s}`;say(t);speak(t,1.4,.85)};
  if(instant)$('items').appendChild(d);else later(()=>{$('items').appendChild(d);sfx.pop()},i*220);
 });
}
const removeLv=n=>document.querySelectorAll('#items .f').forEach(d=>{if(+d.dataset.lv>=n)d.remove()});

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
 $('hintBtn').hidden=true;locked=true;target=text;tries=0;stars+=mist?1:2;streak++;updHud();setS(text);react('happy');sfx.win();burst();
 const c=pick(['Yay!','Super!','Great job!','Hooray!','Wow!']);say(c);speak(c+' '+text,1.5,.9);
 said=false;const sb=$('sayBtn');sb.hidden=false;sb.textContent=SRok?'🎤 Now you say it! +⭐':'🗣️ I said it! +⭐';
 afterNext=()=>{idx++;next()};pendingNext='Next ➡️'}
function showNext(t){const b=$('nextBtn');b.textContent=t;b.hidden=false}
function revealNext(){if(pendingNext){showNext(pendingNext);pendingNext=null}}
$('nextBtn').onclick=()=>{sfx.pop();$('nextBtn').hidden=true;$('sayBtn').hidden=true;const f=afterNext;afterNext=null;if(f)f()};
function bad(hint,btn){mist++;streak=0;updHud();if(btn){btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),450)}
 setS(hint,'bad');const o=pick(['Oops! Try again!','Almost! Think!','Hmm, look again!']);say(o);speak(o,1.2);react('sad');sfx.wrong()}

function clearSpot(){document.querySelectorAll('.demo').forEach(e=>e.remove());document.querySelectorAll('.bg').forEach(e=>e.classList.remove('bg'));document.querySelectorAll('.spot').forEach(e=>e.classList.remove('spot'));$('items').classList.remove('dim');$('ghostWrap').classList.remove('gl')}
function startLevel(n){
 gen++;clearTimers();try{speechSynthesis.cancel()}catch(e){}
 afterNext=null;pendingNext=null;cur=null;locked=true;idx=0;level=n;selPiece=null;used={};
 ['nextBtn','sayBtn','hintBtn'].forEach(i=>$(i).hidden=true);
 $('cart').innerHTML='';$('question').textContent='';setS('');$('controls').innerHTML='';$('zones').innerHTML='';$('zones').className='';$('task').textContent=['','','Count and say. Use there is / there are.','Build the sentence, then say it aloud!','Listen to Boo. Move the things to the right place. Stuck? Press 💡!'][n-1];
 clearSpot();$('room').classList.toggle('clean',n===5);
 if(n===1){$('items').innerHTML='';done={}}
 else{for(const m of [1,2])if(m<n&&!(n===5&&m===2)&&!done[m]){removeLv(m);(m===1?L1:L2).forEach(g=>placeGroup(g,m,true));done[m]=true}removeLv(n);
  if(n===5){document.querySelectorAll('#items .f').forEach(d=>{if(+d.dataset.lv!==1)d.remove()});done[2]=false}}
 document.querySelectorAll('.pill[data-lv]').forEach(b=>b.classList.toggle('on',+b.dataset.lv===n));
 list=n===1?shuffle(L1):n===2?shuffle(L2):n===3?shuffle(L3):n===4?pickBy(L4,x=>x.t[4]):pickBy(L5,x=>x.prep);
 const c=$('controls');
 if(n===1)c.innerHTML='<div class="row" style="--c:5">'+[1,2,3,4,5].map(v=>`<button class="big" data-v="${v}">${v}</button>`).join('')+'</div>';
 else if(n===2)c.innerHTML='<div class="row" id="yn"></div>';
 else if(n===3){c.innerHTML=`<div class="play"><div class="box" data-t="is"><big>🎁</big>THERE IS<small>(one)</small><div class="inside"></div></div><div class="stage"><div class="grp" id="grp"></div></div><div class="box" data-t="are"><big>🧰</big>THERE ARE<small>(many)</small><div class="inside"></div></div></div>`;initDrag()}
 else if(n===4){c.innerHTML='<div id="sb"><div class="line" id="line"></div><div class="bank" id="bank" style="margin-top:10px"></div></div>';initSB()}
 else{c.innerHTML='<div class="tray" id="tray"></div>';initTray()}
 const intro=["Let's decorate my castle!","Look at my room. Be a detective!","Let's play! Give me the toys!","Tell me about my room!","Listen, and help me!"][n-1];
 say(intro);speakThen(intro,next);
}
document.querySelectorAll('.pill[data-lv]').forEach(b=>b.onclick=()=>startLevel(+b.dataset.lv));
function next(){if(idx>=list.length)return levelDone();mist=0;locked=false;$('sayBtn').hidden=true;$('nextBtn').hidden=true;$('hintBtn').hidden=true;setS('');cur=list[idx];[r1,r2,r3,r4,r5][level-1](cur)}
function levelDone(){done[level]=true;
 if(level===5)return finale();
 const m=["My castle looks great! Now Level 2!","Wonderful! Now let's play! Level 3!","I'm so happy! Now I have lots of toys! Thank you, my friend!","Fantastic! You know the prepositions! One more level!"][level-1];
 say(m);setS('🎉 '+m);sfx.fanfare();burst();burst();speak(m);react('happy');if(level===3)toyParty();
 afterNext=()=>startLevel(level+1);showNext('Level '+(level+1)+' ➡️')}
/* --- Уровень 1: How many...? --- */
function r1(g){
 const cart=$('cart');cart.innerHTML='';
 for(let i=0;i<g.n;i++){const s=document.createElement('span');s.className='f '+(g.k||'');s.style.cssText=`font-size:${Math.min(g.fs*.55,2.8)}rem;--i:${i*.15}s;`;if(g.e&&(!g.k||g.k==='picture'))s.textContent=g.e;s.style.position='relative';cart.appendChild(s)}
 setQ(pick([`How many ${g.p} are there?`,`How many ${g.p} can you see?`,`Count the ${g.p}! How many are there?`]));
}
$('cart').onclick=()=>{if(cur&&level===1){sfx.pop();speak(`${art(cur.s)} ${cur.s}`,1.3,.8)}};
$('controls').onclick=e=>{const b=e.target.closest('button[data-v]');if(!b||locked||!cur)return;
 if(level===1){
  if(+b.dataset.v!==cur.n){bad(mist?`Hint: count them one by one! 👆`:'Hmm, count again! 🤔',b);if(mist>=2)document.querySelector(`#controls [data-v="${cur.n}"]`).classList.add('glow');return}
  good(`There ${cur.n==1?'is':'are'} ${NUM[cur.n]} ${cur.n==1?cur.s:cur.p}.`);placeGroup(cur,1);later(()=>$('cart').innerHTML='',600);
 }else if(level===2){
  const ok=(b.dataset.v==='yes')===cur.q.truth;
  if(!ok){bad('Look at the room again! 👀',b);if(mist>=2)document.querySelector(`#yn [data-v="${cur.q.truth?'yes':'no'}"]`).classList.add('glow');return}
  const q=cur.q;good(q.truth?`Yes, there ${q.be}.`:`No, there ${q.be==='is'?"isn't":"aren't"}. There ${cur.n==1?'is':'are'} ${np(cur.n,cur)} ${cur.loc}.`);
 }};

/* --- Уровень 2: Are there...? Yes, there are / No, there aren't --- */
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

/* --- Уровень 3: «Раздай игрушки» по коробкам --- */
function r3(g){
 const one=g.n==1,grp=$('grp');grp.className='grp';grp.style.transform='';grp.style.opacity=1;grp.innerHTML='';
 for(let i=0;i<g.n;i++){const s=document.createElement('span');s.textContent=g.e;s.style.setProperty('--i',i*.12+'s');grp.appendChild(s)}
 setQ('What can you see?');
}
function initDrag(){
 const grp=$('grp');let sx,sy,drag=false,moved=false;
 const boxAt=e=>document.elementsFromPoint(e.clientX,e.clientY).find(el=>el.classList&&el.classList.contains('box'));
 grp.onpointerdown=e=>{if(locked)return;sx=e.clientX;sy=e.clientY;drag=true;moved=false;grp.setPointerCapture(e.pointerId);grp.style.transition='none'};
 grp.onpointermove=e=>{if(!drag)return;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.hypot(dx,dy)>8)moved=true;if(moved){grp.style.transform=`translate(${dx}px,${dy}px) scale(1.1)`;document.querySelectorAll('.box').forEach(b=>b.classList.toggle('hot',b===boxAt(e)))}};
 grp.onpointerup=e=>{if(!drag)return;drag=false;grp.style.transition='transform .4s';document.querySelectorAll('.box').forEach(b=>b.classList.remove('hot'));
  if(moved){const b=boxAt(e);if(b)drop(b);else grp.style.transform=''}else{grp.classList.toggle('sel');sfx.pop()}};
 document.querySelectorAll('.box').forEach(b=>b.onclick=()=>{if(grp.classList.contains('sel'))drop(b)});
}
function drop(b){
 if(locked)return;const grp=$('grp'),g=cur,right=(b.dataset.t==='is')===(g.n==1);
 if(!right){grp.style.transform='';grp.classList.remove('sel');bad('One toy → THERE IS 🎁. Many toys → THERE ARE 🧰!',null);return}
 const gr=grp.getBoundingClientRect(),br=b.getBoundingClientRect();
 grp.style.transform=`translate(${br.left+br.width/2-gr.left-gr.width/2}px,${br.top+br.height/2-gr.top-gr.height/2}px) scale(.3)`;grp.style.opacity=0;
 b.classList.add('pulse');setTimeout(()=>b.classList.remove('pulse'),600);sfx.boing();
 const ins=b.querySelector('.inside');for(let i=0;i<g.n;i++)ins.insertAdjacentHTML('beforeend',`<span>${g.e}</span>`);
 good(`There ${g.n==1?'is':'are'} ${NUM[g.n]} ${g.n==1?g.s:g.p}.`);
}
function toyParty(){
 L3.forEach((g,i)=>{const d=document.createElement('div');d.className='f dance in';d.dataset.lv=3;d.dataset.g='party';d.textContent=g.e;
  d.style.cssText=`left:${rnd(4,90)}%;top:${rnd(76,86)}%;font-size:1.8em;--b:${rnd(.5,1)}s`;
  d.onclick=e=>{wig(d);sfx.boing();spark(e.clientX,e.clientY)};later(()=>{$('items').appendChild(d);sfx.pop()},i*250)})}
/* --- Уровень 4: собери предложение из плиток --- */
function r4(t){
 clearSpot();$('items').classList.add('dim');
 document.querySelectorAll('#items .f').forEach(e=>{if(t.hl.includes(e.dataset.g))e.classList.add('spot')});
 if(t.hl.includes('ghost')){$('ghostWrap').classList.add('gl');$('items').classList.remove('dim')}
 setQ('What can you see? Where is it?');
 let ws=shuffle(t.t);while(ws.join()===t.t.join())ws=shuffle(t.t);
 tiles=ws.map((w,i)=>({w,i}));chosen=[];renderSB();
}
function renderSB(red=[]){
 $('line').innerHTML=cur.t.map((w,k)=>chosen[k]!==undefined?`<button class="tile in${red.includes(k)?' red':''}" data-k="${k}">${tiles[chosen[k]].w}</button>`:'<span class="slot"></span>').join('')+'<b>.</b>';
 $('bank').innerHTML=tiles.map(x=>chosen.includes(x.i)?'':`<button class="tile" data-i="${x.i}">${x.w}</button>`).join('')}
function initSB(){$('sb').onclick=e=>{const b=e.target.closest('.tile');if(!b||locked||!cur)return;
 if(b.dataset.i!==undefined){if(chosen.length>=cur.t.length)return;chosen.push(+b.dataset.i);speak(tiles[+b.dataset.i].w,1.4,.9)}else chosen.splice(+b.dataset.k,1);
 sfx.pop();renderSB();if(chosen.length===cur.t.length)checkSB()}}
function checkSB(){
 const wr=cur.t.map((w,k)=>tiles[chosen[k]].w===w?-1:k).filter(k=>k>=0);
 if(!wr.length){document.querySelectorAll('.spot').forEach(e=>wig(e));return good(cur.t.join(' ')+'.')}
 renderSB(wr);bad(wr.includes(1)||wr.includes(2)?'One thing or many things? is / are 🤔':wr.includes(4)||wr.includes(5)?'Where is it? Look at the glowing things! 👀':'Check the word order! 🧩',null)}
/* --- Уровень 5 --- */
let selPiece=null,placed=0,used={};
const ANCH={tableOn:'table',tableUnder:'table',tableAround:'table',sofaOn:'sofa',sofaBehind:'sofa',sofaFront:'sofa',sofaNext:'sofa',shelvesOn:'shelves',sillOn:'sill',bedAbove:'bed',between:'bs',wardrobeIn:'wardrobe'};
const KEEP={table:['table','chair'],sofa:['sofa'],shelves:['shelf'],sill:[],bed:['bed'],bs:['bed','sofa'],wardrobe:['wardrobe']};
const area=k=>ZN[k].r[2]*ZN[k].r[3];
function r5(t){
 clearSpot();placed=0;selPiece=null;used={};$('hintBtn').hidden=false;
 document.querySelectorAll('#items .f').forEach(d=>{if(+d.dataset.lv===5)d.remove()});
 t.sent=`There ${t.n==1?'is':'are'} ${np(t.n,t)} ${ZP[t.z]}.`;setQ(t.sent);
 const keys=Object.keys(ZN),same=shuffle(keys.filter(k=>k!==t.z&&ANCH[k]===ANCH[t.z])),rest=shuffle(keys.filter(k=>k!==t.z&&ANCH[k]!==ANCH[t.z]));
 const zs=[t.z,...same,...rest].slice(0,3).sort((a,b)=>area(b)-area(a));
 const keep=new Set();zs.forEach(k=>KEEP[ANCH[k]].forEach(g=>keep.add(g)));
 document.querySelectorAll('#items .f').forEach(d=>d.classList.toggle('bg',!keep.has(d.dataset.g)));
 const zl=$('zones');zl.innerHTML='';zl.className='show';
 zs.forEach(k=>{const d=ZN[k],z=document.createElement('div');z.className='zone';z.dataset.z=k;
  z.style.cssText=`left:${d.r[0]}%;top:${d.r[1]}%;width:${d.r[2]}%;height:${d.r[3]}%`;
  z.onclick=()=>{if(selPiece)placePiece(selPiece,k)};zl.appendChild(z)});
 const others=shuffle(L5.filter(x=>x.e!==t.e)).filter((x,i,a)=>a.findIndex(y=>y.e===x.e)===i).slice(0,2),pcs=[];
 for(let i=0;i<Math.min(t.n+1,6);i++)pcs.push(t.e);others.forEach(o=>pcs.push(o.e));
 $('tray').innerHTML=shuffle(pcs).map(e=>`<button class="pc" data-e="${e}">${e}</button>`).join('');
}
function slotOf(z){const d=ZN[z],k=used[z]||0;used[z]=k+1;if(d.s)return d.s[k%d.s.length];const c=Math.max(1,Math.floor(d.r[2]/4));return[d.r[0]+.5+(k%c)*4,d.r[1]+.5+(Math.floor(k/c)%2)*5]}
function placePiece(p,z){
 if(locked||!cur)return;const t=cur,ok=p.dataset.e===t.e&&z===t.z;
 p.style.transform='';p.classList.remove('sel');selPiece=null;
 if(!ok){bad(p.dataset.e!==t.e?'Is it the right thing? Listen again! 🔊':'Listen to the place again! 🔊',null);later(()=>speak(t.sent),1800);if(mist>=2){const q=document.querySelector(`.zone[data-z="${t.z}"]`);if(q)q.classList.add('glow')}return}
 p.remove();const pos=slotOf(z),d=document.createElement('div');d.className='f in';d.dataset.lv=5;d.dataset.g=t.s;d.textContent=t.e;
 d.style.cssText=`left:${pos[0]}%;top:${pos[1]}%;font-size:1.8em;--b:${rnd(1.6,3)}s;`+(z==='sofaBehind'?'z-index:1':'');
 d.onclick=ev=>{wig(d);sfx.boing();spark(ev.clientX,ev.clientY);speak(np(1,t),1.3,.8)};
 $('items').appendChild(d);sfx.pop();
 if(++placed===t.n){document.querySelectorAll('.zone').forEach(q=>{if(q.dataset.z!==t.z)q.remove();else q.classList.add('ok')});good(t.sent)}}
$('hintBtn').onclick=()=>{if(locked||!cur||level!==5)return;mist++;sfx.sparkle();const t=cur;
 const z=document.querySelector(`.zone[data-z="${t.z}"]`),pc=[...document.querySelectorAll('.pc')].find(x=>x.dataset.e===t.e);if(!z||!pc)return;
 const a=pc.getBoundingClientRect(),b=z.getBoundingClientRect(),d=document.createElement('div');d.className='demo';d.textContent=t.e;
 d.style.cssText=`position:fixed;z-index:60;font-size:2.4rem;left:${a.left}px;top:${a.top}px;transition:all 1.1s cubic-bezier(.4,0,.2,1);pointer-events:none`;document.body.appendChild(d);
 requestAnimationFrame(()=>requestAnimationFrame(()=>{d.style.left=(b.left+b.width/2-20)+'px';d.style.top=(b.top+b.height/2-20)+'px'}));
 z.classList.add('glow');later(()=>{d.remove();z.classList.remove('glow')},2400);later(()=>speak(t.sent),500)};
function initTray(){
 const tray=$('tray');let dr=null;
 const zoneAt=e=>document.elementsFromPoint(e.clientX,e.clientY).find(x=>x.classList&&x.classList.contains('zone'));
 tray.onpointerdown=e=>{const p=e.target.closest('.pc');if(!p||locked)return;dr={p,sx:e.clientX,sy:e.clientY,m:false};p.setPointerCapture(e.pointerId);p.style.transition='none';p.style.zIndex=30};
 tray.onpointermove=e=>{if(!dr)return;const dx=e.clientX-dr.sx,dy=e.clientY-dr.sy;if(Math.hypot(dx,dy)>8)dr.m=true;
  if(dr.m){dr.p.style.transform=`translate(${dx}px,${dy}px) scale(1.3)`;const z=zoneAt(e);document.querySelectorAll('.zone').forEach(q=>q.classList.toggle('hot',q===z))}};
 tray.onpointerup=e=>{if(!dr)return;const d=dr;dr=null;d.p.style.transition='transform .3s';d.p.style.zIndex='';
  document.querySelectorAll('.zone').forEach(q=>q.classList.remove('hot'));
  if(d.m){const z=zoneAt(e);if(z)placePiece(d.p,z.dataset.z);else d.p.style.transform=''}
  else{document.querySelectorAll('.pc').forEach(q=>q.classList.remove('sel'));
   if(selPiece===d.p)selPiece=null;else{selPiece=d.p;d.p.classList.add('sel');sfx.pop()}}};
}
function finale(){
 clearSpot();$('room').classList.remove('clean');
 const m="You are a superstar! You described my whole room in English!";
 say(m);setS('🏆 '+m);speak(m);sfx.fanfare();burst();burst();burst();react('happy');
 const rank=stars>=60?'🏆 Super Star!':stars>=35?'🥇 Great Helper!':'🥈 Good Friend!';
 $('controls').innerHTML=`<div class="row" style="--c:1"><button class="big yes" id="again">${rank} ⭐ ${stars} — Play again 🔄</button></div>`;
 $('again').onclick=()=>{stars=0;streak=0;updHud();startLevel(1)}}

/* ========= 7. КОНФЕТТИ ========= */
const cv=$('confetti'),cx=cv.getContext('2d');let parts=[];
function fit(){cv.width=innerWidth;cv.height=innerHeight}addEventListener('resize',fit);fit();
function burst(){const run=!parts.length;for(let i=0;i<80;i++)parts.push({x:innerWidth/2,y:innerHeight/3,vx:rnd(-8,8),vy:-rnd(3,14),c:`hsl(${rnd(0,360)},90%,60%)`,r:rnd(4,9),l:100});if(run)tick()}
function tick(){cx.clearRect(0,0,cv.width,cv.height);parts=parts.filter(p=>p.l>0);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=.45;p.l--;cx.fillStyle=p.c;cx.fillRect(p.x,p.y,p.r,p.r)});if(parts.length)requestAnimationFrame(tick)}
setInterval(()=>{if(!locked&&Math.random()<.4){react('happy');say(pick(["Can you count?","Boo-tiful day!","I see you!","Tap my things!"]))}},10000);

/* ========= 8. СТАРТ ========= */
initRive();$('helpBtn').onclick=$('helpGo').onclick=()=>{$('help').hidden=false};$('helpClose').onclick=()=>{$('help').hidden=true};
$('go').onclick=()=>{$('start').remove();ctx();music();startLevel(1)};