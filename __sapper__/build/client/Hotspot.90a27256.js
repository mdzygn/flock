import{S as s,i as t,s as l,e,b as n,K as c,d as a,q as i,r,u as o,v as h,B as u,l as f,G as p,R as y,T as d,x as m}from"./client.618c796c.js";function v(s){let t,l,e;return{c(){t=i("div"),this.h()},l(s){t=r(s,"DIV",{class:!0,style:!0}),o(t).forEach(a),this.h()},h(){h(t,"class","hotspot svelte-1pfzviz"),h(t,"style",s[2]),u(t,"button",s[1])},m(c,a){n(c,t,a),l||(e=f(t,"click",function(){p(s[1])&&s[1].apply(this,arguments)}),l=!0)},p(l,e){s=l,4&e&&h(t,"style",s[2]),2&e&&u(t,"button",s[1])},d(s){s&&a(t),l=!1,e()}}}function k(s){let t,l,e,c;return{c(){t=i("a"),l=y(" "),this.h()},l(s){t=r(s,"A",{href:!0,class:!0,style:!0});var e=o(t);l=d(e," "),e.forEach(a),this.h()},h(){h(t,"href",s[0]),h(t,"class","hotspot svelte-1pfzviz"),h(t,"style",s[2])},m(a,i){n(a,t,i),m(t,l),e||(c=f(t,"click",function(){p(s[1])&&s[1].apply(this,arguments)}),e=!0)},p(l,e){s=l,1&e&&h(t,"href",s[0]),4&e&&h(t,"style",s[2])},d(s){s&&a(t),e=!1,c()}}}function z(s){let t;function l(s,t){return s[0]?k:v}let i=l(s),r=i(s);return{c(){r.c(),t=e()},l(s){r.l(s),t=e()},m(s,l){r.m(s,l),n(s,t,l)},p(s,[e]){i===(i=l(s))&&r?r.p(s,e):(r.d(1),(r=i(s))&&(r.c(),r.m(t.parentNode,t)))},i:c,o:c,d(s){r.d(s),s&&a(t)}}}function C(s,t,l){let{href:e=null}=t,{onClick:n=null}=t,{style:c=null}=t;return s.$set=(s=>{"href"in s&&l(0,e=s.href),"onClick"in s&&l(1,n=s.onClick),"style"in s&&l(2,c=s.style)}),[e,n,c]}class b extends s{constructor(s){super(),t(this,s,C,z,l,{href:0,onClick:1,style:2})}}export{b as H};
