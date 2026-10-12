gsap.registerPlugin(Draggable, window.InertiaPlugin);
const $=s=>document.querySelector(s),shuffle=a=>[...a].sort(()=>Math.random()-.5),pick=a=>a[Math.floor(Math.random()*a.length)];
const el=h=>{const t=document.createElement('template');t.innerHTML=h.trim();const e=t.content.firstChild;document.body.append(e);return e};
const cap=s=>s[0].toUpperCase()+s.slice(1);
let E=0,busy=false,muted=false,last='',cur=0,lvRun=0,stars=0,DR=[],sh=null,pulseFn=()=>{},sp=0,talkTw=null;
const lvStars=Array(8).fill(0);
/* epoch guard: after leaving a level the old async chain simply hangs */
const live=f=>async(...a)=>{const e=E;const v=await f(...a);if(e!==E)await new Promise(()=>{});return v};
const sleep=live(ms=>new Promise(r=>setTimeout(r,ms)));

const BEANIE=`<svg viewBox="0 0 64 64" width="1em" height="1em" style="display:block;margin:0 auto"><path d="M8 46Q8 12 32 12Q56 12 56 46Z" fill="#ff5d8f"/><path d="M20 14v32M32 12v34M44 14v32" stroke="#ff8fb3" stroke-width="3"/><rect x="5" y="42" width="54" height="13" rx="6" fill="#ffd166"/><circle cx="32" cy="9" r="7" fill="#fff"/></svg>`;
const BOOT=`<svg viewBox="0 0 64 64" width="1em" height="1em" style="display:block"><path d="M14 8H38V38Q38 42 44 43L54 46Q60 48 60 54V58H14Z" fill="#7a4a2a"/><rect x="11" y="4" width="30" height="11" rx="5.5" fill="#f5efe6"/><path d="M18 24H34M18 31H34M18 38H34" stroke="#d9b48a" stroke-width="2.5" stroke-linecap="round"/><rect x="14" y="53" width="46" height="6" rx="3" fill="#2f2119"/></svg>`;
const GLASSES=`<svg viewBox='0 0 120 50' width='1em' height='.42em' style='display:block'><rect x='6' y='5' width='46' height='38' rx='16' fill='#151515'/><rect x='68' y='5' width='46' height='38' rx='16' fill='#151515'/><path d='M52 18Q60 12 68 18' stroke='#151515' stroke-width='5' fill='none'/><path d='M6 14L0 10M114 14L120 10' stroke='#151515' stroke-width='4' stroke-linecap='round'/><path d='M14 15Q22 10 30 12M76 15Q84 10 92 12' stroke='#fff' stroke-opacity='.5' stroke-width='3' fill='none' stroke-linecap='round'/></svg>`;
const ITEMS={tshirt:{e:'👕',n:'T-shirt',a:'a T-shirt',s:'body'},shorts:{e:'🩳',n:'shorts',a:'shorts',s:'legs'},sunglasses:{e:'🕶️',n:'sunglasses',a:'sunglasses',s:'face',h:GLASSES},
sunhat:{e:'🧢',n:'cap',a:'a cap',s:'head'},woolhat:{h:BEANIE,n:'hat',a:'a hat',s:'head'},
coat:{e:'🧥',n:'coat',a:'a coat',s:'body'},jacket:{e:'🧥',n:'jacket',a:'a jacket',s:'body',f:'hue-rotate(170deg)'},raincoat:{e:'🧥',n:'raincoat',a:'a raincoat',s:'body',f:'hue-rotate(40deg) saturate(2.5)'},
boots:{h:BOOT,x2:1,n:'boots',a:'boots',s:'feet'},umbrella:{e:'☂️',n:'umbrella',a:'an umbrella',s:'hand'},scarf:{e:'🧣',n:'scarf',a:'a scarf',s:'neck'}};
const ico=k=>{const I=ITEMS[k],one=I.h||I.e;return I.x2?`<span style="display:inline-flex;font-size:.6em">${one+one}</span>`:one};
const WI={sunny:'☀️',rainy:'🌧️',snowy:'❄️',windy:'💨'};
const LV=[
{w:'sunny',name:'The Sunny Island',ic:'☀️',mood:'🥵',bg:['#6fd3ff','#fff1b8','#f6d58a'],deco:['🌴','🏝️','🌴'],intro:"Look! It's sunny and hot!",ask:"I'm hot! What should I wear?",need:['tshirt','shorts','sunglasses','sunhat'],bad:['coat','boots'],pf:n=>`Put on your ${n}!`,no:a=>`Oh no, it's too hot for ${a}!`,say:"It's sunny!",key:'sunny',chant:"Sunny, sunny, put on your cap!"},
{w:'rainy',name:'The Rainy Mountain',ic:'⛈️',mood:'😰',bg:['#7d93ad','#b9c8d6','#6f8f6a'],deco:['⛰️','🌲','⛰️'],intro:"Oh no! Listen! It's rainy!",ask:"I'm wet! I need my raincoat and umbrella!",boxes:'umbrella',need:['raincoat','boots'],bad:['shorts','sunglasses'],pf:n=>`Put on your ${n}!`,no:()=>"Oh no! That's not for the rain!",say:"It's rainy!",key:'rain',chant:"Rainy, rainy, don't forget your coat!"},
{w:'snowy',name:'The Snowy Valley',ic:'☃️',mood:'🥶',bg:['#bfe3ff','#eef8ff','#ffffff'],deco:['🏔️','⛄','🌲'],intro:"Brrr... It's cold! It's snowy!",ask:"Brrr! I'm so cold! What should I wear?",need:['woolhat','coat','boots'],bad:['tshirt','sunglasses','shorts'],pf:n=>`It's cold. Put on your ${n}!`,no:a=>`Brrr! ${cap(a)} won't keep me warm!`,say:"It's cold! It's snowy!",key:'cold',chant:"Cold, cold, wear your boots!"},
{w:'windy',name:'The Windy Hills',ic:'🪁',mood:'🌬️',bg:['#a6e3d1','#dff7ec','#7cc47f'],deco:['🌾','🌳','🌾'],intro:"Whoo! It's windy!",ask:"My hat is flying! What should I wear?",need:['jacket','scarf','woolhat'],bad:['shorts','sunglasses','umbrella'],pf:n=>`Don't forget your ${n}!`,no:()=>"Oh no! That's not for the wind!",say:"It's windy!",key:'windy',chant:"Windy, windy, don't forget your jacket!"}];

/* ---------- voice ---------- */
let vB,vK;const pv=()=>{const v=speechSynthesis.getVoices(),en=v.filter(x=>x.lang.startsWith('en'));
 vB=en.find(x=>/(Daniel|Alex|Fred|David|Mark|Guy|Ryan|Male)/i.test(x.name))||en[0];vK=en.find(x=>/(Samantha|Google US|Aria|Jenny|Zira|Female)/i.test(x.name))||en[0]};
if('speechSynthesis' in window){speechSynthesis.onvoiceschanged=pv;pv()}
const unlock=()=>{if('speechSynthesis' in window)speechSynthesis.speak(new SpeechSynthesisUtterance(''));audioStart()};
function talk(on){if(talkTw){talkTw.kill();talkTw=null}if(on)talkTw=gsap.to('.mouth',{scaleY:2.4,scaleX:1.25,yoyo:true,repeat:-1,duration:.17});else gsap.to('.mouth',{scaleY:1,scaleX:1,duration:.15})}
function speak(t,role='bear',rate,pitch){return new Promise(res=>{const id=++sp,bear=role==='bear';if(bear)talk(true);
 const done=()=>{if(sp===id&&bear)talk(false);res()};
 if(muted||!('speechSynthesis' in window))return setTimeout(done,Math.min(3500,t.length*95));
 speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang='en-US';u.rate=rate||(bear?.78:.9);u.pitch=pitch??(bear?.7:1.35);const v=bear?vB:vK;if(v)u.voice=v;
 u.onend=done;u.onerror=done;speechSynthesis.speak(u);setTimeout(done,12000)})}
