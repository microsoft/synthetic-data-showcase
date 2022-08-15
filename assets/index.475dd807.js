import{i as tl,d as nl,a as Dr,b as ol,c as rl,e as sl,C as il,f as As,g as al,h as Es,u as _o,r as l,_ as Be,j as Mr,K as J,k as Ut,A as Bs,l as D,m as Gn,n as $s,o as B,p as kt,H as je,q as wt,s as ll,t as Uo,v as Go,w as Pn,x as ul,F as Fs,y as Ie,z as So,B as cl,D as Rs,E as $n,G as dl,I as Ce,J as pl,L as ye,M as _t,N as fl,O as Ls,P as Kn,Q as Ko,R as zn,S as _e,T as ml,U as hl,V as Hs,W as ko,X as xl,Y as Vs,Z as zo,$ as gl,a0 as bl,a1 as Ws,a2 as vl,a3 as Tt,a4 as yl,a5 as To,a6 as Or,a7 as Cl,a8 as Us,a9 as wl,aa as dn,ab as _l,ac as Sl,ad as kl,ae as Tl,af as Xe,ag as Il,ah as jl,ai as Dl,aj as Ml,ak as It,al as Ol,am as jt,an as Gs,ao as Nl,ap as oo,aq as ro,ar as Pl,as as Al,at as El,au as Nr,av as Bl,aw as u,ax as ot,ay as St,az as at,aA as _,aB as Io,aC as Fn,aD as pn,aE as Ye,aF as Ue,aG as Ge,aH as ze,aI as Ae,aJ as pt,aK as ln,aL as fn,aM as Ks,aN as qe,aO as $l,aP as Fl,aQ as Je,aR as jo,aS as K,aT as on,aU as lt,aV as Ft,aW as Do,aX as De,aY as zs,aZ as Rl,a_ as Ll,a$ as W,b0 as qn,b1 as qs,b2 as qo,b3 as Ys,b4 as Hl,b5 as Js,b6 as Vl,b7 as Wl,b8 as Zs,b9 as Rn,ba as Ul,bb as Xs,bc as Yo,bd as Ln,be as Yn,bf as Gl,bg as Dt,bh as Kl,bi as zl,bj as ql,bk as Yl,bl as Jl,bm as Zl,bn as Xl,bo as Jo,bp as Qs,bq as ei,br as ti,bs as Mo,bt as Ql,bu as ni,bv as Oo,bw as ft,bx as mn,by as eu,bz as tu,bA as nu,bB as ou,bC as ru,bD as Me,bE as oi,bF as ri,bG as su,bH as iu,bI as si,bJ as au,bK as lu,bL as Jn,bM as No,bN as uu,bO as Hn,bP as Zo,bQ as cu,bR as du,bS as pu,bT as fu,bU as mu,bV as Te,bW as hu,bX as Xo,bY as Zn,bZ as bt,b_ as vt,b$ as Qo,c0 as Gt,c1 as Pr,c2 as Ht,c3 as xu,c4 as gu,c5 as bu,c6 as vu,c7 as yu,c8 as Cu,c9 as wu,ca as ii,cb as _u,cc as Su}from"./main.926211f0.js";function ku(t,e){e===void 0&&(e=!0);var o=[];if(t){for(var n=0;n<t.children.length;n++)o.push(t.children.item(n));e&&tl(t)&&o.push.apply(o,t._virtual.children)}return o}var so=new Date,io=new Date;function rt(t,e,o,n){function r(s){return t(s=arguments.length===0?new Date:new Date(+s)),s}return r.floor=function(s){return t(s=new Date(+s)),s},r.ceil=function(s){return t(s=new Date(s-1)),e(s,1),t(s),s},r.round=function(s){var i=r(s),a=r.ceil(s);return s-i<a-s?i:a},r.offset=function(s,i){return e(s=new Date(+s),i==null?1:Math.floor(i)),s},r.range=function(s,i,a){var c=[],p;if(s=r.ceil(s),a=a==null?1:Math.floor(a),!(s<i)||!(a>0))return c;do c.push(p=new Date(+s)),e(s,a),t(s);while(p<s&&s<i);return c},r.filter=function(s){return rt(function(i){if(i>=i)for(;t(i),!s(i);)i.setTime(i-1)},function(i,a){if(i>=i)if(a<0)for(;++a<=0;)for(;e(i,-1),!s(i););else for(;--a>=0;)for(;e(i,1),!s(i););})},o&&(r.count=function(s,i){return so.setTime(+s),io.setTime(+i),t(so),t(io),Math.floor(o(so,io))},r.every=function(s){return s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?r.filter(n?function(i){return n(i)%s===0}:function(i){return r.count(0,i)%s===0}):r}),r}const Tu=1e3,er=Tu*60,Iu=er*60,tr=Iu*24,ai=tr*7;var li=rt(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*er)/tr,t=>t.getDate()-1);const ui=li;li.range;function Mt(t){return rt(function(e){e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},function(e,o){e.setDate(e.getDate()+o*7)},function(e,o){return(o-e-(o.getTimezoneOffset()-e.getTimezoneOffset())*er)/ai})}var ci=Mt(0),Vn=Mt(1),ju=Mt(2),Du=Mt(3),Vt=Mt(4),Mu=Mt(5),Ou=Mt(6);ci.range;Vn.range;ju.range;Du.range;Vt.range;Mu.range;Ou.range;var nr=rt(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,e){t.setFullYear(t.getFullYear()+e)},function(t,e){return e.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});nr.every=function(t){return!isFinite(t=Math.floor(t))||!(t>0)?null:rt(function(e){e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,o){e.setFullYear(e.getFullYear()+o*t)})};const un=nr;nr.range;var di=rt(function(t){t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCDate(t.getUTCDate()+e)},function(t,e){return(e-t)/tr},function(t){return t.getUTCDate()-1});const pi=di;di.range;function Ot(t){return rt(function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},function(e,o){e.setUTCDate(e.getUTCDate()+o*7)},function(e,o){return(o-e)/ai})}var fi=Ot(0),Wn=Ot(1),Nu=Ot(2),Pu=Ot(3),Wt=Ot(4),Au=Ot(5),Eu=Ot(6);fi.range;Wn.range;Nu.range;Pu.range;Wt.range;Au.range;Eu.range;var or=rt(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e)},function(t,e){return e.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});or.every=function(t){return!isFinite(t=Math.floor(t))||!(t>0)?null:rt(function(e){e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,o){e.setUTCFullYear(e.getUTCFullYear()+o*t)})};const cn=or;or.range;function ao(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function lo(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Zt(t,e,o){return{y:t,m:e,d:o,H:0,M:0,S:0,L:0}}function Bu(t){var e=t.dateTime,o=t.date,n=t.time,r=t.periods,s=t.days,i=t.shortDays,a=t.months,c=t.shortMonths,p=Xt(r),m=Qt(r),x=Xt(s),g=Qt(s),d=Xt(i),h=Qt(i),f=Xt(a),b=Qt(a),v=Xt(c),C=Qt(c),S={a:be,A:w,b:y,B:I,c:null,d:Rr,e:Rr,f:sc,g:hc,G:gc,H:nc,I:oc,j:rc,L:mi,m:ic,M:ac,p:P,q:E,Q:Vr,s:Wr,S:lc,u:uc,U:cc,V:dc,w:pc,W:fc,x:null,X:null,y:mc,Y:xc,Z:bc,"%":Hr},T={a:Q,A:ce,b:ie,B:ge,c:null,d:Lr,e:Lr,f:wc,g:Nc,G:Ac,H:vc,I:yc,j:Cc,L:xi,m:_c,M:Sc,p:pe,q:$e,Q:Vr,s:Wr,S:kc,u:Tc,U:Ic,V:jc,w:Dc,W:Mc,x:null,X:null,y:Oc,Y:Pc,Z:Ec,"%":Hr},O={a:q,A:ue,b:se,B:X,c:de,d:$r,e:$r,f:Xu,g:Br,G:Er,H:Fr,I:Fr,j:qu,L:Zu,m:zu,M:Yu,p:G,q:Ku,Q:ec,s:tc,S:Ju,u:Hu,U:Vu,V:Wu,w:Lu,W:Uu,x:he,X:te,y:Br,Y:Er,Z:Gu,"%":Qu};S.x=R(o,S),S.X=R(n,S),S.c=R(e,S),T.x=R(o,T),T.X=R(n,T),T.c=R(e,T);function R(j,$){return function(H){var k=[],xe=-1,N=0,ae=j.length,ke,Qe,Yt;for(H instanceof Date||(H=new Date(+H));++xe<ae;)j.charCodeAt(xe)===37&&(k.push(j.slice(N,xe)),(Qe=Ar[ke=j.charAt(++xe)])!=null?ke=j.charAt(++xe):Qe=ke==="e"?" ":"0",(Yt=$[ke])&&(ke=Yt(H,Qe)),k.push(ke),N=xe+1);return k.push(j.slice(N,xe)),k.join("")}}function A(j,$){return function(H){var k=Zt(1900,void 0,1),xe=F(k,j,H+="",0),N,ae;if(xe!=H.length)return null;if("Q"in k)return new Date(k.Q);if("s"in k)return new Date(k.s*1e3+("L"in k?k.L:0));if($&&!("Z"in k)&&(k.Z=0),"p"in k&&(k.H=k.H%12+k.p*12),k.m===void 0&&(k.m="q"in k?k.q:0),"V"in k){if(k.V<1||k.V>53)return null;"w"in k||(k.w=1),"Z"in k?(N=lo(Zt(k.y,0,1)),ae=N.getUTCDay(),N=ae>4||ae===0?Wn.ceil(N):Wn(N),N=pi.offset(N,(k.V-1)*7),k.y=N.getUTCFullYear(),k.m=N.getUTCMonth(),k.d=N.getUTCDate()+(k.w+6)%7):(N=ao(Zt(k.y,0,1)),ae=N.getDay(),N=ae>4||ae===0?Vn.ceil(N):Vn(N),N=ui.offset(N,(k.V-1)*7),k.y=N.getFullYear(),k.m=N.getMonth(),k.d=N.getDate()+(k.w+6)%7)}else("W"in k||"U"in k)&&("w"in k||(k.w="u"in k?k.u%7:"W"in k?1:0),ae="Z"in k?lo(Zt(k.y,0,1)).getUTCDay():ao(Zt(k.y,0,1)).getDay(),k.m=0,k.d="W"in k?(k.w+6)%7+k.W*7-(ae+5)%7:k.w+k.U*7-(ae+6)%7);return"Z"in k?(k.H+=k.Z/100|0,k.M+=k.Z%100,lo(k)):ao(k)}}function F(j,$,H,k){for(var xe=0,N=$.length,ae=H.length,ke,Qe;xe<N;){if(k>=ae)return-1;if(ke=$.charCodeAt(xe++),ke===37){if(ke=$.charAt(xe++),Qe=O[ke in Ar?$.charAt(xe++):ke],!Qe||(k=Qe(j,H,k))<0)return-1}else if(ke!=H.charCodeAt(k++))return-1}return k}function G(j,$,H){var k=p.exec($.slice(H));return k?(j.p=m.get(k[0].toLowerCase()),H+k[0].length):-1}function q(j,$,H){var k=d.exec($.slice(H));return k?(j.w=h.get(k[0].toLowerCase()),H+k[0].length):-1}function ue(j,$,H){var k=x.exec($.slice(H));return k?(j.w=g.get(k[0].toLowerCase()),H+k[0].length):-1}function se(j,$,H){var k=v.exec($.slice(H));return k?(j.m=C.get(k[0].toLowerCase()),H+k[0].length):-1}function X(j,$,H){var k=f.exec($.slice(H));return k?(j.m=b.get(k[0].toLowerCase()),H+k[0].length):-1}function de(j,$,H){return F(j,e,$,H)}function he(j,$,H){return F(j,o,$,H)}function te(j,$,H){return F(j,n,$,H)}function be(j){return i[j.getDay()]}function w(j){return s[j.getDay()]}function y(j){return c[j.getMonth()]}function I(j){return a[j.getMonth()]}function P(j){return r[+(j.getHours()>=12)]}function E(j){return 1+~~(j.getMonth()/3)}function Q(j){return i[j.getUTCDay()]}function ce(j){return s[j.getUTCDay()]}function ie(j){return c[j.getUTCMonth()]}function ge(j){return a[j.getUTCMonth()]}function pe(j){return r[+(j.getUTCHours()>=12)]}function $e(j){return 1+~~(j.getUTCMonth()/3)}return{format:function(j){var $=R(j+="",S);return $.toString=function(){return j},$},parse:function(j){var $=A(j+="",!1);return $.toString=function(){return j},$},utcFormat:function(j){var $=R(j+="",T);return $.toString=function(){return j},$},utcParse:function(j){var $=A(j+="",!0);return $.toString=function(){return j},$}}}var Ar={"-":"",_:" ",0:"0"},we=/^\s*\d+/,$u=/^%/,Fu=/[\\^$*+?|[\]().{}]/g;function Z(t,e,o){var n=t<0?"-":"",r=(n?-t:t)+"",s=r.length;return n+(s<o?new Array(o-s+1).join(e)+r:r)}function Ru(t){return t.replace(Fu,"\\$&")}function Xt(t){return new RegExp("^(?:"+t.map(Ru).join("|")+")","i")}function Qt(t){return new Map(t.map((e,o)=>[e.toLowerCase(),o]))}function Lu(t,e,o){var n=we.exec(e.slice(o,o+1));return n?(t.w=+n[0],o+n[0].length):-1}function Hu(t,e,o){var n=we.exec(e.slice(o,o+1));return n?(t.u=+n[0],o+n[0].length):-1}function Vu(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.U=+n[0],o+n[0].length):-1}function Wu(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.V=+n[0],o+n[0].length):-1}function Uu(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.W=+n[0],o+n[0].length):-1}function Er(t,e,o){var n=we.exec(e.slice(o,o+4));return n?(t.y=+n[0],o+n[0].length):-1}function Br(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.y=+n[0]+(+n[0]>68?1900:2e3),o+n[0].length):-1}function Gu(t,e,o){var n=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(o,o+6));return n?(t.Z=n[1]?0:-(n[2]+(n[3]||"00")),o+n[0].length):-1}function Ku(t,e,o){var n=we.exec(e.slice(o,o+1));return n?(t.q=n[0]*3-3,o+n[0].length):-1}function zu(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.m=n[0]-1,o+n[0].length):-1}function $r(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.d=+n[0],o+n[0].length):-1}function qu(t,e,o){var n=we.exec(e.slice(o,o+3));return n?(t.m=0,t.d=+n[0],o+n[0].length):-1}function Fr(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.H=+n[0],o+n[0].length):-1}function Yu(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.M=+n[0],o+n[0].length):-1}function Ju(t,e,o){var n=we.exec(e.slice(o,o+2));return n?(t.S=+n[0],o+n[0].length):-1}function Zu(t,e,o){var n=we.exec(e.slice(o,o+3));return n?(t.L=+n[0],o+n[0].length):-1}function Xu(t,e,o){var n=we.exec(e.slice(o,o+6));return n?(t.L=Math.floor(n[0]/1e3),o+n[0].length):-1}function Qu(t,e,o){var n=$u.exec(e.slice(o,o+1));return n?o+n[0].length:-1}function ec(t,e,o){var n=we.exec(e.slice(o));return n?(t.Q=+n[0],o+n[0].length):-1}function tc(t,e,o){var n=we.exec(e.slice(o));return n?(t.s=+n[0],o+n[0].length):-1}function Rr(t,e){return Z(t.getDate(),e,2)}function nc(t,e){return Z(t.getHours(),e,2)}function oc(t,e){return Z(t.getHours()%12||12,e,2)}function rc(t,e){return Z(1+ui.count(un(t),t),e,3)}function mi(t,e){return Z(t.getMilliseconds(),e,3)}function sc(t,e){return mi(t,e)+"000"}function ic(t,e){return Z(t.getMonth()+1,e,2)}function ac(t,e){return Z(t.getMinutes(),e,2)}function lc(t,e){return Z(t.getSeconds(),e,2)}function uc(t){var e=t.getDay();return e===0?7:e}function cc(t,e){return Z(ci.count(un(t)-1,t),e,2)}function hi(t){var e=t.getDay();return e>=4||e===0?Vt(t):Vt.ceil(t)}function dc(t,e){return t=hi(t),Z(Vt.count(un(t),t)+(un(t).getDay()===4),e,2)}function pc(t){return t.getDay()}function fc(t,e){return Z(Vn.count(un(t)-1,t),e,2)}function mc(t,e){return Z(t.getFullYear()%100,e,2)}function hc(t,e){return t=hi(t),Z(t.getFullYear()%100,e,2)}function xc(t,e){return Z(t.getFullYear()%1e4,e,4)}function gc(t,e){var o=t.getDay();return t=o>=4||o===0?Vt(t):Vt.ceil(t),Z(t.getFullYear()%1e4,e,4)}function bc(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+Z(e/60|0,"0",2)+Z(e%60,"0",2)}function Lr(t,e){return Z(t.getUTCDate(),e,2)}function vc(t,e){return Z(t.getUTCHours(),e,2)}function yc(t,e){return Z(t.getUTCHours()%12||12,e,2)}function Cc(t,e){return Z(1+pi.count(cn(t),t),e,3)}function xi(t,e){return Z(t.getUTCMilliseconds(),e,3)}function wc(t,e){return xi(t,e)+"000"}function _c(t,e){return Z(t.getUTCMonth()+1,e,2)}function Sc(t,e){return Z(t.getUTCMinutes(),e,2)}function kc(t,e){return Z(t.getUTCSeconds(),e,2)}function Tc(t){var e=t.getUTCDay();return e===0?7:e}function Ic(t,e){return Z(fi.count(cn(t)-1,t),e,2)}function gi(t){var e=t.getUTCDay();return e>=4||e===0?Wt(t):Wt.ceil(t)}function jc(t,e){return t=gi(t),Z(Wt.count(cn(t),t)+(cn(t).getUTCDay()===4),e,2)}function Dc(t){return t.getUTCDay()}function Mc(t,e){return Z(Wn.count(cn(t)-1,t),e,2)}function Oc(t,e){return Z(t.getUTCFullYear()%100,e,2)}function Nc(t,e){return t=gi(t),Z(t.getUTCFullYear()%100,e,2)}function Pc(t,e){return Z(t.getUTCFullYear()%1e4,e,4)}function Ac(t,e){var o=t.getUTCDay();return t=o>=4||o===0?Wt(t):Wt.ceil(t),Z(t.getUTCFullYear()%1e4,e,4)}function Ec(){return"+0000"}function Hr(){return"%"}function Vr(t){return+t}function Wr(t){return Math.floor(+t/1e3)}var Et,bi,vi,yi,Ci;Bc({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function Bc(t){return Et=Bu(t),bi=Et.format,vi=Et.parse,yi=Et.utcFormat,Ci=Et.utcParse,Et}var wi="%Y-%m-%dT%H:%M:%S.%LZ";function $c(t){return t.toISOString()}Date.prototype.toISOString||yi(wi);function Fc(t){var e=new Date(t);return isNaN(e)?null:e}var Rc=+new Date("2000-01-01T00:00:00.000Z")?Fc:Ci(wi);const Lc=Rc;function Hc(t){const e=t.length;for(let o=0;o<e;++o){const n=t.charCodeAt(o);if(n<48||n>57)return!1}return!0}function Vc(t,e={}){const o=nl(e.autoType);Dr(t)&&(t=JSON.parse(t));let n=t.data,r;if(ol(n)&&!rl(n)?t.schema&&t.schema.fields&&(r=t.schema.fields.map(s=>s.name)):n=t,o||e.parse){const s=e.parse||{};for(const i in n){const a=n[i],c=a.length;if(s[i])for(let p=0;p<c;++p)a[p]=s[i](a[p]);else if(o)for(let p=0;p<c;++p){const m=a[p];Dr(m)&&sl(m)&&!Hc(m)&&(a[p]=new Date(m))}}}return new il(n,r)}function _i(t,e={}){const o=e.using||As;return fetch(t,e.fetch).then(n=>n[e.as||"text"]()).then(n=>o(n,e))}function Wc(t,e){return _i(t,{...e,as:"text",using:As})}function Uc(t,e){return _i(t,{...e,as:"json",using:Gc})}function Gc(t,e){return al(t)?Es(t):Vc(t,e)}function Kc(t,e={}){const o=`d[${JSON.stringify(t)}]`,{maxbins:n,nice:r,minstep:s,step:i,offset:a}=e,c=[n,r,s,i];let p=c.length;for(;p&&c[--p]==null;)c.pop();const m=c.length?", "+c.map(x=>x+"").join(", "):"";return`d => op.bin(${o}, ...op.bins(${o}${m}), ${a||0})`}var zc=function(){var t=_o({});return l.exports.useEffect(function(){return function(){for(var e=0,o=Object.keys(t);e<o.length;e++){var n=o[e];clearTimeout(n)}}},[t]),_o({setTimeout:function(e,o){var n=setTimeout(e,o);return t[n]=1,n},clearTimeout:function(e){delete t[e],clearTimeout(e)}})},qc="forward",Ur="backward",Yc=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return n._inputElement=l.exports.createRef(),n._autoFillEnabled=!0,n._onCompositionStart=function(r){n.setState({isComposing:!0}),n._autoFillEnabled=!1},n._onCompositionUpdate=function(){Mr()&&n._updateValue(n._getCurrentInputValue(),!0)},n._onCompositionEnd=function(r){var s=n._getCurrentInputValue();n._tryEnableAutofill(s,n.value,!1,!0),n.setState({isComposing:!1}),n._async.setTimeout(function(){n._updateValue(n._getCurrentInputValue(),!1)},0)},n._onClick=function(){n.value&&n.value!==""&&n._autoFillEnabled&&(n._autoFillEnabled=!1)},n._onKeyDown=function(r){if(n.props.onKeyDown&&n.props.onKeyDown(r),!r.nativeEvent.isComposing)switch(r.which){case J.backspace:n._autoFillEnabled=!1;break;case J.left:case J.right:n._autoFillEnabled&&(n.setState({inputValue:n.props.suggestedDisplayValue||""}),n._autoFillEnabled=!1);break;default:n._autoFillEnabled||n.props.enableAutofillOnKeyPress.indexOf(r.which)!==-1&&(n._autoFillEnabled=!0);break}},n._onInputChanged=function(r){var s=n._getCurrentInputValue(r);if(n.state.isComposing||n._tryEnableAutofill(s,n.value,r.nativeEvent.isComposing),!(Mr()&&n.state.isComposing)){var i=r.nativeEvent.isComposing,a=i===void 0?n.state.isComposing:i;n._updateValue(s,a)}},n._onChanged=function(){},n._updateValue=function(r,s){if(!(!r&&r===n.value)){var i=n.props,a=i.onInputChange,c=i.onInputValueChange;a&&(r=a?.(r,s)||""),n.setState({inputValue:r},function(){return c?.(r,s)})}},Ut(n),n._async=new Bs(n),n.state={inputValue:o.defaultVisibleValue||"",isComposing:!1},n}return e.getDerivedStateFromProps=function(o,n){if(o.updateValueInWillReceiveProps){var r=o.updateValueInWillReceiveProps();if(r!==null&&r!==n.inputValue&&!n.isComposing)return D(D({},n),{inputValue:r})}return null},Object.defineProperty(e.prototype,"cursorLocation",{get:function(){if(this._inputElement.current){var o=this._inputElement.current;return o.selectionDirection!==qc?o.selectionEnd:o.selectionStart}else return-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isValueSelected",{get:function(){return Boolean(this.inputElement&&this.inputElement.selectionStart!==this.inputElement.selectionEnd)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._getControlledValue()||this.state.inputValue||""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionStart",{get:function(){return this._inputElement.current?this._inputElement.current.selectionStart:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionEnd",{get:function(){return this._inputElement.current?this._inputElement.current.selectionEnd:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"inputElement",{get:function(){return this._inputElement.current},enumerable:!1,configurable:!0}),e.prototype.componentDidUpdate=function(o,n,r){var s=this.props,i=s.suggestedDisplayValue,a=s.shouldSelectFullInputValueInComponentDidUpdate,c=s.preventValueSelection,p=0;if(!c)if(this._autoFillEnabled&&this.value&&i&&Si(i,this.value)){var m=!1;if(a&&(m=a()),m&&this._inputElement.current)this._inputElement.current.setSelectionRange(0,i.length,Ur);else{for(;p<this.value.length&&this.value[p].toLocaleLowerCase()===i[p].toLocaleLowerCase();)p++;p>0&&this._inputElement.current&&this._inputElement.current.setSelectionRange(p,i.length,Ur)}}else this._inputElement.current&&r!==null&&!this._autoFillEnabled&&!this.state.isComposing&&this._inputElement.current.setSelectionRange(r.start,r.end,r.dir)},e.prototype.componentWillUnmount=function(){this._async.dispose()},e.prototype.render=function(){var o=Gn(this.props,$s),n=D(D({},this.props.style),{fontFamily:"inherit"});return B("input",{...D({autoCapitalize:"off",autoComplete:"off","aria-autocomplete":"both"},o,{style:n,ref:this._inputElement,value:this._getDisplayValue(),onCompositionStart:this._onCompositionStart,onCompositionUpdate:this._onCompositionUpdate,onCompositionEnd:this._onCompositionEnd,onChange:this._onChanged,onInput:this._onInputChanged,onKeyDown:this._onKeyDown,onClick:this.props.onClick?this.props.onClick:this._onClick,"data-lpignore":!0})})},e.prototype.focus=function(){this._inputElement.current&&this._inputElement.current.focus()},e.prototype.clear=function(){this._autoFillEnabled=!0,this._updateValue("",!1),this._inputElement.current&&this._inputElement.current.setSelectionRange(0,0)},e.prototype.getSnapshotBeforeUpdate=function(){var o,n,r=this._inputElement.current;return r&&r.selectionStart!==this.value.length?{start:(o=r.selectionStart)!==null&&o!==void 0?o:r.value.length,end:(n=r.selectionEnd)!==null&&n!==void 0?n:r.value.length,dir:r.selectionDirection||"backward"}:null},e.prototype._getCurrentInputValue=function(o){return o&&o.target&&o.target.value?o.target.value:this.inputElement&&this.inputElement.value?this.inputElement.value:""},e.prototype._tryEnableAutofill=function(o,n,r,s){!r&&o&&this._inputElement.current&&this._inputElement.current.selectionStart===o.length&&!this._autoFillEnabled&&(o.length>n.length||s)&&(this._autoFillEnabled=!0)},e.prototype._getDisplayValue=function(){return this._autoFillEnabled?Jc(this.value,this.props.suggestedDisplayValue):this.value},e.prototype._getControlledValue=function(){var o=this.props.value;return o===void 0||typeof o=="string"?o:(console.warn("props.value of Autofill should be a string, but it is "+o+" with type of "+typeof o),o.toString())},e.defaultProps={enableAutofillOnKeyPress:[J.down,J.up]},e}(l.exports.Component);function Jc(t,e){var o=t;return e&&t&&Si(e,o)&&(o=e),o}function Si(t,e){return!t||!e?!1:t.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())===0}var uo,co,Zc=32,Xc=30,ki=32,Po=36,Ao=kt(function(t){var e,o=t.semanticColors;return{backgroundColor:o.disabledBackground,color:o.disabledText,cursor:"default",selectors:(e={":after":{borderColor:o.disabledBackground}},e[je]={color:"GrayText",selectors:{":after":{borderColor:"GrayText"}}},e)}}),Gr={selectors:(uo={},uo[je]=D({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},wt()),uo)},po={selectors:(co={},co[je]=D({color:"WindowText",backgroundColor:"Window"},wt()),co)},Qc=kt(function(t,e,o,n,r,s){var i,a=t.palette,c=t.semanticColors,p={textHoveredColor:c.menuItemTextHovered,textSelectedColor:a.neutralDark,textDisabledColor:c.disabledText,backgroundHoveredColor:c.menuItemBackgroundHovered,backgroundPressedColor:c.menuItemBackgroundPressed},m={root:[t.fonts.medium,{backgroundColor:n?p.backgroundHoveredColor:"transparent",boxSizing:"border-box",cursor:"pointer",display:r?"none":"block",width:"100%",height:"auto",minHeight:Po,lineHeight:"20px",padding:"0 8px",position:"relative",borderWidth:"1px",borderStyle:"solid",borderColor:"transparent",borderRadius:0,wordWrap:"break-word",overflowWrap:"break-word",textAlign:"left",selectors:D(D((i={},i[je]={border:"none",borderColor:"Background"},i),!r&&{"&.ms-Checkbox":{display:"flex",alignItems:"center"}}),{"&.ms-Button--command:hover:active":{backgroundColor:p.backgroundPressedColor},".ms-Checkbox-label":{width:"100%"}})},s?[{backgroundColor:"transparent",color:p.textSelectedColor,selectors:{":hover":[{backgroundColor:p.backgroundHoveredColor},Gr]}},ll(t,{inset:-1,isFocusedOnly:!1}),Gr]:[]],rootHovered:{backgroundColor:p.backgroundHoveredColor,color:p.textHoveredColor},rootFocused:{backgroundColor:p.backgroundHoveredColor},rootDisabled:{color:p.textDisabledColor,cursor:"default"},optionText:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",minWidth:"0px",maxWidth:"100%",wordWrap:"break-word",overflowWrap:"break-word",display:"inline-block"},optionTextWrapper:{maxWidth:"100%",display:"flex",alignItems:"center"}};return Uo(m,e,o)}),ed=kt(function(t,e){var o,n,r=t.semanticColors,s=t.fonts,i={buttonTextColor:r.bodySubtext,buttonTextHoveredCheckedColor:r.buttonTextChecked,buttonBackgroundHoveredColor:r.listItemBackgroundHovered,buttonBackgroundCheckedColor:r.listItemBackgroundChecked,buttonBackgroundCheckedHoveredColor:r.listItemBackgroundCheckedHovered},a={selectors:(o={},o[je]=D({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},wt()),o)},c={root:{color:i.buttonTextColor,fontSize:s.small.fontSize,position:"absolute",top:0,height:"100%",lineHeight:Xc,width:ki,textAlign:"center",cursor:"default",selectors:(n={},n[je]=D({backgroundColor:"ButtonFace",borderColor:"ButtonText",color:"ButtonText"},wt()),n)},icon:{fontSize:s.small.fontSize},rootHovered:[{backgroundColor:i.buttonBackgroundHoveredColor,color:i.buttonTextHoveredCheckedColor,cursor:"pointer"},a],rootPressed:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootChecked:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootCheckedHovered:[{backgroundColor:i.buttonBackgroundCheckedHoveredColor,color:i.buttonTextHoveredCheckedColor},a],rootDisabled:[Ao(t),{position:"absolute"}]};return Uo(c,e)}),td=kt(function(t,e,o){var n,r,s,i,a,c,p=t.semanticColors,m=t.fonts,x=t.effects,g={textColor:p.inputText,borderColor:p.inputBorder,borderHoveredColor:p.inputBorderHovered,borderPressedColor:p.inputFocusBorderAlt,borderFocusedColor:p.inputFocusBorderAlt,backgroundColor:p.inputBackground,erroredColor:p.errorText},d={headerTextColor:p.menuHeader,dividerBorderColor:p.bodyDivider},h={selectors:(n={},n[je]={color:"GrayText"},n)},f=[{color:p.inputPlaceholderText},h],b=[{color:p.inputTextHovered},h],v=[{color:p.disabledText},h],C=D(D({color:"HighlightText",backgroundColor:"Window"},wt()),{selectors:{":after":{borderColor:"Highlight"}}}),S=Go(g.borderPressedColor,x.roundedCorner2,"border",0),T={container:{},label:{},labelDisabled:{},root:[t.fonts.medium,{boxShadow:"none",marginLeft:"0",paddingRight:ki,paddingLeft:9,color:g.textColor,position:"relative",outline:"0",userSelect:"none",backgroundColor:g.backgroundColor,cursor:"text",display:"block",height:Zc,whiteSpace:"nowrap",textOverflow:"ellipsis",boxSizing:"border-box",selectors:{".ms-Label":{display:"inline-block",marginBottom:"8px"},"&.is-open":{selectors:(r={},r[je]=C,r)},":after":{pointerEvents:"none",content:"''",position:"absolute",left:0,top:0,bottom:0,right:0,borderWidth:"1px",borderStyle:"solid",borderColor:g.borderColor,borderRadius:x.roundedCorner2}}}],rootHovered:{selectors:(s={":after":{borderColor:g.borderHoveredColor},".ms-ComboBox-Input":[{color:p.inputTextHovered},Pn(b),po]},s[je]=D(D({color:"HighlightText",backgroundColor:"Window"},wt()),{selectors:{":after":{borderColor:"Highlight"}}}),s)},rootPressed:[{position:"relative",selectors:(i={},i[je]=C,i)}],rootFocused:[{selectors:(a={".ms-ComboBox-Input":[{color:p.inputTextHovered},po]},a[je]=C,a)},S],rootDisabled:Ao(t),rootError:{selectors:{":after":{borderColor:g.erroredColor},":hover:after":{borderColor:p.inputBorderHovered}}},rootDisallowFreeForm:{},input:[Pn(f),{backgroundColor:g.backgroundColor,color:g.textColor,boxSizing:"border-box",width:"100%",height:"100%",borderStyle:"none",outline:"none",font:"inherit",textOverflow:"ellipsis",padding:"0",selectors:{"::-ms-clear":{display:"none"}}},po],inputDisabled:[Ao(t),Pn(v)],errorMessage:[t.fonts.small,{color:g.erroredColor,marginTop:"5px"}],callout:{boxShadow:x.elevation8},optionsContainerWrapper:{width:o},optionsContainer:{display:"block"},screenReaderText:ul,header:[m.medium,{fontWeight:Fs.semibold,color:d.headerTextColor,backgroundColor:"none",borderStyle:"none",height:Po,lineHeight:Po,cursor:"default",padding:"0 8px",userSelect:"none",textAlign:"left",selectors:(c={},c[je]=D({color:"GrayText"},wt()),c)}],divider:{height:1,backgroundColor:d.dividerBorderColor}};return Uo(T,e)}),nd=kt(function(t,e,o,n,r,s,i,a){return{container:Ie("ms-ComboBox-container",e,t.container),label:Ie(t.label,n&&t.labelDisabled),root:Ie("ms-ComboBox",a?t.rootError:o&&"is-open",r&&"is-required",t.root,!i&&t.rootDisallowFreeForm,a&&!s?t.rootError:!n&&s&&t.rootFocused,!n&&{selectors:{":hover":a?t.rootError:!o&&!s&&t.rootHovered,":active":a?t.rootError:t.rootPressed,":focus":a?t.rootError:t.rootFocused}},n&&["is-disabled",t.rootDisabled]),input:Ie("ms-ComboBox-Input",t.input,n&&t.inputDisabled),errorMessage:Ie(t.errorMessage),callout:Ie("ms-ComboBox-callout",t.callout),optionsContainerWrapper:Ie("ms-ComboBox-optionsContainerWrapper",t.optionsContainerWrapper),optionsContainer:Ie("ms-ComboBox-optionsContainer",t.optionsContainer),header:Ie("ms-ComboBox-header",t.header),divider:Ie("ms-ComboBox-divider",t.divider),screenReaderText:Ie(t.screenReaderText)}}),Kr=kt(function(t){return{optionText:Ie("ms-ComboBox-optionText",t.optionText),root:Ie("ms-ComboBox-option",t.root,{selectors:{":hover":t.rootHovered,":focus":t.rootFocused,":active":t.rootPressed}}),optionTextWrapper:Ie(t.optionTextWrapper)}}),Ne;(function(t){t[t.backward=-1]="backward",t[t.none=0]="none",t[t.forward=1]="forward"})(Ne||(Ne={}));var tt;(function(t){t[t.clearAll=-2]="clearAll",t[t.default=-1]="default"})(tt||(tt={}));var od=250,rd=500,sd=1e3,id=l.exports.memo(function(t){var e=t.render;return e()},function(t,e){t.render;var o=So(t,["render"]);e.render;var n=So(e,["render"]);return cl(o,n)}),ad="ComboBox",ld={options:[],allowFreeform:!1,autoComplete:"on",buttonIconProps:{iconName:"ChevronDown"}};function ud(t){var e=t.options,o=t.defaultSelectedKey,n=t.selectedKey,r=l.exports.useState(function(){return zr(e,dd(o,n))}),s=r[0],i=r[1],a=l.exports.useState(e),c=a[0],p=a[1],m=l.exports.useState(),x=m[0],g=m[1];return l.exports.useEffect(function(){if(n!==void 0){var d=Eo(n),h=zr(e,d);i(h)}p(e)},[e,n]),l.exports.useEffect(function(){n===null&&g(void 0)},[n]),[s,i,c,p,x,g]}var rr=l.exports.forwardRef(function(t,e){var o=Rs(ld,t);o.ref;var n=So(o,["ref"]),r=l.exports.useRef(null),s=$n(r,e),i=ud(n),a=i[0],c=i[1],p=i[2],m=i[3],x=i[4],g=i[5];return B(cd,{...D({},n,{hoisted:{mergedRootRef:s,rootRef:r,selectedIndices:a,setSelectedIndices:c,currentOptions:p,setCurrentOptions:m,suggestedDisplayValue:x,setSuggestedDisplayValue:g}})})});rr.displayName=ad;function Ti(t,e){for(var o=ku(t),n=0;n<o.length;n++){var r=o[n];if(e(r))return r;var s=Ti(r,e);if(s)return s}return null}var cd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return n._autofill=l.exports.createRef(),n._comboBoxWrapper=l.exports.createRef(),n._comboBoxMenu=l.exports.createRef(),n._selectedElement=l.exports.createRef(),n.focus=function(r,s){n.props.disabled||(n._autofill.current&&(s?dl(n._autofill.current):n._autofill.current.focus(),r&&n.setState({isOpen:!0})),n._hasFocus()||n.setState({focusState:"focused"}))},n.dismissMenu=function(){var r=n.state.isOpen;r&&n.setState({isOpen:!1})},n._onUpdateValueInAutofillWillReceiveProps=function(){var r=n._autofill.current;if(!r||r.value===null||r.value===void 0)return null;var s=st(n._currentVisibleValue);return r.value!==s?s:r.value},n._renderComboBoxWrapper=function(r,s){var i=n.props,a=i.label,c=i.disabled,p=i.ariaLabel,m=i.ariaDescribedBy,x=m===void 0?n.props["aria-describedby"]:m,g=i.required,d=i.errorMessage,h=i.buttonIconProps,f=i.isButtonAriaHidden,b=f===void 0?!0:f,v=i.title,C=i.placeholder,S=i.tabIndex,T=i.autofill,O=i.iconButtonProps,R=i.hoisted.suggestedDisplayValue,A=n.state.isOpen,F=n._hasFocus()&&n.props.multiSelect&&r?r:C,G=[n.props["aria-labelledby"],a&&n._id+"-label"].join(" ").trim();return Ce("div",{"data-ktp-target":!0,ref:n._comboBoxWrapper,id:n._id+"wrapper",className:n._classNames.root,"aria-owns":A?n._id+"-list":void 0,children:[B(Yc,{...D({"data-ktp-execute-target":!0,"data-is-interactable":!c,componentRef:n._autofill,id:n._id+"-input",className:n._classNames.input,type:"text",onFocus:n._onFocus,onBlur:n._onBlur,onKeyDown:n._onInputKeyDown,onKeyUp:n._onInputKeyUp,onClick:n._onAutofillClick,onTouchStart:n._onTouchStart,onInputValueChange:n._onInputChange,"aria-expanded":A,"aria-autocomplete":n._getAriaAutoCompleteValue(),role:"combobox",readOnly:c,"aria-labelledby":G||void 0,"aria-label":p&&!a?p:void 0,"aria-describedby":d!==void 0?pl(x,s):x,"aria-activedescendant":n._getAriaActiveDescendantValue(),"aria-required":g,"aria-disabled":c,"aria-controls":A?n._id+"-list":void 0,spellCheck:!1,defaultVisibleValue:n._currentVisibleValue,suggestedDisplayValue:R,updateValueInWillReceiveProps:n._onUpdateValueInAutofillWillReceiveProps,shouldSelectFullInputValueInComponentDidUpdate:n._onShouldSelectFullInputValueInAutofillComponentDidUpdate,title:v,preventValueSelection:!n._hasFocus(),placeholder:F,tabIndex:c?-1:S},T)}),B(ye,{...D({className:"ms-ComboBox-CaretDown-button",styles:n._getCaretButtonStyles(),role:"presentation","aria-hidden":b,"data-is-focusable":!1,tabIndex:-1,onClick:n._onComboBoxClick,onBlur:n._onBlur,iconProps:h,disabled:c,checked:A},O)})]})},n._onShouldSelectFullInputValueInAutofillComponentDidUpdate=function(){return n._currentVisibleValue===n.props.hoisted.suggestedDisplayValue},n._getVisibleValue=function(){var r=n.props,s=r.text,i=r.allowFreeform,a=r.autoComplete,c=r.hoisted,p=c.suggestedDisplayValue,m=c.selectedIndices,x=c.currentOptions,g=n.state,d=g.currentPendingValueValidIndex,h=g.currentPendingValue,f=g.isOpen,b=Ve(x,d);if(!(f&&b)&&s&&h==null)return s;if(n.props.multiSelect)if(n._hasFocus()){var v=-1;return a==="on"&&b&&(v=d),n._getPendingString(h,x,v)}else return n._getMultiselectDisplayString(m,x,p);else{var v=n._getFirstSelectedIndex();return i?(a==="on"&&b&&(v=d),n._getPendingString(h,x,v)):b&&a==="on"?(v=d,st(h)):!n.state.isOpen&&h?Ve(x,v)?h:st(p):Ve(x,v)?We(x[v]):st(p)}},n._onInputChange=function(r){if(n.props.disabled){n._handleInputWhenDisabled(null);return}n.props.onInputValueChange&&n.props.onInputValueChange(r),n.props.allowFreeform?n._processInputChangeWithFreeform(r):n._processInputChangeWithoutFreeform(r)},n._onFocus=function(){var r,s;(s=(r=n._autofill.current)===null||r===void 0?void 0:r.inputElement)===null||s===void 0||s.select(),n._hasFocus()||n.setState({focusState:"focusing"})},n._onResolveOptions=function(){if(n.props.onResolveOptions){var r=n.props.onResolveOptions(_t([],n.props.hoisted.currentOptions));Array.isArray(r)?n.props.hoisted.setCurrentOptions(r):r&&r.then&&(n._currentPromise=r,r.then(function(s){r===n._currentPromise&&n.props.hoisted.setCurrentOptions(s)}))}},n._onBlur=function(r){var s,i,a=r.relatedTarget;if(r.relatedTarget===null&&(a=document.activeElement),a){var c=(s=n.props.hoisted.rootRef.current)===null||s===void 0?void 0:s.contains(a),p=(i=n._comboBoxMenu.current)===null||i===void 0?void 0:i.contains(a),m=n._comboBoxMenu.current&&fl(n._comboBoxMenu.current,function(x){return x===a});if(c||p||m){m&&n._hasFocus()&&(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r),r.preventDefault(),r.stopPropagation();return}}n._hasFocus()&&(n.setState({focusState:"none"}),(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r))},n._onRenderContainer=function(r,s){var i=r.onRenderList,a=r.calloutProps,c=r.dropdownWidth,p=r.dropdownMaxWidth,m=r.onRenderUpperContent,x=m===void 0?n._onRenderUpperContent:m,g=r.onRenderLowerContent,d=g===void 0?n._onRenderLowerContent:g,h=r.useComboBoxAsMenuWidth,f=r.persistMenu,b=r.shouldRestoreFocus,v=b===void 0?!0:b,C=n.state.isOpen,S=n._id,T=h&&n._comboBoxWrapper.current?n._comboBoxWrapper.current.clientWidth+2:void 0;return Ce(Ls,{...D({isBeakVisible:!1,gapSpace:0,doNotLayer:!1,directionalHint:Kn.bottomLeftEdge,directionalHintFixed:!1},a,{onLayerMounted:n._onLayerMounted,className:Ko(n._classNames.callout,a?.className),target:n._comboBoxWrapper.current,onDismiss:n._onDismiss,onMouseDown:n._onCalloutMouseDown,onScroll:n._onScroll,setInitialFocus:!1,calloutWidth:h&&n._comboBoxWrapper.current?T&&T:c,calloutMaxWidth:p||T,hidden:f?!C:void 0,shouldRestoreFocus:v}),children:[x(n.props,n._onRenderUpperContent),B("div",{className:n._classNames.optionsContainerWrapper,ref:n._comboBoxMenu,children:i?.(D(D({},r),{id:S}),n._onRenderList)}),d(n.props,n._onRenderLowerContent)]})},n._onLayerMounted=function(){n._onCalloutLayerMounted(),n._async.setTimeout(function(){n._scrollIntoView()},0),n.props.calloutProps&&n.props.calloutProps.onLayerMounted&&n.props.calloutProps.onLayerMounted()},n._onRenderLabel=function(r){var s=r.props,i=s.label,a=s.disabled,c=s.required;return i?Ce(zn,{id:n._id+"-label",disabled:a,required:c,className:n._classNames.label,children:[i,r.multiselectAccessibleText&&B("span",{className:n._classNames.screenReaderText,children:r.multiselectAccessibleText})]}):null},n._onRenderList=function(r){var s=r.onRenderItem,i=s===void 0?n._onRenderItem:s,a=r.label,c=r.ariaLabel,p=r.multiSelect,m={items:[]},x=[],g=function(){var f=m.id?[B("div",{role:"group","aria-labelledby":m.id,children:m.items},m.id)]:m.items;x=_t(_t([],x),f),m={items:[]}},d=function(f,b){switch(f.itemType){case _e.Header:m.items.length>0&&g();var v=n._id+f.key;m.items.push(i(D(D({id:v},f),{index:b}),n._onRenderItem)),m.id=v;break;case _e.Divider:b>0&&m.items.push(i(D(D({},f),{index:b}),n._onRenderItem)),m.items.length>0&&g();break;default:m.items.push(i(D(D({},f),{index:b}),n._onRenderItem))}};r.options.forEach(function(f,b){d(f,b)}),m.items.length>0&&g();var h=n._id;return B("div",{id:h+"-list",className:n._classNames.optionsContainer,"aria-labelledby":a&&h+"-label","aria-label":c&&!a?c:void 0,"aria-multiselectable":p?"true":void 0,role:"listbox",children:x})},n._onRenderItem=function(r){switch(r.itemType){case _e.Divider:return n._renderSeparator(r);case _e.Header:return n._renderHeader(r);default:return n._renderOption(r)}},n._onRenderLowerContent=function(){return null},n._onRenderUpperContent=function(){return null},n._renderOption=function(r){var s=n.props.onRenderOption,i=s===void 0?n._onRenderOptionContent:s,a=n._id,c=n._isOptionSelected(r.index),p=n._isOptionChecked(r.index),m=n._isOptionIndeterminate(r.index),x=n._getCurrentOptionStyles(r),g=Kr(n._getCurrentOptionStyles(r)),d=r.title,h=function(){return i(r,n._onRenderOptionContent)},f=function(){return n.props.multiSelect?B(Ws,{id:a+"-list"+r.index,ariaLabel:r.ariaLabel,styles:x,className:"ms-ComboBox-option",onChange:n._onItemClick(r),label:r.text,checked:p,indeterminate:m,title:d,disabled:r.disabled,onRenderLabel:h,inputProps:D({"aria-selected":p?"true":"false",role:"option"},{"data-index":r.index,"data-is-focusable":!0})},r.key):B(bl,{id:a+"-list"+r.index,"data-index":r.index,styles:x,checked:c,className:"ms-ComboBox-option",onClick:n._onItemClick(r),onMouseEnter:n._onOptionMouseEnter.bind(n,r.index),onMouseMove:n._onOptionMouseMove.bind(n,r.index),onMouseLeave:n._onOptionMouseLeave,role:"option","aria-selected":c?"true":"false",ariaLabel:r.ariaLabel,disabled:r.disabled,title:d,children:B("span",{className:g.optionTextWrapper,ref:c?n._selectedElement:void 0,children:i(r,n._onRenderOptionContent)})},r.key)};return B(id,{index:r.index,disabled:r.disabled,isSelected:c,isChecked:p,isIndeterminate:m,text:r.text,render:f,data:r.data},r.key)},n._onCalloutMouseDown=function(r){r.preventDefault()},n._onScroll=function(){var r;!n._isScrollIdle&&n._scrollIdleTimeoutId!==void 0?(n._async.clearTimeout(n._scrollIdleTimeoutId),n._scrollIdleTimeoutId=void 0):n._isScrollIdle=!1,!((r=n.props.calloutProps)===null||r===void 0)&&r.onScroll&&n.props.calloutProps.onScroll(),n._scrollIdleTimeoutId=n._async.setTimeout(function(){n._isScrollIdle=!0},od)},n._onRenderOptionContent=function(r){var s=Kr(n._getCurrentOptionStyles(r));return B("span",{className:s.optionText,children:r.text})},n._onDismiss=function(){var r=n.props.onMenuDismiss;r&&r(),n.props.persistMenu&&n._onCalloutLayerMounted(),n._setOpenStateAndFocusOnClose(!1,!1),n._resetSelectedIndex()},n._onAfterClearPendingInfo=function(){n._processingClearPendingInfo=!1},n._onInputKeyDown=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.autoComplete,p=s.hoisted.currentOptions,m=n.state,x=m.isOpen,g=m.currentPendingValueValidIndexOnHover;if(n._lastKeyDownWasAltOrMeta=qr(r),i){n._handleInputWhenDisabled(r);return}var d=n._getPendingSelectedIndex(!1);switch(r.which){case J.enter:n._autofill.current&&n._autofill.current.inputElement&&n._autofill.current.inputElement.select(),n._submitPendingValue(r),n.props.multiSelect&&x?n.setState({currentPendingValueValidIndex:d}):(x||(!a||n.state.currentPendingValue===void 0||n.state.currentPendingValue===null||n.state.currentPendingValue.length<=0)&&n.state.currentPendingValueValidIndex<0)&&n.setState({isOpen:!x});break;case J.tab:n.props.multiSelect||n._submitPendingValue(r),x&&n._setOpenStateAndFocusOnClose(!x,!1);return;case J.escape:if(n._resetSelectedIndex(),x)n.setState({isOpen:!1});else return;break;case J.up:if(g===tt.clearAll&&(d=n.props.hoisted.currentOptions.length),r.altKey||r.metaKey){if(x){n._setOpenStateAndFocusOnClose(!x,!0);break}return}r.preventDefault(),n._setPendingInfoFromIndexAndDirection(d,Ne.backward);break;case J.down:r.altKey||r.metaKey?n._setOpenStateAndFocusOnClose(!0,!0):(g===tt.clearAll&&(d=-1),r.preventDefault(),n._setPendingInfoFromIndexAndDirection(d,Ne.forward));break;case J.home:case J.end:if(a)return;d=-1;var h=Ne.forward;r.which===J.end&&(d=p.length,h=Ne.backward),n._setPendingInfoFromIndexAndDirection(d,h);break;case J.space:if(!a&&c==="off")break;default:if(r.which>=112&&r.which<=123||r.keyCode===J.alt||r.key==="Meta")return;if(!a&&c==="on"){n._onInputChange(r.key);break}return}r.stopPropagation(),r.preventDefault()},n._onInputKeyUp=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.autoComplete,p=n.state.isOpen,m=n._lastKeyDownWasAltOrMeta&&qr(r);n._lastKeyDownWasAltOrMeta=!1;var x=m&&!(ml()||hl());if(i){n._handleInputWhenDisabled(r);return}switch(r.which){case J.space:!a&&c==="off"&&n._setOpenStateAndFocusOnClose(!p,!!p);return;default:x&&p?n._setOpenStateAndFocusOnClose(!p,!0):(n.state.focusState==="focusing"&&n.props.openOnKeyboardFocus&&n.setState({isOpen:!0}),n.state.focusState!=="focused"&&n.setState({focusState:"focused"}));return}},n._onOptionMouseLeave=function(){n._shouldIgnoreMouseEvent()||n.props.persistMenu&&!n.state.isOpen||n.setState({currentPendingValueValidIndexOnHover:tt.clearAll})},n._onComboBoxClick=function(){var r=n.props.disabled,s=n.state.isOpen;r||(n._setOpenStateAndFocusOnClose(!s,!1),n.setState({focusState:"focused"}))},n._onAutofillClick=function(){var r=n.props,s=r.disabled,i=r.allowFreeform;i&&!s?n.focus(n.state.isOpen||n._processingTouch):n._onComboBoxClick()},n._onTouchStart=function(){n._comboBoxWrapper.current&&!("onpointerdown"in n._comboBoxWrapper)&&n._handleTouchAndPointerEvent()},n._onPointerDown=function(r){r.pointerType==="touch"&&(n._handleTouchAndPointerEvent(),r.preventDefault(),r.stopImmediatePropagation())},Ut(n),n._async=new Bs(n),n._events=new Hs(n),n._id=o.id||ko("ComboBox"),n._isScrollIdle=!0,n._processingTouch=!1,n._gotMouseMove=!1,n._processingClearPendingInfo=!1,n.state={isOpen:!1,focusState:"none",currentPendingValueValidIndex:-1,currentPendingValue:void 0,currentPendingValueValidIndexOnHover:tt.default},n}return Object.defineProperty(e.prototype,"selectedOptions",{get:function(){var o=this.props.hoisted,n=o.currentOptions,r=o.selectedIndices;return xl(n,r)},enumerable:!1,configurable:!0}),e.prototype.componentDidMount=function(){this._comboBoxWrapper.current&&!this.props.disabled&&(this._events.on(this._comboBoxWrapper.current,"focus",this._onResolveOptions,!0),"onpointerdown"in this._comboBoxWrapper.current&&this._events.on(this._comboBoxWrapper.current,"pointerdown",this._onPointerDown,!0))},e.prototype.componentDidUpdate=function(o,n){var r=this,s=this.props,i=s.allowFreeform,a=s.text,c=s.onMenuOpen,p=s.onMenuDismissed,m=s.hoisted.selectedIndices,x=this.state,g=x.isOpen,d=x.currentPendingValueValidIndex;g&&(!n.isOpen||n.currentPendingValueValidIndex!==d)&&this._async.setTimeout(function(){return r._scrollIntoView()},0),this._hasFocus()&&(g||n.isOpen&&!g&&this._focusInputAfterClose&&this._autofill.current&&document.activeElement!==this._autofill.current.inputElement)&&this.focus(void 0,!0),this._focusInputAfterClose&&(n.isOpen&&!g||this._hasFocus()&&(!g&&!this.props.multiSelect&&o.hoisted.selectedIndices&&m&&o.hoisted.selectedIndices[0]!==m[0]||!i||a!==o.text))&&this._onFocus(),this._notifyPendingValueChanged(n),g&&!n.isOpen&&c&&c(),!g&&n.isOpen&&p&&p()},e.prototype.componentWillUnmount=function(){this._async.dispose(),this._events.dispose()},e.prototype.render=function(){var o=this._id,n=o+"-error",r=this.props,s=r.className,i=r.disabled,a=r.required,c=r.errorMessage,p=r.onRenderContainer,m=p===void 0?this._onRenderContainer:p,x=r.onRenderLabel,g=x===void 0?this._onRenderLabel:x,d=r.onRenderList,h=d===void 0?this._onRenderList:d,f=r.onRenderItem,b=f===void 0?this._onRenderItem:f,v=r.onRenderOption,C=v===void 0?this._onRenderOptionContent:v,S=r.allowFreeform,T=r.styles,O=r.theme,R=r.persistMenu,A=r.multiSelect,F=r.hoisted,G=F.suggestedDisplayValue,q=F.selectedIndices,ue=F.currentOptions,se=this.state.isOpen;this._currentVisibleValue=this._getVisibleValue();var X=A?this._getMultiselectDisplayString(q,ue,G):void 0,de=Gn(this.props,Vs,["onChange","value","aria-describedby","aria-labelledby"]),he=!!(c&&c.length>0);this._classNames=this.props.getClassNames?this.props.getClassNames(O,!!se,!!i,!!a,!!this._hasFocus(),!!S,!!he,s):nd(td(O,T),s,!!se,!!i,!!a,!!this._hasFocus(),!!S,!!he);var te=this._renderComboBoxWrapper(X,n);return Ce("div",{...D({},de,{ref:this.props.hoisted.mergedRootRef,className:this._classNames.container}),children:[g({props:this.props,multiselectAccessibleText:X},this._onRenderLabel),te,(R||se)&&m(D(D({},this.props),{onRenderList:h,onRenderItem:b,onRenderOption:C,options:ue.map(function(be,w){return D(D({},be),{index:w})}),onDismiss:this._onDismiss}),this._onRenderContainer),he&&B("div",{role:"alert",id:n,className:this._classNames.errorMessage,children:c})]})},e.prototype._getPendingString=function(o,n,r){return o??(Ve(n,r)?We(n[r]):"")},e.prototype._getMultiselectDisplayString=function(o,n,r){for(var s=[],i=0;o&&i<o.length;i++){var a=o[i];n[a].itemType!==_e.SelectAll&&s.push(Ve(n,a)?n[a].text:st(r))}var c=this.props.multiSelectDelimiter,p=c===void 0?", ":c;return s.join(p)},e.prototype._processInputChangeWithFreeform=function(o){var n=this.props.hoisted.currentOptions,r=-1;if(o===""){var s=n.map(function(p,m){return D(D({},p),{index:m})}).filter(function(p){return yn(p)&&We(p)===o});s.length===1&&(r=s[0].index),this._setPendingInfo(o,r,o);return}var i=o;o=o.toLocaleLowerCase();var a="";if(this.props.autoComplete==="on"){var s=n.map(function(m,x){return D(D({},m),{index:x})}).filter(function(m){return yn(m)&&We(m).toLocaleLowerCase().indexOf(o)===0});if(s.length>0){var c=We(s[0]);a=c.toLocaleLowerCase()!==o?c:"",r=s[0].index}}else{var s=n.map(function(m,x){return D(D({},m),{index:x})}).filter(function(m){return yn(m)&&We(m).toLocaleLowerCase()===o});s.length===1&&(r=s[0].index)}this._setPendingInfo(i,r,a)},e.prototype._processInputChangeWithoutFreeform=function(o){var n=this,r=this.props.hoisted.currentOptions,s=this.state,i=s.currentPendingValue,a=s.currentPendingValueValidIndex;if(this.props.autoComplete==="on"&&o!==""){this._autoCompleteTimeout&&(this._async.clearTimeout(this._autoCompleteTimeout),this._autoCompleteTimeout=void 0,o=st(i)+o);var c=o;o=o.toLocaleLowerCase();var p=r.map(function(x,g){return D(D({},x),{index:g})}).filter(function(x){return yn(x)&&x.text.toLocaleLowerCase().indexOf(o)===0});p.length>0&&this._setPendingInfo(c,p[0].index,We(p[0])),this._autoCompleteTimeout=this._async.setTimeout(function(){n._autoCompleteTimeout=void 0},sd);return}var m=a>=0?a:this._getFirstSelectedIndex();this._setPendingInfoFromIndex(m)},e.prototype._getFirstSelectedIndex=function(){var o=this.props.hoisted.selectedIndices;return o?.length?o[0]:-1},e.prototype._getNextSelectableIndex=function(o,n){var r=this.props.hoisted.currentOptions,s=o+n;if(s=Math.max(0,Math.min(r.length-1,s)),!Ve(r,s))return-1;var i=r[s];if(!fo(i)||i.hidden===!0)if(n!==Ne.none&&(s>0&&n<Ne.none||s>=0&&s<r.length&&n>Ne.none))s=this._getNextSelectableIndex(s,n);else return o;return s},e.prototype._setSelectedIndex=function(o,n,r){r===void 0&&(r=Ne.none);var s=this.props,i=s.onChange,a=s.onPendingValueChanged,c=s.hoisted,p=c.selectedIndices,m=c.currentOptions,x=p?p.slice():[],g=m.slice();if(o=this._getNextSelectableIndex(o,r),!!Ve(m,o)){if(this.props.multiSelect||x.length<1||x.length===1&&x[0]!==o){var d=D({},m[o]);if(!d||d.disabled)return;if(this.props.multiSelect)if(d.selected=d.selected!==void 0?!d.selected:x.indexOf(o)<0,d.itemType===_e.SelectAll)x=[],d.selected?m.forEach(function(v,C){!v.disabled&&fo(v)&&(x.push(C),g[C]=D(D({},v),{selected:!0}))}):g=m.map(function(v){return D(D({},v),{selected:!1})});else{d.selected&&x.indexOf(o)<0?x.push(o):!d.selected&&x.indexOf(o)>=0&&(x=x.filter(function(v){return v!==o})),g[o]=d;var h=g.filter(function(v){return v.itemType===_e.SelectAll})[0];if(h){var f=this._isSelectAllChecked(x),b=g.indexOf(h);f?(x.push(b),g[b]=D(D({},h),{selected:!0})):(x=x.filter(function(v){return v!==b}),g[b]=D(D({},h),{selected:!1}))}}else x[0]=o;n.persist(),this.props.selectedKey||this.props.selectedKey===null?this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1):(this.props.hoisted.setSelectedIndices(x),this.props.hoisted.setCurrentOptions(g),this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1)),i&&i(n,d,o,We(d))}this.props.multiSelect&&this.state.isOpen||this._clearPendingInfo()}},e.prototype._submitPendingValue=function(o){var n,r=this.props,s=r.onChange,i=r.allowFreeform,a=r.autoComplete,c=r.multiSelect,p=r.hoisted,m=p.currentOptions,x=this.state,g=x.currentPendingValue,d=x.currentPendingValueValidIndex,h=x.currentPendingValueValidIndexOnHover,f=this.props.hoisted.selectedIndices;if(!this._processingClearPendingInfo){if(i){if(g==null){h>=0&&(this._setSelectedIndex(h,o),this._clearPendingInfo());return}if(Ve(m,d)){var b=We(m[d]).toLocaleLowerCase(),v=this._autofill.current;if(g.toLocaleLowerCase()===b||a&&b.indexOf(g.toLocaleLowerCase())===0&&v?.isValueSelected&&g.length+(v.selectionEnd-v.selectionStart)===b.length||((n=v?.inputElement)===null||n===void 0?void 0:n.value.toLocaleLowerCase())===b){if(this._setSelectedIndex(d,o),c&&this.state.isOpen)return;this._clearPendingInfo();return}}if(s)s&&s(o,void 0,void 0,g);else{var C={key:g||ko(),text:st(g)};c&&(C.selected=!0);var S=m.concat([C]);f&&(c||(f=[]),f.push(S.length-1)),p.setCurrentOptions(S),p.setSelectedIndices(f)}}else d>=0?this._setSelectedIndex(d,o):h>=0&&this._setSelectedIndex(h,o);this._clearPendingInfo()}},e.prototype._onCalloutLayerMounted=function(){this._gotMouseMove=!1},e.prototype._renderSeparator=function(o){var n=o.index,r=o.key;return n&&n>0?B("div",{role:"separator",className:this._classNames.divider},r):null},e.prototype._renderHeader=function(o){var n=this.props.onRenderOption,r=n===void 0?this._onRenderOptionContent:n;return B("div",{id:o.id,className:this._classNames.header,children:r(o,this._onRenderOptionContent)},o.key)},e.prototype._isOptionHighlighted=function(o){var n=this.state.currentPendingValueValidIndexOnHover;return n===tt.clearAll?!1:n>=0?n===o:this._isOptionSelected(o)},e.prototype._isOptionSelected=function(o){return this._getPendingSelectedIndex(!0)===o},e.prototype._isOptionChecked=function(o){if(this.props.multiSelect&&o!==void 0&&this.props.hoisted.selectedIndices){var n=-1;return n=this.props.hoisted.selectedIndices.indexOf(o),n>=0}return!1},e.prototype._isOptionIndeterminate=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted;if(r&&o!==void 0&&s.selectedIndices&&s.currentOptions){var i=s.currentOptions[o];if(i&&i.itemType===_e.SelectAll)return s.selectedIndices.length>0&&!this._isSelectAllChecked()}return!1},e.prototype._isSelectAllChecked=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted,i=s.currentOptions.find(function(x){return x.itemType===_e.SelectAll}),a=o||s.selectedIndices;if(!r||!a||!i)return!1;var c=s.currentOptions.indexOf(i),p=a.filter(function(x){return x!==c}),m=s.currentOptions.filter(function(x){return!x.disabled&&x.itemType!==_e.SelectAll&&fo(x)});return p.length===m.length},e.prototype._getPendingSelectedIndex=function(o){var n=this.state,r=n.currentPendingValueValidIndex,s=n.currentPendingValue;return r>=0||o&&s!==null&&s!==void 0?r:this.props.multiSelect?0:this._getFirstSelectedIndex()},e.prototype._scrollIntoView=function(){var o=this.props,n=o.onScrollToItem,r=o.scrollSelectedToTop,s=this._getPendingSelectedIndex(!0);if(n){n(s>=0?s:this._getFirstSelectedIndex());return}var i=this._selectedElement.current;if(this.props.multiSelect&&this._comboBoxMenu.current&&(i=Ti(this._comboBoxMenu.current,function(C){var S;return((S=C.dataset)===null||S===void 0?void 0:S.index)===s.toString()})),i&&i.offsetParent){var a=!0;if(this._comboBoxMenu.current&&this._comboBoxMenu.current.offsetParent){var c=this._comboBoxMenu.current.offsetParent,p=i.offsetParent,m=p,x=m.offsetHeight,g=m.offsetTop,d=c,h=d.offsetHeight,f=d.scrollTop,b=g<f,v=g+x>f+h;b||r?(a=!1,c.scrollTo(0,g)):v&&c.scrollTo(0,g-h+x)}else i.offsetParent.scrollIntoView(a)}},e.prototype._onItemClick=function(o){var n=this,r=this.props.onItemClick,s=o.index;return function(i){n.props.multiSelect||(n._autofill.current&&n._autofill.current.focus(),n.setState({isOpen:!1})),r&&r(i,o,s),n._setSelectedIndex(s,i)}},e.prototype._resetSelectedIndex=function(){var o=this.props.hoisted.currentOptions;this._clearPendingInfo();var n=this._getFirstSelectedIndex();n>0&&n<o.length?this.props.hoisted.setSuggestedDisplayValue(o[n].text):this.props.text&&this.props.hoisted.setSuggestedDisplayValue(this.props.text)},e.prototype._clearPendingInfo=function(){this._processingClearPendingInfo=!0,this.props.hoisted.setSuggestedDisplayValue(void 0),this.setState({currentPendingValue:void 0,currentPendingValueValidIndex:-1,currentPendingValueValidIndexOnHover:tt.default},this._onAfterClearPendingInfo)},e.prototype._setPendingInfo=function(o,n,r){n===void 0&&(n=-1),!this._processingClearPendingInfo&&(this.props.hoisted.setSuggestedDisplayValue(r),this.setState({currentPendingValue:st(o),currentPendingValueValidIndex:n,currentPendingValueValidIndexOnHover:tt.default}))},e.prototype._setPendingInfoFromIndex=function(o){var n=this.props.hoisted.currentOptions;if(o>=0&&o<n.length){var r=n[o];this._setPendingInfo(We(r),o,We(r))}else this._clearPendingInfo()},e.prototype._setPendingInfoFromIndexAndDirection=function(o,n){var r=this.props.hoisted.currentOptions;n===Ne.forward&&o>=r.length-1?o=-1:n===Ne.backward&&o<=0&&(o=r.length);var s=this._getNextSelectableIndex(o,n);o===s?n===Ne.forward?o=this._getNextSelectableIndex(-1,n):n===Ne.backward&&(o=this._getNextSelectableIndex(r.length,n)):o=s,Ve(r,o)&&this._setPendingInfoFromIndex(o)},e.prototype._notifyPendingValueChanged=function(o){var n=this.props.onPendingValueChanged;if(!!n){var r=this.props.hoisted.currentOptions,s=this.state,i=s.currentPendingValue,a=s.currentPendingValueValidIndex,c=s.currentPendingValueValidIndexOnHover,p=void 0,m=void 0;c!==o.currentPendingValueValidIndexOnHover&&Ve(r,c)?p=c:a!==o.currentPendingValueValidIndex&&Ve(r,a)?p=a:i!==o.currentPendingValue&&(m=i),(p!==void 0||m!==void 0||this._hasPendingValue)&&(n(p!==void 0?r[p]:void 0,p,m),this._hasPendingValue=p!==void 0||m!==void 0)}},e.prototype._setOpenStateAndFocusOnClose=function(o,n){this._focusInputAfterClose=n,this.setState({isOpen:o})},e.prototype._onOptionMouseEnter=function(o){this._shouldIgnoreMouseEvent()||this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._onOptionMouseMove=function(o){this._gotMouseMove=!0,!(!this._isScrollIdle||this.state.currentPendingValueValidIndexOnHover===o)&&this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._shouldIgnoreMouseEvent=function(){return!this._isScrollIdle||!this._gotMouseMove},e.prototype._handleInputWhenDisabled=function(o){this.props.disabled&&(this.state.isOpen&&this.setState({isOpen:!1}),o!==null&&o.which!==J.tab&&o.which!==J.escape&&(o.which<112||o.which>123)&&(o.stopPropagation(),o.preventDefault()))},e.prototype._handleTouchAndPointerEvent=function(){var o=this;this._lastTouchTimeoutId!==void 0&&(this._async.clearTimeout(this._lastTouchTimeoutId),this._lastTouchTimeoutId=void 0),this._processingTouch=!0,this._lastTouchTimeoutId=this._async.setTimeout(function(){o._processingTouch=!1,o._lastTouchTimeoutId=void 0},rd)},e.prototype._getCaretButtonStyles=function(){var o=this.props.caretDownButtonStyles;return ed(this.props.theme,o)},e.prototype._getCurrentOptionStyles=function(o){var n=this.props.comboBoxOptionStyles,r=o.styles;return Qc(this.props.theme,n,r,this._isPendingOption(o),o.hidden,this._isOptionHighlighted(o.index))},e.prototype._getAriaActiveDescendantValue=function(){var o=this.props.hoisted.selectedIndices,n=this.state,r=n.isOpen,s=n.currentPendingValueValidIndex,i=r&&o?.length?this._id+"-list"+o[0]:void 0;return r&&this._hasFocus()&&s!==-1&&(i=this._id+"-list"+s),i},e.prototype._getAriaAutoCompleteValue=function(){var o=!this.props.disabled&&this.props.autoComplete==="on";return o?this.props.allowFreeform?"inline":"both":"list"},e.prototype._isPendingOption=function(o){return o&&o.index===this.state.currentPendingValueValidIndex},e.prototype._hasFocus=function(){return this.state.focusState!=="none"},e=zo([gl("ComboBox",["theme","styles"],!0)],e),e}(l.exports.Component);function zr(t,e){if(!t||!e)return[];var o={};t.forEach(function(a,c){a.selected&&(o[c]=!0)});for(var n=function(a){var c=vl(t,function(p){return p.key===a});c>-1&&(o[c]=!0)},r=0,s=e;r<s.length;r++){var i=s[r];n(i)}return Object.keys(o).map(Number).sort()}function dd(t,e){var o=Eo(t);return o.length?o:Eo(e)}function Eo(t){return t===void 0?[]:t instanceof Array?t:[t]}function st(t){return t||""}function Ve(t,e){return!!t&&e>=0&&e<t.length}function yn(t){return t.itemType!==_e.Header&&t.itemType!==_e.Divider&&t.itemType!==_e.SelectAll}function fo(t){return t.itemType!==_e.Header&&t.itemType!==_e.Divider}function We(t){return t.useAriaLabelAsText&&t.ariaLabel?t.ariaLabel:t.text}function qr(t){return t.which===J.alt||t.key==="Meta"}var ut;(function(t){t[t.normal=0]="normal",t[t.largeHeader=1]="largeHeader",t[t.close=2]="close"})(ut||(ut={}));var Ii=To.durationValue2,pd={root:"ms-Modal",main:"ms-Dialog-main",scrollableContent:"ms-Modal-scrollableContent",isOpen:"is-open",layer:"ms-Modal-Layer"},fd=function(t){var e,o=t.className,n=t.containerClassName,r=t.scrollableContentClassName,s=t.isOpen,i=t.isVisible,a=t.hasBeenOpened,c=t.modalRectangleTop,p=t.theme,m=t.topOffsetFixed,x=t.isModeless,g=t.layerClassName,d=t.isDefaultDragHandle,h=t.windowInnerHeight,f=p.palette,b=p.effects,v=p.fonts,C=Tt(pd,p);return{root:[C.root,v.medium,{backgroundColor:"transparent",position:"fixed",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,pointerEvents:"none",transition:"opacity "+Ii},m&&typeof c=="number"&&a&&{alignItems:"flex-start"},s&&C.isOpen,i&&{opacity:1},i&&!x&&{pointerEvents:"auto"},o],main:[C.main,{boxShadow:b.elevation64,borderRadius:b.roundedCorner2,backgroundColor:f.white,boxSizing:"border-box",position:"relative",textAlign:"left",outline:"3px solid transparent",maxHeight:"calc(100% - 32px)",maxWidth:"calc(100% - 32px)",minHeight:"176px",minWidth:"288px",overflowY:"auto",zIndex:x?yl.Layer:void 0},x&&{pointerEvents:"auto"},m&&typeof c=="number"&&a&&{top:c},d&&{cursor:"move"},n],scrollableContent:[C.scrollableContent,{overflowY:"auto",flexGrow:1,maxHeight:"100vh",selectors:(e={},e["@supports (-webkit-overflow-scrolling: touch)"]={maxHeight:h},e)},r],layer:x&&[g,C.layer,{pointerEvents:"none"}],keyboardMoveIconContainer:{position:"absolute",display:"flex",justifyContent:"center",width:"100%",padding:"3px 0px"},keyboardMoveIcon:{fontSize:v.xLargePlus.fontSize,width:"24px"}}},md=kt(function(t,e){return{root:Ie(t,e&&{touchAction:"none",selectors:{"& *":{userSelect:"none"}}})}}),en={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},hd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return n._currentEventType=en.mouse,n._events=[],n._onMouseDown=function(r){var s=l.exports.Children.only(n.props.children).props.onMouseDown;return s&&s(r),n._currentEventType=en.mouse,n._onDragStart(r)},n._onMouseUp=function(r){var s=l.exports.Children.only(n.props.children).props.onMouseUp;return s&&s(r),n._currentEventType=en.mouse,n._onDragStop(r)},n._onTouchStart=function(r){var s=l.exports.Children.only(n.props.children).props.onTouchStart;return s&&s(r),n._currentEventType=en.touch,n._onDragStart(r)},n._onTouchEnd=function(r){var s=l.exports.Children.only(n.props.children).props.onTouchEnd;s&&s(r),n._currentEventType=en.touch,n._onDragStop(r)},n._onDragStart=function(r){if(typeof r.button=="number"&&r.button!==0)return!1;if(!(n.props.handleSelector&&!n._matchesSelector(r.target,n.props.handleSelector)||n.props.preventDragSelector&&n._matchesSelector(r.target,n.props.preventDragSelector))){n._touchId=n._getTouchId(r);var s=n._getControlPosition(r);if(s!==void 0){var i=n._createDragDataFromPosition(s);n.props.onStart&&n.props.onStart(r,i),n.setState({isDragging:!0,lastPosition:s}),n._events=[Or(document.body,n._currentEventType.move,n._onDrag,!0),Or(document.body,n._currentEventType.stop,n._onDragStop,!0)]}}},n._onDrag=function(r){r.type==="touchmove"&&r.preventDefault();var s=n._getControlPosition(r);if(!!s){var i=n._createUpdatedDragData(n._createDragDataFromPosition(s)),a=i.position;n.props.onDragChange&&n.props.onDragChange(r,i),n.setState({position:a,lastPosition:s})}},n._onDragStop=function(r){if(!!n.state.isDragging){var s=n._getControlPosition(r);if(!!s){var i=n._createDragDataFromPosition(s);n.setState({isDragging:!1,lastPosition:void 0}),n.props.onStop&&n.props.onStop(r,i),n.props.position&&n.setState({position:n.props.position}),n._events.forEach(function(a){return a()})}}},n.state={isDragging:!1,position:n.props.position||{x:0,y:0},lastPosition:void 0},n}return e.prototype.componentDidUpdate=function(o){this.props.position&&(!o.position||this.props.position!==o.position)&&this.setState({position:this.props.position})},e.prototype.componentWillUnmount=function(){this._events.forEach(function(o){return o()})},e.prototype.render=function(){var o=l.exports.Children.only(this.props.children),n=o.props,r=this.props.position,s=this.state,i=s.position,a=s.isDragging,c=i.x,p=i.y;return r&&!a&&(c=r.x,p=r.y),l.exports.cloneElement(o,{style:D(D({},n.style),{transform:"translate("+c+"px, "+p+"px)"}),className:md(n.className,this.state.isDragging).root,onMouseDown:this._onMouseDown,onMouseUp:this._onMouseUp,onTouchStart:this._onTouchStart,onTouchEnd:this._onTouchEnd})},e.prototype._getControlPosition=function(o){var n=this._getActiveTouch(o);if(!(this._touchId!==void 0&&!n)){var r=n||o;return{x:r.clientX,y:r.clientY}}},e.prototype._getActiveTouch=function(o){return o.targetTouches&&this._findTouchInTouchList(o.targetTouches)||o.changedTouches&&this._findTouchInTouchList(o.changedTouches)},e.prototype._getTouchId=function(o){var n=o.targetTouches&&o.targetTouches[0]||o.changedTouches&&o.changedTouches[0];if(n)return n.identifier},e.prototype._matchesSelector=function(o,n){if(!o||o===document.body)return!1;var r=o.matches||o.webkitMatchesSelector||o.msMatchesSelector;return r?r.call(o,n)||this._matchesSelector(o.parentElement,n):!1},e.prototype._findTouchInTouchList=function(o){if(this._touchId!==void 0){for(var n=0;n<o.length;n++)if(o[n].identifier===this._touchId)return o[n]}},e.prototype._createDragDataFromPosition=function(o){var n=this.state.lastPosition;return n===void 0?{delta:{x:0,y:0},lastPosition:o,position:o}:{delta:{x:o.x-n.x,y:o.y-n.y},lastPosition:n,position:o}},e.prototype._createUpdatedDragData=function(o){var n=this.state.position;return{position:{x:n.x+o.delta.x,y:n.y+o.delta.y},delta:o.delta,lastPosition:n}},e}(l.exports.Component),Bt={x:0,y:0},xd={isOpen:!1,isDarkOverlay:!0,className:"",containerClassName:"",enableAriaHiddenSiblings:!0},gd=It(),bd=function(t){var e=10;return t.shiftKey?t.ctrlKey||(e=50):t.ctrlKey&&(e=1),e},vd=function(t,e){l.exports.useImperativeHandle(t.componentRef,function(){return{focus:function(){e.current&&e.current.focus()}}},[e])},ji=l.exports.forwardRef(function(t,e){var o,n,r,s,i,a=Rs(xd,t),c=a.allowTouchBodyScroll,p=a.className,m=a.children,x=a.containerClassName,g=a.scrollableContentClassName,d=a.elementToFocusOnDismiss,h=a.firstFocusableSelector,f=a.focusTrapZoneProps,b=a.forceFocusInsideTrap,v=a.disableRestoreFocus,C=v===void 0?a.ignoreExternalFocusing:v,S=a.isBlocking,T=a.isAlert,O=a.isClickableOutsideFocusTrap,R=a.isDarkOverlay,A=a.onDismiss,F=a.layerProps,G=a.overlay,q=a.isOpen,ue=a.titleAriaId,se=a.styles,X=a.subtitleAriaId,de=a.theme,he=a.topOffsetFixed,te=a.responsiveMode,be=a.onLayerDidMount,w=a.isModeless,y=a.dragOptions,I=a.onDismissed,P=a.enableAriaHiddenSiblings,E=l.exports.useRef(null),Q=l.exports.useRef(null),ce=$n(Q,f?.componentRef),ie=l.exports.useRef(null),ge=$n(E,e),pe=Cl(ge),$e=Us("ModalFocusTrapZone",f?.id),j=wl(),$=zc(),H=$.setTimeout,k=$.clearTimeout,xe=l.exports.useState(q),N=xe[0],ae=xe[1],ke=l.exports.useState(q),Qe=ke[0],Yt=ke[1],Cr=l.exports.useState(Bt),wr=Cr[0],mt=Cr[1],_r=l.exports.useState(),Ha=_r[0],Va=_r[1],Sr=dn(!1),kr=Sr[0],Tr=Sr[1],Wa=Tr.toggle,Pt=Tr.setFalse,L=_o(function(){return{onModalCloseTimer:0,allowTouchBodyScroll:c,scrollableContent:null,lastSetCoordinates:Bt,events:new Hs({})}}),no=(y||{}).keepInBounds,Ua=T??(S&&!w),Ga=F===void 0?"":F.className,At=gd(se,{theme:de,className:p,containerClassName:x,scrollableContentClassName:g,isOpen:q,isVisible:Qe,hasBeenOpened:L.hasBeenOpened,modalRectangleTop:Ha,topOffsetFixed:he,isModeless:w,layerClassName:Ga,windowInnerHeight:j?.innerHeight,isDefaultDragHandle:y&&!y.dragHandleSelector}),Ka=D(D({eventBubblingEnabled:!1},F),{onLayerDidMount:F&&F.onLayerDidMount?F.onLayerDidMount:be,insertFirst:w,className:At.layer}),za=l.exports.useCallback(function(fe){fe?L.allowTouchBodyScroll?_l(fe,L.events):Sl(fe,L.events):L.events.off(L.scrollableContent),L.scrollableContent=fe},[L]),qa=function(){var fe=ie.current,V=fe?.getBoundingClientRect();V&&(he&&Va(V.top),no&&(L.minPosition={x:-V.left,y:-V.top},L.maxPosition={x:V.left,y:V.top}))},ht=l.exports.useCallback(function(fe,V){var Le=L.minPosition,Jt=L.maxPosition;return no&&Le&&Jt&&(V=Math.max(Le[fe],V),V=Math.min(Jt[fe],V)),V},[no,L]),Ir=function(){var fe;L.lastSetCoordinates=Bt,Pt(),L.isInKeyboardMoveMode=!1,ae(!1),mt(Bt),(fe=L.disposeOnKeyUp)===null||fe===void 0||fe.call(L),I?.()},Ya=l.exports.useCallback(function(){Pt(),L.isInKeyboardMoveMode=!1},[L,Pt]),Ja=l.exports.useCallback(function(fe,V){mt(function(Le){return{x:ht("x",Le.x+V.delta.x),y:ht("y",Le.y+V.delta.y)}})},[ht]),Za=l.exports.useCallback(function(){Q.current&&Q.current.focus()},[]),Xa=function(){var fe=function(V){if(V.altKey&&V.ctrlKey&&V.keyCode===J.space){V.preventDefault(),V.stopPropagation();return}var Le=V.altKey||V.keyCode===J.escape;if(kr&&Le&&Pt(),L.isInKeyboardMoveMode&&(V.keyCode===J.escape||V.keyCode===J.enter)&&(L.isInKeyboardMoveMode=!1,V.preventDefault(),V.stopPropagation()),L.isInKeyboardMoveMode){var Jt=!0,vn=bd(V);switch(V.keyCode){case J.escape:mt(L.lastSetCoordinates);case J.enter:{L.lastSetCoordinates=Bt;break}case J.up:{mt(function(He){return{x:He.x,y:ht("y",He.y-vn)}});break}case J.down:{mt(function(He){return{x:He.x,y:ht("y",He.y+vn)}});break}case J.left:{mt(function(He){return{x:ht("x",He.x-vn),y:He.y}});break}case J.right:{mt(function(He){return{x:ht("x",He.x+vn),y:He.y}});break}default:Jt=!1}Jt&&(V.preventDefault(),V.stopPropagation())}};L.lastSetCoordinates=wr,Pt(),L.isInKeyboardMoveMode=!0,L.events.on(j,"keydown",fe,!0),L.disposeOnKeyDown=function(){L.events.off(j,"keydown",fe,!0),L.disposeOnKeyDown=void 0}},Qa=function(fe){var V,Le;(V=f?.onBlur)===null||V===void 0||V.call(f,fe),L.lastSetCoordinates=Bt,L.isInKeyboardMoveMode=!1,(Le=L.disposeOnKeyDown)===null||Le===void 0||Le.call(L)},el=function(){var fe=function(V){V.altKey&&V.ctrlKey&&V.keyCode===J.space&&Ol(L.scrollableContent,V.target)&&(Wa(),V.preventDefault(),V.stopPropagation())};L.disposeOnKeyUp||(L.events.on(j,"keyup",fe,!0),L.disposeOnKeyUp=function(){L.events.off(j,"keyup",fe,!0),L.disposeOnKeyUp=void 0})};l.exports.useEffect(function(){k(L.onModalCloseTimer),q&&(requestAnimationFrame(function(){return H(qa,0)}),ae(!0),y&&el(),L.hasBeenOpened=!0,Yt(!0)),!q&&N&&(L.onModalCloseTimer=H(Ir,parseFloat(Ii)*1e3),Yt(!1))},[N,q]),kl(function(){L.events.dispose()}),vd(a,Q);var jr=Ce(Tl,{...D({},f,{id:$e,ref:ie,componentRef:ce,className:Ko(At.main,f?.className),elementToFocusOnDismiss:(o=f?.elementToFocusOnDismiss)!==null&&o!==void 0?o:d,isClickableOutsideFocusTrap:(n=f?.isClickableOutsideFocusTrap)!==null&&n!==void 0?n:w||O||!S,disableRestoreFocus:(r=f?.disableRestoreFocus)!==null&&r!==void 0?r:C,forceFocusInsideTrap:((s=f?.forceFocusInsideTrap)!==null&&s!==void 0?s:b)&&!w,firstFocusableSelector:f?.firstFocusableSelector||h,focusPreviouslyFocusedInnerElement:(i=f?.focusPreviouslyFocusedInnerElement)!==null&&i!==void 0?i:!0,onBlur:L.isInKeyboardMoveMode?Qa:void 0}),children:[y&&L.isInKeyboardMoveMode&&B("div",{className:At.keyboardMoveIconContainer,children:y.keyboardMoveIconProps?B(Xe,{...D({},y.keyboardMoveIconProps)}):B(Xe,{iconName:"move",className:At.keyboardMoveIcon})}),Ce("div",{ref:za,className:At.scrollableContent,"data-is-scrollable":!0,children:[y&&kr&&l.exports.createElement(y.menu,{items:[{key:"move",text:y.moveMenuItemText,onClick:Xa},{key:"close",text:y.closeMenuItemText,onClick:Ir}],onDismiss:Pt,alignTargetEdge:!0,coverTarget:!0,directionalHint:Kn.topLeftEdge,directionalHintFixed:!0,shouldFocusOnMount:!0,target:L.scrollableContent}),m]})]});return N&&pe>=(te||Il.small)&&B(jl,{...D({ref:ge},Ka),children:B(Dl,{role:Ua?"alertdialog":"dialog",ariaLabelledBy:ue,ariaDescribedBy:X,onDismiss:A,shouldRestoreFocus:!C,enableAriaHiddenSiblings:P,"aria-modal":!w,children:Ce("div",{className:At.root,role:w?void 0:"document",children:[!w&&B(Ml,{...D({"aria-hidden":!0,isDarkThemed:R,onClick:S?void 0:A,allowTouchBodyScroll:c},G)}),y?B(hd,{handleSelector:y.dragHandleSelector||"#"+$e,preventDragSelector:"button",onStart:Ya,onDragChange:Ja,onStop:Za,position:wr,children:jr}):jr]})})})||null});ji.displayName="Modal";var sr=jt(ji,fd,void 0,{scope:"Modal",fields:["theme","styles","enableAriaHiddenSiblings"]});sr.displayName="Modal";var yd=It(),Cd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return Ut(n),n}return e.prototype.render=function(){var o=this.props,n=o.className,r=o.styles,s=o.theme;return this._classNames=yd(r,{theme:s,className:n}),B("div",{className:this._classNames.actions,children:B("div",{className:this._classNames.actionsRight,children:this._renderChildrenAsActions()})})},e.prototype._renderChildrenAsActions=function(){var o=this;return l.exports.Children.map(this.props.children,function(n){return n?B("span",{className:o._classNames.action,children:n}):null})},e}(l.exports.Component),wd={actions:"ms-Dialog-actions",action:"ms-Dialog-action",actionsRight:"ms-Dialog-actionsRight"},_d=function(t){var e=t.className,o=t.theme,n=Tt(wd,o);return{actions:[n.actions,{position:"relative",width:"100%",minHeight:"24px",lineHeight:"24px",margin:"16px 0 0",fontSize:"0",selectors:{".ms-Button":{lineHeight:"normal"}}},e],action:[n.action,{margin:"0 4px"}],actionsRight:[n.actionsRight,{textAlign:"right",marginRight:"-4px",fontSize:"0"}]}},Di=jt(Cd,_d,void 0,{scope:"DialogFooter"}),Sd=It(),kd=B(Di,{}).type,Td=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return Ut(n),n}return e.prototype.render=function(){var o=this.props,n=o.showCloseButton,r=o.className,s=o.closeButtonAriaLabel,i=o.onDismiss,a=o.subTextId,c=o.subText,p=o.titleProps,m=p===void 0?{}:p,x=o.titleId,g=o.title,d=o.type,h=o.styles,f=o.theme,b=o.draggableHeaderClassName,v=Sd(h,{theme:f,className:r,isLargeHeader:d===ut.largeHeader,isClose:d===ut.close,draggableHeaderClassName:b}),C=this._groupChildren(),S;return c&&(S=B("p",{className:v.subText,id:a,children:c})),Ce("div",{className:v.content,children:[Ce("div",{className:v.header,children:[B("div",{...D({id:x,role:"heading","aria-level":1},m,{className:Ko(v.title,m.className)}),children:g}),Ce("div",{className:v.topButton,children:[this.props.topButtonsProps.map(function(T,O){return B(ye,{...D({key:T.uniqueId||O},T)})}),(d===ut.close||n&&d!==ut.largeHeader)&&B(ye,{className:v.button,iconProps:{iconName:"Cancel"},ariaLabel:s,onClick:i})]})]}),Ce("div",{className:v.inner,children:[Ce("div",{className:v.innerContent,children:[S,C.contents]}),C.footers]})]})},e.prototype._groupChildren=function(){var o={footers:[],contents:[]};return l.exports.Children.map(this.props.children,function(n){typeof n=="object"&&n!==null&&n.type===kd?o.footers.push(n):o.contents.push(n)}),o},e.defaultProps={showCloseButton:!1,className:"",topButtonsProps:[],closeButtonAriaLabel:"Close"},e=zo([Gs],e),e}(l.exports.Component),Id={contentLgHeader:"ms-Dialog-lgHeader",close:"ms-Dialog--close",subText:"ms-Dialog-subText",header:"ms-Dialog-header",headerLg:"ms-Dialog--lgHeader",button:"ms-Dialog-button ms-Dialog-button--close",inner:"ms-Dialog-inner",content:"ms-Dialog-content",title:"ms-Dialog-title"},jd=function(t){var e,o,n,r=t.className,s=t.theme,i=t.isLargeHeader,a=t.isClose,c=t.hidden,p=t.isMultiline,m=t.draggableHeaderClassName,x=s.palette,g=s.fonts,d=s.effects,h=s.semanticColors,f=Tt(Id,s);return{content:[i&&[f.contentLgHeader,{borderTop:"4px solid "+x.themePrimary}],a&&f.close,{flexGrow:1,overflowY:"hidden"},r],subText:[f.subText,g.medium,{margin:"0 0 24px 0",color:h.bodySubtext,lineHeight:"1.5",wordWrap:"break-word",fontWeight:Fs.regular}],header:[f.header,{position:"relative",width:"100%",boxSizing:"border-box"},a&&f.close,m&&[m,{cursor:"move"}]],button:[f.button,c&&{selectors:{".ms-Icon.ms-Icon--Cancel":{color:h.buttonText,fontSize:Nl.medium}}}],inner:[f.inner,{padding:"0 24px 24px",selectors:(e={},e["@media (min-width: "+oo+"px) and (max-width: "+ro+"px)"]={padding:"0 16px 16px"},e)}],innerContent:[f.content,{position:"relative",width:"100%"}],title:[f.title,g.xLarge,{color:h.bodyText,margin:"0",minHeight:g.xLarge.fontSize,padding:"16px 46px 20px 24px",lineHeight:"normal",selectors:(o={},o["@media (min-width: "+oo+"px) and (max-width: "+ro+"px)"]={padding:"16px 46px 16px 16px"},o)},i&&{color:h.menuHeader},p&&{fontSize:g.xxLarge.fontSize}],topButton:[{display:"flex",flexDirection:"row",flexWrap:"nowrap",position:"absolute",top:"0",right:"0",padding:"15px 15px 0 0",selectors:(n={"> *":{flex:"0 0 auto"},".ms-Dialog-button":{color:h.buttonText},".ms-Dialog-button:hover":{color:h.buttonTextHovered,borderRadius:d.roundedCorner2}},n["@media (min-width: "+oo+"px) and (max-width: "+ro+"px)"]={padding:"15px 8px 0 0"},n)}]}},Dd=jt(Td,jd,void 0,{scope:"DialogContent"}),Md=It(),Od={isDarkOverlay:!1,isBlocking:!1,className:"",containerClassName:"",topOffsetFixed:!1,enableAriaHiddenSiblings:!0},Nd={type:ut.normal,className:"",topButtonsProps:[]},Pd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return n._getSubTextId=function(){var r=n.props,s=r.ariaDescribedById,i=r.modalProps,a=r.dialogContentProps,c=r.subText,p=i&&i.subtitleAriaId||s;return p||(p=(a&&a.subText||c)&&n._defaultSubTextId),p},n._getTitleTextId=function(){var r=n.props,s=r.ariaLabelledById,i=r.modalProps,a=r.dialogContentProps,c=r.title,p=i&&i.titleAriaId||s;return p||(p=(a&&a.title||c)&&n._defaultTitleTextId),p},n._id=ko("Dialog"),n._defaultTitleTextId=n._id+"-title",n._defaultSubTextId=n._id+"-subText",n}return e.prototype.render=function(){var o,n,r,s=this.props,i=s.className,a=s.containerClassName,c=s.contentClassName,p=s.elementToFocusOnDismiss,m=s.firstFocusableSelector,x=s.forceFocusInsideTrap,g=s.styles,d=s.hidden,h=s.disableRestoreFocus,f=h===void 0?s.ignoreExternalFocusing:h,b=s.isBlocking,v=s.isClickableOutsideFocusTrap,C=s.isDarkOverlay,S=s.isOpen,T=S===void 0?!d:S,O=s.onDismiss,R=s.onDismissed,A=s.onLayerDidMount,F=s.responsiveMode,G=s.subText,q=s.theme,ue=s.title,se=s.topButtonsProps,X=s.type,de=s.minWidth,he=s.maxWidth,te=s.modalProps,be=D({onLayerDidMount:A},te?.layerProps),w,y;te?.dragOptions&&!(!((o=te.dragOptions)===null||o===void 0)&&o.dragHandleSelector)&&(y=D({},te.dragOptions),w="ms-Dialog-draggable-header",y.dragHandleSelector="."+w);var I=D(D(D(D({},Od),{elementToFocusOnDismiss:p,firstFocusableSelector:m,forceFocusInsideTrap:x,disableRestoreFocus:f,isClickableOutsideFocusTrap:v,responsiveMode:F,className:i,containerClassName:a,isBlocking:b,isDarkOverlay:C,onDismissed:R}),te),{dragOptions:y,layerProps:be,isOpen:T}),P=D(D(D({className:c,subText:G,title:ue,topButtonsProps:se,type:X},Nd),s.dialogContentProps),{draggableHeaderClassName:w,titleProps:D({id:((n=s.dialogContentProps)===null||n===void 0?void 0:n.titleId)||this._defaultTitleTextId},(r=s.dialogContentProps)===null||r===void 0?void 0:r.titleProps)}),E=Md(g,{theme:q,className:I.className,containerClassName:I.containerClassName,hidden:d,dialogDefaultMinWidth:de,dialogDefaultMaxWidth:he});return B(sr,{...D({},I,{className:E.root,containerClassName:E.main,onDismiss:O||I.onDismiss,subtitleAriaId:this._getSubTextId(),titleAriaId:this._getTitleTextId()}),children:B(Dd,{...D({subTextId:this._defaultSubTextId,showCloseButton:I.isBlocking,onDismiss:O},P),children:s.children})})},e.defaultProps={hidden:!0},e=zo([Gs],e),e}(l.exports.Component),Ad={root:"ms-Dialog"},Ed=function(t){var e,o=t.className,n=t.containerClassName,r=t.dialogDefaultMinWidth,s=r===void 0?"288px":r,i=t.dialogDefaultMaxWidth,a=i===void 0?"340px":i,c=t.hidden,p=t.theme,m=Tt(Ad,p);return{root:[m.root,p.fonts.medium,o],main:[{width:s,outline:"3px solid transparent",selectors:(e={},e["@media (min-width: "+Pl+"px)"]={width:"auto",maxWidth:a,minWidth:s},e)},!c&&{display:"flex"},n]}},Mi=jt(Pd,Ed,void 0,{scope:"Dialog"});Mi.displayName="Dialog";var sn;(function(t){t[t.normal=0]="normal",t[t.compact=1]="compact"})(sn||(sn={}));var Bd=It(),$d=l.exports.createContext({}),Fd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return n._rootElement=l.exports.createRef(),n._onClick=function(r){n._onAction(r)},n._onKeyDown=function(r){(r.which===J.enter||r.which===J.space)&&n._onAction(r)},n._onAction=function(r){var s=n.props,i=s.onClick,a=s.onClickHref,c=s.onClickTarget;i?i(r):!i&&a&&(c?window.open(a,c,"noreferrer noopener nofollow"):window.location.href=a,r.preventDefault(),r.stopPropagation())},Ut(n),n}return e.prototype.render=function(){var o=this.props,n=o.onClick,r=o.onClickHref,s=o.children,i=o.type,a=o.accentColor,c=o.styles,p=o.theme,m=o.className,x=Gn(this.props,Vs,["className","onClick","type","role"]),g=!!(n||r);this._classNames=Bd(c,{theme:p,className:m,actionable:g,compact:i===sn.compact});var d;i===sn.compact&&a&&(d={borderBottomColor:a});var h=this.props.role||(g?n?"button":"link":void 0),f=g?0:void 0,b={role:h,tabIndex:f};return B("div",{...D({ref:this._rootElement,role:"group",className:this._classNames.root,onKeyDown:g?this._onKeyDown:void 0,onClick:g?this._onClick:void 0,style:d},x),children:B($d.Provider,{value:b,children:s})})},e.prototype.focus=function(){this._rootElement.current&&this._rootElement.current.focus()},e.defaultProps={type:sn.normal},e}(l.exports.Component),Yr={root:"ms-DocumentCardPreview",icon:"ms-DocumentCardPreview-icon",iconContainer:"ms-DocumentCardPreview-iconContainer"},Rd={root:"ms-DocumentCardActivity",multiplePeople:"ms-DocumentCardActivity--multiplePeople",details:"ms-DocumentCardActivity-details",name:"ms-DocumentCardActivity-name",activity:"ms-DocumentCardActivity-activity",avatars:"ms-DocumentCardActivity-avatars",avatar:"ms-DocumentCardActivity-avatar"},Jr={root:"ms-DocumentCardTitle"},Ld={root:"ms-DocumentCardLocation"},Hd={root:"ms-DocumentCard",rootActionable:"ms-DocumentCard--actionable",rootCompact:"ms-DocumentCard--compact"},Vd=function(t){var e,o,n=t.className,r=t.theme,s=t.actionable,i=t.compact,a=r.palette,c=r.fonts,p=r.effects,m=Tt(Hd,r);return{root:[m.root,{WebkitFontSmoothing:"antialiased",backgroundColor:a.white,border:"1px solid "+a.neutralLight,maxWidth:"320px",minWidth:"206px",userSelect:"none",position:"relative",selectors:(e={":focus":{outline:"0px solid"}},e["."+Al+" &:focus"]=Go(a.neutralSecondary,p.roundedCorner2),e["."+Ld.root+" + ."+Jr.root]={paddingTop:"4px"},e)},s&&[m.rootActionable,{selectors:{":hover":{cursor:"pointer",borderColor:a.neutralTertiaryAlt},":hover:after":{content:'" "',position:"absolute",top:0,right:0,bottom:0,left:0,border:"1px solid "+a.neutralTertiaryAlt,pointerEvents:"none"}}}],i&&[m.rootCompact,{display:"flex",maxWidth:"480px",height:"108px",selectors:(o={},o["."+Yr.root]={borderRight:"1px solid "+a.neutralLight,borderBottom:0,maxHeight:"106px",maxWidth:"144px"},o["."+Yr.icon]={maxHeight:"32px",maxWidth:"32px"},o["."+Rd.root]={paddingBottom:"12px"},o["."+Jr.root]={paddingBottom:"12px 16px 8px 16px",fontSize:c.mediumPlus.fontSize,lineHeight:"16px"},o)}],n]}},Wd=jt(Fd,Vd,void 0,{scope:"DocumentCard"}),Ud=It(),Gd=function(t){Be(e,t);function e(o){var n=t.call(this,o)||this;return Ut(n),n}return e.prototype.render=function(){var o=this,n=this.props,r=n.actions,s=n.views,i=n.styles,a=n.theme,c=n.className;return this._classNames=Ud(i,{theme:a,className:c}),Ce("div",{className:this._classNames.root,children:[r&&r.map(function(p,m){return B("div",{className:o._classNames.action,children:B(ye,{...D({},p)})},m)}),s>0&&Ce("div",{className:this._classNames.views,children:[B(Xe,{iconName:"View",className:this._classNames.viewsIcon}),s]})]})},e}(l.exports.Component),Cn=34,Kd=12,zd=4,qd={root:"ms-DocumentCardActions",action:"ms-DocumentCardActions-action",views:"ms-DocumentCardActions-views"},Yd=function(t){var e=t.className,o=t.theme,n=o.palette,r=o.fonts,s=Tt(qd,o);return{root:[s.root,{height:Cn+"px",padding:zd+"px "+Kd+"px",position:"relative"},e],action:[s.action,{float:"left",marginRight:"4px",color:n.neutralSecondary,cursor:"pointer",selectors:{".ms-Button":{fontSize:r.mediumPlus.fontSize,height:Cn,width:Cn},".ms-Button:hover .ms-Button-icon":{color:o.semanticColors.buttonText,cursor:"pointer"}}}],views:[s.views,{textAlign:"right",lineHeight:Cn}],viewsIcon:{marginRight:"8px",fontSize:r.medium.fontSize,verticalAlign:"top"}}},Jd=jt(Gd,Yd,void 0,{scope:"DocumentCardActions"}),Oi="SearchBox",Zd={root:{height:"auto"},icon:{fontSize:"12px"}},Xd={iconName:"Clear"},Qd={ariaLabel:"Clear text"},ep=It(),tp=function(t,e,o){l.exports.useImperativeHandle(t,function(){return{focus:function(){var n;return(n=e.current)===null||n===void 0?void 0:n.focus()},hasFocus:function(){return o}}},[e,o])},Ni=l.exports.forwardRef(function(t,e){var o=t.ariaLabel,n=t.className,r=t.defaultValue,s=r===void 0?"":r,i=t.disabled,a=t.underlined,c=t.styles,p=t.labelText,m=t.placeholder,x=m===void 0?p:m,g=t.theme,d=t.clearButtonProps,h=d===void 0?Qd:d,f=t.disableAnimation,b=f===void 0?!1:f,v=t.showIcon,C=v===void 0?!1:v,S=t.onClear,T=t.onBlur,O=t.onEscape,R=t.onSearch,A=t.onKeyDown,F=t.iconProps,G=t.role,q=t.onChange,ue=t.onChanged,se=l.exports.useState(!1),X=se[0],de=se[1],he=l.exports.useRef(),te=El(t.value,s,function(N,ae){N&&N.timeStamp===he.current||(he.current=N?.timeStamp,q?.(N,ae),ue?.(ae))}),be=te[0],w=te[1],y=String(be),I=l.exports.useRef(null),P=l.exports.useRef(null),E=$n(I,e),Q=Us(Oi,t.id),ce=h.onClick,ie=ep(c,{theme:g,className:n,underlined:a,hasFocus:X,disabled:i,hasInput:y.length>0,disableAnimation:b,showIcon:C}),ge=Gn(t,$s,["className","placeholder","onFocus","onBlur","value","role"]),pe=l.exports.useCallback(function(N){var ae;S?.(N),N.defaultPrevented||(w(""),(ae=P.current)===null||ae===void 0||ae.focus(),N.stopPropagation(),N.preventDefault())},[S,w]),$e=l.exports.useCallback(function(N){ce?.(N),N.defaultPrevented||pe(N)},[ce,pe]),j=function(N){var ae;de(!0),(ae=t.onFocus)===null||ae===void 0||ae.call(t,N)},$=function(){P.current&&(P.current.focus(),P.current.selectionStart=P.current.selectionEnd=0)},H=l.exports.useCallback(function(N){de(!1),T?.(N)},[T]),k=function(N){w(N.target.value,N)},xe=function(N){switch(N.which){case J.escape:O?.(N),y&&!N.defaultPrevented&&pe(N);break;case J.enter:R&&(R(y),N.preventDefault(),N.stopPropagation());break;default:A?.(N),N.defaultPrevented&&N.stopPropagation();break}};return tp(t.componentRef,P,X),Ce("div",{role:G,ref:E,className:ie.root,onFocusCapture:j,children:[B("div",{className:ie.iconContainer,onClick:$,"aria-hidden":!0,children:B(Xe,{...D({iconName:"Search"},F,{className:ie.icon})})}),B("input",{...D({},ge,{id:Q,className:ie.field,placeholder:x,onChange:k,onInput:k,onBlur:H,onKeyDown:xe,value:y,disabled:i,role:"searchbox","aria-label":o,ref:P})}),y.length>0&&B("div",{className:ie.clearButton,children:B(ye,{...D({onBlur:H,styles:Zd,iconProps:Xd},h,{onClick:$e})})})]})});Ni.displayName=Oi;var np={root:"ms-SearchBox",iconContainer:"ms-SearchBox-iconContainer",icon:"ms-SearchBox-icon",clearButton:"ms-SearchBox-clearButton",field:"ms-SearchBox-field"};function op(t){var e,o,n,r,s,i=t.theme,a=t.underlined,c=t.disabled,p=t.hasFocus,m=t.className,x=t.hasInput,g=t.disableAnimation,d=t.showIcon,h=i.palette,f=i.fonts,b=i.semanticColors,v=i.effects,C=Tt(np,i),S={color:b.inputPlaceholderText,opacity:1},T=h.neutralSecondary,O=h.neutralPrimary,R=h.neutralLighter,A=h.neutralLighter,F=h.neutralLighter;return{root:[C.root,f.medium,Nr,{color:b.inputText,backgroundColor:b.inputBackground,display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"stretch",padding:"1px 0 1px 4px",borderRadius:v.roundedCorner2,border:"1px solid "+b.inputBorder,height:32,selectors:(e={},e[je]={borderColor:"WindowText"},e[":hover"]={borderColor:b.inputBorderHovered,selectors:(o={},o[je]={borderColor:"Highlight"},o)},e[":hover ."+C.iconContainer]={color:b.inputIconHovered},e)},!p&&x&&{selectors:(n={},n[":hover ."+C.iconContainer]={width:4},n[":hover ."+C.icon]={opacity:0,pointerEvents:"none"},n)},p&&["is-active",{position:"relative"},Go(b.inputFocusBorderAlt,a?0:v.roundedCorner2,a?"borderBottom":"border")],d&&[{selectors:(r={},r[":hover ."+C.iconContainer]={width:32},r[":hover ."+C.icon]={opacity:1},r)}],c&&["is-disabled",{borderColor:R,backgroundColor:F,pointerEvents:"none",cursor:"default",selectors:(s={},s[je]={borderColor:"GrayText"},s)}],a&&["is-underlined",{borderWidth:"0 0 1px 0",borderRadius:0,padding:"1px 0 1px 8px"}],a&&c&&{backgroundColor:"transparent"},x&&"can-clear",m],iconContainer:[C.iconContainer,{display:"flex",flexDirection:"column",justifyContent:"center",flexShrink:0,fontSize:16,width:32,textAlign:"center",color:b.inputIcon,cursor:"text"},p&&{width:4},c&&{color:b.inputIconDisabled},!g&&{transition:"width "+To.durationValue1},d&&p&&{width:32}],icon:[C.icon,{opacity:1},p&&{opacity:0,pointerEvents:"none"},!g&&{transition:"opacity "+To.durationValue1+" 0s"},d&&p&&{opacity:1}],clearButton:[C.clearButton,{display:"flex",flexDirection:"row",alignItems:"stretch",cursor:"pointer",flexBasis:"32px",flexShrink:0,padding:0,margin:"-1px 0px",selectors:{"&:hover .ms-Button":{backgroundColor:A},"&:hover .ms-Button-icon":{color:O},".ms-Button":{borderRadius:Bl(i)?"1px 0 0 1px":"0 1px 1px 0"},".ms-Button-icon":{color:T}}}],field:[C.field,Nr,Pn(S),{backgroundColor:"transparent",border:"none",outline:"none",fontWeight:"inherit",fontFamily:"inherit",fontSize:"inherit",color:b.inputText,flex:"1 1 0px",minWidth:"0px",overflow:"hidden",textOverflow:"ellipsis",paddingBottom:.5,selectors:{"::-ms-clear":{display:"none"}}},c&&{color:b.disabledText}]}}var rp=jt(Ni,op,void 0,{scope:"SearchBox"});const gt={root:{width:135}},me={root:{width:220}},sp={root:{width:220}},ip={root:{width:220,paddingLeft:4,paddingRight:4,textAlign:"left"},label:{fontWeight:"normal"}},Ee=l.exports.memo(function({table:e,filter:o,...n}){const r=ea(e,o);return u.exports.jsx(ot,{label:"Column",placeholder:"Choose column",options:r,styles:me,...n})}),ap=()=>!0,lp=l.exports.memo(function({table:e,filter:o=ap,...n}){const r=ea(e,o),s=l.exports.useMemo(()=>[{key:"header",text:"Columns",itemType:_e.Header},...r],[r]);return u.exports.jsx(rr,{allowFreeform:!0,autoComplete:"off",label:"Column or value",placeholder:"text/number or select column",options:s,styles:me,...n})}),up=l.exports.memo(function({column:e,table:o,values:n,filter:r,...s}){const i=ix(e,o,n,r);return u.exports.jsx(ot,{label:"Value",placeholder:"Choose value",options:i,styles:me,...s})}),cp=l.exports.memo(function({columnName:e,...o}){const n=ax(),r=l.exports.useMemo(()=>[{key:"header",text:"Values",itemType:_e.Header},...n],[n]);return u.exports.jsx(rr,{allowFreeform:!0,label:"Date format pattern",placeholder:"Select date format",autoComplete:"off",options:r,styles:me,dropdownMaxWidth:200,useComboBoxAsMenuWidth:!0,...o})});var hn=function(e){return typeof e.children=="function"?B(at,{children:e.children()}):B(at,{children:e.children||null})},ee=function(e){return hn(e)};ee.defaultProps={children:null};var Kt=function(e){return hn(e)};Kt.defaultProps={children:null};var Lt=function(e){return hn(e)},Pi=function(e){return hn(e)},Ai=function(e){var o=Boolean(typeof e=="function"?e():e);return o};function Zr(t,e,o,n,r,s,i){try{var a=t[s](i),c=a.value}catch(p){o(p);return}a.done?e(c):Promise.resolve(c).then(n,r)}function Ei(t){return function(){var e=this,o=arguments;return new Promise(function(n,r){var s=t.apply(e,o);function i(c){Zr(s,n,r,i,a,"next",c)}function a(c){Zr(s,n,r,i,a,"throw",c)}i(void 0)})}}function Rt(){return Rt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},Rt.apply(this,arguments)}function dp(t,e){return e={exports:{}},t(e,e.exports),e.exports}var Un=dp(function(t){var e=function(o){var n=Object.prototype,r=n.hasOwnProperty,s,i=typeof Symbol=="function"?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",p=i.toStringTag||"@@toStringTag";function m(w,y,I){return Object.defineProperty(w,y,{value:I,enumerable:!0,configurable:!0,writable:!0}),w[y]}try{m({},"")}catch{m=function(y,I,P){return y[I]=P}}function x(w,y,I,P){var E=y&&y.prototype instanceof C?y:C,Q=Object.create(E.prototype),ce=new he(P||[]);return Q._invoke=ue(w,I,ce),Q}o.wrap=x;function g(w,y,I){try{return{type:"normal",arg:w.call(y,I)}}catch(P){return{type:"throw",arg:P}}}var d="suspendedStart",h="suspendedYield",f="executing",b="completed",v={};function C(){}function S(){}function T(){}var O={};m(O,a,function(){return this});var R=Object.getPrototypeOf,A=R&&R(R(te([])));A&&A!==n&&r.call(A,a)&&(O=A);var F=T.prototype=C.prototype=Object.create(O);S.prototype=T,m(F,"constructor",T),m(T,"constructor",S),S.displayName=m(T,p,"GeneratorFunction");function G(w){["next","throw","return"].forEach(function(y){m(w,y,function(I){return this._invoke(y,I)})})}o.isGeneratorFunction=function(w){var y=typeof w=="function"&&w.constructor;return y?y===S||(y.displayName||y.name)==="GeneratorFunction":!1},o.mark=function(w){return Object.setPrototypeOf?Object.setPrototypeOf(w,T):(w.__proto__=T,m(w,p,"GeneratorFunction")),w.prototype=Object.create(F),w},o.awrap=function(w){return{__await:w}};function q(w,y){function I(Q,ce,ie,ge){var pe=g(w[Q],w,ce);if(pe.type==="throw")ge(pe.arg);else{var $e=pe.arg,j=$e.value;return j&&typeof j=="object"&&r.call(j,"__await")?y.resolve(j.__await).then(function($){I("next",$,ie,ge)},function($){I("throw",$,ie,ge)}):y.resolve(j).then(function($){$e.value=$,ie($e)},function($){return I("throw",$,ie,ge)})}}var P;function E(Q,ce){function ie(){return new y(function(ge,pe){I(Q,ce,ge,pe)})}return P=P?P.then(ie,ie):ie()}this._invoke=E}G(q.prototype),m(q.prototype,c,function(){return this}),o.AsyncIterator=q,o.async=function(w,y,I,P,E){E===void 0&&(E=Promise);var Q=new q(x(w,y,I,P),E);return o.isGeneratorFunction(y)?Q:Q.next().then(function(ce){return ce.done?ce.value:Q.next()})};function ue(w,y,I){var P=d;return function(Q,ce){if(P===f)throw new Error("Generator is already running");if(P===b){if(Q==="throw")throw ce;return be()}for(I.method=Q,I.arg=ce;;){var ie=I.delegate;if(ie){var ge=se(ie,I);if(ge){if(ge===v)continue;return ge}}if(I.method==="next")I.sent=I._sent=I.arg;else if(I.method==="throw"){if(P===d)throw P=b,I.arg;I.dispatchException(I.arg)}else I.method==="return"&&I.abrupt("return",I.arg);P=f;var pe=g(w,y,I);if(pe.type==="normal"){if(P=I.done?b:h,pe.arg===v)continue;return{value:pe.arg,done:I.done}}else pe.type==="throw"&&(P=b,I.method="throw",I.arg=pe.arg)}}}function se(w,y){var I=w.iterator[y.method];if(I===s){if(y.delegate=null,y.method==="throw"){if(w.iterator.return&&(y.method="return",y.arg=s,se(w,y),y.method==="throw"))return v;y.method="throw",y.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var P=g(I,w.iterator,y.arg);if(P.type==="throw")return y.method="throw",y.arg=P.arg,y.delegate=null,v;var E=P.arg;if(!E)return y.method="throw",y.arg=new TypeError("iterator result is not an object"),y.delegate=null,v;if(E.done)y[w.resultName]=E.value,y.next=w.nextLoc,y.method!=="return"&&(y.method="next",y.arg=s);else return E;return y.delegate=null,v}G(F),m(F,p,"Generator"),m(F,a,function(){return this}),m(F,"toString",function(){return"[object Generator]"});function X(w){var y={tryLoc:w[0]};1 in w&&(y.catchLoc=w[1]),2 in w&&(y.finallyLoc=w[2],y.afterLoc=w[3]),this.tryEntries.push(y)}function de(w){var y=w.completion||{};y.type="normal",delete y.arg,w.completion=y}function he(w){this.tryEntries=[{tryLoc:"root"}],w.forEach(X,this),this.reset(!0)}o.keys=function(w){var y=[];for(var I in w)y.push(I);return y.reverse(),function P(){for(;y.length;){var E=y.pop();if(E in w)return P.value=E,P.done=!1,P}return P.done=!0,P}};function te(w){if(w){var y=w[a];if(y)return y.call(w);if(typeof w.next=="function")return w;if(!isNaN(w.length)){var I=-1,P=function E(){for(;++I<w.length;)if(r.call(w,I))return E.value=w[I],E.done=!1,E;return E.value=s,E.done=!0,E};return P.next=P}}return{next:be}}o.values=te;function be(){return{value:s,done:!0}}return he.prototype={constructor:he,reset:function(w){if(this.prev=0,this.next=0,this.sent=this._sent=s,this.done=!1,this.delegate=null,this.method="next",this.arg=s,this.tryEntries.forEach(de),!w)for(var y in this)y.charAt(0)==="t"&&r.call(this,y)&&!isNaN(+y.slice(1))&&(this[y]=s)},stop:function(){this.done=!0;var w=this.tryEntries[0],y=w.completion;if(y.type==="throw")throw y.arg;return this.rval},dispatchException:function(w){if(this.done)throw w;var y=this;function I(ge,pe){return Q.type="throw",Q.arg=w,y.next=ge,pe&&(y.method="next",y.arg=s),!!pe}for(var P=this.tryEntries.length-1;P>=0;--P){var E=this.tryEntries[P],Q=E.completion;if(E.tryLoc==="root")return I("end");if(E.tryLoc<=this.prev){var ce=r.call(E,"catchLoc"),ie=r.call(E,"finallyLoc");if(ce&&ie){if(this.prev<E.catchLoc)return I(E.catchLoc,!0);if(this.prev<E.finallyLoc)return I(E.finallyLoc)}else if(ce){if(this.prev<E.catchLoc)return I(E.catchLoc,!0)}else if(ie){if(this.prev<E.finallyLoc)return I(E.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(w,y){for(var I=this.tryEntries.length-1;I>=0;--I){var P=this.tryEntries[I];if(P.tryLoc<=this.prev&&r.call(P,"finallyLoc")&&this.prev<P.finallyLoc){var E=P;break}}E&&(w==="break"||w==="continue")&&E.tryLoc<=y&&y<=E.finallyLoc&&(E=null);var Q=E?E.completion:{};return Q.type=w,Q.arg=y,E?(this.method="next",this.next=E.finallyLoc,v):this.complete(Q)},complete:function(w,y){if(w.type==="throw")throw w.arg;return w.type==="break"||w.type==="continue"?this.next=w.arg:w.type==="return"?(this.rval=this.arg=w.arg,this.method="return",this.next="end"):w.type==="normal"&&y&&(this.next=y),v},finish:function(w){for(var y=this.tryEntries.length-1;y>=0;--y){var I=this.tryEntries[y];if(I.finallyLoc===w)return this.complete(I.completion,I.afterLoc),de(I),v}},catch:function(w){for(var y=this.tryEntries.length-1;y>=0;--y){var I=this.tryEntries[y];if(I.tryLoc===w){var P=I.completion;if(P.type==="throw"){var E=P.arg;de(I)}return E}}throw new Error("illegal catch attempt")},delegateYield:function(w,y,I){return this.delegate={iterator:te(w),resultName:y,nextLoc:I},this.method==="next"&&(this.arg=s),v}},o}(t.exports);try{regeneratorRuntime=e}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}});function Bi(t){return typeof t=="function"}function pp(t){return Reflect.has(t,"then")&&Bi(t.then)}function fp(t){return Reflect.has(t,"catch")&&Bi(t.catch)}function ir(t){return typeof t!="object"||t===null?!1:t instanceof Promise||t!==Promise.prototype&&pp(t)&&fp(t)}var mp=function(e,o){if(!Array.isArray(e)||!Array.isArray(o))throw new Error("shallowArraysEqual only accepts arrays as parameters");if(e.length!==o.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==o[n])return!1;return!0},hp=function(e){if(!ir(e))throw new Error("Argument of createCancellablePromise should be a Promise");var o={value:!1},n=new Promise(function(){var r=Ei(Un.mark(function s(i,a){var c;return Un.wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.prev=0,m.next=3,e;case 3:return c=m.sent,m.abrupt("return",!o.value&&i(c));case 7:m.prev=7,m.t0=m.catch(0),!o.value&&a(m.t0);case 10:case"end":return m.stop()}},s,null,[[0,7]])}));return function(s,i){return r.apply(this,arguments)}}());return Object.keys(e).forEach(function(r){n[r]=e[r]}),{promise:n,cancel:function(){o.value=!0}}},xp=function(e,o){o===void 0&&(o=[]);var n=l.exports.useRef(!1),r=l.exports.useRef([]);if(typeof e!="function")throw new Error("Incorrect callback parameter for useSingleton hook; expected a function, but got: '"+typeof e+"'.");if(!Array.isArray(o))throw new Error("Incorrect dependencies parameter for useSingleton; expected an array, but got: '"+typeof o+"'.");var s=Array.isArray(o)&&o.length>0;if(s){var i=!mp(r.current,o);if(i)r.current=o;else if(n.current)return}else if(n.current)return;e(),n.current=!0},ct=function(e){return hn(e)};function gp(t){var e=t.promise,o=t.keepAlive,n=o===void 0?!1:o,r=t.children,s=l.exports.useState(null),i=s[0],a=s[1],c=l.exports.useState(null),p=c[0],m=c[1],x=l.exports.useMemo(function(){return hp(e)},[e]),g=l.exports.useRef([]);if(l.exports.useEffect(function(){return function(){n||x.cancel()}},[x,x.promise,n]),xp(Ei(Un.mark(function C(){var S;return Un.wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return a(null),m(null),O.prev=2,O.next=5,x.promise;case 5:S=O.sent,m(S),a(!0),g.current.push(x),O.next=16;break;case 11:O.prev=11,O.t0=O.catch(2),m(O.t0),a(!1),g.current.push(x);case 16:case"end":return O.stop()}},C,null,[[2,11]])})),[x.promise]),!r||!ir(e))return null;if(i===null){var d=St.Children.toArray(r).find(function(C){return C.type===Pi});return B(at,{children:d||null})}if(!i){var h=St.Children.toArray(r).find(function(C){return C.type===Lt});if(!h)return B(at,{});var f=h;return typeof h.props.children=="function"&&(f=Rt({},h,{props:Rt({},h.props,{children:function(){return h.props.children(p,g.current,x.promise)}})})),B(at,{children:f})}var b=St.Children.toArray(r).find(function(C){return C.type===ct});if(!b)return B(at,{});var v=b;return typeof b.props.children=="function"&&(v=Rt({},b,{props:Rt({},b.props,{children:function(){return b.props.children(p,g.current,x.promise)}})})),B(at,{children:v})}var an=function(e){var o=e.condition,n=e.keepAlive,r=n===void 0?!1:n,s=e.children;if(!s)return null;if(!Array.isArray(s)&&!(s.type===Lt||s.type===ct)||St.Children.toArray(s).every(function(a){return a.type===Lt||a.type===ct||a.type===Pi}),ir(o))return B(gp,{promise:o,keepAlive:r,children:s});var i=Ai(o);return B(at,{children:St.Children.toArray(s).find(function(a){return a.type!==Lt!=!i})||null})},xn=function(e){var o,n,r=e.children,s=void 0,i=void 0;return St.Children.forEach(r,function(a){if(!!St.isValidElement(a))if(!s&&a.type===ee){var c=a.props.condition,p=Ai(c);p&&(s=a)}else!i&&a.type===Kt&&(i=a)}),(o=(n=s)!=null?n:i)!=null?o:null};const bp=l.exports.memo(function({columnName:e,props:o,children:n,lazyLoadGroups:r}){const{group:s,onToggleCollapse:i}=o,a=l.exports.useRef(),[c,p]=l.exports.useState(!1),m=cx(a.current,"0px"),x=l.exports.useCallback(h=>{let f=0;return h.forEach(b=>{f+=b.count,f+=b.children?x(b.children):0}),f},[]);l.exports.useEffect(()=>{m&&s?.isCollapsed&&i&&i(s)},[m,s,i]);const g=l.exports.useCallback(()=>{p(!0),i&&i(s)},[s,i,p]),d=l.exports.useMemo(()=>r&&s?.level>0&&!c,[s,r,c]);return u.exports.jsxs(vp,{ref:h=>a.current=d?h:void 0,groupLevel:s?.level,children:[u.exports.jsx(yp,{onClick:g,iconProps:{iconName:s?.isCollapsed?"ChevronRight":"ChevronDown"}}),u.exports.jsxs(an,{condition:!!n,children:[u.exports.jsx(ct,{children:n}),u.exports.jsxs(Lt,{children:[u.exports.jsx(mo,{children:u.exports.jsxs(Cp,{children:[e?`${e}  - `:"",s?.name]})}),u.exports.jsxs(mo,{children:["Children: ",s?.count]}),s?.children&&u.exports.jsxs(mo,{children:["Total Items: ",x(s?.children)]})]})]})]})}),vp=_.div`
	padding-left: ${({groupLevel:t})=>`${t*12}px`};
	display: flex;
	gap: 8px;
`,yp=_(ye)`
	width: 5%;
`,mo=_.span`
	align-self: center;
`,Cp=_.b``;function gn(t,e,o={}){return{id:t,table:e,name:o.name||t}}function nt(t){return typeof t=="function"}function $i(t){var e=function(n){Error.call(n),n.stack=new Error().stack},o=t(e);return o.prototype=Object.create(Error.prototype),o.prototype.constructor=o,o}var ho=$i(function(t){return function(o){t(this),this.message=o?o.length+` errors occurred during unsubscription:
`+o.map(function(n,r){return r+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=o}});function Bo(t,e){if(t){var o=t.indexOf(e);0<=o&&t.splice(o,1)}}var Xn=function(){function t(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return t.prototype.unsubscribe=function(){var e,o,n,r,s;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var a=Io(i),c=a.next();!c.done;c=a.next()){var p=c.value;p.remove(this)}}catch(f){e={error:f}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(e)throw e.error}}else i.remove(this);var m=this.initialTeardown;if(nt(m))try{m()}catch(f){s=f instanceof ho?f.errors:[f]}var x=this._finalizers;if(x){this._finalizers=null;try{for(var g=Io(x),d=g.next();!d.done;d=g.next()){var h=d.value;try{Xr(h)}catch(f){s=s??[],f instanceof ho?s=_t(_t([],Fn(s)),Fn(f.errors)):s.push(f)}}}catch(f){n={error:f}}finally{try{d&&!d.done&&(r=g.return)&&r.call(g)}finally{if(n)throw n.error}}}if(s)throw new ho(s)}},t.prototype.add=function(e){var o;if(e&&e!==this)if(this.closed)Xr(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(o=this._finalizers)!==null&&o!==void 0?o:[]).push(e)}},t.prototype._hasParent=function(e){var o=this._parentage;return o===e||Array.isArray(o)&&o.includes(e)},t.prototype._addParent=function(e){var o=this._parentage;this._parentage=Array.isArray(o)?(o.push(e),o):o?[o,e]:e},t.prototype._removeParent=function(e){var o=this._parentage;o===e?this._parentage=null:Array.isArray(o)&&Bo(o,e)},t.prototype.remove=function(e){var o=this._finalizers;o&&Bo(o,e),e instanceof t&&e._removeParent(this)},t.EMPTY=function(){var e=new t;return e.closed=!0,e}(),t}(),Fi=Xn.EMPTY;function Ri(t){return t instanceof Xn||t&&"closed"in t&&nt(t.remove)&&nt(t.add)&&nt(t.unsubscribe)}function Xr(t){nt(t)?t():t.unsubscribe()}var ar={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},$o={setTimeout:function(t,e){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];var r=$o.delegate;return r?.setTimeout?r.setTimeout.apply(r,_t([t,e],Fn(o))):setTimeout.apply(void 0,_t([t,e],Fn(o)))},clearTimeout:function(t){var e=$o.delegate;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function wp(t){$o.setTimeout(function(){throw t})}function Qr(){}var wn=null;function An(t){if(ar.useDeprecatedSynchronousErrorHandling){var e=!wn;if(e&&(wn={errorThrown:!1,error:null}),t(),e){var o=wn,n=o.errorThrown,r=o.error;if(wn=null,n)throw r}}else t()}var Li=function(t){Be(e,t);function e(o){var n=t.call(this)||this;return n.isStopped=!1,o?(n.destination=o,Ri(o)&&o.add(n)):n.destination=Tp,n}return e.create=function(o,n,r){return new Fo(o,n,r)},e.prototype.next=function(o){this.isStopped||this._next(o)},e.prototype.error=function(o){this.isStopped||(this.isStopped=!0,this._error(o))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(o){this.destination.next(o)},e.prototype._error=function(o){try{this.destination.error(o)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(Xn),_p=Function.prototype.bind;function xo(t,e){return _p.call(t,e)}var Sp=function(){function t(e){this.partialObserver=e}return t.prototype.next=function(e){var o=this.partialObserver;if(o.next)try{o.next(e)}catch(n){_n(n)}},t.prototype.error=function(e){var o=this.partialObserver;if(o.error)try{o.error(e)}catch(n){_n(n)}else _n(e)},t.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(o){_n(o)}},t}(),Fo=function(t){Be(e,t);function e(o,n,r){var s=t.call(this)||this,i;if(nt(o)||!o)i={next:o??void 0,error:n??void 0,complete:r??void 0};else{var a;s&&ar.useDeprecatedNextContext?(a=Object.create(o),a.unsubscribe=function(){return s.unsubscribe()},i={next:o.next&&xo(o.next,a),error:o.error&&xo(o.error,a),complete:o.complete&&xo(o.complete,a)}):i=o}return s.destination=new Sp(i),s}return e}(Li);function _n(t){wp(t)}function kp(t){throw t}var Tp={closed:!0,next:Qr,error:kp,complete:Qr},Ip=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function jp(t){return t}function Dp(t){return t.length===0?jp:t.length===1?t[0]:function(o){return t.reduce(function(n,r){return r(n)},o)}}var es=function(){function t(e){e&&(this._subscribe=e)}return t.prototype.lift=function(e){var o=new t;return o.source=this,o.operator=e,o},t.prototype.subscribe=function(e,o,n){var r=this,s=Op(e)?e:new Fo(e,o,n);return An(function(){var i=r,a=i.operator,c=i.source;s.add(a?a.call(s,c):c?r._subscribe(s):r._trySubscribe(s))}),s},t.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(o){e.error(o)}},t.prototype.forEach=function(e,o){var n=this;return o=ts(o),new o(function(r,s){var i=new Fo({next:function(a){try{e(a)}catch(c){s(c),i.unsubscribe()}},error:s,complete:r});n.subscribe(i)})},t.prototype._subscribe=function(e){var o;return(o=this.source)===null||o===void 0?void 0:o.subscribe(e)},t.prototype[Ip]=function(){return this},t.prototype.pipe=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];return Dp(e)(this)},t.prototype.toPromise=function(e){var o=this;return e=ts(e),new e(function(n,r){var s;o.subscribe(function(i){return s=i},function(i){return r(i)},function(){return n(s)})})},t.create=function(e){return new t(e)},t}();function ts(t){var e;return(e=t??ar.Promise)!==null&&e!==void 0?e:Promise}function Mp(t){return t&&nt(t.next)&&nt(t.error)&&nt(t.complete)}function Op(t){return t&&t instanceof Li||Mp(t)&&Ri(t)}var Np=$i(function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Hi=function(t){Be(e,t);function e(){var o=t.call(this)||this;return o.closed=!1,o.currentObservers=null,o.observers=[],o.isStopped=!1,o.hasError=!1,o.thrownError=null,o}return e.prototype.lift=function(o){var n=new ns(this,this);return n.operator=o,n},e.prototype._throwIfClosed=function(){if(this.closed)throw new Np},e.prototype.next=function(o){var n=this;An(function(){var r,s;if(n._throwIfClosed(),!n.isStopped){n.currentObservers||(n.currentObservers=Array.from(n.observers));try{for(var i=Io(n.currentObservers),a=i.next();!a.done;a=i.next()){var c=a.value;c.next(o)}}catch(p){r={error:p}}finally{try{a&&!a.done&&(s=i.return)&&s.call(i)}finally{if(r)throw r.error}}}})},e.prototype.error=function(o){var n=this;An(function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=o;for(var r=n.observers;r.length;)r.shift().error(o)}})},e.prototype.complete=function(){var o=this;An(function(){if(o._throwIfClosed(),!o.isStopped){o.isStopped=!0;for(var n=o.observers;n.length;)n.shift().complete()}})},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var o;return((o=this.observers)===null||o===void 0?void 0:o.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(o){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,o)},e.prototype._subscribe=function(o){return this._throwIfClosed(),this._checkFinalizedStatuses(o),this._innerSubscribe(o)},e.prototype._innerSubscribe=function(o){var n=this,r=this,s=r.hasError,i=r.isStopped,a=r.observers;return s||i?Fi:(this.currentObservers=null,a.push(o),new Xn(function(){n.currentObservers=null,Bo(a,o)}))},e.prototype._checkFinalizedStatuses=function(o){var n=this,r=n.hasError,s=n.thrownError,i=n.isStopped;r?o.error(s):i&&o.complete()},e.prototype.asObservable=function(){var o=new es;return o.source=this,o},e.create=function(o,n){return new ns(o,n)},e}(es),ns=function(t){Be(e,t);function e(o,n){var r=t.call(this)||this;return r.destination=o,r.source=n,r}return e.prototype.next=function(o){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,o)},e.prototype.error=function(o){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,o)},e.prototype.complete=function(){var o,n;(n=(o=this.destination)===null||o===void 0?void 0:o.complete)===null||n===void 0||n.call(o)},e.prototype._subscribe=function(o){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(o))!==null&&r!==void 0?r:Fi},e}(Hi),Aw=function(t){Be(e,t);function e(o){var n=t.call(this)||this;return n._value=o,n}return Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(o){var n=t.prototype._subscribe.call(this,o);return!n.closed&&o.next(this._value),n},e.prototype.getValue=function(){var o=this,n=o.hasError,r=o.thrownError,s=o._value;if(n)throw r;return this._throwIfClosed(),s},e.prototype.next=function(o){t.prototype.next.call(this,this._value=o)},e}(Hi);var Ew=new Uint8Array(16);var Pp=[];for(var go=0;go<256;++go)Pp.push((go+256).toString(16).substr(1));async function Qn({input:t,output:e,args:{others:o}},n,r){const s=n.table(t),i=o.map(c=>n.table(c)),a=Ap(await s,r,await Promise.all(i));return gn(e,a)}function Ap(t,e,o){const n=e===pn.Difference?"except":e;return t[n](...o)}var os;(function(t){t.Source="source"})(os||(os={}));function ne(t){return async function({input:o,output:n,args:r},s){const i=await s.get(o);return await t(n,i,r)}}function Ep(t){return async function({output:o,args:n}){const r=await t(n);return gn(o,r)}}function oe(t){return(e,o,n)=>{let r;return o.table&&(r=t(o.table,n)),gn(e,r)}}function Vi(t,e){switch(e){case Ye.OR:return Bp(t);case Ye.AND:return $p(t);case Ye.XOR:return Fp(t);case Ye.NOR:return Rp(t);case Ye.NAND:return Lp(t);default:throw new Error(`Unsupported logical operator: [${e}]`)}}function Bp(t){return t.some(e=>e===1)?1:0}function $p(t){return t.every(e=>e===1)?1:0}function Fp(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e>1)return 0;return e===1?1:0}function Rp(t){return t.some(e=>e===1)?0:1}function Lp(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e<0)return 1;return e===t.length?0:1}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function lr(t){return t==="false"?!1:!!t}function Hp(t,e,o){if(o===Ue.IsEmpty||o===Ge.IsEmpty||o===ze.IsEmpty)return rs(t);if(o===Ue.IsNotEmpty||o===Ge.IsNotEmpty||o===ze.IsNotEmpty)return rs(t)===1?0:1;if(typeof t=="number"){const n=+e;return Wp(t,n,o)}else{if(typeof t=="string")return Vp(t,`${e}`,o);if(typeof t=="boolean"){const n=lr(e);return Up(t,n,o)}}return 0}function rs(t){return t==null||typeof t=="number"&&isNaN(t)||typeof t=="string"&&t.length===0?1:0}function Vp(t,e,o){const n=t.toLocaleLowerCase(),r=e.toLocaleLowerCase();switch(o){case Ge.Contains:case Ge.RegularExpression:return Ae.match(n,new RegExp(r,"gi"),0)?1:0;case Ge.EndsWith:return Ae.endswith(n,r,n.length)?1:0;case Ge.Equals:return n.localeCompare(r)===0?1:0;case Ge.NotEqual:return n.localeCompare(r)!==0?1:0;case Ge.StartsWith:return Ae.startswith(n,r,0)?1:0;default:throw new Error(`Unsupported string comparison operator: [${o}]`)}}function Wp(t,e,o){switch(o){case Ue.Equals:return t===e?1:0;case Ue.NotEqual:return t!==e?1:0;case Ue.GreaterThanOrEqual:return t>=e?1:0;case Ue.LessThanOrEqual:return t<=e?1:0;case Ue.GreaterThan:return t>e?1:0;case Ue.LessThan:return t<e?1:0;default:throw new Error(`Unsupported numeric comparison operator: [${o}]`)}}function Up(t,e,o){switch(o){case ze.Equals:return t===e?1:0;case ze.NotEqual:return t!==e?1:0;case ze.IsTrue:return t===!0?1:0;case ze.IsFalse:return t===!1?1:0;default:throw new Error(`Unsupported boolean comparison operator: [${o}]`)}}function Wi(t,e,o=Ye.OR){return pt(n=>{const r=n[t],s=e.map(i=>{const{value:a,operator:c,type:p}=i,m=p===ln.Column?n[`${a.toString()}`]:a;return Hp(r,m,c)});return Vi(s,o)})}function Gp(t,e){return pt(o=>{const n=t.map(r=>lr(o[r])?1:0);return Vi(n,e)})}const Kp=new Set([...Object.values(fn),...Object.values(Ks)]);function eo(t,e){if(!Kp.has(e))throw new Error(`Unsupported operation [${e}], too many parameters needed`);return Ae[e](t)}const zp=oe((t,{groupby:e,column:o,operation:n,to:r})=>{const s=eo(o,n);return t.groupby(e).rollup({[r]:s})}),qp=ne(zp),Yp=oe((t,e)=>t.derive({[e.to]:Zp(t,e)})),Jp=ne(Yp);function Zp(t,e){const{strategy:o,column:n,fixedwidth:r,fixedcount:s,clamped:i}=e,a=Xp(t,n,e.min,e.max),[c,p,m]=a;switch(o){case qe.Auto:return Kc(n);case qe.FixedWidth:return Fl(n,c,p,r||1,i,m);case qe.FixedCount:return $l(n,c,p,s||1,i,m);default:throw new Error(`Unsupported bin strategy ${o}`)}}function Xp(t,e,o,n){const r=t.rollup({min:Ae.min(e),max:Ae.max(e),distinct:Ae.distinct(e)});return[o||r.get("min",0),n||r.get("max",0),r.get("distinct",0)]}const Qp=oe((t,{to:e,column:o,criteria:n,logical:r})=>t.derive({[e]:Wi(o,n,r)})),ef=ne(Qp),tf=oe((t,{columns:e=[],operator:o,to:n})=>t.derive({[n]:Gp(e,o)})),nf=ne(tf);async function of(t,e){return Qn(t,e,pn.Concat)}const rf=oe((t,{columns:e,type:o,radix:n,formatPattern:r})=>{const s=e.reduce((i,a)=>(i[a]=af(a,o,n,r),i),{});return t.derive(s)}),sf=ne(rf);function af(t,e,o,n){const r=vi(n??"%Y-%m-%d"),s=bi(n??"%Y-%m-%d");return pt(i=>{const a=i[t];switch(e){case Je.Boolean:return lr(a);case Je.Date:return a!==null&&!isNaN(a)?new Date(a):n==="%Y-%m-%dT%H:%M:%S.%LZ"?Lc(a):r(a);case Je.Integer:return Ae.parse_int(a,o);case Je.Decimal:return Ae.parse_float(a);case Je.String:return jo(a)===K.String&&a.trim().toLowerCase()==="undefined"?void 0:jo(a)===K.String&&a.trim().toLowerCase()==="null"?null:a instanceof Date?s(a):a!=null?a.toString():a}})}const lf=oe((t,{columns:e})=>e?t.dedupe(e):t.dedupe()),uf=ne(lf),cf=oe((t,{column1:e,column2:o,operator:n,to:r})=>{const s=pt(i=>{const a=i[e],c=i[o];switch(n){case on.Add:return a+c;case on.Subtract:return a-c;case on.Multiply:return a*c;case on.Divide:return a/c;default:throw new Error(`Unsupported operator: [${n}]`)}});return t.derive({[r]:s})}),df=ne(cf);async function pf(t,e){return Qn(t,e,pn.Difference)}const ff=oe((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=pt(i=>`${i[s]}`==`${e}`?null:i[s]),r),{});return t.derive(n)}),mf=ne(ff),hf=Ep(xf);async function xf({url:t,delimiter:e,autoMax:o}){return t.toLowerCase().endsWith(".json")?Uc(t,{autoType:!(o===void 0||o<=0)}):Wc(t,{delimiter:e,autoMax:o!==void 0?o:0,autoType:!(o===void 0||o<=0)})}const gf=oe((t,{value:e,to:o})=>{const n=(r,s)=>s.value;return t.params({value:e}).derive({[o]:n})}),bf=ne(gf),vf=oe((t,{column:e,criteria:o,logical:n})=>t.filter(Wi(e,o,n))),yf=ne(vf),Cf=oe((t,{columns:e,to:o})=>t.fold(e,{as:o})),wf=ne(Cf),_f=oe((t,{columns:e})=>t.groupby(e)),Sf=ne(_f),kf=oe((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=(i,a)=>a.value,r),{});return t.params({value:e}).impute(n)}),Tf=ne(kf);async function If(t,e){return Qn(t,e,pn.Intersect)}async function jf({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return gn(e,Df(r,s,o))}var ss;(function(t){t.Left="left",t.Right="right"})(ss||(ss={}));function Df(t,e,{on:o,strategy:n=lt.Inner}){return t.join(e,o,void 0,{left:n===lt.LeftOuter||n===lt.FullOuter,right:n===lt.RightOuter||n===lt.FullOuter})}async function Mf({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return gn(e,Of(r,s,o))}var is;(function(t){t.Input="Input",t.Other="Other"})(is||(is={}));function Of(t,e,{on:o=[],columns:n}){return t.lookup(e,o,...n)}const Nf=oe((t,{columns:e=[],strategy:o,to:n,delimiter:r=""})=>{const s=Af(t,e),i=pt(a=>{switch(o){case Ft.LastOneWins:return Bf(s,a,e);case Ft.Concat:return $f(a,e,r);case Ft.CreateArray:return Ui(a,e);case Ft.FirstOneWins:default:return Ef(s,a,e)}});return t.derive({[n]:i})}),Pf=ne(Nf);function Af(t,e){let o=!0;const n=Do(t,e[0]);let r=1;for(;o===!0&&r<e.length;){const s=Do(t,e[r]);o=n===s,r++}return o}function Ef(t,e,o){let n=e[o[0]],r=!1,s=0;for(;!r&&s<o.length;)e[o[s]]!==void 0&&e[o[s]]!==null&&(n=e[o[s]],r=!0),s++;return t?n:""+n}function Bf(t,e,o){let n=e[o[0]];for(let r=0;r<o.length;r++)e[o[r]]!==void 0&&e[o[r]]!==null&&(n=e[o[r]]);return t?n:""+n}function Ui(t,e){const o=[];for(let n=0;n<e.length;n++)t[e[n]]!==void 0&&t[e[n]]!==null&&o.push(t[e[n]]);return o}function $f(t,e,o){return Ui(t,e).join(o)}const Ff=oe((t,{column:e,prefix:o})=>{const r=t.rollup({distinct:Ae.array_agg_distinct(e)}).get("distinct",0).reduce((s,i)=>(s[o?`${o}${i}`:i]=pt(a=>a[e]===null?null:a[e]===i?1:0),s),{});return t.derive(r)}),Rf=ne(Ff),Lf=oe((t,{orders:e})=>t.orderby(...e.map(Vf))),Hf=ne(Lf);function Vf({column:t,direction:e}){return e===De.Descending?zs(t):t}const Wf=oe((t,{key:e,value:o,operation:n})=>t.pivot(e,{[o]:eo(o,n)})),Uf=ne(Wf),Gf=oe((t,{column:e,to:o,map:n})=>t.derive({[o]:pt(r=>Ae.recode(r[e],n))})),Kf=ne(Gf),zf=oe((t,{columns:e})=>t.rename(e)),qf=ne(zf),Yf=oe((t,{column:e,operation:o,to:n})=>t.rollup({[n]:eo(e,o)})),Jf=ne(Yf),Zf=oe((t,{size:e,proportion:o})=>{const n=Math.round(t.numRows()*(o||1)),r=e||n;return t.sample(r)}),Xf=ne(Zf),Qf=oe((t,{columns:e=[]})=>{const o=[e];return o.length===0&&o.push(Rl()),t.select(...o)}),em=ne(Qf),tm=oe((t,{to:e,column:o})=>t.spread(o,{as:e})),nm=ne(tm),om=oe((t,{key:e,value:o})=>{const n=t.columnNames(p=>p!==e&&p!==o),r=t.select(n).objects(),s=[...new Set(t.array(e))],i=t.objects(),a=[],c=r.length!==0?r.length/s.length:s.length;for(let p=0;p<c;p++){let m={};r.length!==0&&(m={...r[p*s.length]});let x=p*s.length;s.forEach(g=>{const d=i[x];m[g]=d!==void 0?d[o]:null,x++}),a.push(m)}return Es(a)}),rm=ne(om),sm=oe(t=>t.ungroup()),im=ne(sm);async function am(t,e){return Qn(t,e,pn.Union)}const lm=oe(t=>t.unorder()),um=ne(lm),cm=oe((t,{columns:e})=>t.unroll(e)),dm=ne(cm),pm=oe((t,{column:e,operation:o,to:n})=>t.derive({[n]:eo(e,o)})),fm=ne(pm),mm={aggregate:qp,bin:Jp,binarize:ef,boolean:nf,chain:ur,concat:of,convert:sf,dedupe:uf,derive:df,difference:pf,erase:mf,fetch:hf,fill:bf,filter:yf,fold:wf,groupby:Sf,impute:Tf,intersect:If,join:jf,lookup:Mf,merge:Pf,onehot:Rf,orderby:Hf,pivot:Uf,recode:Kf,rename:qf,rollup:Jf,sample:Xf,select:em,spread:nm,unfold:rm,ungroup:im,union:am,unorder:um,unroll:dm,window:fm};async function ur(t,e){const{args:{steps:o,nofork:n}}=t,r=n?e:await e.clone();let s={id:t.output,table:Ll({})};for(let a=0;a<o.length;a++){const c=o[a],{verb:p}=c;try{s=await(mm[p]||ur)(c,r),r.set(s)}catch(m){throw console.error(`Pipeline failed on step ${a}`,c),m}}const i={...s,id:t.output};return e.set(i),i}async function hm(t,e){return ur(t,e)}async function xm(t,e){if(t.length===0)throw new Error("no steps in chain");return hm({verb:W.Chain,input:t[0].input,output:t[t.length-1].output,args:{steps:t,nofork:!0}},e)}function gm(t,e){for(var o=-1,n=t==null?0:t.length;++o<n&&e(t[o],o,t)!==!1;);return t}function bm(t,e){return t&&qn(e,qs(e),t)}function vm(t,e){return t&&qn(e,qo(e),t)}function ym(t,e){return qn(t,Ys(t),e)}var Cm=Object.getOwnPropertySymbols,wm=Cm?function(t){for(var e=[];t;)Js(e,Ys(t)),t=Vl(t);return e}:Hl;const Gi=wm;function _m(t,e){return qn(t,Gi(t),e)}function Sm(t){return Wl(t,qo,Gi)}var km=Object.prototype,Tm=km.hasOwnProperty;function Im(t){var e=t.length,o=new t.constructor(e);return e&&typeof t[0]=="string"&&Tm.call(t,"index")&&(o.index=t.index,o.input=t.input),o}function jm(t,e){var o=e?Zs(t.buffer):t.buffer;return new t.constructor(o,t.byteOffset,t.byteLength)}var Dm=/\w*$/;function Mm(t){var e=new t.constructor(t.source,Dm.exec(t));return e.lastIndex=t.lastIndex,e}var as=Rn?Rn.prototype:void 0,ls=as?as.valueOf:void 0;function Om(t){return ls?Object(ls.call(t)):{}}var Nm="[object Boolean]",Pm="[object Date]",Am="[object Map]",Em="[object Number]",Bm="[object RegExp]",$m="[object Set]",Fm="[object String]",Rm="[object Symbol]",Lm="[object ArrayBuffer]",Hm="[object DataView]",Vm="[object Float32Array]",Wm="[object Float64Array]",Um="[object Int8Array]",Gm="[object Int16Array]",Km="[object Int32Array]",zm="[object Uint8Array]",qm="[object Uint8ClampedArray]",Ym="[object Uint16Array]",Jm="[object Uint32Array]";function Zm(t,e,o){var n=t.constructor;switch(e){case Lm:return Zs(t);case Nm:case Pm:return new n(+t);case Hm:return jm(t,o);case Vm:case Wm:case Um:case Gm:case Km:case zm:case qm:case Ym:case Jm:return Ul(t,o);case Am:return new n;case Em:case Fm:return new n(t);case Bm:return Mm(t);case $m:return new n;case Rm:return Om(t)}}var Xm="[object Map]";function Qm(t){return Xs(t)&&Yo(t)==Xm}var us=Ln&&Ln.isMap,eh=us?Yn(us):Qm;const th=eh;var nh="[object Set]";function oh(t){return Xs(t)&&Yo(t)==nh}var cs=Ln&&Ln.isSet,rh=cs?Yn(cs):oh;const sh=rh;var ih=1,ah=2,lh=4,Ki="[object Arguments]",uh="[object Array]",ch="[object Boolean]",dh="[object Date]",ph="[object Error]",zi="[object Function]",fh="[object GeneratorFunction]",mh="[object Map]",hh="[object Number]",qi="[object Object]",xh="[object RegExp]",gh="[object Set]",bh="[object String]",vh="[object Symbol]",yh="[object WeakMap]",Ch="[object ArrayBuffer]",wh="[object DataView]",_h="[object Float32Array]",Sh="[object Float64Array]",kh="[object Int8Array]",Th="[object Int16Array]",Ih="[object Int32Array]",jh="[object Uint8Array]",Dh="[object Uint8ClampedArray]",Mh="[object Uint16Array]",Oh="[object Uint32Array]",le={};le[Ki]=le[uh]=le[Ch]=le[wh]=le[ch]=le[dh]=le[_h]=le[Sh]=le[kh]=le[Th]=le[Ih]=le[mh]=le[hh]=le[qi]=le[xh]=le[gh]=le[bh]=le[vh]=le[jh]=le[Dh]=le[Mh]=le[Oh]=!0;le[ph]=le[zi]=le[yh]=!1;function En(t,e,o,n,r,s){var i,a=e&ih,c=e&ah,p=e&lh;if(o&&(i=r?o(t,n,r,s):o(t)),i!==void 0)return i;if(!Gl(t))return t;var m=Dt(t);if(m){if(i=Im(t),!a)return Kl(t,i)}else{var x=Yo(t),g=x==zi||x==fh;if(zl(t))return ql(t,a);if(x==qi||x==Ki||g&&!r){if(i=c||g?{}:Yl(t),!a)return c?_m(t,vm(i,t)):ym(t,bm(i,t))}else{if(!le[x])return r?t:{};i=Zm(t,x,a)}}s||(s=new Jl);var d=s.get(t);if(d)return d;s.set(t,i),sh(t)?t.forEach(function(b){i.add(En(b,e,o,b,t,s))}):th(t)&&t.forEach(function(b,v){i.set(v,En(b,e,o,v,t,s))});var h=p?c?Sm:Zl:c?qo:qs,f=m?void 0:h(t);return gm(f||t,function(b,v){f&&(v=b,b=t[v]),Xl(i,v,En(b,e,o,v,t,s))}),i}var Nh=1,Ph=4;function zt(t){return En(t,Nh|Ph)}class cr{async get(e){const o=this._storage.get(e);if(!o)throw new Error(`No table with id '${e}' found in store.`);const{container:n}=o;if(!o.resolved){const{resolver:r}=o;if(!r)throw new Error(`No resolver function for unloaded table '${e}'.`);const s=await r(e);n.table=s,this.set(n)}return n}async table(e){return(await this.get(e)).table}set(e){const o={container:e,resolved:!0};return this._storage.set(e.id,o),this.onChange(e.id),this}delete(e){return this._storage.delete(e),this.onChange(),this}queue(e,o){const n={container:{id:e},resolved:!1,resolver:o};return this._storage.set(e,n),this}list(e){return Array.from(this._storage.keys()).filter(e||(()=>!0))}async toMap(){const e=new Map;for(const o of this._storage.keys()){const n=await this.get(o);e.set(o,n)}return e}async toArray(){const e=await this.toMap();return Array.from(e.values())}listen(e,o){return this._tableListeners[e]=o,()=>delete this._tableListeners[e]}unlisten(e){delete this._tableListeners[e]}addChangeListener(e){return this._changeListeners.push(e),()=>{const o=this._changeListeners.findIndex(n=>n===e);o>=0&&(this._changeListeners=this._changeListeners.splice(o,1))}}onChange(e){(async()=>{if(e){const n=await this.get(e),r=this._tableListeners[e];r&&r(n)}this._changeListeners.forEach(n=>n())})()}async print(){const e=this.list();for(let o=0;o<e.length;o++)console.log(`--- ${e[o]} ---`),(await this.get(e[o])).table?.print()}async clone(){const e=await this.toArray();return new cr(zt(e))}clear(){return Array.from(this._storage.keys()).forEach(o=>this.delete(o)),this}constructor(e){this._storage=new Map,e&&e.forEach(o=>{this._storage.set(o.id,{container:o,resolved:!0})}),this._changeListeners=[],this._tableListeners={}}}function Ah(t){return new cr(t)}function Eh(t){return new Bh(t)}function dr(t,e,o){const n={verb:t,input:e,output:o};switch(t){case W.Chain:return{...n,args:{steps:[]}};case W.Bin:return{...n,args:{to:"output",strategy:qe.Auto,fixedcount:10}};case W.Aggregate:case W.Boolean:case W.Derive:case W.Fill:case W.Merge:case W.Rollup:case W.Window:return{...n,args:{to:"output"}};case W.Concat:case W.Difference:case W.Intersect:case W.Union:return{...n,args:{others:[]}};case W.Fold:return{...n,args:{to:["key","value"],columns:[]}};case W.Convert:case W.Erase:case W.Impute:case W.Lookup:case W.Groupby:case W.Dedupe:case W.Select:case W.Unroll:return{...n,args:{columns:[]}};case W.Spread:return{...n,args:{to:[]}};case W.Pivot:return{...n,args:{operation:fn.Any}};case W.Join:return{...n,args:{strategy:lt.Inner}};case W.Binarize:return{...n,args:{to:"output",criteria:[],logical:Ye.OR}};case W.Filter:return{...n,args:{criteria:[],logical:Ye.OR}};case W.Fetch:case W.OneHot:case W.Orderby:case W.Rename:case W.Sample:case W.Ungroup:case W.Unorder:case W.Unfold:}return{...n,args:{}}}class Bh{get store(){return this._store}get steps(){return[...this._steps]}get last(){return this._steps[this._steps.length-1]}get count(){return this._steps.length}get outputs(){return this._steps.map(e=>e.output)}create(e){const o=this.count,n=o===0?"":this._steps[o-1].output,r=dr(e,n,`output-table-${o}`);return this.add(r)}add(e){return this._steps.push(e),this.steps}addAll(e){return e.forEach(o=>this._steps.push(o)),this.steps}clear(){this._steps.forEach(e=>this._store.delete(e.output)),this._steps=[]}delete(e){const o=this.steps.slice(0,e);return this.clear(),this.addAll(o),this.steps}update(e,o){return this._steps[o]=e,this.steps}async run(){return xm(this._steps,this._store)}print(){console.log(this._steps)}constructor(e){this._store=e,this._steps=[]}}var $h=200;function Fh(t,e,o,n){var r=-1,s=ei,i=!0,a=t.length,c=[],p=e.length;if(!a)return c;o&&(e=Jo(e,Yn(o))),n?(s=ti,i=!1):e.length>=$h&&(s=Mo,i=!1,e=new Qs(e));e:for(;++r<a;){var m=t[r],x=o==null?m:o(m);if(m=n||m!==0?m:0,i&&x===x){for(var g=p;g--;)if(e[g]===x)continue e;c.push(m)}else s(e,x,n)||c.push(m)}return c}var ds=Rn?Rn.isConcatSpreadable:void 0;function Rh(t){return Dt(t)||Ql(t)||!!(ds&&t&&t[ds])}function Yi(t,e,o,n,r){var s=-1,i=t.length;for(o||(o=Rh),r||(r=[]);++s<i;){var a=t[s];e>0&&o(a)?e>1?Yi(a,e-1,o,n,r):Js(r,a):n||(r[r.length]=a)}return r}var Lh=ni(function(t,e){return Oo(t)?Fh(t,Yi(e,1,Oo,!0)):[]});const Hh=Lh;var Vh=Math.min;function Wh(t,e,o){for(var n=o?ti:ei,r=t[0].length,s=t.length,i=s,a=Array(s),c=1/0,p=[];i--;){var m=t[i];i&&e&&(m=Jo(m,Yn(e))),c=Vh(m.length,c),a[i]=!o&&(e||r>=120&&m.length>=120)?new Qs(i&&m):void 0}m=t[0];var x=-1,g=a[0];e:for(;++x<r&&p.length<c;){var d=m[x],h=e?e(d):d;if(d=o||d!==0?d:0,!(g?Mo(g,h):n(p,h,o))){for(i=s;--i;){var f=a[i];if(!(f?Mo(f,h):n(t[i],h,o)))continue e}g&&g.push(h),p.push(d)}}return p}function Uh(t){return Oo(t)?t:[]}var Gh=ni(function(t){var e=Jo(t,Uh);return e.length&&e[0]===t[0]?Wh(e):[]});const Kh=Gh;var M;(function(t){t[t.InputTable=0]="InputTable",t[t.InputColumn=1]="InputColumn",t[t.OutputColumn=2]="OutputColumn",t[t.RowModifying=3]="RowModifying",t[t.NumericOnly=4]="NumericOnly"})(M||(M={}));const ps={aggregate:[M.InputTable,M.InputColumn,M.OutputColumn,M.RowModifying],bin:[M.InputTable,M.InputColumn,M.OutputColumn,M.NumericOnly],binarize:[M.InputTable,M.InputColumn,M.OutputColumn],boolean:[M.InputTable,M.OutputColumn],chain:[],concat:[M.InputTable,M.RowModifying],convert:[M.InputTable],dedupe:[M.InputTable,M.RowModifying],derive:[M.InputTable,M.OutputColumn],difference:[M.InputTable,M.RowModifying],erase:[M.InputTable,M.RowModifying],fetch:[],fill:[M.InputTable,M.OutputColumn],filter:[M.InputTable,M.InputColumn,M.RowModifying],fold:[M.InputTable,M.RowModifying],groupby:[M.InputTable],impute:[M.InputTable],intersect:[M.InputTable,M.RowModifying],join:[M.InputTable,M.RowModifying],lookup:[M.InputTable,M.RowModifying],merge:[M.InputTable,M.OutputColumn],pivot:[M.InputTable,M.RowModifying],onehot:[M.InputTable,M.InputColumn],orderby:[M.InputTable],recode:[M.InputTable,M.InputColumn,M.OutputColumn],rename:[M.InputTable],rollup:[M.InputTable,M.InputColumn,M.OutputColumn,M.RowModifying],sample:[M.InputTable,M.RowModifying],select:[M.InputTable],spread:[M.InputTable],unfold:[M.InputTable,M.RowModifying],ungroup:[M.InputTable],union:[M.InputTable,M.RowModifying],unorder:[M.InputTable],unroll:[M.InputTable,M.RowModifying],window:[M.InputTable,M.InputColumn,M.OutputColumn]},zh=bn(M.InputTable),Ji=bn(M.InputColumn),Zi=bn(M.OutputColumn),qh=bn(M.RowModifying),Yh=bn(M.NumericOnly);function bn(t){return Object.keys(ps).filter(e=>ps[e].findIndex(o=>o===t)>=0)}function Jh(t){return to(t,zh)}function Zh(t){return to(t,Ji)}function Xi(t){return to(t,Zi)}function Xh(t){return to(t,Yh)}function to(t,e){return e.findIndex(o=>o===t.verb)>=0}function Qh(t=()=>!0){const e=Kh(Ji,Zi);return Hh(e,qh).filter(t)}const ex=l.exports.memo(function({table:e,order:o,onChange:n,onDelete:r}){const{column:s,direction:i}=o,a=i===De.Ascending,c=a?"Ascending":"Descending",p=l.exports.useCallback((g,d)=>{const h={...o,column:d.key};n&&n(h)},[o,n]),m=l.exports.useCallback(()=>{const g={...o,direction:o.direction===De.Descending?De.Ascending:De.Descending};n&&n(g)},[o,n]),x=l.exports.useCallback(()=>r&&r(),[r]);return u.exports.jsxs(tx,{children:[u.exports.jsx(Ee,{table:e,label:void 0,selectedKey:s,onChange:p}),u.exports.jsx(ye,{toggle:!0,checked:a,title:c,iconProps:{iconName:c},onClick:m}),u.exports.jsx(ye,{title:"Remove this sort",iconProps:{iconName:"Delete"},onClick:x})]})}),tx=_.div`
	display: flex;
	justify-content: flex-start;
`,pr=l.exports.memo(function({store:e,...o}){const n=sx(e);return u.exports.jsx(ot,{label:"Table",placeholder:"Choose table",options:n,styles:me,...o})});function nx(t,e,o,n,r){const s=e.names[o];return r&&r!==s?t:n===De.Ascending?t.sort((i,a)=>i[0]-a[0]):t.sort((i,a)=>a[0]-i[0])}function Qi(t,e,o,n,r,s,i=!0,a,c=0){const p=t[0],m=t[1],x=e.names[o];if(!x)throw new Error(`could not determine column name for level ${o}`);const g=r.slice(c).findIndex(f=>f[x]===p)+c,d={key:p.toString(),name:p.toString(),startIndex:g,level:o,count:m.length,isCollapsed:i?o!==0&&g!==0:!1},h=o+1;if(h<n){const f=nx(m,e,h,s,a).map(b=>Qi(b,e,h,n,r,s,i,a,g));d.children=f}return d}const ox=t=>t,rx=t=>t&&+t;function fr(t){return l.exports.useMemo(()=>t.map(e=>({key:e,text:e.toString()})),[t])}function sx(t){const[e,o]=l.exports.useState(!0),[n,r]=l.exports.useState([]);return l.exports.useEffect(()=>{t?.addChangeListener(()=>o(!0))},[t,o]),l.exports.useEffect(()=>{e&&(o(!1),r(t?.list().sort()||[]))},[t,e,o,r]),fr(n)}function ea(t,e){return fr(t?.columnNames(e)||[])}function ix(t,e,o,n){const r=l.exports.useMemo(()=>{if(!e||!t||t.trim().length===0)return[];const i=o||(()=>e.columnNames().filter(c=>c===t).length!==0?e.rollup({[t]:Ae.array_agg_distinct(t)}).get(t,0)??[]:[])();return n?i.filter(n):i},[t,e,o,n]);return fr(r)}function ax(){return[{key:"%Y-%m-%d",text:"%Y-%m-%d"},{key:"%Y/%m/%d",text:"%Y/%m/%d"},{key:"%B %d, %Y",text:"%B %d, %Y"},{key:"%m-%d-%Y",text:"%m-%d-%Y"},{key:"%m/%d/%Y",text:"%m/%d/%Y"},{key:"%d-%m-%Y",text:"%d-%m-%Y"},{key:"%d/%m/%Y",text:"%d/%m/%Y"},{key:"%Y-%m-%dT%H:%M:%S.%LZ",text:"ISO 8601 (%Y-%m-%dT%H:%M:%S.%LZ)"}]}function ve(t,e,o){return l.exports.useCallback((n,r)=>{const s=zt(t);ft(s,e,r?.key),o&&o(s)},[t,e,o])}function Fe(t,e,o,n=ox){return l.exports.useCallback((r,s)=>{const i=zt(t),a=n(s);ft(i,e,a),o&&o(i)},[t,e,o,n])}function yt(t,e,o,n=rx){return l.exports.useCallback((r,s)=>{const i=zt(t),a=n(s);typeof a=="number"&&(ft(i,e,a),o&&o(i))},[t,e,o,n])}function lx(t,e,o){return l.exports.useCallback((n,r)=>{const s=zt(t);ft(s,e,r),o&&o(s)},[t,e,o])}function ux(t,e){return l.exports.useCallback(o=>{const n=t,r={...n.args};delete r.columns[o],e&&e({...t,args:{...n.args,...r}})},[t,e])}function Se(t,e,o){const[n,r]=l.exports.useState(),s=l.exports.useCallback(i=>r(i.table),[r]);return l.exports.useEffect(()=>(e?r(e):t&&o&&(async(a,c)=>{try{c.listen(a,s);const p=await c.get(a);r(p.table)}catch{}})(t,o),()=>{t&&o&&o.unlisten(t)}),[t,e,o,s]),n}function cx(t,e){const[o,n]=l.exports.useState(!1);return l.exports.useEffect(()=>{const r=new IntersectionObserver(([s])=>{n(s?.isIntersecting??!1)},{rootMargin:e});return t&&r.observe(t),()=>t&&r.unobserve(t)},[t,e]),o}function dx(t,e){return l.exports.useMemo(()=>!t||!e?K.Unknown:Do(t,e),[t,e])}function px(){return l.exports.useMemo(()=>Ah(),[])}function fx(t,e){return l.exports.useMemo(()=>{const o=Eh(t);return e&&o.addAll(e),o},[t,e])}function mx(t){const[e,o]=l.exports.useState(),[n,{toggle:r}]=dn(!1),s=l.exports.useCallback(a=>{o(a),r()},[r,o]),i=l.exports.useCallback(()=>{t&&t(e),r()},[r,e,t]);return{isDeleteModalOpen:n,onConfirmDelete:i,toggleDeleteModalOpen:r,onDeleteClicked:s}}function ta(t){const e=l.exports.useCallback(o=>t?t.list().includes(o):!1,[t]);return l.exports.useCallback(o=>{const n=o.replace(/( \(\d+\))/,"");let r=n,s=1;for(;e(r);)r=`${n} (${s})`,s++;return r},[e])}function hx(){const t=l.exports.useCallback((e,o)=>o.includes(e),[]);return l.exports.useCallback((e,o)=>{const n=e.replace(/( \(\d+\))/,"");let r=n,s=1;for(;t(r,o);)r=`${n} (${s})`,s++;return r},[t])}function xx(){return l.exports.useCallback((t,e="New column")=>{const o=t;return Object.keys(o).forEach(n=>{n==="to"&&!Dt(o[n])&&(o[n]=e)}),o},[])}function na(){const t=hx();return l.exports.useCallback((e,o)=>{let n=e.args;return Object.keys(n).forEach(r=>{if(r==="to"&&!Dt(n[r])){const s=t(n[r],o);n={...n,[r]:s}}}),n},[t])}_.div`
	margin-top: 12px;
`;_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;const Ze=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,z=_.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	margin-bottom: 8px;
`,fs=_.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	margin-bottom: 8px;
	gap: 12px;
`,gx=_.div`
	font-size: 0.85em;
	color: ${({theme:t})=>t.application().midHighContrast().hex()};
`;function bx(t,e){return l.exports.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function Nt(t,e=!0){return l.exports.useMemo(()=>({width:t?.currentWidth||0,height:t?.data?.compact&&e?15:20}),[t,e])}function vx(t,e){return l.exports.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function yx(t,e,o=!1,n){return l.exports.useMemo(()=>{const r=!e||o?t.columnNames():e.map(s=>s.name);if(n&&n.length>0){const s=n.reduce((i,a)=>(i[a]=!0,i),{});return r.filter(i=>s[i])}return r},[t,e,o,n])}function Oe(t,e){return e?.fieldName&&t[e.fieldName]}function Cx(t,e,o){const n=Oe(t,o),r=nu(n,ru);return ou(r).map((i,a)=>({key:`${a}-${i}`,text:i,data:{rowIndex:e,column:o},title:i}))}function oa(t){if(!!Dt(t))return t.reduce((e,o)=>{const n=e[o]||0;return e[o]=n+1,e},{})}function wx(t){return Object.values(t).every(e=>e===1)}function mr(t){return!!(mn(t)||eu(t)||(tu(t)||Dt(t))&&t.length===0)}function _x(t,e=500){const o=setTimeout(()=>t(),e);return()=>clearTimeout(o)}const Sx=5,kx=20,Ro=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Oe(e,o)||[],s=Tx(r),i=Ix(r);return u.exports.jsx("div",{title:i,style:{textAlign:n},children:s})});function Tx(t,e=Sx){return l.exports.useMemo(()=>{const o=`[${t.slice(0,e).join(", ")}]`;return t.length>e?`${o}...`:o},[t,e])}function Ix(t,e=kx){return l.exports.useMemo(()=>{let o=t.slice(0,e).join(`
`);return t.length>e&&(o+=`
...
(+${t.length-e} more)`),o},[t,e])}const ra=l.exports.memo(function({item:e,column:o}){const n=Nt(o),r=jx(n,e,o);return u.exports.jsx("svg",{width:n.width,height:n.height,children:u.exports.jsx("circle",{...r})})});function jx(t,e,o){const n=Me();return l.exports.useMemo(()=>{const r=!!Oe(e,o),{width:s,height:i}=t;return{cx:s/2,cy:i/2,r:i/4,fill:r?n.process().fill().hex():"none",stroke:n.process().stroke().hex()}},[n,t,e,o])}const Dx=l.exports.memo(function({item:e,column:o,textAlign:n="right"}){const r=!!Oe(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})});function sa(t,e){const o=l.exports.useMemo(()=>oi().domain([0,t.length-1]).range(e).clamp(!0),[t,e]);return l.exports.useMemo(()=>(n,r)=>o(r),[o])}function ia(t,e){const o=l.exports.useMemo(()=>[Math.min(...t),Math.max(...t)],[t]),n=l.exports.useMemo(()=>oi().domain(o).range(e),[o,e]);return l.exports.useMemo(()=>o[0]===o[1]?()=>e[1]:r=>n(r),[n,o,e])}function aa(t,e,o){const n=Me();l.exports.useLayoutEffect(()=>{ri(t.current).call(su,n,{width:e<0?0:e,height:o<0?0:o})},[n,t,e,o])}function la(t,e,o){const n=Me(),[r,s]=l.exports.useState();return l.exports.useLayoutEffect(()=>{const i=ri(t.current).append("g").call(iu,n).append("g");s(i)},[n,t,e,o]),r}const hr=l.exports.memo(function({data:e,width:o,height:n,categorical:r=!1,color:s,legend:i,onBarHover:a}){const c=Me(),p=l.exports.useRef(null),m=l.exports.useMemo(()=>r?Dt(s)?s:c.scales().nominal(e.length).toArray():s||c.line().stroke().hex(),[c,e,s,r]),x=l.exports.useMemo(()=>Math.floor((o-4)/e.length),[e,o]),g=sa(e,[x/2,o-x/2]),d=ia(e,[n-1,0]);aa(p,o,n);const h=la(p,o,n);return l.exports.useLayoutEffect(()=>{h&&(h.selectAll("*").remove(),h.selectAll(".bar-group").data(e).enter().append("g").attr("class","bar-group").append("line").attr("class","bar").attr("x1",g).attr("x2",g).attr("y1",d).attr("y2",n).call(si,c.line()).attr("stroke-width",x).attr("stroke",(f,b)=>r?m[b]??null:m).attr("data-legend",(f,b)=>i?.length?i[b]??null:f).attr("data-index",(f,b)=>b).attr("id",(f,b)=>`bar-${b}-${f}-${Math.round(Math.random()*100)}`),a?h.selectAll(".bar").on("mouseover mouseout",a):h.selectAll(".bar-group").append("title").text((f,b)=>i?.length?i[b]??null:f))},[c,h,e,n,g,d,m,r,x,i,a]),u.exports.jsx("svg",{ref:p})}),Mx=l.exports.memo(function({data:e,width:o,height:n,color:r}){const s=Me(),i=l.exports.useRef(null),a=l.exports.useMemo(()=>r||s.line().stroke().hex(),[s,r]),c=sa(e,[0,o]),p=ia(e,[0,n]);aa(i,o,n);const m=la(i,o,n),x=l.exports.useMemo(()=>au(c,p)(e),[e,c,p]);return l.exports.useLayoutEffect(()=>{m&&(m.selectAll("*").remove(),m.append("path").call(si,s.line()).attr("d",x).attr("stroke-width",1).attr("stroke",a))},[s,m,x,a]),u.exports.jsx("svg",{ref:i})}),ua=l.exports.memo(function({column:e,categories:o={}}){const n=l.exports.useMemo(()=>Object.values(o),[o]),r=Nt(e);return u.exports.jsx(hr,{data:n,categorical:!0,width:r.width,height:r.height})}),ca=l.exports.memo(function({onClick:e,column:o,children:n}){const r=l.exports.useCallback(i=>{o&&e&&e(i,o?.data?.selected?void 0:o)},[o,e]),s=l.exports.useMemo(()=>{const i={};return e&&(i.cursor="pointer"),o?.data?.selected&&(i.fontWeight="bold"),i},[e,o]);return u.exports.jsx(Ox,{onClick:r,style:s,children:n})}),Ox=_.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: inherit;
	> * {
		&:first-child {
			padding: 6px 8px 6px 12px;
		}
	}
`,xr=l.exports.memo(function({item:e,column:o,textAlign:n="right"}){const r=Oe(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r&&r.toLocaleString()})}),Nx=l.exports.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=Oe(n,r),a=o?.type??jo(i),c=l.exports.useCallback(m=>{r&&s&&s(m,r?.data?.selected?void 0:r)},[r,s]),p=l.exports.useMemo(()=>{const m={width:"100%"};return s&&(m.cursor="pointer"),r?.data?.selected&&(m.fontWeight="bold"),m},[s,r]);return u.exports.jsx("div",{onClick:c,style:p,children:u.exports.jsxs(xn,{children:[u.exports.jsx(ee,{condition:mr(i),children:u.exports.jsx(gr,{textAlign:a===K.Number?"right":"left"})}),u.exports.jsx(ee,{condition:a===K.Boolean,children:u.exports.jsx(Dx,{...e})}),u.exports.jsx(ee,{condition:a===K.String,children:u.exports.jsx(br,{...e})}),u.exports.jsx(ee,{condition:a===K.Number,children:u.exports.jsx(Qx,{...e,numberFormat:","})}),u.exports.jsx(ee,{condition:a===K.Date,children:u.exports.jsx(xr,{...e})}),u.exports.jsx(ee,{condition:a===K.Array,children:u.exports.jsx(Ro,{...e})}),u.exports.jsx(Kt,{children:u.exports.jsx(fa,{...e})})]})})}),Px=2,Ax=l.exports.memo(function({column:e,isClickable:o,onClick:n}){const r=Me(),{isSorted:s,isSortedDescending:i,iconName:a,iconClassName:c}=e,p=Nt(e),m=l.exports.useMemo(()=>({lineHeight:e.data.compact?Px:"inherit",cursor:o?"pointer":"inherit",display:"flex",justifyContent:"space-between",width:p.width,borderBottom:e.data?.selected?`2px solid ${r.application().accent().hex()}`:"2px solid transparent"}),[r,p,e,o]),x=l.exports.useMemo(()=>({color:e.data?.selected?r.application().accent().hex():r.application().foreground().hex(),width:"100%",textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}),[r,e]),g=l.exports.useMemo(()=>({root:{fontSize:12,color:r.application().midHighContrast().hex()}}),[r]);return u.exports.jsxs("div",{onClick:d=>n&&n(d,e),style:m,children:[u.exports.jsx("div",{style:x,title:e.name,children:e.name}),a?u.exports.jsx(Xe,{className:c,iconName:a}):null,s?u.exports.jsx(Xe,{iconName:i?"SortDown":"SortUp",styles:g}):null]})}),gr=l.exports.memo(function({textAlign:e}){const o=Me(),n=l.exports.useMemo(()=>({width:"100%",textAlign:e,color:o.application().lowContrast().hex()}),[o,e]);return u.exports.jsx("div",{style:n,children:"\u2014"})}),Ex=l.exports.memo(function({props:e,renderers:o}){return u.exports.jsx($x,{className:"header-command-bar",children:o.map((n,r)=>u.exports.jsx(Bx,{children:n(e)},r))})}),Bx=_.div``,$x=_.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${({theme:t})=>t.application().faint().hex()};
	border-bottom: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,da=l.exports.memo(function({item:e,column:o,onCellDropdownSelect:n,rowIndex:r}){const s=Cx(e,r,o)||[],i=s.slice(0,10).map(a=>a.text).join(", ")||"Open to see the values";return u.exports.jsx(ot,{onChange:n,placeholder:i,options:s,styles:{root:{width:"85%"}}})}),Fx=l.exports.memo(function(e){const{features:o,metadata:n,item:r,column:s,index:i,onColumnClick:a}=e,c=n?.type,p=Oe(r,s),m=Rx(p,n,c),x=oa(p);return u.exports.jsx(ca,{onClick:a,column:s,children:u.exports.jsxs(xn,{children:[u.exports.jsx(ee,{condition:mr(p),children:u.exports.jsx(gr,{textAlign:c===K.Number?"right":"left"})}),u.exports.jsx(ee,{condition:c===K.String,children:u.exports.jsx(br,{...e})}),u.exports.jsx(ee,{condition:o.showBooleanSymbol&&c===K.Boolean,children:u.exports.jsx(ra,{...e})}),u.exports.jsx(ee,{condition:o.showNumberMagnitude&&c===K.Number,children:u.exports.jsx(pa,{...e,magnitude:m})}),u.exports.jsx(ee,{condition:o.showDateFormatted&&c===K.Date,children:u.exports.jsx(xr,{...e})}),u.exports.jsx(ee,{condition:o.showCategoricalBar&&c===K.Array,children:u.exports.jsx(ua,{...e,categories:x})}),u.exports.jsx(ee,{condition:o.showSparkbar&&c===K.Array&&x&&x.length,children:u.exports.jsx(ma,{...e})}),u.exports.jsx(ee,{condition:o.showDropdown&&c===K.Array,children:u.exports.jsx(da,{rowIndex:i||0,...e})}),u.exports.jsx(ee,{condition:o.showSparkline&&c===K.Array,children:u.exports.jsx(ha,{...e})}),u.exports.jsx(Kt,{children:u.exports.jsx(Nx,{...e})})]})})});function Rx(t,e,o){return l.exports.useMemo(()=>{if(o!==K.Number||mn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return(t-(e?.stats?.min||0))/n},[o,t,e])}const Lx=8,Hx=l.exports.memo(function({metadata:e,color:o,...n}){const{column:r,onClick:s}=n,i=Nt(r,!1),a=e.type==="string",c=a?e.stats?.categories:e.stats?.bins,p=l.exports.useMemo(()=>(c||[]).map(S=>S.count),[c]),m=Vx(e.stats,a),x=Wx(m),g=Ux(m),[d,h]=l.exports.useState(),[f,b]=l.exports.useState(),v=l.exports.useCallback(S=>{const{target:T,type:O}=S,R=T.dataset.index,A=T.id;O==="mouseover"&&R>=0?(h(g[R]||""),b(A)):(h(void 0),b(void 0))},[g,h,b]),C=l.exports.useMemo(()=>({height:i.height+Lx,cursor:s?"pointer":"inherit"}),[s,i]);return e.stats?.distinct===1?null:u.exports.jsx(u.exports.Fragment,{children:c?u.exports.jsx("div",{onClick:S=>s&&c&&s(S,r,e),title:x,style:C,children:u.exports.jsx(lu,{content:d,id:f,calloutProps:{gapSpace:5,target:`#${f}`},children:u.exports.jsx(hr,{categorical:a,data:p,width:i.width-1,height:i.height,color:o,legend:g,onBarHover:v})})}):null})});function Vx(t,e){return l.exports.useMemo(()=>e?t?.categories||[]:(t?.bins||[]).map(o=>({name:`${o.min}`,count:o.count})),[t,e])}function Wx(t){return l.exports.useMemo(()=>t.reduce((e,o,n)=>{const{name:r,count:s}=o;return e+(n>0?`
`:"")+`${Jn(r)}: ${s}`},""),[t])}function Ux(t){return l.exports.useMemo(()=>t.map(e=>`${Jn(e.name)}: ${e.count}`),[t])}const Gx=(t,e,o,n)=>function(s,i,a){return u.exports.jsx(og,{item:s,index:i,column:a,metadata:t,color:e,onColumnClick:o,onCellDropdownSelect:n})},Kx=(t,e,o,n,r)=>function(i,a,c){return u.exports.jsx(Fx,{index:a||0,item:i,column:c,onCellDropdownSelect:r,onColumnClick:n,metadata:e,color:o,features:t})},zx=t=>function(o,n){return!o||!n?null:u.exports.jsx(u.exports.Fragment,{children:t.map((r,s)=>r({key:`renderer-${o.column.key}${s}`,...o},n))})},qx=(t,e,o)=>function(r,s){if(!r||!s)return null;const i=Xx(t,r);return u.exports.jsx(Ax,{...i,isClickable:e,onClick:o})},Yx=(t,e,o)=>function(r,s){return!r||!s?null:u.exports.jsx(ig,{onClick:e,metadata:t,stats:o,...r})},Jx=t=>function(o,n){return!o||!n?null:u.exports.jsx(Ex,{props:o,renderers:t},o.key)},Zx=(t,e,o)=>function(r,s){return!r||!s?null:u.exports.jsx(Hx,{onClick:o,metadata:t,color:e,...r})};function Xx(t,e){const o=t?.iconName;return o?{...e,column:{...e.column,iconName:o}}:e}const Qx=l.exports.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r}){const s=Oe(e,o),i=ba(s,r);return u.exports.jsx("div",{style:{textAlign:n},children:i})}),pa=l.exports.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r,color:s,magnitude:i=0}){const a=Me(),c=l.exports.useMemo(()=>s||a.rect().fill().hex(),[a,s]),p=Oe(e,o),m=ba(p,r),x=Nt(o),{width:g,height:d}=x,h=l.exports.useMemo(()=>a.text().fill().hex(),[a]),f=i*g;return u.exports.jsx("div",{style:{textAlign:n},children:u.exports.jsxs("svg",{width:g,height:d,children:[u.exports.jsx("rect",{width:f,height:d,x:g-f,fill:c}),u.exports.jsx("text",{fill:h,y:d/2+1,x:g-2,dominantBaseline:"middle",textAnchor:"end",children:m})]})})}),fa=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Oe(e,o)||{};return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})}),eg=20,tg=15,ng=l.exports.memo(function(e){const{item:o,column:n,index:r}=e,s=Oe(o,n)||[],i=n?.currentWidth||0,a=oa(s),c=Object.keys(a).length,p=wx(a);return u.exports.jsxs(xn,{children:[u.exports.jsx(ee,{condition:s.length<=3,children:u.exports.jsx(Ro,{...e})}),u.exports.jsx(ee,{condition:s.length<=tg,children:u.exports.jsx(da,{rowIndex:r||0,...e})}),u.exports.jsx(ee,{condition:c<=eg&&!p,children:u.exports.jsx(ua,{...e,categories:a})}),u.exports.jsx(ee,{condition:s.length<=i,children:u.exports.jsx(ma,{...e})}),u.exports.jsx(ee,{condition:s.length>i,children:u.exports.jsx(ha,{...e})}),u.exports.jsx(Kt,{children:u.exports.jsx(Ro,{...e})})]})}),og=l.exports.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=o?.type,a=Oe(n,r),c=rg(a,o,i);return u.exports.jsx(ca,{onClick:s,column:r,children:u.exports.jsxs(xn,{children:[u.exports.jsx(ee,{condition:mr(a),children:u.exports.jsx(gr,{textAlign:i===K.Number?"right":"left"})}),u.exports.jsx(ee,{condition:i===K.String,children:u.exports.jsx(br,{...e})}),u.exports.jsx(ee,{condition:i===K.Boolean,children:u.exports.jsx(ra,{...e})}),u.exports.jsx(ee,{condition:i===K.Number,children:u.exports.jsx(pa,{...e,magnitude:c})}),u.exports.jsx(ee,{condition:i===K.Date,children:u.exports.jsx(xr,{...e})}),u.exports.jsx(ee,{condition:i===K.Array,children:u.exports.jsx(ng,{...e})}),u.exports.jsx(Kt,{children:u.exports.jsx(fa,{...e})})]})})});function rg(t,e,o){return l.exports.useMemo(()=>{if(o!==K.Number||mn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return n===0?0:(t-(e?.stats?.min||0))/n},[o,t,e])}const ma=l.exports.memo(function({item:e,column:o}){const n=Oe(e,o)||[],r=Nt(o);return u.exports.jsx(hr,{data:n,width:r.width,height:r.height})}),ha=l.exports.memo(function({item:e,column:o,color:n}){const r=Oe(e,o)||[],s=Nt(o);return u.exports.jsx(Mx,{data:r,width:s.width,height:s.height,color:n})});var Ke;(function(t){t.Type="type",t.Count="count",t.Distinct="distinct",t.Invalid="invalid",t.Mode="mode",t.Min="min",t.Max="max",t.Mean="mean",t.Median="median",t.Stdev="stdev"})(Ke||(Ke={}));const xa={distinct:"unique",invalid:"empty"},ga=14,sg=[Ke.Min,Ke.Max,Ke.Distinct,Ke.Invalid],ig=l.exports.memo(function({metadata:e,stats:o=sg,column:n,onClick:r}){const s=Me(),i=l.exports.useMemo(()=>{const p=e.stats||{};return o.map(m=>{const x=p[m];return u.exports.jsx(ag,{name:m,value:x},`${n.key}-${m}`)})},[e,n,o]),a=lg(e.stats),c=l.exports.useMemo(()=>({height:o.length*ga,fontWeight:"normal",fontSize:10,color:s.application().midHighContrast().hex(),cursor:r?"pointer":"inherit"}),[r,s,o]);return u.exports.jsx("div",{onClick:p=>r&&r(p,n,e),title:a,style:c,children:i})}),ag=({name:t,value:e})=>e!==void 0?u.exports.jsxs("div",{style:{height:ga,display:"flex",justifyContent:"space-between",paddingLeft:4,paddingRight:4,lineHeight:1},children:[u.exports.jsxs("div",{style:{textTransform:"capitalize"},children:[xa[t]||t,":"]}),u.exports.jsx("div",{style:{maxWidth:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:Jn(e)})]}):null;function lg(t){return l.exports.useMemo(()=>{const{bins:e,categories:o,...n}=t||{};return Object.entries(n).reduce((r,s,i)=>{const[a,c]=s,p=No(xa[a]||a);return r+(i>0?`
`:"")+`${p}: ${Jn(c)}`},"")},[t])}const ug=l.exports.memo(function({striped:e,columnBorders:o,styles:n,...r}){const s=Me(),{itemIndex:i,compact:a}=r,c=l.exports.useMemo(()=>e&&i%2===0?{root:{width:"100%",background:s.application().faint().hex()},cell:{borderRight:o?`1px solid ${s.application().background().hex(.5)}`:"1px solid transparent",padding:"unset"},...n}:{root:{width:"100%",borderBottom:`1px solid ${s.application().faint().hex()}`},cell:{padding:"unset",borderRight:o?`1px solid ${s.application().faint().hex(.5)}`:"1px solid transparent",borderTop:i===0?`1px solid ${s.application().faint().hex()}`:"none",borderBottom:a?`1px solid ${s.application().faint().hex()}`:"none"},...n},[s,e,o,n,i,a]);return u.exports.jsx(uu,{...r,styles:c})}),br=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Oe(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})}),cg=100,dg=40,pg=10;function fg(t){return l.exports.useMemo(()=>{const e=Math.max(...t?.map(s=>+s()?.props.styles.root.width)||[0]),o=Math.max(...t?.map(s=>s()?.props.items.length)||[0])*dg,n=Math.max(o,e);return Math.max(cg,n+pg)},[t])}function mg(t,e,o,n,r,s={}){const{features:i={},sortColumn:a,sortDirection:c,selectedColumn:p,onColumnClick:m,onCellDropdownSelect:x,includeAllColumns:g=!1,isColumnClickable:d=!1,isDefaultHeaderClickable:h=!1,showColumnBorders:f=!1,compact:b=!1,isResizable:v=!0}=s,C=bx(d,m),S=vx(d,x),T=yg(e),O=xg(d,f),R=yx(t,o,g,n),A=fg(i.commandBar);return l.exports.useMemo(()=>{const F=hg(o);return R.map(G=>{const q=F[G]||{key:G,name:G,minWidth:A,fieldName:G},{iconName:ue,...se}=q,X=e?.columns[G],de=X&&X.type===K.Number?T():void 0,he=i.smartCells&&X?Gx(X,de,C,S):Kx(i,X,de,C,S),te=[qx(q,h,r)];return i.commandBar&&te.push(Jx(i.commandBar)),(i.smartHeaders||i.statsColumnHeaders)&&X&&te.push(Yx(X,i.onStatsColumnHeaderClick,i.statsColumnTypes)),(i.smartHeaders||i.histogramColumnHeaders)&&X&&te.push(Zx(X,de,i.onHistogramColumnHeaderClick)),{onRender:he,onRenderHeader:zx(te),onColumnClick:m,isSorted:!!c&&q.fieldName===a,isSortedDescending:c===De.Descending,styles:O,...se,data:{selected:q.key===p,compact:b,...q.data},isResizable:v}})},[o,R,i,a,c,p,m,C,O,b,v,e,T,S,h,r,A])}function hg(t){return(t||[]).reduce((e,o)=>(e[o.name]=o,e),{})}function xg(t,e){const o=Me();return l.exports.useMemo(()=>({sortIcon:{display:"none"},cursor:t?"pointer":"inherit",cellTitle:{borderRight:e?`1px solid ${o.application().faint().hex(.6)}`:"1px solid transparent"},cellTooltip:{display:"initial",position:"relative"}}),[o,t,e])}function gg(){return l.exports.useCallback((t,e)=>{if(!t||!e)return null;const o={styles:{root:{paddingTop:1},cellSizer:{height:"1.5rem"}},...t};return e(o)},[])}function bg(t,e,o,n,r){const s=Me(),i=l.exports.useMemo(()=>e?.smartHeaders||e?.histogramColumnHeaders||e?.statsColumnHeaders,[e]);return l.exports.useMemo(()=>Hn({},{headerWrapper:{position:t?"sticky":"inherit",zIndex:"2",top:"0",background:s.application().background().hex(),borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`,selectors:{".ms-DetailsHeader":{lineHeight:r&&!i?"normal":"42px",height:"auto",borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`},".ms-DetailsHeader-cell":{cursor:n?"pointer":"default",height:"auto",padding:"unset"}}}},o),[s,i,o,t,n,r])}function ba(t,e){return l.exports.useMemo(()=>mn(t)?"":e?Zo(e)(t):t.toString(),[t,e])}function vg(t,e,o,n=!0){return l.exports.useCallback((r,s)=>{if(!r||!s)return null;const i=t.groups().names[r.groupLevel],a=i?e?.columns[i]:void 0;return o?o(a,i,r):u.exports.jsx(bp,{props:r,columnName:i,lazyLoadGroups:n})},[o,t,n,e?.columns])}function yg(t){const e=Me(),o=l.exports.useMemo(()=>Cg(t),[t]),n=l.exports.useMemo(()=>e.scales().nominal(o),[e,o]);return l.exports.useMemo(()=>{let r=0;return()=>n(r++).hex()},[n])}function Cg(t){return t?Object.values(t.columns).reduce((e,o)=>e+(o.type===K.Number?1:0),0):1}function wg(t,e,o){return l.exports.useMemo(()=>e===0&&o===1/0?t:t.slice(e,e+o),[t,o,e])}function _g(t,e,o=De.Ascending,n){return l.exports.useMemo(()=>{if(!t.isGrouped())return;const r=t.groups().names[0];return e&&e!==r?n:o===De.Ascending?n?.sort():n?.sort().reverse()},[e,n,o,t])}function Sg(t,e,o){return l.exports.useMemo(()=>{let n=[];const r=t.columnNames().includes(e||"");return o?(!e||!o)&&!t.isGrouped()||!r?t.unorder():(e&&n.push(e),t.isGrouped()&&(n=[...t.groups().names,...n]),t.orderby(o===De.Descending?n.map(s=>zs(s)):n)):t},[t,e,o])}function kg(t,e){const[o,n]=l.exports.useState(),[r,s]=l.exports.useState(),i=l.exports.useCallback((a,c)=>{t&&((c?.isSorted||!r)&&s(r===De.Ascending?De.Descending:r===De.Descending?void 0:De.Ascending),n(c?.fieldName)),e&&e(a,c)},[t,e,n,s,r]);return{sortColumn:o,sortDirection:r,handleColumnHeaderClick:i}}function Tg(t=!1,e=!1){return l.exports.useCallback(o=>o?u.exports.jsx(ug,{...o,striped:t,columnBorders:e}):null,[t,e])}function Ig(t,e){return l.exports.useMemo(()=>{if(e&&e.length>0){const o=t.columnNames(),n=e.filter(r=>o.includes(r));return t.select(n)}return t},[t,e])}function jg(t,e,o=!1,n){return l.exports.useMemo(()=>{if(e)return e;if(o){const r=cu(t,o);return n&&n(r,t),r}},[t,e,o,n])}const Dg=l.exports.memo(function({table:e,features:o={},metadata:n,offset:r=0,limit:s=1/0,includeAllColumns:i=!0,visibleColumns:a,isSortable:c=!1,isStriped:p=!1,isColumnClickable:m=!1,showColumnBorders:x=!1,selectedColumn:g,onColumnClick:d,onCellDropdownSelect:h,onRenderGroupHeader:f,onChangeMetadata:b,selectionMode:v=fu.none,layoutMode:C=mu.fixedColumns,columns:S,onColumnHeaderClick:T,styles:O,isHeadersFixed:R=!1,compact:A=!1,isResizable:F=!0,...G}){const[q,ue]=l.exports.useState(0),{sortColumn:se,sortDirection:X,handleColumnHeaderClick:de}=kg(c,T),he=Ig(e,a),te=Sg(he,se,X),be=wg(te,r,s),w=l.exports.useMemo(()=>be.objects(),[be]),y=l.exports.useMemo(()=>e.isGrouped()?be.objects({grouped:"entries"}):void 0,[be,e]),I=_g(e,se,X,y),P=jg(e,n,Og(o),b),E=l.exports.useMemo(()=>c||m||!!T,[c,m,T]),Q=l.exports.useCallback(($,H)=>{const k=()=>ue(xe=>xe+1);$.currentWidth!==H&&_x(k)},[ue]),ce=mg(e,P,S,a,de,{features:o,sortColumn:se,sortDirection:X,selectedColumn:g,onColumnClick:d,onCellDropdownSelect:h,isDefaultHeaderClickable:E,includeAllColumns:i,isColumnClickable:m,showColumnBorders:x,compact:A,isResizable:F}),ie=bg(R,o,O,!!d,A),ge=Tg(p,x),pe=gg(),$e=vg(e,P,f,o.lazyLoadGroups),j=l.exports.useMemo(()=>{if(!be.isGrouped())return;const $=be.groups(),H=$.names.length;return I?.map(k=>Qi(k,$,0,H,w,X,o.lazyLoadGroups,se))},[be,I,w,se,X,o]);return l.exports.useEffect(()=>{ue($=>$+1)},[S,e,A]),u.exports.jsx(Mg,{"data-is-scrollable":"true",children:u.exports.jsx(du,{items:[...w],selectionMode:v,layoutMode:C,groups:j,getKey:($,H)=>H.toString(),groupProps:{onRenderHeader:$e},columns:ce,constrainMode:pu.unconstrained,onRenderRow:ge,onRenderDetailsHeader:pe,onColumnResize:Q,compact:A,...G,listProps:{version:q},styles:ie})})}),Mg=_.div`
	height: inherit;
	position: relative;
	max-height: inherit;
	overflow-y: auto;
	overflow-x: auto;

	span.ms-DetailsHeader-cellTitle {
		background-color: ${({theme:t})=>t.application().background().hex()};
	}

	.ms-List-cell {
		min-height: unset;
	}

	.ms-CommandBar {
		padding: unset;
	}

	.ms-OverflowSet {
		justify-content: center;
	}
`;function Og(t){return Object.values(t||{}).some(e=>e===!0)}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Ng=36;function Pg(t,e){const o=Me();return l.exports.useMemo(()=>({background:e||o.application().accent().hex(),foreground:t||o.application().background().hex()}),[o,e,t])}function Ag(t,e){return l.exports.useMemo(()=>{const o=t.numCols(),n=e?e.length:o,r=o-n;return{total:o,visible:n,hidden:r}},[t,e])}function Eg(t){return l.exports.useMemo(()=>{const e=t.totalRows(),o=t.numRows(),n=e-o;return{total:e,visible:o,hidden:n}},[t])}const Bg=l.exports.memo(function({onSend:e,onChange:o,editedName:n,name:r}){const s=l.exports.useCallback(i=>{if(i.key==="Enter")return e(n);i.key==="Escape"&&e(r)},[e,r,n]);return u.exports.jsx($g,{target:"#editName",directionalHint:Kn.topCenter,onDismiss:()=>e(r),children:u.exports.jsx(Te,{value:n,onKeyDown:s,onChange:o,underlined:!0})})}),$g=_(hu)`
	width: 320;
	max-width: 90%;
	padding: 10px;
`,Fg=l.exports.memo(function({onRenameTable:e,name:o,color:n}){const[r,s]=l.exports.useState(!1),[i,a]=l.exports.useState(o||"");l.exports.useEffect(()=>{a(o)},[o,a]);const c=l.exports.useCallback((m,x)=>{a(x)},[a]),p=l.exports.useCallback(m=>{const x=m||o;e&&e(x),s(!1),a(x)},[e,s,a,o]);return u.exports.jsx(ms,{children:u.exports.jsxs(an,{condition:!!e,children:[u.exports.jsx(ct,{children:u.exports.jsxs(ms,{children:[u.exports.jsx(Rg,{color:n,id:"editName",title:"Edit",onClick:()=>s(!0),children:o}),u.exports.jsx(an,{condition:r,children:u.exports.jsx(ct,{children:u.exports.jsx(Bg,{onSend:p,editedName:i,onChange:c,name:o})})})]})}),u.exports.jsx(Lt,{children:u.exports.jsx(an,{condition:o,children:u.exports.jsx(ct,{children:u.exports.jsx(va,{color:n,children:o})})})})]})})}),va=_.h3`
	font-weight: normal;
	font-size: 0.8em;
	margin-right: 8px;
	color: ${({theme:t,color:e})=>e||t.application().background().hex()};
`,Rg=_(va)`
	cursor: pointer;
	border-bottom: 1px dotted
		${({theme:t})=>t.application().background().hex()};
`,ms=_.div``,Lg=l.exports.memo(function({table:e,name:o,showRowCount:n=!0,showColumnCount:r=!0,commandBar:s,farCommandBar:i,visibleColumns:a,onRenameTable:c,bgColor:p,color:m}){const{background:x,foreground:g}=Pg(m,p),d=l.exports.useMemo(()=>e.isGrouped()?e.groups().size:0,[e]),h=Ag(e,a),f=Eg(e);return u.exports.jsxs(Hg,{bgColor:x,color:g,children:[u.exports.jsx(Vg,{children:s}),u.exports.jsxs(Wg,{children:[o?u.exports.jsx(Fg,{onRenameTable:c,name:o,color:g}):null,n===!0?u.exports.jsx(bo,{children:`${f.visible} row${f.visible!==1?"s":""}${f.hidden>0?` (${f.hidden} filtered)`:""}`}):null,r===!0?u.exports.jsx(bo,{children:`${h.visible} col${h.visible!==1?"s":""}${h.hidden>0?` (${h.hidden} hidden)`:""}`}):null,d?u.exports.jsxs(bo,{children:[d," groups"]}):null]}),u.exports.jsx(Ug,{children:i})]})}),Hg=_.div`
	height: ${Ng}px;
	width: 100%;
	background-color: ${({bgColor:t})=>t};
	color: ${({color:t})=>t};
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
`,bo=_.h3`
	font-weight: normal;
	font-size: 0.8em;
`,Vg=_.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
`,Wg=_.div`
	flex: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
