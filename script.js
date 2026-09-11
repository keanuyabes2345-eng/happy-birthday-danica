const reasons=[
"Your smile makes ordinary days feel completely magical.",
"Your kindness is one of the prettiest things about you.",
"I love the way you laugh uncontrollably at the little things.",
"You make me feel entirely comfortable being completely myself.",
"Your eyes have a way of saying more than a thousand words.",
"I love your random, adorable little quirks.",
"You care about others much more deeply than you realize.",
"You're far stronger than you ever give yourself credit for.",
"You turn simple, everyday moments into lifelong memories.",
"Your presence alone can completely turn a bad day around.",
"I never get tired of hearing your voice.",
"You have big, beautiful dreams worth chasing.",
"You are stunningly beautiful when you're genuinely happy.",
"You are so cute and adorable when you're being silly.",
"You're breathtakingly gorgeous when you don't even notice.",
"You inspire me to become a better version of myself every day.",
"Every single picture with you instantly becomes my favorite.",
"I never get tired of making core memories with you.",
"You are hands down one of the best parts of my life.",
"And simply because... you are uniquely you. ♡"
];

function initReasons(){
  const cards=document.getElementById("reasonCards");
  if(cards && cards.children.length === 0){
    reasons.forEach((text,i)=>{
      const c=document.createElement("div");
      c.className="reason";
      c.innerHTML=`<div class="reason-inner"><div class="face"><span class="number">NO. ${String(i+1).padStart(2,"0")}<br><br>tap to flip</span></div><div class="face back">${text}</div></div>`;
      c.onclick=()=>{
        c.classList.toggle("flipped"); 
        if(c.classList.contains("flipped")) miniHeart(c);
      };
      cards.appendChild(c);
    });
  }
}

function go(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:"smooth"});
}

function startJourney(){
  go("story"); 
  heartBurst(); 
  showToast("Okay... your magical journey begins ♡");
}

function countLove(){
  const el=document.getElementById("loveNumber");
  if(!el) return;
  let n=Number(el.textContent)+1; 
  el.textContent=n;
  const messages=["still counting...","okay, you're making this scale impossible!","there are way too many reasons","I could do this forever","yep... definitely infinite ♡"];
  const msgEl = document.getElementById("countMessage");
  if(msgEl) msgEl.textContent=messages[Math.min(messages.length-1,Math.floor(n/5))];
  if(n%5===0) heartBurst();
}

function extinguishCandle(candleEl){
  candleEl.classList.toggle("extinguished");
  const allCandles = document.querySelectorAll(".candle");
  const extinguishedCount = document.querySelectorAll(".candle.extinguished").length;
  const statusEl = document.getElementById("cakeStatusText");
  
  if(extinguishedCount === allCandles.length){
    if(statusEl) statusEl.textContent = "All candles blown out! Make a wish! 🎂✨";
    heartBurst();
    showToast("Make a wonderful birthday wish! ✨");
  } else {
    if(statusEl) statusEl.textContent = `${extinguishedCount} of ${allCandles.length} candles blown out!`;
  }
}

function blowOutAllCandles(){
  const candles = document.querySelectorAll(".candle");
  candles.forEach(c => c.classList.add("extinguished"));
  const statusEl = document.getElementById("cakeStatusText");
  if(statusEl) statusEl.textContent = "All candles blown out in one massive breath! Make a wish! 🎂✨";
  heartBurst();
  showToast("All candles blown out! Happy 20th birthday! 🎂");
}

function sliceCake(){
  const cake = document.getElementById("birthdayCake");
  if(!cake) return;
  cake.style.transform = "scale(0.95) skewX(5deg)";
  setTimeout(() => cake.style.transform = "none", 400);
  showToast("Slice of virtual birthday cake served! 🍰😋");
  heartBurst();
}

