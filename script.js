const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const navToggle=document.getElementById("navToggle");
const navLinks=document.getElementById("navLinks");
const header=document.querySelector(".site-header");
const typingText=document.getElementById("typingText");

const stored=localStorage.getItem("theme");
if(stored){root.dataset.theme=stored}
else if(matchMedia("(prefers-color-scheme: light)").matches){root.dataset.theme="light"}

themeToggle.addEventListener("click",()=>{
  const next=root.dataset.theme==="light"?"dark":"light";
  root.dataset.theme=next;localStorage.setItem("theme",next)
});

navToggle.addEventListener("click",()=>{
  const open=navLinks.classList.toggle("open");
  navToggle.classList.toggle("active",open);
  navToggle.setAttribute("aria-expanded",String(open))
});

document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{
  navLinks.classList.remove("open");navToggle.classList.remove("active");navToggle.setAttribute("aria-expanded","false")
}));

addEventListener("scroll",()=>header.classList.toggle("scrolled",scrollY>12),{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
  })
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const words=["constant learner","problem solver","software builder","competitive programmer","curious human"];
let i=0;
setInterval(()=>{
  i=(i+1)%words.length;
  typingText.animate([{opacity:1},{opacity:0},{opacity:1}],{duration:420});
  setTimeout(()=>typingText.textContent=words[i],205)
},2800);

document.getElementById("year").textContent=new Date().getFullYear();
