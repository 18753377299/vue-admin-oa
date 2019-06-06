export  default {
  methods:{
    // 地图截图方法
    //截取Vector图层
    getVectorLayerDataSH (layer,map,callback) {
      let printLayer,
        strategies = [],
        features1 = [],
        features = layer.features,
        layerStrategies = layer.strategies;
      //GeoText无法截图问题修复
      if(layerStrategies){
        for(let i = 0; i<layerStrategies.length; i++){
          if (layerStrategies[i].CLASS_NAME === "SuperMap.Strategy.GeoText"){
            strategies.push(layerStrategies[i].clone());
          }else{
            strategies.push(layerStrategies[i]);
          }
        }
        // printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", {strategies: strategies, visibility: true, renderers: ["Canvas"]});
        printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", {strategies: strategies,renderers: ["Canvas"]});
      }else{
        // printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", {visibility: true, renderers: ["Canvas"]});
        printLayer = new SuperMap.Layer.Vector("PRINT_LAYER", { renderers: ["Canvas"]});
      }
      map.addLayer(printLayer);
      for(let j=0;j<features.length;j++){
        let feature = features[j];
        let feature1 = new SuperMap.Feature.Vector();
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
    getCanvasLayerDataSH (layer) {
      let div = layer.div;
      let canvas0 = div.getElementsByTagName("canvas")[0];
      let ctx = canvas0.getContext("2d");
//        canvas0.setAttribute('crossOrigin', 'anonymous');
      let pdiv = div.parentNode;
      let offsetX =  parseInt(pdiv.style.left.replace(/px/,""));
      let offsetY =  parseInt(pdiv.style.top.replace(/px/,""));
      ctx.drawImage(canvas0,2000,1499);
      let imageUrl = canvas0.toDataURL("image/png");
      let img = new Image();

      img.setAttribute('crossOrigin', 'anonymous');
      console.log('imageUrl:'+imageUrl)
      img.src = imageUrl;

      return img;
    },
    // 截取img图层
    getImgLayerDataSH (layer,map) {
      let div = layer.div;
      let pdiv = div.parentNode;
      let offsetX =  parseInt(pdiv.style.left.replace(/px/,""));
      let offsetY =  parseInt(pdiv.style.top.replace(/px/,""));

      let canvas = document.createElement("canvas");
      let size = map.getSize();
      canvas.height = size.h;
      canvas.width = size.w;
      let ctx = canvas.getContext("2d");

      canvas.style.position = "absolute";
      canvas.style.left = "5px";
      canvas.style.top = "600px";
      canvas.style.border = "1px solid #f00";

      //document.body.appendChild(canvas);

      let divs = div.getElementsByTagName("div");
      for(let i = 0;i < divs.length; i++){
        let div1 = divs[i];
        if(div1.style.display !== "none"){
          let left = parseInt(div1.style.left.replace(/px/,""));
          let top = parseInt(div1.style.top.replace(/px/,""));
          let img = div1.getElementsByTagName("img")[0];
          let imgWidth = img.style.width;
          let imgHeight = img.style.height;
          let imgW = null,imgH = null;
          if(imgWidth !== null || imgWidth !== ''){
            imgW = parseInt(imgWidth.replace(/px/,''));
          }
          if(imgHeight !== null || imgHeight !== ''){
            imgH = parseInt(imgHeight.replace(/px/,''));
          }
          if(imgW !== null && imgH !== null){
            ctx.drawImage(img,left+offsetX,top+offsetY,imgW,imgH);
          }
          else{
            ctx.drawImage(img,left+offsetX,top+offsetY);
          }
        }
      }
      let imageUrl = canvas.toDataURL("image/png");
      let img = new Image();
      img.setAttribute("crossOrigin",'Anonymous')
      img.src = imageUrl;
      return img;
    },
    // 保存图片
    save_clickSH (obj) {
      let _event = document.createEvent("MouseEvents")
      _event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      obj.dispatchEvent(_event);
    },
    saveImageSH (data, filename) {
      var _link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
      _link.href = data;
      _link.download = filename;
      this.save_clickSH(_link);
    },
    // 截图方法
    drawSH(img,i,imgUrls){
      let that = this
      imgUrls[i] = img;
      this.LAYER_COUNT++;
      // console.log(this.LAYER_COUNT)
      // console.log(this.LAYER_COUNT >= this.LAYER_LENGTH)
      if (this.LAYER_COUNT >= this.LAYER_LENGTH) {
        // console.log(imgUrls)
        let imgUrlsCtx = []
        imgUrls.map((val, index) => {
          if (val !== '' && val !== undefined) {
            imgUrlsCtx.push(val)
          }
        })
        // console.log(imgUrlsCtx)
        let canvas = document.createElement("canvas");
        let size = this.map.getSize();
        canvas.height = size.h;
        canvas.width = size.w;
        let ctx = canvas.getContext("2d");

        canvas.style.position = "relative";
        canvas.style.border = "1px solid #4c4c4c";

        document.body.appendChild(canvas);

        window.setTimeout(function(){
          for(let i=0;i<imgUrlsCtx.length;i++){
            ctx.drawImage(imgUrlsCtx[i],0,0);
          }
          // console.log(canvas)
          if(canvas.msToBlob){
            let button = document.createElement("input");
            buttonPanel.appendChild(button);
            button.type = "button";
            button.value = "保存";
            window.navigator.msSaveBlob(canvas.msToBlob(), 'map.png');
            button.onclick = function(){
            }
          }
          else{
            let imgData = canvas.toDataURL()
            // console.log(canvas.toDataURL())
            let filename = (new Date()).getTime() + '.png';
            that.saveImageSH(imgData,filename)
          }
        },30);
      }
    },
    // 触发截图
    printMapExecuteSH () {
      let canvas = document.createElement("canvas");
      let broz = SuperMap.Browser.name;
      if(!canvas.getContext || (broz === 'msie' && !canvas.msToBlob)){
        alert("您的浏览器版本太低，请升级。");
        return;
      }

      this.LAYER_COUNT = 0;

      let layers = this.map.layers.concat([]);

      //layers排序，将markers放到最上边
      let layers1 = [];
      for(let i = 0; i < layers.length;){
        if(layers[i].CLASS_NAME === "SuperMap.Layer.Markers"){
          let templayer = layers.splice(i,1);
          layers1.push(templayer[0]);
        } else if(layers[i].CLASS_NAME === "SuperMap.Layer.GOAnimationLayer" ||
          layers[i].CLASS_NAME === "SuperMap.Layer.PlottingLayer.Temporary" ||
          (layers[i].CLASS_NAME === "SuperMap.Layer.PlottingLayer" && !layers[i].getVisibility()) ||
          layers[i].CLASS_NAME === "SuperMap.Layer.PlottingLayer.RootContainer"){
          //处理标绘图层的动画图层和图层不显示
          layers.splice(i,1);
        } else {
          i++;
        }
      }
      layers = layers.concat(layers1);

      this.LAYER_LENGTH = layers.length;

      let imgUrls = [];
      // console.log(layers.length)
      for(let i=0;i<layers.length;i++){
        let layer = layers[i]; // 取每个图层
        // console.log(layer.name)
        if(layer.CLASS_NAME === "SuperMap.Layer.TiledDynamicRESTLayer"){ // 判断是否是canvas图层地图
          // console.log(layer.name)
          // console.log("layer.useCanvas:" + (layer.useCanvas))
          if(layer.useCanvas === false){
            if (layer.name === 'all_scale_1km') {
              this.LAYER_COUNT = this.LAYER_COUNT + 1
            } else {
              this.drawSH(this.getImgLayerDataSH(layer,this.map),i,imgUrls);
            }
            // this.draw(this.getImgLayerData(layer,this.map),i,imgUrls);
          }
          else{
            this.drawSH(this.getCanvasLayerDataSH(layer),i,imgUrls);
          }
        }
        else if(layer.CLASS_NAME === "SuperMap.Layer.Markers"){
          this.drawSH(this.getImgLayerDataSH(layer,this.map),i,imgUrls);
        }
        else if(layer.CLASS_NAME === "SuperMap.Layer.ClusterLayer"){
          this.draw(this.getImgLayerDataSH(layer,this.map),i,imgUrls);
        }
        else if(layer.CLASS_NAME === "SuperMap.Layer.HeatGridLayer"){
          this.drawSH(this.getImgLayerDataSH(layer,this.map),i,imgUrls);
        }
        else if(layer.CLASS_NAME === "SuperMap.Layer.Vector"){
          var that = this
          this.getVectorLayerDataSH(layer,this.map,function(imgUrls,i){
            return function(img){
              that.drawSH(img,i,imgUrls);
            }
          }(imgUrls,i))
        }
      }
    },
    // 生成实时台风报告
    generateReportSH () {
      this.printMapExecuteSH()
    }
  }
}
