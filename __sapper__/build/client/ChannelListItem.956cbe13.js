import{S as s,i as t,s as a,W as n,q as e,C as r,r as c,u as o,D as $,d as l,v as i,B as d,b as m,E as u,t as f,c as h,F as p,J as g,a4 as y,ad as v,Y as w,cs as C,bl as I,ct as N,w as b,K as x,R as k,z as j,e as _,T as D,A as E,V,L as A,I as L,a0 as P}from"./client.9f5af520.js";import{C as B}from"./Counter.88c5a585.js";import{C as F}from"./comment_small.d9789f17.js";import{N as T}from"./next_arrow.b1598f96.js";import{A as q}from"./add_highlight.871823d8.js";function z(s){let t;return{c(){t=e("div"),this.h()},l(s){t=c(s,"DIV",{class:!0,style:!0}),o(t).forEach(l),this.h()},h(){i(t,"class","postsIcon svelte-1cvnck6"),b(t,"background-image","url("+F+")")},m(s,a){m(s,t,a)},p:x,d(s){s&&l(t)}}}function J(s){let t;const a=new n({props:{className:"addFirstPostCTA",icon:q,$$slots:{default:[R]},$$scope:{ctx:s}}});return{c(){r(a.$$.fragment)},l(s){$(a.$$.fragment,s)},m(s,n){u(a,s,n),t=!0},p(s,t){const n={};16384&t&&(n.$$scope={dirty:t,ctx:s}),a.$set(n)},i(s){t||(f(a.$$.fragment,s),t=!0)},o(s){h(a.$$.fragment,s),t=!1},d(s){p(a,s)}}}function K(s){let t;const a=new B({props:{count:s[7]||s[2],hasNew:s[7]}});return{c(){r(a.$$.fragment)},l(s){$(a.$$.fragment,s)},m(s,n){u(a,s,n),t=!0},p(s,t){const n={};132&t&&(n.count=s[7]||s[2]),128&t&&(n.hasNew=s[7]),a.$set(n)},i(s){t||(f(a.$$.fragment,s),t=!0)},o(s){h(a.$$.fragment,s),t=!1},d(s){p(a,s)}}}function R(s){let t;return{c(){t=k("add first post")},l(s){t=D(s,"add first post")},m(s,a){m(s,t,a)},d(s){s&&l(t)}}}function S(s){let t,a,n,r,$,d,u,p,g,y=""+s[1],v=(s[7]||s[2])&&z();const w=[K,J],C=[];function I(s,t){return s[7]||s[2]?0:s[4]&&s[6]&&!s[5]?1:-1}return~(d=I(s))&&(u=C[d]=w[d](s)),{c(){t=k(y),a=j(),v&&v.c(),n=j(),r=e("div"),$=j(),u&&u.c(),p=_(),this.h()},l(s){t=D(s,y),a=E(s),v&&v.l(s),n=E(s),r=c(s,"DIV",{class:!0,style:!0}),o(r).forEach(l),$=E(s),u&&u.l(s),p=_(),this.h()},h(){i(r,"class","buttonIcon svelte-1cvnck6"),b(r,"background-image","url("+T+")")},m(s,e){m(s,t,e),m(s,a,e),v&&v.m(s,e),m(s,n,e),m(s,r,e),m(s,$,e),~d&&C[d].m(s,e),m(s,p,e),g=!0},p(s,a){(!g||2&a)&&y!==(y=""+s[1])&&V(t,y),s[7]||s[2]?v?v.p(s,a):((v=z()).c(),v.m(n.parentNode,n)):v&&(v.d(1),v=null);let e=d;(d=I(s))===e?~d&&C[d].p(s,a):(u&&(A(),h(C[e],1,1,()=>{C[e]=null}),L()),~d?((u=C[d])||(u=C[d]=w[d](s)).c(),f(u,1),u.m(p.parentNode,p)):u=null)},i(s){g||(f(u),g=!0)},o(s){h(u),g=!1},d(s){s&&l(t),s&&l(a),v&&v.d(s),s&&l(n),s&&l(r),s&&l($),~d&&C[d].d(s),s&&l(p)}}}function W(s){let t,a;const g=new n({props:{className:"channelListItemButton",onClick:s[8],$$slots:{default:[S]},$$scope:{ctx:s}}});return{c(){t=e("div"),r(g.$$.fragment),this.h()},l(s){t=c(s,"DIV",{class:!0});var a=o(t);$(g.$$.fragment,a),a.forEach(l),this.h()},h(){i(t,"class","channelListItem svelte-1cvnck6"),d(t,"noPosts",!s[2])},m(s,n){m(s,t,n),u(g,t,null),a=!0},p(s,[a]){const n={};16630&a&&(n.$$scope={dirty:a,ctx:s}),g.$set(n),4&a&&d(t,"noPosts",!s[2])},i(s){a||(f(g.$$.fragment,s),a=!0)},o(s){h(g.$$.fragment,s),a=!1},d(s){s&&l(t),p(g)}}}function Y(s,t,a){let n,e,r,c,o=x,$=()=>(o(),o=w(k,s=>a(9,n=s)),k),l=x;g(s,y,s=>a(11,e=s)),g(s,v,s=>a(12,r=s)),s.$$.on_destroy.push(()=>o()),s.$$.on_destroy.push(()=>l());let i,d,m,u,f,h,p,b,{channel:k}=t;return $(),s.$set=(s=>{"channel"in s&&$(a(0,k=s.channel))}),s.$$.update=(()=>{512&s.$$.dirty&&a(1,i=n&&n.title||""),512&s.$$.dirty&&(d=n&&n.id||null),512&s.$$.dirty&&a(2,m=n&&n.postCount||0),512&s.$$.dirty&&(()=>(l(),l=w(u,s=>a(7,c=s)),u))(a(3,u=n&&C(n.id)||writable(0))),6144&s.$$.dirty&&a(4,f=e&&I(r)),4096&s.$$.dirty&&(h=r&&r.isNew||!1),4112&s.$$.dirty&&a(5,p=f&&r&&r.archived||!1),512&s.$$.dirty&&a(6,b=N(n))}),[k,i,m,u,f,p,b,c,function(){d&&P(d)}]}class G extends s{constructor(s){super(),t(this,s,Y,W,a,{channel:0})}}export{G as C};
