function gra() {
	if(ekran.gra){
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
			if(fizyka.klikniecie(mysz,S) && (ekran.mysz=="tlo" ||ekran.mysz=="budowanie") && fizyka.nieDotykaMenu()){
				if(!ekran.pauza){
					ekran.mysz="budowanie";
					c.fillStyle = "black";
					c.font = "30px Arial";
					c.globalAlpha=0.4;
					c.fillText("Budowanie",S.x-70,S.y-35);
					c.globalAlpha=1;
				}else {
					ekran.mysz="budowanie";
					c.fillStyle = "black";
					c.font = "30px Arial";
					c.globalAlpha=0.4;
					c.fillText("Gra",S.x-25,S.y-35);
					c.globalAlpha=1;
				}

			} else {
			ekran.mysz="tlo";
		}
		} else if (ekran.numer==0){
			ekran.numer=1
		};
	};

};
var animacjaGra = setInterval(gra, szybkoscOdswiezania);
var przeladowanieStatekGracza = setInterval(function(){statekGracza.przeladowanie=false}, statekGracza.przeladowanieCzas);
var trybAutoStatekGracza = setInterval(function(){statekGracza.trybAuto=true}, statekGracza.trybAutoCzas);
