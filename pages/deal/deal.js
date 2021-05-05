const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      option1: [
        { text: '全部商品', value: 0 },
        { text: '学习用品', value: 1 },
        { text: '生活用品', value: 2 },
      ],
      option2: [
        { text: '发布时间', value: 'a' },
        { text: '默认最新', value: 'b' },
      ],
      value: '',
      value1:0,
      value2: 'a',
      shangpin:[],
      work:[],
      show: false,
      search:[],
    actions: [
      {
         name: '点击复制开发者微信',
        
      },],
      _id:'',
      xuexi:[],
      shenghuo:[],
      xiaonei:[],
      xiaowai:[],
      activeKey: 0,
      which:''
   

    },
    // ------------搜索框------------
    onChange(e) {
      this.setData({
        value: e.detail,
      });
    },
    onSearch:function(event){
      let that = this
      db.collection('shangpin').where({
        name:db.RegExp({
          regexp: this.data.value,
          options: 'i',
        })
      }).get({
        success:function(res){
          that.setData({
            search:res.data
          })
          console.log('搜索成功',that.data.search)
          if(that.setData.search==""){
            wx.showToast({
              title: '未找到商品',
              icon:"none"
            })
          }
        },
        fail:function(res){
          console.log("搜索失败",res)
        },
      })

    },
    onCancel:function(){
      this.setData({
        search:0
      })
    },
    // ---------------搜索框结束--------------

    // ---------------详情跳转----------------
    xiangqing(e){
      wx.navigateTo({
        url: '/pages/xiangqing/xiangqing?_id='+e.currentTarget.dataset.id,
       
       
      })
    },
  // ---------------标签---------------------
    onClick(event) {
        wx.showToast({
          title: `${event.detail.title}`,
          icon: 'none',
        
        
        });
      },

      change(e){
        this.setData({
          value1:e.detail
        })
      },
      // -----------兼职分类-------------
      workchange(e){
        this.setData({
          activeKey:e.detail
        })
      },
      jianzhi(e){
        wx.navigateTo({
          url: '/pages/jianzhi/jianzhi?_id='+e.currentTarget.dataset.id,
         
         
        })
      },
      // ----------打赏----------------
      dashang() {
        
        this.setData({
            show:true
          })
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

      // 下拉刷新
      
    // .............
    onLoad: function (options) {
      db.collection('shangpin').get().then(res=>{
        this.setData({
          shangpin:res.data
        })
      })
      db.collection('work').get().then(res=>{
        this.setData({
          work:res.data
        })
      })
      db.collection('shangpin').where({
        leibie:'学习用品'
      }).get().then(res=>{
        this.setData({
          xuexi:res.data
        })
      })

      db.collection('shangpin').where({
       leibie:'生活用品'
      }).get().then(res=>{
        this.setData({
          shenghuo:res.data
        })
      })
      db.collection('banben').get().then(res=>{
        console.log(res)
        this.setData({
          which:res.data[0].which
        })
      }) 

      // db.collection('work').where({
      //   place:'校内'
      // }).get().then(res=>{
      //   this.setData({
      //     xiaonei:res.data
      //   })
      // })

      // db.collection('work').where({
      //   place:'校外'
      // }).get().then(res=>{
      //   this.setData({
      //     xiaowai:res.data
      //   })
      // })


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
     
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
    //模拟加载
    setTimeout(function()
    {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    },900);
    

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