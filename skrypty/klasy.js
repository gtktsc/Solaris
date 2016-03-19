function _KlasaPocisk(_wspolrzednaX,_wspolrzednaY,_promien,_predkoscX,_predkoscY,_kolor) {
    this.r = _promien;
	this.x = _wspolrzednaX-this.r;
	this.y = _wspolrzednaY-this.r;	
	this.vx=_predkoscX;
	this.vy=_predkoscY;	
	this.vxOld=_predkoscX;
	this.vyOld=_predkoscY;
	this.kolor=_kolor;
	this.widocznosc = false;
	
	if(this.kolor==='red'){
		this.kolor='#FF0000'
	}else if(this.kolor==='green'){
		this.kolor='#00FF00'
	}else {
		this.kolor='#0000FF'
	};
	
    this.rysuj = function() {
		if(this.widocznosc){
		this.x = this.x+ this.vx
		this.y = this.y +this.vy
		c.beginPath();
		c.fillStyle = this.kolor;
		c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		c.fill();
		c.stroke();
		if(this.x<-5||this.y<-5||this.x>window.innerWidth||this.y>window.innerHeight){
		this.widocznosc = false;
		

		}	
		}
    }

	
}

function _KlasaPlaneta(_wspolrzednaX,_wspolrzednaY,_promien,_odlegloscR,_katObrotu,_katObiegu,_predkoscObiegu,_stalaGrawitacyjna) {
    this.r = _promien;
    this.height = _promien*2;
    this.width = _promien*2;
	this.x = _wspolrzednaX+this.r;
	this.y = _wspolrzednaY+	this.r;	
	this.R = _odlegloscR;
	this.phi = _katObrotu;
	this.teta = _katObiegu;
	this.v=_predkoscObiegu;
	this.vOld=_predkoscObiegu;
	this.g=_stalaGrawitacyjna;
	this.zycie=100;
	this.widocznosc=true;
	
    this.rysuj = function(polozenieCentrumX,polozenieCentrumY) {

		this.teta=this.teta+this.v*(Math.PI/180);
		this.x=polozenieCentrumX+this.R*Math.cos(this.teta);
		this.y=polozenieCentrumY+this.R*Math.sin(this.teta);
		
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		c.stroke();
    }
	
	this.oddzialywanie = function(_obiekt){
		if(!ekran.pauza){
				this.dx=this.x-_obiekt.x;
				this.dy=this.y-_obiekt.y;
				this.odleglosc=Math.sqrt(this.dx * this.dx + this.dy * this.dy);
				_obiekt.vx=_obiekt.vx+this.g*(this.dx/this.odleglosc);
		_obiekt.vy=_obiekt.vy+this.g*(this.dy/this.odleglosc);}
	}
	
}

function _KlasaGwiazda(_wspolrzednaX,_wspolrzednaY,_promien,_stalaGrawitacyjna) {
    this.r = _promien;
    this.height = _promien*2;
    this.width = _promien*2;
	this.x = _wspolrzednaX-this.r;
	this.y = _wspolrzednaY-this.r;
	this.g = _stalaGrawitacyjna;	
	
    this.rysuj = function() {
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		c.stroke();
    }
			this.oddzialywanie = function(_obiekt){
				if(!ekran.pauza){
				this.dx=this.x-_obiekt.x;
				this.dy=this.y-_obiekt.y;
				this.odleglosc=Math.sqrt(this.dx * this.dx + this.dy * this.dy);
				_obiekt.vx=_obiekt.vx+this.g*(this.dx/this.odleglosc);
				_obiekt.vy=_obiekt.vy+this.g*(this.dy/this.odleglosc);}
	}
	
}

function _KlasaPrzeciwnik(_wspolrzednaX,_wspolrzednaY,_promien,_predkoscX,_predkoscY,_kolor,_katPhi) {
    this.r = _promien;
	this.x = _wspolrzednaX-this.r;
	this.y = _wspolrzednaY-this.r;	
	this.vx=_predkoscX;
	this.vy=_predkoscY;
	this.vxOld=_predkoscX;
	this.vyOld=_predkoscY;
	this.kolor=_kolor;
	this.zycie = 100;
	this.widocznosc = true;
	this.phi= _katPhi*Math.PI/180;
	
	if(this.kolor==='red'){
		this.kolor='#FF0000'
	}else if(this.kolor==='green'){
		this.kolor='#00FF00'
	}else {
		this.kolor='#0000FF'
	};
	
    this.rysuj = function() {
		if(this.widocznosc){
		if(!ekran.pauza){	
		this.vx=-Math.sin(this.phi);
		this.vy=-Math.cos(this.phi);
		
		this.x = this.x + this.vx
		this.y = this.y + this.vy
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
		

		}	
		}
    }
	
	
}