`,Ug=_.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function ya(t,e){const o=Object.entries(t).find(n=>n[1]===e);return o&&o[0]}function Gg(t,e){return l.exports.useCallback(()=>{t&&e&&e(t)},[e,t])}function Kg(t,e,o){const n=l.exports.useMemo(()=>t?Fa(t):null,[t]);return l.exports.useMemo(()=>{if(n){let s=n;return e||(s=Ra()(s)),o||(s=La()(s)),s}},[n,e,o])}function zg(t,e="input",o){const[n,r]=l.exports.useState(),s=na();l.exports.useEffect(()=>{t&&r(t)},[t,r]);const i=l.exports.useCallback(async(a,c)=>{const p=t?.input??e,m=t?.output??e,x=dr(c.key,p,m);x.args=await s(x,o?.columnNames()||[]),r(x)},[r,t,s,e,o]);return{internal:n,handleVerbChange:i,setInternal:r}}const qg=l.exports.memo(function({table:e,step:o,onTransformRequested:n,hideInputColumn:r,hideOutputColumn:s,verbs:i,headerText:a,nextInputTable:c,onDismiss:p,...m}){const{internal:x,setInternal:g,handleVerbChange:d}=zg(o,c,e),h=Kg(x,r,s),f=Gg(x,n),b=l.exports.useMemo(()=>(i||Qh(C=>C!==W.Aggregate&&C!==W.Rollup)).map(C=>({key:C,text:ya(W,C)})),[i]);return u.exports.jsxs(sr,{onDismiss:p,onDismissed:()=>g(void 0),...m,children:[u.exports.jsxs(Yg,{children:[u.exports.jsx(Jg,{children:a}),p&&u.exports.jsx(ye,{iconProps:Xg.cancel,ariaLabel:"Close popup modal",onClick:()=>p()})]}),u.exports.jsxs(Zg,{children:[u.exports.jsx(ot,{placeholder:"Choose transform",options:b,defaultSelectedKey:x?.verb||"",onChange:d}),h&&x?u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(h,{step:x,table:e,onChange:g}),u.exports.jsx(Xo,{onClick:f,children:"Run"})]}):null]})]})}),Yg=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
`,Jg=_.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,Zg=_.div`
	padding: 12px;
`,Xg={cancel:{iconName:"Cancel"}};function rn(){return(rn=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}).apply(this,arguments)}const Qg=["children","options"],hs=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((t,e)=>(t[e.toLowerCase()]=e,t),{for:"htmlFor"}),xs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:"\xA0",quot:"\u201C"},eb=["style","script"],tb=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,nb=/mailto:/i,ob=/\n{2,}$/,Ca=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,rb=/^ *> ?/gm,sb=/^ {2,}\n/,ib=/^(?:( *[-*_]) *){3,}(?:\n *)+\n/,wa=/^\s*(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)+\n?/,_a=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,ab=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,lb=/^(?:\n *)*\n/,ub=/\r\n?/g,cb=/^\[\^([^\]]+)](:.*)\n/,db=/^\[\^([^\]]+)]/,pb=/\f/g,fb=/^\s*?\[(x|\s)\]/,Sa=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ka=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,Lo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,mb=/&([a-z]+);/g,Ta=/^<!--[\s\S]*?(?:-->)/,hb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,Ho=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,xb=/^\{.*\}$/,gb=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,bb=/^<([^ >]+@[^ >]+)>/,vb=/^<([^ >]+:\/[^ >]+)>/,gs=/ *\n+$/,yb=/(?:^|\n)( *)$/,Cb=/-([a-z])?/gi,Ia=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,wb=/^\[([^\]]*)\]:\s*(\S+)\s*("([^"]*)")?/,_b=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Sb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,kb=/(\[|\])/g,Tb=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Ib=/\t/g,jb=/^ *\| */,Db=/(^ *\||\| *$)/g,Mb=/ *$/,Ob=/^ *:-+: *$/,Nb=/^ *:-+ *$/,Pb=/^ *-+: *$/,Ab=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Eb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Bb=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,$b=/^\\([^0-9A-Za-z\s])/,Fb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Rb=/^\n+/,Lb=/^([ \t]*)/,Hb=/\\([^0-9A-Z\s])/gi,bs=new RegExp("^( *)((?:[*+-]|\\d+\\.)) +"),ja=new RegExp("^( *)((?:[*+-]|\\d+\\.)) +[^\\n]*(?:\\n(?!\\1(?:[*+-]|\\d+\\.) )[^\\n]*)*(\\n|$)","gm"),Da=new RegExp("^( *)((?:[*+-]|\\d+\\.)) [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1(?:[*+-]|\\d+\\.) (?!(?:[*+-]|\\d+\\.) ))\\n*|\\s*\\n*$)"),Ma="(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*",Vb=new RegExp("^\\[("+Ma+`)\\]\\(\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),Wb=new RegExp("^!\\[("+Ma+`)\\]\\(\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),Oa=[Ca,_a,wa,Sa,ka,Ta,ja,Da,Ia],Ub=[...Oa,/^[^\n]+(?:  \n|\n{2,})/,Lo,Ho];function Gb(t){return t.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function Kb(t){return Pb.test(t)?"right":Ob.test(t)?"center":Nb.test(t)?"left":null}function vs(t,e,o){const n=o.t;o.t=!0;const r=e(t.trim(),o);o.t=n;let s=[[]];return r.forEach(function(i,a){i.type==="tableSeparator"?a!==0&&a!==r.length-1&&s.push([]):(i.type!=="text"||r[a+1]!=null&&r[a+1].type!=="tableSeparator"||(i.content=i.content.replace(Mb,"")),s[s.length-1].push(i))}),s}function zb(t,e,o){o.o=!0;const n=vs(t[1],e,o),r=t[2].replace(Db,"").split("|").map(Kb),s=function(i,a,c){return i.trim().split(`
`).map(function(p){return vs(p,a,c)})}(t[3],e,o);return o.o=!1,{align:r,cells:s,header:n,type:"table"}}function ys(t,e){return t.align[e]==null?{}:{textAlign:t.align[e]}}function it(t){return function(e,o){return o.o?t.exec(e):null}}function xt(t){return function(e,o){return o.o||o.u?t.exec(e):null}}function et(t){return function(e,o){return o.o||o.u?null:t.exec(e)}}function tn(t){return function(e){return t.exec(e)}}function qb(t,e,o){if(e.o||e.u||o&&!o.endsWith(`
`))return null;let n="";t.split(`
`).every(s=>!Oa.some(i=>i.test(s))&&(n+=s+`
`,s.trim()));const r=n.trimEnd();return r==""?null:[n,r]}function $t(t){try{if(decodeURIComponent(t).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data):/i))return null}catch{return null}return t}function Cs(t){return t.replace(Hb,"$1")}function Bn(t,e,o){const n=o.o||!1,r=o.u||!1;o.o=!0,o.u=!0;const s=t(e,o);return o.o=n,o.u=r,s}function Yb(t,e,o){const n=o.o||!1,r=o.u||!1;o.o=!1,o.u=!0;const s=t(e,o);return o.o=n,o.u=r,s}function Jb(t,e,o){return o.o=!1,t(e+`

`,o)}const ws=(t,e,o)=>({content:Bn(e,t[1],o)});function vo(){return{}}function yo(){return null}function Zb(...t){return t.filter(Boolean).join(" ")}function Co(t,e,o){let n=t;const r=e.split(".");for(;r.length&&(n=n[r[0]],n!==void 0);)r.shift();return n||o}var Y;function Xb(t,e={}){e.overrides=e.overrides||{},e.slugify=e.slugify||Gb,e.namedCodesToUnicode=e.namedCodesToUnicode?rn({},xs,e.namedCodesToUnicode):xs;const o=e.createElement||l.exports.createElement;function n(d,h,...f){const b=Co(e.overrides,`${d}.props`,{});return o(function(v,C){const S=Co(C,v);return S?typeof S=="function"||typeof S=="object"&&"render"in S?S:Co(C,`${v}.component`,v):v}(d,e.overrides),rn({},h,b,{className:Zb(h?.className,b.className)||void 0}),...f)}function r(d){let h=!1;e.forceInline?h=!0:e.forceBlock||(h=Tb.test(d)===!1);const f=m(p(h?d:`${d.trimEnd().replace(Rb,"")}

`,{o:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(e.wrapper===null)return f;const b=e.wrapper||(h?"span":"div");let v;if(f.length>1||e.forceWrapper)v=f;else{if(f.length===1)return v=f[0],typeof v=="string"?n("span",{key:"outer"},v):v;v=null}return l.exports.createElement(b,{key:"outer"},v)}function s(d){const h=d.match(tb);return h?h.reduce(function(f,b,v){const C=b.indexOf("=");if(C!==-1){const S=function(A){return A.indexOf("-")!==-1&&A.match(hb)===null&&(A=A.replace(Cb,function(F,G){return G.toUpperCase()})),A}(b.slice(0,C)).trim(),T=function(A){const F=A[0];return(F==='"'||F==="'")&&A.length>=2&&A[A.length-1]===F?A.slice(1,-1):A}(b.slice(C+1).trim()),O=hs[S]||S,R=f[O]=function(A,F){return A==="style"?F.split(/;\s?/).reduce(function(G,q){const ue=q.slice(0,q.indexOf(":"));return G[ue.replace(/(-[a-z])/g,se=>se[1].toUpperCase())]=q.slice(ue.length+1).trim(),G},{}):A==="href"?$t(F):(F.match(xb)&&(F=F.slice(1,F.length-1)),F==="true"||F!=="false"&&F)}(S,T);typeof R=="string"&&(Lo.test(R)||Ho.test(R))&&(f[O]=l.exports.cloneElement(r(R.trim()),{key:v}))}else b!=="style"&&(f[hs[b]||b]=!0);return f},{}):void 0}const i=[],a={},c={blockQuote:{i:et(Ca),l:Y.HIGH,_:(d,h,f)=>({content:h(d[0].replace(rb,""),f)}),p:(d,h,f)=>n("blockquote",{key:f.g},h(d.content,f))},breakLine:{i:tn(sb),l:Y.HIGH,_:vo,p:(d,h,f)=>n("br",{key:f.g})},breakThematic:{i:et(ib),l:Y.HIGH,_:vo,p:(d,h,f)=>n("hr",{key:f.g})},codeBlock:{i:et(_a),l:Y.MAX,_:d=>({content:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),lang:void 0}),p:(d,h,f)=>n("pre",{key:f.g},n("code",{className:d.lang?`lang-${d.lang}`:""},d.content))},codeFenced:{i:et(wa),l:Y.MAX,_:d=>({content:d[3],lang:d[2]||void 0,type:"codeBlock"})},codeInline:{i:xt(ab),l:Y.LOW,_:d=>({content:d[2]}),p:(d,h,f)=>n("code",{key:f.g},d.content)},footnote:{i:et(cb),l:Y.MAX,_:d=>(i.push({footnote:d[2],identifier:d[1]}),{}),p:yo},footnoteReference:{i:it(db),l:Y.HIGH,_:d=>({content:d[1],target:`#${e.slugify(d[1])}`}),p:(d,h,f)=>n("a",{key:f.g,href:$t(d.target)},n("sup",{key:f.g},d.content))},gfmTask:{i:it(fb),l:Y.HIGH,_:d=>({completed:d[1].toLowerCase()==="x"}),p:(d,h,f)=>n("input",{checked:d.completed,key:f.g,readOnly:!0,type:"checkbox"})},heading:{i:et(Sa),l:Y.HIGH,_:(d,h,f)=>({content:Bn(h,d[2],f),id:e.slugify(d[2]),level:d[1].length}),p:(d,h,f)=>(d.tag=`h${d.level}`,n(d.tag,{id:d.id,key:f.g},h(d.content,f)))},headingSetext:{i:et(ka),l:Y.MAX,_:(d,h,f)=>({content:Bn(h,d[1],f),level:d[2]==="="?1:2,type:"heading"})},htmlComment:{i:tn(Ta),l:Y.HIGH,_:()=>({}),p:yo},image:{i:xt(Wb),l:Y.HIGH,_:d=>({alt:d[1],target:Cs(d[2]),title:d[3]}),p:(d,h,f)=>n("img",{key:f.g,alt:d.alt||void 0,title:d.title||void 0,src:$t(d.target)})},link:{i:it(Vb),l:Y.LOW,_:(d,h,f)=>({content:Yb(h,d[1],f),target:Cs(d[2]),title:d[3]}),p:(d,h,f)=>n("a",{key:f.g,href:$t(d.target),title:d.title},h(d.content,f))},linkAngleBraceStyleDetector:{i:it(vb),l:Y.MAX,_:d=>({content:[{content:d[1],type:"text"}],target:d[1],type:"link"})},linkBareUrlDetector:{i:(d,h)=>h.m?null:it(gb)(d,h),l:Y.MAX,_:d=>({content:[{content:d[1],type:"text"}],target:d[1],title:void 0,type:"link"})},linkMailtoDetector:{i:it(bb),l:Y.MAX,_(d){let h=d[1],f=d[1];return nb.test(f)||(f="mailto:"+f),{content:[{content:h.replace("mailto:",""),type:"text"}],target:f,type:"link"}}},list:{i(d,h,f){const b=yb.exec(f);return!b||!h.h&&h.o?null:Da.exec(d=b[1]+d)},l:Y.HIGH,_(d,h,f){const b=d[2],v=b.length>1,C=v?+b:void 0,S=d[0].replace(ob,`
`).match(ja);let T=!1;return{items:S.map(function(O,R){const A=bs.exec(O)[0].length,F=new RegExp("^ {1,"+A+"}","gm"),G=O.replace(F,"").replace(bs,""),q=R===S.length-1,ue=G.indexOf(`

`)!==-1||q&&T;T=ue;const se=f.o,X=f.h;let de;f.h=!0,ue?(f.o=!1,de=G.replace(gs,`

`)):(f.o=!0,de=G.replace(gs,""));const he=h(de,f);return f.o=se,f.h=X,he}),ordered:v,start:C}},p:(d,h,f)=>n(d.ordered?"ol":"ul",{key:f.g,start:d.start},d.items.map(function(b,v){return n("li",{key:v},h(b,f))}))},newlineCoalescer:{i:et(lb),l:Y.LOW,_:vo,p:()=>`
`},paragraph:{i:qb,l:Y.LOW,_:ws,p:(d,h,f)=>n("p",{key:f.g},h(d.content,f))},ref:{i:it(wb),l:Y.MAX,_:d=>(a[d[1]]={target:d[2],title:d[4]},{}),p:yo},refImage:{i:xt(_b),l:Y.MAX,_:d=>({alt:d[1]||void 0,ref:d[2]}),p:(d,h,f)=>n("img",{key:f.g,alt:d.alt,src:$t(a[d.ref].target),title:a[d.ref].title})},refLink:{i:it(Sb),l:Y.MAX,_:(d,h,f)=>({content:h(d[1],f),fallbackContent:h(d[0].replace(kb,"\\$1"),f),ref:d[2]}),p:(d,h,f)=>a[d.ref]?n("a",{key:f.g,href:$t(a[d.ref].target),title:a[d.ref].title},h(d.content,f)):n("span",{key:f.g},h(d.fallbackContent,f))},table:{i:et(Ia),l:Y.HIGH,_:zb,p:(d,h,f)=>n("table",{key:f.g},n("thead",null,n("tr",null,d.header.map(function(b,v){return n("th",{key:v,style:ys(d,v)},h(b,f))}))),n("tbody",null,d.cells.map(function(b,v){return n("tr",{key:v},b.map(function(C,S){return n("td",{key:S,style:ys(d,S)},h(C,f))}))})))},tableSeparator:{i:function(d,h){return h.t?jb.exec(d):null},l:Y.HIGH,_:function(){return{type:"tableSeparator"}},p:()=>" | "},text:{i:tn(Fb),l:Y.MIN,_:d=>({content:d[0].replace(mb,(h,f)=>e.namedCodesToUnicode[f]?e.namedCodesToUnicode[f]:h)}),p:d=>d.content},textBolded:{i:xt(Ab),l:Y.MED,_:(d,h,f)=>({content:h(d[2],f)}),p:(d,h,f)=>n("strong",{key:f.g},h(d.content,f))},textEmphasized:{i:xt(Eb),l:Y.LOW,_:(d,h,f)=>({content:h(d[2],f)}),p:(d,h,f)=>n("em",{key:f.g},h(d.content,f))},textEscaped:{i:xt($b),l:Y.HIGH,_:d=>({content:d[1],type:"text"})},textStrikethroughed:{i:xt(Bb),l:Y.LOW,_:ws,p:(d,h,f)=>n("del",{key:f.g},h(d.content,f))}};e.disableParsingRawHTML!==!0&&(c.htmlBlock={i:tn(Lo),l:Y.HIGH,_(d,h,f){const[,b]=d[3].match(Lb),v=new RegExp(`^${b}`,"gm"),C=d[3].replace(v,""),S=(T=C,Ub.some(F=>F.test(T))?Jb:Bn);var T;const O=d[1].toLowerCase(),R=eb.indexOf(O)!==-1;f.m=f.m||O==="a";const A=R?d[3]:S(h,C,f);return f.m=!1,{attrs:s(d[2]),content:A,noInnerParse:R,tag:R?O:d[1]}},p:(d,h,f)=>n(d.tag,rn({key:f.g},d.attrs),d.noInnerParse?d.content:h(d.content,f))},c.htmlSelfClosing={i:tn(Ho),l:Y.HIGH,_:d=>({attrs:s(d[2]||""),tag:d[1]}),p:(d,h,f)=>n(d.tag,rn({},d.attrs,{key:f.g}))});const p=function(d){let h=Object.keys(d);function f(b,v){let C=[],S="";for(;b;){let T=0;for(;T<h.length;){const O=h[T],R=d[O],A=R.i(b,v,S);if(A){const F=A[0];b=b.substring(F.length);const G=R._(A,f,v);G.type==null&&(G.type=O),C.push(G),S=F;break}T++}}return C}return h.sort(function(b,v){let C=d[b].l,S=d[v].l;return C!==S?C-S:b<v?-1:1}),function(b,v){return f(function(C){return C.replace(ub,`
`).replace(pb,"").replace(Ib,"    ")}(b),v)}}(c),m=(x=function(d){return function(h,f,b){return d[h.type].p(h,f,b)}}(c),function d(h,f={}){if(Array.isArray(h)){const b=f.g,v=[];let C=!1;for(let S=0;S<h.length;S++){f.g=S;const T=d(h[S],f),O=typeof T=="string";O&&C?v[v.length-1]+=T:T!==null&&v.push(T),C=O}return f.g=b,v}return x(h,d,f)});var x;const g=r(t);return i.length?n("div",null,g,n("footer",{key:"footer"},i.map(function(d){return n("div",{id:e.slugify(d.identifier),key:d.identifier},d.identifier,m(p(d.footnote,{o:!0})))}))):g}(function(t){t[t.MAX=0]="MAX",t[t.HIGH=1]="HIGH",t[t.MED=2]="MED",t[t.LOW=3]="LOW",t[t.MIN=4]="MIN"})(Y||(Y={}));const Qb=t=>{let{children:e,options:o}=t,n=function(r,s){if(r==null)return{};var i,a,c={},p=Object.keys(r);for(a=0;a<p.length;a++)s.indexOf(i=p[a])>=0||(c[i]=r[i]);return c}(t,Qg);return l.exports.cloneElement(Xb(e,o),n)};function ev(t){return l.exports.useCallback(e=>t[e]||"",[t])}function tv(t){return l.exports.useCallback(e=>{if(!e.includes(window.location.origin))return window.open(e,"_blank");const o=e.split(`${window.location.origin}/`).pop()?.replace("/",".").replace(/.md/,"");o&&t(n=>[...n,o])},[t])}function nv(t){return l.exports.useCallback(()=>{t(e=>e.slice(0,-1))},[t])}function ov(t,e){return l.exports.useCallback(()=>{e([t])},[e,t])}const rv=l.exports.memo(function({name:e="",index:o}){const n=l.exports.useRef(null),r=ev(o),[s,i]=l.exports.useState([e]);e!==s[0]&&i([e]);const a=tv(i),c=ov(e,i),p=nv(i),m=l.exports.useCallback(f=>{const b=/(?<=##.*?\n)([\s\S]*)/g;return f.replace(b,'<div className="details">$1</div>')},[]),x=l.exports.useMemo(()=>{const f=r(s[s.length-1]||"");return m(f)},[s,r,m]);l.exports.useEffect(()=>{n?.current&&n.current.querySelectorAll("a").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),a(v.target.href)})})},[a,s,n]);const g=l.exports.useCallback(f=>{const b=f.target.nodeName==="H2"?f.target:f.target.closest("h2");b.classList.contains("active")?b.classList.remove("active"):b.classList.add("active")},[]),h={overrides:{h2:{component:l.exports.useCallback(({children:f,...b})=>u.exports.jsxs("h2",{...b,children:[f,u.exports.jsx(ye,{onClick:g,"aria-label":"Emoji",iconProps:{iconName:"AddTo"}})]}),[g])}}};return u.exports.jsxs(sv,{ref:n,children:[u.exports.jsxs(iv,{children:[s.length>2?u.exports.jsx(_s,{onClick:p,iconProps:{iconName:"Back"},"aria-label":"Emoji"}):null,s.length>1?u.exports.jsx(_s,{onClick:c,iconProps:{iconName:"Home"},"aria-label":"Emoji"}):null]}),u.exports.jsx(Qb,{options:h,children:x})]})}),sv=_.div`
	position: relative;

	h1 {
		margin-top: 0;
		text-transform: uppercase;
		color: ${({theme:t})=>t.application().lowMidContrast().hex()};
	}

	h2 {
		color: ${({theme:t})=>t.application().midContrast().hex()};

		display: flex;
		align-items: center;
		gap: 1rem;

		&.active + .details {
			opacity: 1;
			height: auto;
			transform: translateX(0);
			overflow-x: auto;
		}
	}

	table {
		border-collapse: collapse;

		th {
			font-weight: bold;
		}

		td,
		th {
			border: 1px solid
				${({theme:t})=>t.application().lowContrast().hex()};
			padding: 5px;
			text-align: center;
		}
	}

	.details {
		opacity: 0;
		height: 0;
		transition: transform 0.5s ease-in-out;
		transform: translateX(100%);
		overflow-x: hidden;
	}
`,_s=_(ye)`
	font-size: 2.5rem;
`,iv=_.div`
	position: absolute;
	top: 0;
	right: 0;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */class av{get isLoading(){return this._isLoading}start(){this._isLoading=!0}stop(){this._isLoading=!1}constructor(){this._isLoading=!1}}const Ss={};function lv(t){const e=Ss[t];if(!e){const o=new av;return Ss[t]=o,o}return e}var Vo;(function(t){t.Tables="tables",t.Steps="steps",t.Preview="preview"})(Vo||(Vo={}));const uv=l.exports.memo(function({toggle:e,onConfirm:o,show:n,title:r,subText:s}){const i=l.exports.useMemo(()=>({type:ut.normal,title:r,subText:s}),[r,s]);return u.exports.jsx(Mi,{dialogContentProps:i,hidden:!n,onDismiss:e,children:u.exports.jsxs(Di,{children:[u.exports.jsx(Xo,{onClick:o,text:"Yes"}),u.exports.jsx(Zn,{onClick:e,text:"No"})]})})});var Ct;(function(t){t.Table="table",t.Column="column"})(Ct||(Ct={}));function cv(t,e,o,n){const[r,s]=l.exports.useState(),[i,a]=l.exports.useState(),[c,{setTrue:p,setFalse:m}]=dn(!1),x=l.exports.useCallback(()=>{m(),s(void 0),a(void 0)},[s,a,m]),g=pv(s,a,p),d=l.exports.useCallback(S=>{n&&n(S,i),x()},[n,x,i]),h=dv(t,e,o,n),f=l.exports.useMemo(()=>`button-${Math.round(Math.random()*3)}`,[]),[b,v]=l.exports.useState(f);l.exports.useEffect(()=>{v(i!==void 0?`.step-card-${i}`:`#${f}`)},[f,i]);const C=l.exports.useCallback(()=>{p()},[p]);return{step:r,onDuplicateClicked:h,onDismissTransformModal:x,onEditClicked:g,onCreate:d,isTransformModalOpen:c,onStartNewStep:C,addStepButtonId:f,editorTarget:b}}function dv(t,e,o,n){const r=ta(e),s=na();return l.exports.useCallback(async i=>{const a=t===Ct.Table?r(i.output):i.output,c=e?await e.table(i.output):o,p=await s(i,c?.columnNames()??[]),m={...i,args:p,input:i.output,output:a};n&&n(m)},[n,r,s,t,e,o])}function pv(t,e,o){return l.exports.useCallback((n,r)=>{t(n),e(r),o()},[t,o,e])}const fv=l.exports.memo(function({onDelete:e,onSave:o,onSelect:n,store:r,steps:s,type:i=Ct.Table,table:a,...c}){const{onDeleteClicked:p,toggleDeleteModalOpen:m,isDeleteModalOpen:x,onConfirmDelete:g}=mx(e),{step:d,onDuplicateClicked:h,onEditClicked:f,onCreate:b,onDismissTransformModal:v,onStartNewStep:C,isTransformModalOpen:S,addStepButtonId:T,editorTarget:O}=cv(i,r,a,o);return u.exports.jsxs(mv,{children:[u.exports.jsx(JC,{onDeleteClicked:p,onSelect:n,onEditClicked:f,steps:s,onDuplicateClicked:h,onStartNewStep:C,buttonId:T}),u.exports.jsxs("div",{children:[i===Ct.Table&&S&&u.exports.jsx(dw,{target:O,step:d,onTransformRequested:b,isOpen:S,store:r,onDismiss:v,styles:{calloutMain:{overflow:"hidden"}},...c}),i===Ct.Column&&a&&u.exports.jsx(qg,{step:d,table:a,onTransformRequested:b,isOpen:S,onDismiss:v,...c}),e&&u.exports.jsx(uv,{toggle:m,title:"Are you sure you want to delete this step?",subText:i===Ct.Table?"You will also lose any table transformations made after this step.":"",show:x,onConfirm:g})]})]})}),mv=_.div`
	width: 97%;
	display: grid;
`,Pe=l.exports.memo(function(e){const o=hv(e.enumeration,e.labels);return u.exports.jsx(ot,{options:o,styles:sp,...e})});function hv(t,e){return l.exports.useMemo(()=>Object.entries(t).map(n=>{const[r,s]=n,i=e&&e[s]||xv(r);return{key:s,text:i}}),[t,e])}function xv(t){const e=t.replace(/([A-Z])/g," $1").trim().split(/\s/),o=e[0],n=e.slice(1).map(r=>r.toLocaleLowerCase());return[o,...n].join(" ")}const gv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=ve(i,"args.groupby",r),p=ve(i,"args.operation",r);return u.exports.jsxs(bv,{children:[u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:a,label:"Column to group by",selectedKey:i.args.groupby,onChange:c})}),u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,enumeration:fn,label:"Function",selectedKey:i.args.operation,onChange:p})})]})}),bv=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,vv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"group by",value:r.groupby},{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),yv=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=ve(n,"args.strategy",o),s=yt(n,"args.fixedcount",o),i=yt(n,"args.fixedwidth",o),a=yt(n,"args.min",o),c=yt(n,"args.max",o),p=lx(n,"args.clamped",o);return u.exports.jsxs(Cv,{children:[u.exports.jsxs(fs,{children:[u.exports.jsx(Pe,{required:!0,enumeration:qe,label:"Bin strategy",selectedKey:n.args.strategy,onChange:r,styles:gt}),u.exports.jsxs(xn,{children:[u.exports.jsx(ee,{condition:n.args.strategy===qe.FixedCount,children:u.exports.jsx(bt,{label:"Bin count",labelPosition:vt.top,min:1,max:100,step:1,value:n.args.fixedcount?`${n.args.fixedcount}`:void 0,styles:gt,onChange:s},"spin-count")}),u.exports.jsx(ee,{condition:n.args.strategy===qe.FixedWidth,children:u.exports.jsx(bt,{label:"Bin size",labelPosition:vt.top,value:n.args.fixedwidth?`${n.args.fixedwidth}`:void 0,styles:gt,onChange:i},"spin-size")})]})]}),u.exports.jsx(an,{condition:n.args.strategy!==qe.Auto,children:u.exports.jsxs(ct,{children:[u.exports.jsxs(fs,{children:[u.exports.jsx(bt,{label:"Min boundary",labelPosition:vt.top,value:n.args.min?`${n.args.min}`:void 0,styles:gt,onChange:a}),u.exports.jsx(bt,{label:"Max boundary",labelPosition:vt.top,value:n.args.max?`${n.args.max}`:void 0,styles:gt,onChange:c})]}),u.exports.jsx(z,{children:u.exports.jsx(Ws,{label:"Clamp to min/max",checked:n.args.clamped,onChange:p})})]})})]})}),Cv=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,wv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column,sub:[{before:"using",value:r.strategy,after:"strategy",sub:r.strategy&&r.strategy!==qe.Auto&&r.strategy?[{value:r.strategy===qe.FixedCount?r.fixedcount:r.fixedwidth,after:r.strategy===qe.FixedCount?"bins":"bin width"},{before:"min",value:r.min},{before:"max",value:r.max},{value:r.clamped?"clamped":"not clamped"}]:void 0}]}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),_v=l.exports.memo(function({options:e,selectedKeys:o,onSelectAllOrNone:n,...r}){const s=l.exports.useMemo(()=>{const c=(o||[]).reduce((m,x)=>(m[x]=!0,m),{});return[...e.map(m=>{const x=!!c[m.key];return{...m,selected:x}}),{key:"--divider--",text:"-",itemType:1,selected:!1},{key:"--actions--",text:"",itemType:2,data:!0,selected:!1}]},[e,o]),i=l.exports.useCallback(c=>{n&&n(c?e:[])},[e,n]),a=l.exports.useCallback(c=>c?.data?u.exports.jsxs(Sv,{children:[u.exports.jsx(ks,{onClick:()=>i(!0),children:"All"}),u.exports.jsx(kv,{children:"|"}),u.exports.jsx(ks,{onClick:()=>i(!1),children:"None"})]}):u.exports.jsx("span",{children:c?.text}),[i]);return u.exports.jsx(ot,{required:!0,multiSelect:!0,options:s,selectedKeys:o,styles:me,onRenderOption:a,...r})}),Sv=_.div`
	display: flex;
	justify-content: space-around;
`,ks=_.a`
	cursor: pointer;
`,kv=_.div`
	margin-left: 4px;
	margin-right: 4px;
	color: ${({theme:t})=>t.application().lowContrast().hex()};
`,qt=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i}){const a=Se(s||e.input,n,o),c=l.exports.useMemo(()=>e,[e]),p=l.exports.useCallback((g,d)=>{const{columns:h=[]}=c.args;let f=[...h];d&&(d.selected?f.push(d.key):f=f.filter(b=>b!==d.key)),r&&r({...c,args:{...c.args,columns:f}})},[c,r]),m=l.exports.useCallback(g=>{r&&r({...c,args:{...c.args,columns:g.map(d=>d.key)}})},[r,c]),x=l.exports.useMemo(()=>a?.columnNames().map(g=>({key:g,text:g}))||[],[a]);return u.exports.jsx(Tv,{children:a?u.exports.jsx(_v,{required:!0,label:i||"Columns",placeholder:"Select columns",options:x,selectedKeys:c.args.columns,onChange:p,onSelectAllOrNone:m}):null})}),Tv=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;function Iv(t){return l.exports.useMemo(()=>{const{operator:e}=t;return e===Ue.IsEmpty||e===Ue.IsNotEmpty||e===Ge.IsEmpty||e===Ge.IsNotEmpty||e===ze.IsTrue||e===ze.IsFalse||e===ze.IsEmpty||e===ze.IsNotEmpty},[t])}function jv(t){return l.exports.useMemo(()=>{switch(t){case K.String:return"text or column";case K.Number:return"number or column";case K.Boolean:return"boolean or column"}},[t])}function Dv(t,e){const o=l.exports.useMemo(()=>t?Qo(t):{},[t]),n=l.exports.useMemo(()=>o[e],[o,e]),r=l.exports.useMemo(()=>s=>o[s]===n,[o,n]);return{type:n,columnFilter:r}}const Mv=l.exports.memo(function({table:e,column:o,criterion:n,onChange:r,suppressLabels:s=!1}){const i=l.exports.useCallback((h,f)=>{r&&r({...n,operator:f?.key})},[n,r]),a=l.exports.useCallback((h,f,b,v)=>{const C={...n,type:f?ln.Column:ln.Value,value:f?f.key:v};r&&r(C)},[n,r]),{type:c,columnFilter:p}=Dv(e,o),m=l.exports.useMemo(()=>{const h={required:!s,label:s?void 0:"Function",selectedKey:n.operator,onChange:i,styles:Pv};if(o){if(c===K.String)return u.exports.jsx(Pe,{enumeration:Ge,...h});if(c===K.Boolean)return u.exports.jsx(Pe,{enumeration:ze,...h})}const f={"=":"=","!=":"!=","<":"<","<=":"<=",">":">",">=":">="};return u.exports.jsx(Pe,{enumeration:Ue,...h,labels:f})},[c,o,n,i,s]),x=Iv(n),g=l.exports.useCallback(()=>r&&r(),[r]),d=jv(c);return u.exports.jsxs(Ov,{children:[u.exports.jsxs(Nv,{children:[m,u.exports.jsx(lp,{required:!s,table:e,filter:p,disabled:x,label:s?void 0:"Comparison value",placeholder:d,text:n.value?`${n.value}`:void 0,onChange:a,styles:gt}),u.exports.jsx(ye,{title:"Remove this criterion",iconProps:{iconName:"Delete"},onClick:g})]}),c===K.String?u.exports.jsx(gx,{children:"String comparisons are not case-sensitive"}):null]})}),Ov=_.div`
	display: flex;
	flex-direction: column;
`,Nv=_.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
`,Pv={root:{...gt.root,marginRight:12}};function Av(t,e,o,n){const r={...t};ft(r,e,o),n&&n(r)}function vr(t,e,o){return l.exports.useCallback((n,r)=>Av(t,e,r?.key,o),[t,e,o])}const Na=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i="join"}){const a=l.exports.useMemo(()=>e,[e]),c=Se(s||a.input,n,o),p=Se(a.args.other,n,o),m=Ev(a),x=Bv(a),g=vr(a,"args.other",r),d=$v(a,r),h=Fv(a,r);return u.exports.jsxs(Rv,{children:[u.exports.jsx(z,{children:u.exports.jsx(pr,{store:o,label:`${No(i)} table`,selectedKey:a.args.other,onChange:g})}),u.exports.jsx(z,{children:u.exports.jsx(Ee,{table:c,required:!0,label:`Input ${i} key`,selectedKey:m,onChange:d})}),u.exports.jsx(z,{children:u.exports.jsx(Ee,{table:p,label:`${No(i)} table key`,selectedKey:x,onChange:h})})]})});function Ev(t){return l.exports.useMemo(()=>t.args.on&&t.args.on.length>0?t.args.on[0]:void 0,[t])}function Bv(t){return l.exports.useMemo(()=>t.args.on&&t.args.on.length>1?t.args.on[1]:void 0,[t])}function $v(t,e){return l.exports.useCallback((o,n)=>{const r=t.args.on||[];r[0]=n.key,e&&e({...t,args:{...t.args,on:r}})},[t,e])}function Fv(t,e){return l.exports.useCallback((o,n)=>{const r=t.args.on;r&&(r[1]=n.key),e&&e({...t,args:{...t.args,on:r}})},[t,e])}const Rv=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
`,Pa=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,criteria:[...i.args.criteria||[],{}]}})},[i,r]),p=l.exports.useCallback((g,d)=>{const h=[...i.args.criteria];g===void 0?h.splice(d,1):h[d]=g,r&&r({...i,args:{...i.args,criteria:h}})},[i,r]),m=ve(i,"args.logical",r),x=Lv(a,i.args.column,i.args.criteria,p);return u.exports.jsxs(Hv,{children:[x,u.exports.jsx(Gt,{onClick:c,iconProps:{iconName:"Add"},disabled:!a,children:"Add criteria"}),i.args.criteria.length>1?u.exports.jsx(z,{children:u.exports.jsx(Pe,{label:"Logical combination",enumeration:Ye,labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},selectedKey:i.args.logical,onChange:m})}):null]})});function Lv(t,e,o,n){return t?o.map((r,s)=>{const i=a=>n(a,s);return u.exports.jsx(Vv,{index:s,children:u.exports.jsx(Mv,{table:t,column:e,criterion:r,onChange:i,suppressLabels:s>0})},`filter-function-${s}`)}):null}const Hv=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,Vv=_.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({index:t})=>t>0?6:0}px;
`,Wv=l.exports.memo(function(e){return u.exports.jsx(Pa,{...e})}),Uv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r?.column,after:"row value",sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===ln.Column?"row value":""}))}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Gv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=l.exports.useCallback((g,d)=>{const{columns:h=[]}=i.args;let f=[...h];d&&(d.selected?f.push(d.key):f=f.filter(b=>b!==d.key)),r&&r({...i,args:{...i.args,columns:f}})},[i,r]),p=vr(i,"args.operator",r),m=l.exports.useMemo(()=>{const g=a?.columnNames()||[],d=(i.args.columns||[]).reduce((h,f)=>(h[f]=!0,h),{});return g.map(h=>{const f=i.args?.columns&&!!d[h];return{key:h,text:h,selected:f}})},[a,i]),x=l.exports.useMemo(()=>m.filter(g=>g.selected).map(g=>g.key),[m]);return u.exports.jsxs(Kv,{children:[u.exports.jsx(z,{children:a?u.exports.jsx(ot,{label:"Columns",styles:me,multiSelect:!0,options:m,selectedKeys:x,onChange:c}):null}),u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,label:"Logical operator",labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},enumeration:Ye,selectedKey:i.args.operator,onChange:p})})]})}),Kv=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,zv=9;function Re(t,e,o,n){let r=zv-o;n.showInput&&r--,n.showOutput&&r--;const s=t.map(e),i=s.slice(0,r),a=s.length-i.length;return a>0&&i.splice(r-1,2,{before:`+${a+1} more...`,value:"",title:s.slice(r-1).map(c=>[c.before,c.value,c.after].join(" ")).join(`
`)}),i}const qv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns||[],i=>({value:i}),3,e);return[{before:`combine column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"using operator",value:r.operator}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Sn=l.exports.memo(function(e){return u.exports.jsx(qt,{...e})}),kn=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns||[],i=>({value:i}),1,e);return[{before:`with column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(re,{...e,rows:o})});function Yv(t,e){if(t!==void 0&&e!==void 0)return(t?Qo(t):{})[e]}const Jv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),[c,p]=l.exports.useState(),m=ve(i,"args.type",r),x=Fe(i,"args.radix",r),g=l.exports.useCallback((d,h,f,b)=>{const v=zt(e);ft(v,"args.formatPattern",h?h.key:b),r&&r(v)},[e,r]);return l.exports.useEffect(()=>{p(!1),i.args.columns.forEach(d=>{Yv(a,d)===K.Date&&p(!0)})},[i.args.columns,a]),u.exports.jsxs(Zv,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(qt,{label:"Columns to convert",step:e,store:o,onChange:r})}),u.exports.jsx(Ze,{children:u.exports.jsx(Pe,{required:!0,label:"Data type",enumeration:Je,selectedKey:i.args.type,onChange:m})}),i.args.type===Je.Integer?u.exports.jsx(Ze,{children:u.exports.jsx(Te,{label:"Base (radix)",value:i.args.radix?`${i.args.radix}`:"",styles:me,onChange:x})}):null,c||i.args.type===Je.Date?u.exports.jsx(Ze,{children:u.exports.jsx(cp,{required:i.args.type===Je.Date,label:"Date format pattern",placeholder:"pattern",text:i.args.formatPattern?`${i.args.formatPattern}`:void 0,onChange:g,styles:me})}):null]})}),Zv=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,Xv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns,i=>({value:i}),3,e);return[{before:`convert column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"to type",value:r.type,sub:r.type===Je.Integer?[{before:"with base",value:r.radix}]:void 0}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Qv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||e.input,n,o),c=ve(i,"args.column1",r),p=ve(i,"args.column2",r),m=ve(i,"args.operator",r);return u.exports.jsxs(ey,{children:[u.exports.jsx(z,{children:u.exports.jsx(Ee,{table:a,required:!0,label:"Column one",selectedKey:i.args.column1,onChange:c})}),u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,enumeration:on,label:"Operation",selectedKey:i.args.operator,onChange:m})}),u.exports.jsx(z,{children:u.exports.jsx(Ee,{table:a,required:!0,label:"Column two",selectedKey:i.args.column2,onChange:p})})]})}),ey=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,ty=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{value:`${r.column1||""} ${r.operator||""} ${r.column2||""}`}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),ny=l.exports.memo(function({step:e,store:o,onChange:n}){const r=l.exports.useMemo(()=>e,[e]),s=Fe(r,"args.value",n);return u.exports.jsxs(oy,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(qt,{label:"Columns to erase",step:e,store:o,onChange:n})}),u.exports.jsx(Ze,{children:u.exports.jsx(Te,{required:!0,label:"Value to be erased",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:me,onChange:s})})]})}),oy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,ry=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns,i=>({value:i}),3,e);return[{before:`erase column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),sy=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.url",o),s=Fe(n,"args.delimiter",o),i=yt(n,"args.autoMax",o);return u.exports.jsxs(iy,{children:[u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,label:"URL",value:n.args.url&&`${n.args.url}`,placeholder:"URL to public dataset",styles:me,onChange:r})}),u.exports.jsx(z,{children:u.exports.jsx(Te,{label:"Delimiter",value:n.args.delimiter&&`${n.args.delimiter}`,placeholder:"Column delimiter",styles:me,onChange:s})}),u.exports.jsx(z,{children:u.exports.jsx(bt,{label:"Automax",labelPosition:vt.top,min:0,max:1e7,step:1,value:n.args.autoMax?`${n.args.autoMax}`:void 0,styles:me,onChange:i},"Automax")})]})}),iy=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,ay=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"url",value:r.url},{before:"with delimiter",value:r.delimiter}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),ly=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.value",o);return u.exports.jsx(uy,{children:u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,label:"Fill value",value:n.args.value&&`${n.args.value}`,placeholder:"text, number, or boolean",styles:me,onChange:r})})})}),uy=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,cy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with value",value:r.value}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),dy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r.column,sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===ln.Column?"row value":""}))}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),py=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Fe(i,"args.to[0]",r),c=Fe(i,"args.to[1]",r);return u.exports.jsxs(fy,{children:[u.exports.jsx(z,{children:u.exports.jsx(qt,{step:e,store:o,table:n,onChange:r,input:s})}),u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,label:"Key name to use",placeholder:"Key name to use",value:i.args.to!==void 0?i.args.to[0]:"",styles:me,onChange:a})}),u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,label:"Value name to use",placeholder:"Value name to use",value:i.args.to!==void 0?i.args.to[1]:"",styles:me,onChange:c})})]})}),fy=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,my=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns||[],i=>({value:i}),3,e);return[{before:`column${(r.columns||[]).length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"into key column",value:r.to!==void 0?r.to[0]:""},{before:"into value column",value:r.to!==void 0?r.to[1]:""}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),hy=l.exports.memo(function({step:e,store:o,onChange:n}){const r=l.exports.useMemo(()=>e,[e]),s=Fe(r,"args.value",n);return u.exports.jsxs(xy,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(qt,{label:"Columns to impute",step:e,store:o,onChange:n})}),u.exports.jsx(Ze,{children:u.exports.jsx(Te,{required:!0,label:"Fill value",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:me,onChange:s})})]})}),xy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,gy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns,i=>({value:i}),3,e);return[{before:`impute column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),by=l.exports.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.exports.useMemo(()=>e,[e]),i=ve(s,"args.strategy",r);return u.exports.jsxs(vy,{children:[u.exports.jsx(Na,{step:e,store:o,table:n,onChange:r}),u.exports.jsx(Ze,{children:u.exports.jsx(Pe,{required:!0,label:"Join strategy",enumeration:lt,selectedKey:s.args.strategy||lt.Inner,styles:me,onChange:i})})]})}),vy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,yy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with",value:r.other},{before:"on",value:r.on?.join(" | ")}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Cy=l.exports.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.exports.useMemo(()=>e,[e]);return u.exports.jsxs(wy,{children:[u.exports.jsx(Na,{label:"lookup",step:e,store:o,table:n,onChange:r}),u.exports.jsx(Ze,{children:u.exports.jsx(qt,{label:"Columns to copy",step:e,store:o,onChange:r,input:s.args.other})})]})}),wy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,_y=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns,i=>({value:i}),3,e);return[{before:"lookup from",value:r.other},{before:"on",value:r.on?.join(" | ")},{before:"copy columns",value:r.columns.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Sy=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=l.exports.useCallback((d,h)=>{const{columns:f=[]}=i.args;let b=[...f];h&&(h.selected?b.push(h.key):b=b.filter(v=>v!==h.key)),r&&r({...i,args:{...i.args,columns:b}})},[i,r]),p=vr(i,"args.strategy",r),m=Fe(i,"args.delimiter",r),x=l.exports.useMemo(()=>{const d=a?.columnNames()||[],h=(i.args.columns||[]).reduce((f,b)=>(f[b]=!0,f),{});return d.map(f=>{const b=i.args?.columns&&!!h[f];return{key:f,text:f,selected:b}})},[a,i]),g=l.exports.useMemo(()=>x.filter(d=>d.selected).map(d=>d.key),[x]);return u.exports.jsxs(ky,{children:[u.exports.jsx(z,{children:a?u.exports.jsx(ot,{label:"Columns",styles:me,multiSelect:!0,options:x,selectedKeys:g,onChange:c}):null}),u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,label:"Merge strategy",enumeration:Ft,selectedKey:i.args.strategy,onChange:p})}),i.args.strategy===Ft.Concat?u.exports.jsx(z,{children:u.exports.jsx(Te,{label:"Delimiter",placeholder:"Text delimiter",value:i.args.delimiter&&`${i.args.delimiter}`,styles:me,onChange:m})}):null]})}),ky=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,Ty=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.columns||[],i=>({value:i}),1,e);return[{before:`column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"with strategy",value:r.strategy}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Ts=l.exports.memo(function(){return null}),Is=l.exports.memo(function(e){const o=l.exports.useMemo(()=>[],[]);return u.exports.jsx(re,{...e,rows:o})}),Iy=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.prefix",o);return u.exports.jsx(jy,{children:u.exports.jsx(z,{children:u.exports.jsx(Te,{label:"Prefix",value:n.args.prefix&&`${n.args.prefix}`,styles:me,onChange:r})})})}),jy=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,Dy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:"with prefix",value:r.prefix}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),My=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||e.input,n,o),c=Ny(i,a,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,orders:[...i.args.orders||[],Oy(a)]}})},[i,a,r]);return u.exports.jsxs(Py,{children:[c,u.exports.jsx(Gt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add sort"})]})});function Oy(t){const e=t?.columnNames()[0],o=De.Ascending;return{column:e,direction:o}}function Ny(t,e,o){return l.exports.useMemo(()=>(t.args.orders||[]).map((n,r)=>{const s=a=>{const c={...t};ft(c,`args.orders[${r}]`,a),o&&o(c)},i=()=>{const a={...t};a.args.orders.splice(r,1),o&&o(a)};return u.exports.jsx(ex,{table:e,order:n,onChange:s,onDelete:i},`orderby-${n.column}-${r}`)}),[t,e,o])}const Py=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,Ay=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.orders||[],i=>({value:i.column,after:i.direction}),1,e);return[{before:"order",value:r.orders?.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Ey=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=ve(i,"args.key",r),p=ve(i,"args.value",r),m=ve(i,"args.operation",r);return u.exports.jsxs(By,{children:[u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:p})}),u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,enumeration:fn,label:"Function",selectedKey:i.args.operation,onChange:m})})]})}),By=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,$y=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(re,{...e,rows:o})});function Fy(t,e){return l.exports.useMemo(()=>{const{column:o}=t.args;if(!e||!o)return[];const n={[o]:Ae.array_agg_distinct(o)};return e.orderby(o).rollup(n).get(o,0)},[e,t])}function Ry(t,e){return l.exports.useCallback((o,n,r)=>{const s={...t.args.map};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,map:s}})},[t,e])}function Ly(t,e){return l.exports.useCallback(o=>{const n={...t.args};delete n.map[o],e&&e({...t,args:{...t.args,...n}})},[t,e])}function Hy(t,e){return e.find(o=>t.args.map?t.args.map[o]===void 0:!0)}function Vy(t,e,o){return l.exports.useCallback(()=>{const n=Hy(t,e);n!==void 0&&o&&o({...t,args:{...t.args,map:{...t.args.map,[n]:n}}})},[t,e,o])}function Wy(t,e){return e.length===0||!t.args.column?!0:e.length===Object.keys(t.args.map||{}).length}const Uy=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||e.input,n,o),c=Fy(i,a),p=dx(a,i.args.column),m=Ry(i,r),x=Ly(i,r),g=Vy(i,c,r),d=Gy(a,i,c,p,m,x),h=Wy(i,c);return u.exports.jsxs(Ky,{children:[d,u.exports.jsx(Gt,{onClick:g,iconProps:{iconName:"Add"},disabled:h,children:"Add mapping"})]})});function Gy(t,e,o,n,r,s){return l.exports.useMemo(()=>{const{map:i}=e.args;return Object.entries(i||{}).map((a,c)=>{const[p,m]=a,x=Pr(p,n),g=b=>b===x?!0:!(e.args.map&&e.args.map[b]),d=(b,v)=>r(x,v?.key||x,m),h=(b,v)=>{const C=Pr(v,n);r(x,x,C)},f=()=>s(x);return u.exports.jsxs(zy,{children:[u.exports.jsx(up,{column:e.args.column,table:t,values:o,filter:g,label:void 0,selectedKey:x,onChange:d,styles:{root:{width:130}}}),u.exports.jsx(Xe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.exports.jsx(Te,{placeholder:"New value",value:m,onChange:h,styles:{root:{width:130}}}),u.exports.jsx(ye,{title:"Remove this Recode",iconProps:{iconName:"Delete"},onClick:f})]},`column-Recode-${x}-${c}`)})},[t,e,o,n,r,s])}const Ky=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,zy=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,qy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.map||{}),i=Re(s,a=>({value:`${a[0]} -> ${a[1]}`}),2,e);return[{before:"from column",value:r.column},{before:"values",value:s.length===0?void 0:"",sub:i}]},[e]);return u.exports.jsx(re,{...e,rows:o})});function Yy(t,e){return l.exports.useCallback((o,n,r)=>{const s={...t.args.columns};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,columns:s}})},[t,e])}function Jy(t,e){return e?.columnNames().find(o=>t.args.columns?!t.args.columns[o]:!0)}function Zy(t,e,o){return l.exports.useCallback(()=>{const n=Jy(t,e);n&&o&&o({...t,args:{...t.args,columns:{...t.args.columns,[n]:n}}})},[t,e,o])}function Xy(t,e){return e?e.columnNames().length===Object.keys(t.args.columns||{}).length:!0}const Qy=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||e.input,n,o),c=Yy(i,r),p=ux(i,r),m=Zy(i,a,r),x=eC(a,i,c,p),g=Xy(i,a);return u.exports.jsxs(tC,{children:[u.exports.jsx(zn,{children:"Column renames"}),x,u.exports.jsx(Gt,{onClick:m,iconProps:{iconName:"Add"},disabled:g,children:"Add rename"})]})});function eC(t,e,o,n){return l.exports.useMemo(()=>{const{columns:r}=e.args;return Object.entries(r||{}).map((s,i)=>{const[a,c]=s,p=d=>d===a?!0:!(e.args.columns&&e.args.columns[d]),m=(d,h)=>o(a,h?.key||a,c),x=(d,h)=>{o(a,a,h??"")},g=()=>n(a);return u.exports.jsxs(nC,{children:[u.exports.jsx(Ee,{table:t,filter:p,label:void 0,selectedKey:a,onChange:m,styles:{root:{width:130}}}),u.exports.jsx(Xe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.exports.jsx(Te,{placeholder:"New name",value:c,onChange:x,styles:{root:{width:130}}}),u.exports.jsx(ye,{title:"Remove this rename",iconProps:{iconName:"Delete"},onClick:g})]},`column-rename-${a}-${i}`)})},[t,e,o,n])}const tC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,nC=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,oC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.columns||{}),i=Re(s,a=>({value:`${a[0]} -> ${a[1]}`}),1,e);return[{before:"columns",value:s.length===0?void 0:"",sub:i}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),rC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=ve(n,"args.operation",o);return u.exports.jsx(sC,{children:u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,enumeration:fn,label:"Function",selectedKey:n.args.operation,onChange:r})})})}),sC=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,iC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),aC=Zo("d"),lC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=yt(n,"args.size",o),s=yt(n,"args.proportion",o,i=>i&&+i/100);return u.exports.jsx(uC,{children:u.exports.jsxs(z,{children:[u.exports.jsx(bt,{label:"Number of rows",labelPosition:vt.top,min:0,step:1,disabled:!!n.args.proportion,value:n.args.size?`${n.args.size}`:"",styles:js,onChange:r}),u.exports.jsx(cC,{children:"or"}),u.exports.jsx(bt,{label:"Row percentage",labelPosition:vt.top,min:0,max:100,step:1,disabled:!!n.args.size,value:n.args.proportion?`${aC(n.args.proportion*100)}`:"",styles:js,onChange:s})]})})}),uC=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,cC=_.div`
	margin-left: 8px;
	margin-right: 8px;
	height: 100%;
	display: flex;
	align-items: center;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,js={root:{width:120}},dC=Zo(".0%"),pC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"random",value:r.size||dC(r.proportion||0),after:r.size?r.size===1?"row":"rows":" of rows"}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),Tn=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=fC(i,o,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,others:[...i.args.others,""]}})},[i,r]);return u.exports.jsxs(mC,{children:[u.exports.jsx(zn,{children:"With tables"}),c,u.exports.jsx(Gt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add table"})]})});function fC(t,e,o){return l.exports.useMemo(()=>t.args.others.map((n,r)=>{const s=()=>{const i={...t};i.args.others.splice(r,1),o&&o(i)};return e?u.exports.jsxs(z,{children:[u.exports.jsx(pr,{label:"",store:e,selectedKey:n,onChange:(i,a)=>{const c={...t};a&&(c.args.others[r]=`${a.key}`),o&&o(c)}}),u.exports.jsx(ye,{title:"Remove this table",iconProps:{iconName:"Delete"},onClick:s})]},`set-op-${n}-${r}`):null}),[t,e,o])}const mC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,In=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Re(r.others,i=>({value:i}),1,e);return[{before:"with",value:r.others.length>0?"":null,sub:s}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),hC=l.exports.memo(function({column:e,onChange:o,onDelete:n}){const r=l.exports.useCallback((i,a)=>{o&&o(a)},[o]),s=l.exports.useCallback(()=>n&&n(),[n]);return u.exports.jsxs(xC,{children:[u.exports.jsx(Te,{value:e,onChange:r,styles:me}),u.exports.jsx(ye,{title:"Remove this column",iconProps:{iconName:"Delete"},onClick:s})]})}),xC=_.div`
	display: flex;
	justify-content: flex-start;