function triggerFavEffect(type, event){
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  switch(type){
    case 'spongebob':
      showToast("🍍 SpongeBob laughs: 'Hahaha! I'm ready!' 😂");
      for(let i=0; i<4; i++){
        createFallingElement('🍍', centerX + (Math.random()*80 - 40));
      }
      break;

    case 'squishies':
      showToast("🧸 *Squish!* Bear moving then falling! 🥰");
      for(let i=0; i<5; i++){
        createBearFallAnimation(centerX + (Math.random()*60 - 30), centerY);
      }
      break;

    case 'minions':
      showToast("🍌 BANANA! Many many bananas popping up! 💛");
      for(let i=0; i<15; i++){
        createBananaPopup(Math.random() * window.innerWidth, window.innerHeight * 0.7 + Math.random() * 150);
      }
      break;

    case 'snapea':
      showToast("🌱 Snapea crisp munch fireworks explosion! 💚✨");
      for(let i=0; i < 16; i++){
        createFireworkParticle('🌱', window.innerWidth / 2, window.innerHeight / 2);
      }
      break;

    case 'cinnamon':
      showToast("🥐 Cinnamon rolls appearing and dropping on both sides! 🤎");
      for(let i=0; i<8; i++){
        createSideDropElement('🥐', i % 2 === 0 ? 'left' : 'right');
      }
      break;
  }
  heartBurst();
}

function createFallingElement(emoji, xPos){
  const el = document.createElement("div");
  el.className = "anim-element";
  el.textContent = emoji;
  el.style.left = xPos + "px";
  el.style.top = "50px";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

function createBearFallAnimation(startX, startY){
  const el = document.createElement("div");
  el.className = "float-heart";
  el.textContent = "🧸";
  el.style.left = startX + "px";
  el.style.top = startY + "px";
  el.style.fontSize = "40px";
  el.style.animation = "bearMoveFall 1.8s ease-in-out forwards";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1800);
}

function createBananaPopup(startX, startY){
  const el = document.createElement("div");
  el.className = "float-heart";
  el.textContent = "🍌";
  el.style.left = startX + "px";
  el.style.top = startY + "px";
  el.style.fontSize = "32px";
  
  const angle = (Math.random() - 0.5) * Math.PI;
  const dist = 60 + Math.random() * 100;
  el.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
  el.style.setProperty('--dy', (-80 - Math.random() * 80) + 'px');
  el.style.animation = "bananaPop 1.2s ease-out forwards";
  
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1200);
}

function createFireworkParticle(emoji, startX, startY){
  const el = document.createElement("div");
  el.className = "float-heart";
  el.textContent = emoji;
  el.style.left = startX + "px";
  el.style.top = startY + "px";
  
  const angle = Math.random() * Math.PI * 2;
  const speed = 60 + Math.random() * 150;
  const destX = Math.cos(angle) * speed;
  const destY = Math.sin(angle) * speed;
  
  el.style.setProperty('--dx', destX + 'px');
  el.style.setProperty('--dy', destY + 'px');
  el.style.animation = "fireworkFly 1s ease-out forwards";
  
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

function createSideDropElement(emoji, side){
  const el = document.createElement("div");
  el.className = "anim-element";
  el.textContent = emoji;
  el.style.left = side === 'left' ? (40 + Math.random() * 120) + 'px' : (window.innerWidth - 180 - Math.random() * 120) + 'px';
  el.style.top = '80px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1500);
}

const extraStyles = document.createElement('style');
extraStyles.innerHTML = `
@keyframes bearMoveFall {
  0% { transform: translateY(0) scale(0.6) rotate(0deg); opacity: 0; }
  30% { transform: translateY(-40px) scale(1.2) rotate(-15deg); opacity: 1; }
  60% { transform: translateY(-20px) scale(1.1) rotate(15deg); opacity: 1; }
  100% { transform: translateY(180px) scale(0.9) rotate(45deg); opacity: 0; }
}
@keyframes bananaPop {
  0% { transform: translate(0, 0) scale(0.3); opacity: 0; }
  40% { transform: translate(var(--dx), var(--dy)) scale(1.3); opacity: 1; }
  100% { transform: translate(var(--dx), calc(var(--dy) + 120px)) scale(1); opacity: 0; }
}
`;
document.head.appendChild(extraStyles);

function openPhotoWithHeart(e, src, caption){
  const rect = e.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  for(let i=0; i<10; i++){
    const h = document.createElement("div");
    h.className = "float-heart";
    h.textContent = "💖";
    h.style.left = x + "px";
    h.style.top = y + "px";
    h.style.fontSize = "28px";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2000);
  }

  setTimeout(() => {
    openPhoto(src, caption);
  }, 350);
}

function openPhoto(src,caption){
  const modalImg = document.getElementById("modalImage");
  const modalCap = document.getElementById("modalCaption");
  const modal = document.getElementById("photoModal");
  if(modalImg) modalImg.src = src;
  if(modalCap) modalCap.textContent = caption;
  if(modal) modal.classList.add("show");
}

