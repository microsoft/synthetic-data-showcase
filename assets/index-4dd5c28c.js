import{r as l,u as Ae,K as Y,_ as j,a as Wn,ad as Ps,H as Ie,b as Ct,w as Wo,A as As,e as wo,N as wt,a4 as Un,O as Fs,Z as Uo,c as _t,s as St,I as tl,as as to,S as no,$ as nl,M as ol,at as u,R as Se,l as _,au as _o,av as An,i as oo,j as ht,ar as rl,P as sl}from"./Pages-831d0413.js";import{bA as il,bB as al,bC as Dr,bD as ll,bE as ul,bF as cl,bG as dl,f as Bs,bH as pl,bI as $s,aA as So,a6 as Vt,a7 as Rs,Y as kt,l as fl,aj as Go,a8 as ml,bJ as Te,ax as hl,A as Ls,B as Fn,bK as xl,bL as gl,I as ve,bM as bl,a1 as Hs,a3 as Gn,j as Ko,bm as Ce,bN as vl,bO as yl,a0 as Vs,q as ko,bP as Cl,af as wl,bd as _l,bQ as Ws,an as Sl,k as Tt,bR as kl,ar as To,bS as Mr,bT as Tl,h as Us,p as Il,g as ln,bU as jl,bV as Dl,bW as Ml,a2 as Ol,i as Xe,bX as Nl,aw as El,bY as Pl,bZ as Al,ao as Fl,b_ as Gs,aa as Bl,aD as $l,ai as Or,$ as nt,b$ as un,c0 as Ye,c1 as We,c2 as Ue,c3 as Ke,bs as Ee,br as ct,c4 as rn,c5 as cn,c6 as Ks,c7 as ze,c8 as Rl,c9 as Ll,ca as Je,cb as Io,cc as G,cd as en,ce as it,cf as Ft,cg as jo,ch as je,by as zs,ci as Hl,_ as Vl,cj as V,ck as Kn,cl as zo,cm as Wl,cn as qs,aQ as Bn,co as Ul,aW as Ys,cp as $n,b6 as zn,aZ as Gl,aJ as It,cq as Kl,aT as zl,cr as ql,cs as Yl,aU as Jl,ct as Zl,b5 as qo,b0 as Xl,cu as Js,cv as Do,cw as dt,bt as dn,bu as Ql,u as De,bw as Zs,cx as qn,be as Rn,bx as Yo,S as eu,aB as gt,cy as Jo,bg as Wt,cz as Nr,cA as Rt,t as tu,cB as nu,c as ou,cC as ru,U as su,J as Xs}from"./tables-0c0707bd.js";import{q as Er,r as On,v as Qs,w as ei,x as iu,y as ti,z as au,A as Zo,B as lu,E as ni,G as oi,H as ri,J as Mo,i as uu,u as cu,o as du,h as pu,s as si,j as fu,p as mu,l as ii,k as hu,T as xu,m as Oo,d as gu,a as bu,C as vu,b as yu,c as Cu,n as ke,F as wu,P as Xo,K as Yn,f as bt,S as _u,M as Su,I as ku,t as Tu}from"./InfoTooltip-19d830f5.js";function Iu(t,e){e===void 0&&(e=!0);var o=[];if(t){for(var n=0;n<t.children.length;n++)o.push(t.children.item(n));e&&il(t)&&o.push.apply(o,t._virtual.children)}return o}var ro=new Date,so=new Date;function ot(t,e,o,n){function r(s){return t(s=arguments.length===0?new Date:new Date(+s)),s}return r.floor=function(s){return t(s=new Date(+s)),s},r.ceil=function(s){return t(s=new Date(s-1)),e(s,1),t(s),s},r.round=function(s){var i=r(s),a=r.ceil(s);return s-i<a-s?i:a},r.offset=function(s,i){return e(s=new Date(+s),i==null?1:Math.floor(i)),s},r.range=function(s,i,a){var c=[],p;if(s=r.ceil(s),a=a==null?1:Math.floor(a),!(s<i)||!(a>0))return c;do c.push(p=new Date(+s)),e(s,a),t(s);while(p<s&&s<i);return c},r.filter=function(s){return ot(function(i){if(i>=i)for(;t(i),!s(i);)i.setTime(i-1)},function(i,a){if(i>=i)if(a<0)for(;++a<=0;)for(;e(i,-1),!s(i););else for(;--a>=0;)for(;e(i,1),!s(i););})},o&&(r.count=function(s,i){return ro.setTime(+s),so.setTime(+i),t(ro),t(so),Math.floor(o(ro,so))},r.every=function(s){return s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?r.filter(n?function(i){return n(i)%s===0}:function(i){return r.count(0,i)%s===0}):r}),r}const ju=1e3,Qo=ju*60,Du=Qo*60,er=Du*24,ai=er*7;var li=ot(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Qo)/er,t=>t.getDate()-1);const ui=li;li.range;function jt(t){return ot(function(e){e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},function(e,o){e.setDate(e.getDate()+o*7)},function(e,o){return(o-e-(o.getTimezoneOffset()-e.getTimezoneOffset())*Qo)/ai})}var ci=jt(0),Ln=jt(1),Mu=jt(2),Ou=jt(3),Lt=jt(4),Nu=jt(5),Eu=jt(6);ci.range;Ln.range;Mu.range;Ou.range;Lt.range;Nu.range;Eu.range;var tr=ot(function(t){t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,e){t.setFullYear(t.getFullYear()+e)},function(t,e){return e.getFullYear()-t.getFullYear()},function(t){return t.getFullYear()});tr.every=function(t){return!isFinite(t=Math.floor(t))||!(t>0)?null:ot(function(e){e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,o){e.setFullYear(e.getFullYear()+o*t)})};const sn=tr;tr.range;var di=ot(function(t){t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCDate(t.getUTCDate()+e)},function(t,e){return(e-t)/er},function(t){return t.getUTCDate()-1});const pi=di;di.range;function Dt(t){return ot(function(e){e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},function(e,o){e.setUTCDate(e.getUTCDate()+o*7)},function(e,o){return(o-e)/ai})}var fi=Dt(0),Hn=Dt(1),Pu=Dt(2),Au=Dt(3),Ht=Dt(4),Fu=Dt(5),Bu=Dt(6);fi.range;Hn.range;Pu.range;Au.range;Ht.range;Fu.range;Bu.range;var nr=ot(function(t){t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCFullYear(t.getUTCFullYear()+e)},function(t,e){return e.getUTCFullYear()-t.getUTCFullYear()},function(t){return t.getUTCFullYear()});nr.every=function(t){return!isFinite(t=Math.floor(t))||!(t>0)?null:ot(function(e){e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,o){e.setUTCFullYear(e.getUTCFullYear()+o*t)})};const an=nr;nr.range;function io(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function ao(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function qt(t,e,o){return{y:t,m:e,d:o,H:0,M:0,S:0,L:0}}function $u(t){var e=t.dateTime,o=t.date,n=t.time,r=t.periods,s=t.days,i=t.shortDays,a=t.months,c=t.shortMonths,p=Yt(r),m=Jt(r),x=Yt(s),g=Jt(s),d=Yt(i),h=Jt(i),f=Yt(a),b=Jt(a),v=Yt(c),C=Jt(c),S={a:ge,A:w,b:y,B:I,c:null,d:Rr,e:Rr,f:ac,g:gc,G:vc,H:rc,I:sc,j:ic,L:mi,m:lc,M:uc,p:P,q:B,Q:Vr,s:Wr,S:cc,u:dc,U:pc,V:fc,w:mc,W:hc,x:null,X:null,y:xc,Y:bc,Z:yc,"%":Hr},T={a:ee,A:te,b:ae,B:he,c:null,d:Lr,e:Lr,f:Sc,g:Pc,G:Fc,H:Cc,I:wc,j:_c,L:xi,m:kc,M:Tc,p:ce,q:$e,Q:Vr,s:Wr,S:Ic,u:jc,U:Dc,V:Mc,w:Oc,W:Nc,x:null,X:null,y:Ec,Y:Ac,Z:Bc,"%":Hr},O={a:z,A:ue,b:ie,B:Z,c:de,d:Br,e:Br,f:ec,g:Fr,G:Ar,H:$r,I:$r,j:Ju,L:Qu,m:Yu,M:Zu,p:U,q:qu,Q:nc,s:oc,S:Xu,u:Wu,U:Uu,V:Gu,w:Vu,W:Ku,x:me,X:Q,y:Fr,Y:Ar,Z:zu,"%":tc};S.x=$(o,S),S.X=$(n,S),S.c=$(e,S),T.x=$(o,T),T.X=$(n,T),T.c=$(e,T);function $(M,N){return function(L){var k=[],xe=-1,E=0,ne=M.length,_e,qe,xn;for(L instanceof Date||(L=new Date(+L));++xe<ne;)M.charCodeAt(xe)===37&&(k.push(M.slice(E,xe)),(qe=Pr[_e=M.charAt(++xe)])!=null?_e=M.charAt(++xe):qe=_e==="e"?" ":"0",(xn=N[_e])&&(_e=xn(L,qe)),k.push(_e),E=xe+1);return k.push(M.slice(E,xe)),k.join("")}}function A(M,N){return function(L){var k=qt(1900,void 0,1),xe=F(k,M,L+="",0),E,ne;if(xe!=L.length)return null;if("Q"in k)return new Date(k.Q);if("s"in k)return new Date(k.s*1e3+("L"in k?k.L:0));if(N&&!("Z"in k)&&(k.Z=0),"p"in k&&(k.H=k.H%12+k.p*12),k.m===void 0&&(k.m="q"in k?k.q:0),"V"in k){if(k.V<1||k.V>53)return null;"w"in k||(k.w=1),"Z"in k?(E=ao(qt(k.y,0,1)),ne=E.getUTCDay(),E=ne>4||ne===0?Hn.ceil(E):Hn(E),E=pi.offset(E,(k.V-1)*7),k.y=E.getUTCFullYear(),k.m=E.getUTCMonth(),k.d=E.getUTCDate()+(k.w+6)%7):(E=io(qt(k.y,0,1)),ne=E.getDay(),E=ne>4||ne===0?Ln.ceil(E):Ln(E),E=ui.offset(E,(k.V-1)*7),k.y=E.getFullYear(),k.m=E.getMonth(),k.d=E.getDate()+(k.w+6)%7)}else("W"in k||"U"in k)&&("w"in k||(k.w="u"in k?k.u%7:"W"in k?1:0),ne="Z"in k?ao(qt(k.y,0,1)).getUTCDay():io(qt(k.y,0,1)).getDay(),k.m=0,k.d="W"in k?(k.w+6)%7+k.W*7-(ne+5)%7:k.w+k.U*7-(ne+6)%7);return"Z"in k?(k.H+=k.Z/100|0,k.M+=k.Z%100,ao(k)):io(k)}}function F(M,N,L,k){for(var xe=0,E=N.length,ne=L.length,_e,qe;xe<E;){if(k>=ne)return-1;if(_e=N.charCodeAt(xe++),_e===37){if(_e=N.charAt(xe++),qe=O[_e in Pr?N.charAt(xe++):_e],!qe||(k=qe(M,L,k))<0)return-1}else if(_e!=L.charCodeAt(k++))return-1}return k}function U(M,N,L){var k=p.exec(N.slice(L));return k?(M.p=m.get(k[0].toLowerCase()),L+k[0].length):-1}function z(M,N,L){var k=d.exec(N.slice(L));return k?(M.w=h.get(k[0].toLowerCase()),L+k[0].length):-1}function ue(M,N,L){var k=x.exec(N.slice(L));return k?(M.w=g.get(k[0].toLowerCase()),L+k[0].length):-1}function ie(M,N,L){var k=v.exec(N.slice(L));return k?(M.m=C.get(k[0].toLowerCase()),L+k[0].length):-1}function Z(M,N,L){var k=f.exec(N.slice(L));return k?(M.m=b.get(k[0].toLowerCase()),L+k[0].length):-1}function de(M,N,L){return F(M,e,N,L)}function me(M,N,L){return F(M,o,N,L)}function Q(M,N,L){return F(M,n,N,L)}function ge(M){return i[M.getDay()]}function w(M){return s[M.getDay()]}function y(M){return c[M.getMonth()]}function I(M){return a[M.getMonth()]}function P(M){return r[+(M.getHours()>=12)]}function B(M){return 1+~~(M.getMonth()/3)}function ee(M){return i[M.getUTCDay()]}function te(M){return s[M.getUTCDay()]}function ae(M){return c[M.getUTCMonth()]}function he(M){return a[M.getUTCMonth()]}function ce(M){return r[+(M.getUTCHours()>=12)]}function $e(M){return 1+~~(M.getUTCMonth()/3)}return{format:function(M){var N=$(M+="",S);return N.toString=function(){return M},N},parse:function(M){var N=A(M+="",!1);return N.toString=function(){return M},N},utcFormat:function(M){var N=$(M+="",T);return N.toString=function(){return M},N},utcParse:function(M){var N=A(M+="",!0);return N.toString=function(){return M},N}}}var Pr={"-":"",_:" ",0:"0"},ye=/^\s*\d+/,Ru=/^%/,Lu=/[\\^$*+?|[\]().{}]/g;function J(t,e,o){var n=t<0?"-":"",r=(n?-t:t)+"",s=r.length;return n+(s<o?new Array(o-s+1).join(e)+r:r)}function Hu(t){return t.replace(Lu,"\\$&")}function Yt(t){return new RegExp("^(?:"+t.map(Hu).join("|")+")","i")}function Jt(t){return new Map(t.map((e,o)=>[e.toLowerCase(),o]))}function Vu(t,e,o){var n=ye.exec(e.slice(o,o+1));return n?(t.w=+n[0],o+n[0].length):-1}function Wu(t,e,o){var n=ye.exec(e.slice(o,o+1));return n?(t.u=+n[0],o+n[0].length):-1}function Uu(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.U=+n[0],o+n[0].length):-1}function Gu(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.V=+n[0],o+n[0].length):-1}function Ku(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.W=+n[0],o+n[0].length):-1}function Ar(t,e,o){var n=ye.exec(e.slice(o,o+4));return n?(t.y=+n[0],o+n[0].length):-1}function Fr(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.y=+n[0]+(+n[0]>68?1900:2e3),o+n[0].length):-1}function zu(t,e,o){var n=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(o,o+6));return n?(t.Z=n[1]?0:-(n[2]+(n[3]||"00")),o+n[0].length):-1}function qu(t,e,o){var n=ye.exec(e.slice(o,o+1));return n?(t.q=n[0]*3-3,o+n[0].length):-1}function Yu(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.m=n[0]-1,o+n[0].length):-1}function Br(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.d=+n[0],o+n[0].length):-1}function Ju(t,e,o){var n=ye.exec(e.slice(o,o+3));return n?(t.m=0,t.d=+n[0],o+n[0].length):-1}function $r(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.H=+n[0],o+n[0].length):-1}function Zu(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.M=+n[0],o+n[0].length):-1}function Xu(t,e,o){var n=ye.exec(e.slice(o,o+2));return n?(t.S=+n[0],o+n[0].length):-1}function Qu(t,e,o){var n=ye.exec(e.slice(o,o+3));return n?(t.L=+n[0],o+n[0].length):-1}function ec(t,e,o){var n=ye.exec(e.slice(o,o+6));return n?(t.L=Math.floor(n[0]/1e3),o+n[0].length):-1}function tc(t,e,o){var n=Ru.exec(e.slice(o,o+1));return n?o+n[0].length:-1}function nc(t,e,o){var n=ye.exec(e.slice(o));return n?(t.Q=+n[0],o+n[0].length):-1}function oc(t,e,o){var n=ye.exec(e.slice(o));return n?(t.s=+n[0],o+n[0].length):-1}function Rr(t,e){return J(t.getDate(),e,2)}function rc(t,e){return J(t.getHours(),e,2)}function sc(t,e){return J(t.getHours()%12||12,e,2)}function ic(t,e){return J(1+ui.count(sn(t),t),e,3)}function mi(t,e){return J(t.getMilliseconds(),e,3)}function ac(t,e){return mi(t,e)+"000"}function lc(t,e){return J(t.getMonth()+1,e,2)}function uc(t,e){return J(t.getMinutes(),e,2)}function cc(t,e){return J(t.getSeconds(),e,2)}function dc(t){var e=t.getDay();return e===0?7:e}function pc(t,e){return J(ci.count(sn(t)-1,t),e,2)}function hi(t){var e=t.getDay();return e>=4||e===0?Lt(t):Lt.ceil(t)}function fc(t,e){return t=hi(t),J(Lt.count(sn(t),t)+(sn(t).getDay()===4),e,2)}function mc(t){return t.getDay()}function hc(t,e){return J(Ln.count(sn(t)-1,t),e,2)}function xc(t,e){return J(t.getFullYear()%100,e,2)}function gc(t,e){return t=hi(t),J(t.getFullYear()%100,e,2)}function bc(t,e){return J(t.getFullYear()%1e4,e,4)}function vc(t,e){var o=t.getDay();return t=o>=4||o===0?Lt(t):Lt.ceil(t),J(t.getFullYear()%1e4,e,4)}function yc(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+J(e/60|0,"0",2)+J(e%60,"0",2)}function Lr(t,e){return J(t.getUTCDate(),e,2)}function Cc(t,e){return J(t.getUTCHours(),e,2)}function wc(t,e){return J(t.getUTCHours()%12||12,e,2)}function _c(t,e){return J(1+pi.count(an(t),t),e,3)}function xi(t,e){return J(t.getUTCMilliseconds(),e,3)}function Sc(t,e){return xi(t,e)+"000"}function kc(t,e){return J(t.getUTCMonth()+1,e,2)}function Tc(t,e){return J(t.getUTCMinutes(),e,2)}function Ic(t,e){return J(t.getUTCSeconds(),e,2)}function jc(t){var e=t.getUTCDay();return e===0?7:e}function Dc(t,e){return J(fi.count(an(t)-1,t),e,2)}function gi(t){var e=t.getUTCDay();return e>=4||e===0?Ht(t):Ht.ceil(t)}function Mc(t,e){return t=gi(t),J(Ht.count(an(t),t)+(an(t).getUTCDay()===4),e,2)}function Oc(t){return t.getUTCDay()}function Nc(t,e){return J(Hn.count(an(t)-1,t),e,2)}function Ec(t,e){return J(t.getUTCFullYear()%100,e,2)}function Pc(t,e){return t=gi(t),J(t.getUTCFullYear()%100,e,2)}function Ac(t,e){return J(t.getUTCFullYear()%1e4,e,4)}function Fc(t,e){var o=t.getUTCDay();return t=o>=4||o===0?Ht(t):Ht.ceil(t),J(t.getUTCFullYear()%1e4,e,4)}function Bc(){return"+0000"}function Hr(){return"%"}function Vr(t){return+t}function Wr(t){return Math.floor(+t/1e3)}var Et,bi,vi,yi,Ci;$c({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function $c(t){return Et=$u(t),bi=Et.format,vi=Et.parse,yi=Et.utcFormat,Ci=Et.utcParse,Et}var wi="%Y-%m-%dT%H:%M:%S.%LZ";function Rc(t){return t.toISOString()}Date.prototype.toISOString||yi(wi);function Lc(t){var e=new Date(t);return isNaN(e)?null:e}var Hc=+new Date("2000-01-01T00:00:00.000Z")?Lc:Ci(wi);const Vc=Hc;function Wc(t){const e=t.length;for(let o=0;o<e;++o){const n=t.charCodeAt(o);if(n<48||n>57)return!1}return!0}function Uc(t,e={}){const o=al(e.autoType);Dr(t)&&(t=JSON.parse(t));let n=t.data,r;if(ll(n)&&!ul(n)?t.schema&&t.schema.fields&&(r=t.schema.fields.map(s=>s.name)):n=t,o||e.parse){const s=e.parse||{};for(const i in n){const a=n[i],c=a.length;if(s[i])for(let p=0;p<c;++p)a[p]=s[i](a[p]);else if(o)for(let p=0;p<c;++p){const m=a[p];Dr(m)&&cl(m)&&!Wc(m)&&(a[p]=new Date(m))}}}return new dl(n,r)}function _i(t,e={}){const o=e.using||Bs;return fetch(t,e.fetch).then(n=>n[e.as||"text"]()).then(n=>o(n,e))}function Gc(t,e){return _i(t,{...e,as:"text",using:Bs})}function Kc(t,e){return _i(t,{...e,as:"json",using:zc})}function zc(t,e){return pl(t)?$s(t):Uc(t,e)}function qc(t,e={}){const o=`d[${JSON.stringify(t)}]`,{maxbins:n,nice:r,minstep:s,step:i,offset:a}=e,c=[n,r,s,i];let p=c.length;for(;p&&c[--p]==null;)c.pop();const m=c.length?", "+c.map(x=>x+"").join(", "):"";return`d => op.bin(${o}, ...op.bins(${o}${m}), ${a||0})`}var Yc=function(){var t=So({});return l.exports.useEffect(function(){return function(){for(var e=0,o=Object.keys(t);e<o.length;e++){var n=o[e];clearTimeout(n)}}},[t]),So({setTimeout:function(e,o){var n=setTimeout(e,o);return t[n]=1,n},clearTimeout:function(e){delete t[e],clearTimeout(e)}})},Jc="forward",Ur="backward",Zc=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return n._inputElement=l.exports.createRef(),n._autoFillEnabled=!0,n._onCompositionStart=function(r){n.setState({isComposing:!0}),n._autoFillEnabled=!1},n._onCompositionUpdate=function(){Er()&&n._updateValue(n._getCurrentInputValue(),!0)},n._onCompositionEnd=function(r){var s=n._getCurrentInputValue();n._tryEnableAutofill(s,n.value,!1,!0),n.setState({isComposing:!1}),n._async.setTimeout(function(){n._updateValue(n._getCurrentInputValue(),!1)},0)},n._onClick=function(){n.value&&n.value!==""&&n._autoFillEnabled&&(n._autoFillEnabled=!1)},n._onKeyDown=function(r){if(n.props.onKeyDown&&n.props.onKeyDown(r),!r.nativeEvent.isComposing)switch(r.which){case Y.backspace:n._autoFillEnabled=!1;break;case Y.left:case Y.right:n._autoFillEnabled&&(n.setState({inputValue:n.props.suggestedDisplayValue||""}),n._autoFillEnabled=!1);break;default:n._autoFillEnabled||n.props.enableAutofillOnKeyPress.indexOf(r.which)!==-1&&(n._autoFillEnabled=!0);break}},n._onInputChanged=function(r){var s=n._getCurrentInputValue(r);if(n.state.isComposing||n._tryEnableAutofill(s,n.value,r.nativeEvent.isComposing),!(Er()&&n.state.isComposing)){var i=r.nativeEvent.isComposing,a=i===void 0?n.state.isComposing:i;n._updateValue(s,a)}},n._onChanged=function(){},n._updateValue=function(r,s){if(!(!r&&r===n.value)){var i=n.props,a=i.onInputChange,c=i.onInputValueChange;a&&(r=a?.(r,s)||""),n.setState({inputValue:r},function(){return c?.(r,s)})}},Vt(n),n._async=new Rs(n),n.state={inputValue:o.defaultVisibleValue||"",isComposing:!1},n}return e.getDerivedStateFromProps=function(o,n){if(o.updateValueInWillReceiveProps){var r=o.updateValueInWillReceiveProps();if(r!==null&&r!==n.inputValue&&!n.isComposing)return j(j({},n),{inputValue:r})}return null},Object.defineProperty(e.prototype,"cursorLocation",{get:function(){if(this._inputElement.current){var o=this._inputElement.current;return o.selectionDirection!==Jc?o.selectionEnd:o.selectionStart}else return-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isValueSelected",{get:function(){return Boolean(this.inputElement&&this.inputElement.selectionStart!==this.inputElement.selectionEnd)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._getControlledValue()||this.state.inputValue||""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionStart",{get:function(){return this._inputElement.current?this._inputElement.current.selectionStart:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionEnd",{get:function(){return this._inputElement.current?this._inputElement.current.selectionEnd:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"inputElement",{get:function(){return this._inputElement.current},enumerable:!1,configurable:!0}),e.prototype.componentDidUpdate=function(o,n,r){var s=this.props,i=s.suggestedDisplayValue,a=s.shouldSelectFullInputValueInComponentDidUpdate,c=s.preventValueSelection,p=0;if(!c){var m=this._inputElement.current&&this._inputElement.current===document.activeElement;if(m&&this._autoFillEnabled&&this.value&&i&&Si(i,this.value)){var x=!1;if(a&&(x=a()),x)this._inputElement.current.setSelectionRange(0,i.length,Ur);else{for(;p<this.value.length&&this.value[p].toLocaleLowerCase()===i[p].toLocaleLowerCase();)p++;p>0&&this._inputElement.current.setSelectionRange(p,i.length,Ur)}}else this._inputElement.current&&r!==null&&!this._autoFillEnabled&&!this.state.isComposing&&this._inputElement.current.setSelectionRange(r.start,r.end,r.dir)}},e.prototype.componentWillUnmount=function(){this._async.dispose()},e.prototype.render=function(){var o=Wn(this.props,Ps),n=j(j({},this.props.style),{fontFamily:"inherit"});return l.exports.createElement("input",j({autoCapitalize:"off",autoComplete:"off","aria-autocomplete":"both"},o,{style:n,ref:this._inputElement,value:this._getDisplayValue(),onCompositionStart:this._onCompositionStart,onCompositionUpdate:this._onCompositionUpdate,onCompositionEnd:this._onCompositionEnd,onChange:this._onChanged,onInput:this._onInputChanged,onKeyDown:this._onKeyDown,onClick:this.props.onClick?this.props.onClick:this._onClick,"data-lpignore":!0}))},e.prototype.focus=function(){this._inputElement.current&&this._inputElement.current.focus()},e.prototype.clear=function(){this._autoFillEnabled=!0,this._updateValue("",!1),this._inputElement.current&&this._inputElement.current.setSelectionRange(0,0)},e.prototype.getSnapshotBeforeUpdate=function(){var o,n,r=this._inputElement.current;return r&&r.selectionStart!==this.value.length?{start:(o=r.selectionStart)!==null&&o!==void 0?o:r.value.length,end:(n=r.selectionEnd)!==null&&n!==void 0?n:r.value.length,dir:r.selectionDirection||"backward"}:null},e.prototype._getCurrentInputValue=function(o){return o&&o.target&&o.target.value?o.target.value:this.inputElement&&this.inputElement.value?this.inputElement.value:""},e.prototype._tryEnableAutofill=function(o,n,r,s){!r&&o&&this._inputElement.current&&this._inputElement.current.selectionStart===o.length&&!this._autoFillEnabled&&(o.length>n.length||s)&&(this._autoFillEnabled=!0)},e.prototype._getDisplayValue=function(){return this._autoFillEnabled?Xc(this.value,this.props.suggestedDisplayValue):this.value},e.prototype._getControlledValue=function(){var o=this.props.value;return o===void 0||typeof o=="string"?o:(console.warn("props.value of Autofill should be a string, but it is "+o+" with type of "+typeof o),o.toString())},e.defaultProps={enableAutofillOnKeyPress:[Y.down,Y.up]},e}(l.exports.Component);function Xc(t,e){var o=t;return e&&t&&Si(e,o)&&(o=e),o}function Si(t,e){return!t||!e?!1:t.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())===0}var lo,uo,Qc=32,ed=30,ki=32,No=36,Eo=kt(function(t){var e,o=t.semanticColors;return{backgroundColor:o.disabledBackground,color:o.disabledText,cursor:"default",selectors:(e={":after":{borderColor:o.disabledBackground}},e[Ie]={color:"GrayText",selectors:{":after":{borderColor:"GrayText"}}},e)}}),Gr={selectors:(lo={},lo[Ie]=j({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},Ct()),lo)},co={selectors:(uo={},uo[Ie]=j({color:"WindowText",backgroundColor:"Window"},Ct()),uo)},td=kt(function(t,e,o,n,r,s){var i,a=t.palette,c=t.semanticColors,p={textHoveredColor:c.menuItemTextHovered,textSelectedColor:a.neutralDark,textDisabledColor:c.disabledText,backgroundHoveredColor:c.menuItemBackgroundHovered,backgroundPressedColor:c.menuItemBackgroundPressed},m={root:[t.fonts.medium,{backgroundColor:n?p.backgroundHoveredColor:"transparent",boxSizing:"border-box",cursor:"pointer",display:r?"none":"block",width:"100%",height:"auto",minHeight:No,lineHeight:"20px",padding:"0 8px",position:"relative",borderWidth:"1px",borderStyle:"solid",borderColor:"transparent",borderRadius:0,wordWrap:"break-word",overflowWrap:"break-word",textAlign:"left",selectors:j(j((i={},i[Ie]={border:"none",borderColor:"Background"},i),!r&&{"&.ms-Checkbox":{display:"flex",alignItems:"center"}}),{"&.ms-Button--command:hover:active":{backgroundColor:p.backgroundPressedColor},".ms-Checkbox-label":{width:"100%"}})},s?[{backgroundColor:"transparent",color:p.textSelectedColor,selectors:{":hover":[{backgroundColor:p.backgroundHoveredColor},Gr]}},fl(t,{inset:-1,isFocusedOnly:!1}),Gr]:[]],rootHovered:{backgroundColor:p.backgroundHoveredColor,color:p.textHoveredColor},rootFocused:{backgroundColor:p.backgroundHoveredColor},rootDisabled:{color:p.textDisabledColor,cursor:"default"},optionText:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",minWidth:"0px",maxWidth:"100%",wordWrap:"break-word",overflowWrap:"break-word",display:"inline-block"},optionTextWrapper:{maxWidth:"100%",display:"flex",alignItems:"center"}};return Wo(m,e,o)}),nd=kt(function(t,e){var o,n,r=t.semanticColors,s=t.fonts,i={buttonTextColor:r.bodySubtext,buttonTextHoveredCheckedColor:r.buttonTextChecked,buttonBackgroundHoveredColor:r.listItemBackgroundHovered,buttonBackgroundCheckedColor:r.listItemBackgroundChecked,buttonBackgroundCheckedHoveredColor:r.listItemBackgroundCheckedHovered},a={selectors:(o={},o[Ie]=j({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},Ct()),o)},c={root:{color:i.buttonTextColor,fontSize:s.small.fontSize,position:"absolute",top:0,height:"100%",lineHeight:ed,width:ki,textAlign:"center",cursor:"default",selectors:(n={},n[Ie]=j({backgroundColor:"ButtonFace",borderColor:"ButtonText",color:"ButtonText"},Ct()),n)},icon:{fontSize:s.small.fontSize},rootHovered:[{backgroundColor:i.buttonBackgroundHoveredColor,color:i.buttonTextHoveredCheckedColor,cursor:"pointer"},a],rootPressed:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootChecked:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootCheckedHovered:[{backgroundColor:i.buttonBackgroundCheckedHoveredColor,color:i.buttonTextHoveredCheckedColor},a],rootDisabled:[Eo(t),{position:"absolute"}]};return Wo(c,e)}),od=kt(function(t,e,o){var n,r,s,i,a,c,p=t.semanticColors,m=t.fonts,x=t.effects,g={textColor:p.inputText,borderColor:p.inputBorder,borderHoveredColor:p.inputBorderHovered,borderPressedColor:p.inputFocusBorderAlt,borderFocusedColor:p.inputFocusBorderAlt,backgroundColor:p.inputBackground,erroredColor:p.errorText},d={headerTextColor:p.menuHeader,dividerBorderColor:p.bodyDivider},h={selectors:(n={},n[Ie]={color:"GrayText"},n)},f=[{color:p.inputPlaceholderText},h],b=[{color:p.inputTextHovered},h],v=[{color:p.disabledText},h],C=j(j({color:"HighlightText",backgroundColor:"Window"},Ct()),{selectors:{":after":{borderColor:"Highlight"}}}),S=Go(g.borderPressedColor,x.roundedCorner2,"border",0),T={container:{},label:{},labelDisabled:{},root:[t.fonts.medium,{boxShadow:"none",marginLeft:"0",paddingRight:ki,paddingLeft:9,color:g.textColor,position:"relative",outline:"0",userSelect:"none",backgroundColor:g.backgroundColor,cursor:"text",display:"block",height:Qc,whiteSpace:"nowrap",textOverflow:"ellipsis",boxSizing:"border-box",selectors:{".ms-Label":{display:"inline-block",marginBottom:"8px"},"&.is-open":{selectors:(r={},r[Ie]=C,r)},":after":{pointerEvents:"none",content:"''",position:"absolute",left:0,top:0,bottom:0,right:0,borderWidth:"1px",borderStyle:"solid",borderColor:g.borderColor,borderRadius:x.roundedCorner2}}}],rootHovered:{selectors:(s={":after":{borderColor:g.borderHoveredColor},".ms-ComboBox-Input":[{color:p.inputTextHovered},On(b),co]},s[Ie]=j(j({color:"HighlightText",backgroundColor:"Window"},Ct()),{selectors:{":after":{borderColor:"Highlight"}}}),s)},rootPressed:[{position:"relative",selectors:(i={},i[Ie]=C,i)}],rootFocused:[{selectors:(a={".ms-ComboBox-Input":[{color:p.inputTextHovered},co]},a[Ie]=C,a)},S],rootDisabled:Eo(t),rootError:{selectors:{":after":{borderColor:g.erroredColor},":hover:after":{borderColor:p.inputBorderHovered}}},rootDisallowFreeForm:{},input:[On(f),{backgroundColor:g.backgroundColor,color:g.textColor,boxSizing:"border-box",width:"100%",height:"100%",borderStyle:"none",outline:"none",font:"inherit",textOverflow:"ellipsis",padding:"0",selectors:{"::-ms-clear":{display:"none"}}},co],inputDisabled:[Eo(t),On(v)],errorMessage:[t.fonts.small,{color:g.erroredColor,marginTop:"5px"}],callout:{boxShadow:x.elevation8},optionsContainerWrapper:{width:o},optionsContainer:{display:"block"},screenReaderText:ml,header:[m.medium,{fontWeight:As.semibold,color:d.headerTextColor,backgroundColor:"none",borderStyle:"none",height:No,lineHeight:No,cursor:"default",padding:"0 8px",userSelect:"none",textAlign:"left",selectors:(c={},c[Ie]=j({color:"GrayText"},Ct()),c)}],divider:{height:1,backgroundColor:d.dividerBorderColor}};return Wo(T,e)}),rd=kt(function(t,e,o,n,r,s,i,a){return{container:Te("ms-ComboBox-container",e,t.container),label:Te(t.label,n&&t.labelDisabled),root:Te("ms-ComboBox",a?t.rootError:o&&"is-open",r&&"is-required",t.root,!i&&t.rootDisallowFreeForm,a&&!s?t.rootError:!n&&s&&t.rootFocused,!n&&{selectors:{":hover":a?t.rootError:!o&&!s&&t.rootHovered,":active":a?t.rootError:t.rootPressed,":focus":a?t.rootError:t.rootFocused}},n&&["is-disabled",t.rootDisabled]),input:Te("ms-ComboBox-Input",t.input,n&&t.inputDisabled),errorMessage:Te(t.errorMessage),callout:Te("ms-ComboBox-callout",t.callout),optionsContainerWrapper:Te("ms-ComboBox-optionsContainerWrapper",t.optionsContainerWrapper),optionsContainer:Te("ms-ComboBox-optionsContainer",t.optionsContainer),header:Te("ms-ComboBox-header",t.header),divider:Te("ms-ComboBox-divider",t.divider),screenReaderText:Te(t.screenReaderText)}}),Kr=kt(function(t){return{optionText:Te("ms-ComboBox-optionText",t.optionText),root:Te("ms-ComboBox-option",t.root,{selectors:{":hover":t.rootHovered,":focus":t.rootFocused,":active":t.rootPressed}}),optionTextWrapper:Te(t.optionTextWrapper)}}),Oe;(function(t){t[t.backward=-1]="backward",t[t.none=0]="none",t[t.forward=1]="forward"})(Oe||(Oe={}));var et;(function(t){t[t.clearAll=-2]="clearAll",t[t.default=-1]="default"})(et||(et={}));var sd=250,id=500,ad=1e3,ld=l.exports.memo(function(t){var e=t.render;return e()},function(t,e){t.render;var o=wo(t,["render"]);e.render;var n=wo(e,["render"]);return hl(o,n)}),ud="ComboBox",cd={options:[],allowFreeform:!1,autoComplete:"on",buttonIconProps:{iconName:"ChevronDown"}};function dd(t){var e=t.options,o=t.defaultSelectedKey,n=t.selectedKey,r=l.exports.useState(function(){return zr(e,fd(o,n))}),s=r[0],i=r[1],a=l.exports.useState(e),c=a[0],p=a[1],m=l.exports.useState(),x=m[0],g=m[1];return l.exports.useEffect(function(){if(n!==void 0){var d=Po(n),h=zr(e,d);i(h)}p(e)},[e,n]),l.exports.useEffect(function(){n===null&&g(void 0)},[n]),[s,i,c,p,x,g]}var or=l.exports.forwardRef(function(t,e){var o=Ls(cd,t);o.ref;var n=wo(o,["ref"]),r=l.exports.useRef(null),s=Fn(r,e),i=dd(n),a=i[0],c=i[1],p=i[2],m=i[3],x=i[4],g=i[5];return l.exports.createElement(pd,j({},n,{hoisted:{mergedRootRef:s,rootRef:r,selectedIndices:a,setSelectedIndices:c,currentOptions:p,setCurrentOptions:m,suggestedDisplayValue:x,setSuggestedDisplayValue:g}}))});or.displayName=ud;function Ti(t,e){for(var o=Iu(t),n=0;n<o.length;n++){var r=o[n];if(e(r))return r;var s=Ti(r,e);if(s)return s}return null}var pd=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return n._autofill=l.exports.createRef(),n._comboBoxWrapper=l.exports.createRef(),n._comboBoxMenu=l.exports.createRef(),n._selectedElement=l.exports.createRef(),n.focus=function(r,s){n.props.disabled||(n._autofill.current&&(s?xl(n._autofill.current):n._autofill.current.focus(),r&&n.setState({isOpen:!0})),n._hasFocus()||n.setState({focusState:"focused"}))},n.dismissMenu=function(){var r=n.state.isOpen;r&&n.setState({isOpen:!1})},n._onUpdateValueInAutofillWillReceiveProps=function(){var r=n._autofill.current;return!r||r.value===null||r.value===void 0?null:rt(n._currentVisibleValue)},n._renderComboBoxWrapper=function(r,s){var i=n.props,a=i.label,c=i.disabled,p=i.ariaLabel,m=i.ariaDescribedBy,x=m===void 0?n.props["aria-describedby"]:m,g=i.required,d=i.errorMessage,h=i.buttonIconProps,f=i.isButtonAriaHidden,b=f===void 0?!0:f,v=i.title,C=i.placeholder,S=i.tabIndex,T=i.autofill,O=i.iconButtonProps,$=i.hoisted.suggestedDisplayValue,A=n.state.isOpen,F=n._hasFocus()&&n.props.multiSelect&&r?r:C,U=[n.props["aria-labelledby"],a&&n._id+"-label"].join(" ").trim();return l.exports.createElement("div",{"data-ktp-target":!0,ref:n._comboBoxWrapper,id:n._id+"wrapper",className:n._classNames.root,"aria-owns":A?n._id+"-list":void 0},l.exports.createElement(Zc,j({"data-ktp-execute-target":!0,"data-is-interactable":!c,componentRef:n._autofill,id:n._id+"-input",className:n._classNames.input,type:"text",onFocus:n._onFocus,onBlur:n._onBlur,onKeyDown:n._onInputKeyDown,onKeyUp:n._onInputKeyUp,onClick:n._onAutofillClick,onTouchStart:n._onTouchStart,onInputValueChange:n._onInputChange,"aria-expanded":A,"aria-autocomplete":n._getAriaAutoCompleteValue(),role:"combobox",readOnly:c,"aria-labelledby":U||void 0,"aria-label":p&&!a?p:void 0,"aria-describedby":d!==void 0?gl(x,s):x,"aria-activedescendant":n._getAriaActiveDescendantValue(),"aria-required":g,"aria-disabled":c,"aria-controls":A?n._id+"-list":void 0,spellCheck:!1,defaultVisibleValue:n._currentVisibleValue,suggestedDisplayValue:$,updateValueInWillReceiveProps:n._onUpdateValueInAutofillWillReceiveProps,shouldSelectFullInputValueInComponentDidUpdate:n._onShouldSelectFullInputValueInAutofillComponentDidUpdate,title:v,preventValueSelection:!n._hasFocus(),placeholder:F,tabIndex:c?-1:S},T)),l.exports.createElement(ve,j({className:"ms-ComboBox-CaretDown-button",styles:n._getCaretButtonStyles(),role:"presentation","aria-hidden":b,"data-is-focusable":!1,tabIndex:-1,onClick:n._onComboBoxClick,onBlur:n._onBlur,iconProps:h,disabled:c,checked:A},O)))},n._onShouldSelectFullInputValueInAutofillComponentDidUpdate=function(){return n._currentVisibleValue===n.props.hoisted.suggestedDisplayValue},n._getVisibleValue=function(){var r=n.props,s=r.text,i=r.allowFreeform,a=r.allowFreeInput,c=r.autoComplete,p=r.hoisted,m=p.suggestedDisplayValue,x=p.selectedIndices,g=p.currentOptions,d=n.state,h=d.currentPendingValueValidIndex,f=d.currentPendingValue,b=d.isOpen,v=He(g,h);if(!(b&&v)&&(s||s==="")&&f==null)return s;if(n.props.multiSelect)if(n._hasFocus()){var C=-1;return c==="on"&&v&&(C=h),n._getPendingString(f,g,C)}else return n._getMultiselectDisplayString(x,g,m);else{var C=n._getFirstSelectedIndex();return i||a?(c==="on"&&v&&(C=h),n._getPendingString(f,g,C)):v&&c==="on"?(C=h,rt(f)):!n.state.isOpen&&f?He(g,C)?f:rt(m):He(g,C)?Ve(g[C]):rt(m)}},n._onInputChange=function(r){if(n.props.disabled){n._handleInputWhenDisabled(null);return}n.props.onInputValueChange&&n.props.onInputValueChange(r),n.props.allowFreeform||n.props.allowFreeInput?n._processInputChangeWithFreeform(r):n._processInputChangeWithoutFreeform(r)},n._onFocus=function(){var r,s;(s=(r=n._autofill.current)===null||r===void 0?void 0:r.inputElement)===null||s===void 0||s.select(),n._hasFocus()||n.setState({focusState:"focusing"})},n._onResolveOptions=function(){if(n.props.onResolveOptions){var r=n.props.onResolveOptions(wt([],n.props.hoisted.currentOptions));Array.isArray(r)?n.props.hoisted.setCurrentOptions(r):r&&r.then&&(n._currentPromise=r,r.then(function(s){r===n._currentPromise&&n.props.hoisted.setCurrentOptions(s)}))}},n._onBlur=function(r){var s,i,a=r.relatedTarget;if(r.relatedTarget===null&&(a=document.activeElement),a){var c=(s=n.props.hoisted.rootRef.current)===null||s===void 0?void 0:s.contains(a),p=(i=n._comboBoxMenu.current)===null||i===void 0?void 0:i.contains(a),m=n._comboBoxMenu.current&&bl(n._comboBoxMenu.current,function(x){return x===a});if(c||p||m){m&&n._hasFocus()&&(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r),r.preventDefault(),r.stopPropagation();return}}n._hasFocus()&&(n.setState({focusState:"none"}),(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r))},n._onRenderContainer=function(r,s){var i=r.onRenderList,a=r.calloutProps,c=r.dropdownWidth,p=r.dropdownMaxWidth,m=r.onRenderUpperContent,x=m===void 0?n._onRenderUpperContent:m,g=r.onRenderLowerContent,d=g===void 0?n._onRenderLowerContent:g,h=r.useComboBoxAsMenuWidth,f=r.persistMenu,b=r.shouldRestoreFocus,v=b===void 0?!0:b,C=n.state.isOpen,S=n._id,T=h&&n._comboBoxWrapper.current?n._comboBoxWrapper.current.clientWidth+2:void 0;return l.exports.createElement(Hs,j({isBeakVisible:!1,gapSpace:0,doNotLayer:!1,directionalHint:Gn.bottomLeftEdge,directionalHintFixed:!1},a,{onLayerMounted:n._onLayerMounted,className:Ko(n._classNames.callout,a?.className),target:n._comboBoxWrapper.current,onDismiss:n._onDismiss,onMouseDown:n._onCalloutMouseDown,onScroll:n._onScroll,setInitialFocus:!1,calloutWidth:h&&n._comboBoxWrapper.current?T&&T:c,calloutMaxWidth:p||T,hidden:f?!C:void 0,shouldRestoreFocus:v}),x(n.props,n._onRenderUpperContent),l.exports.createElement("div",{className:n._classNames.optionsContainerWrapper,ref:n._comboBoxMenu},i?.(j(j({},r),{id:S}),n._onRenderList)),d(n.props,n._onRenderLowerContent))},n._onLayerMounted=function(){n._onCalloutLayerMounted(),n._async.setTimeout(function(){n._scrollIntoView()},0),n.props.calloutProps&&n.props.calloutProps.onLayerMounted&&n.props.calloutProps.onLayerMounted()},n._onRenderLabel=function(r){var s=r.props,i=s.label,a=s.disabled,c=s.required;return i?l.exports.createElement(Un,{id:n._id+"-label",disabled:a,required:c,className:n._classNames.label},i,r.multiselectAccessibleText&&l.exports.createElement("span",{className:n._classNames.screenReaderText},r.multiselectAccessibleText)):null},n._onRenderList=function(r){var s=r.onRenderItem,i=s===void 0?n._onRenderItem:s,a=r.label,c=r.ariaLabel,p=r.multiSelect,m={items:[]},x=[],g=function(){var f=m.id?[l.exports.createElement("div",{role:"group",key:m.id,"aria-labelledby":m.id},m.items)]:m.items;x=wt(wt([],x),f),m={items:[]}},d=function(f,b){switch(f.itemType){case Ce.Header:m.items.length>0&&g();var v=n._id+f.key;m.items.push(i(j(j({id:v},f),{index:b}),n._onRenderItem)),m.id=v;break;case Ce.Divider:b>0&&m.items.push(i(j(j({},f),{index:b}),n._onRenderItem)),m.items.length>0&&g();break;default:m.items.push(i(j(j({},f),{index:b}),n._onRenderItem))}};r.options.forEach(function(f,b){d(f,b)}),m.items.length>0&&g();var h=n._id;return l.exports.createElement("div",{id:h+"-list",className:n._classNames.optionsContainer,"aria-labelledby":a&&h+"-label","aria-label":c&&!a?c:void 0,"aria-multiselectable":p?"true":void 0,role:"listbox"},x)},n._onRenderItem=function(r){switch(r.itemType){case Ce.Divider:return n._renderSeparator(r);case Ce.Header:return n._renderHeader(r);default:return n._renderOption(r)}},n._onRenderLowerContent=function(){return null},n._onRenderUpperContent=function(){return null},n._renderOption=function(r){var s=n.props.onRenderOption,i=s===void 0?n._onRenderOptionContent:s,a=n._id,c=n._isOptionSelected(r.index),p=n._isOptionChecked(r.index),m=n._isOptionIndeterminate(r.index),x=n._getCurrentOptionStyles(r),g=Kr(n._getCurrentOptionStyles(r)),d=r.title,h=function(){return i(r,n._onRenderOptionContent)},f=function(){var b,v;return n.props.multiSelect?l.exports.createElement(Ws,{id:(v=r.id)!==null&&v!==void 0?v:a+"-list"+r.index,ariaLabel:r.ariaLabel,key:r.key,styles:x,className:"ms-ComboBox-option",onChange:n._onItemClick(r),label:r.text,checked:p,indeterminate:m,title:d,disabled:r.disabled,onRenderLabel:h,inputProps:j({"aria-selected":p?"true":"false",role:"option"},{"data-index":r.index,"data-is-focusable":!0})}):l.exports.createElement(_l,{id:(b=r.id)!==null&&b!==void 0?b:a+"-list"+r.index,key:r.key,"data-index":r.index,styles:x,checked:c,className:"ms-ComboBox-option",onClick:n._onItemClick(r),onMouseEnter:n._onOptionMouseEnter.bind(n,r.index),onMouseMove:n._onOptionMouseMove.bind(n,r.index),onMouseLeave:n._onOptionMouseLeave,role:"option","aria-selected":c?"true":"false",ariaLabel:r.ariaLabel,disabled:r.disabled,title:d},l.exports.createElement("span",{className:g.optionTextWrapper,ref:c?n._selectedElement:void 0},i(r,n._onRenderOptionContent)))};return l.exports.createElement(ld,{key:r.key,index:r.index,disabled:r.disabled,isSelected:c,isChecked:p,isIndeterminate:m,text:r.text,render:f,data:r.data})},n._onCalloutMouseDown=function(r){r.preventDefault()},n._onScroll=function(){var r;!n._isScrollIdle&&n._scrollIdleTimeoutId!==void 0?(n._async.clearTimeout(n._scrollIdleTimeoutId),n._scrollIdleTimeoutId=void 0):n._isScrollIdle=!1,!((r=n.props.calloutProps)===null||r===void 0)&&r.onScroll&&n.props.calloutProps.onScroll(),n._scrollIdleTimeoutId=n._async.setTimeout(function(){n._isScrollIdle=!0},sd)},n._onRenderOptionContent=function(r){var s=Kr(n._getCurrentOptionStyles(r));return l.exports.createElement("span",{className:s.optionText},r.text)},n._onDismiss=function(){var r=n.props.onMenuDismiss;r&&r(),n.props.persistMenu&&n._onCalloutLayerMounted(),n._setOpenStateAndFocusOnClose(!1,!1),n._resetSelectedIndex()},n._onAfterClearPendingInfo=function(){n._processingClearPendingInfo=!1},n._onInputKeyDown=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.allowFreeInput,p=s.autoComplete,m=s.hoisted.currentOptions,x=n.state,g=x.isOpen,d=x.currentPendingValueValidIndexOnHover;if(n._lastKeyDownWasAltOrMeta=qr(r),i){n._handleInputWhenDisabled(r);return}var h=n._getPendingSelectedIndex(!1);switch(r.which){case Y.enter:n._autofill.current&&n._autofill.current.inputElement&&n._autofill.current.inputElement.select(),n._submitPendingValue(r),n.props.multiSelect&&g?n.setState({currentPendingValueValidIndex:h}):(g||(!a||n.state.currentPendingValue===void 0||n.state.currentPendingValue===null||n.state.currentPendingValue.length<=0)&&n.state.currentPendingValueValidIndex<0)&&n.setState({isOpen:!g});break;case Y.tab:n.props.multiSelect||n._submitPendingValue(r),g&&n._setOpenStateAndFocusOnClose(!g,!1);return;case Y.escape:if(n._resetSelectedIndex(),g)n.setState({isOpen:!1});else return;break;case Y.up:if(d===et.clearAll&&(h=n.props.hoisted.currentOptions.length),r.altKey||r.metaKey){if(g){n._setOpenStateAndFocusOnClose(!g,!0);break}return}r.preventDefault(),n._setPendingInfoFromIndexAndDirection(h,Oe.backward);break;case Y.down:r.altKey||r.metaKey?n._setOpenStateAndFocusOnClose(!0,!0):(d===et.clearAll&&(h=-1),r.preventDefault(),n._setPendingInfoFromIndexAndDirection(h,Oe.forward));break;case Y.home:case Y.end:if(a||c)return;h=-1;var f=Oe.forward;r.which===Y.end&&(h=m.length,f=Oe.backward),n._setPendingInfoFromIndexAndDirection(h,f);break;case Y.space:if(!a&&!c&&p==="off")break;default:if(r.which>=112&&r.which<=123||r.keyCode===Y.alt||r.key==="Meta")return;if(!a&&!c&&p==="on"){n._onInputChange(r.key);break}return}r.stopPropagation(),r.preventDefault()},n._onInputKeyUp=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.allowFreeInput,p=s.autoComplete,m=n.state.isOpen,x=n._lastKeyDownWasAltOrMeta&&qr(r);n._lastKeyDownWasAltOrMeta=!1;var g=x&&!(vl()||yl());if(i){n._handleInputWhenDisabled(r);return}switch(r.which){case Y.space:!a&&!c&&p==="off"&&n._setOpenStateAndFocusOnClose(!m,!!m);return;default:g&&m?n._setOpenStateAndFocusOnClose(!m,!0):(n.state.focusState==="focusing"&&n.props.openOnKeyboardFocus&&n.setState({isOpen:!0}),n.state.focusState!=="focused"&&n.setState({focusState:"focused"}));return}},n._onOptionMouseLeave=function(){n._shouldIgnoreMouseEvent()||n.props.persistMenu&&!n.state.isOpen||n.setState({currentPendingValueValidIndexOnHover:et.clearAll})},n._onComboBoxClick=function(){var r=n.props.disabled,s=n.state.isOpen;r||(n._setOpenStateAndFocusOnClose(!s,!1),n.setState({focusState:"focused"}))},n._onAutofillClick=function(){var r=n.props,s=r.disabled,i=r.allowFreeform;i&&!s?n.focus(n.state.isOpen||n._processingTouch):n._onComboBoxClick()},n._onTouchStart=function(){n._comboBoxWrapper.current&&!("onpointerdown"in n._comboBoxWrapper)&&n._handleTouchAndPointerEvent()},n._onPointerDown=function(r){r.pointerType==="touch"&&(n._handleTouchAndPointerEvent(),r.preventDefault(),r.stopImmediatePropagation())},Vt(n),n._async=new Rs(n),n._events=new Vs(n),n._id=o.id||ko("ComboBox"),n._isScrollIdle=!0,n._processingTouch=!1,n._gotMouseMove=!1,n._processingClearPendingInfo=!1,n.state={isOpen:!1,focusState:"none",currentPendingValueValidIndex:-1,currentPendingValue:void 0,currentPendingValueValidIndexOnHover:et.default},n}return Object.defineProperty(e.prototype,"selectedOptions",{get:function(){var o=this.props.hoisted,n=o.currentOptions,r=o.selectedIndices;return Cl(n,r)},enumerable:!1,configurable:!0}),e.prototype.componentDidMount=function(){this._comboBoxWrapper.current&&!this.props.disabled&&(this._events.on(this._comboBoxWrapper.current,"focus",this._onResolveOptions,!0),"onpointerdown"in this._comboBoxWrapper.current&&this._events.on(this._comboBoxWrapper.current,"pointerdown",this._onPointerDown,!0))},e.prototype.componentDidUpdate=function(o,n){var r=this,s=this.props,i=s.allowFreeform,a=s.allowFreeInput,c=s.text,p=s.onMenuOpen,m=s.onMenuDismissed,x=s.hoisted.selectedIndices,g=this.state,d=g.isOpen,h=g.currentPendingValueValidIndex;d&&(!n.isOpen||n.currentPendingValueValidIndex!==h)&&this._async.setTimeout(function(){return r._scrollIntoView()},0),this._hasFocus()&&(d||n.isOpen&&!d&&this._focusInputAfterClose&&this._autofill.current&&document.activeElement!==this._autofill.current.inputElement)&&this.focus(void 0,!0),this._focusInputAfterClose&&(n.isOpen&&!d||this._hasFocus()&&(!d&&!this.props.multiSelect&&o.hoisted.selectedIndices&&x&&o.hoisted.selectedIndices[0]!==x[0]||!i&&!a||c!==o.text))&&this._onFocus(),this._notifyPendingValueChanged(n),d&&!n.isOpen&&p&&p(),!d&&n.isOpen&&m&&m()},e.prototype.componentWillUnmount=function(){this._async.dispose(),this._events.dispose()},e.prototype.render=function(){var o=this._id,n=o+"-error",r=this.props,s=r.className,i=r.disabled,a=r.required,c=r.errorMessage,p=r.onRenderContainer,m=p===void 0?this._onRenderContainer:p,x=r.onRenderLabel,g=x===void 0?this._onRenderLabel:x,d=r.onRenderList,h=d===void 0?this._onRenderList:d,f=r.onRenderItem,b=f===void 0?this._onRenderItem:f,v=r.onRenderOption,C=v===void 0?this._onRenderOptionContent:v,S=r.allowFreeform,T=r.styles,O=r.theme,$=r.persistMenu,A=r.multiSelect,F=r.hoisted,U=F.suggestedDisplayValue,z=F.selectedIndices,ue=F.currentOptions,ie=this.state.isOpen;this._currentVisibleValue=this._getVisibleValue();var Z=A?this._getMultiselectDisplayString(z,ue,U):void 0,de=Wn(this.props,Fs,["onChange","value","aria-describedby","aria-labelledby"]),me=!!(c&&c.length>0);this._classNames=this.props.getClassNames?this.props.getClassNames(O,!!ie,!!i,!!a,!!this._hasFocus(),!!S,!!me,s):rd(od(O,T),s,!!ie,!!i,!!a,!!this._hasFocus(),!!S,!!me);var Q=this._renderComboBoxWrapper(Z,n);return l.exports.createElement("div",j({},de,{ref:this.props.hoisted.mergedRootRef,className:this._classNames.container}),g({props:this.props,multiselectAccessibleText:Z},this._onRenderLabel),Q,($||ie)&&m(j(j({},this.props),{onRenderList:h,onRenderItem:b,onRenderOption:C,options:ue.map(function(ge,w){return j(j({},ge),{index:w})}),onDismiss:this._onDismiss}),this._onRenderContainer),me&&l.exports.createElement("div",{role:"alert",id:n,className:this._classNames.errorMessage},c))},e.prototype._getPendingString=function(o,n,r){return o??(He(n,r)?Ve(n[r]):"")},e.prototype._getMultiselectDisplayString=function(o,n,r){for(var s=[],i=0;o&&i<o.length;i++){var a=o[i];n[a].itemType!==Ce.SelectAll&&s.push(He(n,a)?n[a].text:rt(r))}var c=this.props.multiSelectDelimiter,p=c===void 0?", ":c;return s.join(p)},e.prototype._processInputChangeWithFreeform=function(o){var n=this.props.hoisted.currentOptions,r=-1;if(o===""){var s=n.map(function(p,m){return j(j({},p),{index:m})}).filter(function(p){return bn(p)&&!p.disabled&&Ve(p)===o});s.length===1&&(r=s[0].index),this._setPendingInfo(o,r,o);return}var i=o;o=o.toLocaleLowerCase();var a="";if(this.props.autoComplete==="on"){var s=n.map(function(m,x){return j(j({},m),{index:x})}).filter(function(m){return bn(m)&&!m.disabled&&Ve(m).toLocaleLowerCase().indexOf(o)===0});if(s.length>0){var c=Ve(s[0]);a=c.toLocaleLowerCase()!==o?c:"",r=s[0].index}}else{var s=n.map(function(m,x){return j(j({},m),{index:x})}).filter(function(m){return bn(m)&&!m.disabled&&Ve(m).toLocaleLowerCase()===o});s.length===1&&(r=s[0].index)}this._setPendingInfo(i,r,a)},e.prototype._processInputChangeWithoutFreeform=function(o){var n=this,r=this.props.hoisted.currentOptions,s=this.state,i=s.currentPendingValue,a=s.currentPendingValueValidIndex;if(this.props.autoComplete==="on"&&o!==""){this._autoCompleteTimeout&&(this._async.clearTimeout(this._autoCompleteTimeout),this._autoCompleteTimeout=void 0,o=rt(i)+o);var c=o;o=o.toLocaleLowerCase();var p=r.map(function(x,g){return j(j({},x),{index:g})}).filter(function(x){return bn(x)&&!x.disabled&&x.text.toLocaleLowerCase().indexOf(o)===0});p.length>0&&this._setPendingInfo(c,p[0].index,Ve(p[0])),this._autoCompleteTimeout=this._async.setTimeout(function(){n._autoCompleteTimeout=void 0},ad);return}var m=a>=0?a:this._getFirstSelectedIndex();this._setPendingInfoFromIndex(m)},e.prototype._getFirstSelectedIndex=function(){var o=this.props.hoisted.selectedIndices;return o?.length?o[0]:-1},e.prototype._getNextSelectableIndex=function(o,n){var r=this.props.hoisted.currentOptions,s=o+n;if(s=Math.max(0,Math.min(r.length-1,s)),!He(r,s))return-1;var i=r[s];if(!po(i)||i.hidden===!0)if(n!==Oe.none&&(s>0&&n<Oe.none||s>=0&&s<r.length&&n>Oe.none))s=this._getNextSelectableIndex(s,n);else return o;return s},e.prototype._setSelectedIndex=function(o,n,r){r===void 0&&(r=Oe.none);var s=this.props,i=s.onChange,a=s.onPendingValueChanged,c=s.hoisted,p=c.selectedIndices,m=c.currentOptions,x=p?p.slice():[],g=m.slice();if(o=this._getNextSelectableIndex(o,r),!!He(m,o)){if(this.props.multiSelect||x.length<1||x.length===1&&x[0]!==o){var d=j({},m[o]);if(!d||d.disabled)return;if(this.props.multiSelect)if(d.selected=d.selected!==void 0?!d.selected:x.indexOf(o)<0,d.itemType===Ce.SelectAll)x=[],d.selected?m.forEach(function(v,C){!v.disabled&&po(v)&&(x.push(C),g[C]=j(j({},v),{selected:!0}))}):g=m.map(function(v){return j(j({},v),{selected:!1})});else{d.selected&&x.indexOf(o)<0?x.push(o):!d.selected&&x.indexOf(o)>=0&&(x=x.filter(function(v){return v!==o})),g[o]=d;var h=g.filter(function(v){return v.itemType===Ce.SelectAll})[0];if(h){var f=this._isSelectAllChecked(x),b=g.indexOf(h);f?(x.push(b),g[b]=j(j({},h),{selected:!0})):(x=x.filter(function(v){return v!==b}),g[b]=j(j({},h),{selected:!1}))}}else x[0]=o;n.persist(),this.props.selectedKey||this.props.selectedKey===null?this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1):(this.props.hoisted.setSelectedIndices(x),this.props.hoisted.setCurrentOptions(g),this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1)),i&&i(n,d,o,Ve(d))}this.props.multiSelect&&this.state.isOpen||this._clearPendingInfo()}},e.prototype._submitPendingValue=function(o){var n,r=this.props,s=r.onChange,i=r.allowFreeform,a=r.autoComplete,c=r.multiSelect,p=r.hoisted,m=p.currentOptions,x=this.state,g=x.currentPendingValue,d=x.currentPendingValueValidIndex,h=x.currentPendingValueValidIndexOnHover,f=this.props.hoisted.selectedIndices;if(!this._processingClearPendingInfo){if(i){if(g==null){h>=0&&(this._setSelectedIndex(h,o),this._clearPendingInfo());return}if(He(m,d)){var b=Ve(m[d]).toLocaleLowerCase(),v=this._autofill.current;if(g.toLocaleLowerCase()===b||a&&b.indexOf(g.toLocaleLowerCase())===0&&v?.isValueSelected&&g.length+(v.selectionEnd-v.selectionStart)===b.length||((n=v?.inputElement)===null||n===void 0?void 0:n.value.toLocaleLowerCase())===b){if(this._setSelectedIndex(d,o),c&&this.state.isOpen)return;this._clearPendingInfo();return}}if(s)s&&s(o,void 0,void 0,g);else{var C={key:g||ko(),text:rt(g)};c&&(C.selected=!0);var S=m.concat([C]);f&&(c||(f=[]),f.push(S.length-1)),p.setCurrentOptions(S),p.setSelectedIndices(f)}}else d>=0?this._setSelectedIndex(d,o):h>=0&&this._setSelectedIndex(h,o);this._clearPendingInfo()}},e.prototype._onCalloutLayerMounted=function(){this._gotMouseMove=!1},e.prototype._renderSeparator=function(o){var n=o.index,r=o.key;return n&&n>0?l.exports.createElement("div",{role:"separator",key:r,className:this._classNames.divider}):null},e.prototype._renderHeader=function(o){var n=this.props.onRenderOption,r=n===void 0?this._onRenderOptionContent:n;return l.exports.createElement("div",{id:o.id,key:o.key,className:this._classNames.header},r(o,this._onRenderOptionContent))},e.prototype._isOptionHighlighted=function(o){var n=this.state.currentPendingValueValidIndexOnHover;return n===et.clearAll?!1:n>=0?n===o:this._isOptionSelected(o)},e.prototype._isOptionSelected=function(o){return this._getPendingSelectedIndex(!0)===o},e.prototype._isOptionChecked=function(o){if(this.props.multiSelect&&o!==void 0&&this.props.hoisted.selectedIndices){var n=-1;return n=this.props.hoisted.selectedIndices.indexOf(o),n>=0}return!1},e.prototype._isOptionIndeterminate=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted;if(r&&o!==void 0&&s.selectedIndices&&s.currentOptions){var i=s.currentOptions[o];if(i&&i.itemType===Ce.SelectAll)return s.selectedIndices.length>0&&!this._isSelectAllChecked()}return!1},e.prototype._isSelectAllChecked=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted,i=s.currentOptions.find(function(x){return x.itemType===Ce.SelectAll}),a=o||s.selectedIndices;if(!r||!a||!i)return!1;var c=s.currentOptions.indexOf(i),p=a.filter(function(x){return x!==c}),m=s.currentOptions.filter(function(x){return!x.disabled&&x.itemType!==Ce.SelectAll&&po(x)});return p.length===m.length},e.prototype._getPendingSelectedIndex=function(o){var n=this.state,r=n.currentPendingValueValidIndex,s=n.currentPendingValue;return r>=0||o&&s!==null&&s!==void 0?r:this.props.multiSelect?-1:this._getFirstSelectedIndex()},e.prototype._scrollIntoView=function(){var o=this.props,n=o.onScrollToItem,r=o.scrollSelectedToTop,s=this._getPendingSelectedIndex(!0);if(n){n(s>=0?s:this._getFirstSelectedIndex());return}var i=this._selectedElement.current;if(this.props.multiSelect&&this._comboBoxMenu.current&&(i=Ti(this._comboBoxMenu.current,function(C){var S;return((S=C.dataset)===null||S===void 0?void 0:S.index)===s.toString()})),i&&i.offsetParent){var a=!0;if(this._comboBoxMenu.current&&this._comboBoxMenu.current.offsetParent){var c=this._comboBoxMenu.current.offsetParent,p=i.offsetParent,m=p,x=m.offsetHeight,g=m.offsetTop,d=c,h=d.offsetHeight,f=d.scrollTop,b=g<f,v=g+x>f+h;b||r?(a=!1,c.scrollTo(0,g)):v&&c.scrollTo(0,g-h+x)}else i.offsetParent.scrollIntoView(a)}},e.prototype._onItemClick=function(o){var n=this,r=this.props.onItemClick,s=o.index;return function(i){n.props.multiSelect||(n._autofill.current&&n._autofill.current.focus(),n.setState({isOpen:!1})),r&&r(i,o,s),n._setSelectedIndex(s,i)}},e.prototype._resetSelectedIndex=function(){var o=this.props.hoisted.currentOptions;this._clearPendingInfo();var n=this._getFirstSelectedIndex();n>0&&n<o.length?this.props.hoisted.setSuggestedDisplayValue(o[n].text):this.props.text&&this.props.hoisted.setSuggestedDisplayValue(this.props.text)},e.prototype._clearPendingInfo=function(){this._processingClearPendingInfo=!0,this.props.hoisted.setSuggestedDisplayValue(void 0),this.setState({currentPendingValue:void 0,currentPendingValueValidIndex:-1,currentPendingValueValidIndexOnHover:et.default},this._onAfterClearPendingInfo)},e.prototype._setPendingInfo=function(o,n,r){n===void 0&&(n=-1),!this._processingClearPendingInfo&&(this.props.hoisted.setSuggestedDisplayValue(r),this.setState({currentPendingValue:rt(o),currentPendingValueValidIndex:n,currentPendingValueValidIndexOnHover:et.default}))},e.prototype._setPendingInfoFromIndex=function(o){var n=this.props.hoisted.currentOptions;if(o>=0&&o<n.length){var r=n[o];this._setPendingInfo(Ve(r),o,Ve(r))}else this._clearPendingInfo()},e.prototype._setPendingInfoFromIndexAndDirection=function(o,n){var r=this.props.hoisted.currentOptions;n===Oe.forward&&o>=r.length-1?o=-1:n===Oe.backward&&o<=0&&(o=r.length);var s=this._getNextSelectableIndex(o,n);o===s?n===Oe.forward?o=this._getNextSelectableIndex(-1,n):n===Oe.backward&&(o=this._getNextSelectableIndex(r.length,n)):o=s,He(r,o)&&this._setPendingInfoFromIndex(o)},e.prototype._notifyPendingValueChanged=function(o){var n=this.props.onPendingValueChanged;if(n){var r=this.props.hoisted.currentOptions,s=this.state,i=s.currentPendingValue,a=s.currentPendingValueValidIndex,c=s.currentPendingValueValidIndexOnHover,p=void 0,m=void 0;c!==o.currentPendingValueValidIndexOnHover&&He(r,c)?p=c:a!==o.currentPendingValueValidIndex&&He(r,a)?p=a:i!==o.currentPendingValue&&(m=i),(p!==void 0||m!==void 0||this._hasPendingValue)&&(n(p!==void 0?r[p]:void 0,p,m),this._hasPendingValue=p!==void 0||m!==void 0)}},e.prototype._setOpenStateAndFocusOnClose=function(o,n){this._focusInputAfterClose=n,this.setState({isOpen:o})},e.prototype._onOptionMouseEnter=function(o){this._shouldIgnoreMouseEvent()||this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._onOptionMouseMove=function(o){this._gotMouseMove=!0,!(!this._isScrollIdle||this.state.currentPendingValueValidIndexOnHover===o)&&this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._shouldIgnoreMouseEvent=function(){return!this._isScrollIdle||!this._gotMouseMove},e.prototype._handleInputWhenDisabled=function(o){this.props.disabled&&(this.state.isOpen&&this.setState({isOpen:!1}),o!==null&&o.which!==Y.tab&&o.which!==Y.escape&&(o.which<112||o.which>123)&&(o.stopPropagation(),o.preventDefault()))},e.prototype._handleTouchAndPointerEvent=function(){var o=this;this._lastTouchTimeoutId!==void 0&&(this._async.clearTimeout(this._lastTouchTimeoutId),this._lastTouchTimeoutId=void 0),this._processingTouch=!0,this._lastTouchTimeoutId=this._async.setTimeout(function(){o._processingTouch=!1,o._lastTouchTimeoutId=void 0},id)},e.prototype._getCaretButtonStyles=function(){var o=this.props.caretDownButtonStyles;return nd(this.props.theme,o)},e.prototype._getCurrentOptionStyles=function(o){var n=this.props.comboBoxOptionStyles,r=o.styles;return td(this.props.theme,n,r,this._isPendingOption(o),o.hidden,this._isOptionHighlighted(o.index))},e.prototype._getAriaActiveDescendantValue=function(){var o,n,r=this.props.hoisted,s=r.currentOptions,i=r.selectedIndices,a=this.state,c=a.isOpen,p=a.currentPendingValueValidIndex,m=s.map(function(g,d){return j(j({},g),{index:d})}),x=c&&i?.length?(o=m[i[0]].id)!==null&&o!==void 0?o:this._id+"-list"+i[0]:void 0;return c&&this._hasFocus()&&p!==-1&&(x=(n=m[p].id)!==null&&n!==void 0?n:this._id+"-list"+p),x},e.prototype._getAriaAutoCompleteValue=function(){var o=!this.props.disabled&&this.props.autoComplete==="on";return o?this.props.allowFreeform?"inline":"both":"list"},e.prototype._isPendingOption=function(o){return o&&o.index===this.state.currentPendingValueValidIndex},e.prototype._hasFocus=function(){return this.state.focusState!=="none"},e=Uo([wl("ComboBox",["theme","styles"],!0)],e),e}(l.exports.Component);function zr(t,e){if(!t||!e)return[];var o={};t.forEach(function(a,c){a.selected&&(o[c]=!0)});for(var n=function(a){var c=Sl(t,function(p){return p.key===a});c>-1&&(o[c]=!0)},r=0,s=e;r<s.length;r++){var i=s[r];n(i)}return Object.keys(o).map(Number).sort()}function fd(t,e){var o=Po(t);return o.length?o:Po(e)}function Po(t){return t===void 0?[]:t instanceof Array?t:[t]}function rt(t){return t||""}function He(t,e){return!!t&&e>=0&&e<t.length}function bn(t){return t.itemType!==Ce.Header&&t.itemType!==Ce.Divider&&t.itemType!==Ce.SelectAll}function po(t){return t.itemType!==Ce.Header&&t.itemType!==Ce.Divider}function Ve(t){return t.useAriaLabelAsText&&t.ariaLabel?t.ariaLabel:t.text}function qr(t){return t.which===Y.alt||t.key==="Meta"}var at;(function(t){t[t.normal=0]="normal",t[t.largeHeader=1]="largeHeader",t[t.close=2]="close"})(at||(at={}));var Ii=To.durationValue2,md={root:"ms-Modal",main:"ms-Dialog-main",scrollableContent:"ms-Modal-scrollableContent",isOpen:"is-open",layer:"ms-Modal-Layer"},hd=function(t){var e,o=t.className,n=t.containerClassName,r=t.scrollableContentClassName,s=t.isOpen,i=t.isVisible,a=t.hasBeenOpened,c=t.modalRectangleTop,p=t.theme,m=t.topOffsetFixed,x=t.isModeless,g=t.layerClassName,d=t.isDefaultDragHandle,h=t.windowInnerHeight,f=p.palette,b=p.effects,v=p.fonts,C=Tt(md,p);return{root:[C.root,v.medium,{backgroundColor:"transparent",position:"fixed",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,pointerEvents:"none",transition:"opacity "+Ii},m&&typeof c=="number"&&a&&{alignItems:"flex-start"},s&&C.isOpen,i&&{opacity:1},i&&!x&&{pointerEvents:"auto"},o],main:[C.main,{boxShadow:b.elevation64,borderRadius:b.roundedCorner2,backgroundColor:f.white,boxSizing:"border-box",position:"relative",textAlign:"left",outline:"3px solid transparent",maxHeight:"calc(100% - 32px)",maxWidth:"calc(100% - 32px)",minHeight:"176px",minWidth:"288px",overflowY:"auto",zIndex:x?kl.Layer:void 0},x&&{pointerEvents:"auto"},m&&typeof c=="number"&&a&&{top:c},d&&{cursor:"move"},n],scrollableContent:[C.scrollableContent,{overflowY:"auto",flexGrow:1,maxHeight:"100vh",selectors:(e={},e["@supports (-webkit-overflow-scrolling: touch)"]={maxHeight:h},e)},r],layer:x&&[g,C.layer,{pointerEvents:"none"}],keyboardMoveIconContainer:{position:"absolute",display:"flex",justifyContent:"center",width:"100%",padding:"3px 0px"},keyboardMoveIcon:{fontSize:v.xLargePlus.fontSize,width:"24px"}}},xd=kt(function(t,e){return{root:Te(t,e&&{touchAction:"none",selectors:{"& *":{userSelect:"none"}}})}}),Zt={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},gd=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return n._currentEventType=Zt.mouse,n._events=[],n._onMouseDown=function(r){var s=l.exports.Children.only(n.props.children).props.onMouseDown;return s&&s(r),n._currentEventType=Zt.mouse,n._onDragStart(r)},n._onMouseUp=function(r){var s=l.exports.Children.only(n.props.children).props.onMouseUp;return s&&s(r),n._currentEventType=Zt.mouse,n._onDragStop(r)},n._onTouchStart=function(r){var s=l.exports.Children.only(n.props.children).props.onTouchStart;return s&&s(r),n._currentEventType=Zt.touch,n._onDragStart(r)},n._onTouchEnd=function(r){var s=l.exports.Children.only(n.props.children).props.onTouchEnd;s&&s(r),n._currentEventType=Zt.touch,n._onDragStop(r)},n._onDragStart=function(r){if(typeof r.button=="number"&&r.button!==0)return!1;if(!(n.props.handleSelector&&!n._matchesSelector(r.target,n.props.handleSelector)||n.props.preventDragSelector&&n._matchesSelector(r.target,n.props.preventDragSelector))){n._touchId=n._getTouchId(r);var s=n._getControlPosition(r);if(s!==void 0){var i=n._createDragDataFromPosition(s);n.props.onStart&&n.props.onStart(r,i),n.setState({isDragging:!0,lastPosition:s}),n._events=[Mr(document.body,n._currentEventType.move,n._onDrag,!0),Mr(document.body,n._currentEventType.stop,n._onDragStop,!0)]}}},n._onDrag=function(r){r.type==="touchmove"&&r.preventDefault();var s=n._getControlPosition(r);if(s){var i=n._createUpdatedDragData(n._createDragDataFromPosition(s)),a=i.position;n.props.onDragChange&&n.props.onDragChange(r,i),n.setState({position:a,lastPosition:s})}},n._onDragStop=function(r){if(n.state.isDragging){var s=n._getControlPosition(r);if(s){var i=n._createDragDataFromPosition(s);n.setState({isDragging:!1,lastPosition:void 0}),n.props.onStop&&n.props.onStop(r,i),n.props.position&&n.setState({position:n.props.position}),n._events.forEach(function(a){return a()})}}},n.state={isDragging:!1,position:n.props.position||{x:0,y:0},lastPosition:void 0},n}return e.prototype.componentDidUpdate=function(o){this.props.position&&(!o.position||this.props.position!==o.position)&&this.setState({position:this.props.position})},e.prototype.componentWillUnmount=function(){this._events.forEach(function(o){return o()})},e.prototype.render=function(){var o=l.exports.Children.only(this.props.children),n=o.props,r=this.props.position,s=this.state,i=s.position,a=s.isDragging,c=i.x,p=i.y;return r&&!a&&(c=r.x,p=r.y),l.exports.cloneElement(o,{style:j(j({},n.style),{transform:"translate("+c+"px, "+p+"px)"}),className:xd(n.className,this.state.isDragging).root,onMouseDown:this._onMouseDown,onMouseUp:this._onMouseUp,onTouchStart:this._onTouchStart,onTouchEnd:this._onTouchEnd})},e.prototype._getControlPosition=function(o){var n=this._getActiveTouch(o);if(!(this._touchId!==void 0&&!n)){var r=n||o;return{x:r.clientX,y:r.clientY}}},e.prototype._getActiveTouch=function(o){return o.targetTouches&&this._findTouchInTouchList(o.targetTouches)||o.changedTouches&&this._findTouchInTouchList(o.changedTouches)},e.prototype._getTouchId=function(o){var n=o.targetTouches&&o.targetTouches[0]||o.changedTouches&&o.changedTouches[0];if(n)return n.identifier},e.prototype._matchesSelector=function(o,n){if(!o||o===document.body)return!1;var r=o.matches||o.webkitMatchesSelector||o.msMatchesSelector;return r?r.call(o,n)||this._matchesSelector(o.parentElement,n):!1},e.prototype._findTouchInTouchList=function(o){if(this._touchId!==void 0){for(var n=0;n<o.length;n++)if(o[n].identifier===this._touchId)return o[n]}},e.prototype._createDragDataFromPosition=function(o){var n=this.state.lastPosition;return n===void 0?{delta:{x:0,y:0},lastPosition:o,position:o}:{delta:{x:o.x-n.x,y:o.y-n.y},lastPosition:n,position:o}},e.prototype._createUpdatedDragData=function(o){var n=this.state.position;return{position:{x:n.x+o.delta.x,y:n.y+o.delta.y},delta:o.delta,lastPosition:n}},e}(l.exports.Component),Pt={x:0,y:0},bd={isOpen:!1,isDarkOverlay:!0,className:"",containerClassName:"",enableAriaHiddenSiblings:!0},vd=_t(),yd=function(t){var e=10;return t.shiftKey?t.ctrlKey||(e=50):t.ctrlKey&&(e=1),e},Cd=function(t,e){l.exports.useImperativeHandle(t.componentRef,function(){return{focus:function(){e.current&&e.current.focus()}}},[e])},ji=l.exports.forwardRef(function(t,e){var o,n,r,s,i,a=Ls(bd,t),c=a.allowTouchBodyScroll,p=a.className,m=a.children,x=a.containerClassName,g=a.scrollableContentClassName,d=a.elementToFocusOnDismiss,h=a.firstFocusableSelector,f=a.focusTrapZoneProps,b=a.forceFocusInsideTrap,v=a.disableRestoreFocus,C=v===void 0?a.ignoreExternalFocusing:v,S=a.isBlocking,T=a.isAlert,O=a.isClickableOutsideFocusTrap,$=a.isDarkOverlay,A=a.onDismiss,F=a.layerProps,U=a.overlay,z=a.isOpen,ue=a.titleAriaId,ie=a.styles,Z=a.subtitleAriaId,de=a.theme,me=a.topOffsetFixed,Q=a.responsiveMode,ge=a.onLayerDidMount,w=a.isModeless,y=a.dragOptions,I=a.onDismissed,P=a.enableAriaHiddenSiblings,B=a.popupProps,ee=l.exports.useRef(null),te=l.exports.useRef(null),ae=Fn(te,f?.componentRef),he=l.exports.useRef(null),ce=Fn(ee,e),$e=Tl(ce),M=Us("ModalFocusTrapZone",f?.id),N=Il(),L=Yc(),k=L.setTimeout,xe=L.clearTimeout,E=l.exports.useState(z),ne=E[0],_e=E[1],qe=l.exports.useState(z),xn=qe[0],yr=qe[1],Cr=l.exports.useState(Pt),wr=Cr[0],pt=Cr[1],_r=l.exports.useState(),Ha=_r[0],Va=_r[1],Sr=ln(!1),kr=Sr[0],Tr=Sr[1],Wa=Tr.toggle,Ot=Tr.setFalse,R=So(function(){return{onModalCloseTimer:0,allowTouchBodyScroll:c,scrollableContent:null,lastSetCoordinates:Pt,events:new Vs({})}}),eo=(y||{}).keepInBounds,Ua=T??(S&&!w),Ga=F===void 0?"":F.className,Nt=vd(ie,{theme:de,className:p,containerClassName:x,scrollableContentClassName:g,isOpen:z,isVisible:xn,hasBeenOpened:R.hasBeenOpened,modalRectangleTop:Ha,topOffsetFixed:me,isModeless:w,layerClassName:Ga,windowInnerHeight:N?.innerHeight,isDefaultDragHandle:y&&!y.dragHandleSelector}),Ka=j(j({eventBubblingEnabled:!1},F),{onLayerDidMount:F&&F.onLayerDidMount?F.onLayerDidMount:ge,insertFirst:F?.insertFirst||w,className:Nt.layer}),za=l.exports.useCallback(function(pe){pe?R.allowTouchBodyScroll?jl(pe,R.events):Dl(pe,R.events):R.events.off(R.scrollableContent),R.scrollableContent=pe},[R]),qa=function(){var pe=he.current,H=pe?.getBoundingClientRect();H&&(me&&Va(H.top),eo&&(R.minPosition={x:-H.left,y:-H.top},R.maxPosition={x:H.left,y:H.top}))},ft=l.exports.useCallback(function(pe,H){var Re=R.minPosition,zt=R.maxPosition;return eo&&Re&&zt&&(H=Math.max(Re[pe],H),H=Math.min(zt[pe],H)),H},[eo,R]),Ir=function(){var pe;R.lastSetCoordinates=Pt,Ot(),R.isInKeyboardMoveMode=!1,_e(!1),pt(Pt),(pe=R.disposeOnKeyUp)===null||pe===void 0||pe.call(R),I?.()},Ya=l.exports.useCallback(function(){Ot(),R.isInKeyboardMoveMode=!1},[R,Ot]),Ja=l.exports.useCallback(function(pe,H){pt(function(Re){return{x:ft("x",Re.x+H.delta.x),y:ft("y",Re.y+H.delta.y)}})},[ft]),Za=l.exports.useCallback(function(){te.current&&te.current.focus()},[]),Xa=function(){var pe=function(H){if(H.altKey&&H.ctrlKey&&H.keyCode===Y.space){H.preventDefault(),H.stopPropagation();return}var Re=H.altKey||H.keyCode===Y.escape;if(kr&&Re&&Ot(),R.isInKeyboardMoveMode&&(H.keyCode===Y.escape||H.keyCode===Y.enter)&&(R.isInKeyboardMoveMode=!1,H.preventDefault(),H.stopPropagation()),R.isInKeyboardMoveMode){var zt=!0,gn=yd(H);switch(H.keyCode){case Y.escape:pt(R.lastSetCoordinates);case Y.enter:{R.lastSetCoordinates=Pt;break}case Y.up:{pt(function(Le){return{x:Le.x,y:ft("y",Le.y-gn)}});break}case Y.down:{pt(function(Le){return{x:Le.x,y:ft("y",Le.y+gn)}});break}case Y.left:{pt(function(Le){return{x:ft("x",Le.x-gn),y:Le.y}});break}case Y.right:{pt(function(Le){return{x:ft("x",Le.x+gn),y:Le.y}});break}default:zt=!1}zt&&(H.preventDefault(),H.stopPropagation())}};R.lastSetCoordinates=wr,Ot(),R.isInKeyboardMoveMode=!0,R.events.on(N,"keydown",pe,!0),R.disposeOnKeyDown=function(){R.events.off(N,"keydown",pe,!0),R.disposeOnKeyDown=void 0}},Qa=function(pe){var H,Re;(H=f?.onBlur)===null||H===void 0||H.call(f,pe),R.lastSetCoordinates=Pt,R.isInKeyboardMoveMode=!1,(Re=R.disposeOnKeyDown)===null||Re===void 0||Re.call(R)},el=function(){var pe=function(H){H.altKey&&H.ctrlKey&&H.keyCode===Y.space&&Fl(R.scrollableContent,H.target)&&(Wa(),H.preventDefault(),H.stopPropagation())};R.disposeOnKeyUp||(R.events.on(N,"keyup",pe,!0),R.disposeOnKeyUp=function(){R.events.off(N,"keyup",pe,!0),R.disposeOnKeyUp=void 0})};l.exports.useEffect(function(){xe(R.onModalCloseTimer),z&&(requestAnimationFrame(function(){return k(qa,0)}),_e(!0),y&&el(),R.hasBeenOpened=!0,yr(!0)),!z&&ne&&(R.onModalCloseTimer=k(Ir,parseFloat(Ii)*1e3),yr(!1))},[ne,z]),Ml(function(){R.events.dispose()}),Cd(a,te);var jr=l.exports.createElement(Ol,j({},f,{id:M,ref:he,componentRef:ae,className:Ko(Nt.main,f?.className),elementToFocusOnDismiss:(o=f?.elementToFocusOnDismiss)!==null&&o!==void 0?o:d,isClickableOutsideFocusTrap:(n=f?.isClickableOutsideFocusTrap)!==null&&n!==void 0?n:w||O||!S,disableRestoreFocus:(r=f?.disableRestoreFocus)!==null&&r!==void 0?r:C,forceFocusInsideTrap:((s=f?.forceFocusInsideTrap)!==null&&s!==void 0?s:b)&&!w,firstFocusableSelector:f?.firstFocusableSelector||h,focusPreviouslyFocusedInnerElement:(i=f?.focusPreviouslyFocusedInnerElement)!==null&&i!==void 0?i:!0,onBlur:R.isInKeyboardMoveMode?Qa:void 0}),y&&R.isInKeyboardMoveMode&&l.exports.createElement("div",{className:Nt.keyboardMoveIconContainer},y.keyboardMoveIconProps?l.exports.createElement(Xe,j({},y.keyboardMoveIconProps)):l.exports.createElement(Xe,{iconName:"move",className:Nt.keyboardMoveIcon})),l.exports.createElement("div",{ref:za,className:Nt.scrollableContent,"data-is-scrollable":!0},y&&kr&&l.exports.createElement(y.menu,{items:[{key:"move",text:y.moveMenuItemText,onClick:Xa},{key:"close",text:y.closeMenuItemText,onClick:Ir}],onDismiss:Ot,alignTargetEdge:!0,coverTarget:!0,directionalHint:Gn.topLeftEdge,directionalHintFixed:!0,shouldFocusOnMount:!0,target:R.scrollableContent}),m));return ne&&$e>=(Q||Nl.small)&&l.exports.createElement(El,j({ref:ce},Ka),l.exports.createElement(Pl,j({role:Ua?"alertdialog":"dialog",ariaLabelledBy:ue,ariaDescribedBy:Z,onDismiss:A,shouldRestoreFocus:!C,enableAriaHiddenSiblings:P,"aria-modal":!w},B),l.exports.createElement("div",{className:Nt.root,role:w?void 0:"document"},!w&&l.exports.createElement(Al,j({"aria-hidden":!0,isDarkThemed:$,onClick:S?void 0:A,allowTouchBodyScroll:c},U)),y?l.exports.createElement(gd,{handleSelector:y.dragHandleSelector||"#"+M,preventDragSelector:"button",onStart:Ya,onDragChange:Ja,onStop:Za,position:wr},jr):jr)))||null});ji.displayName="Modal";var rr=St(ji,hd,void 0,{scope:"Modal",fields:["theme","styles","enableAriaHiddenSiblings"]});rr.displayName="Modal";var wd=_t(),_d=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return Vt(n),n}return e.prototype.render=function(){var o=this.props,n=o.className,r=o.styles,s=o.theme;return this._classNames=wd(r,{theme:s,className:n}),l.exports.createElement("div",{className:this._classNames.actions},l.exports.createElement("div",{className:this._classNames.actionsRight},this._renderChildrenAsActions()))},e.prototype._renderChildrenAsActions=function(){var o=this;return l.exports.Children.map(this.props.children,function(n){return n?l.exports.createElement("span",{className:o._classNames.action},n):null})},e}(l.exports.Component),Sd={actions:"ms-Dialog-actions",action:"ms-Dialog-action",actionsRight:"ms-Dialog-actionsRight"},kd=function(t){var e=t.className,o=t.theme,n=Tt(Sd,o);return{actions:[n.actions,{position:"relative",width:"100%",minHeight:"24px",lineHeight:"24px",margin:"16px 0 0",fontSize:"0",selectors:{".ms-Button":{lineHeight:"normal",verticalAlign:"middle"}}},e],action:[n.action,{margin:"0 4px"}],actionsRight:[n.actionsRight,{alignItems:"center",display:"flex",fontSize:"0",justifyContent:"flex-end",marginRight:"-4px"}]}},Di=St(_d,kd,void 0,{scope:"DialogFooter"}),Td=_t(),Id=l.exports.createElement(Di,null).type,jd=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return Vt(n),n}return e.prototype.render=function(){var o=this.props,n=o.showCloseButton,r=o.className,s=o.closeButtonAriaLabel,i=o.onDismiss,a=o.subTextId,c=o.subText,p=o.titleProps,m=p===void 0?{}:p,x=o.titleId,g=o.title,d=o.type,h=o.styles,f=o.theme,b=o.draggableHeaderClassName,v=Td(h,{theme:f,className:r,isLargeHeader:d===at.largeHeader,isClose:d===at.close,draggableHeaderClassName:b}),C=this._groupChildren(),S;return c&&(S=l.exports.createElement("p",{className:v.subText,id:a},c)),l.exports.createElement("div",{className:v.content},l.exports.createElement("div",{className:v.header},l.exports.createElement("div",j({id:x,role:"heading","aria-level":1},m,{className:Ko(v.title,m.className)}),g),l.exports.createElement("div",{className:v.topButton},this.props.topButtonsProps.map(function(T,O){return l.exports.createElement(ve,j({key:T.uniqueId||O},T))}),(d===at.close||n&&d!==at.largeHeader)&&l.exports.createElement(ve,{className:v.button,iconProps:{iconName:"Cancel"},ariaLabel:s,onClick:i}))),l.exports.createElement("div",{className:v.inner},l.exports.createElement("div",{className:v.innerContent},S,C.contents),C.footers))},e.prototype._groupChildren=function(){var o={footers:[],contents:[]};return l.exports.Children.map(this.props.children,function(n){typeof n=="object"&&n!==null&&n.type===Id?o.footers.push(n):o.contents.push(n)}),o},e.defaultProps={showCloseButton:!1,className:"",topButtonsProps:[],closeButtonAriaLabel:"Close"},e=Uo([Gs],e),e}(l.exports.Component),Dd={contentLgHeader:"ms-Dialog-lgHeader",close:"ms-Dialog--close",subText:"ms-Dialog-subText",header:"ms-Dialog-header",headerLg:"ms-Dialog--lgHeader",button:"ms-Dialog-button ms-Dialog-button--close",inner:"ms-Dialog-inner",content:"ms-Dialog-content",title:"ms-Dialog-title"},Md=function(t){var e,o,n,r=t.className,s=t.theme,i=t.isLargeHeader,a=t.isClose,c=t.hidden,p=t.isMultiline,m=t.draggableHeaderClassName,x=s.palette,g=s.fonts,d=s.effects,h=s.semanticColors,f=Tt(Dd,s);return{content:[i&&[f.contentLgHeader,{borderTop:"4px solid "+x.themePrimary}],a&&f.close,{flexGrow:1,overflowY:"hidden"},r],subText:[f.subText,g.medium,{margin:"0 0 24px 0",color:h.bodySubtext,lineHeight:"1.5",wordWrap:"break-word",fontWeight:As.regular}],header:[f.header,{position:"relative",width:"100%",boxSizing:"border-box"},a&&f.close,m&&[m,{cursor:"move"}]],button:[f.button,c&&{selectors:{".ms-Icon.ms-Icon--Cancel":{color:h.buttonText,fontSize:tl.medium}}}],inner:[f.inner,{padding:"0 24px 24px",selectors:(e={},e["@media (min-width: "+to+"px) and (max-width: "+no+"px)"]={padding:"0 16px 16px"},e)}],innerContent:[f.content,{position:"relative",width:"100%"}],title:[f.title,g.xLarge,{color:h.bodyText,margin:"0",minHeight:g.xLarge.fontSize,padding:"16px 46px 20px 24px",lineHeight:"normal",selectors:(o={},o["@media (min-width: "+to+"px) and (max-width: "+no+"px)"]={padding:"16px 46px 16px 16px"},o)},i&&{color:h.menuHeader},p&&{fontSize:g.xxLarge.fontSize}],topButton:[{display:"flex",flexDirection:"row",flexWrap:"nowrap",position:"absolute",top:"0",right:"0",padding:"15px 15px 0 0",selectors:(n={"> *":{flex:"0 0 auto"},".ms-Dialog-button":{color:h.buttonText},".ms-Dialog-button:hover":{color:h.buttonTextHovered,borderRadius:d.roundedCorner2}},n["@media (min-width: "+to+"px) and (max-width: "+no+"px)"]={padding:"15px 8px 0 0"},n)}]}},Od=St(jd,Md,void 0,{scope:"DialogContent"}),Nd=_t(),Ed={isDarkOverlay:!1,isBlocking:!1,className:"",containerClassName:"",topOffsetFixed:!1,enableAriaHiddenSiblings:!0},Pd={type:at.normal,className:"",topButtonsProps:[]},Ad=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return n._getSubTextId=function(){var r=n.props,s=r.ariaDescribedById,i=r.modalProps,a=r.dialogContentProps,c=r.subText,p=i&&i.subtitleAriaId||s;return p||(p=(a&&a.subText||c)&&n._defaultSubTextId),p},n._getTitleTextId=function(){var r=n.props,s=r.ariaLabelledById,i=r.modalProps,a=r.dialogContentProps,c=r.title,p=i&&i.titleAriaId||s;return p||(p=(a&&a.title||c)&&n._defaultTitleTextId),p},n._id=ko("Dialog"),n._defaultTitleTextId=n._id+"-title",n._defaultSubTextId=n._id+"-subText",n}return e.prototype.render=function(){var o,n,r,s=this.props,i=s.className,a=s.containerClassName,c=s.contentClassName,p=s.elementToFocusOnDismiss,m=s.firstFocusableSelector,x=s.forceFocusInsideTrap,g=s.styles,d=s.hidden,h=s.disableRestoreFocus,f=h===void 0?s.ignoreExternalFocusing:h,b=s.isBlocking,v=s.isClickableOutsideFocusTrap,C=s.isDarkOverlay,S=s.isOpen,T=S===void 0?!d:S,O=s.onDismiss,$=s.onDismissed,A=s.onLayerDidMount,F=s.responsiveMode,U=s.subText,z=s.theme,ue=s.title,ie=s.topButtonsProps,Z=s.type,de=s.minWidth,me=s.maxWidth,Q=s.modalProps,ge=j({onLayerDidMount:A},Q?.layerProps),w,y;Q?.dragOptions&&!(!((o=Q.dragOptions)===null||o===void 0)&&o.dragHandleSelector)&&(y=j({},Q.dragOptions),w="ms-Dialog-draggable-header",y.dragHandleSelector="."+w);var I=j(j(j(j({},Ed),{elementToFocusOnDismiss:p,firstFocusableSelector:m,forceFocusInsideTrap:x,disableRestoreFocus:f,isClickableOutsideFocusTrap:v,responsiveMode:F,className:i,containerClassName:a,isBlocking:b,isDarkOverlay:C,onDismissed:$}),Q),{dragOptions:y,layerProps:ge,isOpen:T}),P=j(j(j({className:c,subText:U,title:ue,topButtonsProps:ie,type:Z},Pd),s.dialogContentProps),{draggableHeaderClassName:w,titleProps:j({id:((n=s.dialogContentProps)===null||n===void 0?void 0:n.titleId)||this._defaultTitleTextId},(r=s.dialogContentProps)===null||r===void 0?void 0:r.titleProps)}),B=Nd(g,{theme:z,className:I.className,containerClassName:I.containerClassName,hidden:d,dialogDefaultMinWidth:de,dialogDefaultMaxWidth:me});return l.exports.createElement(rr,j({},I,{className:B.root,containerClassName:B.main,onDismiss:O||I.onDismiss,subtitleAriaId:this._getSubTextId(),titleAriaId:this._getTitleTextId()}),l.exports.createElement(Od,j({subTextId:this._defaultSubTextId,showCloseButton:I.isBlocking,onDismiss:O},P),s.children))},e.defaultProps={hidden:!0},e=Uo([Gs],e),e}(l.exports.Component),Fd={root:"ms-Dialog"},Bd=function(t){var e,o=t.className,n=t.containerClassName,r=t.dialogDefaultMinWidth,s=r===void 0?"288px":r,i=t.dialogDefaultMaxWidth,a=i===void 0?"340px":i,c=t.hidden,p=t.theme,m=Tt(Fd,p);return{root:[m.root,p.fonts.medium,o],main:[{width:s,outline:"3px solid transparent",selectors:(e={},e["@media (min-width: "+nl+"px)"]={width:"auto",maxWidth:a,minWidth:s},e)},!c&&{display:"flex"},n]}},Mi=St(Ad,Bd,void 0,{scope:"Dialog"});Mi.displayName="Dialog";var nn;(function(t){t[t.normal=0]="normal",t[t.compact=1]="compact"})(nn||(nn={}));var $d=_t(),Rd=l.exports.createContext({}),Ld=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return n._rootElement=l.exports.createRef(),n._onClick=function(r){n._onAction(r)},n._onKeyDown=function(r){(r.which===Y.enter||r.which===Y.space)&&n._onAction(r)},n._onAction=function(r){var s=n.props,i=s.onClick,a=s.onClickHref,c=s.onClickTarget;i?i(r):!i&&a&&(c?window.open(a,c,"noreferrer noopener nofollow"):window.location.href=a,r.preventDefault(),r.stopPropagation())},Vt(n),n}return e.prototype.render=function(){var o=this.props,n=o.onClick,r=o.onClickHref,s=o.children,i=o.type,a=o.accentColor,c=o.styles,p=o.theme,m=o.className,x=Wn(this.props,Fs,["className","onClick","type","role"]),g=!!(n||r);this._classNames=$d(c,{theme:p,className:m,actionable:g,compact:i===nn.compact});var d;i===nn.compact&&a&&(d={borderBottomColor:a});var h=this.props.role||(g?n?"button":"link":void 0),f=g?0:void 0,b={role:h,tabIndex:f};return l.exports.createElement("div",j({ref:this._rootElement,role:"group",className:this._classNames.root,onKeyDown:g?this._onKeyDown:void 0,onClick:g?this._onClick:void 0,style:d},x),l.exports.createElement(Rd.Provider,{value:b},s))},e.prototype.focus=function(){this._rootElement.current&&this._rootElement.current.focus()},e.defaultProps={type:nn.normal},e}(l.exports.Component),Yr={root:"ms-DocumentCardPreview",icon:"ms-DocumentCardPreview-icon",iconContainer:"ms-DocumentCardPreview-iconContainer"},Hd={root:"ms-DocumentCardActivity",multiplePeople:"ms-DocumentCardActivity--multiplePeople",details:"ms-DocumentCardActivity-details",name:"ms-DocumentCardActivity-name",activity:"ms-DocumentCardActivity-activity",avatars:"ms-DocumentCardActivity-avatars",avatar:"ms-DocumentCardActivity-avatar"},Jr={root:"ms-DocumentCardTitle"},Vd={root:"ms-DocumentCardLocation"},Wd={root:"ms-DocumentCard",rootActionable:"ms-DocumentCard--actionable",rootCompact:"ms-DocumentCard--compact"},Ud=function(t){var e,o,n=t.className,r=t.theme,s=t.actionable,i=t.compact,a=r.palette,c=r.fonts,p=r.effects,m=Tt(Wd,r);return{root:[m.root,{WebkitFontSmoothing:"antialiased",backgroundColor:a.white,border:"1px solid "+a.neutralLight,maxWidth:"320px",minWidth:"206px",userSelect:"none",position:"relative",selectors:(e={":focus":{outline:"0px solid"}},e["."+Bl+" &:focus"]=Go(a.neutralSecondary,p.roundedCorner2),e["."+Vd.root+" + ."+Jr.root]={paddingTop:"4px"},e)},s&&[m.rootActionable,{selectors:{":hover":{cursor:"pointer",borderColor:a.neutralTertiaryAlt},":hover:after":{content:'" "',position:"absolute",top:0,right:0,bottom:0,left:0,border:"1px solid "+a.neutralTertiaryAlt,pointerEvents:"none"}}}],i&&[m.rootCompact,{display:"flex",maxWidth:"480px",height:"108px",selectors:(o={},o["."+Yr.root]={borderRight:"1px solid "+a.neutralLight,borderBottom:0,maxHeight:"106px",maxWidth:"144px"},o["."+Yr.icon]={maxHeight:"32px",maxWidth:"32px"},o["."+Hd.root]={paddingBottom:"12px"},o["."+Jr.root]={paddingBottom:"12px 16px 8px 16px",fontSize:c.mediumPlus.fontSize,lineHeight:"16px"},o)}],n]}},Gd=St(Ld,Ud,void 0,{scope:"DocumentCard"}),Kd=_t(),zd=function(t){Ae(e,t);function e(o){var n=t.call(this,o)||this;return Vt(n),n}return e.prototype.render=function(){var o=this,n=this.props,r=n.actions,s=n.views,i=n.styles,a=n.theme,c=n.className;return this._classNames=Kd(i,{theme:a,className:c}),l.exports.createElement("div",{className:this._classNames.root},r&&r.map(function(p,m){return l.exports.createElement("div",{className:o._classNames.action,key:m},l.exports.createElement(ve,j({},p)))}),s>0&&l.exports.createElement("div",{className:this._classNames.views},l.exports.createElement(Xe,{iconName:"View",className:this._classNames.viewsIcon}),s))},e}(l.exports.Component),vn=34,qd=12,Yd=4,Jd={root:"ms-DocumentCardActions",action:"ms-DocumentCardActions-action",views:"ms-DocumentCardActions-views"},Zd=function(t){var e=t.className,o=t.theme,n=o.palette,r=o.fonts,s=Tt(Jd,o);return{root:[s.root,{height:vn+"px",padding:Yd+"px "+qd+"px",position:"relative"},e],action:[s.action,{float:"left",marginRight:"4px",color:n.neutralSecondary,cursor:"pointer",selectors:{".ms-Button":{fontSize:r.mediumPlus.fontSize,height:vn,width:vn},".ms-Button:hover .ms-Button-icon":{color:o.semanticColors.buttonText,cursor:"pointer"}}}],views:[s.views,{textAlign:"right",lineHeight:vn}],viewsIcon:{marginRight:"8px",fontSize:r.medium.fontSize,verticalAlign:"top"}}},Xd=St(zd,Zd,void 0,{scope:"DocumentCardActions"}),Oi="SearchBox",Qd={root:{height:"auto"},icon:{fontSize:"12px"}},ep={iconName:"Clear"},tp={ariaLabel:"Clear text"},np=_t(),op=function(t,e,o){l.exports.useImperativeHandle(t,function(){return{focus:function(){var n;return(n=e.current)===null||n===void 0?void 0:n.focus()},hasFocus:function(){return o}}},[e,o])},Ni=l.exports.forwardRef(function(t,e){var o=t.ariaLabel,n=t.className,r=t.defaultValue,s=r===void 0?"":r,i=t.disabled,a=t.underlined,c=t.styles,p=t.labelText,m=t.placeholder,x=m===void 0?p:m,g=t.theme,d=t.clearButtonProps,h=d===void 0?tp:d,f=t.disableAnimation,b=f===void 0?!1:f,v=t.showIcon,C=v===void 0?!1:v,S=t.onClear,T=t.onBlur,O=t.onEscape,$=t.onSearch,A=t.onKeyDown,F=t.iconProps,U=t.role,z=t.onChange,ue=t.onChanged,ie=l.exports.useState(!1),Z=ie[0],de=ie[1],me=l.exports.useRef(),Q=$l(t.value,s,function(E,ne){E&&E.timeStamp===me.current||(me.current=E?.timeStamp,z?.(E,ne),ue?.(ne))}),ge=Q[0],w=Q[1],y=String(ge),I=l.exports.useRef(null),P=l.exports.useRef(null),B=Fn(I,e),ee=Us(Oi,t.id),te=h.onClick,ae=np(c,{theme:g,className:n,underlined:a,hasFocus:Z,disabled:i,hasInput:y.length>0,disableAnimation:b,showIcon:C}),he=Wn(t,Ps,["className","placeholder","onFocus","onBlur","value","role"]),ce=l.exports.useCallback(function(E){var ne;S?.(E),E.defaultPrevented||(w(""),(ne=P.current)===null||ne===void 0||ne.focus(),E.stopPropagation(),E.preventDefault())},[S,w]),$e=l.exports.useCallback(function(E){te?.(E),E.defaultPrevented||ce(E)},[te,ce]),M=function(E){var ne;de(!0),(ne=t.onFocus)===null||ne===void 0||ne.call(t,E)},N=function(){P.current&&(P.current.focus(),P.current.selectionStart=P.current.selectionEnd=0)},L=l.exports.useCallback(function(E){de(!1),T?.(E)},[T]),k=function(E){w(E.target.value,E)},xe=function(E){switch(E.which){case Y.escape:O?.(E),y&&!E.defaultPrevented&&ce(E);break;case Y.enter:$&&($(y),E.preventDefault(),E.stopPropagation());break;default:A?.(E),E.defaultPrevented&&E.stopPropagation();break}};return op(t.componentRef,P,Z),l.exports.createElement("div",{role:U,ref:B,className:ae.root,onFocusCapture:M},l.exports.createElement("div",{className:ae.iconContainer,onClick:N,"aria-hidden":!0},l.exports.createElement(Xe,j({iconName:"Search"},F,{className:ae.icon}))),l.exports.createElement("input",j({},he,{id:ee,className:ae.field,placeholder:x,onChange:k,onInput:k,onBlur:L,onKeyDown:xe,value:y,disabled:i,role:"searchbox","aria-label":o,ref:P})),y.length>0&&l.exports.createElement("div",{className:ae.clearButton},l.exports.createElement(ve,j({onBlur:L,styles:Qd,iconProps:ep},h,{onClick:$e}))))});Ni.displayName=Oi;var rp={root:"ms-SearchBox",iconContainer:"ms-SearchBox-iconContainer",icon:"ms-SearchBox-icon",clearButton:"ms-SearchBox-clearButton",field:"ms-SearchBox-field"};function sp(t){var e,o,n,r,s,i=t.theme,a=t.underlined,c=t.disabled,p=t.hasFocus,m=t.className,x=t.hasInput,g=t.disableAnimation,d=t.showIcon,h=i.palette,f=i.fonts,b=i.semanticColors,v=i.effects,C=Tt(rp,i),S={color:b.inputPlaceholderText,opacity:1},T=h.neutralSecondary,O=h.neutralPrimary,$=h.neutralLighter,A=h.neutralLighter,F=h.neutralLighter;return{root:[C.root,f.medium,Or,{color:b.inputText,backgroundColor:b.inputBackground,display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"stretch",padding:"1px 0 1px 4px",borderRadius:v.roundedCorner2,border:"1px solid "+b.inputBorder,height:32,selectors:(e={},e[Ie]={borderColor:"WindowText"},e[":hover"]={borderColor:b.inputBorderHovered,selectors:(o={},o[Ie]={borderColor:"Highlight"},o)},e[":hover ."+C.iconContainer]={color:b.inputIconHovered},e)},!p&&x&&{selectors:(n={},n[":hover ."+C.iconContainer]={width:4},n[":hover ."+C.icon]={opacity:0,pointerEvents:"none"},n)},p&&["is-active",{position:"relative"},Go(b.inputFocusBorderAlt,a?0:v.roundedCorner2,a?"borderBottom":"border")],d&&[{selectors:(r={},r[":hover ."+C.iconContainer]={width:32},r[":hover ."+C.icon]={opacity:1},r)}],c&&["is-disabled",{borderColor:$,backgroundColor:F,pointerEvents:"none",cursor:"default",selectors:(s={},s[Ie]={borderColor:"GrayText"},s)}],a&&["is-underlined",{borderWidth:"0 0 1px 0",borderRadius:0,padding:"1px 0 1px 8px"}],a&&c&&{backgroundColor:"transparent"},x&&"can-clear",m],iconContainer:[C.iconContainer,{display:"flex",flexDirection:"column",justifyContent:"center",flexShrink:0,fontSize:16,width:32,textAlign:"center",color:b.inputIcon,cursor:"text"},p&&{width:4},c&&{color:b.inputIconDisabled},!g&&{transition:"width "+To.durationValue1},d&&p&&{width:32}],icon:[C.icon,{opacity:1},p&&{opacity:0,pointerEvents:"none"},!g&&{transition:"opacity "+To.durationValue1+" 0s"},d&&p&&{opacity:1}],clearButton:[C.clearButton,{display:"flex",flexDirection:"row",alignItems:"stretch",cursor:"pointer",flexBasis:"32px",flexShrink:0,padding:0,margin:"-1px 0px",selectors:{"&:hover .ms-Button":{backgroundColor:A},"&:hover .ms-Button-icon":{color:O},".ms-Button":{borderRadius:ol(i)?"1px 0 0 1px":"0 1px 1px 0"},".ms-Button-icon":{color:T}}}],field:[C.field,Or,On(S),{backgroundColor:"transparent",border:"none",outline:"none",fontWeight:"inherit",fontFamily:"inherit",fontSize:"inherit",color:b.inputText,flex:"1 1 0px",minWidth:"0px",overflow:"hidden",textOverflow:"ellipsis",paddingBottom:.5,selectors:{"::-ms-clear":{display:"none"}}},c&&{color:b.disabledText}]}}var ip=St(Ni,sp,void 0,{scope:"SearchBox"});const xt={root:{width:135}},fe={root:{width:220}},ap={root:{width:220}},lp={root:{width:220,paddingLeft:4,paddingRight:4,textAlign:"left"},label:{fontWeight:"normal"}},Pe=l.exports.memo(function({table:e,filter:o,...n}){const r=ea(e,o);return u.exports.jsx(nt,{label:"Column",placeholder:"Choose column",options:r,styles:fe,...n})}),up=()=>!0,cp=l.exports.memo(function({table:e,filter:o=up,...n}){const r=ea(e,o),s=l.exports.useMemo(()=>[{key:"header",text:"Columns",itemType:Ce.Header},...r],[r]);return u.exports.jsx(or,{allowFreeform:!0,autoComplete:"off",label:"Column or value",placeholder:"text/number or select column",options:s,styles:fe,...n})}),dp=l.exports.memo(function({column:e,table:o,values:n,filter:r,...s}){const i=lx(e,o,n,r);return u.exports.jsx(nt,{label:"Value",placeholder:"Choose value",options:i,styles:fe,...s})}),pp=l.exports.memo(function({columnName:e,...o}){const n=ux(),r=l.exports.useMemo(()=>[{key:"header",text:"Values",itemType:Ce.Header},...n],[n]);return u.exports.jsx(or,{allowFreeform:!0,label:"Date format pattern",placeholder:"Select date format",autoComplete:"off",options:r,styles:fe,dropdownMaxWidth:200,useComboBoxAsMenuWidth:!0,...o})});var pn=function(e){return typeof e.children=="function"?Se.createElement(l.exports.Fragment,null,e.children()):Se.createElement(l.exports.Fragment,null,e.children||null)},X=function(e){return pn(e)};X.defaultProps={children:null};var Ut=function(e){return pn(e)};Ut.defaultProps={children:null};var $t=function(e){return pn(e)},Ei=function(e){return pn(e)},Pi=function(e){var o=Boolean(typeof e=="function"?e():e);return o};function Zr(t,e,o,n,r,s,i){try{var a=t[s](i),c=a.value}catch(p){o(p);return}a.done?e(c):Promise.resolve(c).then(n,r)}function Ai(t){return function(){var e=this,o=arguments;return new Promise(function(n,r){var s=t.apply(e,o);function i(c){Zr(s,n,r,i,a,"next",c)}function a(c){Zr(s,n,r,i,a,"throw",c)}i(void 0)})}}function Bt(){return Bt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},Bt.apply(this,arguments)}function fp(t,e){return e={exports:{}},t(e,e.exports),e.exports}var Vn=fp(function(t){var e=function(o){var n=Object.prototype,r=n.hasOwnProperty,s,i=typeof Symbol=="function"?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",p=i.toStringTag||"@@toStringTag";function m(w,y,I){return Object.defineProperty(w,y,{value:I,enumerable:!0,configurable:!0,writable:!0}),w[y]}try{m({},"")}catch{m=function(y,I,P){return y[I]=P}}function x(w,y,I,P){var B=y&&y.prototype instanceof C?y:C,ee=Object.create(B.prototype),te=new me(P||[]);return ee._invoke=ue(w,I,te),ee}o.wrap=x;function g(w,y,I){try{return{type:"normal",arg:w.call(y,I)}}catch(P){return{type:"throw",arg:P}}}var d="suspendedStart",h="suspendedYield",f="executing",b="completed",v={};function C(){}function S(){}function T(){}var O={};m(O,a,function(){return this});var $=Object.getPrototypeOf,A=$&&$($(Q([])));A&&A!==n&&r.call(A,a)&&(O=A);var F=T.prototype=C.prototype=Object.create(O);S.prototype=T,m(F,"constructor",T),m(T,"constructor",S),S.displayName=m(T,p,"GeneratorFunction");function U(w){["next","throw","return"].forEach(function(y){m(w,y,function(I){return this._invoke(y,I)})})}o.isGeneratorFunction=function(w){var y=typeof w=="function"&&w.constructor;return y?y===S||(y.displayName||y.name)==="GeneratorFunction":!1},o.mark=function(w){return Object.setPrototypeOf?Object.setPrototypeOf(w,T):(w.__proto__=T,m(w,p,"GeneratorFunction")),w.prototype=Object.create(F),w},o.awrap=function(w){return{__await:w}};function z(w,y){function I(ee,te,ae,he){var ce=g(w[ee],w,te);if(ce.type==="throw")he(ce.arg);else{var $e=ce.arg,M=$e.value;return M&&typeof M=="object"&&r.call(M,"__await")?y.resolve(M.__await).then(function(N){I("next",N,ae,he)},function(N){I("throw",N,ae,he)}):y.resolve(M).then(function(N){$e.value=N,ae($e)},function(N){return I("throw",N,ae,he)})}}var P;function B(ee,te){function ae(){return new y(function(he,ce){I(ee,te,he,ce)})}return P=P?P.then(ae,ae):ae()}this._invoke=B}U(z.prototype),m(z.prototype,c,function(){return this}),o.AsyncIterator=z,o.async=function(w,y,I,P,B){B===void 0&&(B=Promise);var ee=new z(x(w,y,I,P),B);return o.isGeneratorFunction(y)?ee:ee.next().then(function(te){return te.done?te.value:ee.next()})};function ue(w,y,I){var P=d;return function(ee,te){if(P===f)throw new Error("Generator is already running");if(P===b){if(ee==="throw")throw te;return ge()}for(I.method=ee,I.arg=te;;){var ae=I.delegate;if(ae){var he=ie(ae,I);if(he){if(he===v)continue;return he}}if(I.method==="next")I.sent=I._sent=I.arg;else if(I.method==="throw"){if(P===d)throw P=b,I.arg;I.dispatchException(I.arg)}else I.method==="return"&&I.abrupt("return",I.arg);P=f;var ce=g(w,y,I);if(ce.type==="normal"){if(P=I.done?b:h,ce.arg===v)continue;return{value:ce.arg,done:I.done}}else ce.type==="throw"&&(P=b,I.method="throw",I.arg=ce.arg)}}}function ie(w,y){var I=w.iterator[y.method];if(I===s){if(y.delegate=null,y.method==="throw"){if(w.iterator.return&&(y.method="return",y.arg=s,ie(w,y),y.method==="throw"))return v;y.method="throw",y.arg=new TypeError("The iterator does not provide a 'throw' method")}return v}var P=g(I,w.iterator,y.arg);if(P.type==="throw")return y.method="throw",y.arg=P.arg,y.delegate=null,v;var B=P.arg;if(!B)return y.method="throw",y.arg=new TypeError("iterator result is not an object"),y.delegate=null,v;if(B.done)y[w.resultName]=B.value,y.next=w.nextLoc,y.method!=="return"&&(y.method="next",y.arg=s);else return B;return y.delegate=null,v}U(F),m(F,p,"Generator"),m(F,a,function(){return this}),m(F,"toString",function(){return"[object Generator]"});function Z(w){var y={tryLoc:w[0]};1 in w&&(y.catchLoc=w[1]),2 in w&&(y.finallyLoc=w[2],y.afterLoc=w[3]),this.tryEntries.push(y)}function de(w){var y=w.completion||{};y.type="normal",delete y.arg,w.completion=y}function me(w){this.tryEntries=[{tryLoc:"root"}],w.forEach(Z,this),this.reset(!0)}o.keys=function(w){var y=[];for(var I in w)y.push(I);return y.reverse(),function P(){for(;y.length;){var B=y.pop();if(B in w)return P.value=B,P.done=!1,P}return P.done=!0,P}};function Q(w){if(w){var y=w[a];if(y)return y.call(w);if(typeof w.next=="function")return w;if(!isNaN(w.length)){var I=-1,P=function B(){for(;++I<w.length;)if(r.call(w,I))return B.value=w[I],B.done=!1,B;return B.value=s,B.done=!0,B};return P.next=P}}return{next:ge}}o.values=Q;function ge(){return{value:s,done:!0}}return me.prototype={constructor:me,reset:function(w){if(this.prev=0,this.next=0,this.sent=this._sent=s,this.done=!1,this.delegate=null,this.method="next",this.arg=s,this.tryEntries.forEach(de),!w)for(var y in this)y.charAt(0)==="t"&&r.call(this,y)&&!isNaN(+y.slice(1))&&(this[y]=s)},stop:function(){this.done=!0;var w=this.tryEntries[0],y=w.completion;if(y.type==="throw")throw y.arg;return this.rval},dispatchException:function(w){if(this.done)throw w;var y=this;function I(he,ce){return ee.type="throw",ee.arg=w,y.next=he,ce&&(y.method="next",y.arg=s),!!ce}for(var P=this.tryEntries.length-1;P>=0;--P){var B=this.tryEntries[P],ee=B.completion;if(B.tryLoc==="root")return I("end");if(B.tryLoc<=this.prev){var te=r.call(B,"catchLoc"),ae=r.call(B,"finallyLoc");if(te&&ae){if(this.prev<B.catchLoc)return I(B.catchLoc,!0);if(this.prev<B.finallyLoc)return I(B.finallyLoc)}else if(te){if(this.prev<B.catchLoc)return I(B.catchLoc,!0)}else if(ae){if(this.prev<B.finallyLoc)return I(B.finallyLoc)}else throw new Error("try statement without catch or finally")}}},abrupt:function(w,y){for(var I=this.tryEntries.length-1;I>=0;--I){var P=this.tryEntries[I];if(P.tryLoc<=this.prev&&r.call(P,"finallyLoc")&&this.prev<P.finallyLoc){var B=P;break}}B&&(w==="break"||w==="continue")&&B.tryLoc<=y&&y<=B.finallyLoc&&(B=null);var ee=B?B.completion:{};return ee.type=w,ee.arg=y,B?(this.method="next",this.next=B.finallyLoc,v):this.complete(ee)},complete:function(w,y){if(w.type==="throw")throw w.arg;return w.type==="break"||w.type==="continue"?this.next=w.arg:w.type==="return"?(this.rval=this.arg=w.arg,this.method="return",this.next="end"):w.type==="normal"&&y&&(this.next=y),v},finish:function(w){for(var y=this.tryEntries.length-1;y>=0;--y){var I=this.tryEntries[y];if(I.finallyLoc===w)return this.complete(I.completion,I.afterLoc),de(I),v}},catch:function(w){for(var y=this.tryEntries.length-1;y>=0;--y){var I=this.tryEntries[y];if(I.tryLoc===w){var P=I.completion;if(P.type==="throw"){var B=P.arg;de(I)}return B}}throw new Error("illegal catch attempt")},delegateYield:function(w,y,I){return this.delegate={iterator:Q(w),resultName:y,nextLoc:I},this.method==="next"&&(this.arg=s),v}},o}(t.exports);try{regeneratorRuntime=e}catch{typeof globalThis=="object"?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}});function Fi(t){return typeof t=="function"}function mp(t){return Reflect.has(t,"then")&&Fi(t.then)}function hp(t){return Reflect.has(t,"catch")&&Fi(t.catch)}function sr(t){return typeof t!="object"||t===null?!1:t instanceof Promise||t!==Promise.prototype&&mp(t)&&hp(t)}var xp=function(e,o){if(!Array.isArray(e)||!Array.isArray(o))throw new Error("shallowArraysEqual only accepts arrays as parameters");if(e.length!==o.length)return!1;for(var n=0;n<e.length;++n)if(e[n]!==o[n])return!1;return!0},gp=function(e){if(!sr(e))throw new Error("Argument of createCancellablePromise should be a Promise");var o={value:!1},n=new Promise(function(){var r=Ai(Vn.mark(function s(i,a){var c;return Vn.wrap(function(m){for(;;)switch(m.prev=m.next){case 0:return m.prev=0,m.next=3,e;case 3:return c=m.sent,m.abrupt("return",!o.value&&i(c));case 7:m.prev=7,m.t0=m.catch(0),!o.value&&a(m.t0);case 10:case"end":return m.stop()}},s,null,[[0,7]])}));return function(s,i){return r.apply(this,arguments)}}());return Object.keys(e).forEach(function(r){n[r]=e[r]}),{promise:n,cancel:function(){o.value=!0}}},bp=function(e,o){o===void 0&&(o=[]);var n=l.exports.useRef(!1),r=l.exports.useRef([]);if(typeof e!="function")throw new Error("Incorrect callback parameter for useSingleton hook; expected a function, but got: '"+typeof e+"'.");if(!Array.isArray(o))throw new Error("Incorrect dependencies parameter for useSingleton; expected an array, but got: '"+typeof o+"'.");var s=Array.isArray(o)&&o.length>0;if(s){var i=!xp(r.current,o);if(i)r.current=o;else if(n.current)return}else if(n.current)return;e(),n.current=!0},lt=function(e){return pn(e)};function vp(t){var e=t.promise,o=t.keepAlive,n=o===void 0?!1:o,r=t.children,s=l.exports.useState(null),i=s[0],a=s[1],c=l.exports.useState(null),p=c[0],m=c[1],x=l.exports.useMemo(function(){return gp(e)},[e]),g=l.exports.useRef([]);if(l.exports.useEffect(function(){return function(){n||x.cancel()}},[x,x.promise,n]),bp(Ai(Vn.mark(function C(){var S;return Vn.wrap(function(O){for(;;)switch(O.prev=O.next){case 0:return a(null),m(null),O.prev=2,O.next=5,x.promise;case 5:S=O.sent,m(S),a(!0),g.current.push(x),O.next=16;break;case 11:O.prev=11,O.t0=O.catch(2),m(O.t0),a(!1),g.current.push(x);case 16:case"end":return O.stop()}},C,null,[[2,11]])})),[x.promise]),!r||!sr(e))return null;if(i===null){var d=Se.Children.toArray(r).find(function(C){return C.type===Ei});return Se.createElement(l.exports.Fragment,null,d||null)}if(!i){var h=Se.Children.toArray(r).find(function(C){return C.type===$t});if(!h)return Se.createElement(l.exports.Fragment,null,null);var f=h;return typeof h.props.children=="function"&&(f=Bt({},h,{props:Bt({},h.props,{children:function(){return h.props.children(p,g.current,x.promise)}})})),Se.createElement(l.exports.Fragment,null,f)}var b=Se.Children.toArray(r).find(function(C){return C.type===lt});if(!b)return Se.createElement(l.exports.Fragment,null,null);var v=b;return typeof b.props.children=="function"&&(v=Bt({},b,{props:Bt({},b.props,{children:function(){return b.props.children(p,g.current,x.promise)}})})),Se.createElement(l.exports.Fragment,null,v)}var on=function(e){var o=e.condition,n=e.keepAlive,r=n===void 0?!1:n,s=e.children;if(!s)return null;if(!Array.isArray(s)&&!(s.type===$t||s.type===lt)||Se.Children.toArray(s).every(function(a){return a.type===$t||a.type===lt||a.type===Ei}),sr(o))return Se.createElement(vp,{promise:o,keepAlive:r},s);var i=Pi(o);return Se.createElement(l.exports.Fragment,null,Se.Children.toArray(s).find(function(a){return a.type!==$t!=!i})||null)},fn=function(e){var o,n,r=e.children,s=void 0,i=void 0;return Se.Children.forEach(r,function(a){if(Se.isValidElement(a))if(!s&&a.type===X){var c=a.props.condition,p=Pi(c);p&&(s=a)}else!i&&a.type===Ut&&(i=a)}),(o=(n=s)!=null?n:i)!=null?o:null};const yp=l.exports.memo(function({columnName:e,props:o,children:n,lazyLoadGroups:r}){const{group:s,onToggleCollapse:i}=o,a=l.exports.useRef(),[c,p]=l.exports.useState(!1),m=px(a.current,"0px"),x=l.exports.useCallback(h=>{let f=0;return h.forEach(b=>{f+=b.count,f+=b.children?x(b.children):0}),f},[]);l.exports.useEffect(()=>{m&&s?.isCollapsed&&i&&i(s)},[m,s,i]);const g=l.exports.useCallback(()=>{p(!0),i&&i(s)},[s,i,p]),d=l.exports.useMemo(()=>r&&s?.level>0&&!c,[s,r,c]);return u.exports.jsxs(Cp,{ref:h=>a.current=d?h:void 0,groupLevel:s?.level,children:[u.exports.jsx(wp,{onClick:g,iconProps:{iconName:s?.isCollapsed?"ChevronRight":"ChevronDown"}}),u.exports.jsxs(on,{condition:!!n,children:[u.exports.jsx(lt,{children:n}),u.exports.jsxs($t,{children:[u.exports.jsx(fo,{children:u.exports.jsxs(_p,{children:[e?`${e}  - `:"",s?.name]})}),u.exports.jsxs(fo,{children:["Children: ",s?.count]}),s?.children&&u.exports.jsxs(fo,{children:["Total Items: ",x(s?.children)]})]})]})]})}),Cp=_.div`
	padding-left: ${({groupLevel:t})=>`${t*12}px`};
	display: flex;
	gap: 8px;
`,wp=_(ve)`
	width: 5%;
`,fo=_.span`
	align-self: center;
`,_p=_.b``;function mn(t,e,o={}){return{id:t,table:e,name:o.name||t}}function tt(t){return typeof t=="function"}function Bi(t){var e=function(n){Error.call(n),n.stack=new Error().stack},o=t(e);return o.prototype=Object.create(Error.prototype),o.prototype.constructor=o,o}var mo=Bi(function(t){return function(o){t(this),this.message=o?o.length+` errors occurred during unsubscription:
`+o.map(function(n,r){return r+1+") "+n.toString()}).join(`
  `):"",this.name="UnsubscriptionError",this.errors=o}});function Ao(t,e){if(t){var o=t.indexOf(e);0<=o&&t.splice(o,1)}}var Jn=function(){function t(e){this.initialTeardown=e,this.closed=!1,this._parentage=null,this._finalizers=null}return t.prototype.unsubscribe=function(){var e,o,n,r,s;if(!this.closed){this.closed=!0;var i=this._parentage;if(i)if(this._parentage=null,Array.isArray(i))try{for(var a=_o(i),c=a.next();!c.done;c=a.next()){var p=c.value;p.remove(this)}}catch(f){e={error:f}}finally{try{c&&!c.done&&(o=a.return)&&o.call(a)}finally{if(e)throw e.error}}else i.remove(this);var m=this.initialTeardown;if(tt(m))try{m()}catch(f){s=f instanceof mo?f.errors:[f]}var x=this._finalizers;if(x){this._finalizers=null;try{for(var g=_o(x),d=g.next();!d.done;d=g.next()){var h=d.value;try{Xr(h)}catch(f){s=s??[],f instanceof mo?s=wt(wt([],An(s)),An(f.errors)):s.push(f)}}}catch(f){n={error:f}}finally{try{d&&!d.done&&(r=g.return)&&r.call(g)}finally{if(n)throw n.error}}}if(s)throw new mo(s)}},t.prototype.add=function(e){var o;if(e&&e!==this)if(this.closed)Xr(e);else{if(e instanceof t){if(e.closed||e._hasParent(this))return;e._addParent(this)}(this._finalizers=(o=this._finalizers)!==null&&o!==void 0?o:[]).push(e)}},t.prototype._hasParent=function(e){var o=this._parentage;return o===e||Array.isArray(o)&&o.includes(e)},t.prototype._addParent=function(e){var o=this._parentage;this._parentage=Array.isArray(o)?(o.push(e),o):o?[o,e]:e},t.prototype._removeParent=function(e){var o=this._parentage;o===e?this._parentage=null:Array.isArray(o)&&Ao(o,e)},t.prototype.remove=function(e){var o=this._finalizers;o&&Ao(o,e),e instanceof t&&e._removeParent(this)},t.EMPTY=function(){var e=new t;return e.closed=!0,e}(),t}(),$i=Jn.EMPTY;function Ri(t){return t instanceof Jn||t&&"closed"in t&&tt(t.remove)&&tt(t.add)&&tt(t.unsubscribe)}function Xr(t){tt(t)?t():t.unsubscribe()}var ir={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1},Fo={setTimeout:function(t,e){for(var o=[],n=2;n<arguments.length;n++)o[n-2]=arguments[n];var r=Fo.delegate;return r?.setTimeout?r.setTimeout.apply(r,wt([t,e],An(o))):setTimeout.apply(void 0,wt([t,e],An(o)))},clearTimeout:function(t){var e=Fo.delegate;return(e?.clearTimeout||clearTimeout)(t)},delegate:void 0};function Sp(t){Fo.setTimeout(function(){throw t})}function Qr(){}var yn=null;function Nn(t){if(ir.useDeprecatedSynchronousErrorHandling){var e=!yn;if(e&&(yn={errorThrown:!1,error:null}),t(),e){var o=yn,n=o.errorThrown,r=o.error;if(yn=null,n)throw r}}else t()}var Li=function(t){Ae(e,t);function e(o){var n=t.call(this)||this;return n.isStopped=!1,o?(n.destination=o,Ri(o)&&o.add(n)):n.destination=jp,n}return e.create=function(o,n,r){return new Bo(o,n,r)},e.prototype.next=function(o){this.isStopped||this._next(o)},e.prototype.error=function(o){this.isStopped||(this.isStopped=!0,this._error(o))},e.prototype.complete=function(){this.isStopped||(this.isStopped=!0,this._complete())},e.prototype.unsubscribe=function(){this.closed||(this.isStopped=!0,t.prototype.unsubscribe.call(this),this.destination=null)},e.prototype._next=function(o){this.destination.next(o)},e.prototype._error=function(o){try{this.destination.error(o)}finally{this.unsubscribe()}},e.prototype._complete=function(){try{this.destination.complete()}finally{this.unsubscribe()}},e}(Jn),kp=Function.prototype.bind;function ho(t,e){return kp.call(t,e)}var Tp=function(){function t(e){this.partialObserver=e}return t.prototype.next=function(e){var o=this.partialObserver;if(o.next)try{o.next(e)}catch(n){Cn(n)}},t.prototype.error=function(e){var o=this.partialObserver;if(o.error)try{o.error(e)}catch(n){Cn(n)}else Cn(e)},t.prototype.complete=function(){var e=this.partialObserver;if(e.complete)try{e.complete()}catch(o){Cn(o)}},t}(),Bo=function(t){Ae(e,t);function e(o,n,r){var s=t.call(this)||this,i;if(tt(o)||!o)i={next:o??void 0,error:n??void 0,complete:r??void 0};else{var a;s&&ir.useDeprecatedNextContext?(a=Object.create(o),a.unsubscribe=function(){return s.unsubscribe()},i={next:o.next&&ho(o.next,a),error:o.error&&ho(o.error,a),complete:o.complete&&ho(o.complete,a)}):i=o}return s.destination=new Tp(i),s}return e}(Li);function Cn(t){Sp(t)}function Ip(t){throw t}var jp={closed:!0,next:Qr,error:Ip,complete:Qr},Dp=function(){return typeof Symbol=="function"&&Symbol.observable||"@@observable"}();function Mp(t){return t}function Op(t){return t.length===0?Mp:t.length===1?t[0]:function(o){return t.reduce(function(n,r){return r(n)},o)}}var es=function(){function t(e){e&&(this._subscribe=e)}return t.prototype.lift=function(e){var o=new t;return o.source=this,o.operator=e,o},t.prototype.subscribe=function(e,o,n){var r=this,s=Ep(e)?e:new Bo(e,o,n);return Nn(function(){var i=r,a=i.operator,c=i.source;s.add(a?a.call(s,c):c?r._subscribe(s):r._trySubscribe(s))}),s},t.prototype._trySubscribe=function(e){try{return this._subscribe(e)}catch(o){e.error(o)}},t.prototype.forEach=function(e,o){var n=this;return o=ts(o),new o(function(r,s){var i=new Bo({next:function(a){try{e(a)}catch(c){s(c),i.unsubscribe()}},error:s,complete:r});n.subscribe(i)})},t.prototype._subscribe=function(e){var o;return(o=this.source)===null||o===void 0?void 0:o.subscribe(e)},t.prototype[Dp]=function(){return this},t.prototype.pipe=function(){for(var e=[],o=0;o<arguments.length;o++)e[o]=arguments[o];return Op(e)(this)},t.prototype.toPromise=function(e){var o=this;return e=ts(e),new e(function(n,r){var s;o.subscribe(function(i){return s=i},function(i){return r(i)},function(){return n(s)})})},t.create=function(e){return new t(e)},t}();function ts(t){var e;return(e=t??ir.Promise)!==null&&e!==void 0?e:Promise}function Np(t){return t&&tt(t.next)&&tt(t.error)&&tt(t.complete)}function Ep(t){return t&&t instanceof Li||Np(t)&&Ri(t)}var Pp=Bi(function(t){return function(){t(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"}}),Hi=function(t){Ae(e,t);function e(){var o=t.call(this)||this;return o.closed=!1,o.currentObservers=null,o.observers=[],o.isStopped=!1,o.hasError=!1,o.thrownError=null,o}return e.prototype.lift=function(o){var n=new ns(this,this);return n.operator=o,n},e.prototype._throwIfClosed=function(){if(this.closed)throw new Pp},e.prototype.next=function(o){var n=this;Nn(function(){var r,s;if(n._throwIfClosed(),!n.isStopped){n.currentObservers||(n.currentObservers=Array.from(n.observers));try{for(var i=_o(n.currentObservers),a=i.next();!a.done;a=i.next()){var c=a.value;c.next(o)}}catch(p){r={error:p}}finally{try{a&&!a.done&&(s=i.return)&&s.call(i)}finally{if(r)throw r.error}}}})},e.prototype.error=function(o){var n=this;Nn(function(){if(n._throwIfClosed(),!n.isStopped){n.hasError=n.isStopped=!0,n.thrownError=o;for(var r=n.observers;r.length;)r.shift().error(o)}})},e.prototype.complete=function(){var o=this;Nn(function(){if(o._throwIfClosed(),!o.isStopped){o.isStopped=!0;for(var n=o.observers;n.length;)n.shift().complete()}})},e.prototype.unsubscribe=function(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null},Object.defineProperty(e.prototype,"observed",{get:function(){var o;return((o=this.observers)===null||o===void 0?void 0:o.length)>0},enumerable:!1,configurable:!0}),e.prototype._trySubscribe=function(o){return this._throwIfClosed(),t.prototype._trySubscribe.call(this,o)},e.prototype._subscribe=function(o){return this._throwIfClosed(),this._checkFinalizedStatuses(o),this._innerSubscribe(o)},e.prototype._innerSubscribe=function(o){var n=this,r=this,s=r.hasError,i=r.isStopped,a=r.observers;return s||i?$i:(this.currentObservers=null,a.push(o),new Jn(function(){n.currentObservers=null,Ao(a,o)}))},e.prototype._checkFinalizedStatuses=function(o){var n=this,r=n.hasError,s=n.thrownError,i=n.isStopped;r?o.error(s):i&&o.complete()},e.prototype.asObservable=function(){var o=new es;return o.source=this,o},e.create=function(o,n){return new ns(o,n)},e}(es),ns=function(t){Ae(e,t);function e(o,n){var r=t.call(this)||this;return r.destination=o,r.source=n,r}return e.prototype.next=function(o){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.next)===null||r===void 0||r.call(n,o)},e.prototype.error=function(o){var n,r;(r=(n=this.destination)===null||n===void 0?void 0:n.error)===null||r===void 0||r.call(n,o)},e.prototype.complete=function(){var o,n;(n=(o=this.destination)===null||o===void 0?void 0:o.complete)===null||n===void 0||n.call(o)},e.prototype._subscribe=function(o){var n,r;return(r=(n=this.source)===null||n===void 0?void 0:n.subscribe(o))!==null&&r!==void 0?r:$i},e}(Hi),$w=function(t){Ae(e,t);function e(o){var n=t.call(this)||this;return n._value=o,n}return Object.defineProperty(e.prototype,"value",{get:function(){return this.getValue()},enumerable:!1,configurable:!0}),e.prototype._subscribe=function(o){var n=t.prototype._subscribe.call(this,o);return!n.closed&&o.next(this._value),n},e.prototype.getValue=function(){var o=this,n=o.hasError,r=o.thrownError,s=o._value;if(n)throw r;return this._throwIfClosed(),s},e.prototype.next=function(o){t.prototype.next.call(this,this._value=o)},e}(Hi);var Rw=new Uint8Array(16);var Ap=[];for(var xo=0;xo<256;++xo)Ap.push((xo+256).toString(16).substr(1));async function Zn({input:t,output:e,args:{others:o}},n,r){const s=n.table(t),i=o.map(c=>n.table(c)),a=Fp(await s,r,await Promise.all(i));return mn(e,a)}function Fp(t,e,o){const n=e===un.Difference?"except":e;return t[n](...o)}var os;(function(t){t.Source="source"})(os||(os={}));function oe(t){return async function({input:o,output:n,args:r},s){const i=await s.get(o);return await t(n,i,r)}}function Bp(t){return async function({output:o,args:n}){const r=await t(n);return mn(o,r)}}function re(t){return(e,o,n)=>{let r;return o.table&&(r=t(o.table,n)),mn(e,r)}}function Vi(t,e){switch(e){case Ye.OR:return $p(t);case Ye.AND:return Rp(t);case Ye.XOR:return Lp(t);case Ye.NOR:return Hp(t);case Ye.NAND:return Vp(t);default:throw new Error(`Unsupported logical operator: [${e}]`)}}function $p(t){return t.some(e=>e===1)?1:0}function Rp(t){return t.every(e=>e===1)?1:0}function Lp(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e>1)return 0;return e===1?1:0}function Hp(t){return t.some(e=>e===1)?0:1}function Vp(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e<0)return 1;return e===t.length?0:1}function ar(t){return t==="false"?!1:!!t}function Wp(t,e,o){if(o===We.IsEmpty||o===Ue.IsEmpty||o===Ke.IsEmpty)return rs(t);if(o===We.IsNotEmpty||o===Ue.IsNotEmpty||o===Ke.IsNotEmpty)return rs(t)===1?0:1;if(typeof t=="number"){const n=+e;return Gp(t,n,o)}else{if(typeof t=="string")return Up(t,`${e}`,o);if(typeof t=="boolean"){const n=ar(e);return Kp(t,n,o)}}return 0}function rs(t){return t==null||typeof t=="number"&&isNaN(t)||typeof t=="string"&&t.length===0?1:0}function Up(t,e,o){const n=t.toLocaleLowerCase(),r=e.toLocaleLowerCase();switch(o){case Ue.Contains:case Ue.RegularExpression:return Ee.match(n,new RegExp(r,"gi"),0)?1:0;case Ue.EndsWith:return Ee.endswith(n,r,n.length)?1:0;case Ue.Equals:return n.localeCompare(r)===0?1:0;case Ue.NotEqual:return n.localeCompare(r)!==0?1:0;case Ue.StartsWith:return Ee.startswith(n,r,0)?1:0;default:throw new Error(`Unsupported string comparison operator: [${o}]`)}}function Gp(t,e,o){switch(o){case We.Equals:return t===e?1:0;case We.NotEqual:return t!==e?1:0;case We.GreaterThanOrEqual:return t>=e?1:0;case We.LessThanOrEqual:return t<=e?1:0;case We.GreaterThan:return t>e?1:0;case We.LessThan:return t<e?1:0;default:throw new Error(`Unsupported numeric comparison operator: [${o}]`)}}function Kp(t,e,o){switch(o){case Ke.Equals:return t===e?1:0;case Ke.NotEqual:return t!==e?1:0;case Ke.IsTrue:return t===!0?1:0;case Ke.IsFalse:return t===!1?1:0;default:throw new Error(`Unsupported boolean comparison operator: [${o}]`)}}function Wi(t,e,o=Ye.OR){return ct(n=>{const r=n[t],s=e.map(i=>{const{value:a,operator:c,type:p}=i,m=p===rn.Column?n[`${a.toString()}`]:a;return Wp(r,m,c)});return Vi(s,o)})}function zp(t,e){return ct(o=>{const n=t.map(r=>ar(o[r])?1:0);return Vi(n,e)})}const qp=new Set([...Object.values(cn),...Object.values(Ks)]);function Xn(t,e){if(!qp.has(e))throw new Error(`Unsupported operation [${e}], too many parameters needed`);return Ee[e](t)}const Yp=re((t,{groupby:e,column:o,operation:n,to:r})=>{const s=Xn(o,n);return t.groupby(e).rollup({[r]:s})}),Jp=oe(Yp),Zp=re((t,e)=>t.derive({[e.to]:Qp(t,e)})),Xp=oe(Zp);function Qp(t,e){const{strategy:o,column:n,fixedwidth:r,fixedcount:s,clamped:i}=e,a=ef(t,n,e.min,e.max),[c,p,m]=a;switch(o){case ze.Auto:return qc(n);case ze.FixedWidth:return Ll(n,c,p,r||1,i,m);case ze.FixedCount:return Rl(n,c,p,s||1,i,m);default:throw new Error(`Unsupported bin strategy ${o}`)}}function ef(t,e,o,n){const r=t.rollup({min:Ee.min(e),max:Ee.max(e),distinct:Ee.distinct(e)});return[o||r.get("min",0),n||r.get("max",0),r.get("distinct",0)]}const tf=re((t,{to:e,column:o,criteria:n,logical:r})=>t.derive({[e]:Wi(o,n,r)})),nf=oe(tf),of=re((t,{columns:e=[],operator:o,to:n})=>t.derive({[n]:zp(e,o)})),rf=oe(of);async function sf(t,e){return Zn(t,e,un.Concat)}const af=re((t,{columns:e,type:o,radix:n,formatPattern:r})=>{const s=e.reduce((i,a)=>(i[a]=uf(a,o,n,r),i),{});return t.derive(s)}),lf=oe(af);function uf(t,e,o,n){const r=vi(n??"%Y-%m-%d"),s=bi(n??"%Y-%m-%d");return ct(i=>{const a=i[t];switch(e){case Je.Boolean:return ar(a);case Je.Date:return a!==null&&!isNaN(a)?new Date(a):n==="%Y-%m-%dT%H:%M:%S.%LZ"?Vc(a):r(a);case Je.Integer:return Ee.parse_int(a,o);case Je.Decimal:return Ee.parse_float(a);case Je.String:return Io(a)===G.String&&a.trim().toLowerCase()==="undefined"?void 0:Io(a)===G.String&&a.trim().toLowerCase()==="null"?null:a instanceof Date?s(a):a!=null?a.toString():a}})}const cf=re((t,{columns:e})=>e?t.dedupe(e):t.dedupe()),df=oe(cf),pf=re((t,{column1:e,column2:o,operator:n,to:r})=>{const s=ct(i=>{const a=i[e],c=i[o];switch(n){case en.Add:return a+c;case en.Subtract:return a-c;case en.Multiply:return a*c;case en.Divide:return a/c;default:throw new Error(`Unsupported operator: [${n}]`)}});return t.derive({[r]:s})}),ff=oe(pf);async function mf(t,e){return Zn(t,e,un.Difference)}const hf=re((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=ct(i=>`${i[s]}`==`${e}`?null:i[s]),r),{});return t.derive(n)}),xf=oe(hf),gf=Bp(bf);async function bf({url:t,delimiter:e,autoMax:o}){return t.toLowerCase().endsWith(".json")?Kc(t,{autoType:!(o===void 0||o<=0)}):Gc(t,{delimiter:e,autoMax:o!==void 0?o:0,autoType:!(o===void 0||o<=0)})}const vf=re((t,{value:e,to:o})=>{const n=(r,s)=>s.value;return t.params({value:e}).derive({[o]:n})}),yf=oe(vf),Cf=re((t,{column:e,criteria:o,logical:n})=>t.filter(Wi(e,o,n))),wf=oe(Cf),_f=re((t,{columns:e,to:o})=>t.fold(e,{as:o})),Sf=oe(_f),kf=re((t,{columns:e})=>t.groupby(e)),Tf=oe(kf),If=re((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=(i,a)=>a.value,r),{});return t.params({value:e}).impute(n)}),jf=oe(If);async function Df(t,e){return Zn(t,e,un.Intersect)}async function Mf({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return mn(e,Of(r,s,o))}var ss;(function(t){t.Left="left",t.Right="right"})(ss||(ss={}));function Of(t,e,{on:o,strategy:n=it.Inner}){return t.join(e,o,void 0,{left:n===it.LeftOuter||n===it.FullOuter,right:n===it.RightOuter||n===it.FullOuter})}async function Nf({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return mn(e,Ef(r,s,o))}var is;(function(t){t.Input="Input",t.Other="Other"})(is||(is={}));function Ef(t,e,{on:o=[],columns:n}){return t.lookup(e,o,...n)}const Pf=re((t,{columns:e=[],strategy:o,to:n,delimiter:r=""})=>{const s=Ff(t,e),i=ct(a=>{switch(o){case Ft.LastOneWins:return $f(s,a,e);case Ft.Concat:return Rf(a,e,r);case Ft.CreateArray:return Ui(a,e);case Ft.FirstOneWins:default:return Bf(s,a,e)}});return t.derive({[n]:i})}),Af=oe(Pf);function Ff(t,e){let o=!0;const n=jo(t,e[0]);let r=1;for(;o===!0&&r<e.length;){const s=jo(t,e[r]);o=n===s,r++}return o}function Bf(t,e,o){let n=e[o[0]],r=!1,s=0;for(;!r&&s<o.length;)e[o[s]]!==void 0&&e[o[s]]!==null&&(n=e[o[s]],r=!0),s++;return t?n:""+n}function $f(t,e,o){let n=e[o[0]];for(let r=0;r<o.length;r++)e[o[r]]!==void 0&&e[o[r]]!==null&&(n=e[o[r]]);return t?n:""+n}function Ui(t,e){const o=[];for(let n=0;n<e.length;n++)t[e[n]]!==void 0&&t[e[n]]!==null&&o.push(t[e[n]]);return o}function Rf(t,e,o){return Ui(t,e).join(o)}const Lf=re((t,{column:e,prefix:o})=>{const r=t.rollup({distinct:Ee.array_agg_distinct(e)}).get("distinct",0).reduce((s,i)=>(s[o?`${o}${i}`:i]=ct(a=>a[e]===null?null:a[e]===i?1:0),s),{});return t.derive(r)}),Hf=oe(Lf),Vf=re((t,{orders:e})=>t.orderby(...e.map(Uf))),Wf=oe(Vf);function Uf({column:t,direction:e}){return e===je.Descending?zs(t):t}const Gf=re((t,{key:e,value:o,operation:n})=>t.pivot(e,{[o]:Xn(o,n)})),Kf=oe(Gf),zf=re((t,{column:e,to:o,map:n})=>t.derive({[o]:ct(r=>Ee.recode(r[e],n))})),qf=oe(zf),Yf=re((t,{columns:e})=>t.rename(e)),Jf=oe(Yf),Zf=re((t,{column:e,operation:o,to:n})=>t.rollup({[n]:Xn(e,o)})),Xf=oe(Zf),Qf=re((t,{size:e,proportion:o})=>{const n=Math.round(t.numRows()*(o||1)),r=e||n;return t.sample(r)}),em=oe(Qf),tm=re((t,{columns:e=[]})=>{const o=[e];return o.length===0&&o.push(Hl()),t.select(...o)}),nm=oe(tm),om=re((t,{to:e,column:o})=>t.spread(o,{as:e})),rm=oe(om),sm=re((t,{key:e,value:o})=>{const n=t.columnNames(p=>p!==e&&p!==o),r=t.select(n).objects(),s=[...new Set(t.array(e))],i=t.objects(),a=[],c=r.length!==0?r.length/s.length:s.length;for(let p=0;p<c;p++){let m={};r.length!==0&&(m={...r[p*s.length]});let x=p*s.length;s.forEach(g=>{const d=i[x];m[g]=d!==void 0?d[o]:null,x++}),a.push(m)}return $s(a)}),im=oe(sm),am=re(t=>t.ungroup()),lm=oe(am);async function um(t,e){return Zn(t,e,un.Union)}const cm=re(t=>t.unorder()),dm=oe(cm),pm=re((t,{columns:e})=>t.unroll(e)),fm=oe(pm),mm=re((t,{column:e,operation:o,to:n})=>t.derive({[n]:Xn(e,o)})),hm=oe(mm),xm={aggregate:Jp,bin:Xp,binarize:nf,boolean:rf,chain:lr,concat:sf,convert:lf,dedupe:df,derive:ff,difference:mf,erase:xf,fetch:gf,fill:yf,filter:wf,fold:Sf,groupby:Tf,impute:jf,intersect:Df,join:Mf,lookup:Nf,merge:Af,onehot:Hf,orderby:Wf,pivot:Kf,recode:qf,rename:Jf,rollup:Xf,sample:em,select:nm,spread:rm,unfold:im,ungroup:lm,union:um,unorder:dm,unroll:fm,window:hm};async function lr(t,e){const{args:{steps:o,nofork:n}}=t,r=n?e:await e.clone();let s={id:t.output,table:Vl({})};for(let a=0;a<o.length;a++){const c=o[a],{verb:p}=c;try{s=await(xm[p]||lr)(c,r),r.set(s)}catch(m){throw console.error(`Pipeline failed on step ${a}`,c),m}}const i={...s,id:t.output};return e.set(i),i}async function gm(t,e){return lr(t,e)}async function bm(t,e){if(t.length===0)throw new Error("no steps in chain");return gm({verb:V.Chain,input:t[0].input,output:t[t.length-1].output,args:{steps:t,nofork:!0}},e)}function vm(t,e){for(var o=-1,n=t==null?0:t.length;++o<n&&e(t[o],o,t)!==!1;);return t}function ym(t,e){return t&&Kn(e,Qs(e),t)}function Cm(t,e){return t&&Kn(e,zo(e),t)}function wm(t,e){return Kn(t,ei(t),e)}var _m=Object.getOwnPropertySymbols,Sm=_m?function(t){for(var e=[];t;)ti(e,ei(t)),t=Wl(t);return e}:iu;const Gi=Sm;function km(t,e){return Kn(t,Gi(t),e)}function Tm(t){return au(t,zo,Gi)}var Im=Object.prototype,jm=Im.hasOwnProperty;function Dm(t){var e=t.length,o=new t.constructor(e);return e&&typeof t[0]=="string"&&jm.call(t,"index")&&(o.index=t.index,o.input=t.input),o}function Mm(t,e){var o=e?qs(t.buffer):t.buffer;return new t.constructor(o,t.byteOffset,t.byteLength)}var Om=/\w*$/;function Nm(t){var e=new t.constructor(t.source,Om.exec(t));return e.lastIndex=t.lastIndex,e}var as=Bn?Bn.prototype:void 0,ls=as?as.valueOf:void 0;function Em(t){return ls?Object(ls.call(t)):{}}var Pm="[object Boolean]",Am="[object Date]",Fm="[object Map]",Bm="[object Number]",$m="[object RegExp]",Rm="[object Set]",Lm="[object String]",Hm="[object Symbol]",Vm="[object ArrayBuffer]",Wm="[object DataView]",Um="[object Float32Array]",Gm="[object Float64Array]",Km="[object Int8Array]",zm="[object Int16Array]",qm="[object Int32Array]",Ym="[object Uint8Array]",Jm="[object Uint8ClampedArray]",Zm="[object Uint16Array]",Xm="[object Uint32Array]";function Qm(t,e,o){var n=t.constructor;switch(e){case Vm:return qs(t);case Pm:case Am:return new n(+t);case Wm:return Mm(t,o);case Um:case Gm:case Km:case zm:case qm:case Ym:case Jm:case Zm:case Xm:return Ul(t,o);case Fm:return new n;case Bm:case Lm:return new n(t);case $m:return Nm(t);case Rm:return new n;case Hm:return Em(t)}}var eh="[object Map]";function th(t){return Ys(t)&&Zo(t)==eh}var us=$n&&$n.isMap,nh=us?zn(us):th;const oh=nh;var rh="[object Set]";function sh(t){return Ys(t)&&Zo(t)==rh}var cs=$n&&$n.isSet,ih=cs?zn(cs):sh;const ah=ih;var lh=1,uh=2,ch=4,Ki="[object Arguments]",dh="[object Array]",ph="[object Boolean]",fh="[object Date]",mh="[object Error]",zi="[object Function]",hh="[object GeneratorFunction]",xh="[object Map]",gh="[object Number]",qi="[object Object]",bh="[object RegExp]",vh="[object Set]",yh="[object String]",Ch="[object Symbol]",wh="[object WeakMap]",_h="[object ArrayBuffer]",Sh="[object DataView]",kh="[object Float32Array]",Th="[object Float64Array]",Ih="[object Int8Array]",jh="[object Int16Array]",Dh="[object Int32Array]",Mh="[object Uint8Array]",Oh="[object Uint8ClampedArray]",Nh="[object Uint16Array]",Eh="[object Uint32Array]",le={};le[Ki]=le[dh]=le[_h]=le[Sh]=le[ph]=le[fh]=le[kh]=le[Th]=le[Ih]=le[jh]=le[Dh]=le[xh]=le[gh]=le[qi]=le[bh]=le[vh]=le[yh]=le[Ch]=le[Mh]=le[Oh]=le[Nh]=le[Eh]=!0;le[mh]=le[zi]=le[wh]=!1;function En(t,e,o,n,r,s){var i,a=e&lh,c=e&uh,p=e&ch;if(o&&(i=r?o(t,n,r,s):o(t)),i!==void 0)return i;if(!Gl(t))return t;var m=It(t);if(m){if(i=Dm(t),!a)return Kl(t,i)}else{var x=Zo(t),g=x==zi||x==hh;if(zl(t))return ql(t,a);if(x==qi||x==Ki||g&&!r){if(i=c||g?{}:Yl(t),!a)return c?km(t,Cm(i,t)):wm(t,ym(i,t))}else{if(!le[x])return r?t:{};i=Qm(t,x,a)}}s||(s=new Jl);var d=s.get(t);if(d)return d;s.set(t,i),ah(t)?t.forEach(function(b){i.add(En(b,e,o,b,t,s))}):oh(t)&&t.forEach(function(b,v){i.set(v,En(b,e,o,v,t,s))});var h=p?c?Tm:lu:c?zo:Qs,f=m?void 0:h(t);return vm(f||t,function(b,v){f&&(v=b,b=t[v]),Zl(i,v,En(b,e,o,v,t,s))}),i}var Ph=1,Ah=4;function Gt(t){return En(t,Ph|Ah)}class ur{async get(e){const o=this._storage.get(e);if(!o)throw new Error(`No table with id '${e}' found in store.`);const{container:n}=o;if(!o.resolved){const{resolver:r}=o;if(!r)throw new Error(`No resolver function for unloaded table '${e}'.`);const s=await r(e);n.table=s,this.set(n)}return n}async table(e){return(await this.get(e)).table}set(e){const o={container:e,resolved:!0};return this._storage.set(e.id,o),this.onChange(e.id),this}delete(e){return this._storage.delete(e),this.onChange(),this}queue(e,o){const n={container:{id:e},resolved:!1,resolver:o};return this._storage.set(e,n),this}list(e){return Array.from(this._storage.keys()).filter(e||(()=>!0))}async toMap(){const e=new Map;for(const o of this._storage.keys()){const n=await this.get(o);e.set(o,n)}return e}async toArray(){const e=await this.toMap();return Array.from(e.values())}listen(e,o){return this._tableListeners[e]=o,()=>delete this._tableListeners[e]}unlisten(e){delete this._tableListeners[e]}addChangeListener(e){return this._changeListeners.push(e),()=>{const o=this._changeListeners.findIndex(n=>n===e);o>=0&&(this._changeListeners=this._changeListeners.splice(o,1))}}onChange(e){(async()=>{if(e){const n=await this.get(e),r=this._tableListeners[e];r&&r(n)}this._changeListeners.forEach(n=>n())})()}async print(){const e=this.list();for(let o=0;o<e.length;o++)console.log(`--- ${e[o]} ---`),(await this.get(e[o])).table?.print()}async clone(){const e=await this.toArray();return new ur(Gt(e))}clear(){return Array.from(this._storage.keys()).forEach(o=>this.delete(o)),this}constructor(e){this._storage=new Map,e&&e.forEach(o=>{this._storage.set(o.id,{container:o,resolved:!0})}),this._changeListeners=[],this._tableListeners={}}}function Fh(t){return new ur(t)}function Bh(t){return new $h(t)}function cr(t,e,o){const n={verb:t,input:e,output:o};switch(t){case V.Chain:return{...n,args:{steps:[]}};case V.Bin:return{...n,args:{to:"output",strategy:ze.Auto,fixedcount:10}};case V.Aggregate:case V.Boolean:case V.Derive:case V.Fill:case V.Merge:case V.Rollup:case V.Window:return{...n,args:{to:"output"}};case V.Concat:case V.Difference:case V.Intersect:case V.Union:return{...n,args:{others:[]}};case V.Fold:return{...n,args:{to:["key","value"],columns:[]}};case V.Convert:case V.Erase:case V.Impute:case V.Lookup:case V.Groupby:case V.Dedupe:case V.Select:case V.Unroll:return{...n,args:{columns:[]}};case V.Spread:return{...n,args:{to:[]}};case V.Pivot:return{...n,args:{operation:cn.Any}};case V.Join:return{...n,args:{strategy:it.Inner}};case V.Binarize:return{...n,args:{to:"output",criteria:[],logical:Ye.OR}};case V.Filter:return{...n,args:{criteria:[],logical:Ye.OR}};case V.Fetch:case V.OneHot:case V.Orderby:case V.Rename:case V.Sample:case V.Ungroup:case V.Unorder:case V.Unfold:}return{...n,args:{}}}class $h{get store(){return this._store}get steps(){return[...this._steps]}get last(){return this._steps[this._steps.length-1]}get count(){return this._steps.length}get outputs(){return this._steps.map(e=>e.output)}create(e){const o=this.count,n=o===0?"":this._steps[o-1].output,r=cr(e,n,`output-table-${o}`);return this.add(r)}add(e){return this._steps.push(e),this.steps}addAll(e){return e.forEach(o=>this._steps.push(o)),this.steps}clear(){this._steps.forEach(e=>this._store.delete(e.output)),this._steps=[]}delete(e){const o=this.steps.slice(0,e);return this.clear(),this.addAll(o),this.steps}update(e,o){return this._steps[o]=e,this.steps}async run(){return bm(this._steps,this._store)}print(){console.log(this._steps)}constructor(e){this._store=e,this._steps=[]}}var Rh=200;function Lh(t,e,o,n){var r=-1,s=oi,i=!0,a=t.length,c=[],p=e.length;if(!a)return c;o&&(e=qo(e,zn(o))),n?(s=ri,i=!1):e.length>=Rh&&(s=Mo,i=!1,e=new ni(e));e:for(;++r<a;){var m=t[r],x=o==null?m:o(m);if(m=n||m!==0?m:0,i&&x===x){for(var g=p;g--;)if(e[g]===x)continue e;c.push(m)}else s(e,x,n)||c.push(m)}return c}var ds=Bn?Bn.isConcatSpreadable:void 0;function Hh(t){return It(t)||Xl(t)||!!(ds&&t&&t[ds])}function Yi(t,e,o,n,r){var s=-1,i=t.length;for(o||(o=Hh),r||(r=[]);++s<i;){var a=t[s];e>0&&o(a)?e>1?Yi(a,e-1,o,n,r):ti(r,a):n||(r[r.length]=a)}return r}var Vh=Js(function(t,e){return Do(t)?Lh(t,Yi(e,1,Do,!0)):[]});const Wh=Vh;var Uh=Math.min;function Gh(t,e,o){for(var n=o?ri:oi,r=t[0].length,s=t.length,i=s,a=Array(s),c=1/0,p=[];i--;){var m=t[i];i&&e&&(m=qo(m,zn(e))),c=Uh(m.length,c),a[i]=!o&&(e||r>=120&&m.length>=120)?new ni(i&&m):void 0}m=t[0];var x=-1,g=a[0];e:for(;++x<r&&p.length<c;){var d=m[x],h=e?e(d):d;if(d=o||d!==0?d:0,!(g?Mo(g,h):n(p,h,o))){for(i=s;--i;){var f=a[i];if(!(f?Mo(f,h):n(t[i],h,o)))continue e}g&&g.push(h),p.push(d)}}return p}function Kh(t){return Do(t)?t:[]}var zh=Js(function(t){var e=qo(t,Kh);return e.length&&e[0]===t[0]?Gh(e):[]});const qh=zh;var D;(function(t){t[t.InputTable=0]="InputTable",t[t.InputColumn=1]="InputColumn",t[t.OutputColumn=2]="OutputColumn",t[t.RowModifying=3]="RowModifying",t[t.NumericOnly=4]="NumericOnly"})(D||(D={}));const ps={aggregate:[D.InputTable,D.InputColumn,D.OutputColumn,D.RowModifying],bin:[D.InputTable,D.InputColumn,D.OutputColumn,D.NumericOnly],binarize:[D.InputTable,D.InputColumn,D.OutputColumn],boolean:[D.InputTable,D.OutputColumn],chain:[],concat:[D.InputTable,D.RowModifying],convert:[D.InputTable],dedupe:[D.InputTable,D.RowModifying],derive:[D.InputTable,D.OutputColumn],difference:[D.InputTable,D.RowModifying],erase:[D.InputTable,D.RowModifying],fetch:[],fill:[D.InputTable,D.OutputColumn],filter:[D.InputTable,D.InputColumn,D.RowModifying],fold:[D.InputTable,D.RowModifying],groupby:[D.InputTable],impute:[D.InputTable],intersect:[D.InputTable,D.RowModifying],join:[D.InputTable,D.RowModifying],lookup:[D.InputTable,D.RowModifying],merge:[D.InputTable,D.OutputColumn],pivot:[D.InputTable,D.RowModifying],onehot:[D.InputTable,D.InputColumn],orderby:[D.InputTable],recode:[D.InputTable,D.InputColumn,D.OutputColumn],rename:[D.InputTable],rollup:[D.InputTable,D.InputColumn,D.OutputColumn,D.RowModifying],sample:[D.InputTable,D.RowModifying],select:[D.InputTable],spread:[D.InputTable],unfold:[D.InputTable,D.RowModifying],ungroup:[D.InputTable],union:[D.InputTable,D.RowModifying],unorder:[D.InputTable],unroll:[D.InputTable,D.RowModifying],window:[D.InputTable,D.InputColumn,D.OutputColumn]},Yh=hn(D.InputTable),Ji=hn(D.InputColumn),Zi=hn(D.OutputColumn),Jh=hn(D.RowModifying),Zh=hn(D.NumericOnly);function hn(t){return Object.keys(ps).filter(e=>ps[e].findIndex(o=>o===t)>=0)}function Xh(t){return Qn(t,Yh)}function Qh(t){return Qn(t,Ji)}function Xi(t){return Qn(t,Zi)}function ex(t){return Qn(t,Zh)}function Qn(t,e){return e.findIndex(o=>o===t.verb)>=0}function tx(t=()=>!0){const e=qh(Ji,Zi);return Wh(e,Jh).filter(t)}const nx=l.exports.memo(function({table:e,order:o,onChange:n,onDelete:r}){const{column:s,direction:i}=o,a=i===je.Ascending,c=a?"Ascending":"Descending",p=l.exports.useCallback((g,d)=>{const h={...o,column:d.key};n&&n(h)},[o,n]),m=l.exports.useCallback(()=>{const g={...o,direction:o.direction===je.Descending?je.Ascending:je.Descending};n&&n(g)},[o,n]),x=l.exports.useCallback(()=>r&&r(),[r]);return u.exports.jsxs(ox,{children:[u.exports.jsx(Pe,{table:e,label:void 0,selectedKey:s,onChange:p}),u.exports.jsx(ve,{toggle:!0,checked:a,title:c,iconProps:{iconName:c},onClick:m}),u.exports.jsx(ve,{title:"Remove this sort",iconProps:{iconName:"Delete"},onClick:x})]})}),ox=_.div`
	display: flex;
	justify-content: flex-start;
`,dr=l.exports.memo(function({store:e,...o}){const n=ax(e);return u.exports.jsx(nt,{label:"Table",placeholder:"Choose table",options:n,styles:fe,...o})});function rx(t,e,o,n,r){const s=e.names[o];return r&&r!==s?t:n===je.Ascending?t.sort((i,a)=>i[0]-a[0]):t.sort((i,a)=>a[0]-i[0])}function Qi(t,e,o,n,r,s,i=!0,a,c=0){const p=t[0],m=t[1],x=e.names[o];if(!x)throw new Error(`could not determine column name for level ${o}`);const g=r.slice(c).findIndex(f=>f[x]===p)+c,d={key:p.toString(),name:p.toString(),startIndex:g,level:o,count:m.length,isCollapsed:i?o!==0&&g!==0:!1},h=o+1;if(h<n){const f=rx(m,e,h,s,a).map(b=>Qi(b,e,h,n,r,s,i,a,g));d.children=f}return d}const sx=t=>t,ix=t=>t&&+t;function pr(t){return l.exports.useMemo(()=>t.map(e=>({key:e,text:e.toString()})),[t])}function ax(t){const[e,o]=l.exports.useState(!0),[n,r]=l.exports.useState([]);return l.exports.useEffect(()=>{t?.addChangeListener(()=>o(!0))},[t,o]),l.exports.useEffect(()=>{e&&(o(!1),r(t?.list().sort()||[]))},[t,e,o,r]),pr(n)}function ea(t,e){return pr(t?.columnNames(e)||[])}function lx(t,e,o,n){const r=l.exports.useMemo(()=>{if(!e||!t||t.trim().length===0)return[];const i=o||(()=>e.columnNames().filter(c=>c===t).length!==0?e.rollup({[t]:Ee.array_agg_distinct(t)}).get(t,0)??[]:[])();return n?i.filter(n):i},[t,e,o,n]);return pr(r)}function ux(){return[{key:"%Y-%m-%d",text:"%Y-%m-%d"},{key:"%Y/%m/%d",text:"%Y/%m/%d"},{key:"%B %d, %Y",text:"%B %d, %Y"},{key:"%m-%d-%Y",text:"%m-%d-%Y"},{key:"%m/%d/%Y",text:"%m/%d/%Y"},{key:"%d-%m-%Y",text:"%d-%m-%Y"},{key:"%d/%m/%Y",text:"%d/%m/%Y"},{key:"%Y-%m-%dT%H:%M:%S.%LZ",text:"ISO 8601 (%Y-%m-%dT%H:%M:%S.%LZ)"}]}function be(t,e,o){return l.exports.useCallback((n,r)=>{const s=Gt(t);dt(s,e,r?.key),o&&o(s)},[t,e,o])}function Fe(t,e,o,n=sx){return l.exports.useCallback((r,s)=>{const i=Gt(t),a=n(s);dt(i,e,a),o&&o(i)},[t,e,o,n])}function vt(t,e,o,n=ix){return l.exports.useCallback((r,s)=>{const i=Gt(t),a=n(s);typeof a=="number"&&(dt(i,e,a),o&&o(i))},[t,e,o,n])}function cx(t,e,o){return l.exports.useCallback((n,r)=>{const s=Gt(t);dt(s,e,r),o&&o(s)},[t,e,o])}function dx(t,e){return l.exports.useCallback(o=>{const n=t,r={...n.args};delete r.columns[o],e&&e({...t,args:{...n.args,...r}})},[t,e])}function we(t,e,o){const[n,r]=l.exports.useState(),s=l.exports.useCallback(i=>r(i.table),[r]);return l.exports.useEffect(()=>(e?r(e):t&&o&&(async(a,c)=>{try{c.listen(a,s);const p=await c.get(a);r(p.table)}catch{}})(t,o),()=>{t&&o&&o.unlisten(t)}),[t,e,o,s]),n}function px(t,e){const[o,n]=l.exports.useState(!1);return l.exports.useEffect(()=>{const r=new IntersectionObserver(([s])=>{n(s?.isIntersecting??!1)},{rootMargin:e});return t&&r.observe(t),()=>t&&r.unobserve(t)},[t,e]),o}function fx(t,e){return l.exports.useMemo(()=>!t||!e?G.Unknown:jo(t,e),[t,e])}function mx(){return l.exports.useMemo(()=>Fh(),[])}function hx(t,e){return l.exports.useMemo(()=>{const o=Bh(t);return e&&o.addAll(e),o},[t,e])}function xx(t){const[e,o]=l.exports.useState(),[n,{toggle:r}]=ln(!1),s=l.exports.useCallback(a=>{o(a),r()},[r,o]),i=l.exports.useCallback(()=>{t&&t(e),r()},[r,e,t]);return{isDeleteModalOpen:n,onConfirmDelete:i,toggleDeleteModalOpen:r,onDeleteClicked:s}}function ta(t){const e=l.exports.useCallback(o=>t?t.list().includes(o):!1,[t]);return l.exports.useCallback(o=>{const n=o.replace(/( \(\d+\))/,"");let r=n,s=1;for(;e(r);)r=`${n} (${s})`,s++;return r},[e])}function gx(){const t=l.exports.useCallback((e,o)=>o.includes(e),[]);return l.exports.useCallback((e,o)=>{const n=e.replace(/( \(\d+\))/,"");let r=n,s=1;for(;t(r,o);)r=`${n} (${s})`,s++;return r},[t])}function bx(){return l.exports.useCallback((t,e="New column")=>{const o=t;return Object.keys(o).forEach(n=>{n==="to"&&!It(o[n])&&(o[n]=e)}),o},[])}function na(){const t=gx();return l.exports.useCallback((e,o)=>{let n=e.args;return Object.keys(n).forEach(r=>{if(r==="to"&&!It(n[r])){const s=t(n[r],o);n={...n,[r]:s}}}),n},[t])}_.div`
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
`,K=_.div`
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
`,vx=_.div`
	font-size: 0.85em;
	color: ${({theme:t})=>t.application().midHighContrast().hex()};
`;function yx(t,e){return l.exports.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function Mt(t,e=!0){return l.exports.useMemo(()=>({width:t?.currentWidth||0,height:t?.data?.compact&&e?15:20}),[t,e])}function Cx(t,e){return l.exports.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function wx(t,e,o=!1,n){return l.exports.useMemo(()=>{const r=!e||o?t.columnNames():e.map(s=>s.name);if(n&&n.length>0){const s=n.reduce((i,a)=>(i[a]=!0,i),{});return r.filter(i=>s[i])}return r},[t,e,o,n])}function Me(t,e){return e?.fieldName&&t[e.fieldName]}function _x(t,e,o){const n=Me(t,o),r=cu(n,pu);return du(r).map((i,a)=>({key:`${a}-${i}`,text:i,data:{rowIndex:e,column:o},title:i}))}function oa(t){if(It(t))return t.reduce((e,o)=>{const n=e[o]||0;return e[o]=n+1,e},{})}function Sx(t){return Object.values(t).every(e=>e===1)}function fr(t){return!!(dn(t)||Ql(t)||(uu(t)||It(t))&&t.length===0)}function kx(t,e=500){const o=setTimeout(()=>t(),e);return()=>clearTimeout(o)}const Tx=5,Ix=20,$o=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Me(e,o)||[],s=jx(r),i=Dx(r);return u.exports.jsx("div",{title:i,style:{textAlign:n},children:s})});function jx(t,e=Tx){return l.exports.useMemo(()=>{const o=`[${t.slice(0,e).join(", ")}]`;return t.length>e?`${o}...`:o},[t,e])}function Dx(t,e=Ix){return l.exports.useMemo(()=>{let o=t.slice(0,e).join(`
`);return t.length>e&&(o+=`
...
(+${t.length-e} more)`),o},[t,e])}const ra=l.exports.memo(function({item:e,column:o}){const n=Mt(o),r=Mx(n,e,o);return u.exports.jsx("svg",{width:n.width,height:n.height,children:u.exports.jsx("circle",{...r})})});function Mx(t,e,o){const n=De();return l.exports.useMemo(()=>{const r=!!Me(e,o),{width:s,height:i}=t;return{cx:s/2,cy:i/2,r:i/4,fill:r?n.process().fill().hex():"none",stroke:n.process().stroke().hex()}},[n,t,e,o])}const Ox=l.exports.memo(function({item:e,column:o,textAlign:n="right"}){const r=!!Me(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})});function sa(t,e){const o=l.exports.useMemo(()=>Zs().domain([0,t.length-1]).range(e).clamp(!0),[t,e]);return l.exports.useMemo(()=>(n,r)=>o(r),[o])}function ia(t,e){const o=l.exports.useMemo(()=>[Math.min(...t),Math.max(...t)],[t]),n=l.exports.useMemo(()=>Zs().domain(o).range(e),[o,e]);return l.exports.useMemo(()=>o[0]===o[1]?()=>e[1]:r=>n(r),[n,o,e])}function aa(t,e,o){const n=De();l.exports.useLayoutEffect(()=>{si(t.current).call(fu,n,{width:e<0?0:e,height:o<0?0:o})},[n,t,e,o])}function la(t,e,o){const n=De(),[r,s]=l.exports.useState();return l.exports.useLayoutEffect(()=>{const i=si(t.current).append("g").call(mu,n).append("g");s(i)},[n,t,e,o]),r}const mr=l.exports.memo(function({data:e,width:o,height:n,categorical:r=!1,color:s,legend:i,onBarHover:a}){const c=De(),p=l.exports.useRef(null),m=l.exports.useMemo(()=>r?It(s)?s:c.scales().nominal(e.length).toArray():s||c.line().stroke().hex(),[c,e,s,r]),x=l.exports.useMemo(()=>Math.floor((o-4)/e.length),[e,o]),g=sa(e,[x/2,o-x/2]),d=ia(e,[n-1,0]);aa(p,o,n);const h=la(p,o,n);return l.exports.useLayoutEffect(()=>{h&&(h.selectAll("*").remove(),h.selectAll(".bar-group").data(e).enter().append("g").attr("class","bar-group").append("line").attr("class","bar").attr("x1",g).attr("x2",g).attr("y1",d).attr("y2",n).call(ii,c.line()).attr("stroke-width",x).attr("stroke",(f,b)=>r?m[b]??null:m).attr("data-legend",(f,b)=>i?.length?i[b]??null:f).attr("data-index",(f,b)=>b).attr("id",(f,b)=>`bar-${b}-${f}-${Math.round(Math.random()*100)}`),a?h.selectAll(".bar").on("mouseover mouseout",a):h.selectAll(".bar-group").append("title").text((f,b)=>i?.length?i[b]??null:f))},[c,h,e,n,g,d,m,r,x,i,a]),u.exports.jsx("svg",{ref:p})}),Nx=l.exports.memo(function({data:e,width:o,height:n,color:r}){const s=De(),i=l.exports.useRef(null),a=l.exports.useMemo(()=>r||s.line().stroke().hex(),[s,r]),c=sa(e,[0,o]),p=ia(e,[0,n]);aa(i,o,n);const m=la(i,o,n),x=l.exports.useMemo(()=>hu(c,p)(e),[e,c,p]);return l.exports.useLayoutEffect(()=>{m&&(m.selectAll("*").remove(),m.append("path").call(ii,s.line()).attr("d",x).attr("stroke-width",1).attr("stroke",a))},[s,m,x,a]),u.exports.jsx("svg",{ref:i})}),ua=l.exports.memo(function({column:e,categories:o={}}){const n=l.exports.useMemo(()=>Object.values(o),[o]),r=Mt(e);return u.exports.jsx(mr,{data:n,categorical:!0,width:r.width,height:r.height})}),ca=l.exports.memo(function({onClick:e,column:o,children:n}){const r=l.exports.useCallback(i=>{o&&e&&e(i,o?.data?.selected?void 0:o)},[o,e]),s=l.exports.useMemo(()=>{const i={};return e&&(i.cursor="pointer"),o?.data?.selected&&(i.fontWeight="bold"),i},[e,o]);return u.exports.jsx(Ex,{onClick:r,style:s,children:n})}),Ex=_.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: inherit;
	> * {
		&:first-child {
			padding: 6px 8px 6px 12px;
		}
	}
`,hr=l.exports.memo(function({item:e,column:o,textAlign:n="right"}){const r=Me(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r&&r.toLocaleString()})}),Px=l.exports.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=Me(n,r),a=o?.type??Io(i),c=l.exports.useCallback(m=>{r&&s&&s(m,r?.data?.selected?void 0:r)},[r,s]),p=l.exports.useMemo(()=>{const m={width:"100%"};return s&&(m.cursor="pointer"),r?.data?.selected&&(m.fontWeight="bold"),m},[s,r]);return u.exports.jsx("div",{onClick:c,style:p,children:u.exports.jsxs(fn,{children:[u.exports.jsx(X,{condition:fr(i),children:u.exports.jsx(xr,{textAlign:a===G.Number?"right":"left"})}),u.exports.jsx(X,{condition:a===G.Boolean,children:u.exports.jsx(Ox,{...e})}),u.exports.jsx(X,{condition:a===G.String,children:u.exports.jsx(gr,{...e})}),u.exports.jsx(X,{condition:a===G.Number,children:u.exports.jsx(tg,{...e,numberFormat:","})}),u.exports.jsx(X,{condition:a===G.Date,children:u.exports.jsx(hr,{...e})}),u.exports.jsx(X,{condition:a===G.Array,children:u.exports.jsx($o,{...e})}),u.exports.jsx(Ut,{children:u.exports.jsx(fa,{...e})})]})})}),Ax=2,Fx=l.exports.memo(function({column:e,isClickable:o,onClick:n}){const r=De(),{isSorted:s,isSortedDescending:i,iconName:a,iconClassName:c}=e,p=Mt(e),m=l.exports.useMemo(()=>({lineHeight:e.data.compact?Ax:"inherit",cursor:o?"pointer":"inherit",display:"flex",justifyContent:"space-between",width:p.width,borderBottom:e.data?.selected?`2px solid ${r.application().accent().hex()}`:"2px solid transparent"}),[r,p,e,o]),x=l.exports.useMemo(()=>({color:e.data?.selected?r.application().accent().hex():r.application().foreground().hex(),width:"100%",textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}),[r,e]),g=l.exports.useMemo(()=>({root:{fontSize:12,color:r.application().midHighContrast().hex()}}),[r]);return u.exports.jsxs("div",{onClick:d=>n&&n(d,e),style:m,children:[u.exports.jsx("div",{style:x,title:e.name,children:e.name}),a?u.exports.jsx(Xe,{className:c,iconName:a}):null,s?u.exports.jsx(Xe,{iconName:i?"SortDown":"SortUp",styles:g}):null]})}),xr=l.exports.memo(function({textAlign:e}){const o=De(),n=l.exports.useMemo(()=>({width:"100%",textAlign:e,color:o.application().lowContrast().hex()}),[o,e]);return u.exports.jsx("div",{style:n,children:"—"})}),Bx=l.exports.memo(function({props:e,renderers:o}){return u.exports.jsx(Rx,{className:"header-command-bar",children:o.map((n,r)=>u.exports.jsx($x,{children:n(e)},r))})}),$x=_.div``,Rx=_.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${({theme:t})=>t.application().faint().hex()};
	border-bottom: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,da=l.exports.memo(function({item:e,column:o,onCellDropdownSelect:n,rowIndex:r}){const s=_x(e,r,o)||[],i=s.slice(0,10).map(a=>a.text).join(", ")||"Open to see the values";return u.exports.jsx(nt,{onChange:n,placeholder:i,options:s,styles:{root:{width:"85%"}}})}),Lx=l.exports.memo(function(e){const{features:o,metadata:n,item:r,column:s,index:i,onColumnClick:a}=e,c=n?.type,p=Me(r,s),m=Hx(p,n,c),x=oa(p);return u.exports.jsx(ca,{onClick:a,column:s,children:u.exports.jsxs(fn,{children:[u.exports.jsx(X,{condition:fr(p),children:u.exports.jsx(xr,{textAlign:c===G.Number?"right":"left"})}),u.exports.jsx(X,{condition:c===G.String,children:u.exports.jsx(gr,{...e})}),u.exports.jsx(X,{condition:o.showBooleanSymbol&&c===G.Boolean,children:u.exports.jsx(ra,{...e})}),u.exports.jsx(X,{condition:o.showNumberMagnitude&&c===G.Number,children:u.exports.jsx(pa,{...e,magnitude:m})}),u.exports.jsx(X,{condition:o.showDateFormatted&&c===G.Date,children:u.exports.jsx(hr,{...e})}),u.exports.jsx(X,{condition:o.showCategoricalBar&&c===G.Array,children:u.exports.jsx(ua,{...e,categories:x})}),u.exports.jsx(X,{condition:o.showSparkbar&&c===G.Array&&x&&x.length,children:u.exports.jsx(ma,{...e})}),u.exports.jsx(X,{condition:o.showDropdown&&c===G.Array,children:u.exports.jsx(da,{rowIndex:i||0,...e})}),u.exports.jsx(X,{condition:o.showSparkline&&c===G.Array,children:u.exports.jsx(ha,{...e})}),u.exports.jsx(Ut,{children:u.exports.jsx(Px,{...e})})]})})});function Hx(t,e,o){return l.exports.useMemo(()=>{if(o!==G.Number||dn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return(t-(e?.stats?.min||0))/n},[o,t,e])}const Vx=8,Wx=l.exports.memo(function({metadata:e,color:o,...n}){const{column:r,onClick:s}=n,i=Mt(r,!1),a=e.type==="string",c=a?e.stats?.categories:e.stats?.bins,p=l.exports.useMemo(()=>(c||[]).map(S=>S.count),[c]),m=Ux(e.stats,a),x=Gx(m),g=Kx(m),[d,h]=l.exports.useState(),[f,b]=l.exports.useState(),v=l.exports.useCallback(S=>{const{target:T,type:O}=S,$=T.dataset.index,A=T.id;O==="mouseover"&&$>=0?(h(g[$]||""),b(A)):(h(void 0),b(void 0))},[g,h,b]),C=l.exports.useMemo(()=>({height:i.height+Vx,cursor:s?"pointer":"inherit"}),[s,i]);return e.stats?.distinct===1?null:u.exports.jsx(u.exports.Fragment,{children:c?u.exports.jsx("div",{onClick:S=>s&&c&&s(S,r,e),title:x,style:C,children:u.exports.jsx(xu,{content:d,id:f,calloutProps:{gapSpace:5,target:`#${f}`},children:u.exports.jsx(mr,{categorical:a,data:p,width:i.width-1,height:i.height,color:o,legend:g,onBarHover:v})})}):null})});function Ux(t,e){return l.exports.useMemo(()=>e?t?.categories||[]:(t?.bins||[]).map(o=>({name:`${o.min}`,count:o.count})),[t,e])}function Gx(t){return l.exports.useMemo(()=>t.reduce((e,o,n)=>{const{name:r,count:s}=o;return e+(n>0?`
`:"")+`${qn(r)}: ${s}`},""),[t])}function Kx(t){return l.exports.useMemo(()=>t.map(e=>`${qn(e.name)}: ${e.count}`),[t])}const zx=(t,e,o,n)=>function(s,i,a){return u.exports.jsx(sg,{item:s,index:i,column:a,metadata:t,color:e,onColumnClick:o,onCellDropdownSelect:n})},qx=(t,e,o,n,r)=>function(i,a,c){return u.exports.jsx(Lx,{index:a||0,item:i,column:c,onCellDropdownSelect:r,onColumnClick:n,metadata:e,color:o,features:t})},Yx=t=>function(o,n){return!o||!n?null:u.exports.jsx(u.exports.Fragment,{children:t.map((r,s)=>r({key:`renderer-${o.column.key}${s}`,...o},n))})},Jx=(t,e,o)=>function(r,s){if(!r||!s)return null;const i=eg(t,r);return u.exports.jsx(Fx,{...i,isClickable:e,onClick:o})},Zx=(t,e,o)=>function(r,s){return!r||!s?null:u.exports.jsx(lg,{onClick:e,metadata:t,stats:o,...r})},Xx=t=>function(o,n){return!o||!n?null:u.exports.jsx(Bx,{props:o,renderers:t},o.key)},Qx=(t,e,o)=>function(r,s){return!r||!s?null:u.exports.jsx(Wx,{onClick:o,metadata:t,color:e,...r})};function eg(t,e){const o=t?.iconName;return o?{...e,column:{...e.column,iconName:o}}:e}const tg=l.exports.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r}){const s=Me(e,o),i=ba(s,r);return u.exports.jsx("div",{style:{textAlign:n},children:i})}),pa=l.exports.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r,color:s,magnitude:i=0}){const a=De(),c=l.exports.useMemo(()=>s||a.rect().fill().hex(),[a,s]),p=Me(e,o),m=ba(p,r),x=Mt(o),{width:g,height:d}=x,h=l.exports.useMemo(()=>a.text().fill().hex(),[a]),f=i*g;return u.exports.jsx("div",{style:{textAlign:n},children:u.exports.jsxs("svg",{width:g,height:d,children:[u.exports.jsx("rect",{width:f,height:d,x:g-f,fill:c}),u.exports.jsx("text",{fill:h,y:d/2+1,x:g-2,dominantBaseline:"middle",textAnchor:"end",children:m})]})})}),fa=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Me(e,o)||{};return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})}),ng=20,og=15,rg=l.exports.memo(function(e){const{item:o,column:n,index:r}=e,s=Me(o,n)||[],i=n?.currentWidth||0,a=oa(s),c=Object.keys(a).length,p=Sx(a);return u.exports.jsxs(fn,{children:[u.exports.jsx(X,{condition:s.length<=3,children:u.exports.jsx($o,{...e})}),u.exports.jsx(X,{condition:s.length<=og,children:u.exports.jsx(da,{rowIndex:r||0,...e})}),u.exports.jsx(X,{condition:c<=ng&&!p,children:u.exports.jsx(ua,{...e,categories:a})}),u.exports.jsx(X,{condition:s.length<=i,children:u.exports.jsx(ma,{...e})}),u.exports.jsx(X,{condition:s.length>i,children:u.exports.jsx(ha,{...e})}),u.exports.jsx(Ut,{children:u.exports.jsx($o,{...e})})]})}),sg=l.exports.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=o?.type,a=Me(n,r),c=ig(a,o,i);return u.exports.jsx(ca,{onClick:s,column:r,children:u.exports.jsxs(fn,{children:[u.exports.jsx(X,{condition:fr(a),children:u.exports.jsx(xr,{textAlign:i===G.Number?"right":"left"})}),u.exports.jsx(X,{condition:i===G.String,children:u.exports.jsx(gr,{...e})}),u.exports.jsx(X,{condition:i===G.Boolean,children:u.exports.jsx(ra,{...e})}),u.exports.jsx(X,{condition:i===G.Number,children:u.exports.jsx(pa,{...e,magnitude:c})}),u.exports.jsx(X,{condition:i===G.Date,children:u.exports.jsx(hr,{...e})}),u.exports.jsx(X,{condition:i===G.Array,children:u.exports.jsx(rg,{...e})}),u.exports.jsx(Ut,{children:u.exports.jsx(fa,{...e})})]})})});function ig(t,e,o){return l.exports.useMemo(()=>{if(o!==G.Number||dn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return n===0?0:(t-(e?.stats?.min||0))/n},[o,t,e])}const ma=l.exports.memo(function({item:e,column:o}){const n=Me(e,o)||[],r=Mt(o);return u.exports.jsx(mr,{data:n,width:r.width,height:r.height})}),ha=l.exports.memo(function({item:e,column:o,color:n}){const r=Me(e,o)||[],s=Mt(o);return u.exports.jsx(Nx,{data:r,width:s.width,height:s.height,color:n})});var Ge;(function(t){t.Type="type",t.Count="count",t.Distinct="distinct",t.Invalid="invalid",t.Mode="mode",t.Min="min",t.Max="max",t.Mean="mean",t.Median="median",t.Stdev="stdev"})(Ge||(Ge={}));const xa={distinct:"unique",invalid:"empty"},ga=14,ag=[Ge.Min,Ge.Max,Ge.Distinct,Ge.Invalid],lg=l.exports.memo(function({metadata:e,stats:o=ag,column:n,onClick:r}){const s=De(),i=l.exports.useMemo(()=>{const p=e.stats||{};return o.map(m=>{const x=p[m];return u.exports.jsx(ug,{name:m,value:x},`${n.key}-${m}`)})},[e,n,o]),a=cg(e.stats),c=l.exports.useMemo(()=>({height:o.length*ga,fontWeight:"normal",fontSize:10,color:s.application().midHighContrast().hex(),cursor:r?"pointer":"inherit"}),[r,s,o]);return u.exports.jsx("div",{onClick:p=>r&&r(p,n,e),title:a,style:c,children:i})}),ug=({name:t,value:e})=>e!==void 0?u.exports.jsxs("div",{style:{height:ga,display:"flex",justifyContent:"space-between",paddingLeft:4,paddingRight:4,lineHeight:1},children:[u.exports.jsxs("div",{style:{textTransform:"capitalize"},children:[xa[t]||t,":"]}),u.exports.jsx("div",{style:{maxWidth:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:qn(e)})]}):null;function cg(t){return l.exports.useMemo(()=>{const{bins:e,categories:o,...n}=t||{};return Object.entries(n).reduce((r,s,i)=>{const[a,c]=s,p=Oo(xa[a]||a);return r+(i>0?`
`:"")+`${p}: ${qn(c)}`},"")},[t])}const dg=l.exports.memo(function({striped:e,columnBorders:o,styles:n,...r}){const s=De(),{itemIndex:i,compact:a}=r,c=l.exports.useMemo(()=>e&&i%2===0?{root:{width:"100%",background:s.application().faint().hex()},cell:{borderRight:o?`1px solid ${s.application().background().hex(.5)}`:"1px solid transparent",padding:"unset"},...n}:{root:{width:"100%",borderBottom:`1px solid ${s.application().faint().hex()}`},cell:{padding:"unset",borderRight:o?`1px solid ${s.application().faint().hex(.5)}`:"1px solid transparent",borderTop:i===0?`1px solid ${s.application().faint().hex()}`:"none",borderBottom:a?`1px solid ${s.application().faint().hex()}`:"none"},...n},[s,e,o,n,i,a]);return u.exports.jsx(gu,{...r,styles:c})}),gr=l.exports.memo(function({item:e,column:o,textAlign:n="left"}){const r=Me(e,o);return u.exports.jsx("div",{style:{textAlign:n},children:r.toString()})}),pg=100,fg=40,mg=10;function hg(t){return l.exports.useMemo(()=>{const e=Math.max(...t?.map(s=>+s()?.props.styles.root.width)||[0]),o=Math.max(...t?.map(s=>s()?.props.items.length)||[0])*fg,n=Math.max(o,e);return Math.max(pg,n+mg)},[t])}function xg(t,e,o,n,r,s={}){const{features:i={},sortColumn:a,sortDirection:c,selectedColumn:p,onColumnClick:m,onCellDropdownSelect:x,includeAllColumns:g=!1,isColumnClickable:d=!1,isDefaultHeaderClickable:h=!1,showColumnBorders:f=!1,compact:b=!1,isResizable:v=!0}=s,C=yx(d,m),S=Cx(d,x),T=wg(e),O=bg(d,f),$=wx(t,o,g,n),A=hg(i.commandBar);return l.exports.useMemo(()=>{const F=gg(o);return $.map(U=>{const z=F[U]||{key:U,name:U,minWidth:A,fieldName:U},{iconName:ue,...ie}=z,Z=e?.columns[U],de=Z&&Z.type===G.Number?T():void 0,me=i.smartCells&&Z?zx(Z,de,C,S):qx(i,Z,de,C,S),Q=[Jx(z,h,r)];return i.commandBar&&Q.push(Xx(i.commandBar)),(i.smartHeaders||i.statsColumnHeaders)&&Z&&Q.push(Zx(Z,i.onStatsColumnHeaderClick,i.statsColumnTypes)),(i.smartHeaders||i.histogramColumnHeaders)&&Z&&Q.push(Qx(Z,de,i.onHistogramColumnHeaderClick)),{onRender:me,onRenderHeader:Yx(Q),onColumnClick:m,isSorted:!!(c&&z.fieldName===a),isSortedDescending:c===je.Descending,styles:O,...ie,data:{selected:z.key===p,compact:b,...z.data},isResizable:v}})},[o,$,i,a,c,p,m,C,O,b,v,e,T,S,h,r,A])}function gg(t){return(t||[]).reduce((e,o)=>(e[o.name]=o,e),{})}function bg(t,e){const o=De();return l.exports.useMemo(()=>({sortIcon:{display:"none"},cursor:t?"pointer":"inherit",cellTitle:{borderRight:e?`1px solid ${o.application().faint().hex(.6)}`:"1px solid transparent"},cellTooltip:{display:"initial",position:"relative"}}),[o,t,e])}function vg(){return l.exports.useCallback((t,e)=>{if(!t||!e)return null;const o={styles:{root:{paddingTop:1},cellSizer:{height:"1.5rem"}},...t};return e(o)},[])}function yg(t,e,o,n,r){const s=De(),i=l.exports.useMemo(()=>e?.smartHeaders||e?.histogramColumnHeaders||e?.statsColumnHeaders,[e]);return l.exports.useMemo(()=>Rn({},{headerWrapper:{position:t?"sticky":"inherit",zIndex:"2",top:"0",background:s.application().background().hex(),borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`,selectors:{".ms-DetailsHeader":{lineHeight:r&&!i?"normal":"42px",height:"auto",borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`},".ms-DetailsHeader-cell":{cursor:n?"pointer":"default",height:"auto",padding:"unset"}}}},o),[s,i,o,t,n,r])}function ba(t,e){return l.exports.useMemo(()=>dn(t)?"":e?Yo(e)(t):t.toString(),[t,e])}function Cg(t,e,o,n=!0){return l.exports.useCallback((r,s)=>{if(!r||!s)return null;const i=t.groups().names[r.groupLevel],a=i?e?.columns[i]:void 0;return o?o(a,i,r):u.exports.jsx(yp,{props:r,columnName:i,lazyLoadGroups:n})},[o,t,n,e?.columns])}function wg(t){const e=De(),o=l.exports.useMemo(()=>_g(t),[t]),n=l.exports.useMemo(()=>e.scales().nominal(o),[e,o]);return l.exports.useMemo(()=>{let r=0;return()=>n(r++).hex()},[n])}function _g(t){return t?Object.values(t.columns).reduce((e,o)=>e+(o.type===G.Number?1:0),0):1}function Sg(t,e,o){return l.exports.useMemo(()=>e===0&&o===1/0?t:t.slice(e,e+o),[t,o,e])}function kg(t,e,o=je.Ascending,n){return l.exports.useMemo(()=>{if(!t.isGrouped())return;const r=t.groups().names[0];return e&&e!==r?n:o===je.Ascending?n?.sort():n?.sort().reverse()},[e,n,o,t])}function Tg(t,e,o){return l.exports.useMemo(()=>{let n=[];const r=t.columnNames().includes(e||"");return o?(!e||!o)&&!t.isGrouped()||!r?t.unorder():(e&&n.push(e),t.isGrouped()&&(n=[...t.groups().names,...n]),t.orderby(o===je.Descending?n.map(s=>zs(s)):n)):t},[t,e,o])}function Ig(t,e){const[o,n]=l.exports.useState(),[r,s]=l.exports.useState(),i=l.exports.useCallback((a,c)=>{t&&((c?.isSorted||!r)&&s(r===je.Ascending?je.Descending:r===je.Descending?void 0:je.Ascending),n(c?.fieldName)),e&&e(a,c)},[t,e,n,s,r]);return{sortColumn:o,sortDirection:r,handleColumnHeaderClick:i}}function jg(t=!1,e=!1){return l.exports.useCallback(o=>o?u.exports.jsx(dg,{...o,striped:t,columnBorders:e}):null,[t,e])}function Dg(t,e){return l.exports.useMemo(()=>{if(e&&e.length>0){const o=t.columnNames(),n=e.filter(r=>o.includes(r));return t.select(n)}return t},[t,e])}function Mg(t,e,o=!1,n){return l.exports.useMemo(()=>{if(e)return e;if(o){const r=eu(t,o);return n&&n(r,t),r}},[t,e,o,n])}const Og=l.exports.memo(function({table:e,features:o={},metadata:n,offset:r=0,limit:s=1/0,includeAllColumns:i=!0,visibleColumns:a,isSortable:c=!1,isStriped:p=!1,isColumnClickable:m=!1,showColumnBorders:x=!1,selectedColumn:g,onColumnClick:d,onCellDropdownSelect:h,onRenderGroupHeader:f,onChangeMetadata:b,selectionMode:v=yu.none,layoutMode:C=Cu.fixedColumns,columns:S,onColumnHeaderClick:T,styles:O,isHeadersFixed:$=!1,compact:A=!1,isResizable:F=!0,...U}){const[z,ue]=l.exports.useState(0),{sortColumn:ie,sortDirection:Z,handleColumnHeaderClick:de}=Ig(c,T),me=Dg(e,a),Q=Tg(me,ie,Z),ge=Sg(Q,r,s),w=l.exports.useMemo(()=>ge.objects(),[ge]),y=l.exports.useMemo(()=>e.isGrouped()?ge.objects({grouped:"entries"}):void 0,[ge,e]),I=kg(e,ie,Z,y),P=Mg(e,n,Eg(o),b),B=l.exports.useMemo(()=>c||m||!!T,[c,m,T]),ee=l.exports.useCallback((N,L)=>{const k=()=>ue(xe=>xe+1);N.currentWidth!==L&&kx(k)},[ue]),te=xg(e,P,S,a,de,{features:o,sortColumn:ie,sortDirection:Z,selectedColumn:g,onColumnClick:d,onCellDropdownSelect:h,isDefaultHeaderClickable:B,includeAllColumns:i,isColumnClickable:m,showColumnBorders:x,compact:A,isResizable:F}),ae=yg($,o,O,!!d,A),he=jg(p,x),ce=vg(),$e=Cg(e,P,f,o.lazyLoadGroups),M=l.exports.useMemo(()=>{if(!ge.isGrouped())return;const N=ge.groups(),L=N.names.length;return I?.map(k=>Qi(k,N,0,L,w,Z,o.lazyLoadGroups,ie))},[ge,I,w,ie,Z,o]);return l.exports.useEffect(()=>{ue(N=>N+1)},[S,e,A]),u.exports.jsx(Ng,{"data-is-scrollable":"true",children:u.exports.jsx(bu,{items:[...w],selectionMode:v,layoutMode:C,groups:M,getKey:(N,L)=>L.toString(),groupProps:{onRenderHeader:$e},columns:te,constrainMode:vu.unconstrained,onRenderRow:he,onRenderDetailsHeader:ce,onColumnResize:ee,compact:A,...U,listProps:{version:z},styles:ae})})}),Ng=_.div`
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
`;function Eg(t){return Object.values(t||{}).some(e=>e===!0)}const Pg=36;function Ag(t,e){const o=De();return l.exports.useMemo(()=>({background:e||o.application().accent().hex(),foreground:t||o.application().background().hex()}),[o,e,t])}function Fg(t,e){return l.exports.useMemo(()=>{const o=t.numCols(),n=e?e.length:o,r=o-n;return{total:o,visible:n,hidden:r}},[t,e])}function Bg(t){return l.exports.useMemo(()=>{const e=t.totalRows(),o=t.numRows(),n=e-o;return{total:e,visible:o,hidden:n}},[t])}const $g=l.exports.memo(function({onSend:e,onChange:o,editedName:n,name:r}){const s=l.exports.useCallback(i=>{if(i.key==="Enter")return e(n);i.key==="Escape"&&e(r)},[e,r,n]);return u.exports.jsx(Rg,{target:"#editName",directionalHint:Gn.topCenter,onDismiss:()=>e(r),children:u.exports.jsx(ke,{value:n,onKeyDown:s,onChange:o,underlined:!0})})}),Rg=_(wu)`
	width: 320;
	max-width: 90%;
	padding: 10px;
`,Lg=l.exports.memo(function({onRenameTable:e,name:o,color:n}){const[r,s]=l.exports.useState(!1),[i,a]=l.exports.useState(o||"");l.exports.useEffect(()=>{a(o)},[o,a]);const c=l.exports.useCallback((m,x)=>{a(x)},[a]),p=l.exports.useCallback(m=>{const x=m||o;e&&e(x),s(!1),a(x)},[e,s,a,o]);return u.exports.jsx(ms,{children:u.exports.jsxs(on,{condition:!!e,children:[u.exports.jsx(lt,{children:u.exports.jsxs(ms,{children:[u.exports.jsx(Hg,{color:n,id:"editName",title:"Edit",onClick:()=>s(!0),children:o}),u.exports.jsx(on,{condition:r,children:u.exports.jsx(lt,{children:u.exports.jsx($g,{onSend:p,editedName:i,onChange:c,name:o})})})]})}),u.exports.jsx($t,{children:u.exports.jsx(on,{condition:o,children:u.exports.jsx(lt,{children:u.exports.jsx(va,{color:n,children:o})})})})]})})}),va=_.h3`
	font-weight: normal;
	font-size: 0.8em;
	margin-right: 8px;
	color: ${({theme:t,color:e})=>e||t.application().background().hex()};
`,Hg=_(va)`
	cursor: pointer;
	border-bottom: 1px dotted
		${({theme:t})=>t.application().background().hex()};
`,ms=_.div``,Vg=l.exports.memo(function({table:e,name:o,showRowCount:n=!0,showColumnCount:r=!0,commandBar:s,farCommandBar:i,visibleColumns:a,onRenameTable:c,bgColor:p,color:m}){const{background:x,foreground:g}=Ag(m,p),d=l.exports.useMemo(()=>e.isGrouped()?e.groups().size:0,[e]),h=Fg(e,a),f=Bg(e);return u.exports.jsxs(Wg,{bgColor:x,color:g,children:[u.exports.jsx(Ug,{children:s}),u.exports.jsxs(Gg,{children:[o?u.exports.jsx(Lg,{onRenameTable:c,name:o,color:g}):null,n===!0?u.exports.jsx(go,{children:`${f.visible} row${f.visible!==1?"s":""}${f.hidden>0?` (${f.hidden} filtered)`:""}`}):null,r===!0?u.exports.jsx(go,{children:`${h.visible} col${h.visible!==1?"s":""}${h.hidden>0?` (${h.hidden} hidden)`:""}`}):null,d?u.exports.jsxs(go,{children:[d," groups"]}):null]}),u.exports.jsx(Kg,{children:i})]})}),Wg=_.div`
	height: ${Pg}px;
	width: 100%;
	background-color: ${({bgColor:t})=>t};
	color: ${({color:t})=>t};
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
`,go=_.h3`
	font-weight: normal;
	font-size: 0.8em;
`,Ug=_.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
`,Gg=_.div`
	flex: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
