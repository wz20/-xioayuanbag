const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        work_src:[],
        work_title:'',
        work_money:'',
        work_kind:'',
        work_way:'',
        work_about:'',
        work__id:'',
        show: false,
        actions: [
            {
              name: '请同学们自行联系兼职',
              
            },],
        which:''

    },
    onClose() {
        this.setData({ show: false });
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
        console.log('兼职id已经找到',options._id)
        db.collection('work').doc(options._id).get({
            success:function(res){
                console.log('兼职详情获取成功',res)
                that.setData({
                    work_src:res.data.src,
                    work_title:res.data.title,
                    work_money:res.data.money,
                    work_kind:res.data.kind,
                    work_way:res.data.way,
                    work_about:res.data.about
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