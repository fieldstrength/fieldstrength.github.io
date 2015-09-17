Observables = new Array();
States = new Array();
Bases = new Array();
stateNumber = 0;
activeStates = new Array;
activeStates = [0];

function observable(s1, s2, s3, s4, s5) {

	this.states = new Array(33);
	this.spins = new Array(6);
	this.orientations = new Array(6);
	this.active = false;
	
	this.onumber = 0;
	
	this.spins[0] = 0;
	this.spins[1] = s1;
	this.spins[2] = s2;
	this.spins[3] = s3;
	this.spins[4] = s4;
	this.spins[5] = s5;
	
	this.orientations = ["x", "x", "x", "x", "x", "x"];
	
	this.rank = 1;
	
	setState = function(n, m) { 
       	states[n] = m;
	}
	getState = function(n) {
		return states[n];
	}
	
	this.cancelbits = function() {
		this.orientations = ["x", "x", "x", "x", "x", "x"];  // means blank data
		this.display();
	}
	
	this.display = function() {	
		if(this.onumber==7) {
			for(var k=1; k<7; k++) {
				if(this.orientations[k]==1) {  document.getElementById("O" + k + "bit").src = "img/up.gif"; }
				if(this.orientations[k]==-1) { document.getElementById("O" + k + "bit").src = "img/down.gif"; }
				if(this.orientations[k]==0) {  document.getElementById("O" + k + "bit").src = "img/blank-arrow.gif"; }
			}
		}
		else {
			var count=1;
			var X = 1;
			var control=false;
			for(var x=1; x<6; x++) {
				if(this.spins[x]==1) {  // spins[x] is the axis; x (1) or z (3) or identity (0)
					if(this.orientations[count]==0) {	// either up ("0"), down ("1"), or neither ("x")
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sx_up.gif";
						document.getElementById("p" + x + "1").src = "img/map/b" + x + "1.gif";  //"b" for blue (up), "p" is for pentagon
					}
					if(this.orientations[count]==1) {
						X = X*(-1);
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sx_down.gif";
						document.getElementById("p" + x + "1").src = "img/map/y" + x + "1.gif";	  //y for yellow (down)
					}
					if(this.orientations[count]=="x") {
						X=0;
						control = false;
						for(var z=1; z<6; z++) {
							if((Observables[z].spins[x]==1)&&(Observables[z].active)) { control = true; }
							//ensures no other active observables own one of the pentagon vertices about to be deactivated
						}
						if(!control) { document.getElementById("p" + x + "1").src = "img/map/p" + x + "1.gif";	}
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sx.gif";
					}
					count++;
				}
				if(this.spins[x]==3) {
					if(this.orientations[count]==0) {
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sz_up.gif";
						document.getElementById("p" + x + "3").src = "img/map/b" + x + "3.gif"; 
					}
					if(this.orientations[count]==1) {
						X = X*(-1);
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sz_down.gif";
						document.getElementById("p" + x + "3").src = "img/map/y" + x + "3.gif";	 
					}
					if(this.orientations[count]=="x") {
						X=0;
						control = false;
						for(var z=1; z<6; z++) {
							if((Observables[z].spins[x]==3)&&(Observables[z].active)) { control = true; } 
							//ensures no other active observables own one of the pentagon vertices about to be deactivated
						}
						if(!control) { document.getElementById("p" + x + "3").src = "img/map/p" + x + "3.gif";	}
						document.getElementById("O" + this.onumber + "S" + x).src = "img/sz.gif";
					}
					count++;
				}
			}
			if(!Observables[7].active) {
				if(X==1) {  document.getElementById("O" + this.onumber + "bit").src = "img/up.gif"; }
				if(X==-1) { document.getElementById("O" + this.onumber + "bit").src = "img/down.gif"; }
				if(X==0) {  document.getElementById("O" + this.onumber + "bit").src = "img/blank-arrow.gif"; }
			}
		}
	}
	
	this.statesAreActive = function() {
		var control = false;
		for(var v=1; v<=32/this.rank; v++) {
			if(States[this.states[v]].active) { control = true; }
		}
		return control;
	}
	
}



function statetest() {
	for(var y=1; y<105; y++) {
		document.write("<b>States[" + y + "].idstring:</b> &nbsp;" + States[y].idstring + "&nbsp;&nbsp;&nbsp;");
		document.write("<b>.img:</b> &nbsp;" + States[y].img + "&nbsp;&nbsp;&nbsp;");
		document.write("<b>.imgover:</b> &nbsp;" + States[y].imgover + "&nbsp;&nbsp;&nbsp;<br />");
	}

}

function stateOver(n) {
	if(!States[n].hidden) {
		document.getElementById(States[n].idstring).src = States[n].imgover;
		States[n].applyBits();
		States[n].showComponents();
		for(var x=1; x<States[n].bases.length; x++) {
			document.getElementById(Bases[ States[n].bases[x] ].idstring).src = "img/" + Bases[ States[n].bases[x] ].idstring + "over.gif";	
		}
	}
	//alert("Switched element with id: States[N].idstring = " + States[N].idstring + ",  N = " + N);
}

function stateOut(n) {
	clearComponents();
	if((!States[n].active)&&(!States[n].hidden)) { 
		document.getElementById(States[n].idstring).src = States[n].img; 
		cancelBits();
	}	
	for(var x=1; x<States[n].bases.length; x++) {
		if((!Bases[ States[n].bases[x] ].active)&&(!Bases[ States[n].bases[x] ].X)) { 
			document.getElementById(Bases[ States[n].bases[x] ].idstring).src = "img/" + Bases[ States[n].bases[x] ].idstring + ".gif"; 
		}
	}
	reDisplay(); //<-- Should be unnecessary, but seems to resolve some sporadic issues...
}

function basisOver(n) {
	for(var x=1; x<=104; x++) {
		document.getElementById(States[x].idstring).src = States[x].img;
	}
	for(var x=1; x<33; x++) {
		if(Bases[n].component[x]!=0) {
			document.getElementById(States[Bases[n].component[x]].idstring).src = States[ Bases[n].component[x] ].imgover;
		}
	}
}

function basisOut(n) {
	reDisplay();
}



function clearComponents() {
	var index = new String;
	for(var x=1; x<33; x++) {
		index = x.toString();
		if(x<10) { index = "0" + index; }
		document.getElementById("compA" + index).src = "img/blank-comp.gif";
		document.getElementById("compB" + index).src = "img/blank-comp.gif";
		document.getElementById("compC" + index).src = "img/blank-comp.gif";
		document.getElementById("compD" + index).src = "img/blank-comp.gif";
	}
}

function cancelBits() {
	if(Observables[7].active==false) { Observables[7].cancelbits(); }
	if(Observables[1].active==false) { Observables[1].cancelbits(); }
	if(Observables[2].active==false) { Observables[2].cancelbits(); }
	if(Observables[3].active==false) { Observables[3].cancelbits(); }
	if(Observables[4].active==false) { Observables[4].cancelbits(); }
	if(Observables[5].active==false) { Observables[5].cancelbits(); }
	if(Observables[6].active==false) { Observables[6].cancelbits(); }
}

function resetStates() {
	Observables[1].active = false;
	Observables[2].active = false;
	Observables[3].active = false;
	Observables[4].active = false;
	Observables[5].active = false;
	Observables[6].active = false;
	Observables[7].active = false;
	cancelBits();
	activeStates = [0];
	for(var v=1; v<105; v++) {
		States[v].active = false;
		States[v].hidden = false;
	}
	for(var v=1; v<40; v++) {
		Bases[v].active = false;
		Bases[v].X = false;
	}
	reDisplay();
}

