
const COLORS = {
  1: {name:"Lavender",hex:"#b99be8"},
  2: {name:"Rose",hex:"#e99bb7"},
  3: {name:"Sunshine",hex:"#f2ca70"},
  4: {name:"Leaf",hex:"#8ebd98"},
  5: {name:"Ocean",hex:"#83b5dc"},
  6: {name:"Peach",hex:"#e9a16e"},
  7: {name:"Cream",hex:"#f1e4c5"},
  8: {name:"Coral",hex:"#df777c"}
};

const MYSTERY = [
 {id:"cat",title:"Little Cat",difficulty:"easy",size:16,art:[
 "................",
 "......22..22....",
 ".....22222222...",
 "....2222222222..",
 "...222222222222.",
 "...222222222222.",
 "..22222222222222",
 "..22222222222222",
 "..22222222222222",
 "..22222222222222",
 "...222222222222.",
 "...222222222222.",
 "....2222222222..",
 ".....22222222...",
 "......222222....",
 "................"
 ],map:{2:2}},
 {id:"heart",title:"Secret Heart",difficulty:"easy",size:16,art:[
 "................",
 "...22......22...",
 "..2222....2222..",
 ".222222..222222.",
 ".22222222222222.",
 ".22222222222222.",
 "..222222222222..",
 "...2222222222...",
 "....22222222....",
 ".....222222.....",
 "......2222......",
 ".......22.......",
 "........2.......",
 "................",
 "................",
 "................"
 ],map:{2:2}},
 {id:"flower",title:"Blooming Flower",difficulty:"medium",size:16,art:[
 ".......222......",
 "......22222.....",
 ".....2222222....",
 "......22222.....",
 ".......222......",
 "........3.......",
 "........4.......",
 "........4.......",
 ".....444444.....",
 "....44...44.....",
 "...44.....44....",
 "................",
 "................",
 "................",
 "................",
 "................"
 ],map:{2:2,3:3,4:4}},
 {id:"rocket",title:"Space Rocket",difficulty:"medium",size:16,art:[
 ".......11.......",
 "......1111......",
 ".....111111.....",
 ".....111111.....",
 ".....115111.....",
 ".....111111.....",
 ".....111111.....",
 ".....111111.....",
 ".....111111.....",
 ".....111111.....",
 "....11..11......",
 "...11....11.....",
 "..11......11....",
 ".......66.......",
 "......6666......",
 ".....666666....."
 ],map:{1:1,5:5,6:6}},
 {id:"fish",title:"Ocean Friend",difficulty:"hard",size:20,art:[
 "....................",
 "....................",
 ".......555..........",
 ".....555555.........",
 "...5555555555.......",
 "..555555555555......",
 ".555555555555555....",
 ".5555555555555555...",
 ".55555555555555555..",
 ".5555555555555555...",
 ".555555555555555....",
 "..555555555555......",
 "...5555555555.......",
 ".....555555.........",
 ".......555..........",
 "....................",
 "....................",
 "....................",
 "....................",
 "...................."
 ],map:{5:5}},
 {id:"sun",title:"Sunshine",difficulty:"easy",size:16,art:[
 ".......333......",
 "....333333333...",
 "...33333333333..",
 "..3333333333333.",
 ".333333333333333",
 ".333333333333333",
 ".333333333333333",
 ".333333333333333",
 ".333333333333333",
 ".333333333333333",
 ".333333333333333",
 "..3333333333333.",
 "...33333333333..",
 "....333333333...",
 ".......333......",
 "................"
 ],map:{3:3}}
];

