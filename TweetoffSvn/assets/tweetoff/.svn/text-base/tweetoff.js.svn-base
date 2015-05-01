//tweetoff.js
//4-09	jchoy	v1.2.115 MenuCell fixed position
//4-30	*	v1.216 tweetoff
//...
//5-8	*	v1.314 preserveSuperMethod
//5-15	*	v1.315 AnimationLimiter, autolinkScheme
//5-18	*	v1.321 scriptAction_showpartial
//5-19	*	v1.322 showflags actioncard
//5-21	*	v1.323 moreMenu
//5-22	*	v1.324 moreMenu calls setIsBlockBackAction()
//5-24	*	v1.331 MoshiShare, Ajaxo
//5-27	*	v1.336 TweetoffAppWithMoshi
//5-27	*	v1.337 AutoLink for Gtcq
//5-28	*	v1.338 bug fix, save_all_to_gaets, remove OOtimeout
//5-28	*	v1.339 intentMsg
//5-31	*	v1.341 AutoLink GtcqHandler
//6-1	*	v1.411 TweetoffImport
//6-1	*	v1.412 moshi_send_list
//6-1	*	v1.414 sub menus for peer and cloud
//6-4	*	v1.417 use doubleclick to change flag
//6-4	*	v1.419 fix moshiSend


