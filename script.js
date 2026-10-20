const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],sleep=ms=>new Promise(r=>setTimeout(r,ms));
if(matchMedia('(pointer:coarse)').matches||innerWidth<700)document.body.classList.add('touch');

/* ===== CHARACTERS (grid order: top-left, top-right, bottom-left, bottom-right) ===== */
const CH=[
{k:'boxer',img:'img/f4.webp',c:'#ff2d55',en:'KNOCKOUT',ku:'مووشتەوان',tagEn:'Hits hard. Loves harder.',tagKu:'بە هێز لێدەدات، زیاتر خۆشدەوێت.',
 stats:[['Loyalty','دڵسۆزی',98],['Power','هێز',95],['Humor','گاڵتە',80]],sp:['BIRTHDAY HOOK','مووشتی جەژن'],
 lines:[['en','Handaran, life throws punches — and you always hit back with a smile.'],
 ['ku','هەندەران، ژیان مووشت لێدەدات، بەڵام تۆ هەمیشە بە زەردەخەنەوە وەڵام دەدەیتەوە.'],
 ['en','Every year you get stronger, and so does our friendship.'],
 ['ku','هەموو ساڵێک بەهێزتر دەبیت، دۆستایەتیمانیش هەروا.'],
 ['en','Today there is no opponent, only cake. Round one: FIGHT!'],
 ['ku','ئەمڕۆ هیچ نەیارێک نییە، تەنها کێک. خولی یەکەم: شەڕ بکە!']]},
{k:'sword',img:'img/f3.webp',c:'#ff9f1c',en:'SCIMITAR',ku:'شمشێرڤان',tagEn:'Sharp mind. Loyal blade.',tagKu:'عەقڵێکی تیژ، شمشێرێکی دڵسۆز.',
 stats:[['Loyalty','دڵسۆزی',100],['Wisdom','ژیری',88],['Honor','شەرەف',96]],sp:['SCIMITAR STORM','گەردەلوولی شمشێر'],
 lines:[['en','A true friend is a blade: sharp when needed, loyal always.'],
 ['ku','هاوڕێی ڕاستەقینە وەک شمشێرە: کاتی پێویست تیژ، هەمیشە دڵسۆز.'],
 ['en','May this new year cut through every worry in your way.'],
 ['ku','هیوادارم ئەم ساڵە نوێیە هەموو خەم و ڕێگرییەکانت ببڕێت.'],
 ['en','Put the swords down, Handaran. Tonight, we celebrate.'],
 ['ku','شمشێرەکان دابنێ هەندەران، ئەمشەو ئاھەنگ دەگێڕین.']]},
{k:'runner',img:'img/f2.webp',c:'#2ec5ff',en:'PARKOUR',ku:'ڕاکەر',tagEn:'No wall can stop him.',tagKu:'هیچ دیوارێک ڕایناگرێت.',
 stats:[['Speed','خێرایی',99],['Courage','ئازایی',92],['Energy','وزە',97]],sp:['PARKOUR LEAP','پەڕینی پارکۆر'],
 lines:[['en','You never stop. You jump over every wall life builds.'],
 ['ku','تۆ هەرگیز ناوەستیت، لە هەموو دیوارێک دەپەڕیتەوە کە ژیان دروستی دەکات.'],
 ['en','Wherever you run, we will be right behind you.'],
 ['ku','بۆ هەر کوێ بڕۆیت، ئێمە لە پشتتەوەین.'],
 ['en','New level unlocked: another year of you.'],
 ['ku','ئاستێکی نوێ کرایەوە: ساڵێکی نوێی تۆ.']]},
{k:'sneaker',img:'img/f1.webp',c:'#b44dff',en:'SNEAKER KING',ku:'پاشای پێڵاو',tagEn:'Style is a language.',tagKu:'ستایل زمانێکە.',
 stats:[['Style','ستایل',100],['Humor','گاڵتە',90],['Vibes','هەست',99]],sp:['LIMITED DROP','دەرچوونی دەگمەن'],
 lines:[['en','Some people collect shoes. We collected memories with you.'],
 ['ku','هەندێک کەس پێڵاو کۆدەکەنەوە، ئێمە یادگاریمان لەگەڵ تۆ کۆکردەوە.'],
 ['en','You always walk in style, never in the crowd’s footsteps.'],
 ['ku','تۆ هەمیشە بە شێوازی خۆت دەڕۆیت، نەک وەک خەڵکی تر.'],
 ['en','Limited edition friend. Never restocked.'],
 ['ku','هاوڕێیەکی دەگمەن، کە جارێکی تر پەیدا نابێتەوە.']]}
];