const CLASSIC = [
 {id:"flower",title:"Garden Flower",difficulty:"easy",colors:[1,2,3,4],regions:[
  {id:"petal1",d:"M150 105 C95 45 40 100 105 160 Q140 155 150 105Z",color:2,label:[105,112]},
  {id:"petal2",d:"M150 105 C105 35 180 15 170 100 Q165 120 150 105Z",color:1,label:[154,75]},
  {id:"petal3",d:"M150 105 C210 45 260 110 190 160 Q160 155 150 105Z",color:2,label:[198,115]},
  {id:"petal4",d:"M150 105 C220 150 200 220 150 165 Q140 135 150 105Z",color:1,label:[179,171]},
  {id:"petal5",d:"M150 105 C100 165 95 220 150 165 Q165 135 150 105Z",color:2,label:[121,171]},
  {id:"center",d:"M150 105 C170 80 205 110 185 135 C165 160 130 140 135 115Z",color:3,label:[165,119]},
  {id:"stem",d:"M145 145 Q150 210 142 265 L160 265 Q154 205 158 145Z",color:4,label:[151,225]},
  {id:"leaf1",d:"M148 205 Q80 155 70 210 Q105 245 148 205Z",color:4,label:[108,204]},
  {id:"leaf2",d:"M153 225 Q220 170 232 220 Q200 260 153 225Z",color:4,label:[196,222]}
 ]},
 {id:"butterfly",title:"Colorful Butterfly",difficulty:"medium",colors:[1,2,3,5],regions:[
  {id:"lefttop",d:"M145 135 C65 15 10 60 55 155 Q100 185 145 135Z",color:1,label:[77,105]},
  {id:"leftbottom",d:"M145 145 C75 150 55 255 110 235 Q145 210 145 145Z",color:2,label:[103,193]},
  {id:"righttop",d:"M155 135 C235 15 290 60 245 155 Q200 185 155 135Z",color:3,label:[222,105]},
  {id:"rightbottom",d:"M155 145 C225 150 245 255 190 235 Q155 210 155 145Z",color:5,label:[197,193]},
  {id:"body",d:"M145 80 Q150 60 155 80 L158 230 Q150 250 142 230Z",color:3,label:[150,185]},
  {id:"head",d:"M140 80 Q150 60 160 80 Q165 100 150 105 Q135 100 140 80Z",color:1,label:[150,83]},
  {id:"wingdetail1",d:"M75 100 Q105 65 125 125 Q100 150 75 100Z",color:5,label:[101,111]},
  {id:"wingdetail2",d:"M225 100 Q195 65 175 125 Q200 150 225 100Z",color:2,label:[199,111]}
 ]},
 {id:"mandala",title:"Mandala Garden",difficulty:"hard",colors:[1,2,3,4,5],regions:[
  {id:"outer1",d:"M150 12 Q210 65 150 105 Q90 65 150 12Z",color:1,label:[150,54]},
  {id:"outer2",d:"M288 150 Q235 210 195 150 Q235 90 288 150Z",color:2,label:[244,150]},
  {id:"outer3",d:"M150 288 Q90 235 150 195 Q210 235 150 288Z",color:3,label:[150,244]},
  {id:"outer4",d:"M12 150 Q65 90 105 150 Q65 210 12 150Z",color:4,label:[56,150]},
  {id:"diag1",d:"M52 52 Q125 55 150 105 Q95 125 52 52Z",color:5,label:[92,83]},
  {id:"diag2",d:"M248 52 Q175 55 150 105 Q205 125 248 52Z",color:3,label:[208,83]},
  {id:"diag3",d:"M248 248 Q175 245 150 195 Q205 175 248 248Z",color:1,label:[208,218]},
  {id:"diag4",d:"M52 248 Q125 245 150 195 Q95 175 52 248Z",color:2,label:[92,218]},
  {id:"center",d:"M150 105 Q195 105 195 150 Q195 195 150 195 Q105 195 105 150 Q105 105 150 105Z",color:4,label:[150,150]}
 ]}
];

const $ = s => document.querySelector(s);
const allPuzzles = [
 ...MYSTERY.map(p=>({...p,mode:"mystery"})),
 ...CLASSIC.map(p=>({...p,mode:"classic"}))
];

let mode="mystery";
let puzzle=null;
let selected=1;
let erasing=false;
let numbers=true;
let zoom=1;
let history=[];
let historyIndex=-1;
let fills={};
let filter="all";
let toastTimer;

function toast(message){
 const el=$("#toast");
 el.textContent=message;
 el.classList.add("show");
 clearTimeout(toastTimer);
 toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}

function showSection(id){
 ["gallery-section","studio","artwork-section"].forEach(x=>$("#"+x).classList.add("hidden"));
 if(id)$("#"+id).classList.remove("hidden");
}

function enterMode(next){
 mode=next;
 filter="all";
 $(".how-section").classList.remove("hidden");
 $("#gallery-label").textContent=next==="mystery"?"THE HIDDEN COLLECTION":"THE ILLUSTRATION COLLECTION";
 $("#gallery-title").textContent=next==="mystery"?"Mystery puzzles":"Classic coloring pages";
 $("#filters").querySelectorAll("button").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
 showSection("gallery-section");
 renderGallery();
 $("#gallery-section").scrollIntoView({behavior:"smooth"});
}

