import{i as ja,d as Ma,a as fr,b as Oa,c as Na,e as Pa,C as Aa,f as cs,g as Ea,h as ds,u as uo,r as l,_ as st,k as mr,K as V,l as Rt,A as fs,m as k,n as Pn,o as ms,p as wt,H as ye,q as vt,s as Fa,t as Do,v as Io,w as _n,x as Ba,F as ps,y as ve,z as co,B as hs,D as gs,E as Dn,G as $a,I as Ra,J as le,L as Kn,M as La,O as bs,Q as An,R as jo,S as En,T as fe,U as Ha,V as Va,W as xs,X as fo,Y as Wa,Z as vs,$ as Mo,a0 as Ua,a1 as Ka,a2 as ys,a3 as za,a4 as _t,a5 as Ga,a6 as mo,a7 as pr,a8 as qa,a9 as Cs,aa as Ya,ab as nn,ac as Ja,ad as Za,ae as Xa,af as Qa,ag as qe,ah as el,ai as tl,aj as nl,ak as ol,al as St,am as rl,an as kt,ao as ws,ap as sl,aq as zn,ar as Gn,as as il,at as al,au as ll,av as hr,aw as ul,ax as In,ay as Tt,az as cl,aA as _s,aB as Fn,aC as Ss,aD as Oo,aE as ks,aF as dl,aG as fl,aH as ml,aI as Ts,aJ as pl,aK as Ds,aL as No,aM as jn,aN as Bn,aO as hl,aP as gl,aQ as bl,aR as xl,aS as vl,aT as yl,aU as Cl,aV as wl,aW as Po,aX as Is,aY as js,aZ as Ms,a_ as po,a$ as Os,b0 as ho,b1 as u,b2 as Xe,b3 as Zt,b4 as Xt,b5 as Ns,b6 as C,b7 as on,b8 as Ue,b9 as Fe,ba as Be,bb as Re,bc as De,bd as it,be as en,bf as rn,bg as Ps,bh as Le,bi as _l,bj as Sl,bk as Ke,bl as go,bm as R,bn as Jt,bo as nt,bp as Et,bq as bo,br as Ce,bs as As,bt as kl,bu as Tl,bv as B,bw as at,bx as sn,by as Dl,bz as Il,bA as jl,bB as Ml,bC as Ol,bD as we,bE as Es,bF as Fs,bG as Nl,bH as Pl,bI as Bs,bJ as Al,bK as an,bL as G,bM as $n,bN as El,bO as Rn,bP as xo,bQ as Fl,bR as Mn,bS as Ao,bT as Bl,bU as $l,bV as Rl,bW as Ll,bX as Hl,bY as xe,bZ as Vl,b_ as Eo,j as ze,b$ as Sn,c0 as Ln,c1 as ht,c2 as gt,c3 as Fo,c4 as Lt,c5 as gr,c6 as Ft,c7 as Wl,c8 as Ul,c9 as Kl,ca as zl,cb as Gl,cc as ql,cd as Yl,ce as Jl,P as Zl,cf as $s,cg as Xl,ch as Ql}from"./main-7ec25afe.js";function eu(t,e){e===void 0&&(e=!0);var o=[];if(t){for(var n=0;n<t.children.length;n++)o.push(t.children.item(n));e&&ja(t)&&o.push.apply(o,t._virtual.children)}return o}const qn=new Date,Yn=new Date;function Ye(t,e,o,n){function r(s){return t(s=arguments.length===0?new Date:new Date(+s)),s}return r.floor=s=>(t(s=new Date(+s)),s),r.ceil=s=>(t(s=new Date(s-1)),e(s,1),t(s),s),r.round=s=>{const i=r(s),a=r.ceil(s);return s-i<a-s?i:a},r.offset=(s,i)=>(e(s=new Date(+s),i==null?1:Math.floor(i)),s),r.range=(s,i,a)=>{const c=[];if(s=r.ceil(s),a=a==null?1:Math.floor(a),!(s<i)||!(a>0))return c;let f;do c.push(f=new Date(+s)),e(s,a),t(s);while(f<s&&s<i);return c},r.filter=s=>Ye(i=>{if(i>=i)for(;t(i),!s(i);)i.setTime(i-1)},(i,a)=>{if(i>=i)if(a<0)for(;++a<=0;)for(;e(i,-1),!s(i););else for(;--a>=0;)for(;e(i,1),!s(i););}),o&&(r.count=(s,i)=>(qn.setTime(+s),Yn.setTime(+i),t(qn),t(Yn),Math.floor(o(qn,Yn))),r.every=s=>(s=Math.floor(s),!isFinite(s)||!(s>0)?null:s>1?r.filter(n?i=>n(i)%s===0:i=>r.count(0,i)%s===0):r)),r}const tu=1e3,Bo=tu*60,nu=Bo*60,tn=nu*24,Rs=tn*7,$o=Ye(t=>t.setHours(0,0,0,0),(t,e)=>t.setDate(t.getDate()+e),(t,e)=>(e-t-(e.getTimezoneOffset()-t.getTimezoneOffset())*Bo)/tn,t=>t.getDate()-1);$o.range;const Ro=Ye(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/tn,t=>t.getUTCDate()-1);Ro.range;const ou=Ye(t=>{t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCDate(t.getUTCDate()+e)},(t,e)=>(e-t)/tn,t=>Math.floor(t/tn));ou.range;function Dt(t){return Ye(e=>{e.setDate(e.getDate()-(e.getDay()+7-t)%7),e.setHours(0,0,0,0)},(e,o)=>{e.setDate(e.getDate()+o*7)},(e,o)=>(o-e-(o.getTimezoneOffset()-e.getTimezoneOffset())*Bo)/Rs)}const Ls=Dt(0),On=Dt(1),ru=Dt(2),su=Dt(3),Bt=Dt(4),iu=Dt(5),au=Dt(6);Ls.range;On.range;ru.range;su.range;Bt.range;iu.range;au.range;function It(t){return Ye(e=>{e.setUTCDate(e.getUTCDate()-(e.getUTCDay()+7-t)%7),e.setUTCHours(0,0,0,0)},(e,o)=>{e.setUTCDate(e.getUTCDate()+o*7)},(e,o)=>(o-e)/Rs)}const Hs=It(0),Nn=It(1),lu=It(2),uu=It(3),$t=It(4),cu=It(5),du=It(6);Hs.range;Nn.range;lu.range;uu.range;$t.range;cu.range;du.range;const yt=Ye(t=>{t.setMonth(0,1),t.setHours(0,0,0,0)},(t,e)=>{t.setFullYear(t.getFullYear()+e)},(t,e)=>e.getFullYear()-t.getFullYear(),t=>t.getFullYear());yt.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:Ye(e=>{e.setFullYear(Math.floor(e.getFullYear()/t)*t),e.setMonth(0,1),e.setHours(0,0,0,0)},(e,o)=>{e.setFullYear(e.getFullYear()+o*t)});yt.range;const Ct=Ye(t=>{t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},(t,e)=>{t.setUTCFullYear(t.getUTCFullYear()+e)},(t,e)=>e.getUTCFullYear()-t.getUTCFullYear(),t=>t.getUTCFullYear());Ct.every=t=>!isFinite(t=Math.floor(t))||!(t>0)?null:Ye(e=>{e.setUTCFullYear(Math.floor(e.getUTCFullYear()/t)*t),e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},(e,o)=>{e.setUTCFullYear(e.getUTCFullYear()+o*t)});Ct.range;function Jn(t){if(0<=t.y&&t.y<100){var e=new Date(-1,t.m,t.d,t.H,t.M,t.S,t.L);return e.setFullYear(t.y),e}return new Date(t.y,t.m,t.d,t.H,t.M,t.S,t.L)}function Zn(t){if(0<=t.y&&t.y<100){var e=new Date(Date.UTC(-1,t.m,t.d,t.H,t.M,t.S,t.L));return e.setUTCFullYear(t.y),e}return new Date(Date.UTC(t.y,t.m,t.d,t.H,t.M,t.S,t.L))}function Ut(t,e,o){return{y:t,m:e,d:o,H:0,M:0,S:0,L:0}}function fu(t){var e=t.dateTime,o=t.date,n=t.time,r=t.periods,s=t.days,i=t.shortDays,a=t.months,c=t.shortMonths,f=Kt(r),p=zt(r),g=Kt(s),b=zt(s),d=Kt(i),h=zt(i),m=Kt(a),x=zt(a),v=Kt(c),y=zt(c),_={a:de,A:te,b:X,B:he,c:null,d:wr,e:wr,f:Eu,g:Ku,G:Gu,H:Nu,I:Pu,j:Au,L:Vs,m:Fu,M:Bu,p:ge,q:He,Q:kr,s:Tr,S:$u,u:Ru,U:Lu,V:Hu,w:Vu,W:Wu,x:null,X:null,y:Uu,Y:zu,Z:qu,"%":Sr},S={a:lt,A:Te,b:Oe,B:Qe,c:null,d:_r,e:_r,f:Xu,g:lc,G:cc,H:Yu,I:Ju,j:Zu,L:Us,m:Qu,M:ec,p:Ve,q:ut,Q:kr,s:Tr,S:tc,u:nc,U:oc,V:rc,w:sc,W:ic,x:null,X:null,y:ac,Y:uc,Z:dc,"%":Sr},M={a:U,A:re,b:se,B:Z,c:pe,d:yr,e:yr,f:Iu,g:vr,G:xr,H:Cr,I:Cr,j:Su,L:Du,m:_u,M:ku,p:K,q:wu,Q:Mu,s:Ou,S:Tu,u:bu,U:xu,V:vu,w:gu,W:yu,x:ce,X:ee,y:vr,Y:xr,Z:Cu,"%":ju};_.x=P(o,_),_.X=P(n,_),_.c=P(e,_),S.x=P(o,S),S.X=P(n,S),S.c=P(e,S);function P(D,N){return function(E){var w=[],ie=-1,I=0,z=D.length,be,We,cn;for(E instanceof Date||(E=new Date(+E));++ie<z;)D.charCodeAt(ie)===37&&(w.push(D.slice(I,ie)),(We=br[be=D.charAt(++ie)])!=null?be=D.charAt(++ie):We=be==="e"?" ":"0",(cn=N[be])&&(be=cn(E,We)),w.push(be),I=ie+1);return w.push(D.slice(I,ie)),w.join("")}}function O(D,N){return function(E){var w=Ut(1900,void 0,1),ie=j(w,D,E+="",0),I,z;if(ie!=E.length)return null;if("Q"in w)return new Date(w.Q);if("s"in w)return new Date(w.s*1e3+("L"in w?w.L:0));if(N&&!("Z"in w)&&(w.Z=0),"p"in w&&(w.H=w.H%12+w.p*12),w.m===void 0&&(w.m="q"in w?w.q:0),"V"in w){if(w.V<1||w.V>53)return null;"w"in w||(w.w=1),"Z"in w?(I=Zn(Ut(w.y,0,1)),z=I.getUTCDay(),I=z>4||z===0?Nn.ceil(I):Nn(I),I=Ro.offset(I,(w.V-1)*7),w.y=I.getUTCFullYear(),w.m=I.getUTCMonth(),w.d=I.getUTCDate()+(w.w+6)%7):(I=Jn(Ut(w.y,0,1)),z=I.getDay(),I=z>4||z===0?On.ceil(I):On(I),I=$o.offset(I,(w.V-1)*7),w.y=I.getFullYear(),w.m=I.getMonth(),w.d=I.getDate()+(w.w+6)%7)}else("W"in w||"U"in w)&&("w"in w||(w.w="u"in w?w.u%7:"W"in w?1:0),z="Z"in w?Zn(Ut(w.y,0,1)).getUTCDay():Jn(Ut(w.y,0,1)).getDay(),w.m=0,w.d="W"in w?(w.w+6)%7+w.W*7-(z+5)%7:w.w+w.U*7-(z+6)%7);return"Z"in w?(w.H+=w.Z/100|0,w.M+=w.Z%100,Zn(w)):Jn(w)}}function j(D,N,E,w){for(var ie=0,I=N.length,z=E.length,be,We;ie<I;){if(w>=z)return-1;if(be=N.charCodeAt(ie++),be===37){if(be=N.charAt(ie++),We=M[be in br?N.charAt(ie++):be],!We||(w=We(D,E,w))<0)return-1}else if(be!=E.charCodeAt(w++))return-1}return w}function K(D,N,E){var w=f.exec(N.slice(E));return w?(D.p=p.get(w[0].toLowerCase()),E+w[0].length):-1}function U(D,N,E){var w=d.exec(N.slice(E));return w?(D.w=h.get(w[0].toLowerCase()),E+w[0].length):-1}function re(D,N,E){var w=g.exec(N.slice(E));return w?(D.w=b.get(w[0].toLowerCase()),E+w[0].length):-1}function se(D,N,E){var w=v.exec(N.slice(E));return w?(D.m=y.get(w[0].toLowerCase()),E+w[0].length):-1}function Z(D,N,E){var w=m.exec(N.slice(E));return w?(D.m=x.get(w[0].toLowerCase()),E+w[0].length):-1}function pe(D,N,E){return j(D,e,N,E)}function ce(D,N,E){return j(D,o,N,E)}function ee(D,N,E){return j(D,n,N,E)}function de(D){return i[D.getDay()]}function te(D){return s[D.getDay()]}function X(D){return c[D.getMonth()]}function he(D){return a[D.getMonth()]}function ge(D){return r[+(D.getHours()>=12)]}function He(D){return 1+~~(D.getMonth()/3)}function lt(D){return i[D.getUTCDay()]}function Te(D){return s[D.getUTCDay()]}function Oe(D){return c[D.getUTCMonth()]}function Qe(D){return a[D.getUTCMonth()]}function Ve(D){return r[+(D.getUTCHours()>=12)]}function ut(D){return 1+~~(D.getUTCMonth()/3)}return{format:function(D){var N=P(D+="",_);return N.toString=function(){return D},N},parse:function(D){var N=O(D+="",!1);return N.toString=function(){return D},N},utcFormat:function(D){var N=P(D+="",S);return N.toString=function(){return D},N},utcParse:function(D){var N=O(D+="",!0);return N.toString=function(){return D},N}}}var br={"-":"",_:" ",0:"0"},ue=/^\s*\d+/,mu=/^%/,pu=/[\\^$*+?|[\]().{}]/g;function W(t,e,o){var n=t<0?"-":"",r=(n?-t:t)+"",s=r.length;return n+(s<o?new Array(o-s+1).join(e)+r:r)}function hu(t){return t.replace(pu,"\\$&")}function Kt(t){return new RegExp("^(?:"+t.map(hu).join("|")+")","i")}function zt(t){return new Map(t.map((e,o)=>[e.toLowerCase(),o]))}function gu(t,e,o){var n=ue.exec(e.slice(o,o+1));return n?(t.w=+n[0],o+n[0].length):-1}function bu(t,e,o){var n=ue.exec(e.slice(o,o+1));return n?(t.u=+n[0],o+n[0].length):-1}function xu(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.U=+n[0],o+n[0].length):-1}function vu(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.V=+n[0],o+n[0].length):-1}function yu(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.W=+n[0],o+n[0].length):-1}function xr(t,e,o){var n=ue.exec(e.slice(o,o+4));return n?(t.y=+n[0],o+n[0].length):-1}function vr(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.y=+n[0]+(+n[0]>68?1900:2e3),o+n[0].length):-1}function Cu(t,e,o){var n=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(o,o+6));return n?(t.Z=n[1]?0:-(n[2]+(n[3]||"00")),o+n[0].length):-1}function wu(t,e,o){var n=ue.exec(e.slice(o,o+1));return n?(t.q=n[0]*3-3,o+n[0].length):-1}function _u(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.m=n[0]-1,o+n[0].length):-1}function yr(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.d=+n[0],o+n[0].length):-1}function Su(t,e,o){var n=ue.exec(e.slice(o,o+3));return n?(t.m=0,t.d=+n[0],o+n[0].length):-1}function Cr(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.H=+n[0],o+n[0].length):-1}function ku(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.M=+n[0],o+n[0].length):-1}function Tu(t,e,o){var n=ue.exec(e.slice(o,o+2));return n?(t.S=+n[0],o+n[0].length):-1}function Du(t,e,o){var n=ue.exec(e.slice(o,o+3));return n?(t.L=+n[0],o+n[0].length):-1}function Iu(t,e,o){var n=ue.exec(e.slice(o,o+6));return n?(t.L=Math.floor(n[0]/1e3),o+n[0].length):-1}function ju(t,e,o){var n=mu.exec(e.slice(o,o+1));return n?o+n[0].length:-1}function Mu(t,e,o){var n=ue.exec(e.slice(o));return n?(t.Q=+n[0],o+n[0].length):-1}function Ou(t,e,o){var n=ue.exec(e.slice(o));return n?(t.s=+n[0],o+n[0].length):-1}function wr(t,e){return W(t.getDate(),e,2)}function Nu(t,e){return W(t.getHours(),e,2)}function Pu(t,e){return W(t.getHours()%12||12,e,2)}function Au(t,e){return W(1+$o.count(yt(t),t),e,3)}function Vs(t,e){return W(t.getMilliseconds(),e,3)}function Eu(t,e){return Vs(t,e)+"000"}function Fu(t,e){return W(t.getMonth()+1,e,2)}function Bu(t,e){return W(t.getMinutes(),e,2)}function $u(t,e){return W(t.getSeconds(),e,2)}function Ru(t){var e=t.getDay();return e===0?7:e}function Lu(t,e){return W(Ls.count(yt(t)-1,t),e,2)}function Ws(t){var e=t.getDay();return e>=4||e===0?Bt(t):Bt.ceil(t)}function Hu(t,e){return t=Ws(t),W(Bt.count(yt(t),t)+(yt(t).getDay()===4),e,2)}function Vu(t){return t.getDay()}function Wu(t,e){return W(On.count(yt(t)-1,t),e,2)}function Uu(t,e){return W(t.getFullYear()%100,e,2)}function Ku(t,e){return t=Ws(t),W(t.getFullYear()%100,e,2)}function zu(t,e){return W(t.getFullYear()%1e4,e,4)}function Gu(t,e){var o=t.getDay();return t=o>=4||o===0?Bt(t):Bt.ceil(t),W(t.getFullYear()%1e4,e,4)}function qu(t){var e=t.getTimezoneOffset();return(e>0?"-":(e*=-1,"+"))+W(e/60|0,"0",2)+W(e%60,"0",2)}function _r(t,e){return W(t.getUTCDate(),e,2)}function Yu(t,e){return W(t.getUTCHours(),e,2)}function Ju(t,e){return W(t.getUTCHours()%12||12,e,2)}function Zu(t,e){return W(1+Ro.count(Ct(t),t),e,3)}function Us(t,e){return W(t.getUTCMilliseconds(),e,3)}function Xu(t,e){return Us(t,e)+"000"}function Qu(t,e){return W(t.getUTCMonth()+1,e,2)}function ec(t,e){return W(t.getUTCMinutes(),e,2)}function tc(t,e){return W(t.getUTCSeconds(),e,2)}function nc(t){var e=t.getUTCDay();return e===0?7:e}function oc(t,e){return W(Hs.count(Ct(t)-1,t),e,2)}function Ks(t){var e=t.getUTCDay();return e>=4||e===0?$t(t):$t.ceil(t)}function rc(t,e){return t=Ks(t),W($t.count(Ct(t),t)+(Ct(t).getUTCDay()===4),e,2)}function sc(t){return t.getUTCDay()}function ic(t,e){return W(Nn.count(Ct(t)-1,t),e,2)}function ac(t,e){return W(t.getUTCFullYear()%100,e,2)}function lc(t,e){return t=Ks(t),W(t.getUTCFullYear()%100,e,2)}function uc(t,e){return W(t.getUTCFullYear()%1e4,e,4)}function cc(t,e){var o=t.getUTCDay();return t=o>=4||o===0?$t(t):$t.ceil(t),W(t.getUTCFullYear()%1e4,e,4)}function dc(){return"+0000"}function Sr(){return"%"}function kr(t){return+t}function Tr(t){return Math.floor(+t/1e3)}var Nt,zs,Gs,qs,Ys;fc({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});function fc(t){return Nt=fu(t),zs=Nt.format,Gs=Nt.parse,qs=Nt.utcFormat,Ys=Nt.utcParse,Nt}var Js="%Y-%m-%dT%H:%M:%S.%LZ";function mc(t){return t.toISOString()}Date.prototype.toISOString||qs(Js);function pc(t){var e=new Date(t);return isNaN(e)?null:e}var hc=+new Date("2000-01-01T00:00:00.000Z")?pc:Ys(Js);const gc=hc;function bc(t){const e=t.length;for(let o=0;o<e;++o){const n=t.charCodeAt(o);if(n<48||n>57)return!1}return!0}function xc(t,e={}){const o=Ma(e.autoType);fr(t)&&(t=JSON.parse(t));let n=t.data,r;if(Oa(n)&&!Na(n)?t.schema&&t.schema.fields&&(r=t.schema.fields.map(s=>s.name)):n=t,o||e.parse){const s=e.parse||{};for(const i in n){const a=n[i],c=a.length;if(s[i])for(let f=0;f<c;++f)a[f]=s[i](a[f]);else if(o)for(let f=0;f<c;++f){const p=a[f];fr(p)&&Pa(p)&&!bc(p)&&(a[f]=new Date(p))}}}return new Aa(n,r)}function Zs(t,e={}){const o=e.using||cs;return fetch(t,e.fetch).then(n=>n[e.as||"text"]()).then(n=>o(n,e))}function vc(t,e){return Zs(t,{...e,as:"text",using:cs})}function yc(t,e){return Zs(t,{...e,as:"json",using:Cc})}function Cc(t,e){return Ea(t)?ds(t):xc(t,e)}function wc(t,e={}){const o=`d[${JSON.stringify(t)}]`,{maxbins:n,nice:r,minstep:s,step:i,offset:a}=e,c=[n,r,s,i];let f=c.length;for(;f&&c[--f]==null;)c.pop();const p=c.length?", "+c.map(g=>g+"").join(", "):"";return`d => op.bin(${o}, ...op.bins(${o}${p}), ${a||0})`}var _c=function(){var t=uo({});return l.useEffect(function(){return function(){for(var e=0,o=Object.keys(t);e<o.length;e++){var n=o[e];clearTimeout(n)}}},[t]),uo({setTimeout:function(e,o){var n=setTimeout(e,o);return t[n]=1,n},clearTimeout:function(e){delete t[e],clearTimeout(e)}})},Sc="forward",Dr="backward",kc=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return n._inputElement=l.createRef(),n._autoFillEnabled=!0,n._onCompositionStart=function(r){n.setState({isComposing:!0}),n._autoFillEnabled=!1},n._onCompositionUpdate=function(){mr()&&n._updateValue(n._getCurrentInputValue(),!0)},n._onCompositionEnd=function(r){var s=n._getCurrentInputValue();n._tryEnableAutofill(s,n.value,!1,!0),n.setState({isComposing:!1}),n._async.setTimeout(function(){n._updateValue(n._getCurrentInputValue(),!1)},0)},n._onClick=function(){n.value&&n.value!==""&&n._autoFillEnabled&&(n._autoFillEnabled=!1)},n._onKeyDown=function(r){if(n.props.onKeyDown&&n.props.onKeyDown(r),!r.nativeEvent.isComposing)switch(r.which){case V.backspace:n._autoFillEnabled=!1;break;case V.left:case V.right:n._autoFillEnabled&&(n.setState({inputValue:n.props.suggestedDisplayValue||""}),n._autoFillEnabled=!1);break;default:n._autoFillEnabled||n.props.enableAutofillOnKeyPress.indexOf(r.which)!==-1&&(n._autoFillEnabled=!0);break}},n._onInputChanged=function(r){var s=n._getCurrentInputValue(r);if(n.state.isComposing||n._tryEnableAutofill(s,n.value,r.nativeEvent.isComposing),!(mr()&&n.state.isComposing)){var i=r.nativeEvent.isComposing,a=i===void 0?n.state.isComposing:i;n._updateValue(s,a)}},n._onChanged=function(){},n._updateValue=function(r,s){if(!(!r&&r===n.value)){var i=n.props,a=i.onInputChange,c=i.onInputValueChange,f=i.updateValueInWillReceiveProps;a&&(r=a?.(r,s)||""),f?c?.(r,s):n.setState({inputValue:r},function(){return c?.(r,s)})}},Rt(n),n._async=new fs(n),n.state={inputValue:o.defaultVisibleValue||"",isComposing:!1},n}return e.getDerivedStateFromProps=function(o,n){if(o.updateValueInWillReceiveProps){var r=o.updateValueInWillReceiveProps();if(r!==null&&r!==n.inputValue&&!n.isComposing)return k(k({},n),{inputValue:r})}return null},Object.defineProperty(e.prototype,"cursorLocation",{get:function(){if(this._inputElement.current){var o=this._inputElement.current;return o.selectionDirection!==Sc?o.selectionEnd:o.selectionStart}else return-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"isValueSelected",{get:function(){return!!(this.inputElement&&this.inputElement.selectionStart!==this.inputElement.selectionEnd)},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return this._getControlledValue()||this.state.inputValue||""},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionStart",{get:function(){return this._inputElement.current?this._inputElement.current.selectionStart:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"selectionEnd",{get:function(){return this._inputElement.current?this._inputElement.current.selectionEnd:-1},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"inputElement",{get:function(){return this._inputElement.current},enumerable:!1,configurable:!0}),e.prototype.componentDidUpdate=function(o,n,r){var s=this.props,i=s.suggestedDisplayValue,a=s.shouldSelectFullInputValueInComponentDidUpdate,c=s.preventValueSelection,f=0;if(!c){var p=this._inputElement.current&&this._inputElement.current===document.activeElement;if(p&&this._autoFillEnabled&&this.value&&i&&Xs(i,this.value)){var g=!1;if(a&&(g=a()),g)this._inputElement.current.setSelectionRange(0,i.length,Dr);else{for(;f<this.value.length&&this.value[f].toLocaleLowerCase()===i[f].toLocaleLowerCase();)f++;f>0&&this._inputElement.current.setSelectionRange(f,i.length,Dr)}}else this._inputElement.current&&r!==null&&!this._autoFillEnabled&&!this.state.isComposing&&this._inputElement.current.setSelectionRange(r.start,r.end,r.dir)}},e.prototype.componentWillUnmount=function(){this._async.dispose()},e.prototype.render=function(){var o=Pn(this.props,ms),n=k(k({},this.props.style),{fontFamily:"inherit"});return l.createElement("input",k({autoCapitalize:"off",autoComplete:"off","aria-autocomplete":"both"},o,{style:n,ref:this._inputElement,value:this._getDisplayValue(),onCompositionStart:this._onCompositionStart,onCompositionUpdate:this._onCompositionUpdate,onCompositionEnd:this._onCompositionEnd,onChange:this._onChanged,onInput:this._onInputChanged,onKeyDown:this._onKeyDown,onClick:this.props.onClick?this.props.onClick:this._onClick,"data-lpignore":!0}))},e.prototype.focus=function(){this._inputElement.current&&this._inputElement.current.focus()},e.prototype.clear=function(){this._autoFillEnabled=!0,this._updateValue("",!1),this._inputElement.current&&this._inputElement.current.setSelectionRange(0,0)},e.prototype.getSnapshotBeforeUpdate=function(){var o,n,r=this._inputElement.current;return r&&r.selectionStart!==this.value.length?{start:(o=r.selectionStart)!==null&&o!==void 0?o:r.value.length,end:(n=r.selectionEnd)!==null&&n!==void 0?n:r.value.length,dir:r.selectionDirection||"backward"}:null},e.prototype._getCurrentInputValue=function(o){return o&&o.target&&o.target.value?o.target.value:this.inputElement&&this.inputElement.value?this.inputElement.value:""},e.prototype._tryEnableAutofill=function(o,n,r,s){!r&&o&&this._inputElement.current&&this._inputElement.current.selectionStart===o.length&&!this._autoFillEnabled&&(o.length>n.length||s)&&(this._autoFillEnabled=!0)},e.prototype._getDisplayValue=function(){return this._autoFillEnabled?Tc(this.value,this.props.suggestedDisplayValue):this.value},e.prototype._getControlledValue=function(){var o=this.props.value;return o===void 0||typeof o=="string"?o:(console.warn("props.value of Autofill should be a string, but it is "+o+" with type of "+typeof o),o.toString())},e.defaultProps={enableAutofillOnKeyPress:[V.down,V.up]},e}(l.Component);function Tc(t,e){var o=t;return e&&t&&Xs(e,o)&&(o=e),o}function Xs(t,e){return!t||!e?!1:t.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())===0}var Xn,Qn,Dc=32,Ic=30,Qs=32,vo=36,yo=wt(function(t){var e,o=t.semanticColors;return{backgroundColor:o.disabledBackground,color:o.disabledText,cursor:"default",selectors:(e={":after":{borderColor:o.disabledBackground}},e[ye]={color:"GrayText",selectors:{":after":{borderColor:"GrayText"}}},e)}}),Ir={selectors:(Xn={},Xn[ye]=k({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},vt()),Xn)},eo={selectors:(Qn={},Qn[ye]=k({color:"WindowText",backgroundColor:"Window"},vt()),Qn)},jc=wt(function(t,e,o,n,r,s){var i,a=t.palette,c=t.semanticColors,f={textHoveredColor:c.menuItemTextHovered,textSelectedColor:a.neutralDark,textDisabledColor:c.disabledText,backgroundHoveredColor:c.menuItemBackgroundHovered,backgroundPressedColor:c.menuItemBackgroundPressed},p={root:[t.fonts.medium,{backgroundColor:n?f.backgroundHoveredColor:"transparent",boxSizing:"border-box",cursor:"pointer",display:r?"none":"block",width:"100%",height:"auto",minHeight:vo,lineHeight:"20px",padding:"0 8px",position:"relative",borderWidth:"1px",borderStyle:"solid",borderColor:"transparent",borderRadius:0,wordWrap:"break-word",overflowWrap:"break-word",textAlign:"left",selectors:k(k((i={},i[ye]={border:"none",borderColor:"Background"},i),!r&&{"&.ms-Checkbox":{display:"flex",alignItems:"center"}}),{"&.ms-Button--command:hover:active":{backgroundColor:f.backgroundPressedColor},".ms-Checkbox-label":{width:"100%"}})},s?[{backgroundColor:"transparent",color:f.textSelectedColor,selectors:{":hover":[{backgroundColor:f.backgroundHoveredColor},Ir]}},Fa(t,{inset:-1,isFocusedOnly:!1}),Ir]:[]],rootHovered:{backgroundColor:f.backgroundHoveredColor,color:f.textHoveredColor},rootFocused:{backgroundColor:f.backgroundHoveredColor},rootDisabled:{color:f.textDisabledColor,cursor:"default"},optionText:{overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis",minWidth:"0px",maxWidth:"100%",wordWrap:"break-word",overflowWrap:"break-word",display:"inline-block"},optionTextWrapper:{maxWidth:"100%",display:"flex",alignItems:"center"}};return Do(p,e,o)}),Mc=wt(function(t,e){var o,n,r=t.semanticColors,s=t.fonts,i={buttonTextColor:r.bodySubtext,buttonTextHoveredCheckedColor:r.buttonTextChecked,buttonBackgroundHoveredColor:r.listItemBackgroundHovered,buttonBackgroundCheckedColor:r.listItemBackgroundChecked,buttonBackgroundCheckedHoveredColor:r.listItemBackgroundCheckedHovered},a={selectors:(o={},o[ye]=k({backgroundColor:"Highlight",borderColor:"Highlight",color:"HighlightText"},vt()),o)},c={root:{color:i.buttonTextColor,fontSize:s.small.fontSize,position:"absolute",top:0,height:"100%",lineHeight:Ic,width:Qs,textAlign:"center",cursor:"default",selectors:(n={},n[ye]=k({backgroundColor:"ButtonFace",borderColor:"ButtonText",color:"ButtonText"},vt()),n)},icon:{fontSize:s.small.fontSize},rootHovered:[{backgroundColor:i.buttonBackgroundHoveredColor,color:i.buttonTextHoveredCheckedColor,cursor:"pointer"},a],rootPressed:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootChecked:[{backgroundColor:i.buttonBackgroundCheckedColor,color:i.buttonTextHoveredCheckedColor},a],rootCheckedHovered:[{backgroundColor:i.buttonBackgroundCheckedHoveredColor,color:i.buttonTextHoveredCheckedColor},a],rootDisabled:[yo(t),{position:"absolute"}]};return Do(c,e)}),Oc=wt(function(t,e,o){var n,r,s,i,a,c,f=t.semanticColors,p=t.fonts,g=t.effects,b={textColor:f.inputText,borderColor:f.inputBorder,borderHoveredColor:f.inputBorderHovered,borderPressedColor:f.inputFocusBorderAlt,borderFocusedColor:f.inputFocusBorderAlt,backgroundColor:f.inputBackground,erroredColor:f.errorText},d={headerTextColor:f.menuHeader,dividerBorderColor:f.bodyDivider},h={selectors:(n={},n[ye]={color:"GrayText"},n)},m=[{color:f.inputPlaceholderText},h],x=[{color:f.inputTextHovered},h],v=[{color:f.disabledText},h],y=k(k({color:"HighlightText",backgroundColor:"Window"},vt()),{selectors:{":after":{borderColor:"Highlight"}}}),_=Io(b.borderPressedColor,g.roundedCorner2,"border",0),S={container:{},label:{},labelDisabled:{},root:[t.fonts.medium,{boxShadow:"none",marginLeft:"0",paddingRight:Qs,paddingLeft:9,color:b.textColor,position:"relative",outline:"0",userSelect:"none",backgroundColor:b.backgroundColor,cursor:"text",display:"block",height:Dc,whiteSpace:"nowrap",textOverflow:"ellipsis",boxSizing:"border-box",selectors:{".ms-Label":{display:"inline-block",marginBottom:"8px"},"&.is-open":{selectors:(r={},r[ye]=y,r)},":after":{pointerEvents:"none",content:"''",position:"absolute",left:0,top:0,bottom:0,right:0,borderWidth:"1px",borderStyle:"solid",borderColor:b.borderColor,borderRadius:g.roundedCorner2}}}],rootHovered:{selectors:(s={":after":{borderColor:b.borderHoveredColor},".ms-ComboBox-Input":[{color:f.inputTextHovered},_n(x),eo]},s[ye]=k(k({color:"HighlightText",backgroundColor:"Window"},vt()),{selectors:{":after":{borderColor:"Highlight"}}}),s)},rootPressed:[{position:"relative",selectors:(i={},i[ye]=y,i)}],rootFocused:[{selectors:(a={".ms-ComboBox-Input":[{color:f.inputTextHovered},eo]},a[ye]=y,a)},_],rootDisabled:yo(t),rootError:{selectors:{":after":{borderColor:b.erroredColor},":hover:after":{borderColor:f.inputBorderHovered}}},rootDisallowFreeForm:{},input:[_n(m),{backgroundColor:b.backgroundColor,color:b.textColor,boxSizing:"border-box",width:"100%",height:"100%",borderStyle:"none",outline:"none",font:"inherit",textOverflow:"ellipsis",padding:"0",selectors:{"::-ms-clear":{display:"none"}}},eo],inputDisabled:[yo(t),_n(v)],errorMessage:[t.fonts.small,{color:b.erroredColor,marginTop:"5px"}],callout:{boxShadow:g.elevation8},optionsContainerWrapper:{width:o},optionsContainer:{display:"block"},screenReaderText:Ba,header:[p.medium,{fontWeight:ps.semibold,color:d.headerTextColor,backgroundColor:"none",borderStyle:"none",height:vo,lineHeight:vo,cursor:"default",padding:"0 8px",userSelect:"none",textAlign:"left",selectors:(c={},c[ye]=k({color:"GrayText"},vt()),c)}],divider:{height:1,backgroundColor:d.dividerBorderColor}};return Do(S,e)}),Nc=wt(function(t,e,o,n,r,s,i,a){return{container:ve("ms-ComboBox-container",e,t.container),label:ve(t.label,n&&t.labelDisabled),root:ve("ms-ComboBox",a?t.rootError:o&&"is-open",r&&"is-required",t.root,!i&&t.rootDisallowFreeForm,a&&!s?t.rootError:!n&&s&&t.rootFocused,!n&&{selectors:{":hover":a?t.rootError:!o&&!s&&t.rootHovered,":active":a?t.rootError:t.rootPressed,":focus":a?t.rootError:t.rootFocused}},n&&["is-disabled",t.rootDisabled]),input:ve("ms-ComboBox-Input",t.input,n&&t.inputDisabled),errorMessage:ve(t.errorMessage),callout:ve("ms-ComboBox-callout",t.callout),optionsContainerWrapper:ve("ms-ComboBox-optionsContainerWrapper",t.optionsContainerWrapper),optionsContainer:ve("ms-ComboBox-optionsContainer",t.optionsContainer),header:ve("ms-ComboBox-header",t.header),divider:ve("ms-ComboBox-divider",t.divider),screenReaderText:ve(t.screenReaderText)}}),to=wt(function(t){return{optionText:ve("ms-ComboBox-optionText",t.optionText),root:ve("ms-ComboBox-option",t.root,{selectors:{":hover":t.rootHovered,":focus":t.rootFocused,":active":t.rootPressed}}),optionTextWrapper:ve(t.optionTextWrapper)}}),Se;(function(t){t[t.backward=-1]="backward",t[t.none=0]="none",t[t.forward=1]="forward"})(Se||(Se={}));var Ze;(function(t){t[t.clearAll=-2]="clearAll",t[t.default=-1]="default"})(Ze||(Ze={}));var Pc=250,Ac=500,Ec=1e3,Fc=l.memo(function(t){var e=t.render;return e()},function(t,e){t.render;var o=co(t,["render"]);e.render;var n=co(e,["render"]);return hs(o,n)}),Bc="ComboBox",$c={options:[],allowFreeform:!1,autoComplete:"on",buttonIconProps:{iconName:"ChevronDown"}};function Rc(t){var e=t.options,o=t.defaultSelectedKey,n=t.selectedKey,r=l.useState(function(){return jr(e,Hc(o,n))}),s=r[0],i=r[1],a=l.useState(e),c=a[0],f=a[1],p=l.useState(),g=p[0],b=p[1];return l.useEffect(function(){if(n!==void 0){var d=Co(n),h=jr(e,d);i(h)}f(e)},[e,n]),l.useEffect(function(){n===null&&b(void 0)},[n]),[s,i,c,f,g,b]}var Lo=l.forwardRef(function(t,e){var o=gs($c,t);o.ref;var n=co(o,["ref"]),r=l.useRef(null),s=Dn(r,e),i=Rc(n),a=i[0],c=i[1],f=i[2],p=i[3],g=i[4],b=i[5];return l.createElement(Lc,k({},n,{hoisted:{mergedRootRef:s,rootRef:r,selectedIndices:a,setSelectedIndices:c,currentOptions:f,setCurrentOptions:p,suggestedDisplayValue:g,setSuggestedDisplayValue:b}}))});Lo.displayName=Bc;function ei(t,e){for(var o=eu(t),n=0;n<o.length;n++){var r=o[n];if(e(r))return r;var s=ei(r,e);if(s)return s}return null}var Lc=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return n._autofill=l.createRef(),n._comboBoxWrapper=l.createRef(),n._comboBoxMenu=l.createRef(),n._selectedElement=l.createRef(),n.focus=function(r,s){n.props.disabled||(n._autofill.current&&(s?$a(n._autofill.current):n._autofill.current.focus(),r&&n.setState({isOpen:!0})),n._hasFocus()||n.setState({focusState:"focused"}))},n.dismissMenu=function(){var r=n.state.isOpen;r&&n.setState({isOpen:!1})},n._onUpdateValueInAutofillWillReceiveProps=function(){var r=n._autofill.current;return!r||r.value===null||r.value===void 0?null:et(n._currentVisibleValue)},n._renderComboBoxWrapper=function(r,s){var i=n.props,a=i.label,c=i.disabled,f=i.ariaLabel,p=i.ariaDescribedBy,g=p===void 0?n.props["aria-describedby"]:p,b=i.required,d=i.errorMessage,h=i.buttonIconProps,m=i.isButtonAriaHidden,x=i.title,v=i.placeholder,y=i.tabIndex,_=i.autofill,S=i.iconButtonProps,M=i.hoisted.suggestedDisplayValue,P=n.state,O=P.ariaActiveDescendantValue,j=P.isOpen,K=n._hasFocus()&&n.props.multiSelect&&r?r:v,U=[n.props["aria-labelledby"],a&&n._id+"-label"].join(" ").trim(),re={"aria-labelledby":U||void 0,"aria-label":f&&!a?f:void 0};return l.createElement("div",{"data-ktp-target":!0,ref:n._comboBoxWrapper,id:n._id+"wrapper",className:n._classNames.root,"aria-owns":j?n._id+"-list":void 0},l.createElement(kc,k({"data-ktp-execute-target":!0,"data-is-interactable":!c,componentRef:n._autofill,id:n._id+"-input",className:n._classNames.input,type:"text",onFocus:n._onFocus,onBlur:n._onBlur,onKeyDown:n._onInputKeyDown,onKeyUp:n._onInputKeyUp,onClick:n._onAutofillClick,onTouchStart:n._onTouchStart,onInputValueChange:n._onInputChange,"aria-expanded":j,"aria-autocomplete":n._getAriaAutoCompleteValue(),role:"combobox",readOnly:c},re,{"aria-describedby":d!==void 0?Ra(g,s):g,"aria-activedescendant":O,"aria-required":b,"aria-disabled":c,"aria-controls":j?n._id+"-list":void 0,spellCheck:!1,defaultVisibleValue:n._currentVisibleValue,suggestedDisplayValue:M,updateValueInWillReceiveProps:n._onUpdateValueInAutofillWillReceiveProps,shouldSelectFullInputValueInComponentDidUpdate:n._onShouldSelectFullInputValueInAutofillComponentDidUpdate,title:x,preventValueSelection:!n._hasFocus(),placeholder:K,tabIndex:c?-1:y},_)),l.createElement(le,k({className:"ms-ComboBox-CaretDown-button",styles:n._getCaretButtonStyles(),role:m?"presentation":void 0,"aria-hidden":m},m?void 0:re,{"data-is-focusable":!1,tabIndex:-1,onClick:n._onComboBoxClick,onBlur:n._onBlur,iconProps:h,disabled:c,checked:j},S)))},n._onShouldSelectFullInputValueInAutofillComponentDidUpdate=function(){return n._currentVisibleValue===n.props.hoisted.suggestedDisplayValue},n._getVisibleValue=function(){var r=n.props,s=r.text,i=r.allowFreeform,a=r.allowFreeInput,c=r.autoComplete,f=r.hoisted,p=f.suggestedDisplayValue,g=f.selectedIndices,b=f.currentOptions,d=n.state,h=d.currentPendingValueValidIndex,m=d.currentPendingValue,x=d.isOpen,v=Ae(b,h);if(!(x&&v)&&(s||s==="")&&m==null)return s;if(n.props.multiSelect)if(n._hasFocus()){var y=-1;return c==="on"&&v&&(y=h),n._getPendingString(m,b,y)}else return n._getMultiselectDisplayString(g,b,p);else{var y=n._getFirstSelectedIndex();return i||a?(c==="on"&&v&&(y=h),n._getPendingString(m,b,y)):v&&c==="on"?(y=h,et(m)):!n.state.isOpen&&m?Ae(b,y)?m:et(p):Ae(b,y)?Ee(b[y]):et(p)}},n._onInputChange=function(r){if(n.props.disabled){n._handleInputWhenDisabled(null);return}n.props.onInputValueChange&&n.props.onInputValueChange(r),n.props.allowFreeform||n.props.allowFreeInput?n._processInputChangeWithFreeform(r):n._processInputChangeWithoutFreeform(r)},n._onFocus=function(){var r,s;(s=(r=n._autofill.current)===null||r===void 0?void 0:r.inputElement)===null||s===void 0||s.select(),n._hasFocus()||n.setState({focusState:"focusing"})},n._onResolveOptions=function(){if(n.props.onResolveOptions){var r=n.props.onResolveOptions(Kn([],n.props.hoisted.currentOptions));Array.isArray(r)?n.props.hoisted.setCurrentOptions(r):r&&r.then&&(n._currentPromise=r,r.then(function(s){r===n._currentPromise&&n.props.hoisted.setCurrentOptions(s)}))}},n._onBlur=function(r){var s,i,a=r.relatedTarget;if(r.relatedTarget===null&&(a=document.activeElement),a){var c=(s=n.props.hoisted.rootRef.current)===null||s===void 0?void 0:s.contains(a),f=(i=n._comboBoxMenu.current)===null||i===void 0?void 0:i.contains(a),p=n._comboBoxMenu.current&&La(n._comboBoxMenu.current,function(g){return g===a});if(c||f||p){p&&n._hasFocus()&&(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r),r.preventDefault(),r.stopPropagation();return}}n._hasFocus()&&(n.setState({focusState:"none"}),(!n.props.multiSelect||n.props.allowFreeform)&&n._submitPendingValue(r))},n._onRenderContainer=function(r,s){var i=r.onRenderList,a=r.calloutProps,c=r.dropdownWidth,f=r.dropdownMaxWidth,p=r.onRenderUpperContent,g=p===void 0?n._onRenderUpperContent:p,b=r.onRenderLowerContent,d=b===void 0?n._onRenderLowerContent:b,h=r.useComboBoxAsMenuWidth,m=r.persistMenu,x=r.shouldRestoreFocus,v=x===void 0?!0:x,y=n.state.isOpen,_=n._id,S=h&&n._comboBoxWrapper.current?n._comboBoxWrapper.current.clientWidth+2:void 0;return l.createElement(bs,k({isBeakVisible:!1,gapSpace:0,doNotLayer:!1,directionalHint:An.bottomLeftEdge,directionalHintFixed:!1},a,{onLayerMounted:n._onLayerMounted,className:jo(n._classNames.callout,a?.className),target:n._comboBoxWrapper.current,onDismiss:n._onDismiss,onMouseDown:n._onCalloutMouseDown,onScroll:n._onScroll,setInitialFocus:!1,calloutWidth:h&&n._comboBoxWrapper.current?S&&S:c,calloutMaxWidth:f||S,hidden:m?!y:void 0,shouldRestoreFocus:v}),g(n.props,n._onRenderUpperContent),l.createElement("div",{className:n._classNames.optionsContainerWrapper,ref:n._comboBoxMenu},i?.(k(k({},r),{id:_}),n._onRenderList)),d(n.props,n._onRenderLowerContent))},n._onLayerMounted=function(){n._onCalloutLayerMounted(),n._async.setTimeout(function(){n._scrollIntoView()},0),n.props.calloutProps&&n.props.calloutProps.onLayerMounted&&n.props.calloutProps.onLayerMounted()},n._onRenderLabel=function(r){var s=r.props,i=s.label,a=s.disabled,c=s.required;return i?l.createElement(En,{id:n._id+"-label",disabled:a,required:c,className:n._classNames.label},i,r.multiselectAccessibleText&&l.createElement("span",{className:n._classNames.screenReaderText},r.multiselectAccessibleText)):null},n._onRenderList=function(r){var s=r.onRenderItem,i=s===void 0?n._onRenderItem:s,a=r.label,c=r.ariaLabel,f=r.multiSelect,p={items:[]},g=[],b=function(){var m=p.id?[l.createElement("div",{role:"group",key:p.id,"aria-labelledby":p.id},p.items)]:p.items;g=Kn(Kn([],g),m),p={items:[]}},d=function(m,x){switch(m.itemType){case fe.Header:p.items.length>0&&b();var v=n._id+m.key;p.items.push(i(k(k({id:v},m),{index:x}),n._onRenderItem)),p.id=v;break;case fe.Divider:x>0&&p.items.push(i(k(k({},m),{index:x}),n._onRenderItem)),p.items.length>0&&b();break;default:p.items.push(i(k(k({},m),{index:x}),n._onRenderItem))}};r.options.forEach(function(m,x){d(m,x)}),p.items.length>0&&b();var h=n._id;return l.createElement("div",{id:h+"-list",className:n._classNames.optionsContainer,"aria-labelledby":a&&h+"-label","aria-label":c&&!a?c:void 0,"aria-multiselectable":f?"true":void 0,role:"listbox"},g)},n._onRenderItem=function(r){switch(r.itemType){case fe.Divider:return n._renderSeparator(r);case fe.Header:return n._renderHeader(r);default:return n._renderOption(r)}},n._onRenderLowerContent=function(){return null},n._onRenderUpperContent=function(){return null},n._renderOption=function(r){var s,i=n.props.onRenderOption,a=i===void 0?n._onRenderOptionContent:i,c=(s=r.id)!==null&&s!==void 0?s:n._id+"-list"+r.index,f=n._isOptionSelected(r.index),p=n._isOptionChecked(r.index),g=n._isOptionIndeterminate(r.index),b=n._getCurrentOptionStyles(r),d=to(n._getCurrentOptionStyles(r)),h=r.title,m=function(){return n.props.multiSelect?l.createElement(ys,{id:c,ariaLabel:r.ariaLabel,ariaLabelledBy:r.ariaLabel?void 0:c+"-label",key:r.key,styles:b,className:"ms-ComboBox-option",onChange:n._onItemClick(r),label:r.text,checked:p,indeterminate:g,title:h,disabled:r.disabled,onRenderLabel:n._renderCheckboxLabel.bind(n,k(k({},r),{id:c+"-label"})),inputProps:k({"aria-selected":p?"true":"false",role:"option"},{"data-index":r.index,"data-is-focusable":!0})}):l.createElement(Ka,{id:c,key:r.key,"data-index":r.index,styles:b,checked:f,className:"ms-ComboBox-option",onClick:n._onItemClick(r),onMouseEnter:n._onOptionMouseEnter.bind(n,r.index),onMouseMove:n._onOptionMouseMove.bind(n,r.index),onMouseLeave:n._onOptionMouseLeave,role:"option","aria-selected":f?"true":"false",ariaLabel:r.ariaLabel,disabled:r.disabled,title:h},l.createElement("span",{className:d.optionTextWrapper,ref:f?n._selectedElement:void 0},a(r,n._onRenderOptionContent)))};return l.createElement(Fc,{key:r.key,index:r.index,disabled:r.disabled,isSelected:f,isChecked:p,isIndeterminate:g,text:r.text,render:m,data:r.data})},n._onCalloutMouseDown=function(r){r.preventDefault()},n._onScroll=function(){var r;!n._isScrollIdle&&n._scrollIdleTimeoutId!==void 0?(n._async.clearTimeout(n._scrollIdleTimeoutId),n._scrollIdleTimeoutId=void 0):n._isScrollIdle=!1,!((r=n.props.calloutProps)===null||r===void 0)&&r.onScroll&&n.props.calloutProps.onScroll(),n._scrollIdleTimeoutId=n._async.setTimeout(function(){n._isScrollIdle=!0},Pc)},n._onRenderOptionContent=function(r){var s=to(n._getCurrentOptionStyles(r));return l.createElement("span",{className:s.optionText},r.text)},n._onRenderMultiselectOptionContent=function(r){var s=to(n._getCurrentOptionStyles(r));return l.createElement("span",{id:r.id,"aria-hidden":"true",className:s.optionText},r.text)},n._onDismiss=function(){var r=n.props.onMenuDismiss;r&&r(),n.props.persistMenu&&n._onCalloutLayerMounted(),n._setOpenStateAndFocusOnClose(!1,!1),n._resetSelectedIndex()},n._onAfterClearPendingInfo=function(){n._processingClearPendingInfo=!1},n._onInputKeyDown=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.allowFreeInput,f=s.autoComplete,p=s.hoisted.currentOptions,g=n.state,b=g.isOpen,d=g.currentPendingValueValidIndexOnHover;if(n._lastKeyDownWasAltOrMeta=Mr(r),i){n._handleInputWhenDisabled(r);return}var h=n._getPendingSelectedIndex(!1);switch(r.which){case V.enter:n._autofill.current&&n._autofill.current.inputElement&&n._autofill.current.inputElement.select(),n._submitPendingValue(r),n.props.multiSelect&&b?n.setState({currentPendingValueValidIndex:h}):(b||(!a||n.state.currentPendingValue===void 0||n.state.currentPendingValue===null||n.state.currentPendingValue.length<=0)&&n.state.currentPendingValueValidIndex<0)&&n.setState({isOpen:!b});break;case V.tab:n.props.multiSelect||n._submitPendingValue(r),b&&n._setOpenStateAndFocusOnClose(!b,!1);return;case V.escape:if(n._resetSelectedIndex(),b)n.setState({isOpen:!1});else return;break;case V.up:if(d===Ze.clearAll&&(h=n.props.hoisted.currentOptions.length),r.altKey||r.metaKey){if(b){n._setOpenStateAndFocusOnClose(!b,!0);break}return}r.preventDefault(),n._setPendingInfoFromIndexAndDirection(h,Se.backward);break;case V.down:r.altKey||r.metaKey?n._setOpenStateAndFocusOnClose(!0,!0):(d===Ze.clearAll&&(h=-1),r.preventDefault(),n._setPendingInfoFromIndexAndDirection(h,Se.forward));break;case V.home:case V.end:if(a||c)return;h=-1;var m=Se.forward;r.which===V.end&&(h=p.length,m=Se.backward),n._setPendingInfoFromIndexAndDirection(h,m);break;case V.space:if(!a&&!c&&f==="off")break;default:if(r.which>=112&&r.which<=123||r.keyCode===V.alt||r.key==="Meta")return;if(!a&&!c&&f==="on"){n._onInputChange(r.key);break}return}r.stopPropagation(),r.preventDefault()},n._onInputKeyUp=function(r){var s=n.props,i=s.disabled,a=s.allowFreeform,c=s.allowFreeInput,f=s.autoComplete,p=n.state.isOpen,g=n._lastKeyDownWasAltOrMeta&&Mr(r);n._lastKeyDownWasAltOrMeta=!1;var b=g&&!(Ha()||Va());if(i){n._handleInputWhenDisabled(r);return}switch(r.which){case V.space:!a&&!c&&f==="off"&&n._setOpenStateAndFocusOnClose(!p,!!p);return;default:b&&p?n._setOpenStateAndFocusOnClose(!p,!0):(n.state.focusState==="focusing"&&n.props.openOnKeyboardFocus&&n.setState({isOpen:!0}),n.state.focusState!=="focused"&&n.setState({focusState:"focused"}));return}},n._onOptionMouseLeave=function(){n._shouldIgnoreMouseEvent()||n.props.persistMenu&&!n.state.isOpen||n.setState({currentPendingValueValidIndexOnHover:Ze.clearAll})},n._onComboBoxClick=function(){var r=n.props.disabled,s=n.state.isOpen;r||(n._setOpenStateAndFocusOnClose(!s,!1),n.setState({focusState:"focused"}))},n._onAutofillClick=function(){var r=n.props,s=r.disabled,i=r.allowFreeform;i&&!s?n.focus(n.state.isOpen||n._processingTouch):n._onComboBoxClick()},n._onTouchStart=function(){n._comboBoxWrapper.current&&!("onpointerdown"in n._comboBoxWrapper)&&n._handleTouchAndPointerEvent()},n._onPointerDown=function(r){r.pointerType==="touch"&&(n._handleTouchAndPointerEvent(),r.preventDefault(),r.stopImmediatePropagation())},Rt(n),n._async=new fs(n),n._events=new xs(n),n._id=o.id||fo("ComboBox"),n._isScrollIdle=!0,n._processingTouch=!1,n._gotMouseMove=!1,n._processingClearPendingInfo=!1,n.state={isOpen:!1,focusState:"none",currentPendingValueValidIndex:-1,currentPendingValue:void 0,currentPendingValueValidIndexOnHover:Ze.default},n}return Object.defineProperty(e.prototype,"selectedOptions",{get:function(){var o=this.props.hoisted,n=o.currentOptions,r=o.selectedIndices;return Wa(n,r)},enumerable:!1,configurable:!0}),e.prototype.componentDidMount=function(){this._comboBoxWrapper.current&&!this.props.disabled&&(this._events.on(this._comboBoxWrapper.current,"focus",this._onResolveOptions,!0),"onpointerdown"in this._comboBoxWrapper.current&&this._events.on(this._comboBoxWrapper.current,"pointerdown",this._onPointerDown,!0))},e.prototype.componentDidUpdate=function(o,n){var r=this,s,i,a,c=this.props,f=c.allowFreeform,p=c.allowFreeInput,g=c.text,b=c.onMenuOpen,d=c.onMenuDismissed,h=c.hoisted,m=h.currentOptions,x=h.selectedIndices,v=this.state,y=v.currentPendingValue,_=v.currentPendingValueValidIndex,S=v.isOpen;S&&(!n.isOpen||n.currentPendingValueValidIndex!==_)&&this._async.setTimeout(function(){return r._scrollIntoView()},0),this._hasFocus()&&(S||n.isOpen&&!S&&this._focusInputAfterClose&&this._autofill.current&&document.activeElement!==this._autofill.current.inputElement)&&this.focus(void 0,!0),this._focusInputAfterClose&&(n.isOpen&&!S||this._hasFocus()&&(!S&&!this.props.multiSelect&&o.hoisted.selectedIndices&&x&&o.hoisted.selectedIndices[0]!==x[0]||!f&&!p||g!==o.text))&&this._onFocus(),this._notifyPendingValueChanged(n),S&&!n.isOpen&&b&&b(),!S&&n.isOpen&&d&&d();var M=_,P=m.map(function(j,K){return k(k({},j),{index:K})});!hs(o.hoisted.currentOptions,m)&&y&&(M=this.props.allowFreeform||this.props.allowFreeInput?this._processInputChangeWithFreeform(y):this._updateAutocompleteIndexWithoutFreeform(y));var O=void 0;S&&x.length?O=(i=(s=P[x[0]])===null||s===void 0?void 0:s.id)!==null&&i!==void 0?i:this._id+"-list"+x[0]:S&&this._hasFocus()&&M!==-1&&(O=(a=P[M].id)!==null&&a!==void 0?a:this._id+"-list"+M),O!==this.state.ariaActiveDescendantValue&&this.setState({ariaActiveDescendantValue:O})},e.prototype.componentWillUnmount=function(){this._async.dispose(),this._events.dispose()},e.prototype.render=function(){var o=this._id,n=o+"-error",r=this.props,s=r.className,i=r.disabled,a=r.required,c=r.errorMessage,f=r.onRenderContainer,p=f===void 0?this._onRenderContainer:f,g=r.onRenderLabel,b=g===void 0?this._onRenderLabel:g,d=r.onRenderList,h=d===void 0?this._onRenderList:d,m=r.onRenderItem,x=m===void 0?this._onRenderItem:m,v=r.onRenderOption,y=v===void 0?this._onRenderOptionContent:v,_=r.allowFreeform,S=r.styles,M=r.theme,P=r.persistMenu,O=r.multiSelect,j=r.hoisted,K=j.suggestedDisplayValue,U=j.selectedIndices,re=j.currentOptions,se=this.state.isOpen;this._currentVisibleValue=this._getVisibleValue();var Z=O?this._getMultiselectDisplayString(U,re,K):void 0,pe=Pn(this.props,vs,["onChange","value","aria-describedby","aria-labelledby"]),ce=!!(c&&c.length>0);this._classNames=this.props.getClassNames?this.props.getClassNames(M,!!se,!!i,!!a,!!this._hasFocus(),!!_,!!ce,s):Nc(Oc(M,S),s,!!se,!!i,!!a,!!this._hasFocus(),!!_,!!ce);var ee=this._renderComboBoxWrapper(Z,n);return l.createElement("div",k({},pe,{ref:this.props.hoisted.mergedRootRef,className:this._classNames.container}),b({props:this.props,multiselectAccessibleText:Z},this._onRenderLabel),ee,(P||se)&&p(k(k({},this.props),{onRenderList:h,onRenderItem:x,onRenderOption:y,options:re.map(function(de,te){return k(k({},de),{index:te})}),onDismiss:this._onDismiss}),this._onRenderContainer),ce&&l.createElement("div",{role:"alert",id:n,className:this._classNames.errorMessage},c))},e.prototype._getPendingString=function(o,n,r){return o??(Ae(n,r)?Ee(n[r]):"")},e.prototype._getMultiselectDisplayString=function(o,n,r){for(var s=[],i=0;o&&i<o.length;i++){var a=o[i];n[a].itemType!==fe.SelectAll&&s.push(Ae(n,a)?n[a].text:et(r))}var c=this.props.multiSelectDelimiter,f=c===void 0?", ":c;return s.join(f)},e.prototype._processInputChangeWithFreeform=function(o){var n=this.props.hoisted.currentOptions,r=-1;if(o===""){var s=n.map(function(f,p){return k(k({},f),{index:p})}).filter(function(f){return fn(f)&&!f.disabled&&Ee(f)===o});return s.length===1&&(r=s[0].index),this._setPendingInfo(o,r,o),r}var i=o;o=o.toLocaleLowerCase();var a="";if(this.props.autoComplete==="on"){var s=n.map(function(p,g){return k(k({},p),{index:g})}).filter(function(p){return fn(p)&&!p.disabled&&Ee(p).toLocaleLowerCase().indexOf(o)===0});if(s.length>0){var c=Ee(s[0]);a=c.toLocaleLowerCase()!==o?c:"",r=s[0].index}}else{var s=n.map(function(p,g){return k(k({},p),{index:g})}).filter(function(p){return fn(p)&&!p.disabled&&Ee(p).toLocaleLowerCase()===o});s.length===1&&(r=s[0].index)}return this._setPendingInfo(i,r,a),r},e.prototype._processInputChangeWithoutFreeform=function(o){var n=this,r=this.state,s=r.currentPendingValue,i=r.currentPendingValueValidIndex;if(this.props.autoComplete==="on"&&o!==""){this._autoCompleteTimeout&&(this._async.clearTimeout(this._autoCompleteTimeout),this._autoCompleteTimeout=void 0,o=et(s)+o);var a=this._updateAutocompleteIndexWithoutFreeform(o);return this._autoCompleteTimeout=this._async.setTimeout(function(){n._autoCompleteTimeout=void 0},Ec),a}var c=i>=0?i:this._getFirstSelectedIndex();return this._setPendingInfoFromIndex(c),c},e.prototype._updateAutocompleteIndexWithoutFreeform=function(o){var n=this.props.hoisted.currentOptions,r=o;o=o.toLocaleLowerCase();var s=n.map(function(i,a){return k(k({},i),{index:a})}).filter(function(i){return fn(i)&&!i.disabled&&i.text.toLocaleLowerCase().indexOf(o)===0});return s.length>0?(this._setPendingInfo(r,s[0].index,Ee(s[0])),s[0].index):-1},e.prototype._getFirstSelectedIndex=function(){var o=this.props.hoisted.selectedIndices;return o?.length?o[0]:-1},e.prototype._getNextSelectableIndex=function(o,n){var r=this.props.hoisted.currentOptions,s=o+n;if(s=Math.max(0,Math.min(r.length-1,s)),!Ae(r,s))return-1;var i=r[s];if(!no(i)||i.hidden===!0)if(n!==Se.none&&(s>0&&n<Se.none||s>=0&&s<r.length&&n>Se.none))s=this._getNextSelectableIndex(s,n);else return o;return s},e.prototype._setSelectedIndex=function(o,n,r){r===void 0&&(r=Se.none);var s=this.props,i=s.onChange,a=s.onPendingValueChanged,c=s.hoisted,f=c.selectedIndices,p=c.currentOptions,g=f?f.slice():[],b=p.slice();if(o=this._getNextSelectableIndex(o,r),!!Ae(p,o)){if(this.props.multiSelect||g.length<1||g.length===1&&g[0]!==o){var d=k({},p[o]);if(!d||d.disabled)return;if(this.props.multiSelect)if(d.selected=d.selected!==void 0?!d.selected:g.indexOf(o)<0,d.itemType===fe.SelectAll)g=[],d.selected?p.forEach(function(v,y){!v.disabled&&no(v)&&(g.push(y),b[y]=k(k({},v),{selected:!0}))}):b=p.map(function(v){return k(k({},v),{selected:!1})});else{d.selected&&g.indexOf(o)<0?g.push(o):!d.selected&&g.indexOf(o)>=0&&(g=g.filter(function(v){return v!==o})),b[o]=d;var h=b.filter(function(v){return v.itemType===fe.SelectAll})[0];if(h){var m=this._isSelectAllChecked(g),x=b.indexOf(h);m?(g.push(x),b[x]=k(k({},h),{selected:!0})):(g=g.filter(function(v){return v!==x}),b[x]=k(k({},h),{selected:!1}))}}else g[0]=o;n.persist(),this.props.selectedKey||this.props.selectedKey===null?this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1):(this.props.hoisted.setSelectedIndices(g),this.props.hoisted.setCurrentOptions(b),this._hasPendingValue&&a&&(a(),this._hasPendingValue=!1)),i&&i(n,d,o,Ee(d))}this.props.multiSelect&&this.state.isOpen||this._clearPendingInfo()}},e.prototype._submitPendingValue=function(o){var n,r=this.props,s=r.onChange,i=r.allowFreeform,a=r.autoComplete,c=r.multiSelect,f=r.hoisted,p=f.currentOptions,g=this.state,b=g.currentPendingValue,d=g.currentPendingValueValidIndex,h=g.currentPendingValueValidIndexOnHover,m=this.props.hoisted.selectedIndices;if(!this._processingClearPendingInfo){if(i){if(b==null){h>=0&&(this._setSelectedIndex(h,o),this._clearPendingInfo());return}if(Ae(p,d)){var x=Ee(p[d]).toLocaleLowerCase(),v=this._autofill.current;if(b.toLocaleLowerCase()===x||a&&x.indexOf(b.toLocaleLowerCase())===0&&v?.isValueSelected&&b.length+(v.selectionEnd-v.selectionStart)===x.length||((n=v?.inputElement)===null||n===void 0?void 0:n.value.toLocaleLowerCase())===x){if(this._setSelectedIndex(d,o),c&&this.state.isOpen)return;this._clearPendingInfo();return}}if(s)s&&s(o,void 0,void 0,b);else{var y={key:b||fo(),text:et(b)};c&&(y.selected=!0);var _=p.concat([y]);m&&(c||(m=[]),m.push(_.length-1)),f.setCurrentOptions(_),f.setSelectedIndices(m)}}else d>=0?this._setSelectedIndex(d,o):h>=0&&this._setSelectedIndex(h,o);this._clearPendingInfo()}},e.prototype._onCalloutLayerMounted=function(){this._gotMouseMove=!1},e.prototype._renderSeparator=function(o){var n=o.index,r=o.key;return n&&n>0?l.createElement("div",{role:"separator",key:r,className:this._classNames.divider}):null},e.prototype._renderHeader=function(o){var n=this.props.onRenderOption,r=n===void 0?this._onRenderOptionContent:n;return l.createElement("div",{id:o.id,key:o.key,className:this._classNames.header},r(o,this._onRenderOptionContent))},e.prototype._renderCheckboxLabel=function(o){var n=this.props.onRenderOption,r=n===void 0?this._onRenderMultiselectOptionContent:n;return r(o,this._onRenderMultiselectOptionContent)},e.prototype._isOptionHighlighted=function(o){var n=this.state.currentPendingValueValidIndexOnHover;return n===Ze.clearAll?!1:n>=0?n===o:this._isOptionSelected(o)},e.prototype._isOptionSelected=function(o){return this._getPendingSelectedIndex(!0)===o},e.prototype._isOptionChecked=function(o){if(this.props.multiSelect&&o!==void 0&&this.props.hoisted.selectedIndices){var n=-1;return n=this.props.hoisted.selectedIndices.indexOf(o),n>=0}return!1},e.prototype._isOptionIndeterminate=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted;if(r&&o!==void 0&&s.selectedIndices&&s.currentOptions){var i=s.currentOptions[o];if(i&&i.itemType===fe.SelectAll)return s.selectedIndices.length>0&&!this._isSelectAllChecked()}return!1},e.prototype._isSelectAllChecked=function(o){var n=this.props,r=n.multiSelect,s=n.hoisted,i=s.currentOptions.find(function(g){return g.itemType===fe.SelectAll}),a=o||s.selectedIndices;if(!r||!a||!i)return!1;var c=s.currentOptions.indexOf(i),f=a.filter(function(g){return g!==c}),p=s.currentOptions.filter(function(g){return!g.disabled&&g.itemType!==fe.SelectAll&&no(g)});return f.length===p.length},e.prototype._getPendingSelectedIndex=function(o){var n=this.state,r=n.currentPendingValueValidIndex,s=n.currentPendingValue;return r>=0||o&&s!==null&&s!==void 0?r:this.props.multiSelect?-1:this._getFirstSelectedIndex()},e.prototype._scrollIntoView=function(){var o=this.props,n=o.onScrollToItem,r=o.scrollSelectedToTop,s=this._getPendingSelectedIndex(!0);if(n){n(s>=0?s:this._getFirstSelectedIndex());return}var i=this._selectedElement.current;if(this.props.multiSelect&&this._comboBoxMenu.current&&(i=ei(this._comboBoxMenu.current,function(y){var _;return((_=y.dataset)===null||_===void 0?void 0:_.index)===s.toString()})),i&&i.offsetParent){var a=!0;if(this._comboBoxMenu.current&&this._comboBoxMenu.current.offsetParent){var c=this._comboBoxMenu.current.offsetParent,f=i.offsetParent,p=f,g=p.offsetHeight,b=p.offsetTop,d=c,h=d.offsetHeight,m=d.scrollTop,x=b<m,v=b+g>m+h;x||r?(a=!1,c.scrollTo(0,b)):v&&c.scrollTo(0,b-h+g)}else i.offsetParent.scrollIntoView(a)}},e.prototype._onItemClick=function(o){var n=this,r=this.props.onItemClick,s=o.index;return function(i){n.props.multiSelect||(n._autofill.current&&n._autofill.current.focus(),n.setState({isOpen:!1})),r&&r(i,o,s),n._setSelectedIndex(s,i)}},e.prototype._resetSelectedIndex=function(){var o=this.props.hoisted.currentOptions;this._clearPendingInfo();var n=this._getFirstSelectedIndex();n>0&&n<o.length?this.props.hoisted.setSuggestedDisplayValue(o[n].text):this.props.text&&this.props.hoisted.setSuggestedDisplayValue(this.props.text)},e.prototype._clearPendingInfo=function(){this._processingClearPendingInfo=!0,this.props.hoisted.setSuggestedDisplayValue(void 0),this.setState({currentPendingValue:void 0,currentPendingValueValidIndex:-1,currentPendingValueValidIndexOnHover:Ze.default},this._onAfterClearPendingInfo)},e.prototype._setPendingInfo=function(o,n,r){n===void 0&&(n=-1),!this._processingClearPendingInfo&&(this.props.hoisted.setSuggestedDisplayValue(r),this.setState({currentPendingValue:et(o),currentPendingValueValidIndex:n,currentPendingValueValidIndexOnHover:Ze.default}))},e.prototype._setPendingInfoFromIndex=function(o){var n=this.props.hoisted.currentOptions;if(o>=0&&o<n.length){var r=n[o];this._setPendingInfo(Ee(r),o,Ee(r))}else this._clearPendingInfo()},e.prototype._setPendingInfoFromIndexAndDirection=function(o,n){var r=this.props.hoisted.currentOptions;n===Se.forward&&o>=r.length-1?o=-1:n===Se.backward&&o<=0&&(o=r.length);var s=this._getNextSelectableIndex(o,n);o===s?n===Se.forward?o=this._getNextSelectableIndex(-1,n):n===Se.backward&&(o=this._getNextSelectableIndex(r.length,n)):o=s,Ae(r,o)&&this._setPendingInfoFromIndex(o)},e.prototype._notifyPendingValueChanged=function(o){var n=this.props.onPendingValueChanged;if(n){var r=this.props.hoisted.currentOptions,s=this.state,i=s.currentPendingValue,a=s.currentPendingValueValidIndex,c=s.currentPendingValueValidIndexOnHover,f=void 0,p=void 0;c!==o.currentPendingValueValidIndexOnHover&&Ae(r,c)?f=c:a!==o.currentPendingValueValidIndex&&Ae(r,a)?f=a:i!==o.currentPendingValue&&(p=i),(f!==void 0||p!==void 0||this._hasPendingValue)&&(n(f!==void 0?r[f]:void 0,f,p),this._hasPendingValue=f!==void 0||p!==void 0)}},e.prototype._setOpenStateAndFocusOnClose=function(o,n){this._focusInputAfterClose=n,this.setState({isOpen:o})},e.prototype._onOptionMouseEnter=function(o){this._shouldIgnoreMouseEvent()||this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._onOptionMouseMove=function(o){this._gotMouseMove=!0,!(!this._isScrollIdle||this.state.currentPendingValueValidIndexOnHover===o)&&this.setState({currentPendingValueValidIndexOnHover:o})},e.prototype._shouldIgnoreMouseEvent=function(){return!this._isScrollIdle||!this._gotMouseMove},e.prototype._handleInputWhenDisabled=function(o){this.props.disabled&&(this.state.isOpen&&this.setState({isOpen:!1}),o!==null&&o.which!==V.tab&&o.which!==V.escape&&(o.which<112||o.which>123)&&(o.stopPropagation(),o.preventDefault()))},e.prototype._handleTouchAndPointerEvent=function(){var o=this;this._lastTouchTimeoutId!==void 0&&(this._async.clearTimeout(this._lastTouchTimeoutId),this._lastTouchTimeoutId=void 0),this._processingTouch=!0,this._lastTouchTimeoutId=this._async.setTimeout(function(){o._processingTouch=!1,o._lastTouchTimeoutId=void 0},Ac)},e.prototype._getCaretButtonStyles=function(){var o=this.props.caretDownButtonStyles;return Mc(this.props.theme,o)},e.prototype._getCurrentOptionStyles=function(o){var n=this.props.comboBoxOptionStyles,r=o.styles;return jc(this.props.theme,n,r,this._isPendingOption(o),o.hidden,this._isOptionHighlighted(o.index))},e.prototype._getAriaAutoCompleteValue=function(){var o=!this.props.disabled&&this.props.autoComplete==="on";return o?this.props.allowFreeform?"inline":"both":"list"},e.prototype._isPendingOption=function(o){return o&&o.index===this.state.currentPendingValueValidIndex},e.prototype._hasFocus=function(){return this.state.focusState!=="none"},e=Mo([Ua("ComboBox",["theme","styles"],!0)],e),e}(l.Component);function jr(t,e){if(!t||!e)return[];var o={};t.forEach(function(a,c){a.selected&&(o[c]=!0)});for(var n=function(a){var c=za(t,function(f){return f.key===a});c>-1&&(o[c]=!0)},r=0,s=e;r<s.length;r++){var i=s[r];n(i)}return Object.keys(o).map(Number).sort()}function Hc(t,e){var o=Co(t);return o.length?o:Co(e)}function Co(t){return t===void 0?[]:t instanceof Array?t:[t]}function et(t){return t||""}function Ae(t,e){return!!t&&e>=0&&e<t.length}function fn(t){return t.itemType!==fe.Header&&t.itemType!==fe.Divider&&t.itemType!==fe.SelectAll}function no(t){return t.itemType!==fe.Header&&t.itemType!==fe.Divider}function Ee(t){return t.useAriaLabelAsText&&t.ariaLabel?t.ariaLabel:t.text}function Mr(t){return t.which===V.alt||t.key==="Meta"}var ot;(function(t){t[t.normal=0]="normal",t[t.largeHeader=1]="largeHeader",t[t.close=2]="close"})(ot||(ot={}));var ti=mo.durationValue2,Vc={root:"ms-Modal",main:"ms-Dialog-main",scrollableContent:"ms-Modal-scrollableContent",isOpen:"is-open",layer:"ms-Modal-Layer"},Wc=function(t){var e,o=t.className,n=t.containerClassName,r=t.scrollableContentClassName,s=t.isOpen,i=t.isVisible,a=t.hasBeenOpened,c=t.modalRectangleTop,f=t.theme,p=t.topOffsetFixed,g=t.isModeless,b=t.layerClassName,d=t.isDefaultDragHandle,h=t.windowInnerHeight,m=f.palette,x=f.effects,v=f.fonts,y=_t(Vc,f);return{root:[y.root,v.medium,{backgroundColor:"transparent",position:"fixed",height:"100%",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,pointerEvents:"none",transition:"opacity "+ti},p&&typeof c=="number"&&a&&{alignItems:"flex-start"},s&&y.isOpen,i&&{opacity:1},i&&!g&&{pointerEvents:"auto"},o],main:[y.main,{boxShadow:x.elevation64,borderRadius:x.roundedCorner2,backgroundColor:m.white,boxSizing:"border-box",position:"relative",textAlign:"left",outline:"3px solid transparent",maxHeight:"calc(100% - 32px)",maxWidth:"calc(100% - 32px)",minHeight:"176px",minWidth:"288px",overflowY:"auto",zIndex:g?Ga.Layer:void 0},g&&{pointerEvents:"auto"},p&&typeof c=="number"&&a&&{top:c},d&&{cursor:"move"},n],scrollableContent:[y.scrollableContent,{overflowY:"auto",flexGrow:1,maxHeight:"100vh",selectors:(e={},e["@supports (-webkit-overflow-scrolling: touch)"]={maxHeight:h},e)},r],layer:g&&[b,y.layer,{pointerEvents:"none"}],keyboardMoveIconContainer:{position:"absolute",display:"flex",justifyContent:"center",width:"100%",padding:"3px 0px"},keyboardMoveIcon:{fontSize:v.xLargePlus.fontSize,width:"24px"}}},Uc=wt(function(t,e){return{root:ve(t,e&&{touchAction:"none",selectors:{"& *":{userSelect:"none"}}})}}),Gt={touch:{start:"touchstart",move:"touchmove",stop:"touchend"},mouse:{start:"mousedown",move:"mousemove",stop:"mouseup"}},Kc=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return n._currentEventType=Gt.mouse,n._events=[],n._onMouseDown=function(r){var s=l.Children.only(n.props.children).props.onMouseDown;return s&&s(r),n._currentEventType=Gt.mouse,n._onDragStart(r)},n._onMouseUp=function(r){var s=l.Children.only(n.props.children).props.onMouseUp;return s&&s(r),n._currentEventType=Gt.mouse,n._onDragStop(r)},n._onTouchStart=function(r){var s=l.Children.only(n.props.children).props.onTouchStart;return s&&s(r),n._currentEventType=Gt.touch,n._onDragStart(r)},n._onTouchEnd=function(r){var s=l.Children.only(n.props.children).props.onTouchEnd;s&&s(r),n._currentEventType=Gt.touch,n._onDragStop(r)},n._onDragStart=function(r){if(typeof r.button=="number"&&r.button!==0)return!1;if(!(n.props.handleSelector&&!n._matchesSelector(r.target,n.props.handleSelector)||n.props.preventDragSelector&&n._matchesSelector(r.target,n.props.preventDragSelector))){n._touchId=n._getTouchId(r);var s=n._getControlPosition(r);if(s!==void 0){var i=n._createDragDataFromPosition(s);n.props.onStart&&n.props.onStart(r,i),n.setState({isDragging:!0,lastPosition:s}),n._events=[pr(document.body,n._currentEventType.move,n._onDrag,!0),pr(document.body,n._currentEventType.stop,n._onDragStop,!0)]}}},n._onDrag=function(r){r.type==="touchmove"&&r.preventDefault();var s=n._getControlPosition(r);if(s){var i=n._createUpdatedDragData(n._createDragDataFromPosition(s)),a=i.position;n.props.onDragChange&&n.props.onDragChange(r,i),n.setState({position:a,lastPosition:s})}},n._onDragStop=function(r){if(n.state.isDragging){var s=n._getControlPosition(r);if(s){var i=n._createDragDataFromPosition(s);n.setState({isDragging:!1,lastPosition:void 0}),n.props.onStop&&n.props.onStop(r,i),n.props.position&&n.setState({position:n.props.position}),n._events.forEach(function(a){return a()})}}},n.state={isDragging:!1,position:n.props.position||{x:0,y:0},lastPosition:void 0},n}return e.prototype.componentDidUpdate=function(o){this.props.position&&(!o.position||this.props.position!==o.position)&&this.setState({position:this.props.position})},e.prototype.componentWillUnmount=function(){this._events.forEach(function(o){return o()})},e.prototype.render=function(){var o=l.Children.only(this.props.children),n=o.props,r=this.props.position,s=this.state,i=s.position,a=s.isDragging,c=i.x,f=i.y;return r&&!a&&(c=r.x,f=r.y),l.cloneElement(o,{style:k(k({},n.style),{transform:"translate("+c+"px, "+f+"px)"}),className:Uc(n.className,this.state.isDragging).root,onMouseDown:this._onMouseDown,onMouseUp:this._onMouseUp,onTouchStart:this._onTouchStart,onTouchEnd:this._onTouchEnd})},e.prototype._getControlPosition=function(o){var n=this._getActiveTouch(o);if(!(this._touchId!==void 0&&!n)){var r=n||o;return{x:r.clientX,y:r.clientY}}},e.prototype._getActiveTouch=function(o){return o.targetTouches&&this._findTouchInTouchList(o.targetTouches)||o.changedTouches&&this._findTouchInTouchList(o.changedTouches)},e.prototype._getTouchId=function(o){var n=o.targetTouches&&o.targetTouches[0]||o.changedTouches&&o.changedTouches[0];if(n)return n.identifier},e.prototype._matchesSelector=function(o,n){if(!o||o===document.body)return!1;var r=o.matches||o.webkitMatchesSelector||o.msMatchesSelector;return r?r.call(o,n)||this._matchesSelector(o.parentElement,n):!1},e.prototype._findTouchInTouchList=function(o){if(this._touchId!==void 0){for(var n=0;n<o.length;n++)if(o[n].identifier===this._touchId)return o[n]}},e.prototype._createDragDataFromPosition=function(o){var n=this.state.lastPosition;return n===void 0?{delta:{x:0,y:0},lastPosition:o,position:o}:{delta:{x:o.x-n.x,y:o.y-n.y},lastPosition:n,position:o}},e.prototype._createUpdatedDragData=function(o){var n=this.state.position;return{position:{x:n.x+o.delta.x,y:n.y+o.delta.y},delta:o.delta,lastPosition:n}},e}(l.Component),Pt={x:0,y:0},zc={isOpen:!1,isDarkOverlay:!0,className:"",containerClassName:"",enableAriaHiddenSiblings:!0},Gc=St(),qc=function(t){var e=10;return t.shiftKey?t.ctrlKey||(e=50):t.ctrlKey&&(e=1),e},Yc=function(t,e){l.useImperativeHandle(t.componentRef,function(){return{focus:function(){e.current&&e.current.focus()}}},[e])},ni=l.forwardRef(function(t,e){var o,n,r,s,i,a=gs(zc,t),c=a.allowTouchBodyScroll,f=a.className,p=a.children,g=a.containerClassName,b=a.scrollableContentClassName,d=a.elementToFocusOnDismiss,h=a.firstFocusableSelector,m=a.focusTrapZoneProps,x=a.forceFocusInsideTrap,v=a.disableRestoreFocus,y=v===void 0?a.ignoreExternalFocusing:v,_=a.isBlocking,S=a.isAlert,M=a.isClickableOutsideFocusTrap,P=a.isDarkOverlay,O=a.onDismiss,j=a.layerProps,K=a.overlay,U=a.isOpen,re=a.titleAriaId,se=a.styles,Z=a.subtitleAriaId,pe=a.theme,ce=a.topOffsetFixed,ee=a.responsiveMode,de=a.onLayerDidMount,te=a.isModeless,X=a.dragOptions,he=a.onDismissed,ge=a.enableAriaHiddenSiblings,He=a.popupProps,lt=l.useRef(null),Te=l.useRef(null),Oe=Dn(Te,m?.componentRef),Qe=l.useRef(null),Ve=Dn(lt,e),ut=qa(Ve),D=Cs("ModalFocusTrapZone",m?.id),N=Ya(),E=_c(),w=E.setTimeout,ie=E.clearTimeout,I=l.useState(U),z=I[0],be=I[1],We=l.useState(U),cn=We[0],or=We[1],rr=l.useState(Pt),sr=rr[0],ct=rr[1],ir=l.useState(),ha=ir[0],ga=ir[1],ar=nn(!1),lr=ar[0],ur=ar[1],ba=ur.toggle,Mt=ur.setFalse,A=uo(function(){return{onModalCloseTimer:0,allowTouchBodyScroll:c,scrollableContent:null,lastSetCoordinates:Pt,events:new xs({})}}),Un=(X||{}).keepInBounds,xa=S??(_&&!te),va=j===void 0?"":j.className,Ot=Gc(se,{theme:pe,className:f,containerClassName:g,scrollableContentClassName:b,isOpen:U,isVisible:cn,hasBeenOpened:A.hasBeenOpened,modalRectangleTop:ha,topOffsetFixed:ce,isModeless:te,layerClassName:va,windowInnerHeight:N?.innerHeight,isDefaultDragHandle:X&&!X.dragHandleSelector}),ya=k(k({eventBubblingEnabled:!1},j),{onLayerDidMount:j&&j.onLayerDidMount?j.onLayerDidMount:de,insertFirst:j?.insertFirst||te,className:Ot.layer}),Ca=l.useCallback(function(ne){ne?A.allowTouchBodyScroll?Ja(ne,A.events):Za(ne,A.events):A.events.off(A.scrollableContent),A.scrollableContent=ne},[A]),wa=function(){var ne=Qe.current,F=ne?.getBoundingClientRect();F&&(ce&&ga(F.top),Un&&(A.minPosition={x:-F.left,y:-F.top},A.maxPosition={x:F.left,y:F.top}))},dt=l.useCallback(function(ne,F){var Ne=A.minPosition,Wt=A.maxPosition;return Un&&Ne&&Wt&&(F=Math.max(Ne[ne],F),F=Math.min(Wt[ne],F)),F},[Un,A]),cr=function(){var ne;A.lastSetCoordinates=Pt,Mt(),A.isInKeyboardMoveMode=!1,be(!1),ct(Pt),(ne=A.disposeOnKeyUp)===null||ne===void 0||ne.call(A),he?.()},_a=l.useCallback(function(){Mt(),A.isInKeyboardMoveMode=!1},[A,Mt]),Sa=l.useCallback(function(ne,F){ct(function(Ne){return{x:dt("x",Ne.x+F.delta.x),y:dt("y",Ne.y+F.delta.y)}})},[dt]),ka=l.useCallback(function(){Te.current&&Te.current.focus()},[]),Ta=function(){var ne=function(F){if(F.altKey&&F.ctrlKey&&F.keyCode===V.space){F.preventDefault(),F.stopPropagation();return}var Ne=F.altKey||F.keyCode===V.escape;if(lr&&Ne&&Mt(),A.isInKeyboardMoveMode&&(F.keyCode===V.escape||F.keyCode===V.enter)&&(A.isInKeyboardMoveMode=!1,F.preventDefault(),F.stopPropagation()),A.isInKeyboardMoveMode){var Wt=!0,dn=qc(F);switch(F.keyCode){case V.escape:ct(A.lastSetCoordinates);case V.enter:{A.lastSetCoordinates=Pt;break}case V.up:{ct(function(Pe){return{x:Pe.x,y:dt("y",Pe.y-dn)}});break}case V.down:{ct(function(Pe){return{x:Pe.x,y:dt("y",Pe.y+dn)}});break}case V.left:{ct(function(Pe){return{x:dt("x",Pe.x-dn),y:Pe.y}});break}case V.right:{ct(function(Pe){return{x:dt("x",Pe.x+dn),y:Pe.y}});break}default:Wt=!1}Wt&&(F.preventDefault(),F.stopPropagation())}};A.lastSetCoordinates=sr,Mt(),A.isInKeyboardMoveMode=!0,A.events.on(N,"keydown",ne,!0),A.disposeOnKeyDown=function(){A.events.off(N,"keydown",ne,!0),A.disposeOnKeyDown=void 0}},Da=function(ne){var F,Ne;(F=m?.onBlur)===null||F===void 0||F.call(m,ne),A.lastSetCoordinates=Pt,A.isInKeyboardMoveMode=!1,(Ne=A.disposeOnKeyDown)===null||Ne===void 0||Ne.call(A)},Ia=function(){var ne=function(F){F.altKey&&F.ctrlKey&&F.keyCode===V.space&&rl(A.scrollableContent,F.target)&&(ba(),F.preventDefault(),F.stopPropagation())};A.disposeOnKeyUp||(A.events.on(N,"keyup",ne,!0),A.disposeOnKeyUp=function(){A.events.off(N,"keyup",ne,!0),A.disposeOnKeyUp=void 0})};l.useEffect(function(){ie(A.onModalCloseTimer),U&&(requestAnimationFrame(function(){return w(wa,0)}),be(!0),X&&Ia(),A.hasBeenOpened=!0,or(!0)),!U&&z&&(A.onModalCloseTimer=w(cr,parseFloat(ti)*1e3),or(!1))},[z,U]),Xa(function(){A.events.dispose()}),Yc(a,Te);var dr=l.createElement(Qa,k({},m,{id:D,ref:Qe,componentRef:Oe,className:jo(Ot.main,m?.className),elementToFocusOnDismiss:(o=m?.elementToFocusOnDismiss)!==null&&o!==void 0?o:d,isClickableOutsideFocusTrap:(n=m?.isClickableOutsideFocusTrap)!==null&&n!==void 0?n:te||M||!_,disableRestoreFocus:(r=m?.disableRestoreFocus)!==null&&r!==void 0?r:y,forceFocusInsideTrap:((s=m?.forceFocusInsideTrap)!==null&&s!==void 0?s:x)&&!te,firstFocusableSelector:m?.firstFocusableSelector||h,focusPreviouslyFocusedInnerElement:(i=m?.focusPreviouslyFocusedInnerElement)!==null&&i!==void 0?i:!0,onBlur:A.isInKeyboardMoveMode?Da:void 0}),X&&A.isInKeyboardMoveMode&&l.createElement("div",{className:Ot.keyboardMoveIconContainer},X.keyboardMoveIconProps?l.createElement(qe,k({},X.keyboardMoveIconProps)):l.createElement(qe,{iconName:"move",className:Ot.keyboardMoveIcon})),l.createElement("div",{ref:Ca,className:Ot.scrollableContent,"data-is-scrollable":!0},X&&lr&&l.createElement(X.menu,{items:[{key:"move",text:X.moveMenuItemText,onClick:Ta},{key:"close",text:X.closeMenuItemText,onClick:cr}],onDismiss:Mt,alignTargetEdge:!0,coverTarget:!0,directionalHint:An.topLeftEdge,directionalHintFixed:!0,shouldFocusOnMount:!0,target:A.scrollableContent}),p));return z&&ut>=(ee||el.small)&&l.createElement(tl,k({ref:Ve},ya),l.createElement(nl,k({role:xa?"alertdialog":"dialog",ariaLabelledBy:re,ariaDescribedBy:Z,onDismiss:O,shouldRestoreFocus:!y,enableAriaHiddenSiblings:ge,"aria-modal":!te},He),l.createElement("div",{className:Ot.root,role:te?void 0:"document"},!te&&l.createElement(ol,k({"aria-hidden":!0,isDarkThemed:P,onClick:_?void 0:O,allowTouchBodyScroll:c},K)),X?l.createElement(Kc,{handleSelector:X.dragHandleSelector||"#"+D,preventDragSelector:"button",onStart:_a,onDragChange:Sa,onStop:ka,position:sr},dr):dr)))||null});ni.displayName="Modal";var Ho=kt(ni,Wc,void 0,{scope:"Modal",fields:["theme","styles","enableAriaHiddenSiblings"]});Ho.displayName="Modal";var Jc=St(),Zc=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return Rt(n),n}return e.prototype.render=function(){var o=this.props,n=o.className,r=o.styles,s=o.theme;return this._classNames=Jc(r,{theme:s,className:n}),l.createElement("div",{className:this._classNames.actions},l.createElement("div",{className:this._classNames.actionsRight},this._renderChildrenAsActions()))},e.prototype._renderChildrenAsActions=function(){var o=this;return l.Children.map(this.props.children,function(n){return n?l.createElement("span",{className:o._classNames.action},n):null})},e}(l.Component),Xc={actions:"ms-Dialog-actions",action:"ms-Dialog-action",actionsRight:"ms-Dialog-actionsRight"},Qc=function(t){var e=t.className,o=t.theme,n=_t(Xc,o);return{actions:[n.actions,{position:"relative",width:"100%",minHeight:"24px",lineHeight:"24px",margin:"16px 0 0",fontSize:"0",selectors:{".ms-Button":{lineHeight:"normal",verticalAlign:"middle"}}},e],action:[n.action,{margin:"0 4px"}],actionsRight:[n.actionsRight,{alignItems:"center",display:"flex",fontSize:"0",justifyContent:"flex-end",marginRight:"-4px"}]}},oi=kt(Zc,Qc,void 0,{scope:"DialogFooter"}),ed=St(),td=l.createElement(oi,null).type,nd=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return Rt(n),n}return e.prototype.render=function(){var o=this.props,n=o.showCloseButton,r=o.className,s=o.closeButtonAriaLabel,i=o.onDismiss,a=o.subTextId,c=o.subText,f=o.titleProps,p=f===void 0?{}:f,g=o.titleId,b=o.title,d=o.type,h=o.styles,m=o.theme,x=o.draggableHeaderClassName,v=ed(h,{theme:m,className:r,isLargeHeader:d===ot.largeHeader,isClose:d===ot.close,draggableHeaderClassName:x}),y=this._groupChildren(),_;return c&&(_=l.createElement("p",{className:v.subText,id:a},c)),l.createElement("div",{className:v.content},l.createElement("div",{className:v.header},l.createElement("div",k({id:g,role:"heading","aria-level":1},p,{className:jo(v.title,p.className)}),b),l.createElement("div",{className:v.topButton},this.props.topButtonsProps.map(function(S,M){return l.createElement(le,k({key:S.uniqueId||M},S))}),(d===ot.close||n&&d!==ot.largeHeader)&&l.createElement(le,{className:v.button,iconProps:{iconName:"Cancel"},ariaLabel:s,onClick:i}))),l.createElement("div",{className:v.inner},l.createElement("div",{className:v.innerContent},_,y.contents),y.footers))},e.prototype._groupChildren=function(){var o={footers:[],contents:[]};return l.Children.map(this.props.children,function(n){typeof n=="object"&&n!==null&&n.type===td?o.footers.push(n):o.contents.push(n)}),o},e.defaultProps={showCloseButton:!1,className:"",topButtonsProps:[],closeButtonAriaLabel:"Close"},e=Mo([ws],e),e}(l.Component),od={contentLgHeader:"ms-Dialog-lgHeader",close:"ms-Dialog--close",subText:"ms-Dialog-subText",header:"ms-Dialog-header",headerLg:"ms-Dialog--lgHeader",button:"ms-Dialog-button ms-Dialog-button--close",inner:"ms-Dialog-inner",content:"ms-Dialog-content",title:"ms-Dialog-title"},rd=function(t){var e,o,n,r=t.className,s=t.theme,i=t.isLargeHeader,a=t.isClose,c=t.hidden,f=t.isMultiline,p=t.draggableHeaderClassName,g=s.palette,b=s.fonts,d=s.effects,h=s.semanticColors,m=_t(od,s);return{content:[i&&[m.contentLgHeader,{borderTop:"4px solid "+g.themePrimary}],a&&m.close,{flexGrow:1,overflowY:"hidden"},r],subText:[m.subText,b.medium,{margin:"0 0 24px 0",color:h.bodySubtext,lineHeight:"1.5",wordWrap:"break-word",fontWeight:ps.regular}],header:[m.header,{position:"relative",width:"100%",boxSizing:"border-box"},a&&m.close,p&&[p,{cursor:"move"}]],button:[m.button,c&&{selectors:{".ms-Icon.ms-Icon--Cancel":{color:h.buttonText,fontSize:sl.medium}}}],inner:[m.inner,{padding:"0 24px 24px",selectors:(e={},e["@media (min-width: "+zn+"px) and (max-width: "+Gn+"px)"]={padding:"0 16px 16px"},e)}],innerContent:[m.content,{position:"relative",width:"100%"}],title:[m.title,b.xLarge,{color:h.bodyText,margin:"0",minHeight:b.xLarge.fontSize,padding:"16px 46px 20px 24px",lineHeight:"normal",selectors:(o={},o["@media (min-width: "+zn+"px) and (max-width: "+Gn+"px)"]={padding:"16px 46px 16px 16px"},o)},i&&{color:h.menuHeader},f&&{fontSize:b.xxLarge.fontSize}],topButton:[{display:"flex",flexDirection:"row",flexWrap:"nowrap",position:"absolute",top:"0",right:"0",padding:"15px 15px 0 0",selectors:(n={"> *":{flex:"0 0 auto"},".ms-Dialog-button":{color:h.buttonText},".ms-Dialog-button:hover":{color:h.buttonTextHovered,borderRadius:d.roundedCorner2}},n["@media (min-width: "+zn+"px) and (max-width: "+Gn+"px)"]={padding:"15px 8px 0 0"},n)}]}},sd=kt(nd,rd,void 0,{scope:"DialogContent"}),id=St(),ad={isDarkOverlay:!1,isBlocking:!1,className:"",containerClassName:"",topOffsetFixed:!1,enableAriaHiddenSiblings:!0},ld={type:ot.normal,className:"",topButtonsProps:[]},ud=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return n._getSubTextId=function(){var r=n.props,s=r.ariaDescribedById,i=r.modalProps,a=r.dialogContentProps,c=r.subText,f=i&&i.subtitleAriaId||s;return f||(f=(a&&a.subText||c)&&n._defaultSubTextId),f},n._getTitleTextId=function(){var r=n.props,s=r.ariaLabelledById,i=r.modalProps,a=r.dialogContentProps,c=r.title,f=i&&i.titleAriaId||s;return f||(f=(a&&a.title||c)&&n._defaultTitleTextId),f},n._id=fo("Dialog"),n._defaultTitleTextId=n._id+"-title",n._defaultSubTextId=n._id+"-subText",n}return e.prototype.render=function(){var o,n,r,s=this.props,i=s.className,a=s.containerClassName,c=s.contentClassName,f=s.elementToFocusOnDismiss,p=s.firstFocusableSelector,g=s.forceFocusInsideTrap,b=s.styles,d=s.hidden,h=s.disableRestoreFocus,m=h===void 0?s.ignoreExternalFocusing:h,x=s.isBlocking,v=s.isClickableOutsideFocusTrap,y=s.isDarkOverlay,_=s.isOpen,S=_===void 0?!d:_,M=s.onDismiss,P=s.onDismissed,O=s.onLayerDidMount,j=s.responsiveMode,K=s.subText,U=s.theme,re=s.title,se=s.topButtonsProps,Z=s.type,pe=s.minWidth,ce=s.maxWidth,ee=s.modalProps,de=k({onLayerDidMount:O},ee?.layerProps),te,X;ee?.dragOptions&&!(!((o=ee.dragOptions)===null||o===void 0)&&o.dragHandleSelector)&&(X=k({},ee.dragOptions),te="ms-Dialog-draggable-header",X.dragHandleSelector="."+te);var he=k(k(k(k({},ad),{elementToFocusOnDismiss:f,firstFocusableSelector:p,forceFocusInsideTrap:g,disableRestoreFocus:m,isClickableOutsideFocusTrap:v,responsiveMode:j,className:i,containerClassName:a,isBlocking:x,isDarkOverlay:y,onDismissed:P}),ee),{dragOptions:X,layerProps:de,isOpen:S}),ge=k(k(k({className:c,subText:K,title:re,topButtonsProps:se,type:Z},ld),s.dialogContentProps),{draggableHeaderClassName:te,titleProps:k({id:((n=s.dialogContentProps)===null||n===void 0?void 0:n.titleId)||this._defaultTitleTextId},(r=s.dialogContentProps)===null||r===void 0?void 0:r.titleProps)}),He=id(b,{theme:U,className:he.className,containerClassName:he.containerClassName,hidden:d,dialogDefaultMinWidth:pe,dialogDefaultMaxWidth:ce});return l.createElement(Ho,k({},he,{className:He.root,containerClassName:He.main,onDismiss:M||he.onDismiss,subtitleAriaId:this._getSubTextId(),titleAriaId:this._getTitleTextId()}),l.createElement(sd,k({subTextId:this._defaultSubTextId,showCloseButton:he.isBlocking,onDismiss:M},ge),s.children))},e.defaultProps={hidden:!0},e=Mo([ws],e),e}(l.Component),cd={root:"ms-Dialog"},dd=function(t){var e,o=t.className,n=t.containerClassName,r=t.dialogDefaultMinWidth,s=r===void 0?"288px":r,i=t.dialogDefaultMaxWidth,a=i===void 0?"340px":i,c=t.hidden,f=t.theme,p=_t(cd,f);return{root:[p.root,f.fonts.medium,o],main:[{width:s,outline:"3px solid transparent",selectors:(e={},e["@media (min-width: "+il+"px)"]={width:"auto",maxWidth:a,minWidth:s},e)},!c&&{display:"flex"},n]}},ri=kt(ud,dd,void 0,{scope:"Dialog"});ri.displayName="Dialog";var Qt;(function(t){t[t.normal=0]="normal",t[t.compact=1]="compact"})(Qt||(Qt={}));var fd=St(),md=l.createContext({}),pd=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return n._rootElement=l.createRef(),n._onClick=function(r){n._onAction(r)},n._onKeyDown=function(r){(r.which===V.enter||r.which===V.space)&&n._onAction(r)},n._onAction=function(r){var s=n.props,i=s.onClick,a=s.onClickHref,c=s.onClickTarget;i?i(r):!i&&a&&(c?window.open(a,c,"noreferrer noopener nofollow"):window.location.href=a,r.preventDefault(),r.stopPropagation())},Rt(n),n}return e.prototype.render=function(){var o=this.props,n=o.onClick,r=o.onClickHref,s=o.children,i=o.type,a=o.accentColor,c=o.styles,f=o.theme,p=o.className,g=Pn(this.props,vs,["className","onClick","type","role"]),b=!!(n||r);this._classNames=fd(c,{theme:f,className:p,actionable:b,compact:i===Qt.compact});var d;i===Qt.compact&&a&&(d={borderBottomColor:a});var h=this.props.role||(b?n?"button":"link":void 0),m=b?0:void 0,x={role:h,tabIndex:m};return l.createElement("div",k({ref:this._rootElement,role:"group",className:this._classNames.root,onKeyDown:b?this._onKeyDown:void 0,onClick:b?this._onClick:void 0,style:d},g),l.createElement(md.Provider,{value:x},s))},e.prototype.focus=function(){this._rootElement.current&&this._rootElement.current.focus()},e.defaultProps={type:Qt.normal},e}(l.Component),Or={root:"ms-DocumentCardPreview",icon:"ms-DocumentCardPreview-icon",iconContainer:"ms-DocumentCardPreview-iconContainer"},hd={root:"ms-DocumentCardActivity",multiplePeople:"ms-DocumentCardActivity--multiplePeople",details:"ms-DocumentCardActivity-details",name:"ms-DocumentCardActivity-name",activity:"ms-DocumentCardActivity-activity",avatars:"ms-DocumentCardActivity-avatars",avatar:"ms-DocumentCardActivity-avatar"},Nr={root:"ms-DocumentCardTitle"},gd={root:"ms-DocumentCardLocation"},bd={root:"ms-DocumentCard",rootActionable:"ms-DocumentCard--actionable",rootCompact:"ms-DocumentCard--compact"},xd=function(t){var e,o,n=t.className,r=t.theme,s=t.actionable,i=t.compact,a=r.palette,c=r.fonts,f=r.effects,p=_t(bd,r);return{root:[p.root,{WebkitFontSmoothing:"antialiased",backgroundColor:a.white,border:"1px solid "+a.neutralLight,maxWidth:"320px",minWidth:"206px",userSelect:"none",position:"relative",selectors:(e={":focus":{outline:"0px solid"}},e["."+al+" &:focus"]=Io(a.neutralSecondary,f.roundedCorner2),e["."+gd.root+" + ."+Nr.root]={paddingTop:"4px"},e)},s&&[p.rootActionable,{selectors:{":hover":{cursor:"pointer",borderColor:a.neutralTertiaryAlt},":hover:after":{content:'" "',position:"absolute",top:0,right:0,bottom:0,left:0,border:"1px solid "+a.neutralTertiaryAlt,pointerEvents:"none"}}}],i&&[p.rootCompact,{display:"flex",maxWidth:"480px",height:"108px",selectors:(o={},o["."+Or.root]={borderRight:"1px solid "+a.neutralLight,borderBottom:0,maxHeight:"106px",maxWidth:"144px"},o["."+Or.icon]={maxHeight:"32px",maxWidth:"32px"},o["."+hd.root]={paddingBottom:"12px"},o["."+Nr.root]={paddingBottom:"12px 16px 8px 16px",fontSize:c.mediumPlus.fontSize,lineHeight:"16px"},o)}],n]}},vd=kt(pd,xd,void 0,{scope:"DocumentCard"}),yd=St(),Cd=function(t){st(e,t);function e(o){var n=t.call(this,o)||this;return Rt(n),n}return e.prototype.render=function(){var o=this,n=this.props,r=n.actions,s=n.views,i=n.styles,a=n.theme,c=n.className;return this._classNames=yd(i,{theme:a,className:c}),l.createElement("div",{className:this._classNames.root},r&&r.map(function(f,p){return l.createElement("div",{className:o._classNames.action,key:p},l.createElement(le,k({},f)))}),s>0&&l.createElement("div",{className:this._classNames.views},l.createElement(qe,{iconName:"View",className:this._classNames.viewsIcon}),s))},e}(l.Component),mn=34,wd=12,_d=4,Sd={root:"ms-DocumentCardActions",action:"ms-DocumentCardActions-action",views:"ms-DocumentCardActions-views"},kd=function(t){var e=t.className,o=t.theme,n=o.palette,r=o.fonts,s=_t(Sd,o);return{root:[s.root,{height:mn+"px",padding:_d+"px "+wd+"px",position:"relative"},e],action:[s.action,{float:"left",marginRight:"4px",color:n.neutralSecondary,cursor:"pointer",selectors:{".ms-Button":{fontSize:r.mediumPlus.fontSize,height:mn,width:mn},".ms-Button:hover .ms-Button-icon":{color:o.semanticColors.buttonText,cursor:"pointer"}}}],views:[s.views,{textAlign:"right",lineHeight:mn}],viewsIcon:{marginRight:"8px",fontSize:r.medium.fontSize,verticalAlign:"top"}}},Td=kt(Cd,kd,void 0,{scope:"DocumentCardActions"}),si="SearchBox",Dd={root:{height:"auto"},icon:{fontSize:"12px"}},Id={iconName:"Clear"},jd={ariaLabel:"Clear text"},Md=St(),Od=function(t,e,o){l.useImperativeHandle(t,function(){return{focus:function(){var n;return(n=e.current)===null||n===void 0?void 0:n.focus()},hasFocus:function(){return o}}},[e,o])},ii=l.forwardRef(function(t,e){var o=t.ariaLabel,n=t.className,r=t.defaultValue,s=r===void 0?"":r,i=t.disabled,a=t.underlined,c=t.styles,f=t.labelText,p=t.placeholder,g=p===void 0?f:p,b=t.theme,d=t.clearButtonProps,h=d===void 0?jd:d,m=t.disableAnimation,x=m===void 0?!1:m,v=t.showIcon,y=v===void 0?!1:v,_=t.onClear,S=t.onBlur,M=t.onEscape,P=t.onSearch,O=t.onKeyDown,j=t.iconProps,K=t.role,U=t.onChange,re=t.onChanged,se=l.useState(!1),Z=se[0],pe=se[1],ce=l.useRef(),ee=ll(t.value,s,function(I,z){I&&I.timeStamp===ce.current||(ce.current=I?.timeStamp,U?.(I,z),re?.(z))}),de=ee[0],te=ee[1],X=String(de),he=l.useRef(null),ge=l.useRef(null),He=Dn(he,e),lt=Cs(si,t.id),Te=h.onClick,Oe=Md(c,{theme:b,className:n,underlined:a,hasFocus:Z,disabled:i,hasInput:X.length>0,disableAnimation:x,showIcon:y}),Qe=Pn(t,ms,["className","placeholder","onFocus","onBlur","value","role"]),Ve=l.useCallback(function(I){var z;_?.(I),I.defaultPrevented||(te(""),(z=ge.current)===null||z===void 0||z.focus(),I.stopPropagation(),I.preventDefault())},[_,te]),ut=l.useCallback(function(I){Te?.(I),I.defaultPrevented||Ve(I)},[Te,Ve]),D=function(I){var z;pe(!0),(z=t.onFocus)===null||z===void 0||z.call(t,I)},N=function(){ge.current&&(ge.current.focus(),ge.current.selectionStart=ge.current.selectionEnd=0)},E=l.useCallback(function(I){pe(!1),S?.(I)},[S]),w=function(I){te(I.target.value,I)},ie=function(I){switch(I.which){case V.escape:M?.(I),X&&!I.defaultPrevented&&Ve(I);break;case V.enter:P&&(P(X),I.preventDefault(),I.stopPropagation());break;default:O?.(I),I.defaultPrevented&&I.stopPropagation();break}};return Od(t.componentRef,ge,Z),l.createElement("div",{role:K,ref:He,className:Oe.root,onFocusCapture:D},l.createElement("div",{className:Oe.iconContainer,onClick:N,"aria-hidden":!0},l.createElement(qe,k({iconName:"Search"},j,{className:Oe.icon}))),l.createElement("input",k({},Qe,{id:lt,className:Oe.field,placeholder:g,onChange:w,onInput:w,onBlur:E,onKeyDown:ie,value:X,disabled:i,role:"searchbox","aria-label":o,ref:ge})),X.length>0&&l.createElement("div",{className:Oe.clearButton},l.createElement(le,k({onBlur:E,styles:Dd,iconProps:Id},h,{onClick:ut}))))});ii.displayName=si;var Nd={root:"ms-SearchBox",iconContainer:"ms-SearchBox-iconContainer",icon:"ms-SearchBox-icon",clearButton:"ms-SearchBox-clearButton",field:"ms-SearchBox-field"};function Pd(t){var e,o,n,r,s,i=t.theme,a=t.underlined,c=t.disabled,f=t.hasFocus,p=t.className,g=t.hasInput,b=t.disableAnimation,d=t.showIcon,h=i.palette,m=i.fonts,x=i.semanticColors,v=i.effects,y=_t(Nd,i),_={color:x.inputPlaceholderText,opacity:1},S=h.neutralSecondary,M=h.neutralPrimary,P=h.neutralLighter,O=h.neutralLighter,j=h.neutralLighter;return{root:[y.root,m.medium,hr,{color:x.inputText,backgroundColor:x.inputBackground,display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"stretch",padding:"1px 0 1px 4px",borderRadius:v.roundedCorner2,border:"1px solid "+x.inputBorder,height:32,selectors:(e={},e[ye]={borderColor:"WindowText"},e[":hover"]={borderColor:x.inputBorderHovered,selectors:(o={},o[ye]={borderColor:"Highlight"},o)},e[":hover ."+y.iconContainer]={color:x.inputIconHovered},e)},!f&&g&&{selectors:(n={},n[":hover ."+y.iconContainer]={width:4},n[":hover ."+y.icon]={opacity:0,pointerEvents:"none"},n)},f&&["is-active",{position:"relative"},Io(x.inputFocusBorderAlt,a?0:v.roundedCorner2,a?"borderBottom":"border")],d&&[{selectors:(r={},r[":hover ."+y.iconContainer]={width:32},r[":hover ."+y.icon]={opacity:1},r)}],c&&["is-disabled",{borderColor:P,backgroundColor:j,pointerEvents:"none",cursor:"default",selectors:(s={},s[ye]={borderColor:"GrayText"},s)}],a&&["is-underlined",{borderWidth:"0 0 1px 0",borderRadius:0,padding:"1px 0 1px 8px"}],a&&c&&{backgroundColor:"transparent"},g&&"can-clear",p],iconContainer:[y.iconContainer,{display:"flex",flexDirection:"column",justifyContent:"center",flexShrink:0,fontSize:16,width:32,textAlign:"center",color:x.inputIcon,cursor:"text"},f&&{width:4},c&&{color:x.inputIconDisabled},!b&&{transition:"width "+mo.durationValue1},d&&f&&{width:32}],icon:[y.icon,{opacity:1},f&&{opacity:0,pointerEvents:"none"},!b&&{transition:"opacity "+mo.durationValue1+" 0s"},d&&f&&{opacity:1}],clearButton:[y.clearButton,{display:"flex",flexDirection:"row",alignItems:"stretch",cursor:"pointer",flexBasis:"32px",flexShrink:0,padding:0,margin:"-1px 0px",selectors:{"&:hover .ms-Button":{backgroundColor:O},"&:hover .ms-Button-icon":{color:M},".ms-Button":{borderRadius:ul(i)?"1px 0 0 1px":"0 1px 1px 0"},".ms-Button-icon":{color:S}}}],field:[y.field,hr,_n(_),{backgroundColor:"transparent",border:"none",outline:"none",fontWeight:"inherit",fontFamily:"inherit",fontSize:"inherit",color:x.inputText,flex:"1 1 0px",minWidth:"0px",overflow:"hidden",textOverflow:"ellipsis",paddingBottom:.5,selectors:{"::-ms-clear":{display:"none"}}},c&&{color:x.disabledText}]}}var Ad=kt(ii,Pd,void 0,{scope:"SearchBox"});function Ed(t,e){for(var o=-1,n=t==null?0:t.length;++o<n&&e(t[o],o,t)!==!1;);return t}var Pr=In?In.isConcatSpreadable:void 0;function Fd(t){return Tt(t)||cl(t)||!!(Pr&&t&&t[Pr])}function ai(t,e,o,n,r){var s=-1,i=t.length;for(o||(o=Fd),r||(r=[]);++s<i;){var a=t[s];e>0&&o(a)?e>1?ai(a,e-1,o,n,r):_s(r,a):n||(r[r.length]=a)}return r}function Bd(t,e){return t&&Fn(e,Ss(e),t)}function $d(t,e){return t&&Fn(e,Oo(e),t)}function Rd(t,e){return Fn(t,ks(t),e)}var Ld=Object.getOwnPropertySymbols,Hd=Ld?function(t){for(var e=[];t;)_s(e,ks(t)),t=fl(t);return e}:dl;const li=Hd;function Vd(t,e){return Fn(t,li(t),e)}function Wd(t){return ml(t,Oo,li)}var Ud=Object.prototype,Kd=Ud.hasOwnProperty;function zd(t){var e=t.length,o=new t.constructor(e);return e&&typeof t[0]=="string"&&Kd.call(t,"index")&&(o.index=t.index,o.input=t.input),o}function Gd(t,e){var o=e?Ts(t.buffer):t.buffer;return new t.constructor(o,t.byteOffset,t.byteLength)}var qd=/\w*$/;function Yd(t){var e=new t.constructor(t.source,qd.exec(t));return e.lastIndex=t.lastIndex,e}var Ar=In?In.prototype:void 0,Er=Ar?Ar.valueOf:void 0;function Jd(t){return Er?Object(Er.call(t)):{}}var Zd="[object Boolean]",Xd="[object Date]",Qd="[object Map]",ef="[object Number]",tf="[object RegExp]",nf="[object Set]",of="[object String]",rf="[object Symbol]",sf="[object ArrayBuffer]",af="[object DataView]",lf="[object Float32Array]",uf="[object Float64Array]",cf="[object Int8Array]",df="[object Int16Array]",ff="[object Int32Array]",mf="[object Uint8Array]",pf="[object Uint8ClampedArray]",hf="[object Uint16Array]",gf="[object Uint32Array]";function bf(t,e,o){var n=t.constructor;switch(e){case sf:return Ts(t);case Zd:case Xd:return new n(+t);case af:return Gd(t,o);case lf:case uf:case cf:case df:case ff:case mf:case pf:case hf:case gf:return pl(t,o);case Qd:return new n;case ef:case of:return new n(t);case tf:return Yd(t);case nf:return new n;case rf:return Jd(t)}}var xf="[object Map]";function vf(t){return Ds(t)&&No(t)==xf}var Fr=jn&&jn.isMap,yf=Fr?Bn(Fr):vf;const Cf=yf;var wf="[object Set]";function _f(t){return Ds(t)&&No(t)==wf}var Br=jn&&jn.isSet,Sf=Br?Bn(Br):_f;const kf=Sf;var Tf=1,Df=2,If=4,ui="[object Arguments]",jf="[object Array]",Mf="[object Boolean]",Of="[object Date]",Nf="[object Error]",ci="[object Function]",Pf="[object GeneratorFunction]",Af="[object Map]",Ef="[object Number]",di="[object Object]",Ff="[object RegExp]",Bf="[object Set]",$f="[object String]",Rf="[object Symbol]",Lf="[object WeakMap]",Hf="[object ArrayBuffer]",Vf="[object DataView]",Wf="[object Float32Array]",Uf="[object Float64Array]",Kf="[object Int8Array]",zf="[object Int16Array]",Gf="[object Int32Array]",qf="[object Uint8Array]",Yf="[object Uint8ClampedArray]",Jf="[object Uint16Array]",Zf="[object Uint32Array]",Q={};Q[ui]=Q[jf]=Q[Hf]=Q[Vf]=Q[Mf]=Q[Of]=Q[Wf]=Q[Uf]=Q[Kf]=Q[zf]=Q[Gf]=Q[Af]=Q[Ef]=Q[di]=Q[Ff]=Q[Bf]=Q[$f]=Q[Rf]=Q[qf]=Q[Yf]=Q[Jf]=Q[Zf]=!0;Q[Nf]=Q[ci]=Q[Lf]=!1;function kn(t,e,o,n,r,s){var i,a=e&Tf,c=e&Df,f=e&If;if(o&&(i=r?o(t,n,r,s):o(t)),i!==void 0)return i;if(!hl(t))return t;var p=Tt(t);if(p){if(i=zd(t),!a)return gl(t,i)}else{var g=No(t),b=g==ci||g==Pf;if(bl(t))return xl(t,a);if(g==di||g==ui||b&&!r){if(i=c||b?{}:vl(t),!a)return c?Vd(t,$d(i,t)):Rd(t,Bd(i,t))}else{if(!Q[g])return r?t:{};i=bf(t,g,a)}}s||(s=new yl);var d=s.get(t);if(d)return d;s.set(t,i),kf(t)?t.forEach(function(x){i.add(kn(x,e,o,x,t,s))}):Cf(t)&&t.forEach(function(x,v){i.set(v,kn(x,e,o,v,t,s))});var h=f?c?Wd:Cl:c?Oo:Ss,m=p?void 0:h(t);return Ed(m||t,function(x,v){m&&(v=x,x=t[v]),wl(i,v,kn(x,e,o,v,t,s))}),i}var Xf=1,Qf=4;function Ht(t){return kn(t,Xf|Qf)}var em=200;function tm(t,e,o,n){var r=-1,s=js,i=!0,a=t.length,c=[],f=e.length;if(!a)return c;o&&(e=Po(e,Bn(o))),n?(s=Ms,i=!1):e.length>=em&&(s=po,i=!1,e=new Is(e));e:for(;++r<a;){var p=t[r],g=o==null?p:o(p);if(p=n||p!==0?p:0,i&&g===g){for(var b=f;b--;)if(e[b]===g)continue e;c.push(p)}else s(e,g,n)||c.push(p)}return c}var nm=Os(function(t,e){return ho(t)?tm(t,ai(e,1,ho,!0)):[]});const om=nm;var rm=Math.min;function sm(t,e,o){for(var n=o?Ms:js,r=t[0].length,s=t.length,i=s,a=Array(s),c=1/0,f=[];i--;){var p=t[i];i&&e&&(p=Po(p,Bn(e))),c=rm(p.length,c),a[i]=!o&&(e||r>=120&&p.length>=120)?new Is(i&&p):void 0}p=t[0];var g=-1,b=a[0];e:for(;++g<r&&f.length<c;){var d=p[g],h=e?e(d):d;if(d=o||d!==0?d:0,!(b?po(b,h):n(f,h,o))){for(i=s;--i;){var m=a[i];if(!(m?po(m,h):n(t[i],h,o)))continue e}b&&b.push(h),f.push(d)}}return f}function im(t){return ho(t)?t:[]}var am=Os(function(t){var e=Po(t,im);return e.length&&e[0]===t[0]?sm(e):[]});const lm=am;function mt(){return mt=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var o=arguments[e];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n])}return t},mt.apply(this,arguments)}const um=["children","options"],$r=["allowFullScreen","allowTransparency","autoComplete","autoFocus","autoPlay","cellPadding","cellSpacing","charSet","className","classId","colSpan","contentEditable","contextMenu","crossOrigin","encType","formAction","formEncType","formMethod","formNoValidate","formTarget","frameBorder","hrefLang","inputMode","keyParams","keyType","marginHeight","marginWidth","maxLength","mediaGroup","minLength","noValidate","radioGroup","readOnly","rowSpan","spellCheck","srcDoc","srcLang","srcSet","tabIndex","useMap"].reduce((t,e)=>(t[e.toLowerCase()]=e,t),{for:"htmlFor"}),Rr={amp:"&",apos:"'",gt:">",lt:"<",nbsp:" ",quot:"“"},cm=["style","script"],dm=/([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi,fm=/mailto:/i,mm=/\n{2,}$/,fi=/^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/,pm=/^ *> ?/gm,hm=/^ {2,}\n/,gm=/^(?:( *[-*_]) *){3,}(?:\n *)+\n/,mi=/^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/,pi=/^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/,bm=/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,xm=/^(?:\n *)*\n/,vm=/\r\n?/g,ym=/^\[\^([^\]]+)](:.*)\n/,Cm=/^\[\^([^\]]+)]/,wm=/\f/g,_m=/^\s*?\[(x|\s)\]/,hi=/^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/,gi=/^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/,wo=/^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i,Sm=/&([a-zA-Z]+);/g,bi=/^<!--[\s\S]*?(?:-->)/,km=/^(data|aria|x)-[a-z_][a-z\d_.-]*$/,_o=/^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i,Tm=/^\{.*\}$/,Dm=/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,Im=/^<([^ >]+@[^ >]+)>/,jm=/^<([^ >]+:\/[^ >]+)>/,Mm=/-([a-z])?/gi,xi=/^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/,Om=/^\[([^\]]*)\]:\s+(\S+)\s*("([^"]*)")?/,Nm=/^!\[([^\]]*)\] ?\[([^\]]*)\]/,Pm=/^\[([^\]]*)\] ?\[([^\]]*)\]/,Am=/(\[|\])/g,Em=/(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/,Fm=/\t/g,Bm=/^ *\| */,$m=/(^ *\||\| *$)/g,Rm=/ *$/,Lm=/^ *:-+: *$/,Hm=/^ *:-+ *$/,Vm=/^ *-+: *$/,Wm=/^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/,Um=/^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/,Km=/^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/,zm=/^\\([^0-9A-Za-z\s])/,Gm=/^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i,qm=/^\n+/,Ym=/^([ \t]*)/,Jm=/\\([^0-9A-Z\s])/gi,Lr=/ *\n+$/,Zm=/(?:^|\n)( *)$/,Vo="(?:\\d+\\.)",Wo="(?:[*+-])";function vi(t){return"( *)("+(t===1?Vo:Wo)+") +"}const yi=vi(1),Ci=vi(2);function wi(t){return new RegExp("^"+(t===1?yi:Ci))}const Xm=wi(1),Qm=wi(2);function _i(t){return new RegExp("^"+(t===1?yi:Ci)+"[^\\n]*(?:\\n(?!\\1"+(t===1?Vo:Wo)+" )[^\\n]*)*(\\n|$)","gm")}const Si=_i(1),ki=_i(2);function Ti(t){const e=t===1?Vo:Wo;return new RegExp("^( *)("+e+") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1"+e+" (?!"+e+" ))\\n*|\\s*\\n*$)")}const Di=Ti(1),Ii=Ti(2);function Hr(t,e){const o=e===1,n=o?Di:Ii,r=o?Si:ki,s=o?Xm:Qm;return{t(i,a,c){const f=Zm.exec(c);return f&&(a.o||!a.u&&!a._)?n.exec(i=f[1]+i):null},i:H.HIGH,l(i,a,c){const f=o?+i[2]:void 0,p=i[0].replace(mm,`
`).match(r);let g=!1;return{p:p.map(function(b,d){const h=s.exec(b)[0].length,m=new RegExp("^ {1,"+h+"}","gm"),x=b.replace(m,"").replace(s,""),v=d===p.length-1,y=x.indexOf(`