function reDisplay() {
	Observables[1].display();
	Observables[2].display();
	Observables[3].display();
	Observables[4].display();
	Observables[5].display();
	Observables[6].display();
	Observables[7].display();
	for(var x=1; x<105; x++) {
		if(States[x].active) { document.getElementById(States[x].idstring).src = States[x].imgover; }
		else if(States[x].hidden) { document.getElementById(States[x].idstring).src = "img/blank-box.gif"; }
		else { 
			document.getElementById(States[x].idstring).src = States[x].img;
		}
	}
	for(var x=1; x<40; x++) {
		if(Bases[x].active) { document.getElementById(Bases[x].idstring).src = "img/" + Bases[x].idstring + "over.gif"; }
		else if(Bases[x].X) { document.getElementById(Bases[x].idstring).src = "img/BX.gif"; }
		else { document.getElementById(Bases[x].idstring).src = "img/" + Bases[x].idstring + ".gif"; }
	}
}

function setOrtho(n) {   //  AKA "activate state n" / "deactivate state n" 
	if(States[n].hidden) { 
		resetStates(); 
		return true;
	}
	if(States[n].active==false) {
		States[n].active = true;
		States[n].applyBits();
		Observables[States[n].obs].active = true;
		for(var v=1; v<105; v++) {
			if(States[n].isOrtho(v)) { 
				States[v].hidden = true;
				States[v].active = false;
			}
		}
		for(var x=1; x<States[n].bases.length; x++) {		//Checks which bases are activated by state selection (which bases contain given state)
			document.getElementById(Bases[ States[n].bases[x] ].idstring).src = "img/" + Bases[ States[n].bases[x] ].idstring + "over.gif";	
			Bases[ States[n].bases[x] ].active = true;
		}
		for(var x=1; x<40; x++) {  //Checks which Bases get X'd out due to violation of completeness relation
			if(!Bases[x].active) {
				var controller=false;
				for(var y=1; y<33; y++) {
					if(Bases[x].component[y]!=0) {
						if(!States[	Bases[x].component[y] ].hidden) {
							controller = true;
							y=33;
						}
					}
				}
				if(!controller) {
					Bases[x].X = true;
				}
			}
		}
		reDisplay();
	}
	else {
		States[n].active = false;
		var control = false;
		for(var y=1; y<105; y++) {   //what states hidden by previous activations should be unhidden when state n is deactivated?
			if(States[y].hidden) {
				control = false;
				for(var z=1; z<105; z++) {
					if (States[z].active) {
						if(States[y].isOrtho(z)) { control = true; }
					}
				}
				if(control==false) { States[y].hidden = false; }
			}
		}
		if (Observables[States[n].obs].statesAreActive()==false) { Observables[States[n].obs].active = false; }
		
		for(var x=1; x<States[n].bases.length; x++) {
			if(Bases[ States[n].bases[x] ].active) { Bases[ States[n].bases[x] ].active = false; }
		}
		for(var x=1; x<40; x++) {
			if(Bases[x].X) {
				for(var y=1; y<33; y++) {
					if(Bases[x].component[y]!=0) {
						if(!States[	Bases[x].component[y] ].hidden) { 
							Bases[x].X = false; 
							y = 33;
						}
					}
				}
			}
		}
		reDisplay();
	}
}


function state(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, x19, x20, x21, x22, x23, x24, x25, x26, x27, x28, x29, x30, x31, x32) {
	this.component = new Array();
	this.bases = new Array();
	this.ortho = new Array();
	this.bits = new Array();
	this.ebits = new Array();
	stateNumber++;
	this.number = stateNumber;
	this.hover = false;
	this.active = false;
	this.hidden = false;
	
	this.idstring = "P";
	if(this.number<10) { this.idstring += "0"; }
	if(this.number<100) { this.idstring += "0"; }
	this.idstring += this.number.toString();
	
	this.img = "img/" + this.idstring + ".gif";
	this.imgover = "img/" + this.idstring + "over.gif";	

	if(this.number<33) { this.obs = 1; } 
	else { this.obs = 7; }
	
	
	this.component[1] = x1;
	this.component[2] = x2;
	this.component[3] = x3;
	this.component[4] = x4;
	this.component[5] = x5;
	this.component[6] = x6;
	this.component[7] = x7;
	this.component[8] = x8;
	this.component[9] = x9;
	this.component[10] = x10;
	this.component[11] = x11;
	this.component[12] = x12;
	this.component[13] = x13;
	this.component[14] = x14;
	this.component[15] = x15;
	this.component[16] = x16;
	this.component[17] = x17;
	this.component[18] = x18;
	this.component[19] = x19;
	this.component[20] = x20;
	this.component[21] = x21;
	this.component[22] = x22;
	this.component[23] = x23;
	this.component[24] = x24;
	this.component[25] = x25;
	this.component[26] = x26;
	this.component[27] = x27;
	this.component[28] = x28;
	this.component[29] = x29;
	this.component[30] = x30;
	this.component[31] = x31;
	this.component[32] = x32;

	this.bases.push(0);	
	
	this.applyBits = function() {
		var x = 1;
		if(this.obs!=7) {
			Observables[this.obs].orientations[1] = this.bits[1];
			Observables[this.obs].orientations[2] = this.bits[2];
			Observables[this.obs].orientations[3] = this.bits[3];
			Observables[this.obs].orientations[4] = this.bits[4];
			Observables[this.obs].orientations[5] = this.bits[5];
		}
		else {
			Observables[this.obs].orientations[1] = this.ebits[1];
			Observables[this.obs].orientations[2] = this.ebits[2];
			Observables[this.obs].orientations[3] = this.ebits[3];
			Observables[this.obs].orientations[4] = this.ebits[4];
			Observables[this.obs].orientations[5] = this.ebits[5];
			Observables[this.obs].orientations[6] = this.ebits[6];
		}
		Observables[this.obs].display();            
		
		/*
		alert("Applying orientation: " + 
			Observables[this.obs].orientations[1] + ", " +
			Observables[this.obs].orientations[2] + ", " +
			Observables[this.obs].orientations[3] + ", " +
			Observables[this.obs].orientations[4] + ", " +
			Observables[this.obs].orientations[5] + "to observable " + this.obs + "...");
		*/
	}
	
	this.isOrtho = function(x) {
		var control = false;
		for(var v=1; v<this.ortho.length; v++) {
			if(this.ortho[v]==x) { control=true; }
		}
		return control;
	}
	
	this.showComponents = function() {
		var index = new String;
		for(var x=1; x<33; x++) {
			index = x.toString();
			if(x<10) { index = "0" + index; }
			if(this.component[x]==1) { document.getElementById("compA" + index).src = "img/1.gif"; }
			if(this.component[x]==-1) { document.getElementById("compA" + index).src = "img/-1.gif"; }
			if(this.component[x]==0) { document.getElementById("compA" + index).src = "img/0.gif"; }
		}
	}
	
	this.bitprod = function() {
		var x=1;
		for(var h=1; h<6; h++) {
			if(	this.bits[h]==1) { x = -x; }
		}
		return x;
	}
	
	

}

