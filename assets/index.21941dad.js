const d=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}};d();function u(){return new Worker("./assets/worker.3fe4f700.js",{type:"module"})}function i(t){return document.querySelector(t)}(typeof MediaStreamTrackProcessor=="undefined"||typeof MediaStreamTrackGenerator=="undefined")&&(i("output").innerText=`Seu navegador n\xE3o suporta a API experimental MediaStreamTrack
      para fluxos de m\xEDdia que podem ser inseridos. Veja a nota no final da p\xE1gina.`);const c={original:i("#original"),cropped:i("#cropped")},l=i("button"),f=new u;l.addEventListener("click",async()=>{const t=await navigator.mediaDevices.getUserMedia({video:{width:1280,height:720}});c.original.srcObject=t;const[o]=t.getVideoTracks(),a=new MediaStreamTrackProcessor({track:o}),{readable:n}=a,e=new MediaStreamTrackGenerator({kind:"video"}),{writable:r}=e;c.cropped.srcObject=new MediaStream([e]),f.postMessage({operation:"crop",readable:n,writable:r},[n,r])});
