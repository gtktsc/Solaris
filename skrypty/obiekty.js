var fizyka = {
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
		statekGracza.x=window.innerWidth/2 - 50;
		statekGracza.y=0;
		statekGracza.vy=1;
		statekGracza.vx=0;
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
		for(var i =liczbaR+1;i<(liczbaR+liczbaG+2);i++){
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
		for(var i =(liczbaR+liczbaG+2);i<(liczbaR+liczbaG+liczbaB+2);i++){
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
                if(ekran.pauza && mysz.planeta && fizyka.klikniecie(myszKlik, planety[i])){
					orbity[i].widocznosc=true;
			    } else {
					orbity[i].widocznosc=false;
				}
            } else {
                planety.splice(i,1);
                fizyka.sprawdzWarunkiKonca();
			};
        };
    },
	pociski () {
		        for (i in pociski) {
            if(pociski[i].widocznosc){
                if(fizyka.dwaCiala(pociski[i],S)){
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
                    if(fizyka.dwaCiala(pociski[i],planety[x])){
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
                if(pociski[i].kolor==='#FF0000'){
                    statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]+1;
                } else if(pociski[i].kolor==='#00FF00'){
                    statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]+1;
                } else {
                    statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]+1;
                };
				pociski.splice(i,1);
            };
        };
	},
    odswiezEkranGry(){
        fizyka.planety();
        fizyka.pociski();
        fizyka.przeciwnicy();
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        fizyka.brzegOkna(statekGracza);
        fizyka.rysuj(S);
        fizyka.rysuj(statekGracza);
        fizyka.rysuj(orbity);
        fizyka.rysuj(planety);
        fizyka.rysuj(pociski);
        fizyka.rysuj(przeciwnicy);
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
				if(typeof(obiekt[i])==='object'){
                    obiekt[i].rysuj();
				}
            };
        }else{
            obiekt.rysuj();
        };
	},
    sprawdzWarunkiKonca: function(){
        if(przeciwnicy.length===1 || planety.length===1 || statekGracza.zycie<0){
			fizyka.szybkoscAnimacji('stop');
			ekran.numer=0;
        };
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
    r:10,
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
    numer:0,
    pauza: false,
	poziom: 1,
	
};