function state4(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25, a26, a27, a28, a29, a30, a31, a32, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28, c29, c30, c31, c32, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20, d21, d22, d23, d24, d25, d26, d27, d28, d29, d30, d31, d32) {

	this.componentA = new Array();
	this.componentB = new Array();
	this.componentC = new Array();
	this.componentD = new Array();
	this.bases = new Array();
	this.ortho = new Array();
	this.bits = new Array();
	this.ebits = new Array();
	stateNumber++;
	this.number = stateNumber;
	this.hover = false;
	this.active = false;
	this.hidden = false;
	
	
	this.idstring = "P";
	if(this.number<10) { this.idstring += "0"; }
	if(this.number<100) { this.idstring += "0"; }
	this.idstring += this.number.toString();
	
	this.img = "img/" + this.idstring + ".gif";
	this.imgover = "img/" + this.idstring + "over.gif";
	
	if((this.number>=33)&&(this.number<=40)) { this.obs = 2; } 
	if((this.number>=41)&&(this.number<=48)) { this.obs = 3; } 
	if((this.number>=49)&&(this.number<=56)) { this.obs = 4; } 
	if((this.number>=57)&&(this.number<=64)) { this.obs = 5; } 
	if((this.number>=65)&&(this.number<=72)) { this.obs = 6; } 

	
	
	this.componentA[1] = a1;	this.componentB[1] = b1;	this.componentC[1] = c1;	this.componentD[1] = d1;
	this.componentA[2] = a2;	this.componentB[2] = b2;	this.componentC[2] = c2;	this.componentD[2] = d2;
	this.componentA[3] = a3;	this.componentB[3] = b3;	this.componentC[3] = c3;	this.componentD[3] = d3;
	this.componentA[4] = a4;	this.componentB[4] = b4;	this.componentC[4] = c4;	this.componentD[4] = d4;
	this.componentA[5] = a5;	this.componentB[5] = b5;	this.componentC[5] = c5;	this.componentD[5] = d5;
	this.componentA[6] = a6;	this.componentB[6] = b6;	this.componentC[6] = c6;	this.componentD[6] = d6;
	this.componentA[7] = a7;	this.componentB[7] = b7;	this.componentC[7] = c7;	this.componentD[7] = d7;
	this.componentA[8] = a8;	this.componentB[8] = b8;	this.componentC[8] = c8;	this.componentD[8] = d8;
	this.componentA[9] = a9;	this.componentB[9] = b9;	this.componentC[9] = c9;	this.componentD[9] = d9;
	this.componentA[10] = a10;	this.componentB[10] = b10;	this.componentC[10] = c10;	this.componentD[10] = d10;
	this.componentA[11] = a11;	this.componentB[11] = b11;	this.componentC[11] = c11;	this.componentD[11] = d11;
	this.componentA[12] = a12;	this.componentB[12] = b12;	this.componentC[12] = c12;	this.componentD[12] = d12;
	this.componentA[13] = a13;	this.componentB[13] = b13;	this.componentC[13] = c13;	this.componentD[13] = d13;
	this.componentA[14] = a14;	this.componentB[14] = b14;	this.componentC[14] = c14;	this.componentD[14] = d14;
	this.componentA[15] = a15;	this.componentB[15] = b15;	this.componentC[15] = c15;	this.componentD[15] = d15;
	this.componentA[16] = a16;	this.componentB[16] = b16;	this.componentC[16] = c16;	this.componentD[16] = d16;
	this.componentA[17] = a17;	this.componentB[17] = b17;	this.componentC[17] = c17;	this.componentD[17] = d17;
	this.componentA[18] = a18;	this.componentB[18] = b18;	this.componentC[18] = c18;	this.componentD[18] = d18;
	this.componentA[19] = a19;	this.componentB[19] = b19;	this.componentC[19] = c19;	this.componentD[19] = d19;
	this.componentA[20] = a20;	this.componentB[20] = b20;	this.componentC[20] = c20;	this.componentD[20] = d20;
	this.componentA[21] = a21;	this.componentB[21] = b21;	this.componentC[21] = c21;	this.componentD[21] = d21;
	this.componentA[22] = a22;	this.componentB[22] = b22;	this.componentC[22] = c22;	this.componentD[22] = d22;
	this.componentA[23] = a23;	this.componentB[23] = b23;	this.componentC[23] = c23;	this.componentD[23] = d23;
	this.componentA[24] = a24;	this.componentB[24] = b24;	this.componentC[24] = c24;	this.componentD[24] = d24;
	this.componentA[25] = a25;	this.componentB[25] = b25;	this.componentC[25] = c25;	this.componentD[25] = d25;
	this.componentA[26] = a26;	this.componentB[26] = b26;	this.componentC[26] = c26;	this.componentD[26] = d26;
	this.componentA[27] = a27;	this.componentB[27] = b27;	this.componentC[27] = c27;	this.componentD[27] = d27;
	this.componentA[28] = a28;	this.componentB[28] = b28;	this.componentC[28] = c28;	this.componentD[28] = d28;
	this.componentA[29] = a29;	this.componentB[29] = b29;	this.componentC[29] = c29;	this.componentD[29] = d29;
	this.componentA[30] = a30;	this.componentB[30] = b30;	this.componentC[30] = c30;	this.componentD[30] = d30;
	this.componentA[31] = a31;	this.componentB[31] = b31;	this.componentC[31] = c31;	this.componentD[31] = d31;
	this.componentA[32] = a32;	this.componentB[32] = b32;	this.componentC[32] = c32;	this.componentD[32] = d32;
	
	this.bases.push(0);
	
	this.applyBits = function() {
		Observables[this.obs].orientations[1] = this.bits[1];
		Observables[this.obs].orientations[2] = this.bits[2];
		Observables[this.obs].orientations[3] = this.bits[3];
		
		Observables[this.obs].display();
	}
	
	this.isOrtho = function(x) {
		var control = false;
		for(var v=1; v<this.ortho.length; v++) {
			if(this.ortho[v]==x) { control=true; }
		}
		return control;
	}
	
	this.showComponents = function() {
		var index = new String;
		for(var x=1; x<33; x++) {
			index = x.toString();
			if(x<10) { index = "0" + index; }
			if(this.componentA[x]==1)  { document.getElementById("compA" + index).src = "img/1.gif"; }
			if(this.componentA[x]==-1) { document.getElementById("compA" + index).src = "img/-1.gif"; }
			if(this.componentA[x]==0)  { document.getElementById("compA" + index).src = "img/0.gif"; }
			
			if(this.componentB[x]==1)  { document.getElementById("compB" + index).src = "img/1.gif"; }
			if(this.componentB[x]==-1) { document.getElementById("compB" + index).src = "img/-1.gif"; }
			if(this.componentB[x]==0)  { document.getElementById("compB" + index).src = "img/0.gif"; }
			
			if(this.componentC[x]==1)  { document.getElementById("compC" + index).src = "img/1.gif"; }
			if(this.componentC[x]==-1) { document.getElementById("compC" + index).src = "img/-1.gif"; }
			if(this.componentC[x]==0)  { document.getElementById("compC" + index).src = "img/0.gif"; }
			
			if(this.componentD[x]==1)  { document.getElementById("compD" + index).src = "img/1.gif"; }
			if(this.componentD[x]==-1) { document.getElementById("compD" + index).src = "img/-1.gif"; }
			if(this.componentD[x]==0)  { document.getElementById("compD" + index).src = "img/0.gif"; }
		}
	}
	
	this.bitprod = function() {
		var x=1;
		for(var h=1; h<6; h++) {
			if(	this.bits[h]==1) { x = -x; }
		}
		return x;
	}
	
}

