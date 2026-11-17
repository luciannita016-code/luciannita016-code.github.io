const items = [
  {file:"bulevar_dia_pixel.png",group:"world",title:"Boulevard · Vista de día",tag:"ESCENARIO"},
  {file:"bulevar_rio_pixel.png",group:"world",title:"Boulevard · Vista al río",tag:"ESCENARIO"},
  {file:"fondo-nivel-3-iglesia-matriz.png",group:"world",title:"Iglesia Matriz",tag:"NIVEL 02"},
  {file:"fondo-nivel-4-puente-nanay.png",group:"world",title:"Puente Nanay",tag:"NIVEL 03"},
  {file:"heroina-quieta-v2.png",group:"ana",title:"Ana · En espera",tag:"PERSONAJE"},
  {file:"heroina-corriendo-v2.png",group:"ana",title:"Ana · Corriendo",tag:"ANIMACIÓN"},
  {file:"heroina-saltando-v2.png",group:"ana",title:"Ana · Saltando",tag:"ANIMACIÓN"},
  {file:"heroina-agachada-v2.png",group:"ana",title:"Ana · Agachada",tag:"ANIMACIÓN"},
  {file:"heroina-rescatando-v2.png",group:"ana",title:"Ana · Rescatando",tag:"ANIMACIÓN"},
  {file:"heroina-ahuyentando-v2.png",group:"ana",title:"Ana · Ahuyentando",tag:"ANIMACIÓN"},
  {file:"perro-rescate-v2.png",group:"animals",title:"Perrito · Rescate",tag:"ANIMAL"},
  {file:"gato-rescate-v2.png",group:"animals",title:"Gatito · Rescate",tag:"ANIMAL"},
  {file:"paloma-enemiga-v2.png",group:"extra",title:"Paloma · Obstáculo",tag:"PERSONAJE"},
  {file:"indigente-obstaculo-v2.png",group:"extra",title:"Obstáculo del camino",tag:"PERSONAJE"}
];
const grid=document.getElementById("galleryGrid");
const filters=[...document.querySelectorAll(".filter")];
let visibleItems=items.slice(), currentIndex=0;
function renderGallery(group="all"){
  visibleItems=items.filter(x=>group==="all"||x.group===group);
  grid.innerHTML="";
  visibleItems.forEach((item,index)=>{
    const card=document.createElement("button");
    card.type="button";
    card.className=`gallery-item ${item.group}`;
    card.setAttribute("aria-label",`Ampliar ${item.title}`);
    const thumb=document.createElement("div");thumb.className="gallery-thumb";
    const img=document.createElement("img");img.src=`assets/${item.file}`;img.alt=item.title;img.loading="lazy";
    img.onerror=()=>{thumb.innerHTML=`<div class="gallery-fallback"><b>🐾</b><span>${item.title}</span></div>`;};
    const zoom=document.createElement("span");zoom.className="gallery-zoom";zoom.textContent="↗";
    thumb.append(img,zoom);
    const caption=document.createElement("div");caption.className="gallery-caption";
    const title=document.createElement("b");title.textContent=item.title;
    const tag=document.createElement("span");tag.textContent=item.tag;
    caption.append(title,tag);card.append(thumb,caption);
    card.addEventListener("click",()=>openLightbox(index));grid.append(card);
  });
  const count=document.querySelector('[data-filter="all"] span');if(count)count.textContent=items.length;
}
filters.forEach(btn=>btn.addEventListener("click",()=>{
  filters.forEach(x=>x.classList.toggle("active",x===btn));
  renderGallery(btn.dataset.filter);
}));
const lightbox=document.getElementById("lightbox");
const lbImg=lightbox.querySelector("img"), lbCaption=lightbox.querySelector("figcaption");
function openLightbox(index){currentIndex=index;updateLightbox();lightbox.classList.add("open");lightbox.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function updateLightbox(){const item=visibleItems[currentIndex];if(!item)return;lbImg.src=`assets/${item.file}`;lbImg.alt=item.title;lbCaption.textContent=item.title;}
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");document.body.style.overflow="";}
function moveLightbox(delta){currentIndex=(currentIndex+delta+visibleItems.length)%visibleItems.length;updateLightbox();}
lightbox.querySelector(".lightbox-close").addEventListener("click",closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click",()=>moveLightbox(-1));
lightbox.querySelector(".lightbox-next").addEventListener("click",()=>moveLightbox(1));
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="Escape")closeLightbox();if(e.key==="ArrowLeft")moveLightbox(-1);if(e.key==="ArrowRight")moveLightbox(1);});
const menuBtn=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menuBtn.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuBtn.setAttribute("aria-expanded",String(open));menuBtn.textContent=open?"×":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuBtn.setAttribute("aria-expanded","false");menuBtn.textContent="☰";}));
renderGallery();
