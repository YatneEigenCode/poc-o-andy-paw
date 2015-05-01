//swipebob.js
//5-6	jchoy	v1.258 swipeBob, refreshData, refreshFlag
//5-8	*	v1.312 use ontouchmove in LongClickBob
//6-4	*	v1.417 fix doubleclick by using coupon in mouseup

function Coupon(expireMs){
	this.expiry = new Date().valueOf()+expireMs;
	this.isExpired= function(){
		return (new Date().valueOf()>this.expiry);
	}
}
function SwipeBob(el, client, swipeLeftMeth, swipeRightMeth) {
	this.client= client;
	this.swipeLeftMeth  = swipeLeftMeth;
	this.swipeRightMeth = swipeRightMeth;
	this.startX= -1;
	this.onTouchEvent= function(e){
		t0= e.changedTouches[0];
		if (e.type=="touchstart") this.startX= t0.clientX;
		if (e.type=="touchcancel") this.startX= -1;
		if ((e.type=="touchend") && (this.startX != -1)) {
			var res = t0.clientX-this.startX;
			this.startX= -1;
			if (res>100)  this.client[this.swipeRightMeth]();
			if (res<-100) this.client[this.swipeLeftMeth]();
		}
	}
	var touchHandler= new OOcallback(this,"onTouchEvent").fcn;
	el.addEventListener("touchstart", touchHandler, true);
	el.addEventListener("touchmove", touchHandler, true);
	el.addEventListener("touchend", touchHandler, true);
	el.addEventListener("touchcancel", touchHandler, true); 
}
function LongClickBob(el, client, shortClickMeth,
		longClickMeth, longMs,
		doubleClickMeth, doubleMs){
	this.client = client;
	this.shortClickMeth= shortClickMeth;
	this.longClickMeth = longClickMeth;
	this.doubleClickMeth = doubleClickMeth;
	this.doubleMs = doubleMs;
	this.longMs = longMs;
	this.seq = 0;
	this.dblClkLimit= new Coupon(this.doubleMs);
	this.bobMouseDown= function(){
		this.isMouseDown= true;
		setTimeout( new OOcallback(
			this,"checkLongClick",++this.seq).fcna, 
			this.longMs );
	}
	this.bobMouseUp= function(){
		this.isMouseDown= false;
		if (!this.dblClkLimit.isExpired())
			return this.client[this.doubleClickMeth]();
		this.dblClkLimit= new Coupon(this.doubleMs);
		if (this.isMouseDown) this.client[this.shortClickMeth]();
	}
	this.bobTouchEnd= function(){
		this.isMouseDown= false;
		if (!this.dblClkLimit.isExpired())
			return this.client[this.doubleClickMeth]();
		this.dblClkLimit= new Coupon(this.doubleMs);
		if (this.isMouseDown) this.client[this.shortClickMeth]();
	}
	this.checkLongClick= function(seq){
		if (!this.isMouseDown) return;
		if (seq != this.seq) return;
		if (window["androidGate"]) androidGate.vibrate( 30 );
		this.client[this.longClickMeth]();
		navigator.vibrate( 100 );  //not working
	}
	el.onmousedown= new OOcallback(this,"bobMouseDown").fcn;
	el.ontouchstart= new OOcallback(this,"bobMouseDown").fcn;
	el.ontouchmove= new OOcallback(this,"bobTouchEnd").fcn;
	el.ontouchend= new OOcallback(this,"bobTouchEnd").fcn;
	el.onmouseup= new OOcallback(this,"bobMouseUp").fcn;
	//el.ontouchend= new OOcallback(this,"bobMouseUp").fcn;
}