`,gC=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||e.input,n,o),c=vC(i,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,to:[...i.args.to,bC(i.args.to)]}})},[i,r]),m=ve(e,"args.column",r);return u.exports.jsxs(yC,{children:[u.exports.jsx(Ee,{required:!0,table:a,label:"Column to spread",selectedKey:e.args.column,onChange:m}),u.exports.jsx(zn,{children:"New column names"}),c,u.exports.jsx(Gt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add column"})]})});function bC(t){return`New column (${t.length})`}function vC(t,e){return l.exports.useMemo(()=>(t.args.to||[]).map((o,n)=>{const r=i=>{const a={...t};ft(a,`args.to[${n}]`,i),e&&e(a)},s=()=>{const i={...t};i.args.to.splice(n,1),e&&e(i)};return u.exports.jsx(hC,{column:o,onChange:r,onDelete:s},`column-list-${n}`)}),[t,e])}const yC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,CC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:`as column${(r.to||[]).length!==1?"s":""}`,value:r.to?r.to.join(", "):null}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),wC=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Se(s||i.input,n,o),c=ve(i,"args.key",r),p=ve(i,"args.value",r);return u.exports.jsxs(_C,{children:[u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:p})})]})}),_C=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,SC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),kC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=ve(n,"args.operation",o);return u.exports.jsx(TC,{children:u.exports.jsx(z,{children:u.exports.jsx(Pe,{required:!0,label:"Function",enumeration:Ks,selectedKey:n.args.operation,onChange:r})})})}),TC=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,IC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"window column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(re,{...e,rows:o})}),jC={aggregate:vv,bin:wv,binarize:Uv,boolean:qv,concat:In,convert:Xv,dedupe:kn,derive:ty,difference:In,erase:ry,fetch:ay,fill:cy,filter:dy,fold:my,groupby:kn,impute:gy,intersect:In,join:yy,lookup:_y,merge:Ty,onehot:Dy,orderby:Ay,pivot:$y,recode:qy,rename:oC,rollup:iC,sample:pC,select:kn,spread:CC,unfold:SC,ungroup:Is,union:In,unorder:Is,unroll:kn,window:IC};function DC(t){const e=jC[t.verb];if(!e)throw new Error(`could not find step with verb ${t?.verb}`);return e}function MC(t,e,o,n,r,s){return l.exports.useMemo(()=>{const i=[];return s&&i.push({iconProps:jn.preview,onClick:()=>s(t?.output),title:"Preview table"}),o&&i.push({iconProps:jn.edit,onClick:()=>o(t,e),title:"Edit step"}),r&&i.push({iconProps:jn.duplicate,onClick:()=>r(t),title:"Duplicate step"}),n&&i.push({iconProps:jn.delete,onClick:()=>n&&n(e),title:"Delete step"}),i},[t,e,o,n,r,s])}const jn={preview:{iconName:"View"},edit:{iconName:"Edit"},duplicate:{iconName:"DuplicateRow"},delete:{iconName:"Delete"}},OC=l.exports.memo(function({step:e,index:o,onEdit:n,onDelete:r,onDuplicate:s,onSelect:i}){const a=l.exports.useMemo(()=>DC(e),[e]),c=MC(e,o,n,r,s,i);return u.exports.jsxs(PC,{styles:Ds.card,children:[u.exports.jsx(NC,{children:u.exports.jsx(a,{step:e,showInput:!0,showOutput:!0,showOutputColumn:!0})}),u.exports.jsx(Jd,{className:`step-card-${o}`,styles:Ds.actions,actions:c})]})}),Ds={card:{root:{minWidth:"unset"}},actions:{root:{padding:"unset"}}},NC=_.div`
	padding: 8px;
