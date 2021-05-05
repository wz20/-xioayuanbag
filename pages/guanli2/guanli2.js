const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerData:[],
        which:''

    },

    xiajia:function(e){
        let that = this
        console.log('id',e.currentTarget.dataset.id)
        db.collection('bannerData').where({
            _id:e.currentTarget.dataset.id
        }).remove({
        success: function(res) {
        console.log('删除成功',res.data)
        wx.cloud.deleteFile({
          fileList:e.currentTarget.dataset.img,
          success: res => {
            // handle success
            console.log(res.fileList)
          },
          fail: err => {
            // handle error
          },
        })
        wx.redirectTo({
          url: '../fabu2/fabu2',
        })
      }
    })
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that=this 
        console.log('options',options)
        db.collection('bannerData').where({
            _openid: options.openID})
        .get({
            success:function(res){
                console.log('首页获取成功',res)
                that.setData({
                    bannerData:res.data,
                })
            },
            fail:function(res){
                console.log('首页获取失败',res)
            }
        })
        db.collection('banben').get().then(res=>{
          console.log(res)
          this.setData({
            which:res.data[0].which
          })
        }) 

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