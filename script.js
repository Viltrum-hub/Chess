const PIECES={w:{k:'♔',q:'♕',r:'♖',b:'♗',n:'♘',p:'♙'},b:{k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'}};
const VALUE={p:100,n:320,b:330,r:500,q:900,k:20000};
const boardEl=document.querySelector('#board'), moveList=document.querySelector('#moveList'), coach=document.querySelector('#coachText'), thinking=document.querySelector('#thinking'), turnBadge=document.querySelector('#turnBadge'), gameOver=document.querySelector('#gameOver');
let game=new Chess(), human='w', ai='b', flipped=false, selected=null, legal=[], lastMove=null, locked=false;

function squareOrder(){
  const files=flipped?'hgfedcba':'abcdefgh', ranks=flipped?'12345678':'87654321', out=[];
  for(const r of ranks) for(const f of files) out.push(f+r); return out;
}
function render(){
  boardEl.innerHTML='';
  const order=squareOrder();
  order.forEach((sq,i)=>{
    const f='abcdefgh'.indexOf(sq[0]),r=+sq[1], light=(f+r)%2===1;
    const el=document.createElement('div'); el.className='square '+(light?'light':'dark'); el.dataset.square=sq;
    if(selected===sq) el.classList.add('selected');
    if(lastMove&&(lastMove.from===sq||lastMove.to===sq)) el.classList.add('last');
    const lm=legal.find(m=>m.to===sq); if(lm) el.classList.add(game.get(sq)?'capture':'move');
    const p=game.get(sq); if(p){const span=document.createElement('span');span.className='piece '+(p.color==='w'?'white-piece':'black-piece');span.textContent=PIECES[p.color][p.type];el.appendChild(span)}
    const col=i%8,row=Math.floor(i/8);
    if(row===7){const c=document.createElement('span');c.className='coord file';c.textContent=sq[0];el.appendChild(c)}
    if(col===0){const c=document.createElement('span');c.className='coord rank';c.textContent=sq[1];el.appendChild(c)}
    el.addEventListener('click',()=>clickSquare(sq));boardEl.appendChild(el);
  });
  updateHistory(); updateStatus();
}
function clickSquare(sq){
  if(locked||game.game_over()||game.turn()!==human)return;
  const p=game.get(sq);
  if(selected){
    const target=legal.find(m=>m.to===sq);
    if(target){const m=game.move({from:selected,to:sq,promotion:'q'});lastMove=m;selected=null;legal=[];coach.textContent=feedback(m);render();afterHuman();return}
  }
  if(p&&p.color===human){selected=sq;legal=game.moves({square:sq,verbose:true});render()}else{selected=null;legal=[];render()}
}
function feedback(m){
  if(game.in_checkmate())return '¡Jaque mate! Excelente final.';
  if(game.in_check())return 'Jaque. Has obligado al rival a responder a la amenaza.';
  if(m.captured)return 'Capturaste una pieza. Comprueba ahora si tu pieza queda defendida.';
  if(['e4','d4','e5','d5'].includes(m.to))return 'Buena idea: estás luchando por el centro.';
  if(m.flags.includes('k')||m.flags.includes('q'))return 'Bien: el enroque mejora la seguridad de tu rey.';
  return 'Jugada realizada. Antes de la respuesta rival, revisa amenazas y piezas sin defender.';
}
function afterHuman(){if(checkEnd())return;locked=true;thinking.classList.add('show');setTimeout(aiMove,280+Math.random()*420)}
function aiMove(){
  const level=+document.querySelector('#difficulty').value, moves=game.moves({verbose:true});
  if(!moves.length){locked=false;thinking.classList.remove('show');checkEnd();return}
  let chosen;
  if(level===1) chosen=moves[Math.floor(Math.random()*moves.length)];
  else{
    const scored=moves.map(m=>{game.move(m);let s=evaluate(ai); if(game.in_checkmate())s=999999; else if(game.in_check())s+=45;game.undo();s+=(Math.random()*Math.max(5,130-level*24));return{m,s}}).sort((a,b)=>b.s-a.s);
    const pool=level===2?Math.min(5,scored.length):level===3?Math.min(3,scored.length):level===4?Math.min(2,scored.length):1;
    chosen=scored[Math.floor(Math.random()*pool)].m;
  }
  const m=game.move({from:chosen.from,to:chosen.to,promotion:chosen.promotion||'q'});lastMove=m;locked=false;thinking.classList.remove('show');coach.textContent=aiComment(m);render();checkEnd();
}
function evaluate(side){
  let total=0;
  for(const rank of game.board())for(const p of rank)if(p) total+=(p.color===side?1:-1)*VALUE[p.type];
  return total;
}
function aiComment(m){if(game.in_check())return 'La IA te ha dado jaque. Primero elimina la amenaza sobre tu rey.';if(m.captured)return 'La IA capturó una pieza. Busca si puedes recuperarla con una táctica.';return 'Turno tuyo. Revisa primero qué amenaza la última jugada de la IA.'}
function updateHistory(){
  const hist=game.history(); if(!hist.length){moveList.innerHTML='<span class="empty">La partida aún no ha comenzado.</span>';return}
  let html='';for(let i=0;i<hist.length;i+=2)html+='<span class="move-no">'+(i/2+1)+'.</span><span class="move">'+hist[i]+'</span><span class="move">'+(hist[i+1]||'')+'</span>';moveList.innerHTML=html;moveList.scrollTop=moveList.scrollHeight;
}
function updateStatus(){
  const mine=game.turn()===human&&!locked;
  turnBadge.textContent=game.game_over()?'Finalizada':mine?'Tu turno':'Turno IA';
  document.querySelector('#topStatus').textContent=game.in_check()?'Jaque':game.game_over()?'Partida finalizada':'Partida en curso';
}
function checkEnd(){
  if(!game.game_over())return false;
  let title='Tablas',text='La partida terminó en empate.';
  if(game.in_checkmate()){const winner=game.turn()==='w'?'Negras':'Blancas';title=winner.toLowerCase()===((human==='w')?'blancas':'negras')?'¡Victoria!':'Derrota';text='Jaque mate. '+winner+' ganan la partida.'}
  else if(game.in_stalemate())text='Ahogado: el jugador al turno no tiene jugadas legales.';
  else if(game.in_threefold_repetition())text='Tablas por triple repetición.';
  else if(game.insufficient_material())text='Tablas por material insuficiente.';
  document.querySelector('#resultTitle').textContent=title;document.querySelector('#resultText').textContent=text;gameOver.classList.remove('hidden');return true;
}
function newGame(){
  game=new Chess();selected=null;legal=[];lastMove=null;locked=false;gameOver.classList.add('hidden');
  const choice=document.querySelector('#color').value;human=choice==='random'?(Math.random()<.5?'w':'b'):choice;ai=human==='w'?'b':'w';flipped=human==='b';
  document.querySelector('#sideLabel').textContent=human==='w'?'Blancas':'Negras';
  const labels=['','Principiante','Fácil','Intermedio','Difícil','Experto'];document.querySelector('#aiLabel').textContent='Nivel '+labels[+document.querySelector('#difficulty').value].toLowerCase();
  coach.textContent='Nueva partida. Desarrolla tus piezas, controla el centro y protege a tu rey.';render();
  if(ai==='w'){locked=true;thinking.classList.add('show');setTimeout(aiMove,450)}
}
function hint(){
  if(locked||game.turn()!==human||game.game_over())return;
  const moves=game.moves({verbose:true});if(!moves.length)return;
  let best=moves.map(m=>{game.move(m);let s=evaluate(human)+(game.in_check()?35:0);game.undo();return{m,s}}).sort((a,b)=>b.s-a.s)[0].m;
  document.querySelectorAll('.hint').forEach(e=>e.classList.remove('hint'));[best.from,best.to].forEach(s=>document.querySelector('[data-square="'+s+'"]')?.classList.add('hint'));
  coach.textContent='Pista: considera mover '+best.from.toUpperCase()+' → '+best.to.toUpperCase()+'. Busca qué mejora o qué amenaza crea.';
}
function undo(){
  if(locked)return;let n=0;if(game.history().length){game.undo();n++}if(game.turn()!==human&&game.history().length){game.undo();n++}else if(n&&game.turn()===ai&&game.history().length){game.undo()}
  selected=null;legal=[];lastMove=null;coach.textContent='Movimiento deshecho. Intenta encontrar una alternativa más activa.';render();
}
document.querySelector('#newGame').onclick=newGame;document.querySelector('#playAgain').onclick=newGame;document.querySelector('#hint').onclick=hint;document.querySelector('#undo').onclick=undo;
document.querySelector('#flip').onclick=()=>{flipped=!flipped;render()};
document.querySelector('#difficulty').onchange=()=>{const labels=['','Principiante','Fácil','Intermedio','Difícil','Experto'];document.querySelector('#aiLabel').textContent='Nivel '+labels[+document.querySelector('#difficulty').value].toLowerCase()};
document.querySelector('#resign').onclick=()=>{if(game.game_over())return;document.querySelector('#resultTitle').textContent='Te has rendido';document.querySelector('#resultText').textContent='Partida terminada. Revisa el historial e inténtalo de nuevo.';gameOver.classList.remove('hidden');locked=true};
newGame();