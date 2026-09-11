const reasons=[
"Your smile makes ordinary days feel different.",
"Your kindness is one of the prettiest things about you.",
"I love the way you laugh at the little things.",
"You make me feel comfortable being completely myself.",
"Your eyes have a way of saying more than words.",
"I love your random little quirks.",
"You care more deeply than you realize.",
"You're stronger than you give yourself credit for.",
"You make memories out of simple moments.",
"Your presence can turn a bad day around.",
"I love hearing your voice.",
"You have dreams worth chasing.",
"You're beautiful when you're happy.",
"You're beautiful when you're being silly.",
"You're beautiful when you don't even notice.",
"You make me want to become better too.",
"Every picture with you becomes a favorite.",
"I never get tired of making memories with you.",
"You're one of the best parts of my life.",
"And simply because... you're you. ♡"
];

const cards=document.getElementById("reasonCards");
reasons.forEach((text,i)=>{
  const c=document.createElement("div");
  c.className="reason";
  c.innerHTML=`<div class="reason-inner"><div class="face"><span class="number">NO. ${String(i+1).padStart(2,"0")}<br><br>tap me</span></div><div class="face back">${text}</div></div>`;
  c.onclick=()=>{c.classList.toggle("flipped"); if(c.classList.contains("flipped")) miniHeart(c)};
  cards.appendChild(c);
});

function go(id){document.getElementById(id).scrollIntoView({behavior:"smooth"})}
function startJourney(){go("story"); heartBurst(); showToast("Okay... the surprise begins ♡")}
function countLove(){
  const el=document.getElementById("loveNumber");
  let n=Number(el.textContent)+1; el.textContent=n;
  const messages=["still counting...","okay, you're making this impossible","there are way too many","I could do this forever","yep. definitely infinite ♡"];
  document.getElementById("countMessage").textContent=messages[Math.min(messages.length-1,Math.floor(n/5))];
  if(n%5===0) heartBurst();
}
function openPhoto(src,caption){document.getElementById("modalImage").src=src;document.getElementById("modalCaption").textContent=caption;document.getElementById("photoModal").classList.add("show")}
function openWish(){document.getElementById("wishModal").classList.add("show");heartBurst()}
function openLetter(){document.getElementById("letterModal").classList.add("show");heartBurst()}
function closeById(id){document.getElementById(id).classList.remove("show")}
function closeModal(e,id){if(e.target.id===id)closeById(id)}
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),2500)}
function miniHeart(card){
 const r=card.getBoundingClientRect(),h=document.createElement("div");
 h.className="float-heart";h.textContent="♡";h.style.left=(r.left+r.width/2)+"px";h.style.top=(r.top+r.height/2)+"px";h.style.fontSize="28px";document.body.appendChild(h);setTimeout(()=>h.remove(),2200)
}
function heartBurst(){
 for(let i=0;i<22;i++){
   const h=document.createElement("div");h.className="float-heart";h.textContent=["♥","♡","✦","💗"][Math.floor(Math.random()*4)];
   h.style.left=(25+Math.random()*50)+"vw";h.style.top=(55+Math.random()*25)+"vh";
   h.style.fontSize=(14+Math.random()*30)+"px";h.style.animationDelay=(Math.random()*.35)+"s";
   document.body.appendChild(h);setTimeout(()=>h.remove(),2400);
 }
}
document.addEventListener("mousemove",e=>{
 const g=document.getElementById("cursorGlow");g.style.left=e.clientX+"px";g.style.top=e.clientY+"px";
});
for(let i=0;i<35;i++){
 const p=document.createElement("div");p.textContent=Math.random()>.5?"✦":"·";p.style.position="fixed";p.style.left=Math.random()*100+"vw";p.style.top=Math.random()*100+"vh";p.style.color="#ef9bb566";p.style.fontSize=(8+Math.random()*14)+"px";p.style.pointerEvents="none";p.style.zIndex="0";p.style.animation=`pulse ${2+Math.random()*4}s infinite ease-in-out`;document.getElementById("particles").appendChild(p);
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){["photoModal","wishModal","letterModal"].forEach(closeById)}});
