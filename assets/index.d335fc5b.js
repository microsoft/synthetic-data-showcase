import{r as o,cg as w,cc as H,ct as W,I as f,cu as y,o as r,R as _,cv as Y,c4 as I,cw as Q,cx as X,a1 as F,cm as B,c9 as b,a0 as q,az as m,af as M,cy as O,cz as R,cA as N,cB as z,aa as J,a8 as U,O as Z,P as K,cr as ee,cf as te,cC as ne}from"./main.6a443a0c.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function se(e){return o.exports.useMemo(()=>Number(w.max([w.maxBy(e,t=>t.estimatedCount)?.estimatedCount,w.maxBy(e,t=>t.actualCount??0)?.actualCount]))??1,[e])}function oe(e){return o.exports.useMemo(()=>Object.entries(e),[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const re=16,ae=o.exports.memo(function({contextKey:t,headerName:s,columnIndex:n,height:a,width:c,chartBarHeight:l,minHeight:i,selectedAttributes:h,selectedAttributesByColumn:p,onSetSelectedAttributes:d}){const[u,g]=o.exports.useState([]),[C]=H(),x=se(u),$=o.exports.useRef(!0),v=W(),A=o.exports.useCallback(async S=>{const k=S?.value;k===void 0||h.has(k)?await d(n,void 0):await d(n,S)},[h,d,n]);return o.exports.useEffect(()=>{C&&C.instance.attributesIntersectionsByColumn(t,[s]).then(S=>{!$.current||!S||g(S[n]??[])}).catch(()=>{$.current})},[C,g,s,n,t,p]),o.exports.useEffect(()=>()=>{$.current=!1},[]),f(y,{styles:{root:{height:a,minHeight:i,width:c}},children:[r(y.Item,{children:r(_,{styles:{root:{fontWeight:"bold"}},children:s})}),r(y.Item,{styles:{root:{overflowY:"auto",paddingRight:"20px"}},onWheel:v,children:r(Y,{items:u,onClick:A,maxCount:x,height:l*Math.max(u.length,1)+re,selectedAttributes:h})})]})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ce=o.exports.memo(function({contextKey:t,viewHeight:s,headers:n,selectedHeaders:a,chartHeight:c,chartWidth:l,chartBarHeight:i,chartMinHeight:h,selectedAttributesByColumn:p,onSetSelectedAttributes:d}){const u=I(),g=Q();return f(y,{children:[r(X,{}),r(y,{wrap:!0,tokens:{childrenGap:u.spacing.m},styles:{root:{height:s,overflowY:"hidden",padding:u.spacing.s1}},onWheel:g,verticalAlign:"space-between",children:n.map((C,x)=>a[x]&&r(y.Item,{children:r(ae,{contextKey:t,headerName:C,columnIndex:x,height:c,width:l,chartBarHeight:i,minHeight:h,selectedAttributes:p[x]??new Set,selectedAttributesByColumn:p,onSetSelectedAttributes:d})},x))})]})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */o.exports.memo(function({headers:t,selectedHeaders:s,onToggle:n}){const c={childrenGap:I().spacing.s1};return r(y,{tokens:c,children:t.map((l,i)=>r(F,{label:l,checked:s[i]??!1,onChange:()=>n(i)},l))})});/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ie={iconName:"Delete"},le=o.exports.memo(function({headers:t,selectedAttributesByColumn:s,onSetSelectedAttributes:n,onClearSelectedAttributes:a}){const c=oe(s),l=o.exports.useMemo(()=>w.some(c,i=>Array.from(i[1].keys()).length>0),[c]);return f(B,{children:[c.flatMap(i=>Array.from(i[1].keys()).sort().map(h=>f(b,{align:"center",children:[r(he,{children:"|"}),r(q,{iconProps:ie,text:`${t[i[0]]}:${h}`,onClick:async()=>await n(+i[0],void 0)})]},`${i[0]}:${h}`))),l&&r(ue,{iconName:"ChromeClose",onClick:a})]})}),ue=m(M)`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	padding: ${e=>`${e.theme.spacing.s1}`};
	margin: ${e=>`0 ${e.theme.spacing.m}`};
	background: ${e=>e.theme.palette.neutralLight};
	border-radius: ${e=>e.theme.effects.roundedCorner4};
	&:hover {
		cursor: pointer;
	}