`)!==-1||v&&g;g=y;const _=c.u,S=c.o;let M;c.o=!0,y?(c.u=!1,M=x.replace(Lr,`

`)):(c.u=!0,M=x.replace(Lr,""));const P=a(M,c);return c.u=_,c.o=S,P}),g:o,m:f}},h:(i,a,c)=>t(i.g?"ol":"ul",{key:c.k,start:i.m},i.p.map(function(f,p){return t("li",{key:p},a(f,c))}))}}const ji="(?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*",Mi=`\\s*<?((?:[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*`,ep=new RegExp("^\\[("+ji+")\\]\\("+Mi+"\\)"),tp=new RegExp("^!\\[("+ji+")\\]\\("+Mi+"\\)"),Oi=[fi,mi,pi,hi,gi,bi,xi,Si,Di,ki,Ii],np=[...Oi,/^[^\n]+(?:  \n|\n{2,})/,wo,_o];function op(t){return t.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g,"a").replace(/[çÇ]/g,"c").replace(/[ðÐ]/g,"d").replace(/[ÈÉÊËéèêë]/g,"e").replace(/[ÏïÎîÍíÌì]/g,"i").replace(/[Ññ]/g,"n").replace(/[øØœŒÕõÔôÓóÒò]/g,"o").replace(/[ÜüÛûÚúÙù]/g,"u").replace(/[ŸÿÝý]/g,"y").replace(/[^a-z0-9- ]/gi,"").replace(/ /gi,"-").toLowerCase()}function rp(t){return Vm.test(t)?"right":Lm.test(t)?"center":Hm.test(t)?"left":null}function Vr(t,e,o){const n=o.v;o.v=!0;const r=e(t.trim(),o);o.v=n;let s=[[]];return r.forEach(function(i,a){i.type==="tableSeparator"?a!==0&&a!==r.length-1&&s.push([]):(i.type!=="text"||r[a+1]!=null&&r[a+1].type!=="tableSeparator"||(i.S=i.S.replace(Rm,"")),s[s.length-1].push(i))}),s}function sp(t,e,o){o.u=!0;const n=Vr(t[1],e,o),r=t[2].replace($m,"").split("|").map(rp),s=function(i,a,c){return i.trim().split(`
`).map(function(f){return Vr(f,a,c)})}(t[3],e,o);return o.u=!1,{$:r,A:s,L:n,type:"table"}}function Wr(t,e){return t.$[e]==null?{}:{textAlign:t.$[e]}}function tt(t){return function(e,o){return o.u?t.exec(e):null}}function ft(t){return function(e,o){return o.u||o._?t.exec(e):null}}function Je(t){return function(e,o){return o.u||o._?null:t.exec(e)}}function qt(t){return function(e){return t.exec(e)}}function ip(t,e,o){if(e.u||e._||o&&!o.endsWith(`
`))return null;let n="";t.split(`
`).every(s=>!Oi.some(i=>i.test(s))&&(n+=s+`
`,s.trim()));const r=n.trimEnd();return r==""?null:[n,r]}function At(t){try{if(decodeURIComponent(t).replace(/[^A-Za-z0-9/:]/g,"").match(/^\s*(javascript|vbscript|data):/i))return null}catch{return null}return t}function Ur(t){return t.replace(Jm,"$1")}function Tn(t,e,o){const n=o.u||!1,r=o._||!1;o.u=!0,o._=!0;const s=t(e,o);return o.u=n,o._=r,s}function ap(t,e,o){const n=o.u||!1,r=o._||!1;o.u=!1,o._=!0;const s=t(e,o);return o.u=n,o._=r,s}function lp(t,e,o){return o.u=!1,t(e+`

`,o)}const Kr=(t,e,o)=>({S:Tn(e,t[1],o)});function oo(){return{}}function ro(){return null}function up(...t){return t.filter(Boolean).join(" ")}function so(t,e,o){let n=t;const r=e.split(".");for(;r.length&&(n=n[r[0]],n!==void 0);)r.shift();return n||o}var H;function cp(t,e={}){e.overrides=e.overrides||{},e.slugify=e.slugify||op,e.namedCodesToUnicode=e.namedCodesToUnicode?mt({},Rr,e.namedCodesToUnicode):Rr;const o=e.createElement||l.createElement;function n(d,h,...m){const x=so(e.overrides,`${d}.props`,{});return o(function(v,y){const _=so(y,v);return _?typeof _=="function"||typeof _=="object"&&"render"in _?_:so(y,`${v}.component`,v):v}(d,e.overrides),mt({},h,x,{className:up(h?.className,x.className)||void 0}),...m)}function r(d){let h=!1;e.forceInline?h=!0:e.forceBlock||(h=Em.test(d)===!1);const m=p(f(h?d:`${d.trimEnd().replace(qm,"")}

`,{u:h}));for(;typeof m[m.length-1]=="string"&&!m[m.length-1].trim();)m.pop();if(e.wrapper===null)return m;const x=e.wrapper||(h?"span":"div");let v;if(m.length>1||e.forceWrapper)v=m;else{if(m.length===1)return v=m[0],typeof v=="string"?n("span",{key:"outer"},v):v;v=null}return l.createElement(x,{key:"outer"},v)}function s(d){const h=d.match(dm);return h?h.reduce(function(m,x,v){const y=x.indexOf("=");if(y!==-1){const _=function(O){return O.indexOf("-")!==-1&&O.match(km)===null&&(O=O.replace(Mm,function(j,K){return K.toUpperCase()})),O}(x.slice(0,y)).trim(),S=function(O){const j=O[0];return(j==='"'||j==="'")&&O.length>=2&&O[O.length-1]===j?O.slice(1,-1):O}(x.slice(y+1).trim()),M=$r[_]||_,P=m[M]=function(O,j){return O==="style"?j.split(/;\s?/).reduce(function(K,U){const re=U.slice(0,U.indexOf(":"));return K[re.replace(/(-[a-z])/g,se=>se[1].toUpperCase())]=U.slice(re.length+1).trim(),K},{}):O==="href"?At(j):(j.match(Tm)&&(j=j.slice(1,j.length-1)),j==="true"||j!=="false"&&j)}(_,S);typeof P=="string"&&(wo.test(P)||_o.test(P))&&(m[M]=l.cloneElement(r(P.trim()),{key:v}))}else x!=="style"&&(m[$r[x]||x]=!0);return m},{}):void 0}const i=[],a={},c={blockQuote:{t:Je(fi),i:H.HIGH,l:(d,h,m)=>({S:h(d[0].replace(pm,""),m)}),h:(d,h,m)=>n("blockquote",{key:m.k},h(d.S,m))},breakLine:{t:qt(hm),i:H.HIGH,l:oo,h:(d,h,m)=>n("br",{key:m.k})},breakThematic:{t:Je(gm),i:H.HIGH,l:oo,h:(d,h,m)=>n("hr",{key:m.k})},codeBlock:{t:Je(pi),i:H.MAX,l:d=>({S:d[0].replace(/^ {4}/gm,"").replace(/\n+$/,""),R:void 0}),h:(d,h,m)=>n("pre",{key:m.k},n("code",mt({},d.I,{className:d.R?`lang-${d.R}`:""}),d.S))},codeFenced:{t:Je(mi),i:H.MAX,l:d=>({I:s(d[3]||""),S:d[4],R:d[2]||void 0,type:"codeBlock"})},codeInline:{t:ft(bm),i:H.LOW,l:d=>({S:d[2]}),h:(d,h,m)=>n("code",{key:m.k},d.S)},footnote:{t:Je(ym),i:H.MAX,l:d=>(i.push({M:d[2],O:d[1]}),{}),h:ro},footnoteReference:{t:tt(Cm),i:H.HIGH,l:d=>({S:d[1],B:`#${e.slugify(d[1])}`}),h:(d,h,m)=>n("a",{key:m.k,href:At(d.B)},n("sup",{key:m.k},d.S))},gfmTask:{t:tt(_m),i:H.HIGH,l:d=>({T:d[1].toLowerCase()==="x"}),h:(d,h,m)=>n("input",{checked:d.T,key:m.k,readOnly:!0,type:"checkbox"})},heading:{t:Je(hi),i:H.HIGH,l:(d,h,m)=>({S:Tn(h,d[2],m),j:e.slugify(d[2]),C:d[1].length}),h:(d,h,m)=>n(`h${d.C}`,{id:d.j,key:m.k},h(d.S,m))},headingSetext:{t:Je(gi),i:H.MAX,l:(d,h,m)=>({S:Tn(h,d[1],m),C:d[2]==="="?1:2,type:"heading"})},htmlComment:{t:qt(bi),i:H.HIGH,l:()=>({}),h:ro},image:{t:ft(tp),i:H.HIGH,l:d=>({Z:d[1],B:Ur(d[2]),D:d[3]}),h:(d,h,m)=>n("img",{key:m.k,alt:d.Z||void 0,title:d.D||void 0,src:At(d.B)})},link:{t:tt(ep),i:H.LOW,l:(d,h,m)=>({S:ap(h,d[1],m),B:Ur(d[2]),D:d[3]}),h:(d,h,m)=>n("a",{key:m.k,href:At(d.B),title:d.D},h(d.S,m))},linkAngleBraceStyleDetector:{t:tt(jm),i:H.MAX,l:d=>({S:[{S:d[1],type:"text"}],B:d[1],type:"link"})},linkBareUrlDetector:{t:(d,h)=>h.N?null:tt(Dm)(d,h),i:H.MAX,l:d=>({S:[{S:d[1],type:"text"}],B:d[1],D:void 0,type:"link"})},linkMailtoDetector:{t:tt(Im),i:H.MAX,l(d){let h=d[1],m=d[1];return fm.test(m)||(m="mailto:"+m),{S:[{S:h.replace("mailto:",""),type:"text"}],B:m,type:"link"}}},orderedList:Hr(n,1),unorderedList:Hr(n,2),newlineCoalescer:{t:Je(xm),i:H.LOW,l:oo,h:()=>`
`},paragraph:{t:ip,i:H.LOW,l:Kr,h:(d,h,m)=>n("p",{key:m.k},h(d.S,m))},ref:{t:tt(Om),i:H.MAX,l:d=>(a[d[1]]={B:d[2],D:d[4]},{}),h:ro},refImage:{t:ft(Nm),i:H.MAX,l:d=>({Z:d[1]||void 0,F:d[2]}),h:(d,h,m)=>n("img",{key:m.k,alt:d.Z,src:At(a[d.F].B),title:a[d.F].D})},refLink:{t:tt(Pm),i:H.MAX,l:(d,h,m)=>({S:h(d[1],m),P:h(d[0].replace(Am,"\\$1"),m),F:d[2]}),h:(d,h,m)=>a[d.F]?n("a",{key:m.k,href:At(a[d.F].B),title:a[d.F].D},h(d.S,m)):n("span",{key:m.k},h(d.P,m))},table:{t:Je(xi),i:H.HIGH,l:sp,h:(d,h,m)=>n("table",{key:m.k},n("thead",null,n("tr",null,d.L.map(function(x,v){return n("th",{key:v,style:Wr(d,v)},h(x,m))}))),n("tbody",null,d.A.map(function(x,v){return n("tr",{key:v},x.map(function(y,_){return n("td",{key:_,style:Wr(d,_)},h(y,m))}))})))},tableSeparator:{t:function(d,h){return h.v?Bm.exec(d):null},i:H.HIGH,l:function(){return{type:"tableSeparator"}},h:()=>" | "},text:{t:qt(Gm),i:H.MIN,l:d=>({S:d[0].replace(Sm,(h,m)=>e.namedCodesToUnicode[m]?e.namedCodesToUnicode[m]:h)}),h:d=>d.S},textBolded:{t:ft(Wm),i:H.MED,l:(d,h,m)=>({S:h(d[2],m)}),h:(d,h,m)=>n("strong",{key:m.k},h(d.S,m))},textEmphasized:{t:ft(Um),i:H.LOW,l:(d,h,m)=>({S:h(d[2],m)}),h:(d,h,m)=>n("em",{key:m.k},h(d.S,m))},textEscaped:{t:ft(zm),i:H.HIGH,l:d=>({S:d[1],type:"text"})},textStrikethroughed:{t:ft(Km),i:H.LOW,l:Kr,h:(d,h,m)=>n("del",{key:m.k},h(d.S,m))}};e.disableParsingRawHTML!==!0&&(c.htmlBlock={t:qt(wo),i:H.HIGH,l(d,h,m){const[,x]=d[3].match(Ym),v=new RegExp(`^${x}`,"gm"),y=d[3].replace(v,""),_=(S=y,np.some(j=>j.test(S))?lp:Tn);var S;const M=d[1].toLowerCase(),P=cm.indexOf(M)!==-1;m.N=m.N||M==="a";const O=P?d[3]:_(h,y,m);return m.N=!1,{I:s(d[2]),S:O,G:P,H:P?M:d[1]}},h:(d,h,m)=>n(d.H,mt({key:m.k},d.I),d.G?d.S:h(d.S,m))},c.htmlSelfClosing={t:qt(_o),i:H.HIGH,l:d=>({I:s(d[2]||""),H:d[1]}),h:(d,h,m)=>n(d.H,mt({},d.I,{key:m.k}))});const f=function(d){let h=Object.keys(d);function m(x,v){let y=[],_="";for(;x;){let S=0;for(;S<h.length;){const M=h[S],P=d[M],O=P.t(x,v,_);if(O){const j=O[0];x=x.substring(j.length);const K=P.l(O,m,v);K.type==null&&(K.type=M),y.push(K),_=j;break}S++}}return y}return h.sort(function(x,v){let y=d[x].i,_=d[v].i;return y!==_?y-_:x<v?-1:1}),function(x,v){return m(function(y){return y.replace(vm,`
`).replace(wm,"").replace(Fm,"    ")}(x),v)}}(c),p=(g=function(d){return function(h,m,x){return d[h.type].h(h,m,x)}}(c),function d(h,m={}){if(Array.isArray(h)){const x=m.k,v=[];let y=!1;for(let _=0;_<h.length;_++){m.k=_;const S=d(h[_],m),M=typeof S=="string";M&&y?v[v.length-1]+=S:S!==null&&v.push(S),y=M}return m.k=x,v}return g(h,d,m)});var g;const b=r(t);return i.length?n("div",null,b,n("footer",{key:"footer"},i.map(function(d){return n("div",{id:e.slugify(d.O),key:d.O},d.O,p(f(d.M,{u:!0})))}))):b}(function(t){t[t.MAX=0]="MAX",t[t.HIGH=1]="HIGH",t[t.MED=2]="MED",t[t.LOW=3]="LOW",t[t.MIN=4]="MIN"})(H||(H={}));const dp=t=>{let{children:e,options:o}=t,n=function(r,s){if(r==null)return{};var i,a,c={},f=Object.keys(r);for(a=0;a<f.length;a++)s.indexOf(i=f[a])>=0||(c[i]=r[i]);return c}(t,um);return l.cloneElement(cp(e,o),n)},pt={root:{width:135}},oe={root:{width:220}},fp={root:{width:220}},mp={root:{width:220,paddingLeft:4,paddingRight:4,textAlign:"left"},label:{fontWeight:"normal"}},Ie=l.memo(function({table:e,filter:o,...n}){const r=Ri(e,o);return u.jsx(Xe,{label:"Column",placeholder:"Choose column",options:r,styles:oe,...n})}),pp=()=>!0,hp=l.memo(function({table:e,filter:o=pp,...n}){const r=Ri(e,o),s=l.useMemo(()=>[{key:"header",text:"Columns",itemType:fe.Header},...r],[r]);return u.jsx(Lo,{allowFreeform:!0,autoComplete:"off",label:"Column or value",placeholder:"text/number or select column",options:s,styles:oe,...n})}),gp=l.memo(function({column:e,table:o,values:n,filter:r,...s}){const i=yg(e,o,n,r);return u.jsx(Xe,{label:"Value",placeholder:"Choose value",options:i,styles:oe,...s})}),bp=l.memo(function({columnName:e,...o}){const n=Cg(),r=l.useMemo(()=>[{key:"header",text:"Values",itemType:fe.Header},...n],[n]);return u.jsx(Lo,{allowFreeform:!0,label:"Date format pattern",placeholder:"Select date format",autoComplete:"off",options:r,styles:oe,dropdownMaxWidth:200,useComboBoxAsMenuWidth:!0,...o})}),xp=l.memo(function({columnName:e,props:o,children:n,lazyLoadGroups:r}){const{group:s,onToggleCollapse:i}=o,a=l.useRef(),[c,f]=l.useState(!1),p=Sg(a.current,"0px"),g=l.useCallback(h=>{let m=0;return h.forEach(x=>{m+=x.count,m+=x.children?g(x.children):0}),m},[]);l.useEffect(()=>{p&&s?.isCollapsed&&i&&i(s)},[p,s,i]);const b=l.useCallback(()=>{f(!0),i&&i(s)},[s,i,f]),d=l.useMemo(()=>r&&s?.level>0&&!c,[s,r,c]);return u.jsxs(vp,{ref:h=>a.current=d?h:void 0,groupLevel:s?.level,children:[u.jsx(yp,{onClick:b,iconProps:{iconName:s?.isCollapsed?"ChevronRight":"ChevronDown"}}),u.jsxs(Zt,{condition:!!n,children:[u.jsx(Xt,{children:n}),u.jsxs(Ns,{children:[u.jsx(io,{children:u.jsxs(Cp,{children:[e?`${e}  - `:"",s?.name]})}),u.jsxs(io,{children:["Children: ",s?.count]}),s?.children&&u.jsxs(io,{children:["Total Items: ",g(s?.children)]})]})]})]})}),vp=C.div`
	padding-left: ${({groupLevel:t})=>`${t*12}px`};
	display: flex;
	gap: 8px;
`,yp=C(le)`
	width: 5%;
`,io=C.span`
	align-self: center;
`,Cp=C.b``;function ln(t,e,o={}){return{id:t,table:e,name:o.name||t}}async function Hn({input:t,output:e,args:{others:o}},n,r){const s=n.table(t),i=o.map(c=>n.table(c)),a=wp(await s,r,await Promise.all(i));return ln(e,a)}function wp(t,e,o){const n=e===on.Difference?"except":e;return t[n](...o)}var zr;(function(t){t.Source="source"})(zr||(zr={}));function q(t){return async function({input:o,output:n,args:r},s){const i=await s.get(o);return await t(n,i,r)}}function _p(t){return async function({output:o,args:n}){const r=await t(n);return ln(o,r)}}function Y(t){return(e,o,n)=>{let r;return o.table&&(r=t(o.table,n)),ln(e,r)}}function Ni(t,e){switch(e){case Ue.OR:return Sp(t);case Ue.AND:return kp(t);case Ue.XOR:return Tp(t);case Ue.NOR:return Dp(t);case Ue.NAND:return Ip(t);default:throw new Error(`Unsupported logical operator: [${e}]`)}}function Sp(t){return t.some(e=>e===1)?1:0}function kp(t){return t.every(e=>e===1)?1:0}function Tp(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e>1)return 0;return e===1?1:0}function Dp(t){return t.some(e=>e===1)?0:1}function Ip(t){let e=0;for(let o=0;o<t.length;o++)if(e+=t[o],e<0)return 1;return e===t.length?0:1}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Uo(t){return t==="false"?!1:!!t}function jp(t,e,o){if(o===Fe.IsEmpty||o===Be.IsEmpty||o===Re.IsEmpty)return Gr(t);if(o===Fe.IsNotEmpty||o===Be.IsNotEmpty||o===Re.IsNotEmpty)return Gr(t)===1?0:1;if(typeof t=="number"){const n=+e;return Op(t,n,o)}else{if(typeof t=="string")return Mp(t,`${e}`,o);if(typeof t=="boolean"){const n=Uo(e);return Np(t,n,o)}}return 0}function Gr(t){return t==null||typeof t=="number"&&isNaN(t)||typeof t=="string"&&t.length===0?1:0}function Mp(t,e,o){const n=t.toLocaleLowerCase(),r=e.toLocaleLowerCase();switch(o){case Be.Contains:case Be.RegularExpression:return De.match(n,new RegExp(r,"gi"),0)?1:0;case Be.EndsWith:return De.endswith(n,r,n.length)?1:0;case Be.Equals:return n.localeCompare(r)===0?1:0;case Be.NotEqual:return n.localeCompare(r)!==0?1:0;case Be.StartsWith:return De.startswith(n,r,0)?1:0;default:throw new Error(`Unsupported string comparison operator: [${o}]`)}}function Op(t,e,o){switch(o){case Fe.Equals:return t===e?1:0;case Fe.NotEqual:return t!==e?1:0;case Fe.GreaterThanOrEqual:return t>=e?1:0;case Fe.LessThanOrEqual:return t<=e?1:0;case Fe.GreaterThan:return t>e?1:0;case Fe.LessThan:return t<e?1:0;default:throw new Error(`Unsupported numeric comparison operator: [${o}]`)}}function Np(t,e,o){switch(o){case Re.Equals:return t===e?1:0;case Re.NotEqual:return t!==e?1:0;case Re.IsTrue:return t===!0?1:0;case Re.IsFalse:return t===!1?1:0;default:throw new Error(`Unsupported boolean comparison operator: [${o}]`)}}function Pi(t,e,o=Ue.OR){return it(n=>{const r=n[t],s=e.map(i=>{const{value:a,operator:c,type:f}=i,p=f===en.Column?n[`${a.toString()}`]:a;return jp(r,p,c)});return Ni(s,o)})}function Pp(t,e){return it(o=>{const n=t.map(r=>Uo(o[r])?1:0);return Ni(n,e)})}const Ap=new Set([...Object.values(rn),...Object.values(Ps)]);function Vn(t,e){if(!Ap.has(e))throw new Error(`Unsupported operation [${e}], too many parameters needed`);return De[e](t)}const Ep=Y((t,{groupby:e,column:o,operation:n,to:r})=>{const s=Vn(o,n);return t.groupby(e).rollup({[r]:s})}),Fp=q(Ep),Bp=Y((t,e)=>t.derive({[e.to]:Rp(t,e)})),$p=q(Bp);function Rp(t,e){const{strategy:o,column:n,fixedwidth:r,fixedcount:s,clamped:i}=e,a=Lp(t,n,e.min,e.max),[c,f,p]=a;switch(o){case Le.Auto:return wc(n);case Le.FixedWidth:return Sl(n,c,f,r||1,i,p);case Le.FixedCount:return _l(n,c,f,s||1,i,p);default:throw new Error(`Unsupported bin strategy ${o}`)}}function Lp(t,e,o,n){const r=t.rollup({min:De.min(e),max:De.max(e),distinct:De.distinct(e)});return[o||r.get("min",0),n||r.get("max",0),r.get("distinct",0)]}const Hp=Y((t,{to:e,column:o,criteria:n,logical:r})=>t.derive({[e]:Pi(o,n,r)})),Vp=q(Hp),Wp=Y((t,{columns:e=[],operator:o,to:n})=>t.derive({[n]:Pp(e,o)})),Up=q(Wp);async function Kp(t,e){return Hn(t,e,on.Concat)}const zp=Y((t,{columns:e,type:o,radix:n,formatPattern:r})=>{const s=e.reduce((i,a)=>(i[a]=qp(a,o,n,r),i),{});return t.derive(s)}),Gp=q(zp);function qp(t,e,o,n){const r=Gs(n??"%Y-%m-%d"),s=zs(n??"%Y-%m-%d");return it(i=>{const a=i[t];switch(e){case Ke.Boolean:return Uo(a);case Ke.Date:return a!==null&&!isNaN(a)?new Date(a):n==="%Y-%m-%dT%H:%M:%S.%LZ"?gc(a):r(a);case Ke.Integer:return De.parse_int(a,o);case Ke.Decimal:return De.parse_float(a);case Ke.String:return go(a)===R.String&&a.trim().toLowerCase()==="undefined"?void 0:go(a)===R.String&&a.trim().toLowerCase()==="null"?null:a instanceof Date?s(a):a!=null?a.toString():a}})}const Yp=Y((t,{columns:e})=>e?t.dedupe(e):t.dedupe()),Jp=q(Yp),Zp=Y((t,{column1:e,column2:o,operator:n,to:r})=>{const s=it(i=>{const a=i[e],c=i[o];switch(n){case Jt.Add:return a+c;case Jt.Subtract:return a-c;case Jt.Multiply:return a*c;case Jt.Divide:return a/c;default:throw new Error(`Unsupported operator: [${n}]`)}});return t.derive({[r]:s})}),Xp=q(Zp);async function Qp(t,e){return Hn(t,e,on.Difference)}const eh=Y((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=it(i=>`${i[s]}`==`${e}`?null:i[s]),r),{});return t.derive(n)}),th=q(eh),nh=_p(oh);async function oh({url:t,delimiter:e,autoMax:o}){return t.toLowerCase().endsWith(".json")?yc(t,{autoType:!(o===void 0||o<=0)}):vc(t,{delimiter:e,autoMax:o!==void 0?o:0,autoType:!(o===void 0||o<=0)})}const rh=Y((t,{value:e,to:o})=>{const n=(r,s)=>s.value;return t.params({value:e}).derive({[o]:n})}),sh=q(rh),ih=Y((t,{column:e,criteria:o,logical:n})=>t.filter(Pi(e,o,n))),ah=q(ih),lh=Y((t,{columns:e,to:o})=>t.fold(e,{as:o})),uh=q(lh),ch=Y((t,{columns:e})=>t.groupby(e)),dh=q(ch),fh=Y((t,{value:e,columns:o})=>{const n=o.reduce((r,s)=>(r[s]=(i,a)=>a.value,r),{});return t.params({value:e}).impute(n)}),mh=q(fh);async function ph(t,e){return Hn(t,e,on.Intersect)}async function hh({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return ln(e,gh(r,s,o))}var qr;(function(t){t.Left="left",t.Right="right"})(qr||(qr={}));function gh(t,e,{on:o,strategy:n=nt.Inner}){return t.join(e,o,void 0,{left:n===nt.LeftOuter||n===nt.FullOuter,right:n===nt.RightOuter||n===nt.FullOuter})}async function bh({input:t,output:e,args:o},n){const[r,s]=await Promise.all([n.table(t),n.table(o.other)]);return ln(e,xh(r,s,o))}var Yr;(function(t){t.Input="Input",t.Other="Other"})(Yr||(Yr={}));function xh(t,e,{on:o=[],columns:n}){return t.lookup(e,o,...n)}const vh=Y((t,{columns:e=[],strategy:o,to:n,delimiter:r=""})=>{const s=Ch(t,e),i=it(a=>{switch(o){case Et.LastOneWins:return _h(s,a,e);case Et.Concat:return Sh(a,e,r);case Et.CreateArray:return Ai(a,e);case Et.FirstOneWins:default:return wh(s,a,e)}});return t.derive({[n]:i})}),yh=q(vh);function Ch(t,e){let o=!0;const n=bo(t,e[0]);let r=1;for(;o===!0&&r<e.length;){const s=bo(t,e[r]);o=n===s,r++}return o}function wh(t,e,o){let n=e[o[0]],r=!1,s=0;for(;!r&&s<o.length;)e[o[s]]!==void 0&&e[o[s]]!==null&&(n=e[o[s]],r=!0),s++;return t?n:""+n}function _h(t,e,o){let n=e[o[0]];for(let r=0;r<o.length;r++)e[o[r]]!==void 0&&e[o[r]]!==null&&(n=e[o[r]]);return t?n:""+n}function Ai(t,e){const o=[];for(let n=0;n<e.length;n++)t[e[n]]!==void 0&&t[e[n]]!==null&&o.push(t[e[n]]);return o}function Sh(t,e,o){return Ai(t,e).join(o)}const kh=Y((t,{column:e,prefix:o})=>{const r=t.rollup({distinct:De.array_agg_distinct(e)}).get("distinct",0).reduce((s,i)=>(s[o?`${o}${i}`:i]=it(a=>a[e]===null?null:a[e]===i?1:0),s),{});return t.derive(r)}),Th=q(kh),Dh=Y((t,{orders:e})=>t.orderby(...e.map(jh))),Ih=q(Dh);function jh({column:t,direction:e}){return e===Ce.Descending?As(t):t}const Mh=Y((t,{key:e,value:o,operation:n})=>t.pivot(e,{[o]:Vn(o,n)})),Oh=q(Mh),Nh=Y((t,{column:e,to:o,map:n})=>t.derive({[o]:it(r=>De.recode(r[e],n))})),Ph=q(Nh),Ah=Y((t,{columns:e})=>t.rename(e)),Eh=q(Ah),Fh=Y((t,{column:e,operation:o,to:n})=>t.rollup({[n]:Vn(e,o)})),Bh=q(Fh),$h=Y((t,{size:e,proportion:o})=>{const n=Math.round(t.numRows()*(o||1)),r=e||n;return t.sample(r)}),Rh=q($h),Lh=Y((t,{columns:e=[]})=>{const o=[e];return o.length===0&&o.push(kl()),t.select(...o)}),Hh=q(Lh),Vh=Y((t,{to:e,column:o})=>t.spread(o,{as:e})),Wh=q(Vh),Uh=Y((t,{key:e,value:o})=>{const n=t.columnNames(f=>f!==e&&f!==o),r=t.select(n).objects(),s=[...new Set(t.array(e))],i=t.objects(),a=[],c=r.length!==0?r.length/s.length:s.length;for(let f=0;f<c;f++){let p={};r.length!==0&&(p={...r[f*s.length]});let g=f*s.length;s.forEach(b=>{const d=i[g];p[b]=d!==void 0?d[o]:null,g++}),a.push(p)}return ds(a)}),Kh=q(Uh),zh=Y(t=>t.ungroup()),Gh=q(zh);async function qh(t,e){return Hn(t,e,on.Union)}const Yh=Y(t=>t.unorder()),Jh=q(Yh),Zh=Y((t,{columns:e})=>t.unroll(e)),Xh=q(Zh),Qh=Y((t,{column:e,operation:o,to:n})=>t.derive({[n]:Vn(e,o)})),eg=q(Qh),tg={aggregate:Fp,bin:$p,binarize:Vp,boolean:Up,chain:Ko,concat:Kp,convert:Gp,dedupe:Jp,derive:Xp,difference:Qp,erase:th,fetch:nh,fill:sh,filter:ah,fold:uh,groupby:dh,impute:mh,intersect:ph,join:hh,lookup:bh,merge:yh,onehot:Th,orderby:Ih,pivot:Oh,recode:Ph,rename:Eh,rollup:Bh,sample:Rh,select:Hh,spread:Wh,unfold:Kh,ungroup:Gh,union:qh,unorder:Jh,unroll:Xh,window:eg};async function Ko(t,e){const{args:{steps:o,nofork:n}}=t,r=n?e:await e.clone();let s={id:t.output,table:Tl({})};for(let a=0;a<o.length;a++){const c=o[a],{verb:f}=c;try{s=await(tg[f]||Ko)(c,r),r.set(s)}catch(p){throw console.error(`Pipeline failed on step ${a}`,c),p}}const i={...s,id:t.output};return e.set(i),i}async function ng(t,e){return Ko(t,e)}async function og(t,e){if(t.length===0)throw new Error("no steps in chain");return ng({verb:B.Chain,input:t[0].input,output:t[t.length-1].output,args:{steps:t,nofork:!0}},e)}class zo{async get(e){const o=this._storage.get(e);if(!o)throw new Error(`No table with id '${e}' found in store.`);const{container:n}=o;if(!o.resolved){const{resolver:r}=o;if(!r)throw new Error(`No resolver function for unloaded table '${e}'.`);const s=await r(e);n.table=s,this.set(n)}return n}async table(e){return(await this.get(e)).table}set(e){const o={container:e,resolved:!0};return this._storage.set(e.id,o),this.onChange(e.id),this}delete(e){return this._storage.delete(e),this.onChange(),this}queue(e,o){const n={container:{id:e},resolved:!1,resolver:o};return this._storage.set(e,n),this}list(e){return Array.from(this._storage.keys()).filter(e||(()=>!0))}async toMap(){const e=new Map;for(const o of this._storage.keys()){const n=await this.get(o);e.set(o,n)}return e}async toArray(){const e=await this.toMap();return Array.from(e.values())}listen(e,o){return this._tableListeners[e]=o,()=>delete this._tableListeners[e]}unlisten(e){delete this._tableListeners[e]}addChangeListener(e){return this._changeListeners.push(e),()=>{const o=this._changeListeners.findIndex(n=>n===e);o>=0&&(this._changeListeners=this._changeListeners.splice(o,1))}}onChange(e){(async()=>{if(e){const n=await this.get(e),r=this._tableListeners[e];r&&r(n)}this._changeListeners.forEach(n=>n())})()}async print(){const e=this.list();for(let o=0;o<e.length;o++)console.log(`--- ${e[o]} ---`),(await this.get(e[o])).table?.print()}async clone(){const e=await this.toArray();return new zo(Ht(e))}clear(){return Array.from(this._storage.keys()).forEach(o=>this.delete(o)),this}constructor(e){this._storage=new Map,e&&e.forEach(o=>{this._storage.set(o.id,{container:o,resolved:!0})}),this._changeListeners=[],this._tableListeners={}}}function rg(t){return new zo(t)}function sg(t){return new ig(t)}function Go(t,e,o){const n={verb:t,input:e,output:o};switch(t){case B.Chain:return{...n,args:{steps:[]}};case B.Bin:return{...n,args:{to:"output",strategy:Le.Auto,fixedcount:10}};case B.Aggregate:case B.Boolean:case B.Derive:case B.Fill:case B.Merge:case B.Rollup:case B.Window:return{...n,args:{to:"output"}};case B.Concat:case B.Difference:case B.Intersect:case B.Union:return{...n,args:{others:[]}};case B.Fold:return{...n,args:{to:["key","value"],columns:[]}};case B.Convert:case B.Erase:case B.Impute:case B.Lookup:case B.Groupby:case B.Dedupe:case B.Select:case B.Unroll:return{...n,args:{columns:[]}};case B.Spread:return{...n,args:{to:[]}};case B.Pivot:return{...n,args:{operation:rn.Any}};case B.Join:return{...n,args:{strategy:nt.Inner}};case B.Binarize:return{...n,args:{to:"output",criteria:[],logical:Ue.OR}};case B.Filter:return{...n,args:{criteria:[],logical:Ue.OR}};case B.Fetch:case B.OneHot:case B.Orderby:case B.Rename:case B.Sample:case B.Ungroup:case B.Unorder:case B.Unfold:}return{...n,args:{}}}class ig{get store(){return this._store}get steps(){return[...this._steps]}get last(){return this._steps[this._steps.length-1]}get count(){return this._steps.length}get outputs(){return this._steps.map(e=>e.output)}create(e){const o=this.count,n=o===0?"":this._steps[o-1].output,r=Go(e,n,`output-table-${o}`);return this.add(r)}add(e){return this._steps.push(e),this.steps}addAll(e){return e.forEach(o=>this._steps.push(o)),this.steps}clear(){this._steps.forEach(e=>this._store.delete(e.output)),this._steps=[]}delete(e){const o=this.steps.slice(0,e);return this.clear(),this.addAll(o),this.steps}update(e,o){return this._steps[o]=e,this.steps}async run(){return og(this._steps,this._store)}print(){console.log(this._steps)}constructor(e){this._store=e,this._steps=[]}}var T;(function(t){t[t.InputTable=0]="InputTable",t[t.InputColumn=1]="InputColumn",t[t.OutputColumn=2]="OutputColumn",t[t.RowModifying=3]="RowModifying",t[t.NumericOnly=4]="NumericOnly"})(T||(T={}));const Jr={aggregate:[T.InputTable,T.InputColumn,T.OutputColumn,T.RowModifying],bin:[T.InputTable,T.InputColumn,T.OutputColumn,T.NumericOnly],binarize:[T.InputTable,T.InputColumn,T.OutputColumn],boolean:[T.InputTable,T.OutputColumn],chain:[],concat:[T.InputTable,T.RowModifying],convert:[T.InputTable],dedupe:[T.InputTable,T.RowModifying],derive:[T.InputTable,T.OutputColumn],difference:[T.InputTable,T.RowModifying],erase:[T.InputTable,T.RowModifying],fetch:[],fill:[T.InputTable,T.OutputColumn],filter:[T.InputTable,T.InputColumn,T.RowModifying],fold:[T.InputTable,T.RowModifying],groupby:[T.InputTable],impute:[T.InputTable],intersect:[T.InputTable,T.RowModifying],join:[T.InputTable,T.RowModifying],lookup:[T.InputTable,T.RowModifying],merge:[T.InputTable,T.OutputColumn],pivot:[T.InputTable,T.RowModifying],onehot:[T.InputTable,T.InputColumn],orderby:[T.InputTable],recode:[T.InputTable,T.InputColumn,T.OutputColumn],rename:[T.InputTable],rollup:[T.InputTable,T.InputColumn,T.OutputColumn,T.RowModifying],sample:[T.InputTable,T.RowModifying],select:[T.InputTable],spread:[T.InputTable],unfold:[T.InputTable,T.RowModifying],ungroup:[T.InputTable],union:[T.InputTable,T.RowModifying],unorder:[T.InputTable],unroll:[T.InputTable,T.RowModifying],window:[T.InputTable,T.InputColumn,T.OutputColumn]},ag=un(T.InputTable),Ei=un(T.InputColumn),Fi=un(T.OutputColumn),lg=un(T.RowModifying),ug=un(T.NumericOnly);function un(t){return Object.keys(Jr).filter(e=>Jr[e].findIndex(o=>o===t)>=0)}function cg(t){return Wn(t,ag)}function dg(t){return Wn(t,Ei)}function Bi(t){return Wn(t,Fi)}function fg(t){return Wn(t,ug)}function Wn(t,e){return e.findIndex(o=>o===t.verb)>=0}function mg(t=()=>!0){const e=lm(Ei,Fi);return om(e,lg).filter(t)}const pg=l.memo(function({table:e,order:o,onChange:n,onDelete:r}){const{column:s,direction:i}=o,a=i===Ce.Ascending,c=a?"Ascending":"Descending",f=l.useCallback((b,d)=>{const h={...o,column:d.key};n&&n(h)},[o,n]),p=l.useCallback(()=>{const b={...o,direction:o.direction===Ce.Descending?Ce.Ascending:Ce.Descending};n&&n(b)},[o,n]),g=l.useCallback(()=>r&&r(),[r]);return u.jsxs(hg,{children:[u.jsx(Ie,{table:e,label:void 0,selectedKey:s,onChange:f}),u.jsx(le,{toggle:!0,checked:a,title:c,iconProps:{iconName:c},onClick:p}),u.jsx(le,{title:"Remove this sort",iconProps:{iconName:"Delete"},onClick:g})]})}),hg=C.div`
	display: flex;
	justify-content: flex-start;
`,qo=l.memo(function({store:e,...o}){const n=vg(e);return u.jsx(Xe,{label:"Table",placeholder:"Choose table",options:n,styles:oe,...o})});function gg(t,e,o,n,r){const s=e.names[o];return r&&r!==s?t:n===Ce.Ascending?t.sort((i,a)=>i[0]-a[0]):t.sort((i,a)=>a[0]-i[0])}function $i(t,e,o,n,r,s,i=!0,a,c=0){const f=t[0],p=t[1],g=e.names[o];if(!g)throw new Error(`could not determine column name for level ${o}`);const b=r.slice(c).findIndex(m=>m[g]===f)+c,d={key:f.toString(),name:f.toString(),startIndex:b,level:o,count:p.length,isCollapsed:i?o!==0&&b!==0:!1},h=o+1;if(h<n){const m=gg(p,e,h,s,a).map(x=>$i(x,e,h,n,r,s,i,a,b));d.children=m}return d}const bg=t=>t,xg=t=>t&&+t;function Yo(t){return l.useMemo(()=>t.map(e=>({key:e,text:e.toString()})),[t])}function vg(t){const[e,o]=l.useState(!0),[n,r]=l.useState([]);return l.useEffect(()=>{t?.addChangeListener(()=>o(!0))},[t,o]),l.useEffect(()=>{e&&(o(!1),r(t?.list().sort()||[]))},[t,e,o,r]),Yo(n)}function Ri(t,e){return Yo(t?.columnNames(e)||[])}function yg(t,e,o,n){const r=l.useMemo(()=>{if(!e||!t||t.trim().length===0)return[];const i=o||(()=>e.columnNames().filter(c=>c===t).length!==0?e.rollup({[t]:De.array_agg_distinct(t)}).get(t,0)??[]:[])();return n?i.filter(n):i},[t,e,o,n]);return Yo(r)}function Cg(){return[{key:"%Y-%m-%d",text:"%Y-%m-%d"},{key:"%Y/%m/%d",text:"%Y/%m/%d"},{key:"%B %d, %Y",text:"%B %d, %Y"},{key:"%m-%d-%Y",text:"%m-%d-%Y"},{key:"%m/%d/%Y",text:"%m/%d/%Y"},{key:"%d-%m-%Y",text:"%d-%m-%Y"},{key:"%d/%m/%Y",text:"%d/%m/%Y"},{key:"%Y-%m-%dT%H:%M:%S.%LZ",text:"ISO 8601 (%Y-%m-%dT%H:%M:%S.%LZ)"}]}function ae(t,e,o){return l.useCallback((n,r)=>{const s=Ht(t);at(s,e,r?.key),o&&o(s)},[t,e,o])}function je(t,e,o,n=bg){return l.useCallback((r,s)=>{const i=Ht(t),a=n(s);at(i,e,a),o&&o(i)},[t,e,o,n])}function bt(t,e,o,n=xg){return l.useCallback((r,s)=>{const i=Ht(t),a=n(s);typeof a=="number"&&(at(i,e,a),o&&o(i))},[t,e,o,n])}function wg(t,e,o){return l.useCallback((n,r)=>{const s=Ht(t);at(s,e,r),o&&o(s)},[t,e,o])}function _g(t,e){return l.useCallback(o=>{const n=t,r={...n.args};delete r.columns[o],e&&e({...t,args:{...n.args,...r}})},[t,e])}function me(t,e,o){const[n,r]=l.useState(),s=l.useCallback(i=>r(i.table),[r]);return l.useEffect(()=>(e?r(e):t&&o&&(async(a,c)=>{try{c.listen(a,s);const f=await c.get(a);r(f.table)}catch{}})(t,o),()=>{t&&o&&o.unlisten(t)}),[t,e,o,s]),n}function Sg(t,e){const[o,n]=l.useState(!1);return l.useEffect(()=>{const r=new IntersectionObserver(([s])=>{n(s?.isIntersecting??!1)},{rootMargin:e});return t&&r.observe(t),()=>t&&r.unobserve(t)},[t,e]),o}function kg(t,e){return l.useMemo(()=>!t||!e?R.Unknown:bo(t,e),[t,e])}function Tg(){return l.useMemo(()=>rg(),[])}function Dg(t,e){return l.useMemo(()=>{const o=sg(t);return e&&o.addAll(e),o},[t,e])}function Ig(t){const[e,o]=l.useState(),[n,{toggle:r}]=nn(!1),s=l.useCallback(a=>{o(a),r()},[r,o]),i=l.useCallback(()=>{t&&t(e),r()},[r,e,t]);return{isDeleteModalOpen:n,onConfirmDelete:i,toggleDeleteModalOpen:r,onDeleteClicked:s}}function Li(t){const e=l.useCallback(o=>t?t.list().includes(o):!1,[t]);return l.useCallback(o=>{const n=o.replace(/( \(\d+\))/,"");let r=n,s=1;for(;e(r);)r=`${n} (${s})`,s++;return r},[e])}function jg(){const t=l.useCallback((e,o)=>o.includes(e),[]);return l.useCallback((e,o)=>{const n=e.replace(/( \(\d+\))/,"");let r=n,s=1;for(;t(r,o);)r=`${n} (${s})`,s++;return r},[t])}function Mg(){return l.useCallback((t,e="New column")=>{const o=t;return Object.keys(o).forEach(n=>{n==="to"&&!Tt(o[n])&&(o[n]=e)}),o},[])}function Hi(){const t=jg();return l.useCallback((e,o)=>{let n=e.args;return Object.keys(n).forEach(r=>{if(r==="to"&&!Tt(n[r])){const s=t(n[r],o);n={...n,[r]:s}}}),n},[t])}C.div`
	margin-top: 12px;
`;C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;const Ge=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,L=C.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	margin-bottom: 8px;
`,Zr=C.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	margin-bottom: 8px;
	gap: 12px;
`,Og=C.div`
	font-size: 0.85em;
	color: ${({theme:t})=>t.application().midHighContrast().hex()};
`;function Ng(t,e){return l.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function jt(t,e=!0){return l.useMemo(()=>({width:t?.currentWidth||0,height:t?.data?.compact&&e?15:20}),[t,e])}function Pg(t,e){return l.useMemo(()=>t?(o,n)=>e&&e(o,n):void 0,[t,e])}function Ag(t,e,o=!1,n){return l.useMemo(()=>{const r=!e||o?t.columnNames():e.map(s=>s.name);if(n&&n.length>0){const s=n.reduce((i,a)=>(i[a]=!0,i),{});return r.filter(i=>s[i])}return r},[t,e,o,n])}function _e(t,e){return e?.fieldName&&t[e.fieldName]}function Eg(t,e,o){const n=_e(t,o),r=jl(n,Ol);return Ml(r).map((i,a)=>({key:`${a}-${i}`,text:i,data:{rowIndex:e,column:o},title:i}))}function Vi(t){if(Tt(t))return t.reduce((e,o)=>{const n=e[o]||0;return e[o]=n+1,e},{})}function Fg(t){return Object.values(t).every(e=>e===1)}function Jo(t){return!!(sn(t)||Dl(t)||(Il(t)||Tt(t))&&t.length===0)}function Bg(t,e=500){const o=setTimeout(()=>t(),e);return()=>clearTimeout(o)}const $g=5,Rg=20,So=l.memo(function({item:e,column:o,textAlign:n="left"}){const r=_e(e,o)||[],s=Lg(r),i=Hg(r);return u.jsx("div",{title:i,style:{textAlign:n},children:s})});function Lg(t,e=$g){return l.useMemo(()=>{const o=`[${t.slice(0,e).join(", ")}]`;return t.length>e?`${o}...`:o},[t,e])}function Hg(t,e=Rg){return l.useMemo(()=>{let o=t.slice(0,e).join(`
`);return t.length>e&&(o+=`
...
(+${t.length-e} more)`),o},[t,e])}const Wi=l.memo(function({item:e,column:o}){const n=jt(o),r=Vg(n,e,o);return u.jsx("svg",{width:n.width,height:n.height,children:u.jsx("circle",{...r})})});function Vg(t,e,o){const n=we();return l.useMemo(()=>{const r=!!_e(e,o),{width:s,height:i}=t;return{cx:s/2,cy:i/2,r:i/4,fill:r?n.process().fill().hex():"none",stroke:n.process().stroke().hex()}},[n,t,e,o])}const Wg=l.memo(function({item:e,column:o,textAlign:n="right"}){const r=!!_e(e,o);return u.jsx("div",{style:{textAlign:n},children:r.toString()})});function Ui(t,e){const o=l.useMemo(()=>Es().domain([0,t.length-1]).range(e).clamp(!0),[t,e]);return l.useMemo(()=>(n,r)=>o(r),[o])}function Ki(t,e){const o=l.useMemo(()=>[Math.min(...t),Math.max(...t)],[t]),n=l.useMemo(()=>Es().domain(o).range(e),[o,e]);return l.useMemo(()=>o[0]===o[1]?()=>e[1]:r=>n(r),[n,o,e])}function zi(t,e,o){const n=we();l.useLayoutEffect(()=>{Fs(t.current).call(Nl,n,{width:e<0?0:e,height:o<0?0:o})},[n,t,e,o])}function Gi(t,e,o){const n=we(),[r,s]=l.useState();return l.useLayoutEffect(()=>{const i=Fs(t.current).append("g").call(Pl,n).append("g");s(i)},[n,t,e,o]),r}const Zo=l.memo(function({data:e,width:o,height:n,categorical:r=!1,color:s,legend:i,onBarHover:a}){const c=we(),f=l.useRef(null),p=l.useMemo(()=>r?Tt(s)?s:c.scales().nominal(e.length).toArray():s||c.line().stroke().hex(),[c,e,s,r]),g=l.useMemo(()=>Math.floor((o-4)/e.length),[e,o]),b=Ui(e,[g/2,o-g/2]),d=Ki(e,[n-1,0]);zi(f,o,n);const h=Gi(f,o,n);return l.useLayoutEffect(()=>{h&&(h.selectAll("*").remove(),h.selectAll(".bar-group").data(e).enter().append("g").attr("class","bar-group").append("line").attr("class","bar").attr("x1",b).attr("x2",b).attr("y1",d).attr("y2",n).call(Bs,c.line()).attr("stroke-width",g).attr("stroke",(m,x)=>r?p[x]??null:p).attr("data-legend",(m,x)=>i?.length?i[x]??null:m).attr("data-index",(m,x)=>x).attr("id",(m,x)=>`bar-${x}-${m}-${Math.round(Math.random()*100)}`),a?h.selectAll(".bar").on("mouseover mouseout",a):h.selectAll(".bar-group").append("title").text((m,x)=>i?.length?i[x]??null:m))},[c,h,e,n,b,d,p,r,g,i,a]),u.jsx("svg",{ref:f})}),Ug=l.memo(function({data:e,width:o,height:n,color:r}){const s=we(),i=l.useRef(null),a=l.useMemo(()=>r||s.line().stroke().hex(),[s,r]),c=Ui(e,[0,o]),f=Ki(e,[0,n]);zi(i,o,n);const p=Gi(i,o,n),g=l.useMemo(()=>Al(c,f)(e),[e,c,f]);return l.useLayoutEffect(()=>{p&&(p.selectAll("*").remove(),p.append("path").call(Bs,s.line()).attr("d",g).attr("stroke-width",1).attr("stroke",a))},[s,p,g,a]),u.jsx("svg",{ref:i})}),qi=l.memo(function({column:e,categories:o={}}){const n=l.useMemo(()=>Object.values(o),[o]),r=jt(e);return u.jsx(Zo,{data:n,categorical:!0,width:r.width,height:r.height})}),Yi=l.memo(function({onClick:e,column:o,children:n}){const r=l.useCallback(i=>{o&&e&&e(i,o?.data?.selected?void 0:o)},[o,e]),s=l.useMemo(()=>{const i={};return e&&(i.cursor="pointer"),o?.data?.selected&&(i.fontWeight="bold"),i},[e,o]);return u.jsx(Kg,{onClick:r,style:s,children:n})}),Kg=C.div`
	display: flex;
	align-items: center;
	height: 100%;
	width: inherit;
	> * {
		&:first-child {
			padding: 6px 8px 6px 12px;
		}
	}
`,Xo=l.memo(function({item:e,column:o,textAlign:n="right"}){const r=_e(e,o);return u.jsx("div",{style:{textAlign:n},children:r&&r.toLocaleString()})}),zg=l.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=_e(n,r),a=o?.type??go(i),c=l.useCallback(p=>{r&&s&&s(p,r?.data?.selected?void 0:r)},[r,s]),f=l.useMemo(()=>{const p={width:"100%"};return s&&(p.cursor="pointer"),r?.data?.selected&&(p.fontWeight="bold"),p},[s,r]);return u.jsx("div",{onClick:c,style:f,children:u.jsxs(an,{children:[u.jsx(G,{condition:Jo(i),children:u.jsx(Qo,{textAlign:a===R.Number?"right":"left"})}),u.jsx(G,{condition:a===R.Boolean,children:u.jsx(Wg,{...e})}),u.jsx(G,{condition:a===R.String,children:u.jsx(er,{...e})}),u.jsx(G,{condition:a===R.Number,children:u.jsx(mb,{...e,numberFormat:","})}),u.jsx(G,{condition:a===R.Date,children:u.jsx(Xo,{...e})}),u.jsx(G,{condition:a===R.Array,children:u.jsx(So,{...e})}),u.jsx($n,{children:u.jsx(Xi,{...e})})]})})}),Gg=2,qg=l.memo(function({column:e,isClickable:o,onClick:n}){const r=we(),{isSorted:s,isSortedDescending:i,iconName:a,iconClassName:c}=e,f=jt(e),p=l.useMemo(()=>({lineHeight:e.data.compact?Gg:"inherit",cursor:o?"pointer":"inherit",display:"flex",justifyContent:"space-between",width:f.width,borderBottom:e.data?.selected?`2px solid ${r.application().accent().hex()}`:"2px solid transparent"}),[r,f,e,o]),g=l.useMemo(()=>({color:e.data?.selected?r.application().accent().hex():r.application().foreground().hex(),width:"100%",textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}),[r,e]),b=l.useMemo(()=>({root:{fontSize:12,color:r.application().midHighContrast().hex()}}),[r]);return u.jsxs("div",{onClick:d=>n&&n(d,e),style:p,children:[u.jsx("div",{style:g,title:e.name,children:e.name}),a?u.jsx(qe,{className:c,iconName:a}):null,s?u.jsx(qe,{iconName:i?"SortDown":"SortUp",styles:b}):null]})}),Qo=l.memo(function({textAlign:e}){const o=we(),n=l.useMemo(()=>({width:"100%",textAlign:e,color:o.application().lowContrast().hex()}),[o,e]);return u.jsx("div",{style:n,children:"—"})}),Yg=l.memo(function({props:e,renderers:o}){return u.jsx(Zg,{className:"header-command-bar",children:o.map((n,r)=>u.jsx(Jg,{children:n(e)},r))})}),Jg=C.div``,Zg=C.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-top: 1px solid ${({theme:t})=>t.application().faint().hex()};
	border-bottom: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,Ji=l.memo(function({item:e,column:o,onCellDropdownSelect:n,rowIndex:r}){const s=Eg(e,r,o)||[],i=s.slice(0,10).map(a=>a.text).join(", ")||"Open to see the values";return u.jsx(Xe,{onChange:n,placeholder:i,options:s,styles:{root:{width:"85%"}}})}),Xg=l.memo(function(e){const{features:o,metadata:n,item:r,column:s,index:i,onColumnClick:a}=e,c=n?.type,f=_e(r,s),p=Qg(f,n,c),g=Vi(f);return u.jsx(Yi,{onClick:a,column:s,children:u.jsxs(an,{children:[u.jsx(G,{condition:Jo(f),children:u.jsx(Qo,{textAlign:c===R.Number?"right":"left"})}),u.jsx(G,{condition:c===R.String,children:u.jsx(er,{...e})}),u.jsx(G,{condition:o.showBooleanSymbol&&c===R.Boolean,children:u.jsx(Wi,{...e})}),u.jsx(G,{condition:o.showNumberMagnitude&&c===R.Number,children:u.jsx(Zi,{...e,magnitude:p})}),u.jsx(G,{condition:o.showDateFormatted&&c===R.Date,children:u.jsx(Xo,{...e})}),u.jsx(G,{condition:o.showCategoricalBar&&c===R.Array,children:u.jsx(qi,{...e,categories:g})}),u.jsx(G,{condition:o.showSparkbar&&c===R.Array&&g&&g.length,children:u.jsx(Qi,{...e})}),u.jsx(G,{condition:o.showDropdown&&c===R.Array,children:u.jsx(Ji,{rowIndex:i||0,...e})}),u.jsx(G,{condition:o.showSparkline&&c===R.Array,children:u.jsx(ea,{...e})}),u.jsx($n,{children:u.jsx(zg,{...e})})]})})});function Qg(t,e,o){return l.useMemo(()=>{if(o!==R.Number||sn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return(t-(e?.stats?.min||0))/n},[o,t,e])}const eb=8,tb=l.memo(function({metadata:e,color:o,...n}){const{column:r,onClick:s}=n,i=jt(r,!1),a=e.type==="string",c=a?e.stats?.categories:e.stats?.bins,f=l.useMemo(()=>(c||[]).map(_=>_.count),[c]),p=nb(e.stats,a),g=ob(p),b=rb(p),[d,h]=l.useState(),[m,x]=l.useState(),v=l.useCallback(_=>{const{target:S,type:M}=_,P=S.dataset.index,O=S.id;M==="mouseover"&&P>=0?(h(b[P]||""),x(O)):(h(void 0),x(void 0))},[b,h,x]),y=l.useMemo(()=>({height:i.height+eb,cursor:s?"pointer":"inherit"}),[s,i]);return e.stats?.distinct===1?null:u.jsx(u.Fragment,{children:c?u.jsx("div",{onClick:_=>s&&c&&s(_,r,e),title:g,style:y,children:u.jsx(El,{content:d,id:m,calloutProps:{gapSpace:5,target:`#${m}`},children:u.jsx(Zo,{categorical:a,data:f,width:i.width-1,height:i.height,color:o,legend:b,onBarHover:v})})}):null})});function nb(t,e){return l.useMemo(()=>e?t?.categories||[]:(t?.bins||[]).map(o=>({name:`${o.min}`,count:o.count})),[t,e])}function ob(t){return l.useMemo(()=>t.reduce((e,o,n)=>{const{name:r,count:s}=o;return e+(n>0?`
`:"")+`${Rn(r)}: ${s}`},""),[t])}function rb(t){return l.useMemo(()=>t.map(e=>`${Rn(e.name)}: ${e.count}`),[t])}const sb=(t,e,o,n)=>function(s,i,a){return u.jsx(bb,{item:s,index:i,column:a,metadata:t,color:e,onColumnClick:o,onCellDropdownSelect:n})},ib=(t,e,o,n,r)=>function(i,a,c){return u.jsx(Xg,{index:a||0,item:i,column:c,onCellDropdownSelect:r,onColumnClick:n,metadata:e,color:o,features:t})},ab=t=>function(o,n){return!o||!n?null:u.jsx(u.Fragment,{children:t.map((r,s)=>r({key:`renderer-${o.column.key}${s}`,...o},n))})},lb=(t,e,o)=>function(r,s){if(!r||!s)return null;const i=fb(t,r);return u.jsx(qg,{...i,isClickable:e,onClick:o})},ub=(t,e,o)=>function(r,s){return!r||!s?null:u.jsx(yb,{onClick:e,metadata:t,stats:o,...r})},cb=t=>function(o,n){return!o||!n?null:u.jsx(Yg,{props:o,renderers:t},o.key)},db=(t,e,o)=>function(r,s){return!r||!s?null:u.jsx(tb,{onClick:o,metadata:t,color:e,...r})};function fb(t,e){const o=t?.iconName;return o?{...e,column:{...e.column,iconName:o}}:e}const mb=l.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r}){const s=_e(e,o),i=oa(s,r);return u.jsx("div",{style:{textAlign:n},children:i})}),Zi=l.memo(function({item:e,column:o,textAlign:n="right",numberFormat:r,color:s,magnitude:i=0}){const a=we(),c=l.useMemo(()=>s||a.rect().fill().hex(),[a,s]),f=_e(e,o),p=oa(f,r),g=jt(o),{width:b,height:d}=g,h=l.useMemo(()=>a.text().fill().hex(),[a]),m=i*b;return u.jsx("div",{style:{textAlign:n},children:u.jsxs("svg",{width:b,height:d,children:[u.jsx("rect",{width:m,height:d,x:b-m,fill:c}),u.jsx("text",{fill:h,y:d/2+1,x:b-2,dominantBaseline:"middle",textAnchor:"end",children:p})]})})}),Xi=l.memo(function({item:e,column:o,textAlign:n="left"}){const r=_e(e,o)||{};return u.jsx("div",{style:{textAlign:n},children:r.toString()})}),pb=20,hb=15,gb=l.memo(function(e){const{item:o,column:n,index:r}=e,s=_e(o,n)||[],i=n?.currentWidth||0,a=Vi(s),c=Object.keys(a).length,f=Fg(a);return u.jsxs(an,{children:[u.jsx(G,{condition:s.length<=3,children:u.jsx(So,{...e})}),u.jsx(G,{condition:s.length<=hb,children:u.jsx(Ji,{rowIndex:r||0,...e})}),u.jsx(G,{condition:c<=pb&&!f,children:u.jsx(qi,{...e,categories:a})}),u.jsx(G,{condition:s.length<=i,children:u.jsx(Qi,{...e})}),u.jsx(G,{condition:s.length>i,children:u.jsx(ea,{...e})}),u.jsx($n,{children:u.jsx(So,{...e})})]})}),bb=l.memo(function(e){const{metadata:o,item:n,column:r,onColumnClick:s}=e,i=o?.type,a=_e(n,r),c=xb(a,o,i);return u.jsx(Yi,{onClick:s,column:r,children:u.jsxs(an,{children:[u.jsx(G,{condition:Jo(a),children:u.jsx(Qo,{textAlign:i===R.Number?"right":"left"})}),u.jsx(G,{condition:i===R.String,children:u.jsx(er,{...e})}),u.jsx(G,{condition:i===R.Boolean,children:u.jsx(Wi,{...e})}),u.jsx(G,{condition:i===R.Number,children:u.jsx(Zi,{...e,magnitude:c})}),u.jsx(G,{condition:i===R.Date,children:u.jsx(Xo,{...e})}),u.jsx(G,{condition:i===R.Array,children:u.jsx(gb,{...e})}),u.jsx($n,{children:u.jsx(Xi,{...e})})]})})});function xb(t,e,o){return l.useMemo(()=>{if(o!==R.Number||sn(t))return 0;const n=(e?.stats?.max||1)-(e?.stats?.min||0);return n===0?0:(t-(e?.stats?.min||0))/n},[o,t,e])}const Qi=l.memo(function({item:e,column:o}){const n=_e(e,o)||[],r=jt(o);return u.jsx(Zo,{data:n,width:r.width,height:r.height})}),ea=l.memo(function({item:e,column:o,color:n}){const r=_e(e,o)||[],s=jt(o);return u.jsx(Ug,{data:r,width:s.width,height:s.height,color:n})});var $e;(function(t){t.Type="type",t.Count="count",t.Distinct="distinct",t.Invalid="invalid",t.Mode="mode",t.Min="min",t.Max="max",t.Mean="mean",t.Median="median",t.Stdev="stdev"})($e||($e={}));const ta={distinct:"unique",invalid:"empty"},na=14,vb=[$e.Min,$e.Max,$e.Distinct,$e.Invalid],yb=l.memo(function({metadata:e,stats:o=vb,column:n,onClick:r}){const s=we(),i=l.useMemo(()=>{const f=e.stats||{};return o.map(p=>{const g=f[p];return u.jsx(Cb,{name:p,value:g},`${n.key}-${p}`)})},[e,n,o]),a=wb(e.stats),c=l.useMemo(()=>({height:o.length*na,fontWeight:"normal",fontSize:10,color:s.application().midHighContrast().hex(),cursor:r?"pointer":"inherit"}),[r,s,o]);return u.jsx("div",{onClick:f=>r&&r(f,n,e),title:a,style:c,children:i})}),Cb=({name:t,value:e})=>e!==void 0?u.jsxs("div",{style:{height:na,display:"flex",justifyContent:"space-between",paddingLeft:4,paddingRight:4,lineHeight:1},children:[u.jsxs("div",{style:{textTransform:"capitalize"},children:[ta[t]||t,":"]}),u.jsx("div",{style:{maxWidth:"100%",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"},children:Rn(e)})]}):null;function wb(t){return l.useMemo(()=>{const{bins:e,categories:o,...n}=t||{};return Object.entries(n).reduce((r,s,i)=>{const[a,c]=s,f=xo(ta[a]||a);return r+(i>0?`
`:"")+`${f}: ${Rn(c)}`},"")},[t])}const _b=l.memo(function({striped:e,columnBorders:o,styles:n,...r}){const s=we(),{itemIndex:i,compact:a}=r,c=l.useMemo(()=>e&&i%2===0?{root:{width:"100%",background:s.application().faint().hex()},cell:{borderRight:o?`1px solid ${s.application().background().hex(.5)}`:"1px solid transparent",padding:"unset"},...n}:{root:{width:"100%",borderBottom:`1px solid ${s.application().faint().hex()}`},cell:{padding:"unset",borderRight:o?`1px solid ${s.application().faint().hex(.5)}`:"1px solid transparent",borderTop:i===0?`1px solid ${s.application().faint().hex()}`:"none",borderBottom:a?`1px solid ${s.application().faint().hex()}`:"none"},...n},[s,e,o,n,i,a]);return u.jsx(Fl,{...r,styles:c})}),er=l.memo(function({item:e,column:o,textAlign:n="left"}){const r=_e(e,o);return u.jsx("div",{style:{textAlign:n},children:r.toString()})}),Sb=100,kb=40,Tb=10;function Db(t){return l.useMemo(()=>{const e=Math.max(...t?.map(s=>+s()?.props.styles.root.width)||[0]),o=Math.max(...t?.map(s=>s()?.props.items.length)||[0])*kb,n=Math.max(o,e);return Math.max(Sb,n+Tb)},[t])}function Ib(t,e,o,n,r,s={}){const{features:i={},sortColumn:a,sortDirection:c,selectedColumn:f,onColumnClick:p,onCellDropdownSelect:g,includeAllColumns:b=!1,isColumnClickable:d=!1,isDefaultHeaderClickable:h=!1,showColumnBorders:m=!1,compact:x=!1,isResizable:v=!0}=s,y=Ng(d,p),_=Pg(d,g),S=Ab(e),M=Mb(d,m),P=Ag(t,o,b,n),O=Db(i.commandBar);return l.useMemo(()=>{const j=jb(o);return P.map(K=>{const U=j[K]||{key:K,name:K,minWidth:O,fieldName:K},{iconName:re,...se}=U,Z=e?.columns[K],pe=Z&&Z.type===R.Number?S():void 0,ce=i.smartCells&&Z?sb(Z,pe,y,_):ib(i,Z,pe,y,_),ee=[lb(U,h,r)];return i.commandBar&&ee.push(cb(i.commandBar)),(i.smartHeaders||i.statsColumnHeaders)&&Z&&ee.push(ub(Z,i.onStatsColumnHeaderClick,i.statsColumnTypes)),(i.smartHeaders||i.histogramColumnHeaders)&&Z&&ee.push(db(Z,pe,i.onHistogramColumnHeaderClick)),{onRender:ce,onRenderHeader:ab(ee),onColumnClick:p,isSorted:!!(c&&U.fieldName===a),isSortedDescending:c===Ce.Descending,styles:M,...se,data:{selected:U.key===f,compact:x,...U.data},isResizable:v}})},[o,P,i,a,c,f,p,y,M,x,v,e,S,_,h,r,O])}function jb(t){return(t||[]).reduce((e,o)=>(e[o.name]=o,e),{})}function Mb(t,e){const o=we();return l.useMemo(()=>({sortIcon:{display:"none"},cursor:t?"pointer":"inherit",cellTitle:{borderRight:e?`1px solid ${o.application().faint().hex(.6)}`:"1px solid transparent"},cellTooltip:{display:"initial",position:"relative"}}),[o,t,e])}function Ob(){return l.useCallback((t,e)=>{if(!t||!e)return null;const o={styles:{root:{paddingTop:1},cellSizer:{height:"1.5rem"}},...t};return e(o)},[])}function Nb(t,e,o,n,r){const s=we(),i=l.useMemo(()=>e?.smartHeaders||e?.histogramColumnHeaders||e?.statsColumnHeaders,[e]);return l.useMemo(()=>Mn({},{headerWrapper:{position:t?"sticky":"inherit",zIndex:"2",top:"0",background:s.application().background().hex(),borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`,selectors:{".ms-DetailsHeader":{lineHeight:r&&!i?"normal":"42px",height:"auto",borderBottom:i?"unset":`1px solid ${s.application().faint().hex()}`},".ms-DetailsHeader-cell":{cursor:n?"pointer":"default",height:"auto",padding:"unset"}}}},o),[s,i,o,t,n,r])}function oa(t,e){return l.useMemo(()=>sn(t)?"":e?Ao(e)(t):t.toString(),[t,e])}function Pb(t,e,o,n=!0){return l.useCallback((r,s)=>{if(!r||!s)return null;const i=t.groups().names[r.groupLevel],a=i?e?.columns[i]:void 0;return o?o(a,i,r):u.jsx(xp,{props:r,columnName:i,lazyLoadGroups:n})},[o,t,n,e?.columns])}function Ab(t){const e=we(),o=l.useMemo(()=>Eb(t),[t]),n=l.useMemo(()=>e.scales().nominal(o),[e,o]);return l.useMemo(()=>{let r=0;return()=>n(r++).hex()},[n])}function Eb(t){return t?Object.values(t.columns).reduce((e,o)=>e+(o.type===R.Number?1:0),0):1}function Fb(t,e,o){return l.useMemo(()=>e===0&&o===1/0?t:t.slice(e,e+o),[t,o,e])}function Bb(t,e,o=Ce.Ascending,n){return l.useMemo(()=>{if(!t.isGrouped())return;const r=t.groups().names[0];return e&&e!==r?n:o===Ce.Ascending?n?.sort():n?.sort().reverse()},[e,n,o,t])}function $b(t,e,o){return l.useMemo(()=>{let n=[];const r=t.columnNames().includes(e||"");return o?(!e||!o)&&!t.isGrouped()||!r?t.unorder():(e&&n.push(e),t.isGrouped()&&(n=[...t.groups().names,...n]),t.orderby(o===Ce.Descending?n.map(s=>As(s)):n)):t},[t,e,o])}function Rb(t,e){const[o,n]=l.useState(),[r,s]=l.useState(),i=l.useCallback((a,c)=>{t&&((c?.isSorted||!r)&&s(r===Ce.Ascending?Ce.Descending:r===Ce.Descending?void 0:Ce.Ascending),n(c?.fieldName)),e&&e(a,c)},[t,e,n,s,r]);return{sortColumn:o,sortDirection:r,handleColumnHeaderClick:i}}function Lb(t=!1,e=!1){return l.useCallback(o=>o?u.jsx(_b,{...o,striped:t,columnBorders:e}):null,[t,e])}function Hb(t,e){return l.useMemo(()=>{if(e&&e.length>0){const o=t.columnNames(),n=e.filter(r=>o.includes(r));return t.select(n)}return t},[t,e])}function Vb(t,e,o=!1,n){return l.useMemo(()=>{if(e)return e;if(o){const r=Bl(t,o);return n&&n(r,t),r}},[t,e,o,n])}const Wb=l.memo(function({table:e,features:o={},metadata:n,offset:r=0,limit:s=1/0,includeAllColumns:i=!0,visibleColumns:a,isSortable:c=!1,isStriped:f=!1,isColumnClickable:p=!1,showColumnBorders:g=!1,selectedColumn:b,onColumnClick:d,onCellDropdownSelect:h,onRenderGroupHeader:m,onChangeMetadata:x,selectionMode:v=Ll.none,layoutMode:y=Hl.fixedColumns,columns:_,onColumnHeaderClick:S,styles:M,isHeadersFixed:P=!1,compact:O=!1,isResizable:j=!0,...K}){const[U,re]=l.useState(0),{sortColumn:se,sortDirection:Z,handleColumnHeaderClick:pe}=Rb(c,S),ce=Hb(e,a),ee=$b(ce,se,Z),de=Fb(ee,r,s),te=l.useMemo(()=>de.objects(),[de]),X=l.useMemo(()=>e.isGrouped()?de.objects({grouped:"entries"}):void 0,[de,e]),he=Bb(e,se,Z,X),ge=Vb(e,n,Kb(o),x),He=l.useMemo(()=>c||p||!!S,[c,p,S]),lt=l.useCallback((N,E)=>{const w=()=>re(ie=>ie+1);N.currentWidth!==E&&Bg(w)},[re]),Te=Ib(e,ge,_,a,pe,{features:o,sortColumn:se,sortDirection:Z,selectedColumn:b,onColumnClick:d,onCellDropdownSelect:h,isDefaultHeaderClickable:He,includeAllColumns:i,isColumnClickable:p,showColumnBorders:g,compact:O,isResizable:j}),Oe=Nb(P,o,M,!!d,O),Qe=Lb(f,g),Ve=Ob(),ut=Pb(e,ge,m,o.lazyLoadGroups),D=l.useMemo(()=>{if(!de.isGrouped())return;const N=de.groups(),E=N.names.length;return he?.map(w=>$i(w,N,0,E,te,Z,o.lazyLoadGroups,se))},[de,he,te,se,Z,o]);return l.useEffect(()=>{re(N=>N+1)},[_,e,O]),u.jsx(Ub,{"data-is-scrollable":"true",children:u.jsx($l,{items:[...te],selectionMode:v,layoutMode:y,groups:D,getKey:(N,E)=>E.toString(),groupProps:{onRenderHeader:ut},columns:Te,constrainMode:Rl.unconstrained,onRenderRow:Qe,onRenderDetailsHeader:Ve,onColumnResize:lt,compact:O,...K,listProps:{version:U},styles:Oe})})}),Ub=C.div`
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
`;function Kb(t){return Object.values(t||{}).some(e=>e===!0)}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const zb=36;function Gb(t,e){const o=we();return l.useMemo(()=>({background:e||o.application().accent().hex(),foreground:t||o.application().background().hex()}),[o,e,t])}function qb(t,e){return l.useMemo(()=>{const o=t.numCols(),n=e?e.length:o,r=o-n;return{total:o,visible:n,hidden:r}},[t,e])}function Yb(t){return l.useMemo(()=>{const e=t.totalRows(),o=t.numRows(),n=e-o;return{total:e,visible:o,hidden:n}},[t])}const Jb=l.memo(function({onSend:e,onChange:o,editedName:n,name:r}){const s=l.useCallback(i=>{if(i.key==="Enter")return e(n);i.key==="Escape"&&e(r)},[e,r,n]);return u.jsx(Zb,{target:"#editName",directionalHint:An.topCenter,onDismiss:()=>e(r),children:u.jsx(xe,{value:n,onKeyDown:s,onChange:o,underlined:!0})})}),Zb=C(Vl)`
	width: 320;
	max-width: 90%;
	padding: 10px;
`,Xb=l.memo(function({onRenameTable:e,name:o,color:n}){const[r,s]=l.useState(!1),[i,a]=l.useState(o||"");l.useEffect(()=>{a(o)},[o,a]);const c=l.useCallback((p,g)=>{a(g)},[a]),f=l.useCallback(p=>{const g=p||o;e&&e(g),s(!1),a(g)},[e,s,a,o]);return u.jsx(Xr,{children:u.jsxs(Zt,{condition:!!e,children:[u.jsx(Xt,{children:u.jsxs(Xr,{children:[u.jsx(Qb,{color:n,id:"editName",title:"Edit",onClick:()=>s(!0),children:o}),u.jsx(Zt,{condition:r,children:u.jsx(Xt,{children:u.jsx(Jb,{onSend:f,editedName:i,onChange:c,name:o})})})]})}),u.jsx(Ns,{children:u.jsx(Zt,{condition:o,children:u.jsx(Xt,{children:u.jsx(ra,{color:n,children:o})})})})]})})}),ra=C.h3`
	font-weight: normal;
	font-size: 0.8em;
	margin-right: 8px;
	color: ${({theme:t,color:e})=>e||t.application().background().hex()};
`,Qb=C(ra)`
	cursor: pointer;
	border-bottom: 1px dotted
		${({theme:t})=>t.application().background().hex()};
`,Xr=C.div``,ex=l.memo(function({table:e,name:o,showRowCount:n=!0,showColumnCount:r=!0,commandBar:s,farCommandBar:i,visibleColumns:a,onRenameTable:c,bgColor:f,color:p}){const{background:g,foreground:b}=Gb(p,f),d=l.useMemo(()=>e.isGrouped()?e.groups().size:0,[e]),h=qb(e,a),m=Yb(e);return u.jsxs(tx,{bgColor:g,color:b,children:[u.jsx(nx,{children:s}),u.jsxs(ox,{children:[o?u.jsx(Xb,{onRenameTable:c,name:o,color:b}):null,n===!0?u.jsx(ao,{children:`${m.visible} row${m.visible!==1?"s":""}${m.hidden>0?` (${m.hidden} filtered)`:""}`}):null,r===!0?u.jsx(ao,{children:`${h.visible} col${h.visible!==1?"s":""}${h.hidden>0?` (${h.hidden} hidden)`:""}`}):null,d?u.jsxs(ao,{children:[d," groups"]}):null]}),u.jsx(rx,{children:i})]})}),tx=C.div`
	height: ${zb}px;
	width: 100%;
	background-color: ${({bgColor:t})=>t};
	color: ${({color:t})=>t};
	position: relative;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: space-between;
`,ao=C.h3`
	font-weight: normal;
	font-size: 0.8em;
`,nx=C.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
`,ox=C.div`
	flex: 2;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 8px;
