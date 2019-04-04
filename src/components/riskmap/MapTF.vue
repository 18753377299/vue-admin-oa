<template>
  <div>
    <div>
      <Button @click="drawDraw">绘制实时台风</Button>
    </div>
    <div id='map' style="margin:0 auto;width: 1000px;height: 1000px"></div>
    <div>
      <div id="curve" style="display: none;">
        <div id="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted () {
      var layer,
        host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090",
        url = host + "/iserver/services/map-world/rest/maps/World";

        this.vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
//        this.vectorLayer1 = new SuperMap.Layer.Vector("Vector Layer1");
        this.vector = new SuperMap.Layer.Vector("Vector");
       //初始化标记图层类
        this.markerLayer = new SuperMap.Layer.Markers("Markers");
        this.markerLayer1 = new SuperMap.Layer.Markers("Markers1");
      //初始化地图
      this.map = new SuperMap.Map("map", {
        controls: [
          new SuperMap.Control.Navigation(),
          new SuperMap.Control.Zoom()]
      })
      this.map.addControl(new SuperMap.Control.MousePosition())
      // 初始化图层
      layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, {maxResolution: "auto"})
      // 监听图层信息加载完成事件
      layer.events.on({"layerInitialized": this.addLayer})

    },
    data () {
      return {
        map: '',
        vector: '',
        vectorLayer: '',
        markerLayer: '',
        markerLayer1: '',
        pointArray:[
          ["117.190182","39.125596"],
          ["114.502461","38.045474"],
          ["112.549248","37.857014"]
        ],
        url2: 'http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind',

      }
    },
    methods: {
      addLayer(layer) {
        this.map.addLayers([layer,this.vectorLayer,this.markerLayer,this.markerLayer1,this.vector])
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(0, 0), 0)
      },
      drawDraw(){
        this.LSLJ_DrawPath(0, 0);
      },
      LSLJ_DrawPath(xh,pathxh) {
//     var tb	="/Vue/WebContent/supermap/scripts/pot_8.png";
//    var tb	="scripts/pot_8.png"
    var tb	=  require('@/assets/img/pot_8.png')
    var PathInfo= this.pointArray[xh];
    var lonlat = new SuperMap.LonLat(PathInfo[0], PathInfo[1]);

    var size = new SuperMap.Size(16, 16);
    var offset = new SuperMap.Pixel(-8, -8);
    var myIcon = new SuperMap.Icon(tb, size, offset);
    var Marker = new SuperMap.Marker(lonlat, myIcon);
    Marker.Data = PathInfo;
    this.TFLJ_DrawFQ(lonlat);
    if (xh == 0) {
      var txt = "aaaa";
      var x0 = lonlat.lon;
      var y0 = lonlat.lat;
      var geoText = new SuperMap.Geometry.GeoText(x0, y0, txt);
      var geotextFeature = new SuperMap.Feature.Vector(geoText);
      this.vectorLayer.addFeatures([geotextFeature]);
      // LSZH_AdLegend(6);
    }
    if (xh > 0) {
      var B_PathInfo = this.pointArray[xh-1];
      var B_lonlat = new SuperMap.Geometry.Point(B_PathInfo[0], B_PathInfo[1]);
      var A_lonlat = new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat);
      var polypoint_1 = [B_lonlat, A_lonlat];
      var polyline_1 = new SuperMap.Geometry.LineString(polypoint_1);
      var line1Vector = new SuperMap.Feature.Vector(polyline_1);
      line1Vector.style = {
        strokeColor: "#A2B0CC",
        strokeWidth: 2
      };
      this.vectorLayer.addFeatures([line1Vector]);
    }
    var _selfMarker = this;
    Marker.events.on({
      "mouseover": function (e) {
        var marker = this;
        console.log(e)
//         var Info = marker.Data;
//         console.log(_selfMarker);
        // ArrFQInfo 中十二个数据 表示  7/10/12 级风在不同的方位的风圈半径。
        var Info= {"bj_7":"100-180公里",
          "bj_10": "", "bj_12": "", "fs": 18,"lat": marker.lonlat.lat,"lon": marker.lonlat.lon, "sj": "2018-05-03 20:00","zxqy": 998,
          "ArrFQInfo":[180, 100, 100, 180, 0, 0, 0, 0, 0, 0, 0, 0]
        };
        var strHtml = '<div class="Info_WinCon" style="overflow-x:hidden;overflow-y:auto;">';
        strHtml += "<table name='TFInfo'>";
        strHtml += '<tr><td name="col1">过去时间</td><td>' + Info["sj"].substr(0, 13) + '</td></tr>';
        strHtml += '<tr><td name="col1">中心位置</td><td>' + Info["lon"] + "N " + Info["lat"] + 'E</td></tr>';
        strHtml += '<tr><td name="col1">最大风速</td><td>' + Info["fs"] + '米/秒</td></tr>';
        strHtml += '<tr><td name="col1">中心气压</td><td>' + Info["zxqy"] + '百帕</td></tr>';
        if (Info["bj_7"] != undefined) {
          strHtml += '<tr><td name="col1">七级风圈半径</td><td>' + Info["bj_7"] + '</td></tr>';
        }
        if (Info["bj_10"] != undefined) {
          strHtml += '<tr><td name="col1">十级风圈半径</td><td>' + Info["bj_10"] + '</td></tr>';
        }
        if (Info["bj_12"] != undefined) {
          strHtml += '<tr><td name="col1">十二级风圈半径</td><td>' + Info["bj_12"] + '</td></tr>';
        }
//         marker.lonlat.lon   marker.lonlat.lat
        var point = new SuperMap.LonLat(parseFloat(Info["lon"]), parseFloat(Info["lat"]));

//          var point = new SuperMap.LonLat(marker.lonlat.lon, marker.lonlat.lat);
        strHtml += '</table></div>';
        var InfoWin_Json = { content: strHtml, point: point };
        var pixel = _selfMarker.map.getLayerPxFromLonLat(point);
//        $("#content").html(strHtml);
//
//        $("#curve").css("left", pixel.x-110);
//        $("#curve").css("top", pixel.y-20);
//        $("#curve").show();
//         ShowInfoWin();
        if (Info.ArrFQInfo != undefined) {
//           		map.removeLayer(vectorLayer)
          _selfMarker.DrawSector(Info.ArrFQInfo, point);
// 	          var sides = 50;
// 	//           117.190182","39.125596
// 	          var origin = new SuperMap.Geometry.Point(marker.lonlat.lon, marker.lonlat.lat);
// 	          var polygon = SuperMap.Geometry.Polygon.createRegularPolygonCurve(origin,2,sides,180,0);
// 	          var cuvreVector = new SuperMap.Feature.Vector(polygon);
// 	          cuvreVector.style = {
// 	            strokeColor: "#1E90FF",
// 	            fillColor: "#C6E2FF",
// 	            strokeWidth: 2,
// 	            fillOpacity: 0.5
// 	          };
// 	          vectorLayer.addFeatures([cuvreVector]);
        }
      },
      "scope": Marker
    });
    //从标记点移出
    Marker.events.on({
      "mouseout": function (e) {
//         $("#Prop_Info").hide();
      }
    });
    this.markerLayer.addMarker(Marker);

    if (xh < this.pointArray.length - 1) {
      var that = this
      setTimeout(function () { that.LSLJ_DrawPath(xh + 1, pathxh) }, 1000);
//         setTimeout(LSLJ_DrawPath(xh + 1, pathxh), 1000);
    }
  },
      //绘制台风动画
  TFLJ_DrawFQ(lonlat) {
    // LSTF_DHLayer.clearMarkers();
    this.markerLayer1.clearMarkers();
    var size = new SuperMap.Size(40, 40);
    var offset = new SuperMap.Pixel(-20, -20);
// 	var icon="/Vue/WebContent/supermap/scripts/tf_fy.gif";
//    var icon="scripts/tf_fy.gif";
    var icon	=  require('@/assets/img/tf_fy.gif')
    var dhIcon = new SuperMap.Icon(icon, size, offset);
    var dhMarker = new SuperMap.Marker(lonlat, dhIcon);
    this.markerLayer1.addMarker(dhMarker);
  },
  DrawSector(ArrFQInfo, Point) {
    this.vector.removeAllFeatures();
    var ArrColor = [
      [0, 90, "#00B00F",0.8, "#00B00F",0.3,"七级风圈半径","东北","lb"],
      [90, 180, "#00B00F", 0.8, "#00B00F", 0.3, "", "东南", "rb"],
      [180, 270, "#00B00F", 0.8, "#00B00F", 0.3, "", "西南", "rb"],
      [270, 360, "#00B00F", 0.8, "#00B00F", 0.3, "", "西北", "lb"],

      [0, 90, "#F8D500", 0.8, "#F8D500", 0.2, "十级风圈半径", "东北", "lm"],
      [90, 180, "#F8D500", 0.8, "#F8D500", 0.2, "", "东南", "rm"],
      [180, 270, "#F8D500", 0.8, "#F8D500", 0.2, "", "西南", "rm"],
      [270, 360, "#F8D500", 0.8, "#F8D500", 0.2, "", "西北", "lm"],
      [0, 90, "#FF0000", 0.8, "#FF0000", 0.2, "十二级风圈半径", "东北", "cm"],
      [90, 180, "#FF0000", 0.8, "#FF0000", 0.2, "", "东南", "cm"],
      [180, 270, "#FF0000", 0.8, "#FF0000", 0.2, "", "西南", "cm"],
      [270, 360, "#FF0000", 0.8, "#FF0000", 0.2, "", "西北", "cm"]
    ];
    //相差一个经度和一个纬度之间的距离
    var dwjl = this.GetDistance(Point.lon, Point.lat, Point.lon + 1, Point.lat);
    var geometrys  = []
    for (var i = 0; i < ArrFQInfo.length; i++) {
      if (ArrFQInfo[i] != 0) {
        var origion = new SuperMap.Geometry.Point(Point.lon, Point.lat);
        var sides = 30;
//         	半径
        var bj = (parseFloat(ArrFQInfo[i]) * 1000) / dwjl;
//        ArrColor[i][0]
        var cuvre = SuperMap.Geometry.Polygon.createRegularPolygonCurve(origion, bj, sides, 90, ArrColor[i][0]);
//        let data = {geometry: geometry, address:this.address, sumAmount:this.sumAmount,policyno:this.policyno,
//          MapCode:this.MapCode, nowdate:this.nowdate, powerSQL:this.powerSQL, sumPay: this.sumPay}
        var cuvreVector = new SuperMap.Feature.Vector(cuvre);
        if (i % 4 != 0) {
          var XH_0 = Math.floor(i / 4) * 4;
          var XH_1 = Math.floor(i / 4) * 4 + 1;
          var XH_2 = Math.floor(i / 4) * 4 + 2;
          var XH_3 = Math.floor(i / 4) * 4 + 3;
          if ((ArrFQInfo[XH_0] == ArrFQInfo[XH_1]) && (ArrFQInfo[XH_1] == ArrFQInfo[XH_2]) &&(ArrFQInfo[XH_2] == ArrFQInfo[XH_3])) {
            cuvreVector.style = {
              strokeColor: ArrColor[i][2],
              fillColor: ArrColor[i][4],
              strokeWidth: 0,
              fillOpacity: ArrColor[i][5]
            };
          } else {
            cuvreVector.style = {
              strokeColor: ArrColor[i][2],
              fillColor: ArrColor[i][4],
              strokeWidth: 0,
              fillOpacity: ArrColor[i][5],
              label: ArrColor[i][6] + "\n" + ArrFQInfo[i].toString() + "km",
              labelXOffset: 0,
              labelYOffset: 0,
              labelAlign: ArrColor[i][8],
              //fontColor: "#89D624"
              fontColor: "#FFF0F5"
            };
          }
        } else {
          cuvreVector.style = {
            strokeColor: ArrColor[i][2],
            fillColor: ArrColor[i][4],
            strokeWidth: 0,
            fillOpacity: ArrColor[i][5],
            label: ArrColor[i][6] + "\n" + ArrFQInfo[i].toString() + "km",
            labelXOffset: 0,
            labelYOffset: 0,
            labelAlign: ArrColor[i][8],
            //fontColor: "#89D624"
            fontColor: "#FFF0F5"
          };
        }
        var  geometry =new SuperMap.Format.GeoJSON().write(cuvreVector.geometry,false)
        geometrys.push(geometry)
        console.log("cuvreVector图层");
        console.log(cuvreVector);
        this.vectorLayer.addFeatures([cuvreVector]);
        // 图层
        console.log("vectorLayer图层");
        console.log(this.vectorLayer);
      }
    }
    let data = {geometrys: geometrys }
    this.axios.post('/riskcontrol/file/fileGeometrist',data).then((response)=>{
      console.log('you are right!')
      console.log(response)
      // 将后台传到前台的面数据添加到地图上
      var  geometry =new SuperMap.Format.GeoJSON().read(response.data.result,'Geometry')
      console.log(geometry)
      var style = {
        strokeColor:"#339933",
        strokeOpacity:1,
        strokeWidth:3,
        pointRadius:6
      }
      var feature = new SuperMap.Feature.Vector(geometry,null,style);
      this.vectorLayer.addFeatures([feature]);
    }).catch((response)=>{
      console.log(response)
    })
  },
  //计算两个经纬度坐标之间的距离
  GetDistance(lng1, lat1, lng2, lat2) {
    var EARTH_RADIUS = 6378137;
    var radLat1 = this.rad(lat1);
    var radLat2 = this.rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.rad(lng1) - this.rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  },
  rad(d) {
    return d * Math.PI / 180.0;
  }


    }
  }
</script>
