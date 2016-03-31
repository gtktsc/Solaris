function Pocisk(wspolrzednaX,wspolrzednaY,promien,predkoscX,predkoscY,kolor) {
	this.rodzic = "who";
	this.rodzicNumer = 1;
    this.r = promien;
	this.cel=1;
	this.phi=0;
    this.x = wspolrzednaX-this.r;
    this.y = wspolrzednaY-this.r;
    this.vx=predkoscX;
    this.vy=predkoscY;
    this.vxOld=predkoscX;
    this.vyOld=predkoscY;
	this.predkoscSamoNapro=5;
    this.kolor=kolor;
    this.obrazenia=10;
    this.widocznosc = false;
    if (this.kolor==='red') {
        this.kolor='#FF0000';
    } else if (this.kolor==='green') {
        this.kolor='#00FF00';
    } else if (this.kolor==='grey'){
		this.kolor='#BDBDBD';
	} else {
        this.kolor='#0000FF';
    };
    this.rysuj = function() {
        if (this.widocznosc) {
			if((this.kolor==='#BDBDBD' || this.kolor==='grey')&&!ekran.pauza){
                fizyka.kierunekDoObiektu1(przeciwnicy[this.cel],this);
				this.vx=-Math.sin(this.phi)*this.predkoscSamoNapro;
				this.vy=-Math.cos(this.phi)*this.predkoscSamoNapro;
			}
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;
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
	this.obecnaNaziemna = false;
	this.obecnaNaziemnaWiecej = 0;
	this.obecnaNaziemnaLepiej = 0;
	this.obecnySpowalniacz = false;
	this.obecnySpowalniaczWiecej = 0;	
	this.obecnySpowalniaczLepiej = 0;
	this.obecnaSatelita = false;
	this.obecnaSatelitaWiecej = 0;
	this.obecnaSatelitaLepiej = 0;
	this.obecnyWahadlowiec = false;
	this.obecnyWahadlowiecWiecej = 0;	
	this.obecnyWahadlowiecLepiej = 0;
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
			if(!ekran.menu && fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(this.zycie===100){
					c.fillText(Math.round(this.zycie),this.x-18,this.y-12);	
				} else if(this.zycie<=99.5 && this.zycie>=10){
					c.fillText(Math.round(this.zycie),this.x-11,this.y-12);	
				} else {
					c.fillText(Math.round(this.zycie),this.x-4,this.y-12);	
				}
				c.globalAlpha=1;
			}
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
	this.poziomWiecej = 0;
	this.poziomLepiej = 0;
	this.R = rodzic.R;
    this.x = rodzic.x;
    this.y = rodzic.y;
    this.obrazenia=obrazenia;
    this.widocznosc=false;
    this.rysuj = function() {
		if(this.widocznosc && typeof(rodzic)==='object' && rodzic.widocznosc===true){
			if(this.poziomLepiej>0 && fizyka.klikniecie(mysz,this)){
				c.beginPath();
				c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
				c.stroke();
			}
			this.x = rodzic.x;
			this.y = rodzic.y;
			c.beginPath();
			c.fillStyle="black";
			c.arc(this.x,this.y,3,0,Math.PI*2,true);
			c.fill();
			c.stroke();
		}
    };
};
function Wahadlowiec(obrazenia,rodzic) {
    this.r = 3;
	this.cel = 0;
	this.rodzicNumer = 0;
	this.maxLiczbaPociskow=[2,2,2,0];
	this.odlegloscDoCelu=300;
    this.rRodzic = rodzic.r;
	this.tetaRodzic=rodzic.teta;
	this.rodzicNumer = 0;
	this.poziomWiecej = 0;
	this.poziomLepiej = 0;
	this.R = 40;
	this.RduzeRodzic = rodzic.R;
    this.x = rodzic.x-30;
    this.y = rodzic.y+30;    
	this.xRodzic = rodzic.x;
    this.yRodzic = rodzic.y;
	this.vRodzic=rodzic.vOld;
	this.v=2;
	this.predkoscPocisku=5;
	this.teta = 145*Math.PI/180;
	this.phi = 0;
    this.obrazenia=obrazenia;
    this.widocznosc=true;
	this.wystrzel = function(pocisk){
        pocisk.x=this.x;
        pocisk.y=this.y;
		pocisk.obrazenia=this.obrazenia;
        pocisk.vx=-Math.sin(this.phi)*this.predkoscPocisku;
        pocisk.vy=-Math.cos(this.phi)*this.predkoscPocisku;
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
	this.x = -10;
	this.y = -10;
	this.alfa=false;
    this.zasieg = 50;
	this.poziomWiecej = 0;
	this.poziomLepiej = 0;
	this.rodzicNumer = 0;
    this.obrazenia=obrazenia;
    this.widocznosc=false;
    this.rusz=false;
    this.rysuj = function() {
		if(this.widocznosc){
			if(menuBudowaniaSpowalniacz.rusz && this.rusz && ekran.budowanie){
				this.x = mysz.x;
				this.y = mysz.y;
			}
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.beginPath();
				c.globalAlpha=0.2;
				c.arc(this.x,this.y,this.zasieg,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
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
	this.rodzicNumer = 0;
	this.x = wspolrzednaX;
    this.y = wspolrzednaY;
    this.R = fizyka.odleglosc(this.x,this.y,S.x,S.y);
    this.phi = 0;
	this.cel=1;
	this.czasOddzialywaniaWiecej=3000;
	this.zasiegOddzialywaniaWiecej=100;
	this.poziomWiecej=0;
	this.poziomLepiej=0;
    this.odlegloscDoCelu=300;
	this.koszt = 100;
	this.teta=fizyka.podajKat(S,this);
    this.v=predkoscObiegu*Math.random();
    this.vOld=this.v;
    this.maxLiczbaPociskow=[2,2,2];
    this.widocznosc=true;
	this.obrazenia=10;
	this.predkoscPocisku=5;
    this.rysuj = function() {
		if(!ekran.pauza){
			this.teta=this.teta+this.v*(Math.PI/180);
			this.x=S.x+this.R*Math.cos(this.teta);
			this.y=S.y+this.R*Math.sin(this.teta);
		}
		if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
			c.beginPath();
			c.globalAlpha=0.2;
			c.arc(this.x,this.y,this.zasiegOddzialywaniaWiecej,0,Math.PI*2,true);
			c.stroke();
			c.globalAlpha=1;
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
		pocisk.obrazenia=this.obrazenia;
        pocisk.vx=-Math.sin(this.phi)*this.predkoscPocisku;
        pocisk.vy=-Math.cos(this.phi)*this.predkoscPocisku;
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
			c.globalAlpha=0.2;
            c.beginPath();
            c.arc(window.innerWidth/2,window.innerHeight/2,this.R,0,Math.PI*2,true);
            c.stroke();
			c.globalAlpha=1;
        };
    };
};
function Gwiazda(wspolrzednaX,wspolrzednaY,promien,stalaGrawitacyjna) {
    this.r = promien;
    this.height = promien*2;
    this.width = promien*2;
    this.x = wspolrzednaX;
    this.y = wspolrzednaY;
	this.widocznosc = true;
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
	this.zasiegSpowalniacza=false;
	this.zasiegSatelityWiecej=false;
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
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "18px Arial";
				c.fillStyle = this.kolor;
				if(this.zycie>=100){
					c.fillText(Math.round(this.zycie),this.x-40,this.y);	
				} else if(this.zycie<=99.5 && this.zycie>=10){
					c.fillText(Math.round(this.zycie),this.x-30,this.y);	
				} else {
					c.fillText(Math.round(this.zycie),this.x-20,this.y);	
				}
				c.globalAlpha=1;
			}
        if (this.widocznosc) {
		if(this.zasiegSpowalniacza){
			this.v=0.5;
		} else {
			this.v=this.vOld
		}
		if(!ekran.pauza) {
			this.vx=-Math.sin(this.phi)*this.v;
			this.vy=-Math.cos(this.phi)*this.v;
			this.x = this.x + this.vx;
			this.y = this.y + this.vy;
		};
		if(this.zasiegSatelityWiecej){
			c.globalAlpha=0.5;
		}
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
		c.globalAlpha=1;
            if(this.x<-200||this.y<-200||this.x>window.innerWidth+200||this.y>window.innerHeight+200){
                this.widocznosc = false;
            };
        };
    };
};