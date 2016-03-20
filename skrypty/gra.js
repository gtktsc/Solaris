function draw() {
    if(ekran.numer==1){
		if(!ekran.pauza){
            if(mysz.rusz){
                fizyka.kierunekDoObiektu1(mysz,statekGracza);
                myszKlik.x=mysz.x;
                myszKlik.y=mysz.y;
                statekGracza.vx=-Math.sin(statekGracza.phi)*5;
                statekGracza.vy=-Math.cos(statekGracza.phi)*5;
                myszKlik.rusz=true;
                mysz.rusz=false;
                mysz.statek=false;
            };
            if(myszKlik.rusz===true && fizyka.klikniecie(myszKlik,statekGracza)){
                statekGracza.vx=0;
                statekGracza.vy=0;
                myszKlik.rusz=false;
            };
		};
		fizyka.odswiezEkranGry();
    } else if (ekran.numer==0){
		switch(ekran.poziom){
			case 1:
			fizyka.generujPlansze(7,4,1,4,1);
			break;
			case 2:
			fizyka.generujPlansze(7,8,1,8,1);
			break;
			case 3:
			fizyka.generujPlansze(6,12,1,12,1);
			break;
			case 4:
			fizyka.generujPlansze(6,16,1,16,1);
			break;
			case 5:
			fizyka.generujPlansze(5,20,1,20,1);
			break;
		};
        ekran.numer=1
    };
};
var animacja = setInterval(draw, 33);