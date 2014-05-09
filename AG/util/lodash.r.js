define(function(require, exports, module) { 

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash include="each,isArray,isString,isFunction,isObject,filter,map,reduce,template,range,extend,defaults,clone" exports="global" moduleId="lodash"`
 */
;(function(){function n(n){return"\\"+et[n]}function t(n){return typeof n.toString!="function"&&typeof(n+"")=="string"}function e(n){n.length=0,C.length<P&&C.push(n)}function r(n,t){var e;t||(t=0),typeof e=="undefined"&&(e=n?n.length:0);var r=-1;e=e-t||0;for(var o=Array(0>e?0:e);++r<e;)o[r]=n[t+r];return o}function o(){}function u(n){function t(){if(o){var n=r(o);yt.apply(n,arguments)}if(this instanceof t){var a=c(e.prototype),n=e.apply(a,n||arguments);return b(n)?n:a}return e.apply(u,n||arguments)
}var e=n[0],o=n[2],u=n[4];return xt(t,n),t}function a(n,o,u,c,i){if(u){var l=u(n);if(typeof l!="undefined")return l}if(!b(n))return n;var f=lt.call(n);if(!Y[f]||!Ot.nodeClass&&t(n))return n;var p=Et[f];switch(f){case T:case H:return new p(+n);case W:case X:return new p(n);case U:return l=p(n.source,R.exec(n)),l.lastIndex=n.lastIndex,l}if(f=St(n),o){var s=!c;c||(c=C.pop()||[]),i||(i=C.pop()||[]);for(var g=c.length;g--;)if(c[g]==n)return i[g];l=f?p(n.length):{}}else l=f?r(n):$t({},n);return f&&(gt.call(n,"index")&&(l.index=n.index),gt.call(n,"input")&&(l.input=n.input)),o?(c.push(n),i.push(l),(f?Ft:Rt)(n,function(n,t){l[t]=a(n,o,u,c,i)
}),s&&(e(c),e(i)),l):l}function c(n){return b(n)?mt(n):{}}function i(n,t,e){if(typeof n!="function")return x;if(typeof t=="undefined"||!("prototype"in n))return n;var r=n.__bindData__;if(typeof r=="undefined"&&(Ot.funcNames&&(r=!n.name),r=r||!Ot.funcDecomp,!r)){var o=st.call(n);Ot.funcNames||(r=!N.test(o)),r||(r=K.test(o),xt(n,r))}if(false===r||true!==r&&1&r[1])return n;switch(e){case 1:return function(e){return n.call(t,e)};case 2:return function(e,r){return n.call(t,e,r)};case 3:return function(e,r,o){return n.call(t,e,r,o)
};case 4:return function(e,r,o,u){return n.call(t,e,r,o,u)}}return O(n,t)}function l(n){function t(){var n=p?i:this;if(u){var h=r(u);yt.apply(h,arguments)}return(a||g)&&(h||(h=r(arguments)),a&&yt.apply(h,a),g&&h.length<f)?(o|=16,l([e,y?o:-4&o,h,null,i,f])):(h||(h=arguments),s&&(e=n[v]),this instanceof t?(n=c(e.prototype),h=e.apply(n,h),b(h)?h:n):e.apply(n,h))}var e=n[0],o=n[1],u=n[2],a=n[3],i=n[4],f=n[5],p=1&o,s=2&o,g=4&o,y=8&o,v=e;return xt(t,n),t}function f(n,r,o,u,a,c){if(o){var i=o(n,r);if(typeof i!="undefined")return!!i
}if(n===r)return 0!==n||1/n==1/r;if(n===n&&!(n&&tt[typeof n]||r&&tt[typeof r]))return false;if(null==n||null==r)return n===r;var l=lt.call(n),p=lt.call(r);if(l==J&&(l=Q),p==J&&(p=Q),l!=p)return false;switch(l){case T:case H:return+n==+r;case W:return n!=+n?r!=+r:0==n?1/n==1/r:n==+r;case U:case X:return n==r+""}if(p=l==M,!p){var s=gt.call(n,"__wrapped__"),g=gt.call(r,"__wrapped__");if(s||g)return f(s?n.__wrapped__:n,g?r.__wrapped__:r,o,u,a,c);if(l!=Q||!Ot.nodeClass&&(t(n)||t(r)))return false;if(l=!Ot.argsObject&&v(n)?Object:n.constructor,s=!Ot.argsObject&&v(r)?Object:r.constructor,l!=s&&!(h(l)&&l instanceof l&&h(s)&&s instanceof s)&&"constructor"in n&&"constructor"in r)return false
}for(l=!a,a||(a=C.pop()||[]),c||(c=C.pop()||[]),s=a.length;s--;)if(a[s]==n)return c[s]==r;var y=0,i=true;if(a.push(n),c.push(r),p){if(s=n.length,y=r.length,(i=y==s)||u)for(;y--;)if(p=s,g=r[y],u)for(;p--&&!(i=f(n[p],g,o,u,a,c)););else if(!(i=f(n[y],g,o,u,a,c)))break}else Bt(r,function(t,e,r){return gt.call(r,e)?(y++,i=gt.call(n,e)&&f(n[e],t,o,u,a,c)):void 0}),i&&!u&&Bt(n,function(n,t,e){return gt.call(e,t)?i=-1<--y:void 0});return a.pop(),c.pop(),l&&(e(a),e(c)),i}function p(n,t,e,o,a,c){var i=1&t,f=4&t,s=16&t,g=32&t;
if(!(2&t||h(n)))throw new TypeError;s&&!e.length&&(t&=-17,s=e=false),g&&!o.length&&(t&=-33,g=o=false);var y=n&&n.__bindData__;return y&&true!==y?(y=r(y),y[2]&&(y[2]=r(y[2])),y[3]&&(y[3]=r(y[3])),!i||1&y[1]||(y[4]=a),!i&&1&y[1]&&(t|=8),!f||4&y[1]||(y[5]=c),s&&yt.apply(y[2]||(y[2]=[]),e),g&&ht.apply(y[3]||(y[3]=[]),o),y[1]|=t,p.apply(null,y)):(1==t||17===t?u:l)([n,t,e,o,a,c])}function s(){nt.h=G,nt.b=nt.c=nt.g=nt.i="",nt.e="t",nt.j=true;for(var n,t=0;n=arguments[t];t++)for(var e in n)nt[e]=n[e];t=nt.a,nt.d=/^[^,]+/.exec(t)[0],n=Function,t="return function("+t+"){",e=nt;
var r="var n,t="+e.d+",E="+e.e+";if(!t)return E;"+e.i+";";e.b?(r+="var u=t.length;n=-1;if("+e.b+"){",Ot.unindexedChars&&(r+="if(s(t)){t=t.split('')}"),r+="while(++n<u){"+e.g+";}}else{"):Ot.nonEnumArgs&&(r+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+e.g+";}}else{"),Ot.enumPrototypes&&(r+="var G=typeof t=='function';"),Ot.enumErrorProps&&(r+="var F=t===k||t instanceof Error;");var o=[];if(Ot.enumPrototypes&&o.push('!(G&&n=="prototype")'),Ot.enumErrorProps&&o.push('!(F&&(n=="message"||n=="name"))'),e.j&&e.f)r+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}";
else if(r+="for(n in t){",e.j&&o.push("m.call(t, n)"),o.length&&(r+="if("+o.join("&&")+"){"),r+=e.g+";",o.length&&(r+="}"),r+="}",Ot.nonEnumShadows){for(r+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];",k=0;7>k;k++)r+="n='"+e.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",e.j||(r+="||(!x[n]&&t[n]!==A[n])"),r+="){"+e.g+"}";r+="}"}return(e.b||Ot.nonEnumArgs)&&(r+="}"),r+=e.c+";return E",n("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",t+r+"}")(i,V,at,gt,D,v,St,m,nt.f,ct,tt,wt,X,it,lt)
}function g(n){return Dt[n]}function y(n){return typeof n=="function"&&ft.test(n)}function v(n){return n&&typeof n=="object"&&typeof n.length=="number"&&lt.call(n)==J||false}function h(n){return typeof n=="function"}function b(n){return!(!n||!tt[typeof n])}function m(n){return typeof n=="string"||n&&typeof n=="object"&&lt.call(n)==X||false}function _(n){for(var t=-1,e=Ct(n),r=e.length,o=Array(r);++t<r;)o[t]=n[e[t]];return o}function d(n,t,e){var r=[];if(t=o.createCallback(t,e,3),St(n)){e=-1;for(var u=n.length;++e<u;){var a=n[e];
t(a,e,n)&&r.push(a)}}else Ft(n,function(n,e,o){t(n,e,o)&&r.push(n)});return r}function j(n,t,e){if(t&&typeof e=="undefined"&&St(n)){e=-1;for(var r=n.length;++e<r&&false!==t(n[e],e,n););}else Ft(n,t,e);return n}function E(n,t,e){var r=-1,u=n?n.length:0,a=Array(typeof u=="number"?u:0);if(t=o.createCallback(t,e,3),St(n))for(;++r<u;)a[r]=t(n[r],r,n);else Ft(n,function(n,e,o){a[++r]=t(n,e,o)});return a}function w(n,t,e,r){var u=3>arguments.length;if(t=o.createCallback(t,r,4),St(n)){var a=-1,c=n.length;for(u&&(e=n[++a]);++a<c;)e=t(e,n[a],a,n)
}else Ft(n,function(n,r,o){e=u?(u=false,n):t(e,n,r,o)});return e}function O(n,t){return 2<arguments.length?p(n,17,r(arguments,2),null,t):p(n,1,null,null,t)}function x(n){return n}function S(){}function A(n){return function(t){return t[n]}}var C=[],D={},P=40,F=/\b__p\+='';/g,$=/\b(__p\+=)''\+/g,I=/(__e\(.*?\)|\b__t\))\+'';/g,B=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,R=/\w*$/,N=/^\s*function[ \n\r\t]+\w/,L=/<%=([\s\S]+?)%>/g,z=/($^)/,K=/\bthis\b/,q=/['\n\r\t\u2028\u2029\\]/g,G="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),J="[object Arguments]",M="[object Array]",T="[object Boolean]",H="[object Date]",V="[object Error]",W="[object Number]",Q="[object Object]",U="[object RegExp]",X="[object String]",Y={"[object Function]":false};
Y[J]=Y[M]=Y[T]=Y[H]=Y[W]=Y[Q]=Y[U]=Y[X]=true;var Z={configurable:false,enumerable:false,value:null,writable:false},nt={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",j:false},tt={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},et={"\\":"\\","'":"'","\n":"n","\r":"r","\t":"t","\u2028":"u2028","\u2029":"u2029"},rt=tt[typeof window]&&window||this,ot=tt[typeof global]&&global;!ot||ot.global!==ot&&ot.window!==ot||(rt=ot);var ut=[],at=Error.prototype,ct=Object.prototype,it=String.prototype,lt=ct.toString,ft=RegExp("^"+(lt+"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),pt=Math.ceil,st=Function.prototype.toString,gt=ct.hasOwnProperty,yt=ut.push,vt=ct.propertyIsEnumerable,ht=ut.unshift,bt=function(){try{var n={},t=y(t=Object.defineProperty)&&t,e=t(n,n,n)&&t
}catch(r){}return e}(),mt=y(mt=Object.create)&&mt,_t=y(_t=Array.isArray)&&_t,dt=y(dt=Object.keys)&&dt,jt=Math.max,Et={};Et[M]=Array,Et[T]=Boolean,Et[H]=Date,Et["[object Function]"]=Function,Et[Q]=Object,Et[W]=Number,Et[U]=RegExp,Et[X]=String;var wt={};wt[M]=wt[H]=wt[W]={constructor:true,toLocaleString:true,toString:true,valueOf:true},wt[T]=wt[X]={constructor:true,toString:true,valueOf:true},wt[V]=wt["[object Function]"]=wt[U]={constructor:true,toString:true},wt[Q]={constructor:true},function(){for(var n=G.length;n--;){var t,e=G[n];
for(t in wt)gt.call(wt,t)&&!gt.call(wt[t],e)&&(wt[t][e]=false)}}();var Ot=o.support={};!function(){function n(){this.x=1}var t={0:1,length:1},e=[];n.prototype={valueOf:1,y:1};for(var r in new n)e.push(r);for(r in arguments);Ot.argsClass=lt.call(arguments)==J,Ot.argsObject=arguments.constructor==Object&&!(arguments instanceof Array),Ot.enumErrorProps=vt.call(at,"message")||vt.call(at,"name"),Ot.enumPrototypes=vt.call(n,"prototype"),Ot.funcDecomp=!y(rt.k)&&K.test(function(){return this}),Ot.funcNames=typeof Function.name=="string",Ot.nonEnumArgs=0!=r,Ot.nonEnumShadows=!/valueOf/.test(e),Ot.spliceObjects=(ut.splice.call(t,0,1),!t[0]),Ot.unindexedChars="xx"!="x"[0]+Object("x")[0];
try{Ot.nodeClass=!(lt.call(document)==Q&&!({toString:0}+""))}catch(o){Ot.nodeClass=true}}(1),o.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:L,variable:"",imports:{_:o}},mt||(c=function(){function n(){}return function(t){if(b(t)){n.prototype=t;var e=new n;n.prototype=null}return e||rt.Object()}}());var xt=bt?function(n,t){Z.value=t,bt(n,"__bindData__",Z)}:S;Ot.argsClass||(v=function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&gt.call(n,"callee")&&!vt.call(n,"callee")||false
});var St=_t||function(n){return n&&typeof n=="object"&&typeof n.length=="number"&&lt.call(n)==M||false},At=s({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),Ct=dt?function(n){return b(n)?Ot.enumPrototypes&&typeof n=="function"||Ot.nonEnumArgs&&n.length&&v(n)?At(n):dt(n):[]}:At,ot={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",b:"typeof u=='number'",v:Ct,g:"if(e(t[n],n,g)===false)return E"},_t={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:Ct,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},kt={i:"if(!B[typeof t])return E;"+ot.i,b:false},Dt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Pt=RegExp("["+Ct(Dt).join("")+"]","g"),Ft=s(ot),$t=s(_t,{i:_t.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),It=s(_t),Bt=s(ot,kt,{j:false}),Rt=s(ot,kt);
h(/x/)&&(h=function(n){return typeof n=="function"&&"[object Function]"==lt.call(n)}),o.assign=$t,o.bind=O,o.createCallback=function(n,t,e){var r=typeof n;if(null==n||"function"==r)return i(n,t,e);if("object"!=r)return A(n);var o=Ct(n),u=o[0],a=n[u];return 1!=o.length||a!==a||b(a)?function(t){for(var e=o.length,r=false;e--&&(r=f(t[o[e]],n[o[e]],null,true)););return r}:function(n){return n=n[u],a===n&&(0!==a||1/a==1/n)}},o.defaults=It,o.filter=d,o.forEach=j,o.forIn=Bt,o.forOwn=Rt,o.keys=Ct,o.map=E,o.property=A,o.range=function(n,t,e){n=+n||0,e=typeof e=="number"?e:+e||1,null==t&&(t=n,n=0);
var r=-1;t=jt(0,pt((t-n)/(e||1)));for(var o=Array(t);++r<t;)o[r]=n,n+=e;return o},o.values=_,o.collect=E,o.each=j,o.extend=$t,o.select=d,o.clone=function(n,t,e,r){return typeof t!="boolean"&&null!=t&&(r=e,e=t,t=false),a(n,t,typeof e=="function"&&i(e,r,1))},o.escape=function(n){return null==n?"":(n+"").replace(Pt,g)},o.identity=x,o.isArguments=v,o.isArray=St,o.isFunction=h,o.isObject=b,o.isString=m,o.noop=S,o.reduce=w,o.template=function(t,e,r){var u=o.templateSettings;t=(t||"")+"",r=It({},r,u);var a,c=It({},r.imports,u.imports),u=Ct(c),c=_(c),i=0,l=r.interpolate||z,f="__p+='";
t.replace(RegExp((r.escape||z).source+"|"+l.source+"|"+(l===L?B:z).source+"|"+(r.evaluate||z).source+"|$","g"),function(e,r,o,u,c,l){return o||(o=u),f+=t.slice(i,l).replace(q,n),r&&(f+="'+__e("+r+")+'"),c&&(a=true,f+="';"+c+";\n__p+='"),o&&(f+="'+((__t=("+o+"))==null?'':__t)+'"),i=l+e.length,e}),f+="';",l=r=r.variable,l||(r="obj",f="with("+r+"){"+f+"}"),f=(a?f.replace(F,""):f).replace($,"$1").replace(I,"$1;"),f="function("+r+"){"+(l?"":r+"||("+r+"={});")+"var __t,__p='',__e=_.escape"+(a?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+f+"return __p}";
try{var p=Function(u,"return "+f).apply(void 0,c)}catch(s){throw s.source=f,s}return e?p(e):(p.source=f,p)},o.foldl=w,o.inject=w,o.VERSION="2.4.1",rt._=o}).call(this);
module.exports = _;

});