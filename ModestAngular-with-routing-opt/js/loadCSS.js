(function(h){var d=function(d,e,n){function k(a){if(b.body)return a();setTimeout(function(){k(a)})}function f(){a.addEventListener&&a.removeEventListener("load",f);a.media=n||"all"}var b=h.document,a=b.createElement("link"),c;if(e)c=e;else{var l=(b.body||b.getElementsByTagName("head")[0]).childNodes;c=l[l.length-1]}var m=b.styleSheets;a.rel="stylesheet";a.href=d;a.media="only x";k(function(){c.parentNode.insertBefore(a,e?c:c.nextSibling)});var g=function(b){for(var c=a.href,d=m.length;d--;)if(m[d].href===
c)return b();setTimeout(function(){g(b)})};a.addEventListener&&a.addEventListener("load",f);a.onloadcssdefined=g;g(f);return a};"undefined"!==typeof exports?exports.loadCSS=d:h.loadCSS=d})("undefined"!==typeof global?global:this);