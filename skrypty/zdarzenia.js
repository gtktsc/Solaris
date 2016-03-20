window.addEventListener('mousemove',function(event) {
        mysz.x=event.clientX;
        mysz.y=event.clientY;
},false);
window.addEventListener('click', function(){
	satelity[1] = new Satelita(mysz.x,mysz.y,1);
	satelity[2] = new Satelita(mysz.x,mysz.y,1);
	console.log(satelity[1].teta,fizyka.podajKat(S,satelity[1]))

    if(!ekran.pauza){
        if(mysz.statek){
            mysz.rusz=true;
        };
        if(fizyka.dwaCiala(mysz,statekGracza)){
            mysz.statek=true;
            console.log(mysz.statek);
        };
    };
    for (i in planety) {
        if(fizyka.klikniecie(mysz,planety[i])){
            myszKlik.x=mysz.x;
            myszKlik.y=mysz.y;
            console.log("planetaniecie planety",i);
            fizyka.szybkoscAnimacji('stop');
            if(!mysz.planeta){
                mysz.planeta=true;
            } else {
                fizyka.szybkoscAnimacji('start');
                mysz.planeta=false;
            };
        };
    };
}, false);
window.addEventListener('keydown', function(event) {
    if(!ekran.pauza){
        switch (event.keyCode) {
            case 49 : // 1
                if(statekGracza.maxLiczbaPociskow[0]>0){
                    if(pociski.length>1){
                        pociski[pociski.length] = new Pocisk(10,10,2,2,2,'red');
                    } else {
                        pociski[1] = new Pocisk(10,10,2,2,2,'red');
                    };
                    pociski[pociski.length-1].widocznosc=true;
                    statekGracza.wystrzel(pociski[pociski.length-1]);
                    statekGracza.maxLiczbaPociskow[0]=statekGracza.maxLiczbaPociskow[0]-1;
                };
            break;
            case 50 : // 2
			if(statekGracza.maxLiczbaPociskow[1]>0){
                    if(pociski.length>1){
                        pociski[pociski.length] = new Pocisk(10,10,2,2,2,'green');
                    } else {
                        pociski[1] = new Pocisk(10,10,2,2,2,'green');
                    };
                    pociski[pociski.length-1].widocznosc=true;
                    statekGracza.wystrzel(pociski[pociski.length-1]);
                    statekGracza.maxLiczbaPociskow[1]=statekGracza.maxLiczbaPociskow[1]-1;
                };
            break;
            case 51 : // 3
			    if(statekGracza.maxLiczbaPociskow[2]>0){
                    if(pociski.length>1){
                        pociski[pociski.length] = new Pocisk(10,10,2,2,2,'blue');
                    } else {
                        pociski[1] = new Pocisk(10,10,2,2,2,'blue');
                    };
                    pociski[pociski.length-1].widocznosc=true;
                    statekGracza.wystrzel(pociski[pociski.length-1]);
                    statekGracza.maxLiczbaPociskow[2]=statekGracza.maxLiczbaPociskow[2]-1;
                };
            break;
            case 52 : // 4
                mysz.statek=true;
            break;
            case 87: // W
                statekGracza.porusz("doPrzodu");
            break;
            case 68: // D
                statekGracza.porusz("obrocwPrawo");
            break;
            case 65: // A
                statekGracza.porusz("obrocwLewo");
            break;
            case 83: // S
                statekGracza.porusz("hamuj");
            break;
        };
    };
});