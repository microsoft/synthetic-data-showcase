import{cf as E,r as s,cg as ne,ch as se,aB as r,cc as b,ci as D,cj as ie,bE as oe,I as f,j as t,ck as re,cl as ae,cm as S,cn as le,co as Q,c4 as ce,cp as k,cq as R,cr as N,b$ as T,b_ as ue,ac as I,aa as A,Q as P,R as L,T as de,a3 as j,ah as me,c6 as he,cs as pe,cb as ge,P as be}from"./main.eb8bef33.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function fe(){const[e]=E();return s.exports.useCallback(async(n,o,d,i)=>{if(e){const m=ne(n).map(u=>u.name);return(await e.instance).generateAggregateStatistics(n.table.toCSV({delimiter:n.delimiter}),{delimiter:n.delimiter,subjectId:n.subjectId,useColumns:m,sensitiveZeros:n.headers.filter(u=>u.hasSensitiveZeros).map(u=>u.name),recordLimit:o,multiValueColumns:se(n)},d,i)}},[e])}/*!
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
 */const M=s.exports.memo(function({selectedKey:n,valuePerKey:o,label:d,containerHeight:i,barHeight:m,tooltipFormatter:a,onClick:u}){const h=s.exports.useMemo(()=>ie(o).keys().sortBy(g=>-o[g]).value(),[o]),c=s.exports.useMemo(()=>h.map(g=>o[g].toFixed(2)),[h,o]),y=s.exports.useCallback((g,l,v)=>{const C=l&&l[0],w=C?h[C.index]:void 0;w&&u?.(w)},[h,u]),x=oe(),p=s.exports.useMemo(()=>{const g=x.scales().nominal().toArray()[0],l=x.scales().nominalBold().toArray()[0];return h.map(v=>v===n?l:g)},[h,x,n]),$=s.exports.useMemo(()=>{const g=x.scales().greys().toArray();return h.map(l=>n===l?g[0]:g[80])},[h,x,n]);return f(b,{vertical:!0,justify:"center",children:[t(D,{align:"center",children:d}),t(xe,{style:{maxHeight:i},children:t(re,{height:Math.max(m*c.length,m),data:{labels:h,datasets:[{label:d,data:c,xAxisID:"xAxis",yAxisID:"yAxis",backgroundColor:p}]},plugins:[ae,{id:"event-catcher",beforeEvent(g,l,v){if(l.event.type==="mousemove"){const C=g.getActiveElements();g.canvas.style.cursor=C&&C[0]?"pointer":"default"}}}],options:{plugins:{legend:{display:!1},datalabels:{anchor:"start",align:"end",offset:5,formatter:g=>`${g} %`,color:$},tooltip:{callbacks:{label:a}}},indexAxis:"y",scales:{xAxis:{display:!1,grid:{display:!1}},yAxis:{grid:{display:!1}}},onClick:y}})})]})});M.displayName="ContributionChart";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const q=s.exports.memo(function(){const n=s.exports.useRef(""),[o]=E(),[d]=S(),[i,m]=s.exports.useState(null),[a,u]=s.exports.useState(!1),[,h]=le(),[c]=Q(),y=fe(),x=s.exports.useCallback($=>`The attributes of this column make ${i?.percentageOfRecordsWithRareCombinationsPerColumn[$.label].toFixed(2)}% of their containing records linkable, on average`,[i]),p=s.exports.useCallback($=>`This attribute makes ${i?.percentageOfRecordsWithRareCombinationsPerAttribute[$.label].toFixed(2)}% of its containing records linkable`,[i]);return s.exports.useEffect(()=>{u(!0),h(void 0),y(d,c.recordLimit,c.reportingLength,c.resolution).then(async $=>{const g=await $?.id;n.current=g;try{const l=await await $?.promise??null;g===n.current&&m(l)}catch(l){n.current!==""&&(h(l),m(null))}finally{n.current!==""&&u(!1)}})},[y,d,c.recordLimit,c.reportingLength,c.resolution,m,u,h]),s.exports.useEffect(()=>()=>{o?.instance.forceAggregateStatisticsWorkerToTerminate(),n.current=""},[o]),t(Ce,{vertical:!0,align:"center",children:a?t(ce,{}):i&&i.numberOfRecordsWithRareCombinations>0?f(k,{children:[t(F,{children:t("b",{children:`Considering all combinations of attributes up to length ${c.reportingLength} (Aggregation Limit), ${(i.numberOfRecordsWithRareCombinations*100/i.numberOfRecords).toFixed(0)}% of subjects (${i.numberOfRecordsWithRareCombinations}/${i.numberOfRecords}) are linkable via rare attribute combinations below ${c.resolution} (Privacy Resolution)`})}),f($e,{justify:"space-between",children:[t(V,{children:t(M,{valuePerKey:i.percentageOfRecordsWithRareCombinationsPerColumn,label:"Most linkable columns",containerHeight:220,barHeight:10,tooltipFormatter:x})}),t(V,{children:t(M,{valuePerKey:i.percentageOfRecordsWithRareCombinationsPerAttribute,label:"Most linkable attributes",containerHeight:220,barHeight:10,tooltipFormatter:p})})]})]}):t(F,{children:"No rare attribute combinations (below the privacy resolution) based on the current parameters"})})});q.displayName="AggregateStatistics";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const _=s.exports.memo(function(){const[n]=S(),o=s.exports.useMemo(()=>{const d=n.subjectId,i=n.table.numRows(),m=n.headers.reduce((a,u)=>{const h=n.metadata?.columns[u.name];return u.use&&h&&u.name!==d&&(a.count+=1,a.unique+=h.stats?.distinct??0,a.combinations*=h.stats?.distinct??1),a},{count:0,unique:0,combinations:1});return m.count?`${m.count} columns and ${i} records.`:"0 columns selected"},[n]);return t(ye,{justify:"center",children:o})});_.displayName="InfoBar";const ye=r(b)`
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const U=s.exports.memo(function(){const[n]=Q(),o=R(N("resolution")),d=R(N("reportingLength"));return f(b,{align:"center",children:[t(B,{children:"Privacy Resolution"}),t(W,{labelPosition:T.top,min:1,step:1,value:n.resolution.toString(),onChange:o}),t(B,{children:"Aggregation Limit"}),t(W,{labelPosition:T.top,min:1,step:1,value:n.reportingLength.toString(),onChange:d})]})});U.displayName="AggregationControls";const W=r(ue)`
	width: 60px;
