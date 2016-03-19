        for(var i =1;i<7;i++){
            planety[i]= new Planeta(0,0,4+Math.random()*10,i*45,0,Math.random()*30,Math.random()/5,0.01);
        };
        for(var i =1;i<13;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'red',45);
            przeciwnicy[i+1] = new Przeciwnik (Math.random()*30,Math.random()*30,2,2,2,'red',45);
            przeciwnicy[i+2] = new Przeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'red',45);
            przeciwnicy[i+3] = new Przeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'red',45);
        };
        for(var i =13;i<22;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'green',45);
            przeciwnicy[i+1] = new Przeciwnik (Math.random()*30,Math.random()*30,2,2,2,'green',45);
            przeciwnicy[i+2] = new Przeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'green',45);
            przeciwnicy[i+3] = new Przeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'green',45);
        };



function draw() {
    if(ekran.numer==1){
        c.clearRect(0,0,window.innerWidth,window.innerHeight);
        for (i in planety) {
            if(planety[i].zycie>0){
                if(fizyka.dwaCiala(statekGracza,planety[i])){
                    console.log("statek planeta")
                };
                if(ekran.pauza && mysz.planeta && fizyka.klikniecie(myszKlik, planety[i])){
				    planety[i].rysujOrbite();
			    };
            } else {
                planety.splice(i,1);
                fizyka.sprawdzWarunkiKonca();
			};
        };
        for (i in pociski) {
            if(pociski[i].widocznosc){
                if(fizyka.dwaCiala(pociski[i],S)){
                    pociski[i].widocznosc=false; //wpadanie na slonce
                    console.log("pocisk slonce")
                };
                for(z in przeciwnicy){
                    if(fizyka.dwaCiala(pociski[i],przeciwnicy[z])){
                        przeciwnicy[z].zycie=przeciwnicy[z].zycie-10;
                        pociski[i].widocznosc=false;                //wpadanie na przeciwnika
                    };
                };
                for(x in planety){
                    if(fizyka.dwaCiala(pociski[i],planety[x])){
                        pociski[i].widocznosc=false;                //wpadanie na planety
                        console.log("pocisk planeta")
                    };
					if (pociski[i].kolor==='#0000FF'){
						planety[x].oddzialywanie(pociski[i]); //jezeli niebieskie to graw ma wplyw
					}
                };
                if(pociski[i].kolor==='#00FF00' || pociski[i].kolor==='#0000FF'){
                    S.oddzialywanie(pociski[i]);                //na ruch zielonych pociskow ma wplyw tylko slonce
                };
            } else {
                if(pociski[i].kolor==='#FF0000'){
                    statekGracza.maxLiczbaPociskow1=statekGracza.maxLiczbaPociskow1+1;
                } else if(pociski[i].kolor==='#00FF00'){
                    statekGracza.maxLiczbaPociskow2=statekGracza.maxLiczbaPociskow2+1;
                } else {
                    statekGracza.maxLiczbaPociskow3=statekGracza.maxLiczbaPociskow3+1;
                };
					pociski.splice(i,1);
            };
        };
        for (i in przeciwnicy){
            if(przeciwnicy[i].zycie>0){
                if(przeciwnicy[i].kolor==='#FF0000'){
                    fizyka.kierunekDoObiektu1(planety[planety.length-1],przeciwnicy[i]);
            } else {
                fizyka.kierunekDoObiektu1(statekGracza,przeciwnicy[i]);
            };
            if(fizyka.dwaCiala(przeciwnicy[i],planety[planety.length-1])){
                planety[planety.length-1].zycie=planety[planety.length-1].zycie-1;
                planety[planety.length-1].r = planety[planety.length-1].r*0.9998;
            };
            } else {
                przeciwnicy.splice(i,1);
                fizyka.sprawdzWarunkiKonca();
			}
        };
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
		fizyka.brzegOkna(statekGracza);
        fizyka.rysuj(S);
        fizyka.rysuj(statekGracza);
        fizyka.rysuj(planety);
        fizyka.rysuj(pociski);
        fizyka.rysuj(przeciwnicy);
    } else if (ekran.numer==0){
        for(var i =1;i<7;i++){
            planety[i]= new Planeta(0,0,4+Math.random()*10,i*45,0,Math.random()*30,Math.random()/5,0.01);
        };
        for(var i =1;i<13;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'red',45);
            przeciwnicy[i+1] = new Przeciwnik (Math.random()*30,Math.random()*30,2,2,2,'red',45);
            przeciwnicy[i+2] = new Przeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'red',45);
            przeciwnicy[i+3] = new Przeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'red',45);
        };
        atakujPlaneteNumer=planety.length-1;
        for(var i =13;i<22;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'green',45);
            przeciwnicy[i+1] = new Przeciwnik (Math.random()*30,Math.random()*30,2,2,2,'green',45);
            przeciwnicy[i+2] = new Przeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'green',45);
            przeciwnicy[i+3] = new Przeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'green',45);
        };
       atakujPlaneteNumer=planety.length-1;

        setTimeout(function(){ekran.numer=1}, 1000);
    };
};