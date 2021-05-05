const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: false,
        actions: [
            {
              name: '添加开发者微信打赏',
              
            },],
        shangpin_imageURL:[],
        shangpin_name:'',
        shangpin_price:'',
        shangpin_leibie:'',
        shangpin_way:'',
        shangpin_jianjie:'',
        shangpin__id:'',
        which:''

    },
    onClose() {
        this.setData({ show: false });
      },
    
      onSelect(event) {
        // console.log(event.detail);
        wx.showToast({
          title: '复制成功',
        })
        wx.setClipboardData({
          data:'13400280751',
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                console.log(res.data) 
              }
            })
          }
        })
      },
    
    onClickIcon() {
        Toast('点击图标');
      },
    
      onClickButton() {
        
        this.setData({
            show:true
          })
      },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       let that=this 
        console.log('产品id已经找到',options._id)
        db.collection('shangpin').doc(options._id).get({
            success:function(res){
                console.log('商品详情获取成功',res)
                that.setData({
                    shangpin_imageURL:res.data.imageURL,
                    shangpin_name:res.data.name,
                    shangpin_price:res.data.price,
                    shangpin_leibie:res.data.leibie,
                    shangpin_way:res.data.way,
                    shangpin_jianjie:res.data.jianjie
                })
            },
            fail:function(res){
                console.log('商品详情获取失败',res)
            }
        })
        db.collection('banben').get().then(res=>{
          console.log(res)
          this.setData({
            which:res.data[0].which
          })
        }) 
              
        // db.collection('shangpin').doc(options._id).get().then(res=>{
        //     this.setData({
        //       shangpin_name:res.data
        //     })
        //   })


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