`,B=r.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const J=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("multi-value-columns"),[i,m]=s.exports.useState(";"),[a,u]=S(),h=s.exports.useCallback(l=>{m(l.target.value??";")},[m]),c=s.exports.useMemo(()=>a.headers.filter(l=>l.name!==a.subjectId&&l.use&&a.metadata?.columns[l.name].type==="string").map(l=>l.name),[a]),y=s.exports.useCallback(()=>{!c.length||o()},[c,o]),x=s.exports.useMemo(()=>c.length?"":"disabled",[c]),p=s.exports.useCallback((l,v)=>{u(C=>({...C,headers:[...C.headers.slice(0,l),{...C.headers[l],spreadWithDelimiter:v},...C.headers.slice(l+1)]}))},[u]),$=s.exports.useCallback(l=>{const v=a.headers.map(C=>c?.includes(C.name)?{...C,spreadWithDelimiter:l?C.spreadWithDelimiter??i:null}:C);u(C=>({...C,headers:v}))},[a,u,i,c]),g=s.exports.useMemo(()=>a.headers.map((l,v)=>!l.use||!c?.includes(l.name)?null:f(Ae,{className:(v+1)%2!==0?"odd":"",justify:"space-between",align:"center",children:[t(Le,{label:l.name,checked:l.spreadWithDelimiter!==null,onChange:(C,w)=>p(v,w?i:null)}),t(Pe,{className:l.spreadWithDelimiter!==null?"enabled":"",children:t(O,{value:l.spreadWithDelimiter??"",onChange:C=>p(v,C.target.value)})})]},l.name)),[a,c,p,i]);return f(k,{children:[t(ve,{className:x,id:d,onClick:y,children:"Multi-value Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(Se,{vertical:!0,children:[f(ke,{vertical:!0,children:[f(b,{justify:"space-around",align:"center",children:[t(H,{onClick:()=>$(!0),children:"All"}),t(we,{children:"|"}),t(H,{onClick:()=>$(!1),children:"None"})]}),f(ze,{align:"center",justify:"space-between",children:[t(de,{htmlFor:"default-delimiter",children:"Default Delimiter: "}),t(Me,{children:t(O,{type:"text",id:"default-delimiter",onChange:h,value:i})})]})]}),t(Ie,{vertical:!0,children:t("div",{children:g})})]})})]})});J.displayName="MultiValueColumns";const ve=r.span`
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
`,Se=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,ke=r(b)`
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
`,O=r.input`
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
 */const X=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("select-columns-id"),[i,m]=S(),a=De(m),u=s.exports.useCallback(c=>{const y=i.headers.map(x=>({...x,use:c}));m(x=>({...x,headers:y}))},[i,m]),h=s.exports.useMemo(()=>i.headers.map((c,y)=>t(Ve,{label:c.name,checked:c.use,onChange:()=>a(y)},c.fieldName)),[i,a]);return f(k,{children:[t(je,{id:d,onClick:o,children:"Select Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(Re,{vertical:!0,children:[f(Ne,{justify:"space-around",align:"center",children:[t(Z,{onClick:()=>u(!0),children:"All"}),t(Te,{children:"|"}),t(Z,{onClick:()=>u(!1),children:"None"})]}),t(Fe,{vertical:!0,children:t("div",{children:h})})]})})]})});X.displayName="SelectColumns";const je=r.span`
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
 */function We(e){return s.exports.useMemo(()=>e.columnsWithZeros?.map(n=>e.headers[n]).filter(n=>n.use).map(n=>n.name),[e])}function Be(e){return s.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],hasSensitiveZeros:!o.headers[n].hasSensitiveZeros},...o.headers.slice(n+1)]}))},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Y=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("sensitive-zeros-id"),[i,m]=S(),a=We(i),u=s.exports.useCallback(()=>{!a?.length||o()},[a,o]),h=s.exports.useMemo(()=>a?.length?"":"disabled",[a]),c=Be(m),y=s.exports.useCallback(p=>{const $=i.headers.map(g=>a?.includes(g.name)?{...g,hasSensitiveZeros:p}:g);m(g=>({...g,headers:$}))},[i,m,a]),x=s.exports.useMemo(()=>i.headers.map((p,$)=>!p.use||!a?.includes(p.name)?null:t(Qe,{label:p.name,checked:p.hasSensitiveZeros,onChange:()=>c($)},p.fieldName)),[i,c,a]);return f(k,{children:[t(He,{className:h,id:d,onClick:u,children:"Sensitive Zeros"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:f(Oe,{vertical:!0,children:[f(Ze,{justify:"space-around",align:"center",children:[t(G,{onClick:()=>y(!0),children:"All"}),t(Ge,{children:"|"}),t(G,{onClick:()=>y(!1),children:"None"})]}),t(Ee,{vertical:!0,children:t("div",{children:x})})]})})]})});Y.displayName="SensitiveZeros";const He=r.span`
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
`,Oe=r(b)`
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
`,Qe=r(j)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const K=s.exports.memo(function(){const[n,{toggle:o}]=I(!1),d=A("select-columns-id"),[i,m]=S(),a=s.exports.useMemo(()=>i.headers.filter(p=>p.use),[i]),u=s.exports.useMemo(()=>i.subjectId,[i]),h=s.exports.useMemo(()=>a.length?"":"disabled",[a]),c=s.exports.useCallback(()=>{!a.length||o()},[a,o]),y=s.exports.useCallback(p=>{m($=>({...$,subjectId:p===$.subjectId?void 0:p}))},[m]),x=s.exports.useMemo(()=>a.map((p,$)=>f(Je,{onClick:()=>y(p.name),className:p.name===u?"activeListItem":"",children:[t(me,{iconName:"CheckMark"}),p.name]},p.name)),[u,a,y]);return f(k,{children:[t(qe,{className:h,id:d,onClick:c,children:"Subject ID"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:t(_e,{vertical:!0,children:t(Ue,{vertical:!0,children:t("div",{children:x})})})})]})});K.displayName="SubjectId";const qe=r.span`
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
`,_e=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ue=r(b)`
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
`,Je=r.div`
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
 */const ee=s.exports.memo(function(){return f(Xe,{justify:"center",align:"center",wrap:!0,children:[t(X,{}),t(z,{children:"|"}),t(K,{}),t(z,{children:"|"}),t(Y,{}),t(z,{children:"|"}),t(J,{}),t(U,{})]})});ee.displayName="SelectCommands";const Xe=r(b)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,z=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const te=s.exports.memo(function(){const[n]=S(),o=he(),d=s.exports.useMemo(()=>n.headers.filter(i=>i.use).map(i=>i.name),[n]);return d.length?t(Ye,{children:t(pe,{table:n.table,metadata:n.metadata,features:{histogramColumnHeaders:!0,statsColumnHeaders:!0},isSortable:!0,isHeadersFixed:!0,showColumnBorders:!0,visibleColumns:d,styles:{root:{height:800,border:`1px solid ${o.palette.neutralLight}`}}})}):t(k,{})});te.displayName="TablePreview";const Ye=r.div`
	height: 100%;
	min-height: 150px;
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Ke=s.exports.memo(function(){return f(et,{vertical:!0,children:[t(ge,{children:be.Select.description}),t(ee,{}),f(tt,{vertical:!0,children:[t(q,{}),t(_,{}),t(te,{})]})]})});Ke.displayName="SelectPage";const et=r(b)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,tt=r(b)`
	height: 100%;
	overflow-y: auto;
`;export{Ke as SelectPage,Ke as default};
//# sourceMappingURL=index.50214736.js.map