`,Kg=_.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
`;function ya(t,e){const o=Object.entries(t).find(n=>n[1]===e);return o&&o[0]}function zg(t,e){return l.exports.useCallback(()=>{t&&e&&e(t)},[e,t])}function qg(t,e,o){const n=l.exports.useMemo(()=>t?$a(t):null,[t]);return l.exports.useMemo(()=>{if(n){let s=n;return e||(s=Ra()(s)),o||(s=La()(s)),s}},[n,e,o])}function Yg(t,e="input",o){const[n,r]=l.exports.useState(),s=na();l.exports.useEffect(()=>{t&&r(t)},[t,r]);const i=l.exports.useCallback(async(a,c)=>{const p=t?.input??e,m=t?.output??e,x=cr(c.key,p,m);x.args=await s(x,o?.columnNames()||[]),r(x)},[r,t,s,e,o]);return{internal:n,handleVerbChange:i,setInternal:r}}const Jg=l.exports.memo(function({table:e,step:o,onTransformRequested:n,hideInputColumn:r,hideOutputColumn:s,verbs:i,headerText:a,nextInputTable:c,onDismiss:p,...m}){const{internal:x,setInternal:g,handleVerbChange:d}=Yg(o,c,e),h=qg(x,r,s),f=zg(x,n),b=l.exports.useMemo(()=>(i||tx(C=>C!==V.Aggregate&&C!==V.Rollup)).map(C=>({key:C,text:ya(V,C)})),[i]);return u.exports.jsxs(rr,{onDismiss:p,onDismissed:()=>g(void 0),...m,children:[u.exports.jsxs(Zg,{children:[u.exports.jsx(Xg,{children:a}),p&&u.exports.jsx(ve,{iconProps:eb.cancel,ariaLabel:"Close popup modal",onClick:()=>p()})]}),u.exports.jsxs(Qg,{children:[u.exports.jsx(nt,{placeholder:"Choose transform",options:b,defaultSelectedKey:x?.verb||"",onChange:d}),h&&x?u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(h,{step:x,table:e,onChange:g}),u.exports.jsx(Xo,{onClick:f,children:"Run"})]}):null]})]})}),Zg=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
`,Xg=_.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,Qg=_.div`
	padding: 12px;
