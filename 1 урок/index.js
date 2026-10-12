const AB=[];const P=f=>new Promise((res,rej)=>{AB.push(rej);f(res)});
const E3='assets/sticker-elf.png';function stk(){return `<div class="sticker"><img src="${E3}" alt=""><span>STAR OF THE LESSON</span></div>`}
const $=s=>document.querySelector(s),T=$('#task'),B=$('#bubble'),E=$('#elf');
const S={name:'Star',stars:0},W=['zero','one','two','three','four','five'];
const sleep=ms=>P(r=>setTimeout(r,ms));
const esc=s=>s.replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
const shuf=a=>a.map(x=>[Math.random(),x]).sort((p,q)=>p[0]-q[0]).map(x=>x[1]);
let voice=null;
function pickVoice(){try{const v=speechSynthesis.getVoices().filter(x=>/^en/i.test(x.lang));if(!v.length)return;const sel=$('#vs');if(!sel.options.length){sel.innerHTML=v.map((x,i)=>`<option value="${i}">${x.name.replace(/Microsoft |Google /,'').slice(0,20)}</option>`).join('');sel.onchange=()=>{voice=v[sel.value];speak('Hello. I am Elf.')}}
const best=v.find(x=>/en-GB/i.test(x.lang)&&/(female|libby|sonia|serena|kate|hazel|susan|martha|fiona|moira|tessa|karen|samantha)/i.test(x.name))||v.find(x=>/(female|samantha|karen|tessa|moira|zira|aria|jenny)/i.test(x.name))||v.find(x=>/en-GB/i.test(x.lang))||v[0];if(!voice){voice=best;sel.value=v.indexOf(best)}}catch(e){}}
pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice}catch(e){}
let SP=Promise.resolve(),LAST='',RATE=.72,SPID=0;const EM=/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]/gu;
function talk(ms){E.classList.add('talk');clearTimeout(talk.t);talk.t=setTimeout(()=>E.classList.remove('talk'),ms)}
function speak(t,onb,rate){if(!t)return;LAST=t;const my=++SPID,clean=t.replace(EM,'').replace(/!+/g,'.').replace(/\.\s/g,'… ');
 SP=new Promise(res=>{let d=0;const end=()=>{if(d)return;d=1;clearTimeout(ft);if(my===SPID)E.classList.remove('talk');res()};const ft=setTimeout(end,clean.length*140+1800);E.classList.add('talk');
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(clean);u.lang='en-GB';if(voice)u.voice=voice;u.rate=rate||RATE;u.pitch=1.12;u.volume=.95;u.onend=u.onerror=end;if(onb)u.onboundary=e=>onb(e.charIndex);speechSynthesis.speak(u)}catch(e){end()}})}
const heard=()=>P(r=>SP.then(r));
let wt;function walk(ms){document.body.classList.add('walk');clearTimeout(wt);wt=setTimeout(()=>document.body.classList.remove('walk'),ms)}
function say(t,v){B.innerHTML=t;B.classList.remove('pop');void B.offsetWidth;B.classList.add('pop');tone(1568,.7,'sine',0,.035);tone(2093,.9,'sine',.12,.025);speak(v===undefined?t.replace(/<[^>]+>/g,' '):v)}
let AC;function tone(f,d=.15,t='sine',w=0,v=.15){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain(),n=AC.currentTime+w;o.type=t;o.frequency.value=f;g.gain.setValueAtTime(v,n);g.gain.exponentialRampToValueAtTime(.001,n+d);o.connect(g);g.connect(AC.destination);o.start(n);o.stop(n+d)}catch(e){}}
const win=()=>{walk(1100);[523,659,784,1047].forEach((f,i)=>tone(f,.25,'sine',i*.09,.09))},oops=()=>tone(220,.3,'sine',0,.08);
function act(c){E.classList.remove('jump','spin','clap','wave');void E.offsetWidth;E.classList.add(c);setTimeout(()=>E.classList.remove(c),1100)}
function burst(x,y,em=['⭐','✨','💜','🌈'],n=16){for(let i=0;i<n;i++){const s=document.createElement('span');s.className='p';s.textContent=em[i%em.length];s.style.left=x+'px';s.style.top=y+'px';s.style.setProperty('--dx',(Math.random()*320-160)+'px');s.style.setProperty('--dy',(-Math.random()*320-20)+'px');$('#fx').appendChild(s);setTimeout(()=>s.remove(),1400)}}
const mid=()=>burst(innerWidth/2,innerHeight/2,undefined,30);
function addStars(n){S.stars+=n;const s=$('#score');s.textContent='⭐ '+S.stars;s.classList.add('bump');setTimeout(()=>s.classList.remove('bump'),400)}
S.done=new Set();S.learn=new Set();S.age=7;
const WW=['zero','one','two','three','four','five','six','seven','eight','nine','ten'];
const LEVELS=[['Hello','👋'],['Magic Moves','🪄'],['Potion Colours','🧪'],['Firefly Numbers','🔥'],['Magic Backpack','🎒'],['Forest Friends','🦊'],['Magic Kitchen','🍕'],['Hero Body','🙌'],['Secret Spell','📜'],['Shadow Boss','🌑'],['Certificate','🏆']];
function setStep(i){$('#steps').innerHTML=LEVELS.map(([n,e],j)=>`<button title="${n}" onclick="jump(${j})" class="${j==i?'now':S.done.has(j)?'done':''}">${e}</button>`).join('')}
const V={moves:[{w:'jump',e:'🦘'},{w:'clap',e:'👏'},{w:'spin',e:'🌀'},{w:'wave',e:'👋'}],
col:[['red','#ef4444'],['blue','#3b82f6'],['green','#16a34a'],['yellow','#eab308'],['purple','#9333ea']].map(([w,c])=>({w,c,e:'🧪'})),
num:WW.slice(1).map((w,i)=>({w,e:String(i+1),n:i+1})),
school:[['book','📘'],['pencil','✏️'],['bag','🎒'],['ruler','📏'],['chair','🪑'],['clock','⏰']].map(([w,e])=>({w,e})),
animals:[['cat','🐱'],['dog','🐶'],['bird','🐦'],['fish','🐟'],['rabbit','🐰'],['frog','🐸']].map(([w,e])=>({w,e})),
food:[['apple','🍎','apples'],['banana','🍌','bananas'],['pizza','🍕'],['cake','🍰'],['milk','🥛','',1],['bread','🍞','',1]].map(([w,e,p,m])=>({w,e,p,m})),
body:[['nose','👃'],['ears','👂'],['eyes','👀'],['mouth','👄'],['hand','✋'],['foot','🦶']].map(([w,e])=>({w,e,pl:w=='ears'||w=='eyes'}))};
const an=o=>(o.pl||o.m?'':/^[aeiou]/.test(o.w)?'an ':'a ')+o.w;
const bg=o=>o.c?`<i class="dot" style="background:${o.c}"></i>`:o.e;
const PR=['Great.','Well done.','Super.','Fantastic.','Perfect.','Wonderful.'],pr=()=>PR[Math.floor(Math.random()*6)];
const sw=async(h,v)=>{say(h,v);await heard();await sleep(250)};
const nxt=(l='Next ▶')=>P(r=>{T.innerHTML=`<button class="big">${l}</button>`;T.firstChild.onclick=()=>{tone(660,.2,'sine',0,.08);r()}});
const go=l=>P(r=>{T.innerHTML=`<button class="big">${l}</button>`;T.firstChild.onclick=e=>{win();burst(e.clientX,e.clientY);addStars(1);r()}});
async function lvl(i,goal){setStep(i);T.innerHTML=`<div class="lvl">Level ${i}<br>${LEVELS[i][1]} ${LEVELS[i][0]}</div><div class="goal">${goal}</div>`;walk(3200);mid();await sw(`Level ${i}. ${LEVELS[i][0]}.`);await nxt('▶ Start')}
async function fin(i,line){S.done.add(i);act('jump');mid();win();await sw(line);await nxt('Next level ▶')}
function ask(opts,ok,q,big){return P(res=>{say(q[0],q[1]);const w=document.createElement('div');w.className='opts';let fin=0;
 opts.forEach((o,i)=>{const b=document.createElement('button');b.className='opt'+(o.t&&o.t.length>7?' wide':'');b.style.setProperty('--c',o.c||'#7c3aed');b.innerHTML=`<b>${o.e||''}</b><span>${o.t||''}</span>`;
  b.onclick=e=>{if(fin)return;const good=typeof ok=='function'?ok(i):i===ok;if(good){fin=1;win();burst(e.clientX,e.clientY);addStars(1);w.querySelectorAll('button').forEach(x=>x.disabled=true);setTimeout(res,300)}else{oops();b.classList.add('no');setTimeout(()=>b.classList.remove('no'),450);const r=RID;say('Oops. Try again.');heard().then(()=>RID==r&&!fin&&say(q[0],q[1])).catch(()=>{})}};w.appendChild(b)});
 T.innerHTML=big?`<div class="pic">${big}</div>`:'';T.appendChild(w)})}
