const db = wx.cloud.database()
Page({
    data: {
        logo: 'cloud://wz-2gelhqr3cc1d841e.777a-wz-2gelhqr3cc1d841e-1301315039/cardicon/icon-logo.png',
        iconFlag: 'cloud://wz-2gelhqr3cc1d841e.777a-wz-2gelhqr3cc1d841e-1301315039/cardicon/icon-flag.png',
        bannerCurrent: 0, // 当前显示的banner
        bannerData: [],
        show: false,
        actions: [
            {
              name: '点击复制网址（复制后请在浏览器打开）',
              
            },],
 
    },
    // bannerSwiper
  bannerSwiper(e) {
    const that = this, bannerCurrent = e.detail.current;
    console.log(bannerCurrent)
    that.setData({
      bannerCurrent
    })
  },

  // 卡牌切换
  switchFlip: function (e) {
    const that = this;
    const index = e.currentTarget.dataset.index;
    const bannerData = that.data.bannerData;
    const isOpenFilp = that.data.bannerData[index].isOpenFilp ? false : true;
    bannerData[index].isOpenFilp = isOpenFilp;
    that.setData({
      bannerData
    });

  },
  // ---------------------
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    // console.log(event.detail);
    wx.showToast({
      title: '复制成功',
    })
    wx.setClipboardData({
      data:'http://www.neea.edu.cn/',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) 
          }
        })
      }
    })
  },
  onClickButton() {
        
    this.setData({
        show:true
      })
  },
     
    //options(Object)
    onLoad: function(options){
      db.collection('bannerData').get().then(res=>{
        this.setData({
          bannerData:res.data
        })
      })
        
    },
    onReady: function(){
        
    },
    onShow: function(){
        this.onLoad()
    },
    onHide: function(){

    },
    onUnload: function(){

    },
    onPullDownRefresh: function(){

    },
    onReachBottom: function(){

    },
    onShareAppMessage: function(){

    },
    onPageScroll: function(){

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item){

    }
});