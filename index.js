import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import cors from 'cors';
import data from './public/data.json' with {type:'json'};
const app = express();
const PORT = 3030;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')))
const DataFile = data
DataFile.length = 40;

app.set('view engine','ejs');
app.use(cors())

app.get('/',(req,res) =>{
    const data = DataFile;
    res.render('index.ejs',{data:data});
})

app.get('/:monsterName',(req,res) =>{
    const name = req.params.monsterName;
   const data = DataFile;
   const selected = data.filter(item =>item.Name === name);
   selected[0].img = `/images/${selected[0].Name}.png`;
   const Data = selected[0];
   res.render('profile.ejs',{profile:Data});
})
app.listen(PORT,()=>{
      console.log('Hello the Port is live now....')
})