function renderGallery(){
 const grid=$("#puzzle-grid");
 grid.innerHTML="";
 allPuzzles.filter(p=>p.mode===mode&&(filter==="all"||p.difficulty===filter)).forEach(p=>{
  const card=document.createElement("button");
  card.className="puzzle-card";
  const thumb=document.createElement("div");
  thumb.className="puzzle-thumb";
  if(p.mode==="mystery"){
   const canvas=document.createElement("canvas");
   canvas.width=p.size;canvas.height=p.size;
   const ctx=canvas.getContext("2d");
   const cell=canvas.width/p.size;
   p.art.forEach((row,y)=>[...row].forEach((v,x)=>{
    ctx.fillStyle=v==="."?"#292634":"#393247";
    ctx.fillRect(x*cell,y*cell,cell,cell);
    if(v!=="."){
     ctx.fillStyle="#e4d5ff";ctx.font="bold 9px Arial";
     ctx.textAlign="center";ctx.textBaseline="middle";
     ctx.fillText(v,x*cell+cell/2,y*cell+cell/2);
    }
   }));
   thumb.append(canvas);
  }else{
   const icon=document.createElement("span");
   icon.className="thumb-flower";
   icon.textContent=p.id==="butterfly"?"🦋":p.id==="mandala"?"❀":"✿";
   thumb.append(icon);
  }
  const info=document.createElement("div");info.className="puzzle-info";
  const h=document.createElement("h3");h.textContent=p.title;
  const desc=document.createElement("p");
  desc.textContent=p.mode==="mystery"?"Reveal the hidden picture one number at a time.":"Color individual outlined regions in this illustration.";
  const meta=document.createElement("div");meta.className="puzzle-meta";
  meta.innerHTML=`<span>${p.difficulty}</span><span>${p.mode==="mystery"?p.size+" × "+p.size:"SVG illustration"}</span>`;
  info.append(h,desc,meta);card.append(thumb,info);
  card.addEventListener("click",()=>startPuzzle(p.id,p.mode));
  grid.append(card);
 });
}

function getPuzzle(id,kind){return allPuzzles.find(p=>p.id===id&&p.mode===kind)}

function startPuzzle(id,kind){
 puzzle=getPuzzle(id,kind);
 fills=loadProgress(puzzle);
 selected=puzzle.mode==="mystery"?Number(Object.keys(puzzle.map)[0]):puzzle.colors[0];
 erasing=false;numbers=true;zoom=1;
 history=[];historyIndex=-1;
 saveHistory();
 $("#studio-title").textContent=puzzle.title;
 $("#studio-mode").textContent=kind==="mystery"?"MYSTERY COLOR":"CLASSIC COLOR";
 $("#workspace-type").textContent=kind==="mystery"?"PIXEL MYSTERY GRID":"ILLUSTRATED COLORING PAGE";
 $("#completion").classList.add("hidden");
 showSection("studio");
 renderPalette();
 renderArtwork();
 updateProgress();
 $("#studio").scrollIntoView({behavior:"smooth"});
}

function loadProgress(p){
 try{return JSON.parse(localStorage.getItem("colorstudio-progress-"+p.id))||{}}
 catch{return {}}
}

function saveProgress(){
 if(!puzzle)return;
 localStorage.setItem("colorstudio-progress-"+puzzle.id,JSON.stringify(fills));
}

function getColors(){
 return puzzle.mode==="mystery"
  ? Object.entries(puzzle.map).map(([number,color])=>({number:Number(number),color,name:COLORS[color].name,hex:COLORS[color].hex}))
  : puzzle.colors.map(n=>({number:n,color:n,name:COLORS[n].name,hex:COLORS[n].hex}));
}

function renderPalette(){
 const box=$("#palette");box.innerHTML="";
 getColors().forEach(item=>{
  const button=document.createElement("button");
  button.className="palette-choice";
  button.dataset.number=item.number;
  button.innerHTML=`<span class="color-dot" style="background:${item.hex}"></span><span>${item.name}</span><strong>${item.number}</strong>`;
  button.addEventListener("click",()=>{
   selected=item.number;erasing=false;updatePalette();updateInstruction();
  });
  box.append(button);
 });
 updatePalette();
}

function updatePalette(){
 $("#current-number").textContent=erasing?"⌫":selected;
 document.querySelectorAll(".palette-choice").forEach(b=>{
  const n=Number(b.dataset.number);
  b.classList.toggle("selected",n===selected&&!erasing);
  const total=totalFor(n);
  const done=Object.values(fills).filter(v=>v===n).length;
  b.classList.toggle("completed",total>0&&done>=total);
 });
}

