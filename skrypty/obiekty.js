var fizyka = {
	wahadlowce(){
		if(!ekran.pauza){
			for(i in wahadlowce){
				fizyka.najblizszyCel(przeciwnicy,wahadlowce[i]);
				fizyka.kierunekDoObiektu1(przeciwnicy[wahadlowce[i].cel],wahadlowce[i]);
				if(wahadlowce[i].maxLiczbaPociskow[0]>0){
					if(pociski.length>1){
							pociski[pociski.length] = new Pocisk(10,10,2,2,2,'red');
					} else {
							pociski[1] = new Pocisk(10,10,2,2,2,'red');
					};
					pociski[pociski.length-1].widocznosc=true;
					pociski[pociski.length-1].rodzic="wahadlowce";
					pociski[pociski.length-1].rodzicNumer=Number(i);
					wahadlowce[i].wystrzel(pociski[pociski.length-1]);
					wahadlowce[i].maxLiczbaPociskow[0]=wahadlowce[i].maxLiczbaPociskow[0]-1;
				}
			}		
		}		
	},
	spowalniacze(){
		if(!ekran.pauza){
			for(i in spowalniacze){
				for(x in przeciwnicy){
					if(fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)<80 && 
					fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)>51){
						przeciwnicy[x].v=przeciwnicy[x].vOld
					} else if (fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)<50){
						przeciwnicy[x].v=0.5;
					}
				}
			}		
		}
	},
	naziemni(){
		if(!ekran.pauza){
			for (i in naziemni){
				for (x in przeciwnicy) {
					if(fizyka.dwaCiala(przeciwnicy[x],naziemni[i])){
						przeciwnicy[x].zycie=przeciwnicy[x].zycie-naziemni[i].obrazenia/100;
					}
				}
			}
		}
	},
	satelity () {
		if(!ekran.pauza){
			for (i in satelity){
				fizyka.najblizszyCel(przeciwnicy,satelity[i]);
				if(satelity[i].odlegloscDoCelu<100){
					fizyka.kierunekDoObiektu1(przeciwnicy[satelity[i].cel],satelity[i]);
					if(satelity[i].maxLiczbaPociskow[0]>0){
						if(pociski.length>1){
							pociski[pociski.length] = new Pocisk(10,10,2,2,2,'red');
						} else {
							pociski[1] = new Pocisk(10,10,2,2,2,'red');
						};
					pociski[pociski.length-1].widocznosc=true;
					pociski[pociski.length-1].rodzic="satelity";
					pociski[pociski.length-1].rodzicNumer=Number(i);
					satelity[i].wystrzel(pociski[pociski.length-1]);
					satelity[i].maxLiczbaPociskow[0]=satelity[i].maxLiczbaPociskow[0]-1;
					}
				}
			}
		}
	},
	najblizszyCel(Cele,Atakujacy){
		if(Array.isArray(Cele) && typeof(Atakujacy)==='object'){
			Atakujacy.odlegloscDoCelu=window.innerWidth;
			for(x in Cele){
				if (fizyka.odleglosc(Cele[x].x,Cele[x].y,Atakujacy.x,Atakujacy.y)<Atakujacy.odlegloscDoCelu){
						Atakujacy.odlegloscDoCelu=fizyka.odleglosc(Cele[x].x,Cele[x].y,Atakujacy.x,Atakujacy.y);
						Atakujacy.cel=x;
				};
			};
		};
	},
	generujPlansze (liczbaPlanet,liczbaR,obrazeniaR,liczbaG,obrazeniaG,liczbaB,obrazeniaB) {
		przeciwnicy = [];
		planety = [];
		pociski = [];
		satelity = [];
		naziemni = [];
		wahadlowce = [];
		spowalniacze = [];
		statekGracza.x=window.innerWidth/2 - 50;
		statekGracza.y=0;
		statekGracza.vy=1;
		statekGracza.vx=0;
		mysz.rusz=false;
		mysz.statek=false;
		statekGracza.phi=180*Math.PI/180;
		for(var i =1;i<liczbaPlanet+1;i++){
            planety[i]= new Planeta(4,i*45,30,30,0.1,0.01);
            orbity[i]= new Orbita(planety[i].x,planety[i].y,planety[i].r,planety[i].R,planety[i].phi,planety[i].teta,planety[i].v);
        };
        var x=1;
        for(var i =1;i<=liczbaR;i++){

			switch(x){
				case 1:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'red',obrazeniaR);
				x=2;
				break;
				case 2:
				przeciwnicy[i] = new Przeciwnik (-100,-100,'red',obrazeniaR);
				x=3
				break;
				case 3:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,-100,'red',obrazeniaR);
				x=4;
				break;
				case 4:
				przeciwnicy[i] = new Przeciwnik (-100,window.innerHeight,'red',obrazeniaR);
				x=1;
				break;
			}
        };
			x=1;
		for(var i =liczbaR+1;i<=(liczbaR+liczbaG);i++){
						console.log(i)
			switch(x){
				case 1:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'green',obrazeniaG);
				x=2;
				break;
				case 2:
				przeciwnicy[i] = new Przeciwnik (-100,-100,'green',obrazeniaG);
				x=3
				break;
				case 3:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,-100,'green',obrazeniaG);
				x=4;
				break;
				case 4:
				przeciwnicy[i] = new Przeciwnik (-100,window.innerHeight,'green',obrazeniaG);
				x=1;
				break;
			}
        };
        x=1;
		for(var i =(liczbaR+liczbaG+1);i<=(liczbaR+liczbaG+liczbaB);i++){
			switch(x){
				case 1:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'blue',obrazeniaB);
				x=2;
				break;
				case 2:
				przeciwnicy[i] = new Przeciwnik (-100,-100,'blue',obrazeniaB);
				x=3
				break;
				case 3:
				przeciwnicy[i] = new Przeciwnik (window.innerWidth,-100,'blue',obrazeniaB);
				x=4;
				break;
				case 4:
				przeciwnicy[i] = new Przeciwnik (-100,window.innerHeight,'blue',obrazeniaB);
				x=1;
				break;
			}
        };
		ekran.pauza=false;
	},
	przeciwnicy () {
		for (i in przeciwnicy){
            if(przeciwnicy[i].zycie>0){
                if(przeciwnicy[i].kolor==='#FF0000'){
                    fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
					przeciwnicy[i].cel=planety.length-1;
            } else if(przeciwnicy[i].kolor==='#00FF00') {
                fizyka.kierunekDoObiektu1(statekGracza,przeciwnicy[i]);
            } else if(przeciwnicy[i].kolor==='#0000FF'){
				if(fizyka.odleglosc(S.x,S.y,przeciwnicy[i].x,przeciwnicy[i].y)>100 && przeciwnicy[i].punktZbiorczy === false){
				    fizyka.kierunekDoObiektu1(S,przeciwnicy[i]);
				} else {
					przeciwnicy[i].punktZbiorczy=true;
					fizyka.najblizszyCel(planety,przeciwnicy[i]);
					fizyka.kierunekDoObiektu1(planety[przeciwnicy[i].cel],przeciwnicy[i]);
				}

			};
            if(fizyka.dwaCiala(przeciwnicy[i],planety[przeciwnicy[i].cel])){
                planety[przeciwnicy[i].cel].zycie=planety[przeciwnicy[i].cel].zycie-przeciwnicy[i].obrazenia;
                planety[przeciwnicy[i].cel].r = planety[przeciwnicy[i].cel].r*(0.9998);    //trzeba okreslic elegancki sposob na to
            };
			if(i>3 && Math.floor(przeciwnicy[i].x)===Math.floor(przeciwnicy[i-1].x)){
				przeciwnicy[i].x=przeciwnicy[i].x+(Math.random()/2);
				przeciwnicy[i].y=przeciwnicy[i].y+(Math.random()/2);
			};
            } else {
                przeciwnicy.splice(i,1);
                fizyka.sprawdzWarunkiKonca();
			}
        };
	},
    planety () {
        for (i in planety) {
            if(planety[i].zycie>0){
                if(fizyka.dwaCiala(statekGracza,planety[i])){
                    statekGracza.zycie=statekGracza.zycie+statekGracza.szybkoscLeczenia;
                    console.log("statek planeta")
                };
                if(ekran.budowanie  && (fizyka.klikniecie(mysz, planety[i]) || fizyka.klikniecie(myszKlik,planety[i]))){
					orbity[i].widocznosc=true;
			    } else {
					orbity[i].widocznosc=false;
				}
            } else {
				for(z in naziemni){
					if(fizyka.klikniecie(planety[i],naziemni[z])){
					  naziemni.splice(z,1);
					}
				}
                planety.splice(i,1);
                fizyka.sprawdzWarunkiKonca();
			};
        };
    },
	pociski () {
		        for (i in pociski) {
            if(pociski[i].widocznosc){
                if(fizyka.dwaCiala(pociski[i],S) && pociski[i].rodzic==='statekGracza'){
                    pociski[i].widocznosc=false; //wpadanie na slonce
                    console.log("pocisk slonce")
                };
                for(z in przeciwnicy){
                    if(fizyka.dwaCiala(pociski[i],przeciwnicy[z])){
                        przeciwnicy[z].zycie=przeciwnicy[z].zycie-pociski[i].obrazenia;
                        pociski[i].widocznosc=false;                //wpadanie na przeciwnika
                    };
                };
                for(x in planety){
                    if(fizyka.dwaCiala(pociski[i],planety[x]) && pociski[i].rodzic==="statekGracza"){
                        pociski[i].widocznosc=false;                //wpadanie na planety
                        console.log("pocisk planeta")
                    };
					if (pociski[i].kolor==='#0000FF'){
						planety[x].oddzialywanie(pociski[i]); //jezeli niebieskie to graw ma wplyw
					}
                };
                if(pociski[i].kolor==='#00FF00' || pociski[i].kolor==='#0000FF'){
                    S.oddzialywanie(pociski[i]);                //na ruch zielonych pociskow ma wplyw tylko slonce
                };
            } else {
                if(pociski[i].kolor==='#FF0000' && pociski[i].rodzic==="statekGracza"){
                    statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]+1;
                } else if(pociski[i].kolor==='#00FF00'&& pociski[i].rodzic==="statekGracza"){
                    statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]+1;
                } else if(pociski[i].kolor==='#0000FF'&& pociski[i].rodzic==="statekGracza"){
                    statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]+1;
                } else if(pociski[i].rodzic==="satelity"){
					satelity[pociski[i].rodzicNumer].maxLiczbaPociskow[0]=satelity[pociski[i].rodzicNumer].maxLiczbaPociskow[0]+1;
				} else if(pociski[i].rodzic==="wahadlowce"){
					wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[0]=wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[0]+1;
				}
				pociski.splice(i,1);
            };
        };
	},
    odswiezEkranGry(){
        fizyka.planety();
        fizyka.pociski();
        fizyka.przeciwnicy();
        fizyka.satelity();
        fizyka.wahadlowce();
        fizyka.naziemni();
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        fizyka.brzegOkna(statekGracza);
		menuBudowaniaSpowalniacz.rysuj()
		menuBudowaniaSatelita.rysuj()
		menuBudowaniaWahadlowiec.rysuj()
		menuBudowaniaNaziemne.rysuj()
        fizyka.rysuj(S);
        fizyka.rysuj(statekGracza);
		fizyka.rysuj(naziemni);
		fizyka.rysuj(spowalniacze);
        fizyka.rysuj(orbity);
        fizyka.rysuj(planety);
        fizyka.rysuj(wahadlowce);
        fizyka.rysuj(pociski);
        fizyka.rysuj(przeciwnicy);
		fizyka.spowalniacze();
		fizyka.rysuj(satelity);
    },
	odswiezEkranMenu(){
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        fizyka.rysuj(S);
        fizyka.rysuj(poziomy);
    },
    pokazPunkt(x,y){
        c.beginPath();
        c.moveTo(x,0);
        c.lineTo(x,window.innerHeight);
        c.moveTo(0,y);
        c.lineTo(window.innerWidth,y);
        c.stroke();
    },
    rysuj: function(obiekt){
			if(Array.isArray(obiekt)){
            for(var i = 1;i<obiekt.length;i++){
				if(typeof(obiekt[i])==='object' && obiekt[i].widocznosc===true){
                    obiekt[i].rysuj();
				}
            };
        }else{
            obiekt.rysuj();
        };
	},
    sprawdzWarunkiKonca: function(){
        if(planety.length===1 || statekGracza.zycie<0){
			fizyka.szybkoscAnimacji('stop');
			ekran.menu=true;
			ekran.gra=false;
        } else if (przeciwnicy.length===1){
			console.log("przeciwnicy dead")
			statekGracza.doswiadczenie=statekGracza.doswiadczenie+statekGracza.aktualnyPoziom*1000;
			switch(statekGracza.aktualnyPoziom){
				case 1:
					if(statekGracza.odblokowanePoziomy===1){
						statekGracza.odblokowanePoziomy=2;
					}
				break;
				case 2:
					if(statekGracza.odblokowanePoziomy===2){
						statekGracza.odblokowanePoziomy=3;
					}
				break;
				case 2:
					if(statekGracza.odblokowanePoziomy===2){
						statekGracza.odblokowanePoziomy=3;
					}
				break;
				case 3:
					if(statekGracza.odblokowanePoziomy===3){
						statekGracza.odblokowanePoziomy=4;
					}
				break;
				case 4:
					if(statekGracza.odblokowanePoziomy===4){
						statekGracza.odblokowanePoziomy=5;
					}
				break;
				case 5:
					if(statekGracza.odblokowanePoziomy===5){
						statekGracza.odblokowanePoziomy=6;
					}
				break;
				case 6:
					if(statekGracza.odblokowanePoziomy===6){
						console.log("koniec gry")
					}
				break;
			}
			poziomy[statekGracza.odblokowanePoziomy].widocznosc=true;
			fizyka.szybkoscAnimacji('stop');
			ekran.menu=true;
			ekran.gra=false;
		}
	},
    podajKat: function (obiekt1,obiekt2){
		if (obiekt1!==null && obiekt2!==null && typeof(obiekt1)==='object'&& typeof(obiekt2)==='object'){
			var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
			var kat = 0;
            if (obiekt2.x<obiekt1.x) {
                kat=Math.PI-Math.asin((obiekt2.y-obiekt1.y)/odleglosc);

            } else {
                kat=Math.asin((obiekt2.y-obiekt1.y)/odleglosc);
            };
			return kat;
		}
	},
	kierunekDoObiektu1: function(obiekt1,obiekt2) {
        if (obiekt1!==null && obiekt2!==null && typeof(obiekt1)==='object'&& typeof(obiekt2)==='object'){
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (obiekt2.x<obiekt1.x) {
                obiekt2.phi=-Math.acos((obiekt2.y-obiekt1.y)/odleglosc);
            } else {
                obiekt2.phi=Math.acos((obiekt2.y-obiekt1.y)/odleglosc);
            };
        };
    },
    brzegOkna : function(obiekt) {
        if (obiekt.x>window.innerWidth && obiekt.y>window.innerHeight) {
            obiekt.x=-10;
            obiekt.y=-10;
        } else if (obiekt.x<-10&&obiekt.y<-10) {
            obiekt.x=window.innerWidth-10;
            obiekt.y=window.innerHeight-10;
        } else if (obiekt.x>window.innerWidth) {
            obiekt.x=-10;
        } else if (obiekt.y>window.innerHeight) {
            obiekt.y=-10;
        } else if (obiekt.x<-10){
            obiekt.x=window.innerWidth-10;
        } else if (obiekt.y<-10){
            obiekt.y=window.innerHeight-10;};
    },
	odleglosc: function (x1,y1,x2,y2){
            var dx=x1-x2;
            var dy=y1-y2;
            var odlegloscObiektow=Math.sqrt(dx * dx + dy * dy);
			return odlegloscObiektow;
	},
    dwaCiala: function(obiekt1,obiekt2){
        if (!ekran.pauza && obiekt1!==null && obiekt2!==null) {
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (odleglosc<(obiekt1.r+obiekt2.r+5)) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    },
    klikniecie: function(obiekt1,obiekt2){
        if (obiekt1!==null && obiekt2!==null){
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (odleglosc<(obiekt1.r+obiekt2.r)) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
        
    },
    szybkoscAnimacji : function(stan){
        switch(stan){
            case 'stop':
                if(!ekran.pauza){
                    for(i in pociski){
                        pociski[i].vxOld=pociski[i].vx;
                        pociski[i].vyOld=pociski[i].vy;
                        pociski[i].vx=0;
                        pociski[i].vy=0;
                    };
                    for(i in planety){
                        planety[i].vOld=planety[i].v;
                        planety[i].v=0;
                    };
                    for(i in satelity){
                        satelity[i].vOld=satelity[i].v;
                        satelity[i].v=0;
                    };
                    for(i in przeciwnicy){
                        przeciwnicy[i].vxOld=przeciwnicy[i].vx;
                        przeciwnicy[i].vyOld=przeciwnicy[i].vy;
                        przeciwnicy[i].vx=0;
                        przeciwnicy[i].vy=0;
                    };
                    statekGracza.vxOld=statekGracza.vx;
                    statekGracza.vyOld=statekGracza.vy;
                    statekGracza.vx=0;
                    statekGracza.vy=0;
                };
                ekran.pauza=true;
            break;
            case 'start':
                ekran.pauza=false;
                for(i in pociski){
                    pociski[i].vx=pociski[i].vxOld;
                    pociski[i].vy=pociski[i].vyOld;
                };
                for(i in planety){
                    planety[i].v=planety[i].vOld;
                };
                for(i in satelity){
                    satelity[i].v=satelity[i].vOld;
                };
                for(i in przeciwnicy){
                    przeciwnicy[i].vx=przeciwnicy[i].vxOld;
                    przeciwnicy[i].vy=przeciwnicy[i].vyOld;
                };
                statekGracza.vx=statekGracza.vxOld;
                statekGracza.vy=statekGracza.vyOld;
            break;
        };
    }
};
var statekGracza = {
    x: window.innerWidth/2 - 50,
    y: -5,
    r: 2,
    zycie: 100,
    maxLiczbaPociskow: [30,30,30],
    vx: 0,
    vy: 1,
    vxOld: 0,
    vyOld: 1,
    odlegloscDoCelu: 300,
    cel: 1,
	szybkoscLeczenia: 0.01,
	energia: 1000,
	doswiadczenie: 0,
	odblokowanePoziomy: 1,
	aktualnyPoziom: 0,
    phi: 180*Math.PI/180,
    rysuj : function(){
        this.x=this.x+this.vx;
        this.y=this.y+this.vy;
        if(mysz.statek){
            c.save();
            c.translate((this.x),(this.y));
            c.rotate(-this.phi);
            c.translate(-(this.x),-(this.y));
            c.beginPath();
            c.fillStyle = '#000000';
            c.moveTo(this.x+0,this.y-5);
            c.lineTo(this.x+5,this.y+5);
            c.lineTo(this.x-5,this.y+5);
            c.lineTo(this.x,this.y-5);
            c.fill();
            c.stroke();
            c.restore();
        };
        c.save();
        c.translate((this.x),(this.y));
        c.rotate(-this.phi);
        c.translate(-(this.x),-(this.y));
        c.beginPath();
        c.moveTo(this.x+0,this.y-5);
        c.lineTo(this.x+5,this.y+5);
        c.lineTo(this.x-5,this.y+5);
        c.lineTo(this.x,this.y-5);
        c.stroke();
        c.restore();
    },
    porusz : function(jak) {
        switch (jak) {
            case "doPrzodu" :
                this.vx=this.vx-Math.sin(this.phi);
                this.vy=this.vy-Math.cos(this.phi);
            break;
            case 'hamuj' :
                this.vx=this.vx*0.90;
                this.vy=this.vy*0.90;
            break;
            case 'obrocwPrawo' :
                this.phi=this.phi-5*(Math.PI/180);
            break;
            case 'obrocwLewo' :
                this.phi=this.phi+5*(Math.PI/180);
            break;
        };
    },
    wystrzel : function(pocisk){
        pocisk.x=this.x;
        pocisk.y=this.y;
        pocisk.vx=this.vx-Math.sin(this.phi)*3;
        pocisk.vy=this.vy-Math.cos(this.phi)*3;
    }
};
var mysz ={
    x:0,
    y:0,
    r:1,
    planeta: false,
    statek: false,
    rusz: false,    
	cel: 1,
    odlegloscDoCelu: 300,
};
var myszKlik ={
    x:0,
    y:0,
    r:10,
    planeta: false,
    statek: false,
    rusz: false,
    cel: 1,
    odlegloscDoCelu: 300,
};
var ekran ={
	mysz: "tlo",
    numer:0,
    pauza: false,
	poziom: 1,
	budowanie: false,
	gra: false,
	menu: true,
};
var menuBudowaniaSpowalniacz ={
	x: 0,
	y: 0,
	r: 15,
	widocznosc: false,
	rusz: false,
	rysuj: function(){
		if(this.widocznosc){
			c.beginPath();
			c.arc(this.x,this.y,15,0,Math.PI*2,true);
			c.stroke();
			c.moveTo(this.x-5,this.y-5);
			c.lineTo(this.x+5,this.y-5);
			c.lineTo(this.x+5,this.y+5);
			c.lineTo(this.x-5,this.y+5);
			c.lineTo(this.x-5,this.y-5);
			c.stroke();

	}
	},
};
var menuBudowaniaSatelita ={
	x: 0,
	y: 0,
	r: 15,
	widocznosc: false,
	rysuj: function(){
		if(this.widocznosc){
			c.beginPath();
			c.arc(this.x,this.y,15,0,Math.PI*2,true);
			c.stroke();
			c.beginPath();
			c.moveTo(this.x-5,this.y-5);
			c.lineTo(this.x+5,this.y-5);
			c.lineTo(this.x-5,this.y+5);
			c.lineTo(this.x+5,this.y+5);
			c.lineTo(this.x-5,this.y-5);
			c.stroke();
	}
	},
};
var menuBudowaniaWahadlowiec ={
	x: 0,
	y: 0,
	r: 15,
	widocznosc: false,
	rysuj: function(){
		if(this.widocznosc){
			c.beginPath();
			c.arc(this.x,this.y,15,0,Math.PI*2,true);
			c.stroke();
			c.beginPath();
			c.moveTo(this.x+0,this.y-3);
			c.lineTo(this.x+3,this.y+3);
			c.lineTo(this.x-3,this.y+3);
			c.lineTo(this.x,this.y-3);
			c.stroke();
	}
	},
};
var menuBudowaniaNaziemne ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	rysuj: function(){
		if(this.widocznosc){
			c.beginPath();
			c.arc(this.x,this.y,15,0,Math.PI*2,true);
			c.stroke();
			if(planety[this.rodzic].obecnaObrona){
				c.beginPath();
				c.fillStyle = "black";
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.fill();
				c.stroke();	
			} else {
				c.beginPath();
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.stroke();
			}
	}
	},
};