function teach(items,q){return P(res=>{say(q);const w=document.createElement('div');w.className='opts';const seen=new Set();
 items.forEach((o,i)=>{const b=document.createElement('button');b.className='opt';b.style.setProperty('--c',o.c||'#7c3aed');b.innerHTML=`<b>${o.e}</b><span>${o.w}</span>`;
  b.onclick=e=>{speak(o.w);burst(e.clientX,e.clientY,[o.e,'✨'],8);tone(450+i*60,.15);act(['clap','wave','jump'][i%3]);if(o.c)document.body.style.setProperty('--g',o.c);b.classList.add('seen');seen.add(i);if(seen.size==items.length){items.forEach(x=>S.learn.add(x.w));win();addStars(2);setTimeout(res,1500)}};w.appendChild(b)});
 T.innerHTML='';T.appendChild(w)})}
async function rnd(items,o,q,mode,fb,fx){const op=shuf([o,...shuf(items.filter(x=>x!==o)).slice(0,2)]);
 await ask(op.map(x=>mode=='word'?{t:x.w}:{e:x.e,t:'',c:x.c}),op.indexOf(o),q,mode=='word'?bg(o):'');fx&&fx(o);await sw(fb?fb(o):pr())}
async function each(items,n,f){let bag=[];for(let r=0;r<n;r++){if(!bag.length)bag=shuf(items);await f(bag.pop(),r)}}
const pick=(items,n,mk,mode,fb,fx)=>each(items,n,o=>rnd(items,o,mk(o),mode,fb,fx));
const dlg=(items,n,q,ans)=>each(items,n,async o=>{const op=shuf([o,...shuf(items.filter(x=>x!==o)).slice(0,2)]);await ask(op.map(x=>({t:ans(x),c:'#0ea5e9'})),op.indexOf(o),[q,q],bg(o));await sw(ans(o))});
const yesno=(items,n)=>each(items,n,async o=>{const yes=Math.random()<.5,c=yes?o:shuf(items.filter(x=>x!==o))[0];await ask([{e:'👍',t:"Yes, it is.",c:'#16a34a'},{e:'👎',t:"No, it isn't.",c:'#dc2626'}],yes?0:1,[`Is it <big>${an(c)}</big>?`,`Is it ${an(c)}?`],bg(o));await sw(`${yes?'Yes':'No'}, it ${yes?'is':"isn't"}. It's ${an(o)}.`)});
async function like(items,n){for(const o of shuf(items).slice(0,n)){let y=0;const f=o.p||o.w;await ask([{e:'😍',t:"Yes, I do.",c:'#16a34a'},{e:'🙅',t:"No, I don't.",c:'#dc2626'}],i=>{y=i==0;return true},[`Do you like <big>${f}</big>?`,`Do you like ${f}?`],o.e);await sw(y?`Me too. I like ${f}.`:`Okay. I don't like ${f}.`)}}
async function echo(items,fmt){await sw('Now you say it. Listen and repeat.');for(const o of items){T.innerHTML=`<div class="pic">${bg(o)}</div><div class="say">${fmt(o)}</div>`;say(fmt(o));await heard();await go('🗣 I said it!')}}
function spell(o){return P(res=>{const w=o.w.toUpperCase();let k=0;const sl=()=>(w.slice(0,k)+'_'.repeat(w.length-k)).split('').join(' ');
 T.innerHTML=`<div class="pic">${bg(o)}</div><div id="sent">${sl()}</div><div class="opts" id="chips"></div>`;say(`Spell <big>${w}</big>`,`Spell ${o.w}`);
 shuf([...w]).forEach(ch=>{const b=document.createElement('button');b.className='chip';b.textContent=ch;b.onclick=()=>{if(ch===w[k]){k++;speak(ch);tone(440+k*70,.15);b.remove();$('#sent').textContent=sl();if(k==w.length){win();addStars(1);burst(innerWidth/2,innerHeight/2,['✨'],14);setTimeout(res,700)}}else{oops();b.classList.add('no');setTimeout(()=>b.classList.remove('no'),450)}};$('#chips').appendChild(b)})})}