function basis(x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, x19, x20, x21, x22, x23, x24, x25, x26, x27, x28, x29, x30, x31, x32, b) {
	this.active = false;
	this.X = false;
	this.component = new Array();
	this.idstring = "B";
	if(b<10) { this.idstring += "0"; }
	this.idstring += b.toString();
	this.img = "img/" + this.idstring + ".gif";
	this.imgover = "img/" + this.idstring + "over.gif";	
	
	
	this.component[1] = x1;
	this.component[2] = x2;
	this.component[3] = x3;
	this.component[4] = x4;
	this.component[5] = x5;
	this.component[6] = x6;
	this.component[7] = x7;
	this.component[8] = x8;
	this.component[9] = x9;
	this.component[10] = x10;
	this.component[11] = x11;
	this.component[12] = x12;
	this.component[13] = x13;
	this.component[14] = x14;
	this.component[15] = x15;
	this.component[16] = x16;
	this.component[17] = x17;
	this.component[18] = x18;
	this.component[19] = x19;
	this.component[20] = x20;
	this.component[21] = x21;
	this.component[22] = x22;
	this.component[23] = x23;
	this.component[24] = x24;
	this.component[25] = x25;
	this.component[26] = x26;
	this.component[27] = x27;
	this.component[28] = x28;
	this.component[29] = x29;
	this.component[30] = x30;
	this.component[31] = x31;
	this.component[32] = x32;

	
	if(x1 != 0) { States[x1].bases.push(b); }
	if(x2 != 0) { States[x2].bases.push(b); }
	if(x3 != 0) { States[x3].bases.push(b); }
	if(x4 != 0) { States[x4].bases.push(b); }
	if(x5 != 0) { States[x5].bases.push(b); }
	if(x6 != 0) { States[x6].bases.push(b); }
	if(x7 != 0) { States[x7].bases.push(b); }
	if(x8 != 0) { States[x8].bases.push(b); }
	if(x9 != 0) { States[x9].bases.push(b); }
	if(x10 != 0) { States[x10].bases.push(b); }
	if(x11 != 0) { States[x11].bases.push(b); }
	if(x12 != 0) { States[x12].bases.push(b); }
	if(x13 != 0) { States[x13].bases.push(b); }
	if(x14 != 0) { States[x14].bases.push(b); }
	if(x15 != 0) { States[x15].bases.push(b); }
	if(x16 != 0) { States[x16].bases.push(b); }
	if(x17 != 0) { States[x17].bases.push(b); }
	if(x18 != 0) { States[x18].bases.push(b); }
	if(x19 != 0) { States[x19].bases.push(b); }
	if(x20 != 0) { States[x20].bases.push(b); }
	if(x21 != 0) { States[x21].bases.push(b); }
	if(x22 != 0) { States[x22].bases.push(b); }
	if(x23 != 0) { States[x23].bases.push(b); }
	if(x24 != 0) { States[x24].bases.push(b); }
	if(x25 != 0) { States[x25].bases.push(b); }
	if(x26 != 0) { States[x26].bases.push(b); }
	if(x27 != 0) { States[x27].bases.push(b); }
	if(x28 != 0) { States[x28].bases.push(b); }
	if(x29 != 0) { States[x29].bases.push(b); }
	if(x30 != 0) { States[x30].bases.push(b); }
	if(x31 != 0) { States[x31].bases.push(b); }
	if(x32 != 0) { States[x32].bases.push(b); }


	
}

function wpTex(texStr) {
	texStr = encodeURIComponent(texStr);
	texStr = "<img src=\"http://s.wordpress.com/latex.php?latex=" + texStr + "&bg=FFFFFF&fg=000000&s=1\" />";
	document.write(texStr);
}

function wpTexBlue(texStr) {
	texStr = encodeURIComponent(texStr);
	texStr = "<img src=\"http://s.wordpress.com/latex.php?latex=" + texStr + "&bg=FFFFFF&fg=0070a2&s=1\" />";
	document.write(texStr);
}

Observables[1] = new observable(3, 3, 3, 3, 3);
Observables[2] = new observable(3, 1, 0, 0, 1);
Observables[3] = new observable(1, 3, 1, 0, 0);
Observables[4] = new observable(0, 1, 3, 1, 0);
Observables[5] = new observable(0, 0, 1, 3, 1);
Observables[6] = new observable(1, 0, 0, 1, 3);
Observables[7] = new observable("e", "e", "e", "e", "e");

Observables[1].rank = 1;
Observables[2].rank = 4;
Observables[3].rank = 4;
Observables[4].rank = 4;
Observables[5].rank = 4;
Observables[6].rank = 4;
Observables[7].rank = 1;

Observables[1].basis = 1;
Observables[2].basis = 25;
Observables[3].basis = 30;
Observables[4].basis = 35;
Observables[5].basis = 38;
Observables[6].basis = 39;
Observables[7].basis = 4;

