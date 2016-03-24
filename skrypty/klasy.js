function Pocisk(wspolrzednaX,wspolrzednaY,promien,predkoscX,predkoscY,kolor) {
	this.rodzic = "who";
	this.rodzicNumer = 1;
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
function Planeta(promien,odlegloscR,katObrotu,katObiegu,predkoscObiegu,stalaGrawitacyjna) {
    this.r = Math.floor(promien+Math.random()*10);
    this.rOld = this.r;
	this.obecnaObrona = false;
	this.obecnySpowalniacz = false;
    this.R = odlegloscR;
    this.phi = katObrotu*Math.random();
    this.teta = katObiegu*Math.random();
    this.v=predkoscObiegu*Math.random();
    this.vOld=predkoscObiegu+Math.random()/100;
    this.g=stalaGrawitacyjna+Math.random()/100;
    this.x = window.innerWidth/2+this.R*Math.cos(this.teta);
    this.y = window.innerHeight/2+this.R*Math.sin(this.teta);
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
function Naziemne(obrazenia,rodzic) {
    this.r = 3;
	this.rodzicNumer = 0;
	this.R = rodzic.R;
    this.x = rodzic.x;
    this.y = rodzic.y;
    this.obrazenia=obrazenia;
    this.widocznosc=false;
    this.rysuj = function() {
		if(this.widocznosc && typeof(rodzic)==='object' && rodzic.widocznosc===true){
			this.x = rodzic.x;
			this.y = rodzic.y;
			c.beginPath();
			c.fillStyle="black";
			c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
			c.fill();
			c.stroke();
		}
    };
};
function Wahadlowiec(obrazenia,rodzic) {
    this.r = 3;
	this.cel = 0;
	this.maxLiczbaPociskow=[5,5,5];
	this.odlegloscDoCelu=300;
    this.rRodzic = rodzic.r;
	this.tetaRodzic=rodzic.teta;
	this.rodzicNumer = 0;
	this.R = 40;
	this.RduzeRodzic = rodzic.R;
    this.x = rodzic.x-30;
    this.y = rodzic.y+30;    
	this.xRodzic = rodzic.x;
    this.yRodzic = rodzic.y;
	this.vRodzic=rodzic.vOld;
	this.v=2;
	this.teta = 145*Math.PI/180;
	this.phi = 0;
    this.obrazenia=obrazenia;
    this.widocznosc=true;
	this.wystrzel = function(pocisk){
        pocisk.x=this.x;
        pocisk.y=this.y;
        pocisk.vx=-Math.sin(this.phi)*5;
        pocisk.vy=-Math.cos(this.phi)*5;
    }
    this.rysuj = function() {
		if(this.widocznosc){
			if (!ekran.pauza){	
				this.tetaRodzic=this.tetaRodzic+this.vRodzic*(Math.PI/180);
				this.xRodzic=window.innerWidth/2+this.RduzeRodzic*Math.cos(this.tetaRodzic);
				this.yRodzic=window.innerHeight/2+this.RduzeRodzic*Math.sin(this.tetaRodzic);
				this.teta=this.teta+this.v*(Math.PI/180);
				this.x=this.xRodzic+this.R*Math.cos(this.teta);
				this.y=this.yRodzic+this.R*Math.sin(this.teta);
			}
			c.save();
            c.translate((this.x),(this.y));
            c.rotate(-this.phi);
            c.translate(-(this.x),-(this.y));
            c.beginPath();
            c.fillStyle = '#000000';
            c.moveTo(this.x+0,this.y-3);
            c.lineTo(this.x+3,this.y+3);
            c.lineTo(this.x-3,this.y+3);
            c.lineTo(this.x,this.y-3);
            c.fill();
            c.stroke();
            c.restore();
		}
    };
};
function Spowalniacz(obrazenia) {
    this.r = 2;
	this.rodzicNumer = 0;
    this.obrazenia=obrazenia;
    this.widocznosc=false;
    this.rusz=false;
    this.rysuj = function() {
		if(this.widocznosc){
			if(menuBudowaniaSpowalniacz.rusz && this.rusz){
				this.x = mysz.x;
				this.y = mysz.y;
			}
			c.beginPath();
			c.fillStyle="black";
			c.moveTo(this.x-5,this.y-5);
			c.lineTo(this.x+5,this.y-5);
			c.lineTo(this.x+5,this.y+5);
			c.lineTo(this.x-5,this.y+5);
			c.lineTo(this.x-5,this.y-5);
			c.fill();
			c.stroke();
			
		}
    };
};
function Satelita(wspolrzednaX,wspolrzednaY,predkoscObiegu) {
    this.r = 3;
	this.x = wspolrzednaX;
    this.y = wspolrzednaY;
    this.R = fizyka.odleglosc(this.x,this.y,S.x,S.y);
    this.phi = 0;
	this.cel=1;
    this.odlegloscDoCelu=300;
	this.koszt = 100;
	this.teta=fizyka.podajKat(S,this);
    this.v=predkoscObiegu*Math.random();
    this.vOld=this.v;
    this.maxLiczbaPociskow=[5,5,5];
    this.widocznosc=true;
    this.rysuj = function() {
		if(!ekran.pauza){
			this.teta=this.teta+this.v*(Math.PI/180);
			this.x=S.x+this.R*Math.cos(this.teta);
			this.y=S.y+this.R*Math.sin(this.teta);
		}
        c.beginPath();
		c.fillStyle = "black";
        c.moveTo(this.x-5,this.y-5);
        c.lineTo(this.x+5,this.y-5);
        c.lineTo(this.x-5,this.y+5);
        c.lineTo(this.x+5,this.y+5);
        c.lineTo(this.x-5,this.y-5);
		c.fill();
        c.stroke();
    };
    this.wystrzel = function(pocisk){
        pocisk.x=this.x;
        pocisk.y=this.y;
        pocisk.vx=-Math.sin(this.phi)*5;
        pocisk.vy=-Math.cos(this.phi)*5;
    }
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
    this.x = wspolrzednaX;
    this.y = wspolrzednaY;
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
function Przeciwnik(wspolrzednaX,wspolrzednaY,kolor,obrazenia) {
    this.r = 2;
    this.x =wspolrzednaX+Math.random()*100-5;
    this.y =wspolrzednaY+Math.random()*100-5;
    this.vx=0;
    this.vy=0;
    this.v=2 + (Math.random()/10);
    this.vOld=this.v;
    this.vxOld=this.vx;
    this.vyOld=this.vy;
    this.kolor=kolor;
    this.zycie = 100;
    this.obrazenia = obrazenia*Math.random();
    this.widocznosc = true;
    this.phi=0;
	this.punktZbiorczy = false;
    this.cel=1;
    this.odlegloscDoCelu=300;
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
                this.vx=-Math.sin(this.phi)*this.v;
                this.vy=-Math.cos(this.phi)*this.v;
                this.x = this.x + this.vx;
                this.y = this.y + this.vy;
            };
        c.beginPath();
        c.fillStyle = this.kolor;
        c.save();
		c.translate((this.x),(this.y));
        c.rotate(-this.phi);
        c.translate(-(this.x),-(this.y));
        c.beginPath();
        c.moveTo(this.x+0,this.y-5);
        c.lineTo(this.x+5,this.y+5);
        c.lineTo(this.x-5,this.y+5);
        c.lineTo(this.x,this.y-5);
        c.fill();
        c.stroke();
        c.restore();
            if(this.x<-200||this.y<-200||this.x>window.innerWidth+200||this.y>window.innerHeight+200){
                this.widocznosc = false;
            };
        };
    };
};