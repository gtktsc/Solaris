
for(var i =1;i<7;i++){
planety[i]= new _KlasaPlaneta(0,0,4+Math.random()*10,i*45,0,Math.random()*30,Math.random()/5,0.01);
}var atakujPlaneteNumer=planety.length-1;

for(var i =1;i<12;i=i+4){
	przeciwnicy[i] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'red',45	);
	przeciwnicy[i+1] = new _KlasaPrzeciwnik (Math.random()*30,Math.random()*30,2,2,2,'red',45	);
	przeciwnicy[i+2] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'red',45	);
	przeciwnicy[i+3] = new _KlasaPrzeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'red',45	);
};


function draw() {
	if(ekran.numer==1){
	c.clearRect(0,0,window.innerWidth,window.innerHeight);

S.rysuj();
for (i in planety) {
	planety[i].rysuj(S.x,S.y);
	if(fizyka.dwaCiala(statekGracza,planety[i])){
	console.log("statek planeta")
}
	if(planety[i].zycie<0){
		if(!atakujPlaneteNumer==0){atakujPlaneteNumer=atakujPlaneteNumer-1;
	planety.splice(i,1);};
	
	};
	
	
	

};

for (i in pociski) {
	if(pociski[i].widocznosc){
		if(fizyka.dwaCiala(pociski[i],S)){
			pociski[i].widocznosc=false; //wpadanie na slonce
			console.log("pocisk slonce")
			

	}
	
	for(z in przeciwnicy){
		if(fizyka.dwaCiala(pociski[i],przeciwnicy[z])){
			przeciwnicy[z].zycie=przeciwnicy[z].zycie-10;
			pociski[i].widocznosc=false; 	//wpadanie na przeciwnika
			console.log(przeciwnicy[z].zycie)
}
			
		}
	
	
		for(x in planety){
		if(fizyka.dwaCiala(pociski[i],planety[x])){
			pociski[i].widocznosc=false; 	//wpadanie na planety
			console.log("pocisk planeta")
}
		}
		
		
		
		pociski[i].rysuj(); //na ruch zielonych pociskow nie wplywaja sily
		
		if(pociski[i].kolor==='#00FF00'){
		S.oddzialywanie(pociski[i]); 	//na ruch zielonych pociskow ma wplyw tylko slonce
		} else if(pociski[i].kolor==='#0000FF'){
			S.oddzialywanie(pociski[i]);
			for (x in planety) {
			planety[x].oddzialywanie(pociski[i]); //na ruch niebieskich pociskow ma wplyw slonce i planety

};
			
		}

	}else {
		if(pociski[i].kolor==='#FF0000'){
		statekGracza.maxLiczbaPociskow1=statekGracza.maxLiczbaPociskow1+1;
	}else if(pociski[i].kolor==='#00FF00'){
		statekGracza.maxLiczbaPociskow2=statekGracza.maxLiczbaPociskow2+1;
	}else {
		statekGracza.maxLiczbaPociskow3=statekGracza.maxLiczbaPociskow3+1;
	};pociski.splice(i,1);};
};

for (i in przeciwnicy){
	if(przeciwnicy[i].kolor=='#FF0000'){
if(!atakujPlaneteNumer==0){fizyka.kierunekDoObiektu1(planety[atakujPlaneteNumer],przeciwnicy[i]);}else{setTimeout(function(){ekran.numer=0}, 1000);;};
}else{fizyka.kierunekDoObiektu1(statekGracza,przeciwnicy[i])}	
przeciwnicy[i].rysuj();		

if(fizyka.dwaCiala(przeciwnicy[i],planety[atakujPlaneteNumer])){	//
	planety[atakujPlaneteNumer].zycie=planety[atakujPlaneteNumer].zycie-0.01;

	    planety[atakujPlaneteNumer].r = planety[atakujPlaneteNumer].r*0.9998;
	
}
if(przeciwnicy[i].zycie<0){
	
przeciwnicy.splice(i,1);};
if(przeciwnicy.length==1){setTimeout(function(){ekran.numer=0}, 1000);;};
}

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
}

if(myszKlik.rusz===true&&fizyka.klikniecie(myszKlik,statekGracza)){
statekGracza.vx=0;
statekGracza.vy=0;
myszKlik.rusz=false;}
};

statekGracza.rysuj();	 
fizyka.brzegOkna(statekGracza);
//S.oddzialywanie(statekGracza);


  
	  

	
	
	
	
	
}else if(ekran.numer==0){
for (i in pociski) {
pociski[i].widocznosc=false;}
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
	
	
for(var i =1;i<7;i++){
planety[i]= new _KlasaPlaneta(0,0,4+Math.random()*10,i*45,0,Math.random()*30,Math.random()/5,0.01);
}

for(var i =1;i<13;i=i+4){
	przeciwnicy[i] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'red',45	);
	przeciwnicy[i+1] = new _KlasaPrzeciwnik (Math.random()*30,Math.random()*30,2,2,2,'red',45	);
	przeciwnicy[i+2] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'red',45	);
	przeciwnicy[i+3] = new _KlasaPrzeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'red',45	);
};atakujPlaneteNumer=planety.length-1;
for(var i =13;i<22;i=i+4){
	przeciwnicy[i] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,window.innerHeight-Math.random()*50,2,-2,-2,'green',45	);
	przeciwnicy[i+1] = new _KlasaPrzeciwnik (Math.random()*30,Math.random()*30,2,2,2,'green',45	);
	przeciwnicy[i+2] = new _KlasaPrzeciwnik (window.innerWidth-Math.random()*50,30,2,-2,-2,'green',45	);
	przeciwnicy[i+3] = new _KlasaPrzeciwnik (Math.random()*30,window.innerHeight-Math.random()*50,2,-2,-2,'green',45	);
};atakujPlaneteNumer=planety.length-1;




	setTimeout(function(){ekran.numer=1}, 1000);

}

}