States[1] = new state(1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[2] = new state(0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[3] = new state(0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[4] = new state(0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[5] = new state(0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[6] = new state(0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[7] = new state(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[8] = new state(0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[9] = new state(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[10] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[11] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[12] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[13] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[14] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[15] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[16] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[17] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[18] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[19] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[20] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[21] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[22] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[23] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[24] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
States[25] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0);
States[26] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0);
States[27] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0);
States[28] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0);
States[29] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0);
States[30] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0);
States[31] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
States[32] = new state(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1);
States[33] = new state4(1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[34] = new state4(0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[35] = new state4(0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[36] = new state4(0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[37] = new state4(1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[38] = new state4(0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[39] = new state4(0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[40] = new state4(0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, -1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[41] = new state4(1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
States[42] = new state4(0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[43] = new state4(0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[44] = new state4(0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[45] = new state4(1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0);
States[46] = new state4(0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0);
States[47] = new state4(0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0);
States[48] = new state4(0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0);
States[49] = new state4(1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0);
States[50] = new state4(0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[51] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[52] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0);
States[53] = new state4(1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0);
States[54] = new state4(0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[55] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[56] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0);
States[57] = new state4(1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0);
States[58] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[59] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[60] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[61] = new state4(1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0);
States[62] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[63] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[64] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, -1, 0, 0, 1, -1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0);
States[65] = new state4(1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0);
States[66] = new state4(0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[67] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0);
States[68] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0);
States[69] = new state4(0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1);
States[70] = new state4(0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[71] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
States[72] = new state4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, -1, 0, 0, 0, 0, 0);
States[73] = new state(-1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, -1, 1, 0, 1, 0, 0, 1, -1, 0, 0, 1, 0, 1, 1, 0);
States[74] = new state(0, -1, 1, 0, 1, 0, 0, 1, -1, 0, 0, 1, 0, 1, 1, 0, -1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 1, 0, -1, 0, 0, 1);
States[75] = new state(0, 1, -1, 0, -1, 0, 0, -1, 1, 0, 0, -1, 0, -1, -1, 0, -1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 1, 0, -1, 0, 0, 1);
States[76] = new state(-1, 0, 0, -1, 0, 1, -1, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, 1, -1, 0, -1, 0, 0, -1, 1, 0, 0, -1, 0, -1, -1, 0);
States[77] = new state(0, 1, 1, 0, -1, 0, 0, 1, -1, 0, 0, -1, 0, 1, -1, 0, -1, 0, 0, 1, 0, 1, 1, 0, 0, -1, 1, 0, 1, 0, 0, 1);
States[78] = new state(0, -1, -1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 0, 1, -1, 0, 1, 0, 0, -1, 0, -1, -1, 0, 0, -1, 1, 0, 1, 0, 0, 1);
States[79] = new state(-1, 0, 0, -1, 0, 1, -1, 0, 0, -1, -1, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 1, 1, 0, 0, -1, 0, -1, -1, 0);
States[80] = new state(0, 1, -1, 0, -1, 0, 0, -1, -1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, -1, 1, 0, 0, 1, 1, 0, -1, 0, 0, 1);
States[81] = new state(0, -1, 1, 0, -1, 0, 0, -1, 1, 0, 0, -1, 0, 1, 1, 0, -1, 0, 0, -1, 0, -1, 1, 0, 0, -1, -1, 0, -1, 0, 0, 1);
States[82] = new state(-1, 0, 0, -1, 0, -1, 1, 0, 0, 1, 1, 0, 1, 0, 0, -1, 0, -1, 1, 0, -1, 0, 0, -1, -1, 0, 0, 1, 0, -1, -1, 0);
States[83] = new state(0, -1, -1, 0, -1, 0, 0, 1, 1, 0, 0, 1, 0, 1, -1, 0, 1, 0, 0, -1, 0, 1, 1, 0, 0, 1, -1, 0, 1, 0, 0, 1);
States[84] = new state(0, 1, -1, 0, 1, 0, 0, 1, -1, 0, 0, 1, 0, -1, -1, 0, -1, 0, 0, -1, 0, -1, 1, 0, 0, -1, -1, 0, -1, 0, 0, 1);
States[85] = new state(-1, 0, 0, 1, 0, 1, 1, 0, 0, 1, -1, 0, -1, 0, 0, -1, 0, -1, -1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 0, 1, -1, 0);
States[86] = new state(0, -1, -1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, -1, 1, 0, -1, 0, 0, 1, 0, 1, 1, 0, 0, -1, 1, 0, 1, 0, 0, 1);
States[87] = new state(0, -1, 1, 0, -1, 0, 0, -1, -1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, 1, 0, 1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 1);
States[88] = new state(-1, 0, 0, 1, 0, -1, -1, 0, 0, -1, 1, 0, -1, 0, 0, -1, 0, 1, 1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 0, -1, 1, 0);
States[89] = new state(0, 1, 1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, 1, -1, 0, 1, 0, 0, -1, 0, 1, 1, 0, 0, -1, 1, 0, -1, 0, 0, -1);
States[90] = new state(1, 0, 0, -1, 0, 1, 1, 0, 0, -1, 1, 0, -1, 0, 0, -1, 0, 1, 1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, 1, -1, 0);
States[91] = new state(-1, 0, 0, 1, 0, -1, -1, 0, 0, 1, -1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, 1, -1, 0);
States[92] = new state(0, 1, 1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, 1, -1, 0, -1, 0, 0, 1, 0, -1, -1, 0, 0, 1, -1, 0, 1, 0, 0, 1);
States[93] = new state(1, 0, 0, 1, 0, 1, -1, 0, 0, 1, 1, 0, 1, 0, 0, -1, 0, -1, 1, 0, -1, 0, 0, -1, 1, 0, 0, -1, 0, 1, 1, 0);
States[94] = new state(-1, 0, 0, -1, 0, -1, 1, 0, 0, 1, 1, 0, 1, 0, 0, -1, 0, 1, -1, 0, 1, 0, 0, 1, 1, 0, 0, -1, 0, 1, 1, 0);
States[95] = new state(0, 1, 1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, -1, 0, 1, 1, 0, 0, 1, -1, 0, 1, 0, 0, 1);
States[96] = new state(1, 0, 0, -1, 0, 1, 1, 0, 0, 1, -1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, -1, -1, 0, 0, -1, 0, -1, 1, 0);
States[97] = new state(-1, 0, 0, 1, 0, 1, 1, 0, 0, -1, 1, 0, 1, 0, 0, 1, 0, -1, -1, 0, 1, 0, 0, -1, 1, 0, 0, 1, 0, -1, 1, 0);
States[98] = new state(0, 1, 1, 0, -1, 0, 0, 1, 1, 0, 0, 1, 0, -1, 1, 0, 1, 0, 0, -1, 0, -1, -1, 0, 0, -1, 1, 0, 1, 0, 0, 1);
States[99] = new state(1, 0, 0, 1, 0, -1, 1, 0, 0, 1, 1, 0, -1, 0, 0, 1, 0, -1, 1, 0, 1, 0, 0, 1, 1, 0, 0, -1, 0, -1, -1, 0);
States[100] = new state(-1, 0, 0, 1, 0, 1, 1, 0, 0, -1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, -1, 0, 0, 1, -1, 0, 0, -1, 0, 1, -1, 0);
States[101] = new state(0, 1, -1, 0, 1, 0, 0, 1, 1, 0, 0, -1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, -1, 0, 0, -1, -1, 0, -1, 0, 0, 1);
States[102] = new state(1, 0, 0, 1, 0, 1, -1, 0, 0, 1, 1, 0, 1, 0, 0, -1, 0, 1, -1, 0, 1, 0, 0, 1, -1, 0, 0, 1, 0, -1, -1, 0);
States[103] = new state(-1, 0, 0, 1, 0, 1, 1, 0, 0, 1, -1, 0, -1, 0, 0, -1, 0, 1, 1, 0, -1, 0, 0, 1, 1, 0, 0, 1, 0, -1, 1, 0);
States[104] = new state(0, -1, 1, 0, 1, 0, 0, 1, 1, 0, 0, -1, 0, -1, -1, 0, 1, 0, 0, 1, 0, -1, 1, 0, 0, 1, 1, 0, -1, 0, 0, 1);

//Define orthogonality tables for each state:
States[1].ortho = [0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 51, 52, 55, 56, 59, 60, 63, 64, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[2].ortho = [0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 51, 52, 55, 56, 59, 60, 63, 64, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[3].ortho = [0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 51, 52, 55, 56, 57, 58, 61, 62, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[4].ortho = [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 51, 52, 55, 56, 57, 58, 61, 62, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[5].ortho = [0, 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 49, 50, 53, 54, 59, 60, 63, 64, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[6].ortho = [0, 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 49, 50, 53, 54, 59, 60, 63, 64, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[7].ortho = [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 49, 50, 53, 54, 57, 58, 61, 62, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[8].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 43, 44, 47, 48, 49, 50, 53, 54, 57, 58, 61, 62, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[9].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 51, 52, 55, 56, 59, 60, 63, 64, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[10].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 51, 52, 55, 56, 59, 60, 63, 64, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[11].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 51, 52, 55, 56, 57, 58, 61, 62, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[12].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 51, 52, 55, 56, 57, 58, 61, 62, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[13].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 49, 50, 53, 54, 59, 60, 63, 64, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[14].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 49, 50, 53, 54, 59, 60, 63, 64, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[15].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 49, 50, 53, 54, 57, 58, 61, 62, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[16].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 37, 38, 39, 40, 41, 42, 45, 46, 49, 50, 53, 54, 57, 58, 61, 62, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[17].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 51, 52, 55, 56, 59, 60, 63, 64, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[18].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 51, 52, 55, 56, 59, 60, 63, 64, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[19].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 51, 52, 55, 56, 57, 58, 61, 62, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[20].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 51, 52, 55, 56, 57, 58, 61, 62, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[21].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 49, 50, 53, 54, 59, 60, 63, 64, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[22].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 49, 50, 53, 54, 59, 60, 63, 64, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[23].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 49, 50, 53, 54, 57, 58, 61, 62, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[24].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 43, 44, 47, 48, 49, 50, 53, 54, 57, 58, 61, 62, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[25].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 51, 52, 55, 56, 59, 60, 63, 64, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[26].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 51, 52, 55, 56, 59, 60, 63, 64, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[27].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 51, 52, 55, 56, 57, 58, 61, 62, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[28].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 51, 52, 55, 56, 57, 58, 61, 62, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[29].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 49, 50, 53, 54, 59, 60, 63, 64, 66, 68, 70, 72, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[30].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 32, 33, 34, 35, 36, 41, 42, 45, 46, 49, 50, 53, 54, 59, 60, 63, 64, 65, 67, 69, 71, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[31].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 41, 42, 45, 46, 49, 50, 53, 54, 57, 58, 61, 62, 66, 68, 70, 72, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104]; 
States[32].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 35, 36, 41, 42, 45, 46, 49, 50, 53, 54, 57, 58, 61, 62, 65, 67, 69, 71, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103]; 
States[33].ortho = [0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 53, 54, 55, 56, 58, 60, 62, 64, 73, 76, 77, 80, 81, 82, 83, 84, 85, 86, 90, 91, 94, 95, 103, 104]; 
States[34].ortho = [0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 53, 54, 55, 56, 57, 59, 61, 63, 74, 75, 78, 79, 87, 88, 89, 92, 93, 96, 97, 98, 99, 100, 101, 102]; 
States[35].ortho = [0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40, 49, 50, 51, 52, 58, 60, 62, 64, 74, 75, 78, 79, 87, 88, 89, 92, 93, 96, 97, 98, 99, 100, 101, 102]; 
States[36].ortho = [0, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 37, 38, 39, 40, 49, 50, 51, 52, 57, 59, 61, 63, 73, 76, 77, 80, 81, 82, 83, 84, 85, 86, 90, 91, 94, 95, 103, 104]; 
States[37].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 33, 34, 35, 36, 38, 39, 40, 53, 54, 55, 56, 58, 60, 62, 64, 74, 75, 78, 79, 87, 88, 89, 92, 93, 96, 97, 98, 99, 100, 101, 102]; 
States[38].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 33, 34, 35, 36, 37, 39, 40, 53, 54, 55, 56, 57, 59, 61, 63, 73, 76, 77, 80, 81, 82, 83, 84, 85, 86, 90, 91, 94, 95, 103, 104]; 
States[39].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 33, 34, 35, 36, 37, 38, 40, 49, 50, 51, 52, 58, 60, 62, 64, 73, 76, 77, 80, 81, 82, 83, 84, 85, 86, 90, 91, 94, 95, 103, 104]; 
States[40].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 33, 34, 35, 36, 37, 38, 39, 49, 50, 51, 52, 57, 59, 61, 63, 74, 75, 78, 79, 87, 88, 89, 92, 93, 96, 97, 98, 99, 100, 101, 102]; 
States[41].ortho = [0, 9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 42, 43, 44, 45, 46, 47, 48, 61, 62, 63, 64, 69, 70, 71, 72, 73, 74, 79, 80, 83, 84, 85, 86, 87, 88, 91, 92, 93, 94, 97, 98]; 
States[42].ortho = [0, 9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 41, 43, 44, 45, 46, 47, 48, 57, 58, 59, 60, 69, 70, 71, 72, 75, 76, 77, 78, 81, 82, 89, 90, 95, 96, 99, 100, 101, 102, 103, 104]; 
States[43].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24, 41, 42, 44, 45, 46, 47, 48, 61, 62, 63, 64, 69, 70, 71, 72, 75, 76, 77, 78, 81, 82, 89, 90, 95, 96, 99, 100, 101, 102, 103, 104]; 
States[44].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24, 41, 42, 43, 45, 46, 47, 48, 57, 58, 59, 60, 69, 70, 71, 72, 73, 74, 79, 80, 83, 84, 85, 86, 87, 88, 91, 92, 93, 94, 97, 98]; 
States[45].ortho = [0, 9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 41, 42, 43, 44, 46, 47, 48, 61, 62, 63, 64, 65, 66, 67, 68, 75, 76, 77, 78, 81, 82, 89, 90, 95, 96, 99, 100, 101, 102, 103, 104]; 
States[46].ortho = [0, 9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 41, 42, 43, 44, 45, 47, 48, 57, 58, 59, 60, 65, 66, 67, 68, 73, 74, 79, 80, 83, 84, 85, 86, 87, 88, 91, 92, 93, 94, 97, 98]; 
States[47].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24, 41, 42, 43, 44, 45, 46, 48, 61, 62, 63, 64, 65, 66, 67, 68, 73, 74, 79, 80, 83, 84, 85, 86, 87, 88, 91, 92, 93, 94, 97, 98]; 
States[48].ortho = [0, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24, 41, 42, 43, 44, 45, 46, 47, 57, 58, 59, 60, 65, 66, 67, 68, 75, 76, 77, 78, 81, 82, 89, 90, 95, 96, 99, 100, 101, 102, 103, 104]; 
States[49].ortho = [0, 5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 35, 36, 39, 40, 50, 51, 52, 53, 54, 55, 56, 67, 68, 71, 72, 73, 74, 75, 76, 77, 82, 83, 86, 87, 88, 94, 95, 96, 97, 100, 101]; 
States[50].ortho = [0, 5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 35, 36, 39, 40, 49, 51, 52, 53, 54, 55, 56, 65, 66, 69, 70, 78, 79, 80, 81, 84, 85, 89, 90, 91, 92, 93, 98, 99, 102, 103, 104]; 
States[51].ortho = [0, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 35, 36, 39, 40, 49, 50, 52, 53, 54, 55, 56, 67, 68, 71, 72, 78, 79, 80, 81, 84, 85, 89, 90, 91, 92, 93, 98, 99, 102, 103, 104]; 
States[52].ortho = [0, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 35, 36, 39, 40, 49, 50, 51, 53, 54, 55, 56, 65, 66, 69, 70, 73, 74, 75, 76, 77, 82, 83, 86, 87, 88, 94, 95, 96, 97, 100, 101]; 
States[53].ortho = [0, 5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 33, 34, 37, 38, 49, 50, 51, 52, 54, 55, 56, 67, 68, 71, 72, 78, 79, 80, 81, 84, 85, 89, 90, 91, 92, 93, 98, 99, 102, 103, 104]; 
States[54].ortho = [0, 5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 33, 34, 37, 38, 49, 50, 51, 52, 53, 55, 56, 65, 66, 69, 70, 73, 74, 75, 76, 77, 82, 83, 86, 87, 88, 94, 95, 96, 97, 100, 101]; 
States[55].ortho = [0, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 33, 34, 37, 38, 49, 50, 51, 52, 53, 54, 56, 67, 68, 71, 72, 73, 74, 75, 76, 77, 82, 83, 86, 87, 88, 94, 95, 96, 97, 100, 101]; 
States[56].ortho = [0, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 33, 34, 37, 38, 49, 50, 51, 52, 53, 54, 55, 65, 66, 69, 70, 78, 79, 80, 81, 84, 85, 89, 90, 91, 92, 93, 98, 99, 102, 103, 104]; 
States[57].ortho = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 34, 36, 38, 40, 42, 44, 46, 48, 58, 59, 60, 61, 62, 63, 64, 73, 74, 75, 76, 77, 78, 79, 80, 85, 86, 97, 98, 99, 100, 103, 104]; 
States[58].ortho = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 33, 35, 37, 39, 42, 44, 46, 48, 57, 59, 60, 61, 62, 63, 64, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 101, 102]; 
States[59].ortho = [0, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 34, 36, 38, 40, 42, 44, 46, 48, 57, 58, 60, 61, 62, 63, 64, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 101, 102]; 
States[60].ortho = [0, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 35, 37, 39, 42, 44, 46, 48, 57, 58, 59, 61, 62, 63, 64, 73, 74, 75, 76, 77, 78, 79, 80, 85, 86, 97, 98, 99, 100, 103, 104]; 
States[61].ortho = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 34, 36, 38, 40, 41, 43, 45, 47, 57, 58, 59, 60, 62, 63, 64, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 101, 102]; 
States[62].ortho = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 33, 35, 37, 39, 41, 43, 45, 47, 57, 58, 59, 60, 61, 63, 64, 73, 74, 75, 76, 77, 78, 79, 80, 85, 86, 97, 98, 99, 100, 103, 104]; 
States[63].ortho = [0, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 34, 36, 38, 40, 41, 43, 45, 47, 57, 58, 59, 60, 61, 62, 64, 73, 74, 75, 76, 77, 78, 79, 80, 85, 86, 97, 98, 99, 100, 103, 104]; 
States[64].ortho = [0, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 35, 37, 39, 41, 43, 45, 47, 57, 58, 59, 60, 61, 62, 63, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 101, 102]; 
States[65].ortho = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 45, 46, 47, 48, 50, 52, 54, 56, 66, 67, 68, 69, 70, 71, 72, 73, 74, 77, 78, 79, 80, 81, 82, 83, 88, 91, 92, 100, 101, 102, 103]; 
States[66].ortho = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 45, 46, 47, 48, 50, 52, 54, 56, 65, 67, 68, 69, 70, 71, 72, 75, 76, 84, 85, 86, 87, 89, 90, 93, 94, 95, 96, 97, 98, 99, 104]; 
States[67].ortho = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 45, 46, 47, 48, 49, 51, 53, 55, 65, 66, 68, 69, 70, 71, 72, 75, 76, 84, 85, 86, 87, 89, 90, 93, 94, 95, 96, 97, 98, 99, 104]; 
States[68].ortho = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 45, 46, 47, 48, 49, 51, 53, 55, 65, 66, 67, 69, 70, 71, 72, 73, 74, 77, 78, 79, 80, 81, 82, 83, 88, 91, 92, 100, 101, 102, 103]; 
States[69].ortho = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 41, 42, 43, 44, 50, 52, 54, 56, 65, 66, 67, 68, 70, 71, 72, 75, 76, 84, 85, 86, 87, 89, 90, 93, 94, 95, 96, 97, 98, 99, 104]; 
States[70].ortho = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 41, 42, 43, 44, 50, 52, 54, 56, 65, 66, 67, 68, 69, 71, 72, 73, 74, 77, 78, 79, 80, 81, 82, 83, 88, 91, 92, 100, 101, 102, 103]; 
States[71].ortho = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 41, 42, 43, 44, 49, 51, 53, 55, 65, 66, 67, 68, 69, 70, 72, 73, 74, 77, 78, 79, 80, 81, 82, 83, 88, 91, 92, 100, 101, 102, 103]; 
States[72].ortho = [0, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 41, 42, 43, 44, 49, 51, 53, 55, 65, 66, 67, 68, 69, 70, 71, 75, 76, 84, 85, 86, 87, 89, 90, 93, 94, 95, 96, 97, 98, 99, 104]; 
States[73].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 41, 44, 46, 47, 49, 52, 54, 55, 57, 60, 62, 63, 65, 68, 70, 71, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[74].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 41, 44, 46, 47, 49, 52, 54, 55, 57, 60, 62, 63, 65, 68, 70, 71, 73, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[75].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 42, 43, 45, 48, 49, 52, 54, 55, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[76].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 42, 43, 45, 48, 49, 52, 54, 55, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[77].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 42, 43, 45, 48, 49, 52, 54, 55, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[78].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 42, 43, 45, 48, 50, 51, 53, 56, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[79].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 41, 44, 46, 47, 50, 51, 53, 56, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[80].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 41, 44, 46, 47, 50, 51, 53, 56, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[81].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 42, 43, 45, 48, 50, 51, 53, 56, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[82].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 42, 43, 45, 48, 49, 52, 54, 55, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[83].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 41, 44, 46, 47, 49, 52, 54, 55, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[84].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 41, 44, 46, 47, 50, 51, 53, 56, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[85].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 41, 44, 46, 47, 50, 51, 53, 56, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[86].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 41, 44, 46, 47, 49, 52, 54, 55, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[87].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 41, 44, 46, 47, 49, 52, 54, 55, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[88].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 41, 44, 46, 47, 49, 52, 54, 55, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[89].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 42, 43, 45, 48, 50, 51, 53, 56, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[90].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 42, 43, 45, 48, 50, 51, 53, 56, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[91].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 41, 44, 46, 47, 50, 51, 53, 56, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[92].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 41, 44, 46, 47, 50, 51, 53, 56, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[93].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 41, 44, 46, 47, 50, 51, 53, 56, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[94].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 41, 44, 46, 47, 49, 52, 54, 55, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[95].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 42, 43, 45, 48, 49, 52, 54, 55, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 96, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[96].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 42, 43, 45, 48, 49, 52, 54, 55, 58, 59, 61, 64, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 97, 98, 99, 100, 101, 102, 103, 104]; 
States[97].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 41, 44, 46, 47, 49, 52, 54, 55, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 98, 99, 100, 101, 102, 103, 104]; 
States[98].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 41, 44, 46, 47, 50, 51, 53, 56, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 99, 100, 101, 102, 103, 104]; 
States[99].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 42, 43, 45, 48, 50, 51, 53, 56, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 100, 101, 102, 103, 104]; 
States[100].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 42, 43, 45, 48, 49, 52, 54, 55, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 101, 102, 103, 104]; 
States[101].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 34, 35, 37, 40, 42, 43, 45, 48, 49, 52, 54, 55, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 102, 103, 104]; 
States[102].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 34, 35, 37, 40, 42, 43, 45, 48, 50, 51, 53, 56, 58, 59, 61, 64, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 103, 104]; 
States[103].ortho = [0, 2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 33, 36, 38, 39, 42, 43, 45, 48, 50, 51, 53, 56, 57, 60, 62, 63, 65, 68, 70, 71, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 104]; 
States[104].ortho = [0, 1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 33, 36, 38, 39, 42, 43, 45, 48, 50, 51, 53, 56, 57, 60, 62, 63, 66, 67, 69, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]; 