`,rx=C.div`
	flex: 1;
	display: flex;
	justify-content: flex-end;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function sa(t,e){const o=Object.entries(t).find(n=>n[1]===e);return o&&o[0]}function sx(t,e){return l.useCallback(()=>{t&&e&&e(t)},[e,t])}function ix(t,e,o){const n=l.useMemo(()=>t?fa(t):null,[t]);return l.useMemo(()=>{if(n){let s=n;return e||(s=ma()(s)),o||(s=pa()(s)),s}},[n,e,o])}function ax(t,e="input",o){const[n,r]=l.useState(),s=Hi();l.useEffect(()=>{t&&r(t)},[t,r]);const i=l.useCallback(async(a,c)=>{const f=t?.input??e,p=t?.output??e,g=Go(c.key,f,p);g.args=await s(g,o?.columnNames()||[]),r(g)},[r,t,s,e,o]);return{internal:n,handleVerbChange:i,setInternal:r}}const lx=l.memo(function({table:e,step:o,onTransformRequested:n,hideInputColumn:r,hideOutputColumn:s,verbs:i,headerText:a,nextInputTable:c,onDismiss:f,...p}){const{internal:g,setInternal:b,handleVerbChange:d}=ax(o,c,e),h=ix(g,r,s),m=sx(g,n),x=l.useMemo(()=>(i||mg(y=>y!==B.Aggregate&&y!==B.Rollup)).map(y=>({key:y,text:sa(B,y)})),[i]);return u.jsxs(Ho,{onDismiss:f,onDismissed:()=>b(void 0),...p,children:[u.jsxs(ux,{children:[u.jsx(cx,{children:a}),f&&u.jsx(le,{iconProps:fx.cancel,ariaLabel:"Close popup modal",onClick:()=>f()})]}),u.jsxs(dx,{children:[u.jsx(Xe,{placeholder:"Choose transform",options:x,defaultSelectedKey:g?.verb||"",onChange:d}),h&&g?u.jsxs(u.Fragment,{children:[u.jsx(h,{step:g,table:e,onChange:b}),u.jsx(Eo,{onClick:m,children:"Run"})]}):null]})]})}),ux=C.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
