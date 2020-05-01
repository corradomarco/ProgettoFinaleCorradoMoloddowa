var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');
const config = {
  user: '4DD_19',  //Vostro user name
  password: 'xxx123##', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: '4DD_19', //(Nome del DB)
}
/* GET home page.router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/immagini', function(req, res, next) {
  sql.connect(config, err => {
    if(err) console.log(err);  // ... error check
    
    // Query
    let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
    sqlRequest.query('select Unit from [cr-unit-attributes]', (err, result) => {
        if (err) console.log(err); // ... error checks
        res.render('immagini',{dati:result.recordset});  //Invio il risultato
    });
    
  });
}); */
let executeQuery = function (res, query, next, pagina) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      //res.render('unita', {unit : result.recordset}); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
      console.log(result.recordset);
      renderizza(pagina, res, result.recordset)
      sql.close();
    });

  });
}
renderizza = function(pagina,res, dati){
    res.render(pagina, {
        utente : dati
    })
}

router.get('/index', function(req,res,next){
    res.render('index');
});



module.exports = router;

