//import express
const express = require('express');
const routes= require('./routes');
const bodyParser=require('body-parser');
const path = require('path');
const configs=require('./config');

require('dotenv').config({path: 'variables.env'})



/*db.authenticate()
  .then(()=>console.log('DB conectada :) '))
  .catch(err=>console.log(err));*/


//configurar express
const app=express();
//Habilitar Pug
app.set('view engine','pug');
//Añadir las vistas

app.set('views',path.join(__dirname,'./views'));

//Cargar una carpeta estática llamada public
app.use(express.static('public'));

//Validar si estamos en desarrollo o podrucción
const config=configs[app.get('env')];
//Creamos la variable para el sitio web
app.locals.titulo=config.nombresitio;
//Muestra el año actual y genera la ruta donde nos encontramos 
app.use((req,res,next)=>{
//crear una nueva fecha 
 const fecha=new Date();
 res.locals.fechaActual=fecha.getFullYear();
 res.locals.ruta=req.path;
 console.log(res.locals);
 return next();
});

//Ejecutamos el body-parser
app.use(bodyParser.urlencoded({extended:true}));
//Cargar las rutas 
app.use('/',routes ());

//Puerto y host para APP

const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT ||  3000
app.listen(port,host,()=>{
  console.log('El servidor está funcionando');
});