async function spells(items,n){for(const o of shuf(items.filter(x=>x.w.length<=5)).slice(0,n)){await spell(o);await sw(o.w)}}
function memory(items){return P(res=>{const cs=shuf(shuf(items).slice(0,3).flatMap(o=>[{o,t:0},{o,t:1}]));say('Find the pairs. A picture and a word.');T.innerHTML='<div class="opts"></div>';let op=[],ok=0,lk=0;
 cs.forEach(c=>{const b=document.createElement('button');b.className='opt';b.style.setProperty('--c','#6d28d9');b.innerHTML='<b>❓</b>';
  b.onclick=()=>{if(lk||b.dataset.f)return;b.dataset.f=1;b.innerHTML=c.t?`<span style="font-size:22px">${c.o.w}</span>`:`<b>${bg(c.o)}</b>`;speak(c.o.w);op.push([b,c]);tone(500,.1);
   if(op.length==2){lk=1;const[[b1,c1],[b2,c2]]=op;op=[];if(c1.o===c2.o){ok++;addStars(1);win();lk=0;if(ok==3)setTimeout(res,1200)}else setTimeout(()=>{[b1,b2].forEach(x=>{x.innerHTML='<b>❓</b>';delete x.dataset.f});lk=0},1200)}};T.firstChild.appendChild(b)})})}
