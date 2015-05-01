//post-export customization
//2-23-2013 JChoy empty
//2-24-2013 JChoy v0.1.113 decouple target name cr; change dropbox public urls
//2-24-2013 JChoy v0.1.115 use cgi param to change image, saved to cookie
//2-27-2013 JChoy v0.1.116 CDJD use cross domain config file
//2-28-2013 JChoy v0.2.112 CgiMacro
//3-1-2013 JChoy v0.2.113 CgiMacro(oi,mmap)
//3-1-2013 JChoy v0.2.114 Initializable and extensible CDJDBase
//3-11-2013 Jchoy v1.0.121 cfg[url,callback]
//3-11-2013 Jchoy v1.0.123 fix timing for cfg=null

function CgiMacro(oi,mmap){
	this.mmap = mmap;
	this.macroKey= "cm";
	this.baseVersion = "v0.2.113";
	var t=new TMNO({}); t.mold(this, t);

	// ?cm=db,2844,cfg02 -> cfg=http://box.com/u/2844/jsondata/cfg02.txt
	//new CgiMacro({db:"cfg=http://box.com/u/{0}/jsondata/{1}.txt"});
	this.map= function(qy){
		var mq,mac= this.cgi(this.macroKey,"",qy);
		if (!mac) return qy;
		for (var z,c,i=0,at=mac.split(","); i<at.length; i++){
			if (!(z=this.mmap[at[i]])) {
			} else {
			  for (var b=true,j=0; b && (i<at.length); j++) {
				var mark= "{"+j+"}";
				b= z.indexOf(mark)>=0;
				if (b) z= z.replace(mark,at[++i]);
			  }
			  mq+= "&"+z;
			}
		}//for
		return qy + mq;
	}//fcn
	oi.cgi= function(k,def,qy){
		return this.cgiMacro.cgi(k,def,this.cgiMacro.map(qy));
	}
	oi.cgiMacro = this;
}

//Initializable and extensible CDJD
//Usage: initialize a client that implements step#() and step#Url
function CDJDBase(){
	this.version = "v0.2.114";
	this.sin= "CDJD_singleton_instance";
	this.stepNum = 0;
	this.getSingleton= function(){
		if (!window[this.sin]) window[this.sin]=this;
		return window[this.sin];
	}
	//called by response data
	this.start=function(jdo){
		var cdjd= this.getSingleton();
		if (cdjd.cfg) {
			var method= cdjd.cfg.callback;
			cdjd.cfg= null;
			cdjd.oi[method](jdo);
			return;
		}
		var stepName= "step" + cdjd.stepNum++;
		if (cdjd.oi[stepName]) cdjd.oi[stepName](jdo);
		this.tryFetch();
	}
	this.tryFetch= function(){
		var cdjd= this.getSingleton();
		var scr= document.createElement("script");
		if (cdjd.cfg) {
			scr.src= cdjd.cfg.url;
			document.body.appendChild(scr);
			return;
		}
		var urlName = "step" + cdjd.stepNum + "Url";
		if (cdjd.oi[urlName]) {
			scr.src= cdjd.oi[urlName];
			document.body.appendChild(scr);
		}
	}
	//called by manager object
	this.init= function(client,url,callback){
		this.getSingleton().oi = client;
		if ((url) && (callback))
		  this.getSingleton().cfg={url:url,callback:callback};
		this.tryFetch();
	}
}
//json callback instantiation
function CDJD( jdo ){
	this.constructor=CDJDBase;
	this.constructor();
	if (jdo) this.start(jdo);
}

