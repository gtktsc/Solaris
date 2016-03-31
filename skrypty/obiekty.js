var fizyka = {
	nieDotykaMenu(){
		if(!fizyka.klikniecie(mysz,menuBudowaniaNaziemne)&&
		!fizyka.klikniecie(mysz,menuBudowaniaNaziemneWiecej)&&
		!fizyka.klikniecie(mysz,menuBudowaniaNaziemneLepiej)&&
		!fizyka.klikniecie(mysz,menuBudowaniaSatelita)&&
		!fizyka.klikniecie(mysz,menuBudowaniaSatelitaWiecej)&&
		!fizyka.klikniecie(mysz,menuBudowaniaSatelitaLepiej)&&
		!fizyka.klikniecie(mysz,menuBudowaniaWahadlowiec)&& 
		!fizyka.klikniecie(mysz,menuBudowaniaWahadlowiecWiecej)&& 
		!fizyka.klikniecie(mysz,menuBudowaniaWahadlowiecLepiej)&& 
		!fizyka.klikniecie(mysz,menuBudowaniaSpowalniacz)&& 
		!fizyka.klikniecie(mysz,menuBudowaniaSpowalniaczWiecej)&& 
		!fizyka.klikniecie(mysz,menuBudowaniaSpowalniaczLepiej)
		){
			return true;
		}else{
			return false;
		};
	},
	statekGracza(){
		if(statekGracza.zycie<=0){
			statekGracza.widocznosc=false;
			statekGracza.zycie=100;
			statekGracza.x=window.innerWidth/2;
			statekGracza.y=0;
			statekGracza.vy=1;
			statekGracza.vx=0;
			statekGracza.phi=180*Math.PI/180;
			statekGracza.odradzanie=true;
			setTimeout(function(){
				statekGracza.widocznosc=true;
				statekGracza.odradzanie=false;
				}, statekGracza.czasOdrodzenia);
		} else {
			if(statekGracza.widocznosc){
				if(!mysz.atakuj && statekGracza.vx===0 && statekGracza.vy===0){
					trybAutoStatekGracza;
				} else {
					statekGracza.trybAuto=false;
				}
				if(statekGracza.trybAuto && !statekGracza.przeladowanie){
					fizyka.najblizszyCel(przeciwnicy,statekGracza);
					if(statekGracza.odlegloscDoCelu<statekGracza.zasieg){
						fizyka.kierunekDoObiektu1(przeciwnicy[statekGracza.cel],statekGracza);
						if(statekGracza.maxLiczbaPociskow[0]>0){
							if(pociski.length>1){
								pociski[pociski.length] = new Pocisk(10,10,2,2,2,'red');
							} else {
								pociski[1] = new Pocisk(10,10,2,2,2,'red');
							};
							pociski[pociski.length-1].widocznosc=true;
							pociski[pociski.length-1].rodzic="statekGracza";
							statekGracza.wystrzel(pociski[pociski.length-1]);
							statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]-1;
						};
						statekGracza.przeladowanie=true;
					}
				} else if(!statekGracza.trybAuto){
					if(mysz.atakuj){
						fizyka.kierunekDoObiektu1(przeciwnicy[statekGracza.cel],statekGracza);
						statekGracza.vx=0;
						statekGracza.vy=0;
						if(statekGracza.maxLiczbaPociskow[0]>0){
							if(pociski.length>1){
								pociski[pociski.length] = new Pocisk(10,10,2,2,2,'red');
							} else {
								pociski[1] = new Pocisk(10,10,2,2,2,'red');
							};
							pociski[pociski.length-1].widocznosc=true;
							pociski[pociski.length-1].rodzic="statekGracza";
							statekGracza.wystrzel(pociski[pociski.length-1]);
							statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]-1;
						}
						mysz.atakuj=false;
					}
				}
			}
		}
	},
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
					pociski[pociski.length-1].cel=wahadlowce[i].cel;
					wahadlowce[i].wystrzel(pociski[pociski.length-1]);
					wahadlowce[i].maxLiczbaPociskow[0]=wahadlowce[i].maxLiczbaPociskow[0]-1;
				}
				if(wahadlowce[i].poziomWiecej>0 && wahadlowce[i].maxLiczbaPociskow[3]>0){
					if(pociski.length>1){
							pociski[pociski.length] = new Pocisk(10,10,2,2,2,'grey');
					} else {
							pociski[1] = new Pocisk(10,10,2,2,2,'grey');
					};
					pociski[pociski.length-1].widocznosc=true;
					pociski[pociski.length-1].rodzic="wahadlowce";
					pociski[pociski.length-1].rodzicNumer=Number(i);
					pociski[pociski.length-1].cel=wahadlowce[i].cel;
					wahadlowce[i].wystrzel(pociski[pociski.length-1]);
					wahadlowce[i].maxLiczbaPociskow[3]=wahadlowce[i].maxLiczbaPociskow[3]-1;
				}
			}		
		}		
	},
	spowalniacze(){
		if(!ekran.pauza){
			for(i in spowalniacze){
				for(x in przeciwnicy){
					if(fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)<=spowalniacze[i].zasieg+1 && fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)>spowalniacze[i].zasieg){
						przeciwnicy[x].zasiegSpowalniacza=false;
					} else if (fizyka.odleglosc(spowalniacze[i].x,spowalniacze[i].y,przeciwnicy[x].x,przeciwnicy[x].y)<=spowalniacze[i].zasieg){
						przeciwnicy[x].zasiegSpowalniacza=true;
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
						przeciwnicy[x].zycie=przeciwnicy[x].zycie-naziemni[i].obrazenia;
					}
				}
			}
		}
	},
	satelity () {
		if(!ekran.pauza){
			for (i in satelity){
				fizyka.najblizszyCel(przeciwnicy,satelity[i]);
				if(satelity[i].odlegloscDoCelu<satelity[i].zasiegOddzialywaniaWiecej){
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
				if(satelity[i].poziomWiecej>0){
					for (n in przeciwnicy){	
						if(fizyka.odleglosc(przeciwnicy[n].x,przeciwnicy[n].y,satelity[i].x,satelity[i].y)<satelity[i].zasiegOddzialywaniaWiecej){
							przeciwnicy[n].zasiegSatelityWiecej=true;
						} else {	
						przeciwnicy[n].zasiegSatelityWiecej=false;
						}
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
		statekGracza.x=window.innerWidth/2;
		statekGracza.y=0;
		statekGracza.vy=1;
		statekGracza.vx=0;
		statekGracza.widosznosc=true;
		statekGracza.maxLiczbaPociskow=[30,30,30];
		mysz.rusz=false;
		mysz.statek=false;
		statekGracza.phi=180*Math.PI/180;
		for(var i =1;i<liczbaPlanet+1;i++){
            planety[i]= new Planeta(2,i*(((window.innerHeight-50)/2)/liczbaPlanet),30,30,0.1,0.01);
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
	generujFale(liczbaR,obrazeniaR,zycieR,liczbaG,obrazeniaG,zycieG,liczbaB,obrazeniaB,zycieB){
		przeciwnicy = [];
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
			przeciwnicy[i].zycie=zycieR;
        };
			x=1;
		for(var i =liczbaR+1;i<=(liczbaR+liczbaG);i++){
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
			przeciwnicy[i].zycie=zycieG
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
			przeciwnicy[i].zycie=zycieB
        };
	},
	przeciwnicy () {
		for (i in przeciwnicy){
            if(przeciwnicy[i].zycie>0){
				if(przeciwnicy[i].zasiegSatelityWiecej){
					przeciwnicy[i].zycie=przeciwnicy[i].zycie-0.1;
				};
                if(przeciwnicy[i].kolor==='#FF0000'){
                    fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
					przeciwnicy[i].cel=planety.length-1;
				} else if(przeciwnicy[i].kolor==='#00FF00') {
					if(statekGracza.widocznosc){
						fizyka.kierunekDoObiektu1(statekGracza,przeciwnicy[i]);
					}else{
						fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
						przeciwnicy[i].cel=planety.length-1;
					}
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
				if(fizyka.dwaCiala(przeciwnicy[i],statekGracza) && przeciwnicy[i].kolor==='#00FF00'){
					statekGracza.zycie=statekGracza.zycie-przeciwnicy[i].obrazenia;
				};
				if(i>3 && Math.floor(przeciwnicy[i].x)===Math.floor(przeciwnicy[i-1].x)){
					przeciwnicy[i].x=przeciwnicy[i].x+(Math.random()/2);
					przeciwnicy[i].y=przeciwnicy[i].y+(Math.random()/2);
				};
			} else {
				if(przeciwnicy[i].kolor==='#FF0000'){
					ekran.energia=ekran.energia+10*ekran.falaNumer;
				} else if(przeciwnicy[i].kolor==='#00FF00') {
				   ekran.energia=ekran.energia+8*ekran.falaNumer;
				} else if(przeciwnicy[i].kolor==='#0000FF'){
					ekran.energia=ekran.energia+10*ekran.falaNumer;
				};
				przeciwnicy.splice(i,1);
				fizyka.sprawdzWarunkiKonca();
			}
        };
	},
    planety () {
        for (i in planety) {
            if(planety[i].zycie>0){
				if(ekran.gra && !ekran.pauza){
					if(planety[i].obecnaNaziemnaWiecej===1 && planety[i].zycie<=100){
						planety[i].zycie=planety[i].zycie+0.01;
					} else if(planety[i].obecnaNaziemnaWiecej===2 && planety[i].zycie<=100){
						planety[i].zycie=planety[i].zycie+0.02;
					}
				}
                if(fizyka.dwaCiala(statekGracza,planety[i])){
                    statekGracza.zycie=statekGracza.zycie+statekGracza.szybkoscLeczenia;
                };
                if(ekran.budowanie  && fizyka.odleglosc(mysz.x,mysz.y,planety[i].x,planety[i].y)<10){
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
					 if(pociski[i].kolor==='grey' || pociski[i].kolor==='#BDBDBD'){
						wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[3]=wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[3]+1;
					} else {
						wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[0]=wahadlowce[pociski[i].rodzicNumer].maxLiczbaPociskow[0]+1;
					}
					
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
		fizyka.statekGracza();
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
		pasekMenu.rysuj();
        fizyka.brzegOkna(statekGracza);
		menuBudowaniaSpowalniacz.rysuj()
		menuBudowaniaSpowalniaczLepiej.rysuj()
		menuBudowaniaSpowalniaczWiecej.rysuj()
		menuBudowaniaSatelita.rysuj()
		menuBudowaniaSatelitaWiecej.rysuj()
		menuBudowaniaSatelitaLepiej.rysuj()
		menuBudowaniaWahadlowiec.rysuj()
		menuBudowaniaWahadlowiecWiecej.rysuj()
		menuBudowaniaWahadlowiecLepiej.rysuj()
		menuBudowaniaNaziemne.rysuj()
		menuBudowaniaNaziemneWiecej.rysuj()
		menuBudowaniaNaziemneLepiej.rysuj()
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
		pasekMenu.rysuj();
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
        if(planety.length===1){
			fizyka.szybkoscAnimacji('stop');
			ekran.menu=true;
			ekran.gra=false;
        } else if (przeciwnicy.length===1){
			if(ekran.falaNumer<ekran.liczbaFal){
				ekran.falaNumer=ekran.falaNumer+1;
				ekran.liczbaPrzeciwnikow=statekGracza.aktualnyPoziom*ekran.falaNumer;
				ekran.obrazeniaPrzeciwnikow=ekran.falaNumer/10;
				fizyka.generujFale(ekran.liczbaPrzeciwnikow,ekran.obrazeniaPrzeciwnikow,100+ekran.falaNumer*10,ekran.liczbaPrzeciwnikow,ekran.obrazeniaPrzeciwnikow,100+ekran.falaNumer*10,ekran.liczbaPrzeciwnikow,ekran.obrazeniaPrzeciwnikow,100+ekran.falaNumer*10);			
			}else if (ekran.falaNumer===ekran.liczbaFal){
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
        if (!ekran.pauza && obiekt1!==null && obiekt2!==null && typeof(obiekt1)==='object'&& typeof(obiekt2)==='object') {
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
            if (odleglosc<(obiekt1.r+obiekt2.r) && obiekt1.widocznosc && obiekt2.widocznosc) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
        
    },
	klikniecieProstokat: function(obiekt1,obiekt2){
        if (obiekt1!==null && obiekt2!==null){
            if (obiekt1.x>obiekt2.x && obiekt1.x<obiekt2.width && obiekt1.y>obiekt2.y && obiekt1.y<obiekt2.height) {
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
				mysz.planetaNumer=0;
				menuBudowaniaNaziemne.widocznosc=false;
				menuBudowaniaNaziemneWiecej.widocznosc=false;
				menuBudowaniaNaziemneLepiej.widocznosc=false;
				menuBudowaniaWahadlowiec.widocznosc=false;	
				menuBudowaniaWahadlowiecWiecej.widocznosc=false;					
				menuBudowaniaWahadlowiecLepiej.widocznosc=false;	
				menuBudowaniaSpowalniacz.widocznosc=false;					
				menuBudowaniaSpowalniaczWiecej.widocznosc=false;
				menuBudowaniaSpowalniaczLepiej.widocznosc=false;
				menuBudowaniaSatelita.widocznosc=false;					
				menuBudowaniaSatelitaWiecej.widocznosc=false;					
				menuBudowaniaSatelitaLepiej.widocznosc=false;	
            break;
        };
    }
};
var statekGracza = {
    x: window.innerWidth/2 - 50,
    y: -5,
    r: 2,
	czasOdrodzenia: 10000,
	widocznosc: true,
    zycie: 100,
    maxLiczbaPociskow: [30,30,30],
    zasieg: 200,
	trybAuto: false,
	trybAutoCzas: 10000,
    przeladowanie: false,
    przeladowanieCzas: 300,
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
	aktualnyPoziom: 1,
    phi: 180*Math.PI/180,
    rysuj : function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "18px Arial";
				c.fillStyle = '#000000';
				c.fillText(Math.round(this.zycie),this.x+10,this.y);	
				c.beginPath();
				c.arc(this.x,this.y,this.zasieg,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			}
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
		}
		
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
    x:100,
	widocznosc: true,
    y:100,
    r:1,
    planeta: false,
    planetaNumer: 0,
    statek: false,
    rusz: false,    
    atakuj: false,    
	cel: 1,
    odlegloscDoCelu: 300,
};
var myszKlik ={
    x:0,
    y:0,
    r:10,
    planeta: false,
    widocznosc: true,
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
	falaNumer: 1,
	liczbaPrzeciwnikow: 1,
	obrazeniaPrzeciwnikow: 1,
	liczbaFal: 1,
};
var menuBudowaniaSpowalniacz ={
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	rusz: false,
	pokaz: function(i){
		this.x=planety[i].x-30;
		this.y=planety[i].y-30;
		this.widocznosc=true;	
		this.rodzic=i;
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20 && !planety[this.rodzic].obecnySpowalniacz){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText(cenyGra.menuBudowaniaSpowalniacz,this.x-18,this.y-18);
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnySpowalniacz){
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.fillStyle = "black";
				c.moveTo(this.x-5,this.y-5);
				c.lineTo(this.x+5,this.y-5);
				c.lineTo(this.x+5,this.y+5);
				c.lineTo(this.x-5,this.y+5);
				c.lineTo(this.x-5,this.y-5);
				c.fill();
				c.stroke();
			} else {
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

	}
	},
};
var menuBudowaniaSpowalniaczWiecej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaSpowalniacz.rodzic;
		if (planety[this.rodzic].obecnySpowalniacz){
			this.x=menuBudowaniaSpowalniacz.x-35;
			this.y=menuBudowaniaSpowalniacz.y;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnySpowalniaczWiecej===0){
					c.fillText(cenyGra.menuBudowaniaSpowalniaczWiecej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnySpowalniaczWiecej===1){
					c.fillText(cenyGra.menuBudowaniaSpowalniaczWiecej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnySpowalniaczWiecej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-4,this.y);
				c.lineTo(this.x-1,this.y);
				c.lineTo(this.x-1,this.y+3);
				c.lineTo(this.x-4,this.y+3);
				c.lineTo(this.x-4,this.y);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+1,this.y);
				c.lineTo(this.x+4,this.y);
				c.lineTo(this.x+4,this.y+3);
				c.lineTo(this.x+1,this.y+3);
				c.lineTo(this.x+1,this.y);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnySpowalniaczWiecej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-4,this.y);
				c.lineTo(this.x-1,this.y);
				c.lineTo(this.x-1,this.y+3);
				c.lineTo(this.x-4,this.y+3);
				c.lineTo(this.x-4,this.y);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+1,this.y);
				c.lineTo(this.x+4,this.y);
				c.lineTo(this.x+4,this.y+3);
				c.lineTo(this.x+1,this.y+3);
				c.lineTo(this.x+1,this.y);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-1.5,this.y-3);
				c.lineTo(this.x+1.5,this.y-3);
				c.lineTo(this.x+1.5,this.y-6);
				c.lineTo(this.x-1.5,this.y-6);
				c.lineTo(this.x-1.5,this.y-3);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.moveTo(this.x-4,this.y);
				c.lineTo(this.x-1,this.y);
				c.lineTo(this.x-1,this.y+3);
				c.lineTo(this.x-4,this.y+3);
				c.lineTo(this.x-4,this.y);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaSpowalniaczLepiej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaSpowalniacz.rodzic;
			if (planety[this.rodzic].obecnySpowalniacz){
				this.x=menuBudowaniaSpowalniacz.x;
				this.y=menuBudowaniaSpowalniacz.y-35;
				this.widocznosc=true;
			} else {
				this.widocznosc=false;
			}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnySpowalniaczLepiej===0){
					c.fillText(cenyGra.menuBudowaniaSpowalniaczLepiej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnySpowalniaczLepiej===1){
					c.fillText(cenyGra.menuBudowaniaSpowalniaczLepiej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnySpowalniaczLepiej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,9,0,Math.PI,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y-2.5);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnySpowalniaczLepiej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,10,0,Math.PI,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y-2.5);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,8,0,Math.PI,true);
				c.stroke();
				c.moveTo(this.x-2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y-2.5);
				c.lineTo(this.x+2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y+2.5);
				c.lineTo(this.x-2.5,this.y-2.5);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaSatelita ={
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(i){
		this.x=planety[i].x+30;
		this.y=planety[i].y-30;
		this.widocznosc=true;	
		this.rodzic=i;
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20 && !planety[this.rodzic].obecnaSatelita ){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText(cenyGra.menuBudowaniaSatelita,this.x-18,this.y-18);
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnaSatelita){
				c.fillStyle = "black";
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x-5,this.y-5);
				c.lineTo(this.x+5,this.y-5);
				c.lineTo(this.x-5,this.y+5);
				c.lineTo(this.x+5,this.y+5);
				c.lineTo(this.x-5,this.y-5);
				c.fill();
				c.stroke();
			} else {
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
	}
	},
};
var menuBudowaniaSatelitaWiecej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaSatelita.rodzic;
		if (planety[this.rodzic].obecnaSatelita){
			this.x=menuBudowaniaSatelita.x+35;
			this.y=menuBudowaniaSatelita.y;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnaSatelitaWiecej===0){
					c.fillText(cenyGra.menuBudowaniaSatelitaWiecej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnaSatelitaWiecej===1){
					c.fillText(cenyGra.menuBudowaniaSatelitaWiecej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnaSatelitaWiecej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y+6);
				c.lineTo(this.x+3,this.y+12);
				c.lineTo(this.x-3,this.y+12);
				c.lineTo(this.x,this.y+6);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-1);
				c.lineTo(this.x+2,this.y+3);
				c.lineTo(this.x-2,this.y+3);
				c.lineTo(this.x,this.y-1);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-7);
				c.lineTo(this.x+1.5,this.y-4);
				c.lineTo(this.x-1.5,this.y-4);
				c.lineTo(this.x,this.y-7);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnaSatelitaWiecej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y+6);
				c.lineTo(this.x+3,this.y+12);
				c.lineTo(this.x-3,this.y+12);
				c.lineTo(this.x,this.y+6);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-1);
				c.lineTo(this.x+1.5,this.y+2);
				c.lineTo(this.x-1.5,this.y+2);
				c.lineTo(this.x,this.y-1);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-7);
				c.lineTo(this.x+1,this.y-5);
				c.lineTo(this.x-1,this.y-5);
				c.lineTo(this.x,this.y-7);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y+6);
				c.lineTo(this.x+3,this.y+12);
				c.lineTo(this.x-3,this.y+12);
				c.lineTo(this.x,this.y+6);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-1);
				c.lineTo(this.x+2.5,this.y+4);
				c.lineTo(this.x-2.5,this.y+4);
				c.lineTo(this.x,this.y-1);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-7);
				c.lineTo(this.x+2,this.y-3);
				c.lineTo(this.x-2,this.y-3);
				c.lineTo(this.x,this.y-7);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaSatelitaLepiej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaSatelita.rodzic;
		if (planety[this.rodzic].obecnaSatelita){
			this.x=menuBudowaniaSatelita.x;
			this.y=menuBudowaniaSatelita.y-35;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnaSatelitaLepiej===0){
					c.fillText(cenyGra.menuBudowaniaSatelitaLepiej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnaSatelitaLepiej===1){
					c.fillText(cenyGra.menuBudowaniaSatelitaLepiej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnaSatelitaLepiej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,4,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnaSatelitaLepiej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,3,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaWahadlowiec ={
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(i){
		this.x=planety[i].x-30;
		this.y=planety[i].y+30;
		this.widocznosc=true;	
		this.rodzic=i;
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20&& !planety[this.rodzic].obecnyWahadlowiec ){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText(cenyGra.menuBudowaniaWahadlowiec,this.x-18,this.y-18);
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnyWahadlowiec){
				c.fillStyle = "black";
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y-3);
				c.lineTo(this.x+3,this.y+3);
				c.lineTo(this.x-3,this.y+3);
				c.lineTo(this.x,this.y-3);
				c.fill();
				c.stroke();	
			} else {
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
	}
	},
};
var menuBudowaniaWahadlowiecWiecej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaWahadlowiec.rodzic;
		if (planety[this.rodzic].obecnyWahadlowiec){
			this.x=menuBudowaniaWahadlowiec.x-35;
			this.y=menuBudowaniaWahadlowiec.y;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnyWahadlowiecWiecej===0){
					c.fillText(cenyGra.menuBudowaniaWahadlowiecWiecej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnyWahadlowiecWiecej===1){
					c.fillText(cenyGra.menuBudowaniaWahadlowiecWiecej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnyWahadlowiecWiecej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y+12);
				c.lineTo(this.x,this.y+6);
				c.lineTo(this.x-3,this.y+9);
				c.lineTo(this.x,this.y+6);
				c.lineTo(this.x+3,this.y+9);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y+2);
				c.lineTo(this.x+2,this.y-2);
				c.lineTo(this.x-2,this.y-2);
				c.lineTo(this.x,this.y+2);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnyWahadlowiecWiecej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y+12);
				c.lineTo(this.x,this.y+6);
				c.lineTo(this.x-3,this.y+9);
				c.lineTo(this.x,this.y+6);
				c.lineTo(this.x+3,this.y+9);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y+2);
				c.lineTo(this.x+2,this.y-2);
				c.lineTo(this.x-2,this.y-2);
				c.lineTo(this.x,this.y+2);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x,this.y-12);
				c.lineTo(this.x,this.y-6);
				c.lineTo(this.x-3,this.y-9);
				c.lineTo(this.x,this.y-6);
				c.lineTo(this.x+3,this.y-9);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.moveTo(this.x+0,this.y+2);
				c.lineTo(this.x+2,this.y-2);
				c.lineTo(this.x-2,this.y-2);
				c.lineTo(this.x,this.y+2);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaWahadlowiecLepiej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaWahadlowiec.rodzic;
		if (planety[this.rodzic].obecnyWahadlowiec){
			this.x=menuBudowaniaWahadlowiec.x;
			this.y=menuBudowaniaWahadlowiec.y+35;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnyWahadlowiecLepiej===0){
					c.fillText(cenyGra.menuBudowaniaWahadlowiecLepiej1,this.x-18,this.y+34);
				} else if (planety[this.rodzic].obecnyWahadlowiecLepiej===1){
					c.fillText(cenyGra.menuBudowaniaWahadlowiecLepiej2,this.x-18,this.y+34);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnyWahadlowiecLepiej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x+5,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnyWahadlowiecLepiej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x+5,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x-5,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x+5,this.y,2,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			}
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
	pokaz: function(i){
		this.x=planety[i].x+30;
		this.y=planety[i].y+30;
		this.widocznosc=true;	
		this.rodzic=i;
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20  && !planety[this.rodzic].obecnaNaziemna ){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText(cenyGra.menuBudowaniaNaziemne,this.x-18,this.y-18);
				c.globalAlpha=1;
			}
			c.beginPath();
			c.arc(this.x,this.y,15,0,Math.PI*2,true);
			c.stroke();
			if(planety[this.rodzic].obecnaNaziemna){
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
var menuBudowaniaNaziemneWiecej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaNaziemne.rodzic;
		if (planety[this.rodzic].obecnaNaziemna){
			this.x=menuBudowaniaNaziemne.x+35;
			this.y=menuBudowaniaNaziemne.y;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnaNaziemnaWiecej===0){
					c.fillText(cenyGra.menuBudowaniaNaziemneWiecej1,this.x-18,this.y-18);
				} else if (planety[this.rodzic].obecnaNaziemnaWiecej===1){
					c.fillText(cenyGra.menuBudowaniaNaziemneWiecej2,this.x-18,this.y-18);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnaNaziemnaWiecej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.font = "14px Arial";
				c.fillText('+',this.x-4,this.y-2.5);
				c.beginPath();
				c.arc(this.x,this.y+5,5,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnaNaziemnaWiecej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.font = "14px Arial";
				c.fillText('+',this.x-4,this.y-2.5);
				c.beginPath();
				c.arc(this.x,this.y+5,6,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.font = "14px Arial";
				c.fillText('+',this.x-4,this.y-2.5);
				c.beginPath();
				c.arc(this.x,this.y+5,4,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var menuBudowaniaNaziemneLepiej ={
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	wybudowano: false,
	widocznosc: false,
	pokaz: function(){
		this.rodzic=menuBudowaniaNaziemne.rodzic;
		if (planety[this.rodzic].obecnaNaziemna){
			this.x=menuBudowaniaNaziemne.x;
			this.y=menuBudowaniaNaziemne.y+35;
			this.widocznosc=true;
		} else {
			this.widocznosc=false;
		}
	},
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				if(planety[this.rodzic].obecnaNaziemnaLepiej===0){
					c.fillText(cenyGra.menuBudowaniaNaziemneLepiej1,this.x-18,this.y+34);
				} else if (planety[this.rodzic].obecnaNaziemnaLepiej===1){
					c.fillText(cenyGra.menuBudowaniaNaziemneLepiej2,this.x-18,this.y+34);
				}
				c.globalAlpha=1;
			}
			if(planety[this.rodzic].obecnaNaziemnaLepiej===1){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,8,0,Math.PI,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else if(planety[this.rodzic].obecnaNaziemnaLepiej===2){
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,9,0,Math.PI,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			} else {
				c.globalAlpha=0.4;
				c.beginPath();
				c.arc(this.x,this.y,15,0,Math.PI*2,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,7,0,Math.PI,true);
				c.stroke();
				c.beginPath();
				c.arc(this.x,this.y,5,0,Math.PI*2,true);
				c.stroke();
				c.globalAlpha=1;
			}
		}
	},
};
var cenyGra = {
	menuBudowaniaNaziemne: 150,
	menuBudowaniaNaziemneWiecej1: 150,
	menuBudowaniaNaziemneWiecej2: 250,
    menuBudowaniaNaziemneLepiej1: 100,
    menuBudowaniaNaziemneLepiej2: 200,
	menuBudowaniaWahadlowiec: 200,
	menuBudowaniaWahadlowiecWiecej1: 250,	
	menuBudowaniaWahadlowiecWiecej2: 350,	
	menuBudowaniaWahadlowiecLepiej1: 300,
	menuBudowaniaWahadlowiecLepiej2: 250,
	menuBudowaniaSpowalniacz: 100,				
	menuBudowaniaSpowalniaczWiecej1: 250,
	menuBudowaniaSpowalniaczWiecej2: 200,
	menuBudowaniaSpowalniaczLepiej1: 150,
	menuBudowaniaSpowalniaczLepiej2: 350,
	menuBudowaniaSatelita: 150,				
	menuBudowaniaSatelitaWiecej1: 350,		
	menuBudowaniaSatelitaWiecej2: 300,		
	menuBudowaniaSatelitaLepiej1: 200,
	menuBudowaniaSatelitaLepiej2: 300,
}
var pasekMenu = {
	odradzaniePhi: 0,
	odradzanieY: 62, //12 na pasku
	x: -6,
	y: -6,
	alpha: 0.075,
	width: window.innerWidth,
	height: 30,
	rysuj: function (){
		if(mysz.y<50 && mysz.y>0){
			this.alpha=mysz.y/window.innerHeight;
		}else if(mysz.y<0){
			this.alpha=0;
		} else {
			this.alpha=0.075
		}
		if(ekran.budowanie || !fizyka.klikniecieProstokat(mysz,pasekMenu)){
			c.beginPath();
			c.fillStyle = 'black'
			c.globalAlpha=this.alpha;
			c.rect(this.x,this.y,this.width,this.height);
			c.fill();
			c.stroke();
			c.font = "20px Arial";
			c.globalAlpha=this.alpha*2;
			if(ekran.gra){
				c.fillText("Energia"+"   "+ekran.energia,10,20);
			} else if(ekran.menu){
			c.fillText("Doswiadczenie"+"   "+statekGracza.doswiadczenie,10,20);
			}
			if(statekGracza.odradzanie && ekran.gra){
				c.beginPath();
				c.moveTo(window.innerWidth/2+0,this.odradzanieY+5);
				c.lineTo(window.innerWidth/2+5,this.odradzanieY-5);
				c.lineTo(window.innerWidth/2-5,this.odradzanieY-5);
				c.lineTo(window.innerWidth/2,this.odradzanieY+5);
				c.stroke();
				c.beginPath();
				this.odradzaniePhi=this.odradzaniePhi+(Math.PI*2/(statekGracza.czasOdrodzenia)*szybkoscOdswiezania)
				c.arc(window.innerWidth/2,this.odradzanieY,10,0,this.odradzaniePhi,true);
				c.stroke();
			}
			c.globalAlpha=1;
		}
	}
};