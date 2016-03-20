        for(var i =1;i<7;i++){
            planety[i]= new Planeta(0,0,4+Math.random()*10,i*45,0,Math.random()*30,Math.random()/5,0.01);
            orbity[i]= new Orbita(planety[i].x,planety[i].y,planety[i].r,planety[i].R,planety[i].phi,planety[i].teta,planety[i].v);
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
    fizyka.planety();
    fizyka.pociski();
    fizyka.przeciwnicy();

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
        setTimeout(function(){ekran.numer=1}, 1000);
    };
};