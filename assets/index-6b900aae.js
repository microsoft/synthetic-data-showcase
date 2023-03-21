import{r as a,cm as A,ci as H,cB as W,b$ as g,cC as $,j as o,S as Y,cD as _,c9 as N,cE as Q,cF as J,a2 as F,cu as B,cf as C,a1 as X,b6 as m,ag as E,cG as M,cH as O,cI as I,cJ as P,ab as q,a9 as U,O as Z,Q as K,cz as ee,cl as te,cK as ne,ce as se,P as ae}from"./main-7ec25afe.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function oe(e){return a.useMemo(()=>Number(A.max([A.maxBy(e,t=>t.estimatedCount)?.estimatedCount,A.maxBy(e,t=>t.actualCount??0)?.actualCount]))??1,[e])}function re(e){return a.useMemo(()=>Object.entries(e),[e])}const ce=16,ie=a.memo(function({contextKey:t,headerName:s,columnIndex:n,height:r,width:c,chartBarHeight:l,minHeight:i,selectedAttributes:d,selectedAttributesByColumn:f,onSetSelectedAttributes:h}){const[u,p]=a.useState([]),[S]=H(),y=oe(u),v=a.useRef(!0),w=W(),x=a.useCallback(async b=>{const k=b?.value;k===void 0||d.has(k)?await h(n,void 0):await h(n,b)},[d,h,n]);return a.useEffect(()=>{S&&S.instance.attributesIntersectionsByColumn(t,[s]).then(b=>{!v.current||!b||p(b[n]??[])}).catch(()=>{v.current})},[S,p,s,n,t,f]),a.useEffect(()=>()=>{v.current=!1},[]),g($,{styles:{root:{height:r,minHeight:i,width:c}},children:[o($.Item,{children:o(Y,{styles:{root:{fontWeight:"bold"}},children:s})}),o($.Item,{styles:{root:{overflowY:"auto",paddingRight:"20px"}},onWheel:w,children:o(_,{items:u,onClick:x,maxCount:y,height:l*Math.max(u.length,1)+ce,selectedAttributes:d})})]})}),le=a.memo(function({contextKey:t,viewHeight:s,headers:n,selectedHeaders:r,chartHeight:c,chartWidth:l,chartBarHeight:i,chartMinHeight:d,selectedAttributesByColumn:f,onSetSelectedAttributes:h}){const u=N(),p=Q();return g($,{children:[o(J,{}),o($,{wrap:!0,tokens:{childrenGap:u.spacing.m},styles:{root:{height:s,overflowY:"hidden",padding:u.spacing.s1}},onWheel:p,verticalAlign:"space-between",children:n.map((S,y)=>r[y]&&o($.Item,{children:o(ie,{contextKey:t,headerName:S,columnIndex:y,height:c,width:l,chartBarHeight:i,minHeight:d,selectedAttributes:f[y]??new Set,selectedAttributesByColumn:f,onSetSelectedAttributes:h})},y))})]})});a.memo(function({headers:t,selectedHeaders:s,onToggle:n}){const c={childrenGap:N().spacing.s1};return o($,{tokens:c,children:t.map((l,i)=>o(F,{label:l,checked:s[i]??!1,onChange:()=>n(i)},l))})});const ue={iconName:"Delete"},de=a.memo(function({headers:t,selectedAttributesByColumn:s,onSetSelectedAttributes:n,onClearSelectedAttributes:r}){const c=re(s),l=a.useMemo(()=>A.some(c,i=>Array.from(i[1].keys()).length>0),[c]);return g(B,{children:[c.flatMap(i=>Array.from(i[1].keys()).sort().map(d=>g(C,{align:"center",children:[o(me,{children:"|"}),o(X,{iconProps:ue,text:`${t[i[0]]}:${d}`,onClick:async()=>await n(+i[0],void 0)})]},`${i[0]}:${d}`))),l&&o(he,{iconName:"ChromeClose",onClick:r})]})}),he=m(E)`
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
 */const fe=6;function ge(e){return e.map((t,s)=>s<fe)}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function pe(e){return a.useCallback(()=>{e({})},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function D(e,t,s,n,r){return a.useCallback(async c=>{if(r&&e)try{await r.instance.selectAttributes(e,c),s.current&&n(c)}catch{t(!1),n({})}},[r,t,s,n,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Se(e,t,s,n,r,c){return a.useCallback(async()=>{if(c&&e){t(!0);try{await c.instance.navigate(e);const l=await c.instance.getNavigateResult(e);s.current&&(n(l.headerNames),r(ge(l.headerNames)),t(!1))}catch{s.current&&t(!1)}}else t(!1)},[t,c,s,n,r,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function G(e,t){return a.useCallback(async(s,n)=>{await e({...t,[s]:n!==void 0?new Set([n.value]):new Set})},[e,t])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function be(e,t){return a.useCallback(async s=>{const n=[...e];n[s]=!n[s],await t(n)},[t,e])}const R=a.memo(function({isFullScreen:t}){const[,s]=a.useState(!0),[n,r]=M(),[c]=H(),l=a.useRef(!0),[i]=O(),[d]=I(),[f]=P(),h=D(i?.key,s,l,r,c),u=G(h,n),p=t?"calc(100vh - 161px)":"calc(100vh - 278px)",S=`calc((${p} / 2) - 25px)`;return o(Ce,{children:o(le,{contextKey:i?.key??"",viewHeight:p,headers:d,selectedHeaders:f,chartHeight:S,chartWidth:400,chartBarHeight:40,chartMinHeight:150,selectedAttributesByColumn:n,onSetSelectedAttributes:u})})});R.displayName="ChartArea";const Ce=m.div`
	height: 100%;
	width: 100%;
`,L=a.memo(function(){const[t,{toggle:s}]=q(!1),n=U("select-columns-id"),[r]=I(),[c,l]=P(),i=be(c,l),d=a.useCallback(h=>{const u=r.map(()=>h);l(u)},[r,l]),f=a.useMemo(()=>r.map((h,u)=>o(Ae,{label:h,checked:c[u]??!1,onChange:()=>i(u)},h)),[r,c,i]);return g(B,{children:[o(ye,{id:n,onClick:s,children:"Select Columns"}),t&&o(Z,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:K.bottomCenter,target:`#${n}`,onDismiss:s,setInitialFocus:!0,children:g($e,{vertical:!0,children:[g(ve,{justify:"space-around",align:"center",children:[o(z,{onClick:()=>d(!0),children:"All"}),o(ke,{children:"|"}),o(z,{onClick:()=>d(!1),children:"None"})]}),o(we,{vertical:!0,children:o("div",{children:f})})]})})]})});L.displayName="SelectNavigateColumns";const ye=m.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.2px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,$e=m(C)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,ve=m(C)`
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
`,we=m(C)`
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
`,Ae=m(F)`
	padding: ${e=>e.theme.spacing.s2};
`,T=a.memo(function({onFullScreenToggle:t}){const[s,n]=a.useState(!0),[r,c]=a.useState(!1),[l,i]=M(),[d]=H(),f=a.useRef(!0),h=ee(),[u,p]=O(),[S,y]=I(),[,v]=P(),w=D(u?.key,n,f,i,d),x=G(w,l),b=pe(w),k=Se(u?.key,n,f,y,v,d),V=N();a.useEffect(()=>{b(),k()},[u,b,k]),a.useEffect(()=>()=>{f.current=!1},[]);const j=a.useCallback(()=>{t&&t(!r),c(!r)},[c,r,t]);return g(xe,{vertical:!0,children:[g(C,{align:"center",style:{padding:V.spacing.m,paddingBottom:0,width:"100%"},children:[o(te,{grow:1,shrink:0,style:{overflowY:"auto"},children:o(ne,{selectedSynthesis:u,allSynthesisInfo:h,onChange:p,disabled:h.length===0||s})}),o(He,{onClick:j,iconName:r?"ChromeClose":"FullScreen"})]}),g(C,{align:"center",children:[o(L,{}),o(de,{headers:S,selectedAttributesByColumn:l,onSetSelectedAttributes:x,onClearSelectedAttributes:b})]})]})});T.displayName="NavigateCommands";const xe=m(C)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,He=m(E)`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	padding: ${e=>`${e.theme.spacing.s1}`};
	margin: ${e=>`0 ${e.theme.spacing.m}`};
	background: ${e=>e.theme.palette.neutralLight};
	border-radius: ${e=>e.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`,Ne=a.memo(function(){const[t,s]=a.useState(!1),n=a.useCallback(r=>{s(r)},[s]);return g(Ie,{vertical:!0,className:t?"fullScreen":"",children:[o(se,{children:ae.Navigate.description}),o(T,{onFullScreenToggle:n}),o(Pe,{children:o(R,{isFullScreen:t})})]})});Ne.displayName="NavigatePage";const Ie=m(C)`
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
`;export{Ne as NavigatePage,Ne as default};
//# sourceMappingURL=index-6b900aae.js.map
