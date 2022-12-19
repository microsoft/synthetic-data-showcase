import{r as o,i as f,j as r,a4 as W,F,l as m,ar as Y,P as _}from"./Pages-831d0413.js";import{K as N,t as H,bQ as M,J as C,bd as Q,i as B,cD as E,W as D,cE as I,cF as P,g as J,h as X,a1 as q,a3 as U,bi as Z}from"./tables-0c0707bd.js";import{_ as w,i as K,S as y,A as ee,j as te,k as ne,u as se,e as oe}from"./SynthesisDropdown-fefedb26.js";function re(e){return o.exports.useMemo(()=>Number(w.max([w.maxBy(e,t=>t.estimatedCount)?.estimatedCount,w.maxBy(e,t=>t.actualCount??0)?.actualCount]))??1,[e])}function ae(e){return o.exports.useMemo(()=>Object.entries(e),[e])}const ie=16,ce=o.exports.memo(function({contextKey:t,headerName:s,columnIndex:n,height:a,width:i,chartBarHeight:l,minHeight:c,selectedAttributes:d,selectedAttributesByColumn:p,onSetSelectedAttributes:h}){const[u,g]=o.exports.useState([]),[S]=N(),x=re(u),$=o.exports.useRef(!0),v=K(),A=o.exports.useCallback(async b=>{const k=b?.value;k===void 0||d.has(k)?await h(n,void 0):await h(n,b)},[d,h,n]);return o.exports.useEffect(()=>{S&&S.instance.attributesIntersectionsByColumn(t,[s]).then(b=>{!$.current||!b||g(b[n]??[])}).catch(()=>{$.current})},[S,g,s,n,t,p]),o.exports.useEffect(()=>()=>{$.current=!1},[]),f(y,{styles:{root:{height:a,minHeight:c,width:i}},children:[r(y.Item,{children:r(W,{styles:{root:{fontWeight:"bold"}},children:s})}),r(y.Item,{styles:{root:{overflowY:"auto",paddingRight:"20px"}},onWheel:v,children:r(ee,{items:u,onClick:A,maxCount:x,height:l*Math.max(u.length,1)+ie,selectedAttributes:d})})]})}),le=o.exports.memo(function({contextKey:t,viewHeight:s,headers:n,selectedHeaders:a,chartHeight:i,chartWidth:l,chartBarHeight:c,chartMinHeight:d,selectedAttributesByColumn:p,onSetSelectedAttributes:h}){const u=H(),g=te();return f(y,{children:[r(ne,{}),r(y,{wrap:!0,tokens:{childrenGap:u.spacing.m},styles:{root:{height:s,overflowY:"hidden",padding:u.spacing.s1}},onWheel:g,verticalAlign:"space-between",children:n.map((S,x)=>a[x]&&r(y.Item,{children:r(ce,{contextKey:t,headerName:S,columnIndex:x,height:i,width:l,chartBarHeight:c,minHeight:d,selectedAttributes:p[x]??new Set,selectedAttributesByColumn:p,onSetSelectedAttributes:h})},x))})]})});o.exports.memo(function({headers:t,selectedHeaders:s,onToggle:n}){const i={childrenGap:H().spacing.s1};return r(y,{tokens:i,children:t.map((l,c)=>r(M,{label:l,checked:s[c]??!1,onChange:()=>n(c)},l))})});const ue={iconName:"Delete"},de=o.exports.memo(function({headers:t,selectedAttributesByColumn:s,onSetSelectedAttributes:n,onClearSelectedAttributes:a}){const i=ae(s),l=o.exports.useMemo(()=>w.some(i,c=>Array.from(c[1].keys()).length>0),[i]);return f(F,{children:[i.flatMap(c=>Array.from(c[1].keys()).sort().map(d=>f(C,{align:"center",children:[r(me,{children:"|"}),r(Q,{iconProps:ue,text:`${t[c[0]]}:${d}`,onClick:async()=>await n(+c[0],void 0)})]},`${c[0]}:${d}`))),l&&r(he,{iconName:"ChromeClose",onClick:a})]})}),he=m(B)`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	padding: ${e=>`${e.theme.spacing.s1}`};
	margin: ${e=>`0 ${e.theme.spacing.m}`};
	background: ${e=>e.theme.palette.neutralLight};
	border-radius: ${e=>e.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`,me=m.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,pe=6;function fe(e){return e.map((t,s)=>s<pe)}function ge(e){return o.exports.useCallback(()=>{e({})},[e])}function O(e,t,s,n,a){return o.exports.useCallback(async i=>{if(a&&e)try{await a.instance.selectAttributes(e,i),s.current&&n(i)}catch{t(!1),n({})}},[a,t,s,n,e])}function Se(e,t,s,n,a,i){return o.exports.useCallback(async()=>{if(i&&e){t(!0);try{await i.instance.navigate(e);const l=await i.instance.getNavigateResult(e);s.current&&(n(l.headerNames),a(fe(l.headerNames)),t(!1))}catch{s.current&&t(!1)}}else t(!1)},[t,i,s,n,a,e])}function R(e,t){return o.exports.useCallback(async(s,n)=>{await e({...t,[s]:n!==void 0?new Set([n.value]):new Set})},[e,t])}function be(e,t){return o.exports.useCallback(async s=>{const n=[...e];n[s]=!n[s],await t(n)},[t,e])}const G=o.exports.memo(function({isFullScreen:t}){const[,s]=o.exports.useState(!0),[n,a]=E(),[i]=N(),l=o.exports.useRef(!0),[c]=D(),[d]=I(),[p]=P(),h=O(c?.key,s,l,a,i),u=R(h,n),g=t?"calc(100vh - 161px)":"calc(100vh - 278px)",S=`calc((${g} / 2) - 25px)`;return r(Ce,{children:r(le,{contextKey:c?.key??"",viewHeight:g,headers:d,selectedHeaders:p,chartHeight:S,chartWidth:400,chartBarHeight:40,chartMinHeight:150,selectedAttributesByColumn:n,onSetSelectedAttributes:u})})});G.displayName="ChartArea";const Ce=m.div`
	height: 100%;
	width: 100%;
`,L=o.exports.memo(function(){const[t,{toggle:s}]=J(!1),n=X("select-columns-id"),[a]=I(),[i,l]=P(),c=be(i,l),d=o.exports.useCallback(h=>{const u=a.map(()=>h);l(u)},[a,l]),p=o.exports.useMemo(()=>a.map((h,u)=>r(we,{label:h,checked:i[u]??!1,onChange:()=>c(u)},h)),[a,i,c]);return f(F,{children:[r(xe,{id:n,onClick:s,children:"Select Columns"}),t&&r(q,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:U.bottomCenter,target:`#${n}`,onDismiss:s,setInitialFocus:!0,children:f(ye,{vertical:!0,children:[f($e,{justify:"space-around",align:"center",children:[r(z,{onClick:()=>d(!0),children:"All"}),r(ke,{children:"|"}),r(z,{onClick:()=>d(!1),children:"None"})]}),r(ve,{vertical:!0,children:r("div",{children:p})})]})})]})});L.displayName="SelectNavigateColumns";const xe=m.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.2px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,ye=m(C)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,$e=m(C)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,z=m.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,ke=m.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,ve=m(C)`
	overflow-y: auto;
	padding: ${e=>e.theme.spacing.s1};
	direction: rtl;
	& > div {
		direction: ltr;
	}
	&::-webkit-scrollbar {
		width: 4px;
		background: ${e=>e.theme.palette.neutralLight};
	}
	&::-webkit-scrollbar-thumb {
		background-color: ${e=>e.theme.palette.themePrimary};
		border-radius: 20px;
	}
`,we=m(M)`
	padding: ${e=>e.theme.spacing.s2};
`,j=o.exports.memo(function({onFullScreenToggle:t}){const[s,n]=o.exports.useState(!0),[a,i]=o.exports.useState(!1),[l,c]=E(),[d]=N(),p=o.exports.useRef(!0),h=se(),[u,g]=D(),[S,x]=I(),[,$]=P(),v=O(u?.key,n,p,c,d),A=R(v,l),b=ge(v),k=Se(u?.key,n,p,x,$,d),T=H();o.exports.useEffect(()=>{b(),k()},[u,b,k]),o.exports.useEffect(()=>()=>{p.current=!1},[]);const V=o.exports.useCallback(()=>{t&&t(!a),i(!a)},[i,a,t]);return f(Ae,{vertical:!0,children:[f(C,{align:"center",style:{padding:T.spacing.m,paddingBottom:0,width:"100%"},children:[r(Z,{grow:1,shrink:0,style:{overflowY:"auto"},children:r(oe,{selectedSynthesis:u,allSynthesisInfo:h,onChange:g,disabled:h.length===0||s})}),r(Ne,{onClick:V,iconName:a?"ChromeClose":"FullScreen"})]}),f(C,{align:"center",children:[r(L,{}),r(de,{headers:S,selectedAttributesByColumn:l,onSetSelectedAttributes:A,onClearSelectedAttributes:b})]})]})});j.displayName="NavigateCommands";const Ae=m(C)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Ne=m(B)`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	padding: ${e=>`${e.theme.spacing.s1}`};
	margin: ${e=>`0 ${e.theme.spacing.m}`};
	background: ${e=>e.theme.palette.neutralLight};
	border-radius: ${e=>e.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`,He=o.exports.memo(function(){const[t,s]=o.exports.useState(!1),n=o.exports.useCallback(a=>{s(a)},[s]);return f(Ie,{vertical:!0,className:t?"fullScreen":"",children:[r(Y,{children:_.Navigate.description}),r(j,{onFullScreenToggle:n}),r(Pe,{children:r(G,{isFullScreen:t})})]})});He.displayName="NavigatePage";const Ie=m(C)`
	height: 100%;
	width: 100%;
	background: white;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}

	&.fullScreen {
		position: fixed;
		height: 100vh;
		width: 100vw;
		top: 0;
		left: 0;
		z-index: 10000;
	}
`,Pe=m(C)`
	height: 100%;
	overflow-y: auto;
`;export{He as NavigatePage,He as default};
//# sourceMappingURL=index-9156227e.js.map