function flies(n){return P(res=>{say(`Catch <big>${WW[n]}</big> fireflies!`,`Catch ${WW[n]} fireflies. Count with me.`);T.innerHTML=`<div class="cnt"><span id="cnt">0</span> / ${n}</div><div id="fl"></div>`;let c=0;
 for(let i=0;i<n+3;i++){const d=document.createElement('button');d.className='fly';d.textContent='✨';d.style.left=Math.random()*85+'%';d.style.top=Math.random()*75+'%';d.style.animationDelay=(-Math.random()*4)+'s';d.style.animationDuration=(2.5+Math.random()*3)+'s';
  d.onclick=e=>{if(c>=n)return;c++;speak(WW[c],null,.6);tone(380+c*60,.18);burst(e.clientX,e.clientY,['✨','⭐'],7);d.remove();$('#cnt').textContent=c;if(c==n){win();addStars(2);act('jump');setTimeout(res,1400)}};$('#fl').appendChild(d)}})}
async function howmany(n){for(let r=0;r<n;r++){const k=2+Math.floor(Math.random()*8),op=shuf([k,...shuf([1,2,3,4,5,6,7,8,9,10].filter(x=>x!=k)).slice(0,2)]);await ask(op.map(x=>({e:String(x),t:'',c:'#0ea5e9'})),op.indexOf(k),['How many stars?','How many stars?'],'⭐'.repeat(k));await sw(`${WW[k]} stars.`)}}
function build(s){return P(res=>{const ws=s.split(' ');let k=0;say('Build the spell. Tap the words in order.');T.innerHTML='<div id="sent"></div><div class="opts" id="chips"></div>';
 shuf(ws.map((w,i)=>[w,i])).forEach(([w,i])=>{const b=document.createElement('button');b.className='chip';b.textContent=w;b.onclick=e=>{if(i===k){k++;speak(w);tone(440+k*70,.15);$('#sent').append(w+' ');b.remove();addStars(1);burst(e.clientX,e.clientY,['✨'],6);if(k==ws.length){win();setTimeout(res,900)}}else{oops();b.classList.add('no');setTimeout(()=>b.classList.remove('no'),450)}};$('#chips').appendChild(b)})})}
async function chant(lines,lv,line){await sw('Now the magic chant. Listen first. Then sing with me.');
 T.innerHTML=`<div class="chant">${lines.map((l,i)=>`<p id="cl${i}">${l.split(' ').map(w=>`<span>${w}</span>`).join(' ')}</p>`).join('')}</div><div class="ctl2"><button class="prt" id="again">🔁 Sing again</button><button class="big" id="nx">Next ▶</button></div>`;
 let busy=0;const sayLine=async i=>{const p=$('#cl'+i),sp=[...p.children],L=lines[i],st=[];let c=0;L.split(' ').forEach(w=>{st.push(c);c+=w.length+1});let hit=0,k=0;
  const mk=j=>sp.forEach((e,x)=>e.classList.toggle('hl',x==j)),tm=setInterval(()=>{if(!hit)mk(Math.min(k++,sp.length-1))},650);
  try{speak(L,ci=>{hit=1;let j=0;st.forEach((s,x)=>{if(ci>=s)j=x});mk(j)},.5);await heard()}finally{clearInterval(tm);mk(-1)}};
 const sing=async()=>{if(busy)return;busy=1;try{for(let i=0;i<lines.length;i++){await sayLine(i);await sleep(500)}}finally{busy=0}};
 lines.forEach((l,i)=>$('#cl'+i).onclick=()=>{if(!busy){busy=1;sayLine(i).catch(()=>{}).then(()=>busy=0)}});
 $('#again').onclick=()=>{sing().catch(()=>{})};
 await sing();S.done.add(lv);act('jump');win();addStars(2);burst(innerWidth/2,innerHeight/3,['🎵','⭐','✨'],16);
 say('Now you sing. Take your time. Tap a line to hear it again.');
 await P(r=>$('#nx').onclick=()=>{tone(660,.2,'sine',0,.08);r()})}
