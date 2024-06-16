import{f as oe,u as C,a as G,j as s,B as k,c as L,r as u,p as U,g as R,e as H,i as ae,k as re,T as B}from"./Text-C7Dh7ZI7.js";import{r as T}from"./index-CDs2tPxN.js";import{u as A,S as w,C as D,f as ie}from"./utils-CCbRh-jk.js";import{U as ne,T as le,L as de,r as ce,u as me,s as ue,a as he,b as ge,I as pe,D as W}from"./index-CbWOtBC6.js";import{u as fe,P as J}from"./routes-DKc0Bs61.js";import{T as K}from"./Title--B-sobQY.js";import{G as _}from"./Group-CXAjiDjl.js";import{A as ve}from"./Avatar-CFaihW2U.js";import{c as E}from"./createReactComponent-BZ78rv5h.js";var q={root:"m_8d3f4000",icon:"m_8d3afb97",loader:"m_302b9fb1",group:"m_1a0f1b21"};const X={orientation:"horizontal"},xe=L((t,{borderWidth:a})=>({group:{"--ai-border-width":u(a)}})),V=oe((t,a)=>{const o=C("ActionIconGroup",X,t),{className:e,style:r,classNames:i,styles:d,unstyled:n,orientation:h,vars:l,borderWidth:c,variant:b,mod:g,...p}=C("ActionIconGroup",X,t),f=G({name:"ActionIconGroup",props:o,classes:q,className:e,style:r,classNames:i,styles:d,unstyled:n,vars:l,varsResolver:xe,rootSelector:"group"});return s.jsx(k,{...f("group"),ref:a,variant:b,mod:[{"data-orientation":h},g],role:"group",...p})});V.classes=q;V.displayName="@mantine/core/ActionIconGroup";const ye={},ke=L((t,{size:a,radius:o,variant:e,gradient:r,color:i,autoContrast:d})=>{const n=t.variantColorResolver({color:i||t.primaryColor,theme:t,gradient:r,variant:e||"filled",autoContrast:d});return{root:{"--ai-size":R(a,"ai-size"),"--ai-radius":o===void 0?void 0:H(o),"--ai-bg":i||e?n.background:void 0,"--ai-hover":i||e?n.hover:void 0,"--ai-hover-color":i||e?n.hoverColor:void 0,"--ai-color":n.color,"--ai-bd":i||e?n.border:void 0}}}),N=U((t,a)=>{const o=C("ActionIcon",ye,t),{className:e,unstyled:r,variant:i,classNames:d,styles:n,style:h,loading:l,loaderProps:c,size:b,color:g,radius:p,__staticSelector:f,gradient:y,vars:j,children:S,disabled:m,"data-disabled":v,autoContrast:z,mod:x,...$}=o,I=G({name:["ActionIcon",f],props:o,className:e,style:h,classes:q,classNames:d,styles:n,unstyled:r,vars:j,varsResolver:ke});return s.jsxs(ne,{...I("root",{active:!m&&!l&&!v}),...$,unstyled:r,variant:i,size:b,disabled:m||l,ref:a,mod:[{loading:l,disabled:m||v},x],children:[s.jsx(le,{mounted:!!l,transition:"slide-down",duration:150,children:te=>s.jsx(k,{component:"span",...I("loader",{style:te}),"aria-hidden":!0,children:s.jsx(de,{color:"var(--ai-color)",size:"calc(var(--ai-size) * 0.55)",...c})})}),s.jsx(k,{component:"span",mod:{loading:l},...I("icon"),children:S})]})});N.classes=q;N.displayName="@mantine/core/ActionIcon";N.Group=V;var ee={root:"m_347db0ec","root--dot":"m_fbd81e3d",label:"m_5add502a",section:"m_91fdda9b"};const be={},je=L((t,{radius:a,color:o,gradient:e,variant:r,size:i,autoContrast:d})=>{const n=t.variantColorResolver({color:o||t.primaryColor,theme:t,gradient:e,variant:r||"filled",autoContrast:d});return{root:{"--badge-height":R(i,"badge-height"),"--badge-padding-x":R(i,"badge-padding-x"),"--badge-fz":R(i,"badge-fz"),"--badge-radius":a===void 0?void 0:H(a),"--badge-bg":o||r?n.background:void 0,"--badge-color":o||r?n.color:void 0,"--badge-bd":o||r?n.border:void 0,"--badge-dot-color":r==="dot"?ae(o,t):void 0}}}),O=U((t,a)=>{const o=C("Badge",be,t),{classNames:e,className:r,style:i,styles:d,unstyled:n,vars:h,radius:l,color:c,gradient:b,leftSection:g,rightSection:p,children:f,variant:y,fullWidth:j,autoContrast:S,circle:m,mod:v,...z}=o,x=G({name:"Badge",props:o,classes:ee,className:r,style:i,classNames:e,styles:d,unstyled:n,vars:h,varsResolver:je});return s.jsxs(k,{variant:y,mod:[{block:j,circle:m},v],...x("root",{variant:y}),ref:a,...z,children:[g&&s.jsx("span",{...x("section"),"data-position":"left",children:g}),s.jsx("span",{...x("label"),children:f}),p&&s.jsx("span",{...x("section"),"data-position":"right",children:p})]})});O.classes=ee;O.displayName="@mantine/core/Badge";var se={root:"m_9e117634"};const Se={},Ie=L((t,{radius:a,fit:o})=>({root:{"--image-radius":a===void 0?void 0:H(a),"--image-object-fit":o}})),Q=U((t,a)=>{const o=C("Image",Se,t),{classNames:e,className:r,style:i,styles:d,unstyled:n,vars:h,onError:l,src:c,radius:b,fit:g,fallbackSrc:p,mod:f,...y}=o,[j,S]=T.useState(!c);T.useEffect(()=>S(!c),[c]);const m=G({name:"Image",classes:se,props:o,className:r,style:i,classNames:e,styles:d,unstyled:n,vars:h,varsResolver:Ie});return j&&p?s.jsx(k,{component:"img",ref:a,src:p,...m("root"),onError:l,mod:["fallback",f],...y}):s.jsx(k,{component:"img",ref:a,...m("root"),src:c,onError:v=>{l==null||l(v),S(!0)},mod:f,...y})});Q.classes=se;Q.displayName="@mantine/core/Image";/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var we=E("outline","bookmarks","IconBookmarks",[["path",{d:"M15 10v11l-5 -3l-5 3v-11a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3z",key:"svg-0"}],["path",{d:"M11 3h5a3 3 0 0 1 3 3v11",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var _e=E("outline","message-plus","IconMessagePlus",[["path",{d:"M8 9h8",key:"svg-0"}],["path",{d:"M8 13h6",key:"svg-1"}],["path",{d:"M12.01 18.594l-4.01 2.406v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v5.5",key:"svg-2"}],["path",{d:"M16 19h6",key:"svg-3"}],["path",{d:"M19 16v6",key:"svg-4"}]]);/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Ne=E("filled","bookmarks-filled","IconBookmarksFilled",[["path",{d:"M12 6a4 4 0 0 1 4 4v11a1 1 0 0 1 -1.514 .857l-4.486 -2.691l-4.486 2.691a1 1 0 0 1 -1.508 -.743l-.006 -.114v-11a4 4 0 0 1 4 -4h4z",key:"svg-0"}],["path",{d:"M16 2a4 4 0 0 1 4 4v11a1 1 0 0 1 -2 0v-11a2 2 0 0 0 -2 -2h-5a1 1 0 0 1 0 -2h5z",key:"svg-1"}]]);/**
 * @license @tabler/icons-react v3.3.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pe=E("filled","heart-filled","IconHeartFilled",[["path",{d:"M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z",key:"svg-0"}]]);function ze(t){let a=t,o=!1;const e=new Set;return{getState(){return a},updateState(r){a=typeof r=="function"?r(a):r},setState(r){this.updateState(r),e.forEach(i=>i(a))},initialize(r){o||(a=r,o=!0)},subscribe(r){return e.add(r),()=>e.delete(r)}}}const Be=()=>ze({notifications:[],queue:[],limit:5}),M=Be();function P(t,a){const o=t.getState(),e=a([...o.notifications,...o.queue]);t.setState({notifications:e.slice(0,o.limit),queue:e.slice(o.limit),limit:o.limit})}function Ce(t,a=M){const o=t.id||ce();return P(a,e=>t.id&&e.some(r=>r.id===t.id)?e:[...e,{...t,id:o}]),o}function Me(t,a=M){return P(a,o=>o.filter(e=>{var r;return e.id===t?((r=e.onClose)==null||r.call(e,e),!1):!0})),t}function $e(t,a=M){return P(a,o=>o.map(e=>e.id===t.id?{...e,...t}:e)),t.id}function Ae(t=M){P(t,()=>[])}function Re(t=M){P(t,a=>a.slice(0,t.getState().limit))}const Y={show:Ce,hide:Me,update:$e,clean:Ae,cleanQueue:Re,updateState:P},Te="_card_xsh8l_1",Ge="_title_xsh8l_5",Le="_footer_xsh8l_17",F={card:Te,title:Ge,footer:Le};function Z({skeleton:t,...a}){var m,v,z,x,$;const o=re(),e=t?{}:a.item,r=A({base:"none",md:"auto"}),i=A({base:!1,md:!0}),d=A({base:"xs",md:"none"}),n=A({base:"none",md:"lg"}),h=fe(),l=me(ue),[c,b]=T.useState(e.userLiked!==!1),[g,p]=T.useState(e.userBookmarked!==!1),[f]=he(),[y]=ge(),j=async()=>{if(!l)return;const{error:I}=await y({isLiked:c,postId:e.id,authorId:l.id});if(I){Y.show({title:"Sorry",message:"Something wrong 🤥",color:"red"});return}b(!c)},S=async()=>{if(!l)return;const{error:I}=await f({isBookmarked:g,postId:e.id,authorId:l.id});if(I){Y.show({title:"Sorry",message:"Something wrong 🤥",color:"red"});return}p(!g)};return t?s.jsxs(k,{p:d,id:`post-skeleton-${e.id}`,children:[s.jsx(w,{height:60,circle:!0,mb:"xs"}),s.jsx(w,{height:180,radius:"sm"}),s.jsx(w,{height:20,mt:6,radius:"xl"}),s.jsx(w,{height:8,mt:6,width:"100%",radius:"xl"}),s.jsx(w,{height:8,mt:6,width:"60%",radius:"xl"}),s.jsx(w,{height:8,mt:6,width:"20%",radius:"xl"})]}):s.jsxs(D,{id:`post-${e.id}`,withBorder:i,padding:r,radius:n,className:F.card,children:[e.image&&s.jsx(D.Section,{children:s.jsx(Q,{src:e.image,alt:e.title,height:180})}),s.jsxs(k,{px:d,pt:d,children:[s.jsx(O,{w:"fit-content",variant:"light",children:e.category}),s.jsx(K,{order:3,fw:700,className:F.title,mt:"xs",onClick:()=>{h(`${J}/${e.id}`)},children:e.title}),s.jsx(K,{order:6,fw:400,lineClamp:3,children:e.overview}),s.jsxs(_,{mt:"sm",gap:"xs",children:[s.jsx(ve,{src:(m=e.author)==null?void 0:m.avatar,radius:"sm"}),s.jsxs("div",{children:[s.jsx(B,{fw:500,children:(v=e.author)==null?void 0:v.name}),s.jsx(B,{fz:"xs",c:"dimmed",children:ie(new Date(e.createdAt))})]})]})]}),s.jsx(D.Section,{className:F.footer,children:s.jsx(_,{justify:"flex-end",children:s.jsxs(_,{gap:0,children:[s.jsxs(_,{gap:0,children:[s.jsx(B,{fz:"xs",c:"dimmed",fw:600,children:((z=e.likes)==null?void 0:z.length)??0}),s.jsx(N,{variant:"subtle",color:"gray",onClick:j,children:c?s.jsx(Pe,{style:{width:u(20),height:u(20)},color:o.colors.red[6],stroke:1.5}):s.jsx(pe,{style:{width:u(20),height:u(20)},color:o.colors.red[6],stroke:1.5})})]}),s.jsx(W,{orientation:"vertical",size:"sm",mx:4}),s.jsxs(_,{gap:0,children:[s.jsx(B,{fz:"xs",c:"dimmed",fw:600,children:((x=e.bookmarks)==null?void 0:x.length)??0}),s.jsx(N,{variant:"subtle",color:"gray",onClick:S,children:g?s.jsx(Ne,{style:{width:u(20),height:u(20)},color:o.colors.yellow[6],stroke:1.5}):s.jsx(we,{style:{width:u(20),height:u(20)},color:o.colors.yellow[6],stroke:1.5})})]}),s.jsx(W,{orientation:"vertical",size:"sm",mx:4}),s.jsxs(_,{gap:0,children:[s.jsx(B,{fz:"xs",c:"dimmed",fw:600,children:(($=e.comments)==null?void 0:$.length)??0}),s.jsx(N,{variant:"subtle",color:"gray",onClick:()=>{h(`${J}/${e.id}?#comments`)},children:s.jsx(_e,{style:{width:u(20),height:u(20)},color:o.colors.blue[6],stroke:1.5})})]})]})})})]})}try{Z.displayName="Post",Z.__docgenInfo={description:"",displayName:"Post",props:{item:{defaultValue:null,description:"",name:"item",required:!0,type:{name:"Post"}},skeleton:{defaultValue:null,description:"",name:"skeleton",required:!1,type:{name:"boolean"}}}}}catch{}export{N as A,Q as I,Z as P,Y as n};