function updateInstruction(){
 $("#workspace-instruction").textContent=erasing?"Select a colored area to erase":`Selected color ${selected} — find matching areas`;
}

function totalFor(n){
 if(puzzle.mode==="mystery"){
  return puzzle.art.reduce((sum,row)=>sum+[...row].filter(v=>Number(v)===n).length,0);
 }
 return puzzle.regions.filter(r=>r.color===n).length;
}

function renderArtwork(){
 const content=$("#canvas-content");
 content.innerHTML="";
 content.style.transform=`scale(${zoom})`;
 if(puzzle.mode==="mystery")renderMystery(content);
 else renderClassic(content);
}

function renderMystery(content){
 const grid=document.createElement("div");
 grid.className="pixel-grid";
 grid.style.gridTemplateColumns=`repeat(${puzzle.size},1fr)`;
 puzzle.art.forEach((row,y)=>[...row].forEach((char,x)=>{
  const cell=document.createElement("button");
  cell.className="pixel-cell";
  const key=`${y}-${x}`;
  if(char==="."){
   cell.classList.add("blank");cell.disabled=true;
  }else{
   const answer=puzzle.map[Number(char)]??Number(char);
   if(fills[key]){
    cell.style.background=COLORS[fills[key]].hex;
    cell.classList.add("filled");
   }else if(numbers){
    cell.textContent=char;
   }
   cell.setAttribute("aria-label",`Row ${y+1}, column ${x+1}, number ${char}`);
   cell.addEventListener("click",()=>paint(key,answer,cell));
  }
  grid.append(cell);
 }));
 content.append(grid);
}

function renderClassic(content){
 const ns="http://www.w3.org/2000/svg";
 const svg=document.createElementNS(ns,"svg");
 svg.setAttribute("viewBox","0 0 300 300");
 svg.setAttribute("class","classic-svg");
 puzzle.regions.forEach(region=>{
  const path=document.createElementNS(ns,"path");
  path.setAttribute("d",region.d);
  path.setAttribute("class","region");
  path.setAttribute("fill",fills[region.id]?COLORS[fills[region.id]].hex:"#fffdf8");
  path.addEventListener("click",()=>paint(region.id,region.color,path));
  svg.append(path);
  if(numbers&&!fills[region.id]){
   const label=document.createElementNS(ns,"text");
   label.setAttribute("x",region.label[0]);
   label.setAttribute("y",region.label[1]);
   label.setAttribute("class","region-label");
   label.textContent=region.color;
   svg.append(label);
  }
 });
 content.append(svg);
}

function paint(key,answer,target){
 if(erasing){
  if(!fills[key])return;
  delete fills[key];saveHistory();renderArtwork();updateProgress();return;
 }
 if(fills[key])return;
 if(selected!==answer){
  target.classList.add("wrong");
  setTimeout(()=>target.classList.remove("wrong"),250);
  toast("That section needs another color.");
  return;
 }
 fills[key]=selected;
 saveHistory();
 saveProgress();
 renderArtwork();
 updateProgress();
 updatePalette();
}

function updateProgress(){
 if(!puzzle)return;
 const total=puzzle.mode==="mystery"
  ? puzzle.art.reduce((s,row)=>s+[...row].filter(c=>c!==".").length,0)
  : puzzle.regions.length;
 const done=Object.keys(fills).length;
 const percent=Math.round(done/total*100);
 $("#progress-value").textContent=percent+"%";
 $("#progress-fill").style.width=percent+"%";
 $("#cell-count").textContent=`${done} / ${total} areas colored`;
 $("#progress-caption").textContent=percent===100?"Every area is complete!":percent>50?"Your artwork is taking shape!":"Every color brings you closer.";
 if(percent===100)finishPuzzle();
}

function finishPuzzle(){
 $("#completion").classList.remove("hidden");
 $("#completion-title").textContent=puzzle.mode==="mystery"?"Mystery revealed!":"Beautifully finished!";
 $("#completion-text").textContent=`You completed ${puzzle.title}. Your artwork is ready to save!`;
 saveArtwork();
}

function saveHistory(){
 const snapshot=JSON.stringify(fills);
 history=history.slice(0,historyIndex+1);
 history.push(snapshot);
 if(history.length>60)history.shift();
 historyIndex=history.length-1;
}

function restoreHistory(index){
 if(index<0||index>=history.length)return;
 historyIndex=index;
 fills=JSON.parse(history[historyIndex]);
 saveProgress();
 renderArtwork();updateProgress();updatePalette();
}

