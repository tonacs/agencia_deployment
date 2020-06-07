const Testimonial = require('../models/Testimoniales');

exports.mostrarTestimoniales=async (req,res) =>{
   const testimoniales=await Testimonial.findAll()
   res.render('testimoniales',{
    pagina:'Testimoniales',
    testimoniales:testimoniales,
});
 }

 exports.agregarTestimonial=async (req,res)=>{
    let {nombre,correo,mensaje}=req.body;
    let errores=[]
    if(!nombre){
        errores.push({'mensaje':'Agrega tu nombre'})
    }
    if(!correo){
     errores.push({'mensaje':'Agrega tu correo'})
 }
 if(!mensaje){
     errores.push({'mensaje':'Agrega tu mensaje'})
 }
 if (errores.length>0) {
     //Muestra la vista con errores
     const testimoniales=await Testimonial.findAll()
     res.render('testimoniales',{
         errores,
         nombre,
         correo,
         mensaje
     })
 }else{
     //Almacenarlo en la base de datos
     Testimonial.create({
         nombre,
         correo,
         mensaje
     })
     .then(testimonial=>res.redirect('/testimoniales'))
     .catch(err=>console.log(err));
 }
 }