var c = document.getElementById('can').getContext('2d');
c.canvas.width = window.innerWidth - 18;
c.canvas.height = window.innerHeight - 18;
var szybkoscOdswiezania = 40;
var S = new Gwiazda(window.innerWidth / 2, window.innerHeight / 2, 30, 0.05);
var przeciwnicy = [];
var pociski = [];
var planety = [];
var orbity = [];
var satelity = [];
var naziemni = [];
var spowalniacze = [];
var poziomy = [];
var wahadlowce = [];