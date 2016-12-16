define("echarts/chart/funnel",["require","../component/base","./base","zrender/shape/Text","zrender/shape/Line","zrender/shape/Polygon","../config","../util/ecData","../util/number","zrender/tool/util","zrender/tool/color","zrender/tool/area","./"],function(e){function t(e, t, a, o, s){n.call(this,e,t,a,o,s),i.call(this),this.refresh(o)}var n=e("../component/base"),i=e("./base"),a=e("zrender/shape/Text"),o=e("zrender/shape/Line"),s=e("zrender/shape/Polygon"),r=e("../config"),l=e("../util/ecData"),h=e("../util/number"),m=e("zrender/tool/util"),V=e("zrender/tool/color"),U=e("zrender/tool/area");return t.prototype={type:r.CHART_TYPE_FUNNEL,_buildShape:function(){var e=this.series,t=this.component.legend;this._paramsMap={},this._selected={},this.selectedMap={};for(var n,i=0,a=e.length;a>i;i++)if(e[i].type===r.CHART_TYPE_FUNNEL){if(e[i]=this.reformOption(e[i]),this.legendHoverLink=e[i].legendHoverLink||this.legendHoverLink,n=e[i].name||"",this.selectedMap[n]=t?t.isSelected(n):!0,!this.selectedMap[n])continue;this._buildSingleFunnel(i),this.buildMark(i)}this.addShapeList()},_buildSingleFunnel:function(e){var t=this.component.legend,n=this.series[e],i=this._mapData(e),a=this._getLocation(e);this._paramsMap[e]={location:a,data:i};for(var o,s=0,r=[],l=0,m=i.length;m>l;l++)o=i[l].name,this.selectedMap[o]=t?t.isSelected(o):!0,this.selectedMap[o]&&!isNaN(i[l].value)&&(r.push(i[l]),s++);if(0!==s){for(var V,U,d,p,c=this._buildFunnelCase(e),u=n.funnelAlign,y=n.gap,g=s>1?(a.height-(s-1)*y)/s:a.height,b=a.y,f="descending"===n.sort?this._getItemWidth(e,r[0].value):h.parsePercent(n.minSize,a.width),k="descending"===n.sort?1:0,_=a.centerX,x=[],l=0,m=r.length;m>l;l++)if(o=r[l].name,this.selectedMap[o]&&!isNaN(r[l].value)){switch(V=m-2>=l?this._getItemWidth(e,r[l+k].value):"descending"===n.sort?h.parsePercent(n.minSize,a.width):h.parsePercent(n.maxSize,a.width),u){case"left":U=a.x;break;case"right":U=a.x+a.width-f;break;default:U=_-f/2}d=this._buildItem(e,r[l]._index,t?t.getColor(o):this.zr.getColor(r[l]._index),U,b,f,V,g,u),b+=g+y,p=d.style.pointList,x.unshift([p[0][0]-10,p[0][1]]),x.push([p[1][0]+10,p[1][1]]),0===l&&(0===f?(p=x.pop(),"center"==u&&(x[0][0]+=10),"right"==u&&(x[0][0]=p[0]),x[0][1]-="center"==u?10:15,1==m&&(p=d.style.pointList)):(x[x.length-1][1]-=5,x[0][1]-=5)),f=V}c&&(x.unshift([p[3][0]-10,p[3][1]]),x.push([p[2][0]+10,p[2][1]]),0===f?(p=x.pop(),"center"==u&&(x[0][0]+=10),"right"==u&&(x[0][0]=p[0]),x[0][1]+="center"==u?10:15):(x[x.length-1][1]+=5,x[0][1]+=5),c.style.pointList=x)}},_buildFunnelCase:function(e){var t=this.series[e];if(this.deepQuery([t,this.option],"calculable")){var n=this._paramsMap[e].location,i=10,a={hoverable:!1,style:{pointListd:[[n.x-i,n.y-i],[n.x+n.width+i,n.y-i],[n.x+n.width+i,n.y+n.height+i],[n.x-i,n.y+n.height+i]],brushType:"stroke",lineWidth:1,strokeColor:t.calculableHolderColor||this.ecTheme.calculableHolderColor}};return l.pack(a,t,e,void 0,-1),this.setCalculable(a),a=new s(a),this.shapeList.push(a),a}},_getLocation:function(e){var t,n=this.series[e],i=this.zr.getWidth(),a=this.zr.getHeight(),o=this.parsePercent(n.x,i),s=this.parsePercent(n.y,a);t=null==n.width?i-o-this.parsePercent(n.x2,i):this.parsePercent(n.width,i);var r;return r=null==n.height?a-s-this.parsePercent(n.y2,a):this.parsePercent(n.height,a),{x:o,y:s,width:t,height:r,centerX:o+t/2}},_mapData:function(e){function t(e,t){return"-"===e.value?1:"-"===t.value?-1:t.value-e.value}function n(e,n){return-t(e,n)}for(var i=this.series[e],a=m.clone(i.data),o=0,s=a.length;s>o;o++)a[o]._index=o;return"none"!=i.sort&&a.sort("descending"===i.sort?t:n),a},_buildItem:function(e,t,n,i,a,o,s,r,h){var m=this.series,V=m[e],U=V.data[t],d=this.getPolygon(e,t,n,i,a,o,s,r,h);l.pack(d,m[e],e,m[e].data[t],t,m[e].data[t].name),this.shapeList.push(d);var p=this.getLabel(e,t,n,i,a,o,s,r,h);l.pack(p,m[e],e,m[e].data[t],t,m[e].data[t].name),this.shapeList.push(p),this._needLabel(V,U,!1)||(p.invisible=!0);var c=this.getLabelLine(e,t,n,i,a,o,s,r,h);this.shapeList.push(c),this._needLabelLine(V,U,!1)||(c.invisible=!0);var u=[],y=[];return this._needLabelLine(V,U,!0)&&(u.push(c.id),y.push(c.id)),this._needLabel(V,U,!0)&&(u.push(p.id),y.push(d.id)),d.hoverConnect=u,p.hoverConnect=y,d},_getItemWidth:function(e,t){var n=this.series[e],i=this._paramsMap[e].location,a=n.min,o=n.max,s=h.parsePercent(n.minSize,i.width),r=h.parsePercent(n.maxSize,i.width);return t*(r-s)/(o-a)},getPolygon:function(e,t,n,i,a,o,r,l,h){var m,U=this.series[e],d=U.data[t],p=[d,U],c=this.deepMerge(p,"itemStyle.normal")||{},u=this.deepMerge(p,"itemStyle.emphasis")||{},y=this.getItemStyleColor(c.color,e,t,d)||n,g=this.getItemStyleColor(u.color,e,t,d)||("string"==typeof y?V.lift(y,-.2):y);switch(h){case"left":m=i;break;case"right":m=i+(o-r);break;default:m=i+(o-r)/2}var b={zlevel:this._zlevelBase,clickable:this.deepQuery(p,"clickable"),style:{pointList:[[i,a],[i+o,a],[m+r,a+l],[m,a+l]],brushType:"both",color:y,lineWidth:c.borderWidth,strokeColor:c.borderColor},highlightStyle:{color:g,lineWidth:u.borderWidth,strokeColor:u.borderColor}};return this.deepQuery([d,U,this.option],"calculable")&&(this.setCalculable(b),b.draggable=!0),new s(b)},getLabel:function(e,t,n,i,o,s,r,l,h){var d,p=this.series[e],c=p.data[t],u=this._paramsMap[e].location,y=m.merge(m.clone(c.itemStyle)||{},p.itemStyle),g="normal",b=y[g].label,f=b.textStyle||{},k=y[g].labelLine.length,_=this.getLabelText(e,t,g),x=this.getFont(f),L=n;b.position=b.position||y.normal.label.position,"inner"===b.position||"inside"===b.position||"center"===b.position?(d=h,L=Math.max(s,r)/2>U.getTextWidth(_,x)?"#fff":V.reverse(n)):d="left"===b.position?"right":"left";var W={zlevel:this._zlevelBase+1,style:{x:this._getLabelPoint(b.position,i,u,s,r,k,h),y:o+l/2,color:f.color||L,text:_,textAlign:f.align||d,textBaseline:f.baseline||"middle",textFont:x}};return g="emphasis",b=y[g].label||b,f=b.textStyle||f,k=y[g].labelLine.length||k,b.position=b.position||y.normal.label.position,_=this.getLabelText(e,t,g),x=this.getFont(f),L=n,"inner"===b.position||"inside"===b.position||"center"===b.position?(d=h,L=Math.max(s,r)/2>U.getTextWidth(_,x)?"#fff":V.reverse(n)):d="left"===b.position?"right":"left",W.highlightStyle={x:this._getLabelPoint(b.position,i,u,s,r,k,h),color:f.color||L,text:_,textAlign:f.align||d,textFont:x,brushType:"fill"},new a(W)},getLabelText:function(e,t,n){var i=this.series,a=i[e],o=a.data[t],s=this.deepQuery([o,a],"itemStyle."+n+".label.formatter");return s?"function"==typeof s?s.call(this.myChart,a.name,o.name,o.value):"string"==typeof s?(s=s.replace("{a}","{a0}").replace("{b}","{b0}").replace("{c}","{c0}"),s=s.replace("{a0}",a.name).replace("{b0}",o.name).replace("{c0}",o.value)):void 0:o.name},getLabelLine:function(e,t,n,i,a,s,r,l,h){var V=this.series[e],U=V.data[t],d=this._paramsMap[e].location,p=m.merge(m.clone(U.itemStyle)||{},V.itemStyle),c="normal",u=p[c].labelLine,y=p[c].labelLine.length,g=u.lineStyle||{},b=p[c].label;b.position=b.position||p.normal.label.position;var f={zlevel:this._zlevelBase+1,hoverable:!1,style:{xStart:this._getLabelLineStartPoint(i,d,s,r,h),yStart:a+l/2,xEnd:this._getLabelPoint(b.position,i,d,s,r,y,h),yEnd:a+l/2,strokeColor:g.color||n,lineType:g.type,lineWidth:g.width}};return c="emphasis",u=p[c].labelLine||u,y=p[c].labelLine.length||y,g=u.lineStyle||g,b=p[c].label||b,b.position=b.position,f.highlightStyle={xEnd:this._getLabelPoint(b.position,i,d,s,r,y,h),strokeColor:g.color||n,lineType:g.type,lineWidth:g.width},new o(f)},_getLabelPoint:function(e,t,n,i,a,o,s){switch(e="inner"===e||"inside"===e?"center":e){case"center":return"center"==s?t+i/2:"left"==s?t+10:t+i-10;case"left":return"auto"===o?n.x-10:"center"==s?n.centerX-Math.max(i,a)/2-o:"right"==s?t-(a>i?a-i:0)-o:n.x-o;default:return"auto"===o?n.x+n.width+10:"center"==s?n.centerX+Math.max(i,a)/2+o:"right"==s?n.x+n.width+o:t+Math.max(i,a)+o}},_getLabelLineStartPoint:function(e,t,n,i,a){return"center"==a?t.centerX:i>n?e+Math.min(n,i)/2:e+Math.max(n,i)/2},_needLabel:function(e,t,n){return this.deepQuery([t,e],"itemStyle."+(n?"emphasis":"normal")+".label.show")},_needLabelLine:function(e,t,n){return this.deepQuery([t,e],"itemStyle."+(n?"emphasis":"normal")+".labelLine.show")},refresh:function(e){e&&(this.option=e,this.series=e.series),this.backupShapeList(),this._buildShape()}},m.inherits(t,i),m.inherits(t,n),e("../chart").define("funnel",t),t});