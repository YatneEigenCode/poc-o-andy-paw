//moshishare.js
//5-24	jchoy	v1.331 MoshiShare, Ajaxo
//5-24	*	v1.332 MoshiShareClient
//5-25	*	v1.333 MoshiShareHost send-success
//5-26	*	v1.334 workaround android (2.3) bug
//5-26	*	v1.335 Gaets
//5-28	*	v1.337 returnError
//5-28	*	v1.338 bug fix on returnError
//6-2	*	v1.414 fix correct unescaping in MoshiShareClient


//TODO: no more this.ajax;
//----------------
function Ajaxo(){
	this.constructor= Ajax;
	this.constructor();
	this.webGet= function( url, handler, post ){
		var scraper = this.scraper = this.newHttpRequest();
		var url= (url)? url:this.getAttr("src","",this);
		if ((!scraper) || (!url)) return;
		try {
		 var myMethod= (post)? post:"GET";
		 var res = true;
		 scraper.open( myMethod, url, true );
		 scraper.onreadystatechange= 
			new OOcallback(this,"handleHttp").fcn;
		 scraper.setRequestHeader( "If-Modified-Since", "Sat, 1 Jan 2000 00:00:00 GMT" );
		 if (post=="POST") res = this.prepScraper(scraper,url,post);
		 scraper.send(res);
		} catch (e) { this.handleError( e ); }
	}
	this.prepScraper= function(scraper, url, myMethod){
		var pos= url.indexOf("?");
		scraper.open( myMethod, url.substr(0,pos), true );
		scraper.onreadystatechange= 
			new OOcallback(this,"handleHttp").fcn;
		scraper.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//android bug hiccups on content-length
		//scraper.setRequestHeader("Content-length", url.length-pos-1);
		scraper.setRequestHeader("Connection", "close");
		return url.substr(pos+1);
	}
	this.cgi= function(k,def,qy){var at=(qy+"").split(new RegExp("[\&\?]"+k+"=")); return (at.length==1)?def:at[1].split("&")[0]; }
}
function MoshiShare(){
	this.constructor= PECBase;
	this.constructor();
	this.version= "v1.338";

	this.url= {t:"http://appcastofl.appspot.com"
		,g:"{0}/getraw?title={1}"
		,s:"{0}/sign?title={1}&content={2}"}
	this.channel= "MoshiShare";
	this.getAjax= function(callback){
		for (var m in {s:1,g:1}){
		  this.url[m]= this.url[m].replace("{0}",this.url.t);
		  this.url[m]= this.url[m].replace("{1}",this.channel);
		}
		this.ajax= new Ajaxo();
		this.ajax.write= new OOcallback(this,callback).fcn;
		return this.ajax;
	}
	this.startClient= function(){
		this.getAjax("webGot");
		this.ajax.webGet(this.url.g);
		//setTimeout(new OOcallback(this,"stopClient").fcn, 30000);
	}
	this.webGet= this.startClient;
}
function MoshiShareClient(masterCallback,key){
	this.constructor= MoshiShare;
	this.constructor();
	this.masterCallback= masterCallback;
	this.life= 31000;
	this.key = key;

	this.initScript= function(){
		this.result= null;
		this.setKey();
		setTimeout( new OOcallback(this,"stop").fcn, this.life );
	}
	this.setKey= function(){
		if (this.key) return;
		var key=this.key="aa00aa";
		for (var i=0,z=key.length; i<z; i++){
			if (key.charAt(i)=="a") 
			  key+= String.fromCharCode(65+Math.random()*26);
			else
			  key+= Math.floor(Math.random()*10);
		}
		this.key= key.substr(6);
	}
	this.start= function(){
		this.initScript();
		this.webWrite("start "+this.key,"webPosted");
		//write start
		//poll for result
		//write end
	}
	this.webWrite= function(s, callback){
		this.getAjax(callback);
		var url= this.url.s.replace("{2}",escape(s));
		this.ajax.webPost(url);
	}
	this.webPosted= function(s){
		new ActionCard(this,
			["share code: "+this.key,"Hide","Cancel"]
			).show("Cancel");
		this.webGot("start");
	}
	this.webGot= function(s){
		var us= unescape(s);
		if (this.result) return this.stop();
		if (us.split(" ")[0]=="start"){
			setTimeout( new OOcallback(this,"webGet").fcn
				, 1000);
		} else {
			this.result={status:0,payload:s};
			this.masterCallback(this);
			this.webWrite("end","nop");
		}
	}
	this.stop= function(){
		if (this.result) return;
		this.returnError( 200, "timeout" );
		this.webWrite("end","nop");
	}
	this.returnError= function(code,s){
		this.result={status:code,message:s};
		this.masterCallback(this);
	}
}

function MoshiShareHost(masterCallback,key){
	this.constructor= MoshiShareClient;
	this.constructor(masterCallback,key);

	this.start= function(payload){
		this.payload= payload;
		this.initScript();
		this.webGet();
		//poll for start
		//user confirms key
		//write payload
		//write end
	}
	this.webPosted= function(s){
		this.result={status:0,response:s};
		this.masterCallback(this);
		setTimeout( new OOcallback(this,"writeEnd").fcn, 5000);
	}
	this.writeEnd= function(){
		this.webWrite("end","nop");
	}
	this.webGot= function(s){
		if (this.result) return this.stop();
		var msg= "If this is the same share code showing on "
			+"the requester's screen, confirm (OK) to send "
			+"data. If not, cancel to stop: "
		var us= unescape(s);
		if (us.split(" ")[0]=="start"){
			new ActionCard(this,
				[msg,us.split(" ")[1],"Confirm","Cancel"]
				).show("Cancel");
			//var res= confirm(msg+us.split(" ")[1]);
			//if (res) this.proceedConfirmed();
		} else {
			var pollFcn= new OOcallback(this,"webGet").fcn;
			setTimeout(pollFcn, 1000);
		}
	}
	this.actionCardClick= function(s){
		if (s=="Confirm") 
			this.webWrite(this.payload,"webPosted");
	}
}

//----------
function Gaets(masterCallback){
	this.constructor=MoshiShare;
	this.constructor();
	this.masterCallback= masterCallback;
	this.life= 31000;
	this.key=1;

	this.url= {t:"http://appcastofl.appspot.com"
		,g:"{0}/getraw?title={1}"
		,s:"{0}/sign?title={1}&content={2}"}
	this.channel= "gaets_";

	this.save= function(s){
		//get num
		//incr and write num
		//write payload
		//callback status
		this.payload= s;
		this.url.s_=this.url.s;
		this.webGet();
	}
	this.webWrite= function(s, callback){
		this.getAjax(callback);
		var url= this.url.s.replace("{2}",escape(s));
		this.ajax.webPost(url);
	}
	this.webGot= function(s){
		this.num = parseInt(s);
		if (!isNaN(this.num))
			this.webWrite(++this.num,"webPosted");
		else
			this.returnError( 201, "no connection" );
	}
	this.webPosted= function(s){
		this.channel+= this.num;
		this.url.s= this.url.s_;
		this.webWrite(this.payload,"webPosted2");
		//reset channel?
	}
	this.webPosted2= function(s){
		this.returnError( 0, this.num );
	}
	this.returnError= function(code,s){
		this.result={status:code,message:s};
		this.masterCallback(this);
	}
}