function undo(){if(historyIndex>0)restoreHistory(historyIndex-1);else toast("Nothing to undo.");}
function redo(){if(historyIndex<history.length-1)restoreHistory(historyIndex+1);else toast("Nothing to redo.");}

function resetPuzzle(){
 if(!puzzle)return;
 if(!confirm("Reset all coloring for this puzzle?"))return;
 fills={};localStorage.removeItem("colorstudio-progress-"+puzzle.id);
 history=[];historyIndex=-1;saveHistory();
 $("#completion").classList.add("hidden");
 renderArtwork();updateProgress();updatePalette();toast("Puzzle reset.");
}

function giveHint(){
 if(!puzzle)return;
 if(puzzle.mode==="mystery"){
  for(let y=0;y<puzzle.size;y++){
   for(let x=0;x<puzzle.size;x++){
    const key=`${y}-${x}`,char=puzzle.art[y][x];
    if(char!=="."&&!fills[key]){
     selected=puzzle.map[Number(char)]??Number(char);
     erasing=false;updatePalette();updateInstruction();
     toast(`Hint: look for number ${char}.`);
     const cells=$$(".pixel-cell");
     const index=y*puzzle.size+x;
     cells[index]?.scrollIntoView({behavior:"smooth",block:"nearest"});
     return;
    }
   }
  }
 }else{
  const region=puzzle.regions.find(r=>!fills[r.id]);
  if(region){
   selected=region.color;erasing=false;updatePalette();updateInstruction();
   toast(`Hint: look for color ${selected}.`);
   return;
  }
 }
 toast("All sections are colored!");
}

function toggleNumbers(){
 numbers=!numbers;renderArtwork();
 toast(numbers?"Numbers shown.":"Numbers hidden.");
}

function changeZoom(amount){
 zoom=Math.max(.65,Math.min(2.2,zoom+amount));
 $("#canvas-content").style.transform=`scale(${zoom})`;
}

function createPrint(){
 if(!puzzle)return;
 const old=document.querySelector(".print-output");old?.remove();
 const sheet=document.createElement("section");
 sheet.className="print-output";
 const title=document.createElement("h1");title.textContent="Color Studio — "+puzzle.title;
 const note=document.createElement("p");note.textContent="Color each numbered area using the matching color in the key. The picture is a surprise!";
 sheet.append(title,note);
 if(puzzle.mode==="mystery"){
  const grid=document.createElement("div");grid.className="print-grid";
  grid.style.gridTemplateColumns=`repeat(${puzzle.size},1fr)`;
  puzzle.art.forEach(row=>[...row].forEach(char=>{
   const cell=document.createElement("div");cell.className="print-cell";
   cell.textContent=char==="."?"":char;
   grid.append(cell);
  }));
  sheet.append(grid);
 }else{
  const holder=document.createElement("div");
  const clone=document.querySelector(".classic-svg")?.cloneNode(true);
  if(clone){
   clone.querySelectorAll(".region").forEach(p=>p.setAttribute("fill","white"));
   clone.querySelectorAll(".region-label").forEach(t=>t.setAttribute("fill","black"));
   holder.append(clone);
  }
  sheet.append(holder);
 }
 const heading=document.createElement("h2");heading.textContent="Color key";
 const key=document.createElement("div");key.className="print-key";
 getColors().forEach(item=>{
  const entry=document.createElement("div");entry.className="print-key-item";
  const swatch=document.createElement("span");swatch.className="swatch";swatch.style.background=item.hex;
  const label=document.createElement("span");label.textContent=`${item.number} — ${item.name}`;
  entry.append(swatch,label);key.append(entry);
 });
 sheet.append(heading,key);
 document.body.append(sheet);
 window.print();
 setTimeout(()=>sheet.remove(),1200);
}

