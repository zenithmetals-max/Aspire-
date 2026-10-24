(function(){
var d=document,root=d.documentElement,nav=d.getElementById('nav');
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
// menu
var mb=d.querySelector('.menu-btn');
mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o);mb.textContent=o?'Close':'Menu'});
d.querySelectorAll('#site-nav a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');mb.textContent='Menu'})});
// form
d.getElementById('form').addEventListener('submit',function(e){e.preventDefault();d.getElementById('ok').hidden=false});
// nav state
var last=0;function onS(y){nav.classList.toggle('sc',y>40);nav.classList.toggle('hide',y>last&&y>500&&!nav.classList.contains('open'));last=y}
addEventListener('scroll',function(){onS(scrollY)},{passive:true});
var G=window.gsap,ST=window.ScrollTrigger;
if(!G||!ST||reduce||/static/.test(location.search)){root.classList.add('ready');return}
G.registerPlugin(ST);root.classList.add('anim');
// lenis
var lenis;if(window.Lenis){lenis=new Lenis({lerp:.09});lenis.on('scroll',ST.update);G.ticker.add(function(t){lenis.raf(t*1000)});G.ticker.lagSmoothing(0);
 d.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var t=d.querySelector(a.getAttribute('href'));if(t){e.preventDefault();lenis.scrollTo(t,{offset:-60,duration:1.4})}})})}
// loader: letters stagger, X draws, wordmark flies to nav logo
var ld=d.querySelector('.loader'),n=d.querySelector('.ld-n'),o={v:0},lw=ld.querySelector('.ld-w'),navw=d.querySelector('.wm-nav');
G.set(ld,{display:'flex'});G.set(navw,{opacity:0});
G.set(lw.querySelectorAll('.w .lt'),{yPercent:110});G.set(lw.querySelectorAll('.xm line'),{strokeDashoffset:1});
var tl=G.timeline();
tl.to(lw.querySelectorAll('.w .lt'),{yPercent:0,duration:1,stagger:.05,ease:'expo.out'},.15)
 .to(lw.querySelector('.x1'),{strokeDashoffset:0,duration:.7,ease:'power3.inOut'},.45)
 .to(lw.querySelector('.x2'),{strokeDashoffset:0,duration:.7,ease:'power3.inOut'},.75)
 .to(o,{v:100,duration:1.5,ease:'power2.inOut',onUpdate:function(){n.textContent=String(Math.round(o.v)).padStart(2,'0')}},0)
 .to(lw.querySelector('.xw'),{rotate:90,duration:.9,ease:'expo.inOut'},1.55)
 .to(lw,{x:function(){return navw.getBoundingClientRect().left-lw.getBoundingClientRect().left},y:function(){return navw.getBoundingClientRect().top-lw.getBoundingClientRect().top},scale:function(){return navw.getBoundingClientRect().width/lw.getBoundingClientRect().width},color:'#1c1c1c',duration:1.1,ease:'expo.inOut'},1.9)
 .to(lw.querySelectorAll('.xm line'),{stroke:'#a8957c',duration:1.1},1.9)
 .to('.ld-in',{opacity:0,duration:.3},1.9)
 .to('.ldbg',{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'expo.inOut'},1.9)
 .set(navw,{opacity:1},3.0).set(ld,{display:'none'},3.02)
 .to('.hero .ln>span',{y:0,duration:1.3,stagger:.12,ease:'expo.out'},2.5)
 .to('.hero .meta,.hero .rv',{opacity:1,y:0,duration:1,stagger:.08,ease:'expo.out'},2.7)
 .to('.hero-img',{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:'expo.inOut'},2.6)
 .add(function(){root.classList.add('ready')});
