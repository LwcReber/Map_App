"use strict";function animateMaker(e){for(var t=0;t<mapModel.markers.length;t++)if(e===mapModel.markers[t].title){if(null!==mapModel.markers[t].getAnimation())return;stopAllBounce(),mapModel.markers[t].setAnimation(google.maps.Animation.BOUNCE),map.panTo(mapModel.markers[t].position)}}function showSearchPlaceMarker(e){e.setMap(map)}function removeMaker(e){e.setMap(null)}var mapModel={locations:[{title:"世界之窗",location:{lat:22.534717,lng:113.973417},category:"scenic"},{title:"深圳欢乐谷",location:{lat:22.540292,lng:113.981859},category:"scenic"},{title:"深圳大学",location:{lat:22.532893,lng:113.932986},category:"university"},{title:"南方科技大学",location:{lat:22.593842,lng:113.995071},category:"university"},{title:"深圳职业技术学院",location:{lat:22.587492,lng:113.952206},category:"university"},{title:"深圳信息职业技术学院",location:{lat:22.68737,lng:114.217627},category:"university"},{title:"深圳会展中心",location:{lat:22.530732,lng:114.059951},category:"scenic"},{title:"深圳宝安国际机场",location:{lat:22.636828,lng:113.814606},category:"scenic"},{title:"沃尔玛购物广场深圳蛇口店",location:{lat:22.503374,lng:113.923642},category:"market"},{title:"南头沃尔玛（深圳南新分店）",location:{lat:22.539438,lng:113.919678},category:"market"},{title:"海雅缤纷城",location:{lat:22.559261,lng:113.904427},category:"market"},{title:"港隆城百货",location:{lat:22.582196,lng:113.880805},category:"market"},{title:"罗湖区东门商业步行街",location:{lat:22.546237,lng:114.119385},category:"scenic"},{title:"深圳湾公园",location:{lat:22.50292,lng:113.952903},category:"scenic"},{title:"深圳仙湖植物园",location:{lat:22.573886,lng:114.170688},category:"scenic"},{title:"福田区红树林自然保护区",location:{lat:22.524569,lng:114.00961},category:"scenic"},{title:"肯德基（港隆城店）",location:{lat:22.581809,lng:113.88163},category:"restaurant"},{title:"肯德基（桃源村店）",location:{lat:22.557867,lng:113.984546},category:"restaurant"},{title:"麦当劳（深圳海城路餐厅)",location:{lat:22.566553,lng:113.868129},category:"restaurant"},{title:"麦当劳（高新路店)",location:{lat:22.523109,lng:113.947803},category:"restaurant"}],noPlace:{title:"没有搜索到该地点",location:{lat:"",lng:""},category:"none"},markers:[],collectPlace:[]},Location=function(e){this.title=ko.observable(e.title),this.location=ko.observable(e.location),this.category=ko.observable(e.category),this.address=ko.observable(""),this.area=ko.observable(""),this.isPlaceShow=ko.observable(!0),this.showCollectBtn=ko.observable(!0)},NoPlace=function(e){this.title=ko.observable(e.title),this.address=ko.observable(""),this.area=ko.observable(""),this.isPlaceShow=ko.observable(!0),this.noPlaceStatus=ko.observable(!0),this.showCollectBtn=ko.observable(!1)},ViewModel=function(){var e,t,o=this,a=$("#address"),l=$("#filter");this.activePlace=ko.observable(),this.toggleBtnStatus=ko.observable(null),this.activePlace=ko.observable(null),this.locationList=ko.observableArray([]),mapModel.locations.forEach(function(e){o.locationList.push(new Location(e))}),this.locations=ko.observable(o.locationList()),this.noPlace=ko.observable(new NoPlace(mapModel.noPlace)),this.collectPlaces=ko.observableArray([]),localStorage.collectPlace||(localStorage.collectPlace=JSON.stringify(mapModel.collectPlace)),this.collectBtn=ko.observable(!0),this.toggleMenu=function(){null===o.toggleBtnStatus()?o.toggleBtnStatus(!1):o.toggleBtnStatus(!o.toggleBtnStatus())},a.on("input",function(){if(l.prop("selectedIndex",0),o.locations(o.locationList()),e!=a.val()&&" "!=a.val()){if(null!==(e=a.val())){if(null!==e.match(/\s+$/g))return}for(var t=!1,c=new RegExp(e,"g"),i=0;i<mapModel.locations.length;i++){removeMaker(mapModel.markers[i]);null!==mapModel.locations[i].title.match(c)?(o.locations()[i].isPlaceShow(!0),showSearchPlaceMarker(mapModel.markers[i]),t=!0):o.locations()[i].isPlaceShow(!1)}!1===t&&o.locations(o.noPlace())}}),l.change(function(){if(t=l.val(),a.val(""),o.locations()!==o.collectPlaces()&&o.locations()!==o.noPlace()||o.locations(o.locationList()),"none"!==t)if(o.activePlace(""),"all"!==t){if("collect"===t){var e=JSON.parse(localStorage.collectPlace);if(0===e.length)return alert("还没有收藏的地点，赶紧收藏您喜欢的地点吧！！！"),void l.prop("selectedIndex",0);o.collectPlaces([]),e.forEach(function(e){var t=new Location(e);t.showCollectBtn(!1),o.collectPlaces.push(t)});for(var c=0;c<mapModel.locations.length;c++)removeMaker(mapModel.markers[c]),e.forEach(function(e){mapModel.locations[c].title===e.title&&showSearchPlaceMarker(mapModel.markers[c])});return void o.locations(o.collectPlaces())}for(var i=0;i<mapModel.locations.length;i++)removeMaker(mapModel.markers[i]),mapModel.locations[i].category===t?(o.locations()[i].isPlaceShow(!0),showSearchPlaceMarker(mapModel.markers[i])):o.locations()[i].isPlaceShow(!1)}else for(var n=0;n<mapModel.markers.length;n++)showSearchPlaceMarker(mapModel.markers[n]),o.locations()[n].isPlaceShow(!0)}),this.isPlaceChosen=function(e){return o.activePlace()===e},this.goToThisPlace=function(e){if(!e.noPlaceStatus){o.activePlace(e),animateMaker(e.title());var t=e.location().lat,a=e.location().lng,l=setTimeout(function(){alert("响应超时，请刷新页面重试")},6e3);$.ajax({url:"http://restapi.amap.com/v3/geocode/regeo?&key=c9f0e0d3698d77a99521d30be23978df&location="+a+","+t+"&output=json&extensions=all"}).done(function(t){if(clearTimeout(l),-1!==Object.prototype.toString.call(t).indexOf("Object"))if("1"===t.status){if(t.regeocode&&(e.address("地址： "+t.regeocode.formatted_address),t.regeocode.aois.length>0)){var o=Math.round(parseFloat(t.regeocode.aois[0].area));e.area("面积："+o+" 平方米")}}else alert("请求失败");else alert("返回的结果类型有错")}).fail(function(e){clearTimeout(l),alert("请求超时,请重试")})}},this.collectPlace=function(e){var t=ko.toJS(e),o=!1;if(mapModel.collectPlace=JSON.parse(localStorage.collectPlace),mapModel.collectPlace.forEach(function(e){e.title===t.title&&(o=!0)}),!0===o)return void alert("该地点已经收藏");mapModel.collectPlace.push(t),localStorage.collectPlace=JSON.stringify(mapModel.collectPlace),alert("成功收藏该地点")}};ko.applyBindings(new ViewModel);
//# sourceMappingURL=app.js.map
