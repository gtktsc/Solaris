var fizyka = {
    pokazPunkt(x,y){
        c.beginPath();
        c.moveTo(x,0);
        c.lineTo(x,window.innerHeight);
        c.moveTo(0,y);
        c.lineTo(window.innerWidth,y);
        c.stroke();
    },
    rysuj: function(obiekt){
			if(Array.isArray(obiekt)){
            for(var i = 1;i<obiekt.length;i++){
				if(typeof(obiekt[i])==='object'){
                    obiekt[i].rysuj();
				}
            };
        }else{
            obiekt.rysuj();
        };
	},
    sprawdzWarunkiKonca: function(){
        if(przeciwnicy.length===1 || planety.length===1 || statekGracza.zycie<0){
			ekran.pauza=true;
			ekran.numer=0;
            //setTimeout(function(){ekran.numer=0;ekran.pauza=false;}, 1000);
        };
	},
    kierunekDoObiektu1: function(obiekt1,obiekt2) {
        if (obiekt1!==null && obiekt2!==null && typeof(obiekt1)==='object'&& typeof(obiekt2)==='object'){
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (obiekt2.x<obiekt1.x) {
                obiekt2.phi=-Math.acos((obiekt2.y-obiekt1.y)/odleglosc);
            } else {
                obiekt2.phi=Math.acos((obiekt2.y-obiekt1.y)/odleglosc);
            };
        };
    },
    brzegOkna : function(obiekt) {
        if (obiekt.x>window.innerWidth && obiekt.y>window.innerHeight) {
            obiekt.x=-10;
            obiekt.y=-10;
        } else if (obiekt.x<-10&&obiekt.y<-10) {
            obiekt.x=window.innerWidth-10;
            obiekt.y=window.innerHeight-10;
        } else if (obiekt.x>window.innerWidth) {
            obiekt.x=-10;
        } else if (obiekt.y>window.innerHeight) {
            obiekt.y=-10;
        } else if (obiekt.x<-10){
            obiekt.x=window.innerWidth-10;
        } else if (obiekt.y<-10){
            obiekt.y=window.innerHeight-10;};
    },
    dwaCiala: function(obiekt1,obiekt2){
        if (!ekran.pauza && obiekt1!==null && obiekt2!==null) {
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (odleglosc<(obiekt1.r+obiekt2.r+5)) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
    },
    klikniecie: function(obiekt1,obiekt2){
        if (obiekt1!==null && obiekt2!==null){
            var dx=obiekt1.x-obiekt2.x;
            var dy=obiekt1.y-obiekt2.y;
            var odleglosc=Math.sqrt(dx * dx + dy * dy);
            if (odleglosc<(obiekt1.r+obiekt2.r)) {
                return true;
            } else {
                return false;
            };
        } else {
            return false;
        };
        
    },
    szybkoscAnimacji : function(stan){
        switch(stan){
            case 'stop':
                if(!ekran.pauza){
                    for(i in pociski){
                        pociski[i].vxOld=pociski[i].vx;
                        pociski[i].vyOld=pociski[i].vy;
                        pociski[i].vx=0;
                        pociski[i].vy=0;
                    };
                    for(i in planety){
                        planety[i].vOld=planety[i].v;
                        planety[i].v=0;
                    };
                    for(i in przeciwnicy){
                        przeciwnicy[i].vxOld=przeciwnicy[i].vx;
                        przeciwnicy[i].vyOld=przeciwnicy[i].vy;
                        przeciwnicy[i].vx=0;
                        przeciwnicy[i].vy=0;
                    };
                    statekGracza.vxOld=statekGracza.vx;
                    statekGracza.vyOld=statekGracza.vy;
                    statekGracza.vx=0;
                    statekGracza.vy=0;
                };
                ekran.pauza=true;
            break;
            case 'start':
                ekran.pauza=false;
                for(i in pociski){
                    pociski[i].vx=pociski[i].vxOld;
                    pociski[i].vy=pociski[i].vyOld;
                };
                for(i in planety){
                    planety[i].v=planety[i].vOld;
                };
                for(i in przeciwnicy){
                    przeciwnicy[i].vx=przeciwnicy[i].vxOld;
                    przeciwnicy[i].vy=przeciwnicy[i].vyOld;
                };
                statekGracza.vx=statekGracza.vxOld;
                statekGracza.vy=statekGracza.vyOld;
            break;
        };
    }
};
var statekGracza = {
    x: window.innerWidth/2 - 50,
    y: -5,
    r: 2,
    zycie: 100,
    numerPocisku: 0,
    maxLiczbaPociskow1: 10,
    maxLiczbaPociskow2: 20,
    maxLiczbaPociskow3: 30,
    vx: 0,
    vy: 1,
    vxOld: 0,
    vyOld: 1,
    phi: 180*Math.PI/180,
    rysuj : function(){
        this.x=this.x+this.vx;
        this.y=this.y+this.vy;
        if(mysz.statek){
            c.save();
            c.translate((this.x+5),(this.y+10/3));
            c.rotate(-this.phi);
            c.translate(-(this.x+5),-(this.y+10/3));
            c.beginPath();
            c.fillStyle = '#000000';
            c.moveTo(this.x+5,this.y+0);
            c.lineTo(this.x+10,this.y+10);
            c.lineTo(this.x+0,this.y+10);
            c.lineTo(this.x+5,this.y+0);
            c.fill();
            c.stroke();
            c.restore();
        };
        c.save();
        c.translate((this.x+5),(this.y+10/3));
        c.rotate(-this.phi);
        c.translate(-(this.x+5),-(this.y+10/3));
        c.beginPath();
        c.moveTo(this.x+5,this.y+0);
        c.lineTo(this.x+10,this.y+10);
        c.lineTo(this.x+0,this.y+10);
        c.lineTo(this.x+5,this.y+0);
        c.stroke();
        c.restore();
    },
    porusz : function(jak) {
        switch (jak) {
            case "doPrzodu" :
                this.vx=this.vx-Math.sin(this.phi);
                this.vy=this.vy-Math.cos(this.phi);
            break;
            case 'hamuj' :
                this.vx=this.vx*0.90;
                this.vy=this.vy*0.90;
            break;
            case 'obrocwPrawo' :
                this.phi=this.phi-5*(Math.PI/180);
            break;
            case 'obrocwLewo' :
                this.phi=this.phi+5*(Math.PI/180);
            break;
        };
    },
    wystrzel : function(pocisk){
        pocisk.x=this.x+5;
        pocisk.y=this.y+2;
        pocisk.vx=this.vx-Math.sin(this.phi)*3;
        pocisk.vy=this.vy-Math.cos(this.phi)*3;
    }
};
var mysz ={
    x:0,
    y:0,
    r:10,
    planeta: false,
    statek: false,
    rusz: false,
};
var myszKlik ={
    x:0,
    y:0,
    r:10,
    planeta: false,
    statek: false,
    rusz: false,
};
var ekran ={
    numer:1,
    pauza: false,
};