`,eb={cancel:{iconName:"Cancel"}};function tn(){return(tn=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t}).apply(this,arguments)}const tb=["children","options"],hs=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((t,e)=>(t[e.toLowerCase()]=e,t),{for:"htmlFor"}),xs={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},nb=["style","script"],ob=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,rb=/mailto:/i,sb=/\n{2,}$/,Ca=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,ib=/^ *> ?/gm,ab=/^ {2,}\n/,lb=/^(?:( *[-*_]) *){3,}(?:\n *)+\n/,wa=/^\s*(`{3,}|~{3,}) *(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n *)+\n?/,_a=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,ub=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,cb=/^(?:\n *)*\n/,db=/\r\n?/g,pb=/^\[\^([^\]]+)](:.*)\n/,fb=/^\[\^([^\]]+)]/,mb=/\f/g,hb=/^\s*?\[(x|\s)\]/,Sa=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,ka=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,Ro=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,xb=/&([a-z]+);/g,Ta=/^<!--[\s\S]*?(?:-->)/,gb=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,Lo=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,bb=/^\{.*\}$/,vb=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,yb=/^<([^ >]+@[^ >]+)>/,Cb=/^<([^ >]+:\/[^ >]+)>/,gs=/ *\n+$/,wb=/(?:^|\n)( *)$/,_b=/-([a-z])?/gi,Ia=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Sb=/^\[([^\]]*)\]:\s*(\S+)\s*("([^"]*)")?/,kb=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Tb=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Ib=/(\[|\])/g,jb=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Db=/\t/g,Mb=/^ *\| */,Ob=/(^ *\||\| *$)/g,Nb=/ *$/,Eb=/^ *:-+: *$/,Pb=/^ *:-+ *$/,Ab=/^ *-+: *$/,Fb=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Bb=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,$b=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,Rb=/^\\([^0-9A-Za-z\s])/,Lb=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,Hb=/^\n+/,Vb=/^([ \t]*)/,Wb=/\\([^0-9A-Z\s])/gi,bs=new RegExp("^( *)((?:[*+-]|\\d+\\.)) +"),ja=new RegExp("^( *)((?:[*+-]|\\d+\\.)) +[^\\n]*(?:\\n(?!\\1(?:[*+-]|\\d+\\.) )[^\\n]*)*(\\n|$)","gm"),Da=new RegExp("^( *)((?:[*+-]|\\d+\\.)) [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1(?:[*+-]|\\d+\\.) (?!(?:[*+-]|\\d+\\.) ))\\n*|\\s*\\n*$)"),Ma="(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*",Ub=new RegExp("^\\[("+Ma+`)\\]\\(\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),Gb=new RegExp("^!\\[("+Ma+`)\\]\\(\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`),Oa=[Ca,_a,wa,Sa,ka,Ta,ja,Da,Ia],Kb=[...Oa,/^[^\n]+(?:  \n|\n{2,})/,Ro,Lo];function zb(t){return t.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function qb(t){return Ab.test(t)?"right":Eb.test(t)?"center":Pb.test(t)?"left":null}function vs(t,e,o){const n=o.t;o.t=!0;const r=e(t.trim(),o);o.t=n;let s=[[]];return r.forEach(function(i,a){i.type==="tableSeparator"?a!==0&&a!==r.length-1&&s.push([]):(i.type!=="text"||r[a+1]!=null&&r[a+1].type!=="tableSeparator"||(i.content=i.content.replace(Nb,"")),s[s.length-1].push(i))}),s}function Yb(t,e,o){o.o=!0;const n=vs(t[1],e,o),r=t[2].replace(Ob,"").split("|").map(qb),s=function(i,a,c){return i.trim().split(`
`).map(function(p){return vs(p,a,c)})}(t[3],e,o);return o.o=!1,{align:r,cells:s,header:n,type:"table"}}function ys(t,e){return t.align[e]==null?{}:{textAlign:t.align[e]}}function st(t){return function(e,o){return o.o?t.exec(e):null}}function mt(t){return function(e,o){return o.o||o.u?t.exec(e):null}}function Qe(t){return function(e,o){return o.o||o.u?null:t.exec(e)}}function Xt(t){return function(e){return t.exec(e)}}function Jb(t,e,o){if(e.o||e.u||o&&!o.endsWith(`
`))return null;let n="";t.split(`
`).every(s=>!Oa.some(i=>i.test(s))&&(n+=s+`
`,s.trim()));const r=n.trimEnd();return r==""?null:[n,r]}function At(t){try{if(decodeURIComponent(t).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data):/i))return null}catch{return null}return t}function Cs(t){return t.replace(Wb,"$1")}function Pn(t,e,o){const n=o.o||!1,r=o.u||!1;o.o=!0,o.u=!0;const s=t(e,o);return o.o=n,o.u=r,s}function Zb(t,e,o){const n=o.o||!1,r=o.u||!1;o.o=!1,o.u=!0;const s=t(e,o);return o.o=n,o.u=r,s}function Xb(t,e,o){return o.o=!1,t(e+`

`,o)}const ws=(t,e,o)=>({content:Pn(e,t[1],o)});function bo(){return{}}function vo(){return null}function Qb(...t){return t.filter(Boolean).join(" ")}function yo(t,e,o){let n=t;const r=e.split(".");for(;r.length&&(n=n[r[0]],n!==void 0);)r.shift();return n||o}var q;function ev(t,e={}){e.overrides=e.overrides||{},e.slugify=e.slugify||zb,e.namedCodesToUnicode=e.namedCodesToUnicode?tn({},xs,e.namedCodesToUnicode):xs;const o=e.createElement||l.exports.createElement;function n(d,h,...f){const b=yo(e.overrides,`${d}.props`,{});return o(function(v,C){const S=yo(C,v);return S?typeof S=="function"||typeof S=="object"&&"render"in S?S:yo(C,`${v}.component`,v):v}(d,e.overrides),tn({},h,b,{className:Qb(h?.className,b.className)||void 0}),...f)}function r(d){let h=!1;e.forceInline?h=!0:e.forceBlock||(h=jb.test(d)===!1);const f=m(p(h?d:`${d.trimEnd().replace(Hb,"")}

`,{o:h}));for(;typeof f[f.length-1]=="string"&&!f[f.length-1].trim();)f.pop();if(e.wrapper===null)return f;const b=e.wrapper||(h?"span":"div");let v;if(f.length>1||e.forceWrapper)v=f;else{if(f.length===1)return v=f[0],typeof v=="string"?n("span",{key:"outer"},v):v;v=null}return l.exports.createElement(b,{key:"outer"},v)}function s(d){const h=d.match(ob);return h?h.reduce(function(f,b,v){const C=b.indexOf("=");if(C!==-1){const S=function(A){return A.indexOf("-")!==-1&&A.match(gb)===null&&(A=A.replace(_b,function(F,U){return U.toUpperCase()})),A}(b.slice(0,C)).trim(),T=function(A){const F=A[0];return(F==='"'||F==="'")&&A.length>=2&&A[A.length-1]===F?A.slice(1,-1):A}(b.slice(C+1).trim()),O=hs[S]||S,$=f[O]=function(A,F){return A==="style"?F.split(/;\s?/).reduce(function(U,z){const ue=z.slice(0,z.indexOf(":"));return U[ue.replace(/(-[a-z])/g,ie=>ie[1].toUpperCase())]=z.slice(ue.length+1).trim(),U},{}):A==="href"?At(F):(F.match(bb)&&(F=F.slice(1,F.length-1)),F==="true"||F!=="false"&&F)}(S,T);typeof $=="string"&&(Ro.test($)||Lo.test($))&&(f[O]=l.exports.cloneElement(r($.trim()),{key:v}))}else b!=="style"&&(f[hs[b]||b]=!0);return f},{}):void 0}const i=[],a={},c={blockQuote:{i:Qe(Ca),l:q.HIGH,_:(d,h,f)=>({content:h(d[0].replace(ib,""),f)}),p:(d,h,f)=>n("blockquote",{key:f.g},h(d.content,f))},breakLine:{i:Xt(ab),l:q.HIGH,_:bo,p:(d,h,f)=>n("br",{key:f.g})},breakThematic:{i:Qe(lb),l:q.HIGH,_:bo,p:(d,h,f)=>n("hr",{key:f.g})},codeBlock:{i:Qe(_a),l:q.MAX,_:d=>({content:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),lang:void 0}),p:(d,h,f)=>n("pre",{key:f.g},n("code",{className:d.lang?`lang-${d.lang}`:""},d.content))},codeFenced:{i:Qe(wa),l:q.MAX,_:d=>({content:d[3],lang:d[2]||void 0,type:"codeBlock"})},codeInline:{i:mt(ub),l:q.LOW,_:d=>({content:d[2]}),p:(d,h,f)=>n("code",{key:f.g},d.content)},footnote:{i:Qe(pb),l:q.MAX,_:d=>(i.push({footnote:d[2],identifier:d[1]}),{}),p:vo},footnoteReference:{i:st(fb),l:q.HIGH,_:d=>({content:d[1],target:`#${e.slugify(d[1])}`}),p:(d,h,f)=>n("a",{key:f.g,href:At(d.target)},n("sup",{key:f.g},d.content))},gfmTask:{i:st(hb),l:q.HIGH,_:d=>({completed:d[1].toLowerCase()==="x"}),p:(d,h,f)=>n("input",{checked:d.completed,key:f.g,readOnly:!0,type:"checkbox"})},heading:{i:Qe(Sa),l:q.HIGH,_:(d,h,f)=>({content:Pn(h,d[2],f),id:e.slugify(d[2]),level:d[1].length}),p:(d,h,f)=>(d.tag=`h${d.level}`,n(d.tag,{id:d.id,key:f.g},h(d.content,f)))},headingSetext:{i:Qe(ka),l:q.MAX,_:(d,h,f)=>({content:Pn(h,d[1],f),level:d[2]==="="?1:2,type:"heading"})},htmlComment:{i:Xt(Ta),l:q.HIGH,_:()=>({}),p:vo},image:{i:mt(Gb),l:q.HIGH,_:d=>({alt:d[1],target:Cs(d[2]),title:d[3]}),p:(d,h,f)=>n("img",{key:f.g,alt:d.alt||void 0,title:d.title||void 0,src:At(d.target)})},link:{i:st(Ub),l:q.LOW,_:(d,h,f)=>({content:Zb(h,d[1],f),target:Cs(d[2]),title:d[3]}),p:(d,h,f)=>n("a",{key:f.g,href:At(d.target),title:d.title},h(d.content,f))},linkAngleBraceStyleDetector:{i:st(Cb),l:q.MAX,_:d=>({content:[{content:d[1],type:"text"}],target:d[1],type:"link"})},linkBareUrlDetector:{i:(d,h)=>h.m?null:st(vb)(d,h),l:q.MAX,_:d=>({content:[{content:d[1],type:"text"}],target:d[1],title:void 0,type:"link"})},linkMailtoDetector:{i:st(yb),l:q.MAX,_(d){let h=d[1],f=d[1];return rb.test(f)||(f="mailto:"+f),{content:[{content:h.replace("mailto:",""),type:"text"}],target:f,type:"link"}}},list:{i(d,h,f){const b=wb.exec(f);return!b||!h.h&&h.o?null:Da.exec(d=b[1]+d)},l:q.HIGH,_(d,h,f){const b=d[2],v=b.length>1,C=v?+b:void 0,S=d[0].replace(sb,`
`).match(ja);let T=!1;return{items:S.map(function(O,$){const A=bs.exec(O)[0].length,F=new RegExp("^ {1,"+A+"}","gm"),U=O.replace(F,"").replace(bs,""),z=$===S.length-1,ue=U.indexOf(`

`)!==-1||z&&T;T=ue;const ie=f.o,Z=f.h;let de;f.h=!0,ue?(f.o=!1,de=U.replace(gs,`

`)):(f.o=!0,de=U.replace(gs,""));const me=h(de,f);return f.o=ie,f.h=Z,me}),ordered:v,start:C}},p:(d,h,f)=>n(d.ordered?"ol":"ul",{key:f.g,start:d.start},d.items.map(function(b,v){return n("li",{key:v},h(b,f))}))},newlineCoalescer:{i:Qe(cb),l:q.LOW,_:bo,p:()=>`
`},paragraph:{i:Jb,l:q.LOW,_:ws,p:(d,h,f)=>n("p",{key:f.g},h(d.content,f))},ref:{i:st(Sb),l:q.MAX,_:d=>(a[d[1]]={target:d[2],title:d[4]},{}),p:vo},refImage:{i:mt(kb),l:q.MAX,_:d=>({alt:d[1]||void 0,ref:d[2]}),p:(d,h,f)=>n("img",{key:f.g,alt:d.alt,src:At(a[d.ref].target),title:a[d.ref].title})},refLink:{i:st(Tb),l:q.MAX,_:(d,h,f)=>({content:h(d[1],f),fallbackContent:h(d[0].replace(Ib,"\\$1"),f),ref:d[2]}),p:(d,h,f)=>a[d.ref]?n("a",{key:f.g,href:At(a[d.ref].target),title:a[d.ref].title},h(d.content,f)):n("span",{key:f.g},h(d.fallbackContent,f))},table:{i:Qe(Ia),l:q.HIGH,_:Yb,p:(d,h,f)=>n("table",{key:f.g},n("thead",null,n("tr",null,d.header.map(function(b,v){return n("th",{key:v,style:ys(d,v)},h(b,f))}))),n("tbody",null,d.cells.map(function(b,v){return n("tr",{key:v},b.map(function(C,S){return n("td",{key:S,style:ys(d,S)},h(C,f))}))})))},tableSeparator:{i:function(d,h){return h.t?Mb.exec(d):null},l:q.HIGH,_:function(){return{type:"tableSeparator"}},p:()=>" | "},text:{i:Xt(Lb),l:q.MIN,_:d=>({content:d[0].replace(xb,(h,f)=>e.namedCodesToUnicode[f]?e.namedCodesToUnicode[f]:h)}),p:d=>d.content},textBolded:{i:mt(Fb),l:q.MED,_:(d,h,f)=>({content:h(d[2],f)}),p:(d,h,f)=>n("strong",{key:f.g},h(d.content,f))},textEmphasized:{i:mt(Bb),l:q.LOW,_:(d,h,f)=>({content:h(d[2],f)}),p:(d,h,f)=>n("em",{key:f.g},h(d.content,f))},textEscaped:{i:mt(Rb),l:q.HIGH,_:d=>({content:d[1],type:"text"})},textStrikethroughed:{i:mt($b),l:q.LOW,_:ws,p:(d,h,f)=>n("del",{key:f.g},h(d.content,f))}};e.disableParsingRawHTML!==!0&&(c.htmlBlock={i:Xt(Ro),l:q.HIGH,_(d,h,f){const[,b]=d[3].match(Vb),v=new RegExp(`^${b}`,"gm"),C=d[3].replace(v,""),S=(T=C,Kb.some(F=>F.test(T))?Xb:Pn);var T;const O=d[1].toLowerCase(),$=nb.indexOf(O)!==-1;f.m=f.m||O==="a";const A=$?d[3]:S(h,C,f);return f.m=!1,{attrs:s(d[2]),content:A,noInnerParse:$,tag:$?O:d[1]}},p:(d,h,f)=>n(d.tag,tn({key:f.g},d.attrs),d.noInnerParse?d.content:h(d.content,f))},c.htmlSelfClosing={i:Xt(Lo),l:q.HIGH,_:d=>({attrs:s(d[2]||""),tag:d[1]}),p:(d,h,f)=>n(d.tag,tn({},d.attrs,{key:f.g}))});const p=function(d){let h=Object.keys(d);function f(b,v){let C=[],S="";for(;b;){let T=0;for(;T<h.length;){const O=h[T],$=d[O],A=$.i(b,v,S);if(A){const F=A[0];b=b.substring(F.length);const U=$._(A,f,v);U.type==null&&(U.type=O),C.push(U),S=F;break}T++}}return C}return h.sort(function(b,v){let C=d[b].l,S=d[v].l;return C!==S?C-S:b<v?-1:1}),function(b,v){return f(function(C){return C.replace(db,`
`).replace(mb,"").replace(Db,"    ")}(b),v)}}(c),m=(x=function(d){return function(h,f,b){return d[h.type].p(h,f,b)}}(c),function d(h,f={}){if(Array.isArray(h)){const b=f.g,v=[];let C=!1;for(let S=0;S<h.length;S++){f.g=S;const T=d(h[S],f),O=typeof T=="string";O&&C?v[v.length-1]+=T:T!==null&&v.push(T),C=O}return f.g=b,v}return x(h,d,f)});var x;const g=r(t);return i.length?n("div",null,g,n("footer",{key:"footer"},i.map(function(d){return n("div",{id:e.slugify(d.identifier),key:d.identifier},d.identifier,m(p(d.footnote,{o:!0})))}))):g}(function(t){t[t.MAX=0]="MAX",t[t.HIGH=1]="HIGH",t[t.MED=2]="MED",t[t.LOW=3]="LOW",t[t.MIN=4]="MIN"})(q||(q={}));const tv=t=>{let{children:e,options:o}=t,n=function(r,s){if(r==null)return{};var i,a,c={},p=Object.keys(r);for(a=0;a<p.length;a++)s.indexOf(i=p[a])>=0||(c[i]=r[i]);return c}(t,tb);return l.exports.cloneElement(ev(e,o),n)};function nv(t){return l.exports.useCallback(e=>t[e]||"",[t])}function ov(t){return l.exports.useCallback(e=>{if(!e.includes(window.location.origin))return window.open(e,"_blank");const o=e.split(`${window.location.origin}/`).pop()?.replace("/",".").replace(/.md/,"");o&&t(n=>[...n,o])},[t])}function rv(t){return l.exports.useCallback(()=>{t(e=>e.slice(0,-1))},[t])}function sv(t,e){return l.exports.useCallback(()=>{e([t])},[e,t])}const iv=l.exports.memo(function({name:e="",index:o}){const n=l.exports.useRef(null),r=nv(o),[s,i]=l.exports.useState([e]);e!==s[0]&&i([e]);const a=ov(i),c=sv(e,i),p=rv(i),m=l.exports.useCallback(f=>{const b=/(?<=##.*?\n)([\s\S]*)/g;return f.replace(b,'<div className="details">$1</div>')},[]),x=l.exports.useMemo(()=>{const f=r(s[s.length-1]||"");return m(f)},[s,r,m]);l.exports.useEffect(()=>{n?.current&&n.current.querySelectorAll("a").forEach(b=>{b.addEventListener("click",v=>{v.preventDefault(),a(v.target.href)})})},[a,s,n]);const g=l.exports.useCallback(f=>{const b=f.target.nodeName==="H2"?f.target:f.target.closest("h2");b.classList.contains("active")?b.classList.remove("active"):b.classList.add("active")},[]),h={overrides:{h2:{component:l.exports.useCallback(({children:f,...b})=>u.exports.jsxs("h2",{...b,children:[f,u.exports.jsx(ve,{onClick:g,"aria-label":"Emoji",iconProps:{iconName:"AddTo"}})]}),[g])}}};return u.exports.jsxs(av,{ref:n,children:[u.exports.jsxs(lv,{children:[s.length>2?u.exports.jsx(_s,{onClick:p,iconProps:{iconName:"Back"},"aria-label":"Emoji"}):null,s.length>1?u.exports.jsx(_s,{onClick:c,iconProps:{iconName:"Home"},"aria-label":"Emoji"}):null]}),u.exports.jsx(tv,{options:h,children:x})]})}),av=_.div`
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
`,_s=_(ve)`
	font-size: 2.5rem;
`,lv=_.div`
	position: absolute;
	top: 0;
	right: 0;
`;class uv{get isLoading(){return this._isLoading}start(){this._isLoading=!0}stop(){this._isLoading=!1}constructor(){this._isLoading=!1}}const Ss={};function cv(t){const e=Ss[t];if(!e){const o=new uv;return Ss[t]=o,o}return e}var Ho;(function(t){t.Tables="tables",t.Steps="steps",t.Preview="preview"})(Ho||(Ho={}));const dv=l.exports.memo(function({toggle:e,onConfirm:o,show:n,title:r,subText:s}){const i=l.exports.useMemo(()=>({type:at.normal,title:r,subText:s}),[r,s]);return u.exports.jsx(Mi,{dialogContentProps:i,hidden:!n,onDismiss:e,children:u.exports.jsxs(Di,{children:[u.exports.jsx(Xo,{onClick:o,text:"Yes"}),u.exports.jsx(Yn,{onClick:e,text:"No"})]})})});var yt;(function(t){t.Table="table",t.Column="column"})(yt||(yt={}));function pv(t,e,o,n){const[r,s]=l.exports.useState(),[i,a]=l.exports.useState(),[c,{setTrue:p,setFalse:m}]=ln(!1),x=l.exports.useCallback(()=>{m(),s(void 0),a(void 0)},[s,a,m]),g=mv(s,a,p),d=l.exports.useCallback(S=>{n&&n(S,i),x()},[n,x,i]),h=fv(t,e,o,n),f=l.exports.useMemo(()=>`button-${Math.round(Math.random()*3)}`,[]),[b,v]=l.exports.useState(f);l.exports.useEffect(()=>{v(i!==void 0?`.step-card-${i}`:`#${f}`)},[f,i]);const C=l.exports.useCallback(()=>{p()},[p]);return{step:r,onDuplicateClicked:h,onDismissTransformModal:x,onEditClicked:g,onCreate:d,isTransformModalOpen:c,onStartNewStep:C,addStepButtonId:f,editorTarget:b}}function fv(t,e,o,n){const r=ta(e),s=na();return l.exports.useCallback(async i=>{const a=t===yt.Table?r(i.output):i.output,c=e?await e.table(i.output):o,p=await s(i,c?.columnNames()??[]),m={...i,args:p,input:i.output,output:a};n&&n(m)},[n,r,s,t,e,o])}function mv(t,e,o){return l.exports.useCallback((n,r)=>{t(n),e(r),o()},[t,o,e])}const hv=l.exports.memo(function({onDelete:e,onSave:o,onSelect:n,store:r,steps:s,type:i=yt.Table,table:a,...c}){const{onDeleteClicked:p,toggleDeleteModalOpen:m,isDeleteModalOpen:x,onConfirmDelete:g}=xx(e),{step:d,onDuplicateClicked:h,onEditClicked:f,onCreate:b,onDismissTransformModal:v,onStartNewStep:C,isTransformModalOpen:S,addStepButtonId:T,editorTarget:O}=pv(i,r,a,o);return u.exports.jsxs(xv,{children:[u.exports.jsx(XC,{onDeleteClicked:p,onSelect:n,onEditClicked:f,steps:s,onDuplicateClicked:h,onStartNewStep:C,buttonId:T}),u.exports.jsxs("div",{children:[i===yt.Table&&S&&u.exports.jsx(fw,{target:O,step:d,onTransformRequested:b,isOpen:S,store:r,onDismiss:v,styles:{calloutMain:{overflow:"hidden"}},...c}),i===yt.Column&&a&&u.exports.jsx(Jg,{step:d,table:a,onTransformRequested:b,isOpen:S,onDismiss:v,...c}),e&&u.exports.jsx(dv,{toggle:m,title:"Are you sure you want to delete this step?",subText:i===yt.Table?"You will also lose any table transformations made after this step.":"",show:x,onConfirm:g})]})]})}),xv=_.div`
	width: 97%;
	display: grid;
`,Ne=l.exports.memo(function(e){const o=gv(e.enumeration,e.labels);return u.exports.jsx(nt,{options:o,styles:ap,...e})});function gv(t,e){return l.exports.useMemo(()=>Object.entries(t).map(n=>{const[r,s]=n,i=e&&e[s]||bv(r);return{key:s,text:i}}),[t,e])}function bv(t){const e=t.replace(/([A-Z])/g," $1").trim().split(/\s/),o=e[0],n=e.slice(1).map(r=>r.toLocaleLowerCase());return[o,...n].join(" ")}const vv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=be(i,"args.groupby",r),p=be(i,"args.operation",r);return u.exports.jsxs(yv,{children:[u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:a,label:"Column to group by",selectedKey:i.args.groupby,onChange:c})}),u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,enumeration:cn,label:"Function",selectedKey:i.args.operation,onChange:p})})]})}),yv=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,Cv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"group by",value:r.groupby},{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),wv=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=be(n,"args.strategy",o),s=vt(n,"args.fixedcount",o),i=vt(n,"args.fixedwidth",o),a=vt(n,"args.min",o),c=vt(n,"args.max",o),p=cx(n,"args.clamped",o);return u.exports.jsxs(_v,{children:[u.exports.jsxs(fs,{children:[u.exports.jsx(Ne,{required:!0,enumeration:ze,label:"Bin strategy",selectedKey:n.args.strategy,onChange:r,styles:xt}),u.exports.jsxs(fn,{children:[u.exports.jsx(X,{condition:n.args.strategy===ze.FixedCount,children:u.exports.jsx(bt,{label:"Bin count",labelPosition:gt.top,min:1,max:100,step:1,value:n.args.fixedcount?`${n.args.fixedcount}`:void 0,styles:xt,onChange:s},"spin-count")}),u.exports.jsx(X,{condition:n.args.strategy===ze.FixedWidth,children:u.exports.jsx(bt,{label:"Bin size",labelPosition:gt.top,value:n.args.fixedwidth?`${n.args.fixedwidth}`:void 0,styles:xt,onChange:i},"spin-size")})]})]}),u.exports.jsx(on,{condition:n.args.strategy!==ze.Auto,children:u.exports.jsxs(lt,{children:[u.exports.jsxs(fs,{children:[u.exports.jsx(bt,{label:"Min boundary",labelPosition:gt.top,value:n.args.min?`${n.args.min}`:void 0,styles:xt,onChange:a}),u.exports.jsx(bt,{label:"Max boundary",labelPosition:gt.top,value:n.args.max?`${n.args.max}`:void 0,styles:xt,onChange:c})]}),u.exports.jsx(K,{children:u.exports.jsx(Ws,{label:"Clamp to min/max",checked:n.args.clamped,onChange:p})})]})})]})}),_v=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,Sv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column,sub:[{before:"using",value:r.strategy,after:"strategy",sub:r.strategy&&r.strategy!==ze.Auto&&r.strategy?[{value:r.strategy===ze.FixedCount?r.fixedcount:r.fixedwidth,after:r.strategy===ze.FixedCount?"bins":"bin width"},{before:"min",value:r.min},{before:"max",value:r.max},{value:r.clamped?"clamped":"not clamped"}]:void 0}]}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),kv=l.exports.memo(function({options:e,selectedKeys:o,onSelectAllOrNone:n,...r}){const s=l.exports.useMemo(()=>{const c=(o||[]).reduce((m,x)=>(m[x]=!0,m),{});return[...e.map(m=>{const x=!!c[m.key];return{...m,selected:x}}),{key:"--divider--",text:"-",itemType:1,selected:!1},{key:"--actions--",text:"",itemType:2,data:!0,selected:!1}]},[e,o]),i=l.exports.useCallback(c=>{n&&n(c?e:[])},[e,n]),a=l.exports.useCallback(c=>c?.data?u.exports.jsxs(Tv,{children:[u.exports.jsx(ks,{onClick:()=>i(!0),children:"All"}),u.exports.jsx(Iv,{children:"|"}),u.exports.jsx(ks,{onClick:()=>i(!1),children:"None"})]}):u.exports.jsx("span",{children:c?.text}),[i]);return u.exports.jsx(nt,{required:!0,multiSelect:!0,options:s,selectedKeys:o,styles:fe,onRenderOption:a,...r})}),Tv=_.div`
	display: flex;
	justify-content: space-around;
`,ks=_.a`
	cursor: pointer;
`,Iv=_.div`
	margin-left: 4px;
	margin-right: 4px;
	color: ${({theme:t})=>t.application().lowContrast().hex()};
`,Kt=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i}){const a=we(s||e.input,n,o),c=l.exports.useMemo(()=>e,[e]),p=l.exports.useCallback((g,d)=>{const{columns:h=[]}=c.args;let f=[...h];d&&(d.selected?f.push(d.key):f=f.filter(b=>b!==d.key)),r&&r({...c,args:{...c.args,columns:f}})},[c,r]),m=l.exports.useCallback(g=>{r&&r({...c,args:{...c.args,columns:g.map(d=>d.key)}})},[r,c]),x=l.exports.useMemo(()=>a?.columnNames().map(g=>({key:g,text:g}))||[],[a]);return u.exports.jsx(jv,{children:a?u.exports.jsx(kv,{required:!0,label:i||"Columns",placeholder:"Select columns",options:x,selectedKeys:c.args.columns,onChange:p,onSelectAllOrNone:m}):null})}),jv=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;function Dv(t){return l.exports.useMemo(()=>{const{operator:e}=t;return e===We.IsEmpty||e===We.IsNotEmpty||e===Ue.IsEmpty||e===Ue.IsNotEmpty||e===Ke.IsTrue||e===Ke.IsFalse||e===Ke.IsEmpty||e===Ke.IsNotEmpty},[t])}function Mv(t){return l.exports.useMemo(()=>{switch(t){case G.String:return"text or column";case G.Number:return"number or column";case G.Boolean:return"boolean or column"}},[t])}function Ov(t,e){const o=l.exports.useMemo(()=>t?Jo(t):{},[t]),n=l.exports.useMemo(()=>o[e],[o,e]),r=l.exports.useMemo(()=>s=>o[s]===n,[o,n]);return{type:n,columnFilter:r}}const Nv=l.exports.memo(function({table:e,column:o,criterion:n,onChange:r,suppressLabels:s=!1}){const i=l.exports.useCallback((h,f)=>{r&&r({...n,operator:f?.key})},[n,r]),a=l.exports.useCallback((h,f,b,v)=>{const C={...n,type:f?rn.Column:rn.Value,value:f?f.key:v};r&&r(C)},[n,r]),{type:c,columnFilter:p}=Ov(e,o),m=l.exports.useMemo(()=>{const h={required:!s,label:s?void 0:"Function",selectedKey:n.operator,onChange:i,styles:Av};if(o){if(c===G.String)return u.exports.jsx(Ne,{enumeration:Ue,...h});if(c===G.Boolean)return u.exports.jsx(Ne,{enumeration:Ke,...h})}const f={"=":"=","!=":"!=","<":"<","<=":"<=",">":">",">=":">="};return u.exports.jsx(Ne,{enumeration:We,...h,labels:f})},[c,o,n,i,s]),x=Dv(n),g=l.exports.useCallback(()=>r&&r(),[r]),d=Mv(c);return u.exports.jsxs(Ev,{children:[u.exports.jsxs(Pv,{children:[m,u.exports.jsx(cp,{required:!s,table:e,filter:p,disabled:x,label:s?void 0:"Comparison value",placeholder:d,text:n.value?`${n.value}`:void 0,onChange:a,styles:xt}),u.exports.jsx(ve,{title:"Remove this criterion",iconProps:{iconName:"Delete"},onClick:g})]}),c===G.String?u.exports.jsx(vx,{children:"String comparisons are not case-sensitive"}):null]})}),Ev=_.div`
	display: flex;
	flex-direction: column;
`,Pv=_.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
`,Av={root:{...xt.root,marginRight:12}};function Fv(t,e,o,n){const r={...t};dt(r,e,o),n&&n(r)}function br(t,e,o){return l.exports.useCallback((n,r)=>Fv(t,e,r?.key,o),[t,e,o])}const Na=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i="join"}){const a=l.exports.useMemo(()=>e,[e]),c=we(s||a.input,n,o),p=we(a.args.other,n,o),m=Bv(a),x=$v(a),g=br(a,"args.other",r),d=Rv(a,r),h=Lv(a,r);return u.exports.jsxs(Hv,{children:[u.exports.jsx(K,{children:u.exports.jsx(dr,{store:o,label:`${Oo(i)} table`,selectedKey:a.args.other,onChange:g})}),u.exports.jsx(K,{children:u.exports.jsx(Pe,{table:c,required:!0,label:`Input ${i} key`,selectedKey:m,onChange:d})}),u.exports.jsx(K,{children:u.exports.jsx(Pe,{table:p,label:`${Oo(i)} table key`,selectedKey:x,onChange:h})})]})});function Bv(t){return l.exports.useMemo(()=>t.args.on&&t.args.on.length>0?t.args.on[0]:void 0,[t])}function $v(t){return l.exports.useMemo(()=>t.args.on&&t.args.on.length>1?t.args.on[1]:void 0,[t])}function Rv(t,e){return l.exports.useCallback((o,n)=>{const r=t.args.on||[];r[0]=n.key,e&&e({...t,args:{...t.args,on:r}})},[t,e])}function Lv(t,e){return l.exports.useCallback((o,n)=>{const r=t.args.on;r&&(r[1]=n.key),e&&e({...t,args:{...t.args,on:r}})},[t,e])}const Hv=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
`,Ea=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,criteria:[...i.args.criteria||[],{}]}})},[i,r]),p=l.exports.useCallback((g,d)=>{const h=[...i.args.criteria];g===void 0?h.splice(d,1):h[d]=g,r&&r({...i,args:{...i.args,criteria:h}})},[i,r]),m=be(i,"args.logical",r),x=Vv(a,i.args.column,i.args.criteria,p);return u.exports.jsxs(Wv,{children:[x,u.exports.jsx(Wt,{onClick:c,iconProps:{iconName:"Add"},disabled:!a,children:"Add criteria"}),i.args.criteria.length>1?u.exports.jsx(K,{children:u.exports.jsx(Ne,{label:"Logical combination",enumeration:Ye,labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},selectedKey:i.args.logical,onChange:m})}):null]})});function Vv(t,e,o,n){return t?o.map((r,s)=>{const i=a=>n(a,s);return u.exports.jsx(Uv,{index:s,children:u.exports.jsx(Nv,{table:t,column:e,criterion:r,onChange:i,suppressLabels:s>0})},`filter-function-${s}`)}):null}const Wv=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,Uv=_.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({index:t})=>t>0?6:0}px;
`,Gv=l.exports.memo(function(e){return u.exports.jsx(Ea,{...e})}),Kv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r?.column,after:"row value",sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===rn.Column?"row value":""}))}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),zv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=l.exports.useCallback((g,d)=>{const{columns:h=[]}=i.args;let f=[...h];d&&(d.selected?f.push(d.key):f=f.filter(b=>b!==d.key)),r&&r({...i,args:{...i.args,columns:f}})},[i,r]),p=br(i,"args.operator",r),m=l.exports.useMemo(()=>{const g=a?.columnNames()||[],d=(i.args.columns||[]).reduce((h,f)=>(h[f]=!0,h),{});return g.map(h=>{const f=i.args?.columns&&!!d[h];return{key:h,text:h,selected:f}})},[a,i]),x=l.exports.useMemo(()=>m.filter(g=>g.selected).map(g=>g.key),[m]);return u.exports.jsxs(qv,{children:[u.exports.jsx(K,{children:a?u.exports.jsx(nt,{label:"Columns",styles:fe,multiSelect:!0,options:m,selectedKeys:x,onChange:c}):null}),u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,label:"Logical operator",labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},enumeration:Ye,selectedKey:i.args.operator,onChange:p})})]})}),qv=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,Yv=9;function Be(t,e,o,n){let r=Yv-o;n.showInput&&r--,n.showOutput&&r--;const s=t.map(e),i=s.slice(0,r),a=s.length-i.length;return a>0&&i.splice(r-1,2,{before:`+${a+1} more...`,value:"",title:s.slice(r-1).map(c=>[c.before,c.value,c.after].join(" ")).join(`
`)}),i}const Jv=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns||[],i=>({value:i}),3,e);return[{before:`combine column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"using operator",value:r.operator}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),wn=l.exports.memo(function(e){return u.exports.jsx(Kt,{...e})}),_n=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns||[],i=>({value:i}),1,e);return[{before:`with column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(se,{...e,rows:o})});function Zv(t,e){if(t!==void 0&&e!==void 0)return(t?Jo(t):{})[e]}const Xv=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),[c,p]=l.exports.useState(),m=be(i,"args.type",r),x=Fe(i,"args.radix",r),g=l.exports.useCallback((d,h,f,b)=>{const v=Gt(e);dt(v,"args.formatPattern",h?h.key:b),r&&r(v)},[e,r]);return l.exports.useEffect(()=>{p(!1),i.args.columns.forEach(d=>{Zv(a,d)===G.Date&&p(!0)})},[i.args.columns,a]),u.exports.jsxs(Qv,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(Kt,{label:"Columns to convert",step:e,store:o,onChange:r})}),u.exports.jsx(Ze,{children:u.exports.jsx(Ne,{required:!0,label:"Data type",enumeration:Je,selectedKey:i.args.type,onChange:m})}),i.args.type===Je.Integer?u.exports.jsx(Ze,{children:u.exports.jsx(ke,{label:"Base (radix)",value:i.args.radix?`${i.args.radix}`:"",styles:fe,onChange:x})}):null,c||i.args.type===Je.Date?u.exports.jsx(Ze,{children:u.exports.jsx(pp,{required:i.args.type===Je.Date,label:"Date format pattern",placeholder:"pattern",text:i.args.formatPattern?`${i.args.formatPattern}`:void 0,onChange:g,styles:fe})}):null]})}),Qv=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,ey=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns,i=>({value:i}),3,e);return[{before:`convert column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"to type",value:r.type,sub:r.type===Je.Integer?[{before:"with base",value:r.radix}]:void 0}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),ty=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||e.input,n,o),c=be(i,"args.column1",r),p=be(i,"args.column2",r),m=be(i,"args.operator",r);return u.exports.jsxs(ny,{children:[u.exports.jsx(K,{children:u.exports.jsx(Pe,{table:a,required:!0,label:"Column one",selectedKey:i.args.column1,onChange:c})}),u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,enumeration:en,label:"Operation",selectedKey:i.args.operator,onChange:m})}),u.exports.jsx(K,{children:u.exports.jsx(Pe,{table:a,required:!0,label:"Column two",selectedKey:i.args.column2,onChange:p})})]})}),ny=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,oy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{value:`${r.column1||""} ${r.operator||""} ${r.column2||""}`}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),ry=l.exports.memo(function({step:e,store:o,onChange:n}){const r=l.exports.useMemo(()=>e,[e]),s=Fe(r,"args.value",n);return u.exports.jsxs(sy,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(Kt,{label:"Columns to erase",step:e,store:o,onChange:n})}),u.exports.jsx(Ze,{children:u.exports.jsx(ke,{required:!0,label:"Value to be erased",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:fe,onChange:s})})]})}),sy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,iy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns,i=>({value:i}),3,e);return[{before:`erase column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),ay=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.url",o),s=Fe(n,"args.delimiter",o),i=vt(n,"args.autoMax",o);return u.exports.jsxs(ly,{children:[u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,label:"URL",value:n.args.url&&`${n.args.url}`,placeholder:"URL to public dataset",styles:fe,onChange:r})}),u.exports.jsx(K,{children:u.exports.jsx(ke,{label:"Delimiter",value:n.args.delimiter&&`${n.args.delimiter}`,placeholder:"Column delimiter",styles:fe,onChange:s})}),u.exports.jsx(K,{children:u.exports.jsx(bt,{label:"Automax",labelPosition:gt.top,min:0,max:1e7,step:1,value:n.args.autoMax?`${n.args.autoMax}`:void 0,styles:fe,onChange:i},"Automax")})]})}),ly=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,uy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"url",value:r.url},{before:"with delimiter",value:r.delimiter}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),cy=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.value",o);return u.exports.jsx(dy,{children:u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,label:"Fill value",value:n.args.value&&`${n.args.value}`,placeholder:"text, number, or boolean",styles:fe,onChange:r})})})}),dy=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,py=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with value",value:r.value}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),fy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r.column,sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===rn.Column?"row value":""}))}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),my=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=Fe(i,"args.to[0]",r),c=Fe(i,"args.to[1]",r);return u.exports.jsxs(hy,{children:[u.exports.jsx(K,{children:u.exports.jsx(Kt,{step:e,store:o,table:n,onChange:r,input:s})}),u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,label:"Key name to use",placeholder:"Key name to use",value:i.args.to!==void 0?i.args.to[0]:"",styles:fe,onChange:a})}),u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,label:"Value name to use",placeholder:"Value name to use",value:i.args.to!==void 0?i.args.to[1]:"",styles:fe,onChange:c})})]})}),hy=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,xy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns||[],i=>({value:i}),3,e);return[{before:`column${(r.columns||[]).length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"into key column",value:r.to!==void 0?r.to[0]:""},{before:"into value column",value:r.to!==void 0?r.to[1]:""}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),gy=l.exports.memo(function({step:e,store:o,onChange:n}){const r=l.exports.useMemo(()=>e,[e]),s=Fe(r,"args.value",n);return u.exports.jsxs(by,{children:[u.exports.jsx(Ze,{children:u.exports.jsx(Kt,{label:"Columns to impute",step:e,store:o,onChange:n})}),u.exports.jsx(Ze,{children:u.exports.jsx(ke,{required:!0,label:"Fill value",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:fe,onChange:s})})]})}),by=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,vy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns,i=>({value:i}),3,e);return[{before:`impute column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),yy=l.exports.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.exports.useMemo(()=>e,[e]),i=be(s,"args.strategy",r);return u.exports.jsxs(Cy,{children:[u.exports.jsx(Na,{step:e,store:o,table:n,onChange:r}),u.exports.jsx(Ze,{children:u.exports.jsx(Ne,{required:!0,label:"Join strategy",enumeration:it,selectedKey:s.args.strategy||it.Inner,styles:fe,onChange:i})})]})}),Cy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,wy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with",value:r.other},{before:"on",value:r.on?.join(" | ")}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),_y=l.exports.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.exports.useMemo(()=>e,[e]);return u.exports.jsxs(Sy,{children:[u.exports.jsx(Na,{label:"lookup",step:e,store:o,table:n,onChange:r}),u.exports.jsx(Ze,{children:u.exports.jsx(Kt,{label:"Columns to copy",step:e,store:o,onChange:r,input:s.args.other})})]})}),Sy=_.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,ky=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns,i=>({value:i}),3,e);return[{before:"lookup from",value:r.other},{before:"on",value:r.on?.join(" | ")},{before:"copy columns",value:r.columns.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),Ty=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=l.exports.useCallback((d,h)=>{const{columns:f=[]}=i.args;let b=[...f];h&&(h.selected?b.push(h.key):b=b.filter(v=>v!==h.key)),r&&r({...i,args:{...i.args,columns:b}})},[i,r]),p=br(i,"args.strategy",r),m=Fe(i,"args.delimiter",r),x=l.exports.useMemo(()=>{const d=a?.columnNames()||[],h=(i.args.columns||[]).reduce((f,b)=>(f[b]=!0,f),{});return d.map(f=>{const b=i.args?.columns&&!!h[f];return{key:f,text:f,selected:b}})},[a,i]),g=l.exports.useMemo(()=>x.filter(d=>d.selected).map(d=>d.key),[x]);return u.exports.jsxs(Iy,{children:[u.exports.jsx(K,{children:a?u.exports.jsx(nt,{label:"Columns",styles:fe,multiSelect:!0,options:x,selectedKeys:g,onChange:c}):null}),u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,label:"Merge strategy",enumeration:Ft,selectedKey:i.args.strategy,onChange:p})}),i.args.strategy===Ft.Concat?u.exports.jsx(K,{children:u.exports.jsx(ke,{label:"Delimiter",placeholder:"Text delimiter",value:i.args.delimiter&&`${i.args.delimiter}`,styles:fe,onChange:m})}):null]})}),Iy=_.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,jy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.columns||[],i=>({value:i}),1,e);return[{before:`column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"with strategy",value:r.strategy}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),Ts=l.exports.memo(function(){return null}),Is=l.exports.memo(function(e){const o=l.exports.useMemo(()=>[],[]);return u.exports.jsx(se,{...e,rows:o})}),Dy=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=Fe(n,"args.prefix",o);return u.exports.jsx(My,{children:u.exports.jsx(K,{children:u.exports.jsx(ke,{label:"Prefix",value:n.args.prefix&&`${n.args.prefix}`,styles:fe,onChange:r})})})}),My=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,Oy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:"with prefix",value:r.prefix}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),Ny=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||e.input,n,o),c=Py(i,a,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,orders:[...i.args.orders||[],Ey(a)]}})},[i,a,r]);return u.exports.jsxs(Ay,{children:[c,u.exports.jsx(Wt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add sort"})]})});function Ey(t){const e=t?.columnNames()[0],o=je.Ascending;return{column:e,direction:o}}function Py(t,e,o){return l.exports.useMemo(()=>(t.args.orders||[]).map((n,r)=>{const s=a=>{const c={...t};dt(c,`args.orders[${r}]`,a),o&&o(c)},i=()=>{const a={...t};a.args.orders.splice(r,1),o&&o(a)};return u.exports.jsx(nx,{table:e,order:n,onChange:s,onDelete:i},`orderby-${n.column}-${r}`)}),[t,e,o])}const Ay=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,Fy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.orders||[],i=>({value:i.column,after:i.direction}),1,e);return[{before:"order",value:r.orders?.length===0?void 0:"",sub:s}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),By=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=be(i,"args.key",r),p=be(i,"args.value",r),m=be(i,"args.operation",r);return u.exports.jsxs($y,{children:[u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:p})}),u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,enumeration:cn,label:"Function",selectedKey:i.args.operation,onChange:m})})]})}),$y=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,Ry=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(se,{...e,rows:o})});function Ly(t,e){return l.exports.useMemo(()=>{const{column:o}=t.args;if(!e||!o)return[];const n={[o]:Ee.array_agg_distinct(o)};return e.orderby(o).rollup(n).get(o,0)},[e,t])}function Hy(t,e){return l.exports.useCallback((o,n,r)=>{const s={...t.args.map};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,map:s}})},[t,e])}function Vy(t,e){return l.exports.useCallback(o=>{const n={...t.args};delete n.map[o],e&&e({...t,args:{...t.args,...n}})},[t,e])}function Wy(t,e){return e.find(o=>t.args.map?t.args.map[o]===void 0:!0)}function Uy(t,e,o){return l.exports.useCallback(()=>{const n=Wy(t,e);n!==void 0&&o&&o({...t,args:{...t.args,map:{...t.args.map,[n]:n}}})},[t,e,o])}function Gy(t,e){return e.length===0||!t.args.column?!0:e.length===Object.keys(t.args.map||{}).length}const Ky=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||e.input,n,o),c=Ly(i,a),p=fx(a,i.args.column),m=Hy(i,r),x=Vy(i,r),g=Uy(i,c,r),d=zy(a,i,c,p,m,x),h=Gy(i,c);return u.exports.jsxs(qy,{children:[d,u.exports.jsx(Wt,{onClick:g,iconProps:{iconName:"Add"},disabled:h,children:"Add mapping"})]})});function zy(t,e,o,n,r,s){return l.exports.useMemo(()=>{const{map:i}=e.args;return Object.entries(i||{}).map((a,c)=>{const[p,m]=a,x=Nr(p,n),g=b=>b===x?!0:!(e.args.map&&e.args.map[b]),d=(b,v)=>r(x,v?.key||x,m),h=(b,v)=>{const C=Nr(v,n);r(x,x,C)},f=()=>s(x);return u.exports.jsxs(Yy,{children:[u.exports.jsx(dp,{column:e.args.column,table:t,values:o,filter:g,label:void 0,selectedKey:x,onChange:d,styles:{root:{width:130}}}),u.exports.jsx(Xe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.exports.jsx(ke,{placeholder:"New value",value:m,onChange:h,styles:{root:{width:130}}}),u.exports.jsx(ve,{title:"Remove this Recode",iconProps:{iconName:"Delete"},onClick:f})]},`column-Recode-${x}-${c}`)})},[t,e,o,n,r,s])}const qy=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,Yy=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,Jy=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.map||{}),i=Be(s,a=>({value:`${a[0]} -> ${a[1]}`}),2,e);return[{before:"from column",value:r.column},{before:"values",value:s.length===0?void 0:"",sub:i}]},[e]);return u.exports.jsx(se,{...e,rows:o})});function Zy(t,e){return l.exports.useCallback((o,n,r)=>{const s={...t.args.columns};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,columns:s}})},[t,e])}function Xy(t,e){return e?.columnNames().find(o=>t.args.columns?!t.args.columns[o]:!0)}function Qy(t,e,o){return l.exports.useCallback(()=>{const n=Xy(t,e);n&&o&&o({...t,args:{...t.args,columns:{...t.args.columns,[n]:n}}})},[t,e,o])}function eC(t,e){return e?e.columnNames().length===Object.keys(t.args.columns||{}).length:!0}const tC=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||e.input,n,o),c=Zy(i,r),p=dx(i,r),m=Qy(i,a,r),x=nC(a,i,c,p),g=eC(i,a);return u.exports.jsxs(oC,{children:[u.exports.jsx(Un,{children:"Column renames"}),x,u.exports.jsx(Wt,{onClick:m,iconProps:{iconName:"Add"},disabled:g,children:"Add rename"})]})});function nC(t,e,o,n){return l.exports.useMemo(()=>{const{columns:r}=e.args;return Object.entries(r||{}).map((s,i)=>{const[a,c]=s,p=d=>d===a?!0:!(e.args.columns&&e.args.columns[d]),m=(d,h)=>o(a,h?.key||a,c),x=(d,h)=>{o(a,a,h??"")},g=()=>n(a);return u.exports.jsxs(rC,{children:[u.exports.jsx(Pe,{table:t,filter:p,label:void 0,selectedKey:a,onChange:m,styles:{root:{width:130}}}),u.exports.jsx(Xe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.exports.jsx(ke,{placeholder:"New name",value:c,onChange:x,styles:{root:{width:130}}}),u.exports.jsx(ve,{title:"Remove this rename",iconProps:{iconName:"Delete"},onClick:g})]},`column-rename-${a}-${i}`)})},[t,e,o,n])}const oC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,rC=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,sC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.columns||{}),i=Be(s,a=>({value:`${a[0]} -> ${a[1]}`}),1,e);return[{before:"columns",value:s.length===0?void 0:"",sub:i}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),iC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=be(n,"args.operation",o);return u.exports.jsx(aC,{children:u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,enumeration:cn,label:"Function",selectedKey:n.args.operation,onChange:r})})})}),aC=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,lC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),uC=Yo("d"),cC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=vt(n,"args.size",o),s=vt(n,"args.proportion",o,i=>i&&+i/100);return u.exports.jsx(dC,{children:u.exports.jsxs(K,{children:[u.exports.jsx(bt,{label:"Number of rows",labelPosition:gt.top,min:0,step:1,disabled:!!n.args.proportion,value:n.args.size?`${n.args.size}`:"",styles:js,onChange:r}),u.exports.jsx(pC,{children:"or"}),u.exports.jsx(bt,{label:"Row percentage",labelPosition:gt.top,min:0,max:100,step:1,disabled:!!n.args.size,value:n.args.proportion?`${uC(n.args.proportion*100)}`:"",styles:js,onChange:s})]})})}),dC=_.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,pC=_.div`
	margin-left: 8px;
	margin-right: 8px;
	height: 100%;
	display: flex;
	align-items: center;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,js={root:{width:120}},fC=Yo(".0%"),mC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"random",value:r.size||fC(r.proportion||0),after:r.size?r.size===1?"row":"rows":" of rows"}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),Sn=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=hC(i,o,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,others:[...i.args.others,""]}})},[i,r]);return u.exports.jsxs(xC,{children:[u.exports.jsx(Un,{children:"With tables"}),c,u.exports.jsx(Wt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add table"})]})});function hC(t,e,o){return l.exports.useMemo(()=>t.args.others.map((n,r)=>{const s=()=>{const i={...t};i.args.others.splice(r,1),o&&o(i)};return e?u.exports.jsxs(K,{children:[u.exports.jsx(dr,{label:"",store:e,selectedKey:n,onChange:(i,a)=>{const c={...t};a&&(c.args.others[r]=`${a.key}`),o&&o(c)}}),u.exports.jsx(ve,{title:"Remove this table",iconProps:{iconName:"Delete"},onClick:s})]},`set-op-${n}-${r}`):null}),[t,e,o])}const xC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,kn=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n,s=Be(r.others,i=>({value:i}),1,e);return[{before:"with",value:r.others.length>0?"":null,sub:s}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),gC=l.exports.memo(function({column:e,onChange:o,onDelete:n}){const r=l.exports.useCallback((i,a)=>{o&&o(a)},[o]),s=l.exports.useCallback(()=>n&&n(),[n]);return u.exports.jsxs(bC,{children:[u.exports.jsx(ke,{value:e,onChange:r,styles:fe}),u.exports.jsx(ve,{title:"Remove this column",iconProps:{iconName:"Delete"},onClick:s})]})}),bC=_.div`
	display: flex;
	justify-content: flex-start;
`,vC=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||e.input,n,o),c=CC(i,r),p=l.exports.useCallback(()=>{r&&r({...i,args:{...i.args,to:[...i.args.to,yC(i.args.to)]}})},[i,r]),m=be(e,"args.column",r);return u.exports.jsxs(wC,{children:[u.exports.jsx(Pe,{required:!0,table:a,label:"Column to spread",selectedKey:e.args.column,onChange:m}),u.exports.jsx(Un,{children:"New column names"}),c,u.exports.jsx(Wt,{onClick:p,iconProps:{iconName:"Add"},disabled:!a,children:"Add column"})]})});function yC(t){return`New column (${t.length})`}function CC(t,e){return l.exports.useMemo(()=>(t.args.to||[]).map((o,n)=>{const r=i=>{const a={...t};dt(a,`args.to[${n}]`,i),e&&e(a)},s=()=>{const i={...t};i.args.to.splice(n,1),e&&e(i)};return u.exports.jsx(gC,{column:o,onChange:r,onDelete:s},`column-list-${n}`)}),[t,e])}const wC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,_C=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:`as column${(r.to||[]).length!==1?"s":""}`,value:r.to?r.to.join(", "):null}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),SC=l.exports.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.exports.useMemo(()=>e,[e]),a=we(s||i.input,n,o),c=be(i,"args.key",r),p=be(i,"args.value",r);return u.exports.jsxs(kC,{children:[u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:p})})]})}),kC=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,TC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),IC=l.exports.memo(function({step:e,onChange:o}){const n=l.exports.useMemo(()=>e,[e]),r=be(n,"args.operation",o);return u.exports.jsx(jC,{children:u.exports.jsx(K,{children:u.exports.jsx(Ne,{required:!0,label:"Function",enumeration:Ks,selectedKey:n.args.operation,onChange:r})})})}),jC=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,DC=l.exports.memo(function(e){const o=l.exports.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"window column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.exports.jsx(se,{...e,rows:o})}),MC={aggregate:Cv,bin:Sv,binarize:Kv,boolean:Jv,concat:kn,convert:ey,dedupe:_n,derive:oy,difference:kn,erase:iy,fetch:uy,fill:py,filter:fy,fold:xy,groupby:_n,impute:vy,intersect:kn,join:wy,lookup:ky,merge:jy,onehot:Oy,orderby:Fy,pivot:Ry,recode:Jy,rename:sC,rollup:lC,sample:mC,select:_n,spread:_C,unfold:TC,ungroup:Is,union:kn,unorder:Is,unroll:_n,window:DC};function OC(t){const e=MC[t.verb];if(!e)throw new Error(`could not find step with verb ${t?.verb}`);return e}function NC(t,e,o,n,r,s){return l.exports.useMemo(()=>{const i=[];return s&&i.push({iconProps:Tn.preview,onClick:()=>s(t?.output),title:"Preview table"}),o&&i.push({iconProps:Tn.edit,onClick:()=>o(t,e),title:"Edit step"}),r&&i.push({iconProps:Tn.duplicate,onClick:()=>r(t),title:"Duplicate step"}),n&&i.push({iconProps:Tn.delete,onClick:()=>n&&n(e),title:"Delete step"}),i},[t,e,o,n,r,s])}const Tn={preview:{iconName:"View"},edit:{iconName:"Edit"},duplicate:{iconName:"DuplicateRow"},delete:{iconName:"Delete"}},EC=l.exports.memo(function({step:e,index:o,onEdit:n,onDelete:r,onDuplicate:s,onSelect:i}){const a=l.exports.useMemo(()=>OC(e),[e]),c=NC(e,o,n,r,s,i);return u.exports.jsxs(AC,{styles:Ds.card,children:[u.exports.jsx(PC,{children:u.exports.jsx(a,{step:e,showInput:!0,showOutput:!0,showOutputColumn:!0})}),u.exports.jsx(Xd,{className:`step-card-${o}`,styles:Ds.actions,actions:c})]})}),Ds={card:{root:{minWidth:"unset"}},actions:{root:{padding:"unset"}}},PC=_.div`
	padding: 8px;
`,AC=_(Gd)`
	min-width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`,Pa=l.exports.memo(function(e){const{defaultMenuItemRenderer:o,items:n}=e,r=l.exports.useMemo(()=>n.map(s=>Rn({},s,{itemProps:Ms,sectionProps:s.sectionProps?{items:s.sectionProps.items.map(i=>Rn({},i,{itemProps:Ms}))}:void 0})),[n]);return u.exports.jsx(FC,{children:r.map(s=>{const{key:i}=s;return u.exports.jsxs(BC,{children:[u.exports.jsx($C,{children:s.sectionProps?.title}),s.itemType===Rt.Section?u.exports.jsx(u.exports.Fragment,{children:s.sectionProps?.items.map(a=>o(a))}):o(s)]},`menu-group-${i}`)})})}),Ms={styles:{root:{paddingLeft:8,height:28,lineHeight:28},item:{listStyleType:"none"}}},FC=_.div`
	display: flex;
	padding: 8px 0 8px 0;
	gap: 12px;
`,BC=_.div`
	min-width: 120px;
`,$C=_.div`
	padding: 0 12px 0 12px;
	margin-bottom: 8px;
	font-weight: bold;
	color: ${({theme:t})=>t.application().accent().hex()};
`,Aa=l.exports.memo(function(e){const{onRenderMenuList:o}=e,n=l.exports.useCallback(s=>o?o(s):u.exports.jsx(Pa,{...s}),[o]),r=l.exports.useMemo(()=>({...e,onRenderMenuList:n}),[e,n]);return u.exports.jsx(Yn,{styles:lp,text:e.text,menuProps:r})});function RC(t,e){const o=l.exports.useCallback(()=>{e(t)},[t,e]),n=LC(t,e);return{onClear:o,onEscape:o,onChange:n}}function LC(t,e){return l.exports.useCallback((o,n)=>{const r=[];t.forEach(s=>{if(s.itemType===Rt.Normal)Os(s,n)&&r.push(s);else if(s.itemType===Rt.Section){const i=s.sectionProps?.items.filter(a=>Os(a,n))||[];r.push({...s,sectionProps:{...s.sectionProps,items:i}})}else r.push(s)}),e(r)},[t,e])}function Os(t,e){const o=t.text?t.text.toLowerCase():"",n=e&&e.toLowerCase()||"";return o.indexOf(n)!==-1}const HC={root:{margin:"8px"}},VC=l.exports.memo(function({items:e,onSearch:o}){const n=RC(e,o);return u.exports.jsx(ip,{ariaLabel:"Find a verb by text",placeholder:"Find a verb",styles:HC,...n})}),WC=[{label:"Aggregates",verbs:["aggregate","groupby","ungroup","pivot","orderby","unorder","rollup","unroll","window"]},{label:"Transform column",verbs:["bin","binarize","convert","erase","fill","impute","recode"]},{label:"Combine columns",verbs:["boolean","derive","fold","unfold","onehot","merge","spread"]},{label:"Filter & Select",verbs:["fetch","filter","rename","sample","select"]},{label:"Joins & Sets",verbs:["concat","dedupe","difference","intersect","join","lookup","union"]}];function UC(){return l.exports.useMemo(()=>WC.map(t=>({key:`__section-${t.label}__`,itemType:Rt.Section,sectionProps:{title:t.label,items:t.verbs.map(e=>{const o=Object.entries(V).find(n=>n[1]===e);return{key:o[1],text:o[0]}})}})),[])}function GC(){const t=UC(),[e,o]=l.exports.useState(t),n=l.exports.useCallback(s=>o(s),[o]),r=l.exports.useCallback(()=>o(t),[t]);return{items:t,filtered:e,onSearch:n,onSearchReset:r}}function KC(t,e,o,n){const[r,s]=l.exports.useState(t);l.exports.useEffect(()=>{t&&s(t)},[t]);const i=l.exports.useCallback(()=>{r&&e&&e(r)},[r,e]),a=l.exports.useCallback((p,m)=>{s(m.key),!o&&e&&e(m.key)},[o,e,s]);return{text:zC(r,n),onButtonClick:i,onItemClick:a}}function zC(t,e){return l.exports.useMemo(()=>ya(V,t)||e,[t,e])}const qC=l.exports.memo(function({onCreate:e,showButton:o,verb:n,placeholder:r="Choose a verb"}){const{text:s,onButtonClick:i,onItemClick:a}=KC(n,e,o,r),{items:c,filtered:p,onSearch:m,onSearchReset:x}=GC(),g=l.exports.useCallback(h=>u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(JC,{children:u.exports.jsx(VC,{items:c,onSearch:m})}),u.exports.jsx(Pa,{...h})]}),[m,c]),d={items:p,onRenderMenuList:g,onItemClick:a,onDismiss:x};return u.exports.jsxs(YC,{children:[u.exports.jsx(Aa,{text:s,...d}),o&&u.exports.jsx(ve,{iconProps:{iconName:"Add"},onClick:i})]})}),YC=_.div`
	width: 240px;
	display: flex;
	align-items: center;
`,JC=_.div`
	border-bottom: 1px solid
		${({theme:t})=>t.application().lowContrast().hex()};
`,vr=l.exports.memo(function({text:e,style:o}){return u.exports.jsx(ZC,{style:o,children:e})}),ZC=_.div`
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,XC=l.exports.memo(function({steps:e,onDeleteClicked:o,onEditClicked:n,onDuplicateClicked:r,onSelect:s,onStartNewStep:i,buttonId:a}){const c=l.exports.useRef(null);return l.exports.useEffect(()=>{(()=>{c?.current?.scrollIntoView(!1)})()},[e]),u.exports.jsxs(t0,{children:[e?.map((p,m)=>u.exports.jsx(EC,{onDelete:o,onEdit:n,onDuplicate:r,onSelect:s,step:p,index:m},m)),i&&u.exports.jsxs(n0,{ref:c,children:[u.exports.jsx(Yn,{styles:QC,iconProps:e0.add,onClick:i,id:a,children:"Add step"}),!e?.length&&u.exports.jsx(vr,{text:"Add your first preparation step"})]})]})}),QC={root:{padding:"0 4px 0 6px",whiteSpace:"nowrap"}},e0={add:{iconName:"Add"}},t0=_.div`
	display: flex;
	overflow: auto;
	column-gap: 12px;
`,n0=_.div`
	display: flex;
	align-items: center;
	gap: 18px;
`;function o0(t,e,o,n){const r=Ns(t),s=Ns(e),i=l.exports.useMemo(()=>[{key:"__input-tables__",itemType:Rt.Section,sectionProps:{title:"Inputs",items:r.sort()}},{key:"__derived-tables__",itemType:Rt.Section,sectionProps:{title:"Derived",items:s}}],[r,s]),a=l.exports.useCallback((p,m)=>n&&n(m.key),[n]);return{text:l.exports.useMemo(()=>o||"Choose table",[o]),items:i,onItemClick:a}}function r0(t,e){const o=l.exports.useMemo(()=>{if(t&&t.length>0)return t[t.length-1].id},[t]);return{onClick:l.exports.useCallback(()=>{o&&e&&e(o)},[o,e])}}function Ns(t){return l.exports.useMemo(()=>t.map(e=>({key:e.id,text:e.name||e.id})),[t])}const s0=_.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 18px;
`,i0={root:{padding:"0 4px 0 6px"}},a0=l.exports.memo(function({inputs:e,derived:o,onSelect:n,selected:r,loading:s}){const{onClick:i}=r0(o,n),a=o0(e,o,r,n);return u.exports.jsxs(s0,{children:[u.exports.jsx(Aa,{...a}),s&&u.exports.jsx(_u,{size:Su.xSmall}),o.length>0?u.exports.jsx(Yn,{styles:i0,iconProps:l0,onClick:i,children:"View output table"}):null,!r&&u.exports.jsx(vr,{text:"Select an input or derived table to preview"})]})}),l0={iconName:"View"};function u0(t,e){return l.exports.useCallback(async o=>{const n=t.list();o.forEach(s=>{n.includes(s.id)||t.set({id:s.id,table:s?.table})});const r=await t.toMap();e(r)},[t,e])}function c0(t,e){return l.exports.useCallback(o=>{let n=[...e||[]];n=n.slice(0,o),t(n)},[e,t])}function d0(t,e){return l.exports.useCallback((o,n)=>{if(n!==void 0){const r=[...e||[]];r[n]=o,t(r)}else{const r=[...e||[],o];t(r)}},[e,t])}function p0(t,e,o){return l.exports.useCallback(async n=>{const r=await e.get(o);r.metadata=n,e.delete(r.id),e.set(r);const s=await e.toMap();t(s)},[e,o,t])}function f0(t,e,o){return l.exports.useCallback(async()=>{if(t.steps.length){const r=await t.run();o&&o(r.id)}const n=await t.store.toMap();e&&e(n)},[t,e,o])}function m0(t){const[e,o]=l.exports.useState(t??{});return{changeTableFeatures:l.exports.useCallback(r=>{const s=r;o({...e,[s]:!e[s]})},[e,o]),tableFeatures:e}}function h0(t,e,o,n){const[r,s]=l.exports.useState(),[i,a]=l.exports.useState(new Map),c=mx(),p=hx(c),m=f0(p,a,s),x=u0(c,a),{isLoading:g}=cv(Ho.Tables),d=l.exports.useMemo(()=>{const T=new Set;return o?.forEach(O=>T.add(O.output)),Array.from(T).map(O=>({id:O}))},[o]),h=l.exports.useMemo(()=>i.get(r??"")?.table,[r,i]),f=l.exports.useMemo(()=>i.get(r??"")?.metadata,[i,r]),b=l.exports.useMemo(()=>{if(r)return r;if(d&&d.length>0){const T=d[d.length-1];if(T)return T.id}return t[0]?.id||""},[t,r,d]);l.exports.useEffect(()=>{if(t.length){x(t);const T=t[t.length-1];s(T?.id)}},[t,x,s]),l.exports.useEffect(()=>{if(b&&n){const T=i.get(b);T&&n(T)}},[i,b,n]),l.exports.useEffect(()=>{i.size>0&&(o?.filter(T=>!p.steps?.includes(T)).length||o?.length!==p.steps.length)&&(p.clear(),o&&p.addAll(o),m())},[o,p,m,i]);const v=d0(e,o),C=c0(e,o),S=p0(a,c,r);return{selectedTable:h,setSelectedTableName:s,onDeleteStep:C,onSaveStep:v,store:c,selectedMetadata:f,lastTableName:b,selectedTableName:r,derived:d,onUpdateMetadata:S,tablesLoading:g}}const x0=l.exports.memo(function({tables:e,onUpdateSteps:o,steps:n,outputHeaderCommandBar:r,onOutputTable:s,stepsPosition:i="bottom"}){const[a,{toggle:c}]=ln(!1),{selectedTable:p,selectedTableName:m,setSelectedTableName:x,onDeleteStep:g,onSaveStep:d,store:h,lastTableName:f,derived:b,selectedMetadata:v,onUpdateMetadata:C,tablesLoading:S}=h0(e,o,n,s);return u.exports.jsxs(g0,{children:[u.exports.jsxs(b0,{children:[u.exports.jsx(Co,{children:"Tables"}),u.exports.jsx(a0,{loading:S,inputs:e,derived:b,selected:m,onSelect:x})]}),u.exports.jsxs(y0,{stepsPosition:i,isCollapsed:a,className:"steps",children:[u.exports.jsxs(Co,{isCollapsed:a,onClick:c,children:["Steps ",u.exports.jsx(Xe,{iconName:"ChevronDown"})]}),u.exports.jsx(C0,{children:u.exports.jsx(hv,{nextInputTable:f,onDelete:g,onSave:d,onSelect:x,store:h,steps:n})})]}),u.exports.jsxs(v0,{stepsPosition:i,isCollapsed:a,children:[u.exports.jsx(Co,{children:"Preview"}),u.exports.jsx(_0,{onChangeMetadata:C,headerCommandBar:r,table:p,metadata:v,name:m})]})]})}),ut=18,Vo=60,Fa=280,Ba=50,Co=_.span`
	margin: 0 ${ut}px 0 ${ut}px;
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
`,g0=_.div`
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	padding: ${ut}px 0 ${ut}px 0;
	gap: ${ut}px;
	position: relative;
`,b0=_.div`
	display: flex;
	min-height: ${Vo}px;
	flex: 0 1 ${Vo}px;
	padding-right: ${ut}px;
	order: 1;
`,v0=_.div`
	flex: 1 1 auto;
	display: flex;
	padding-right: ${ut}px;
	max-height: ${({isCollapsed:t})=>`calc(100% - ${Vo+(t?Ba:Fa)+ut*2}px)`};
	order: ${({stepsPosition:t})=>t==="bottom"?2:3};
`,y0=_.div`
	display: flex;
	min-height: ${({isCollapsed:t})=>t?"unset":Fa+"px"};
	background-color: ${({theme:t})=>t.application().faint().hex()};
	padding: 0;
	order: ${({stepsPosition:t})=>t==="bottom"?3:2};
	height: ${({isCollapsed:t})=>t?Ba+"px":"auto"};
	overflow: ${({isCollapsed:t})=>t?"hidden":"auto hidden"};
	> div {
		display: ${({isCollapsed:t})=>t?"none":"grid"};
	}
`,C0=_.div`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
`,w0=[Ge.Type,Ge.Min,Ge.Max,Ge.Distinct,Ge.Invalid],_0=l.exports.memo(function({table:e,headerCommandBar:o,name:n,metadata:r,onChangeMetadata:s}){const{tableFeatures:i}=m0();return u.exports.jsx(u.exports.Fragment,{children:e?u.exports.jsxs(S0,{children:[u.exports.jsx(Vg,{name:n,table:e}),u.exports.jsx(Og,{isSortable:!0,compact:!0,showColumnBorders:!0,isHeadersFixed:!0,metadata:r,onChangeMetadata:s,features:{...i,statsColumnTypes:w0,commandBar:o||void 0},table:e})]}):u.exports.jsx(k0,{children:u.exports.jsx(vr,{text:"(No table selected)"})})})}),S0=_.div`
	overflow: auto;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,k0=_.div`
	display: flex;
	height: 100%;
	align-items: center;
`,T0={aggregate:vv,bin:wv,binarize:Gv,boolean:zv,concat:Sn,convert:Xv,dedupe:wn,derive:ty,difference:Sn,erase:ry,fetch:ay,fill:cy,filter:Ea,fold:my,groupby:wn,intersect:Sn,impute:gy,join:yy,lookup:_y,merge:Ty,onehot:Dy,orderby:Ny,pivot:By,recode:Ky,rename:tC,rollup:iC,sample:cC,select:wn,spread:vC,unfold:SC,ungroup:Ts,union:Sn,unorder:Ts,unroll:wn,window:IC};function $a(t){const e=T0[t.verb];if(!e)throw new Error(`verb ${t.verb} not found`);return e}const I0=`# binarize

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
`,j0=`# aggregate

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
`,D0=`# bin

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
`,M0=`# dedupe

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
`,O0=`# boolean

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
`,N0=`# difference

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
`,E0=`# convert

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
`,P0=`# derive

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
`,A0=`# filter

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
| 354  | 300  |`,F0=`# concat

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
`,B0=`# fill

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
`,$0=`# intersect

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
`,R0=`# impute

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
`,L0=`# groupby

Groups table rows using keys from a specified column list. Note that this is an underlying index on a table that isn't necessarily visible, but will apply when performing operations that are sensitive to grouping. See [rollup](./rollup.md) for examples of \`groupby\`.
`,H0=`# fold

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
`,V0=`# join

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
`,W0=`# fetch

Executes an asynchronous resource request to a specified URL. Currently only HTTP GET is supported, with no additional headers.
`,U0=`# lookup

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
`,G0=`# merge

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
`,K0=`# orderby

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
`,z0=`# pivot

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
`,q0=`# rename

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
`,Y0=`# rollup

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
`,J0=`# sample

Extracts a random sample of rows from a table. Sampling can be specified using either a fixed row number or a percentage of total rows. If the input table is grouped, stratified sampling is performed.
`,Z0=`# onehot

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
| lamp  | 1    | 0     | 0    |`,X0=`# select

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
`,Q0=`# unfold

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
`,ew=`# spread

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
`,tw=`# erase

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
`,nw=`# ungroup

Removes any [grouping](./groupby.md) that has been applied to a table.
`,ow=`# union

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
`,rw=`# recode

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
`,sw=`# unorder

Removes any [ordering](./orderby.md) that has been applied to a table, reverting to its original state.
`,iw=`# window

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
`,aw=`# chain

Executes a series of verbs. This is essentially the core engine of the project. Chains can be included within parent chains, so the execution proceeds recursively. By default, each chain execution creates its own table store context so that it does not pollute the parent context with intermediate tables. The end of the chain returns the final output table. Specifying the \`nofork\` option will pass the parent context recursively, allowing for collection of all intermediate tables.
`,lw=`# unroll

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
`,W={};W.binarize=I0;W.aggregate=j0;W.bin=D0;W.dedupe=M0;W.boolean=O0;W.difference=N0;W.convert=E0;W.derive=P0;W.filter=A0;W.concat=F0;W.fill=B0;W.intersect=$0;W.impute=R0;W.groupby=L0;W.fold=H0;W.join=V0;W.fetch=W0;W.lookup=U0;W.merge=G0;W.orderby=K0;W.pivot=z0;W.rename=q0;W.rollup=Y0;W.sample=J0;W.onehot=Z0;W.select=X0;W.unfold=Q0;W.spread=ew;W.erase=tw;W.ungroup=nw;W.union=ow;W.recode=rw;W.unorder=sw;W.window=iw;W.chain=aw;W.unroll=lw;function uw(t,e){return l.exports.useCallback(()=>{t&&e&&e(t)},[e,t])}function cw(t,e){const o=l.exports.useMemo(()=>t?$a(t):null,[t]);return l.exports.useMemo(()=>{if(o)return Tw()(La()(Ra()(Dw(void 0,e)(o))))},[o,e])}function dw(t,e,o){const[n,r]=l.exports.useState(),s=bx();l.exports.useEffect(()=>{t&&r(t)},[t,r]);const i=ta(o),a=l.exports.useCallback(c=>{const p=cr(c,e??"",i(`table-${c}`));p.args=s(p.args),r(p)},[e,r,i,s]);return{internal:n,handleVerbChange:a,setInternal:r}}function pw(t,e=!1,o=!1){const n=De();return l.exports.useMemo(()=>Rn({root:{border:`1px solid ${n.application().faint().hex()}`,width:e?800:360,maxHeight:580}},t),[n,t,e,o])}const fw=l.exports.memo(function({onDismiss:e,store:o,onTransformRequested:n,step:r,nextInputTable:s,styles:i,...a}){const[c,{toggle:p}]=ln(!1),{internal:m,setInternal:x,handleVerbChange:g}=dw(r,s,o),d=cw(m,!!r),h=uw(m,n),f=pw(i,c,!!m?.verb);return u.exports.jsxs(Hs,{onDismissed:()=>x(void 0),styles:f,directionalHint:Gn.rightBottomEdge,...a,children:[u.exports.jsxs(xw,{children:[u.exports.jsx(gw,{children:r?"Edit step":"New step"}),e&&u.exports.jsx(ve,{iconProps:mw.cancel,ariaLabel:"Close popup modal",onClick:()=>e()})]}),u.exports.jsxs(hw,{showGuidance:c,children:[u.exports.jsxs(bw,{children:[u.exports.jsxs(vw,{children:[u.exports.jsx(qC,{placeholder:"Select a verb",verb:m?.verb,onCreate:g}),m?.verb?u.exports.jsx(ve,{onClick:p,iconProps:{iconName:"Info"},checked:c}):null]}),m&&d&&u.exports.jsxs(u.exports.Fragment,{children:[u.exports.jsx(d,{step:m,store:o,onChange:x}),u.exports.jsx(yw,{children:u.exports.jsx(Xo,{onClick:h,children:"Save"})})]})]}),c&&m?.verb?u.exports.jsx(Cw,{children:u.exports.jsx(iv,{name:m?.verb,index:W})}):null]})]})}),mw={cancel:{iconName:"Cancel"}},hw=_.div`
	padding: 0px 12px 14px 24px;
	display: flex;
	justify-content: flex-start;
	gap: 12px;
`,xw=_.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
	margin-bottom: 12px;
`,gw=_.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,bw=_.div`
	width: 316px;
	max-height: 32rem;
	overflow: hidden auto;
`,vw=_.div`
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`,yw=_.div`
	margin-top: 8px;
`,Cw=_.div`
	width: 400px;
	max-height: 32rem;
	overflow: hidden auto;
`,se=l.exports.memo(function({step:e,rows:o,showInput:n,showOutput:r,showOutputColumn:s,style:i}){const a=l.exports.useMemo(()=>{function p(m){return m.map((x,g)=>u.exports.jsxs(In,{title:x.title,children:[u.exports.jsxs(jn,{children:[x.before?u.exports.jsx(Qt,{children:x.before}):null,dn(x.value)?u.exports.jsx(Dn,{}):u.exports.jsx(Mn,{title:x.value,children:x.value}),x.after?u.exports.jsx(Qt,{children:x.after}):null]}),x.sub?p(x.sub):null]},`verb-description-row-${x.value}-${g}`))}return p(o)},[o]),c=s&&Xi(e);return u.exports.jsxs(ww,{style:i,children:[u.exports.jsx(_w,{children:e.verb}),n?u.exports.jsx(In,{children:u.exports.jsxs(jn,{children:[u.exports.jsx(Qt,{children:"table"}),e.input?u.exports.jsx(Mn,{children:e.input}):u.exports.jsx(Dn,{})]})}):null,a,r?u.exports.jsx(In,{children:u.exports.jsxs(jn,{children:[u.exports.jsx(Qt,{children:"into table"}),e.output?u.exports.jsx(Mn,{children:e.output}):u.exports.jsx(Dn,{})]})}):null,c?u.exports.jsx(In,{children:u.exports.jsxs(jn,{children:[u.exports.jsx(Qt,{children:"as column"}),e.args.to?u.exports.jsx(Mn,{children:e.args.to}):u.exports.jsx(Dn,{})]})}):null]})}),ww=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-height: 180px;
`,_w=_.div`
	text-transform: uppercase;
	font-weight: bold;
	align-items: center;
	width: 100%;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,In=_.div`
	padding-left: 8px;
	display: flex;
	flex-direction: column;
`,jn=_.div`
	display: flex;
	justify-content: flex-start;
	gap: 4px;
`,Qt=_.div``,Dn=_.div`
	color: ${({theme:t})=>t.application().lowContrast().hex()};
	&:before {
		content: 'unset';
	}
`,Mn=_.div`
	max-width: 240px;
	text-overflow: ellipsis;
	overflow: hidden;
	font-weight: bold;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,Ra=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i,input:a,table:c}=n,p=be(r,"args.column",i),m=we(a||r.input,c,s),x=Sw(r,m);return Qh(r)?u.exports.jsxs(kw,{className:"with-input-column-dropdown",children:[u.exports.jsx(K,{children:u.exports.jsx(Pe,{required:!0,table:m,filter:x,label:t||`Column to ${r.verb}`,selectedKey:r.args.column,onChange:p})}),u.exports.jsx(e,{...n})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)};function Sw(t,e){const o=l.exports.useMemo(()=>e?Jo(e):{},[e]);return l.exports.useCallback(n=>ex(t)?o[n]===G.Number:!0,[o,t])}const kw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,Tw=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i}=n,a=be(r,"input",i);return Xh(r)?u.exports.jsxs(Iw,{className:"with-input-table-dropdown",children:[u.exports.jsx(K,{children:u.exports.jsx(dr,{store:s,label:t||"Input table",selectedKey:r.input,onChange:a})}),u.exports.jsx(e,{...n})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)},Iw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,La=t=>e=>{const o=n=>{const{step:r,onChange:s}=n,i=Fe(r,"args.to",s);return Xi(r)?u.exports.jsxs(jw,{className:"with-output-column-textfield",children:[u.exports.jsx(e,{...n}),u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,label:t||"New column name",placeholder:"Column name",value:r.args.to,styles:fe,onChange:i})})]}):u.exports.jsx(e,{...n})};return l.exports.memo(o)},jw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
	margin-top: 8px;
