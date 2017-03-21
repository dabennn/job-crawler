(function () {
	/*初始化百度地图,添加控件*/
	var map = new BMap.Map("container");
	var myPoint = new BMap.Point(120.361044, 30.308862);
	map.centerAndZoom(myPoint, 12);
	map.setCurrentCity("杭州");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom();
	//map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.addControl(new BMap.NavigationControl());			//导航插件
	map.addControl(new BMap.GeolocationControl());		//定位插件
	map.addControl(new BMap.ScaleControl({offset: new BMap.Size(100, 30)}));	//比例尺插件
	map.addControl(new BMap.OverviewMapControl());
	map.addTileLayer(new BMap.TrafficLayer());		// 创建交通流量图层实例
	/*获取数据*/
	(function (url) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url);
		xhr.send();

		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				createInfo(JSON.parse(this.responseText));
			}
		};
	})('http://localhost:3000/data');

	/*创建我的位置标注*/
	var myMarker = new BMap.Marker(myPoint);        // 创建我的位置标注
	var circle = new BMap.Circle(myPoint, 5000, {
		strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.3
	}); //创建圆
	map.addOverlay(myMarker);
	map.addOverlay(circle);
	myMarker.setAnimation(BMAP_ANIMATION_BOUNCE);		//给标注添加动画
	/*创建job标注信息和信息窗*/
	function createInfo(data) {
		for (var i = 0; i < data.length; i++) {
			getPoi(data[i]);
		}
	}

	function getPoi(info) {
		var myGeo = new BMap.Geocoder();
		myGeo.getPoint(info.addr, function (point) {
			if (point) {
				marker(point, info);
			}
		}, "杭州市");
	}

	function marker(point, info) {
		var marker = new BMap.Marker(new BMap.Point(point.lng, point.lat));  // 创建标注
		var content = `<p>职位信息: ${info.jobRequest}</p><p>${info.company} 发布于 ${info.time}</p><p>地址: ${info.addr}</p><a href="${info.link}" target="_blank">详细信息</a>`;
		map.addOverlay(marker);               // 将标注添加到地图中
		addClickHandler(content, marker);
	}

	function addClickHandler(content, marker) {
		marker.addEventListener("click", function (e) {
			openInfo(content, e);
		});
	}

	function openInfo(content, e) {
		var opts = {
			width: 0,     // 信息窗口宽度
			height: 0,     // 信息窗口高度
			title: "职位信息", // 信息窗口标题
			enableMessage: true//设置允许信息窗发送短息
		};
		var p = e.target;
		var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
		var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
		map.openInfoWindow(infoWindow, point); //开启信息窗口
	}

})();