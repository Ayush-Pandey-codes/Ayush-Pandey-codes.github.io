
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const COLORS = {
  1:{name:"Ink",hex:"#35313f"},
  2:{name:"Cloud",hex:"#e9e2f0"},
  3:{name:"Rose",hex:"#d98ba9"},
  4:{name:"Blush",hex:"#f2c6d5"},
  5:{name:"Honey",hex:"#e8bd69"},
  6:{name:"Cream",hex:"#f4e5bd"},
  7:{name:"Leaf",hex:"#79a98b"},
  8:{name:"Mint",hex:"#b9d8bd"},
  9:{name:"Sky",hex:"#7ca9d2"},
  10:{name:"Ice",hex:"#c3dff0"},
  11:{name:"Cocoa",hex:"#956b5d"},
  12:{name:"Peach",hex:"#e9a078"},
  13:{name:"Lilac",hex:"#ad94d5"},
  14:{name:"Violet",hex:"#785da9"}
};

/*
  Artwork is drawn with layered geometric shapes, then converted
  into a 40 x 40 numbered pixel grid. Coordinates use 0–100.
*/
const shape = (color,points) => ({type:"poly",color,points});
const ellipse = (color,x,y,rx,ry) => ({type:"ellipse",color,x,y,rx,ry});
const rect = (color,x,y,w,h) => ({type:"rect",color,x,y,w,h});

