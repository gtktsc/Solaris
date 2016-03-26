window.addEventListener('mousemove',function(event) {
        mysz.x=event.clientX-6;
        mysz.y=event.clientY-6;
},false);
window.addEventListener('click', function(){
if(ekran.gra && menuBudowaniaSpowalniacz.rusz===false){
    if(!ekran.pauza ){
        if(mysz.statek){
            mysz.rusz=true;
        };
        if(fizyka.dwaCiala(mysz,statekGracza)){
            mysz.statek=true;
        };
    };
	
    for (i in planety) {
        if(fizyka.klikniecie(mysz,planety[i]) && ekran.budowanie){
            myszKlik.x=mysz.x
            myszKlik.y=mysz.y
			
			menuBudowaniaSpowalniacz.x=planety[i].x-30;
			menuBudowaniaSpowalniacz.y=planety[i].y-30;
			menuBudowaniaSpowalniacz.widocznosc=true;			
			menuBudowaniaSatelita.x=planety[i].x+30;
			menuBudowaniaSatelita.y=planety[i].y-30;
			menuBudowaniaSatelita.widocznosc=true;			
			menuBudowaniaWahadlowiec.x=planety[i].x-30;
			menuBudowaniaWahadlowiec.y=planety[i].y+30;
			menuBudowaniaWahadlowiec.widocznosc=true;			
			menuBudowaniaNaziemne.x=planety[i].x+30;
			menuBudowaniaNaziemne.y=planety[i].y+30;
			menuBudowaniaNaziemne.widocznosc=true;
			menuBudowaniaNaziemne.rodzic=i;
			menuBudowaniaSpowalniacz.rodzic=i;
			menuBudowaniaWahadlowiec.rodzic=i;
            if(!mysz.planeta){
                mysz.planeta=true;
            } else {
                mysz.planeta=false;
            };
        }
    };
	if(fizyka.klikniecie(mysz,S) && !fizyka.klikniecie(mysz,menuBudowaniaNaziemne)&& !fizyka.klikniecie(mysz,menuBudowaniaSatelita)&& !fizyka.klikniecie(mysz,menuBudowaniaWahadlowiec)&& !fizyka.klikniecie(mysz,menuBudowaniaSpowalniacz)){
		if(!ekran.budowanie){
			fizyka.szybkoscAnimacji('stop');
		} else {
			fizyka.szybkoscAnimacji('start');		
            menuBudowaniaNaziemne.widocznosc=false;
            menuBudowaniaWahadlowiec.widocznosc=false;	
            menuBudowaniaSatelita.widocznosc=false;	
            menuBudowaniaSpowalniacz.widocznosc=false;					
		}
	ekran.budowanie=!ekran.budowanie;
	}
	if(ekran.budowanie && menuBudowaniaNaziemne.widocznosc){
		if(fizyka.klikniecie(mysz,menuBudowaniaSatelita) && ekran.energia>=100){
			if(satelity.length>1){
				satelity[satelity.length] = new Satelita(menuBudowaniaSatelita.x,menuBudowaniaSatelita.y,1);
			} else {
				satelity[1] = new Satelita(menuBudowaniaSatelita.x,menuBudowaniaSatelita.y,1);
			};
			ekran.energia=ekran.energia-100;
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaNaziemne) && ekran.energia>=70){
			planety[menuBudowaniaNaziemne.rodzic].obecnaObrona=true;
			if(naziemni.length>1){
				naziemni[naziemni.length] = new Naziemne(1,planety[menuBudowaniaNaziemne.rodzic]);
			} else {
				naziemni[1] = new Naziemne(1,planety[menuBudowaniaNaziemne.rodzic]);
			};
			naziemni[naziemni.length-1].widocznosc=true;
			naziemni[naziemni.length-1].rodzicNumer=menuBudowaniaNaziemne.rodzic;
			ekran.energia=ekran.energia-70;
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaSpowalniacz) && ekran.energia>=80){
			planety[menuBudowaniaSpowalniacz.rodzic].obecnySpowalniacz=true;
			if(spowalniacze.length>1){
				spowalniacze[spowalniacze.length] = new Spowalniacz(1);
			} else {
				spowalniacze[1] = new Spowalniacz(1);
			};
			spowalniacze[spowalniacze.length-1].widocznosc=true;
			menuBudowaniaSpowalniacz.rusz=true;
			spowalniacze[spowalniacze.length-1].rusz=true;
			spowalniacze[spowalniacze.length-1].rodzicNumer=menuBudowaniaSpowalniacz.rodzic;
			ekran.energia=ekran.energia-80
		}
		if(fizyka.klikniecie(mysz,menuBudowaniaWahadlowiec) && ekran.energia>=120){

			if(wahadlowce.length>1){
				wahadlowce[wahadlowce.length] = new Wahadlowiec(1,planety[menuBudowaniaWahadlowiec.rodzic]);
			} else {
				wahadlowce[1] = new Wahadlowiec(1,planety[menuBudowaniaWahadlowiec.rodzic]);
			};
			wahadlowce[wahadlowce.length-1].widocznosc=true;
			wahadlowce[wahadlowce.length-1].rodzicNumer=menuBudowaniaWahadlowiec.rodzic;
			console.log(wahadlowce[wahadlowce.length-1])
			ekran.energia=ekran.energia-120
		}
	}
} else {
	menuBudowaniaSpowalniacz.rusz=false
	if(typeof(spowalniacze[spowalniacze.length-1])==='object'){
		spowalniacze[spowalniacze.length-1].rusz=false;
	}

}
}, false);
window.addEventListener('keydown', function(event) {
	if(ekran.gra){
	    if(!ekran.pauza){
			switch (event.keyCode) {
				case 49 : // 1
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
				break;
				case 50 : // 2
				if(statekGracza.maxLiczbaPociskow[1]>0){
						if(pociski.length>1){
							pociski[pociski.length] = new Pocisk(10,10,2,2,2,'green');
						} else {
							pociski[1] = new Pocisk(10,10,2,2,2,'green');
						};
						pociski[pociski.length-1].widocznosc=true;
						statekGracza.wystrzel(pociski[pociski.length-1]);
						pociski[pociski.length-1].rodzic="statekGracza";
						statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]-1;
				};
				break;
				case 51 : // 3
					if(statekGracza.maxLiczbaPociskow[2]>0){
						if(pociski.length>1){
							pociski[pociski.length] = new Pocisk(10,10,2,2,2,'blue');
						} else {
							pociski[1] = new Pocisk(10,10,2,2,2,'blue');
						};
						pociski[pociski.length-1].widocznosc=true;
						statekGracza.wystrzel(pociski[pociski.length-1]);
						pociski[pociski.length-1].rodzic="statekGracza";
						statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]-1;
					};
				break;
				case 52 : // 4
					mysz.statek=true;
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