function TweetoffForm(master){
	this.master = master;
	var _j=new PECBase();
	this.htmlElement= function(){
		if (!this.element){
		  var fm = this.element = _j.d.createElement("form");
		  var ta = fm.appendChild(_j.d.createElement("textarea"));
		  fm.appendChild(_j.d.createElement("br"));
		  ta.rows= 10; 
		  ta.cols= 30;
		  ta.name= "content";
		  ta.onkeypress= function(){
				this.value= this.value.substr(0,140);
			}
		  fm.master= this.master;
		  //fm.action= this.fmAction;
		  var hid = fm.appendChild(_j.d.createElement("input"));
		  hid.type= "hidden"; 
		  hid.name= "title";
		  var btn2 = fm.appendChild(_j.d.createElement("input"));
		  btn2.type= "button"; btn2.value= "Save";
		  btn2.onclick= function(){ 
			this.form.master.doHold(this.form);}
		  this.addButton(fm,"Clear").onclick= function(){
			this.form.content.value=''
		  }
		  this.addButton(fm,"Menu").onclick= function(){
			this.form.master.moreMenu()
		  }
		}
		return this.element;
	}
	this.addButton= function(fm,label){
		var btn3 = fm.appendChild(_j.d.createElement("input"));
		btn3.type= "button"; 
		btn3.value= label;
		return btn3;
	}
}
function DivCell( esctext, slotNum ) {
	this.text = unescape(esctext);
	this.slotNum = slotNum;
	var _j=new PECBase();
	this.aniColors=("yellow,#fffc17,#fffd17,#fffe37,#fffe57,"+
		"#fffe77,#fffe97,#ffffe7,white").split(",");

	this.htmlElement= function(){
		if (!this.element) {
			var cell= _j.d.createElement("div");
			cell.slotNum = this.slotNum;
			cell.innerHTML = this.autolink(this.text);
			if (!this.text)
			  cell.innerHTML +=" (dbg:" +this.slotNum +")";
			this.element= cell;
			cell.style.border= "1 solid gray";
			cell.style.padding = "3 0 0 3";
			cell.style.margin = "1 0 0 0";
		}
		return this.element;
	}
	this.autolink= function(s){
		var res = new AutoLink().autolink(s);
		res = this.autolinkScheme(res,"http://");
		res = this.autolinkScheme(res,"file://");
		return this.autolinkScheme(res,"https:/");
	}
	this.autolinkScheme= function(s,scheme){
		if (s.indexOf(scheme)<0) return s;
		var at=s.split("\n");
		for (var i=0; i<at.length; i++)
		  if (at[i].substring(0,scheme.length)==scheme)
			at[i] = this.linkDisplay(at[i]).link(at[i]);
		return at.join("\n");
	}
	this.linkDisplay= function(s){
		var title= unescape(new Ajaxo().cgi("title","",s));
		return (title)? title:s;
	}
	this.animateStop= function(){
		this.htmlElement().style.backgroundColor= "white";
	}
	this.animateHide= function(){
		this.htmlElement().style.overflow= "hidden";
		new StyleAnimation( this.htmlElement(), 
			"height", [50,15,5,0] ).start();
		new StyleAnimation( this.htmlElement(), "display",
		 "block,block,block,none".split(",") ).start();
	}
	this.animateStart= function(){
		var ani= new StyleAnimation( this.htmlElement(), 
			"backgroundColor", this.aniColors ).start();
		this.htmlElement().style.display= "block";
		if (this.aniLim) this.aniLim.add(ani);
		var ahs = [3,10,20,40];
		ahs.push(this.htmlElement().style.height);
		ani = new StyleAnimation( this.htmlElement(), 
			"height", ahs ).start();
		if (this.aniLim) this.aniLim.add(ani);
		this.htmlElement().style.overflow= "hidden";
	}
}
function FlagCell(row, appName){
	this.appName= appName;
	this.row= row;
	this.colors= ("white,red,green,blue,orange,purple,pink,"
		+"aqua,yellow,gray").split(",");
	this.constructor= DivCell;
	this.constructor("&nbsp;",row[2]);
	var _j=new PECBase();

	this.htmlElement= function(){
		if (!this.element) {
			var cell= _j.d.createElement("span");
			cell.className= "roundcorners20";
			cell.style.position= "absolute";
			cell.style.left= (screen.width>500)?"95%":"90%";
			this.element= cell;
			cell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			cell.style.margin= "0 5 0 0 ";
			cell.onclick= new OOcallback(this,"dotClick").fcn;
		}
		return this.element;
	}
	this.setFlagPending= function(isFirst){
		if (isFirst) this.isPending= true;
		if (!this.isPending) return;
		var len = this.element.innerHTML.length;
		if ((len>5) || (len==0)) 
			len = 5; 
		this.element.innerHTML = "..... ..".substr(0,len-1)
		setTimeout(new OOcallback(this,"setFlagPending").fcn,250);
	}
	this.setFlagColor= function(val){
		this.isPending= false;
		this.htmlElement().style.backgroundColor = 
			this.colors[val];
		this.element.innerHTML="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	this.dotClick= function(e){
		if (e) e.stopPropagation();
		var pgApp= window[this.appName];
		this.slotNum= pgApp.toggleFlag(this.row[0],this.slotNum);
		this.setFlagColor(this.slotNum);
	}
	this.setFlagColor(this.slotNum);
}
function OutboxCell(row, appName){
	this.appName= appName;
	this.dataRow=row;
	this.constructor= DivCell;
	this.constructor(row[1],0);
	this.htmlElement_base= this.htmlElement;
	this.opts= ("Tweet,fb,Send,Save-GT,"
		+"Copy,Delete,Cancel").split(",");
	this.htmlElement= function(){
		if (!this.element){
			this.element= this.htmlElement_base();
			this.element.style.minHeight= 25;
			this.element.className= "roundcorners5";
			new LongClickBob( this.element, this,
				"nop",
				"cellClick", 900,
				"flagDotClick", 300);

			this.element.refreshData= 
				new OOcallback(this,"refreshData").fcn;
			this.flagDot = new FlagCell(this.dataRow,this.appName);
			this.element.insertBefore( this.flagDot.htmlElement(),
				this.element.firstChild );
		}
		return this.element;
	}
	this.refreshData= function(isPending){
		if (isPending) return this.flagDot.setFlagPending(1);
		this.flagDot.setFlagColor(
			window[this.appName].refreshFlag(
				this.dataRow[0],this) );
	}
	this.scriptMenu= function(){
		if (this.text.substr(0,2) != "--") return this.opts
		var res= ["Cmd/"+this.text.substr(2)];
		for (var i=0; i<this.opts.length; i++) res[i+1]=this.opts[i];
		return res;
	}
	this.flagDotClick= function(){
		this.flagDot.dotClick();
	}
	this.cellClick= function(){
		this.element.style.backgroundColor= "orange";
		new ActionCard(this,this.scriptMenu()).show("Cancel");
		new FacebookPost().setIsBlockBackAction( true );
	}
	this.actionCardClick = function(cmd){
		var pgApp=window[this.appName];
		var db= pgApp.outboxDb;
		this.animateStart();
		if (cmd=="Tweet")
		{
			pgApp.acAlert("Connecting...");
			new TwitterPost().tweet(this.text);
		}
		if (cmd=="fb") {
			pgApp.acAlert("Connecting...");
			new FacebookPost().share(this.text);
		}
		if (cmd=="Delete") {
			db.dbapp.delMsgDb([this.dataRow[0]], pgApp.nop);
			this.animateHide();
		}
		if (cmd=="Send"){ 
			pgApp.form.content.value=this.text;
			pgApp.scriptActionSub_moshi_send();
		}
		if (cmd=="Save-GT"){ 
			new Gaets(
			  new OOcallback(pgApp,"savedGaets").fcn
			).save(this.text);
		}
		if (cmd=="Copy") 
			pgApp.form.content.value=this.text;
		if (cmd=="Purge") 
			pgApp.purgeData();
		if (cmd=="More") 
			pgApp.moreMenu();
		if (cmd.substr(0,4)=="Cmd/")
			pgApp.scriptAction(cmd.substr(4));
		new FacebookPost().setIsBlockBackAction( false );
	}
}

