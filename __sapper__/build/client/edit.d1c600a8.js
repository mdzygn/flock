import{S as t,i as s,s as e,q as a,R as r,z as o,C as c,H as n,r as l,u as i,T as f,d as m,A as $,D as d,x as u,b as p,E as h,t as b,c as v,F as g,J as j,v as x,ad as y}from"./client.bfcc6923.js";import{S as E}from"./Proxy.ed17349e.js";import"./SearchBar.3a3bc3e0.js";import"./next_arrow.b1598f96.js";import"./send.53c7ac4a.js";import"./ImageSelectionBox.b9011413.js";import"./save.71e29683.js";import{E as w}from"./EditPost.509c6b22.js";function S(t){let s,e;const r=new w({});return{c(){s=a("div"),c(r.$$.fragment),this.h()},l(t){s=l(t,"DIV",{class:!0});var e=i(s);d(r.$$.fragment,e),e.forEach(m),this.h()},h(){x(s,"class","content")},m(t,a){p(t,s,a),h(r,s,null),e=!0},i(t){e||(b(r.$$.fragment,t),e=!0)},o(t){v(r.$$.fragment,t),e=!1},d(t){t&&m(s),g(r)}}}function D(t){let s,e,j,x,y;document.title=s=t[0]+"Flock";const w=new E({props:{$$slots:{default:[S]},$$scope:{ctx:t}}});return{c(){e=a("style"),j=r("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),x=o(),c(w.$$.fragment)},l(t){const s=n('[data-svelte="svelte-1m76c4p"]',document.head);e=l(s,"STYLE",{});var a=i(e);j=f(a,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),a.forEach(m),s.forEach(m),x=$(t),d(w.$$.fragment,t)},m(t,s){u(document.head,e),u(e,j),p(t,x,s),h(w,t,s),y=!0},p(t,[e]){(!y||1&e)&&s!==(s=t[0]+"Flock")&&(document.title=s);const a={};4&e&&(a.$$scope={dirty:e,ctx:t}),w.$set(a)},i(t){y||(b(w.$$.fragment,t),y=!0)},o(t){v(w.$$.fragment,t),y=!1},d(t){m(e),t&&m(x),g(w,t)}}}function F(t,s,e){let a,r;return j(t,y,t=>e(1,a=t)),t.$$.update=(()=>{2&t.$$.dirty&&e(0,r=a&&a.title&&a.title+" - "||"")}),[r]}export default class extends t{constructor(t){super(),s(this,t,F,D,e,{})}}
