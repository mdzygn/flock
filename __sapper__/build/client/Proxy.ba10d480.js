import{S as s,i as t,s as e,a as l,e as o,b as n,l as c,t as a,c as i,d as r,f as d,o as h,g as f,h as p,j as u,k as m,m as $,n as T,p as g,q as y,r as v,u as H,v as w,w as x,x as S,y as b,z as O,A as M,B as E,C as V,D as I,E as D,F as C,G as N}from"./client.9f5af520.js";const R=s=>({}),k=s=>({});function q(s){let t,e,l,o;const c=s[32].default,d=g(c,s,s[31],null);return{c(){t=y("div"),e=y("div"),d&&d.c(),this.h()},l(s){t=v(s,"DIV",{class:!0,style:!0});var l=H(t);e=v(l,"DIV",{class:!0,style:!0});var o=H(e);d&&d.l(o),o.forEach(r),l.forEach(r),this.h()},h(){w(e,"class","scrollContent"),w(e,"style",s[10]),w(t,"class",l="scrollView "+s[3]+" svelte-txqv5t"),x(t,"bottom",s[2]+"px"),x(t,"padding-top",s[1]+"px")},m(l,c){n(l,t,c),S(t,e),d&&d.m(e,null),s[36](t),o=!0},p(s,n){d&&d.p&&1&n[1]&&b(d,c,s,s[31],n,null,null),(!o||1024&n[0])&&w(e,"style",s[10]),(!o||8&n[0]&&l!==(l="scrollView "+s[3]+" svelte-txqv5t"))&&w(t,"class",l),(!o||4&n[0])&&x(t,"bottom",s[2]+"px"),(!o||2&n[0])&&x(t,"padding-top",s[1]+"px")},i(s){o||(a(d,s),o=!0)},o(s){i(d,s),o=!1},d(e){e&&r(t),d&&d.d(e),s[36](null)}}}function P(s){let t,e,l,o,c,d,h;const f=s[32].default,p=g(f,s,s[31],null),u=s[32].scrollHeader,m=g(u,s,s[31],k);return{c(){t=y("div"),e=y("div"),l=y("div"),p&&p.c(),o=O(),c=y("div"),m&&m.c(),this.h()},l(s){t=v(s,"DIV",{class:!0});var n=H(t);e=v(n,"DIV",{class:!0,style:!0});var a=H(e);l=v(a,"DIV",{class:!0,style:!0});var i=H(l);p&&p.l(i),i.forEach(r),a.forEach(r),o=M(n),c=v(n,"DIV",{class:!0,style:!0});var d=H(c);m&&m.l(d),d.forEach(r),n.forEach(r),this.h()},h(){w(l,"class","scrollContent"),w(l,"style",s[10]),w(e,"class","scrollView svelte-txqv5t"),x(e,"bottom",s[2]+"px"),x(e,"padding-top",(s[4]?s[8]:s[1])+"px"),w(c,"class","scrollHeader svelte-txqv5t"),x(c,"top",s[6]+"px"),E(c,"hidden",!s[4]),E(c,"shadowHidden",s[9]),w(t,"class",d="content "+s[3]+" svelte-txqv5t")},m(a,i){n(a,t,i),S(t,e),S(e,l),p&&p.m(l,null),s[34](e),S(t,o),S(t,c),m&&m.m(c,null),s[35](c),h=!0},p(s,o){p&&p.p&&1&o[1]&&b(p,f,s,s[31],o,null,null),(!h||1024&o[0])&&w(l,"style",s[10]),(!h||4&o[0])&&x(e,"bottom",s[2]+"px"),(!h||274&o[0])&&x(e,"padding-top",(s[4]?s[8]:s[1])+"px"),m&&m.p&&1&o[1]&&b(m,u,s,s[31],o,R,k),(!h||64&o[0])&&x(c,"top",s[6]+"px"),16&o[0]&&E(c,"hidden",!s[4]),512&o[0]&&E(c,"shadowHidden",s[9]),(!h||8&o[0]&&d!==(d="content "+s[3]+" svelte-txqv5t"))&&w(t,"class",d)},i(s){h||(a(p,s),a(m,s),h=!0)},o(s){i(p,s),i(m,s),h=!1},d(e){e&&r(t),p&&p.d(e),s[34](null),m&&m.d(e),s[35](null)}}}function A(s){let t,e,d,h,f,p;l(s[33]);const u=[P,q],m=[];return t=function(s,t){return s[11]?0:1}(s),e=m[t]=u[t](s),{c(){e.c(),d=o()},l(s){e.l(s),d=o()},m(e,l){m[t].m(e,l),n(e,d,l),h=!0,f||(p=c(window,"resize",s[33]),f=!0)},p(s,t){e.p(s,t)},i(s){h||(a(e),h=!0)},o(s){i(e),h=!1},d(s){m[t].d(s),s&&r(d),f=!1,p()}}}function B(s,t,e){let l,o,{anchorToBottom:n=!1}=t,{headerStartHidden:c=!1}=t,{headerHideOffset:a=0}=t,{headerResetOnShow:i=!1}=t,{hideHeaderShadowAtTop:r=!1}=t,{headerHiddenOffset:g=0}=t,{hideShadowMargin:y=1}=t,{topOffset:v=0}=t,{bottomOffset:H=0}=t,{disabledMinHeight:w=!1}=t,{onScroll:x=null}=t,{className:S=""}=t,{showScrollHeader:b=!0}=t,{id:O=null}=t,M=null,E=t.$$slots&&t.$$slots.scrollHeader||!1,V=0,{scrollRegion:I=null}=t,D=0,C=0,N=0,R=!1;function k(){M&&I&&(e(22,M.scrollTop=I.scrollTop,M),E&&o&&b&&(e(8,N=o.offsetHeight),e(24,D=Math.min(M.scrollTop,Math.max(M.scrollTop-N,D))),e(6,C=D-M.scrollTop)),x&&x())}let q=!1;const P=async()=>{if(!M)return;if(await $(),!M||!I)return;M.inited||(e(22,M.inited=!0,M),e(22,M.scrollTop=n?I.scrollHeight:0,M),A(!0));const s=I;setTimeout(()=>{M&&(s.scrollTo(0,M.scrollTop),A())},2),setTimeout(()=>{M&&(s.scrollTo(0,M.scrollTop),E&&o&&e(8,N=o.offsetHeight),A())},10),setTimeout(()=>{M&&(s.scrollTo(0,M.scrollTop),A())},50),setTimeout(()=>{M&&(s.scrollTo(0,M.scrollTop),E&&o&&e(8,N=o.offsetHeight),A())},100),A(),I.scrollTo(0,M.scrollTop)};function A(s){if(E&&o){if(e(8,N=o.offsetHeight),i&&!c)e(24,D=M.scrollTop);else if(s)if(c&&!n){const s=g||N;M.scrollTop<30&&e(22,M.scrollTop=s,M),e(24,D=D-M.scrollTop-s),e(24,D=Math.min(M.scrollTop,Math.max(M.scrollTop-s,D))),a&&e(22,M.scrollTop+=a,M),I.scrollTo(0,M.scrollTop)}else e(24,D=M.scrollTop);e(6,C=D-M.scrollTop)}}const B=d.subscribe(s=>{q?P():q=!0});h(()=>{I.addEventListener("scroll",k),P()}),f(()=>{B(),I&&I.removeEventListener("scroll",k)});let j,{$$slots:z={},$$scope:G}=t;return s.$set=(s=>{e(30,t=p(p({},t),u(s))),"anchorToBottom"in s&&e(12,n=s.anchorToBottom),"headerStartHidden"in s&&e(13,c=s.headerStartHidden),"headerHideOffset"in s&&e(14,a=s.headerHideOffset),"headerResetOnShow"in s&&e(15,i=s.headerResetOnShow),"hideHeaderShadowAtTop"in s&&e(16,r=s.hideHeaderShadowAtTop),"headerHiddenOffset"in s&&e(17,g=s.headerHiddenOffset),"hideShadowMargin"in s&&e(18,y=s.hideShadowMargin),"topOffset"in s&&e(1,v=s.topOffset),"bottomOffset"in s&&e(2,H=s.bottomOffset),"disabledMinHeight"in s&&e(19,w=s.disabledMinHeight),"onScroll"in s&&e(20,x=s.onScroll),"className"in s&&e(3,S=s.className),"showScrollHeader"in s&&e(4,b=s.showScrollHeader),"id"in s&&e(21,O=s.id),"scrollRegion"in s&&e(0,I=s.scrollRegion),"$$scope"in s&&e(31,G=s.$$scope)}),s.$$.update=(()=>{if(2097152&s.$$.dirty[0]&&e(22,M=m(O)),16545&s.$$.dirty[0]){E&&o&&l&&e(8,N=o.offsetHeight);const s=a;e(23,V=I&&I.offsetHeight&&I.offsetHeight+s||0)}8912896&s.$$.dirty[0]&&e(10,j=V&&!w?"min-height: "+V+"px":""),21299200&s.$$.dirty[0]&&r&&(M.scrollTop<=y?e(9,R=!0):e(9,R=!1))}),t=u(t),[I,v,H,S,b,l,C,o,N,R,j,E,n,c,a,i,r,g,y,w,x,O,M,V,D,q,k,P,A,B,t,G,z,function(){e(5,l=window.innerWidth)},function(s){T[s?"unshift":"push"](()=>{e(0,I=s)})},function(s){T[s?"unshift":"push"](()=>{e(7,o=s)})},function(s){T[s?"unshift":"push"](()=>{e(0,I=s)})}]}class j extends s{constructor(s){super(),t(this,s,B,A,e,{anchorToBottom:12,headerStartHidden:13,headerHideOffset:14,headerResetOnShow:15,hideHeaderShadowAtTop:16,headerHiddenOffset:17,hideShadowMargin:18,topOffset:1,bottomOffset:2,disabledMinHeight:19,onScroll:20,className:3,showScrollHeader:4,id:21,scrollRegion:0},[-1,-1])}}function z(s){let t,e,o,d;l(s[5]);const h=s[4].default,f=g(h,s,s[3],null);return{c(){t=y("div"),f&&f.c(),this.h()},l(s){t=v(s,"DIV",{class:!0,style:!0});var e=H(t);f&&f.l(e),e.forEach(r),this.h()},h(){w(t,"class","hotspotContainer svelte-m9jx7u"),w(t,"style",s[1])},m(l,a){n(l,t,a),f&&f.m(t,null),e=!0,o||(d=c(window,"resize",s[5]),o=!0)},p(s,[l]){f&&f.p&&8&l&&b(f,h,s,s[3],l,null,null),(!e||2&l)&&w(t,"style",s[1])},i(s){e||(a(f,s),e=!0)},o(s){i(f,s),e=!1},d(s){s&&r(t),f&&f.d(s),o=!1,d()}}}function G(s,t,e){let l,o=0,n=1,{$$slots:c={},$$scope:a}=t;return s.$set=(s=>{"$$scope"in s&&e(3,a=s.$$scope)}),s.$$.update=(()=>{1&s.$$.dirty&&e(2,n=o<480?o/375:1.096),4&s.$$.dirty&&e(1,l="transform: scale("+n+", "+n+"); transform-origin: 0 0;")}),[o,l,n,a,c,function(){e(0,o=window.innerWidth)}]}class L extends s{constructor(s){super(),t(this,s,G,z,e,{})}}function W(s){let t;const e=s[9].default,l=g(e,s,s[10],null);return{c(){l&&l.c()},l(s){l&&l.l(s)},m(s,e){l&&l.m(s,e),t=!0},p(s,t){l&&l.p&&1024&t&&b(l,e,s,s[10],t,null,null)},i(s){t||(a(l,s),t=!0)},o(s){i(l,s),t=!1},d(s){l&&l.d(s)}}}function F(s){let t,e,l,o;return{c(){t=y("img"),this.h()},l(s){t=v(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){t.src!==(e="content/proxy/"+s[5])&&w(t,"src",e),w(t,"alt","proxy"),w(t,"class","svelte-1w9acli"),E(t,"button",s[1])},m(e,a){n(e,t,a),l||(o=c(t,"click",function(){N(s[1])&&s[1].apply(this,arguments)}),l=!0)},p(l,o){s=l,32&o&&t.src!==(e="content/proxy/"+s[5])&&w(t,"src",e),2&o&&E(t,"button",s[1])},d(s){s&&r(t),l=!1,o()}}}function J(s){let t,e,l,o,a;return{c(){t=y("a"),e=y("img"),this.h()},l(s){t=v(s,"A",{href:!0});var l=H(t);e=v(l,"IMG",{src:!0,alt:!0,class:!0}),l.forEach(r),this.h()},h(){e.src!==(l="content/proxy/"+s[5])&&w(e,"src",l),w(e,"alt","proxy"),w(e,"class","svelte-1w9acli"),w(t,"href",s[0])},m(l,i){n(l,t,i),S(t,e),o||(a=c(t,"click",function(){N(s[1])&&s[1].apply(this,arguments)}),o=!0)},p(o,n){s=o,32&n&&e.src!==(l="content/proxy/"+s[5])&&w(e,"src",l),1&n&&w(t,"href",s[0])},d(s){s&&r(t),o=!1,a()}}}function K(s){let t,e,l,o,c=s[6]&&function(s){let t;const e=new L({props:{$$slots:{default:[W]},$$scope:{ctx:s}}});return{c(){V(e.$$.fragment)},l(s){I(e.$$.fragment,s)},m(s,l){D(e,s,l),t=!0},p(s,t){const l={};1024&t&&(l.$$scope={dirty:t,ctx:s}),e.$set(l)},i(s){t||(a(e.$$.fragment,s),t=!0)},o(s){i(e.$$.fragment,s),t=!1},d(s){C(e,s)}}}(s);function d(s,t){return s[0]?J:F}let h=d(s),f=h(s);return{c(){t=y("div"),c&&c.c(),e=O(),f.c(),this.h()},l(s){t=v(s,"DIV",{class:!0,style:!0});var l=H(t);c&&c.l(l),e=M(l),f.l(l),l.forEach(r),this.h()},h(){w(t,"class",l="proxy "+s[2]+" svelte-1w9acli"),w(t,"style",s[3]),E(t,"absolutePlacement",s[4])},m(s,l){n(s,t,l),c&&c.m(t,null),S(t,e),f.m(t,null),o=!0},p(s,[e]){s[6]&&c.p(s,e),h===(h=d(s))&&f?f.p(s,e):(f.d(1),(f=h(s))&&(f.c(),f.m(t,null))),(!o||4&e&&l!==(l="proxy "+s[2]+" svelte-1w9acli"))&&w(t,"class",l),(!o||8&e)&&w(t,"style",s[3]),20&e&&E(t,"absolutePlacement",s[4])},i(s){o||(a(c),o=!0)},o(s){i(c),o=!1},d(s){s&&r(t),c&&c.d(),f.d()}}}function Q(s,t,e){let l,{image:o}=t,{href:n=null}=t,{onClick:c=null}=t,{className:a=""}=t,{style:i=null}=t,{absolutePlacement:r=!1}=t,d=t.$$slots,{$$slots:h={},$$scope:f}=t;return s.$set=(s=>{e(8,t=p(p({},t),u(s))),"image"in s&&e(7,o=s.image),"href"in s&&e(0,n=s.href),"onClick"in s&&e(1,c=s.onClick),"className"in s&&e(2,a=s.className),"style"in s&&e(3,i=s.style),"absolutePlacement"in s&&e(4,r=s.absolutePlacement),"$$scope"in s&&e(10,f=s.$$scope)}),s.$$.update=(()=>{128&s.$$.dirty&&e(5,l=-1!==o.indexOf(".png")?o:o+".jpg")}),t=u(t),[n,c,a,i,r,l,d,o,t,h,f]}class U extends s{constructor(s){super(),t(this,s,Q,K,e,{image:7,href:0,onClick:1,className:2,style:3,absolutePlacement:4})}}export{L as H,U as P,j as S};