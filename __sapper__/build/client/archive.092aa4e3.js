import{S as t,i as s,s as e,z as a,q as n,C as r,H as o,d as c,A as l,r as i,u as $,D as p,v as u,b as d,E as f,t as m,c as h,F as g,J as j,Y as v,ar as y,aX as b,bv as S,n as w,aL as x,aM as P,K as C,bz as L,$ as I,e as E,L as z,I as A,p as D,y as F,R as H,T as N,U}from"./client.bf3f0363.js";import{S as _}from"./Proxy.b0650cb8.js";import"./Hotspot.d95f93bd.js";import"./ContentPanel.c41eaf0b.js";import"./ContentLoader.53c80a51.js";import"./Counter.c54762af.js";import{S as k}from"./SearchBar.617defcc.js";import{P as q}from"./ProjectList.2114b5f2.js";import"./private.1409d27c.js";import"./add_project.82d4bda8.js";function B(t){let s;const e=t[6].default,a=D(e,t,t[8],null),n=a||function(t){let s;return{c(){s=H("you have not archived any projects")},l(t){s=N(t,"you have not archived any projects")},m(t,e){d(t,s,e)},d(t){t&&c(s)}}}();return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,e){n&&n.m(t,e),s=!0},p(t,s){a&&a.p&&256&s&&F(a,e,t,t[8],s,null,null)},i(t){s||(m(n,t),s=!0)},o(t){h(n,t),s=!1},d(t){n&&n.d(t)}}}function J(t){let s;const e=t[6].default,a=D(e,t,t[8],null),n=a||function(t){let s,e,a;return{c(){s=H('no archived projects matching "'),e=H(t[1]),a=H('"')},l(n){s=N(n,'no archived projects matching "'),e=N(n,t[1]),a=N(n,'"')},m(t,n){d(t,s,n),d(t,e,n),d(t,a,n)},p(t,s){2&s&&U(e,t[1])},d(t){t&&c(s),t&&c(e),t&&c(a)}}}(t);return{c(){n&&n.c()},l(t){n&&n.l(t)},m(t,e){n&&n.m(t,e),s=!0},p(t,s){a?a.p&&256&s&&F(a,e,t,t[8],s,null,null):n&&n.p&&2&s&&n.p(t,s)},i(t){s||(m(n,t),s=!0)},o(t){h(n,t),s=!1},d(t){n&&n.d(t)}}}function K(t){let s,e,a,n;const r=[J,B],o=[];function l(t,s){return t[1]?0:1}return s=l(t),e=o[s]=r[s](t),{c(){e.c(),a=E()},l(t){e.l(t),a=E()},m(t,e){o[s].m(t,e),d(t,a,e),n=!0},p(t,n){let c=s;(s=l(t))===c?o[s].p(t,n):(z(),h(o[c],1,1,()=>{o[c]=null}),A(),(e=o[s])||(e=o[s]=r[s](t)).c(),m(e,1),e.m(a.parentNode,a))},i(t){n||(m(e),n=!0)},o(t){h(e),n=!1},d(t){o[s].d(t),t&&c(a)}}}function M(t){let s,e,n;function o(s){t[7].call(null,s)}let i={};void 0!==t[2]&&(i.searchString=t[2]);const $=new k({props:i});w.push(()=>x($,"searchString",o));const u=new q({props:{title:null,projects:t[3],showLastActive:!0,showUpdateCounter:!1,searchString:t[1],showIfNoProjects:!0,showPrivateIcon:!0,$$slots:{default:[K]},$$scope:{ctx:t}}});return{c(){r($.$$.fragment),e=a(),r(u.$$.fragment)},l(t){p($.$$.fragment,t),e=l(t),p(u.$$.fragment,t)},m(t,s){f($,t,s),d(t,e,s),f(u,t,s),n=!0},p(t,e){const a={};!s&&4&e&&(s=!0,a.searchString=t[2],P(()=>s=!1)),$.$set(a);const n={};2&e&&(n.searchString=t[1]),258&e&&(n.$$scope={dirty:e,ctx:t}),u.$set(n)},i(t){n||(m($.$$.fragment,t),m(u.$$.fragment,t),n=!0)},o(t){h($.$$.fragment,t),h(u.$$.fragment,t),n=!1},d(t){g($,t),t&&c(e),g(u,t)}}}function R(t){let s,e,j;const v=new _({props:{id:"projects",$$slots:{default:[M]},$$scope:{ctx:t}}});return{c(){s=a(),e=n("div"),r(v.$$.fragment),this.h()},l(t){o('[data-svelte="svelte-1y4v7mn"]',document.head).forEach(c),s=l(t),e=i(t,"DIV",{class:!0});var a=$(e);p(v.$$.fragment,a),a.forEach(c),this.h()},h(){document.title="Flock",u(e,"class","content svelte-uv768u")},m(t,a){d(t,s,a),d(t,e,a),f(v,e,null),j=!0},p(t,[s]){const e={};262&s&&(e.$$scope={dirty:s,ctx:t}),v.$set(e)},i(t){j||(m(v.$$.fragment,t),j=!0)},o(t){h(v.$$.fragment,t),j=!1},d(t){t&&c(s),t&&c(e),g(v)}}}function T(t,s,e){let a,n,r,o=C,c=()=>(o(),o=v(l,t=>e(5,r=t)),l);j(t,L,t=>e(2,a=t)),t.$$.on_destroy.push(()=>o());let l=I([]);c();let i=I([]);j(t,i,t=>e(4,n=t));let $,{$$slots:p={},$$scope:u}=s;return t.$set=(t=>{"$$scope"in t&&e(8,u=t.$$scope)}),t.$$.update=(()=>{4&t.$$.dirty&&e(1,$=a),34&t.$$.dirty&&y(i,n=b(r,{searchString:$}))}),c(e(0,l=S())),[l,$,a,i,n,r,p,function(t){a=t,L.set(a)},u]}export default class extends t{constructor(t){super(),s(this,t,T,R,e,{})}}