`,PC=_(Wd)`
	min-width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`,Aa=l.exports.memo(function(e){const{defaultMenuItemRenderer:o,items:n}=e,r=l.exports.useMemo(()=>n.map(s=>Hn({},s,{itemProps:Ms,sectionProps:s.sectionProps?{items:s.sectionProps.items.map(i=>Hn({},i,{itemProps:Ms}))}:void 0})),[n]);return u.exports.jsx(AC,{children:r.map(s=>{const{key:i}=s;return u.exports.jsxs(EC,{children:[u.exports.jsx(BC,{children:s.sectionProps?.title}),s.itemType===Ht.Section?u.exports.jsx(u.exports.Fragment,{children:s.sectionProps?.items.map(a=>o(a))}):o(s)]},`menu-group-${i}`)})})}),Ms={styles:{root:{paddingLeft:8,height:28,lineHeight:28},item:{listStyleType:"none"}}},AC=_.div`
	display: flex;
	padding: 8px 0 8px 0;
	gap: 12px;
`,EC=_.div`
	min-width: 120px;
`,BC=_.div`
	padding: 0 12px 0 12px;
	margin-bottom: 8px;
	font-weight: bold;
	color: ${({theme:t})=>t.application().accent().hex()};
`,Ea=l.exports.memo(function(e){const{onRenderMenuList:o}=e,n=l.exports.useCallback(s=>o?o(s):u.exports.jsx(Aa,{...s}),[o]),r=l.exports.useMemo(()=>({...e,onRenderMenuList:n}),[e,n]);return u.exports.jsx(Zn,{styles:ip,text:e.text,menuProps:r})});function $C(t,e){const o=l.exports.useCallback(()=>{e(t)},[t,e]),n=FC(t,e);return{onClear:o,onEscape:o,onChange:n}}function FC(t,e){return l.exports.useCallback((o,n)=>{const r=[];t.forEach(s=>{if(s.itemType===Ht.Normal)Os(s,n)&&r.push(s);else if(s.itemType===Ht.Section){const i=s.sectionProps?.items.filter(a=>Os(a,n))||[];r.push({...s,sectionProps:{...s.sectionProps,items:i}})}else r.push(s)}),e(r)},[t,e])}function Os(t,e){const o=t.text?t.text.toLowerCase():"",n=e&&e.toLowerCase()||"";return o.indexOf(n)!==-1}const RC={root:{margin:"8px"}},LC=l.exports.memo(function({items:e,onSearch:o}){const n=$C(e,o);return u.exports.jsx(rp,{ariaLabel:"Find a verb by text",placeholder:"Find a verb",styles:RC,...n})}),HC=[{label:"Aggregates",verbs:["aggregate","groupby","ungroup","pivot","orderby","unorder","rollup","unroll","window"]},{label:"Transform column",verbs:["bin","binarize","convert","erase","fill","impute","recode"]},{label:"Combine columns",verbs:["boolean","derive","fold","unfold","onehot","merge","spread"]},{label:"Filter & Select",verbs:["fetch","filter","rename","sample","select"]},{label:"Joins & Sets",verbs:["concat","dedupe","difference","intersect","join","lookup","union"]}];function VC(){return l.exports.useMemo(()=>HC.map(t=>({key:`__section-${t.label}__`,itemType:Ht.Section,sectionProps:{title:t.label,items:t.verbs.map(e=>{const o=Object.entries(W).find(n=>n[1]===e);return{key:o[1],text:o[0]}})}})),[])}function WC(){const t=VC(),[e,o]=l.exports.useState(t),n=l.exports.useCallback(s=>o(s),[o]),r=l.exports.useCallback(()=>o(t),[t]);return{items:t,filtered:e,onSearch:n,onSearchReset:r}}function UC(t,e,o,n){const[r,s]=l.exports.useState(t);l.exports.useEffect(()=>{t&&s(t)},[t]);const i=l.exports.useCallback(()=>{r&&e&&e(r)},[r,e]),a=l.exports.useCallback((p,m)=>{s(m.key),!o&&e&&e(m.key)},[o,e,s]);return{text:GC(r,n),onButtonClick:i,onItemClick:a}}function GC(t,e){return l.exports.useMemo(()=>ya(W,t)||e,[t,e])}const KC=l.exports.memo(function({onCreate:e,showButton:o,verb:n,placeholder:r="Choose a verb"}){const{text:s,onButtonClick:i,onItemClick:a}=UC(n,e,o,r),{items:c,filtered:p,onSearch:m,onSearchReset:x}=WC(),g=l.exports.useCallback(h=>u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(qC,{children:u.exports.jsx(LC,{items:c,onSearch:m})}),u.exports.jsx(Aa,{...h})]}),[m,c]),d={items:p,onRenderMenuList:g,onItemClick:a,onDismiss:x};return u.exports.jsxs(zC,{children:[u.exports.jsx(Ea,{text:s,...d}),o&&u.exports.jsx(ye,{iconProps:{iconName:"Add"},onClick:i})]})}),zC=_.div`
	width: 240px;
	display: flex;
	align-items: center;
