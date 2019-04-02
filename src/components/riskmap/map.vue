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
      map: ''
    }
  },
  methods: {
    addLayer(layer) {
        this.map.addLayer(layer)
        // 显示地图范围
        this.map.setCenter(new SuperMap.LonLat(0, 0), 0)
    }
  }
}
</script>
