<template>
  <div>
    <Card>
      <div>
        <Button @click="drawDraw">绘制实时台风</Button>
        <Button @click="mapToImg" id="jietu">截图</Button>
        <!--<img src="iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABZUlEQVR4Xu3TQREAAAiEQK9/aWvsAxMw4O06ysAommCuINgTFKQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LQQL8oTPAGUY76lBAAAAAElFTkSuQmCC" style="width: 100px;height: 100px"/>-->
      </div>
      <!--<div>-->
      <!--<canvas id="roundness" width="600" height="300"></canvas>-->
      <!--</div>-->
      <div id='map' ref="cutScreen" style="margin:0 auto; padding-top: 1px;width: 2000px;height: 1500px"></div>
      <!--<div>-->
      <!--<div id="curve" style="display: none;">-->
      <!--<div id="content"></div>-->
      <!--</div>-->
      <!--</div>-->
    </Card>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  export default {
    mounted () {
//      var layer;
       var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
//        url = host + "/iserver/services/map-world/rest/maps/World";
       var  url="http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind";

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
      this.layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, { maxResolution: "auto" , useCanvas:false,useCORS:true})
      // 监听图层信息加载完成事件
      this.layer.events.on({"layerInitialized": this.addLayer})

    },
    created () {
      if(this.map.layers){
        console.log('created-if')
        this.mapToImg()
      }else {
        console.log('created-else')
      }
    },
    data () {
      return {
        imageUrls: '',
        canvasData: '',
        map: '',
        layer: '',
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
        LAYER_COUNT: 0,
        LAYER_LENGTH: 0
      }
    },
    methods: {
      mapToImg() {
//        MapToImg&&MapToImg.excute(this.map);
        this.printMapExecute()
      },
      printMapExecute(){
        var canvas = document.createElement("canvas");
        var broz = SuperMap.Browser.name;
        if(!canvas.getContext||(broz=='msie'&&!canvas.msToBlob)){
          alert("您的浏览器版本太低，请升级。");
          return;
        }

        this.LAYER_COUNT = 0;

        var layers = this.map.layers.concat([]);

        //layers排序，将markers放到最上边
        var layers1 = [];
        for(var i=0;i<layers.length;){
          if(layers[i].CLASS_NAME == "SuperMap.Layer.Markers"){
            var templayer = layers.splice(i,1);
            layers1.push(templayer[0]);
          } else if(layers[i].CLASS_NAME == "SuperMap.Layer.GOAnimationLayer" ||
            layers[i].CLASS_NAME == "SuperMap.Layer.PlottingLayer.Temporary" ||
            (layers[i].CLASS_NAME == "SuperMap.Layer.PlottingLayer" && !layers[i].getVisibility()) ||
            layers[i].CLASS_NAME == "SuperMap.Layer.PlottingLayer.RootContainer"){
            //处理标绘图层的动画图层和图层不显示
            layers.splice(i,1);
          } else {
            i++;
          }
        }
        layers = layers.concat(layers1);

        this.LAYER_LENGTH = layers.length;

        var imgUrls = [];
        for(var i=0;i<layers.length;i++){
          var layer = layers[i];
          if(layer.CLASS_NAME == "SuperMap.Layer.TiledDynamicRESTLayer"){
            console.log("layer.useCanvas:"+(layer.useCanvas === false)+":" + (layer.useCanvas))
            if(layer.useCanvas === false){
              this.draw(this.getImgLayerData(layer,this.map),i,imgUrls);
            }
            else{
              this.draw(this.getCanvasLayerData(layer),i,imgUrls);
//              this.draw(this.getImgLayerData(layer,this.map),i,imgUrls);
//              var canvas0 = document.createElement("canvas");
//              var div = layer.div;
//              var canvas0 = div.getElementsByTagName("canvas")[0];
//              canvas0.height = 100;
//              canvas0.width = 100;

//              canvas0.setAttribute('crossOrigin', 'anonymous');
//              var imageUrl = canvas0.toDataURL("image/png");
//              this.imageUrls = imageUrl
////              var imageUrl = canvas0.toDataURL("image/jpeg");
//              console.log('imageUrl:'+imageUrl)
//              var img = new Image();
//              img.setAttribute('crossOrigin', 'anonymous');
//              img.src = imageUrl;

//              html2Canvas(canvas0,{backgroundColor: null}).then(canvas => {
//                console.log('-----picture')
//                console.log(canvas)
//                // var imgUri = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); // 获取生成的图片的url
//                var imgUri = canvas.toDataURL("image/png")
//                window.location.href= imgUri // 下载图片
//              });

            }
          }
          else if(layer.CLASS_NAME == "SuperMap.Layer.Markers"){
            this.draw(this.getImgLayerData(layer,this.map),i,imgUrls);
          }
          else if(layer.CLASS_NAME == "SuperMap.Layer.Vector"){
            var that = this
            this.getVectorLayerData(layer,this.map,function(imgUrls,i){
              return function(img){
                that.draw(img,i,imgUrls);
              }
            }(imgUrls,i))
          }
//          else if(layer.CLASS_NAME == "SuperMap.Layer.PlottingLayer"){
//            getPlottingLayerData(layer,map,function(imgUrls,i){
//              return function(img){
//                draw(img,i,imgUrls);
//              }
//            }(imgUrls,i))
//          }

        }
      },
      //截取Vector图层
      getVectorLayerData(layer,map,callback){
        var printLayer,
          strategies = [],
          features1 = [],
          features = layer.features,
          layerStrategies = layer.strategies;
        //GeoText无法截图问题修复
        if(layerStrategies){
          for(var i = 0; i<layerStrategies.length; i++){
            if (layerStrategies[i].CLASS_NAME === "SuperMap.Strategy.GeoText"){
              strategies.push(layerStrategies[i].clone());
            }else{
              strategies.push(layerStrategies[i]);
            }
          }
          printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", {strategies: strategies, visibility: true, renderers: ["Canvas"]});
        }else{
          printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", {visibility: true, renderers: ["Canvas"]});
        }
        map.addLayer(printLayer);
        for(var j=0;j<features.length;j++){
          var feature = features[j];
          var feature1 = new SuperMap.Feature.Vector();
          feature1.geometry = feature.geometry.clone();
          feature1.style = feature.style;

          features1.push(feature1);
        }
        if(layer.style){
          printLayer.style = layer.style;
        }

        printLayer.setOpacity(0);
        printLayer.addFeatures(features1);

        window.setTimeout(function(printLayer,map,callback){
          return function(){
            var div = printLayer.div;
            var canvas1 = div.getElementsByTagName("canvas")[0];
            var cxt1 = canvas1.getContext("2d");
            var imageUrl = canvas1.toDataURL("image/png");

            map.removeLayer(printLayer);
            printLayer.destroy();

            var img = new Image();
            img.src = imageUrl;

            callback(img);
          }
        }(printLayer,map,callback),30);
      },
  //截取canvas图层
      getCanvasLayerData(layer){
        var div = layer.div;

        var canvas0 = div.getElementsByTagName("canvas")[0];

//        var ctx = canvas0.getContext("2d");
//
//        canvas0.setAttribute('crossOrigin', 'anonymous');
        ctx.drawImage(canvas0,2000,1499);
        var imageUrl = canvas0.toDataURL("image/png");
        var img = new Image();

        img.setAttribute('crossOrigin', 'anonymous');
        console.log('imageUrl:'+imageUrl)
        img.src = imageUrl;

        return img;
      },
      getImgLayerData(layer,map){
        var div = layer.div;
        console.log(div)
        var pdiv = div.parentNode;
        var offsetX =  parseInt(pdiv.style.left.replace(/px/,""));
        var offsetY =  parseInt(pdiv.style.top.replace(/px/,""));

        var canvas = document.createElement("canvas");
        var size = map.getSize();
        canvas.height = size.h;
        canvas.width = size.w;
        var ctx = canvas.getContext("2d");

        canvas.style.position = "absolute";
        canvas.style.left = "5px";
        canvas.style.top = "600px";
        canvas.style.border = "1px solid #f00";

        //document.body.appendChild(canvas);

        var divs = div.getElementsByTagName("div");
        for(var i=0;i<divs.length;i++){
          var div1 = divs[i];
          if(div1.style.display!="none"){
            var left = parseInt(div1.style.left.replace(/px/,""));
            var top = parseInt(div1.style.top.replace(/px/,""));
            var img = div1.getElementsByTagName("img")[0];
            var imgWidth = img.style.width;
            var imgHeight = img.style.height;
            var imgW = null,imgH = null;
            if(imgWidth!=null||imgWidth!=""){
              imgW = parseInt(imgWidth.replace(/px/,""));
            }
            if(imgHeight!=null||imgHeight!=""){
              imgH = parseInt(imgHeight.replace(/px/,""));
            }
            if(imgW!=null&&imgH!=null){
              ctx.drawImage(img,left+offsetX,top+offsetY,imgW,imgH);
            }
            else{
              ctx.drawImage(img,left+offsetX,top+offsetY);
            }
          }
        }
        var imageUrl = canvas.toDataURL("image/png");
        var img = new Image();
        img.setAttribute("crossOrigin",'Anonymous')
        img.src = imageUrl;
        return img;
      },
      draw(img,i,imgUrls){
        imgUrls[i] = img;
        this.LAYER_COUNT++;

        if(this.LAYER_COUNT>=this.LAYER_LENGTH){
          var canvas = document.createElement("canvas");
          var size = this.map.getSize();
          canvas.height = size.h;
          canvas.width = size.w;
          var ctx = canvas.getContext("2d");

          canvas.style.position = "relative";
          canvas.style.border = "1px solid #4c4c4c";

          //document.body.appendChild(canvas);

          var panel = document.createElement("div");

          panel.style.position = "absolute";
          panel.style.left = "0px";
          panel.style.top = "0px";
          panel.style.height = "100%";
          panel.style.width = "100%";
          // panel.style.background = "#e6e8eb";
          panel.style.background = "#ffffff";
          document.body.appendChild(panel);


          var buttonPanel = document.createElement("div");
          buttonPanel.style.position = "relative";
          panel.appendChild(buttonPanel);
          panel.appendChild(canvas);

          window.setTimeout(function(){
            for(var i=0;i<imgUrls.length;i++){
              ctx.drawImage(imgUrls[i],0,0);
            }

            if(canvas.msToBlob){
              var button = document.createElement("input");
              buttonPanel.appendChild(button);
              button.type = "button";
              button.value = "保存";

              button.onclick = function(){
                window.navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
              }
            }
            else{
              var aa = document.createElement("a");
              buttonPanel.appendChild(aa);
              aa.target = "_blank";
              aa.download="map.png";
              aa.href=canvas.toDataURL();

              var button = document.createElement("input");
              aa.appendChild(button);
              button.type = "button";
              button.value = "保存";
            }

            var button = document.createElement("input");
            buttonPanel.appendChild(button);
            button.type = "button";
            button.value = "关闭";
            button.onclick = function(){
              document.body.removeChild(panel);
            }
          },30);
        }
      },
      addLayer(layer) {
//        this.map.addLayers([this.layer,this.markerLayer])
        this.map.addLayers([layer,this.vectorLayer,this.markerLayer,this.markerLayer1,this.vector])
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(116, 39), 4)

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
