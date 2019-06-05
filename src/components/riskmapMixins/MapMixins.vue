<template>
  <div>
    <Card>
      <div>
        <Button @click="drawSHDraw">绘制实时台风</Button>
        <Button @click="addTFMarker">打点</Button>
      </div>
      <div id='map' ref="cutScreen" style="margin:0 auto; padding-top: ;width: 2000px;height: 1500px"></div>
    </Card>
  </div>
</template>
<script>
  import riskmapmixins from '@/components/riskdata/mixins/riskMap-mixins.js'
  export default {
    mixins:[riskmapmixins],
    components: {
    },
    mounted () {
//      var layer;
       var host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090";
//     url = host + "/iserver/services/map-world/rest/maps/World";
//     var  url="http://10.10.2.241:8091/iserver/services/map-FXDT/rest/maps/china_province@areakind";
       var  url="http://10.10.2.241:8091/iserver/services/map-tianditu/rest/maps/矢量底图_经纬度";
      this.vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
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
          new SuperMap.Control.Zoom()]
      })
      this.map.addControl(new SuperMap.Control.MousePosition())
      // 初始化图层
      this.layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, { maxResolution: "auto" , useCanvas:false,useCORS:true})
      // 监听图层信息加载完成事件
      this.layer.events.on({"layerInitialized": this.addLayerSH})

      /**html渲染完成后，才触发*/
      this.msg = '123'
      console.log(this.$refs.first)
    },
    created () {
    },
    data () {
      return {
        msg: '',
        imageUrls: '',
        canvasData: '',
        map: '',
        layer: '',
        vector: '',
        vectorLayer: '',
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
        this.map.addLayers([layer,this.vectorLayer,this.typhoonFQLayer,this.markerLayer,this.markerLayer1,this.vector])
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(116, 39), 4)
      }
    }
  }
</script>
