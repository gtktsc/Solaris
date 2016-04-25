window.addEventListener('click', function(){
	if(ekran.ulepszenie){
		if(fizyka.klikniecie(mysz,S)){
			ekran.przejdzDoOkna=true;	
		}
		if(fizyka.klikniecie(mysz,ulepszenieBron)){
			console.log(statekGracza.maxLiczbaPociskow)
			if(statekGracza.poziomUlepszenieBron===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieBron1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieBron1
				statekGracza.poziomUlepszenieBron=2;
				statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
			} else if (statekGracza.poziomUlepszenieBron===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieBron2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieBron2	
				statekGracza.poziomUlepszenieBron=3;
				statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
			}
		};
		if(fizyka.klikniecie(mysz,ulepszenieCzas)){
			console.log(statekGracza.czasOdrodzenia,statekGracza.przeladowanieCzas,statekGracza.trybAutoCzas)
			if(statekGracza.poziomUlepszenieCzas===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieCzas1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieCzas1
				statekGracza.poziomUlepszenieCzas=2;
				statekGracza.czasOdrodzenia=9000

			} else if(statekGracza.poziomUlepszenieCzas===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieCzas2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieCzas2
				statekGracza.poziomUlepszenieCzas=3;
				statekGracza.czasOdrodzenia=8000

			} else if(statekGracza.poziomUlepszenieCzas===3 && statekGracza.doswiadczenie>=cenyGra.ulepszenieCzas3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieCzas3
				statekGracza.poziomUlepszenieCzas=4;
				statekGracza.czasOdrodzenia=7000
			}
		};
		if(fizyka.klikniecie(mysz,ulepszenieKoszt)){
			console.log(cenyGra.menuBudowaniaNaziemne,cenyGra.menuBudowaniaWahadlowiec,cenyGra.menuBudowaniaSpowalniacz,cenyGra.menuBudowaniaSatelita)
			if(statekGracza.poziomUlepszenieKoszt===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKoszt1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKoszt1
				statekGracza.poziomUlepszenieKoszt=2;
				cenyGra.menuBudowaniaNaziemne=300;
				cenyGra.menuBudowaniaWahadlowiec=250;
				cenyGra.menuBudowaniaSpowalniacz=200;
				cenyGra.menuBudowaniaSatelita=200;
			} else if(statekGracza.poziomUlepszenieKoszt===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKoszt2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKoszt2
				statekGracza.poziomUlepszenieKoszt=3;
				cenyGra.menuBudowaniaNaziemne=275;
				cenyGra.menuBudowaniaWahadlowiec=225;
				cenyGra.menuBudowaniaSpowalniacz=175;
				cenyGra.menuBudowaniaSatelita=175;
			} else if(statekGracza.poziomUlepszenieKoszt===3 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKoszt3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKoszt3
				statekGracza.poziomUlepszenieKoszt=4;
				cenyGra.menuBudowaniaNaziemne=250;
				cenyGra.menuBudowaniaWahadlowiec=200;
				cenyGra.menuBudowaniaSpowalniacz=125;
				cenyGra.menuBudowaniaSatelita=150;
			} else if(statekGracza.poziomUlepszenieKoszt===4 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKoszt4){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKoszt4
				statekGracza.poziomUlepszenieKoszt=5;
				cenyGra.menuBudowaniaNaziemne=200;
				cenyGra.menuBudowaniaWahadlowiec=150;
				cenyGra.menuBudowaniaSpowalniacz=100;
				cenyGra.menuBudowaniaSatelita=100;
			}
		}
		if(fizyka.klikniecie(mysz,ulepszenieKule)){
			console.log(statekGracza.maxLiczbaPociskow)
			if(statekGracza.poziomUlepszenieKule===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKule1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKule1
				statekGracza.poziomUlepszenieKule=2;
				statekGracza.obrazenia=[12,10,8];
				if(statekGracza.poziomUlepszenieBron==1){
					statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==2){
					statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==3){
					statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				}
			} else if(statekGracza.poziomUlepszenieKule===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKule2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKule2
				statekGracza.poziomUlepszenieKule=3;
				statekGracza.obrazenia=[15,12,10];
				if(statekGracza.poziomUlepszenieBron==1){
					statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==2){
					statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==3){
					statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				}
			} else if(statekGracza.poziomUlepszenieKule===3 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKule3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKule3
				statekGracza.poziomUlepszenieKule=4;
								statekGracza.obrazenia=[17,12,10];
				if(statekGracza.poziomUlepszenieBron==1){
					statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==2){
					statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==3){
					statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				}
			} else if(statekGracza.poziomUlepszenieKule===4 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKule4){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKule4
				statekGracza.poziomUlepszenieKule=5;
								statekGracza.obrazenia=[20,15,12];
				if(statekGracza.poziomUlepszenieBron==1){
					statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==2){
					statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==3){
					statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				}
			}else if(statekGracza.poziomUlepszenieKule===5 && statekGracza.doswiadczenie>=cenyGra.ulepszenieKule5){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieKule5
				statekGracza.poziomUlepszenieKule=6;
								statekGracza.obrazenia=[30,20,15];
				if(statekGracza.poziomUlepszenieBron==1){
					statekGracza.maxLiczbaPociskow=[0,0,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==2){
					statekGracza.maxLiczbaPociskow=[0,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				} else if(statekGracza.poziomUlepszenieBron==3){
					statekGracza.maxLiczbaPociskow=[statekGracza.poziomUlepszenieKule*5,statekGracza.poziomUlepszenieKule*10,statekGracza.poziomUlepszenieKule*15]
				}				
			}
		}
		if(fizyka.klikniecie(mysz,ulepszeniePredkosc)){
			if(statekGracza.poziomUlepszeniePredkosc===1 && statekGracza.doswiadczenie>=cenyGra.ulepszeniePredkosc1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszeniePredkosc1
				statekGracza.poziomUlepszeniePredkosc=2;
				statekGracza.trybAutoCzas=8000
				statekGracza.przeladowanieCzas=275
			} else if(statekGracza.poziomUlepszeniePredkosc===2 && statekGracza.doswiadczenie>=cenyGra.ulepszeniePredkosc2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszeniePredkosc2
				statekGracza.poziomUlepszeniePredkosc=3;
				statekGracza.trybAutoCzas=5000
				statekGracza.przeladowanieCzas=200
			} else if(statekGracza.poziomUlepszeniePredkosc===3 && statekGracza.doswiadczenie>=cenyGra.ulepszeniePredkosc3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszeniePredkosc3
				statekGracza.poziomUlepszeniePredkosc=4;
				statekGracza.trybAutoCzas=100
				statekGracza.przeladowanieCzas=10
			}
			clearInterval(przeladowanieStatekGracza)
			var przeladowanieStatekGracza = setInterval(function(){statekGracza.przeladowanie=false}, statekGracza.przeladowanieCzas);
			clearInterval(trybAutoStatekGracza)
			var trybAutoStatekGracza = setInterval(function(){statekGracza.trybAuto=true}, statekGracza.trybAutoCzas);
		}
		if(fizyka.klikniecie(mysz,ulepszenieZasieg)){
			if(statekGracza.poziomUlepszenieZasieg===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZasieg1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZasieg1
				statekGracza.poziomUlepszenieZasieg=2;
				statekGracza.zasieg=100;
			} else if(statekGracza.poziomUlepszenieZasieg===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZasieg2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZasieg2
				statekGracza.poziomUlepszenieZasieg=3;
				statekGracza.zasieg=150;
			} else if(statekGracza.poziomUlepszenieZasieg===3 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZasieg3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZasieg3
				statekGracza.poziomUlepszenieZasieg=4;
				statekGracza.zasieg=175;
			} else if(statekGracza.poziomUlepszenieZasieg===4 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZasieg3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZasieg3
				statekGracza.poziomUlepszenieZasieg=5;
				statekGracza.zasieg=200;
			}
		}
		if(fizyka.klikniecie(mysz,ulepszenieZycie)){
			if(statekGracza.poziomUlepszenieZycie===1 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZycie1){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZycie1
				statekGracza.poziomUlepszenieZycie=2;
				statekGracza.maxZycie=150
				statekGracza.szybkoscLeczenia=0.05
			} else if(statekGracza.poziomUlepszenieZycie===2 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZycie2){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZycie2
				statekGracza.poziomUlepszenieZycie=3;
				statekGracza.maxZycie=250
				statekGracza.szybkoscLeczenia=0.1
			} else if(statekGracza.poziomUlepszenieZycie===3 && statekGracza.doswiadczenie>=cenyGra.ulepszenieZycie3){
				statekGracza.doswiadczenie=statekGracza.doswiadczenie-cenyGra.ulepszenieZycie3
				statekGracza.poziomUlepszenieZycie=4;
				statekGracza.maxZycie=350
				statekGracza.szybkoscLeczenia=0.15
			}
		}		
	};
}, false);