const say=live(async(t,shown)=>{last=t;$('#st').textContent=shown??t;gsap.fromTo('#say',{scale:.6,opacity:0},{scale:1,opacity:1,duration:.45,ease:'back.out(2)'});await speak(t,'bear')});
const advise=live(async t=>{$('#at').textContent='🧒 '+t;const a=$('#adv');a.style.display='block';gsap.fromTo(a,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2)'});await speak(t,'kid')});
const hideAdv=()=>$('#adv').style.display='none';
const task=t=>{const e=$('#task');e.style.display=t?'block':'none';e.textContent=t||''};
$('#rep').onclick=()=>{speak(last);pulseFn()};
$('#ar').onclick=()=>speak($('#at').textContent.slice(3),'kid');
$('#mute').onclick=e=>{muted=!muted;e.target.textContent=muted?'🔇':'🔊';speechSynthesis.cancel()};

/* ---------- sound: synthesized music, ambience and effects ---------- */
let AC,MUS=true,musI=null,amb=null,curW='none';
const ac=()=>{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();return AC};
function tone(f,d=.2,type='sine',v=.15,t0=0){try{const a=ac(),o=a.createOscillator(),g=a.createGain(),t=a.currentTime+t0;o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+d)}catch(e){}}
const sfx={pop:()=>{tone(600,.1,'sine',.25);tone(1200,.07,'sine',.15,.03)},ding:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.35,'triangle',.12,i*.08)),boop:()=>{tone(220,.25,'square',.05);tone(160,.25,'square',.05,.12)},giggle:()=>[700,900,800,1000,900].forEach((f,i)=>tone(f,.09,'sine',.1,i*.08))};
function noiseSrc(){const a=ac(),b=a.createBuffer(1,a.sampleRate*2,a.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;const s=a.createBufferSource();s.buffer=b;s.loop=true;return s}
function ambience(w){curW=w;if(amb){amb.forEach(n=>{try{n.stop()}catch(e){}});amb=null}if(!AC||!MUS||w==='none')return;
 const a=ac(),n=noiseSrc(),f=a.createBiquadFilter(),g=a.createGain(),nodes=[n],cfg={rainy:['highpass',1200,.05],windy:['bandpass',500,.1],sunny:['lowpass',500,.08],snowy:['lowpass',250,.04]}[w];
 f.type=cfg[0];f.frequency.value=cfg[1];g.gain.value=cfg[2];n.connect(f);f.connect(g);g.connect(a.destination);
 if(w!=='rainy'){const l=a.createOscillator(),lg=a.createGain();l.frequency.value=w==='windy'?.25:.12;lg.gain.value=cfg[2]*.8;l.connect(lg);lg.connect(g.gain);l.start();nodes.push(l)}
 n.start();amb=nodes}
function music(on){clearInterval(musI);musI=null;if(!on||!AC)return;const sc=[262,294,330,392,440,523,588],bass=[131,175,196,131];let i=0,p=2;
 musI=setInterval(()=>{p=Math.max(0,Math.min(6,p+pick([-2,-1,1,2])));tone(sc[p],.5,'triangle',.045);if(i%4===0)tone(bass[(i/4)%4],.9,'sine',.06);if(i%2===0)tone(sc[p]*2,.2,'sine',.02,.22);i++},480)}
function audioStart(){try{ac();music(MUS);ambience(curW)}catch(e){}}
$('#mus').onclick=e=>{MUS=!MUS;e.target.textContent=MUS?'🎵':'🔕';if(MUS)audioStart();else{music(false);ambience(curW)}};

/* ---------- effects ---------- */
const boom=(x=.5,y=.6,n=90)=>confetti({particleCount:n,spread:85,origin:{x,y},zIndex:100,colors:['#ff5d8f','#ffb703','#4cc9f0','#80ed99','#b388ff']});
const bigBoom=()=>{const e=Date.now()+3500;(function f(){confetti({particleCount:6,angle:60,spread:60,origin:{x:0,y:.8},zIndex:100});confetti({particleCount:6,angle:120,spread:60,origin:{x:1,y:.8},zIndex:100});if(Date.now()<e)requestAnimationFrame(f)})()};
const star=n=>{stars+=n;lvRun+=n;$('#stars').textContent='⭐ '+stars;gsap.fromTo('#stars',{scale:1.6},{scale:1,duration:.5,ease:'back.out(3)'})};
const cv=$('#fx'),cx=cv.getContext('2d');let W,H,mode='none',P=[];
const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};rs();addEventListener('resize',rs);
function setFx(m){mode=m;P=Array.from({length:{rainy:150,snowy:90,windy:30,sunny:30}[m]||0},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random(),v:Math.random()}))}
(function loop(t){cx.clearRect(0,0,W,H);for(const p of P){
 if(mode==='rainy'){cx.strokeStyle='#cfe8ffcc';cx.lineWidth=2;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(p.x-4,p.y+18);cx.stroke();p.y+=15+p.v*9;p.x-=1.5}
 else if(mode==='snowy'){cx.fillStyle='#fff';cx.beginPath();cx.arc(p.x,p.y,2+p.r*4,0,7);cx.fill();p.y+=1+p.v*2;p.x+=Math.sin(t/700+p.r*9)}
 else if(mode==='windy'){cx.font='28px serif';cx.fillText('🍃',p.x,p.y+Math.sin(t/300+p.r*9)*18);p.x+=9+p.v*9}
 else if(mode==='sunny'){cx.fillStyle=`rgba(255,215,90,${.3+.5*Math.abs(Math.sin(t/600+p.r*9))})`;cx.beginPath();cx.arc(p.x,p.y,2+p.r*4,0,7);cx.fill();p.y-=.3+p.v*.5}
 if(p.y>H+20)p.y=-20;if(p.y<-20)p.y=H;if(p.x>W+30)p.x=-30;if(p.x<-30)p.x=W}
 requestAnimationFrame(loop)})(0);

/* ---------- Teddy ---------- */
const S=Math.min(1,innerHeight/820,innerWidth/430);gsap.set('#leo',{scale:S});gsap.set('.armL',{rotation:14});gsap.set('.armR',{rotation:-14});
gsap.to('#leoIn',{scaleY:1.035,yoyo:true,repeat:-1,duration:1.3,ease:'sine.inOut'});
setInterval(()=>gsap.to('.eye',{scaleY:.1,yoyo:true,repeat:1,duration:.09}),3200);
setInterval(()=>gsap.to('.ear',{rotation:(i)=>i?12:-12,yoyo:true,repeat:3,duration:.12}),5000);
setInterval(()=>gsap.to('.armR',{rotation:-125,yoyo:true,repeat:5,duration:.25}),8000);
const bounce=()=>gsap.fromTo('#leo',{yPercent:0},{yPercent:-14,yoyo:true,repeat:1,duration:.22,ease:'power2.out'});
const shake=()=>{sfx.boop();miss++;gsap.fromTo('#leoIn',{xPercent:-8},{xPercent:0,duration:.6,ease:'elastic.out(1,.2)'})};
const cheer=()=>{sfx.ding();bounce();gsap.to('.armL',{rotation:150,yoyo:true,repeat:3,duration:.2});gsap.to('.armR',{rotation:-150,yoyo:true,repeat:3,duration:.2})};
const setMood=t=>{const m=$('#mood');m.textContent=t;if(t)gsap.fromTo(m,{scale:0},{scale:1,duration:.6,ease:'elastic.out(1,.5)'})};
const calm=()=>{if(sh){sh.kill();sh=null}gsap.set('#leoIn',{x:0})};
const wornSet=new Set();
function wear(k){const I=ITEMS[k],s=$('.slot.'+I.s);wornSet.add(k);s.innerHTML=`<span style="display:inline-block;filter:${I.f||'none'}">${ico(k)}</span>`;
 gsap.fromTo(s.firstChild,{scale:0,rotation:-70},{scale:1,rotation:0,duration:.8,ease:'elastic.out(1,.5)'})}
