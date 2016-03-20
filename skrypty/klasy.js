function Pocisk(wspolrzednaX,wspolrzednaY,promien,predkoscX,predkoscY,kolor) {
    this.r = promien;
    this.x = wspolrzednaX-this.r;
    this.y = wspolrzednaY-this.r;
    this.vx=predkoscX;
    this.vy=predkoscY;
    this.vxOld=predkoscX;
    this.vyOld=predkoscY;
    this.kolor=kolor;
    this.obrazenia=10;
    this.widocznosc = false;
    if (this.kolor==='red') {
        this.kolor='#FF0000';
    } else if (this.kolor==='green') {
        this.kolor='#00FF00';
    } else {
        this.kolor='#0000FF';
    };
    this.rysuj = function() {
        if (this.widocznosc) {
            this.x = this.x+ this.vx;
            this.y = this.y +this.vy;
            c.beginPath();
            c.fillStyle = this.kolor;
            c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
            c.fill();
            c.stroke();
            if (this.x<-5 || this.y<-5 || this.x>window.innerWidth || this.y>window.innerHeight) {
                this.widocznosc = false;
            };
        };
    };
};
function Planeta(wspolrzednaX,wspolrzednaY,promien,odlegloscR,katObrotu,katObiegu,predkoscObiegu,stalaGrawitacyjna) {
    this.r = promien;
    this.height = promien*2;
    this.width = promien*2;
    this.x = wspolrzednaX+this.r;
    this.y = wspolrzednaY+  this.r;
    this.R = odlegloscR;
    this.phi = katObrotu;
    this.teta = katObiegu;
    this.v=predkoscObiegu;
    this.vOld=predkoscObiegu;
    this.g=stalaGrawitacyjna;
    this.zycie=100;
    this.widocznosc=true;
    this.rysuj = function() {
        this.teta=this.teta+this.v*(Math.PI/180);
        this.x=window.innerWidth/2+this.R*Math.cos(this.teta);
        this.y=window.innerHeight/2+this.R*Math.sin(this.teta);
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        c.stroke();
    };
    this.oddzialywanie = function(obiekt) {
        if (!ekran.pauza) {
            this.dx=this.x-obiekt.x;
            this.dy=this.y-obiekt.y;
            this.odleglosc=Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            obiekt.vx=obiekt.vx+this.g*(this.dx/this.odleglosc);
            obiekt.vy=obiekt.vy+this.g*(this.dy/this.odleglosc);
        };
    };
};
function Orbita(wspolrzednaX,wspolrzednaY,promien,odlegloscR,katObrotu,katObiegu,predkoscObiegu) {
    this.r = promien;
    this.x = wspolrzednaX+this.r;
    this.y = wspolrzednaY+this.r;
    this.R = odlegloscR;
    this.v=predkoscObiegu;
    this.phi = katObrotu;
    this.teta = katObiegu;
    this.widocznosc=false;
    this.rysuj = function() {
        if (this.widocznosc) {
            c.beginPath();
            c.arc(window.innerWidth/2,window.innerHeight/2,this.R,0,Math.PI*2,true);
            c.stroke();
        };
    };
};
function Gwiazda(wspolrzednaX,wspolrzednaY,promien,stalaGrawitacyjna) {
    this.r = promien;
    this.height = promien*2;
    this.width = promien*2;
    this.x = wspolrzednaX-this.r;
    this.y = wspolrzednaY-this.r;
    this.g = stalaGrawitacyjna;
    this.rysuj = function() {
        c.beginPath();
        c.arc(window.innerWidth/2,window.innerHeight/2,this.r,0,Math.PI*2,true);
        c.stroke();
    };
    this.oddzialywanie = function(obiekt) {
        if (!ekran.pauza) {
            this.dx=this.x-obiekt.x;
            this.dy=this.y-obiekt.y;
            this.odleglosc=Math.sqrt(this.dx * this.dx + this.dy * this.dy);
            obiekt.vx=obiekt.vx+this.g*(this.dx/this.odleglosc);
            obiekt.vy=obiekt.vy+this.g*(this.dy/this.odleglosc);
        };
    };
};
function Przeciwnik(wspolrzednaX,wspolrzednaY,promien,predkoscX,predkoscY,kolor,katPhi) {
    this.r = promien;
    this.x = wspolrzednaX-this.r;
    this.y = wspolrzednaY-this.r;
    this.vx=predkoscX;
    this.vy=predkoscY;
    this.vxOld=predkoscX;
    this.vyOld=predkoscY;
    this.kolor=kolor;
    this.zycie = 100;
    this.obrazenia = 0.01;
    this.widocznosc = true;
    this.phi= katPhi*Math.PI/180;
    if (this.kolor==='red') {
        this.kolor='#FF0000';
    }else if (this.kolor==='green') {
        this.kolor='#00FF00';
    }else {
        this.kolor='#0000FF';
    };
    this.rysuj = function() {
        if (this.widocznosc) {
            if(!ekran.pauza) {
                this.vx=-Math.sin(this.phi);
                this.vy=-Math.cos(this.phi);
                this.x = this.x + this.vx;
                this.y = this.y + this.vy;
            };
        c.beginPath();
        c.fillStyle = this.kolor;
        c.save();
        c.translate((this.x+12/3),(this.y+16/3));
        c.rotate(-this.phi);
        c.translate(-(this.x+12/3),-(this.y+16/3));
        c.beginPath();
        c.moveTo(this.x+4,this.y+0);
        c.lineTo(this.x+8,this.y+8);
        c.lineTo(this.x+0,this.y+8);
        c.lineTo(this.x+4,this.y+0);
        c.fill();
        c.stroke();
        c.restore();
            if(this.x<-5||this.y<-5||this.x>window.innerWidth||this.y>window.innerHeight){
                this.widocznosc = false;
            };
        };
    };
};