`,he=m.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const de=6;function me(e){return e.map((t,s)=>s<de)}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function pe(e){return o.exports.useCallback(()=>{e({})},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function E(e,t,s,n,a){return o.exports.useCallback(async c=>{if(a&&e)try{await a.instance.selectAttributes(e,c),s.current&&n(c)}catch{t(!1),n({})}},[a,t,s,n,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function fe(e,t,s,n,a,c){return o.exports.useCallback(async()=>{if(c&&e){t(!0);try{await c.instance.navigate(e);const l=await c.instance.getNavigateResult(e);s.current&&(n(l.headerNames),a(me(l.headerNames)),t(!1))}catch{s.current&&t(!1)}}else t(!1)},[t,c,s,n,a,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function G(e,t){return o.exports.useCallback(async(s,n)=>{await e({...t,[s]:n!==void 0?new Set([n.value]):new Set})},[e,t])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function ge(e,t){return o.exports.useCallback(async s=>{const n=[...e];n[s]=!n[s],await t(n)},[t,e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const L=o.exports.memo(function({isFullScreen:t}){const[,s]=o.exports.useState(!0),[n,a]=O(),[c]=H(),l=o.exports.useRef(!0),[i]=R(),[h]=N(),[p]=z(),d=E(i?.key,s,l,a,c),u=G(d,n),g=t?"calc(100vh - 135px)":"calc(100vh - 252px)",C=`calc((${g} / 2) - 25px)`;return r(Ce,{children:r(ce,{contextKey:i?.key??"",viewHeight:g,headers:h,selectedHeaders:p,chartHeight:C,chartWidth:400,chartBarHeight:40,chartMinHeight:150,selectedAttributesByColumn:n,onSetSelectedAttributes:u})})});L.displayName="ChartArea";const Ce=m.div`
	height: 100%;
	width: 100%;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const D=o.exports.memo(function(){const[t,{toggle:s}]=J(!1),n=U("select-columns-id"),[a]=N(),[c,l]=z(),i=ge(c,l),h=o.exports.useCallback(d=>{const u=a.map(()=>d);l(u)},[a,l]),p=o.exports.useMemo(()=>a.map((d,u)=>r(ke,{label:d,checked:c[u]??!1,onChange:()=>i(u)},d)),[a,c,i]);return f(B,{children:[r(Se,{id:n,onClick:s,children:"Select Columns"}),t&&r(Z,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:K.bottomCenter,target:`#${n}`,onDismiss:s,setInitialFocus:!0,children:f(be,{vertical:!0,children:[f(xe,{justify:"space-around",align:"center",children:[r(P,{onClick:()=>h(!0),children:"All"}),r(ye,{children:"|"}),r(P,{onClick:()=>h(!1),children:"None"})]}),r($e,{vertical:!0,children:r("div",{children:p})})]})})]})});D.displayName="SelectNavigateColumns";const Se=m.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.2px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,be=m(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,xe=m(b)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,P=m.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,ye=m.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,$e=m(b)`
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
 */const T=o.exports.memo(function({onFullScreenToggle:t}){const[s,n]=o.exports.useState(!0),[a,c]=o.exports.useState(!1),[l,i]=O(),[h]=H(),p=o.exports.useRef(!0),d=ee(),[u,g]=R(),[C,x]=N(),[,$]=z(),v=E(u?.key,n,p,i,h),A=G(v,l),S=pe(v),k=fe(u?.key,n,p,x,$,h),V=I();o.exports.useEffect(()=>{S(),k()},[u,S,k]),o.exports.useEffect(()=>()=>{p.current=!1},[]);const j=o.exports.useCallback(()=>{t&&t(!a),c(!a)},[c,a,t]);return f(ve,{vertical:!0,children:[f(b,{align:"center",style:{padding:V.spacing.m,paddingBottom:0,width:"100%"},children:[r(te,{grow:1,shrink:0,children:r(ne,{selectedSynthesis:u,allSynthesisInfo:d,onChange:g,disabled:d.length===0||s})}),r(we,{onClick:j,iconName:a?"ChromeClose":"FullScreen"})]}),f(b,{align:"center",children:[r(D,{}),r(le,{headers:C,selectedAttributesByColumn:l,onSetSelectedAttributes:A,onClearSelectedAttributes:S})]})]})});T.displayName="NavigateCommands";const ve=m(b)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,we=m(M)`
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
 */const Ae=o.exports.memo(function(){const[t,s]=o.exports.useState(!1),n=o.exports.useCallback(a=>{s(a)},[s]);return f(He,{vertical:!0,className:t?"fullScreen":"",children:[r(T,{onFullScreenToggle:n}),r(Ie,{children:r(L,{isFullScreen:t})})]})});Ae.displayName="NavigatePage";const He=m(b)`
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
`,Ie=m(b)`
	height: 100%;
	overflow-y: auto;
`;export{Ae as NavigatePage,Ae as default};
//# sourceMappingURL=index.d335fc5b.js.map