function openWish(){
  const wishModal = document.getElementById("wishModal");
  if(wishModal) wishModal.classList.add("show");
  heartBurst();
}

function openLetter(){
  const letterModal = document.getElementById("letterModal");
  if(letterModal) letterModal.classList.add("show");
  heartBurst();
}

function closeById(id){
  const el = document.getElementById(id);
  if(el) el.classList.remove("show");
}

function closeModal(e,id){
  if(e.target.id===id) closeById(id);
}

function showToast(t){
  const x=document.getElementById("toast");
  if(!x) return;
  x.textContent=t;
  x.classList.add("show");
  setTimeout(()=>x.classList.remove("show"),2800);
}

function miniHeart(card){
 const r=card.getBoundingClientRect();
 const h=document.createElement("div");
 h.className="float-heart";
 h.textContent="♡";
 h.style.left=(r.left+r.width/2)+"px";
 h.style.top=(r.top+r.height/2)+"px";
 h.style.fontSize="28px";
 document.body.appendChild(h);
 setTimeout(()=>h.remove(),2200);
}

function heartBurst(){
 for(let i=0;i<25;i++){
   const h=document.createElement("div");
   h.className="float-heart";
   h.textContent=["♥","♡","✦","💗","✨","🍍","🍌","🌱","🥐"][Math.floor(Math.random()*9)];
   h.style.left=(15+Math.random()*70)+"vw";
   h.style.top=(50+Math.random()*30)+"vh";
   h.style.fontSize=(16+Math.random()*28)+"px";
   h.style.animationDelay=(Math.random()*0.4)+"s";
   document.body.appendChild(h);
   setTimeout(()=>h.remove(),2400);
 }
}

const diaryEntries = [
  {
    title: "The Day Everything Changed",
    text: "I didn't know it back then, but meeting you would completely redefine what happiness means to me. Everything felt brighter from that exact afternoon onwards."
  },
  {
    title: "The Moment You Smiled",
    text: "That one specific time when you laughed so hard you couldn't even speak? That became my favorite memory instantly. Your laughter is my favorite sound in the world."
  },
  {
    title: "Today: Turning 20",
    text: "Look at you now, stepping into your 20s so gracefully. I am endlessly proud of the person you are, the heart you carry, and everything you are yet to achieve. Happy birthday, my love!"
  }
];

function switchDiary(index){
  const tabs = document.querySelectorAll(".diary-tab");
  tabs.forEach((tab, i) => {
    if(i === index) tab.classList.add("active");
    else tab.classList.remove("active");
  });
  
  const contentBox = document.getElementById("diaryContent");
  if(contentBox && diaryEntries[index]){
    contentBox.innerHTML = `<h3>${diaryEntries[index].title}</h3><p>${diaryEntries[index].text}</p>`;
  }
}

function saveNotebook(){
  const val = document.getElementById("userNotebookInput").value.trim();
  if(!val){
    showToast("Type something first before saving! ♡");
    return;
  }
  let notes = JSON.parse(localStorage.getItem("birthdayNotesList") || "[]");
  notes.unshift({ id: Date.now(), text: val });
  localStorage.setItem("birthdayNotesList", JSON.stringify(notes));
  
  document.getElementById("userNotebookInput").value = "";
  renderSavedNotes();
  showToast("Note saved to history! 💾");
  heartBurst();
}

function deleteNotebookNote(id){
  let notes = JSON.parse(localStorage.getItem("birthdayNotesList") || "[]");
  notes = notes.filter(n => n.id !== id);
  localStorage.setItem("birthdayNotesList", JSON.stringify(notes));
  renderSavedNotes();
  showToast("Note deleted");
}

function loadNoteToEditor(text){
  document.getElementById("userNotebookInput").value = text;
  showToast("Note loaded into editor 📖");
}

function renderSavedNotes(){
  const container = document.getElementById("savedNotesList");
  if(!container) return;
  const notes = JSON.parse(localStorage.getItem("birthdayNotesList") || "[]");
  
  if(notes.length === 0){
    container.innerHTML = `<p class="no-notes-msg">No saved notes yet.</p>`;
    return;
  }
  
  container.innerHTML = "";
  notes.forEach(note => {
    const item = document.createElement("div");
    item.className = "saved-note-item";
    
    const textSpan = document.createElement("div");
    textSpan.className = "saved-note-text";
    textSpan.textContent = note.text.length > 50 ? note.text.substring(0, 50) + "..." : note.text;
    textSpan.onclick = () => loadNoteToEditor(note.text);
    
    const delBtn = document.createElement("button");
    delBtn.className = "delete-note-btn";
    delBtn.innerHTML = "🗑️";
    delBtn.title = "Delete note";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteNotebookNote(note.id);
    };
    
    item.appendChild(textSpan);
    item.appendChild(delBtn);
    container.appendChild(item);
  });
}