`,qC=_.div`
	border-bottom: 1px solid
		${({theme:t})=>t.application().lowContrast().hex()};
`,yr=l.exports.memo(function({text:e,style:o}){return u.exports.jsx(YC,{style:o,children:e})}),YC=_.div`
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,JC=l.exports.memo(function({steps:e,onDeleteClicked:o,onEditClicked:n,onDuplicateClicked:r,onSelect:s,onStartNewStep:i,buttonId:a}){const c=l.exports.useRef(null);return l.exports.useEffect(()=>{(()=>{c?.current?.scrollIntoView(!1)})()},[e]),u.exports.jsxs(QC,{children:[e?.map((p,m)=>u.exports.jsx(OC,{onDelete:o,onEdit:n,onDuplicate:r,onSelect:s,step:p,index:m},m)),i&&u.exports.jsxs(e0,{ref:c,children:[u.exports.jsx(Zn,{styles:ZC,iconProps:XC.add,onClick:i,id:a,children:"Add step"}),!e?.length&&u.exports.jsx(yr,{text:"Add your first preparation step"})]})]})}),ZC={root:{padding:"0 4px 0 6px",whiteSpace:"nowrap"}},XC={add:{iconName:"Add"}},QC=_.div`
	display: flex;
	overflow: auto;
	column-gap: 12px;
`,e0=_.div`
	display: flex;
	align-items: center;
	gap: 18px;
`;function t0(t,e,o,n){const r=Ns(t),s=Ns(e),i=l.exports.useMemo(()=>[{key:"__input-tables__",itemType:Ht.Section,sectionProps:{title:"Inputs",items:r.sort()}},{key:"__derived-tables__",itemType:Ht.Section,sectionProps:{title:"Derived",items:s}}],[r,s]),a=l.exports.useCallback((p,m)=>n&&n(m.key),[n]);return{text:l.exports.useMemo(()=>o||"Choose table",[o]),items:i,onItemClick:a}}function n0(t,e){const o=l.exports.useMemo(()=>{if(t&&t.length>0)return t[t.length-1].id},[t]);return{onClick:l.exports.useCallback(()=>{o&&e&&e(o)},[o,e])}}function Ns(t){return l.exports.useMemo(()=>t.map(e=>({key:e.id,text:e.name||e.id})),[t])}const o0=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 18px;
`,r0={root:{padding:"0 4px 0 6px"}},s0=l.exports.memo(function({inputs:e,derived:o,onSelect:n,selected:r,loading:s}){const{onClick:i}=n0(o,n),a=t0(e,o,r,n);return u.exports.jsxs(o0,{children:[u.exports.jsx(Ea,{...a}),s&&u.exports.jsx(xu,{size:gu.xSmall}),o.length>0?u.exports.jsx(Zn,{styles:r0,iconProps:i0,onClick:i,children:"View output table"}):null,!r&&u.exports.jsx(yr,{text:"Select an input or derived table to preview"})]})}),i0={iconName:"View"};function a0(t,e){return l.exports.useCallback(async o=>{const n=t.list();o.forEach(s=>{n.includes(s.id)||t.set({id:s.id,table:s?.table})});const r=await t.toMap();e(r)},[t,e])}function l0(t,e){return l.exports.useCallback(o=>{let n=[...e||[]];n=n.slice(0,o),t(n)},[e,t])}function u0(t,e){return l.exports.useCallback((o,n)=>{if(n!==void 0){const r=[...e||[]];r[n]=o,t(r)}else{const r=[...e||[],o];t(r)}},[e,t])}function c0(t,e,o){return l.exports.useCallback(async n=>{const r=await e.get(o);r.metadata=n,e.delete(r.id),e.set(r);const s=await e.toMap();t(s)},[e,o,t])}function d0(t,e,o){return l.exports.useCallback(async()=>{if(t.steps.length){const r=await t.run();o&&o(r.id)}const n=await t.store.toMap();e&&e(n)},[t,e,o])}function p0(t){const[e,o]=l.exports.useState(t??{});return{changeTableFeatures:l.exports.useCallback(r=>{const s=r;o({...e,[s]:!e[s]})},[e,o]),tableFeatures:e}}function f0(t,e,o,n){const[r,s]=l.exports.useState(),[i,a]=l.exports.useState(new Map),c=px(),p=fx(c),m=d0(p,a,s),x=a0(c,a),{isLoading:g}=lv(Vo.Tables),d=l.exports.useMemo(()=>{const T=new Set;return o?.forEach(O=>T.add(O.output)),Array.from(T).map(O=>({id:O}))},[o]),h=l.exports.useMemo(()=>i.get(r??"")?.table,[r,i]),f=l.exports.useMemo(()=>i.get(r??"")?.metadata,[i,r]),b=l.exports.useMemo(()=>{if(r)return r;if(d&&d.length>0){const T=d[d.length-1];if(T)return T.id}return t[0]?.id||""},[t,r,d]);l.exports.useEffect(()=>{if(t.length){x(t);const T=t[t.length-1];s(T?.id)}},[t,x,s]),l.exports.useEffect(()=>{if(b&&n){const T=i.get(b);T&&n(T)}},[i,b,n]),l.exports.useEffect(()=>{i.size>0&&(o?.filter(T=>!p.steps?.includes(T)).length||o?.length!==p.steps.length)&&(p.clear(),o&&p.addAll(o),m())},[o,p,m,i]);const v=u0(e,o),C=l0(e,o),S=c0(a,c,r);return{selectedTable:h,setSelectedTableName:s,onDeleteStep:C,onSaveStep:v,store:c,selectedMetadata:f,lastTableName:b,selectedTableName:r,derived:d,onUpdateMetadata:S,tablesLoading:g}}const m0=l.exports.memo(function({tables:e,onUpdateSteps:o,steps:n,outputHeaderCommandBar:r,onOutputTable:s,stepsPosition:i="bottom"}){const[a,{toggle:c}]=dn(!1),{selectedTable:p,selectedTableName:m,setSelectedTableName:x,onDeleteStep:g,onSaveStep:d,store:h,lastTableName:f,derived:b,selectedMetadata:v,onUpdateMetadata:C,tablesLoading:S}=f0(e,o,n,s);return u.exports.jsxs(h0,{children:[u.exports.jsxs(x0,{children:[u.exports.jsx(wo,{children:"Tables"}),u.exports.jsx(s0,{loading:S,inputs:e,derived:b,selected:m,onSelect:x})]}),u.exports.jsxs(b0,{stepsPosition:i,isCollapsed:a,className:"steps",children:[u.exports.jsxs(wo,{isCollapsed:a,onClick:c,children:["Steps ",u.exports.jsx(Xe,{iconName:"ChevronDown"})]}),u.exports.jsx(v0,{children:u.exports.jsx(fv,{nextInputTable:f,onDelete:g,onSave:d,onSelect:x,store:h,steps:n})})]}),u.exports.jsxs(g0,{stepsPosition:i,isCollapsed:a,children:[u.exports.jsx(wo,{children:"Preview"}),u.exports.jsx(C0,{onChangeMetadata:C,headerCommandBar:r,table:p,metadata:v,name:m})]})]})}),dt=18,Wo=60,Ba=280,$a=50,wo=_.span`
	margin: 0 ${dt}px 0 ${dt}px;
	font-weight: bold;
	writing-mode: vertical-rl;
	font-size: 15px;
	align-self: center;
	text-transform: uppercase;
	color: ${({theme:t})=>t.application().lowMidContrast().hex()};
	transform: ${({isCollapsed:t})=>t?"translate(2rem, 0) rotate(-90deg)":"rotate(180deg)"};
	cursor: pointer;
	display: flex;
	gap: 0.5rem;
	align-items: center;