`,cx=C.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,dx=C.div`
	padding: 12px;
`,fx={cancel:{iconName:"Cancel"}};function mx(t){return l.useCallback(e=>t[e]||"",[t])}function px(t){return l.useCallback(e=>{if(!e.includes(window.location.origin))return window.open(e,"_blank");const o=e.split(`${window.location.origin}/`).pop()?.replace("/",".").replace(/.md/,"");o&&t(n=>[...n,o])},[t])}function hx(t){return l.useCallback(()=>{t(e=>e.slice(0,-1))},[t])}function gx(t,e){return l.useCallback(()=>{e([t])},[e,t])}const bx=l.memo(function({name:e="",index:o}){const n=l.useRef(null),r=mx(o),[s,i]=l.useState([e]);e!==s[0]&&i([e]);const a=px(i),c=gx(e,i),f=hx(i),p=l.useCallback(m=>{const x=/(?<=##.*?\n)([\s\S]*)/g;return m.replace(x,'<div className="details">$1</div>')},[]),g=l.useMemo(()=>{const m=r(s[s.length-1]||"");return p(m)},[s,r,p]);l.useEffect(()=>{n?.current&&n.current.querySelectorAll("a").forEach(x=>{x.addEventListener("click",v=>{v.preventDefault(),a(v.target.href)})})},[a,s,n]);const b=l.useCallback(m=>{const x=m.target.nodeName==="H2"?m.target:m.target.closest("h2");x.classList.contains("active")?x.classList.remove("active"):x.classList.add("active")},[]),h={overrides:{h2:{component:l.useCallback(({children:m,...x})=>u.jsxs("h2",{...x,children:[m,u.jsx(le,{onClick:b,"aria-label":"Emoji",iconProps:{iconName:"AddTo"}})]}),[b])}}};return u.jsxs(xx,{ref:n,children:[u.jsxs(vx,{children:[s.length>2?u.jsx(Qr,{onClick:f,iconProps:{iconName:"Back"},"aria-label":"Emoji"}):null,s.length>1?u.jsx(Qr,{onClick:c,iconProps:{iconName:"Home"},"aria-label":"Emoji"}):null]}),u.jsx(dp,{options:h,children:g})]})}),xx=C.div`
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
`,Qr=C(le)`
	font-size: 2.5rem;
