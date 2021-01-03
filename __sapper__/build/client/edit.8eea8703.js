import{S as a,i as s,s as e,n as t,p as l,H as r,e as n,c,q as o,r as i,u as f,I as u,g as $,h as d,a as I,w as m,j as v,m as p,t as E,b as h,d as g,l as x,Q as D,bf as L,ca as T,N as _,W as O,aI as P,aJ as b,v as R,aG as A,F,aH as y,aK as S,a6 as C,x as H,Z as N,Y as U,U as V,bZ as M,cb as w,cc as k,A as j,ad as B,an as W,M as X}from"./client.01f003d3.js";import"./Hotspot.9c34f817.js";import"./SearchBar.4c628d8d.js";import"./LimitedTextfield.2fd0c1cd.js";import{U as G,I as K,a as q,E as Y}from"./ImageSelectionBox.93f701fe.js";import{S as Z}from"./save.71e29683.js";import{C as J}from"./cancel.feaa218b.js";function Q(a){let s,e=X.EDIT_PROFILE.CONFIRM+"";return{c(){s=r(e)},l(a){s=u(a,e)},m(a,e){v(a,s,e)},p:H,d(a){a&&$(s)}}}function z(a){let s,e=X.EDIT_PROFILE.UPLOAD_PROFILE_IMAGE+"";return{c(){s=r(e)},l(a){s=u(a,e)},m(a,e){v(a,s,e)},p:H,d(a){a&&$(s)}}}function aa(a){let s,e=X.EDIT_PROFILE.CANCEL+"";return{c(){s=r(e)},l(a){s=u(a,e)},m(a,e){v(a,s,e)},p:H,d(a){a&&$(s)}}}function sa(a){let s,e=X.EDIT_PROFILE.CONFIRM+"";return{c(){s=r(e)},l(a){s=u(a,e)},m(a,e){v(a,s,e)},p:H,d(a){a&&$(s)}}}function ea(a){let s,e,t,o,x,D,L,T,H,N,U,V,M,w,k,j,B,W,q,Y,ea,ta,la,ra,na,ca,oa,ia,fa,ua,$a,da,Ia,ma,va,pa,Ea,ha,ga,xa,Da,La,Ta,_a,Oa,Pa,ba=X.EDIT_PROFILE.NAME+"",Ra=X.EDIT_PROFILE.BIO+"",Aa=X.EDIT_PROFILE.BIO_TIP+"",Fa=X.EDIT_PROFILE.COVER_IMAGE+"",ya=X.EDIT_PROFILE.SKILLS+"",Sa=X.EDIT_PROFILE.SKILLS_TIP+"",Ca=X.EDIT_PROFILE.LOCATION+"",Ha=X.EDIT_PROFILE.LOCATION_TIP+"";const Na=new _({props:{className:"saveButton",onClick:a[12],icon:Z,disabled:!a[10],$$slots:{default:[Q]},$$scope:{ctx:a}}}),Ua=new O({props:{user:a[0],onClick:a[13]}}),Va=new _({props:{className:"uploadAvatarButton",onClick:a[15],icon:G,$$slots:{default:[z]},$$scope:{ctx:a}}});function Ma(s){a[26].call(null,s)}function wa(s){a[27].call(null,s)}let ka={uploadType:"userCover",itemId:a[11]};void 0!==a[3]&&(ka.image=a[3]),void 0!==a[6]&&(ka.fileIsUploading=a[6]);const ja=new K({props:ka});P.push(()=>b(ja,"image",Ma)),P.push(()=>b(ja,"fileIsUploading",wa));const Ba=new _({props:{className:"cancelButton",onClick:a[14],icon:J,$$slots:{default:[aa]},$$scope:{ctx:a}}}),Wa=new _({props:{className:"saveButton",onClick:a[12],icon:Z,disabled:!a[10],$$slots:{default:[sa]},$$scope:{ctx:a}}});return{c(){s=l("div"),e=l("div"),t=l("div"),o=l("div"),c(Na.$$.fragment),x=n(),c(Ua.$$.fragment),D=n(),c(Va.$$.fragment),L=n(),T=l("div"),H=l("div"),N=r(ba),U=n(),V=l("input"),M=n(),w=l("div"),k=l("div"),j=r(Ra),B=l("span"),W=n(),q=l("textarea"),Y=n(),ea=l("div"),ta=l("div"),la=r(Fa),ra=n(),c(ja.$$.fragment),oa=n(),ia=l("div"),fa=l("div"),ua=r(ya),$a=l("span"),da=n(),Ia=l("textarea"),ma=n(),va=l("div"),pa=l("div"),Ea=r(Ca),ha=l("span"),ga=n(),xa=l("input"),Da=n(),La=l("div"),c(Ba.$$.fragment),Ta=n(),c(Wa.$$.fragment),this.h()},l(a){s=i(a,"DIV",{class:!0});var l=f(s);e=i(l,"DIV",{class:!0});var r=f(e);t=i(r,"DIV",{class:!0});var n=f(t);o=i(n,"DIV",{class:!0});var c=f(o);I(Na.$$.fragment,c),c.forEach($),x=d(n),I(Ua.$$.fragment,n),D=d(n),I(Va.$$.fragment,n),L=d(n),T=i(n,"DIV",{class:!0});var m=f(T);H=i(m,"DIV",{class:!0});var v=f(H);N=u(v,ba),v.forEach($),U=d(m),V=i(m,"INPUT",{type:!0,class:!0}),m.forEach($),M=d(n),w=i(n,"DIV",{class:!0});var p=f(w);k=i(p,"DIV",{class:!0});var E=f(k);j=u(E,Ra),B=i(E,"SPAN",{class:!0}),f(B).forEach($),E.forEach($),W=d(p),q=i(p,"TEXTAREA",{class:!0}),f(q).forEach($),p.forEach($),Y=d(n),ea=i(n,"DIV",{class:!0});var h=f(ea);ta=i(h,"DIV",{class:!0});var g=f(ta);la=u(g,Fa),g.forEach($),ra=d(h),I(ja.$$.fragment,h),h.forEach($),oa=d(n),ia=i(n,"DIV",{class:!0});var _=f(ia);fa=i(_,"DIV",{class:!0});var O=f(fa);ua=u(O,ya),$a=i(O,"SPAN",{class:!0}),f($a).forEach($),O.forEach($),da=d(_),Ia=i(_,"TEXTAREA",{}),f(Ia).forEach($),_.forEach($),ma=d(n),va=i(n,"DIV",{class:!0});var P=f(va);pa=i(P,"DIV",{class:!0});var b=f(pa);Ea=u(b,Ca),ha=i(b,"SPAN",{class:!0}),f(ha).forEach($),b.forEach($),ga=d(P),xa=i(P,"INPUT",{type:!0,class:!0}),P.forEach($),n.forEach($),Da=d(r),La=i(r,"DIV",{class:!0});var R=f(La);I(Ba.$$.fragment,R),Ta=d(R),I(Wa.$$.fragment,R),R.forEach($),r.forEach($),l.forEach($),this.h()},h(){R(o,"class","actions topActions svelte-12rfx78"),R(H,"class","label svelte-12rfx78"),R(V,"type","text"),R(V,"class","svelte-12rfx78"),R(T,"class","field svelte-12rfx78"),R(B,"class","tip svelte-12rfx78"),R(k,"class","label svelte-12rfx78"),R(q,"class","svelte-12rfx78"),R(w,"class","field bioField svelte-12rfx78"),R(ta,"class","label headerImageLabel svelte-12rfx78"),R(ea,"class","field headerImageField svelte-12rfx78"),R($a,"class","tip svelte-12rfx78"),R(fa,"class","label labelDetails svelte-12rfx78"),R(ia,"class","field skillsField svelte-12rfx78"),R(ha,"class","tip svelte-12rfx78"),R(pa,"class","label labelDetails svelte-12rfx78"),R(xa,"type","text"),R(xa,"class","svelte-12rfx78"),R(va,"class","field svelte-12rfx78"),R(t,"class","mainProfileDetails svelte-12rfx78"),R(La,"class","actions svelte-12rfx78"),R(e,"class","panelContent svelte-12rfx78"),R(s,"class","content svelte-12rfx78")},m(l,r){v(l,s,r),m(s,e),m(e,t),m(t,o),p(Na,o,null),m(t,x),p(Ua,t,null),m(t,D),p(Va,t,null),m(t,L),m(t,T),m(T,H),m(H,N),m(T,U),m(T,V),A(V,a[1]),m(t,M),m(t,w),m(w,k),m(k,j),m(k,B),B.innerHTML=Aa,m(w,W),m(w,q),A(q,a[2]),a[25](q),m(t,Y),m(t,ea),m(ea,ta),m(ta,la),m(ea,ra),p(ja,ea,null),m(t,oa),m(t,ia),m(ia,fa),m(fa,ua),m(fa,$a),$a.innerHTML=Sa,m(ia,da),m(ia,Ia),A(Ia,a[4]),a[29](Ia),m(t,ma),m(t,va),m(va,pa),m(pa,Ea),m(pa,ha),ha.innerHTML=Ha,m(va,ga),m(va,xa),A(xa,a[5]),a[31](xa),m(e,Da),m(e,La),p(Ba,La,null),m(La,Ta),p(Wa,La,null),_a=!0,Oa||(Pa=[F(V,"input",a[22]),F(V,"keypress",a[23]),F(q,"input",a[24]),F(q,"keypress",y),F(Ia,"input",a[28]),F(xa,"input",a[30]),F(xa,"keypress",y)],Oa=!0)},p(a,s){const e={};1024&s[0]&&(e.disabled=!a[10]),2&s[1]&&(e.$$scope={dirty:s,ctx:a}),Na.$set(e);const t={};1&s[0]&&(t.user=a[0]),Ua.$set(t);const l={};2&s[1]&&(l.$$scope={dirty:s,ctx:a}),Va.$set(l),2&s[0]&&V.value!==a[1]&&A(V,a[1]),4&s[0]&&A(q,a[2]);const r={};2048&s[0]&&(r.itemId=a[11]),!na&&8&s[0]&&(na=!0,r.image=a[3],S(()=>na=!1)),!ca&&64&s[0]&&(ca=!0,r.fileIsUploading=a[6],S(()=>ca=!1)),ja.$set(r),16&s[0]&&A(Ia,a[4]),32&s[0]&&xa.value!==a[5]&&A(xa,a[5]);const n={};2&s[1]&&(n.$$scope={dirty:s,ctx:a}),Ba.$set(n);const c={};1024&s[0]&&(c.disabled=!a[10]),2&s[1]&&(c.$$scope={dirty:s,ctx:a}),Wa.$set(c)},i(a){_a||(E(Na.$$.fragment,a),E(Ua.$$.fragment,a),E(Va.$$.fragment,a),E(ja.$$.fragment,a),E(Ba.$$.fragment,a),E(Wa.$$.fragment,a),_a=!0)},o(a){h(Na.$$.fragment,a),h(Ua.$$.fragment,a),h(Va.$$.fragment,a),h(ja.$$.fragment,a),h(Ba.$$.fragment,a),h(Wa.$$.fragment,a),_a=!1},d(e){e&&$(s),g(Na),g(Ua),g(Va),a[25](null),g(ja),a[29](null),a[31](null),g(Ba),g(Wa),Oa=!1,C(Pa)}}}function ta(a){let s,e,x,D;const L=new t({props:{$$slots:{default:[ea]},$$scope:{ctx:a}}});return{c(){s=l("style"),e=r("body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),x=n(),c(L.$$.fragment),this.h()},l(a){const t=o('[data-svelte="svelte-1ja50yt"]',document.head);s=i(t,"STYLE",{});var l=f(s);e=u(l,"body {\r\n\t\t\toverscroll-behavior-y: contain; /* Disables pull-to-refresh but allows overscroll effects. */\r\n\t\t}"),l.forEach($),t.forEach($),x=d(a),I(L.$$.fragment,a),this.h()},h(){document.title="Flock"},m(a,t){m(document.head,s),m(s,e),v(a,x,t),p(L,a,t),D=!0},p(a,s){const e={};4095&s[0]|2&s[1]&&(e.$$scope={dirty:s,ctx:a}),L.$set(e)},i(a){D||(E(L.$$.fragment,a),D=!0)},o(a){h(L.$$.fragment,a),D=!1},d(a){$(s),a&&$(x),g(L,a)}}}function la(a,s,e){let t,l,r,n=H,c=()=>(n(),n=D(o,a=>e(19,l=a)),o);x(a,N,a=>e(17,t=a)),x(a,U,a=>e(11,r=a)),a.$$.on_destroy.push(()=>n());let o=V(null);c();let i,f,u,$,d,I=t&&t.name||"",m=t&&t.bio&&M(t.bio)||"",v=t&&t.coverImage||"",p=t&&t.skills||"",E=t&&t.location||"";function h(){k(o)}function g(){q.uploadImage({uploadType:"userProfile",itemId:r,imageSettings:{maxWidth:B.PROFILE_UPLOAD_MAX_WIDTH,maxHeight:B.PROFILE_UPLOAD_MAX_HEIGHT},thumbSettings:{maxWidth:B.PROFILE_UPLOAD_THUMB_MAX_WIDTH,maxHeight:B.PROFILE_UPLOAD_THUMB_MAX_HEIGHT},onUploading:()=>{W(o,l.avatarImageRawSrc=Y,l),o.set(l),e(16,i=!0)},onImageLoaded:a=>{W(o,l.avatarImageRawSrc=URL.createObjectURL(a),l),o.set(l)},onComplete:a=>{W(o,l.avatarImageRawSrc=null,l),W(o,l.avatarImage=a,l),e(16,i=!1)},onError:a=>{W(o,l.avatarImageRawSrc=null,l),W(o,l.avatarImage=null,l),o.set(l),e(16,i=!1),console.error("Could not request profile image upload")}})}let _,O;return a.$$.update=(()=>{65602&a.$$.dirty[0]&&e(10,O=!(!L(I)||i||f))}),c(e(0,o=T(N))),_=void 0<B.PROFILE_DESCRIPTION_CHARS_LOW,[o,I,m,v,p,E,f,u,$,d,O,r,function(){if(O){const a={name:L(I),bio:L(m),avatarImage:l.avatarImage||null,coverImage:v,skills:p,location:E,style:l.style};w(a)}},function(){l.avatarImage?g():h()},function(){j("profile/"+r)},g,i,t,_,l,void 0,h,function(){I=this.value,e(1,I)},a=>y(a,{target:u}),function(){m=this.value,e(2,m)},function(a){P[a?"unshift":"push"](()=>{e(7,u=a)})},function(a){e(3,v=a)},function(a){e(6,f=a)},function(){p=this.value,e(4,p)},function(a){P[a?"unshift":"push"](()=>{e(8,$=a)})},function(){E=this.value,e(5,E)},function(a){P[a?"unshift":"push"](()=>{e(9,d=a)})}]}export default class extends a{constructor(a){super(),s(this,a,la,ta,e,{},[-1,-1])}}