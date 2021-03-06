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
let executeQuery = function (res, query, next, pagina) {
    sql.connect(config, function (err) {
        if (err) { //Display error page
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); // create Request object
        request.query(query, function (err, result) { //Display error page
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
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
renderizza = function (pagina, res, dati) {
    res.render(pagina, {
        unita: dati
    })
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/index', function (req, res, next) {
    res.render('index');
});
router.get('/search/:Username/:Password', function (req, res, next) {
    console.log(req.params.Username + " " + req.params.Password); //Fino qui arriva
    let sqlQuery = `select * from dbo.[Utenti] where NomeUtente = '${req.params.Username}' AND Password ='${req.params.Password}'`;

    sql.connect(config, function (err) {
        if (err) { console.log("Error while connecting database :- " + err); }
        var request = new sql.Request(); // create Request object
        request.query(sqlQuery, function (err, result) { //Display error page
            //Non va qui perchè non esiste la tabella
            if (err) { console.log("Error while querying database :- " + err); }

            console.log(result.recordset.length);

            if (result.recordset.length == 0) res.send({ success: false, message: "login non effettuato" })
            else res.send({ success: true, message: result.recordset })
        });
    });
});

router.get('/id/:id', function (req, res, next) {
    console.log(req.params.id); //Fino qui arriva
    let sqlQuery = `select disponibilità 
                    from dbo.[BiciDisp] 
                    where id = '${req.params.id}' 
                    AND  data = (SELECT MAX(Data) 
                    from dbo.[BiciDisp]  
                    WHERE id = '${req.params.id}') `;

    sql.connect(config, function (err) {
        if (err) { console.log("Error while connecting database :- " + err); }
        var request = new sql.Request(); // create Request object
        request.query(sqlQuery, function (err, result) { //Display error page
            //Non va qui perchè non esiste la tabella
            if (err) { console.log("Error while querying database :- " + err); }

            console.log(result.recordset)
            if (result.recordset.length == 0) res.send({ success: false, message: "login non effettuato" })

            if (result.recordset["0"]["disponibilità"] == 'no') res.send({ success: false, message: "non puoi" })
            else res.send({ success: true, message: result.recordset })
        });
    });
});
router.post('/prenota', function (req, res, next) {
    // prenota 
    console.log(req.body);
    let unit = req.body;
    if (!unit) {  //Qui dovremmo testare tutti i campi della richiesta
        res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
        return;
    }
    let sqlInsert = `INSERT INTO dbo.[BiciDisp] (id, disponibilità, data) 
                     VALUES ('${unit.id}','${unit.disponibilità}','${unit.data}')`;
    console.log(sqlInsert);

    sql.connect(config, function (err) {
        if (err) { //Display error page
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); // create Request object
        request.query(sqlInsert, function (err, result) { //Display error page
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
                sql.close();
                return;
            }
            //res.render('unita', {unit : result.recordset}); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
            //console.log(result.recordset);
            //renderizza(pagina, res, result.recordset)
            res.send({ success: true, message: "prenotazione effettuata con successo" + JSON.stringify(req.body) });
            sql.close();
        });
    });
});

router.post('/rilascia', function (req, res, next) {
    // prenota 
    console.log(req.body);
    let unit = req.body;
    if (!unit) {  //Qui dovremmo testare tutti i campi della richiesta
        res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
        return;
    }
    let sqlInsert = `INSERT INTO dbo.[BiciDisp] (id, disponibilità, data) 
                     VALUES ('${unit.id}','${unit.disponibilità}','${unit.data}')`;
    console.log(sqlInsert);

    sql.connect(config, function (err) {
        if (err) { //Display error page
            console.log("Error while connecting database :- " + err);
            res.status(500).json({ success: false, message: 'Error while connecting database', error: err });
            return;
        }
        var request = new sql.Request(); // create Request object
        request.query(sqlInsert, function (err, result) { //Display error page
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).json({ success: false, message: 'Error while querying database', error: err });
                sql.close();
                return;
            }
            //res.render('unita', {unit : result.recordset}); //Il vettore con i dati è nel campo recordset (puoi loggare result per verificare)
            //console.log(result.recordset);
            //renderizza(pagina, res, result.recordset)
            res.send({ success: true, message: "rilascio effettuato con successo" + JSON.stringify(req.body) });
            sql.close();
        });
    });
});




module.exports = router;
