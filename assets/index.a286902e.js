import{cd as E,r as s,ce as se,cf as oe,aA as i,ca as f,cg as M,ch as re,bD as ie,I as C,o as t,ci as ae,cj as le,ck as S,cl as ce,cm as Q,c3 as ue,az as k,cn as D,co as W,b_ as N,bZ as me,aa as A,a8 as I,O as P,P as L,R as de,a1 as j,af as he,c5 as pe,cp as ge}from"./main.952ba4de.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function be(){const[e]=E();return s.exports.useCallback(async(n,o,c,r)=>{if(e){const d=se(n).map(u=>u.name);return(await e.instance).generateAggregateStatistics(n.table.toCSV({delimiter:n.delimiter}),{delimiter:n.delimiter,subjectId:n.subjectId,useColumns:d,sensitiveZeros:n.headers.filter(u=>u.hasSensitiveZeros).map(u=>u.name),recordLimit:o,multiValueColumns:oe(n)},c,r)}},[e])}function q(e,n){const o={};if(!n||!e||e===0)return o;for(const c of Object.keys(n))o[c]=n[c]*100/e;return o}function fe(e){return s.exports.useMemo(()=>q(e?.numberOfRecordsWithRareCombinations,e?.numberOfRecordsWithRareCombinationsPerColumn),[e])}function Ce(e){return s.exports.useMemo(()=>q(e?.numberOfRecordsWithRareCombinations,e?.numberOfRecordsWithRareCombinationsPerAttribute),[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const $e=i(f)`
	width: 100%;
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`,O=i.div`
	margin-bottom: ${e=>e.theme.spacing.m};
`,xe=i(f)`
	width: 100%;
