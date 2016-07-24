var fizyka = {
	atakPoKliknieciu(){
		if(!mysz.statek){
			if(!ekran.pauza && ekran.gra){
				if(przeciwnicy[statekGracza.cel]!==null && typeof(przeciwnicy[statekGracza.cel])==='object' &&
				 fizyka.odleglosc(mysz.x,mysz.y,przeciwnicy[statekGracza.cel].x,przeciwnicy[statekGracza.cel].y)<10){
					mysz.atakuj=true;
				} else {
					for(i in przeciwnicy){
						if(fizyka.odleglosc(mysz.x,mysz.y,przeciwnicy[i].x,przeciwnicy[i].y)<10){
							statekGracza.cel=Number(i);
							mysz.atakuj=true;
						}
					}
				}
			}
		}

	},
	zaznaczenie(){
		if(!mysz.statek){
			if(!ekran.pauza && ekran.gra && ekran.zaznaczenieGracza){
				c.beginPath();
				c.moveTo(ekran.zaznaczenieGraczaX1,ekran.zaznaczenieGraczaY1);
				c.lineTo(ekran.zaznaczenieGraczaX1,ekran.zaznaczenieGraczaY2);
				c.lineTo(ekran.zaznaczenieGraczaX2,ekran.zaznaczenieGraczaY2);
				c.lineTo(ekran.zaznaczenieGraczaX2,ekran.zaznaczenieGraczaY1);
				c.lineTo(ekran.zaznaczenieGraczaX1,ekran.zaznaczenieGraczaY1);
				c.globalAlpha=0.2;
				c.fillStyle='#00aeef';
				c.strokeStyle='#0999cf';
				c.fill();
				c.stroke();
				c.strokeStyle='black';
				c.globalAlpha=1;
				if(ekran.zaznaczenieGraczaSprawdz){
					ekran.zaznaczenieGraczaSprawdz=false;
					ekran.zaznaczenieGracza=false;
					if(ekran.zaznaczenieGraczaX1<ekran.zaznaczenieGraczaX2){
						if(ekran.zaznaczenieGraczaY1<ekran.zaznaczenieGraczaY2){
							if(statekGracza.x>ekran.zaznaczenieGraczaX1&&
							   statekGracza.x<ekran.zaznaczenieGraczaX2&&
							   statekGracza.y>ekran.zaznaczenieGraczaY1&&
							   statekGracza.y<ekran.zaznaczenieGraczaY2){
								   mysz.statek=true
							   }
						}else{
							if(statekGracza.x>ekran.zaznaczenieGraczaX1&&
							   statekGracza.x<ekran.zaznaczenieGraczaX2&&
							   statekGracza.y>ekran.zaznaczenieGraczaY2&&
							   statekGracza.y<ekran.zaznaczenieGraczaY1){
								   mysz.statek=true
							   }
						}
					}else{
						if(ekran.zaznaczenieGraczaY1<ekran.zaznaczenieGraczaY2){
							if(statekGracza.x<ekran.zaznaczenieGraczaX1&&
							   statekGracza.x>ekran.zaznaczenieGraczaX2&&
							   statekGracza.y>ekran.zaznaczenieGraczaY1&&
							   statekGracza.y<ekran.zaznaczenieGraczaY2){
								   mysz.statek=true
							   }
						}else{
							if(statekGracza.x<ekran.zaznaczenieGraczaX1&&
							   statekGracza.x>ekran.zaznaczenieGraczaX2&&
							   statekGracza.y>ekran.zaznaczenieGraczaY2&&
							   statekGracza.y<ekran.zaznaczenieGraczaY1){
								   mysz.statek=true
							   }
						}
					}
					if(mysz.statek){
						statekGracza.naPlanecie=0;
					}
				}
			};
		};
	},
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
			fizyka.sprawdzWarunkiKonca();
			statekGracza.statekNaPlanecie=0;
			pasekMenu.odradzaniePhi=0;
			statekGracza.zycie=1;
			statekGracza.x=window.innerWidth/2;
			statekGracza.y=-20;
			statekGracza.vy=1;
			statekGracza.vx=0;
			statekGracza.phi=180*Math.PI/180;
			statekGracza.odradzanie=true;
			setTimeout(function(){
				statekGracza.widocznosc=true;
				statekGracza.odradzanie=false;
				statekGracza.zycie=statekGracza.maxZycie;
				}, statekGracza.czasOdrodzenia);
		} else if (!ekran.pauza){
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
							statekGracza.wystrzel(pociski[pociski.length-1]);
							if(statekGracza.naPlanecie!==0){
								pociski[pociski.length-1].rodzic="statekGraczaNaPlanecie";	
							}
							statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]-1;
						};
						statekGracza.przeladowanie=true;
					}
				} else if(!statekGracza.trybAuto && !statekGracza.przeladowanie){
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
							statekGracza.wystrzel(pociski[pociski.length-1]);
							if(statekGracza.naPlanecie!==0){
								pociski[pociski.length-1].rodzic="statekGraczaNaPlanecie";	
							}
							statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]-1;
							statekGracza.przeladowanie=true;
							if(!mysz.ciagly){
								mysz.atakuj=false;
							}
						}else if(statekGracza.maxLiczbaPociskow[1]>0){
							if(pociski.length>1){
								pociski[pociski.length] = new Pocisk(10,10,2,2,2,'green');
							} else {
								pociski[1] = new Pocisk(10,10,2,2,2,'green');
							};
							pociski[pociski.length-1].widocznosc=true;
							statekGracza.wystrzel(pociski[pociski.length-1]);
							if(statekGracza.naPlanecie!==0){
								pociski[pociski.length-1].rodzic="statekGraczaNaPlanecie";	
							}
							statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]-1;
							statekGracza.przeladowanie=true;
							if(!mysz.ciagly){
								mysz.atakuj=false;
							}
						}else if(statekGracza.maxLiczbaPociskow[2]>0){
							if(pociski.length>1){
								pociski[pociski.length] = new Pocisk(10,10,2,2,2,'blue');
							} else {
								pociski[1] = new Pocisk(10,10,2,2,2,'blue');
							};
							pociski[pociski.length-1].widocznosc=true;
							statekGracza.wystrzel(pociski[pociski.length-1]);
							if(statekGracza.naPlanecie!==0){
								pociski[pociski.length-1].rodzic="statekGraczaNaPlanecie";	
							}
							statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]-1;
							statekGracza.przeladowanie=true;
							if(!mysz.ciagly){
								mysz.atakuj=false;
							}
						}
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
		statekGracza.statekNaPlanecie=0;
		statekGracza.x=window.innerWidth/2;
		statekGracza.y=0;
		statekGracza.vy=1;
		statekGracza.vx=0;
		statekGracza.zycie=statekGracza.maxZycie;
		statekGracza.widocznosc=true;
		statekGracza.przeladowanie=false;
		statekGracza.odradzanie=false;
		ekran.zaznaczenieGraczaSprawdz=false;
		ekran.zaznaczenieGracza=false;
		S.szerokoscMapy=1000;
		S.wysokoscMapy=1000;
		if(statekGracza.poziomUlepszenieBron==1){
			statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
		} else if(statekGracza.poziomUlepszenieBron==2){
			statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
		} else if(statekGracza.poziomUlepszenieBron==3){
			statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
		}
		mysz.rusz=false;
		mysz.statek=false;
		mysz.atakuj=false;
		mysz.ciagly=false;
		mysz.pojedynczy=false;
		statekGracza.phi=180*Math.PI/180;
		for(var i =1;i<liczbaPlanet+1;i++){
            planety[i]= new Planeta(2,i*(((window.innerHeight-50)/2)/liczbaPlanet),30,30,0.1,0.01);
            orbity[i]= new Orbita(planety[i].x,planety[i].y,planety[i].r,planety[i].R,planety[i].phi,planety[i].teta,planety[i].v);
			planety[i].numerOrbity=Number(i);
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
                if(przeciwnicy[i].rodzaj==='planety'){
                    fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
					przeciwnicy[i].cel=planety.length-1;
				} else if(przeciwnicy[i].rodzaj==='gracz') {
					if(statekGracza.widocznosc){
						fizyka.kierunekDoObiektu1(statekGracza,przeciwnicy[i]);
					}else{
						fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
						przeciwnicy[i].cel=planety.length-1;
					}
				} else if(przeciwnicy[i].rodzaj==='punkt'){
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
				if(fizyka.dwaCiala(przeciwnicy[i],statekGracza) && przeciwnicy[i].rodzaj==='gracz'){
					statekGracza.zycie=statekGracza.zycie-przeciwnicy[i].obrazenia;
				};
				if(i>3 && Math.floor(przeciwnicy[i].x)===Math.floor(przeciwnicy[i-1].x)){
					przeciwnicy[i].x=przeciwnicy[i].x+(Math.random()/2);
					przeciwnicy[i].y=przeciwnicy[i].y+(Math.random()/2);
				};
			} else {
				if(przeciwnicy[i].rodzaj==='planety'){
					ekran.energia=ekran.energia+10*ekran.falaNumer;
				} else if(przeciwnicy[i].rodzaj==='gracz') {
				   ekran.energia=ekran.energia+8*ekran.falaNumer;
				} else if(przeciwnicy[i].rodzaj==='punkt'){
					ekran.energia=ekran.energia+10*ekran.falaNumer;
				};
				przeciwnicy.splice(i,1);
				fizyka.sprawdzWarunkiKonca();
			}
        };
	},
    planety () {
        for (i in planety) {
			if(planety[i].statekNaPlanecie && statekGracza.naPlanecie!==0){
				planety[i].zycie=planety[i].zycie+statekGracza.szybkoscLeczenia;
				statekGracza.zycie=statekGracza.zycie+statekGracza.szybkoscLeczenia;
				statekGracza.x=planety[i].x;
				statekGracza.y=planety[i].y;
			}
            if(planety[i].zycie>0){
				if(ekran.gra && !ekran.pauza){
					if(planety[i].obecnaNaziemnaWiecej===1 && planety[i].zycie<=100){
						planety[i].zycie=planety[i].zycie+0.01;
					} else if(planety[i].obecnaNaziemnaWiecej===2 && planety[i].zycie<=100){
						planety[i].zycie=planety[i].zycie+0.02;
					}
				}
                if(fizyka.dwaCiala(statekGracza,planety[i]) || statekGracza.naPlanecie===Number(i)){
                    statekGracza.zycie=statekGracza.zycie+statekGracza.szybkoscLeczenia;
                };
                if(ekran.budowanie  && fizyka.odleglosc(mysz.x,mysz.y,planety[i].x,planety[i].y)<10){
					orbity[planety[i].numerOrbity].widocznosc=true;
			    } else {
					orbity[planety[i].numerOrbity].widocznosc=false;
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
					if (pociski[i].rodzaj==="planety"){
						planety[x].oddzialywanie(pociski[i]); //jezeli niebieskie to graw ma wplyw
					}
                };
                if(pociski[i].rodzaj==="planety" || pociski[i].rodzaj==="slonce"){
                    S.oddzialywanie(pociski[i]);                //na ruch zielonych pociskow ma wplyw tylko slonce
                };
            } else {
                if(pociski[i].rodzaj==="prosty" && (pociski[i].rodzic==="statekGracza" || pociski[i].rodzic==="statekGraczaNaPlanecie")){
                    statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]+1;
                } else if(pociski[i].rodzaj==="slonce"&& (pociski[i].rodzic==="statekGracza" || pociski[i].rodzic==="statekGraczaNaPlanecie")){
                    statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]+1;
                } else if(pociski[i].rodzaj==="planety"&& (pociski[i].rodzic==="statekGracza" || pociski[i].rodzic==="statekGraczaNaPlanecie")){
                    statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]+1;
                } else if(pociski[i].rodzic==="satelity"){
					satelity[pociski[i].rodzicNumer].maxLiczbaPociskow[0]=satelity[pociski[i].rodzicNumer].maxLiczbaPociskow[0]+1;
				} else if(pociski[i].rodzic==="wahadlowce"){
					 if(pociski[i].rodzaj==="naprowadzanie"){
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
		c.canvas.width = window.innerWidth - 18;
		c.canvas.height = window.innerHeight - 18;
        fizyka.planety();
        fizyka.pociski();
        fizyka.przeciwnicy();
        fizyka.satelity();
        fizyka.wahadlowce();
        fizyka.naziemni();
		fizyka.statekGracza();
		c.beginPath();
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.rect(0,0,window.innerWidth,window.innerHeight);
		var wzorTla=c.createPattern(tloKafelek,"repeat");
		c.fillStyle=wzorTla;
		c.fill();
		fizyka.zaznaczenie();
		pasekMenu.rysuj();
        //	fizyka.brzegOkna(statekGracza);
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
		mapa.rysuj();
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

    },
	odswiezEkranMenu(){
		c.canvas.width = window.innerWidth - 18;
		c.canvas.height = window.innerHeight - 18;
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.rect(0,0,window.innerWidth,window.innerHeight);
		var wzorTla=c.createPattern(tloKafelek,"repeat");
		c.fillStyle=wzorTla;
		c.fill();
		pasekMenu.rysuj();
        fizyka.rysuj(S);
        fizyka.rysuj(poziomy);
    },
	odswiezEkranUlepszenia(){
        c.canvas.width = window.innerWidth - 18;
		c.canvas.height = window.innerHeight - 18;
		c.clearRect(0,0,window.innerWidth,window.innerHeight);
		c.rect(0,0,window.innerWidth,window.innerHeight);
		var wzorTla=c.createPattern(tloKafelek,"repeat");
		c.fillStyle=wzorTla;
		c.fill();
		pasekMenu.rysuj();
        fizyka.rysuj(S);
		ulepszenieBron.rysuj();
		ulepszenieCzas.rysuj();
		ulepszenieKoszt.rysuj();
		ulepszenieKule.rysuj();
		ulepszeniePredkosc.rysuj();
		ulepszenieZasieg.rysuj();
		ulepszenieZycie.rysuj();
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
			if(!statekGracza.widocznosc){
				fizyka.szybkoscAnimacji('stop');
				ekran.menu=true;
				ekran.gra=false;
				S.szerokoscMapy=window.innerWidth/2;
				S.wysokoscMapy=window.innerHeight/2;
				S.x=S.xSrodek;
				S.y=S.ySrodek;
			} else {
				for (i in przeciwnicy){
					przeciwnicy[i].kolor='#fff200';	
					przeciwnicy[i].rodzaj='gracz';	
				}
			}
        }
		if (przeciwnicy.length===1){
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
				S.szerokoscMapy=window.innerWidth/2;
				S.wysokoscMapy=window.innerHeight/2;
				S.x=S.xSrodek;
				S.y=S.ySrodek;
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
		if(!statekGracza.odradzanie &&!mysz.statek){
        if (obiekt.x>window.innerWidth && obiekt.y>window.innerHeight) {
			//obiekt.widocznosc=false;
            //obiekt.x=-10;
            //obiekt.y=-10;
			obiekt.vx=0;
			obiekt.vy=0;
        } else if (obiekt.x<-10&&obiekt.y<-10) {
			//obiekt.widocznosc=false;
            //obiekt.x=window.innerWidth-10;
            //obiekt.y=window.innerHeight-10;
			obiekt.vx=0;
			obiekt.vy=0;
        } else if (obiekt.x>window.innerWidth) {
			//obiekt.widocznosc=false;
            //obiekt.x=-10;
			obiekt.vx=0;
			obiekt.vy=0;
        } else if (obiekt.y>window.innerHeight) {
			//obiekt.widocznosc=false;
           // obiekt.y=-10;
			obiekt.vx=0;
			obiekt.vy=0;
        } else if (obiekt.x<-10){
			//obiekt.widocznosc=false;
            //obiekt.x=window.innerWidth-10;
			obiekt.vx=0;
			obiekt.vy=0;
        } else if (obiekt.y<-10){
			//obiekt.widocznosc=false;
            //obiekt.y=window.innerHeight-10;
			obiekt.vx=0;
			obiekt.vy=0;
		};
		fizyka.sprawdzWarunkiKonca();
		//obiekt.widocznosc=true;
		}
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
            if (obiekt1.x>obiekt2.x && obiekt1.x<obiekt2.x+obiekt2.width&&obiekt1.y>obiekt2.y && obiekt1.y<obiekt2.y+obiekt2.height) {
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
					if(fizyka.dwaCiala(statekGracza,planety[i])){
						planety[i].statekNaPlanecie=true;
						statekGracza.naPlanecie=Number(i);
					}else if (planety[i]!==null){
						planety[i].statekNaPlanecie=false;
					}
                };
				if(statekGracza.naPlanecie===0){
					statekGracza.vx=statekGracza.vxOld;
					statekGracza.vy=statekGracza.vyOld;
				}
                for(i in satelity){
                    satelity[i].v=satelity[i].vOld;
                };
                for(i in przeciwnicy){
                    przeciwnicy[i].vx=przeciwnicy[i].vxOld;
                    przeciwnicy[i].vy=przeciwnicy[i].vyOld;
                };

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
	srodekX: S.x,
    srodekY: S.y,
	przesuniecieGwiazdaX:0,
    przesuniecieGwiazdaY:0,
    x: window.innerWidth/2 - 50,
    y: -5,
    r: 2,
	poziomUlepszenieBron: 1,
	poziomUlepszenieCzas: 1,
	poziomUlepszenieKoszt: 1,
	poziomUlepszenieKule: 1,
	poziomUlepszeniePredkosc: 1,
	poziomUlepszenieZasieg: 1,
	poziomUlepszenieZycie: 1,
	przesuniecieX:0,
    przesuniecieY:0,
	naPlanecie: 0,
	czasOdrodzenia: 10000,
	widocznosc: true,
    zycie: 100,
    maxZycie: 100,
    maxLiczbaPociskow: [0,0,15],
    zasieg: 50,
	trybAuto: false,
	trybAutoCzas: 10000,
    przeladowanie: false,
    przeladowanieCzas: 300,
    vx: 0,
    vy: 1,
    vxOld: 0,
    vyOld: 1,
    obrazenia: [10,8,5],
    odlegloscDoCelu: 300,
    cel: 1,
	szybkoscLeczenia: 0.01,
	energia: 1000,
	doswiadczenie: 1000000,
	odblokowanePoziomy: 1,
	aktualnyPoziom: 1,
    phi: 180*Math.PI/180,
    rysuj : function(){
		if(this.srodekX!=S.x){
            this.przesuniecieGwiazdaX=this.srodekX-S.x;
            this.x=this.x-this.przesuniecieGwiazdaX;
        };
        if(this.srodekY!=S.y){
            this.przesuniecieGwiazdaY=this.srodekY-S.y;
            this.y=this.y-this.przesuniecieGwiazdaY;
        };
		this.srodekX=S.x;
        this.srodekY=S.y;
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
			if(!fizyka.dwaCiala(statekGracza,planety[statekGracza.naPlanecie])){
				this.x=this.x+this.vx;
				this.y=this.y+this.vy;
				statekGracza.naPlanecie=0;
			}
			if(mysz.statek){
				c.globalAlpha=0.2;
				c.strokeStyle='#0288ba';
				c.fillStyle='#00aeef';
				c.beginPath();
				c.arc(this.x,this.y,20,0,Math.PI*2,true);
				c.stroke();
				c.fill();
				//c.fillStyle='#ec008c';
				//c.beginPath();
				//c.arc(this.x,this.y,15,0,Math.PI*2,true);
				//c.stroke();
				//c.fill();
				c.globalAlpha=1;
			};
			c.save();
			c.translate((this.x),(this.y));
			c.rotate(-this.phi);
			c.translate(-(this.x),-(this.y));
			c.beginPath();
			c.moveTo(this.x,this.y-7);
			c.lineTo(this.x+7,this.y+7);
			c.lineTo(this.x-7,this.y+7);
			c.lineTo(this.x,this.y-7);
			c.fillStyle='#00aeef';
			c.fill();
			c.globalAlpha=0.2;
			c.beginPath();
			c.moveTo(this.x-3.5,this.y+1);
			c.lineTo(this.x,this.y+7);
			c.lineTo(this.x-7,this.y+7);
			c.lineTo(this.x-3.5,this.y+1);
			c.fillStyle='#ec008c';
			c.fill();
			c.beginPath();
			c.moveTo(this.x+3.5,this.y+1);
			c.lineTo(this.x+7,this.y+7);
			c.lineTo(this.x,this.y+7);
			c.lineTo(this.x+3.5,this.y+1);
			c.fillStyle='#ec008c';
			c.fill();
			c.restore();
			c.strokeStyle='black';	
			c.globalAlpha=1;	
		}

    },
    porusz : function(jak) {
		statekGracza.naPlanecie=0;
		myszKlik.rusz=false;
		mysz.rusz=false;
		mysz.statek=false;
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
		if (pocisk.kolor==='red' || pocisk.kolor === '#FF0000') {
			pocisk.obrazenia=this.obrazenia[0];
		} else if (pocisk.kolor==='green' || pocisk.kolor === '#00FF00') {
			pocisk.obrazenia=this.obrazenia[1];
		} else if (pocisk.kolor==='blue' || pocisk.kolor === '#0000FF'){
			pocisk.obrazenia=this.obrazenia[2];
		} else {
			pocisk.obrazenia=this.obrazenia[1];
		};
        pocisk.x=this.x;
        pocisk.y=this.y;
        pocisk.vx=this.vx-Math.sin(this.phi)*3;
        pocisk.vy=this.vy-Math.cos(this.phi)*3;
		pocisk.rodzic="statekGracza";	
    }
};
var mysz ={
    x:100,
	widocznosc: true,
	pojedynczy: false,
	ciagly: false,
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
    srodekX:S.x,
    srodekY:S.y,
    przesuniecieX:0,
    przesuniecieY:0,
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
	zaznaczenieGracza: false,
	zaznaczenieGraczaSprawdz: false,
	przejdzDoOkna: false,
	ulepszenie: false,
	falaNumer: 1,
	liczbaPrzeciwnikow: 1,
	obrazeniaPrzeciwnikow: 1,
	liczbaFal: 1,
	zaznaczenieGraczaX1: -100,
	zaznaczenieGraczaY1: -100,
	zaznaczenieGraczaX2: -100,
	zaznaczenieGraczaY2: -100,
};
var menuBudowaniaSpowalniacz ={
	srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	rusz: false,
	pokaz: function(i){
		this.x=planety[i].x-planety[i].r-30;
		this.y=planety[i].y-planety[i].r-30;
		this.widocznosc=true;
		this.rodzic=i;
	},
	rysuj: function(){
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
	srodekX: S.x,
    srodek: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(i){
		this.x=planety[i].x+planety[i].r+30;
		this.y=planety[i].y-planety[i].r-30;
		this.widocznosc=true;
		this.rodzic=i;
	},
	rysuj: function(){
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(i){
		this.x=planety[i].x-planety[i].r-30;
		this.y=planety[i].y+planety[i].r+30;
		this.widocznosc=true;
		this.rodzic=i;
	},
	rysuj: function(){
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
	srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecie: 0,
	wypelnij: false,
	x: 0,
	y: 0,
	r: 15,
	rodzic: 0,
	widocznosc: false,
	pokaz: function(i){
		this.x=planety[i].x+planety[i].r+30;
		this.y=planety[i].y+planety[i].r+30;
		this.widocznosc=true;
		this.rodzic=i;
	},
	rysuj: function(){
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
		srodekX: S.x,
    srodekY: S.y,
    przesuniecieX: 0,
    przesuniecieY: 0,
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
	menuBudowaniaNaziemne: 350,
	menuBudowaniaNaziemneWiecej1: 150,
	menuBudowaniaNaziemneWiecej2: 250,
    menuBudowaniaNaziemneLepiej1: 100,
    menuBudowaniaNaziemneLepiej2: 200,
	menuBudowaniaWahadlowiec: 300,
	menuBudowaniaWahadlowiecWiecej1: 250,
	menuBudowaniaWahadlowiecWiecej2: 350,
	menuBudowaniaWahadlowiecLepiej1: 300,
	menuBudowaniaWahadlowiecLepiej2: 250,
	menuBudowaniaSpowalniacz: 250,
	menuBudowaniaSpowalniaczWiecej1: 250,
	menuBudowaniaSpowalniaczWiecej2: 200,
	menuBudowaniaSpowalniaczLepiej1: 150,
	menuBudowaniaSpowalniaczLepiej2: 350,
	menuBudowaniaSatelita: 250,
	menuBudowaniaSatelitaWiecej1: 350,
	menuBudowaniaSatelitaWiecej2: 300,
	menuBudowaniaSatelitaLepiej1: 200,
	menuBudowaniaSatelitaLepiej2: 300,
	ulepszenieBron1: 1000,
	ulepszenieBron2: 1500,
	ulepszenieCzas1: 500,
	ulepszenieCzas2: 750,
	ulepszenieCzas3: 1000,
	ulepszenieKoszt1: 1000,
	ulepszenieKoszt2: 2000,
	ulepszenieKoszt3: 3000,
	ulepszenieKoszt4: 4000,
	ulepszenieKule1: 1000,
	ulepszenieKule2: 1500,
	ulepszenieKule3: 2000,
	ulepszenieKule4: 2000,
	ulepszenieKule5: 3000,
	ulepszeniePredkosc1: 1000,
	ulepszeniePredkosc2: 1250,
	ulepszeniePredkosc3: 1500,
	ulepszenieZasieg1: 1000,
	ulepszenieZasieg2: 1500,
	ulepszenieZasieg3: 2000,
	ulepszenieZasieg4: 2000,
	ulepszenieZycie1: 1000,
	ulepszenieZycie2: 1500,
	ulepszenieZycie3: 1250,
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
			c.fillStyle = 'white'
			c.globalAlpha=this.alpha;
			c.rect(this.x,this.y,this.width,this.height);
			c.fill();
			c.stroke();
			c.font = "20px Arial";
			c.globalAlpha=this.alpha*2;
			if(ekran.gra){
				c.fillText("Energia"+"   "+ekran.energia+"   "+Math.floor(statekGracza.zycie),10,20);
				c.fillText("Poziom"+"   "+ekran.falaNumer+" /  "+ekran.liczbaFal,900,20);
			for(i in planety){
				c.fillText("   "+Math.floor(planety[i].zycie)+"%",200+i*80,20);
			};
			} else if(ekran.menu || ekran.ulepszenie){
			c.fillText("Doswiadczenie"+"   "+statekGracza.doswiadczenie,10,20);
			}
			if(statekGracza.odradzanie && ekran.gra && !ekran.pauza){
				c.beginPath();
				c.globalAlpha=1;
				c.moveTo(S.x+0,this.odradzanieY+5);
				c.lineTo(S.x+5,this.odradzanieY-5);
				c.lineTo(S.x-5,this.odradzanieY-5);
				c.lineTo(S.x,this.odradzanieY+5);
				c.stroke();
				c.beginPath();
				if(this.odradzaniePhi<(Math.PI*2-0.03)){
					this.odradzaniePhi=this.odradzaniePhi+(Math.PI*2/(statekGracza.czasOdrodzenia)*szybkoscOdswiezania);
					statekGracza.zycie=statekGracza.zycie+statekGracza.maxZycie/statekGracza.czasOdrodzenia*szybkoscOdswiezania;
				};
				c.arc(S.x,this.odradzanieY,10,0,this.odradzaniePhi,true);
				c.stroke();
			}
			c.globalAlpha=1;
		}
	}
};
var ulepszenieBron = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: window.innerHeight/7,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("NOWA BRON",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieBron===1){
					c.fillText(cenyGra.ulepszenieBron1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieBron===2){
					c.fillText(cenyGra.ulepszenieBron2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieBron===3){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieBron===1){
				this.obr.src = 'grafiki/ulepszenia/bron1.png'
			} else if(statekGracza.poziomUlepszenieBron===2){
				this.obr.src = 'grafiki/ulepszenia/bron2.png'
			} else if(statekGracza.poziomUlepszenieBron===3){
				this.obr.src = 'grafiki/ulepszenia/bron3.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszenieCzas = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszenieBron.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("KROTSZY CZAS ODRADZANIA",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieCzas===1){
					c.fillText(cenyGra.ulepszenieCzas1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieCzas===2){
					c.fillText(cenyGra.ulepszenieCzas2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieCzas===3){
					c.fillText(cenyGra.ulepszenieCzas3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieCzas===4){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieCzas===1){
				this.obr.src = 'grafiki/ulepszenia/czas3.png'
			} else if(statekGracza.poziomUlepszenieCzas===2){
				this.obr.src = 'grafiki/ulepszenia/czas6.png'
			} else if(statekGracza.poziomUlepszenieCzas===3){
				this.obr.src = 'grafiki/ulepszenia/czas9.png'
			} else if(statekGracza.poziomUlepszenieCzas===4){
				this.obr.src = 'grafiki/ulepszenia/czas12.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszenieKoszt = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszenieCzas.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("NIZSZY KOSZT ZAKUPU JEDNOSTEK",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieKoszt===1){
					c.fillText(cenyGra.ulepszenieKoszt1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKoszt===2){
					c.fillText(cenyGra.ulepszenieKoszt2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKoszt===3){
					c.fillText(cenyGra.ulepszenieKoszt3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKoszt===4){
					c.fillText(cenyGra.ulepszenieKoszt4,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKoszt===5){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieKoszt===1){
				this.obr.src = 'grafiki/ulepszenia/koszt1.png'
			} else if(statekGracza.poziomUlepszenieKoszt===2){
				this.obr.src = 'grafiki/ulepszenia/koszt2.png'
			} else if(statekGracza.poziomUlepszenieKoszt===3){
				this.obr.src = 'grafiki/ulepszenia/koszt3.png'
			} else if(statekGracza.poziomUlepszenieKoszt===4){
				this.obr.src = 'grafiki/ulepszenia/koszt4.png'
			} else if(statekGracza.poziomUlepszenieKoszt===5){
				this.obr.src = 'grafiki/ulepszenia/koszt5.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszenieKule = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszenieKoszt.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("WIECEJ AMUNICJI I WIEKSZE OBRAZENIA",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieKule===1){
					c.fillText(cenyGra.ulepszenieKule1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKule===2){
					c.fillText(cenyGra.ulepszenieKule2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKule===3){
					c.fillText(cenyGra.ulepszenieKule3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKule===4){
					c.fillText(cenyGra.ulepszenieKule4,this.x-50,this.y+17.5); 
				} else if(statekGracza.poziomUlepszenieKule===5){
					c.fillText(cenyGra.ulepszenieKule5,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieKule===6){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieKule===1){
				this.obr.src = 'grafiki/ulepszenia/kule1.png'
			} else if(statekGracza.poziomUlepszenieKule===2){
				this.obr.src = 'grafiki/ulepszenia/kule2.png'
			} else if(statekGracza.poziomUlepszenieKule===3){
				this.obr.src = 'grafiki/ulepszenia/kule3.png'
			} else if(statekGracza.poziomUlepszenieKule===4){
				this.obr.src = 'grafiki/ulepszenia/kule4.png'
			} else if(statekGracza.poziomUlepszenieKule===5){
				this.obr.src = 'grafiki/ulepszenia/kule5.png'
			} else if(statekGracza.poziomUlepszenieKule===6){
				this.obr.src = 'grafiki/ulepszenia/kule6.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszeniePredkosc = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszenieKule.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("KROTSZY CZAS PRZELADOWANIA I TRYB AUTO",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszeniePredkosc===1){
					c.fillText(cenyGra.ulepszeniePredkosc1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszeniePredkosc===2){
					c.fillText(cenyGra.ulepszeniePredkosc2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszeniePredkosc===3){
					c.fillText(cenyGra.ulepszeniePredkosc3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszeniePredkosc===4){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszeniePredkosc===1){
				this.obr.src = 'grafiki/ulepszenia/predkosc1.png'
			} else if(statekGracza.poziomUlepszeniePredkosc===2){
				this.obr.src = 'grafiki/ulepszenia/predkosc2.png'
			} else if(statekGracza.poziomUlepszeniePredkosc===3){
				this.obr.src = 'grafiki/ulepszenia/predkosc3.png'
			} else if(statekGracza.poziomUlepszeniePredkosc===4){
				this.obr.src = 'grafiki/ulepszenia/predkosc4.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszenieZasieg = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszeniePredkosc.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("WIEKSZY ZASIEG STATKU GRACZA",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieZasieg===1){
					c.fillText(cenyGra.ulepszenieZasieg1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZasieg===2){
					c.fillText(cenyGra.ulepszenieZasieg2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZasieg===3){
					c.fillText(cenyGra.ulepszenieZasieg3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZasieg===4){
					c.fillText(cenyGra.ulepszenieZasieg4,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZasieg===5){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieZasieg===1){
				this.obr.src = 'grafiki/ulepszenia/zasieg1.png'
			} else if(statekGracza.poziomUlepszenieZasieg===2){
				this.obr.src = 'grafiki/ulepszenia/zasieg2.png'
			} else if(statekGracza.poziomUlepszenieZasieg===3){
				this.obr.src = 'grafiki/ulepszenia/zasieg3.png'
			} else if(statekGracza.poziomUlepszenieZasieg===4){
				this.obr.src = 'grafiki/ulepszenia/zasieg4.png'
			} else if(statekGracza.poziomUlepszenieZasieg===5){
				this.obr.src = 'grafiki/ulepszenia/zasieg5.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var ulepszenieZycie = {
	widocznosc: true,
	r: 20,
	x: 100,
	y: ulepszenieZasieg.y+window.innerHeight/9,
	obr:  new Image(20,20),
	rysuj: function(){
		if(this.widocznosc){
			if(fizyka.odleglosc(mysz.x,mysz.y,this.x,this.y)<20){
				c.globalAlpha=0.2;
				c.font = "20px Arial";
				c.fillText("WIECEJ ZYCIA I SZYBSZE LECZENIE",this.x+25,this.y+17.5);
				if(statekGracza.poziomUlepszenieZycie===1){
					c.fillText(cenyGra.ulepszenieZycie1,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZycie===2){
					c.fillText(cenyGra.ulepszenieZycie2,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZycie===3){
					c.fillText(cenyGra.ulepszenieZycie3,this.x-50,this.y+17.5);
				} else if(statekGracza.poziomUlepszenieZycie===4){
					c.fillText("MAX",this.x-50,this.y+17.5);
				}
				c.globalAlpha=1;
			}
			if(statekGracza.poziomUlepszenieZycie===1){
				this.obr.src = 'grafiki/ulepszenia/zycie1.png'
			} else if(statekGracza.poziomUlepszenieZycie===2){
				this.obr.src = 'grafiki/ulepszenia/zycie2.png'
			} else if(statekGracza.poziomUlepszenieZycie===3){
				this.obr.src = 'grafiki/ulepszenia/zycie3.png'
			} else if(statekGracza.poziomUlepszenieZycie===4){
				this.obr.src = 'grafiki/ulepszenia/zycie4.png'
			}
			c.drawImage(this.obr, this.x, this.y);
		}
	}
}
var mapa = {
	widocznosc: true,
	x: 5,
	szerokosc: 200,
	width: 200,
	y: window.innerHeight-175,
	height: 150,
	wysokosc: 150,
	stosunekX: window.innerWidth/this.szerokosc,
	stosunekY: window.innerHeight/this.wysokosc,
	xObszaru: this.szerokosc/2,
	yObszaru: this.wysokosc/2,
	szerokoscObszaru: this.szerokosc/5,
	wysokoscObszaru: this.wysokosc/5,
	rysuj: function (){
		if(ekran.gra){
			this.szerokoscObszaru= this.szerokosc/5;
			this.wysokoscObszaru= this.wysokosc/5;

			this.stosunekX=this.szerokosc/(2000);
			this.stosunekY=this.wysokosc/(2000);
			this.stosunekObszarX=this.szerokoscObszaru/window.innerWidth;
			this.stosunekObszarY=this.wysokoscObszaru/window.innerHeight;
			this.xObszaru=S.przesuniecieX*this.stosunekX;
			this.yObszaru=S.przesuniecieY*this.stosunekY;
			c.beginPath();
			c.arc(this.x+this.szerokosc/2,this.y+this.wysokosc/2,S.r*this.stosunekObszarX,0,Math.PI*2,true);
        	c.fillStyle="#ffff66";
        	c.fill();
        	c.beginPath();
        	c.arc(this.x+this.szerokosc/2,this.y+this.wysokosc/2,S.r*this.stosunekObszarY,Math.PI/2,Math.PI*3/2,true);
        	c.fillStyle="#ffcc66";
			for(x in planety){
				c.beginPath();
				c.arc(this.x+this.szerokosc/2+(planety[x].R*Math.cos(planety[x].teta))*this.stosunekObszarX,
				this.y+this.wysokosc/2+planety[x].R*this.stosunekObszarY*Math.sin(planety[x].teta),
				planety[x].r*this.stosunekObszarX,
				0,Math.PI*2,true);
				if(planety[x].kolor<=0.125){
					c.fillStyle="#cc9966";
				}else if(planety[x].kolor<=0.125*2){
					c.fillStyle="#cc6600";
				}else if(planety[x].kolor<=0.125*3){
					c.fillStyle="#336699";
				}else if(planety[x].kolor<=0.125*4){
					c.fillStyle="#996600";
				}else if(planety[x].kolor<=0.125*5){
					c.fillStyle="#cc9966";
				}else if(planety[x].kolor<=0.125*6){
					c.fillStyle="#ffffcc";
				}else if(planety[x].kolor<=0.125*7){
					c.fillStyle="#6699cc";
				}else if(planety[x].kolor<=0.125*8){
					c.fillStyle="#6666cc";
				};
				c.fill();
				c.beginPath();
				c.arc(this.x+this.szerokosc/2+planety[x].R*this.stosunekObszarX*Math.cos(planety[x].teta),
				this.y+this.wysokosc/2+planety[x].R*this.stosunekObszarY*Math.sin(planety[x].teta),
				planety[x].r*this.stosunekObszarX,Math.PI/2,Math.PI*3/2,true);
				if(planety[x].kolor<=0.125){
					c.fillStyle="#996666";
				}else if(planety[x].kolor<=0.125*2){
					c.fillStyle="#996600";
				}else if(planety[x].kolor<=0.125*3){
					c.fillStyle="#003399";
				}else if(planety[x].kolor<=0.125*4){
					c.fillStyle="#cc3300";
				}else if(planety[x].kolor<=0.125*5){
					c.fillStyle="#999966";
				}else if(planety[x].kolor<=0.125*6){
					c.fillStyle="#ffcccc";
				}else if(planety[x].kolor<=0.125*7){
					c.fillStyle="#3399cc";
				}else if(planety[x].kolor<=0.125*8){
					c.fillStyle="#336699";
				};
				c.fill();
			}



			c.beginPath();
			c.globalAlpha=0.1;
			c.rect(this.x,this.y,this.szerokosc,this.wysokosc);
			c.fillStyle = "black";
			c.fill();
			c.beginPath();
			c.globalAlpha=0.2;
			c.rect(this.x+this.szerokosc/2-this.szerokoscObszaru/2+this.xObszaru,
			this.y+this.wysokosc/2-this.wysokoscObszaru/2+this.yObszaru,
			this.szerokoscObszaru,
			this.wysokoscObszaru);
			c.fillStyle = "black";
			c.fill();
		};
		c.globalAlpha=1;
		}
};