const pick5=a=>shuf(a).slice(0,4);
async function L0(){
 setStep(0);E.classList.add('sleep');say('Shh… the elf is sleeping. Tap the magic button.','');
 T.innerHTML=`<img class="ban" src="assets/banner.jpg" alt=""><button class="big" id="go">✨ Wake the Elf!</button>`;
 await P(r=>$('#go').onclick=r);
 E.classList.remove('sleep');startMusic();act('spin');mid();win();
 await sw('Hello! I am Elf, your magic teacher.');
 await go('👋 Hello, Elf!');
 say('Wonderful. What is your name?');await heard();
 T.innerHTML='';const nb=document.createElement('div');nb.id='nmbox';nb.innerHTML=`<label>My name is</label><input id="nm" type="text" maxlength="14" placeholder="Type your name" autocomplete="off" autocapitalize="words" enterkeyhint="done"><button class="big" id="ok">✨ OK!</button>`;document.body.appendChild(nb);setTimeout(()=>{try{$('#nm').focus()}catch(e){}},250);
 $('#nm').addEventListener('keydown',e=>{if(e.key==='Enter')$('#ok').click()});
 await P(r=>$('#ok').onclick=r);
 S.name=($('#nm').value.trim()||'Star').slice(0,14);nb.remove();addStars(1);mid();act('wave');
 await sw(`Nice to meet you, ${esc(S.name)}.`,`Nice to meet you, ${S.name}.`);
 await ask([{e:'😊',t:"I'm fine, thank you.",c:'#16a34a'},{e:'🤩',t:"I'm happy!",c:'#f59e0b'},{e:'😴',t:"I'm tired.",c:'#3b82f6'}],i=>true,['How are you today?','How are you today?']);
 await sw('Thank you. I am happy to see you.');
 await ask([5,6,7,8,9,10].map(n=>({e:String(n),t:'',c:'#0ea5e9'})),i=>{S.age=5+i;return true},['How old are you?','How old are you?'],'🎂');
 await sw(`You are ${WW[S.age]}. Great.`);
 await chant(["Hello, hello, what's your name?","My name is "+S.name+".","Hello, hello, how are you?","I'm fine, thank you."],0,'You are ready for magic.')}
async function L1(){await lvl(1,'Listen, move and say: jump · clap · spin · wave');
 for(const m of V.moves){act(m.w);await sw(`<big>${m.w.toUpperCase()} ${m.e}</big>Do it with me.`,m.w);await go(`${m.e} ${m.w.toUpperCase()}`);act(m.w);await sleep(900)}
 await sw('Now listen carefully. Elf says… do it.');
 await pick(V.moves,5,o=>[`Elf says… <big>${o.w.toUpperCase()}</big>`,`Elf says… ${o.w}.`],'pic',o=>o.w+'.',o=>act(o.w));
 await echo(V.moves,o=>o.w+'!');
 await chant(['Jump, jump, jump.','Clap, clap, clap.','Spin, spin, spin.','Wave, wave, wave.'],1,'Jump, clap, spin, wave. You are a real magician.')}
async function L2(){await lvl(2,'red · blue · green · yellow · purple — What colour is it? It\'s red.');
 await teach(V.col,'Tap every potion and listen.');document.body.style.setProperty('--g','#a78bfa');
 await pick(V.col,5,o=>[`Touch the <big>${o.w.toUpperCase()}</big> potion`,`Touch the ${o.w} potion.`],'pic',o=>o.w+'.',o=>document.body.style.setProperty('--g',o.c));
 await dlg(V.col,4,'What colour is it?',o=>`It's ${o.w}.`);
 await spells(V.col,2);await echo(pick5(V.col).slice(0,3),o=>`It's ${o.w}.`);
 await chant(['Red, blue, green.','Yellow, purple, too.','Colours, colours, rainbow magic.','What colour is it? It is blue.'],2,'Rainbow magic. Wonderful.')}
async function L3(){await lvl(3,'one — ten · How many? Count with me.');
 await teach(V.num,'Tap the numbers and listen.');
 await pick(V.num,5,o=>[`Touch number <big>${o.w.toUpperCase()}</big>`,`Touch number ${o.w}.`],'pic',o=>o.w+'.');
 for(const n of [3,5,8]){await flies(n);await sw(WW[n]+'.')}
 await howmany(3);await echo(pick5(V.num).slice(0,3),o=>o.w+'.');
 await chant(['One, two, three, four, five.','Six, seven, eight, nine, ten.','Count the stars again.'],3,'You can count like a wizard.')}
async function L4(){await lvl(4,"What's this? — It's a book.");
 await teach(V.school,'Tap every picture and listen.');
 await pick(V.school,4,o=>[`Touch <big>${an(o).toUpperCase()}</big>`,`Touch ${an(o)}.`],'pic',o=>`It's ${an(o)}.`);
 await pick(V.school,4,o=>["What's this?","What's this?"],'word',o=>`It's ${an(o)}.`);
 await dlg(V.school,3,"What's this?",o=>`It's ${an(o)}.`);
 await spells(V.school,2);await memory(V.school);await echo(pick5(V.school),o=>`It's ${an(o)}.`);
 await chant(["What's this? It's a book.","What's this? It's a pencil.","What's this? It's a bag.","What's this? It's a clock."],4,'Your magic backpack is full.')}