const MYSTERY = [
{
 id:"cat",title:"Midnight Cat",difficulty:"easy",size:40,
 colors:[1,2,3,4,5,6,11,13],
 shapes:[
  shape(1,[[20,17],[23,5],[39,17],[61,17],[77,5],[80,17],[91,26],[90,57],[82,72],[68,79],[32,79],[18,70],[10,56],[10,29]]),
  ellipse(1,50,65,29,24),
  shape(2,[[23,17],[26,12],[37,22],[29,28]]),
  shape(2,[[77,17],[74,12],[63,22],[71,28]]),
  ellipse(11,36,39,9,12),ellipse(11,64,39,9,12),
  ellipse(5,36,39,3,8),ellipse(5,64,39,3,8),
  ellipse(2,37,36,2,2),ellipse(2,65,36,2,2),
  shape(3,[[46,49],[54,49],[50,54]]),
  shape(2,[[50,54],[46,58],[40,56]]),
  shape(2,[[50,54],[54,58],[60,56]]),
  shape(1,[[25,48],[42,51],[45,53],[25,52]]),
  shape(1,[[75,48],[58,51],[55,53],[75,52]]),
  shape(1,[[24,55],[42,56],[45,58],[24,59]]),
  shape(1,[[76,55],[58,56],[55,58],[76,59]]),
  shape(13,[[47,24],[53,24],[55,29],[50,31],[45,29]]),
  ellipse(13,33,23,5,3),ellipse(13,67,23,5,3)
 ]
},
{
 id:"fox",title:"Autumn Fox",difficulty:"easy",size:40,
 colors:[1,2,3,5,6,11,12],
 shapes:[
  shape(1,[[15,24],[8,5],[34,16],[50,13],[66,16],[92,5],[85,24],[91,44],[83,64],[66,77],[50,83],[34,77],[17,64],[9,44]]),
  shape(12,[[16,23],[13,12],[30,21],[37,31],[30,44],[20,42]]),
  shape(12,[[84,23],[87,12],[70,21],[63,31],[70,44],[80,42]]),
  shape(3,[[18,28],[17,18],[29,24],[33,31],[28,37],[22,36]]),
  shape(3,[[82,28],[83,18],[71,24],[67,31],[72,37],[78,36]]),
  shape(12,[[20,36],[34,28],[50,32],[66,28],[80,36],[74,57],[61,68],[50,72],[39,68],[26,57]]),
  shape(5,[[29,43],[41,37],[50,42],[59,37],[71,43],[67,56],[57,64],[50,67],[43,64],[33,56]]),
  shape(6,[[35,51],[43,46],[50,49],[57,46],[65,51],[60,60],[50,64],[40,60]]),
  ellipse(1,37,38,4,5),ellipse(1,63,38,4,5),
  ellipse(2,38,37,1.5,1.5),ellipse(2,64,37,1.5,1.5),
  shape(1,[[44,55],[56,55],[50,61]]),
  shape(1,[[50,61],[46,64],[42,62]]),shape(1,[[50,61],[54,64],[58,62]]),
  shape(11,[[32,25],[40,22],[43,28],[38,32]]),
  shape(11,[[68,25],[60,22],[57,28],[62,32]])
 ]
},
{
 id:"heart",title:"Wildflower Heart",difficulty:"easy",size:40,
 colors:[1,3,4,5,6,7,8,13],
 shapes:[
  shape(3,[[50,85],[12,52],[8,34],[14,20],[27,15],[40,21],[50,33],[60,21],[73,15],[86,20],[92,34],[88,52]]),
  shape(4,[[50,77],[20,49],[16,34],[21,25],[29,22],[39,27],[50,39],[61,27],[71,22],[79,25],[84,34],[80,49]]),
  shape(1,[[50,77],[20,49],[16,34],[21,25],[29,22],[39,27],[50,39],[61,27],[71,22],[79,25],[84,34],[80,49]]),
  shape(7,[[48,68],[45,50],[40,38],[42,31],[46,42],[50,50],[54,37],[59,30],[58,44],[53,56],[52,70]]),
  ellipse(5,34,39,8,7),ellipse(5,66,39,8,7),
  ellipse(6,34,39,4,4),ellipse(6,66,39,4,4),
  ellipse(13,50,48,7,7),ellipse(4,50,48,3,3),
  ellipse(8,27,54,6,5),ellipse(8,73,54,6,5),
  ellipse(13,27,54,3,3),ellipse(13,73,54,3,3),
  shape(7,[[35,62],[27,59],[23,64],[30,69],[37,67]]),
  shape(7,[[65,62],[73,59],[77,64],[70,69],[63,67]]),
  ellipse(3,43,29,4,5),ellipse(3,57,29,4,5),
  ellipse(6,50,24,4,5)
 ]
},
{
 id:"butterfly",title:"Velvet Butterfly",difficulty:"medium",size:40,
 colors:[1,2,3,4,5,6,9,13,14],
 shapes:[
  ellipse(1,50,53,4,25),
  ellipse(1,50,29,7,7),
  shape(1,[[47,27],[38,11],[35,9],[37,23],[46,33]]),
  shape(1,[[53,27],[62,11],[65,9],[63,23],[54,33]]),
  shape(13,[[47,39],[37,18],[20,12],[8,19],[10,38],[25,48],[45,50]]),
  shape(14,[[45,48],[25,48],[10,38],[14,53],[29,61],[44,58]]),
  shape(3,[[47,39],[37,23],[22,18],[14,23],[16,36],[28,43],[45,47]]),
  shape(4,[[44,51],[27,51],[17,44],[20,53],[31,58],[44,57]]),
  shape(13,[[53,39],[63,18],[80,12],[92,19],[90,38],[75,48],[55,50]]),
  shape(14,[[55,48],[75,48],[90,38],[86,53],[71,61],[56,58]]),
  shape(5,[[53,39],[63,23],[78,18],[86,23],[84,36],[72,43],[55,47]]),
  shape(6,[[56,51],[73,51],[83,44],[80,53],[69,58],[56,57]]),
  ellipse(2,28,31,4,4),ellipse(2,72,31,4,4),
  ellipse(9,28,31,2,2),ellipse(9,72,31,2,2),
  ellipse(2,31,52,3,3),ellipse(2,69,52,3,3),
  ellipse(5,50,42,2,3),ellipse(5,50,64,2,3)
 ]
},
{
 id:"flower",title:"Botanical Bloom",difficulty:"medium",size:40,
 colors:[1,3,4,5,6,7,8,13],
 shapes:[
  shape(7,[[48,52],[45,67],[45,91],[53,91],[53,67],[52,52]]),
  shape(7,[[49,70],[30,58],[23,63],[31,73],[48,77]]),
  shape(8,[[49,71],[32,61],[27,64],[35,70],[48,74]]),
  shape(7,[[51,79],[69,65],[77,69],[69,80],[52,85]]),
  shape(8,[[52,80],[68,68],[73,70],[66,77],[52,83]]),
  ellipse(3,50,30,13,18),ellipse(3,50,17,18,12),
  ellipse(3,67,29,17,12),ellipse(3,42,43,17,12),
  ellipse(3,59,43,17,12),ellipse(3,33,29,17,12),
  ellipse(4,50,29,10,15),ellipse(4,50,17,13,8),
  ellipse(4,67,29,12,8),ellipse(4,42,43,12,8),
  ellipse(4,59,43,12,8),ellipse(4,33,29,12,8),
  ellipse(5,50,31,11,11),ellipse(6,50,31,6,6),
  ellipse(1,47,28,1.5,1.5),ellipse(1,53,28,1.5,1.5),
  shape(1,[[47,34],[50,36],[53,34]])
 ]
},
{
 id:"rocket",title:"Orbit Explorer",difficulty:"medium",size:40,
 colors:[1,2,3,5,6,9,10,13],
 shapes:[
  shape(1,[[50,5],[61,17],[67,37],[67,63],[58,75],[42,75],[33,63],[33,37],[39,17]]),
  shape(9,[[50,8],[59,20],[63,37],[63,61],[56,69],[44,69],[37,61],[37,37],[41,20]]),
  shape(2,[[50,8],[59,20],[63,37],[63,61],[56,69],[44,69],[37,61],[37,37],[41,20]]),
  shape(13,[[50,13],[58,24],[60,38],[60,60],[54,66],[46,66],[40,60],[40,38],[42,24]]),
  ellipse(1,50,37,10,10),ellipse(10,50,37,7,7),ellipse(9,50,37,4,4),
  shape(1,[[34,48],[21,60],[21,77],[40,67]]),
  shape(1,[[66,48],[79,60],[79,77],[60,67]]),
  shape(3,[[35,54],[27,63],[27,72],[38,65]]),
  shape(3,[[65,54],[73,63],[73,72],[62,65]]),
  shape(5,[[43,72],[50,92],[57,72],[53,78],[47,78]]),
  shape(12,[[46,73],[50,84],[54,73],[51,78],[49,78]]),
  ellipse(6,16,17,2,2),ellipse(6,82,21,2,2),ellipse(6,75,10,1.5,1.5),
  ellipse(13,20,36,2,2),ellipse(13,83,47,2,2)
 ]
},
{
 id:"owl",title:"Woodland Owl",difficulty:"advanced",size:40,
 colors:[1,2,3,5,6,7,8,11,12],
 shapes:[
  shape(11,[[17,35],[13,13],[32,22],[50,17],[68,22],[87,13],[83,35],[88,58],[75,77],[50,88],[25,77],[12,58]]),
  shape(1,[[17,35],[13,13],[32,22],[50,17],[68,22],[87,13],[83,35],[88,58],[75,77],[50,88],[25,77],[12,58]]),
  shape(12,[[22,34],[20,22],[34,28],[42,39],[36,49],[26,47]]),
  shape(12,[[78,34],[80,22],[66,28],[58,39],[64,49],[74,47]]),
  ellipse(6,36,43,13,15),ellipse(6,64,43,13,15),
  ellipse(2,36,43,9,11),ellipse(2,64,43,9,11),
  ellipse(1,36,43,5,6),ellipse(1,64,43,5,6),
  ellipse(9,36,42,2,2),ellipse(9,64,42,2,2),
  shape(5,[[46,48],[54,48],[50,56]]),
  shape(11,[[28,61],[38,57],[50,64],[62,57],[72,61],[65,72],[50,77],[35,72]]),
  shape(7,[[31,68],[41,64],[49,70],[42,74]]),
  shape(7,[[69,68],[59,64],[51,70],[58,74]]),
  shape(1,[[31,26],[39,31],[42,35],[36,34]]),
  shape(1,[[69,26],[61,31],[58,35],[64,34]])
 ]
}
];

