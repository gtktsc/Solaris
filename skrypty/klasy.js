function Pocisk(wspolrzednaX,wspolrzednaY,promien,predkoscX,predkoscY,kolor) {
    this.srodekX=S.x;
    this.srodekY=S.y;
    this.przesuniecieX=0;
    this.przesuniecieY=0;
	this.rodzic = "who";
	this.rodzicNumer = 1;
    this.r = promien;
	this.cel=1;
	this.phi=0;
	this.predkoscMnoznik=1;
    this.x = wspolrzednaX-this.r;
    this.y = wspolrzednaY-this.r;
    this.vx=predkoscX;
    this.vy=predkoscY;
    this.vxOld=predkoscX;
    this.vyOld=predkoscY;
	this.predkoscSamoNapro=5;
    this.kolor=kolor;
    this.rodzaj=kolor;
    this.obrazenia=10;
    this.widocznosc = false;
    if (this.kolor==='red') {
        this.kolor='#ec008c';
        this.rodzaj="prosty"
    } else if (this.kolor==='green') { //teraz bedzie zolty
        this.kolor='#fff200';
        this.rodzaj="slonce"
    } else if (this.kolor==='grey'){
		this.kolor='#231f20';
		this.rodzaj="naprowadzanie"
	} else {
        this.kolor='#00aeef';
        this.rodzaj='planety';
    };
    this.rysuj = function() {
        if (this.widocznosc) {
            if(this.srodekX!=S.x){
                this.przesuniecieX=this.srodekX-S.x;
                this.x=this.x-this.przesuniecieX;
            };
            if(this.srodekY!=S.y){
                this.przesuniecieY=this.srodekY-S.y;
                this.y=this.y-this.przesuniecieY;
            };
                this.srodekX=S.x;
            this.srodekY=S.y;
            this.przesuniecieX=0;
            this.przesuniecieY=0;
			if((this.rodzaj==='naprowadzanie')&&!ekran.pauza){
                fizyka.kierunekDoObiektu1(przeciwnicy[this.cel],this);
				this.vx=-Math.sin(this.phi)*this.predkoscSamoNapro*this.predkoscMnoznik;
				this.vy=-Math.cos(this.phi)*this.predkoscSamoNapro*this.predkoscMnoznik;
			}
			this.x = (this.x + this.vx)*this.predkoscMnoznik;
			this.y = (this.y + this.vy)*this.predkoscMnoznik;

            c.beginPath();
            c.fillStyle = this.kolor;
            c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
            c.fill();
            //c.stroke();
            if (this.x<-5 || this.y<-5 || this.x>window.innerWidth || this.y>window.innerHeight) {
                this.widocznosc = false;
            };
        };
    };
};
function Planeta(promien,odlegloscR,katObrotu,katObiegu,predkoscObiegu,stalaGrawitacyjna) {
    this.r = Math.floor(promien+Math.random()*30);
    this.rOld = this.r;
    this.obecnePierscienie=Math.random();
    this.numerOrbity = 0;
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
    this.kolor=Math.random();
    this.R = Math.floor(odlegloscR*3+Math.random()*100);
	this.statekNaPlanecie=false;
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
					c.fillText(Math.round(this.zycie),this.x-18,this.y-this.r-10);	
				} else if(this.zycie<=99.5 && this.zycie>=10){
					c.fillText(Math.round(this.zycie),this.x-11,this.y-this.r-10);	
				} else {
					c.fillText(Math.round(this.zycie),this.x-4,this.y-this.r-10);	
				}
				c.globalAlpha=1;
			}
        this.teta=this.teta+this.v*(Math.PI/180);
        this.x=S.x+this.R*Math.cos(this.teta);
        this.y=S.y+this.R*Math.sin(this.teta);
        
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        if(this.kolor<=0.125){
            c.fillStyle="#cc9966";
        }else if(this.kolor<=0.125*2){
            c.fillStyle="#cc6600";
        }else if(this.kolor<=0.125*3){
            c.fillStyle="#336699";
        }else if(this.kolor<=0.125*4){
            c.fillStyle="#996600";
        }else if(this.kolor<=0.125*5){
            c.fillStyle="#cc9966";
        }else if(this.kolor<=0.125*6){
            c.fillStyle="#ffffcc";
        }else if(this.kolor<=0.125*7){
            c.fillStyle="#6699cc";
        }else if(this.kolor<=0.125*8){
            c.fillStyle="#6666cc";
        };
        c.fill();
        c.beginPath();
        c.arc(this.x,this.y,this.r,Math.PI/2,Math.PI*3/2,true);
        if(this.kolor<=0.125){
            c.fillStyle="#996666";
        }else if(this.kolor<=0.125*2){
            c.fillStyle="#996600";
        }else if(this.kolor<=0.125*3){
            c.fillStyle="#003399";
        }else if(this.kolor<=0.125*4){
            c.fillStyle="#cc3300";
        }else if(this.kolor<=0.125*5){
            c.fillStyle="#999966";
        }else if(this.kolor<=0.125*6){
            c.fillStyle="#ffcccc";
        }else if(this.kolor<=0.125*7){
            c.fillStyle="#3399cc";
        }else if(this.kolor<=0.125*8){
            c.fillStyle="#336699";
        };
        c.fill();
        c.fillStyle="black";
        if(this.obecnePierscienie>0.7&&this.obecnePierscienie<0.9){
            c.beginPath();
            c.moveTo(this.x+this.r, this.y+this.r);
            c.bezierCurveTo(this.x+3*this.r-this.r/2,
             this.y+3*this.r+this.r/2,
             this.x-3*this.r-this.r/2,
             this.y-3*this.r+this.r/2,
             this.x-this.r,
             this.y-this.r);
            c.strokeStyle = 'white';
            c.lineWidth = 3;
            c.stroke();
        }else if (this.obecnePierscienie>=0.9){
            c.beginPath();
            c.moveTo(this.x+this.r, this.y+this.r);
            c.bezierCurveTo(this.x+3*this.r-this.r/2,
             this.y+3*this.r+this.r/2,
             this.x-3*this.r-this.r/2,
             this.y-3*this.r+this.r/2,
             this.x-this.r,
             this.y-this.r);
            c.strokeStyle = 'black';
            c.lineWidth = 3;
            c.stroke();
        }
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
    this.srodekX=S.x;
    this.srodekY=S.y;
    this.przesuniecieX=0;
    this.przesuniecieY=0;
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
            if(this.srodekX!=S.x){
                this.przesuniecieX=this.srodekX-S.x;
                this.x=this.x-this.przesuniecieX;
            };
            if(this.srodekY!=S.y){
                this.przesuniecieY=this.srodekY-S.y;
                this.y=this.y-this.przesuniecieY;
            };
                this.srodekX=S.x;
            this.srodekY=S.y;
            this.przesuniecieX=0;
            this.przesuniecieY=0;
		if(this.widocznosc){
			if (!ekran.pauza){	
				this.tetaRodzic=this.tetaRodzic+this.vRodzic*(Math.PI/180);
				this.xRodzic=S.x+this.RduzeRodzic*Math.cos(this.tetaRodzic);
				this.yRodzic=S.y+this.RduzeRodzic*Math.sin(this.tetaRodzic);
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
    this.srodekX=S.x;
    this.srodekY=S.y;
    this.przesuniecieX=0;
    this.przesuniecieY=0;
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
        if(this.srodekX!=S.x){
            this.przesuniecieX=this.srodekX-S.x;
            this.x=this.x-this.przesuniecieX;
        };
        if(this.srodekY!=S.y){
            this.przesuniecieY=this.srodekY-S.y;
            this.y=this.y-this.przesuniecieY;
        };
        this.srodekX=S.x;
        this.srodekY=S.y;
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
    this.srodekX=S.x;
    this.srodekY=S.y;
    this.przesuniecieX=0;
    this.przesuniecieY=0;
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
        if(this.srodekX!=S.x){
            this.przesuniecieX=this.srodekX-S.x;
            this.x=this.x-this.przesuniecieX;
        };
        if(this.srodekY!=S.y){
            this.przesuniecieY=this.srodekY-S.y;
            this.y=this.y-this.przesuniecieY;
        };
            this.srodekX=S.x;
        this.srodekY=S.y;
        this.przesuniecieX=0;
        this.przesuniecieY=0;
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
            c.arc(S.x,S.y,this.R,0,Math.PI*2,true);
            c.stroke();
			c.globalAlpha=1;
        };
    };
};
function Gwiazda(wspolrzednaX,wspolrzednaY,promien,stalaGrawitacyjna) {
    this.bazaGracza=false;
    this.r = promien*2;
    this.przesuniecieX = 0;
    this.przesuniecieY = 0;
    this.szerokoscMapy = window.innerWidth;
    this.wysokoscMapy = window.innerHeight;
    this.przesuniecie = 10;
    this.height = promien*2;
    this.width = promien*2;
    this.x = wspolrzednaX+15;
    this.y = wspolrzednaY+20;
    this.xSrodek = this.x;
    this.ySrodek = this.y;
	this.widocznosc = true;
    this.g = stalaGrawitacyjna;
    this.rysuj = function() {
        if(this.bazaGracza){
            if(ekran.menu){
                if(mysz.x<50 && this.x<this.szerokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100+this.przesuniecie;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                    this.x=this.x+this.przesuniecie;
                } else if(mysz.x>window.innerWidth-50 && this.x>(this.szerokoscMapy-window.innerWidth)){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100-this.przesuniecie;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                    this.x=this.x-this.przesuniecie;
                } else if(mysz.y>window.innerHeight-50 && this.y>(this.wysokoscMapy-window.innerHeight)){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100-this.przesuniecie;
                    this.y=this.y-this.przesuniecie;
                } else if(mysz.y<50&& this.y<this.wysokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100+this.przesuniecie;
                    this.y=this.y+this.przesuniecie;
                } else {
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                }; 
            }else if(ekran.gra){
                if(mysz.x<50 && this.przesuniecieX>-this.szerokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100+this.przesuniecie;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                    this.x=this.x+this.przesuniecie;
                } else if(mysz.x>window.innerWidth-50 && this.przesuniecieX<this.szerokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100-this.przesuniecie;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                    this.x=this.x-this.przesuniecie;
                } else if(mysz.y>window.innerHeight-50 && this.przesuniecieY<this.wysokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100-this.przesuniecie;
                    this.y=this.y-this.przesuniecie;
                } else if(mysz.y<50&& this.przesuniecieY>-this.wysokoscMapy){
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100+this.przesuniecie;
                    this.y=this.y+this.przesuniecie;
                } else {
                    //this.x = Math.floor((window.innerWidth/2+S.r*2)/100)*100;
                    //this.y = Math.floor((window.innerHeight/2+S.r*2)/100)*100;
                };
            }
            this.przesuniecieX=this.xSrodek-this.x;
            this.przesuniecieY=this.ySrodek-this.y;
        }
        c.beginPath();
        c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
        c.fillStyle="#ffff66";
        c.fill();
        c.beginPath();
        c.arc(this.x,this.y,this.r,Math.PI/2,Math.PI*3/2,true);
        c.fillStyle="#ffcc66";
        c.fill();
        c.fillStyle="black";
        //c.stroke();
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
    this.srodekX=S.x;
    this.srodekY=S.y;
    this.przesuniecieX=0;
    this.przesuniecieY=0;
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
    this.rodzaj=kolor;
    this.zycie = 100;
    this.obrazenia = obrazenia*Math.random();
    this.widocznosc = true;
    this.phi=0;
	this.punktZbiorczy = false;
    this.cel=1;
    this.odlegloscDoCelu=300;
    if (this.kolor==='red') {
        this.kolor='#ec008c';
        this.rodzaj="planety";
    }else if (this.kolor==='green') {
        this.kolor='#fff200';
        this.rodzaj="gracz";
    }else {
        this.kolor='#00aeef';
        this.rodzaj="punkt";
    };
	this.rysuj = function() {
        if(this.srodekX!=S.x){
            this.przesuniecieX=this.srodekX-S.x;
            this.x=this.x-this.przesuniecieX;
        };
        if(this.srodekY!=S.y){
            this.przesuniecieY=this.srodekY-S.y;
            this.y=this.y-this.przesuniecieY;
        };
        this.srodekX=S.x;
        this.srodekY=S.y;
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
        //c.stroke();
        c.restore();
		c.globalAlpha=1;
            //if(this.x<-200||this.y<-200||this.x>window.innerWidth+200||this.y>window.innerHeight+200){
            //    this.widocznosc = false;
            //    this.zycie = -10;
            //};
        };
    };
};