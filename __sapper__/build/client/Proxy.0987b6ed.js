import{S as s,i as e,s as t,a as l,e as o,b as n,l as a,t as c,c as i,d as r,o as d,f as h,g as u,h as f,j as p,k as m,m as $,n as y,p as T,q as g,r as H,u as v,v as w,w as b,x,y as S,z as O,A as M,B as E,C as V,D as j,E as I,F as D,G as C}from"./client.618c796c.js";const N=s=>({}),R=s=>({});function k(s){let e,t,l,o;const a=s[30].default,d=T(a,s,s[29],null);return{c(){e=g("div"),t=g("div"),d&&d.c(),this.h()},l(s){e=H(s,"DIV",{class:!0,style:!0});var l=v(e);t=H(l,"DIV",{class:!0,style:!0});var o=v(t);d&&d.l(o),o.forEach(r),l.forEach(r),this.h()},h(){w(t,"class","scrollContent"),w(t,"style",s[8]),w(e,"class",l="scrollView "+s[2]+" svelte-j97uab"),b(e,"bottom",s[1]+"px")},m(l,a){n(l,e,a),x(e,t),d&&d.m(t,null),s[34](e),o=!0},p(s,n){d&&d.p&&536870912&n[0]&&S(d,a,s,s[29],n,null,null),(!o||256&n[0])&&w(t,"style",s[8]),(!o||4&n[0]&&l!==(l="scrollView "+s[2]+" svelte-j97uab"))&&w(e,"class",l),(!o||2&n[0])&&b(e,"bottom",s[1]+"px")},i(s){o||(c(d,s),o=!0)},o(s){i(d,s),o=!1},d(t){t&&r(e),d&&d.d(t),s[34](null)}}}function P(s){let e,t,l,o,a,d,h;const u=s[30].default,f=T(u,s,s[29],null),p=s[30].scrollHeader,m=T(p,s,s[29],R);return{c(){e=g("div"),t=g("div"),l=g("div"),f&&f.c(),o=O(),a=g("div"),m&&m.c(),this.h()},l(s){e=H(s,"DIV",{class:!0,style:!0});var n=v(e);t=H(n,"DIV",{class:!0,style:!0});var c=v(t);l=H(c,"DIV",{class:!0,style:!0});var i=v(l);f&&f.l(i),i.forEach(r),c.forEach(r),o=M(n),a=H(n,"DIV",{class:!0,style:!0});var d=v(a);m&&m.l(d),d.forEach(r),n.forEach(r),this.h()},h(){w(l,"class","scrollContent"),w(l,"style",s[8]),w(t,"class","scrollView svelte-j97uab"),b(t,"padding-top",s[6]+"px"),w(a,"class","scrollHeader svelte-j97uab"),b(a,"top",s[4]+"px"),E(a,"shadowHidden",s[7]),w(e,"class",d="content "+s[2]+" svelte-j97uab"),b(e,"bottom",s[1]+"px")},m(c,i){n(c,e,i),x(e,t),x(t,l),f&&f.m(l,null),s[32](t),x(e,o),x(e,a),m&&m.m(a,null),s[33](a),h=!0},p(s,o){f&&f.p&&536870912&o[0]&&S(f,u,s,s[29],o,null,null),(!h||256&o[0])&&w(l,"style",s[8]),(!h||64&o[0])&&b(t,"padding-top",s[6]+"px"),m&&m.p&&536870912&o[0]&&S(m,p,s,s[29],o,N,R),(!h||16&o[0])&&b(a,"top",s[4]+"px"),128&o[0]&&E(a,"shadowHidden",s[7]),(!h||4&o[0]&&d!==(d="content "+s[2]+" svelte-j97uab"))&&w(e,"class",d),(!h||2&o[0])&&b(e,"bottom",s[1]+"px")},i(s){h||(c(f,s),c(m,s),h=!0)},o(s){i(f,s),i(m,s),h=!1},d(t){t&&r(e),f&&f.d(t),s[32](null),m&&m.d(t),s[33](null)}}}function A(s){let e,t,d,h,u,f;l(s[31]);const p=[P,k],m=[];return e=function(s,e){return s[9]?0:1}(s),t=m[e]=p[e](s),{c(){t.c(),d=o()},l(s){t.l(s),d=o()},m(t,l){m[e].m(t,l),n(t,d,l),h=!0,u||(f=a(window,"resize",s[31]),u=!0)},p(s,e){t.p(s,e)},i(s){h||(c(t),h=!0)},o(s){i(t),h=!1},d(s){m[e].d(s),s&&r(d),u=!1,f()}}}function B(s,e,t){let l,o,{anchorToBottom:n=!1}=e,{headerStartHidden:a=!1}=e,{headerHideOffset:c=0}=e,{headerResetOnShow:i=!1}=e,{hideHeaderShadowAtTop:r=!1}=e,{headerHiddenOffset:T=0}=e,{hideShadowMargin:g=1}=e,{bottomOffset:H=0}=e,{disabledMinHeight:v=!1}=e,{onScroll:w=null}=e,{className:b=""}=e,{id:x=null}=e,S=null,O=e.$$slots&&e.$$slots.scrollHeader||!1,M=0,{scrollRegion:E=null}=e,V=0,j=0,I=0,D=!1;function C(){S&&E&&(t(20,S.scrollTop=E.scrollTop,S),O&&o&&(t(6,I=o.offsetHeight),t(22,V=Math.min(S.scrollTop,Math.max(S.scrollTop-I,V))),t(4,j=V-S.scrollTop)),w&&w())}let N=!1;const R=async()=>{if(!S)return;if(await $(),!S||!E)return;S.inited||(t(20,S.inited=!0,S),t(20,S.scrollTop=n?E.scrollHeight:0,S),k(!0));const s=E;setTimeout(()=>{S&&(s.scrollTo(0,S.scrollTop),k())},2),setTimeout(()=>{S&&(s.scrollTo(0,S.scrollTop),O&&o&&t(6,I=o.offsetHeight),k())},10),setTimeout(()=>{S&&(s.scrollTo(0,S.scrollTop),k())},50),setTimeout(()=>{S&&(s.scrollTo(0,S.scrollTop),O&&o&&t(6,I=o.offsetHeight),k())},100),k(),E.scrollTo(0,S.scrollTop)};function k(s){if(O&&o){if(t(6,I=o.offsetHeight),i&&!a)t(22,V=S.scrollTop);else if(s)if(a&&!n){const s=T||I;S.scrollTop<30&&t(20,S.scrollTop=s,S),t(22,V=V-S.scrollTop-s),t(22,V=Math.min(S.scrollTop,Math.max(S.scrollTop-s,V))),c&&t(20,S.scrollTop+=c,S),E.scrollTo(0,S.scrollTop)}else t(22,V=S.scrollTop);t(4,j=V-S.scrollTop)}}d(()=>{E.addEventListener("scroll",C),R()});const P=h.subscribe(s=>{N?R():N=!0});u(()=>{P(),E&&E.removeEventListener("scroll",C)});let A,{$$slots:B={},$$scope:z}=e;return s.$set=(s=>{t(28,e=f(f({},e),p(s))),"anchorToBottom"in s&&t(10,n=s.anchorToBottom),"headerStartHidden"in s&&t(11,a=s.headerStartHidden),"headerHideOffset"in s&&t(12,c=s.headerHideOffset),"headerResetOnShow"in s&&t(13,i=s.headerResetOnShow),"hideHeaderShadowAtTop"in s&&t(14,r=s.hideHeaderShadowAtTop),"headerHiddenOffset"in s&&t(15,T=s.headerHiddenOffset),"hideShadowMargin"in s&&t(16,g=s.hideShadowMargin),"bottomOffset"in s&&t(1,H=s.bottomOffset),"disabledMinHeight"in s&&t(17,v=s.disabledMinHeight),"onScroll"in s&&t(18,w=s.onScroll),"className"in s&&t(2,b=s.className),"id"in s&&t(19,x=s.id),"scrollRegion"in s&&t(0,E=s.scrollRegion),"$$scope"in s&&t(29,z=s.$$scope)}),s.$$.update=(()=>{if(524288&s.$$.dirty[0]&&t(20,S=m(x)),4137&s.$$.dirty[0]){O&&o&&l&&t(6,I=o.offsetHeight);const s=c;t(21,M=E&&E.offsetHeight&&E.offsetHeight+s||0)}2228224&s.$$.dirty[0]&&t(8,A=M&&!v?"min-height: "+M+"px":""),5324800&s.$$.dirty[0]&&r&&(S.scrollTop<=g?t(7,D=!0):t(7,D=!1))}),e=p(e),[E,H,b,l,j,o,I,D,A,O,n,a,c,i,r,T,g,v,w,x,S,M,V,N,C,R,k,P,e,z,B,function(){t(3,l=window.innerWidth)},function(s){y[s?"unshift":"push"](()=>{t(0,E=s)})},function(s){y[s?"unshift":"push"](()=>{t(5,o=s)})},function(s){y[s?"unshift":"push"](()=>{t(0,E=s)})}]}class z extends s{constructor(s){super(),e(this,s,B,A,t,{anchorToBottom:10,headerStartHidden:11,headerHideOffset:12,headerResetOnShow:13,hideHeaderShadowAtTop:14,headerHiddenOffset:15,hideShadowMargin:16,bottomOffset:1,disabledMinHeight:17,onScroll:18,className:2,id:19,scrollRegion:0},[-1,-1])}}function G(s){let e,t,o,d;l(s[5]);const h=s[4].default,u=T(h,s,s[3],null);return{c(){e=g("div"),u&&u.c(),this.h()},l(s){e=H(s,"DIV",{class:!0,style:!0});var t=v(e);u&&u.l(t),t.forEach(r),this.h()},h(){w(e,"class","hotspotContainer svelte-m9jx7u"),w(e,"style",s[1])},m(l,c){n(l,e,c),u&&u.m(e,null),t=!0,o||(d=a(window,"resize",s[5]),o=!0)},p(s,[l]){u&&u.p&&8&l&&S(u,h,s,s[3],l,null,null),(!t||2&l)&&w(e,"style",s[1])},i(s){t||(c(u,s),t=!0)},o(s){i(u,s),t=!1},d(s){s&&r(e),u&&u.d(s),o=!1,d()}}}function L(s,e,t){let l,o=0,n=1,{$$slots:a={},$$scope:c}=e;return s.$set=(s=>{"$$scope"in s&&t(3,c=s.$$scope)}),s.$$.update=(()=>{1&s.$$.dirty&&t(2,n=o<480?o/375:1.096),4&s.$$.dirty&&t(1,l="transform: scale("+n+", "+n+"); transform-origin: 0 0;")}),[o,l,n,c,a,function(){t(0,o=window.innerWidth)}]}class W extends s{constructor(s){super(),e(this,s,L,G,t,{})}}function q(s){let e;const t=s[9].default,l=T(t,s,s[10],null);return{c(){l&&l.c()},l(s){l&&l.l(s)},m(s,t){l&&l.m(s,t),e=!0},p(s,e){l&&l.p&&1024&e&&S(l,t,s,s[10],e,null,null)},i(s){e||(c(l,s),e=!0)},o(s){i(l,s),e=!1},d(s){l&&l.d(s)}}}function F(s){let e,t,l,o;return{c(){e=g("img"),this.h()},l(s){e=H(s,"IMG",{src:!0,alt:!0,class:!0}),this.h()},h(){e.src!==(t="content/proxy/"+s[5])&&w(e,"src",t),w(e,"alt","proxy"),w(e,"class","svelte-1w9acli"),E(e,"button",s[1])},m(t,c){n(t,e,c),l||(o=a(e,"click",function(){C(s[1])&&s[1].apply(this,arguments)}),l=!0)},p(l,o){s=l,32&o&&e.src!==(t="content/proxy/"+s[5])&&w(e,"src",t),2&o&&E(e,"button",s[1])},d(s){s&&r(e),l=!1,o()}}}function J(s){let e,t,l,o,c;return{c(){e=g("a"),t=g("img"),this.h()},l(s){e=H(s,"A",{href:!0});var l=v(e);t=H(l,"IMG",{src:!0,alt:!0,class:!0}),l.forEach(r),this.h()},h(){t.src!==(l="content/proxy/"+s[5])&&w(t,"src",l),w(t,"alt","proxy"),w(t,"class","svelte-1w9acli"),w(e,"href",s[0])},m(l,i){n(l,e,i),x(e,t),o||(c=a(e,"click",function(){C(s[1])&&s[1].apply(this,arguments)}),o=!0)},p(o,n){s=o,32&n&&t.src!==(l="content/proxy/"+s[5])&&w(t,"src",l),1&n&&w(e,"href",s[0])},d(s){s&&r(e),o=!1,c()}}}function K(s){let e,t,l,o,a=s[6]&&function(s){let e;const t=new W({props:{$$slots:{default:[q]},$$scope:{ctx:s}}});return{c(){V(t.$$.fragment)},l(s){j(t.$$.fragment,s)},m(s,l){I(t,s,l),e=!0},p(s,e){const l={};1024&e&&(l.$$scope={dirty:e,ctx:s}),t.$set(l)},i(s){e||(c(t.$$.fragment,s),e=!0)},o(s){i(t.$$.fragment,s),e=!1},d(s){D(t,s)}}}(s);function d(s,e){return s[0]?J:F}let h=d(s),u=h(s);return{c(){e=g("div"),a&&a.c(),t=O(),u.c(),this.h()},l(s){e=H(s,"DIV",{class:!0,style:!0});var l=v(e);a&&a.l(l),t=M(l),u.l(l),l.forEach(r),this.h()},h(){w(e,"class",l="proxy "+s[2]+" svelte-1w9acli"),w(e,"style",s[3]),E(e,"absolutePlacement",s[4])},m(s,l){n(s,e,l),a&&a.m(e,null),x(e,t),u.m(e,null),o=!0},p(s,[t]){s[6]&&a.p(s,t),h===(h=d(s))&&u?u.p(s,t):(u.d(1),(u=h(s))&&(u.c(),u.m(e,null))),(!o||4&t&&l!==(l="proxy "+s[2]+" svelte-1w9acli"))&&w(e,"class",l),(!o||8&t)&&w(e,"style",s[3]),20&t&&E(e,"absolutePlacement",s[4])},i(s){o||(c(a),o=!0)},o(s){i(a),o=!1},d(s){s&&r(e),a&&a.d(),u.d()}}}function Q(s,e,t){let l,{image:o}=e,{href:n=null}=e,{onClick:a=null}=e,{className:c=""}=e,{style:i=null}=e,{absolutePlacement:r=!1}=e,d=e.$$slots,{$$slots:h={},$$scope:u}=e;return s.$set=(s=>{t(8,e=f(f({},e),p(s))),"image"in s&&t(7,o=s.image),"href"in s&&t(0,n=s.href),"onClick"in s&&t(1,a=s.onClick),"className"in s&&t(2,c=s.className),"style"in s&&t(3,i=s.style),"absolutePlacement"in s&&t(4,r=s.absolutePlacement),"$$scope"in s&&t(10,u=s.$$scope)}),s.$$.update=(()=>{128&s.$$.dirty&&t(5,l=-1!==o.indexOf(".png")?o:o+".jpg")}),e=p(e),[n,a,c,i,r,l,d,o,e,h,u]}class U extends s{constructor(s){super(),e(this,s,Q,K,t,{image:7,href:0,onClick:1,className:2,style:3,absolutePlacement:4})}}export{W as H,U as P,z as S};