async function L5(){await lvl(5,"Is it a cat? — Yes, it is. / No, it isn't.");
 await teach(V.animals,'Tap every animal and listen.');
 await pick(V.animals,4,o=>[`Touch <big>${an(o).toUpperCase()}</big>`,`Touch ${an(o)}.`],'pic',o=>`It's ${an(o)}.`);
 await yesno(V.animals,6);await dlg(V.animals,3,'What can you see?',o=>`I can see ${an(o)}.`);
 await memory(V.animals);await spells(V.animals,2);await echo(pick5(V.animals),o=>`It's ${an(o)}.`);
 await chant(['Is it a cat? Yes, it is.','Is it a dog? No, it isn\'t.','I can see a bird.','I can see a frog.'],5,'The forest friends love you.')}
async function L6(){await lvl(6,"I like pizza. — Do you like apples? Yes, I do. / No, I don't.");
 await teach(V.food,'Tap every food and listen.');
 await pick(V.food,4,o=>[`Touch the <big>${o.w.toUpperCase()}</big>`,`Touch the ${o.w}.`],'pic',o=>o.w+'.');
 await like(V.food,5);await dlg(V.food,3,"What's this?",o=>`It's ${an(o)}.`);
 await memory(V.food);await spells(V.food,2);await echo(pick5(V.food),o=>`I like ${o.p||o.w}.`);
 await chant(['I like pizza. I like cake.','Do you like apples?','Yes, I do. Yes, I do.','I like milk. Yum, yum.'],6,'Yummy. The kitchen is happy.')}
async function L7(){await lvl(7,'Touch your nose. — nose · ears · eyes · mouth · hand · foot');
 await teach(V.body,'Tap every picture and listen.');
 for(const o of V.body){act('wave');await sw(`Touch your <big>${o.w}</big>`,`Touch your ${o.w}.`);await go('✋ Done')}
 await pick(V.body,5,o=>[`Elf says… touch your <big>${o.w}</big>`,`Elf says… touch your ${o.w}.`],'pic',o=>`Your ${o.w}.`);
 await memory(V.body);await spells(V.body,2);await echo(pick5(V.body),o=>`Touch your ${o.w}.`);
 await chant(['Touch your nose, touch your ears.','Touch your eyes, touch your mouth.','Touch your hand, touch your foot.','Jump, jump, jump.'],7,'Head, hands and feet. You are fantastic.')}
async function L8(){await lvl(8,'Build the sentences and say them loud.');
 for(const s of [`Hello! My name is ${S.name}.`,"It's a cat.","I like pizza.","I can see a red bird."]){await build(s);await sw(`<big>${esc(s)}</big>`,s);await go('🎤 I said it!')}
 await fin(8,'Your spells are strong.')}
async function L9(){await lvl(9,'Find the words and beat the Shadow!');
 $('#hp').hidden=false;$('#hp i').style.width='100%';let hp=100;const sets=[V.moves,V.col,V.num,V.school,V.animals,V.food,V.body];
 for(let r=0;r<8;r++){const it=sets[Math.floor(Math.random()*sets.length)],o=it[Math.floor(Math.random()*it.length)];
  await rnd(it,o,[`Find <big>${o.w.toUpperCase()}</big>!`,`Find ${o.w}.`],'pic',()=>['Boom.','Zap.','Bam.'][r%3]);hp-=12.5;$('#hp i').style.width=Math.max(hp,0)+'%';act('jump');burst(innerWidth/2,innerHeight/3,['💥','⭐'],10)}
 await fin(9,'The shadow is gone. You are a hero.');$('#hp').hidden=true}
function cert(){
 setStep(10);document.body.style.setProperty('--g','#ffd54a');act('wave');mid();
 say(`Congratulations, ${esc(S.name)}! You are my Assistant Wizard!`,`Congratulations, ${S.name}. You are my Assistant Wizard.`);
 const d=new Date().toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'}),ws=[...S.learn].slice(0,30).join(' · ')||'hello · my name is…';
 T.innerHTML=`<div id="cert"><img class="logo" src="assets/logo.jpg" alt=""><p class="sm">ELF Online English School · Feel Magic</p><h2>CERTIFICATE</h2><p>This is to certify that</p><h1>${esc(S.name)}</h1><p>is the official</p><h3>⭐ Star of the Lesson ⭐</h3><h4>Assistant Wizard</h4><p class="sm">Magic words: ${ws}</p><div class="row"><span>⭐ ${S.stars}</span><span>${d}</span><span>✍️ Elf Teacher</span></div></div><button class="big" id="gift">🎁 Secret sticker! Tap me 3 times</button><button class="prt" onclick="doPrint()">🖨️ Print certificate</button><p class="hint">If the print window does not open, press Ctrl/Cmd + P. Choose “Save as PDF” if you want a file.</p><div id="sheet">${stk()+stk()+stk()}</div>`;
 let n=0;$('#gift').onclick=e=>{n++;tone(300+n*150,.2);burst(e.clientX,e.clientY,['🎁','✨'],10);$('#gift').textContent=n==1?'🎁 Two more taps!':'🎁 One more tap!';if(n>=3){win();mid();$('#gift').outerHTML=stk();act('jump');say('This secret sticker is only for you. See you next lesson. Bye bye!')}}}
