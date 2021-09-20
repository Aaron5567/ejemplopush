const{response} = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const fs = require('fs');
const urlsafeBase64 = require('urlsafe-base64');
const webpush = require('web-push');
const { Console } = require('console');
const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } =  process.env;


webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    PUBLIC_VAPID_KEY,
    PRIVATE_VAPID_KEY
);





const enviarNotificacion  =  async  (req, res = response) => {

   let titulo = req.body.titulo;
   let cuerpo = req.body.cuerpo;
   let usuario = req.body.usuario

  console.log('hola');

     let pushSubscription = await require('./subs-db.json');
     //console.log(pushSubscription);


    const payload = {
        notification: {
            title: `😄😄  ${titulo}`,
            body: `${cuerpo}`,
            // icon: '/favicon.ico',
            icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
            vibrate: [100, 50, 100],
            data: {
                url: 'http://192.168.77.84:3003/admin/#/auth/login'
              },
        }
    }

   for( var  i = 0 ; i < pushSubscription.length ; i++ )
   {
    //    console.log(pushSubscription[i])
    webpush.sendNotification(
        pushSubscription[i],
        JSON.stringify(payload))
        .then(res => {
            console.log('Enviado !!');
        }).catch(err => {
            console.log('Error', err);
            if ( err.statusCode === 410 || err.statusCode === 403 ) { 
              
              console.log(' BORRAR registro')  
            }
        })
    }

    res.send({ data: 'Se envio subscribete!!' 
    , res: payload
    })

 


}
const test  =  async  (req, res = response) => {
    res.send('Hello from SSL server')
}



module.exports = { enviarNotificacion,test }

// webpush.setVapidDetails(
//     'mailto:aalba3make@gmail.com',
//     PUBLIC_VAPID_KEY,
//     PRIVATE_VAPID_KEY
//     // vapidKeys.publicKey,
//     // vapidKeys.privateKey
//   );

//   let suscripciones = require('./subs-db.json');


//   module.exports.getKey = () => {
//     return urlsafeBase64.decode( PUBLIC_VAPID_KEY );
//     // return urlsafeBase64.decode( PUBLIC_VAPID_KEY );
// };


// module.exports.addSubscription = ( suscripcion ) => {
//     suscripciones.push( suscripcion );
//     fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );
// };



//  module.exports.sendPush = ( post ) => {

//     console.log('Mandando PUSHES');

//     // console.log(PUBLIC_VAPID_KEY);
   
    
//     const notificacionesEnviadas = [];

//     suscripciones.forEach( (suscripcion, i) => {

//         const pushProm = webpush.sendNotification( suscripcion , JSON.stringify( post ) )
//         .then( console.log( 'Notificacion enviada ') )
//         .catch( err => {
            
//             console.log('Notificación falló');
//             console.log(err);
            
//             if ( err.statusCode === 410  ) { // GONE, ya no existe
//                 suscripciones[i].borrar = true;
//             }
            
//         });
        
//         notificacionesEnviadas.push( pushProm );
        
//     });
    
  
//     Promise.all( notificacionesEnviadas ).then( () => {

//         suscripciones = suscripciones.filter( subs => !subs.borrar );

//         fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify(suscripciones) );

//     });

// }

