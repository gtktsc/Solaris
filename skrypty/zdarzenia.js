window.addEventListener('mousemove',function(event) {
        mysz.x=event.clientX;
        mysz.y=event.clientY;
},false);
window.addEventListener('click', function(){
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
            console.log("planetaniecie planety",i)
            fizyka.szybkoscAnimacji('stop');
            if(!mysz.planeta){
                mysz.planeta=true
            } else {
                fizyka.szybkoscAnimacji('start')
                mysz.planeta=false;
            };
        };
    };
}, false);
window.addEventListener('keydown', function(event) {
    if(!ekran.pauza){
        switch (event.keyCode) {
            case 49 : // 1
                if(statekGracza.maxLiczbaPociskow1>0){
                    pociski[statekGracza.numerPocisku] = new Pocisk(10,10,2,2,2,'red')
                    pociski[statekGracza.numerPocisku].widocznosc=true;
                    statekGracza.wystrzel(pociski[statekGracza.numerPocisku]);
                    statekGracza.numerPocisku=statekGracza.numerPocisku+1;
                    statekGracza.maxLiczbaPociskow1=statekGracza.maxLiczbaPociskow1-1;
                };
            break;
            case 50 : // 2
                if(statekGracza.maxLiczbaPociskow2>0){
                    pociski[statekGracza.numerPocisku] = new Pocisk(10,10,2,2,2,'green')
                    pociski[statekGracza.numerPocisku].widocznosc=true;
                    statekGracza.wystrzel(pociski[statekGracza.numerPocisku]);
                    statekGracza.numerPocisku=statekGracza.numerPocisku+1;
                    statekGracza.maxLiczbaPociskow2=statekGracza.maxLiczbaPociskow2-1;
                };
            break;
            case 51 : // 3
                if(statekGracza.maxLiczbaPociskow3>0){
                    pociski[statekGracza.numerPocisku] = new Pocisk(10,10,2,2,2,'blue')
                    pociski[statekGracza.numerPocisku].widocznosc=true;
                    statekGracza.wystrzel(pociski[statekGracza.numerPocisku]);
                    statekGracza.numerPocisku=statekGracza.numerPocisku+1;
                    statekGracza.maxLiczbaPociskow3=statekGracza.maxLiczbaPociskow3-1;
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