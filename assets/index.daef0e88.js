import{r as o,cj as k,cf as N,cw as W,I as f,cx as y,j as a,T as Y,cy as _,c6 as H,cz as Q,cA as X,a3 as F,cp as B,cc as b,a2 as q,aB as m,ah as M,cB as E,cC as R,cD as I,cE as P,ac as J,aa as U,Q as Z,R as K,cu as ee,ci as te,cF as ne,cb as se,P as oe}from"./main.eb8bef33.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function ae(e){return o.exports.useMemo(()=>Number(k.max([k.maxBy(e,t=>t.estimatedCount)?.estimatedCount,k.maxBy(e,t=>t.actualCount??0)?.actualCount]))??1,[e])}function re(e){return o.exports.useMemo(()=>Object.entries(e),[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ce=16,ie=o.exports.memo(function({contextKey:t,headerName:s,columnIndex:n,height:r,width:c,chartBarHeight:l,minHeight:i,selectedAttributes:h,selectedAttributesByColumn:p,onSetSelectedAttributes:d}){const[u,g]=o.exports.useState([]),[C]=N(),x=ae(u),$=o.exports.useRef(!0),w=W(),A=o.exports.useCallback(async S=>{const v=S?.value;v===void 0||h.has(v)?await d(n,void 0):await d(n,S)},[h,d,n]);return o.exports.useEffect(()=>{C&&C.instance.attributesIntersectionsByColumn(t,[s]).then(S=>{!$.current||!S||g(S[n]??[])}).catch(()=>{$.current})},[C,g,s,n,t,p]),o.exports.useEffect(()=>()=>{$.current=!1},[]),f(y,{styles:{root:{height:r,minHeight:i,width:c}},children:[a(y.Item,{children:a(Y,{styles:{root:{fontWeight:"bold"}},children:s})}),a(y.Item,{styles:{root:{overflowY:"auto",paddingRight:"20px"}},onWheel:w,children:a(_,{items:u,onClick:A,maxCount:x,height:l*Math.max(u.length,1)+ce,selectedAttributes:h})})]})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const le=o.exports.memo(function({contextKey:t,viewHeight:s,headers:n,selectedHeaders:r,chartHeight:c,chartWidth:l,chartBarHeight:i,chartMinHeight:h,selectedAttributesByColumn:p,onSetSelectedAttributes:d}){const u=H(),g=Q();return f(y,{children:[a(X,{}),a(y,{wrap:!0,tokens:{childrenGap:u.spacing.m},styles:{root:{height:s,overflowY:"hidden",padding:u.spacing.s1}},onWheel:g,verticalAlign:"space-between",children:n.map((C,x)=>r[x]&&a(y.Item,{children:a(ie,{contextKey:t,headerName:C,columnIndex:x,height:c,width:l,chartBarHeight:i,minHeight:h,selectedAttributes:p[x]??new Set,selectedAttributesByColumn:p,onSetSelectedAttributes:d})},x))})]})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */o.exports.memo(function({headers:t,selectedHeaders:s,onToggle:n}){const c={childrenGap:H().spacing.s1};return a(y,{tokens:c,children:t.map((l,i)=>a(F,{label:l,checked:s[i]??!1,onChange:()=>n(i)},l))})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ue={iconName:"Delete"},he=o.exports.memo(function({headers:t,selectedAttributesByColumn:s,onSetSelectedAttributes:n,onClearSelectedAttributes:r}){const c=re(s),l=o.exports.useMemo(()=>k.some(c,i=>Array.from(i[1].keys()).length>0),[c]);return f(B,{children:[c.flatMap(i=>Array.from(i[1].keys()).sort().map(h=>f(b,{align:"center",children:[a(me,{children:"|"}),a(q,{iconProps:ue,text:`${t[i[0]]}:${h}`,onClick:async()=>await n(+i[0],void 0)})]},`${i[0]}:${h}`))),l&&a(de,{iconName:"ChromeClose",onClick:r})]})}),de=m(M)`
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
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const pe=6;function fe(e){return e.map((t,s)=>s<pe)}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function ge(e){return o.exports.useCallback(()=>{e({})},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function D(e,t,s,n,r){return o.exports.useCallback(async c=>{if(r&&e)try{await r.instance.selectAttributes(e,c),s.current&&n(c)}catch{t(!1),n({})}},[r,t,s,n,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Ce(e,t,s,n,r,c){return o.exports.useCallback(async()=>{if(c&&e){t(!0);try{await c.instance.navigate(e);const l=await c.instance.getNavigateResult(e);s.current&&(n(l.headerNames),r(fe(l.headerNames)),t(!1))}catch{s.current&&t(!1)}}else t(!1)},[t,c,s,n,r,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function O(e,t){return o.exports.useCallback(async(s,n)=>{await e({...t,[s]:n!==void 0?new Set([n.value]):new Set})},[e,t])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Se(e,t){return o.exports.useCallback(async s=>{const n=[...e];n[s]=!n[s],await t(n)},[t,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const G=o.exports.memo(function({isFullScreen:t}){const[,s]=o.exports.useState(!0),[n,r]=E(),[c]=N(),l=o.exports.useRef(!0),[i]=R(),[h]=I(),[p]=P(),d=D(i?.key,s,l,r,c),u=O(d,n),g=t?"calc(100vh - 161px)":"calc(100vh - 278px)",C=`calc((${g} / 2) - 25px)`;return a(be,{children:a(le,{contextKey:i?.key??"",viewHeight:g,headers:h,selectedHeaders:p,chartHeight:C,chartWidth:400,chartBarHeight:40,chartMinHeight:150,selectedAttributesByColumn:n,onSetSelectedAttributes:u})})});G.displayName="ChartArea";const be=m.div`
	height: 100%;
	width: 100%;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const L=o.exports.memo(function(){const[t,{toggle:s}]=J(!1),n=U("select-columns-id"),[r]=I(),[c,l]=P(),i=Se(c,l),h=o.exports.useCallback(d=>{const u=r.map(()=>d);l(u)},[r,l]),p=o.exports.useMemo(()=>r.map((d,u)=>a(ke,{label:d,checked:c[u]??!1,onChange:()=>i(u)},d)),[r,c,i]);return f(B,{children:[a(xe,{id:n,onClick:s,children:"Select Columns"}),t&&a(Z,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:K.bottomCenter,target:`#${n}`,onDismiss:s,setInitialFocus:!0,children:f(ye,{vertical:!0,children:[f($e,{justify:"space-around",align:"center",children:[a(z,{onClick:()=>h(!0),children:"All"}),a(ve,{children:"|"}),a(z,{onClick:()=>h(!1),children:"None"})]}),a(we,{vertical:!0,children:a("div",{children:p})})]})})]})});L.displayName="SelectNavigateColumns";const xe=m.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.2px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,ye=m(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,$e=m(b)`
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
`,ve=m.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,we=m(b)`
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
`,ke=m(F)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const T=o.exports.memo(function({onFullScreenToggle:t}){const[s,n]=o.exports.useState(!0),[r,c]=o.exports.useState(!1),[l,i]=E(),[h]=N(),p=o.exports.useRef(!0),d=ee(),[u,g]=R(),[C,x]=I(),[,$]=P(),w=D(u?.key,n,p,i,h),A=O(w,l),S=ge(w),v=Ce(u?.key,n,p,x,$,h),j=H();o.exports.useEffect(()=>{S(),v()},[u,S,v]),o.exports.useEffect(()=>()=>{p.current=!1},[]);const V=o.exports.useCallback(()=>{t&&t(!r),c(!r)},[c,r,t]);return f(Ae,{vertical:!0,children:[f(b,{align:"center",style:{padding:j.spacing.m,paddingBottom:0,width:"100%"},children:[a(te,{grow:1,shrink:0,style:{overflowY:"auto"},children:a(ne,{selectedSynthesis:u,allSynthesisInfo:d,onChange:g,disabled:d.length===0||s})}),a(Ne,{onClick:V,iconName:r?"ChromeClose":"FullScreen"})]}),f(b,{align:"center",children:[a(L,{}),a(he,{headers:C,selectedAttributesByColumn:l,onSetSelectedAttributes:A,onClearSelectedAttributes:S})]})]})});T.displayName="NavigateCommands";const Ae=m(b)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Ne=m(M)`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	padding: ${e=>`${e.theme.spacing.s1}`};
	margin: ${e=>`0 ${e.theme.spacing.m}`};
	background: ${e=>e.theme.palette.neutralLight};
	border-radius: ${e=>e.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const He=o.exports.memo(function(){const[t,s]=o.exports.useState(!1),n=o.exports.useCallback(r=>{s(r)},[s]);return f(Ie,{vertical:!0,className:t?"fullScreen":"",children:[a(se,{children:oe.Navigate.description}),a(T,{onFullScreenToggle:n}),a(Pe,{children:a(G,{isFullScreen:t})})]})});He.displayName="NavigatePage";const Ie=m(b)`
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
`,Pe=m(b)`
	height: 100%;
	overflow-y: auto;
`;export{He as NavigatePage,He as default};
//# sourceMappingURL=index.daef0e88.js.map
