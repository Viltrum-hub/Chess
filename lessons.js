/* Independent tutorial positions: studying never replaces the live game. */
const LESSONS = [
  {id:'rook',title:'La torre',category:'Fundamentos · 3 min',fen:'8/7k/8/8/8/8/8/R6K w - - 0 1',answers:['a1a8'],hint:['a1','a8'],
   steps:[
     ['Líneas rectas','La torre se mueve por filas y columnas, tantas casillas como quieras. Nunca salta sobre otra pieza. Observa la torre blanca en A1.','Las filas son los números; las columnas, las letras.'],
     ['Mira el camino','Para llegar a A8, la torre recorre la columna A. Como no hay piezas entre A1 y A8, el camino está libre.','Una pieza propia bloquea el camino. Una rival puede capturarse, pero no atravesarse.'],
     ['Tu turno: activa la torre','Lleva la torre de A1 a A8. Toca A1 y después A8 en el tablero.','Antes de mover una torre, mira toda su fila y su columna.']
   ],success:'¡Correcto! La torre recorrió una columna completa sin obstáculos.'},
  {id:'bishop',title:'El alfil',category:'Fundamentos · 3 min',fen:'7k/8/8/8/8/8/8/2B4K w - - 0 1',answers:['c1g5'],hint:['c1','g5'],
   steps:[
     ['Domina las diagonales','El alfil se mueve en diagonal y no puede saltar piezas. Siempre permanece en casillas del mismo color.','Dos alfiles juntos pueden controlar casillas de ambos colores.'],
     ['Encuentra su ruta','Desde C1, una diagonal pasa por D2, E3, F4 y G5. Ninguna de esas casillas está ocupada.','Las diagonales largas son buenas rutas para activar tus alfiles.'],
     ['Tu turno: busca G5','Mueve el alfil de C1 a G5 siguiendo la diagonal.','Seleccionar una pieza muestra todos sus destinos legales.']
   ],success:'¡Bien! El alfil llegó a G5 por una diagonal libre.'},
  {id:'knight',title:'El caballo',category:'Fundamentos · 3 min',fen:'7k/8/8/8/8/8/8/6NK w - - 0 1',answers:['g1f3'],hint:['g1','f3'],
   steps:[
     ['El salto en L','El caballo se mueve dos casillas en una dirección y una hacia un lado. Es la única pieza que puede saltar sobre otras.','Cada salto termina en una casilla del color opuesto.'],
     ['Cuenta el salto','Desde G1 hasta F3: dos casillas hacia arriba y una a la izquierda. Los caballos suelen estar más activos cerca del centro.','En el borde, un caballo tiene menos destinos que en el centro.'],
     ['Tu turno: desarrolla','Lleva el caballo de G1 a F3.','Piensa en la forma de una L, no en una diagonal.']
   ],success:'¡Correcto! El caballo saltó en L hacia una casilla más activa.'},
  {id:'pawn',title:'Los peones',category:'Fundamentos · 4 min',fen:'7k/8/8/3p4/4P3/8/8/7K w - - 0 1',answers:['e4d5'],hint:['e4','d5'],
   steps:[
     ['Avanzar y capturar','Los peones blancos avanzan hacia las filas de números mayores; los negros, hacia las menores. Avanzan en línea recta, pero capturan en diagonal.','Desde su casilla inicial pueden avanzar dos casillas si ambas están libres.'],
     ['No todo es avanzar','Tu peón está en E4 y un peón rival en D5. D5 está una casilla por delante y a la izquierda: puedes capturarlo.','Un peón nunca retrocede. Al llegar a la última fila, se convierte en otra pieza.'],
     ['Tu turno: captura','Captura el peón negro: mueve tu peón de E4 a D5.','Para capturar, piensa en las dos diagonales delanteras.']
   ],success:'¡Bien! Los peones capturan en diagonal, aunque avanzan en línea recta.'},
  {id:'center',title:'Controla el centro',category:'Apertura · 4 min',fen:'start',answers:['e2e4','d2d4'],hint:['e2','e4'],
   steps:[
     ['Las cuatro casillas clave','D4, E4, D5 y E5 forman el centro. Desde allí, muchas piezas controlan más casillas y pueden cambiar de lado con facilidad.','En la apertura: centro, desarrollo y seguridad del rey.'],
     ['Abre caminos','Avanzar el peón de E2 a E4 abre una diagonal para el alfil y otra para la dama. D2 a D4 también reclama espacio central.','Después desarrolla caballos y alfiles. Evita sacar la dama demasiado pronto.'],
     ['Tu turno: reclama espacio','Empieza con E2 → E4 o D2 → D4. Ambas son buenas formas de ocupar el centro.','No necesitas memorizar muchas aperturas: empieza por sus ideas.']
   ],success:'¡Buen comienzo! Ahora desarrolla tus piezas y prepara un enroque seguro.'},
  {id:'castle',title:'Protege al rey',category:'Apertura · 4 min',fen:'r3k2r/ppp2ppp/2n5/3pp3/3PP3/2N5/PPP2PPP/R3K2R w KQkq - 0 1',answers:['e1g1'],hint:['e1','g1'],
   steps:[
     ['El enroque','El enroque mueve el rey dos casillas hacia una torre. La torre queda a su lado, al otro lado del rey. Es una sola jugada.','En el enroque corto blanco: rey a G1 y torre a F1.'],
     ['Comprueba las condiciones','El rey y esa torre no deben haberse movido. El camino debe estar libre. El rey no puede estar en jaque ni pasar o terminar en una casilla atacada.','La torre sí puede estar atacada; las restricciones de ataque corresponden al rey.'],
     ['Tu turno: enroca','En esta posición puedes enrocar corto. Selecciona el rey de E1 y muévelo a G1; la torre se moverá automáticamente.','Para enrocar en este juego, mueve el rey, no la torre.']
   ],success:'¡Enroque logrado! Tu rey está más protegido y tu torre entra en juego.'},
  {id:'fork',title:'El ataque doble',category:'Táctica · 4 min',fen:'1q1r3k/8/8/4N3/8/8/8/7K w - - 0 1',answers:['e5c6'],hint:['e5','c6'],
   steps:[
     ['Dos amenazas a la vez','Un ataque doble amenaza dos objetivos con una sola jugada. Los caballos son muy útiles para crear esta táctica.','Antes de mover, busca jaques, capturas y amenazas.'],
     ['Visualiza el siguiente salto','Tu caballo está en E5. Si llega a C6, atacará la dama de B8 y la torre de D8 al mismo tiempo.','No basta con atacar: comprueba también que tu pieza no se pierda inmediatamente.'],
     ['Tu turno: crea la horquilla','Mueve el caballo a la casilla que ataca la dama y la torre: E5 → C6.','Desde C6, cuenta dos filas arriba y una columna a cada lado.']
   ],success:'¡Ataque doble! Desde C6 amenazas la dama de B8 y la torre de D8.'},
  {id:'mate',title:'Encuentra el mate',category:'Táctica · 5 min',fen:'7k/6pp/6Q1/8/8/8/8/5RK1 w - - 0 1',answers:['g6e8'],hint:['g6','e8'],
   steps:[
     ['Jaque no es mate','Un jaque ataca al rey. Es mate solo si el rival no puede capturar la pieza atacante, bloquear el ataque ni escapar con el rey.','Revisa las tres defensas: capturar, bloquear o escapar.'],
     ['Una última fila sin salida','El rey negro está en H8 y sus peones de G7 y H7 bloquean su huida. Una dama en E8 atacaría al rey por la octava fila.','Comprueba que no hay piezas negras que puedan interponerse o capturar la dama.'],
     ['Tu turno: mate en una','Encuentra el jaque mate con la dama. Lleva la dama de G6 a E8 para atacar por la octava fila.','El objetivo no es capturar al rey: es dejarlo en jaque sin defensa legal.']
   ],success:'¡Jaque mate! El rey no puede escapar, bloquear el ataque ni capturar la dama.'}
];
const LESSON_KEY='chess-ai-lessons-v1';
let completedLessons;
try {const saved=JSON.parse(localStorage.getItem(LESSON_KEY)||'[]');completedLessons=Array.isArray(saved)?saved.filter(id=>LESSONS.some(l=>l.id===id)):[]}catch {completedLessons=[]}
let lessonIndex=0, lessonStep=0, lessonGame=new Chess(), lessonSelected=null, lessonLegal=[], lessonSolved=false;
const lessonBoard=document.querySelector('#lessonBoard');
function renderLessonList(){
  const list=document.querySelector('#lessonList');list.replaceChildren();
  LESSONS.forEach((l,i)=>{const b=document.createElement('button');b.type='button';b.setAttribute('aria-current',String(i===lessonIndex));
    const number=document.createElement('span');number.className='lesson-number';number.textContent=completedLessons.includes(l.id)?'✓':String(i+1).padStart(2,'0');
    const name=document.createElement('span');name.textContent=l.title;const sub=document.createElement('small');sub.textContent=l.category;name.append(sub);b.append(number,name);b.onclick=()=>openLesson(i);list.append(b);
  });
  document.querySelector('#lessonProgress').textContent=completedLessons.length+' / '+LESSONS.length+' completadas';
}
function openLesson(index){
  lessonIndex=index;lessonStep=0;resetLessonPosition();renderLessonList();renderLessonStep();
}
function resetLessonPosition(){
  lessonGame=new Chess();const fen=LESSONS[lessonIndex].fen;if(fen!=='start')lessonGame.load(fen);
  lessonSelected=null;lessonLegal=[];lessonSolved=false;document.querySelector('#lessonFeedback').textContent='';renderLessonBoard();
}
function renderLessonStep(){
  const lesson=LESSONS[lessonIndex],step=lesson.steps[lessonStep];
  document.querySelector('#lessonStep').textContent='LECCIÓN '+(lessonIndex+1)+' · PASO '+(lessonStep+1)+' DE '+lesson.steps.length;
  document.querySelector('#lessonTitle').textContent=step[0];document.querySelector('#lessonText').textContent=step[1];document.querySelector('#lessonTip').textContent=step[2];
  document.querySelector('#lessonPrev').disabled=lessonStep===0;
  const next=document.querySelector('#lessonNext');next.textContent=lessonStep===2?(lessonSolved?'Siguiente lección':'Resuelve el reto'):'Siguiente paso';next.disabled=lessonStep===2&&!lessonSolved;
  document.querySelector('#lessonHint').disabled=lessonStep!==2||lessonSolved;
  if(!lessonSolved)document.querySelector('#lessonFeedback').textContent=lessonStep===2?'Ahora puedes mover las piezas en el tablero.':'Observa el tablero y pulsa «Siguiente paso» para continuar.';
  renderLessonBoard();
}
function renderLessonBoard(){
  lessonBoard.replaceChildren();const names={k:'rey',q:'dama',r:'torre',b:'alfil',n:'caballo',p:'peón'};
  for(let rank=8;rank>=1;rank--)for(let f=0;f<8;f++){
    const sq='abcdefgh'[f]+rank,p=lessonGame.get(sq),el=document.createElement('button');el.type='button';el.dataset.square=sq;el.className='square '+((f+rank)%2===1?'light':'dark');
    el.setAttribute('aria-label',sq+(p?' '+names[p.type]+' '+(p.color==='w'?'blanco':'negro'):' vacía'));
    if(sq===lessonSelected)el.classList.add('selected');if(lessonLegal.some(m=>m.to===sq))el.classList.add(p?'capture':'move');
    if(p){const span=document.createElement('span');span.className='piece '+(p.color==='w'?'white-piece':'black-piece');span.textContent=PIECES[p.color][p.type];el.append(span)}
    if(rank===1){const c=document.createElement('span');c.className='coord file';c.textContent=sq[0];el.append(c)}
    if(f===0){const c=document.createElement('span');c.className='coord rank';c.textContent=rank;el.append(c)}
    el.onclick=()=>lessonClick(sq);lessonBoard.append(el);
  }
}
function lessonClick(sq){
  if(lessonStep!==2||lessonSolved)return;
  const p=lessonGame.get(sq),move=lessonLegal.find(m=>m.to===sq);
  if(lessonSelected&&move){
    const lesson=LESSONS[lessonIndex];
    if(!lesson.answers.includes(lessonSelected+sq)){
      document.querySelector('#lessonFeedback').textContent='Esa jugada es legal, pero no cumple el objetivo. La posición sigue igual: revisa la explicación o pide una pista.';
      lessonSelected=null;lessonLegal=[];renderLessonBoard();return;
    }
    lessonGame.move({from:lessonSelected,to:sq,promotion:'q'});lessonSolved=true;lessonSelected=null;lessonLegal=[];
    if(!completedLessons.includes(lesson.id)){completedLessons.push(lesson.id);try{localStorage.setItem(LESSON_KEY,JSON.stringify(completedLessons))}catch{}}
    document.querySelector('#lessonFeedback').textContent=lesson.success;renderLessonList();renderLessonStep();return;
  }
  if(p&&p.color==='w'){lessonSelected=sq;lessonLegal=lessonGame.moves({square:sq,verbose:true})}else{lessonSelected=null;lessonLegal=[]}
  renderLessonBoard();
}
document.querySelector('#lessonPrev').onclick=()=>{if(lessonStep>0){lessonStep--;lessonSelected=null;lessonLegal=[];renderLessonStep()}};
document.querySelector('#lessonNext').onclick=()=>{if(lessonStep<2){lessonStep++;renderLessonStep()}else if(lessonSolved){openLesson((lessonIndex+1)%LESSONS.length)}};
document.querySelector('#lessonReset').onclick=()=>{resetLessonPosition();renderLessonStep()};
document.querySelector('#lessonHint').onclick=()=>{
  const lesson=LESSONS[lessonIndex];for(const sq of lesson.hint)lessonBoard.querySelector('[data-square="'+sq+'"]').classList.add('hint');
  document.querySelector('#lessonFeedback').textContent='Pista: '+lesson.hint[0].toUpperCase()+' → '+lesson.hint[1].toUpperCase()+'. Observa por qué esa jugada cumple el objetivo.';
};
openLesson(0);