`,vx=C.div`
	position: absolute;
	top: 0;
	right: 0;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */class yx{get isLoading(){return this._isLoading}start(){this._isLoading=!0}stop(){this._isLoading=!1}constructor(){this._isLoading=!1}}const es={};function Cx(t){const e=es[t];if(!e){const o=new yx;return es[t]=o,o}return e}var ko;(function(t){t.Tables="tables",t.Steps="steps",t.Preview="preview"})(ko||(ko={}));const wx=l.memo(function({toggle:e,onConfirm:o,show:n,title:r,subText:s}){const i=l.useMemo(()=>({type:ot.normal,title:r,subText:s}),[r,s]);return ze(ri,{dialogContentProps:i,hidden:!n,onDismiss:e,children:Sn(oi,{children:[ze(Eo,{onClick:o,text:"Yes"}),ze(Ln,{onClick:e,text:"No"})]})})});var xt;(function(t){t.Table="table",t.Column="column"})(xt||(xt={}));function _x(t,e,o,n){const[r,s]=l.useState(),[i,a]=l.useState(),[c,{setTrue:f,setFalse:p}]=nn(!1),g=l.useCallback(()=>{p(),s(void 0),a(void 0)},[s,a,p]),b=kx(s,a,f),d=l.useCallback(_=>{n&&n(_,i),g()},[n,g,i]),h=Sx(t,e,o,n),m=l.useMemo(()=>`button-${Math.round(Math.random()*3)}`,[]),[x,v]=l.useState(m);l.useEffect(()=>{v(i!==void 0?`.step-card-${i}`:`#${m}`)},[m,i]);const y=l.useCallback(()=>{f()},[f]);return{step:r,onDuplicateClicked:h,onDismissTransformModal:g,onEditClicked:b,onCreate:d,isTransformModalOpen:c,onStartNewStep:y,addStepButtonId:m,editorTarget:x}}function Sx(t,e,o,n){const r=Li(e),s=Hi();return l.useCallback(async i=>{const a=t===xt.Table?r(i.output):i.output,c=e?await e.table(i.output):o,f=await s(i,c?.columnNames()??[]),p={...i,args:f,input:i.output,output:a};n&&n(p)},[n,r,s,t,e,o])}function kx(t,e,o){return l.useCallback((n,r)=>{t(n),e(r),o()},[t,o,e])}const Tx=l.memo(function({onDelete:e,onSave:o,onSelect:n,store:r,steps:s,type:i=xt.Table,table:a,...c}){const{onDeleteClicked:f,toggleDeleteModalOpen:p,isDeleteModalOpen:g,onConfirmDelete:b}=Ig(e),{step:d,onDuplicateClicked:h,onEditClicked:m,onCreate:x,onDismissTransformModal:v,onStartNewStep:y,isTransformModalOpen:_,addStepButtonId:S,editorTarget:M}=_x(i,r,a,o);return u.jsxs(Dx,{children:[u.jsx(uC,{onDeleteClicked:f,onSelect:n,onEditClicked:m,steps:s,onDuplicateClicked:h,onStartNewStep:y,buttonId:S}),u.jsxs("div",{children:[i===xt.Table&&_&&u.jsx(S0,{target:M,step:d,onTransformRequested:x,isOpen:_,store:r,onDismiss:v,styles:{calloutMain:{overflow:"hidden"}},...c}),i===xt.Column&&a&&u.jsx(lx,{step:d,table:a,onTransformRequested:x,isOpen:_,onDismiss:v,...c}),e&&u.jsx(wx,{toggle:p,title:"Are you sure you want to delete this step?",subText:i===xt.Table?"You will also lose any table transformations made after this step.":"",show:g,onConfirm:b})]})]})}),Dx=C.div`
	width: 97%;
	display: grid;
`,ke=l.memo(function(e){const o=Ix(e.enumeration,e.labels);return u.jsx(Xe,{options:o,styles:fp,...e})});function Ix(t,e){return l.useMemo(()=>Object.entries(t).map(n=>{const[r,s]=n,i=e&&e[s]||jx(r);return{key:s,text:i}}),[t,e])}function jx(t){const e=t.replace(/([A-Z])/g," $1").trim().split(/\s/),o=e[0],n=e.slice(1).map(r=>r.toLocaleLowerCase());return[o,...n].join(" ")}const Mx=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=ae(i,"args.groupby",r),f=ae(i,"args.operation",r);return u.jsxs(Ox,{children:[u.jsx(L,{children:u.jsx(Ie,{required:!0,table:a,label:"Column to group by",selectedKey:i.args.groupby,onChange:c})}),u.jsx(L,{children:u.jsx(ke,{required:!0,enumeration:rn,label:"Function",selectedKey:i.args.operation,onChange:f})})]})}),Ox=C.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,Nx=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"group by",value:r.groupby},{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.jsx(J,{...e,rows:o})}),Px=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=ae(n,"args.strategy",o),s=bt(n,"args.fixedcount",o),i=bt(n,"args.fixedwidth",o),a=bt(n,"args.min",o),c=bt(n,"args.max",o),f=wg(n,"args.clamped",o);return u.jsxs(Ax,{children:[u.jsxs(Zr,{children:[u.jsx(ke,{required:!0,enumeration:Le,label:"Bin strategy",selectedKey:n.args.strategy,onChange:r,styles:pt}),u.jsxs(an,{children:[u.jsx(G,{condition:n.args.strategy===Le.FixedCount,children:u.jsx(ht,{label:"Bin count",labelPosition:gt.top,min:1,max:100,step:1,value:n.args.fixedcount?`${n.args.fixedcount}`:void 0,styles:pt,onChange:s},"spin-count")}),u.jsx(G,{condition:n.args.strategy===Le.FixedWidth,children:u.jsx(ht,{label:"Bin size",labelPosition:gt.top,value:n.args.fixedwidth?`${n.args.fixedwidth}`:void 0,styles:pt,onChange:i},"spin-size")})]})]}),u.jsx(Zt,{condition:n.args.strategy!==Le.Auto,children:u.jsxs(Xt,{children:[u.jsxs(Zr,{children:[u.jsx(ht,{label:"Min boundary",labelPosition:gt.top,value:n.args.min?`${n.args.min}`:void 0,styles:pt,onChange:a}),u.jsx(ht,{label:"Max boundary",labelPosition:gt.top,value:n.args.max?`${n.args.max}`:void 0,styles:pt,onChange:c})]}),u.jsx(L,{children:u.jsx(ys,{label:"Clamp to min/max",checked:n.args.clamped,onChange:f})})]})})]})}),Ax=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,Ex=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column,sub:[{before:"using",value:r.strategy,after:"strategy",sub:r.strategy&&r.strategy!==Le.Auto&&r.strategy?[{value:r.strategy===Le.FixedCount?r.fixedcount:r.fixedwidth,after:r.strategy===Le.FixedCount?"bins":"bin width"},{before:"min",value:r.min},{before:"max",value:r.max},{value:r.clamped?"clamped":"not clamped"}]:void 0}]}]},[e]);return u.jsx(J,{...e,rows:o})}),Fx=l.memo(function({options:e,selectedKeys:o,onSelectAllOrNone:n,...r}){const s=l.useMemo(()=>{const c=(o||[]).reduce((p,g)=>(p[g]=!0,p),{});return[...e.map(p=>{const g=!!c[p.key];return{...p,selected:g}}),{key:"--divider--",text:"-",itemType:1,selected:!1},{key:"--actions--",text:"",itemType:2,data:!0,selected:!1}]},[e,o]),i=l.useCallback(c=>{n&&n(c?e:[])},[e,n]),a=l.useCallback(c=>c?.data?u.jsxs(Bx,{children:[u.jsx(ts,{onClick:()=>i(!0),children:"All"}),u.jsx($x,{children:"|"}),u.jsx(ts,{onClick:()=>i(!1),children:"None"})]}):u.jsx("span",{children:c?.text}),[i]);return u.jsx(Xe,{required:!0,multiSelect:!0,options:s,selectedKeys:o,styles:oe,onRenderOption:a,...r})}),Bx=C.div`
	display: flex;
	justify-content: space-around;
`,ts=C.a`
	cursor: pointer;
`,$x=C.div`
	margin-left: 4px;
	margin-right: 4px;
	color: ${({theme:t})=>t.application().lowContrast().hex()};
`,Vt=l.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i}){const a=me(s||e.input,n,o),c=l.useMemo(()=>e,[e]),f=l.useCallback((b,d)=>{const{columns:h=[]}=c.args;let m=[...h];d&&(d.selected?m.push(d.key):m=m.filter(x=>x!==d.key)),r&&r({...c,args:{...c.args,columns:m}})},[c,r]),p=l.useCallback(b=>{r&&r({...c,args:{...c.args,columns:b.map(d=>d.key)}})},[r,c]),g=l.useMemo(()=>a?.columnNames().map(b=>({key:b,text:b}))||[],[a]);return u.jsx(Rx,{children:a?u.jsx(Fx,{required:!0,label:i||"Columns",placeholder:"Select columns",options:g,selectedKeys:c.args.columns,onChange:f,onSelectAllOrNone:p}):null})}),Rx=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;function Lx(t){return l.useMemo(()=>{const{operator:e}=t;return e===Fe.IsEmpty||e===Fe.IsNotEmpty||e===Be.IsEmpty||e===Be.IsNotEmpty||e===Re.IsTrue||e===Re.IsFalse||e===Re.IsEmpty||e===Re.IsNotEmpty},[t])}function Hx(t){return l.useMemo(()=>{switch(t){case R.String:return"text or column";case R.Number:return"number or column";case R.Boolean:return"boolean or column"}},[t])}function Vx(t,e){const o=l.useMemo(()=>t?Fo(t):{},[t]),n=l.useMemo(()=>o[e],[o,e]),r=l.useMemo(()=>s=>o[s]===n,[o,n]);return{type:n,columnFilter:r}}const Wx=l.memo(function({table:e,column:o,criterion:n,onChange:r,suppressLabels:s=!1}){const i=l.useCallback((h,m)=>{r&&r({...n,operator:m?.key})},[n,r]),a=l.useCallback((h,m,x,v)=>{const y={...n,type:m?en.Column:en.Value,value:m?m.key:v};r&&r(y)},[n,r]),{type:c,columnFilter:f}=Vx(e,o),p=l.useMemo(()=>{const h={required:!s,label:s?void 0:"Function",selectedKey:n.operator,onChange:i,styles:zx};if(o){if(c===R.String)return u.jsx(ke,{enumeration:Be,...h});if(c===R.Boolean)return u.jsx(ke,{enumeration:Re,...h})}const m={"=":"=","!=":"!=","<":"<","<=":"<=",">":">",">=":">="};return u.jsx(ke,{enumeration:Fe,...h,labels:m})},[c,o,n,i,s]),g=Lx(n),b=l.useCallback(()=>r&&r(),[r]),d=Hx(c);return u.jsxs(Ux,{children:[u.jsxs(Kx,{children:[p,u.jsx(hp,{required:!s,table:e,filter:f,disabled:g,label:s?void 0:"Comparison value",placeholder:d,text:n.value?`${n.value}`:void 0,onChange:a,styles:pt}),u.jsx(le,{title:"Remove this criterion",iconProps:{iconName:"Delete"},onClick:b})]}),c===R.String?u.jsx(Og,{children:"String comparisons are not case-sensitive"}):null]})}),Ux=C.div`
	display: flex;
	flex-direction: column;
`,Kx=C.div`
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
`,zx={root:{...pt.root,marginRight:12}};function Gx(t,e,o,n){const r={...t};at(r,e,o),n&&n(r)}function tr(t,e,o){return l.useCallback((n,r)=>Gx(t,e,r?.key,o),[t,e,o])}const ia=l.memo(function({step:e,store:o,table:n,onChange:r,input:s,label:i="join"}){const a=l.useMemo(()=>e,[e]),c=me(s||a.input,n,o),f=me(a.args.other,n,o),p=qx(a),g=Yx(a),b=tr(a,"args.other",r),d=Jx(a,r),h=Zx(a,r);return u.jsxs(Xx,{children:[u.jsx(L,{children:u.jsx(qo,{store:o,label:`${xo(i)} table`,selectedKey:a.args.other,onChange:b})}),u.jsx(L,{children:u.jsx(Ie,{table:c,required:!0,label:`Input ${i} key`,selectedKey:p,onChange:d})}),u.jsx(L,{children:u.jsx(Ie,{table:f,label:`${xo(i)} table key`,selectedKey:g,onChange:h})})]})});function qx(t){return l.useMemo(()=>t.args.on&&t.args.on.length>0?t.args.on[0]:void 0,[t])}function Yx(t){return l.useMemo(()=>t.args.on&&t.args.on.length>1?t.args.on[1]:void 0,[t])}function Jx(t,e){return l.useCallback((o,n)=>{const r=t.args.on||[];r[0]=n.key,e&&e({...t,args:{...t.args,on:r}})},[t,e])}function Zx(t,e){return l.useCallback((o,n)=>{const r=t.args.on;r&&(r[1]=n.key),e&&e({...t,args:{...t.args,on:r}})},[t,e])}const Xx=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
`,aa=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=l.useCallback(()=>{r&&r({...i,args:{...i.args,criteria:[...i.args.criteria||[],{}]}})},[i,r]),f=l.useCallback((b,d)=>{const h=[...i.args.criteria];b===void 0?h.splice(d,1):h[d]=b,r&&r({...i,args:{...i.args,criteria:h}})},[i,r]),p=ae(i,"args.logical",r),g=Qx(a,i.args.column,i.args.criteria,f);return u.jsxs(ev,{children:[g,u.jsx(Lt,{onClick:c,iconProps:{iconName:"Add"},disabled:!a,children:"Add criteria"}),i.args.criteria.length>1?u.jsx(L,{children:u.jsx(ke,{label:"Logical combination",enumeration:Ue,labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},selectedKey:i.args.logical,onChange:p})}):null]})});function Qx(t,e,o,n){return t?o.map((r,s)=>{const i=a=>n(a,s);return u.jsx(tv,{index:s,children:u.jsx(Wx,{table:t,column:e,criterion:r,onChange:i,suppressLabels:s>0})},`filter-function-${s}`)}):null}const ev=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,tv=C.div`
	display: flex;
	flex-direction: column;
	margin-top: ${({index:t})=>t>0?6:0}px;