function TwitterPost(){
	this.url= "http://mobile.twitter.com/compose/tweet?status=";
	this.tweet= function(s){
		location= this.url+escape(s);
	}
}
function FacebookPost(){
	this.url= "https://www.facebook.com/sharer/sharer.php?"
		+"u=https://www.facebook.com/ZoobaloResource";
	this.droidGate= window["androidGate"];
	this.share= function(s){
		if (this.droidGate) {
			//location= this.url+escape(s);
			androidGate.fbPost( escape(s) );
		} else {
			return "NA in this version";
		}
	}
	this.setIsBlockBackAction = function(boolVal){
		if (this.droidGate) 
			androidGate.setIsBlockBackAction( boolVal );
	}
}

//limits the number of concurrent animations by calling .animateStop()
//on oldest objects
function AnimationLimiter( max ){
	this.max = max;
	this.tracker= new Array();
	this.add= function( obj ){
		var at=this.tracker;
		at.push(obj);
		if (at.length>this.max)
			at.shift().stop();
	}
}
function StyleAnimation(el,attribName,aValues){
	this.el= el;
	this.attribName= attribName;
	this.aValues= aValues;
	this.msPerStep= 100;

	this.start= function(){
		this.curStep= 0;
		this.step();
		return this;
	}
	this.stop= function(){
		this.curStep= this.aValues.length-1;
		this.step();
	}
	this.step= function(){
		this.el.style[this.attribName]= this.aValues[this.curStep];
		if (this.curStep++ < this.aValues.length)
			setTimeout( new OOcallback(this,"step").fcn,
				this.msPerStep );
	}
}

