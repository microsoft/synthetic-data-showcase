import{ce as E,r as s,cf as ne,cg as se,az as r,cb as b,ch as D,ci as ie,bC as oe,I as f,o as t,cj as re,ck as ae,cl as k,cm as le,cn as q,c2 as ce,co as S,cp as R,cq as N,bZ as T,bY as ue,aa as I,a8 as A,O as P,P as L,R as de,a1 as j,af as me,c4 as he,cr as pe,c9 as ge,ca as be}from"./main.b1d142bc.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function fe(){const[e]=E();return s.exports.useCallback(async(n,o,d,i)=>{if(e){const m=ne(n).map(c=>c.name);return(await e.instance).generateAggregateStatistics(n.table.toCSV({delimiter:n.delimiter}),{delimiter:n.delimiter,subjectId:n.subjectId,useColumns:m,sensitiveZeros:n.headers.filter(c=>c.hasSensitiveZeros).map(c=>c.name),recordLimit:o,multiValueColumns:se(n)},d,i)}},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Ce=r(b)`
	width: 100%;
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`,F=r.div`
	margin-bottom: ${e=>e.theme.spacing.m};
	text-align: center;
`,$e=r(b)`
	width: 100%;
`,V=r(D)`
	width: calc(50% - ${e=>e.theme.spacing.s1});
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const xe=r(D)`
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
 */const M=s.exports.memo(function({selectedKey:n,valuePerKey:o,label:d,containerHeight:i,barHeight:m,tooltipFormatter:a,onClick:c}){const h=s.exports.useMemo(()=>ie(o).keys().sortBy(g=>-o[g]).value(),[o]),u=s.exports.useMemo(()=>h.map(g=>o[g].toFixed(2)),[h,o]),y=s.exports.useCallback((g,l,v)=>{const C=l&&l[0],w=C?h[C.index]:void 0;w&&c?.(w)},[h,c]),x=oe(),p=s.exports.useMemo(()=>{const g=x.scales().nominal().toArray()[0],l=x.scales().nominalBold().toArray()[0];return h.map(v=>v===n?l:g)},[h,x,n]),$=s.exports.useMemo(()=>{const g=x.scales().greys().toArray();return h.map(l=>n===l?g[0]:g[80])},[h,x,n]);return f(b,{vertical:!0,justify:"center",children:[t(D,{align:"center",children:d}),t(xe,{style:{maxHeight:i},children:t(re,{height:Math.max(m*u.length,m),data:{labels:h,datasets:[{label:d,data:u,xAxisID:"xAxis",yAxisID:"yAxis",backgroundColor:p}]},plugins:[ae,{id:"event-catcher",beforeEvent(g,l,v){if(l.event.type==="mousemove"){const C=g.getActiveElements();g.canvas.style.cursor=C&&C[0]?"pointer":"default"}}}],options:{plugins:{legend:{display:!1},datalabels:{anchor:"start",align:"end",offset:5,formatter:g=>`${g} %`,color:$},tooltip:{callbacks:{label:a}}},indexAxis:"y",scales:{xAxis:{display:!1,grid:{display:!1}},yAxis:{grid:{display:!1}}},onClick:y}})})]})});M.displayName="ContributionChart";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Q=s.exports.memo(function(){const n=s.exports.useRef(""),[o]=E(),[d]=k(),[i,m]=s.exports.useState(null),[a,c]=s.exports.useState(!1),[,h]=le(),[u]=q(),y=fe(),x=s.exports.useCallback($=>`The attributes of this column make ${i?.percentageOfRecordsWithRareCombinationsPerColumn[$.label].toFixed(2)}% of their containing records linkable, on average`,[i]),p=s.exports.useCallback($=>`This attribute makes ${i?.percentageOfRecordsWithRareCombinationsPerAttribute[$.label].toFixed(2)}% of its containing records linkable`,[i]);return s.exports.useEffect(()=>{c(!0),h(void 0),y(d,u.recordLimit,u.reportingLength,u.resolution).then(async $=>{const g=await $?.id;n.current=g;try{const l=await await $?.promise??null;g===n.current&&m(l)}catch(l){n.current!==""&&(h(l),m(null))}finally{n.current!==""&&c(!1)}})},[y,d,u.recordLimit,u.reportingLength,u.resolution,m,c,h]),s.exports.useEffect(()=>()=>{o?.instance.forceAggregateStatisticsWorkerToTerminate(),n.current=""},[o]),t(Ce,{vertical:!0,align:"center",children:a?t(ce,{}):i&&i.numberOfRecordsWithRareCombinations>0?f(S,{children:[t(F,{children:t("b",{children:`Privacy risk of selected columns: ${(i.numberOfRecordsWithRareCombinations*100/i.numberOfRecords).toFixed(0)}% of subjects (${i.numberOfRecordsWithRareCombinations}/${i.numberOfRecords}) are linkable via rare attribute combinations (combination count < privacy resolution)`})}),f($e,{justify:"space-between",children:[t(V,{children:t(M,{valuePerKey:i.percentageOfRecordsWithRareCombinationsPerColumn,label:"Most linkable columns",containerHeight:220,barHeight:10,tooltipFormatter:x})}),t(V,{children:t(M,{valuePerKey:i.percentageOfRecordsWithRareCombinationsPerAttribute,label:"Most linkable attributes",containerHeight:220,barHeight:10,tooltipFormatter:p})})]})]}):t(F,{children:"No rare attribute combinations (below the privacy resolution) based on the current parameters"})})});Q.displayName="AggregateStatistics";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const U=s.exports.memo(function(){const[n]=k(),o=s.exports.useMemo(()=>{const d=n.subjectId,i=n.table.numRows(),m=n.headers.reduce((a,c)=>{const h=n.metadata?.columns[c.name];return c.use&&h&&c.name!==d&&(a.count+=1,a.unique+=h.stats?.distinct??0,a.combinations*=h.stats?.distinct??1),a},{count:0,unique:0,combinations:1});return m.count?`${m.count} columns and ${i} records.`:"0 columns selected"},[n]);return t(ye,{justify:"center",children:o})});U.displayName="InfoBar";const ye=r(b)`
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const _=s.exports.memo(function(){const[n]=q(),o=R(N("resolution")),d=R(N("reportingLength"));return f(b,{align:"center",children:[t(O,{children:"Privacy Resolution"}),t(W,{labelPosition:T.top,min:1,step:1,value:n.resolution.toString(),onChange:o}),t(O,{children:"Aggregation Limit"}),t(W,{labelPosition:T.top,min:1,step:1,value:n.reportingLength.toString(),onChange:d})]})});_.displayName="AggregationControls";const W=r(ue)`
	width: 60px;
`,O=r.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Y=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("multi-value-columns"),[i,m]=s.exports.useState(";"),[a,c]=k(),h=s.exports.useCallback(l=>{m(l.target.value??";")},[m]),u=s.exports.useMemo(()=>a.headers.filter(l=>l.name!==a.subjectId&&l.use&&a.metadata?.columns[l.name].type==="string").map(l=>l.name),[a]),y=s.exports.useCallback(()=>{!u.length||o()},[u,o]),x=s.exports.useMemo(()=>u.length?"":"disabled",[u]),p=s.exports.useCallback((l,v)=>{c(C=>({...C,headers:[...C.headers.slice(0,l),{...C.headers[l],spreadWithDelimiter:v},...C.headers.slice(l+1)]}))},[c]),$=s.exports.useCallback(l=>{const v=a.headers.map(C=>u?.includes(C.name)?{...C,spreadWithDelimiter:l?C.spreadWithDelimiter??i:null}:C);c(C=>({...C,headers:v}))},[a,c,i,u]),g=s.exports.useMemo(()=>a.headers.map((l,v)=>!l.use||!u?.includes(l.name)?null:f(Ae,{className:(v+1)%2!==0?"odd":"",justify:"space-between",align:"center",children:[t(Le,{label:l.name,checked:l.spreadWithDelimiter!==null,onChange:(C,w)=>p(v,w?i:null)}),t(Pe,{className:l.spreadWithDelimiter!==null?"enabled":"",children:t(B,{value:l.spreadWithDelimiter??"",onChange:C=>p(v,C.target.value)})})]},l.name)),[a,u,p,i]);return f(S,{children:[t(ve,{className:x,id:d,onClick:y,children:"Multi-value Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(ke,{vertical:!0,children:[f(Se,{vertical:!0,children:[f(b,{justify:"space-around",align:"center",children:[t(H,{onClick:()=>$(!0),children:"All"}),t(we,{children:"|"}),t(H,{onClick:()=>$(!1),children:"None"})]}),f(ze,{align:"center",justify:"space-between",children:[t(de,{htmlFor:"default-delimiter",children:"Default Delimiter: "}),t(Me,{children:t(B,{type:"text",id:"default-delimiter",onChange:h,value:i})})]})]}),t(Ie,{vertical:!0,children:t("div",{children:g})})]})})]})});Y.displayName="MultiValueColumns";const ve=r.span`
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
`,ke=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Se=r(b)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,H=r.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,we=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Ie=r(b)`
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
`,Ae=r(b)`
	padding: ${e=>e.theme.spacing.s2} 0;
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
`,Pe=r.div`
	width: 50px;
	visibility: hidden;
	&.enabled {
		visibility: visible;
	}
`,Le=r(j)`
	padding: ${e=>e.theme.spacing.s2};
`,ze=r(b)`
	margin-top: ${e=>e.theme.spacing.m};

	& label {
		font-weight: normal;
		letter-spacing: 1.25px;
		font-size: ${e=>e.theme.fonts.medium.fontSize};
		/* color: ${e=>e.theme.palette.neutralTertiary}; */
	}
`,Me=r.div`
	margin-left: ${e=>e.theme.spacing.m};
`,B=r.input`
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
 */function De(e){return s.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],use:!o.headers[n].use},...o.headers.slice(n+1)]}))},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const J=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("select-columns-id"),[i,m]=k(),a=De(m),c=s.exports.useCallback(u=>{const y=i.headers.map(x=>({...x,use:u}));m(x=>({...x,headers:y}))},[i,m]),h=s.exports.useMemo(()=>i.headers.map((u,y)=>t(Ve,{label:u.name,checked:u.use,onChange:()=>a(y)},u.fieldName)),[i,a]);return f(S,{children:[t(je,{id:d,onClick:o,children:"Select Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(Re,{vertical:!0,children:[f(Ne,{justify:"space-around",align:"center",children:[t(Z,{onClick:()=>c(!0),children:"All"}),t(Te,{children:"|"}),t(Z,{onClick:()=>c(!1),children:"None"})]}),t(Fe,{vertical:!0,children:t("div",{children:h})})]})})]})});J.displayName="SelectColumns";const je=r.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,Re=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ne=r(b)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Z=r.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Te=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Fe=r(b)`
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
`,Ve=r(j)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function We(e){return s.exports.useMemo(()=>e.columnsWithZeros?.map(n=>e.headers[n]).filter(n=>n.use).map(n=>n.name),[e])}function Oe(e){return s.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],hasSensitiveZeros:!o.headers[n].hasSensitiveZeros},...o.headers.slice(n+1)]}))},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const X=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("sensitive-zeros-id"),[i,m]=k(),a=We(i),c=s.exports.useCallback(()=>{!a?.length||o()},[a,o]),h=s.exports.useMemo(()=>a?.length?"":"disabled",[a]),u=Oe(m),y=s.exports.useCallback(p=>{const $=i.headers.map(g=>a?.includes(g.name)?{...g,hasSensitiveZeros:p}:g);m(g=>({...g,headers:$}))},[i,m,a]),x=s.exports.useMemo(()=>i.headers.map((p,$)=>!p.use||!a?.includes(p.name)?null:t(qe,{label:p.name,checked:p.hasSensitiveZeros,onChange:()=>u($)},p.fieldName)),[i,u,a]);return f(S,{children:[t(He,{className:h,id:d,onClick:c,children:"Sensitive Zeros"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(Be,{vertical:!0,children:[f(Ze,{justify:"space-around",align:"center",children:[t(G,{onClick:()=>y(!0),children:"All"}),t(Ge,{children:"|"}),t(G,{onClick:()=>y(!1),children:"None"})]}),t(Ee,{vertical:!0,children:t("div",{children:x})})]})})]})});X.displayName="SensitiveZeros";const He=r.span`
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
`,Be=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ze=r(b)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,G=r.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Ge=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Ee=r(b)`
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
`,qe=r(j)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const K=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("select-columns-id"),[i,m]=k(),a=s.exports.useMemo(()=>i.headers.filter(p=>p.use),[i]),c=s.exports.useMemo(()=>i.subjectId,[i]),h=s.exports.useMemo(()=>a.length?"":"disabled",[a]),u=s.exports.useCallback(()=>{!a.length||o()},[a,o]),y=s.exports.useCallback(p=>{m($=>({...$,subjectId:p===$.subjectId?void 0:p}))},[m]),x=s.exports.useMemo(()=>a.map((p,$)=>f(Ye,{onClick:()=>y(p.name),className:p.name===c?"activeListItem":"",children:[t(me,{iconName:"CheckMark"}),p.name]},p.name)),[c,a,y]);return f(S,{children:[t(Qe,{className:h,id:d,onClick:u,children:"Subject ID"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:t(Ue,{vertical:!0,children:t(_e,{vertical:!0,children:t("div",{children:x})})})})]})});K.displayName="SubjectId";const Qe=r.span`
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
`,Ue=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,_e=r(b)`
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
`,Ye=r.div`
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
 */const ee=s.exports.memo(function(){return f(Je,{justify:"center",align:"center",wrap:!0,children:[t(J,{}),t(z,{children:"|"}),t(K,{}),t(z,{children:"|"}),t(X,{}),t(z,{children:"|"}),t(Y,{}),t(_,{})]})});ee.displayName="SelectCommands";const Je=r(b)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,z=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const te=s.exports.memo(function(){const[n]=k(),o=he(),d=s.exports.useMemo(()=>n.headers.filter(i=>i.use).map(i=>i.name),[n]);return d.length?t(Xe,{children:t(pe,{table:n.table,metadata:n.metadata,features:{histogramColumnHeaders:!0,statsColumnHeaders:!0},isSortable:!0,isHeadersFixed:!0,showColumnBorders:!0,visibleColumns:d,styles:{root:{height:800,border:`1px solid ${o.palette.neutralLight}`}}})}):t(S,{})});te.displayName="TablePreview";const Xe=r.div`
	height: 100%;
	min-height: 150px;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Ke=s.exports.memo(function(){return f(et,{vertical:!0,children:[t(ge,{children:be.Select.description}),t(ee,{}),f(tt,{vertical:!0,children:[t(Q,{}),t(U,{}),t(te,{})]})]})});Ke.displayName="SelectPage";const et=r(b)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,tt=r(b)`
	height: 100%;
	overflow-y: auto;
`;export{Ke as SelectPage,Ke as default};
//# sourceMappingURL=index.78ca4527.js.map