`,nv=l.memo(function(e){return u.jsx(aa,{...e})}),ov=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r?.column,after:"row value",sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===en.Column?"row value":""}))}]},[e]);return u.jsx(J,{...e,rows:o})}),rv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=l.useCallback((b,d)=>{const{columns:h=[]}=i.args;let m=[...h];d&&(d.selected?m.push(d.key):m=m.filter(x=>x!==d.key)),r&&r({...i,args:{...i.args,columns:m}})},[i,r]),f=tr(i,"args.operator",r),p=l.useMemo(()=>{const b=a?.columnNames()||[],d=(i.args.columns||[]).reduce((h,m)=>(h[m]=!0,h),{});return b.map(h=>{const m=i.args?.columns&&!!d[h];return{key:h,text:h,selected:m}})},[a,i]),g=l.useMemo(()=>p.filter(b=>b.selected).map(b=>b.key),[p]);return u.jsxs(sv,{children:[u.jsx(L,{children:a?u.jsx(Xe,{label:"Columns",styles:oe,multiSelect:!0,options:p,selectedKeys:g,onChange:c}):null}),u.jsx(L,{children:u.jsx(ke,{required:!0,label:"Logical operator",labels:{or:"OR",and:"AND",nor:"NOR",nand:"NAND",xor:"XOR"},enumeration:Ue,selectedKey:i.args.operator,onChange:f})})]})}),sv=C.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,iv=9;function Me(t,e,o,n){let r=iv-o;n.showInput&&r--,n.showOutput&&r--;const s=t.map(e),i=s.slice(0,r),a=s.length-i.length;return a>0&&i.splice(r-1,2,{before:`+${a+1} more...`,value:"",title:s.slice(r-1).map(c=>[c.before,c.value,c.after].join(" ")).join(`
`)}),i}const av=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns||[],i=>({value:i}),3,e);return[{before:`combine column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"using operator",value:r.operator}]},[e]);return u.jsx(J,{...e,rows:o})}),pn=l.memo(function(e){return u.jsx(Vt,{...e})}),hn=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns||[],i=>({value:i}),1,e);return[{before:`with column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s}]},[e]);return u.jsx(J,{...e,rows:o})});function lv(t,e){if(t!==void 0&&e!==void 0)return(t?Fo(t):{})[e]}const uv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),[c,f]=l.useState(),p=ae(i,"args.type",r),g=je(i,"args.radix",r),b=l.useCallback((d,h,m,x)=>{const v=Ht(e);at(v,"args.formatPattern",h?h.key:x),r&&r(v)},[e,r]);return l.useEffect(()=>{f(!1),i.args.columns.forEach(d=>{lv(a,d)===R.Date&&f(!0)})},[i.args.columns,a]),u.jsxs(cv,{children:[u.jsx(Ge,{children:u.jsx(Vt,{label:"Columns to convert",step:e,store:o,onChange:r})}),u.jsx(Ge,{children:u.jsx(ke,{required:!0,label:"Data type",enumeration:Ke,selectedKey:i.args.type,onChange:p})}),i.args.type===Ke.Integer?u.jsx(Ge,{children:u.jsx(xe,{label:"Base (radix)",value:i.args.radix?`${i.args.radix}`:"",styles:oe,onChange:g})}):null,c||i.args.type===Ke.Date?u.jsx(Ge,{children:u.jsx(bp,{required:i.args.type===Ke.Date,label:"Date format pattern",placeholder:"pattern",text:i.args.formatPattern?`${i.args.formatPattern}`:void 0,onChange:b,styles:oe})}):null]})}),cv=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,dv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns,i=>({value:i}),3,e);return[{before:`convert column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"to type",value:r.type,sub:r.type===Ke.Integer?[{before:"with base",value:r.radix}]:void 0}]},[e]);return u.jsx(J,{...e,rows:o})}),fv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||e.input,n,o),c=ae(i,"args.column1",r),f=ae(i,"args.column2",r),p=ae(i,"args.operator",r);return u.jsxs(mv,{children:[u.jsx(L,{children:u.jsx(Ie,{table:a,required:!0,label:"Column one",selectedKey:i.args.column1,onChange:c})}),u.jsx(L,{children:u.jsx(ke,{required:!0,enumeration:Jt,label:"Operation",selectedKey:i.args.operator,onChange:p})}),u.jsx(L,{children:u.jsx(Ie,{table:a,required:!0,label:"Column two",selectedKey:i.args.column2,onChange:f})})]})}),mv=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,pv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{value:`${r.column1||""} ${r.operator||""} ${r.column2||""}`}]},[e]);return u.jsx(J,{...e,rows:o})}),hv=l.memo(function({step:e,store:o,onChange:n}){const r=l.useMemo(()=>e,[e]),s=je(r,"args.value",n);return u.jsxs(gv,{children:[u.jsx(Ge,{children:u.jsx(Vt,{label:"Columns to erase",step:e,store:o,onChange:n})}),u.jsx(Ge,{children:u.jsx(xe,{required:!0,label:"Value to be erased",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:oe,onChange:s})})]})}),gv=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,bv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns,i=>({value:i}),3,e);return[{before:`erase column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.jsx(J,{...e,rows:o})}),xv=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=je(n,"args.url",o),s=je(n,"args.delimiter",o),i=bt(n,"args.autoMax",o);return u.jsxs(vv,{children:[u.jsx(L,{children:u.jsx(xe,{required:!0,label:"URL",value:n.args.url&&`${n.args.url}`,placeholder:"URL to public dataset",styles:oe,onChange:r})}),u.jsx(L,{children:u.jsx(xe,{label:"Delimiter",value:n.args.delimiter&&`${n.args.delimiter}`,placeholder:"Column delimiter",styles:oe,onChange:s})}),u.jsx(L,{children:u.jsx(ht,{label:"Automax",labelPosition:gt.top,min:0,max:1e7,step:1,value:n.args.autoMax?`${n.args.autoMax}`:void 0,styles:oe,onChange:i},"Automax")})]})}),vv=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,yv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"url",value:r.url},{before:"with delimiter",value:r.delimiter}]},[e]);return u.jsx(J,{...e,rows:o})}),Cv=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=je(n,"args.value",o);return u.jsx(wv,{children:u.jsx(L,{children:u.jsx(xe,{required:!0,label:"Fill value",value:n.args.value&&`${n.args.value}`,placeholder:"text, number, or boolean",styles:oe,onChange:r})})})}),wv=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,_v=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with value",value:r.value}]},[e]);return u.jsx(J,{...e,rows:o})}),Sv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"where",value:r.column,sub:(n.args.criteria||[]).map(s=>({value:`${s.operator||""} ${s.value||""}`,after:s.type===en.Column?"row value":""}))}]},[e]);return u.jsx(J,{...e,rows:o})}),kv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=je(i,"args.to[0]",r),c=je(i,"args.to[1]",r);return u.jsxs(Tv,{children:[u.jsx(L,{children:u.jsx(Vt,{step:e,store:o,table:n,onChange:r,input:s})}),u.jsx(L,{children:u.jsx(xe,{required:!0,label:"Key name to use",placeholder:"Key name to use",value:i.args.to!==void 0?i.args.to[0]:"",styles:oe,onChange:a})}),u.jsx(L,{children:u.jsx(xe,{required:!0,label:"Value name to use",placeholder:"Value name to use",value:i.args.to!==void 0?i.args.to[1]:"",styles:oe,onChange:c})})]})}),Tv=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,Dv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns||[],i=>({value:i}),3,e);return[{before:`column${(r.columns||[]).length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"into key column",value:r.to!==void 0?r.to[0]:""},{before:"into value column",value:r.to!==void 0?r.to[1]:""}]},[e]);return u.jsx(J,{...e,rows:o})}),Iv=l.memo(function({step:e,store:o,onChange:n}){const r=l.useMemo(()=>e,[e]),s=je(r,"args.value",n);return u.jsxs(jv,{children:[u.jsx(Ge,{children:u.jsx(Vt,{label:"Columns to impute",step:e,store:o,onChange:n})}),u.jsx(Ge,{children:u.jsx(xe,{required:!0,label:"Fill value",value:r.args.value&&`${r.args.value}`,placeholder:"text, number, or boolean",styles:oe,onChange:s})})]})}),jv=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,Mv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns,i=>({value:i}),3,e);return[{before:`impute column${r.columns?.length!==1?"s":""}`,value:r.columns.length===0?void 0:"",sub:s},{before:"with value",value:r.value}]},[e]);return u.jsx(J,{...e,rows:o})}),Ov=l.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.useMemo(()=>e,[e]),i=ae(s,"args.strategy",r);return u.jsxs(Nv,{children:[u.jsx(ia,{step:e,store:o,table:n,onChange:r}),u.jsx(Ge,{children:u.jsx(ke,{required:!0,label:"Join strategy",enumeration:nt,selectedKey:s.args.strategy||nt.Inner,styles:oe,onChange:i})})]})}),Nv=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,Pv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"with",value:r.other},{before:"on",value:r.on?.join(" | ")}]},[e]);return u.jsx(J,{...e,rows:o})}),Av=l.memo(function({step:e,store:o,table:n,onChange:r}){const s=l.useMemo(()=>e,[e]);return u.jsxs(Ev,{children:[u.jsx(ia,{label:"lookup",step:e,store:o,table:n,onChange:r}),u.jsx(Ge,{children:u.jsx(Vt,{label:"Columns to copy",step:e,store:o,onChange:r,input:s.args.other})})]})}),Ev=C.div`
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	align-content: flex-start;
	flex-direction: column;
`,Fv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns,i=>({value:i}),3,e);return[{before:"lookup from",value:r.other},{before:"on",value:r.on?.join(" | ")},{before:"copy columns",value:r.columns.length===0?void 0:"",sub:s}]},[e]);return u.jsx(J,{...e,rows:o})}),Bv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=l.useCallback((d,h)=>{const{columns:m=[]}=i.args;let x=[...m];h&&(h.selected?x.push(h.key):x=x.filter(v=>v!==h.key)),r&&r({...i,args:{...i.args,columns:x}})},[i,r]),f=tr(i,"args.strategy",r),p=je(i,"args.delimiter",r),g=l.useMemo(()=>{const d=a?.columnNames()||[],h=(i.args.columns||[]).reduce((m,x)=>(m[x]=!0,m),{});return d.map(m=>{const x=i.args?.columns&&!!h[m];return{key:m,text:m,selected:x}})},[a,i]),b=l.useMemo(()=>g.filter(d=>d.selected).map(d=>d.key),[g]);return u.jsxs($v,{children:[u.jsx(L,{children:a?u.jsx(Xe,{label:"Columns",styles:oe,multiSelect:!0,options:g,selectedKeys:b,onChange:c}):null}),u.jsx(L,{children:u.jsx(ke,{required:!0,label:"Merge strategy",enumeration:Et,selectedKey:i.args.strategy,onChange:f})}),i.args.strategy===Et.Concat?u.jsx(L,{children:u.jsx(xe,{label:"Delimiter",placeholder:"Text delimiter",value:i.args.delimiter&&`${i.args.delimiter}`,styles:oe,onChange:p})}):null]})}),$v=C.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
`,Rv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.columns||[],i=>({value:i}),1,e);return[{before:`column${r.columns?.length!==1?"s":""}`,value:r.columns?.length===0?void 0:"",sub:s},{before:"with strategy",value:r.strategy}]},[e]);return u.jsx(J,{...e,rows:o})}),ns=l.memo(function(){return null}),os=l.memo(function(e){const o=l.useMemo(()=>[],[]);return u.jsx(J,{...e,rows:o})}),Lv=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=je(n,"args.prefix",o);return u.jsx(Hv,{children:u.jsx(L,{children:u.jsx(xe,{label:"Prefix",value:n.args.prefix&&`${n.args.prefix}`,styles:oe,onChange:r})})})}),Hv=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,Vv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:"with prefix",value:r.prefix}]},[e]);return u.jsx(J,{...e,rows:o})}),Wv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||e.input,n,o),c=Kv(i,a,r),f=l.useCallback(()=>{r&&r({...i,args:{...i.args,orders:[...i.args.orders||[],Uv(a)]}})},[i,a,r]);return u.jsxs(zv,{children:[c,u.jsx(Lt,{onClick:f,iconProps:{iconName:"Add"},disabled:!a,children:"Add sort"})]})});function Uv(t){const e=t?.columnNames()[0],o=Ce.Ascending;return{column:e,direction:o}}function Kv(t,e,o){return l.useMemo(()=>(t.args.orders||[]).map((n,r)=>{const s=a=>{const c={...t};at(c,`args.orders[${r}]`,a),o&&o(c)},i=()=>{const a={...t};a.args.orders.splice(r,1),o&&o(a)};return u.jsx(pg,{table:e,order:n,onChange:s,onDelete:i},`orderby-${n.column}-${r}`)}),[t,e,o])}const zv=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,Gv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.orders||[],i=>({value:i.column,after:i.direction}),1,e);return[{before:"order",value:r.orders?.length===0?void 0:"",sub:s}]},[e]);return u.jsx(J,{...e,rows:o})}),qv=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=ae(i,"args.key",r),f=ae(i,"args.value",r),p=ae(i,"args.operation",r);return u.jsxs(Yv,{children:[u.jsx(L,{children:u.jsx(Ie,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.jsx(L,{children:u.jsx(Ie,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:f})}),u.jsx(L,{children:u.jsx(ke,{required:!0,enumeration:rn,label:"Function",selectedKey:i.args.operation,onChange:p})})]})}),Yv=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,Jv=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.jsx(J,{...e,rows:o})});function Zv(t,e){return l.useMemo(()=>{const{column:o}=t.args;if(!e||!o)return[];const n={[o]:De.array_agg_distinct(o)};return e.orderby(o).rollup(n).get(o,0)},[e,t])}function Xv(t,e){return l.useCallback((o,n,r)=>{const s={...t.args.map};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,map:s}})},[t,e])}function Qv(t,e){return l.useCallback(o=>{const n={...t.args};delete n.map[o],e&&e({...t,args:{...t.args,...n}})},[t,e])}function ey(t,e){return e.find(o=>t.args.map?t.args.map[o]===void 0:!0)}function ty(t,e,o){return l.useCallback(()=>{const n=ey(t,e);n!==void 0&&o&&o({...t,args:{...t.args,map:{...t.args.map,[n]:n}}})},[t,e,o])}function ny(t,e){return e.length===0||!t.args.column?!0:e.length===Object.keys(t.args.map||{}).length}const oy=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||e.input,n,o),c=Zv(i,a),f=kg(a,i.args.column),p=Xv(i,r),g=Qv(i,r),b=ty(i,c,r),d=ry(a,i,c,f,p,g),h=ny(i,c);return u.jsxs(sy,{children:[d,u.jsx(Lt,{onClick:b,iconProps:{iconName:"Add"},disabled:h,children:"Add mapping"})]})});function ry(t,e,o,n,r,s){return l.useMemo(()=>{const{map:i}=e.args;return Object.entries(i||{}).map((a,c)=>{const[f,p]=a,g=gr(f,n),b=x=>x===g?!0:!(e.args.map&&e.args.map[x]),d=(x,v)=>r(g,v?.key||g,p),h=(x,v)=>{const y=gr(v,n);r(g,g,y)},m=()=>s(g);return u.jsxs(iy,{children:[u.jsx(gp,{column:e.args.column,table:t,values:o,filter:b,label:void 0,selectedKey:g,onChange:d,styles:{root:{width:130}}}),u.jsx(qe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.jsx(xe,{placeholder:"New value",value:p,onChange:h,styles:{root:{width:130}}}),u.jsx(le,{title:"Remove this Recode",iconProps:{iconName:"Delete"},onClick:m})]},`column-Recode-${g}-${c}`)})},[t,e,o,n,r,s])}const sy=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,iy=C.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,ay=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.map||{}),i=Me(s,a=>({value:`${a[0]} -> ${a[1]}`}),2,e);return[{before:"from column",value:r.column},{before:"values",value:s.length===0?void 0:"",sub:i}]},[e]);return u.jsx(J,{...e,rows:o})});function ly(t,e){return l.useCallback((o,n,r)=>{const s={...t.args.columns};delete s[o],s[n]=r,e&&e({...t,args:{...t.args,columns:s}})},[t,e])}function uy(t,e){return e?.columnNames().find(o=>t.args.columns?!t.args.columns[o]:!0)}function cy(t,e,o){return l.useCallback(()=>{const n=uy(t,e);n&&o&&o({...t,args:{...t.args,columns:{...t.args.columns,[n]:n}}})},[t,e,o])}function dy(t,e){return e?e.columnNames().length===Object.keys(t.args.columns||{}).length:!0}const fy=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||e.input,n,o),c=ly(i,r),f=_g(i,r),p=cy(i,a,r),g=my(a,i,c,f),b=dy(i,a);return u.jsxs(py,{children:[u.jsx(En,{children:"Column renames"}),g,u.jsx(Lt,{onClick:p,iconProps:{iconName:"Add"},disabled:b,children:"Add rename"})]})});function my(t,e,o,n){return l.useMemo(()=>{const{columns:r}=e.args;return Object.entries(r||{}).map((s,i)=>{const[a,c]=s,f=d=>d===a?!0:!(e.args.columns&&e.args.columns[d]),p=(d,h)=>o(a,h?.key||a,c),g=(d,h)=>{o(a,a,h??"")},b=()=>n(a);return u.jsxs(hy,{children:[u.jsx(Ie,{table:t,filter:f,label:void 0,selectedKey:a,onChange:p,styles:{root:{width:130}}}),u.jsx(qe,{iconName:"Forward",styles:{root:{marginLeft:4,marginRight:4}}}),u.jsx(xe,{placeholder:"New name",value:c,onChange:g,styles:{root:{width:130}}}),u.jsx(le,{title:"Remove this rename",iconProps:{iconName:"Delete"},onClick:b})]},`column-rename-${a}-${i}`)})},[t,e,o,n])}const py=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,hy=C.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`,gy=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Object.entries(r.columns||{}),i=Me(s,a=>({value:`${a[0]} -> ${a[1]}`}),1,e);return[{before:"columns",value:s.length===0?void 0:"",sub:i}]},[e]);return u.jsx(J,{...e,rows:o})}),by=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=ae(n,"args.operation",o);return u.jsx(xy,{children:u.jsx(L,{children:u.jsx(ke,{required:!0,enumeration:rn,label:"Function",selectedKey:n.args.operation,onChange:r})})})}),xy=C.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,vy=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"rollup column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.jsx(J,{...e,rows:o})}),yy=Ao("d"),Cy=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=bt(n,"args.size",o),s=bt(n,"args.proportion",o,i=>i&&+i/100);return u.jsx(wy,{children:u.jsxs(L,{children:[u.jsx(ht,{label:"Number of rows",labelPosition:gt.top,min:0,step:1,disabled:!!n.args.proportion,value:n.args.size?`${n.args.size}`:"",styles:rs,onChange:r}),u.jsx(_y,{children:"or"}),u.jsx(ht,{label:"Row percentage",labelPosition:gt.top,min:0,max:100,step:1,disabled:!!n.args.size,value:n.args.proportion?`${yy(n.args.proportion*100)}`:"",styles:rs,onChange:s})]})})}),wy=C.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`,_y=C.div`
	margin-left: 8px;
	margin-right: 8px;
	height: 100%;
	display: flex;
	align-items: center;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,rs={root:{width:120}},Sy=Ao(".0%"),ky=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"random",value:r.size||Sy(r.proportion||0),after:r.size?r.size===1?"row":"rows":" of rows"}]},[e]);return u.jsx(J,{...e,rows:o})}),gn=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=Ty(i,o,r),f=l.useCallback(()=>{r&&r({...i,args:{...i.args,others:[...i.args.others,""]}})},[i,r]);return u.jsxs(Dy,{children:[u.jsx(En,{children:"With tables"}),c,u.jsx(Lt,{onClick:f,iconProps:{iconName:"Add"},disabled:!a,children:"Add table"})]})});function Ty(t,e,o){return l.useMemo(()=>t.args.others.map((n,r)=>{const s=()=>{const i={...t};i.args.others.splice(r,1),o&&o(i)};return e?u.jsxs(L,{children:[u.jsx(qo,{label:"",store:e,selectedKey:n,onChange:(i,a)=>{const c={...t};a&&(c.args.others[r]=`${a.key}`),o&&o(c)}}),u.jsx(le,{title:"Remove this table",iconProps:{iconName:"Delete"},onClick:s})]},`set-op-${n}-${r}`):null}),[t,e,o])}const Dy=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`,bn=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n,s=Me(r.others,i=>({value:i}),1,e);return[{before:"with",value:r.others.length>0?"":null,sub:s}]},[e]);return u.jsx(J,{...e,rows:o})}),Iy=l.memo(function({column:e,onChange:o,onDelete:n}){const r=l.useCallback((i,a)=>{o&&o(a)},[o]),s=l.useCallback(()=>n&&n(),[n]);return u.jsxs(jy,{children:[u.jsx(xe,{value:e,onChange:r,styles:oe}),u.jsx(le,{title:"Remove this column",iconProps:{iconName:"Delete"},onClick:s})]})}),jy=C.div`
	display: flex;
	justify-content: flex-start;