function doPrint(){try{window.print()}catch(e){}}
function tree(x,s,c){return `<g transform="translate(${x} 420) scale(${s})"><g class="sw"><rect x="-9" y="-150" width="18" height="150" fill="${c}"/><circle cy="-185" r="62" fill="${c}"/><circle cx="-46" cy="-140" r="42" fill="${c}"/><circle cx="46" cy="-140" r="42" fill="${c}"/></g></g>`}
function mush(x,s){return `<g transform="translate(${x} 420) scale(${s})"><rect x="-4" y="-22" width="8" height="22" fill="#f1e3c8"/><ellipse cy="-24" rx="20" ry="13" fill="#ff7849" class="mu"/><circle cx="-7" cy="-27" r="3" fill="#fff"/><circle cx="8" cy="-23" r="2.5" fill="#fff"/></g>`}
function world(){let a=7;const R=()=>(a=a*16807%2147483647)/2147483647;
 const L=(n,c,s,o,d,ex)=>{let t='';for(let i=0;i<n;i++)t+=tree(i*1200/n+R()*50,s*(.75+R()*.5),c);t+=ex||'';const v=`<svg viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax meet">${t}</svg>`;return `<div class="ly" style="--d:${d}s;opacity:${o}">${v}${v}</div>`};
 let m='',f='',s='';for(let i=0;i<7;i++)m+=mush(60+i*170+R()*80,.8+R()*.8);
 for(let i=0;i<30;i++)f+=`<i class="ff" style="left:${R()*100}%;top:${25+R()*65}%;--x:${R()*80-40}px;--y:${-R()*80}px;--t:${3+R()*4}s;animation-delay:${-R()*5}s"></i>`;
 for(let i=0;i<45;i++)s+=`<i class="st" style="left:${R()*100}%;top:${R()*50}%;animation-delay:${-R()*3}s"></i>`;
 $('#world').innerHTML=`<div class="moon"></div>${s}<div class="ray" style="left:12%"></div><div class="ray" style="left:55%;animation-delay:-3s"></div>`+L(7,'#1d2f6b',1.1,.7,36)+L(6,'#103c52',1.25,.85,22)+L(5,'#0a2c2e',1.7,1,12,m)+'<div id="gr"></div>'+f}