`,T=i(M)`
	width: calc(50% - ${e=>e.theme.spacing.s1});
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ye=i(M)`
	overflow-y: auto;
	overflow-x: hidden;
	padding: ${e=>e.theme.spacing.s1};
	direction: ltr;
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
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const z=s.exports.memo(function({selectedKey:n,valuePerKey:o,label:c,containerHeight:r,barHeight:d,tooltipFormatter:l,onClick:u}){const h=s.exports.useMemo(()=>re(o).keys().sortBy(g=>-o[g]).value(),[o]),m=s.exports.useMemo(()=>h.map(g=>o[g].toFixed(0)),[h,o]),x=s.exports.useCallback((g,a,v)=>{const b=a&&a[0],w=b?h[b.index]:void 0;w&&u?.(w)},[h,u]),$=ie(),p=s.exports.useMemo(()=>{const g=$.scales().nominal().toArray()[0],a=$.scales().nominalBold().toArray()[0];return h.map(v=>v===n?a:g)},[h,$,n]),y=s.exports.useMemo(()=>{const g=$.scales().greys().toArray();return h.map(a=>n===a?g[0]:g[80])},[h,$,n]);return C(f,{vertical:!0,justify:"center",children:[t(M,{align:"center",children:c}),t(ye,{style:{maxHeight:r},children:t(ae,{height:Math.max(d*m.length,d),data:{labels:h,datasets:[{label:c,data:m,xAxisID:"xAxis",yAxisID:"yAxis",backgroundColor:p}]},plugins:[le,{id:"event-catcher",beforeEvent(g,a,v){if(a.event.type==="mousemove"){const b=g.getActiveElements();g.canvas.style.cursor=b&&b[0]?"pointer":"default"}}}],options:{plugins:{legend:{display:!1},datalabels:{anchor:"start",align:"end",offset:5,formatter:g=>`${g} %`,color:y},tooltip:{callbacks:{label:l}}},indexAxis:"y",scales:{xAxis:{display:!1,grid:{display:!1}},yAxis:{grid:{display:!1}}},onClick:x}})})]})});z.displayName="ContributionChart";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const _=s.exports.memo(function(){const n=s.exports.useRef(""),[o]=E(),[c]=S(),[r,d]=s.exports.useState(null),[l,u]=s.exports.useState(!1),[,h]=ce(),[m]=Q(),x=be(),$=fe(r),p=Ce(r),y=s.exports.useCallback(a=>`Affecting ${r?.numberOfRecordsWithRareCombinationsPerColumn[a.label]}/${r?.numberOfRecordsWithRareCombinations} rare/linkable subjects (${a.raw}%)`,[r]),g=s.exports.useCallback(a=>`Affecting ${r?.numberOfRecordsWithRareCombinationsPerAttribute[a.label]}/${r?.numberOfRecordsWithRareCombinations} rare/linkable subjects (${a.raw}%)`,[r]);return s.exports.useEffect(()=>{u(!0),h(void 0),x(c,m.recordLimit,m.reportingLength,m.resolution).then(async a=>{const v=await a?.id;n.current=v;try{const b=await await a?.promise??null;v===n.current&&d(b)}catch(b){n.current!==""&&(h(b),d(null))}finally{n.current!==""&&u(!1)}})},[x,c,m.recordLimit,m.reportingLength,m.resolution,d,u,h]),s.exports.useEffect(()=>()=>{o?.instance.forceAggregateStatisticsWorkerToTerminate(),n.current=""},[o]),t($e,{vertical:!0,align:"center",children:l?t(ue,{}):r&&r.numberOfRecordsWithRareCombinations>0?C(k,{children:[t(O,{children:`Contribution to privacy risk (creating rare attribute combinations in ${r.numberOfRecordsWithRareCombinations}/${r.numberOfRecords} subjects, ${(r.numberOfRecordsWithRareCombinations*100/r.numberOfRecords).toFixed(0)}%)`}),C(xe,{justify:"space-between",children:[t(T,{children:t(z,{valuePerKey:$,label:"Selected columns",containerHeight:220,barHeight:10,tooltipFormatter:y})}),t(T,{children:t(z,{valuePerKey:p,label:"Attributes of selected columns",containerHeight:220,barHeight:10,tooltipFormatter:g})})]})]}):t(O,{children:"No rare attribute combinations (below the privacy resolution) based on the current parameters"})})});_.displayName="AggregateStatistics";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const U=s.exports.memo(function(){const[n]=S(),o=s.exports.useMemo(()=>{const c=n.subjectId,r=n.table.numRows(),d=n.headers.reduce((l,u)=>{const h=n.metadata?.columns[u.name];return u.use&&h&&u.name!==c&&(l.count+=1,l.unique+=h.stats?.distinct??0,l.combinations*=h.stats?.distinct??1),l},{count:0,unique:0,combinations:1});return d.count?`${d.count} columns and ${r} records.`:"0 columns selected"},[n]);return t(ve,{justify:"center",children:o})});U.displayName="InfoBar";const ve=i(f)`
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const J=s.exports.memo(function(){const[n]=Q(),o=D(W("resolution")),c=D(W("reportingLength"));return C(f,{align:"center",children:[t(F,{children:"Privacy Resolution"}),t(V,{labelPosition:N.top,min:1,step:1,value:n.resolution.toString(),onChange:o}),t(F,{children:"Aggregation Limit"}),t(V,{labelPosition:N.top,min:1,step:1,value:n.reportingLength.toString(),onChange:c})]})});J.displayName="AggregationControls";const V=i(me)`
	width: 60px;
`,F=i.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const X=s.exports.memo(function(){const[n,{toggle:o}]=A(!1),c=I("multi-value-columns"),[r,d]=s.exports.useState(";"),[l,u]=S(),h=s.exports.useCallback(a=>{d(a.target.value??";")},[d]),m=s.exports.useMemo(()=>l.headers.filter(a=>a.name!==l.subjectId&&a.use&&l.metadata?.columns[a.name].type==="string").map(a=>a.name),[l]),x=s.exports.useCallback(()=>{!m.length||o()},[m,o]),$=s.exports.useMemo(()=>m.length?"":"disabled",[m]),p=s.exports.useCallback((a,v)=>{u(b=>({...b,headers:[...b.headers.slice(0,a),{...b.headers[a],spreadWithDelimiter:v},...b.headers.slice(a+1)]}))},[u]),y=s.exports.useCallback(a=>{const v=l.headers.map(b=>m?.includes(b.name)?{...b,spreadWithDelimiter:a?b.spreadWithDelimiter??r:null}:b);u(b=>({...b,headers:v}))},[l,u,r,m]),g=s.exports.useMemo(()=>l.headers.map((a,v)=>!a.use||!m?.includes(a.name)?null:C(Pe,{className:(v+1)%2!==0?"odd":"",justify:"space-between",align:"center",children:[t(Re,{label:a.name,checked:a.spreadWithDelimiter!==null,onChange:(b,w)=>p(v,w?r:null)}),t(Le,{className:a.spreadWithDelimiter!==null?"enabled":"",children:t(B,{value:a.spreadWithDelimiter??"",onChange:b=>p(v,b.target.value)})})]},a.name)),[l,m,p,r]);return C(k,{children:[t(Se,{className:$,id:c,onClick:x,children:"Multi-value Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${c}`,onDismiss:o,setInitialFocus:!0,children:C(ke,{vertical:!0,children:[C(we,{vertical:!0,children:[C(f,{justify:"space-around",align:"center",children:[t(H,{onClick:()=>y(!0),children:"All"}),t(Ae,{children:"|"}),t(H,{onClick:()=>y(!1),children:"None"})]}),C(ze,{align:"center",justify:"space-between",children:[t(de,{htmlFor:"default-delimiter",children:"Default Delimiter: "}),t(Me,{children:t(B,{type:"text",id:"default-delimiter",onChange:h,value:r})})]})]}),t(Ie,{vertical:!0,children:t("div",{children:g})})]})})]})});X.displayName="MultiValueColumns";const Se=i.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
	&.disabled {
		color: ${e=>e.theme.palette.neutralTertiary};
		&:hover {
			cursor: auto;
		}
	}
`,ke=i(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,we=i(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,H=i.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Ae=i.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Ie=i(f)`
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
`,Pe=i(f)`
	padding: ${e=>e.theme.spacing.s2} 0;
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
`,Le=i.div`
	width: 50px;
	visibility: hidden;
	&.enabled {
		visibility: visible;
	}
`,Re=i(j)`
	padding: ${e=>e.theme.spacing.s2};
`,ze=i(f)`
	margin-top: ${e=>e.theme.spacing.m};

	& label {
		font-weight: normal;
		letter-spacing: 1.25px;
		font-size: ${e=>e.theme.fonts.medium.fontSize};
		/* color: ${e=>e.theme.palette.neutralTertiary}; */
	}
`,Me=i.div`
	margin-left: ${e=>e.theme.spacing.m};
`,B=i.input`
	width: 100%;
	height: 18px;
	border: 1px solid ${e=>e.theme.palette.themeLight};
	border-radius: ${e=>e.theme.effects.roundedCorner2};
	&:focus {
		outline: 1px solid ${e=>e.theme.palette.themePrimary};
	}
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function je(e){return s.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],use:!o.headers[n].use},...o.headers.slice(n+1)]}))},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Y=s.exports.memo(function(){const[n,{toggle:o}]=A(!1),c=I("select-columns-id"),[r,d]=S(),l=je(d),u=s.exports.useCallback(m=>{const x=r.headers.map($=>({...$,use:m}));d($=>({...$,headers:x}))},[r,d]),h=s.exports.useMemo(()=>r.headers.map((m,x)=>t(Ve,{label:m.name,checked:m.use,onChange:()=>l(x)},m.fieldName)),[r,l]);return C(k,{children:[t(De,{id:c,onClick:o,children:"Select Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${c}`,onDismiss:o,setInitialFocus:!0,children:C(We,{vertical:!0,children:[C(Ne,{justify:"space-around",align:"center",children:[t(Z,{onClick:()=>u(!0),children:"All"}),t(Oe,{children:"|"}),t(Z,{onClick:()=>u(!1),children:"None"})]}),t(Te,{vertical:!0,children:t("div",{children:h})})]})})]})});Y.displayName="SelectColumns";const De=i.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,We=i(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ne=i(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Z=i.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Oe=i.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Te=i(f)`
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
`,Ve=i(j)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Fe(e){return s.exports.useMemo(()=>e.columnsWithZeros?.map(n=>e.headers[n]).filter(n=>n.use).map(n=>n.name),[e])}function He(e){return s.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],hasSensitiveZeros:!o.headers[n].hasSensitiveZeros},...o.headers.slice(n+1)]}))},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const K=s.exports.memo(function(){const[n,{toggle:o}]=A(!1),c=I("sensitive-zeros-id"),[r,d]=S(),l=Fe(r),u=s.exports.useCallback(()=>{!l?.length||o()},[l,o]),h=s.exports.useMemo(()=>l?.length?"":"disabled",[l]),m=He(d),x=s.exports.useCallback(p=>{const y=r.headers.map(g=>l?.includes(g.name)?{...g,hasSensitiveZeros:p}:g);d(g=>({...g,headers:y}))},[r,d,l]),$=s.exports.useMemo(()=>r.headers.map((p,y)=>!p.use||!l?.includes(p.name)?null:t(qe,{label:p.name,checked:p.hasSensitiveZeros,onChange:()=>m(y)},p.fieldName)),[r,m,l]);return C(k,{children:[t(Be,{className:h,id:c,onClick:u,children:"Sensitive Zeros"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${c}`,onDismiss:o,setInitialFocus:!0,children:C(Ze,{vertical:!0,children:[C(Ge,{justify:"space-around",align:"center",children:[t(G,{onClick:()=>x(!0),children:"All"}),t(Ee,{children:"|"}),t(G,{onClick:()=>x(!1),children:"None"})]}),t(Qe,{vertical:!0,children:t("div",{children:$})})]})})]})});K.displayName="SensitiveZeros";const Be=i.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
	&.disabled {
		color: ${e=>e.theme.palette.neutralTertiary};
		&:hover {
			cursor: auto;
		}
	}
`,Ze=i(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ge=i(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,G=i.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Ee=i.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Qe=i(f)`
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
`,qe=i(j)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ee=s.exports.memo(function(){const[n,{toggle:o}]=A(!1),c=I("select-columns-id"),[r,d]=S(),l=s.exports.useMemo(()=>r.headers.filter(p=>p.use),[r]),u=s.exports.useMemo(()=>r.subjectId,[r]),h=s.exports.useMemo(()=>l.length?"":"disabled",[l]),m=s.exports.useCallback(()=>{!l.length||o()},[l,o]),x=s.exports.useCallback(p=>{d(y=>({...y,subjectId:p===y.subjectId?void 0:p}))},[d]),$=s.exports.useMemo(()=>l.map((p,y)=>C(Xe,{onClick:()=>x(p.name),className:p.name===u?"activeListItem":"",children:[t(he,{iconName:"CheckMark"}),p.name]},p.name)),[u,l,x]);return C(k,{children:[t(_e,{className:h,id:c,onClick:m,children:"Subject ID"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${c}`,onDismiss:o,setInitialFocus:!0,children:t(Ue,{vertical:!0,children:t(Je,{vertical:!0,children:t("div",{children:$})})})})]})});ee.displayName="SubjectId";const _e=i.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
	&.disabled {
		color: ${e=>e.theme.palette.neutralTertiary};
		&:hover {
			cursor: auto;
		}
	}