`,My=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||e.input,n,o),c=Ny(i,r),f=l.useCallback(()=>{r&&r({...i,args:{...i.args,to:[...i.args.to,Oy(i.args.to)]}})},[i,r]),p=ae(e,"args.column",r);return u.jsxs(Py,{children:[u.jsx(Ie,{required:!0,table:a,label:"Column to spread",selectedKey:e.args.column,onChange:p}),u.jsx(En,{children:"New column names"}),c,u.jsx(Lt,{onClick:f,iconProps:{iconName:"Add"},disabled:!a,children:"Add column"})]})});function Oy(t){return`New column (${t.length})`}function Ny(t,e){return l.useMemo(()=>(t.args.to||[]).map((o,n)=>{const r=i=>{const a={...t};at(a,`args.to[${n}]`,i),e&&e(a)},s=()=>{const i={...t};i.args.to.splice(n,1),e&&e(i)};return u.jsx(Iy,{column:o,onChange:r,onDelete:s},`column-list-${n}`)}),[t,e])}const Py=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 12px;
`,Ay=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column",value:r.column},{before:`as column${(r.to||[]).length!==1?"s":""}`,value:r.to?r.to.join(", "):null}]},[e]);return u.jsx(J,{...e,rows:o})}),Ey=l.memo(function({step:e,store:o,table:n,onChange:r,input:s}){const i=l.useMemo(()=>e,[e]),a=me(s||i.input,n,o),c=ae(i,"args.key",r),f=ae(i,"args.value",r);return u.jsxs(Fy,{children:[u.jsx(L,{children:u.jsx(Ie,{required:!0,table:a,label:"Column used as key",selectedKey:i.args.key,onChange:c})}),u.jsx(L,{children:u.jsx(Ie,{required:!0,table:a,label:"Column used as value",selectedKey:i.args.value,onChange:f})})]})}),Fy=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,By=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"column to use as key",value:r.key},{before:"column to use as value",value:r.value}]},[e]);return u.jsx(J,{...e,rows:o})}),$y=l.memo(function({step:e,onChange:o}){const n=l.useMemo(()=>e,[e]),r=ae(n,"args.operation",o);return u.jsx(Ry,{children:u.jsx(L,{children:u.jsx(ke,{required:!0,label:"Function",enumeration:Ps,selectedKey:n.args.operation,onChange:r})})})}),Ry=C.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
`,Ly=l.memo(function(e){const o=l.useMemo(()=>{const n=e.step,{args:r}=n;return[{before:"window column",value:r.column,sub:[{before:"with function",value:r.operation}]}]},[e]);return u.jsx(J,{...e,rows:o})}),Hy={aggregate:Nx,bin:Ex,binarize:ov,boolean:av,concat:bn,convert:dv,dedupe:hn,derive:pv,difference:bn,erase:bv,fetch:yv,fill:_v,filter:Sv,fold:Dv,groupby:hn,impute:Mv,intersect:bn,join:Pv,lookup:Fv,merge:Rv,onehot:Vv,orderby:Gv,pivot:Jv,recode:ay,rename:gy,rollup:vy,sample:ky,select:hn,spread:Ay,unfold:By,ungroup:os,union:bn,unorder:os,unroll:hn,window:Ly};function Vy(t){const e=Hy[t.verb];if(!e)throw new Error(`could not find step with verb ${t?.verb}`);return e}function Wy(t,e,o,n,r,s){return l.useMemo(()=>{const i=[];return s&&i.push({iconProps:xn.preview,onClick:()=>s(t?.output),title:"Preview table"}),o&&i.push({iconProps:xn.edit,onClick:()=>o(t,e),title:"Edit step"}),r&&i.push({iconProps:xn.duplicate,onClick:()=>r(t),title:"Duplicate step"}),n&&i.push({iconProps:xn.delete,onClick:()=>n&&n(e),title:"Delete step"}),i},[t,e,o,n,r,s])}const xn={preview:{iconName:"View"},edit:{iconName:"Edit"},duplicate:{iconName:"DuplicateRow"},delete:{iconName:"Delete"}},Uy=l.memo(function({step:e,index:o,onEdit:n,onDelete:r,onDuplicate:s,onSelect:i}){const a=l.useMemo(()=>Vy(e),[e]),c=Wy(e,o,n,r,s,i);return u.jsxs(zy,{styles:ss.card,children:[u.jsx(Ky,{children:u.jsx(a,{step:e,showInput:!0,showOutput:!0,showOutputColumn:!0})}),u.jsx(Td,{className:`step-card-${o}`,styles:ss.actions,actions:c})]})}),ss={card:{root:{minWidth:"unset"}},actions:{root:{padding:"unset"}}},Ky=C.div`
	padding: 8px;
