import{S as t,i as e,s,q as o,R as n,r,u as a,T as l,d as c,v as i,b as h,x as u,U as d,z as p,A as f,w as m,K as w,t as $,C as v,D as A,E as g,c as j,F as S,L as I,I as C,l as M,J as P,a4 as y,Y as L,aF as N,aQ as b,bs as D,$ as V,V as U,Z as E,aj as Q,Q as k,e as x,aC as R,ab as W,p as B,y as F}from"./client.dc76f29a.js";import"./Proxy.a2f2476e.js";import"./Hotspot.79779b5e.js";import{C as Y}from"./ContentPanel.46beacc1.js";import{C as J}from"./ContentLoader.4f3b4ea3.js";import{C as T}from"./Counter.1c90acea.js";import{P as q}from"./private.1409d27c.js";const O="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAoCAYAAACIC2hQAAACdElEQVRYR+2YsY7UMBBAZ7yhQEICJAok0LL2pqdGQoDEF1Cgg+oQUFBCxx/QAR8ACDro4A8A8QdUSIm9bMN1XAVCbDzIpwsK2Ww8vsweOunSejJ58+IZZxfhgFx4QDjhEFT6TYkbNcb8IKJfzrmTkrCioMaYZwBwJwAqpR4URfFUClYUdDqd/iaiLMAR0bakVTHQps3aoqRVMdCmzRpU0qoIaJdNaasioF02pa0OBu2zKWl1MKjW+jsinugbQxJ7dRBonuf3vfdPOLNy6ARgg04mk40sy84T0QUiOktEpxDxOAD/eyGYBYCfSqkvAFBUVfUZEd85577Gil0CDUCj0eie9z5AaKXUsXqIx5INWW8WEeDbp9oSqDHGp1gaAtd3r7X2H7Yu0L/n9bogGHmfW2vvNuM69yhn5DAetteQJciQaGUz/SfYTshe0LC4z7ArIaOg+wRLAPCivSfb+4Y1R9dolrz3N2ez2ZvYhmaBhiS7p9BjwdHFhmS9+mal4TBQSr2OVc9Z997f4Jisc7GNhhskQVPP/iTQPM8fee8fcowxYnq7fE/NVN+ktX6PiJcZENEQIvrgnLsSDdwNSDKqtf6GiKe5ySNx29Za9m//JNDw5wIAHBUCJWut4uZKBQ3DWewiognnWzRpPDE7nojoIyIWAHA7NnNTOp9tNNLxO4AAsFkb0lqfA4BXiHipB/ittfYa5xWxQXs6viSiq6teYQS4tNbm0qDtji8Xi8Wt+Xz+ifOgFcDszk8xugNKRFtVVV3nAraLGI/HF7MsewkAU0RclGV5hFMoGzQ8QCl1JuV87gMI+cI6t2A2KKfqdcYcgkrb/QOFkys4PrgvFQAAAABJRU5ErkJggg==";function z(t){let e,s,p;return{c(){e=o("div"),s=o("div"),p=n(t[8]),this.h()},l(o){e=r(o,"DIV",{class:!0});var n=a(e);s=r(n,"DIV",{class:!0});var i=a(s);p=l(i,t[8]),i.forEach(c),n.forEach(c),this.h()},h(){i(s,"class","projectStatus svelte-1am0tsn"),i(e,"class","projectStatusLine svelte-1am0tsn")},m(t,o){h(t,e,o),u(e,s),u(s,p)},p(t,e){256&e&&d(p,t[8])},d(t){t&&c(e)}}}function G(t){let e,s;return{c(){e=o("div"),s=n(t[9]),this.h()},l(o){e=r(o,"DIV",{class:!0});var n=a(e);s=l(n,t[9]),n.forEach(c),this.h()},h(){i(e,"class","detail svelte-1am0tsn")},m(t,o){h(t,e,o),u(e,s)},p(t,e){512&e&&d(s,t[9])},d(t){t&&c(e)}}}function K(t){let e,s,n,l,d,w=t[2]&&t[10]&&Z(),v=t[1]&&t[11]&&H(t);return{c(){e=o("div"),w&&w.c(),s=p(),v&&v.c(),n=p(),l=o("div"),this.h()},l(t){e=r(t,"DIV",{class:!0});var o=a(e);w&&w.l(o),s=f(o),v&&v.l(o),n=f(o),l=r(o,"DIV",{class:!0,style:!0}),a(l).forEach(c),o.forEach(c),this.h()},h(){i(l,"class","followingIcon svelte-1am0tsn"),m(l,"background-image","url("+O+")"),i(e,"class","info svelte-1am0tsn")},m(t,o){h(t,e,o),w&&w.m(e,null),u(e,s),v&&v.m(e,null),u(e,n),u(e,l),d=!0},p(t,o){t[2]&&t[10]?w?w.p(t,o):((w=Z()).c(),w.m(e,s)):w&&(w.d(1),w=null),t[1]&&t[11]?v?(v.p(t,o),2050&o&&$(v,1)):((v=H(t)).c(),$(v,1),v.m(e,n)):v&&(I(),j(v,1,1,()=>{v=null}),C())},i(t){d||($(v),d=!0)},o(t){j(v),d=!1},d(t){t&&c(e),w&&w.d(),v&&v.d()}}}function Z(t){let e;return{c(){e=o("div"),this.h()},l(t){e=r(t,"DIV",{class:!0,style:!0}),a(e).forEach(c),this.h()},h(){i(e,"class","privateIcon"),m(e,"background-image","url("+q+")")},m(t,s){h(t,e,s)},p:w,d(t){t&&c(e)}}}function H(t){let e;const s=new T({props:{count:t[11],hasNew:t[11]}});return{c(){v(s.$$.fragment)},l(t){A(s.$$.fragment,t)},m(t,o){g(s,t,o),e=!0},p(t,e){const o={};2048&e&&(o.count=t[11]),2048&e&&(o.hasNew=t[11]),s.$set(o)},i(t){e||($(s.$$.fragment,t),e=!0)},o(t){j(s.$$.fragment,t),e=!1},d(t){S(s,t)}}}function X(t){let e,s,m,w,v,A,g,S,P,y,L,N,b,D,V,U=t[5].title+"",E=t[3]&&t[8]&&z(t),Q=t[9]&&G(t),k=(t[5].following||t[4])&&K(t);return{c(){e=o("div"),s=o("img"),v=p(),A=o("div"),g=o("div"),S=o("div"),P=n(U),y=p(),E&&E.c(),L=p(),Q&&Q.c(),N=p(),k&&k.c(),this.h()},l(t){e=r(t,"DIV",{class:!0});var o=a(e);s=r(o,"IMG",{class:!0,src:!0,alt:!0}),v=f(o),A=r(o,"DIV",{class:!0});var n=a(A);g=r(n,"DIV",{class:!0});var i=a(g);S=r(i,"DIV",{class:!0});var h=a(S);P=l(h,U),h.forEach(c),y=f(i),E&&E.l(i),L=f(i),Q&&Q.l(i),i.forEach(c),n.forEach(c),N=f(o),k&&k.l(o),o.forEach(c),this.h()},h(){i(s,"class","thumb svelte-1am0tsn"),s.src!==(m=t[6])&&i(s,"src",m),i(s,"alt",w=t[5].title),i(S,"class","title svelte-1am0tsn"),i(g,"class","detailInnerContent"),i(A,"class","detailContent svelte-1am0tsn"),i(e,"class","projectListItem svelte-1am0tsn")},m(o,n){h(o,e,n),u(e,s),u(e,v),u(e,A),u(A,g),u(g,S),u(S,P),u(g,y),E&&E.m(g,null),u(g,L),Q&&Q.m(g,null),u(e,N),k&&k.m(e,null),b=!0,D||(V=M(e,"click",t[12]),D=!0)},p(t,[o]){(!b||64&o&&s.src!==(m=t[6]))&&i(s,"src",m),(!b||32&o&&w!==(w=t[5].title))&&i(s,"alt",w),(!b||32&o)&&U!==(U=t[5].title+"")&&d(P,U),t[3]&&t[8]?E?E.p(t,o):((E=z(t)).c(),E.m(g,L)):E&&(E.d(1),E=null),t[9]?Q?Q.p(t,o):((Q=G(t)).c(),Q.m(g,null)):Q&&(Q.d(1),Q=null),t[5].following||t[4]?k?(k.p(t,o),48&o&&$(k,1)):((k=K(t)).c(),$(k,1),k.m(e,null)):k&&(I(),j(k,1,1,()=>{k=null}),C())},i(t){b||($(k),b=!0)},o(t){j(k),b=!1},d(t){t&&c(e),E&&E.d(),Q&&Q.d(),k&&k.d(),D=!1,V()}}}function _(t,e,s){let o,n,r,a=w,l=()=>(a(),a=L(i,t=>s(5,n=t)),i),c=w;P(t,y,t=>s(15,o=t)),t.$$.on_destroy.push(()=>a()),t.$$.on_destroy.push(()=>c());let{project:i}=e;l();let h,u,d,p,f,m,$,{showLastActive:v=!1}=e,{showUpdateCounter:A=!0}=e,{showPrivateIcon:g=!1}=e,{showProjectStatus:j=!1}=e,S="";return t.$set=(t=>{"project"in t&&l(s(0,i=t.project)),"showLastActive"in t&&s(13,v=t.showLastActive),"showUpdateCounter"in t&&s(1,A=t.showUpdateCounter),"showPrivateIcon"in t&&s(2,g=t.showPrivateIcon),"showProjectStatus"in t&&s(3,j=t.showProjectStatus)}),t.$$.update=(()=>{32800&t.$$.dirty&&s(4,h=o&&N(n)),32&t.$$.dirty&&s(6,u=b(n,!0)),8224&t.$$.dirty&&s(16,d=n&&(v?n.lastActiveAt:n.createdAt)),32&t.$$.dirty&&(()=>(c(),c=L(p,t=>s(11,r=t)),p))(s(7,p=n&&D(n.id)||V(0))),32&t.$$.dirty&&s(8,f=(n&&n.status||U.PROJECT.DEFAULT_STATUS).toUpperCase()),73728&t.$$.dirty&&d&&s(14,S=v?"active "+E(d):"created "+Q(d,"d MMM yyyy")),16384&t.$$.dirty&&s(9,m=S),32&t.$$.dirty&&s(10,$=n&&!n.public||!1)}),[i,A,g,j,h,n,u,p,f,m,$,r,function(){k(n.id)},v]}class tt extends t{constructor(t){super(),e(this,t,_,X,s,{project:0,showLastActive:13,showUpdateCounter:1,showPrivateIcon:2,showProjectStatus:3})}}function et(t,e,s){const o=t.slice();return o[19]=e[s],o[21]=s,o}function st(t){let e,s,n;const l=new Y({props:{title:t[2],showMoreAction:!(!t[14]&&!t[11])&&t[8],hideShowMoreWithVisibility:t[10],forceShowMoreShow:t[11],showMoreLabel:t[12],$$slots:{default:[ht]},$$scope:{ctx:t}}});return{c(){e=o("div"),v(l.$$.fragment),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=a(e);A(l.$$.fragment,s),s.forEach(c),this.h()},h(){i(e,"class",s="projectList "+t[3]+" svelte-19jk3vm")},m(t,s){h(t,e,s),g(l,e,null),n=!0},p(t,o){const r={};4&o&&(r.title=t[2]),18688&o&&(r.showMoreAction=!(!t[14]&&!t[11])&&t[8]),1024&o&&(r.hideShowMoreWithVisibility=t[10]),2048&o&&(r.forceShowMoreShow=t[11]),4096&o&&(r.showMoreLabel=t[12]),368882&o&&(r.$$scope={dirty:o,ctx:t}),l.$set(r),(!n||8&o&&s!==(s="projectList "+t[3]+" svelte-19jk3vm"))&&i(e,"class",s)},i(t){n||($(l.$$.fragment,t),n=!0)},o(t){j(l.$$.fragment,t),n=!1},d(t){t&&c(e),S(l)}}}function ot(t){let e,s,o=t[15],n=[];for(let e=0;e<o.length;e+=1)n[e]=it(et(t,o,e));const r=t=>j(n[t],1,1,()=>{n[t]=null});let a=null;return o.length||(a=rt(t)),{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=x(),a&&a.c()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=x(),a&&a.l(t)},m(t,o){for(let e=0;e<n.length;e+=1)n[e].m(t,o);h(t,e,o),a&&a.m(t,o),s=!0},p(t,s){if(303346&s){let l;for(o=t[15],l=0;l<o.length;l+=1){const r=et(t,o,l);n[l]?(n[l].p(r,s),$(n[l],1)):(n[l]=it(r),n[l].c(),$(n[l],1),n[l].m(e.parentNode,e))}for(I(),l=o.length;l<n.length;l+=1)r(l);C(),!o.length&&a?a.p(t,s):o.length?a&&(a.d(1),a=null):((a=rt(t)).c(),a.m(e.parentNode,e))}},i(t){if(!s){for(let t=0;t<o.length;t+=1)$(n[t]);s=!0}},o(t){n=n.filter(Boolean);for(let t=0;t<n.length;t+=1)j(n[t]);s=!1},d(t){W(n,t),t&&c(e),a&&a.d(t)}}}function nt(t){let e;const s=new J({props:{label:U.LOADING.PROJECT_ITEMS}});return{c(){v(s.$$.fragment)},l(t){A(s.$$.fragment,t)},m(t,o){g(s,t,o),e=!0},p:w,i(t){e||($(s.$$.fragment,t),e=!0)},o(t){j(s.$$.fragment,t),e=!1},d(t){S(s,t)}}}function rt(t){let e,s,n,l,d;const m=[lt,at],w=[];function v(t,e){return t[4]?0:1}return s=v(t),n=w[s]=m[s](t),{c(){e=o("div"),n.c(),l=p(),this.h()},l(t){e=r(t,"DIV",{class:!0});var s=a(e);n.l(s),l=f(s),s.forEach(c),this.h()},h(){i(e,"class","noProjects svelte-19jk3vm")},m(t,o){h(t,e,o),w[s].m(e,null),u(e,l),d=!0},p(t,o){let r=s;(s=v(t))===r?w[s].p(t,o):(I(),j(w[r],1,1,()=>{w[r]=null}),C(),(n=w[s])||(n=w[s]=m[s](t)).c(),$(n,1),n.m(e,l))},i(t){d||($(n),d=!0)},o(t){j(n),d=!1},d(t){t&&c(e),w[s].d()}}}function at(t){let e;const s=t[17].default,o=B(s,t,t[18],null),r=o||function(t){let e;return{c(){e=n("no projects found")},l(t){e=l(t,"no projects found")},m(t,s){h(t,e,s)},d(t){t&&c(e)}}}();return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,s){r&&r.m(t,s),e=!0},p(t,e){o&&o.p&&262144&e&&F(o,s,t,t[18],e,null,null)},i(t){e||($(r,t),e=!0)},o(t){j(r,t),e=!1},d(t){r&&r.d(t)}}}function lt(t){let e;const s=t[17].default,o=B(s,t,t[18],null),r=o||function(t){let e,s,o;return{c(){e=n('no projects found matching "'),s=n(t[4]),o=n('"')},l(n){e=l(n,'no projects found matching "'),s=l(n,t[4]),o=l(n,'"')},m(t,n){h(t,e,n),h(t,s,n),h(t,o,n)},p(t,e){16&e&&d(s,t[4])},d(t){t&&c(e),t&&c(s),t&&c(o)}}}(t);return{c(){r&&r.c()},l(t){r&&r.l(t)},m(t,s){r&&r.m(t,s),e=!0},p(t,e){o?o.p&&262144&e&&F(o,s,t,t[18],e,null,null):r&&r.p&&16&e&&r.p(t,e)},i(t){e||($(r,t),e=!0)},o(t){j(r,t),e=!1},d(t){r&&r.d(t)}}}function ct(t){let e;const s=new tt({props:{project:t[19],showLastActive:t[5],showProjectStatus:t[7],showUpdateCounter:t[6],showPrivateIcon:t[13]}});return{c(){v(s.$$.fragment)},l(t){A(s.$$.fragment,t)},m(t,o){g(s,t,o),e=!0},p(t,e){const o={};32768&e&&(o.project=t[19]),32&e&&(o.showLastActive=t[5]),128&e&&(o.showProjectStatus=t[7]),64&e&&(o.showUpdateCounter=t[6]),8192&e&&(o.showPrivateIcon=t[13]),s.$set(o)},i(t){e||($(s.$$.fragment,t),e=!0)},o(t){j(s.$$.fragment,t),e=!1},d(t){S(s,t)}}}function it(t){let e,s,o=(!t[1]||t[21]<t[1])&&ct(t);return{c(){o&&o.c(),e=x()},l(t){o&&o.l(t),e=x()},m(t,n){o&&o.m(t,n),h(t,e,n),s=!0},p(t,s){!t[1]||t[21]<t[1]?o?(o.p(t,s),2&s&&$(o,1)):((o=ct(t)).c(),$(o,1),o.m(e.parentNode,e)):o&&(I(),j(o,1,1,()=>{o=null}),C())},i(t){s||($(o),s=!0)},o(t){j(o),s=!1},d(t){o&&o.d(t),t&&c(e)}}}function ht(t){let e,s,o,n;const r=[nt,ot],a=[];function l(t,e){return!t[16]||t[15]&&t[15].length?1:0}return e=l(t),s=a[e]=r[e](t),{c(){s.c(),o=x()},l(t){s.l(t),o=x()},m(t,s){a[e].m(t,s),h(t,o,s),n=!0},p(t,n){let c=e;(e=l(t))===c?a[e].p(t,n):(I(),j(a[c],1,1,()=>{a[c]=null}),C(),(s=a[e])||(s=a[e]=r[e](t)).c(),$(s,1),s.m(o.parentNode,o))},i(t){n||($(s),n=!0)},o(t){j(s),n=!1},d(t){a[e].d(t),t&&c(o)}}}function ut(t){let e,s,o=(t[15]&&t[15].length||t[9])&&st(t);return{c(){o&&o.c(),e=x()},l(t){o&&o.l(t),e=x()},m(t,n){o&&o.m(t,n),h(t,e,n),s=!0},p(t,[s]){t[15]&&t[15].length||t[9]?o?(o.p(t,s),33280&s&&$(o,1)):((o=st(t)).c(),$(o,1),o.m(e.parentNode,e)):o&&(I(),j(o,1,1,()=>{o=null}),C())},i(t){s||($(o),s=!0)},o(t){j(o),s=!1},d(t){o&&o.d(t),t&&c(e)}}}function dt(t,e,s){let o,n,r=w,a=()=>(r(),r=L(l,t=>s(15,o=t)),l);P(t,R,t=>s(16,n=t)),t.$$.on_destroy.push(()=>r());let{projects:l}=e;a();let c,{displayLimit:i=0}=e,{title:h="Projects"}=e,{className:u=""}=e,{searchString:d=null}=e,{showLastActive:p=!1}=e,{showUpdateCounter:f=!0}=e,{showProjectStatus:m=!1}=e,{showMoreAction:$=!1}=e,{showIfNoProjects:v=!1}=e,{hideShowMoreWithVisibility:A=!1}=e,{forceShowMoreShow:g=!1}=e,{showMoreLabel:j=null}=e,{showPrivateIcon:S=!1}=e,{$$slots:I={},$$scope:C}=e;return t.$set=(t=>{"projects"in t&&a(s(0,l=t.projects)),"displayLimit"in t&&s(1,i=t.displayLimit),"title"in t&&s(2,h=t.title),"className"in t&&s(3,u=t.className),"searchString"in t&&s(4,d=t.searchString),"showLastActive"in t&&s(5,p=t.showLastActive),"showUpdateCounter"in t&&s(6,f=t.showUpdateCounter),"showProjectStatus"in t&&s(7,m=t.showProjectStatus),"showMoreAction"in t&&s(8,$=t.showMoreAction),"showIfNoProjects"in t&&s(9,v=t.showIfNoProjects),"hideShowMoreWithVisibility"in t&&s(10,A=t.hideShowMoreWithVisibility),"forceShowMoreShow"in t&&s(11,g=t.forceShowMoreShow),"showMoreLabel"in t&&s(12,j=t.showMoreLabel),"showPrivateIcon"in t&&s(13,S=t.showPrivateIcon),"$$scope"in t&&s(18,C=t.$$scope)}),t.$$.update=(()=>{32770&t.$$.dirty&&s(14,c=i&&o.length>i)}),[l,i,h,u,d,p,f,m,$,v,A,g,j,S,c,o,n,I,C]}class pt extends t{constructor(t){super(),e(this,t,dt,ut,s,{projects:0,displayLimit:1,title:2,className:3,searchString:4,showLastActive:5,showUpdateCounter:6,showProjectStatus:7,showMoreAction:8,showIfNoProjects:9,hideShowMoreWithVisibility:10,forceShowMoreShow:11,showMoreLabel:12,showPrivateIcon:13})}}export{pt as P};