function makeSVG(){
 const ns="http://www.w3.org/2000/svg";
 const svg=document.createElementNS(ns,"svg");
 if(puzzle.mode==="classic"){
  svg.setAttribute("viewBox","0 0 300 300");
  puzzle.regions.forEach(r=>{
   const path=document.createElementNS(ns,"path");
   path.setAttribute("d",r.d);
   path.setAttribute("fill",fills[r.id]?COLORS[fills[r.id]].hex:"#fffdf8");
   path.setAttribute("stroke","#26212b");path.setAttribute("stroke-width","2.5");
   svg.append(path);
  });
 }else{
  const cell=20;
  svg.setAttribute("viewBox",`0 0 ${puzzle.size*cell} ${puzzle.size*cell}`);
  puzzle.art.forEach((row,y)=>[...row].forEach((char,x)=>{
   if(char===".")return;
   const key=`${y}-${x}`,answer=puzzle.map[Number(char)]??Number(char);
   const rect=document.createElementNS(ns,"rect");
   rect.setAttribute("x",x*cell);rect.setAttribute("y",y*cell);
   rect.setAttribute("width",cell);rect.setAttribute("height",cell);
   rect.setAttribute("fill",fills[key]?COLORS[fills[key]].hex:"#fffdf8");
   rect.setAttribute("stroke","#777");rect.setAttribute("stroke-width",".5");
   svg.append(rect);
  }));
 }
 return svg;
}

function downloadPNG(){
 if(!puzzle)return;
 const svg=makeSVG();
 const serializer=new XMLSerializer();
 const source=serializer.serializeToString(svg);
 const blob=new Blob([source],{type:"image/svg+xml;charset=utf-8"});
 const url=URL.createObjectURL(blob);
 const img=new Image();
 img.onload=()=>{
  const canvas=document.createElement("canvas");
  canvas.width=900;canvas.height=900;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#fffdf8";ctx.fillRect(0,0,900,900);
  ctx.drawImage(img,0,0,900,900);
  URL.revokeObjectURL(url);
  const a=document.createElement("a");
  a.download=puzzle.id+"-color-studio.png";
  a.href=canvas.toDataURL("image/png");a.click();
  toast("Artwork downloaded!");
 };
 img.onerror=()=>{URL.revokeObjectURL(url);toast("Could not export this image.");};
 img.src=url;
}

function saveArtwork(){
 const key="colorstudio-completed";
 let items=[];
 try{items=JSON.parse(localStorage.getItem(key))||[]}catch{}
 if(!items.some(item=>item.id===puzzle.id)){
  items.push({id:puzzle.id,title:puzzle.title,mode:puzzle.mode,date:new Date().toLocaleDateString()});
  localStorage.setItem(key,JSON.stringify(items));
 }
}

function showArtwork(){
 showSection("artwork-section");
 const grid=$("#saved-grid");grid.innerHTML="";
 let items=[];
 try{items=JSON.parse(localStorage.getItem("colorstudio-completed"))||[]}catch{}
 if(!items.length){grid.textContent="Your completed puzzles will appear here.";return;}
 items.forEach(item=>{
  const card=document.createElement("div");card.className="saved-card";
  const image=document.createElement("div");
  image.style.height="130px";image.style.display="grid";image.style.placeItems="center";image.style.fontSize="65px";image.style.background="#292437";
  image.textContent=item.mode==="mystery"?"✦":"✿";
  const info=document.createElement("div");info.textContent=item.title+" · "+item.date;
  card.append(image,info);grid.append(card);
 });
}

function $$(s){return [...document.querySelectorAll(s)]}

// Navigation
$$(".mode-card").forEach(card=>card.addEventListener("click",()=>enterMode(card.dataset.mode)));
$("#gallery-back").addEventListener("click",()=>{
 showSection(null);$(".how-section").classList.remove("hidden");
 $("#collections").scrollIntoView({behavior:"smooth"});
});
$("#filters").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
 filter=b.dataset.filter;
 $$("#filters button").forEach(x=>x.classList.toggle("active",x===b));
 renderGallery();
}));
$("#studio-back").addEventListener("click",()=>{showSection("gallery-section");});
$("#finish-back").addEventListener("click",()=>{showSection("gallery-section");});
$("#undo").addEventListener("click",undo);
$("#redo").addEventListener("click",redo);
$("#reset").addEventListener("click",resetPuzzle);
$("#print").addEventListener("click",createPrint);
$("#download").addEventListener("click",downloadPNG);
$("#hint").addEventListener("click",giveHint);
$("#toggle-numbers").addEventListener("click",toggleNumbers);
$("#eraser").addEventListener("click",()=>{erasing=true;updatePalette();updateInstruction();toast("Eraser selected.");});
$("#zoom-in").addEventListener("click",()=>changeZoom(.15));
$("#zoom-out").addEventListener("click",()=>changeZoom(-.15));
$("#my-artwork-button").addEventListener("click",showArtwork);
$("#artwork-back").addEventListener("click",()=>{showSection(null);$("#collections").scrollIntoView({behavior:"smooth"});});

console.log("Color Studio 2.0 loaded.");
