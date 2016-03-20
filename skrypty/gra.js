        for(var i =1;i<7;i++){
            planety[i]= new Planeta(4,i*45,30,30,0.1,0.01);
            orbity[i]= new Orbita(planety[i].x,planety[i].y,planety[i].r,planety[i].R,planety[i].phi,planety[i].teta,planety[i].v);
        };
        for(var i =1;i<13;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'red',1);
			przeciwnicy[i+1] = new Przeciwnik (-100,-100,'red',1);
			przeciwnicy[i+2] = new Przeciwnik (window.innerWidth,-100,'red',1);
			przeciwnicy[i+3] = new Przeciwnik (-100,window.innerHeight,'red',1);
        };        
		for(var i =13;i<22;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'green',1);
			przeciwnicy[i+1] = new Przeciwnik (-100,-100,'green',1);
			przeciwnicy[i+2] = new Przeciwnik (window.innerWidth,-100,'green',1);
			przeciwnicy[i+3] = new Przeciwnik (-100,window.innerHeight,'green',1);
        };



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
        for(var i =1;i<7;i++){
            planety[i]= new Planeta(4,i*45,30,30,0.1,0.01);
            orbity[i]= new Orbita(planety[i].x,planety[i].y,planety[i].r,planety[i].R,planety[i].phi,planety[i].teta,planety[i].v);
        };
        for(var i =1;i<13;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'red',1);
			przeciwnicy[i+1] = new Przeciwnik (0,0,'red',1);
			przeciwnicy[i+2] = new Przeciwnik (window.innerWidth,0,'red',1);
			przeciwnicy[i+3] = new Przeciwnik (0,window.innerHeight,'red',1);
        };        
		for(var i =13;i<22;i=i+4){
            przeciwnicy[i] = new Przeciwnik (window.innerWidth,window.innerHeight,'green',1);
			przeciwnicy[i+1] = new Przeciwnik (0,0,'green',1);
			przeciwnicy[i+2] = new Przeciwnik (window.innerWidth,0,'green',1);
			przeciwnicy[i+3] = new Przeciwnik (0,window.innerHeight,'green',1);
        };
        setTimeout(function(){ekran.numer=1}, 1000);
    };
};