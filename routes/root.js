const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const games = require('microlibrary')
const gamerNamer = require('gamer-namer');

var app = express()
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../views')));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/home.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pages/home.html'));
});

app.get('/calculator.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pages/calculator.html'));
});

app.get('/aboutus.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/pages/aboutus.html'));
});

app.post('/calculateBMI', (req, res) => {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var bmi = weight / (height * height);
    var result;
    if (bmi < 16) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', which is Severe Thinness';
    }
    else if (bmi < 17) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', which is Moderate Thinness';    
    }
    else if (bmi < 18.5) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', which is Mild Thinness';        
    }
    else if (bmi < 25) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', which is Normal';            
    }
    else if (bmi < 30) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', Overweight';                
    }
    else if (bmi < 35) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', Obese Class I';                    
    }
    else if (bmi < 40) {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', Obese Class II';                    
    }
    else {
        result = 'Your BMI result is ' + bmi.toFixed(2) + ', Obese Class III go to the gym please)';                        
    }
    var ret = {
        result: result,
        game: games.random(),
        gamer: gamerNamer.generateName(),
    }
    var viewPath = path.join(__dirname, '../views/pages/result.ejs');
    res.render(viewPath, ret);
});

app.listen(3000, () => {
  console.log(`Server run on port http://localhost:3000/home.html`)
})