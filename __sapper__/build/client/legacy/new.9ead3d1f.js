import{_ as t,a as n,b as r,c as e,i as a,s as o,d as s,S as c,y as i,Z as f,F as u,J as l,O as m,z as $,A as p,$ as v,j as h,G as d,K as y,D as b,g,L as j,I as x,t as D,h as E,M as S,Q as w,B as R,al as B}from"./client.e555a21f.js";import{S as F}from"./Proxy.cb1a6ee2.js";import"./SearchBar.9641e103.js";import"./next_arrow.b1598f96.js";import"./send.53c7ac4a.js";import"./ImageSelectionBox.6ca10663.js";import"./save.71e29683.js";import{E as I}from"./EditPost.7f091304.js";function P(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}();return function(){var a,o=n(t);if(e){var s=n(this).constructor;a=Reflect.construct(o,arguments,s)}else a=o.apply(this,arguments);return r(this,a)}}function k(t){var n,r,e=new I({});return{c:function(){n=i("div"),l(e.$$.fragment),this.h()},l:function(t){n=$(t,"DIV",{class:!0});var r=p(n);y(e.$$.fragment,r),r.forEach(h),this.h()},h:function(){R(n,"class","content")},m:function(t,a){g(t,n,a),j(e,n,null),r=!0},i:function(t){r||(D(e.$$.fragment,t),r=!0)},o:function(t){E(e.$$.fragment,t),r=!1},d:function(t){t&&h(n),S(e)}}}function L(t){var n,r,e,a,o;document.title=n=t[0]+"Flock";var s=new F({props:{$$slots:{default:[k]},$$scope:{ctx:t}}});return{c:function(){r=i("style"),e=f("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),a=u(),l(s.$$.fragment)},l:function(t){var n=m('[data-svelte="svelte-1m76c4p"]',document.head);r=$(n,"STYLE",{});var o=p(r);e=v(o,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),o.forEach(h),n.forEach(h),a=d(t),y(s.$$.fragment,t)},m:function(t,n){b(document.head,r),b(r,e),g(t,a,n),j(s,t,n),o=!0},p:function(t,r){var e=x(r,1)[0];(!o||1&e)&&n!==(n=t[0]+"Flock")&&(document.title=n);var a={};4&e&&(a.$$scope={dirty:e,ctx:t}),s.$set(a)},i:function(t){o||(D(s.$$.fragment,t),o=!0)},o:function(t){E(s.$$.fragment,t),o=!1},d:function(t){h(r),t&&h(a),S(s,t)}}}function _(t,n,r){var e,a;return w(t,B,function(t){return r(1,e=t)}),t.$$.update=function(){2&t.$$.dirty&&r(0,a=e&&e.title&&e.title+" - "||"")},[a]}export default(function(n){t(i,c);var r=P(i);function i(t){var n;return e(this,i),n=r.call(this),a(s(n),t,_,L,o,{}),n}return i}());