`,h0=_.div`
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	padding: ${dt}px 0 ${dt}px 0;
	gap: ${dt}px;
	position: relative;
`,x0=_.div`
	display: flex;
	min-height: ${Wo}px;
	flex: 0 1 ${Wo}px;
	padding-right: ${dt}px;
	order: 1;
`,g0=_.div`
	flex: 1 1 auto;
	display: flex;
	padding-right: ${dt}px;
	max-height: ${({isCollapsed:t})=>`calc(100% - ${Wo+(t?$a:Ba)+dt*2}px)`};
	order: ${({stepsPosition:t})=>t==="bottom"?2:3};
`,b0=_.div`
	display: flex;
	min-height: ${({isCollapsed:t})=>t?"unset":Ba+"px"};
	background-color: ${({theme:t})=>t.application().faint().hex()};
	padding: 0;
	order: ${({stepsPosition:t})=>t==="bottom"?3:2};
	height: ${({isCollapsed:t})=>t?$a+"px":"auto"};
	overflow: ${({isCollapsed:t})=>t?"hidden":"auto hidden"};
	> div {
		display: ${({isCollapsed:t})=>t?"none":"grid"};
	}
`,v0=_.div`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
`,y0=[Ke.Type,Ke.Min,Ke.Max,Ke.Distinct,Ke.Invalid],C0=l.exports.memo(function({table:e,headerCommandBar:o,name:n,metadata:r,onChangeMetadata:s}){const{tableFeatures:i}=p0();return u.exports.jsx(u.exports.Fragment,{children:e?u.exports.jsxs(w0,{children:[u.exports.jsx(Lg,{name:n,table:e}),u.exports.jsx(Dg,{isSortable:!0,compact:!0,showColumnBorders:!0,isHeadersFixed:!0,metadata:r,onChangeMetadata:s,features:{...i,statsColumnTypes:y0,commandBar:o||void 0},table:e})]}):u.exports.jsx(_0,{children:u.exports.jsx(yr,{text:"(No table selected)"})})})}),w0=_.div`
	overflow: auto;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,_0=_.div`
	display: flex;
	height: 100%;
	align-items: center;
`,S0={aggregate:gv,bin:yv,binarize:Wv,boolean:Gv,concat:Tn,convert:Jv,dedupe:Sn,derive:Qv,difference:Tn,erase:ny,fetch:sy,fill:ly,filter:Pa,fold:py,groupby:Sn,intersect:Tn,impute:hy,join:by,lookup:Cy,merge:Sy,onehot:Iy,orderby:My,pivot:Ey,recode:Uy,rename:Qy,rollup:rC,sample:lC,select:Sn,spread:gC,unfold:wC,ungroup:Ts,union:Tn,unorder:Ts,unroll:Sn,window:kC};function Fa(t){const e=S0[t.verb];if(!e)throw new Error(`verb ${t.verb} not found`);return e}const k0=`# binarize

Converts values to a 0 or 1 based on a comparison function match. This is commonly used in machine learning models where the input data needs to be turned into a series of flags. See [filter](./filter.md) for a description of the comparison functions available.  Multiple criteria can be applied against the input column, which will be treated as a series of [boolean](./boolean.md) queries.

Note: if you need to split categorical data into binarized columns, use [onehot](./onehot.md)

## Examples

| age |
| --- |
| 12  |
| 32  |
| 35  |
| 64  |

\`binarize column['age'] >= 35\`:

| age |
| --- |
| 0   |
| 0   |
| 1   |
| 1   |

\`binarize column['age'] >= 35 OR < 15 \`:

| age |
| --- |
| 1   |
| 0   |
| 1   |
| 1   |
`,T0=`# aggregate

Combines a [groupby](./groupby.md) with a [rollup](./rollup.md) to support all-in-one data aggregations.

## Example

| id  | value |
| --- | ----- |
| 1   | 10    |
| 1   | 15    |
| 2   | 1     |
| 2   | 11    |
| 2   | 18    |

\`aggregate column['value'] with function='sum', groupby column['id'], to_column='output'\`:

| id  | output |
| --- | ------ |
| 1   | 25     |
| 2   | 30     |
`,I0=`# bin

Sorts continuous data into defined buckets. Values in the input table cell are replaced in the output with the lower bin boundary that they fall within.

_The input column for a binning operation must be a numeric data type._

Multiple binning strategies are supported:

- Auto: uses automatic bin boundary guessing to create nice default bins (uses [Arquero's default bin strategy](https://uwdata.github.io/arquero/api/op#bins))
- Fixed width: creates bins at an exact width specified
- Fixed count: divides the data range into a fixed number of bins of equal width

You may supply a fixed min/max to set the outer bin boundaries. By default, if data values fall outside these boundaries they are set to +/- Infinity. If clamping is enabled, values outside the boundary are assigned to the first and last bins as appropriate (i.e., values over the max fall into the last bin). Establishing min/max bounds and clamping allows data values to be binned without revealing the true extent of the data, or whether any individual rows exceed those bounds.

## Examples

| val |
| --- |
| 8   |
| 10  |
| 17  |
| 21  |
| 31  |

\`bin column['val'] with bins=[0, 10, 20, 30]\`:

| val |
| --- |
| 0   |
| 10  |
| 10  |
| 20  |
| 30  |

\`bin column['val'] with bins=[0, 10, 20, 30], max=20\`:

| val      |
| -------- |
| 0        |
| 10       |
| 10       |
| 20       |
| Infinity |

\`bin column['val'] with bins=[0, 10, 20, 30], max=30, clamping=true\` masks the boundary overrun:

| val |
| --- |
| 0   |
| 10  |
| 10  |
| 20  |
| 20  |
`,j0=`# dedupe

Deduplicates table rows. A list of column names can be supplied to create the key for duplicate checking, otherwise all columns are used In other words, the cell values for every supplied key must match to be considered a duplicate row.

## Example

| name  | age |
| ----- | --- |
| Bob   | 32  |
| Joe   | 35  |
| Jenny | 31  |
| Bob   | 45  |
| Bob   | 32  |

\`dedupe\` default uses all columns, so the final row is removed:

| name  | age |
| ----- | --- |
| Bob   | 32  |
| Joe   | 35  |
| Jenny | 31  |
| Bob   | 45  |

\`dedupe columns['name']\` removes any matches with the same name, ignoring other columns that may differ:

| name  | age |
| ----- | --- |
| Bob   | 32  |
| Joe   | 35  |
| Jenny | 31  |
`,D0=`# boolean

Combines columns using [boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra). Column values of any kind can be combined; they will be coerced to boolean values for evaluation:

- Native booleans (\`true\`/\`false\`) will left as is
- Any non-empty string will be treated as \`true\` except the string 'false'
- Any numeric value other than 0 will be \`true\`
- Any valid Date will be \`true\`
- All invalid or empty values (null, undefined, NaN) will be treated as \`false\`

The column output will be a 1 (true) or 0 (false).

For boolean _comparison_ operators, use the [binarize](./binarize.md) verb.

## Operators

- OR: any \`true\` value returns true
- AND: all values must be \`true\`
- NOR (not OR): no values can be \`true\`
- NAND (not AND): any values can be \`true\` but not _all_ can
- XOR (exclusive OR): only one value may be \`true\`

Note that in formal boolean algebra some operators expect exactly two input values. For data wrangling convenience we allow any number of input values and have worded the definitions above accordingly.

## Examples

| A | B |
| - | - |
| 1 | 1 |
| 0 | 1 |
| 1 | 0 |
| 0 | 0 |

\`boolean columns['A', 'B'], operator='OR' to_column='output'\`:

| output |
| ------ |
| 1      |
| 1      |
| 1      |
| 0      |

\`boolean columns['A', 'B'], operator='AND' to_column='output'\`:

| output |
| ------ |
| 1      |
| 0      |
| 0      |
| 0      |
`,M0=`# difference

Set operation between an input table and one or more secondary tables, retaining only those rows from the input table that do not occur in any of the secondary tables.

## Example

input 1

| id  |
| --- |
| 1   |
| 2   |

input 2

| id  |
| --- |
| 1   |
| 3   |
| 4   |

\`difference tables['input 1', 'input 2']\`:

| id  |
| --- |
| 2   |
`,O0=`# convert

Converts the data of a column from one type to another. This is normally used for converting string data to a strict type such as a date or number. Cell values that do not properly parse to the specified type will be set to empty/NaN in the output.

## Data types

- Boolean - converts strings to true/false booleans. The text 'false' will turn to \`false\`, along with any other empty/NaN/undefined values. Any valid string other than 'false' will become \`true\`.
- Date - converts a date string. This can be tricky across browsers, we recommend formatting your date strings as [ISO8601](https://en.wikipedia.org/wiki/ISO_8601) for predictable conversions.
- Decimal - parses a string into a decimal (floating-point) number.
- Integer - parses a string into an integer (whole) number. This will auto-parse strings such as hexadecimal unless a specific radix (base) is provided.


## Example

| age      |
| -------- |
| '10'     |
| '22'     |
| 'thirty' |

\`convert columns['age'], type=int\`:

| age |
| --- |
| 10  |
| 22  |
| NaN |
`,N0=`# derive

Performs math operations across two columns to create a new combined column.

## Example

| fy20 | fy21 |
| ---- | ---- |
| 100  | 124  |
| 23   | 165  |
| 354  | 300  |

\`derive column['fy20'] operation='add' with column['fy21'], to_column='output'\`:

| output |
| ------ |
| 224    |
| 188    |
| 354    |
`,P0=`# filter

Creates a filtered table that only contains rows that match specified criteria. Filter can compare the values of an input column to a fixed value (e.g.) \`row.value <= 10\`), or it can compare to the value of another column in the same row (e.g., \`row.value <= row.other_value\`). Comparisons can be numeric (=, !=, <, >, etc.) or string-based (equals, contains, starts with, etc.). If an empty/not empty filter is _not_ specified but invalid values are found, the result for that comparison will be a negative match. Multiple criteria can be applied against the input column, which will be treated as a series of [boolean](./boolean.md) queries.

## Comparison operators

_numeric_

- Equals
- Not equal
- Less than
- Less than or equal
- Greater than
- Greater than or equal
- Is empty
- Is not empty

_string_

- Equals
- Not equal
- Contains
- Starts with
- Ends with
- Is empty
- Is not empty
- Regular expression

_boolean_

- Equals
- Not equal
- Contains
- Is true
- Is false
- Is empty
- Is not empty

## Examples

| fy20 | fy21 |
| ---- | ---- |
| 100  | 124  |
| 23   | 165  |
| 354  | 300  |

\`filter where column['fy20'] < 200\`:

| fy20 | fy21 |
| ---- | ---- |
| 100  | 124  |
| 23   | 165  |

\`filter where column['fy20'] > column['fy21']\`:

| fy20 | fy21 |
| ---- | ---- |
| 354  | 300  |

\`filter where column['fy20'] < 100 OR > 300\`:

| fy20 | fy21 |
| ---- | ---- |
| 23   | 165  |
| 354  | 300  |`,A0=`# concat

Appends additional tables to the input table, mimicking SQL UNION_ALL. Note that only columns from the input table are retained in the concatenated output.

## Example

input 1

| id  |
| --- |
| 1   |
| 2   |

input 2

| id  | Name |
| --- | ---- |
| 3   | Bob  |
| 4   | Joe  |

\`concat tables['input 1', 'input 2']\`:

| id  |
| --- |
| 1   |
| 2   |
| 3   |
| 4   |
`,E0=`# fill

Creates a new output column and fills it with a fixed value.

## Example

| id  |
| --- |
| 1   |
| 2   |
| 3   |

\`fill column='output' with value='hi'\`:

| id  | output |
| --- | ------ |
| 1   | hi     |
| 2   | hi     |
| 3   | hi     |
`,B0=`# intersect

Set operation between an input table and one or more secondary tables, retaining only those rows that occur in all tables.

## Example

input 1

| id  |
| --- |
| 1   |
| 2   |

input 2

| id  |
| --- |
| 1   |
| 3   |
| 4   |

\`intersect tables['input 1', 'input 2']\`:

| id  |
| --- |
| 1   |
`,$0=`# impute

Fills in any invalid values with a specified value. Invalid values include NaN, null, and undefined. The opposite of [erase](./erase.md)

## Example

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | null  |
| 4   | Jenny |
| 5   | null  |

\`impute columns['name'] with value='Doe'\`:

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Doe   |
| 4   | Jenny |
| 5   | Doe   |
`,F0=`# groupby

Groups table rows using keys from a specified column list. Note that this is an underlying index on a table that isn't necessarily visible, but will apply when performing operations that are sensitive to grouping. See [rollup](./rollup.md) for examples of \`groupby\`.
`,R0=`# fold

Takes a list of input columns and folds them into a new pair of \`[key, value]\` columns. The output name of the \`key\` and \`value\` columns can be customized. Use [unfold](./unfold.md) to reverse a fold operation, or [pivot](./pivot.md) to invert it with aggregation.

## Example

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |

\`fold columns['id', 'name']\`:

| key  | value |
| ---- | ----- |
| id   | 1     |
| name | Bob   |
| id   | 2     |
| name | Joe   |
| id   | 3     |
| name | Jenny |
`,L0=`# join

Combines two tables using relational join mechanics. A join key (column name) from the input and secondary table can be specified. All columns from the secondary table are joined with the input. If a secondary join key is not specified, the primary join key is used for both tables. By default an inner join is performed, but left, right, or full joins can be specified.

## Example

input 1

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |
| 4   | Kate  |

input 2

| id  | age |
| --- | --- |
| 1   | 32  |
| 2   | 35  |
| 3   | 21  |

\`join table['input 1'] with table['input 2'] on column['id']\`:

| id  | name  | age |
| --- | ----- | --- |
| 1   | Bob   | 32  |
| 2   | Joe   | 35  |
| 3   | Jenny | 31  |
`,H0=`# fetch

Executes an asynchronous resource request to a specified URL. Currently only HTTP GET is supported, with no additional headers.
`,V0=`# lookup

Similar to [join](./join.md). The primary difference is that all rows in the input table are preserved, and only values from specified columns in the secondary table are copied. If more than one row in the secondary table matches, the last value found will be copied.

## Example

input 1

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |

input 2

| id  | login_date |
| --- | ---------- |
| 1   | 2022-01-01 |
| 2   | 2022-01-01 |
| 3   | 2022-01-01 |
| 1   | 2022-01-03 |
| 2   | 2022-01-05 |
| 1   | 2022-01-08 |

\`lookup table['input 1'] with table['input 2'] on column['id'], copy columns['login_date']\`:

| id  | name  | login_date |
| --- | ----- | ---------- |
| 1   | Bob   | 2022-01-08 |
| 2   | Joe   | 2022-01-05 |
| 3   | Jenny | 2022-01-01 |
`,W0=`# merge

Collapses multiple columns into one. Invalid values (null, undefined, NaN) are ignored.

Available collapse strategies are:

- first one wins: the first valid column value is used in the output
- last one winss: the last valid column value is used in the output
- concat: all valid column values are concatenated together, and a delimiter can be specified
- array: all valid column values are pushed into a cell array

## Examples

| first | middle | last     |
| ----- | ------ | -------- |
| John  | Ray    | Doe      |
| Bill  |        | Williams |
|       | Colin  | Jeeves   |

\`merge columns['first', 'middle', 'last'], strategy='first one wins', to_column='output'\`:

| output |
| ------ |
| John   |
| Bill   |
| Colin  |

\`merge columns['first', 'last'], strategy='last one wins', to_column='output'\`:

| output   |
| -------- |
| Doe      |
| Williams |
| Jeeves   |

\`merge columns['first', 'last'], strategy='concat', to_column='output'\`:

| output        |
| ------------- |
| John Ray Doe  |
| Bill Williams |
| Colin Jeeves  |
`,U0=`# orderby

Applies a sort operation on the table using a specified column and sort direction. Multiple column + direction instructions can be supplied to produce a compound sort.

## Example

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |

\`orderby column['name'], direction='desc'\`:

| id  | name  |
| --- | ----- |
| 2   | Joe   |
| 3   | Jenny |
| 1   | Bob   |
`,G0=`# pivot

Performs an inverse of the [fold](./fold.md) operation, aggregating output values. If you want a direct fold reversal that restores rows, use [unfold](./unfold.md). If an aggregation operation is not specified, \`any\` is used. This verb collects all values from the \`value\` column that share the same key in the \`key\` column, and then performs the specified aggregation. The number of new output columns will equal the number of unique keys. The number of output rows will be equal to the number of [groups](./groupby.md) applied to the table before pivoting.

## Example

| key   | value |
| ----- | ----- |
| id    | 1     |
| sales | 100   |
| id    | 1     |
| sales | 200   |
| id    | 2     |
| sales | 150   |
| sales | 300   |
| id    | 3     |
| sales | 12    |
| sales | 31    |

\`pivot key['key'], value['value'], operation='sum'\`:

| id  | sales |
| --- | ----- |
| 7   | 793   |
`,K0=`# rename

Renames columns in a table.

## Example

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |

\`rename columns['id', 'name'] to=['row', 'first']\`:

| row | first |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |
`,z0=`# rollup

Performs aggregation operations on table columns. Normally the table should be [grouped](./groupby.md) first, otherwise the aggregation will be performed using all rows. Aggregation is commonly used to compute statistics over a list of values. To avoid interface complexity, this verb currently only supports aggregations that take a single column as the input.

## Operations

- \`any\`: plucks a single value
- \`count\`: counts the values
- \`distinct\`: counts the unique values
- \`valid\`: counts the number of valid (non-null) values
- \`invalid\`: counts the number of invalid values (null, undefined, NaN)
- \`max\`: finds the maximum value
- \`min\`: finds the minimum value
- \`sum\`: sums the values
- \`product\`: computes the product of the values
- \`mean\`: computes the mean of the values
- \`mode\`: finds the mode of the values
- \`median\`: finds the median of the values
- \`stdev\`: computes the standard deviation of the values
- \`stdevp\`: computes the population standard deviation of the values
- \`variance\`: computes the variane of the values
- \`array_agg\`: collects all of the values in an array
- \`array_agg_distinct\`: collects all of the unique values in an array

## Examples

| id  | value |
| --- | ----- |
| 1   | 10    |
| 1   | 15    |
| 2   | 1     |
| 2   | 11    |
| 2   | 18    |

\`rollup column['value'] with function='sum', to_column='output'\`:

| output |
| ------ |
| 55     |

\`groupby column['id']\` and then \`rollup column['value'] with function='sum', to_column='output'\`:

| id  | output |
| --- | ------ |
| 1   | 25     |
| 2   | 30     |

\`groupby column['id']\` and then \`rollup column['value'] with function='array_agg', to_column='output'\`:

| id  | output      |
| --- | ----------- |
| 1   | [10, 15]    |
| 2   | [1, 11, 18] |
`,q0=`# sample

Extracts a random sample of rows from a table. Sampling can be specified using either a fixed row number or a percentage of total rows. If the input table is grouped, stratified sampling is performed.
`,Y0=`# onehot

Takes an input column and creates new binary categorical columns for every unique value. One hot encoding is commonly used in machine learning algorithms that require individual binary features. This operation is akin to a reverse [merge](./merge.md) paired with a [binarize](./binarize.md).

An optional prefix can be supplied for the output columns to help differentiate categorical outputs on large tables.

## Example

| item  |
| ----- |
| lamp  |
| chair |
| lamp  |
| sofa  |
| sofa  |
| lamp  |

\`onehot column['item']\`:

| item  | lamp | chair | sofa |
| ----- | ---- | ----- | ---- |
| lamp  | 1    | 0     | 0    |
| chair | 0    | 1     | 0    |
| lamp  | 1    | 0     | 0    |
| sofa  | 0    | 0     | 1    |
| sofa  | 0    | 0     | 1    |
| lamp  | 1    | 0     | 0    |`,J0=`# select

Selects only the specified list of columns into a new table.

Example

| id  | name  | age |
| --- | ----- | --- |
| 1   | Bob   | 32  |
| 2   | Joe   | 35  |
| 3   | Jenny | 31  |

\`select columns['id', 'age']\`:

| id  | age |
| --- | --- |
| 1   | 32  |
| 2   | 35  |
| 3   | 31  |
`,Z0=`# unfold

Reverses a [fold](./fold.md) operation. This is similar to a [pivot](./pivot.md), but pivot performs an aggregate when inverting the operation, rather than restoring the original rows.

## Example

| key  | value |
| ---- | ----- |
| id   | 1     |
| name | Bob   |
| id   | 2     |
| name | Joe   |
| id   | 3     |
| name | Jenny |

\`unfold key['key'] value['value']\`:

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |
`,X0=`# spread

Unrolls array-valued cells into new columns. Similar to [unroll](./unroll.md), but creating new columns instead of rows. New columns are created using the input column name plus array index. If an output columns list is supplied, any array cells with more values than the supplied output names will be truncated.

## Example

| id  | values      |
| --- | ----------- |
| 1   | [10, 15]    |
| 2   | [1, 11, 18] |

\`spread column['values']\`:

| id  | values      | values_1 | values_2 | values_3 |
| --- | ----------- | -------- | -------- | -------- |
| 1   | [10, 15]    | 10       | 15       | null     |
| 2   | [1, 11, 18] | 1        | 11       | 18       |

\`spread column['values'] to_columns=['first', 'second']\`:

| id  | values      | first | second |
| --- | ----------- | ----- | ------ |
| 1   | [10, 15]    | 10    | 15     |
| 2   | [1, 11, 18] | 1     | 11     |
`,Q0=`# erase

Clears cell values that match a specific value. The opposite of [impute](./impute.md)

## Example

| id  | name  |
| --- | ----- |
| 1   | Bob   |
| 2   | Joe   |
| 3   | Jenny |

\`erase columns['name'] with value='Jenny'\`:

| id  | name |
| --- | ---- |
| 1   | Bob  |
| 2   | Joe  |
| 3   |      |
`,ew=`# ungroup

Removes any [grouping](./groupby.md) that has been applied to a table.
`,tw=`# union

Set operation between an input table and one or more secondary tables that retains the unique set of rows across all tables. This is similar to a [concat](./concat.md) + [dedupe](./dedupe.md).

## Example

input 1

| id  |
| --- |
| 1   |
| 2   |

input 2

| id  |
| --- |
| 1   |
| 3   |
| 4   |

\`union tables['input 1', 'input 2']\`:

| id  |
| --- |
| 1   |
| 2   |
| 3   |
| 4   |
`,nw=`# recode

Allows mapping of cell contents from one one value to another. This is useful for categorizing or otherwise performing direct value transforms.

## Example

| product       |
| ------------- |
| xbox 360      |
| xbox one      |
| xbox series x |
| outlook       |
| word          |
| excel         |
| powerpoint    |

\`recode column['product] values=['xbox 360' -> 'xbox', 'xbox one' -> 'xbox', 'xbox series x' -> 'xbox', 'outlook -> m365', 'word' -> 'm365', 'excel' -> 'm365', 'powerpoint' -> 'm365'], to_column='family'\`

| product       | family |
| ------------- | ------ |
| xbox 360      | xbox   |
| xbox one      | xbox   |
| xbox series x | xbox   |
| outlook       | m365   |
| word          | m365   |
| excel         | m365   |
| powerpoint    | m365   |
`,ow=`# unorder

Removes any [ordering](./orderby.md) that has been applied to a table, reverting to its original state.
`,rw=`# window

Performs window operations on table columns. Normally the table should be [grouped](./groupby.md) first, otherwise the window function will be performed using all rows. Note also that because window functions operate on a sliding row window, it is important that your table is [ordered](./orderby.md) the way you want it before applying the window.

## Operations

- \`row_number\`: Assigns an incrementing number to each row
- \`rank\`: Assigns an incremental rank to each row in order - rows with identical values will receive the same rank
- \`percent_rank\`: Assigns a \`rank\` but uses a percentage of values in the group, where the first row is 0 and the last is 1
- \`cume_dist\`: Similar to \`percent_rank\` assigns a distribution from 0-1 across the rows
- \`first_value\`: Plucks the first value in the group and uses it as the output for the entire group
- \`last_value\`: Plucks the last value in the group and uses it as the output for the entire group
- \`fill_down\`: Fills blank spaces down the column using last valid value from rows before the empty cell
- \`fill_up\`: Fills blank spaces _up_ the column using last valid value from rows after the empty cell

## Examples

| id  | value |
| --- | ----- |
| 1   | 10    |
| 1   | 15    |
| 2   | 1     |
| 2   | 11    |
| 2   | 18    |

\`window column['value'] with function='row_number', to_column='output'\`:

| id  | value | output |
| --- | ----- | ------ |
| 1   | 10    | 1      |
| 1   | 15    | 2      |
| 2   | 1     | 3      |
| 2   | 11    | 4      |
| 2   | 18    | 5      |

\`groupby column['id']\` and then \`window column['value'] with function='row_number', to_column='output'\`:

| id  | value | output |
| --- | ----- | ------ |
| 1   | 10    | 1      |
| 1   | 15    | 2      |
| 2   | 1     | 1      |
| 2   | 11    | 2      |
| 2   | 18    | 3      |

\`groupby column['id']\` and then \`window column['value'] with function='first_value', to_column='output'\`:

| id  | value | output |
| --- | ----- | ------ |
| 1   | 10    | 10     |
| 1   | 15    | 10     |
| 2   | 1     | 1      |
| 2   | 11    | 1      |
| 2   | 18    | 1      |
`,sw=`# chain

Executes a series of verbs. This is essentially the core engine of the project. Chains can be included within parent chains, so the execution proceeds recursively. By default, each chain execution creates its own table store context so that it does not pollute the parent context with intermediate tables. The end of the chain returns the final output table. Specifying the \`nofork\` option will pass the parent context recursively, allowing for collection of all intermediate tables.
`,iw=`# unroll

Unrolls array-valued cells into new rows. Similar to [spread](./spread.md), but generating new rows instead of columns. Akin to a denormalize operation - other column values in the row are copied to the new rows.

## Example

| id  | values      |
| --- | ----------- |
| 1   | [10, 15]    |
| 2   | [1, 11, 18] |

\`unroll column['values']\`:

| id  | values |
| --- | ------ |
| 1   | 10     |
| 1   | 15     |
| 2   | 1      |
| 2   | 11     |
| 2   | 18     |
`,U={};U.binarize=k0;U.aggregate=T0;U.bin=I0;U.dedupe=j0;U.boolean=D0;U.difference=M0;U.convert=O0;U.derive=N0;U.filter=P0;U.concat=A0;U.fill=E0;U.intersect=B0;U.impute=$0;U.groupby=F0;U.fold=R0;U.join=L0;U.fetch=H0;U.lookup=V0;U.merge=W0;U.orderby=U0;U.pivot=G0;U.rename=K0;U.rollup=z0;U.sample=q0;U.onehot=Y0;U.select=J0;U.unfold=Z0;U.spread=X0;U.erase=Q0;U.ungroup=ew;U.union=tw;U.recode=nw;U.unorder=ow;U.window=rw;U.chain=sw;U.unroll=iw;function aw(t,e){return l.exports.useCallback(()=>{t&&e&&e(t)},[e,t])}function lw(t,e){const o=l.exports.useMemo(()=>t?Fa(t):null,[t]);return l.exports.useMemo(()=>{if(o)return Sw()(La()(Ra()(Iw(void 0,e)(o))))},[o,e])}function uw(t,e,o){const[n,r]=l.exports.useState(),s=xx();l.exports.useEffect(()=>{t&&r(t)},[t,r]);const i=ta(o),a=l.exports.useCallback(c=>{const p=dr(c,e??"",i(`table-${c}`));p.args=s(p.args),r(p)},[e,r,i,s]);return{internal:n,handleVerbChange:a,setInternal:r}}function cw(t,e=!1,o=!1){const n=Me();return l.exports.useMemo(()=>Hn({root:{border:`1px solid ${n.application().faint().hex()}`,width:e?800:360,maxHeight:580}},t),[n,t,e,o])}const dw=l.exports.memo(function({onDismiss:e,store:o,onTransformRequested:n,step:r,nextInputTable:s,styles:i,...a}){const[c,{toggle:p}]=dn(!1),{internal:m,setInternal:x,handleVerbChange:g}=uw(r,s,o),d=lw(m,!!r),h=aw(m,n),f=cw(i,c,!!m?.verb);return u.exports.jsxs(Ls,{onDismissed:()=>x(void 0),styles:f,directionalHint:Kn.rightBottomEdge,...a,children:[u.exports.jsxs(mw,{children:[u.exports.jsx(hw,{children:r?"Edit step":"New step"}),e&&u.exports.jsx(ye,{iconProps:pw.cancel,ariaLabel:"Close popup modal",onClick:()=>e()})]}),u.exports.jsxs(fw,{showGuidance:c,children:[u.exports.jsxs(xw,{children:[u.exports.jsxs(gw,{children:[u.exports.jsx(KC,{placeholder:"Select a verb",verb:m?.verb,onCreate:g}),m?.verb?u.exports.jsx(ye,{onClick:p,iconProps:{iconName:"Info"},checked:c}):null]}),m&&d&&u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(d,{step:m,store:o,onChange:x}),u.exports.jsx(bw,{children:u.exports.jsx(Xo,{onClick:h,children:"Save"})})]})]}),c&&m?.verb?u.exports.jsx(vw,{children:u.exports.jsx(rv,{name:m?.verb,index:U})}):null]})]})}),pw={cancel:{iconName:"Cancel"}},fw=_.div`
	padding: 0px 12px 14px 24px;
	display: flex;
	justify-content: flex-start;
	gap: 12px;
`,mw=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
	margin-bottom: 12px;