G.set('.ldbg',{clipPath:'inset(0 0 0% 0)'});
window.__tl=tl;if(/hold/.test(location.search))tl.pause(0);
// hero X rotates with scroll
G.fromTo('.hero-x',{rotate:0},{rotate:135,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
// footer wordmark
var fw=d.querySelector('.wm-foot');G.set(fw.querySelectorAll('.w .lt'),{yPercent:110});G.set(fw.querySelectorAll('.xm line'),{strokeDashoffset:1});
var ftl=G.timeline({scrollTrigger:{trigger:fw,start:'top 92%'}});
ftl.to(fw.querySelectorAll('.w .lt'),{yPercent:0,duration:1.2,stagger:.05,ease:'expo.out'})
 .to(fw.querySelector('.x1'),{strokeDashoffset:0,duration:.8,ease:'power3.inOut'},.3)
 .to(fw.querySelector('.x2'),{strokeDashoffset:0,duration:.8,ease:'power3.inOut'},.6);
if(fine){var fx=fw.querySelector('.xw'),foot=d.querySelector('.foot');
 foot.addEventListener('mousemove',function(e){var r=fx.getBoundingClientRect(),dx=(e.clientX-(r.left+r.width/2))/innerWidth,dy=(e.clientY-(r.top+r.height/2))/innerHeight;G.to(fx,{rotate:dx*40,x:dx*30,y:dy*20,duration:1.2,ease:'power3'})});
 foot.addEventListener('mouseleave',function(){G.to(fx,{rotate:0,x:0,y:0,duration:1.4,ease:'elastic.out(1,.5)'})});}
// nav logo hover redraw
var nl=d.querySelector('.logo');nl.addEventListener('mouseenter',function(){G.fromTo(nl.querySelectorAll('.xm line'),{strokeDashoffset:1},{strokeDashoffset:0,duration:.6,stagger:.12,ease:'power3.inOut'})});
// reveals
G.utils.toArray('.rv').forEach(function(el){if(el.closest('.hero'))return;
 G.to(el,{opacity:1,y:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}})});
G.utils.toArray('.ph,.bleed').forEach(function(el){if(el.classList.contains('hero-img'))return;
 G.to(el,{clipPath:'inset(0% 0% 0% 0%)',duration:1.6,ease:'expo.inOut',scrollTrigger:{trigger:el,start:'top 85%'}})});
// parallax
G.utils.toArray('.hero-img img,.par img').forEach(function(img){G.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:img.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
G.utils.toArray('.case-img img,.ph img').forEach(function(img){G.fromTo(img,{scale:1.18},{scale:1,ease:'none',scrollTrigger:{trigger:img.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
// marquee speeds with scroll
G.to('.ticker div',{x:-200,ease:'none',scrollTrigger:{trigger:'.ticker',start:'top bottom',end:'bottom top',scrub:true}});
// horizontal pinned process (desktop)
ST.matchMedia({'(min-width:901px)':function(){
 var sec=d.getElementById('process');sec.classList.add('hz');var tr=sec.querySelector('.steps');ST.refresh();
 var tw=G.to(tr,{x:function(){return -(tr.scrollWidth-innerWidth+innerWidth*.08)},ease:'none',scrollTrigger:{trigger:sec,start:'top top',end:function(){return '+='+(tr.scrollWidth-innerWidth)},pin:true,scrub:1,invalidateOnRefresh:true}});
 return function(){sec.classList.remove('hz');tw.kill();G.set(tr,{clearProps:'all'})}}});
if(!fine)return;
// cursor
var c=d.querySelector('.cur'),qx=G.quickTo(c,'x',{duration:.35,ease:'power3'}),qy=G.quickTo(c,'y',{duration:.35,ease:'power3'});
addEventListener('mousemove',function(e){qx(e.clientX);qy(e.clientY)});
d.querySelectorAll('a,button,summary,.row').forEach(function(el){el.addEventListener('mouseenter',function(){c.classList.add('big')});el.addEventListener('mouseleave',function(){c.classList.remove('big')})});
d.querySelectorAll('.case-img,.ph.detail').forEach(function(el){el.addEventListener('mouseenter',function(){c.classList.add('view');c.textContent='VIEW'});el.addEventListener('mouseleave',function(){c.classList.remove('view');c.textContent=''})});
// case image follow tilt
var ci=d.querySelector('.case-img');ci.addEventListener('mousemove',function(e){var r=ci.getBoundingClientRect();G.to(ci.querySelector('img'),{xPercent:(e.clientX-r.left)/r.width*4-2,yPercent:(e.clientY-r.top)/r.height*4-2,duration:1,ease:'power3'})});
// magnetic
d.querySelectorAll('.btn,.nav-cta').forEach(function(b){b.addEventListener('mousemove',function(e){var r=b.getBoundingClientRect();G.to(b,{x:(e.clientX-r.left-r.width/2)*.3,y:(e.clientY-r.top-r.height/2)*.4,duration:.6,ease:'power3'})});
 b.addEventListener('mouseleave',function(){G.to(b,{x:0,y:0,duration:.9,ease:'elastic.out(1,.4)'})})});
})();