//HTML5 sqlite db
function OutboxDb(){
	this.dbapp = new DbApp();
	this.cb= function(obj,name){
		return new OOcallback(obj,name).fcn;
	}
	var ctine = "CREATE TABLE IF NOT EXISTS ";
	var obid = " ORDER BY id DESC;";
	this.dbapp.sql={
		saveMsg:"INSERT INTO msgs (name) VALUES (?);"
		,getMsgs:"SELECT * FROM msgs "+obid
		,delMsg:"DELETE FROM msgs WHERE id=?;"
		,purgeMsgs:"DELETE FROM msgs;"
		,initMsgs:ctine+"msgs (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL);" 
		,setFlag:"INSERT INTO flag VALUES (?,?);"
		,clearFlag:"DELETE FROM flag WHERE mid=? and ftype=?;"
		,getMsgsFlag:"SELECT distinct m.*, f.ftype FROM msgs m left join flag f ON f.mid=m.id and f.ftype=?"+obid
		,xgetMsgsFlag:"SELECT * FROM msgs WHERE id not in (select mid from flag where ftype=1)"+obid
		,initFlag:ctine+"flag (mid INTEGER, ftype INTEGER);" 
		,cleanCfg:"DELETE from config where id not in (select id from (select cfgkey, max(id) id from config group by cfgkey));"
		,setCfg:"INSERT INTO config (cfgkey, cfgval) VALUES (?,?)"
		,getCfg:"SELECT * from config WHERE cfgkey=? ORDER BY id desc"
		,initCfg:"CREATE TABLE IF NOT EXISTS config (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, cfgkey TEXT NOT NULL, cfgval TEXT NULL);" 
	}
	//remove from outbox if already posted
	this.filterOutbox= function(rs,aMsg){
		var res= [];
		for (var i=0,at=rs.rows; i<at.length; i++) {
		  var isOut=false, rstext= at.item(i)["name"];
		  for (var j=0; j<aMsg.length; j++)
		  	isOut|= (rstext == aMsg[j])
		  if (isOut) 
			this.dbapp.delMsgDb([rstext],this.nop);
		  else
			res.push( {text:rstext} );
		}
		return res;
	}
	//remove newly posted item from outbox
	this.hideOutboxCell= function(text, outboxDisp){
		for (var i=0,at=outboxDisp; i<at.length; i++)
		  if (text==at[i].text)
			at[i].cell.animateHide();
	}
	this.gotNumDb= function(txn,rs){
		if (rs.rows.length==0) return;
		this.nextNum = rs.rows.item(0)["cfgval"];
	}
	this.chooseHigherNum= function(a){
		var res= parseInt(this.nextNum);
		if (isNaN(res) || (a>res))
		  this.dbapp.setCfgDb(["nextnum",res=a]);
		return res;
	}
	this.dbapp.init("mgw","initMsgs");
}
function OOcallback(obj, meth, arg){
	var _privThis = this;
	this.meth = meth;
	this.obj = obj;
	this.arg = arg;
	this.fcn=function(a,b,c,d){_privThis.obj[_privThis.meth](a,b,c,d);}
	this.fcna=function(){_privThis.obj[_privThis.meth](_privThis.arg);}
}