`,hw=_.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,xw=_.div`
	width: 316px;
	max-height: 32rem;
	overflow: hidden auto;
`,gw=_.div`
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`,bw=_.div`
	margin-top: 8px;
`,vw=_.div`
	width: 400px;
	max-height: 32rem;
	overflow: hidden auto;
`,re=l.exports.memo(function({step:e,rows:o,showInput:n,showOutput:r,showOutputColumn:s,style:i}){const a=l.exports.useMemo(()=>{function p(m){return m.map((x,g)=>u.exports.jsxs(Dn,{title:x.title,children:[u.exports.jsxs(Mn,{children:[x.before?u.exports.jsx(nn,{children:x.before}):null,mn(x.value)?u.exports.jsx(On,{}):u.exports.jsx(Nn,{title:x.value,children:x.value}),x.after?u.exports.jsx(nn,{children:x.after}):null]}),x.sub?p(x.sub):null]},`verb-description-row-${x.value}-${g}`))}return p(o)},[o]),c=s&&Xi(e);return u.exports.jsxs(yw,{style:i,children:[u.exports.jsx(Cw,{children:e.verb}),n?u.exports.jsx(Dn,{children:u.exports.jsxs(Mn,{children:[u.exports.jsx(nn,{children:"table"}),e.input?u.exports.jsx(Nn,{children:e.input}):u.exports.jsx(On,{})]})}):null,a,r?u.exports.jsx(Dn,{children:u.exports.jsxs(Mn,{children:[u.exports.jsx(nn,{children:"into table"}),e.output?u.exports.jsx(Nn,{children:e.output}):u.exports.jsx(On,{})]})}):null,c?u.exports.jsx(Dn,{children:u.exports.jsxs(Mn,{children:[u.exports.jsx(nn,{children:"as column"}),e.args.to?u.exports.jsx(Nn,{children:e.args.to}):u.exports.jsx(On,{})]})}):null]})}),yw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-height: 180px;
`,Cw=_.div`
	text-transform: uppercase;
	font-weight: bold;
	align-items: center;
	width: 100%;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,Dn=_.div`
	padding-left: 8px;
	display: flex;
	flex-direction: column;