function clearNotebook(){
  document.getElementById("userNotebookInput").value = "";
  showToast("Editor cleared");
}

let currentRating = 5;
function setRating(stars){
  currentRating = stars;
  const starEls = document.querySelectorAll(".rating-stars span");
  starEls.forEach((el, i) => {
    if(i < stars) el.classList.add("active");
    else el.classList.remove("active");
  });
}

function submitFeedback(){
  const comment = document.getElementById("feedbackComment").value.trim();
  if(!comment){
    showToast("Please write a small comment first ♡");
    return;
  }
  const thankEl = document.getElementById("feedbackThankYou");
  if(thankEl) thankEl.classList.add("show");
  showToast("Thank you for your sweet feedback! 🚀");
  heartBurst();
}

document.addEventListener("mousemove",e=>{
 const g=document.getElementById("cursorGlow");
 if(g){
   g.style.left=e.clientX+"px";
   g.style.top=e.clientY+"px";
 }
});

window.addEventListener("DOMContentLoaded", () => {
  initReasons();
  renderSavedNotes();

  const particleContainer = document.getElementById("particles");
  if(particleContainer){
    for(let i=0;i<40;i++){
      const p=document.createElement("div");
      p.textContent=Math.random()>0.4?"✦":"·";
      p.style.position="fixed";
      p.style.left=Math.random()*100+"vw";
      p.style.top=Math.random()*100+"vh";
      p.style.color="#ef9bb555";
      p.style.fontSize=(8+Math.random()*16)+"px";
      p.style.pointerEvents="none";
      p.style.zIndex="0";
      p.style.animation=`pulse ${2+Math.random()*4}s infinite ease-in-out`;
      particleContainer.appendChild(p);
    }
  }
});

let gameInterval;
let gameTimerInterval;
let score = 0;
let timeLeft = 60;
let isPlaying = false;

function startGame(){
  const arena = document.getElementById("gameArena");
  const startBtn = document.getElementById("startGameBtn");
  const overlayMsg = document.getElementById("gameOverlayMsg");
  
  if(!arena) return;
  
  score = 0;
  timeLeft = 60;
  isPlaying = true;
  startBtn.style.display = "none";
  overlayMsg.style.display = "none";
  document.getElementById("gameScore").textContent = score;
  document.getElementById("gameTimer").textContent = timeLeft;

  document.querySelectorAll(".falling-target").forEach(el => el.remove());

  gameInterval = setInterval(()=>{
    if(!isPlaying) return;
    const target = document.createElement("div");
    target.className = "falling-target";
    target.textContent = ["🍍","🧸","🍌","🌱","🥐","💖","✨","🎁"][Math.floor(Math.random()*8)];
    target.style.left = (30 + Math.random()*(arena.clientWidth - 80)) + "px";
    target.style.top = "-20px";
    target.style.animationDuration = (1.5 + Math.random()*1.5) + "s";
    
    target.onclick = () => {
      if(!isPlaying) return;
      score++;
      document.getElementById("gameScore").textContent = score;
      target.remove();
      miniHeart(target);
    };

    arena.appendChild(target);
    setTimeout(() => { if(target.parentNode) target.remove(); }, 3000);
  }, 500);

  gameTimerInterval = setInterval(()=>{
    timeLeft--;
    const timerEl = document.getElementById("gameTimer");
    if(timerEl) timerEl.textContent = timeLeft;
    
    if(timeLeft <= 0){
      clearInterval(gameInterval);
      clearInterval(gameTimerInterval);
      isPlaying = false;
      startBtn.style.display = "inline-block";
      startBtn.textContent = "Play Again ♡";
      overlayMsg.style.display = "block";
      overlayMsg.textContent = `Game Over! You caught ${score} favorite items in 1 minute! Amazing job! 🎉`;
      heartBurst();
    }
  }, 1000);
}

document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){
    ["photoModal","wishModal","letterModal"].forEach(closeById);
  }
});