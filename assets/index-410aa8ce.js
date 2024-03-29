import{ci as q,r as i,cj as se,ck as oe,b6 as a,cf as f,cl as j,cm as ae,bD as re,cn as le,co as ce,b$ as C,j as t,cp as ue,cq as de,cr as k,cs as me,ct as U,c7 as he,cu as w,cv as T,cw as F,c2 as V,c1 as ge,ab as A,a9 as P,O as L,Q as z,S as pe,a2 as N,ag as be,c9 as fe,cx as Ce,ce as $e,P as ve}from"./main-6eb3ce9b.js";/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function ye(){const[e]=q();return i.useCallback(async(n,o,d,s)=>{if(e){const h=se(n).map(c=>c.name);return(await e.instance).generateAggregateStatistics(n.table.toCSV({delimiter:n.delimiter}),{delimiter:n.delimiter,subjectId:n.subjectId,useColumns:h,sensitiveZeros:n.headers.filter(c=>c.hasSensitiveZeros).map(c=>c.name),recordLimit:o,multiValueColumns:oe(n)},d,s)}},[e])}/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const Se=a(f)`
	width: 100%;
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`,W=a.div`
	margin-bottom: ${e=>e.theme.spacing.m};
	text-align: center;
`,ke=a(f)`
	width: 100%;
`,O=a(j)`
	width: calc(50% - ${e=>e.theme.spacing.s1});
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */const we=a(j)`
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
`,M=i.memo(function({selectedKey:n,valuePerKey:o,label:d,containerHeight:s,barHeight:h,tooltipFormatter:r,onClick:c}){const g=i.useMemo(()=>ae(o).keys().sortBy(b=>-o[b]).value(),[o]),l=i.useMemo(()=>g.map(b=>o[b].toFixed(2)),[g,o]),v=i.useCallback((b,p,x)=>{const I=p&&p[0],R=I?g[I.index]:void 0;R&&c?.(R)},[g,c]),y=re(),m=le(),$=ce(),S=i.useMemo(()=>{const b=m[0],p=$[0];return g.map(x=>x===n?p:b)},[g,m,$,n]),u=i.useMemo(()=>{const b=y.scales().greys().toArray();return g.map(p=>n===p?b[0]:b[80])},[g,y,n]);return C(f,{vertical:!0,justify:"center",children:[t(j,{align:"center",children:d}),t(we,{style:{maxHeight:s},children:t("div",{style:{height:Math.max(h*l.length,h)},children:t(ue,{data:{labels:g,datasets:[{label:d,data:l,xAxisID:"xAxis",yAxisID:"yAxis",backgroundColor:S}]},plugins:[de,{id:"event-catcher",beforeEvent(b,p,x){if(p.event.type==="mousemove"){const I=b.getActiveElements();b.canvas.style.cursor=I&&I[0]?"pointer":"default"}}}],options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:!1},datalabels:{anchor:"start",align:"end",offset:5,formatter:b=>`${b} %`,color:u},tooltip:{callbacks:{label:r}}},indexAxis:"y",scales:{xAxis:{display:!1,grid:{display:!1}},yAxis:{grid:{display:!1}}},onClick:v}})})})]})});M.displayName="ContributionChart";const _=i.memo(function(){const n=i.useRef(""),[o]=q(),[d]=k(),[s,h]=i.useState(null),[r,c]=i.useState(!1),[,g]=me(),[l]=U(),v=ye(),y=i.useCallback($=>`The attributes of this column make ${s?.percentageOfRecordsWithRareCombinationsPerColumn[$.label].toFixed(2)}% of their containing records linkable, on average`,[s]),m=i.useCallback($=>`This attribute makes ${s?.percentageOfRecordsWithRareCombinationsPerAttribute[$.label].toFixed(2)}% of its containing records linkable`,[s]);return i.useEffect(()=>{c(!0),g(void 0),v(d,l.recordLimit,l.reportingLength,l.resolution).then(async $=>{const S=await $?.id;n.current=S;try{const u=await await $?.promise??null;S===n.current&&h(u)}catch(u){n.current!==""&&(g(u),h(null))}finally{n.current!==""&&c(!1)}})},[v,d,l.recordLimit,l.reportingLength,l.resolution,h,c,g]),i.useEffect(()=>()=>{o?.instance.forceAggregateStatisticsWorkerToTerminate(),n.current=""},[o]),t(Se,{vertical:!0,align:"center",children:r?t(he,{}):s&&s.numberOfRecordsWithRareCombinations>0?C(w,{children:[t(W,{children:t("b",{children:`Considering all combinations of attributes up to length ${l.reportingLength} (Aggregation Limit), ${(s.numberOfRecordsWithRareCombinations*100/s.numberOfRecords).toFixed(0)}% of subjects (${s.numberOfRecordsWithRareCombinations}/${s.numberOfRecords}) are linkable via rare attribute combinations below ${l.resolution} (Privacy Resolution)`})}),C(ke,{justify:"space-between",children:[t(O,{children:t(M,{valuePerKey:s.percentageOfRecordsWithRareCombinationsPerColumn,label:"Most linkable columns",containerHeight:220,barHeight:30,tooltipFormatter:y})}),t(O,{children:t(M,{valuePerKey:s.percentageOfRecordsWithRareCombinationsPerAttribute,label:"Most linkable attributes",containerHeight:220,barHeight:30,tooltipFormatter:m})})]})]}):t(W,{children:"No rare attribute combinations (below the privacy resolution) based on the current parameters"})})});_.displayName="AggregateStatistics";const J=i.memo(function(){const[n]=k(),o=i.useMemo(()=>{const d=n.subjectId,s=n.table.numRows(),h=n.headers.reduce((r,c)=>{const g=n.metadata?.columns[c.name];return c.use&&g&&c.name!==d&&(r.count+=1,r.unique+=g.stats?.distinct??0,r.combinations*=g.stats?.distinct??1),r},{count:0,unique:0,combinations:1});return h.count?`${h.count} columns and ${s} records.`:"0 columns selected"},[n]);return t(xe,{justify:"center",children:o})});J.displayName="InfoBar";const xe=a(f)`
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`,X=i.memo(function(){const[n]=U(),o=T(F("resolution")),d=T(F("reportingLength"));return C(f,{align:"center",children:[t(H,{children:"Privacy Resolution"}),t(B,{labelPosition:V.top,min:1,step:1,value:n.resolution.toString(),onChange:o}),t(H,{children:"Aggregation Limit"}),t(B,{labelPosition:V.top,min:1,step:1,value:n.reportingLength.toString(),onChange:d})]})});X.displayName="AggregationControls";const B=a(ge)`
	width: 60px;
