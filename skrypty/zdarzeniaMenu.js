window.addEventListener('click', function(){
	if(ekran.menu){
		for (i in poziomy) {
			if(fizyka.klikniecie(mysz,poziomy[i])){
				myszKlik.x=mysz.x;
				myszKlik.y=mysz.y;
				ekran.falaNumer=1;
				switch(Number(i)){
					case 1:
						fizyka.generujPlansze(7,1,1,1,1,1,1);
						statekGracza.aktualnyPoziom=1;
						ekran.liczbaFal=5;
						ekran.energia=10000;
					break;
					case 2:
						fizyka.generujPlansze(7,4,0.1,0,0.1,0,1);
						statekGracza.aktualnyPoziom=2;
						ekran.liczbaFal=5;
						ekran.energia=400;
					break;
					case 3:
						fizyka.generujPlansze(7,4,0.1,4,0.1,0,0.1);
						statekGracza.aktualnyPoziom=3;
						ekran.liczbaFal=10;
						ekran.energia=500;
					break;
					case 4:
						fizyka.generujPlansze(6,8,0.1,8,0.1,0,0.1);
						statekGracza.aktualnyPoziom=4;
						ekran.liczbaFal=10;
						ekran.energia=600;
					break;
					case 5:
						fizyka.generujPlansze(5,10,0.1,10,0.1,4,0.1);
						statekGracza.aktualnyPoziom=5;
						ekran.liczbaFal=500;
					break;
					case 6:
						fizyka.generujPlansze(5,20,0.1,20,0.1,4,0.1);
						statekGracza.aktualnyPoziom=6;
						ekran.liczbaFal=15;
						ekran.energia=400;
					break;
					case 7:
						fizyka.generujPlansze(5,20,0.1,20,0.1,20,0.1);
						statekGracza.aktualnyPoziom=7;
						ekran.liczbaFal=20;
						ekran.energia=300;
					break;
				};
				ekran.menu=false;
				ekran.gra=true;
			};
		};
		
	};
}, false);