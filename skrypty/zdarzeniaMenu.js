window.addEventListener('click', function(){
	if(ekran.menu){
		for (i in poziomy) {
			if(fizyka.klikniecie(mysz,poziomy[i])){
				myszKlik.x=mysz.x;
				myszKlik.y=mysz.y;
				console.log("poziom",i);
				switch(Number(i)){
					case 1:
						fizyka.generujPlansze(7,1,0.1,1,0.1,8,8);
						statekGracza.aktualnyPoziom=1;
					break;
					case 2:
						fizyka.generujPlansze(7,4,0.1,0,0.1,0,1);
						statekGracza.aktualnyPoziom=2;
					break;
					case 3:
						fizyka.generujPlansze(7,4,0.1,4,0.1,0,0.1);
						statekGracza.aktualnyPoziom=3;
					break;
					case 4:
						fizyka.generujPlansze(6,8,0.1,8,0.1,0,0.1);
						statekGracza.aktualnyPoziom=4;
					break;
					case 5:
						fizyka.generujPlansze(5,10,0.1,10,0.1,4,0.1);
						statekGracza.aktualnyPoziom=5;
					break;
					case 6:
						fizyka.generujPlansze(5,20,0.1,20,0.1,4,0.1);
						statekGracza.aktualnyPoziom=6;
					break;
					case 7:
						fizyka.generujPlansze(5,20,0.1,20,0.1,20,0.1);
						statekGracza.aktualnyPoziom=7;
					break;
				};
				ekran.menu=false;
				ekran.gra=true;
			};
		};
		
	};
}, false);