`,Dw=(t,e)=>o=>{const n=r=>{const{step:s,onChange:i}=r,a=Fe(s,"output",i);return u.exports.jsxs(Mw,{className:"with-output-column-textfield",children:[u.exports.jsx(o,{...r}),u.exports.jsx(K,{children:u.exports.jsx(ke,{required:!0,disabled:e,label:t||"Output table",placeholder:"Table name",value:s.output,styles:fe,onChange:a})})]})};return l.exports.memo(n)},Mw=_.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,Ow=l.exports.memo(function(){const e=tu(),o=nu(),[n]=ou(),[r,s]=ru(),[,i]=su();return oo(Es,{vertical:!0,children:[ht(rl,{children:sl.Prepare.description}),oo(Xs,{align:"center",style:{margin:e.spacing.m},gap:e.spacing.s1,children:[oo(Nw,{onClick:o,children:[ht(Xe,{iconName:"OpenFolderHorizontal"})," Open sensitive data file"]}),ht(ku,{title:"Open sensitive data file",children:Tu.sensitiveFile})]}),!!n.length&&ht(Es,{children:ht(x0,{tables:n,steps:r,onUpdateSteps:s,onOutputTable:i,stepsPosition:"middle"})})]})}),Nw=_.span`
	color: ${t=>t.theme.palette.accent};
	&:hover {
		cursor: pointer;
	}
`,Es=_(Xs)`
	height: 100%;
	overflow-y: auto;

	.ms-Button-textContainer {
		overflow: hidden;
	}

	.ms-Button-label {
		text-overflow: ellipsis;
		overflow: hidden;
	}
`,Ew=l.exports.memo(function(){return ht(Pw,{children:ht(Ow,{})})});Ew.displayName="PreparePage";const Pw=_.div`
	height: 100%;
	overflow-y: auto;
`;export{Ew as PreparePage,Ew as default};
//# sourceMappingURL=index-4dd5c28c.js.map