`,H=a.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
`,Y=i.memo(function(){const[n,{toggle:o}]=A(!1),d=P("multi-value-columns"),[s,h]=i.useState(";"),[r,c]=k(),g=i.useCallback(u=>{h(u.target.value??";")},[h]),l=i.useMemo(()=>r.headers.filter(u=>u.name!==r.subjectId&&u.use&&r.metadata?.columns[u.name].type==="string").map(u=>u.name),[r]),v=i.useCallback(()=>{l.length&&o()},[l,o]),y=i.useMemo(()=>l.length?"":"disabled",[l]),m=i.useCallback((u,b)=>{c(p=>({...p,headers:[...p.headers.slice(0,u),{...p.headers[u],spreadWithDelimiter:b},...p.headers.slice(u+1)]}))},[c]),$=i.useCallback(u=>{const b=r.headers.map(p=>l?.includes(p.name)?{...p,spreadWithDelimiter:u?p.spreadWithDelimiter??s:null}:p);c(p=>({...p,headers:b}))},[r,c,s,l]),S=i.useMemo(()=>r.headers.map((u,b)=>!u.use||!l?.includes(u.name)?null:C(De,{className:(b+1)%2!==0?"odd":"",justify:"space-between",align:"center",children:[t(je,{label:u.name,checked:u.spreadWithDelimiter!==null,onChange:(p,x)=>m(b,x?s:null)}),t(Me,{className:u.spreadWithDelimiter!==null?"enabled":"",children:t(G,{value:u.spreadWithDelimiter??"",onChange:p=>m(b,p.target.value)})})]},u.name)),[r,l,m,s]);return C(w,{children:[t(Ie,{className:y,id:d,onClick:v,children:"Multi-value Columns"}),n&&t(L,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:z.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:C(Ae,{vertical:!0,children:[C(Pe,{vertical:!0,children:[C(f,{justify:"space-around",align:"center",children:[t(Z,{onClick:()=>$(!0),children:"All"}),t(Le,{children:"|"}),t(Z,{onClick:()=>$(!1),children:"None"})]}),C(Ne,{align:"center",justify:"space-between",children:[t(pe,{htmlFor:"default-delimiter",children:"Default Delimiter: "}),t(Re,{children:t(G,{type:"text",id:"default-delimiter",onChange:g,value:s})})]})]}),t(ze,{vertical:!0,children:t("div",{children:S})})]})})]})});Y.displayName="MultiValueColumns";const Ie=a.span`
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
`,Ae=a(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Pe=a(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Z=a.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Le=a.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,ze=a(f)`
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
`,De=a(f)`
	padding: ${e=>e.theme.spacing.s2} 0;
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
`,Me=a.div`
	width: 50px;
	visibility: hidden;
	&.enabled {
		visibility: visible;
	}
`,je=a(N)`
	padding: ${e=>e.theme.spacing.s2};
`,Ne=a(f)`
	margin-top: ${e=>e.theme.spacing.m};

	& label {
		font-weight: normal;
		letter-spacing: 1.25px;
		font-size: ${e=>e.theme.fonts.medium.fontSize};
		/* color: ${e=>e.theme.palette.neutralTertiary}; */
	}
`,Re=a.div`
	margin-left: ${e=>e.theme.spacing.m};
`,G=a.input`
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
 */function Te(e){return i.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],use:!o.headers[n].use},...o.headers.slice(n+1)]}))},[e])}const K=i.memo(function(){const[n,{toggle:o}]=A(!1),d=P("select-columns-id"),[s,h]=k(),r=Te(h),c=i.useCallback(l=>{const v=s.headers.map(y=>({...y,use:l}));h(y=>({...y,headers:v}))},[s,h]),g=i.useMemo(()=>s.headers.map((l,v)=>t(He,{label:l.name,checked:l.use,onChange:()=>r(v)},l.fieldName)),[s,r]);return C(w,{children:[t(Fe,{id:d,onClick:o,children:"Select Columns"}),n&&t(L,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:z.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:C(Ve,{vertical:!0,children:[C(We,{justify:"space-around",align:"center",children:[t(E,{onClick:()=>c(!0),children:"All"}),t(Oe,{children:"|"}),t(E,{onClick:()=>c(!1),children:"None"})]}),t(Be,{vertical:!0,children:t("div",{children:g})})]})})]})});K.displayName="SelectColumns";const Fe=a.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,Ve=a(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,We=a(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,E=a.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Oe=a.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,Be=a(f)`
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
`,He=a(N)`
	padding: ${e=>e.theme.spacing.s2};
`;/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */function Ze(e){return i.useMemo(()=>e.columnsWithZeros?.map(n=>e.headers[n]).filter(n=>n.use).map(n=>n.name),[e])}function Ge(e){return i.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],hasSensitiveZeros:!o.headers[n].hasSensitiveZeros},...o.headers.slice(n+1)]}))},[e])}const ee=i.memo(function(){const[n,{toggle:o}]=A(!1),d=P("sensitive-zeros-id"),[s,h]=k(),r=Ze(s),c=i.useCallback(()=>{r?.length&&o()},[r,o]),g=i.useMemo(()=>r?.length?"":"disabled",[r]),l=Ge(h),v=i.useCallback(m=>{const $=s.headers.map(S=>r?.includes(S.name)?{...S,hasSensitiveZeros:m}:S);h(S=>({...S,headers:$}))},[s,h,r]),y=i.useMemo(()=>s.headers.map((m,$)=>!m.use||!r?.includes(m.name)?null:t(Je,{label:m.name,checked:m.hasSensitiveZeros,onChange:()=>l($)},m.fieldName)),[s,l,r]);return C(w,{children:[t(Ee,{className:g,id:d,onClick:c,children:"Sensitive Zeros"}),n&&t(L,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:z.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:C(Qe,{vertical:!0,children:[C(qe,{justify:"space-around",align:"center",children:[t(Q,{onClick:()=>v(!0),children:"All"}),t(Ue,{children:"|"}),t(Q,{onClick:()=>v(!1),children:"None"})]}),t(_e,{vertical:!0,children:t("div",{children:y})})]})})]})});ee.displayName="SensitiveZeros";const Ee=a.span`
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
`,Qe=a(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,qe=a(f)`
	padding: ${e=>e.theme.spacing.s1};
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,Q=a.span`
	color: ${e=>e.theme.palette.themePrimary};
	font-size: ${e=>e.theme.fonts.medium.fontSize};
	font-weight: bold;
	&:hover {
		cursor: pointer;
	}
`,Ue=a.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,_e=a(f)`
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
`,Je=a(N)`
	padding: ${e=>e.theme.spacing.s2};
`,te=i.memo(function(){const[n,{toggle:o}]=A(!1),d=P("select-columns-id"),[s,h]=k(),r=i.useMemo(()=>s.headers.filter(m=>m.use),[s]),c=i.useMemo(()=>s.subjectId,[s]),g=i.useMemo(()=>r.length?"":"disabled",[r]),l=i.useCallback(()=>{r.length&&o()},[r,o]),v=i.useCallback(m=>{h($=>({...$,subjectId:m===$.subjectId?void 0:m}))},[h]),y=i.useMemo(()=>r.map((m,$)=>C(et,{onClick:()=>v(m.name),className:m.name===c?"activeListItem":"",children:[t(be,{iconName:"CheckMark"}),m.name]},m.name)),[c,r,v]);return C(w,{children:[t(Xe,{className:g,id:d,onClick:l,children:"Subject ID"}),n&&t(L,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:z.bottomCenter,target:`#${d}`,onDismiss:o,setInitialFocus:!0,children:t(Ye,{vertical:!0,children:t(Ke,{vertical:!0,children:t("div",{children:y})})})})]})});te.displayName="SubjectId";const Xe=a.span`
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
`,Ye=a(f)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Ke=a(f)`
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
`,et=a.div`
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
`,ne=i.memo(function(){return C(tt,{justify:"center",align:"center",wrap:!0,children:[t(K,{}),t(D,{children:"|"}),t(te,{}),t(D,{children:"|"}),t(ee,{}),t(D,{children:"|"}),t(Y,{}),t(X,{})]})});ne.displayName="SelectCommands";const tt=a(f)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,D=a.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,ie=i.memo(function(){const[n]=k(),o=fe(),d=i.useMemo(()=>n.headers.filter(s=>s.use).map(s=>s.name),[n]);return d.length?t(nt,{children:t(Ce,{table:n.table,metadata:n.metadata,features:{histogramColumnHeaders:!0,statsColumnHeaders:!0},isSortable:!0,isHeadersFixed:!0,showColumnBorders:!0,visibleColumns:d,styles:{root:{height:800,border:`1px solid ${o.palette.neutralLight}`}}})}):t(w,{})});ie.displayName="TablePreview";const nt=a.div`
	height: 100%;
	min-height: 150px;
`,it=i.memo(function(){return C(st,{vertical:!0,children:[t($e,{children:ve.Select.description}),t(ne,{}),C(ot,{vertical:!0,children:[t(_,{}),t(J,{}),t(ie,{})]})]})});it.displayName="SelectPage";const st=a(f)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,ot=a(f)`
	height: 100%;
	overflow-y: auto;
`;export{it as SelectPage,it as default};
//# sourceMappingURL=index-410aa8ce.js.map
