window.addEventListener('mousemove',function(event) {
        mysz.x=event.clientX-6;
        mysz.y=event.clientY-6;
	if(ekran.zaznaczenieGracza){
		ekran.zaznaczenieGraczaX2=mysz.x;
		ekran.zaznaczenieGraczaY2=mysz.y;
	}

},false);
window.addEventListener('click', function(){
if(fizyka.klikniecieProstokat(mysz,mapa) && fizyka.nieDotykaMenu()){
	S.x=(mapa.x-mysz.x)/mapa.stosunekX+window.innerWidth*1.4;
	S.y=(mapa.y-mysz.y)/mapa.stosunekY+window.innerHeight*2;











};
if(ekran.gra && menuBudowaniaSpowalniacz.rusz===false){
    if(!ekran.pauza && !statekGracza.odradzanie){
		if(!mysz.statek){
			fizyka.atakPoKliknieciu();
			mysz.pojedynczy=true;
		}
        if(mysz.statek && !mysz.atakuj){
			mysz.rusz=true;
        };
        if(fizyka.dwaCiala(mysz,statekGracza) && !mysz.atakuj){
			statekGracza.naPlanecie=0;
            mysz.statek=true;
        };
    };

    for (i in planety) {
        if(fizyka.klikniecie(mysz,planety[i]) && ekran.budowanie){
			if(Number(i)===mysz.planetaNumer && ekran.pauza){
				fizyka.szybkoscAnimacji('start');
			} else if (ekran.pauza){
				mysz.planetaNumer=Number(i);
				menuBudowaniaSpowalniacz.pokaz(i);
				menuBudowaniaSpowalniaczLepiej.pokaz();
				menuBudowaniaSpowalniaczWiecej.pokaz();
				menuBudowaniaSatelita.pokaz(i);
				menuBudowaniaSatelitaWiecej.pokaz();
				menuBudowaniaSatelitaLepiej.pokaz();
				menuBudowaniaWahadlowiec.pokaz(i);
				menuBudowaniaWahadlowiecWiecej.pokaz();
				menuBudowaniaWahadlowiecLepiej.pokaz();
				menuBudowaniaNaziemne.pokaz(i);
				menuBudowaniaNaziemneWiecej.pokaz();
				menuBudowaniaNaziemneLepiej.pokaz();
				if(!mysz.planeta){
					mysz.planeta=true;
				} else {
					mysz.planeta=false;
				};
			}

        }
    };
	if(fizyka.klikniecie(mysz,S) && fizyka.nieDotykaMenu()){
		myszKlik.rusz=false;
		mysz.rusz=false;
		mysz.statek=false;
		if(!ekran.budowanie){
			fizyka.szybkoscAnimacji('stop');
		} else {
			fizyka.szybkoscAnimacji('start');
		}
	ekran.budowanie=!ekran.budowanie;
	}
	if(ekran.budowanie && menuBudowaniaNaziemne.widocznosc){
		if(fizyka.klikniecie(mysz,menuBudowaniaSatelita) && ekran.energia>=cenyGra.menuBudowaniaSatelita){
			if(!planety[menuBudowaniaSatelita.rodzic].obecnaSatelita){
				if(satelity.length>1){
					satelity[satelity.length] = new Satelita(menuBudowaniaSatelita.x,menuBudowaniaSatelita.y,1);
				} else {
					satelity[1] = new Satelita(menuBudowaniaSatelita.x,menuBudowaniaSatelita.y,1);
				};
				planety[menuBudowaniaSatelita.rodzic].obecnaSatelita=true;
				satelity[satelity.length-1].widocznosc=true;
				satelity[satelity.length-1].rodzicNumer=menuBudowaniaSatelita.rodzic;
				ekran.energia=ekran.energia-cenyGra.menuBudowaniaSatelita;
				menuBudowaniaSatelitaWiecej.pokaz();
				menuBudowaniaSatelitaLepiej.pokaz();
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSatelitaWiecej)){
			for(x in satelity){
				if(satelity[x].rodzicNumer===menuBudowaniaSatelita.rodzic){
					if(satelity[x].poziomWiecej===0 && ekran.energia>=cenyGra.menuBudowaniaSatelitaWiecej1){
						planety[menuBudowaniaSatelita.rodzic].obecnaSatelitaWiecej=1;
						satelity[x].poziomWiecej=1;
						satelity[x].zasiegOddzialywaniaWiecej=satelity[x].zasiegOddzialywaniaWiecej+10;
						satelity[x].czasOddzialywaniaWiecej=satelity[x].czasOddzialywaniaWiecej+100;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSatelitaWiecej1;
					} else if(satelity[x].poziomWiecej===1 && ekran.energia>=cenyGra.menuBudowaniaSatelitaWiecej2){
						planety[menuBudowaniaSatelita.rodzic].obecnaSatelitaWiecej=2;
						satelity[x].poziomWiecej=2;
						satelity[x].zasiegOddzialywaniaWiecej=satelity[x].zasiegOddzialywaniaWiecej+20;
						satelity[x].czasOddzialywaniaWiecej=satelity[x].czasOddzialywaniaWiecej+200;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSatelitaWiecej2;
					}
				}
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSatelitaLepiej)){
			for(x in satelity){
				if(satelity[x].rodzicNumer===menuBudowaniaSatelita.rodzic){
					if(satelity[x].poziomLepiej===0 && ekran.energia>=cenyGra.menuBudowaniaSatelitaLepiej1){
						planety[menuBudowaniaSatelita.rodzic].obecnaSatelitaLepiej=1;
						satelity[x].poziomLepiej=1;
						satelity[x].predkoscPocisku=satelity[x].predkoscPocisku+2.5;
						satelity[x].maxLiczbaPociskow=[4,4,4];
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSatelitaLepiej1;
					} else if(satelity[x].poziomLepiej===1 && ekran.energia>=cenyGra.menuBudowaniaSatelitaLepiej2){
						planety[menuBudowaniaSatelita.rodzic].obecnaSatelitaLepiej=2;
						satelity[x].poziomLepiej=2;
						satelity[x].predkoscPocisku=satelity[x].predkoscPocisku+2.5;
						satelity[x].maxLiczbaPociskow=[8,8,8];
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSatelitaLepiej2;
					}
				}
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaNaziemne) && ekran.energia>=cenyGra.menuBudowaniaNaziemne){
			if(!planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemna){
				if(naziemni.length>1){
					naziemni[naziemni.length] = new Naziemne(1,planety[menuBudowaniaNaziemne.rodzic]);
				} else {
					naziemni[1] = new Naziemne(1,planety[menuBudowaniaNaziemne.rodzic]);
				};
				planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemna=true;
				naziemni[naziemni.length-1].widocznosc=true;
				naziemni[naziemni.length-1].rodzicNumer=menuBudowaniaNaziemne.rodzic;
				ekran.energia=ekran.energia-cenyGra.menuBudowaniaNaziemne;
				menuBudowaniaNaziemneWiecej.pokaz();
				menuBudowaniaNaziemneLepiej.pokaz();
			}

		}
		if(fizyka.klikniecie(mysz,menuBudowaniaNaziemneWiecej)){
			for(x in naziemni){
				if(naziemni[x].rodzicNumer===menuBudowaniaNaziemne.rodzic){
					if(naziemni[x].poziomWiecej===0 && ekran.energia>=cenyGra.menuBudowaniaNaziemneWiecej1){
						planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemnaWiecej=1;
						naziemni[x].poziomWiecej=1;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaNaziemneWiecej1;
					} else if(naziemni[x].poziomWiecej===1 && ekran.energia>=cenyGra.menuBudowaniaNaziemneWiecej2){
						planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemnaWiecej=2;
						naziemni[x].poziomWiecej=2;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaNaziemneWiecej2;
					}
				}
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaNaziemneLepiej)){
			for(x in naziemni){
				if(naziemni[x].rodzicNumer===menuBudowaniaNaziemne.rodzic){
					if(naziemni[x].poziomLepiej===0 && ekran.energia>=cenyGra.menuBudowaniaNaziemneLepiej1){
						planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemnaLepiej=1;
						naziemni[x].poziomLepiej=1;
						naziemni[x].obrazenia=naziemni[x].obrazenia+0.5;
						naziemni[x].r=naziemni[x].r+15;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaNaziemneLepiej1;
					} else if(naziemni[x].poziomLepiej===1 && ekran.energia>=cenyGra.menuBudowaniaNaziemneLepiej2){
						planety[menuBudowaniaNaziemne.rodzic].obecnaNaziemnaLepiej=2;
						naziemni[x].poziomLepiej=2;
						naziemni[x].obrazenia=naziemni[x].obrazenia+0.5;
						naziemni[x].r=naziemni[x].r+15;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaNaziemneLepiej2;
					}
				}
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSpowalniacz) && ekran.energia>=cenyGra.menuBudowaniaSpowalniacz){
			if(!planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniacz){
				if(spowalniacze.length>1){
					spowalniacze[spowalniacze.length] = new Spowalniacz(1);
				} else {
					spowalniacze[1] = new Spowalniacz(1);
				};
				spowalniacze[spowalniacze.length-1].widocznosc=true;
				menuBudowaniaSpowalniacz.rusz=true;
				spowalniacze[spowalniacze.length-1].rusz=true;
				spowalniacze[spowalniacze.length-1].alfa=true;
				spowalniacze[spowalniacze.length-1].rodzicNumer=menuBudowaniaSpowalniacz.rodzic;
				planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniacz=true;
				ekran.energia=ekran.energia-cenyGra.menuBudowaniaSpowalniacz;
				menuBudowaniaSpowalniaczLepiej.pokaz();
				menuBudowaniaSpowalniaczWiecej.pokaz();
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSpowalniaczWiecej)){
			for(x in spowalniacze){
				if(spowalniacze[x].rodzicNumer===menuBudowaniaSpowalniacz.rodzic && spowalniacze[x].alfa){
					if(spowalniacze[x].poziomWiecej===0 && ekran.energia>=cenyGra.menuBudowaniaSpowalniaczWiecej1){
						spowalniacze[x].poziomWiecej=1;
						planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniaczWiecej=1;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSpowalniaczWiecej1;
						spowalniacze[spowalniacze.length] = new Spowalniacz(1);
						spowalniacze[spowalniacze.length-1].x = spowalniacze[x].x+60;
						spowalniacze[spowalniacze.length-1].y = spowalniacze[x].y;
						spowalniacze[spowalniacze.length-1].widocznosc = true;
						menuBudowaniaSpowalniaczWiecej.wybudowano=true;
					} else if(spowalniacze[x].poziomWiecej===1 && ekran.energia>=cenyGra.menuBudowaniaSpowalniaczWiecej2){
						spowalniacze[x].poziomWiecej=2;
						planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniaczWiecej=2;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSpowalniaczWiecej2;
						spowalniacze[spowalniacze.length] = new Spowalniacz(1);
						spowalniacze[spowalniacze.length-1].x = spowalniacze[x].x+30;
						spowalniacze[spowalniacze.length-1].y = spowalniacze[x].y-60;
						spowalniacze[spowalniacze.length-1].widocznosc = true;
						menuBudowaniaSpowalniaczWiecej.wybudowano=true;
					}
				}
			}
			if(menuBudowaniaSpowalniaczWiecej.wybudowano){
				spowalniacze[spowalniacze.length-1].rodzicNumer=menuBudowaniaSpowalniacz.rodzic;
				menuBudowaniaSpowalniaczWiecej.wybudowano=false;
			}

		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSpowalniaczLepiej)){
			for(x in spowalniacze){
				if(spowalniacze[x].rodzicNumer===menuBudowaniaSpowalniacz.rodzic){
					if(spowalniacze[x].poziomLepiej===0 && ekran.energia>=cenyGra.menuBudowaniaSpowalniaczLepiej1){
						spowalniacze[x].poziomLepiej=1;
						planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniaczLepiej=1;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSpowalniaczLepiej1;
						spowalniacze[x].zasieg=spowalniacze[x].zasieg+50;
					} else if(spowalniacze[x].poziomLepiej===1 && ekran.energia>=cenyGra.menuBudowaniaSpowalniaczLepiej2){
						spowalniacze[x].poziomLepiej=2;
						planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniaczLepiej=2;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaSpowalniaczLepiej2;
						spowalniacze[x].zasieg=spowalniacze[x].zasieg+30;
					}
				}
			}

		}
		if(fizyka.klikniecie(mysz,menuBudowaniaWahadlowiec) && ekran.energia>=cenyGra.menuBudowaniaWahadlowiec){
			if(!planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiec){
				if(wahadlowce.length>1){
					wahadlowce[wahadlowce.length] = new Wahadlowiec(1,planety[menuBudowaniaWahadlowiec.rodzic]);
				} else {
					wahadlowce[1] = new Wahadlowiec(1,planety[menuBudowaniaWahadlowiec.rodzic]);
				};
				planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiec=true;
				wahadlowce[wahadlowce.length-1].widocznosc=true;
				wahadlowce[wahadlowce.length-1].rodzicNumer=menuBudowaniaWahadlowiec.rodzic;
				ekran.energia=ekran.energia-cenyGra.menuBudowaniaWahadlowiec;
				menuBudowaniaWahadlowiecWiecej.pokaz();
				menuBudowaniaWahadlowiecLepiej.pokaz();
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaWahadlowiecWiecej)){
			for(x in wahadlowce){
				if(wahadlowce[x].rodzicNumer===menuBudowaniaWahadlowiec.rodzic){
					if(wahadlowce[x].poziomWiecej===0 && ekran.energia>=cenyGra.menuBudowaniaWahadlowiecWiecej1){
						planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiecWiecej=1;
						wahadlowce[x].poziomWiecej=1;
						wahadlowce[x].maxLiczbaPociskow[3]=wahadlowce[x].poziomWiecej;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaWahadlowiecWiecej1;
					} else if(wahadlowce[x].poziomWiecej===1 && ekran.energia>=cenyGra.menuBudowaniaWahadlowiecWiecej2){
						planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiecWiecej=2;
						wahadlowce[x].poziomWiecej=2;
						wahadlowce[x].maxLiczbaPociskow[3]=wahadlowce[x].poziomWiecej;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaWahadlowiecWiecej2;
					}
				}
			}
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaWahadlowiecLepiej)){
			for(x in wahadlowce){
				if(wahadlowce[x].rodzicNumer===menuBudowaniaWahadlowiec.rodzic){
					if(wahadlowce[x].poziomLepiej===0 && ekran.energia>=cenyGra.menuBudowaniaWahadlowiecLepiej1){
						planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiecLepiej=1;
						wahadlowce[x].poziomLepiej=1;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaWahadlowiecLepiej1;
						wahadlowce[x].maxLiczbaPociskow=[4,4,4,wahadlowce[x].poziomWiecej];
						wahadlowce[x].obrazenia=wahadlowce[x].obrazenia+1;
						wahadlowce[x].predkoscPocisku=wahadlowce[x].predkoscPocisku+1;

					} else if(wahadlowce[x].poziomLepiej===1 && ekran.energia>=cenyGra.menuBudowaniaWahadlowiecLepiej2){
						planety[menuBudowaniaWahadlowiec.rodzic].obecnyWahadlowiecLepiej=2;
						wahadlowce[x].poziomLepiej=2;
						wahadlowce[x].maxLiczbaPociskow=[8,8,8,wahadlowce[x].poziomWiecej];
						wahadlowce[x].obrazenia=wahadlowce[x].obrazenia+2;
						wahadlowce[x].predkoscPocisku=wahadlowce[x].predkoscPocisku+1;
						ekran.energia=ekran.energia-cenyGra.menuBudowaniaWahadlowiecLepiej2;
					}
				}
			}
		}
	}
} else {
	menuBudowaniaSpowalniacz.rusz=false
	if(typeof(spowalniacze[spowalniacze.length-1])==='object'){
		spowalniacze[spowalniacze.length-1].rusz=false;
	}

}
}, false);
window.addEventListener('mousedown',function(event){
	ekran.zaznaczenieGraczaSprawdz=false;
if(ekran.gra){

	fizyka.atakPoKliknieciu();
	if(!ekran.pauza && ekran.gra && !mysz.statek){
		mysz.ciagly=true;

	}
	if(!ekran.pauza && ekran.gra &&!mysz.atakuj){
		ekran.zaznaczenieGraczaX1=mysz.x;
		ekran.zaznaczenieGraczaY1=mysz.y;
		ekran.zaznaczenieGraczaX2=mysz.x;
		ekran.zaznaczenieGraczaY2=mysz.y;
		ekran.zaznaczenieGracza=true;
	}
}
});
window.addEventListener('mouseup',function(event){
if(ekran.gra){

    mysz.atakuj=false;
    mysz.ciagly=false;
    mysz.pojedynczy=false;
	if(ekran.zaznaczenieGracza){
		ekran.zaznaczenieGraczaSprawdz=true;
	}

}
})
window.addEventListener('keydown', function(event) {
	if(ekran.gra){
	    if(!ekran.pauza && !statekGracza.odradzanie){
			switch (event.keyCode) {
				case 49 : // 1
					if(statekGracza.maxLiczbaPociskow[0]>0 && !statekGracza.przeladowanie){
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
					};
				break;
				case 50 : // 2
				if(statekGracza.maxLiczbaPociskow[1]>0 && !statekGracza.przeladowanie){
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
				};
				break;
				case 51 : // 3
					if(statekGracza.maxLiczbaPociskow[2]>0 && !statekGracza.przeladowanie){
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
					};
				break;
				case 52 : // 4
					mysz.statek=true;
					statekGracza.naPlanecie=0;
				break;
				case 87: // W
					statekGracza.porusz("doPrzodu");
				break;
				case 68: // D
					statekGracza.porusz("obrocwPrawo");

				break;
				case 65: // A
					statekGracza.porusz("obrocwLewo");
				break;
				case 83: // S
					statekGracza.porusz("hamuj");
				break;
			};
		};
	}
});
