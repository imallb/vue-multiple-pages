<template>
<canvas
 ref="loading"
 :width="width*2"
 :height="height*2"
 :style="{ 'width': width + 'px', 'height': height + 'px' }">
</canvas>
</template>

<script>
export default {
  name: 'loading',
  props: {
    type: {
      default: 'fl',
      type: String
    },
    width: {
      default: 60,
      type: Number
    },
    height: {
      default: 60,
      type: Number
    },
    color: {
      default: '#000',
      type: null
    }
  },
  data () {
    return {}
  },
  mounted () {
    this.canvasLoading(this.$refs.loading)
  },
  methods: {
    canvasLoading (elem) {
      var bg = this.colorRgb(this.color)    // 存放loading颜色
      var x = elem.width
      var y = elem.height
      var v = 0
      this[this.type]({elem, bg, x, y, v})
    },
    sm ({elem, bg, x, y, v}) {
      var cxt = elem.getContext('2d')
      var color = 'rgba(' + bg + ', 1)'
      cxt.strokeStyle = color
      cxt.lineWidth = x / 8
      function rotation (s) {
        cxt.clearRect(0, 0, x, y)
        cxt.beginPath()
        cxt.arc(x / 2, y / 2, x / 2 - x / 8, -Math.PI * (1 - s), Math.PI * s, false)
        cxt.arc(x / 2, y / 2, x / 2 - x / 8, Math.PI * s, -Math.PI * (1 - s), true)
        cxt.closePath()
        cxt.stroke()
      };
      setInterval(function () {
        if (v < 2) v += 0.05
        else v = 0
        rotation(v)
      }, 30)
    },
    rd({elem, bg, x, y, v}){
      var cxt = elem.getContext("2d")
      var color = 'rgba('+bg+', 1)'
      cxt.strokeStyle = color
      cxt.lineWidth = x/8
      function rotation(s){
        cxt.clearRect(0,0,x,y)
        cxt.beginPath()
        if(v<=2){
          cxt.arc(x/2, y/2, x/2-x/8, -Math.PI*(1-s),Math.PI,true)
          cxt.arc(x/2, y/2, x/2-x/8,Math.PI,-Math.PI*(1-s),false)  
        }else{
          cxt.arc(x/2, y/2, x/2-x/8, -Math.PI*(1-s), Math.PI, false)
          cxt.arc(x/2, y/2, x/2-x/8, Math.PI, -Math.PI*(1-s), true)
        };
        cxt.closePath();
        cxt.stroke();
      };
      setInterval(function(){
        if(v<=4){
          v += 0.05
          if(v<=2) rotation(v)
          else if(v>2&&v<=4) rotation(v-2)
        }else{
          v = 0
        }
      },30)
    },
    fl ({elem, bg, x, y, v}) {
      var cxt = elem.getContext('2d')
      var p = x / 2
      var deg = 30
      cxt.lineWidth = x / 12
      function rotation (s) {
        cxt.clearRect(0, 0, x, y)
        for (let i = 0; i < 12; i++) {
          cxt.strokeStyle = 'rgba(' + bg + ',' + (1 / 12 * i) + ')'
          cxt.beginPath()
          cxt.moveTo(
            p - p * Math.sin(-(i + s) * deg * Math.PI / 180),
            p - p * Math.cos(-(i + s) * deg * Math.PI / 180)
          )
          cxt.lineTo(
            p - 2 * p / 5 * Math.sin(-(i + s) * deg * Math.PI / 180),
            p - 2 * p / 5 * Math.cos(-(i + s) * deg * Math.PI / 180)
          )
          cxt.closePath()
          cxt.stroke()
        };
      }
      setInterval(function () {
        if (v < 11) v++
        else v = 0
        rotation(v)
      }, 100)
    },
    colorRgb (color) {
      // 十六进制颜色值的正则表达式
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
      var sColor = color.toLowerCase()
      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = '#'
          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
          }
          sColor = sColorNew
        }
        // 处理六位的颜色值
        var sColorChange = []
        for (let i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
        }
        return sColorChange.join(',')
      } else {
        return sColor
      }
    }
  }
}
</script>
