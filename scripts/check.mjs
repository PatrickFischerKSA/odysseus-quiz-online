import {readFile,access} from 'node:fs/promises';
import {MISSIONS,MAX_SCORE} from '../dist/missions.js';
if(MISSIONS.length!==12||MAX_SCORE!==60)throw new Error('12 Missionen und 60 Punkte erwartet.');
const ids=new Set();
for(const m of MISSIONS){if(ids.has(m.id))throw new Error('Doppelte Missions-ID');ids.add(m.id);await access(new URL(`../dist/assets/${m.image}.webp`,import.meta.url));if(!m.source||!m.hint||!m.criteria.length)throw new Error(`Unvollständige Mission ${m.id}`);for(const c of m.criteria)if(c.field&&!(m.fields??m.events).some(f=>f.id===c.field))throw new Error('Unbekanntes Antwortfeld');}
const index=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
if(/(?:src|href)="\//.test(index))throw new Error('Absolute Pfade funktionieren nicht in GitHub-Projektseiten.');
for(const f of ['index.html','style.css','app.js','engine.js','missions.js','.nojekyll','assets/favicon.svg'])await access(new URL('../dist/'+f,import.meta.url));
console.log('Geprüft: 12 Missionen, 60 Punkte, Kriterien, Bilddateien und relative Einstiegspfade.');