`,Ue=i(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Je=i(f)`
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
`,Xe=i.div`
	padding: ${e=>e.theme.spacing.s1};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	&:hover {
		cursor: pointer;
		background: ${e=>e.theme.palette.neutralLight};
	}
	& i {
		padding: 0 ${e=>e.theme.spacing.s1};
		visibility: hidden;
	}
	&.activeListItem {
		background: ${e=>e.theme.palette.neutralLight};
		& i {
			visibility: visible;
		}
	}
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const te=s.exports.memo(function(){return C(Ye,{justify:"center",align:"center",wrap:!0,children:[t(Y,{}),t(R,{children:"|"}),t(ee,{}),t(R,{children:"|"}),t(K,{}),t(R,{children:"|"}),t(X,{}),t(J,{})]})});te.displayName="SelectCommands";const Ye=i(f)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,R=i.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const ne=s.exports.memo(function(){const[n]=S(),o=pe(),c=s.exports.useMemo(()=>n.headers.filter(r=>r.use).map(r=>r.name),[n]);return c.length?t(Ke,{children:t(ge,{table:n.table,metadata:n.metadata,features:{histogramColumnHeaders:!0,statsColumnHeaders:!0},isSortable:!0,isHeadersFixed:!0,showColumnBorders:!0,visibleColumns:c,styles:{root:{height:800,border:`1px solid ${o.palette.neutralLight}`}}})}):t(k,{})});ne.displayName="TablePreview";const Ke=i.div`
	height: 100%;
	min-height: 150px;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const et=s.exports.memo(function(){return C(tt,{vertical:!0,children:[t(te,{}),C(nt,{vertical:!0,children:[t(_,{}),t(U,{}),t(ne,{})]})]})});et.displayName="SelectPage";const tt=i(f)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,nt=i(f)`
	height: 100%;
	overflow-y: auto;
`;export{et as SelectPage,et as default};
//# sourceMappingURL=index.a286902e.js.map
