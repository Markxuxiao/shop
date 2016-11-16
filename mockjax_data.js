// 前端开发接口模拟数据
// php开发时不需要加载此文件
$.mockjax({
  url: "/retData/data",
  responseText: {
    "errNum": 0,//0 为成功 1或其他为失败
    "retMsg": "success",
    "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
            {id:2,name:"王xx某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:false}
    ]
  }
});
$.mockjax({
  url: "/retData/data1",
  responseText: {
    "errNum": 0,//0 为成功 1或其他为失败
    "retMsg": "success",
    "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
    ]
  }
});
$.mockjax({
  url: "/retData/data2",
  responseText: {
    "errNum": 0,//0 为成功 1或其他为失败
    "retMsg": "success",
    "retData": [{id:1,name:"王某",province:"湖北省",city:"武汉市",county:"东西湖区",street:"三秀路士大夫士大夫",phone:11231231131,default:true},
    ]
  }
});

