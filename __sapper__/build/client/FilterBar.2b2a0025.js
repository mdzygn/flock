import{S as t,i as e,s,c as l,a as n,m as o,t as r,b as a,d as i,p as c,r as f,u,g,v as h,E as m,j as d,w as $,y as p,k as y,a3 as S,o as j,ab as v,N as C,aI as I,H as b,I as x,J as E}from"./client.70f714b9.js";function w(t,e,s){const l=t.slice();return l[11]=e[s],l[13]=s,l}function B(t){let e,s=t[11]+"";return{c(){e=b(s)},l(t){e=x(t,s)},m(t,s){d(t,e,s)},p(t,l){8&l&&s!==(s=t[11]+"")&&E(e,s)},d(t){t&&g(e)}}}function L(t){let e;function s(...e){return t[9](t[11],...e)}const c=new C({props:{className:"filterButton "+((t[13]||t[1]?t[0].match(new RegExp("\\b"+t[11]+"\\b")):""===t[0])?"selectedItem":""),onClick:s,$$slots:{default:[B]},$$scope:{ctx:t}}});return{c(){l(c.$$.fragment)},l(t){n(c.$$.fragment,t)},m(t,s){o(c,t,s),e=!0},p(e,l){t=e;const n={};11&l&&(n.className="filterButton "+((t[13]||t[1]?t[0].match(new RegExp("\\b"+t[11]+"\\b")):""===t[0])?"selectedItem":"")),8&l&&(n.onClick=s),16392&l&&(n.$$scope={dirty:l,ctx:t}),c.$set(n)},i(t){e||(r(c.$$.fragment,t),e=!0)},o(t){a(c.$$.fragment,t),e=!1},d(t){i(c,t)}}}function N(t){let e,s,l,n,o=t[3],i=[];for(let e=0;e<o.length;e+=1)i[e]=L(w(t,o,e));const j=t=>a(i[t],1,1,()=>{i[t]=null});return{c(){e=c("div"),s=c("div"),l=c("div");for(let t=0;t<i.length;t+=1)i[t].c();this.h()},l(t){e=f(t,"DIV",{class:!0});var n=u(e);s=f(n,"DIV",{class:!0});var o=u(s);l=f(o,"DIV",{class:!0});var r=u(l);for(let t=0;t<i.length;t+=1)i[t].l(r);r.forEach(g),o.forEach(g),n.forEach(g),this.h()},h(){h(l,"class","filterSet svelte-jjncoj"),h(s,"class","filterScrollRegion svelte-jjncoj"),h(e,"class","filterBar svelte-jjncoj"),m(e,"isCategorySelector",t[1])},m(o,r){d(o,e,r),$(e,s),$(s,l);for(let t=0;t<i.length;t+=1)i[t].m(l,null);t[10](s),n=!0},p(t,[s]){if(27&s){let e;for(o=t[3],e=0;e<o.length;e+=1){const n=w(t,o,e);i[e]?(i[e].p(n,s),r(i[e],1)):(i[e]=L(n),i[e].c(),r(i[e],1),i[e].m(l,null))}for(p(),e=o.length;e<i.length;e+=1)j(e);y()}2&s&&m(e,"isCategorySelector",t[1])},i(t){if(!n){for(let t=0;t<o.length;t+=1)r(i[t]);n=!0}},o(t){i=i.filter(Boolean);for(let t=0;t<i.length;t+=1)a(i[t]);n=!1},d(s){s&&g(e),S(i,s),t[10](null)}}}const k=10,D=40;function R(t,e,s){let l,{filterString:n=""}=e,{isCategorySelector:o=!1}=e,r=["design","arts","tech","environment","community","apps","games","music","media","education","food"];function a(t){if("all"===t)s(0,n="");else if(u){if(t){let e=n.trim().split(", ");"other"!==t&&"other"!==n||t===n||(e=[]);const l=e.indexOf(t);-1!==l?e.splice(l,1):e.push(t),e=e.filter(t=>t),s(0,n=e.join(", ").trim())}}else s(0,n=t)}let i=!1;function c(){if(l){const t=l.getElementsByClassName("selectedItem"),e=t&&t.length?t[0]:null;if(e){const t=e.offsetLeft,s=e.offsetLeft+e.offsetWidth,n=l.offsetWidth,o=l.scrollLeft,r=l.scrollLeft+n;if(s<n-k)l.scrollTo(0,0);else if(s>r-k||t<o+k){const t=e.offsetLeft-D;l.scrollTo(t,0)}}}}j(()=>{s(5,i=!0)});let f,u;return t.$set=(t=>{"filterString"in t&&s(0,n=t.filterString),"isCategorySelector"in t&&s(1,o=t.isCategorySelector)}),t.$$.update=(()=>{2&t.$$.dirty&&s(3,f=o?[...r,"other"]:["all",...r]),2&t.$$.dirty&&(u=o),33&t.$$.dirty&&i&&(async()=>{await v(),c()})()}),[n,o,l,f,a,i,u,r,c,(t,e)=>a(t),function(t){I[t?"unshift":"push"](()=>{s(2,l=t)})}]}class V extends t{constructor(t){super(),e(this,t,R,N,s,{filterString:0,isCategorySelector:1})}}export{V as F};
