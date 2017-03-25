window.addEventListener('click', function(){
	if(ekran.menu){
		if(fizyka.klikniecie(mysz,S)){
			ekran.przejdzDoOkna=true;
		};
		for (i in poziomy) {
			if(fizyka.klikniecie(mysz,poziomy[i])){
				myszKlik.x=mysz.x;
				myszKlik.y=mysz.y;
				ekran.falaNumer=1;
				switch(Number(i)){
					case 1:
						fizyka.generujPlansze(7,5,5,5,5,1,1);
						statekGracza.aktualnyPoziom=1;
						ekran.liczbaFal=5;
						ekran.energia=10000;
					break;
					case 2:
						fizyka.generujPlansze(7,4,0.1,0,0.1,0,1);
						statekGracza.aktualnyPoziom=2;
						ekran.liczbaFal=5;
						ekran.energia=4000;
					break;
					case 3:
						fizyka.generujPlansze(7,4,0.1,4,0.1,0,0.1);
						statekGracza.aktualnyPoziom=3;
						ekran.liczbaFal=5;
						ekran.energia=5000;
					break;
					case 4:
						fizyka.generujPlansze(6,8,0.1,8,0.1,0,0.1);
						statekGracza.aktualnyPoziom=4;
						ekran.liczbaFal=6;
						ekran.energia=6000;
					break;
					case 5:
						fizyka.generujPlansze(5,10,0.1,10,0.1,4,0.1);
						statekGracza.aktualnyPoziom=5;
						ekran.liczbaFal=7;
						ekran.energia=6000;
					break;
					case 6:
						fizyka.generujPlansze(5,20,0.1,20,0.1,4,0.1);
						statekGracza.aktualnyPoziom=6;
						ekran.liczbaFal=7;
						ekran.energia=4000;
					break;
					case 7:
						fizyka.generujPlansze(5,20,0.1,20,0.1,20,0.1);
						statekGracza.aktualnyPoziom=7;
						ekran.liczbaFal=8;
						ekran.energia=3000;
					break;
				};
				ekran.menu=false;
				ekran.gra=true;
			};
		};
		
	};
}, false);