`,zy=C(vd)`
	min-width: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`,la=l.memo(function(e){const{defaultMenuItemRenderer:o,items:n}=e,r=l.useMemo(()=>n.map(s=>Mn({},s,{itemProps:is,sectionProps:s.sectionProps?{items:s.sectionProps.items.map(i=>Mn({},i,{itemProps:is}))}:void 0})),[n]);return u.jsx(Gy,{children:r.map(s=>{const{key:i}=s;return u.jsxs(qy,{children:[u.jsx(Yy,{children:s.sectionProps?.title}),s.itemType===Ft.Section?u.jsx(u.Fragment,{children:s.sectionProps?.items.map(a=>o(a))}):o(s)]},`menu-group-${i}`)})})}),is={styles:{root:{paddingLeft:8,height:28,lineHeight:28},item:{listStyleType:"none"}}},Gy=C.div`
	display: flex;
	padding: 8px 0 8px 0;
	gap: 12px;
`,qy=C.div`
	min-width: 120px;
`,Yy=C.div`
	padding: 0 12px 0 12px;
	margin-bottom: 8px;
	font-weight: bold;
	color: ${({theme:t})=>t.application().accent().hex()};
`,ua=l.memo(function(e){const{onRenderMenuList:o}=e,n=l.useCallback(s=>o?o(s):u.jsx(la,{...s}),[o]),r=l.useMemo(()=>({...e,onRenderMenuList:n}),[e,n]);return u.jsx(Ln,{styles:mp,text:e.text,menuProps:r})});function Jy(t,e){const o=l.useCallback(()=>{e(t)},[t,e]),n=Zy(t,e);return{onClear:o,onEscape:o,onChange:n}}function Zy(t,e){return l.useCallback((o,n)=>{const r=[];t.forEach(s=>{if(s.itemType===Ft.Normal)as(s,n)&&r.push(s);else if(s.itemType===Ft.Section){const i=s.sectionProps?.items.filter(a=>as(a,n))||[];r.push({...s,sectionProps:{...s.sectionProps,items:i}})}else r.push(s)}),e(r)},[t,e])}function as(t,e){const o=t.text?t.text.toLowerCase():"",n=e&&e.toLowerCase()||"";return o.indexOf(n)!==-1}const Xy={root:{margin:"8px"}},Qy=l.memo(function({items:e,onSearch:o}){const n=Jy(e,o);return u.jsx(Ad,{ariaLabel:"Find a verb by text",placeholder:"Find a verb",styles:Xy,...n})}),eC=[{label:"Aggregates",verbs:["aggregate","groupby","ungroup","pivot","orderby","unorder","rollup","unroll","window"]},{label:"Transform column",verbs:["bin","binarize","convert","erase","fill","impute","recode"]},{label:"Combine columns",verbs:["boolean","derive","fold","unfold","onehot","merge","spread"]},{label:"Filter & Select",verbs:["fetch","filter","rename","sample","select"]},{label:"Joins & Sets",verbs:["concat","dedupe","difference","intersect","join","lookup","union"]}];function tC(){return l.useMemo(()=>eC.map(t=>({key:`__section-${t.label}__`,itemType:Ft.Section,sectionProps:{title:t.label,items:t.verbs.map(e=>{const o=Object.entries(B).find(n=>n[1]===e);return{key:o[1],text:o[0]}})}})),[])}function nC(){const t=tC(),[e,o]=l.useState(t),n=l.useCallback(s=>o(s),[o]),r=l.useCallback(()=>o(t),[t]);return{items:t,filtered:e,onSearch:n,onSearchReset:r}}function oC(t,e,o,n){const[r,s]=l.useState(t);l.useEffect(()=>{t&&s(t)},[t]);const i=l.useCallback(()=>{r&&e&&e(r)},[r,e]),a=l.useCallback((f,p)=>{s(p.key),!o&&e&&e(p.key)},[o,e,s]);return{text:rC(r,n),onButtonClick:i,onItemClick:a}}function rC(t,e){return l.useMemo(()=>sa(B,t)||e,[t,e])}const sC=l.memo(function({onCreate:e,showButton:o,verb:n,placeholder:r="Choose a verb"}){const{text:s,onButtonClick:i,onItemClick:a}=oC(n,e,o,r),{items:c,filtered:f,onSearch:p,onSearchReset:g}=nC(),b=l.useCallback(h=>u.jsxs(u.Fragment,{children:[u.jsx(aC,{children:u.jsx(Qy,{items:c,onSearch:p})}),u.jsx(la,{...h})]}),[p,c]),d={items:f,onRenderMenuList:b,onItemClick:a,onDismiss:g};return u.jsxs(iC,{children:[u.jsx(ua,{text:s,...d}),o&&u.jsx(le,{iconProps:{iconName:"Add"},onClick:i})]})}),iC=C.div`
	width: 240px;
	display: flex;
	align-items: center;
`,aC=C.div`
	border-bottom: 1px solid
		${({theme:t})=>t.application().lowContrast().hex()};
`,nr=l.memo(function({text:e,style:o}){return u.jsx(lC,{style:o,children:e})}),lC=C.div`
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,uC=l.memo(function({steps:e,onDeleteClicked:o,onEditClicked:n,onDuplicateClicked:r,onSelect:s,onStartNewStep:i,buttonId:a}){const c=l.useRef(null);return l.useEffect(()=>{(()=>{c?.current?.scrollIntoView(!1)})()},[e]),u.jsxs(fC,{children:[e?.map((f,p)=>u.jsx(Uy,{onDelete:o,onEdit:n,onDuplicate:r,onSelect:s,step:f,index:p},p)),i&&u.jsxs(mC,{ref:c,children:[u.jsx(Ln,{styles:cC,iconProps:dC.add,onClick:i,id:a,children:"Add step"}),!e?.length&&u.jsx(nr,{text:"Add your first preparation step"})]})]})}),cC={root:{padding:"0 4px 0 6px",whiteSpace:"nowrap"}},dC={add:{iconName:"Add"}},fC=C.div`
	display: flex;
	overflow: auto;
	column-gap: 12px;
`,mC=C.div`
	display: flex;
	align-items: center;
	gap: 18px;
`;function pC(t,e,o,n){const r=ls(t),s=ls(e),i=l.useMemo(()=>[{key:"__input-tables__",itemType:Ft.Section,sectionProps:{title:"Inputs",items:r.sort()}},{key:"__derived-tables__",itemType:Ft.Section,sectionProps:{title:"Derived",items:s}}],[r,s]),a=l.useCallback((f,p)=>n&&n(p.key),[n]);return{text:l.useMemo(()=>o||"Choose table",[o]),items:i,onItemClick:a}}function hC(t,e){const o=l.useMemo(()=>{if(t&&t.length>0)return t[t.length-1].id},[t]);return{onClick:l.useCallback(()=>{o&&e&&e(o)},[o,e])}}function ls(t){return l.useMemo(()=>t.map(e=>({key:e.id,text:e.name||e.id})),[t])}const gC=C.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	gap: 18px;
`,bC={root:{padding:"0 4px 0 6px"}},xC=l.memo(function({inputs:e,derived:o,onSelect:n,selected:r,loading:s}){const{onClick:i}=hC(o,n),a=pC(e,o,r,n);return u.jsxs(gC,{children:[u.jsx(ua,{...a}),s&&u.jsx(Wl,{size:Ul.xSmall}),o.length>0?u.jsx(Ln,{styles:bC,iconProps:vC,onClick:i,children:"View output table"}):null,!r&&u.jsx(nr,{text:"Select an input or derived table to preview"})]})}),vC={iconName:"View"};function yC(t,e){return l.useCallback(async o=>{const n=t.list();o.forEach(s=>{n.includes(s.id)||t.set({id:s.id,table:s?.table})});const r=await t.toMap();e(r)},[t,e])}function CC(t,e){return l.useCallback(o=>{let n=[...e||[]];n=n.slice(0,o),t(n)},[e,t])}function wC(t,e){return l.useCallback((o,n)=>{if(n!==void 0){const r=[...e||[]];r[n]=o,t(r)}else{const r=[...e||[],o];t(r)}},[e,t])}function _C(t,e,o){return l.useCallback(async n=>{const r=await e.get(o);r.metadata=n,e.delete(r.id),e.set(r);const s=await e.toMap();t(s)},[e,o,t])}function SC(t,e,o){return l.useCallback(async()=>{if(t.steps.length){const r=await t.run();o&&o(r.id)}const n=await t.store.toMap();e&&e(n)},[t,e,o])}function kC(t){const[e,o]=l.useState(t??{});return{changeTableFeatures:l.useCallback(r=>{const s=r;o({...e,[s]:!e[s]})},[e,o]),tableFeatures:e}}function TC(t,e,o,n){const[r,s]=l.useState(),[i,a]=l.useState(new Map),c=Tg(),f=Dg(c),p=SC(f,a,s),g=yC(c,a),{isLoading:b}=Cx(ko.Tables),d=l.useMemo(()=>{const S=new Set;return o?.forEach(M=>S.add(M.output)),Array.from(S).map(M=>({id:M}))},[o]),h=l.useMemo(()=>i.get(r??"")?.table,[r,i]),m=l.useMemo(()=>i.get(r??"")?.metadata,[i,r]),x=l.useMemo(()=>{if(r)return r;if(d&&d.length>0){const S=d[d.length-1];if(S)return S.id}return t[0]?.id||""},[t,r,d]);l.useEffect(()=>{if(t.length){g(t);const S=t[t.length-1];s(S?.id)}},[t,g,s]),l.useEffect(()=>{if(x&&n){const S=i.get(x);S&&n(S)}},[i,x,n]),l.useEffect(()=>{i.size>0&&(o?.filter(S=>!f.steps?.includes(S)).length||o?.length!==f.steps.length)&&(f.clear(),o&&f.addAll(o),p())},[o,f,p,i]);const v=wC(e,o),y=CC(e,o),_=_C(a,c,r);return{selectedTable:h,setSelectedTableName:s,onDeleteStep:y,onSaveStep:v,store:c,selectedMetadata:m,lastTableName:x,selectedTableName:r,derived:d,onUpdateMetadata:_,tablesLoading:b}}const DC=l.memo(function({tables:e,onUpdateSteps:o,steps:n,outputHeaderCommandBar:r,onOutputTable:s,stepsPosition:i="bottom"}){const[a,{toggle:c}]=nn(!1),{selectedTable:f,selectedTableName:p,setSelectedTableName:g,onDeleteStep:b,onSaveStep:d,store:h,lastTableName:m,derived:x,selectedMetadata:v,onUpdateMetadata:y,tablesLoading:_}=TC(e,o,n,s);return u.jsxs(IC,{children:[u.jsxs(jC,{children:[u.jsx(lo,{children:"Tables"}),u.jsx(xC,{loading:_,inputs:e,derived:x,selected:p,onSelect:g})]}),u.jsxs(OC,{stepsPosition:i,isCollapsed:a,className:"steps",children:[u.jsxs(lo,{isCollapsed:a,onClick:c,children:["Steps ",u.jsx(qe,{iconName:"ChevronDown"})]}),u.jsx(NC,{children:u.jsx(Tx,{nextInputTable:m,onDelete:b,onSave:d,onSelect:g,store:h,steps:n})})]}),u.jsxs(MC,{stepsPosition:i,isCollapsed:a,children:[u.jsx(lo,{children:"Preview"}),u.jsx(AC,{onChangeMetadata:y,headerCommandBar:r,table:f,metadata:v,name:p})]})]})}),rt=18,To=60,ca=280,da=50,lo=C.span`
	margin: 0 ${rt}px 0 ${rt}px;
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
`,IC=C.div`
	display: flex;
	flex-flow: column;
	height: 100%;
	width: 100%;
	padding: ${rt}px 0 ${rt}px 0;
	gap: ${rt}px;
	position: relative;
`,jC=C.div`
	display: flex;
	min-height: ${To}px;
	flex: 0 1 ${To}px;
	padding-right: ${rt}px;
	order: 1;
`,MC=C.div`
	flex: 1 1 auto;
	display: flex;
	padding-right: ${rt}px;
	max-height: ${({isCollapsed:t})=>`calc(100% - ${To+(t?da:ca)+rt*2}px)`};
	order: ${({stepsPosition:t})=>t==="bottom"?2:3};
`,OC=C.div`
	display: flex;
	min-height: ${({isCollapsed:t})=>t?"unset":ca+"px"};
	background-color: ${({theme:t})=>t.application().faint().hex()};
	padding: 0;
	order: ${({stepsPosition:t})=>t==="bottom"?3:2};
	height: ${({isCollapsed:t})=>t?da+"px":"auto"};
	overflow: ${({isCollapsed:t})=>t?"hidden":"auto hidden"};
	> div {
		display: ${({isCollapsed:t})=>t?"none":"grid"};
	}
`,NC=C.div`
	display: flex;
	height: 100%;
	width: 100%;
	align-items: center;
`,PC=[$e.Type,$e.Min,$e.Max,$e.Distinct,$e.Invalid],AC=l.memo(function({table:e,headerCommandBar:o,name:n,metadata:r,onChangeMetadata:s}){const{tableFeatures:i}=kC();return u.jsx(u.Fragment,{children:e?u.jsxs(EC,{children:[u.jsx(ex,{name:n,table:e}),u.jsx(Wb,{isSortable:!0,compact:!0,showColumnBorders:!0,isHeadersFixed:!0,metadata:r,onChangeMetadata:s,features:{...i,statsColumnTypes:PC,commandBar:o||void 0},table:e})]}):u.jsx(FC,{children:u.jsx(nr,{text:"(No table selected)"})})})}),EC=C.div`
	overflow: auto;
	display: flex;
	flex-direction: column;
	height: 100%;
	border: 1px solid ${({theme:t})=>t.application().faint().hex()};
`,FC=C.div`
	display: flex;
	height: 100%;
	align-items: center;
`,BC={aggregate:Mx,bin:Px,binarize:nv,boolean:rv,concat:gn,convert:uv,dedupe:pn,derive:fv,difference:gn,erase:hv,fetch:xv,fill:Cv,filter:aa,fold:kv,groupby:pn,intersect:gn,impute:Iv,join:Ov,lookup:Av,merge:Bv,onehot:Lv,orderby:Wv,pivot:qv,recode:oy,rename:fy,rollup:by,sample:Cy,select:pn,spread:My,unfold:Ey,ungroup:ns,union:gn,unorder:ns,unroll:pn,window:$y};function fa(t){const e=BC[t.verb];if(!e)throw new Error(`verb ${t.verb} not found`);return e}const $C=`# binarize

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
`,RC=`# aggregate

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
`,LC=`# bin

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
`,HC=`# dedupe

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
`,VC=`# boolean

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
`,WC=`# difference

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
`,UC=`# convert

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
`,KC=`# derive

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
`,zC=`# filter

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
| 354  | 300  |`,GC=`# concat

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
`,qC=`# fill

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
`,YC=`# intersect

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
`,JC=`# impute

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
`,ZC=`# groupby

Groups table rows using keys from a specified column list. Note that this is an underlying index on a table that isn't necessarily visible, but will apply when performing operations that are sensitive to grouping. See [rollup](./rollup.md) for examples of \`groupby\`.
`,XC=`# fold

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
`,QC=`# join

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
`,e0=`# fetch

Executes an asynchronous resource request to a specified URL. Currently only HTTP GET is supported, with no additional headers.
`,t0=`# lookup

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
`,n0=`# merge

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
`,o0=`# orderby

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
`,r0=`# pivot

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
`,s0=`# rename

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
`,i0=`# rollup

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
`,a0=`# sample

Extracts a random sample of rows from a table. Sampling can be specified using either a fixed row number or a percentage of total rows. If the input table is grouped, stratified sampling is performed.
`,l0=`# onehot

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
| lamp  | 1    | 0     | 0    |`,u0=`# select

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
`,c0=`# unfold

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
`,d0=`# spread

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
`,f0=`# erase

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
`,m0=`# ungroup

Removes any [grouping](./groupby.md) that has been applied to a table.
`,p0=`# union

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
`,h0=`# recode

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
`,g0=`# unorder

Removes any [ordering](./orderby.md) that has been applied to a table, reverting to its original state.
`,b0=`# window

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
`,x0=`# chain

Executes a series of verbs. This is essentially the core engine of the project. Chains can be included within parent chains, so the execution proceeds recursively. By default, each chain execution creates its own table store context so that it does not pollute the parent context with intermediate tables. The end of the chain returns the final output table. Specifying the \`nofork\` option will pass the parent context recursively, allowing for collection of all intermediate tables.
`,v0=`# unroll

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
`,$={};$.binarize=$C;$.aggregate=RC;$.bin=LC;$.dedupe=HC;$.boolean=VC;$.difference=WC;$.convert=UC;$.derive=KC;$.filter=zC;$.concat=GC;$.fill=qC;$.intersect=YC;$.impute=JC;$.groupby=ZC;$.fold=XC;$.join=QC;$.fetch=e0;$.lookup=t0;$.merge=n0;$.orderby=o0;$.pivot=r0;$.rename=s0;$.rollup=i0;$.sample=a0;$.onehot=l0;$.select=u0;$.unfold=c0;$.spread=d0;$.erase=f0;$.ungroup=m0;$.union=p0;$.recode=h0;$.unorder=g0;$.window=b0;$.chain=x0;$.unroll=v0;function y0(t,e){return l.useCallback(()=>{t&&e&&e(t)},[e,t])}function C0(t,e){const o=l.useMemo(()=>t?fa(t):null,[t]);return l.useMemo(()=>{if(o)return B0()(pa()(ma()(L0(void 0,e)(o))))},[o,e])}function w0(t,e,o){const[n,r]=l.useState(),s=Mg();l.useEffect(()=>{t&&r(t)},[t,r]);const i=Li(o),a=l.useCallback(c=>{const f=Go(c,e??"",i(`table-${c}`));f.args=s(f.args),r(f)},[e,r,i,s]);return{internal:n,handleVerbChange:a,setInternal:r}}function _0(t,e=!1,o=!1){const n=we();return l.useMemo(()=>Mn({root:{border:`1px solid ${n.application().faint().hex()}`,width:e?800:360,maxHeight:580}},t),[n,t,e,o])}const S0=l.memo(function({onDismiss:e,store:o,onTransformRequested:n,step:r,nextInputTable:s,styles:i,...a}){const[c,{toggle:f}]=nn(!1),{internal:p,setInternal:g,handleVerbChange:b}=w0(r,s,o),d=C0(p,!!r),h=y0(p,n),m=_0(i,c,!!p?.verb);return u.jsxs(bs,{onDismissed:()=>g(void 0),styles:m,directionalHint:An.rightBottomEdge,...a,children:[u.jsxs(D0,{children:[u.jsx(I0,{children:r?"Edit step":"New step"}),e&&u.jsx(le,{iconProps:k0.cancel,ariaLabel:"Close popup modal",onClick:()=>e()})]}),u.jsxs(T0,{showGuidance:c,children:[u.jsxs(j0,{children:[u.jsxs(M0,{children:[u.jsx(sC,{placeholder:"Select a verb",verb:p?.verb,onCreate:b}),p?.verb?u.jsx(le,{onClick:f,iconProps:{iconName:"Info"},checked:c}):null]}),p&&d&&u.jsxs(u.Fragment,{children:[u.jsx(d,{step:p,store:o,onChange:g}),u.jsx(O0,{children:u.jsx(Eo,{onClick:h,children:"Save"})})]})]}),c&&p?.verb?u.jsx(N0,{children:u.jsx(bx,{name:p?.verb,index:$})}):null]})]})}),k0={cancel:{iconName:"Cancel"}},T0=C.div`
	padding: 0px 12px 14px 24px;
	display: flex;
	justify-content: flex-start;
	gap: 12px;
`,D0=C.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: ${({theme:t})=>t.application().faint().hex()};
	margin-bottom: 12px;
`,I0=C.h3`
	padding-left: 12px;
	margin: 8px 0 8px 0;
`,j0=C.div`
	width: 316px;
	max-height: 32rem;
	overflow: hidden auto;
`,M0=C.div`
	margin-bottom: 8px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`,O0=C.div`
	margin-top: 8px;
`,N0=C.div`
	width: 400px;
	max-height: 32rem;
	overflow: hidden auto;
`,J=l.memo(function({step:e,rows:o,showInput:n,showOutput:r,showOutputColumn:s,style:i}){const a=l.useMemo(()=>{function f(p){return p.map((g,b)=>u.jsxs(vn,{title:g.title,children:[u.jsxs(yn,{children:[g.before?u.jsx(Yt,{children:g.before}):null,sn(g.value)?u.jsx(Cn,{}):u.jsx(wn,{title:g.value,children:g.value}),g.after?u.jsx(Yt,{children:g.after}):null]}),g.sub?f(g.sub):null]},`verb-description-row-${g.value}-${b}`))}return f(o)},[o]),c=s&&Bi(e);return u.jsxs(P0,{style:i,children:[u.jsx(A0,{children:e.verb}),n?u.jsx(vn,{children:u.jsxs(yn,{children:[u.jsx(Yt,{children:"table"}),e.input?u.jsx(wn,{children:e.input}):u.jsx(Cn,{})]})}):null,a,r?u.jsx(vn,{children:u.jsxs(yn,{children:[u.jsx(Yt,{children:"into table"}),e.output?u.jsx(wn,{children:e.output}):u.jsx(Cn,{})]})}):null,c?u.jsx(vn,{children:u.jsxs(yn,{children:[u.jsx(Yt,{children:"as column"}),e.args.to?u.jsx(wn,{children:e.args.to}):u.jsx(Cn,{})]})}):null]})}),P0=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-height: 180px;
`,A0=C.div`
	text-transform: uppercase;
	font-weight: bold;
	align-items: center;
	width: 100%;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,vn=C.div`
	padding-left: 8px;
	display: flex;
	flex-direction: column;
`,yn=C.div`
	display: flex;
	justify-content: flex-start;
	gap: 4px;
`,Yt=C.div``,Cn=C.div`
	color: ${({theme:t})=>t.application().lowContrast().hex()};
	&:before {
		content: 'unset';
	}
`,wn=C.div`
	max-width: 240px;
	text-overflow: ellipsis;
	overflow: hidden;
	font-weight: bold;
	color: ${({theme:t})=>t.application().midContrast().hex()};
`,ma=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i,input:a,table:c}=n,f=ae(r,"args.column",i),p=me(a||r.input,c,s),g=E0(r,p);return dg(r)?u.jsxs(F0,{className:"with-input-column-dropdown",children:[u.jsx(L,{children:u.jsx(Ie,{required:!0,table:p,filter:g,label:t||`Column to ${r.verb}`,selectedKey:r.args.column,onChange:f})}),u.jsx(e,{...n})]}):u.jsx(e,{...n})};return l.memo(o)};function E0(t,e){const o=l.useMemo(()=>e?Fo(e):{},[e]);return l.useCallback(n=>fg(t)?o[n]===R.Number:!0,[o,t])}const F0=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,B0=t=>e=>{const o=n=>{const{step:r,store:s,onChange:i}=n,a=ae(r,"input",i);return cg(r)?u.jsxs($0,{className:"with-input-table-dropdown",children:[u.jsx(L,{children:u.jsx(qo,{store:s,label:t||"Input table",selectedKey:r.input,onChange:a})}),u.jsx(e,{...n})]}):u.jsx(e,{...n})};return l.memo(o)},$0=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,pa=t=>e=>{const o=n=>{const{step:r,onChange:s}=n,i=je(r,"args.to",s);return Bi(r)?u.jsxs(R0,{className:"with-output-column-textfield",children:[u.jsx(e,{...n}),u.jsx(L,{children:u.jsx(xe,{required:!0,label:t||"New column name",placeholder:"Column name",value:r.args.to,styles:oe,onChange:i})})]}):u.jsx(e,{...n})};return l.memo(o)},R0=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
	margin-top: 8px;
`,L0=(t,e)=>o=>{const n=r=>{const{step:s,onChange:i}=r,a=je(s,"output",i);return u.jsxs(H0,{className:"with-output-column-textfield",children:[u.jsx(o,{...r}),u.jsx(L,{children:u.jsx(xe,{required:!0,disabled:e,label:t||"Output table",placeholder:"Table name",value:s.output,styles:oe,onChange:a})})]})};return l.memo(n)},H0=C.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	align-content: flex-start;
	justify-content: flex-start;
`,V0=l.memo(function(){const e=Kl(),o=zl(),[n]=Gl(),[r,s]=ql(),[,i]=Yl();return Sn(us,{vertical:!0,children:[ze(Jl,{children:Zl.Prepare.description}),Sn($s,{align:"center",style:{margin:e.spacing.m},gap:e.spacing.s1,children:[Sn(W0,{onClick:o,children:[ze(qe,{iconName:"OpenFolderHorizontal"})," Open sensitive data file"]}),ze(Xl,{title:"Open sensitive data file",children:Ql.sensitiveFile})]}),!!n.length&&ze(us,{children:ze(DC,{tables:n,steps:r,onUpdateSteps:s,onOutputTable:i,stepsPosition:"middle"})})]})}),W0=C.span`
	color: ${t=>t.theme.palette.accent};
	&:hover {
		cursor: pointer;
	}
`,us=C($s)`
	height: 100%;
	overflow-y: auto;

	.ms-Button-textContainer {
		overflow: hidden;
	}

	.ms-Button-label {
		text-overflow: ellipsis;
		overflow: hidden;
	}
`,U0=l.memo(function(){return ze(K0,{children:ze(V0,{})})});U0.displayName="PreparePage";const K0=C.div`
	height: 100%;
	overflow-y: auto;
`;export{U0 as PreparePage,U0 as default};
//# sourceMappingURL=index-adafb616.js.map