const reset=()=>{wornSet.clear();document.querySelectorAll('.slot').forEach(s=>s.innerHTML='')};

/* ---------- Teddy comes alive: eyes follow the pointer, tickles, waving ---------- */
const eyes=[...document.querySelectorAll('.eye')],face=[...document.querySelectorAll('.muz,.nose,.mouth,.cheek')],qs=(a,k)=>a.map(e=>gsap.quickTo(e,k,{duration:.3,ease:'power2.out'}));
const eX=qs(eyes,'x'),eY=qs(eyes,'y'),fX=qs(face,'x'),fY=qs(face,'y');let lastMove=Date.now();
function look(px,py){const r=$('#leo').getBoundingClientRect(),dx=px-(r.x+r.width/2),dy=py-(r.y+r.height*.3),d=Math.hypot(dx,dy)||1,k=Math.min(1,d/200),ux=dx/d*k,uy=dy/d*k;
 eX.forEach(f=>f(ux*7));eY.forEach(f=>f(uy*6));fX.forEach(f=>f(ux*3));fY.forEach(f=>f(uy*2.5))}
addEventListener('pointermove',e=>{lastMove=Date.now();look(e.clientX,e.clientY)});
setInterval(()=>{if(Date.now()-lastMove>3000)look(innerWidth*Math.random(),innerHeight*Math.random()*.7)},1800);
setInterval(()=>gsap.to('.foot',{rotation:i=>i?-9:9,yoyo:true,repeat:3,duration:.15}),6500);
gsap.to('.cheek',{opacity:1,yoyo:true,repeat:-1,duration:1.4,ease:'sine.inOut'});
function wave(){gsap.to('.armR',{rotation:-125,yoyo:true,repeat:5,duration:.25});gsap.to('.ear',{rotation:i=>i?10:-10,yoyo:true,repeat:3,duration:.12})}
$('#leo').addEventListener('pointerdown',()=>{const prev=$('#mood').textContent;sfx.giggle();setMood('🥰');gsap.fromTo('#leoIn',{rotation:-6},{rotation:0,duration:.8,ease:'elastic.out(1,.2)'});bounce();setTimeout(()=>setMood(prev),1400)});

/* ---------- scene helpers ---------- */
function cleanTray(){DR.forEach(d=>d.kill());DR=[];$('#tray').innerHTML=''}
function wipe(){E++;if('speechSynthesis' in window)speechSynthesis.cancel();talk(false);busy=false;cleanTray();['#sky','#win','#bub','#mic','#lyr','#show','#slots'].forEach(s=>{const e=$(s);e&&e.remove()});
 hideAdv();$('#hb').style.display='none';task('');calm();gsap.killTweensOf('#leo');gsap.set('#leo',{scale:S,y:0,x:0,rotationY:0,yPercent:0,autoAlpha:1});wx=0;$('#hb').textContent='💡 Hint';gsap.set('#leoIn',{rotation:0,xPercent:0})}
function theme(L){
 $('#bg').style.background=`linear-gradient(${L.bg[0]},${L.bg[1]} 66%,${L.bg[2]} 66%)`;gsap.fromTo('#bg',{opacity:.2},{opacity:1,duration:1});
 scenery(L);
 const w=$('#wicon');w.textContent=L.ic||'';gsap.killTweensOf(w);gsap.set(w,{rotation:0,y:0});gsap.fromTo(w,{scale:0},{scale:1,duration:.9,ease:'elastic.out(1,.5)'});
 gsap.to(w,L.w==='sunny'?{rotation:360,duration:14,repeat:-1,ease:'none'}:{y:12,yoyo:true,repeat:-1,duration:1.4,ease:'sine.inOut'});
 setFx(L.w);ambience(L.w);wave();reset();cleanTray();setMood(L.mood||'');calm();
 if(L.w==='snowy')sh=gsap.to('#leoIn',{x:3,yoyo:true,repeat:-1,duration:.06})}
function overlay(h){const o=document.createElement('div');o.className='ov';o.innerHTML=`<div class="card">${h}</div>`;document.body.append(o);gsap.from(o.firstChild,{scale:.5,opacity:0,duration:.6,ease:'back.out(1.6)'});return o}
const close=o=>gsap.to(o,{opacity:0,duration:.4,onComplete:()=>o.remove()});
const back=e=>gsap.to(e,{x:0,y:0,duration:.6,ease:'elastic.out(1,.6)',overwrite:true});
function mkDrag(e,fn){DR.push(Draggable.create(e,{type:'x,y',inertia:!!window.InertiaPlugin,zIndexBoost:true,
 onPress(){gsap.to(e,{scale:1.25,duration:.15})},onRelease(){gsap.to(e,{scale:1,duration:.15})},onDragEnd(){fn(e,this)},onClick(){tapSay(e)}})[0])}
const pulse=e=>e&&gsap.fromTo(e,{scale:1},{scale:1.3,yoyo:true,repeat:5,duration:.25});
const listOf=a=>a.length>1?a.slice(0,-1).join(', ')+' and '+a.at(-1):a[0];

/* ---------- stage 1: weather ---------- */
function weatherStage(L){return new Promise(async res=>{
 task('☁️ Drag the right weather to the sky');
 const sk=el('<div id="sky">☁️ SKY ☁️</div>');gsap.from(sk,{y:-60,opacity:0,duration:.7,ease:'bounce.out'});
 shuffle([L.w,...shuffle(Object.keys(WI).filter(x=>x!==L.w)).slice(0,2)]).forEach(w=>{const e=el(`<div class="it" data-w="${w}"><i>${WI[w]}</i><small>${w}</small></div>`);$('#tray').append(e);
  mkDrag(e,async()=>{
   if(busy)return;if(!Draggable.hitTest(e,'#sky','30%'))return back(e);busy=true;
   if(w===L.w){gsap.to(e,{scale:0,opacity:0,duration:.4});boom(.5,.3);cheer();star(1);await say(pick(['Yes! Well done!','Yes! Great job!','Yes! Super!']));await sleep(500);cleanTray();sk.remove();busy=false;res()}
   else{back(e);shake();await say(`Hmm, is it ${w}? Look again!`);busy=false}})});
 pulseFn=()=>pulse($(`.it[data-w="${L.w}"]`));
 await say("What's the weather like today?")})}