Bases[1] = new basis(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 1); 
Bases[2] = new basis(1, 4, 6, 7, 10, 11, 13, 16, 18, 19, 21, 24, 25, 28, 30, 31, 74, 75, 77, 78, 80, 81, 83, 84, 86, 87, 89, 92, 95, 98, 101, 104, 2); 
Bases[3] = new basis(2, 3, 5, 8, 9, 12, 14, 15, 17, 20, 22, 23, 26, 27, 29, 32, 73, 76, 79, 82, 85, 88, 90, 91, 93, 94, 96, 97, 99, 100, 102, 103, 3); 
Bases[4] = new basis(73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 4); 
Bases[5] = new basis(33, 34, 35, 36, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5); 
Bases[6] = new basis(37, 38, 39, 40, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6); 
Bases[7] = new basis(41, 42, 45, 46, 9, 10, 11, 12, 13, 14, 15, 16, 25, 26, 27, 28, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7); 
Bases[8] = new basis(43, 44, 47, 48, 1, 2, 3, 4, 5, 6, 7, 8, 17, 18, 19, 20, 21, 22, 23, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8); 
Bases[9] = new basis(49, 50, 53, 54, 5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24, 29, 30, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9); 
Bases[10] = new basis(51, 52, 55, 56, 1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10); 
Bases[11] = new basis(57, 58, 61, 62, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20, 23, 24, 27, 28, 31, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 11); 
Bases[12] = new basis(59, 60, 63, 64, 1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12); 
Bases[13] = new basis(65, 67, 69, 71, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13); 
Bases[14] = new basis(66, 68, 70, 72, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14); 
Bases[15] = new basis(33, 36, 38, 39, 73, 76, 77, 80, 81, 82, 83, 84, 85, 86, 90, 91, 94, 95, 103, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15); 
Bases[16] = new basis(34, 35, 37, 40, 74, 75, 78, 79, 87, 88, 89, 92, 93, 96, 97, 98, 99, 100, 101, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16); 
Bases[17] = new basis(41, 44, 46, 47, 73, 74, 79, 80, 83, 84, 85, 86, 87, 88, 91, 92, 93, 94, 97, 98, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 17); 
Bases[18] = new basis(42, 43, 45, 48, 75, 76, 77, 78, 81, 82, 89, 90, 95, 96, 99, 100, 101, 102, 103, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 18); 
Bases[19] = new basis(49, 52, 54, 55, 73, 74, 75, 76, 77, 82, 83, 86, 87, 88, 94, 95, 96, 97, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19); 
Bases[20] = new basis(50, 51, 53, 56, 78, 79, 80, 81, 84, 85, 89, 90, 91, 92, 93, 98, 99, 102, 103, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20); 
Bases[21] = new basis(57, 60, 62, 63, 73, 74, 75, 76, 77, 78, 79, 80, 85, 86, 97, 98, 99, 100, 103, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 21); 
Bases[22] = new basis(58, 59, 61, 64, 81, 82, 83, 84, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 101, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 22); 
Bases[23] = new basis(65, 68, 70, 71, 73, 74, 77, 78, 79, 80, 81, 82, 83, 88, 91, 92, 100, 101, 102, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 23); 
Bases[24] = new basis(66, 67, 69, 72, 75, 76, 84, 85, 86, 87, 89, 90, 93, 94, 95, 96, 97, 98, 99, 104, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24); 
Bases[25] = new basis(33, 34, 35, 36, 37, 38, 39, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25); 
Bases[26] = new basis(33, 34, 37, 38, 53, 54, 55, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 26); 
Bases[27] = new basis(33, 35, 37, 39, 58, 60, 62, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 27); 
Bases[28] = new basis(34, 36, 38, 40, 57, 59, 61, 63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28); 
Bases[29] = new basis(35, 36, 39, 40, 49, 50, 51, 52, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 29); 
Bases[30] = new basis(41, 42, 43, 44, 45, 46, 47, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 30); 
Bases[31] = new basis(41, 42, 43, 44, 69, 70, 71, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 31); 
Bases[32] = new basis(41, 43, 45, 47, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 32); 
Bases[33] = new basis(42, 44, 46, 48, 57, 58, 59, 60, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33); 
Bases[34] = new basis(45, 46, 47, 48, 65, 66, 67, 68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34); 
Bases[35] = new basis(49, 50, 51, 52, 53, 54, 55, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35); 
Bases[36] = new basis(49, 51, 53, 55, 67, 68, 71, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 36); 
Bases[37] = new basis(50, 52, 54, 56, 65, 66, 69, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 37); 
Bases[38] = new basis(57, 58, 59, 60, 61, 62, 63, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 38); 
Bases[39] = new basis(65, 66, 67, 68, 69, 70, 71, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 39); 




