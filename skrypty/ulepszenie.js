function ulepszenie() {
	if(ekran.ulepszenie){
		fizyka.odswiezEkranUlepszenia();
		if(fizyka.klikniecie(mysz,S)){
			ekran.mysz="budowanie";
			c.font = "30px Arial";
			c.globalAlpha=0.4;
			c.fillText("Menu",S.x-36,S.y-35);
			c.globalAlpha=1;
		}
	};
};
var animacjaUlepszenie = setInterval(ulepszenie, szybkoscOdswiezania);