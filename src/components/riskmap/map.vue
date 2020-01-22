<template>
  <div id='map' style="margin:0 auto;width: 1000px;height: 1000px"></div>
</template>
<script>
export default {
  mounted () {
    var layer,
        host = window.isLocal ? window.server : "http://support.supermap.com.cn:8090",
        url = host + "/iserver/services/map-world/rest/maps/World"
    //初始化地图
    this.map = new SuperMap.Map("map", {
        controls: [
            new SuperMap.Control.Navigation(),
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom()]
    })
    this.map.addControl(new SuperMap.Control.MousePosition())
    // 初始化图层
    layer = new SuperMap.Layer.TiledDynamicRESTLayer("World", url, null, {maxResolution: "auto"})
    this.markerLayer = new SuperMap.Layer.Markers("Markers1");
    // 监听图层信息加载完成事件
    layer.events.on({"layerInitialized": this.addLayer})
    this.addData();
  },
  data () {
    return {
      map: '',
      markerLayer: '',
      marker: ''
    }
  },
  methods: {
    addLayer(layer) {
        this.map.addLayers([layer,this.markerLayer])
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(116, 39), 1)
    },
    addData(){
      this.markerLayer.removeMarker(this.marker);
      // marker
      let size = new SuperMap.Size(44, 33)
      let offset = new SuperMap.Pixel(-(size.w / 2), -size.h)
      let icon = new SuperMap.Icon(require("@/assets/img/map/typhoon/1.png"), size, offset)
      this.marker = new SuperMap.Marker(new SuperMap.LonLat(116, 39), icon)
      /*水淹单击弹窗事件*/
      this.marker.events.on({
        "click": mouseClickEvent,
        scope: 'qqqq'
        //                "touchstart":mouseClickEvent //假如要在移动端的浏览器也实现点击弹框，则在注册touch类事件
      });
      this.markerLayer.addMarker(this.marker);
      var _self = this

      function mouseClickEvent(event) {
        _self.mouseClickEventFlood(this)
      }
    },
    mouseClickEventFlood(value){
      console.log(value)
    }
  }
}
</script>
