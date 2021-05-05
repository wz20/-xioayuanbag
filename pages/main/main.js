const db = wx.cloud.database()
Page({

    data: {
      canIUse:wx.canIUse('button.open-typewx.getUserInfo'),
      openID:'',
      which:''
     
   
      

    },
 
   
    gl(e){
      wx.navigateTo({
        url: '/pages/guanli/guanli?openID='+e.currentTarget.dataset.id,
       
       
      })
    },
    glwork(e){
      wx.navigateTo({
        url: '/pages/guanli1/guanli1?openID='+e.currentTarget.dataset.id,
       
       
      })
    },
    fabu2(e){
      if(e.currentTarget.dataset.id=='osmuq5cQKPAT_rWwy-bagvYbmbPc'){
      wx.navigateTo({
        url: '/pages/fabu2/fabu2?openID='+e.currentTarget.dataset.id,
       
       
      })
    }
    },
    gl2(e){
      if(e.currentTarget.dataset.id=='osmuq5cQKPAT_rWwy-bagvYbmbPc'){
      wx.navigateTo({
        url: '/pages/guanli2/guanli2?openID='+e.currentTarget.dataset.id,
       
       
      })
    }
    },
  //  ----------------------------------------------------------------------
    onLoad: function (options) {
      // 查看是否授权
      wx.getSetting({
        success(res){
          if(res.authSetting['scope.userInfo']){
            // 已经授权，可直接调用
            wx.getUserInfo({
              success:function(res){
                console.log(res.userInfo)
              }
            })
          }
        }
      })

       {
        var that = this;
        wx.showLoading({ // 显示加载提示框
          title: '获取openID。。。',
        })
        wx.cloud.callFunction({ // 调用云函数
          name: 'login', // 函数名称
          data: {}, // 函数参数
          complete: res => { // 调用完成时的回调函数
            wx.hideLoading() // 隐藏加载提示框
          },
          success: res => { // 调用成功时的回调函数
            console.log('[云函数] [login] user openid: ', res.result.openid)
            that.setData({ // 设置页面绑定数据
              openID:res.result.openid,
              showDetail: true
            })
            wx.setStorageSync("openID", res.result.openid) // 同步存储用户的OpenID到本地
          },
          fail: err => { // 调用失败时的回调函数
            console.error('[云函数] [login] 调用失败', err)
            that.setData({ // 设置页面绑定数据
              openID: '[云函数]获取openID失败' + err
            })
          }
        })
      }
      db.collection('banben').get().then(res=>{
        console.log(res)
        this.setData({
          which:res.data[0].which
        })
      }) 
     
    },
    bindGetUserInfo(e){
      console.log(e.detail.userInfo)
    },

   

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
      this.onLoad();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})