function elfSVG(){const px=['..XXXXX.','.XXXXXXX','XXXXXXXX','XXXXXXX.','.XXXXXX.','..XXXX..','...XX...'];let wg='';
 px.forEach((q,y)=>[...q].forEach((c,x)=>{if(c=='X')wg+=`<rect x="${(x-8)*11}" y="${y*11}" width="11" height="11" fill="hsl(${175+x*13+y*9} 85% 76%)" style="animation-delay:${(x*7+y*13)%20/10}s"/>`}));
 const wing=t=>`<g transform="${t}"><g class="wg">${wg}</g></g>`,sk='#ffd9bd';
 const eye=c=>`<ellipse cx="${c}" cy="134" rx="15" ry="18" fill="#fff"/><circle cx="${c}" cy="136" r="12" fill="#34b36b"/><circle cx="${c}" cy="137" r="6.5" fill="#17203a"/><circle cx="${c+4}" cy="131" r="3.5" fill="#fff"/><ellipse class="lid" cx="${c}" cy="134" rx="16.5" ry="19.5" fill="${sk}"/><path d="M${c-16} 133Q${c} 119 ${c+16} 133" stroke="#2a1b3d" stroke-width="3.5" fill="none" stroke-linecap="round"/><path d="M${c-14} 112Q${c} 104 ${c+14} 111" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round"/>`;
 return `<svg viewBox="0 0 300 400"><defs><linearGradient id="rb" x1="0" x2="1"><stop offset="0" stop-color="#ff4d6d"/><stop offset=".2" stop-color="#ff9f1c"/><stop offset=".4" stop-color="#ffe14d"/><stop offset=".6" stop-color="#4ade80"/><stop offset=".8" stop-color="#38bdf8"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs>
<ellipse cx="150" cy="390" rx="70" ry="9" fill="#0006"/>${wing('translate(112 150)')}${wing('translate(188 150) scale(-1 1)')}
<g class="hr"><path d="M78 120Q50 210 82 288L124 250H176L218 288Q250 210 222 120Z" fill="url(#rb)"/></g>
<g class="lg lg1"><rect x="118" y="292" width="26" height="78" rx="12" fill="#7c4dbd"/><ellipse cx="128" cy="374" rx="24" ry="12" fill="#6b7fe0"/><rect x="104" y="379" width="48" height="6" rx="3" fill="#fff"/></g>
<g class="lg lg2"><rect x="156" y="292" width="26" height="78" rx="12" fill="#7c4dbd"/><ellipse cx="172" cy="374" rx="24" ry="12" fill="#4ec98a"/><rect x="148" y="379" width="48" height="6" rx="3" fill="#fff"/></g>
<path d="M104 198Q150 184 196 198L208 302Q150 316 92 302Z" fill="#7a5bd0"/><rect x="125" y="258" width="50" height="28" rx="10" fill="#6a4cc0"/>
<g stroke="#9dffc8" stroke-width="2.5" fill="none" stroke-linecap="round" class="st"><path d="M118 215v28h18M182 218v24h-16M150 262v-14"/></g>
<path d="M110 196Q150 222 190 196Q150 176 110 196Z" fill="#5b3fa8"/><path d="M142 212v26M158 212v26" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
<g transform="translate(176 282) rotate(-10)"><rect width="34" height="18" rx="8" fill="#7fd3ff"/><circle cx="9" cy="9" r="3.5" fill="#245"/><circle cx="25" cy="6" r="2" fill="#f55"/><circle cx="28" cy="11" r="2" fill="#5f5"/></g>
<g class="am al"><rect x="86" y="198" width="26" height="86" rx="13" fill="#5fb89a"/><path d="M99 215v50" stroke="#c9ffe6" stroke-width="2"/><circle cx="99" cy="290" r="12" fill="${sk}"/></g>
<g class="am ar"><rect x="188" y="198" width="26" height="86" rx="13" fill="#5fb89a"/><path d="M201 215v50" stroke="#c9ffe6" stroke-width="2"/><circle cx="201" cy="290" r="12" fill="${sk}"/></g>
<g class="hd"><path d="M92 126L50 98L90 156Z" fill="${sk}"/><path d="M208 126L250 98L210 156Z" fill="${sk}"/><ellipse cx="150" cy="130" rx="64" ry="58" fill="${sk}"/>
<circle cx="112" cy="153" r="9" fill="#ff9aa2" opacity=".55"/><circle cx="188" cy="153" r="9" fill="#ff9aa2" opacity=".55"/>${eye(125)}${eye(175)}
<path d="M150 146q4 5 0 8" stroke="#e0a080" stroke-width="2" fill="none"/>
<g class="mo"><path d="M133 160Q150 188 167 160Q150 166 133 160Z" fill="#8b2347"/><path d="M143 172Q150 179 157 172Q150 168 143 172Z" fill="#ff7a93"/></g>
<path d="M84 128Q84 56 150 52Q216 56 216 128Q206 92 176 86Q150 100 118 84Q92 94 84 128Z" fill="url(#rb)"/></g></svg>`}
const LV=[L0,L1,L2,L3,L4,L5,L6,L7,L8,L9,async()=>cert()];let RID=0;
async function play(i){const r=++RID;AB.splice(0).forEach(f=>f('x'));try{speechSynthesis.cancel()}catch(e){}$('#fx').innerHTML='';{const o=document.getElementById('nmbox');o&&o.remove()}$('#hp').hidden=true;E.classList.remove('sleep');document.body.classList.remove('walk');document.body.style.setProperty('--g','#a78bfa');
 for(let k=i;k<LV.length;k++){try{await LV[k]()}catch(e){if(RID!=r)return;console.error(e);return}}}
function jump(i){startMusic();play(i)}
let on=true,mus=null;function startMusic(){if(mus||!on)return;const N=[0,2,4,7,9,12,14];mus=setInterval(()=>{if(on)tone(392*Math.pow(2,N[Math.floor(Math.random()*7)]/12),1.4,'sine',0,.04)},700)}
$('#mus').onclick=()=>{on=!on;$('#mus').textContent=on?'🎵':'🔇';if(on)startMusic()};
$('#rep').onclick=()=>speak(LAST);const SPD=[[.55,'🐢 Slow'],[.72,'🚶 Normal'],[.9,'🐇 Fast']];let si=1;$('#spd').onclick=()=>{si=(si+1)%3;RATE=SPD[si][0];$('#spd').textContent=SPD[si][1]};
world();E.innerHTML=elfSVG();play(0);