Observables[1] = new observable(3, 3, 3, 3, 3);
Observables[2] = new observable(3, 1, 0, 0, 1);
Observables[3] = new observable(1, 3, 1, 0, 0);
Observables[4] = new observable(0, 1, 3, 1, 0);
Observables[5] = new observable(0, 0, 1, 3, 1);
Observables[6] = new observable(1, 0, 0, 1, 3);
Observables[7] = new observable("e", "e", "e", "e", "e");

Observables[1].rank = 1;
Observables[2].rank = 4;
Observables[3].rank = 4;
Observables[4].rank = 4;
Observables[5].rank = 4;
Observables[6].rank = 4;
Observables[7].rank = 1;

Observables[1].onumber = 1;
Observables[2].onumber = 2;
Observables[3].onumber = 3;
Observables[4].onumber = 4;
Observables[5].onumber = 5;
Observables[6].onumber = 6;
Observables[7].onumber = 7;

var count=1;

for(var a=0; a<2; a++) {
	for(var b=0; b<2; b++) {
		for(var c=0; c<2; c++) {
			for(var d=0; d<2; d++) {
				for(var e=0; e<2; e++) {
					
					States[count].bits[1]=a;
					States[count].bits[2]=b;
					States[count].bits[3]=c;
					States[count].bits[4]=d;
					States[count].bits[5]=e;
					
					States[count+72].bits[1]=a;
					States[count+72].bits[2]=b;
					States[count+72].bits[3]=c;
					States[count+72].bits[4]=d;
					States[count+72].bits[5]=e;
					
					if(count<=8) {
						States[count+32].bits[1] = c;
						States[count+32].bits[2] = d; 
						States[count+32].bits[3] = e;
						
						States[count+40].bits[1] = c;
						States[count+40].bits[2] = d; 
						States[count+40].bits[3] = e;
						
						States[count+48].bits[1] = c;
						States[count+48].bits[2] = d; 
						States[count+48].bits[3] = e;
						
						States[count+56].bits[1] = c;
						States[count+56].bits[2] = d; 
						States[count+56].bits[3] = e;
						
						States[count+64].bits[1] = c;
						States[count+64].bits[2] = d; 
						States[count+64].bits[3] = e;
					}
					
					count++;
				}
			}
		}
	}
}

var jj=1;

// Assigning EV signatures to each entagled state:
for(var b=73; b<105; b++) {   //for each entangled state
	for(var n=1; n<7; n++) {	//for each standard observable
		if(n==1) { jj = 0; }
		else{
			jj = 32 + (n-2)*8;
		}
		for(var m=1; m<9; m++) {  //go through first 8, only first non-ortho state needed to determine bit
			if(!States[b].isOrtho(jj+m)){
				States[b].ebits[n] = States[jj+m].bitprod();
			}
		}
	}
}

for(var a=1; a<33; a++) {
	Observables[1].states[a] = a;
	Observables[7].states[a] = 72+a;
}

for(var a=1; a<9; a++) {
	Observables[2].states[a] = 32+a;
	Observables[3].states[a] = 40+a;
	Observables[4].states[a] = 48+a;
	Observables[5].states[a] = 56+a;
	Observables[6].states[a] = 64+a;
}	