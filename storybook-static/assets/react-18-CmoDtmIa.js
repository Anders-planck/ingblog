import{R as m,r as n}from"./index-CDs2tPxN.js";import{r as R}from"./index-B-E8tDCn.js";var a={},s=R;a.createRoot=s.createRoot,a.hydrateRoot=s.hydrateRoot;var o=new Map,d=({callback:e,children:r})=>{let t=n.useRef();return n.useLayoutEffect(()=>{t.current!==e&&(t.current=e,e())},[e]),r},E=async(e,r,t)=>{let u=await i(r,t);return new Promise(c=>{u.render(m.createElement(d,{callback:()=>c(null)},e))})},f=(e,r)=>{let t=o.get(e);t&&(t.unmount(),o.delete(e))},i=async(e,r)=>{let t=o.get(e);return t||(t=a.createRoot(e,r),o.set(e,t)),t};export{E as r,f as u};
