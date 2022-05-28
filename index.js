const con = require('./connection');
const express = require('express');
const bodyParser = require('body-parser');
const { redirect } = require('express/lib/response');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine','ejs');

app.get('/', function(req , res){
    res.sendFile(__dirname + '/register.html');
});

app.post('/', function (req , res){
    var fname = req.body.fname;
    var lname = req.body.lname;

    con.connect(function(error){
        if(error) throw error;
        var sql = "INSERT INTO studentdata(fname , lname) VALUES ('"+fname+"','"+lname+"')";
        con.query(sql , function(error,result){
            if(error) throw error;
            //res.send('Data Stored Successfully!!');
            
            res.redirect('/showdata');
            console.log('Server started successfully!!');
        });
        
    });
});

app.get('/showdata', function(req, res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * FROM studentdata";
        con.query(sql, function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/showdata",{studentdata : result});
        });
    });
});

app.get('/delete-student', function(req, res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "DELETE FROM studentdata WHERE studentid=?";
        var id = req.query.id;
        con.query(sql, [id],function(error , result){
            if(error) console.log(error);
            res.redirect('/showdata');
        });
    });
});

app.get('/update-student', function(req, res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * FROM studentdata WHERE studentid=?"
        var id = req.query.id;
        con.query(sql, [id],function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/update-student", {studentdata : result});
        });  
    });
});

app.post('/update-student', function(req, res){
    var studentid = req.body.studentid;
    var fname = req.body.fname;
    var lname = req.body.lname;

    con.connect(function(error){
        if(error) console.log(error);
        var sql = "UPDATE studentdata SET fname=?, lname=? WHERE studentid=?"
        
        con.query(sql, [fname, lname, studentid],function(error, result){
            if(error) console.log(error);
            res.redirect('/showdata');
        });  
    });
});

app.get('/search-student', function(req,res){
    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * FROM studentdata";
        con.query(sql, function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/search-student",{studentdata : result});
        });
    });
});

app.get('/search', function(req, res){
    var fname = req.query.fname;
    var lname = req.query.lname;

    con.connect(function(error){
        if(error) console.log(error);
        var sql = "SELECT * FROM studentdata WHERE fname LIKE '%"+fname+"%' AND lname LIKE '%"+lname+"%' ";
        con.query(sql, function(error, result){
            if(error) console.log(error);
            res.render(__dirname+"/search-student",{studentdata : result});
        });
    });
});

app.listen(3000);