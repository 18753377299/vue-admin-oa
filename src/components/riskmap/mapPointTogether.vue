<template>
  <div>
    <Card>
      <Button @click="pointTogether">点聚合</Button>
      <div id='map' style="margin:0 auto;width: 1500px;height: 1000px"></div>
    </Card>
  </div>
</template>
<script>
  export default {
    mounted () {
      var layer,
        host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
//        url = host + "/iserver/services/map-world/rest/maps/World";
      var  url="http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind";
      //初始化地图
      this.map = new SuperMap.Map("map", {
        controls: [
          new SuperMap.Control.Navigation(),
          new SuperMap.Control.Zoom()]
      })
      this.map.addControl(new SuperMap.Control.MousePosition())
      // 初始化图层
      layer = new SuperMap.Layer.TiledDynamicRESTLayer("china_province@areakind", url, null, {maxResolution: "auto"})
      // 监听图层信息加载完成事件
      layer.events.on({"layerInitialized": this.addLayer})

    },
    data () {
      return {
        map: '',
        clusterLayer:'',
        infowin: '',
        select: ''
      }
    },
    methods: {
      addLayer(layer) {
//        this.clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster");
        this.clusterLayer = new SuperMap.Layer.ClusterLayer("Cluster",{
          //当不同的数值的情况下，显示不同的图标
          clusterStyles:[
            {
              "count":15,//子节点小于等于15的聚散点
              "style":{
                fontColor:"#404040",
                graphic:true,
//                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster3.png",
//                externalGraphic:'@/assets/img/cluster3.png',
                externalGraphic:require('@/assets/img/cluster3.png'),
                graphicWidth:37,
                graphicHeight:38,
                labelXOffset:-4,
                labelYOffset:5
              }
            },
            {
              "count":50,//子节点小于等于50大于15的聚散点
              "style":{
                fontColor:"#404040",
                graphic:true,
//                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster2.png",
//                externalGraphic:'@/assets/img/cluster2.png',
                externalGraphic:require('@/assets/img/cluster2.png'),
                graphicWidth:41,
                graphicHeight:46,
                labelXOffset:-3,
                labelYOffset:6
              }
            },
            {
              "count":"moreThanMax",// 子节点大于50的聚散点
              "style":{
                fontColor:"#404040",
                graphic:true,
//                externalGraphic:SuperMap.Util.getImagesLocation()+"cluster1.png",
//                externalGraphic:'@/assets/img/cluster1.png',
                externalGraphic:require('@/assets/img/cluster1.png'),
                graphicWidth:48,
                graphicHeight:53,
                labelXOffset:-5,
                labelYOffset:8
              }
            }
          ]});

        this.map.addLayers([layer,this.clusterLayer])
        // 显示地图范围
//        this.map.setCenter(new SuperMap.LonLat(0, 0), 0)
        //创建聚散选择控件。该控件实现了聚散图层的鼠标事件。
        var _seft = this
        this.select = new SuperMap.Control.SelectCluster(this.clusterLayer,{
          callbacks:{
            click:function(f){ //点击兴趣点弹出信息窗口
              console.log("aaa");
              console.log(f);
              _seft.closeInfoWin();
              if(!f.isCluster){ //当点击聚散点的时候不弹出信息窗口
                _seft.openInfoWin(f);
              }else {
                console.log("bbb");
              }
            },
            clickout:function(){ //点击空白处关闭信息窗口
              _seft.closeInfoWin();
            }
          }
        });
        //将控件添加到map上
        this.map.addControl(this.select);
        this.map.setCenter(new SuperMap.LonLat(116, 39), 1)
//        //激活控件。
//        select.activate();
//        //往聚散图层中添加兴趣点
//        // 	var fs1 = getFeatures();
//        var fs1 =this.getInfo();
//        this.clusterLayer.addFeatures(fs1);
      },
      pointTogether(){
        //激活控件。
        this.select.activate();
        //往聚散图层中添加兴趣点
        // 	var fs1 = getFeatures();
        var fs1 =this.getInfo();
        this.clusterLayer.addFeatures(fs1);
        this.operateInfo()
      },
      operateInfo(){
        this.axios.post('/riskcontrol/file/operatePointInfo').then((response)=>{
          console.log('you are right!')
          console.log(response)
          // 将后台传到前台的面数据添加到地图上
          var ps = [];
          if(response.data.result!==null&&response.data.result.length>0){
            for(var i=0;i<response.data.result.length;i++){
              var f = new SuperMap.Feature.Vector();//4597
              f.geometry = new SuperMap.Geometry.Point(response.data.result[i].pointx_2000,
                    response.data.result[i].pointy_2000);
              f.style = {
                pointRadius: 4,
                graphic:true,
                externalGraphic:"",
                // 				externalGraphic:"../theme/images/aaa.png",
                graphicWidth:12,
                graphicHeight:12
              };
              f.samount = 10
              ps.push(f);
            }
            this.clusterLayer.addFeatures(ps)
            this.map.setCenter(new SuperMap.LonLat(116, 39), 0)
          }
        }).catch((response)=>{
          console.log(response)
        })
      },
      getInfo(){
        var ps = [];
        for(var i=0;i<100;i++){
          var f = new SuperMap.Feature.Vector();//4597
          f.geometry = new SuperMap.Geometry.Point(116+0.01*i, 39+0.01*i);
          f.style = {
            pointRadius: 4,
            graphic:true,
            externalGraphic:"",
            // 				externalGraphic:"../theme/images/aaa.png",
            graphicWidth:12,
            graphicHeight:12
          };
          f.samount = 10
          ps.push(f);
        }
        return ps;
      },
      openInfoWin(feature){
        var geo = feature.geometry;
        var bounds = geo.getBounds();
        var center = bounds.getCenterLonLat();
        var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
// 		contentHTML += "<div>"+feature.info.name+"</div></div>";
        contentHTML += "<div>"+"aaa"+"</div></div>";

        let offset = new SuperMap.Pixel(10, -25)
//        let size = new SuperMap.Size(-300, -300)
//        let offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
        let dhIcon = new SuperMap.Icon(null, null, offset)
        let popup = new SuperMap.Popup.FramedCloud("popwin2", // 初始化一个带箭头指向和边框的浮动弹窗。
          new SuperMap.LonLat(center.lon,center.lat),
          null,
          contentHTML,
          dhIcon,
          true,
          null,
          true);
//        var popup = new SuperMap.Popup.FramedCloud("popwin",
//           new SuperMap.LonLat(center.lon,center.lat),
//           null,
//           contentHTML,
//           null,
//           true);

        feature.popup = popup;
        this.infowin = popup;
        this.map.addPopup(popup);
      },
      closeInfoWin(){
        if(this.infowin){
          try{
            this.infowin.hide();
            this.infowin.destroy();
          }
          catch(e){}
        }
      }


    }
  }
</script>
