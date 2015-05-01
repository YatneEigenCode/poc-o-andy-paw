//4-30-2013 JChoy v0.129 actioncard
//5-2	*	v0.131 check whether client has actioncardclick
//5-5	*	v0.132 rounded corners using CSS
//5-7	*	v0.133 ActionCard.closeAllActionCards
//6-4	*	v1.418 improve veil size and onclick

function OOcallback(obj, meth, arg){
	var _privThis = this;
	this.meth = meth;
	this.obj = obj;
	this.arg = arg;
	this.fcn=function(a,b,c,d){_privThis.obj[_privThis.meth](a,b,c,d);}
	this.fcna=function(){_privThis.obj[_privThis.meth](_privThis.arg);}
}

function ActionCard(client,aOpts){
	this.actionOpts = aOpts;
	this.client= client;
	this.timeToDefault= 30000;
	this.buttonFontSize = "18";
	this.defaultAction= "Cancel";
	var _j= new PECBase();
	this.show= function(defAction){
		this.closeAllActionCards();
		_j.d.body.appendChild(this.veil());
		_j.d.body.appendChild(this.el());
		new StyleAnimation(this.el(),"opacity",
			[0,.1,.2,.4,.7,1]).start();
		if (!defAction) return;
		this.defAction= defAction;
		setTimeout(new OOcallback(this,"defaultAction").fcn,
			this.timeToDefault);
	}
	this.closeAllActionCards = function(){
		var at=_j.d.getElementsByTagName('div');
		for (var i=0; i<at.length; i++)
			if (at[i].igniteClass=="ActionCard")
				at[i].firstChild.master.defaultAction();
	}
	this.el = function(){
		if (!this.element){
			var el=this.element= _j.d.createElement("div");
			el.igniteClass="ActionCard";
			el.className="roundcorners20";
			el.style.position= "absolute";
			el.style.backgroundColor= "#2F2F5F";
			el.style.opacity= "0.1";
			el.style.width= "80%";
			el.style.margin= "30 10% 10 10%";
			el.style.top= _j.d.body.scrollTop;
			el.style.left= 0;
			var btn;
			for (var i=0,ao=this.actionOpts; i<ao.length; i++)
				el.appendChild(this.createButton(ao[i]));
		}
		return this.element;
	}
	this.veil = function(){
		if (!this.veilElement){
			var el=this.veilElement= _j.d.createElement("div");
			el.style.position= "absolute";
			el.style.backgroundColor= "#eeeeee";
			el.style.opacity= "0.8";
			el.style.width= "150%";
			el.style.height= "500%";
			el.style.top= _j.d.body.scrollTop;
			el.style.height=this.parseAdd(
				_j.d.body.scrollTop,1500);
			el.style.top= 0;;
			el.style.left= 0;
			el.onclick=new OOcallback(
				this,"defaultAction").fcn;
		}
		return this.veilElement;
	}
	this.parseAdd= function(a,b){
		//add 2 values that might contain units;
		return parseInt(a)+parseInt(b);
	}
	this.createButton= function(s){
		var el= _j.d.createElement("div");
		//el.style.width="65%";
		el.className="roundcorners20";
		el.style.backgroundColor= "white";
		el.style.opacity= "1.0";
		el.style.fontSize= this.buttonFontSize;
		el.innerHTML= s;
		el.style.textAlign= "center";
		el.style.margin= "20 30 20 30";
		el.style.padding= "10 10 10 10";
		el.onclick= new OOcallback(el,"btnclick").fcn;
		el.master= this;
		el.btnclick= this.btnclick;
		return el;
	}
	this.btnclick= function(){
		this.master.handleClick(this.innerHTML);
	}
	this.handleClick= function(s){
		_j.d.body.removeChild(this.el());
		_j.d.body.removeChild(this.veil());
		if (!this.client) return;
		if (!this.client["actionCardClick"]) return;
		this.client["actionCardClick"](s);
	}
	this.defaultAction= function(){
		this.handleClick(this.defAction);
	}
}