/* ===== AUDIO (all synthesized, no files needed) ===== */
const mf=m=>440*2**((m-69)/12);
const T={ // lead/bass = semitones from root, null = rest. 16 steps
 menu:{bpm:108,r:57,lt:'sawtooth',lead:[12,,15,,19,,15,,17,,14,,10,,14,,],bass:[0,,,0,,,0,,-2,,,-2,,,-4,,],k:'x...x...x...x.x.',s:'....x.......x...',h:'..x...x...x...x.'},
 boxer:{bpm:132,r:40,lt:'sawtooth',lead:[12,,12,15,,12,,10,12,,12,17,,15,,12],bass:[0,0,,0,0,,0,,-2,-2,,-2,-2,,3,],k:'x...x...x...x...',s:'....x.......x..x',h:'x.x.x.x.x.x.x.xx'},
 sword:{bpm:98,r:50,lt:'triangle',lead:[12,13,16,13,12,,8,,12,13,16,17,19,,17,],bass:[0,,,,0,,7,,0,,,,-5,,-4,],k:'x.....x...x.....',s:'....x.......x.x.',h:'..x...x...x...x.'},
 runner:{bpm:152,r:52,lt:'square',lead:[0,7,12,7,0,7,12,16,0,7,12,7,-2,5,10,14],bass:[0,,0,,0,,0,,-2,,-2,,-4,,-4,],k:'x..x..x...x..x..',s:'....x.......x...',h:'xxxxxxxxxxxxxxxx'},
 sneaker:{bpm:102,r:48,lt:'triangle',lead:[12,,,12,,14,,16,,,12,,14,,10,],bass:[0,,0,,,0,12,,0,,0,,,-2,7,],k:'x.....x..x......',s:'....x.......x...',h:'x.x.x.x.x.x.x.x.'}
};
/* ===== YOUR OWN MUSIC =====
Put your mp3 files in the "music" folder with these exact names.
If a file is missing, the built-in synth music plays instead. */
const FILES={
  menu:'music/menu.mp3',       // character selection page
  boxer:'music/boxer.mp3',     // Knockout
  sword:'music/sword.mp3',     // Scimitar
  runner:'music/runner.mp3',   // Parkour
  sneaker:'music/sneaker.mp3'  // Sneaker King
};
const VOL=.7; // music volume 0 to 1
const A={x:null,mute:false,
init(){if(this.x)return;const x=this.x=new(window.AudioContext||webkitAudioContext)();this.m=x.createGain();this.m.connect(x.destination);
 this.mus=x.createGain();this.mus.gain.value=.5;this.mus.connect(this.m);this.sfx=x.createGain();this.sfx.connect(this.m);
 const b=this.nb=x.createBuffer(1,x.sampleRate,x.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1},
tone(f,t,d,ty,v,bus,f2){const x=this.x,o=x.createOscillator(),g=x.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(bus||this.sfx);o.start(t);o.stop(t+d+.05)},
nz(t,d,v,hp,bus){const x=this.x,s=x.createBufferSource(),g=x.createGain(),f=x.createBiquadFilter();s.buffer=this.nb;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(bus||this.sfx);s.start(t);s.stop(t+d+.05)},
fx(n){if(!this.x)return;const t=this.x.currentTime,o=this;({
 move(){o.tone(660,t,.07,'square',.12);o.tone(990,t+.05,.07,'square',.1)},
 type(){o.tone(1500,t,.02,'square',.025)},
 start(){[0,4,7,12].forEach((s,i)=>o.tone(mf(60+s),t+i*.07,.3,'square',.15))},
 back(){o.tone(500,t,.15,'sawtooth',.15,0,150)},
 pick(){o.nz(t,.5,.5,300);o.tone(220,t,.5,'sawtooth',.3,0,40);[0,7,12,16].forEach(s=>o.tone(mf(55+s),t+.12,.7,'square',.14))},
 special(){o.tone(120,t,.9,'sawtooth',.3,0,1200);o.nz(t+.5,.6,.5,200);o.tone(70,t+.5,.6,'sine',.8,0,30);[0,4,7,12,16].forEach((s,i)=>o.tone(mf(64+s),t+.6+i*.06,.9,'triangle',.16))}
})[n]()},
play(n){if(!this.x)return;clearInterval(this.iv);
 const old=this.el;if(old)this.fade(old,0,()=>old.pause());this.el=null;
 this.mus.gain.cancelScheduledValues(0);this.mus.gain.value=0;
 const a=new Audio();a.preload='auto';a.loop=true;a.volume=0;a.muted=this.mute;
 a.onerror=()=>{if(this.el===a){this.el=null;this.synth(n)}};
 a.src=FILES[n]||'';this.el=a;
 a.play().then(()=>this.fade(a,VOL)).catch(()=>{if(this.el===a){this.el=null;this.synth(n)}})},
fade(a,v,done){const i=setInterval(()=>{a.volume=Math.max(0,Math.min(1,a.volume+(v>a.volume?.05:-.05)));if(Math.abs(a.volume-v)<.06){a.volume=v;clearInterval(i);done&&done()}},40)},
synth(n){clearInterval(this.iv);const g=this.mus.gain,x=this.x;g.cancelScheduledValues(x.currentTime);g.setTargetAtTime(0,x.currentTime,.05);
 setTimeout(()=>{this.cur=T[n];this.step=0;this.next=x.currentTime+.05;g.setTargetAtTime(.5,x.currentTime,.1);this.iv=setInterval(()=>this.sched(),25)},180)},
sched(){const T=this.cur,x=this.x,sp=60/T.bpm/4,m=this.mus;while(this.next<x.currentTime+.15){const i=this.step%16,t=this.next;
 if(T.lead[i]!=null)this.tone(mf(T.r+T.lead[i]),t,sp*1.8,T.lt,.07,m);
 if(T.bass[i]!=null)this.tone(mf(T.r-12+T.bass[i]),t,sp*1.7,'triangle',.25,m);
 if(T.k[i]=='x')this.tone(150,t,.15,'sine',.8,m,45);
 if(T.s[i]=='x'){this.nz(t,.12,.3,1500,m);this.tone(190,t,.08,'triangle',.2,m)}
 if(T.h[i]=='x')this.nz(t,.04,.07,7000,m);
 this.next+=sp;this.step++}},
toggle(){this.mute=!this.mute;if(this.el)this.el.muted=this.mute;if(this.m)this.m.gain.value=this.mute?0:1;$('#mute').textContent=this.mute?'🔇':'🔊'}};
$('#mute').onclick=()=>{A.init();A.toggle()};

/* ===== PARTICLES (confetti + glass shards) ===== */
const cv=$('#fx'),g=cv.getContext('2d');let P=[],run=false;
const fit=()=>{cv.width=innerWidth;cv.height=innerHeight};fit();addEventListener('resize',()=>{fit();place()});
function burst(x,y,n,cols,shard){for(let i=0;i<n;i++)P.push({x,y,vx:(Math.random()-.5)*(shard?18:12),vy:(Math.random()-.8)*(shard?14:18),w:5+Math.random()*9,a:Math.random()*6,va:(Math.random()-.5)*.4,col:cols[i%cols.length],l:1,s:shard});if(!run){run=true;loop()}}
function loop(){g.clearRect(0,0,cv.width,cv.height);P=P.filter(p=>p.l>0);for(const p of P){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;p.l-=.011;g.save();g.translate(p.x,p.y);g.rotate(p.a);g.globalAlpha=Math.min(1,p.l*2);g.fillStyle=p.col;if(p.s){g.beginPath();g.moveTo(0,-p.w);g.lineTo(p.w,p.w);g.lineTo(-p.w*.6,p.w*.5);g.fill()}else g.fillRect(-p.w/2,-p.w/4,p.w,p.w/2);g.restore()}
 P.length?requestAnimationFrame(loop):(run=false,g.clearRect(0,0,cv.width,cv.height))}

/* ===== SCREENS ===== */
let scr='title',sel=0,busy=false,cur=CH[0];
const show=id=>{scr=id;$$('.screen').forEach(s=>s.classList.toggle('on',s.id==id))};
async function wipe(x,y,col,mid){const w=$('#wipe');w.style.setProperty('--x',x+'px');w.style.setProperty('--y',y+'px');w.style.background=`radial-gradient(circle,#fff,${col} 40%,#000)`;w.className='open';await sleep(750);mid();w.className='out';await sleep(650);w.className=''}

/* build cards */
const grid=$('#grid');
CH.forEach((c,i)=>{const d=document.createElement('div');d.className='card';d.style.setProperty('--c',c.c);d.innerHTML=`<img src="${c.img}" alt="${c.en}"><div class="nm">${c.en}</div>`;
 d.onclick=()=>{if(busy||scr!='select')return;if(sel==i)pick();else{A.fx('move');move(i)}};
 d.onpointermove=e=>{if(e.pointerType!='mouse')return;const r=d.getBoundingClientRect();d.style.transform=`perspective(600px) rotateY(${((e.clientX-r.left)/r.width-.5)*14}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*14}deg) translateY(-6px) scale(1.04)`};
 d.onpointerleave=()=>d.style.transform='';grid.append(d)});
function place(){const c=$$('.card')[sel];if(!c||scr!='select')return;const r=c.getBoundingClientRect(),gr=grid.getBoundingClientRect();
 [$('#sel'),$('#trail')].forEach(e=>{e.style.width=r.width+'px';e.style.height=r.height+'px';e.style.transform=`translate(${r.left-gr.left}px,${r.top-gr.top}px)`})}
function move(i){sel=(i+4)%4;const c=CH[sel];$$('.card').forEach((d,j)=>d.classList.toggle('on',j==sel));
 document.documentElement.style.setProperty('--c',c.c);place();
 const I=$('#info');I.style.setProperty('--c',c.c);$('#in-en').textContent=c.en;$('#in-ku').textContent=c.ku;$('#in-tg').textContent=c.tagEn;
 $$('#info>div').forEach(e=>{e.style.animation='none';e.offsetHeight;e.style.animation=''})}

function start(){A.init();A.fx('start');A.play('menu');show('select');requestAnimationFrame(()=>{move(0);place()})}
function pick(){if(busy)return;busy=true;cur=CH[sel];const el=$$('.card')[sel],r=el.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
 A.fx('pick');$('#flash').className='go';burst(cx,cy,70,[cur.c,'#fff','#8ec5ff'],true);el.classList.add('chosen');grid.classList.add('lock');
 setTimeout(()=>{$('#flash').className=''},600);
 setTimeout(()=>wipe(cx,cy,cur.c,()=>{show('fighter');render();A.play(cur.k)}),900)}
function back(){if(busy&&scr=='fighter'){busy=false;tk++;A.fx('back');wipe(innerWidth/2,innerHeight/2,'#2a6bff',()=>{grid.classList.remove('lock');$$('.card').forEach(c=>c.classList.remove('chosen'));show('select');move(sel);A.play('menu')})}}

/* fighter page */
let tk=0;
function render(){const c=cur,f=$('#fighter');f.style.setProperty('--c',c.c);$('#fchar').src=c.img;$('#fn').textContent=c.en;$('#fk').textContent=c.ku;
 $('#ftag').innerHTML=`${c.tagEn}<span class="ku">${c.tagKu}</span>`;$('#sp').textContent=c.sp[0]+' · '+c.sp[1];
 $('#stats').innerHTML=c.stats.map(s=>`<div class="st"><span>${s[0]} <span class="ku">${s[1]}</span></span><div class="bar"><i data-w="${s[2]}"></i></div><b>${s[2]}</b></div>`).join('');
 requestAnimationFrame(()=>requestAnimationFrame(()=>$$('#stats i').forEach(i=>i.style.width=i.dataset.w+'%')));type()}
async function type(){const id=++tk,box=$('#letter');box.innerHTML='';
 for(const [l,t] of [...cur.lines,['sig en','— Your friends · لە دۆستەکانتەوە ❤']]){const d=document.createElement('p');d.className='ln '+(l=='sig en'?'sig':l);if(l=='ku')d.classList.add('ku');box.append(d);
  for(let i=1;i<=t.length;i++){if(id!=tk)return;d.textContent=t.slice(0,i);if(i%3==0)A.fx('type');await sleep(l=='ku'?26:18)}await sleep(260)}}
function special(){if(scr!='fighter'||$('#ko').classList.contains('go'))return;const c=cur;A.fx('special');
 $('#ko1').textContent=c.sp[0];$('#ko2').textContent=c.sp[1];$('#fighter').style.setProperty('--c',c.c);$('#ko').style.setProperty('--c',c.c);
 $('#ko').className='go';document.body.classList.add('shake');$('#flash').className='go';
 setTimeout(()=>{burst(innerWidth/2,innerHeight*.45,120,[c.c,'#ffd166','#fff','#ff5d9e','#3dffb0'],false);burst(innerWidth*.2,innerHeight,50,[c.c,'#fff'],false);burst(innerWidth*.8,innerHeight,50,[c.c,'#ffd166'],false)},550);
 setTimeout(()=>{$('#ko').className='';document.body.classList.remove('shake');$('#flash').className=''},2500)}

/* 3D tilt on the fighter */
addEventListener('pointermove',e=>{if(scr!='fighter')return;$('#tilt').style.transform=`rotateY(${(e.clientX/innerWidth-.5)*34}deg) rotateX(${-(e.clientY/innerHeight-.5)*14}deg)`});
addEventListener('deviceorientation',e=>{if(scr!='fighter'||e.gamma==null)return;$('#tilt').style.transform=`rotateY(${Math.max(-25,Math.min(25,e.gamma))}deg) rotateX(${Math.max(-10,Math.min(10,(e.beta-50)/3))}deg)`});

/* input: keyboard + PS2 touch pad share one handler */
function press(k){A.init();
 if(scr=='title'){if(k=='X'||k=='T')start();return}
 if(scr=='select'&&!busy){if(k=='L'){A.fx('move');move(sel-1)}if(k=='R'){A.fx('move');move(sel+1)}if((k=='D'&&sel<2)||(k=='U'&&sel>=2)){A.fx('move');move(sel+(k=='D'?2:-2))}if(k=='X')pick();return}
 if(scr=='fighter'){if(k=='O')back();if(k=='T')special();if(k=='S'&&!$('#ko').classList.contains('go')){A.fx('move');type()}}}
const KM={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D',Enter:'X',x:'X',Escape:'O',Backspace:'O',o:'O',' ':'T',t:'T',s:'S',r:'S'};
addEventListener('keydown',e=>{const k=KM[e.key];if(k){e.preventDefault();press(k)}});
$$('[data-k]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();press(b.dataset.k);navigator.vibrate&&navigator.vibrate(12)}));