//----------
function PECBase(){
	this.baseVersion = "v0.1.114";
	this.nop = function(){};
	this.d= document;
	this.w= window;
	this.scfuge= function(method){
		var _obj=this; 
		return function(){ _obj[method](); }
	}
	this.preserveSuperMethod= function(methNm){
		var sumena= "super_"+methNm;
		if (this[methNm]) 
		  this[this.preserveSuperMethod(sumena)]=this[methNm];
		return methNm;
	}
}
//extend for cross domain cfg
function MsgWallXdc(){
	this.constructor=PECBase;
	this.constructor();
	cr_createRuntime = this.nop;
	this.cfgsc= [15000];
	this.isRefreshEnabled = true;

	this.getMaxSlotNum= function(){
		for (var i=0,ac=this.div.childNodes; i<ac.length; i++)
		  if (ac[i].slotNum) return ac[i].slotNum;
		return this.slotNum;
	}
	this.fendResponse= function(jdo){
		var divCell = new DivCell(jdo.text,this.getMaxSlotNum()+1);
		divCell.animateStart();
		this.div.insertBefore(
			divCell.htmlElement(), this.div.childNodes[0]);
		this.msgs.unshift(jdo.text);
		this.outboxDb.hideOutboxCell(jdo.text,this.outboxDisp);
	}
	this.onMenuCellClick= function(){}
	this.doSave= function(fm){
		var ed = escape(fm.content.value);
		this.outboxDb.dbapp.saveMsgDb([ed],this.nop,this.dbErr);
		if(this.cfg.writeMethod=="GET"){
			var ed = escape(fm.content.value);
			var img= new Image();
			img.height=1;
			img.src= this.cfg.writeUrl.replace("{0}",ed);
			fm.appendChild(img);
		} else if (this.cfg.writeMethod=="POST") {
			fm.method= "POST";
			fm.action= this.cfg.writeUrl;
			fm.title.value= this.cfg.writeTitle;
			fm.submit();
		} else {
			var url= "submitandreturn.html?data=";
			location= url+escape(fm.content.value);
		}
	}
}
function TweetoffAppWithFlag(){
	this.constructor=MsgWallXdc;
	this.constructor();
	this.version= "v1.419";
	this.msgs = new Array();

	var _j=new PECBase();	//does not inherit
	this.cNames= "id,name,ftype".split(",");
	this.curFlag= 1;
	this.aniColors=("white,#ffffe7,#fffe97,"+
		"#fffe77,#fffe97,#ffffe7,white").split(",");

	this.dbPath= "http://dl.dropbox.com/u/28448395/jsondata/"
	this.step0Url = this.dbPath+"commCfg.txt";
	this.init= function(appName){
		window[this.appName= (appName)?appName:"pageApp"]=this;
		this.div = _j.d.createElement("div");
		this.div.style.margin= "0 0 0 0";
		_j.d.body.insertBefore(this.div,_j.d.body.firstChild);
		//menuCell no longer used
		var db= this.outboxDb = new OutboxDb();
		db.dbapp.initCfgDb(); 
		db.dbapp.getCfgDb(["nextnum"], db.cb(db,"gotNumDb")); 
		db.dbapp.initFlagDb(); 

		//new ScrollDetector().init(window,this);
		new SwipeBob(document,this,"onSwipeLeft","onSwipeRight");
		return this;
	}
	this.gotCurFlagDb= function(txn,rs){
		if (rs.rows.length>0)
			this.curFlag = parseInt(rs.rows.item(0)["cfgval"]);
		this.showForm(this);
	}
	this.start= function(){
		//new CDJD().init( this );
		//this.showForm(this);
		var db= this.outboxDb;
		db.dbapp.getCfgDb(["curFlag"], db.cb(this,"gotCurFlagDb")); 
	}
	this.onSwipeLeft= function(){
		this.curFlag += 2;
		this.onSwipeRight();
	}
	this.onSwipeRight= function(isSecond){
		if (!isSecond){
			setTimeout(new OOcallback(this,
				"onSwipeRight",1).fcna, 500);
			var ac=this.div.childNodes;
			for (var i=0; i<ac.length; i++)
				ac[i].refreshData(1);	//pending
			return;
		}
		var fcc=new FlagCell([,,],0).colors;
		if (--this.curFlag >= fcc.length) this.curFlag=1;
		if (this.curFlag<1) this.curFlag=fcc.length-1;
		var db= this.outboxDb = new OutboxDb();
		db.dbapp.getMsgsFlagDb(
			[this.curFlag], db.cb(this,"gotMsgsDbForRefresh")); 
		db.dbapp.setCfgDb(["curFlag",this.curFlag], this.nop); 
	}
	this.gotMsgsDbForRefresh= function(txn,rs){
		if (!rs.rows.length) return;
		this.outboxDisp=this.outboxDb.dbapp.rsToArray(
			null,rs,this.cNames);
		for (var i=0,ac=this.div.childNodes; i<ac.length; i++)
			if (ac[i]["refreshData"])
				ac[i].refreshData();
		this.showPartial();
	}
	this.showPartial= function(){
		for (var i=0,at=this.outboxDisp; i<at.length; i++) 
			if ((!at[i][2]) && (this.intentMsg!="showall"))
				at[i].cell.animateHide()
			else
				at[i].cell.animateStart();
	}
	this.got1MsgDb= function(txn,rs){
		if (!rs.rows.length) return;
		var outboxTemp=this.outboxDb.dbapp.rsToArray(
			null,rs,this.cNames);
		this.showOutboxMsg( outboxTemp[0] );
		this.outboxDisp.push(outboxTemp[0]);
	}
	this.gotMsgsDb= function(txn,rs){
		if (!rs.rows.length) return;
		this.outboxDisp=this.outboxDb.dbapp.rsToArray(
			null,rs,this.cNames);
		this.aniLim = new AnimationLimiter(30);
		for (var i=0,at=this.outboxDisp; i<at.length; i++)
			this.showOutboxMsg(at[at.length-i-1]);
		this.showPartial();
	}
	this.showOutboxMsg= function(outboxRec){
		var divCell= outboxRec.cell= 
			new OutboxCell(outboxRec, this.appName);
		divCell.aniLim = this.aniLim;
		divCell.animateStart();
		this.div.insertBefore(
			divCell.htmlElement(), this.div.childNodes[0]);
	}
	this.showForm= function(){
		if (!this.isRefreshEnabled) return;
		var fm = this.form = 
		  new TweetoffForm(this).htmlElement();
		_j.d.body.appendChild(fm);

		var db= this.outboxDb = new OutboxDb();
		db.dbapp.getMsgsFlagDb([this.curFlag], db.cb(this,"gotMsgsDb")); 
	}
	this.doHold= function(fm){
		var ed = escape(fm.content.value);
		if (!ed) ed= new Date().toLocaleString();
		this.outboxDb.dbapp.saveMsgDb([ed],this.nop,this.dbErr);
		var db= this.outboxDb;
		db.dbapp.getMsgsDb([], db.cb(this,"got1MsgDb")); 
	}
	this.clearAllCells= function(){
		this.div.innerHTML="";
	}
	this.acAlert= function(s){
		new ActionCard(this,[s,"Cancel"]).show("Cancel");
	}
	this.countData= function(){
		var res= this.outboxDisp.length+ " items";
		var ver= "Tweetoff "+this.version
		new ActionCard(this,[res,ver,"Cancel"]).show("Cancel");
	}
	this.dumpData= function(){
		this.acAlert("Not Available");
	}
	this.shareData= function(){
		this.acAlert("Not Available");
	}
	this.purgeData= function(){
		this.acAlert("Confirm Purge");
	}
	this.actionCardClick= function(cmd){
		if (cmd=="Confirm Purge") {
			this.outboxDb.dbapp.purgeMsgsDb([], pgApp.nop);
			this.clearAllCells();
		}
	}
}
function TweetoffAppWithScript(){
	this.constructor= TweetoffAppWithFlag;
	this.constructor();
	var _j=new PECBase();	//does not inherit

	this.preserveSuperMethod= _j.preserveSuperMethod;
	this.preserveSuperMethod("actionCardClick");
	this.actionCardClick= function(cmd){
		this.super_actionCardClick(cmd);
		var scmd = cmd.replace(/ /g,"_");
		if (scmd.indexOf(":")<0) scmd+=":";
		this.scriptAction(scmd);
		new FacebookPost().setIsBlockBackAction( false );
	}
	this.scriptAction= function(cmd){
		var scriptName= "scriptAction_"+cmd.substr(0,
			cmd.indexOf(':'));
		if (this[scriptName])
			this[scriptName](cmd.substr(scriptName.length-12));
		scriptName= "scriptActionSub_"+cmd.substr(0,
			cmd.indexOf(':'));
		if (this[scriptName])
			this[scriptName](cmd.substr(scriptName.length-12));
	}
	this.scriptAction_about= this.countData;
	this.xscriptAction_about= function(){
		this.acAlert("Tweetoff "+this.version);
	}
	this.xscriptAction_help= function(cmd){
		var scmd= (cmd)? cmd:"command";
		var div=_j.d.getElementById("res.help."+scmd);
		this.form.content.value= div.innerHTML;
	}
	this.xscriptAction_search= function(cmd){
		var db= this.outboxDb;
		this.acAlert(cmd);
		//db.dbapp.findMsgsDb([cmd], db.cb(this,"got1MsgDb")); 
	}
	this.scriptAction_showflags= function(cmd){
		if (!cmd){
			var at= new FlagCell([,,],0).colors;
			for (var i=0; i<at.length; i++)
				at[i]="showflags:"+at[i];
			at.push("Cancel");
			return new ActionCard(this,at).show("Cancel");
		}
		var db= this.outboxDb;
		var fc = new FlagCell([,,],0);
		for (var i=1; i<fc.colors.length; i++)
			if (fc.colors[i]==cmd) this.curFlag=i;
		this.clearAllCells();
		db.dbapp.getMsgsFlagDb([this.curFlag], 
			db.cb(this,"gotMsgsDb")); 
		db.dbapp.setCfgDb(["curFlag",this.curFlag], this.nop); 
	}
	this.xscriptAction_swiperight= this.onSwipeRight;
	this.xscriptAction_listcolors= function(cmd){
		var fc = new FlagCell([,,],0);
		this.form.content.value= "Available colors for "
			+"showflags:\n"+fc.colors.join("\n");
	}
	this.reconnectCell= function(cellObj){
		cellObj.dataRow[0];
		for (var i=0,at=this.outboxDisp; i<at.length; i++)
			if (at[i][0]==cellObj.dataRow[0])
				at[i].cell=cellObj;
	}
	this.refreshFlag= function(id,cell){
		//cells call this to query what color it should be showing.
		for (var i=0,at=this.outboxDisp; i<at.length; i++)
			if (at[i][0]==id) {
				at[i].cell= cell;
				return (at[i][2])? this.curFlag : 0;
		}
		return 0;
	}
	this.toggleFlag= function(id,curVal){
		//cells call this when user clicks to change flag state.
		var res= (curVal)? 0 :this.curFlag;
		var dbParm = (res)? ["set",res] : ["clear",this.curFlag];
		this.outboxDb.dbapp[dbParm[0]+"FlagDb"]([id,dbParm[1]],this.nop);
		for (var i=0,at=this.outboxDisp; i<at.length; i++)
			if (at[i][0]==id) at[i][2]= res;
		return res;
	}
	this.xscriptAction_showpartial= function(){
		this.showPartial();
	}
	this.scriptAction_showall= function(){
		for (var i=0,at=this.outboxDisp; i<at.length; i++) 
			at[i].cell.animateStart();
	}
	this.moreMenu= function(){
		new FacebookPost().setIsBlockBackAction( true );
		var res = ["Cancel"];
		for (var m in this)
			if (m.indexOf("scriptAction_")==0)
			  res.unshift(m.substr(13).replace(/_/g," "));
		new ActionCard(this,res).show("Cancel")
	}
}
function TweetoffAppWithMoshi(){
	this.constructor= TweetoffAppWithScript;
	this.constructor();
	var _j=new PECBase();	//does not inherit

	this.setIsBlockBackAction= function(isEffect){
		new FacebookPost().setIsBlockBackAction( isEffect );
	}
	this.scriptAction_peer_share= function(){
		this.setIsBlockBackAction(true);
		var res = ["moshi request","moshi send",
			"moshi send list","Cancel"];
		new ActionCard(this,res).show("Cancel")
	}
	this.scriptAction_cloud_share= function(){
		this.setIsBlockBackAction(true);
		var res = ["save list to cloud",
			"save all to cloud","Cancel"];
		for (var m in this)
			if (m.indexOf("scriptCloud_")==0)
			  res.unshift(m.substr(12).replace(/_/g," "));
		new ActionCard(this,res).show("Cancel")
	}
	this.scriptActionSub_moshi_request= function(){
		new MoshiShareClient( 
			new OOcallback(this,"moclres").fcn).start();
	}
	this.moclres= function(msc){
		if (msc.result.status) 
			this.acAlert(
			  msc.result.status+": "+msc.result.error);
		if (msc.result.payload) {
			this.form.content.value= msc.result.payload;
			this.doHold(this.form);
			this.acAlert( "request completed: data received" );
		}
	}
	this.scriptActionSub_moshi_send= function(){
		this.acAlert("waiting for peer to start request");
		new MoshiShareHost( 
			new OOcallback(this,"moclres").fcn
		).start( this.form.content.value );
	}
	this.savedGaets= function(moshi){
		new ActionCard(this,[moshi.result.message,"OK"]
			).show("OK");
	}
	this.scriptActionSub_save_list_to_cloud= function(){
		this.scriptActionSub_save_all_to_cloud(true);
	}
	this.scriptActionSub_save_all_to_cloud= function(isFilter){
		new Gaets(
			new OOcallback(this,"savedGaetsList").fcn
		).save( this.serializeData(isFilter) );
	}
	this.scriptActionSub_moshi_send_list= function(isFilter){
		this.acAlert("waiting for peer to start request");
		new MoshiShareHost( 
			new OOcallback(this,"moclres").fcn
		).start( this.serializeData(true) );
	}
	this.serializeData= function(isFilter){
		var j=1;
		var res="http://tweetoff.okdaily.com/tweetoff/?"
			+"title=Tweetoff%20Set%20({_count_}"
			+"%20items)&row0=id^^desc";
		for (var i=0,at= this.outboxDisp; i<at.length; i++)
			if ((at[i][2]) || (!isFilter))
				res+= "&row"+(j++)+"="+escape( 
				  at[i][0]+"^^"+unescape(at[i][1]) );
		res= res.replace("{_count_}",j-1);
		return res;
	}
	this.savedGaetsList= function(moshi){
		this.form.content.value= "http://gtcq.ok88.com"
			+"/?gaets="+moshi.result.message;
		this.doHold(this.form);
	}
}
TweetoffApp = TweetoffAppWithMoshi;

//var tweetoffApp= new TweetoffApp();
//tweetoffApp.init("tweetoffApp").start();