/* ---------- rainy: umbrella boxes ---------- */
function boxStage(L){return new Promise(async res=>{
 cleanTray();task('🎁 Open the boxes and find the umbrella');const k=L.boxes;
 shuffle([k,'sunhat','shorts']).forEach(it=>{const e=el(`<div class="it" data-k="${it}" style="cursor:pointer"><i>🎁</i></div>`);$('#tray').append(e);
  e.onclick=async()=>{if(busy)return;busy=true;e.firstChild.innerHTML=ico(it);gsap.fromTo(e,{rotation:-15},{rotation:0,duration:.6,ease:'elastic.out(1,.3)'});
   if(it===k){wear(k);boom(.5,.6);star(1);cheer();await say("I have an umbrella! I'm dry!");await sleep(600);cleanTray();busy=false;res()}
   else{await say(`That's ${ITEMS[it].a}. Try again!`);e.firstChild.textContent='🎁';busy=false}}});
 pulseFn=()=>pulse($(`.it[data-k="${k}"]`));
 await say("Where is the umbrella?")})}

/* ---------- stage 2: dress up (the child advises the bear) ---------- */
function dressStage(L){return new Promise(async res=>{
 cleanTray();task('👕 Help Teddy: drag the right clothes onto him. Not sure? Tap 💡');
 const left=L.need.filter(k=>!wornSet.has(k));
 $('#hb').style.display='inline-block';
 $('#hb').onclick=()=>{const a=$('#adv');if(a.style.display==='block')return hideAdv();if(!left.length)return;$('#at').textContent='🧒 '+L.pf(ITEMS[left[0]].n);a.style.display='block';gsap.fromTo(a,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2)'});pulseFn()};
 pulseFn=()=>pulse($(`.it[data-k="${left[0]}"]`));
 shuffle([...L.need,...L.bad]).filter(k=>!wornSet.has(k)).forEach(k=>{
  const e=el(`<div class="it" data-k="${k}"><i style="filter:${ITEMS[k].f||'none'}">${ico(k)}</i><small>${ITEMS[k].n}</small></div>`);$('#tray').append(e);
  mkDrag(e,async()=>{
   if(busy)return;if(!Draggable.hitTest(e,'#leo','35%'))return back(e);busy=true;
   if(left.includes(k)){left.splice(left.indexOf(k),1);gsap.to(e,{scale:0,opacity:0,duration:.3});wear(k);cheer();star(1);boom(.5,.55,60);
    await advise(L.pf(ITEMS[k].n));await say(`Thank you! I'm wearing my ${ITEMS[k].n}!`);await sleep(500);hideAdv();busy=false;
    if(!left.length){$('#hb').style.display='none';calm();setMood('😊');gsap.fromTo('#leoIn',{scaleX:1},{scaleX:-1,yoyo:true,repeat:3,duration:.28,ease:'power1.inOut'});boom(.5,.5,150);
     await say(`Look! I'm wearing my ${listOf([...wornSet].map(x=>ITEMS[x].n))}.`);await sleep(900);setMood('');cleanTray();res()}
   }else{back(e);shake();await say(L.no(ITEMS[k].a));busy=false}})});
 await say(L.ask)})}

/* ---------- stage 3: bubbles ---------- */
function bubbleStage(L){return new Promise(async res=>{
 cleanTray();task('🫧 Pop the bubble with the item Teddy names');
 const pool=shuffle([...L.need,...L.bad]).slice(0,6),targets=shuffle(L.need).slice(0,3);
 gsap.to('#leo',{scale:S*.5,y:'24vh',duration:.7,ease:'power2.inOut'});
 const box=el('<div id="bub"></div>');
 pool.forEach((k,i)=>{const b=el(`<div class="bub" data-k="${k}"><i style="filter:${ITEMS[k].f||'none'};font-style:normal">${ico(k)}</i></div>`);box.append(b);
  b.style.left=(6+(i%3)*31+Math.random()*6)+'%';b.style.top=(4+Math.floor(i/3)*44+Math.random()*8)+'%';
  gsap.from(b,{scale:0,duration:.6,delay:i*.1,ease:'back.out(2)'});gsap.to(b,{y:'+=18',x:'+=10',yoyo:true,repeat:-1,duration:1.6+Math.random(),ease:'sine.inOut'})});
 for(const t of targets){
  pulseFn=()=>pulse($(`.bub[data-k="${t}"]`));
  const p=new Promise(r=>box.querySelectorAll('.bub').forEach(b=>b.onclick=()=>{
   if(b.dataset.k===t){const rc=b.getBoundingClientRect();boom((rc.x+rc.width/2)/innerWidth,(rc.y+rc.height/2)/innerHeight,50);gsap.to(b,{scale:1.6,opacity:0,duration:.3,onComplete:()=>b.remove()});sfx.pop();star(1);r()}
   else{gsap.fromTo(b,{rotation:-20},{rotation:0,duration:.6,ease:'elastic.out(1,.2)'});sfx.boop();speak('Try again!')}}));
  say(`Find the ${ITEMS[t].n}!`);await p;await sleep(700)}
 box.remove();gsap.to('#leo',{scale:S,y:0,duration:.6});await say('Super! You found them all!');await sleep(500);res()})}

/* ---------- stage 4: repeat after the bear ---------- */
function speakStage(L){return new Promise(async res=>{
 task('🎤 Tap the mic and say it after Teddy');
 const m=el('<button id="mic">🎤</button>');gsap.from(m,{scale:0,duration:.6,ease:'back.out(2)'});const pu=gsap.to(m,{scale:1.15,repeat:-1,yoyo:true,duration:.6});
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let tries=0;
 const win=async()=>{pu.kill();m.textContent='🎁';gsap.fromTo(m,{rotation:-20},{rotation:0,duration:.7,ease:'elastic.out(1,.2)'});await sleep(600);
  m.textContent='✨⭐✨';m.style.cssText+=';font-size:34px;background:#ffd166';gsap.to(m,{scale:1.8,duration:.8,ease:'elastic.out(1,.4)'});star(3);boom(.5,.8,160);cheer();
  await say('Wow! Perfect!');await sleep(500);m.remove();res()};
 pulseFn=()=>speak(L.say);
 m.onclick=()=>{if(!SR)return win();const r=new SR();r.lang='en-US';r.maxAlternatives=3;m.textContent='👂';
  r.onresult=e=>{const t=[...e.results[0]].map(a=>a.transcript.toLowerCase()).join(' ');if(t.includes(L.key)||++tries>=2)win();else{m.textContent='🎤';say(`Almost! ${L.say}`)}};
  r.onerror=()=>{m.textContent='🎤';if(++tries>=2)win();else say(L.say)};
  try{r.start()}catch(e){win()}};
 await say(L.say)})}

/* ---------- chant: slow, with Again / Next ---------- */
function chantStage(L){return new Promise(async res=>{
 task('🎵 Sing with Teddy. Tap a word to hear it. Ready? Tap Next ▶');
 const c=el(`<div id="lyr">🎵 ${L.chant.split(' ').map(w=>`<span>${w}</span>`).join(' ')} 🎵<div><button class="go sm" id="again">🔁 Again</button><button class="go sm" id="nx">Next ▶</button></div></div>`);
 const n=c.querySelectorAll('span');n.forEach(s=>s.onclick=()=>speak(s.textContent.replace(/[,!.]/g,''),'bear',.6));
 const play=async()=>{const d=gsap.to('#leoIn',{rotation:7,yoyo:true,repeat:-1,duration:.5,ease:'sine.inOut'});
  gsap.set(n,{color:'#555',scale:1});boom(.2,.7,30);boom(.8,.7,30);
  await sing(L,n);d.kill();gsap.to('#leoIn',{rotation:0,duration:.3})};
 $('#again').onclick=play;$('#nx').onclick=()=>{c.remove();res()};
 await play()})}

/* ---------- flow ---------- */
async function startLevel(i){
 wipe();cur=i;lvRun=0;miss=0;const L=LV[i];theme(L);$('#lv').textContent=`${PLAN[i].ic} ${PLAN[i].name}`;
 const o=overlay(`<div class="big">${L.ic}</div><h1>${L.name}</h1>`);speak(`Welcome to ${L.name}!`);await sleep(2600);close(o);
 await say(L.intro);await sleep(500);await weatherStage(L);if(L.boxes)await boxStage(L);
 await dressStage(L);await bubbleStage(L);await speakStage(L);await chantStage(L);
 return finishCard(i);
 const last=i===LV.length-1,o2=overlay(`<div class="big">🎉</div><h1>Level complete!</h1><p style="text-align:center">⭐ ${lvRun}</p><button class="go sm" id="nx2">${last?'🏆 Finish':'Next level ▶'}</button><button class="go sm" id="mn">🗺️ Levels</button><button class="go sm" id="rp">🔁 Again</button>`);
 speak('Great job!');
 o2.querySelector('#nx2').onclick=()=>{o2.remove();last?finale():startLevel(i+1)};
 o2.querySelector('#mn').onclick=()=>{o2.remove();openMenu()};o2.querySelector('#rp').onclick=()=>{o2.remove();startLevel(i)}}
function openMenu(){
 const o=overlay(`<h1>Choose a level</h1><div class="grid">${PLAN.map((L,i)=>`<button class="lc" data-i="${i}"><span style="font-size:44px">${L.ic}</span>${L.name}<small>⭐ ${lvStars[i]}</small></button>`).join('')}</div><button class="go sm" id="cl">✖ Close</button>`);
 o.querySelectorAll('.lc').forEach(b=>b.onclick=()=>{document.querySelectorAll('.ov').forEach(x=>x.remove());unlock();go(+b.dataset.i)});
 o.querySelector('#cl').onclick=()=>close(o)}
function openHow(){
 const o=overlay(`<h1>❓ How to play</h1><p>1. Listen to Teddy 🐻 and find out the weather.<br>2. Drag the right weather to the sky ☁️<br>3. Help the bear: drag the right clothes onto him. Not sure what to say? Tap 💡 for a hint.<br>4. Pop the bubbles 🫧, repeat the phrases 🎤 and sing the chant 🎵. Tap Next ▶ when you are ready.<br>5. Collect ⭐! Choose any island with 🗺️. Tap Teddy to tickle him! Use ◀ ▶ to make him walk, and tap things in the scene to hear their names.<br>Levels: 1 Islands, 2 Quick Review, 3 Mystery Bag, 4 Chat with Teddy, 5 Sentence Builder.</p><button class="go sm" id="cl">OK 👍</button>`);
 o.querySelector('#cl').onclick=()=>close(o)}
async function intro(){
 wipe();theme({bg:['#ffd9a8','#ffe9cf','#d9a066'],deco:['📅','🪴','🧸'],w:'none',sc:'room'});$('#lv').textContent='🏠 Teddy room';task('👆 Tap the window');
 const w=el('<div id="win"><div class="sh"></div><div class="sh r"></div><b>tap! 👆</b></div>');
 cheer();await say("Hello! I'm Teddy! Let's go on an adventure! First, look out the window...");
 const pw=gsap.to(w,{scale:1.08,yoyo:true,repeat:-1,duration:.5});
 await new Promise(r=>w.onclick=r);pw.kill();gsap.to(w,{scale:1});task('');
 gsap.to('#win .sh',{xPercent:i=>i?100:-100,duration:1.1,ease:'power2.inOut'});w.querySelector('b').textContent='☀️';
 await say("What's the weather like today?");await say("It's sunny! Let's go!");w.remove()}
async function finale(){
 wipe();theme({bg:['#b388ff','#ffd6f5','#ffe36e'],deco:['🏝️','⛰️','🏔️'],w:'sunny',ic:'🌈',mood:'😊',sc:'finale'});bigBoom();cheer();
 const o=overlay(`<div class="big">🏆</div><h1>Weather Wizard!</h1><p style="text-align:center">⭐ ${stars}</p><p>Ask your mom or a friend: <b>“What's the weather like today?”</b> Then answer: <b>“I'm wearing…”</b></p><button class="go sm" id="rp">🔁 Play again</button><button class="go sm" id="mn">🗺️ Levels</button>`);
 speak("You did it! You are a Weather Wizard! What's the weather like today?");
 o.querySelector('#rp').onclick=()=>{o.remove();startLevel(0)};o.querySelector('#mn').onclick=()=>{o.remove();openMenu()}}

/* ===== levels 2-5, singing, scoring ===== */
let combo=0,miss=0;
const PLAN=[{m:'islands',i:0,ic:'☀️',name:'1·1 Sunny Island'},{m:'islands',i:1,ic:'⛈️',name:'1·2 Rainy Mountain'},{m:'islands',i:2,ic:'☃️',name:'1·3 Snowy Valley'},{m:'islands',i:3,ic:'🪁',name:'1·4 Windy Hills'},{m:'review',ic:'🎯',name:'2 Quick Review'},{m:'mystery',ic:'🎒',name:'3 Mystery Bag'},{m:'dialogue',ic:'💬',name:'4 Chat with Teddy'},{m:'builder',ic:'🧩',name:'5 Sentence Builder'}];
const TH={review:{sc:'review',bg:['#c9b6ff','#ffe3f7','#ffd6a5'],deco:['🎪','🎈','🎠'],w:'none',ic:'🎯'},mystery:{sc:'mystery',bg:['#ffd6a5','#fff0d6','#c8a27a'],deco:['🌳','🏕️','🌲'],w:'none',ic:'🎒',mood:'🤔'},dialogue:{sc:'dialogue',bg:['#a0e7e5','#e6fffb','#b4f8c8'],deco:['☕','🪴','🎈'],w:'none',ic:'💬'},builder:{sc:'builder',bg:['#ffe29a','#fff7d6','#ffd1dc'],deco:['🧩','📚','✏️'],w:'none',ic:'🧩'}};
const KEY={sunny:'sunny',rainy:'rain',snowy:'snow',windy:'wind'};
const TOK={tshirt:'shirt',shorts:'short',sunglasses:'glass',sunhat:'cap',woolhat:'hat',coat:'coat',jacket:'jacket',raincoat:'rain',boots:'boot',umbrella:'umbrella',scarf:'scarf'};
const CLUES={scarf:`It's warm. It's for my neck.`,umbrella:`It's for the rain. I hold it in my hand.`,sunglasses:`They're for the sun. They're for my eyes.`,boots:`They're warm. They're for my feet.`,coat:`It's warm. It's for the snow.`,woolhat:`It's warm. It's for my head.`,tshirt:`It's for hot days. It's for my body.`,shorts:`They're for hot days. They're for my legs.`,sunhat:`It's for the sun. It's for my head.`};
const pic=k=>`<span style='filter:${ITEMS[k].f||'none'}'>${ico(k)}</span>`;
const isl=sel=>{const e=$(sel);e&&e.remove()};
function go(p){const s=PLAN[p];if(s.m==='islands')startLevel(s.i);else MODES[s.m](p)}
function finishCard(p){const s=miss<=1?3:miss<=4?2:1;lvStars[p]=Math.max(lvStars[p],s);boom(.5,.5,200);task('');hideAdv();$('#hb').style.display='none';
 const last=p===PLAN.length-1,o=overlay(`<div class='big'>🎉</div><h1>Level complete!</h1><p id='rate' style='text-align:center;font-size:42px'>${'⭐'.repeat(s)}</p><p style='text-align:center'>+${lvRun} stars</p><button class='go sm' id='nx2'>${last?'🏆 Finish':'Next ▶'}</button><button class='go sm' id='mn'>🗺️ Levels</button><button class='go sm' id='rp'>🔁 Again</button>`);
 gsap.from('#rate',{scale:0,rotation:-180,duration:.9,delay:.3,ease:'elastic.out(1,.5)'});speak('Great job!');
 o.querySelector('#nx2').onclick=()=>{o.remove();last?finale():go(p+1)};o.querySelector('#mn').onclick=()=>{o.remove();openMenu()};o.querySelector('#rp').onclick=()=>{o.remove();go(p)}}
async function begin(p,th,title,voice){wipe();miss=0;lvRun=0;combo=0;theme(th);$('#lv').textContent=PLAN[p].ic+' '+PLAN[p].name;gsap.to('#leo',{scale:S*.78,y:'9vh',duration:.6});
 const o=overlay(`<div class='big'>${th.ic}</div><h1>${title}</h1>`);speak(voice);await sleep(2400);close(o)}
const showCard=h=>{isl('#show');const s=el(`<div id='show'>${h}</div>`);gsap.from(s,{scale:0,rotation:-10,duration:.6,ease:'back.out(2)'});return s};
function setWeather(w){const L=LV.find(x=>x.w===w);$('#bg').style.background=`linear-gradient(${L.bg[0]},${L.bg[1]} 66%,${L.bg[2]} 66%)`;setFx(w);ambience(w);$('#wicon').textContent=L.ic}
function setHint(f,label='💡 Hint'){const b=$('#hb');b.textContent=label;b.style.display='inline-block';b.onclick=()=>{const a=$('#adv');if(a.style.display==='block')return hideAdv();$('#at').textContent='🧒 '+f();a.style.display='block';gsap.fromTo(a,{scale:.6,opacity:0},{scale:1,opacity:1,duration:.4,ease:'back.out(2)'});pulseFn()}}
function choose({card,q,opts,ok,win}){return new Promise(async res=>{
 cleanTray();let tries=0;const s=card?showCard(card):null;
 opts.forEach((o,i)=>{const e=el(`<button class='opt'>${o.h}</button>`);$('#tray').append(e);gsap.from(e,{y:60,opacity:0,duration:.5,delay:i*.1,ease:'back.out(2)'});
  e.onclick=async()=>{if(busy)return;busy=true;if(o.say)await speak(o.say,'kid',.9);
   if(i===ok){e.style.background='#9be7a0';combo++;star(1);if(combo===3||combo===6){star(2);setMood('🔥');setTimeout(()=>setMood(''),1500)}boom(.5,.6,60);cheer();await say(win);await sleep(500);if(s)s.remove();cleanTray();busy=false;res()}
   else{e.style.background='#ffb3b3';combo=0;miss++;sfx.boop();gsap.fromTo(e,{rotation:-8},{rotation:0,duration:.5,ease:'elastic.out(1,.2)'});if(++tries>1)pulse(document.querySelectorAll('.opt')[ok]);busy=false;await say('Try again!')}}});
 pulseFn=()=>pulse(document.querySelectorAll('.opt')[ok]);await say(q)})}
function micAsk(ok,model,win){return new Promise(res=>{
 const m=el(`<button id='mic'>🎤</button>`);gsap.from(m,{scale:0,duration:.5,ease:'back.out(2)'});const pu=gsap.to(m,{scale:1.15,repeat:-1,yoyo:true,duration:.6});
 const SR=window.SpeechRecognition||window.webkitSpeechRecognition;let tries=0,fin=0;
 const done=async()=>{if(fin++)return;pu.kill();m.textContent='✨';gsap.to(m,{scale:1.6,opacity:0,duration:.7});star(2);boom(.5,.7,100);cheer();await say(win);m.remove();res()};
 m.onclick=()=>{if(!SR)return done();const r=new SR();r.lang='en-US';r.maxAlternatives=3;m.textContent='👂';
  r.onresult=e=>{const t=[...e.results[0]].map(a=>a.transcript.toLowerCase()).join(' ');if(ok(t)||++tries>=2)done();else{m.textContent='🎤';say(`Almost! ${model}`)}};
  r.onerror=()=>{m.textContent='🎤';if(++tries>=2)done();else say(model)};
  try{r.start()}catch(e){done()}}})}
/* rhythmic chant: count-in, drum beat, one clear word per beat with a little melody */
async function sing(L,n){const ws=L.chant.replace(/[,!.]/g,'').split(' '),B=900,pat=[0,0,.14,.07,.07,.3,.1,.1];
 const kick=t=>tone(90,.22,'sine',.35,t),snare=t=>{tone(190,.08,'square',.05,t);tone(2500,.04,'square',.02,t)};
 const T=performance.now();for(let b=0;b<ws.length+5;b++){const t=b*B/1000;b%2?snare(t):kick(t);tone(7000,.03,'square',.015,t+B/2000)}
 for(let c=0;c<4;c++){setMood(['1️⃣','2️⃣','3️⃣','4️⃣'][c]);await sleep(Math.max(0,T+(c+1)*B-performance.now()))}
 setMood('🎵');gsap.set(n,{color:'#555',scale:1});
 for(let k=0;k<ws.length;k++){const w=T+(4+k)*B-performance.now();if(w>0)await sleep(w);gsap.to(n[k],{color:'#ff3d81',scale:1.3,duration:.15});bounce();await speak(ws[k],'bear',.8,.72+pat[k%pat.length])}
 await sleep(500);setMood('')}
const MODES={
review:async p=>{await begin(p,TH.review,'Quick Review',`Let's play! Look and choose!`);
 const wk=shuffle(Object.keys(WI)),ik=shuffle(Object.keys(ITEMS)),R=[['w',wk[0]],['i',ik[0]],['l',ik[1]],['w',wk[1]],['i',ik[2]],['l',ik[3]],['w',wk[2]],['m',wk[3]]];
 const three=k=>shuffle([k,...shuffle(Object.keys(ITEMS).filter(x=>x!==k)).slice(0,2)]);
 for(const [t,k] of R){
  if(t==='w'){setWeather(k);task('👀 Look at the weather. Pick the right sentence');const o=shuffle([k,...shuffle(Object.keys(WI).filter(x=>x!==k)).slice(0,2)]);
   await choose({card:WI[k],q:`What's the weather like today?`,opts:o.map(w=>({h:`It's ${w}`,say:`It's ${w}.`})),ok:o.indexOf(k),win:`Yes! It's ${k}!`})}
  else if(t==='i'){task('🔎 What is it? Pick the right word');const o=three(k);
   await choose({card:pic(k),q:`What's this?`,opts:o.map(x=>({h:ITEMS[x].n,say:ITEMS[x].n})),ok:o.indexOf(k),win:`Yes! ${cap(ITEMS[k].a)}!`})}
  else if(t==='l'){task('👂 Listen and tap the picture');const o=three(k);isl('#show');
   await choose({q:`Find the ${ITEMS[k].n}!`,opts:o.map(x=>({h:`<i>${pic(x)}</i>`})),ok:o.indexOf(k),win:`Yes! ${cap(ITEMS[k].a)}!`})}
  else{setWeather(k);showCard(WI[k]);await speakStage(LV.find(x=>x.w===k));isl('#show')}}
 finishCard(p)},
mystery:async p=>{await begin(p,TH.mystery,'Mystery Bag',`What's in the bag? Listen!`);
 const pool=Object.keys(CLUES),R=shuffle(pool).slice(0,5);
 for(const k of R){reset();task('🎒 Listen to the clue. Drag the right item into the bag');
  const bag=showCard('🎒'),sw=gsap.to(bag,{rotation:5,yoyo:true,repeat:-1,duration:.18});cleanTray();
  const opts=shuffle([k,...shuffle(pool.filter(x=>x!==k)).slice(0,2)]);let tries=0;const q=`.it[data-k='${k}']`;
  await new Promise(async res=>{
   opts.forEach(x=>{const e=el(`<div class='it' data-k='${x}'><i style='filter:${ITEMS[x].f||'none'}'>${ico(x)}</i></div>`);$('#tray').append(e);
    mkDrag(e,async()=>{if(busy)return;if(!Draggable.hitTest(e,'#show','30%'))return back(e);busy=true;
     if(x===k){sw.kill();gsap.set(bag,{rotation:0});gsap.to(e,{scale:0,opacity:0,duration:.3});bag.innerHTML=pic(k);gsap.fromTo(bag,{scale:.5},{scale:1,duration:.7,ease:'elastic.out(1,.4)'});wear(k);boom(.5,.4,100);cheer();star(2);
      await say(ITEMS[k].a===ITEMS[k].n?`They're ${ITEMS[k].n}!`:`It's ${ITEMS[k].a}!`);await sleep(700);hideAdv();cleanTray();busy=false;res()}
     else{back(e);shake();if(++tries>1)pulse(document.querySelector(q));busy=false;await say(`Hmm, not ${ITEMS[x].a}! ${CLUES[k]}`,'🎧 Not that one. Listen again…')}})});
   setHint(()=>CLUES[k],'👁');pulseFn=()=>pulse(document.querySelector(q));await say(CLUES[k],'🎧 Listen to Teddy…')})}
 finishCard(p)},
dialogue:async p=>{await begin(p,TH.dialogue,'Chat with Teddy',`Hi! Let's chat!`);
 for(let r=0;r<3;r++){const w=pick(Object.keys(WI)),L=LV.find(x=>x.w===w);setWeather(w);reset();showCard(WI[w]);task('🎤 Tap the mic and answer Teddy');
  await say(`What's the weather like today?`);setHint(()=>`It's ${w}.`);
  await micAsk(t=>t.includes(KEY[w]),`It's ${w}.`,`That's right! It's ${w}!`);
  const ks=shuffle(L.need).slice(0,2),sent=listOf(ks.map(k=>ITEMS[k].a));
  showCard(`🧒<br><span style='font-size:.7em'>${ks.map(k=>pic(k)).join(' ')}</span>`);
  await say('What are you wearing?');setHint(()=>`I'm wearing ${sent}.`);
  await micAsk(t=>ks.some(k=>t.includes(TOK[k])),`I'm wearing ${sent}.`,`Great! You're wearing ${sent}.`);await sleep(400)}
 finishCard(p)},
builder:async p=>{await begin(p,TH.builder,'Sentence Builder',`Let's build sentences!`);
 const R=shuffle([{w:[`I'm`,'wearing','a','T-shirt'],k:'tshirt',x:['coat']},{w:[`I'm`,'wearing','a','coat'],k:'coat',x:['hat']},{w:[`I'm`,'wearing','boots'],k:'boots',x:['a']},{w:[`I'm`,'wearing','a','scarf'],k:'scarf',x:['boots']},{w:[`I'm`,'wearing','sunglasses'],k:'sunglasses',x:['the']},{w:['Put','on','your','hat'],k:'woolhat',x:['coat']},{w:[`It's`,'sunny'],fx:'sunny',x:['rainy']},{w:[`It's`,'rainy'],fx:'rainy',x:['sunny']},{w:[`It's`,'snowy'],fx:'snowy',x:['windy']},{w:[`Don't`,'forget','your','scarf'],k:'scarf',x:['hat']}]).slice(0,5);
 for(const r of R){reset();cleanTray();if(r.k)wear(r.k);if(r.fx)setWeather(r.fx);showCard(r.k?pic(r.k):WI[r.fx]);task('🧩 Drag the words to build the sentence');
  const row=el(`<div id='slots'></div>`);row.innerHTML=r.w.map(w2=>`<div class='sl2' style='min-width:${Math.max(56,w2.length*13+26)}px'></div>`).join('');const sl=[...row.children],sent=r.w.join(' ')+'.';let n=0;
  setHint(()=>sent);pulseFn=()=>pulse([...document.querySelectorAll('.tile')].find(t=>t.textContent===r.w[n]));
  await new Promise(res=>{shuffle([...r.w,...r.x]).forEach(wd=>{const e=el(`<div class='tile'>${wd}</div>`);$('#tray').append(e);
   mkDrag(e,async(_,d)=>{if(busy)return back(e);const j=slotAt(sl,e,d,wd,r.w);if(j<0)return back(e);busy=true;
    if(r.w[j]===wd&&!sl[j].dataset.f){sl[j].textContent=wd;sl[j].dataset.f=1;sl[j].classList.add('on');gsap.to(e,{scale:0,opacity:0,duration:.25});gsap.fromTo(sl[j],{scale:1.3},{scale:1,duration:.4,ease:'back.out(3)'});sfx.pop();speak(wd,'kid',.9);n++;
     if(n===r.w.length){boom(.5,.4,80);cheer();star(2);await say(sent);res()}else busy=false}
    else{back(e);shake();busy=false;await say(`Not there! ${sent}`)}})})});
  task('🎤 Now you say it!');pulseFn=()=>speak(sent);
  await micAsk(t=>t.includes(r.w[r.w.length-1].toLowerCase().replace(/[^a-z]/g,'').slice(0,4)),sent,'Great job!');
  isl('#slots');cleanTray();hideAdv();busy=false}
 finishCard(p)}};
/* ===== Teddy walks, tappable scenery, flying critters, safer drag-and-drop ===== */
const norm=s=>s.replace(/\uFE0F/g,'');
const SAY=Object.fromEntries(Object.entries({'🌴':'a palm tree','🏝️':'an island','🐚':'a shell','🦀':'a crab','🌺':'a flower','⛱️':'a beach umbrella','⛰️':'a mountain','🌲':'a pine tree','🍄':'a mushroom','🐸':'a frog','🌿':'a leaf','🏔️':'a snowy mountain','⛄':'a snowman','🐧':'a penguin','🦌':'a deer','🎿':'skis','🌾':'grass','🌳':'a tree','🪁':'a kite','🌻':'a sunflower','🦋':'a butterfly','🐑':'a sheep','🌼':'a daisy','📅':'a calendar','🪴':'a plant','🧸':'a teddy bear','⚽':'a ball','☕':'a cup of coffee','📚':'books','🎈':'a balloon','🎪':'a circus tent','🎠':'a carousel','🎁':'a present','🎡':'a Ferris wheel','🏕️':'a tent','🦊':'a fox','🦉':'an owl','🌰':'a nut','🥐':'a croissant','🧁':'a cupcake','🛋️':'a sofa','🖼️':'a picture','🧩':'a puzzle','✏️':'a pencil','🎨':'paints','🔤':'letters','🧮':'an abacus','🖍️':'a crayon','🐦':'a bird','☁️':'a cloud','☀️':'the sun','⛈️':'a storm cloud','☃️':'a snowman','🌈':'a rainbow'}).map(([k,v])=>[norm(k),v]));
const SCN={sunny:['🌴','🏝️','🐚','🦀','🌺','⛱️','🌴'],rainy:['⛰️','🌲','🍄','🐸','🌿','🌲','🍄'],snowy:['🏔️','⛄','🌲','🐧','🦌','🎿','🌲'],windy:['🌾','🌳','🪁','🌻','🦋','🐑','🌼'],
room:['📅','🪴','🧸','⚽','☕','📚','🎈'],review:['🎪','🎈','🎠','🎁','🎡','🎈','🎪'],mystery:['🌳','🏕️','🌲','🦊','🦉','🍄','🌰'],dialogue:['☕','🪴','🥐','🧁','🛋️','🎈','🖼️'],builder:['🧩','📚','✏️','🎨','🔤','🧮','🖍️'],finale:['🌈','🎈','🎁','🌴','🎪','🎠','🎡']};
const FLY={sunny:['🐦','☁️','🦋'],rainy:['☁️','☁️'],snowy:['☁️','🐦'],windy:['🦋','🐦','☁️','🪁'],room:['🦋'],review:['🎈','🎈'],mystery:['🦋','🐦'],dialogue:['🦋'],builder:['🎈'],finale:['🎈','🦋','🐦']};
let wx=0;
function objSay(e,s){const t=SAY[norm(e)];if(!t)return;sfx.pop();gsap.fromTo(s,{scale:1.35},{scale:1,duration:.5,ease:'elastic.out(1,.4)'});speak(t,'bear',.8);
 const r=s.getBoundingClientRect(),l=el(`<div class='lab'>${t}</div>`);l.style.left=Math.min(innerWidth-60,Math.max(60,r.x+r.width/2))+'px';l.style.top=(r.y-6)+'px';
 gsap.fromTo(l,{xPercent:-50,y:0,opacity:0,scale:.6},{xPercent:-50,y:-26,opacity:1,scale:1,duration:.4,ease:'back.out(2)'});gsap.to(l,{opacity:0,delay:1.5,duration:.4,onComplete:()=>l.remove()})}
function tapSay(e){const k=e.dataset.k,w=e.dataset.w;if(e.classList.contains('tile'))speak(e.textContent,'bear',.85);else if(k&&ITEMS[k])speak(ITEMS[k].a,'bear',.85);else if(w)speak(`It's ${w}`,'bear',.85)}
function scenery(L){const key=L.sc||L.w,list=SCN[key]||L.deco,box=$('#deco');box.innerHTML='';
 const xs=shuffle([1,11,21,31,60,70,80,89]);
 list.forEach((e,i)=>{const s=document.createElement('span'),sz=[48,74,52,86,60,44,78][i%7];s.textContent=e;
  s.style.cssText=`left:${xs[i]}%;bottom:${19+Math.random()*10}%;font-size:${sz}px;z-index:${sz>60?3:2}`;s.onclick=()=>objSay(e,s);box.append(s)});
 gsap.from('#deco span',{y:90,opacity:0,stagger:.1,duration:.8,ease:'back.out(2)'});
 gsap.to('#deco span',{rotation:3,yoyo:true,repeat:-1,duration:2,stagger:.25,ease:'sine.inOut'});fly(FLY[key]||[])}
function fly(list){const box=$('#sky2');[...box.children].forEach(c=>gsap.killTweensOf(c));box.innerHTML='';
 list.forEach(e=>{const s=document.createElement('span'),cloud=norm(e)==='\u2601';s.className='fl';s.textContent=e;s.style.top=(cloud?9+Math.random()*14:14+Math.random()*26)+'%';s.style.fontSize=(cloud?66:32)+'px';box.append(s);
  const run=()=>{if(!s.isConnected)return;const dir=Math.random()<.5?1:-1,w=innerWidth;gsap.fromTo(s,{x:dir>0?-100:w+100,scaleX:dir>0?1:-1},{x:dir>0?w+100:-100,duration:(cloud?45:16)+Math.random()*8,ease:'none',delay:Math.random()*3,onComplete:run})};run();
  if(!cloud)gsap.to(s,{y:16,yoyo:true,repeat:-1,duration:1.2,ease:'sine.inOut'})})}
$('#wicon').onclick=()=>{const t=SAY[norm($('#wicon').textContent)];if(t){sfx.pop();speak(t,'bear',.8)}};
/* walking: buttons, arrow keys, hold to keep walking, and a little stroll when idle */
const maxX=()=>Math.min(innerWidth/2-90,170);
function walk(dx){const to=Math.max(-maxX(),Math.min(maxX(),wx+dx));if(to===wx)return;const d=Math.abs(to-wx)/140,n=Math.max(2,Math.round(d/.16));wx=to;
 gsap.to('#leo',{x:wx,duration:d,ease:'sine.inOut',overwrite:'auto'});
 gsap.fromTo('.footL',{y:0},{y:-10,yoyo:true,repeat:n,duration:.16,ease:'sine.inOut'});gsap.fromTo('.footR',{y:-10},{y:0,yoyo:true,repeat:n,duration:.16,ease:'sine.inOut'});
 gsap.fromTo('#leoIn',{y:0},{y:-5,yoyo:true,repeat:n,duration:.16});
 gsap.fromTo('.armL',{rotation:-18},{rotation:14,yoyo:true,repeat:n,duration:.2});gsap.fromTo('.armR',{rotation:18},{rotation:-14,yoyo:true,repeat:n,duration:.2});
 eX.forEach(f=>f(dx>0?7:-7));fX.forEach(f=>f(dx>0?4:-4));
 gsap.delayedCall(d+.15,()=>{gsap.set('.armL',{rotation:14});gsap.set('.armR',{rotation:-14});gsap.set('.foot',{y:0});gsap.set('#leoIn',{y:0})})}
[['#wl',-1],['#wr',1]].forEach(([s,dir])=>{const b=$(s);let t=null;const stop=()=>{clearInterval(t);t=null};
 b.addEventListener('pointerdown',()=>{walk(dir*70);t=setInterval(()=>walk(dir*70),420)});['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,stop))});
addEventListener('keydown',e=>{if(e.key==='ArrowLeft')walk(-70);if(e.key==='ArrowRight')walk(70)});
setInterval(()=>{if(Date.now()-lastMove>6000&&!document.querySelector('.ov')&&!busy&&!$('#bub'))walk((Math.random()<.5?-1:1)*(60+Math.random()*90))},7000);
/* sentence builder: decide the target slot from the pointer position with generous padding */
function slotAt(sl,e,d,wd,words){const er=e.getBoundingClientRect(),cx=er.x+er.width/2,cy=er.y+er.height/2,px=d&&d.pointerX!=null?d.pointerX:cx,py=d&&d.pointerY!=null?d.pointerY:cy;
 const hit=(s,x,y)=>{const r=s.getBoundingClientRect();return x>r.left-28&&x<r.right+28&&y>r.top-34&&y<r.bottom+34};
 const c=sl.map((s,j)=>({j,s})).filter(o=>hit(o.s,px,py)||hit(o.s,cx,cy));if(!c.length)return -1;
 const good=c.find(o=>words[o.j]===wd&&!o.s.dataset.f);return (good||c[0]).j}

$('#menu').onclick=openMenu;$('#how').onclick=openHow;
(()=>{theme({bg:['#8fdcff','#fff1b8','#f6d58a'],deco:['🌴','🏝️','☃️'],w:'sunny',ic:'☀️'});
 const o=overlay(`<div class="big">🐻</div><h1>The Weather &amp; Wardrobe Adventure</h1><p style="text-align:center">Help Teddy the bear get dressed on magical islands! 🔊 Turn your sound on.</p><button class="go" id="pl">▶ Play</button><br><button class="go sm" id="lv2">🗺️ Levels</button><button class="go sm" id="hw">❓ How to play</button>`);
 o.querySelector('#pl').onclick=async()=>{unlock();o.remove();await intro();startLevel(0)};
 o.querySelector('#lv2').onclick=openMenu;o.querySelector('#hw').onclick=openHow})();