`,Mn=_.div`
	display: flex;
	justify-content: flex-start;
	gap: 4px;
`,nn=_.div``,On=_.div`
	color: ${({theme:t})=>t.application().lowContrast().hex()};
	&:before {
		content: 'unset';
	}
`,Nn=_.div`
	max-width: 240px;
	text-overflow: ellipsis;
	overflow: hidden;
	font-weight: bold;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,Ra=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i,input:a,table:c}=n,p=ve(r,"args.column",i),m=Se(a||r.input,c,s),x=ww(r,m);return Zh(r)?u.exports.jsxs(_w,{className:"with-input-column-dropdown",children:[u.exports.jsx(z,{children:u.exports.jsx(Ee,{required:!0,table:m,filter:x,label:t||`Column to ${r.verb}`,selectedKey:r.args.column,onChange:p})}),u.exports.jsx(e,{...n})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)};function ww(t,e){const o=l.exports.useMemo(()=>e?Qo(e):{},[e]);return l.exports.useCallback(n=>Xh(t)?o[n]===K.Number:!0,[o,t])}const _w=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,Sw=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i}=n,a=ve(r,"input",i);return Jh(r)?u.exports.jsxs(kw,{className:"with-input-table-dropdown",children:[u.exports.jsx(z,{children:u.exports.jsx(pr,{store:s,label:t||"Input table",selectedKey:r.input,onChange:a})}),u.exports.jsx(e,{...n})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)},kw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,La=t=>e=>{const o=n=>{const{step:r,onChange:s}=n,i=Fe(r,"args.to",s);return Xi(r)?u.exports.jsxs(Tw,{className:"with-output-column-textfield",children:[u.exports.jsx(e,{...n}),u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,label:t||"New column name",placeholder:"Column name",value:r.args.to,styles:me,onChange:i})})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)},Tw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
	margin-top: 8px;
`,Iw=(t,e)=>o=>{const n=r=>{const{step:s,onChange:i}=r,a=Fe(s,"output",i);return u.exports.jsxs(jw,{className:"with-output-column-textfield",children:[u.exports.jsx(o,{...r}),u.exports.jsx(z,{children:u.exports.jsx(Te,{required:!0,disabled:e,label:t||"Output table",placeholder:"Table name",value:s.output,styles:me,onChange:a})})]})};return l.exports.memo(n)},jw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Dw=l.exports.memo(function(){const e=bu(),o=vu(),[n]=yu(),[r,s]=Cu(),[,i]=wu();return Ce(Ps,{vertical:!0,children:[Ce(ii,{align:"center",style:{margin:e.spacing.m},gap:e.spacing.s1,children:[Ce(Mw,{onClick:o,children:[B(Xe,{iconName:"OpenFolderHorizontal"})," Open sensitive data file"]}),B(_u,{title:"Open sensitive data file",children:Su.sensitiveFile})]}),!!n.length&&B(Ps,{children:B(m0,{tables:n,steps:r,onUpdateSteps:s,onOutputTable:i,stepsPosition:"middle"})})]})}),Mw=_.span`
	color: ${t=>t.theme.palette.accent};
	&:hover {
		cursor: pointer;
	}
`,Ps=_(ii)`
	height: 100%;
	overflow-y: auto;

	.ms-Button-textContainer {
		overflow: hidden;
	}

	.ms-Button-label {
		text-overflow: ellipsis;
		overflow: hidden;
	}
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Ow=l.exports.memo(function(){return B(Nw,{children:B(Dw,{})})});Ow.displayName="PreparePage";const Nw=_.div`
	height: 100%;
	overflow-y: auto;
`;export{Ow as PreparePage,Ow as default};
//# sourceMappingURL=index.475dd807.js.map
