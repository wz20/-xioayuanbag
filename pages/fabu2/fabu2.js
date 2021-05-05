const db = wx.cloud.database()
Page({

    
    data: {
      
        radio: '1',
        img:[],
        value:'',
        which:''
       
    },
   

    //   选择
    onChange(event) {
      this.setData({
        radio: event.detail,
      });
    },
    // 上传图片
    upload_img:function(){
      let that=this
      wx.chooseImage({
        count: 1,
        sizeType:['original','compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          var timestamp = Date.parse(new Date());
          timestamp = timestamp /1000;
          console.log("当前时间戳为:"+timestamp);
          const tempFilePaths = res.tempFilePaths
          console.log(tempFilePaths)
          wx.cloud.uploadFile({
            cloudPath:'index/'+timestamp+'.png',
            filePath:tempFilePaths[0],//文件路径
            success:function(res){
              console.log(res.fileID)
              that.setData({
                img:that.data.img.concat(res.fileID)
              })
            },
            fail:function(res){
              console.log("上传失败")

            }
          })
        
        }

      })
    },
    //删除图片
    // 删除数组中的指定下标
    delete:function(e){
      let that=this
      console.log(that.data.img)
      console.log(e.currentTarget.dataset.id)
      var id = e.currentTarget.dataset.id;
      var img=that.data.img;
      img.splice(id,1)
      that.setData({
        img:img
      })
      wx.cloud.deleteFile({
        fileList:[e.currentTarget.dataset.src],
        success:res=>{
          console.log(res.fileList)
        },
        fail:err=>{

        },
      })
      console.log(that.data.img)
    }, 
    // 提交
    submit:function(e){
      let that=this
      console.log('e',e)
      if(e.detail.value.title!==""&&e.detail.value.otherInfo!==""&&e.detail.value.score!==""&&e.detail.value.lines!==""&&e.detail.value.isOpenFilp!==""&&that.data.img.length!==0){
        db.collection('bannerData').add({
          data:{
            title:e.detail.value.title,
            otherInfo:e.detail.value.otherInfo,
            score:e.detail.value.score,
            lines:e.detail.value.lines,
            isOpenFilp:e.detail.value.isOpenFilp,
            img:that.data.img,
          },success:function(res){
            wx.showToast({
              title:'提交成功',
            })
            wx.redirectTo({
              url: '/pages/fabu2/fabu2',
            })
          }
        })
      }else{
        wx.showToast({
          title:'您还有未填信息',
          icon:"none"
        })
      }
    },

    // -----------------------------------------
    onLoad: function (options) {
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