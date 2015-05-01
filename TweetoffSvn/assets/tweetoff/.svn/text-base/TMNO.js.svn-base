//2-2-09 JChoy v0.51 Tinkertool Mutant Ninja Object
//2-2 JChoy v0.52 smaller
//2-3 JChoy v0.53 TMNO Timer
//2-5 JChoy v0.56 Ajax
//2-10 JChoy v0.58 ajax head; isFileExist; getHeaderInfo; mkCallbackObj;
//2-28 JChoy v0.59 FileWatcher; getAttr; 
//todo: polymorph

//usage: new TMNO( "MyClass", myData1, myData2 );
function TMNO( o, a,b,c,d,e,f,g,h,i,j ){
	var res= (typeof(o)=="object")? o : new window[o](a,b,c,d,e,f,g,h,i,j);
	this.mold= function(d, s, ovr){	for (var m in s){ if ((!d[m]) || ovr) d[m]=s[m]; }return d;}
	this.setId= function(){
		for (var i=0,nm=""; true; i++) if (!window[nm="inst_"+i]) 
			return [this.progId=nm,window[nm]=this][0];
	}
	this.cgi= function(k,def,qy){var at=(qy+"").split(new RegExp("[\&\?]"+k+"=")); return (at.length==1)?def:at[1].split("&")[0]; }
	this.createEl= function(tag, mm){ return this.mold(document.createElement(tag), mm); }
	this.getAttr= function(nm, def, obj){return (obj && obj.attributes && obj.attributes[nm])? obj.attributes[nm].value : def;}

	this.write= function(s){
		if (this.writer) return this.writer.write(s);
		document.body.appendChild( this.createEl("div",{innerHTML:s}) );
	}
	this.writeClickHTML= function(s, o, mn, par){
		var div= ((par)?par:document.body).appendChild( this.createEl( "div" ) );
		var res= div.appendChild( this.createEl( "a", {innerHTML:s, href:"#", methName:mn, master:this} ) );
		res.onclick= function(){ this.master[this.methName](this); }
	}
	this.anfuge= function(nm){ return new Function("e", ((this.progId)?this.progId:this.setId())+"."+nm+"(e)"); }
	this.mkCallbackObj= function( mapping ){
		var res= {master:this}
		for (var m in mapping) 
		  res[m]= new Function("a,b,c,d,e,f,g,h,i,j","this.master."+mapping[m]+"(a,b,c,d,e,f,g,h,i,j)");
		return res;
	}
	this.csv2array= function(s, rowSep, colSep){
		var res= s.split(rowSep);
		for (var i=0; i<res.length; i++) res[i]=res[i].split(colSep);
		return res;
	}
	this.lookup= function( a, k, col, def ){
		for (var i=0,n=(col)?col:0; i<a.length; i++)
			if ((a[i].length>n) && (a[i][n]==k)) return a[i];
		return def;
	}
	this.mold( this, res, true );
}
function DivWriter(){
	this.write= function(s){ 
		if (!this.divObj) 
			document.body.appendChild( this.divObj= this.createEl("div") );
		this.divObj.innerHTML=s; 
	}
}
function DifWriter(writer){
	this.writer= writer;
	this.write= function(s){
		if (this.prev!=s) this.writer.write( this.prev=s );
	}
}
function Ajax() {
	this.newHttpRequest= function(){
		if (window.ActiveXObject)
			return new ActiveXObject( "Msxml2.XMLHTTP" )
		else 
			return new XMLHttpRequest();
	}
	this.onmorph= function(){ this.webGet(); }
	this.webPost= function(u,h){ this.webGet(u,h,"POST") }
	this.webGet= function( url, handler, post ){
		var scraper = this.scraper = this.newHttpRequest();
		var url= (url)? url:this.getAttr("src","",this);
		if ((!scraper) || (!url)) return;
		try {
		 var myMethod= (post)? post:"GET";
		 scraper.open( myMethod, url, true );
		 scraper.onreadystatechange= this.anfuge( (handler)?handler:"handleHttp" );
		 scraper.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
		 scraper.send(true);
		} catch (e) { this.handleError( e ); }
	}
	this.handleHttp= function(){
		if (this.scraper.readyState != 4) return;
		if ((this.scraper.status == 200) || (this.scraper.status == 0)) {
			var rh= this.scraper.getAllResponseHeaders(); 
			if (this.scraper.myMethod=="HEAD") return this.write( (rh==null)? "Found":rh);
			return this.write( this.scraper.responseText );
		}
		this.handleError( this.scraper.status + " - " + this.scraper.statusText );
	}
	this.handleError= function(e){ this.write(e) }
	this.isFileExist= function(url){
		this.handleError= function(e){ this.write("") }
		this.webGet( url, null, "HEAD");
	}
	this.getHeaderInfo= function(h, k, def){
		return this.lookup( this.csv2array(h,"\n",": "), k, 0, [0,def] )[1];
	}
	this.showToSave= function(s, title){
		var w=new Window();	//simply writes s to another window for saving.
		w.document.write(s);
		w.document.close();
	}
}

function TMNOTimer(){
	var res= new TMNO("Timer");
	res.mold( this, res );
}
function Timer(){
	this.clients= new Array();
	this.setTimeout= function( o, mn, ms ){this.setTimer(o,mn,ms)}
	this.setInterval= function( o, mn, ms ){this.setTimer(o,mn,ms,1)}
	this.setTimer= function(o, mn, ms, rep){
		if (!this.progId) this.setId();
		var k= this.clients.length;
		var cli= this.clients[k]= [o,mn,ms];
		var fcn= (rep)? "setInterval":"setTimeout";
		return cli[3]= window[fcn]( this.progId+".fire("+k+")", ms );
	}
	this.fire= function(i){
		if (i>=this.clients.length) return;
		var cli= this.clients[i];
		cli[0][ cli[1] ]();
	}
}

function FileWatcher(url, intervalMs, writer){
	this.url= url;
	this.writer= writer;
	this.intervalMs= intervalMs;
	this.main= function(){
		this.timer= new TMNO("Timer");
		var aj= this.ajax= new TMNO("Ajax");
		var ondif= this.mkCallbackObj( {write:"ondif"} );
		aj.writer= aj.mkCallbackObj( {write:"getLM"} );
		aj.getLM= this.getLM;
		aj.differ= new TMNO("DifWriter", ondif);
		this.timer.setInterval(this, "poll", this.intervalMs);
	}
	this.getLM= function(s){
		var x=this.getHeaderInfo(s, "Last-Modified", "unknown");
		this.differ.write( x );
	}
	this.poll= function(){	this.ajax.isFileExist(this.url); }
	this.ondif= function(s){
		this.writer.write(s);
	}
}