(window.player||(window.player={})).blurImg=function(t,a){var e=document.createElement("canvas");a=a||document.body,e.width=100,e.height=100;var r=e.getContext("2d"),o=new Image;o.src=t,o.onload=function(){r.drawImage(o,0,0,o.width,o.height,0,0,e.width,e.height);var t=function(t){for(var a,e,r,o,h,n,d=t.data,g=t.width,i=t.height,f=[],w=0,u=10,c=1/(5*Math.sqrt(2*Math.PI)),m=-.02,l=0,I=-u;I<=u;I++,l++)r=c*Math.exp(m*I*I),w+=f[l]=r;for(l=0,n=f.length;l<n;l++)f[l]/=w;for(a=0;a<i;a++)for(I=0;I<g;I++){for(w=e=r=m=c=0,o=-u;o<=u;o++)0<=(h=I+o)&&h<g&&(e+=d[l=4*(a*g+h)]*f[o+u],r+=d[l+1]*f[o+u],m+=d[l+2]*f[o+u],w+=f[o+u]);d[l=4*(a*g+I)]=e/w,d[l+1]=r/w,d[l+2]=m/w}for(I=0;I<g;I++)for(a=0;a<i;a++){for(w=e=r=m=c=0,o=-u;o<=u;o++)0<=(h=a+o)&&h<i&&(e+=d[l=4*(h*g+I)]*f[o+u],r+=d[l+1]*f[o+u],m+=d[l+2]*f[o+u],w+=f[o+u]);d[l=4*(a*g+I)]=e/w,d[l+1]=r/w,d[l+2]=m/w}return t}(r.getImageData(0,0,e.width,e.height));r.putImageData(t,0,0);t=e.toDataURL();a.style.backgroundImage="url("+t+")"}};