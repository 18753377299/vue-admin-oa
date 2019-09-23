<template>
  <div>
    <Card>
      <div>
        <Button @click="drawSHDraw">绘制实时台风</Button>
        <Button @click="addTFMarker">打点</Button>
        <Button @click="generateReportSH">截图</Button>
        <Button @click="showGridData">显示栅格</Button>
        <Button @click="changeState">显示专题图</Button>
        <Button @click="addPolygon">添加面数据</Button>
      </div>
      <div id='map' ref="cutScreen" style="margin:0 auto; padding-top: 10px;width: 2000px;height: 1500px"></div>
    </Card>
  </div>
</template>
<script>
  // 绘制实时台风
  import riskmapmixins from '@/components/riskdata/mixins/riskMap-mixins'
  // 面数据
  import riskMapPolygon from '@/components/riskdata/riskMapPolygon'
  import riskMapRainYJPolygon from '@/components/riskdata/riskMapRainYJPolygon'
  // 进行截图
  import riskMapPrintPicture from '@/components/riskdata/mixins/riskMapPrintPicture'
  export default {
    mixins:[riskmapmixins,riskMapPrintPicture],
    components: {
    },
    mounted () {
//      var layer;
       var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
//     url = host + "/iserver/services/map-world/rest/maps/World";
//       var  url="http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind";
       var  url="http://10.10.2.242:8091/iserver/services/map-tianditu/rest/maps/矢量底图_经纬度";
      this.vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
//      this.themeLayer = new SuperMap.Layer.RankSymbol("RankSymbolLayer", "Circle");
      this.themeLayer = new SuperMap.Layer.Range("ThemeLayer");

      this.typhoonFQLayer = new SuperMap.Layer.Vector("VectorFQLayer");
//    this.vectorLayer1 = new SuperMap.Layer.Vector("Vector Layer1");
        this.vector = new SuperMap.Layer.Vector("Vector");
       //初始化标记图层类
        this.markerLayer = new SuperMap.Layer.Markers("Markers");
        this.markerLayer1 = new SuperMap.Layer.Markers("Markers1");
      //初始化地图
      this.map = new SuperMap.Map("map", {
        controls: [
          new SuperMap.Control.Navigation(),
          new SuperMap.Control.Zoom()],
        // 需要多个图层的时候需要添加
        allOverlays: true
      })
      this.map.addControl(new SuperMap.Control.MousePosition())
      // 初始化图层
      this.layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, { maxResolution: "auto" , useCanvas:false,useCORS:true})
      // 监听图层信息加载完成事件
      this.layer.events.on({"layerInitialized": this.addLayerSH})

      /**html渲染完成后，才触发*/
      this.msg = '123'
//      console.log(this.$refs.first)

//      var callbacks = {
//        click : function(currentFeature) {
//          alert('111')
//        }
//      };
//      var selectVectorLayer = new SuperMap.Control.SelectFeature(this.vectorLayer, {
//        callbacks : callbacks
//      });
//      this.map.addControl(selectVectorLayer);
//      selectVectorLayer.activate();
    },
    created () {
    },
    data () {
      return {
        riskMapPolygon: riskMapPolygon,
//        riskMapRainYJPolygon: riskMapRainYJPolygon,
        features: riskMapRainYJPolygon,
        msg: '',
        imageUrls: '',
        canvasData: '',
        map: '',
        layer: '',
        vector: '',
        vectorLayer: '',
        themeLayer:'',
        markerLayer: '',
        markerLayer1: '',
        pointArray:[
          ["165.3","12.9"],
          ["163.8","13"],
          ["144.9","14.2"],
          ["116.8","19.8"],
          ["110.3","22.3"],
          ["106.6","24"]
        ],
        url2: 'http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind',
      }
    },
    methods: {
      addLayerSH(layer) {
//        this.map.addLayers([this.layer,this.markerLayer])
        this.map.addLayers([layer,this.vectorLayer, this.typhoonFQLayer, this.markerLayer,
          this.markerLayer1, this.vector,this.themeLayer])
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(116, 39), 4)
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  #map{
    border: 1px solid #eeeeee;
  }
</style>