const CLASSIC = [
{
 id:"classic-flower",title:"Wild Garden",difficulty:"easy",colors:[1,2,3,4,5,6,7],
 regions:[
  {id:"p1",d:"M150 145 C82 70 42 115 105 180 Q135 170 150 145Z",c:3,l:[105,143]},
  {id:"p2",d:"M150 145 C95 70 145 25 170 100 Q175 130 150 145Z",c:4,l:[145,90]},
  {id:"p3",d:"M150 145 C215 70 260 115 195 180 Q165 170 150 145Z",c:3,l:[198,143]},
  {id:"p4",d:"M150 145 C220 190 200 245 150 195 Q140 165 150 145Z",c:4,l:[178,200]},
  {id:"p5",d:"M150 145 C80 190 100 245 150 195 Q165 165 150 145Z",c:3,l:[120,200]},
  {id:"center",d:"M150 120 C185 120 195 155 175 175 C155 195 120 175 125 145Z",c:5,l:[158,154]},
  {id:"stem",d:"M145 180 Q150 220 140 280 L160 280 Q155 220 158 180Z",c:7,l:[150,240]},
  {id:"leaf1",d:"M147 220 Q80 165 68 215 Q100 255 147 220Z",c:7,l:[108,215]},
  {id:"leaf2",d:"M153 245 Q220 180 235 225 Q200 270 153 245Z",c:7,l:[198,235]},
  {id:"leafdetail",d:"M82 218 Q110 218 139 235",c:2,l:[110,220]}
 ]
},
{
 id:"classic-butterfly",title:"Butterfly Study",difficulty:"medium",colors:[1,2,3,4,5,6],
 regions:[
  {id:"lefttop",d:"M145 135 C65 20 15 55 55 155 Q100 185 145 135Z",c:3,l:[77,105]},
  {id:"leftbottom",d:"M145 145 C75 150 55 255 110 235 Q145 210 145 145Z",c:4,l:[103,193]},
  {id:"righttop",d:"M155 135 C235 20 285 55 245 155 Q200 185 155 135Z",c:5,l:[222,105]},
  {id:"rightbottom",d:"M155 145 C225 150 245 255 190 235 Q155 210 155 145Z",c:6,l:[197,193]},
  {id:"body",d:"M145 80 Q150 60 155 80 L158 230 Q150 250 142 230Z",c:1,l:[150,185]},
  {id:"head",d:"M140 80 Q150 60 160 80 Q165 100 150 105 Q135 100 140 80Z",c:1,l:[150,83]},
  {id:"detail1",d:"M75 100 Q105 65 125 125 Q100 150 75 100Z",c:2,l:[101,111]},
  {id:"detail2",d:"M225 100 Q195 65 175 125 Q200 150 225 100Z",c:2,l:[199,111]},
  {id:"detail3",d:"M90 175 Q115 160 128 185 Q105 205 90 175Z",c:5,l:[109,184]},
  {id:"detail4",d:"M210 175 Q185 160 172 185 Q195 205 210 175Z",c:3,l:[191,184]}
 ]
},
{
 id:"classic-mandala",title:"Quiet Mandala",difficulty:"advanced",colors:[1,2,3,4,5,6,7],
 regions:[
  {id:"outer1",d:"M150 12 Q210 65 150 105 Q90 65 150 12Z",c:3,l:[150,54]},
  {id:"outer2",d:"M288 150 Q235 210 195 150 Q235 90 288 150Z",c:4,l:[244,150]},
  {id:"outer3",d:"M150 288 Q90 235 150 195 Q210 235 150 288Z",c:5,l:[150,244]},
  {id:"outer4",d:"M12 150 Q65 90 105 150 Q65 210 12 150Z",c:6,l:[56,150]},
  {id:"diag1",d:"M52 52 Q125 55 150 105 Q95 125 52 52Z",c:7,l:[92,83]},
  {id:"diag2",d:"M248 52 Q175 55 150 105 Q205 125 248 52Z",c:3,l:[208,83]},
  {id:"diag3",d:"M248 248 Q175 245 150 195 Q205 175 248 248Z",c:4,l:[208,218]},
  {id:"diag4",d:"M52 248 Q125 245 150 195 Q95 175 52 248Z",c:5,l:[92,218]},
  {id:"center",d:"M150 105 Q195 105 195 150 Q195 195 150 195 Q105 195 105 150 Q105 105 150 105Z",c:2,l:[150,150]},
  {id:"inner1",d:"M150 120 Q180 150 150 180 Q120 150 150 120Z",c:1,l:[150,150]}
 ]
}
];

