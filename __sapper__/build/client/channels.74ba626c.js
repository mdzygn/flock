import{S as t,i as e,s as n,U as l,q as s,C as a,r,u as o,D as c,d as i,v as d,B as f,b as h,E as $,t as p,c as m,F as u,J as E,a4 as g,bh as L,a_ as C,M as v,Y as O,ak as N,bl as T,aa as I,ce as y,e as b,z as _,A,L as S,I as j,K as w,$ as R,bq as D,R as P,T as x,x as H,cb as J,ab as F,l as V,ax as W,H as k,ad as G}from"./client.9f5af520.js";import{S as M}from"./Proxy.ba10d480.js";import{C as q}from"./ContentPanel.be45fbb8.js";import{C as B}from"./ContentLoader.8a90430e.js";import"./Counter.88c5a585.js";import"./comment_small.d9789f17.js";import"./next_arrow.b1598f96.js";import"./add_highlight.871823d8.js";import{C as K}from"./ChannelListItem.956cbe13.js";function z(t,e,n){const l=t.slice();return l[20]=e[n],l}function U(t){let e;function n(t,e){return t[4]&&!t[6]||!t[11]?Y:Q}let l=n(t),s=l(t);return{c(){s.c(),e=b()},l(t){s.l(t),e=b()},m(t,n){s.m(t,n),h(t,e,n)},p(t,a){l===(l=n(t))&&s?s.p(t,a):(s.d(1),(s=l(t))&&(s.c(),s.m(e.parentNode,e)))},d(t){s.d(t),t&&i(e)}}}function Y(t){let e,n,a=l.PROJECT.GET_INVOLVED+"";return{c(){e=s("div"),n=P(a),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=o(e);n=x(l,a),l.forEach(i),this.h()},h(){d(e,"class","getTheConversationStarted svelte-7f8774")},m(t,l){h(t,e,l),H(e,n)},p:w,d(t){t&&i(e)}}}function Q(t){let e;function n(t,e){return t[7]?Z:X}let l=n(t),s=l(t);return{c(){s.c(),e=b()},l(t){s.l(t),e=b()},m(t,n){s.m(t,n),h(t,e,n)},p(t,a){l===(l=n(t))&&s?s.p(t,a):(s.d(1),(s=l(t))&&(s.c(),s.m(e.parentNode,e)))},d(t){s.d(t),t&&i(e)}}}function X(t){let e,n,a=l.PROJECT.FOLLOWER_GET_STARTED+"";return{c(){e=s("div"),n=P(a),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=o(e);n=x(l,a),l.forEach(i),this.h()},h(){d(e,"class","getTheConversationStarted svelte-7f8774")},m(t,l){h(t,e,l),H(e,n)},p:w,d(t){t&&i(e)}}}function Z(t){let e,n,a=l.PROJECT.GET_STARTED+"";return{c(){e=s("div"),n=P(a),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=o(e);n=x(l,a),l.forEach(i),this.h()},h(){d(e,"class","getTheConversationStarted getStartedOwner svelte-7f8774"),f(e,"getStartedOwnerOffset",t[8]&&t[15])},m(t,l){h(t,e,l),H(e,n)},p(t,n){33024&n&&f(e,"getStartedOwnerOffset",t[8]&&t[15])},d(t){t&&i(e)}}}function tt(t){let e,n,l,s=t[13]&&t[13].length&&(t[4]||t[11])&&nt(t),a=t[5]&&!t[9]&&!t[7]&&!t[10]&&at(t);return{c(){s&&s.c(),e=_(),a&&a.c(),n=b()},l(t){s&&s.l(t),e=A(t),a&&a.l(t),n=b()},m(t,r){s&&s.m(t,r),h(t,e,r),a&&a.m(t,r),h(t,n,r),l=!0},p(t,l){t[13]&&t[13].length&&(t[4]||t[11])?s?(s.p(t,l),10256&l&&p(s,1)):((s=nt(t)).c(),p(s,1),s.m(e.parentNode,e)):s&&(S(),m(s,1,1,()=>{s=null}),j()),!t[5]||t[9]||t[7]||t[10]?a&&(a.d(1),a=null):a?a.p(t,l):((a=at(t)).c(),a.m(n.parentNode,n))},i(t){l||(p(s),l=!0)},o(t){m(s),l=!1},d(t){s&&s.d(t),t&&i(e),a&&a.d(t),t&&i(n)}}}function et(t){let e;const n=new B({props:{label:l.LOADING.CHANNELS}});return{c(){a(n.$$.fragment)},l(t){c(n.$$.fragment,t)},m(t,l){$(n,t,l),e=!0},p:w,i(t){e||(p(n.$$.fragment,t),e=!0)},o(t){m(n.$$.fragment,t),e=!1},d(t){u(n,t)}}}function nt(t){let e,n,l=t[13],a=[];for(let e=0;e<l.length;e+=1)a[e]=st(z(t,l,e));const c=t=>m(a[t],1,1,()=>{a[t]=null});return{c(){e=s("div");for(let t=0;t<a.length;t+=1)a[t].c();this.h()},l(t){e=r(t,"DIV",{class:!0});var n=o(e);for(let t=0;t<a.length;t+=1)a[t].l(n);n.forEach(i),this.h()},h(){d(e,"class","channelListContainer svelte-7f8774")},m(t,l){h(t,e,l);for(let t=0;t<a.length;t+=1)a[t].m(e,null);n=!0},p(t,n){if(8193&n){let s;for(l=t[13],s=0;s<l.length;s+=1){const r=z(t,l,s);a[s]?(a[s].p(r,n),p(a[s],1)):(a[s]=st(r),a[s].c(),p(a[s],1),a[s].m(e,null))}for(S(),s=l.length;s<a.length;s+=1)c(s);j()}},i(t){if(!n){for(let t=0;t<l.length;t+=1)p(a[t]);n=!0}},o(t){a=a.filter(Boolean);for(let t=0;t<a.length;t+=1)m(a[t]);n=!1},d(t){t&&i(e),F(a,t)}}}function lt(t){let e;const n=new K({props:{channel:t[20]}});return{c(){a(n.$$.fragment)},l(t){c(n.$$.fragment,t)},m(t,l){$(n,t,l),e=!0},p(t,e){const l={};8192&e&&(l.channel=t[20]),n.$set(l)},i(t){e||(p(n.$$.fragment,t),e=!0)},o(t){m(n.$$.fragment,t),e=!1},d(t){u(n,t)}}}function st(t){let e,n,l=J(t[20],t[0]),s=l&&lt(t);return{c(){s&&s.c(),e=b()},l(t){s&&s.l(t),e=b()},m(t,l){s&&s.m(t,l),h(t,e,l),n=!0},p(t,n){8193&n&&(l=J(t[20],t[0])),l?s?(s.p(t,n),8193&n&&p(s,1)):((s=lt(t)).c(),p(s,1),s.m(e.parentNode,e)):s&&(S(),m(s,1,1,()=>{s=null}),j())},i(t){n||(p(s),n=!0)},o(t){m(s),n=!1},d(t){s&&s.d(t),t&&i(e)}}}function at(t){let e,n,a,c,f,$,p=l.PROJECT.CHANNELS_FOLLOW_LINK+"",m=(t[4]?l.PROJECT.CHANNELS_FOLLOW_ALL:l.PROJECT.CHANNELS_FOLLOW)+"";return{c(){e=s("div"),n=s("a"),this.h()},l(t){e=r(t,"DIV",{class:!0});var l=o(e);n=r(l,"A",{href:!0}),o(n).forEach(i),l.forEach(i),this.h()},h(){d(n,"href",a=location.href),c=new W(null),d(e,"class","channelsFollowCta svelte-7f8774")},m(l,s){h(l,e,s),H(e,n),n.innerHTML=p,c.m(m,e),f||($=V(n,"click",t[16]),f=!0)},p(t,e){16&e&&m!==(m=(t[4]?l.PROJECT.CHANNELS_FOLLOW_ALL:l.PROJECT.CHANNELS_FOLLOW)+"")&&c.p(m)},d(t){t&&i(e),f=!1,$()}}}function rt(t){let e,n,l,s,a,r=!t[10]&&!t[2]&&U(t);const o=[et,tt],c=[];function d(t,e){return t[12]?0:1}return n=d(t),l=c[n]=o[n](t),{c(){r&&r.c(),e=_(),l.c(),s=b()},l(t){r&&r.l(t),e=A(t),l.l(t),s=b()},m(t,l){r&&r.m(t,l),h(t,e,l),c[n].m(t,l),h(t,s,l),a=!0},p(t,a){t[10]||t[2]?r&&(r.d(1),r=null):r?r.p(t,a):((r=U(t)).c(),r.m(e.parentNode,e));let i=n;(n=d(t))===i?c[n].p(t,a):(S(),m(c[i],1,1,()=>{c[i]=null}),j(),(l=c[n])||(l=c[n]=o[n](t)).c(),p(l,1),l.m(s.parentNode,s))},i(t){a||(p(l),a=!0)},o(t){m(l),a=!1},d(t){r&&r.d(t),t&&i(e),c[n].d(t),t&&i(s)}}}function ot(t){let e,n;const E=new q({props:{title:t[1]||l.PROJECT.CHANNELS_TITLE,titleOnClick:t[2]?null:"projects/"+t[14]+"/channels",showEdit:t[8]&&t[15],showMoreAction:ct,$$slots:{default:[rt]},$$scope:{ctx:t}}});return{c(){e=s("div"),a(E.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var n=o(e);c(E.$$.fragment,n),n.forEach(i),this.h()},h(){d(e,"class","channelList svelte-7f8774"),f(e,"isEditable",t[8]),f(e,"channelsActive",t[12]||t[4]||t[11]),f(e,"displayInline",t[2])},m(t,l){h(t,e,l),$(E,e,null),n=!0},p(t,[n]){const s={};2&n&&(s.title=t[1]||l.PROJECT.CHANNELS_TITLE),16388&n&&(s.titleOnClick=t[2]?null:"projects/"+t[14]+"/channels"),33024&n&&(s.showEdit=t[8]&&t[15]),8437749&n&&(s.$$scope={dirty:n,ctx:t}),E.$set(s),256&n&&f(e,"isEditable",t[8]),6160&n&&f(e,"channelsActive",t[12]||t[4]||t[11]),4&n&&f(e,"displayInline",t[2])},i(t){n||(p(E.$$.fragment,t),n=!0)},o(t){m(E.$$.fragment,t),n=!1},d(t){t&&i(e),u(E)}}}let ct=!1;function it(t,e,n){let l,s,a,r,o,c,i=w,d=()=>(i(),i=O($,t=>n(17,l=t)),$),f=w,h=()=>(f(),f=O(u,t=>n(13,r=t)),u);E(t,g,t=>n(18,s=t)),E(t,L,t=>n(19,a=t)),E(t,C,t=>n(14,o=t)),E(t,v,t=>n(15,c=t)),t.$$.on_destroy.push(()=>i()),t.$$.on_destroy.push(()=>f());let{project:$}=e;d();let{titleLabel:p=null}=e,{displayInline:m=!1}=e,u=R(null);h();let b,_,A,S,j,P,x,H=!0,J=!1;return t.$set=(t=>{"project"in t&&d(n(0,$=t.project)),"titleLabel"in t&&n(1,p=t.titleLabel),"displayInline"in t&&n(2,m=t.displayInline)}),t.$$.update=(()=>{if(131072&t.$$.dirty&&h(n(3,u=l&&N({projectId:l.id}))),393216&t.$$.dirty&&n(7,_=s&&T(l)),131200&t.$$.dirty&&n(6,b=_&&l&&l.isNew||!1),131200&t.$$.dirty&&n(8,A=_&&!l.archived||!1),131072&t.$$.dirty&&n(9,S=l&&l.following||!1),131200&t.$$.dirty&&n(10,j=_&&l&&l.archived||!1),640&t.$$.dirty&&n(11,P=S||_),532480&t.$$.dirty&&n(12,x=a&&!r),8192&t.$$.dirty){let t,e=!1,l=!1;if(r)for(let n=0;n<r.length;n++)(t=I(r[n])).postCount||y(t)?e=!0:l=!0;n(4,H=e),n(5,J=l)}}),[$,p,m,u,H,J,b,_,A,S,j,P,x,r,o,c,function(){l&&D(l.id)}]}class dt extends t{constructor(t){super(),e(this,t,it,ot,n,{project:0,titleLabel:1,displayInline:2})}}function ft(t){let e;const n=new dt({props:{project:G,displayInline:!0,titleLabel:l.CHANNELS.TITLE}});return{c(){a(n.$$.fragment)},l(t){c(n.$$.fragment,t)},m(t,l){$(n,t,l),e=!0},p:w,i(t){e||(p(n.$$.fragment,t),e=!0)},o(t){m(n.$$.fragment,t),e=!1},d(t){u(n,t)}}}function ht(t){let e,n,l;const f=new M({props:{id:"messages",$$slots:{default:[ft]},$$scope:{ctx:t}}});return{c(){e=_(),n=s("div"),a(f.$$.fragment),this.h()},l(t){k('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(i),e=A(t),n=r(t,"DIV",{class:!0});var l=o(n);c(f.$$.fragment,l),l.forEach(i),this.h()},h(){document.title="Flock",d(n,"class","content")},m(t,s){h(t,e,s),h(t,n,s),$(f,n,null),l=!0},p(t,[e]){const n={};1&e&&(n.$$scope={dirty:e,ctx:t}),f.$set(n)},i(t){l||(p(f.$$.fragment,t),l=!0)},o(t){m(f.$$.fragment,t),l=!1},d(t){t&&i(e),t&&i(n),u(f)}}}export default class extends t{constructor(t){super(),e(this,t,null,ht,n,{})}}
