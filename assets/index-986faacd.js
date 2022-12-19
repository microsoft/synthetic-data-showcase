import{r as i,l as r,i as f,j as t,F as k,a4 as ne,ar as ie,P as se}from"./Pages-831d0413.js";import{K as E,J as b,bi as D,u as oe,N as S,b as re,bo as Q,Q as N,aB as R,g as I,h as A,a1 as P,a3 as L,bQ as j,i as ae,t as le}from"./tables-0c0707bd.js";import{h as ce,f as ue,_ as me,B as de,p as he}from"./SynthesisDropdown-fefedb26.js";import{S as pe,f as ge}from"./InfoTooltip-19d830f5.js";import{i as T,j as be}from"./useSpinButtonOnChange-8cd874e5.js";function fe(){const[e]=E();return i.exports.useCallback(async(n,o,m,s)=>{if(e){const d=ce(n).map(u=>u.name);return(await e.instance).generateAggregateStatistics(n.table.toCSV({delimiter:n.delimiter}),{delimiter:n.delimiter,subjectId:n.subjectId,useColumns:d,sensitiveZeros:n.headers.filter(u=>u.hasSensitiveZeros).map(u=>u.name),recordLimit:o,multiValueColumns:ue(n)},m,s)}},[e])}const Ce=r(b)`
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
`,xe=r(D)`
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
`,M=i.exports.memo(function({selectedKey:n,valuePerKey:o,label:m,containerHeight:s,barHeight:d,tooltipFormatter:a,onClick:u}){const h=i.exports.useMemo(()=>me(o).keys().sortBy(g=>-o[g]).value(),[o]),c=i.exports.useMemo(()=>h.map(g=>o[g].toFixed(2)),[h,o]),y=i.exports.useCallback((g,l,v)=>{const C=l&&l[0],w=C?h[C.index]:void 0;w&&u?.(w)},[h,u]),x=oe(),p=i.exports.useMemo(()=>{const g=x.scales().nominal().toArray()[0],l=x.scales().nominalBold().toArray()[0];return h.map(v=>v===n?l:g)},[h,x,n]),$=i.exports.useMemo(()=>{const g=x.scales().greys().toArray();return h.map(l=>n===l?g[0]:g[80])},[h,x,n]);return f(b,{vertical:!0,justify:"center",children:[t(D,{align:"center",children:m}),t(xe,{style:{maxHeight:s},children:t(de,{height:Math.max(d*c.length,d),data:{labels:h,datasets:[{label:m,data:c,xAxisID:"xAxis",yAxisID:"yAxis",backgroundColor:p}]},plugins:[he,{id:"event-catcher",beforeEvent(g,l,v){if(l.event.type==="mousemove"){const C=g.getActiveElements();g.canvas.style.cursor=C&&C[0]?"pointer":"default"}}}],options:{plugins:{legend:{display:!1},datalabels:{anchor:"start",align:"end",offset:5,formatter:g=>`${g} %`,color:$},tooltip:{callbacks:{label:a}}},indexAxis:"y",scales:{xAxis:{display:!1,grid:{display:!1}},yAxis:{grid:{display:!1}}},onClick:y}})})]})});M.displayName="ContributionChart";const q=i.exports.memo(function(){const n=i.exports.useRef(""),[o]=E(),[m]=S(),[s,d]=i.exports.useState(null),[a,u]=i.exports.useState(!1),[,h]=re(),[c]=Q(),y=fe(),x=i.exports.useCallback($=>`The attributes of this column make ${s?.percentageOfRecordsWithRareCombinationsPerColumn[$.label].toFixed(2)}% of their containing records linkable, on average`,[s]),p=i.exports.useCallback($=>`This attribute makes ${s?.percentageOfRecordsWithRareCombinationsPerAttribute[$.label].toFixed(2)}% of its containing records linkable`,[s]);return i.exports.useEffect(()=>{u(!0),h(void 0),y(m,c.recordLimit,c.reportingLength,c.resolution).then(async $=>{const g=await $?.id;n.current=g;try{const l=await await $?.promise??null;g===n.current&&d(l)}catch(l){n.current!==""&&(h(l),d(null))}finally{n.current!==""&&u(!1)}})},[y,m,c.recordLimit,c.reportingLength,c.resolution,d,u,h]),i.exports.useEffect(()=>()=>{o?.instance.forceAggregateStatisticsWorkerToTerminate(),n.current=""},[o]),t(Ce,{vertical:!0,align:"center",children:a?t(pe,{}):s&&s.numberOfRecordsWithRareCombinations>0?f(k,{children:[t(F,{children:t("b",{children:`Considering all combinations of attributes up to length ${c.reportingLength} (Aggregation Limit), ${(s.numberOfRecordsWithRareCombinations*100/s.numberOfRecords).toFixed(0)}% of subjects (${s.numberOfRecordsWithRareCombinations}/${s.numberOfRecords}) are linkable via rare attribute combinations below ${c.resolution} (Privacy Resolution)`})}),f($e,{justify:"space-between",children:[t(V,{children:t(M,{valuePerKey:s.percentageOfRecordsWithRareCombinationsPerColumn,label:"Most linkable columns",containerHeight:220,barHeight:10,tooltipFormatter:x})}),t(V,{children:t(M,{valuePerKey:s.percentageOfRecordsWithRareCombinationsPerAttribute,label:"Most linkable attributes",containerHeight:220,barHeight:10,tooltipFormatter:p})})]})]}):t(F,{children:"No rare attribute combinations (below the privacy resolution) based on the current parameters"})})});q.displayName="AggregateStatistics";const U=i.exports.memo(function(){const[n]=S(),o=i.exports.useMemo(()=>{const m=n.subjectId,s=n.table.numRows(),d=n.headers.reduce((a,u)=>{const h=n.metadata?.columns[u.name];return u.use&&h&&u.name!==m&&(a.count+=1,a.unique+=h.stats?.distinct??0,a.combinations*=h.stats?.distinct??1),a},{count:0,unique:0,combinations:1});return d.count?`${d.count} columns and ${s} records.`:"0 columns selected"},[n]);return t(ye,{justify:"center",children:o})});U.displayName="InfoBar";const ye=r(b)`
	padding: ${e=>e.theme.spacing.m};
	font-size: ${e=>e.theme.fonts.large.fontSize};
`,_=i.exports.memo(function(){const[n]=Q(),o=T(N("resolution")),m=T(N("reportingLength"));return f(b,{align:"center",children:[t(B,{children:"Privacy Resolution"}),t(W,{labelPosition:R.top,min:1,step:1,value:n.resolution.toString(),onChange:o}),t(B,{children:"Aggregation Limit"}),t(W,{labelPosition:R.top,min:1,step:1,value:n.reportingLength.toString(),onChange:m})]})});_.displayName="AggregationControls";const W=r(ge)`
	width: 60px;
`,B=r.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
`,J=i.exports.memo(function(){const[n,{toggle:o}]=I(!1),m=A("multi-value-columns"),[s,d]=i.exports.useState(";"),[a,u]=S(),h=i.exports.useCallback(l=>{d(l.target.value??";")},[d]),c=i.exports.useMemo(()=>a.headers.filter(l=>l.name!==a.subjectId&&l.use&&a.metadata?.columns[l.name].type==="string").map(l=>l.name),[a]),y=i.exports.useCallback(()=>{c.length&&o()},[c,o]),x=i.exports.useMemo(()=>c.length?"":"disabled",[c]),p=i.exports.useCallback((l,v)=>{u(C=>({...C,headers:[...C.headers.slice(0,l),{...C.headers[l],spreadWithDelimiter:v},...C.headers.slice(l+1)]}))},[u]),$=i.exports.useCallback(l=>{const v=a.headers.map(C=>c?.includes(C.name)?{...C,spreadWithDelimiter:l?C.spreadWithDelimiter??s:null}:C);u(C=>({...C,headers:v}))},[a,u,s,c]),g=i.exports.useMemo(()=>a.headers.map((l,v)=>!l.use||!c?.includes(l.name)?null:f(Ae,{className:(v+1)%2!==0?"odd":"",justify:"space-between",align:"center",children:[t(Le,{label:l.name,checked:l.spreadWithDelimiter!==null,onChange:(C,w)=>p(v,w?s:null)}),t(Pe,{className:l.spreadWithDelimiter!==null?"enabled":"",children:t(O,{value:l.spreadWithDelimiter??"",onChange:C=>p(v,C.target.value)})})]},l.name)),[a,c,p,s]);return f(k,{children:[t(ve,{className:x,id:m,onClick:y,children:"Multi-value Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${m}`,onDismiss:o,setInitialFocus:!0,children:f(Se,{vertical:!0,children:[f(ke,{vertical:!0,children:[f(b,{justify:"space-around",align:"center",children:[t(H,{onClick:()=>$(!0),children:"All"}),t(we,{children:"|"}),t(H,{onClick:()=>$(!1),children:"None"})]}),f(ze,{align:"center",justify:"space-between",children:[t(ne,{htmlFor:"default-delimiter",children:"Default Delimiter: "}),t(Me,{children:t(O,{type:"text",id:"default-delimiter",onChange:h,value:s})})]})]}),t(Ie,{vertical:!0,children:t("div",{children:g})})]})})]})});J.displayName="MultiValueColumns";const ve=r.span`
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
`;function De(e){return i.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],use:!o.headers[n].use},...o.headers.slice(n+1)]}))},[e])}const X=i.exports.memo(function(){const[n,{toggle:o}]=I(!1),m=A("select-columns-id"),[s,d]=S(),a=De(d),u=i.exports.useCallback(c=>{const y=s.headers.map(x=>({...x,use:c}));d(x=>({...x,headers:y}))},[s,d]),h=i.exports.useMemo(()=>s.headers.map((c,y)=>t(Ve,{label:c.name,checked:c.use,onChange:()=>a(y)},c.fieldName)),[s,a]);return f(k,{children:[t(je,{id:m,onClick:o,children:"Select Columns"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${m}`,onDismiss:o,setInitialFocus:!0,children:f(Ne,{vertical:!0,children:[f(Re,{justify:"space-around",align:"center",children:[t(Z,{onClick:()=>u(!0),children:"All"}),t(Te,{children:"|"}),t(Z,{onClick:()=>u(!1),children:"None"})]}),t(Fe,{vertical:!0,children:t("div",{children:h})})]})})]})});X.displayName="SelectColumns";const je=r.span`
	font-size: ${e=>e.theme.fonts.mediumPlus.fontSize};
	/* font-weight: bold; */
	letter-spacing: 1.25px;
	padding: ${e=>e.theme.spacing.m};
	color: ${e=>e.theme.palette.themePrimary};
	&:hover {
		cursor: pointer;
	}
`,Ne=r(b)`
	min-width: 250px;
	max-height: 400px;
	border: 1px solid ${e=>e.theme.palette.neutralLight};
	/* background: ${e=>e.theme.palette.neutralQuaternary}; */
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,Re=r(b)`
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
`;function We(e){return i.exports.useMemo(()=>e.columnsWithZeros?.map(n=>e.headers[n]).filter(n=>n.use).map(n=>n.name),[e])}function Be(e){return i.exports.useCallback(n=>{e(o=>({...o,headers:[...o.headers.slice(0,n),{...o.headers[n],hasSensitiveZeros:!o.headers[n].hasSensitiveZeros},...o.headers.slice(n+1)]}))},[e])}const Y=i.exports.memo(function(){const[n,{toggle:o}]=I(!1),m=A("sensitive-zeros-id"),[s,d]=S(),a=We(s),u=i.exports.useCallback(()=>{a?.length&&o()},[a,o]),h=i.exports.useMemo(()=>a?.length?"":"disabled",[a]),c=Be(d),y=i.exports.useCallback(p=>{const $=s.headers.map(g=>a?.includes(g.name)?{...g,hasSensitiveZeros:p}:g);d(g=>({...g,headers:$}))},[s,d,a]),x=i.exports.useMemo(()=>s.headers.map((p,$)=>!p.use||!a?.includes(p.name)?null:t(Qe,{label:p.name,checked:p.hasSensitiveZeros,onChange:()=>c($)},p.fieldName)),[s,c,a]);return f(k,{children:[t(He,{className:h,id:m,onClick:u,children:"Sensitive Zeros"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${m}`,onDismiss:o,setInitialFocus:!0,children:f(Oe,{vertical:!0,children:[f(Ze,{justify:"space-around",align:"center",children:[t(G,{onClick:()=>y(!0),children:"All"}),t(Ge,{children:"|"}),t(G,{onClick:()=>y(!1),children:"None"})]}),t(Ee,{vertical:!0,children:t("div",{children:x})})]})})]})});Y.displayName="SensitiveZeros";const He=r.span`
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
`,K=i.exports.memo(function(){const[n,{toggle:o}]=I(!1),m=A("select-columns-id"),[s,d]=S(),a=i.exports.useMemo(()=>s.headers.filter(p=>p.use),[s]),u=i.exports.useMemo(()=>s.subjectId,[s]),h=i.exports.useMemo(()=>a.length?"":"disabled",[a]),c=i.exports.useCallback(()=>{a.length&&o()},[a,o]),y=i.exports.useCallback(p=>{d($=>({...$,subjectId:p===$.subjectId?void 0:p}))},[d]),x=i.exports.useMemo(()=>a.map((p,$)=>f(Je,{onClick:()=>y(p.name),className:p.name===u?"activeListItem":"",children:[t(ae,{iconName:"CheckMark"}),p.name]},p.name)),[u,a,y]);return f(k,{children:[t(qe,{className:h,id:m,onClick:c,children:"Subject ID"}),n&&t(P,{role:"dialog",gapSpace:0,isBeakVisible:!1,directionalHint:L.bottomCenter,target:`#${m}`,onDismiss:o,setInitialFocus:!0,children:t(Ue,{vertical:!0,children:t(_e,{vertical:!0,children:t("div",{children:x})})})})]})});K.displayName="SubjectId";const qe=r.span`
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
`,ee=i.exports.memo(function(){return f(Xe,{justify:"center",align:"center",wrap:!0,children:[t(X,{}),t(z,{children:"|"}),t(K,{}),t(z,{children:"|"}),t(Y,{}),t(z,{children:"|"}),t(J,{}),t(_,{})]})});ee.displayName="SelectCommands";const Xe=r(b)`
	border-bottom: 1px solid ${e=>e.theme.palette.neutralLight};
	box-shadow: ${e=>e.theme.effects.elevation4};
`,z=r.span`
	font-size: ${e=>e.theme.fonts.smallPlus.fontSize};
	color: ${e=>e.theme.palette.neutralTertiary};
`,te=i.exports.memo(function(){const[n]=S(),o=le(),m=i.exports.useMemo(()=>n.headers.filter(s=>s.use).map(s=>s.name),[n]);return m.length?t(Ye,{children:t(be,{table:n.table,metadata:n.metadata,features:{histogramColumnHeaders:!0,statsColumnHeaders:!0},isSortable:!0,isHeadersFixed:!0,showColumnBorders:!0,visibleColumns:m,styles:{root:{height:800,border:`1px solid ${o.palette.neutralLight}`}}})}):t(k,{})});te.displayName="TablePreview";const Ye=r.div`
	height: 100%;
	min-height: 150px;
`,Ke=i.exports.memo(function(){return f(et,{vertical:!0,children:[t(ie,{children:se.Select.description}),t(ee,{}),f(tt,{vertical:!0,children:[t(q,{}),t(U,{}),t(te,{})]})]})});Ke.displayName="SelectPage";const et=r(b)`
	height: 100%;
	overflow-y: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`,tt=r(b)`
	height: 100%;
	overflow-y: auto;
`;export{Ke as SelectPage,Ke as default};
//# sourceMappingURL=index-986faacd.js.map
