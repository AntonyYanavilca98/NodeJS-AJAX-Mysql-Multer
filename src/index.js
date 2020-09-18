const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const app = express();
const indexRouter = require('./router/index');

const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.resolve(__dirname, './public')));
app.use('/uploads', express.static(path.resolve('uploads')));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.engine('ejs', engine);

app.use('/', indexRouter);

app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Escuchando en el puerto ${PORT}`);
});