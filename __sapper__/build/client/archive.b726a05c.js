import{S as t,i as s,s as e,n as a,e as n,p as r,c as o,q as c,g as l,h as i,r as $,u as p,a as u,v as d,j as m,m as f,t as h,b as g,d as j,l as v,Q as y,an as S,aU as b,br as w,aI as x,aJ as I,aK as P,x as C,bv as L,U,f as k,y as E,k as H,K as J,L as K,H as N,I as _,J as q}from"./client.3c58eb54.js";import"./Hotspot.caf8438e.js";import"./ContentPanel.74b5a69d.js";import"./ContentLoader.96416f59.js";import"./Counter.b7afd850.js";import{S as A}from"./SearchBar.bd81e333.js";import{P as B}from"./ProjectList.36c78da7.js";import"./private.1409d27c.js";import"./add_project.82d4bda8.js";function D(t){let s;const e=t[6].default,a=J(e,t,t[8],null),n=a||function(t){let s;return{c(){s=N("you have not archived any projects")},l(t){s=_(t,"you have not archived any projects")},m(t,e){m(t,s,e)},d(t){t&&l(s)}}}();return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,e){n&&n.m(t,e),s=!0},p(t,s){a&&a.p&&256&s&&K(a,e,t,t[8],s,null,null)},i(t){s||(h(n,t),s=!0)},o(t){g(n,t),s=!1},d(t){n&&n.d(t)}}}function F(t){let s;const e=t[6].default,a=J(e,t,t[8],null),n=a||function(t){let s,e,a;return{c(){s=N('no archived projects matching "'),e=N(t[1]),a=N('"')},l(n){s=_(n,'no archived projects matching "'),e=_(n,t[1]),a=_(n,'"')},m(t,n){m(t,s,n),m(t,e,n),m(t,a,n)},p(t,s){2&s&&q(e,t[1])},d(t){t&&l(s),t&&l(e),t&&l(a)}}}(t);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,e){n&&n.m(t,e),s=!0},p(t,s){a?a.p&&256&s&&K(a,e,t,t[8],s,null,null):n&&n.p&&2&s&&n.p(t,s)},i(t){s||(h(n,t),s=!0)},o(t){g(n,t),s=!1},d(t){n&&n.d(t)}}}function Q(t){let s,e,a,n;const r=[F,D],o=[];function c(t,s){return t[1]?0:1}return s=c(t),e=o[s]=r[s](t),{c(){e.c(),a=k()},l(t){e.l(t),a=k()},m(t,e){o[s].m(t,e),m(t,a,e),n=!0},p(t,n){let l=s;(s=c(t))===l?o[s].p(t,n):(E(),g(o[l],1,1,()=>{o[l]=null}),H(),(e=o[s])||(e=o[s]=r[s](t)).c(),h(e,1),e.m(a.parentNode,a))},i(t){n||(h(e),n=!0)},o(t){g(e),n=!1},d(t){o[s].d(t),t&&l(a)}}}function V(t){let s,e,a;function r(s){t[7].call(null,s)}let c={};void 0!==t[2]&&(c.searchString=t[2]);const $=new A({props:c});x.push(()=>I($,"searchString",r));const p=new B({props:{title:null,projects:t[3],showLastActive:!0,showUpdateCounter:!1,searchString:t[1],showIfNoProjects:!0,showPrivateIcon:!0,$$slots:{default:[Q]},$$scope:{ctx:t}}});return{c(){o($.$$.fragment),e=n(),o(p.$$.fragment)},l(t){u($.$$.fragment,t),e=i(t),u(p.$$.fragment,t)},m(t,s){f($,t,s),m(t,e,s),f(p,t,s),a=!0},p(t,e){const a={};!s&&4&e&&(s=!0,a.searchString=t[2],P(()=>s=!1)),$.$set(a);const n={};2&e&&(n.searchString=t[1]),258&e&&(n.$$scope={dirty:e,ctx:t}),p.$set(n)},i(t){a||(h($.$$.fragment,t),h(p.$$.fragment,t),a=!0)},o(t){g($.$$.fragment,t),g(p.$$.fragment,t),a=!1},d(t){j($,t),t&&l(e),j(p,t)}}}function z(t){let s,e,v;const y=new a({props:{id:"projects",$$slots:{default:[V]},$$scope:{ctx:t}}});return{c(){s=n(),e=r("div"),o(y.$$.fragment),this.h()},l(t){c('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(l),s=i(t),e=$(t,"DIV",{class:!0});var a=p(e);u(y.$$.fragment,a),a.forEach(l),this.h()},h(){document.title="Flock",d(e,"class","content svelte-uv768u")},m(t,a){m(t,s,a),m(t,e,a),f(y,e,null),v=!0},p(t,[s]){const e={};262&s&&(e.$$scope={dirty:s,ctx:t}),y.$set(e)},i(t){v||(h(y.$$.fragment,t),v=!0)},o(t){g(y.$$.fragment,t),v=!1},d(t){t&&l(s),t&&l(e),j(y)}}}function G(t,s,e){let a,n,r,o=C,c=()=>(o(),o=y(l,t=>e(5,r=t)),l);v(t,L,t=>e(2,a=t)),t.$$.on_destroy.push(()=>o());let l=U([]);c();let i=U([]);v(t,i,t=>e(4,n=t));let $,{$$slots:p={},$$scope:u}=s;return t.$set=(t=>{"$$scope"in t&&e(8,u=t.$$scope)}),t.$$.update=(()=>{4&t.$$.dirty&&e(1,$=a),34&t.$$.dirty&&S(i,n=b(r,{searchString:$}))}),c(e(0,l=w())),[l,$,a,i,n,r,p,function(t){a=t,L.set(a)},u]}export default class extends t{constructor(t){super(),s(this,t,G,z,e,{})}}
