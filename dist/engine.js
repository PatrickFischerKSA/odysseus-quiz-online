import {MISSIONS,MAX_SCORE} from './missions.js';
export const VERSION=1;
export const normalize=s=>String(s??'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ß/g,'ss').replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
export function matches(value,accept){
 if(!accept||!normalize(value))return false;
 const v=normalize(value);
 if(accept.every(x=>typeof x==='string'))return accept.some(x=>v===normalize(x));
 return accept.every(group=>group.some(x=>v.includes(normalize(x))));
}
export function orderPoints(order,correct){
 if(JSON.stringify(order)===JSON.stringify(correct))return 2;
 for(let i=0;i<correct.length-1;i++){const copy=[...correct];[copy[i],copy[i+1]]=[copy[i+1],copy[i]];if(JSON.stringify(order)===JSON.stringify(copy))return 1;}
 return 0;
}
export function suggestions(mission,answer){return mission.criteria.map((c,i)=>mission.type==='order'&&i===0?orderPoints(answer.order,mission.correct):matches(answer.fields?.[c.field],c.accept)?c.points:0);}
export function freshState(name='Meine Crew',mode='crew'){return {version:VERSION,name:name.trim().slice(0,40)||'Meine Crew',mode:mode==='solo'?'solo':'crew',startedAt:new Date().toISOString(),completedAt:null,index:0,phase:'answer',answers:MISSIONS.map(m=>({fields:{},order:m.initial?[...m.initial]:[],scores:null,reviewed:m.criteria.map(()=>false),submitted:false,confirmed:false,elapsed:0,hint:false})),hintUsed:false,sound:false};}
export function score(state){return state.answers.reduce((s,a)=>s+(a.confirmed?(a.scores??[]).reduce((x,y)=>x+y,0):0),0);}
export function rank(points){return points>=50?'Ithakas Kapitänsrat':points>=36?'Listige Heimkehrprofis':points>=21?'Sturmfeste Steuermenschen':'Mutige Deckcrew';}
export function validateState(s){
 if(!s||s.version!==VERSION||typeof s.name!=='string'||s.name.length>40||!['solo','crew'].includes(s.mode)||!Number.isInteger(s.index)||s.index<0||s.index>=MISSIONS.length||!['answer','review','result'].includes(s.phase)||!Array.isArray(s.answers)||s.answers.length!==MISSIONS.length)return false;
 return s.answers.every((a,i)=>a&&typeof a.fields==='object'&&a.fields!==null&&!Array.isArray(a.fields)&&Object.values(a.fields).every(v=>typeof v==='string'&&v.length<=5000)&&typeof a.confirmed==='boolean'&&typeof a.submitted==='boolean'&&typeof a.hint==='boolean'&&Array.isArray(a.reviewed)&&a.reviewed.length===MISSIONS[i].criteria.length&&a.reviewed.every(v=>typeof v==='boolean')&&Number.isFinite(a.elapsed)&&a.elapsed>=0&&Array.isArray(a.order)&&(!MISSIONS[i].initial||(a.order.length===4&&new Set(a.order).size===4&&a.order.every(x=>MISSIONS[i].initial.includes(x))))&&(a.scores===null||Array.isArray(a.scores)&&a.scores.length===MISSIONS[i].criteria.length&&a.scores.every((v,j)=>Number.isFinite(v)&&v>=0&&v<=MISSIONS[i].criteria[j].points&&Number.isInteger(v*2)))&&(!a.confirmed||a.submitted&&a.scores!==null))&&s.answers.slice(0,s.index).every(a=>a.confirmed)&&(s.phase!=='result'||s.answers.every(a=>a.confirmed))&&(s.phase!=='review'||s.answers[s.index].submitted);
}
export function report(s){const lines=[`ODYSSEUS · Rückfahrt mit Hindernissen`,`Crew: ${s.name}`,`Ergebnis: ${score(s)} / ${MAX_SCORE} Punkte · ${rank(score(s))}`,`Stand: ${s.completedAt?'abgeschlossen':'Zwischenstand'}`,`Bewertung: Selbstcheck mit Musterlösungen; keine automatische Beurteilung offener Urteile.`,``];MISSIONS.forEach((m,i)=>{const a=s.answers[i];lines.push(`${i+1}. ${m.title}`,`Punkte: ${a.confirmed?a.scores.reduce((x,y)=>x+y,0):'noch offen'} / ${m.criteria.reduce((x,y)=>x+y.points,0)}`);if(m.type==='order')lines.push('Reihenfolge: '+a.order.join(' → '));for(const f of m.fields??m.events??[])lines.push(`${f.label}: ${a.fields[f.id]||'—'}`);if(a.confirmed)m.criteria.forEach((c,j)=>lines.push(`  ${c.label}: ${a.scores[j]} / ${c.points} · ${c.explanation}`));lines.push(`Textnachweis: Lechner, ${m.source}`,'');});return lines.join('\n');}
