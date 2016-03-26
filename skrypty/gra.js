function gra() {
	if(ekran.gra){
		if(ekran.numer==1){
			//console.log(ekran.energia)
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
			if(fizyka.klikniecie(mysz,S) && (ekran.mysz=="tlo" ||ekran.mysz=="budowanie"  )){
				ekran.mysz="budowanie";
				c.fillStyle = "black";
				c.font = "30px Arial";
				c.font = "30px Arial";
				c.fillText("Budowanie",S.x-70,S.y-35);
				console.log("aasdasd",i);
			} else {
			ekran.mysz="tlo";
		}
		} else if (ekran.numer==0){
			ekran.numer=1
		};
	};
	
};
var animacjaGra = setInterval(gra, 40);