const STORE_PROGRESS="colorstudio-v3-progress-";
const STORE_PREF="colorstudio-v3-preferences";
const STORE_COMPLETED="colorstudio-v3-completed";

let mode="mystery",filter="all",puzzle=null,selected=1;
let erasing=false,numbers=true,zoom=100,fills={};
let history=[],historyIndex=-1,toastTimer=null,finishHandled=false;

function toast(message){
 const el=$("#toast");if(!el)return;
 el.textContent=message;el.classList.add("show");
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2200);
}
function safeParse(value,fallback){try{return JSON.parse(value)||fallback}catch{return fallback}}
function showSection(id){
 ["mode-section","gallery-section","studio","artwork-section"].forEach(s=>$("#"+s).classList.add("hidden"));
 if(id)$("#"+id).classList.remove("hidden");
}
function enterMode(next){
 mode=next;filter="all";
 $("#gallery-label").textContent=next==="mystery"?"THE PIXEL COLLECTION":"THE ILLUSTRATION COLLECTION";
 $("#gallery-title").textContent=next==="mystery"?"Mystery pixel art":"Classic coloring";
 $$("#filters button").forEach(b=>b.classList.toggle("active",b.dataset.filter==="all"));
 showSection("gallery-section");renderGallery();
 $("#gallery-section").scrollIntoView({behavior:"smooth",block:"start"});
}
function getAllPuzzles(){
 return [...MYSTERY.map(p=>({...p,mode:"mystery"})),...CLASSIC.map(p=>({...p,mode:"classic"}))];
}
function renderGallery(){
 const grid=$("#puzzle-grid");grid.innerHTML="";
 getAllPuzzles().filter(p=>p.mode===mode&&(filter==="all"||p.difficulty===filter)).forEach(p=>{
  const card=document.createElement("button");card.className="puzzle-card";
  const thumb=document.createElement("div");thumb.className="puzzle-thumb";
  if(p.mode==="mystery"){
   const canvas=document.createElement("canvas");canvas.width=p.size;canvas.height=p.size;
   const ctx=canvas.getContext("2d");const raster=rasterize(p);
   raster.forEach((row,y)=>row.forEach((n,x)=>{ctx.fillStyle=n?COLORS[n].hex:"#24222c";ctx.fillRect(x,y,1,1)}));
   thumb.append(canvas);
  }else{
   const symbol=document.createElement("span");symbol.className="thumb-flower";
   symbol.textContent=p.id.includes("butterfly")?"🦋":p.id.includes("mandala")?"❋":"✿";thumb.append(symbol);
  }
  const info=document.createElement("div");info.className="puzzle-info";
  const title=document.createElement("h3");title.textContent=p.title;
  const desc=document.createElement("p");desc.textContent=p.mode==="mystery"?"Reveal a detailed pixel picture, one color at a time.":"Color carefully drawn regions in a composed illustration.";
  const meta=document.createElement("div");meta.className="puzzle-meta";
  const diff=document.createElement("span");diff.textContent=p.difficulty;
  const count=document.createElement("span");count.textContent=p.mode==="mystery"?`${p.size} × ${p.size} PIXELS`:"LINE ART";
  meta.append(diff,count);info.append(title,desc,meta);card.append(thumb,info);
  card.addEventListener("click",()=>startPuzzle(p.id,p.mode));grid.append(card);
 });
}
function getPuzzle(id,kind){return getAllPuzzles().find(p=>p.id===id&&p.mode===kind)}
function startPuzzle(id,kind){
 puzzle=getPuzzle(id,kind);if(!puzzle)return;
 fills=safeParse(localStorage.getItem(STORE_PROGRESS+puzzle.id),{});
 selected=puzzle.mode==="mystery"?puzzle.colors[0]:puzzle.colors[0];
 erasing=false;numbers=true;zoom=100;finishHandled=false;
 history=[];historyIndex=-1;saveHistory();
 $("#studio-title").textContent=puzzle.title;
 $("#studio-mode").textContent=kind==="mystery"?"MYSTERY PIXEL":"CLASSIC COLOR";
 $("#workspace-type").textContent=kind==="mystery"?`${puzzle.size} × ${puzzle.size} PIXEL GRID`:"ILLUSTRATION CANVAS";
 $("#completion").classList.add("hidden");
 $("#eraser").classList.remove("active");
 $("#zoom-label").textContent="100%";
 showSection("studio");renderPalette();renderArtwork();updateProgress();
 $("#studio").scrollIntoView({behavior:"smooth",block:"start"});
}
function loadProgress(){return safeParse(localStorage.getItem(STORE_PROGRESS+puzzle.id),{})}
function saveProgress(){if(puzzle)localStorage.setItem(STORE_PROGRESS+puzzle.id,JSON.stringify(fills))}
function getColors(){
 return puzzle.colors.map(n=>({number:n,name:COLORS[n].name,hex:COLORS[n].hex}));
}
function renderPalette(){
 const box=$("#palette");box.innerHTML="";
 getColors().forEach(item=>{
  const b=document.createElement("button");b.className="palette-choice";b.dataset.number=item.number;
  const dot=document.createElement("span");dot.className="color-dot";dot.style.background=item.hex;
  const name=document.createElement("span");name.textContent=item.name;
  const num=document.createElement("strong");num.textContent=item.number;
  b.append(dot,name,num);b.addEventListener("click",()=>{selected=item.number;erasing=false;$("#eraser").classList.remove("active");updatePalette();updateInstruction()});
  box.append(b);
 });
 updatePalette();updateInstruction();
}
function updatePalette(){
 $("#current-number").textContent=erasing?"⌫":selected;
 $$(".palette-choice").forEach(b=>{
  const n=Number(b.dataset.number);b.classList.toggle("selected",n===selected&&!erasing);
  b.classList.toggle("completed",totalFor(n)>0&&doneFor(n)>=totalFor(n));
 });
}
function updateInstruction(){
 $("#workspace-instruction").textContent=erasing?"Eraser selected — click a colored area to clear it":`Selected color ${selected} — find matching numbered pixels`;
}
function rasterize(p){
 const size=p.size,grid=Array.from({length:size},()=>Array(size).fill(0));
 const pointInPoly=(x,y,pts)=>{
  let inside=false;
  for(let i=0,j=pts.length-1;i<pts.length;j=i++){
   const xi=pts[i][0],yi=pts[i][1],xj=pts[j][0],yj=pts[j][1];
   const intersect=((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi+0.00001)+xi);
   if(intersect)inside=!inside;
  }return inside;
 };
 p.shapes.forEach(s=>{
  for(let y=0;y<size;y++)for(let x=0;x<size;x++){
   const px=(x+.5)*100/size,py=(y+.5)*100/size;
   let hit=false;
   if(s.type==="poly")hit=pointInPoly(px,py,s.points);
   else if(s.type==="ellipse")hit=((px-s.x)**2/(s.rx**2)+(py-s.y)**2/(s.ry**2))<=1;
   else if(s.type==="rect")hit=px>=s.x&&px<=s.x+s.w&&py>=s.y&&py<=s.y+s.h;
   if(hit)grid[y][x]=s.color;
  }
 });
 return grid;
}
function renderArtwork(){
 if(!puzzle)return;
 const content=$("#canvas-content");content.innerHTML="";
 content.style.transform=`scale(${zoom/100})`;
 if(puzzle.mode==="mystery")renderMystery(content);else renderClassic(content);
}
function renderMystery(content){
 const grid=document.createElement("div");grid.className="pixel-grid";
 grid.style.gridTemplateColumns=`repeat(${puzzle.size},1fr)`;
 const raster=rasterize(puzzle);
 raster.forEach((row,y)=>row.forEach((answer,x)=>{
  const cell=document.createElement("button");cell.className="pixel-cell";
  cell.dataset.key=`${y}-${x}`;
  const key=`${y}-${x}`;
  if(!answer){cell.classList.add("blank");cell.disabled=true;}
  else{
   if(fills[key]){cell.style.background=COLORS[fills[key]].hex;cell.classList.add("filled");}
   else if(numbers)cell.textContent=answer;
   cell.setAttribute("aria-label",`Row ${y+1}, column ${x+1}, color ${answer}`);
   cell.addEventListener("click",()=>paint(key,answer,cell));
  }
  grid.append(cell);
 }));
 content.append(grid);
}
function renderClassic(content){
 const ns="http://www.w3.org/2000/svg",svg=document.createElementNS(ns,"svg");
 svg.setAttribute("viewBox","0 0 300 300");svg.setAttribute("class","classic-svg");
 puzzle.regions.forEach(r=>{
  const path=document.createElementNS(ns,"path");path.setAttribute("d",r.d);path.setAttribute("class","region");
  path.setAttribute("fill",fills[r.id]?COLORS[fills[r.id]].hex:"#fffdf8");
  path.addEventListener("click",()=>paint(r.id,r.c,path));svg.append(path);
  if(numbers&&!fills[r.id]){
   const label=document.createElementNS(ns,"text");label.setAttribute("x",r.l[0]);label.setAttribute("y",r.l[1]);
   label.setAttribute("class","region-label");label.textContent=r.c;svg.append(label);
  }
 });
 content.append(svg);
}
function paint(key,answer,target){
 if(erasing){if(!fills[key])return;delete fills[key];saveHistory();saveProgress();renderArtwork();updateProgress();updatePalette();return}
 if(fills[key])return;
 if(selected!==answer){
  target.classList.add("wrong");setTimeout(()=>target.classList.remove("wrong"),250);
  toast("Try another color for this area.");return;
 }
 fills[key]=selected;saveHistory();saveProgress();renderArtwork();updateProgress();updatePalette();
}
function totalFor(n){
 if(puzzle.mode==="mystery")return rasterize(puzzle).reduce((s,row)=>s+row.filter(v=>v===n).length,0);
 return puzzle.regions.filter(r=>r.c===n).length;
}
function doneFor(n){return Object.values(fills).filter(v=>v===n).length}
function updateProgress(){
 if(!puzzle)return;
 const total=puzzle.mode==="mystery"?rasterize(puzzle).flat().filter(Boolean).length:puzzle.regions.length;
 const done=Object.keys(fills).length,percent=Math.min(100,Math.round(done/total*100));
 $("#progress-value").textContent=percent+"%";$("#progress-fill").style.width=percent+"%";
 $("#cell-count").textContent=`${done} / ${total} areas colored`;
 $("#progress-caption").textContent=percent===100?"Every area is complete!":percent>50?"Your artwork is taking shape!":"Every color brings you closer.";
 if(percent===100&&!finishHandled)finishPuzzle();
}
function finishPuzzle(){
 finishHandled=true;$("#completion").classList.remove("hidden");
 $("#completion-title").textContent=puzzle.mode==="mystery"?"Picture revealed!":"Beautifully finished!";
 $("#completion-text").textContent=`You completed ${puzzle.title}. Save your artwork or choose another piece.`;
 saveArtwork();
}
function saveHistory(){
 const snapshot=JSON.stringify(fills);history=history.slice(0,historyIndex+1);history.push(snapshot);
 if(history.length>60)history.shift();historyIndex=history.length-1;
}
function restoreHistory(index){
 if(index<0||index>=history.length)return;historyIndex=index;fills=JSON.parse(history[index]);
 saveProgress();finishHandled=false;$("#completion").classList.add("hidden");
 renderArtwork();updateProgress();updatePalette();
}
function undo(){if(historyIndex>0)restoreHistory(historyIndex-1);else toast("Nothing to undo.")}
function redo(){if(historyIndex<history.length-1)restoreHistory(historyIndex+1);else toast("Nothing to redo.")}
function resetPuzzle(){
 if(!puzzle||!confirm("Reset all coloring for this puzzle?"))return;
 fills={};localStorage.removeItem(STORE_PROGRESS+puzzle.id);history=[];historyIndex=-1;saveHistory();
 finishHandled=false;$("#completion").classList.add("hidden");renderArtwork();updateProgress();updatePalette();toast("Puzzle reset.");
}
function giveHint(){
 if(!puzzle)return;
 if(puzzle.mode==="mystery"){
  const raster=rasterize(puzzle);
  for(let y=0;y<puzzle.size;y++)for(let x=0;x<puzzle.size;x++){
   const answer=raster[y][x],key=`${y}-${x}`;
   if(answer&&!fills[key]){selected=answer;erasing=false;updatePalette();updateInstruction();toast(`Hint: look for number ${answer}.`);
    $(`[data-key="${key}"]`)?.scrollIntoView({behavior:"smooth",block:"nearest"});return}
  }
 }else{
  const r=puzzle.regions.find(x=>!fills[x.id]);if(r){selected=r.c;erasing=false;updatePalette();updateInstruction();toast(`Hint: find color ${selected}.`);return}
 }
 toast("Everything is colored!");
}
function toggleNumbers(){numbers=!numbers;renderArtwork();toast(numbers?"Numbers shown.":"Numbers hidden.")}
function changeZoom(amount){zoom=Math.max(50,Math.min(180,zoom+amount));$("#zoom-label").textContent=zoom+"%";$("#canvas-content").style.transform=`scale(${zoom/100})`}
function printPuzzle(){
 if(!puzzle)return;
 document.querySelector(".print-output")?.remove();
 const sheet=document.createElement("section");sheet.className="print-output";
 const h=document.createElement("h1");h.textContent="Color Studio — "+puzzle.title;
 const p=document.createElement("p");p.textContent="Color each numbered area using the matching color in the key.";
 sheet.append(h,p);
 if(puzzle.mode==="mystery"){
  const grid=document.createElement("div");grid.className="print-grid";grid.style.gridTemplateColumns=`repeat(${puzzle.size},1fr)`;
  rasterize(puzzle).forEach(row=>row.forEach(n=>{const cell=document.createElement("div");cell.className="print-cell";cell.textContent=n||"";grid.append(cell)}));
  sheet.append(grid);
 }else{
  const svg=$(".classic-svg")?.cloneNode(true);if(svg){svg.querySelectorAll(".region").forEach(x=>x.setAttribute("fill","white"));sheet.append(svg)}
 }
 const key=document.createElement("div");key.className="print-key";
 const kh=document.createElement("h2");kh.textContent="Color key";sheet.append(kh);
 getColors().forEach(c=>{const item=document.createElement("div");item.className="print-key-item";
  const sw=document.createElement("span");sw.className="swatch";sw.style.background=c.hex;
  const label=document.createElement("span");label.textContent=`${c.number} — ${c.name}`;
  item.append(sw,label);key.append(item)});
 sheet.append(key);document.body.append(sheet);window.print();setTimeout(()=>sheet.remove(),1000);
}
function makeSVG(){
 const ns="http://www.w3.org/2000/svg",svg=document.createElementNS(ns,"svg");
 if(puzzle.mode==="classic"){
  svg.setAttribute("viewBox","0 0 300 300");
  puzzle.regions.forEach(r=>{const path=document.createElementNS(ns,"path");path.setAttribute("d",r.d);
   path.setAttribute("fill",fills[r.id]?COLORS[fills[r.id]].hex:"#fffdf8");path.setAttribute("stroke","#302c38");path.setAttribute("stroke-width","2.5");svg.append(path)});
 }else{
  const size=puzzle.size,cell=20;svg.setAttribute("viewBox",`0 0 ${size*cell} ${size*cell}`);
  rasterize(puzzle).forEach((row,y)=>row.forEach((n,x)=>{if(!n)return;const key=`${y}-${x}`,rectEl=document.createElementNS(ns,"rect");
   rectEl.setAttribute("x",x*cell);rectEl.setAttribute("y",y*cell);rectEl.setAttribute("width",cell);rectEl.setAttribute("height",cell);
   rectEl.setAttribute("fill",fills[key]?COLORS[fills[key]].hex:"#fffdf8");rectEl.setAttribute("stroke","#888");rectEl.setAttribute("stroke-width",".5");svg.append(rectEl)}));
 }
 return svg;
}
function downloadPNG(){
 if(!puzzle)return;
 const source=new XMLSerializer().serializeToString(makeSVG());
 const blob=new Blob([source],{type:"image/svg+xml;charset=utf-8"}),url=URL.createObjectURL(blob),img=new Image();
 img.onload=()=>{
  const canvas=document.createElement("canvas");canvas.width=1000;canvas.height=1000;
  const ctx=canvas.getContext("2d");ctx.fillStyle="#fffdf8";ctx.fillRect(0,0,1000,1000);
  ctx.drawImage(img,0,0,1000,1000);URL.revokeObjectURL(url);
  const a=document.createElement("a");a.download=puzzle.id+"-color-studio.png";a.href=canvas.toDataURL("image/png");a.click();toast("Artwork exported!");
 };
 img.onerror=()=>{URL.revokeObjectURL(url);toast("Could not export artwork.")};img.src=url;
}
function saveArtwork(){
 let items=safeParse(localStorage.getItem(STORE_COMPLETED),[]);
 if(!items.some(i=>i.id===puzzle.id)){
  items.push({id:puzzle.id,title:puzzle.title,mode:puzzle.mode,date:new Date().toLocaleDateString()});
  localStorage.setItem(STORE_COMPLETED,JSON.stringify(items));updateSavedCount();
 }
}
function updateSavedCount(){const items=safeParse(localStorage.getItem(STORE_COMPLETED),[]);$("#saved-count").textContent=items.length}
function showArtwork(){
 showSection("artwork-section");const grid=$("#saved-grid");grid.innerHTML="";
 const items=safeParse(localStorage.getItem(STORE_COMPLETED),[]);
 if(!items.length){const empty=document.createElement("div");empty.className="empty-saved";empty.textContent="Your finished pieces will appear here.";grid.append(empty);return}
 items.forEach(item=>{
  const card=document.createElement("div");card.className="saved-card";
  const art=document.createElement("div");art.className="saved-card-art";
  const p=getPuzzle(item.id,item.mode);
  if(p&&p.mode==="mystery"){
   const canvas=document.createElement("canvas");canvas.width=p.size;canvas.height=p.size;
   const ctx=canvas.getContext("2d"),raster=rasterize(p),saved=safeParse(localStorage.getItem(STORE_PROGRESS+p.id),{});
   raster.forEach((row,y)=>row.forEach((n,x)=>{ctx.fillStyle=n?(saved[`${y}-${x}`]?COLORS[saved[`${y}-${x}`]].hex:"#f4eefa"):"#24222c";ctx.fillRect(x,y,1,1)}));
   art.append(canvas);
  }else{art.textContent="✿";art.style.fontSize="70px";art.style.color="#b99be8"}
  const info=document.createElement("div");info.textContent=item.title+" · "+item.date;
  card.append(art,info);grid.append(card);
 });
}
function goHome(){showSection("mode-section");$("#how-section").classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"})}
function init(){
 const pref=safeParse(localStorage.getItem(STORE_PREF),{});
 if(pref.theme==="light")document.body.classList.add("light-theme");
 $("#year").textContent=new Date().getFullYear();updateSavedCount();
 $$(".mode-card").forEach(b=>b.addEventListener("click",()=>enterMode(b.dataset.mode)));
 $$(".nav-link").forEach(b=>b.addEventListener("click",()=>{
  $$(".nav-link").forEach(x=>x.classList.toggle("active",x===b));
  if(b.dataset.view==="my-art")showArtwork();else goHome();
 }));
 $("#home-link").addEventListener("click",e=>{e.preventDefault();goHome()});
 $("#start-exploring").addEventListener("click",()=>$("#mode-section").scrollIntoView({behavior:"smooth"}));
 $("#gallery-back").addEventListener("click",goHome);
 $("#studio-back").addEventListener("click",()=>showSection("gallery-section"));
 $("#artwork-back").addEventListener("click",goHome);
 $("#filters").querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{
  filter=b.dataset.filter;$("#filters").querySelectorAll("button").forEach(x=>x.classList.toggle("active",x===b));renderGallery();
 }));
 $("#undo").addEventListener("click",undo);$("#redo").addEventListener("click",redo);
 $("#reset").addEventListener("click",resetPuzzle);$("#print").addEventListener("click",printPuzzle);
 $("#download").addEventListener("click",downloadPNG);$("#hint").addEventListener("click",giveHint);
 $("#toggle-numbers").addEventListener("click",toggleNumbers);
 $("#fill-color").addEventListener("click",()=>{
  if(!puzzle)return;
  if(puzzle.mode==="mystery"){
   rasterize(puzzle).forEach((row,y)=>row.forEach((n,x)=>{const k=`${y}-${x}`;if(n===selected&&!fills[k])fills[k]=selected}));
  }else puzzle.regions.forEach(r=>{if(r.c===selected&&!fills[r.id])fills[r.id]=selected});
  saveHistory();saveProgress();renderArtwork();updateProgress();updatePalette();toast("Matching areas filled.");
 });
 $("#eraser").addEventListener("click",()=>{erasing=!erasing;$("#eraser").classList.toggle("active",erasing);updatePalette();updateInstruction();toast(erasing?"Eraser selected.":"Eraser turned off.")});
 $("#zoom-in").addEventListener("click",()=>changeZoom(10));$("#zoom-out").addEventListener("click",()=>changeZoom(-10));
 $("#theme-toggle").addEventListener("click",()=>{
  document.body.classList.toggle("light-theme");
  localStorage.setItem(STORE_PREF,JSON.stringify({theme:document.body.classList.contains("light-theme")?"light":"dark"}));
 });
 $("#finish-download").addEventListener("click",downloadPNG);
 $("#finish-next").addEventListener("click",()=>showSection("gallery-section"));
}
document.addEventListener("DOMContentLoaded",init);
