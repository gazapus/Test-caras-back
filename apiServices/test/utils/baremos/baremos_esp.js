const primero_esp = require('./españa/primero.js');
const segundo_esp = require('./españa/segundo.js');
const tercero_esp = require('./españa/tercero.js');
const cuarto_esp = require('./españa/cuarto.js');
const quinto_esp = require('./españa/quinto.js');
const sexto_esp = require('./españa/sexto.js');
const primero_s_esp = require('./españa/primero-s.js');
const segundo_s_esp = require('./españa/segundo-s.js');
const tercero_s_esp = require('./españa/tercero-s.js');
const cuarto_s_esp = require('./españa/cuarto-s.js');
const primero_b_esp = require('./españa/primero_b.js');
const segundo_b_esp = require('./españa/segundo_b.js');

let baremos_esp = [primero_esp, segundo_esp, tercero_esp, cuarto_esp, quinto_esp, sexto_esp, 
     primero_s_esp, segundo_s_esp, tercero_s_esp, cuarto_s_esp, primero_b_esp, segundo_b_esp];
/*
//Verifica que los datos de los baremos esten bien respecto a max >= min
for (let baremo of baremos_esp){
     for(let registro of baremo.values){
          if(registro.score.successes.max < registro.score.successes.min && registro.score.successes.max !== -101){
               console.log("ERROR Successes: " + registro.percentile + " - " + baremo.age)
          }
          if(registro.score.errors.max < registro.score.errors.min && registro.score.errors.max !== -101){
               console.log("ERROR Errors: " + registro.percentile + " - " + baremo.age)
          }
          if(registro.score.netSuccesses.max < registro.score.netSuccesses.min && registro.score.netSuccesses.max !== -101){
               console.log("ERROR NetS: " + registro.percentile + " - " + baremo.age)
          }
          if(registro.score.ici.max < registro.score.ici.min && registro.score.ici.max !== -101){
               console.log("ERROR ICI: " + registro.percentile + " - " + baremo.age)
          }
     }
}

for(let baremo of baremos_esp){
     console.log(baremo.age)
}*/
module.exports = baremos_esp;