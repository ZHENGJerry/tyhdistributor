$(function(){
 //当前登录账户
  var nowUser=$(window.parent.document.body).find('.nav-right-name-ple').find('span').text();

  // 页面加载
  ajaxTo('supplierAccountManagerController/findSupplierByRegUserName.action','',showInfo);
  function showInfo(list){
      
      if(list.loginVo.reg_head_portrait){
          $('.support-img').prop('src',list.loginVo.reg_head_portrait+'?imageslim'); //图片链接地址
      }else{
          $('.support-img').prop('src','img/child.png'); //图片链接地址
      }
     
     $('.basic-company').text(list.reg_company_name); //供应商名称
     $('.basic-username').text(list.loginVo.reg_username); //登录账号
     $('.basic-company-name').text(list.reg_company_bank); //银行账户
     $('.basic-company-bank').text(list.reg_company_bankcard); //银行卡号
     $('.basic-company-bank-name').text(list.reg_company_bankcard_name); //开户行名称
     $('.basic-company-zhi').text(list.reg_company_alipay); //支付宝账号
     $('.basic-company-z').text(list.reg_company_phone); //座机电话
     $('.basic-company-y').text(list.reg_company_cellphone); //业务联系电话
     $('.basic-company-d').text(list.reg_company_receive_message); //接收短信手机

     if(list.pay_phone){
        $('.no-diag').val('修改号码').removeClass('no-diag-complete');
        $(".tel").val(list.pay_phone).css( {"background":"transparent","border":"none" });
     }
  }



  //保存并修改号码
  var isChangeNum=false;
  $(".no-diag-complete").on("click",function(){
  	var re = /^1[34578]\d{9}$/;
    if( isChangeNum ){  //保存号码后创建修改号码弹窗
        $(".dialog").remove();
        createDialog( {
            title: $(this).val(),
            content: getCont( $(this) )
        } );
    }else{  //保存并验证号码
        if( re.test($(".tel").val()) ){
            
            var send_data={};
            send_data.reg_username=nowUser;
            send_data.pay_phone=$('.zhifuPhone').val();  //支付验证手机号码
            //向后台传值 
            ajaxTo('supplierAccountManagerController/updateSupplierVo.action',JSON.stringify(send_data),'');

            $(".phone-warn").remove(); 
            $(this).val("修改号码");
            $(".tel").css( "background","transparent" ).css( "border","none" );
            isChangeNum=true;
        }else{
            $(".phone-warn").remove();
            var warn=$("<span class='phone-warn'>");
            warn.html("请输入正确的手机号");
            $(this).parent().append(warn);
        }
    }
  }).removeClass('no-diag-complete');

  //创建弹窗
  $(".info-btn:not(.no-diag-complete)").on("click",function(){
      $(".dialog").remove();
      createDialog( {
        title: $(this).val(),
        content: getCont( $(this) )
      } );
  });

  //头像的上传
  upload( $(".tou-pic").get(0),$(".tou-pic").parent().find("img"),function(){
    $(".tou-pic").prev().val("修改头像");
    $(".tou-pic").parent().find("img").css("border-color","transparent").css("border-radius","20px");
  } );

  function upload(btn,wrap,fn){  
    var uploader = Qiniu.uploader({
        runtimes: 'html5,flash,html4',
        browse_button: btn, 
        get_new_uptoken: false,
        unique_names:true,
        uptoken: "7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl:FiqgmclC-LmPkmrflsOw01VAX4E=:eyJzY29wZSI6InBpY3M0bHV4aWFuIiwiZGVhZGxpbmUiOjE0ODk3NTEyODh9",
        // uptoken_url: "/tyhcontrol/qnytoken",
        domain: 'http://pics.ctripfair.com/', 
        max_file_size: '5mb',            
        flash_swf_url: '/Moxie.swf',  
        dragdrop: true, 
        chunk_size: '4mb',                  // 分块上传时，每块的体积
        auto_start: true,                   
        init: {
          'FilesAdded': function(up, files) {
            for (var i= 0; i < files.length; i++) {
              var fileItem = files[i].getNative(),
              url = window.URL || window.webkitURL || window.mozURL;
              var src = url.createObjectURL(fileItem);
              wrap.attr('src',src);
            };
            if(fn){
              fn();
            }
          },
          'FileUploaded': function(up, file, info) {
            var domain = "http://pics.ctripfair.com";
            var res = JSON.parse(info);
            var sourceLink = domain +"/"+ res.key;
            wrap.attr('src',sourceLink);

            $.ajax({
              url:'supplierAccountManagerController/updateSupplierLogin.action',
              type:'post',
              data:{reg_head_portrait:sourceLink,
                    reg_username:nowUser},
            });
          },
          'Error': function(up, err, errTip) {
           return ;
         },
       }
     });
  }

  //获取验证码
  $('#main-wrap').on('click','.getvalidate',function(){
      var phone='phone='+nowUser;
      ajaxToCommen('infoValidate',phone,'')  //获取验证码
  });

  //验证码校对
  $('#main-wrap').on('keyup', '.validate-num', function(e){

    if($(this).val().length==4){
      ajaxToCommen('/tyhcontrol/infoValidateShow',{reg_validatenum:$(this).val()},validateAfter);
    }

    e.stopPropagation();
  });
  function validateAfter(list){
      if(list=='no'){
          alert('验证码错误');
      }else{
          //点击弹出"确定"
          $('#main-wrap').off('click','.btn-ok').on('click','.btn-ok',function(e){
              var title=$('.dialogTip').children().first().text();
              
                //点击修改密码
                if(title=='修改密码'){
                    if($('.newPassword').val() && $('.validate-num').val()){
                        var send_data='reg_username='+nowUser+'&reg_password='+$('.newPassword').val();
                        //向后台传值
                        ajaxToCommen('supplierAccountManagerController/updateSupplierLogin.action',send_data,function(list){
                            $('.dialogTip').remove();
                            setTimeout(function(){
                              modalFade('modal/modalInfo.html',fn2);
                              function fn2(){
                                  $(window.parent.document.body).find('#myModal #modal-body').text("修改密码完成，请重新登录");
                                  $(window.parent.document.body).find('#myModal .modal-footer').hide();

                                  setTimeout(function(){
                                    window.parent.location.href="login.html";
                                  },2000);
                              }
                            },300);
                           
                        });   
                    }
                }else if(title=='修改银行卡'){
                    var send_data={};
                    send_data.reg_username=nowUser;
                    send_data.reg_company_bank=$('.new-back-username').val();  //银行账户
                    send_data.reg_company_bankcard=$('.new-back-num').val();       //银行卡号
                    send_data.reg_company_bankcard_name=$('.new-back-name').val();    //开户行名称

                    for(var i in send_data){
                      if(!send_data[i]){
                        return false;
                      }
                    }
                    //向后台传值 
                    ajaxTo('supplierAccountManagerController/updateSupplierVo.action',JSON.stringify(send_data),function(){
                        $('.basic-company-name').text($('.new-back-username').val()); //银行账户
                         $('.basic-company-bank').text($('.new-back-num').val()); //银行卡号
                         $('.basic-company-bank-name').text($('.new-back-name').val()); //开户行名称
                         $('.dialogTip').remove();
                    });  
                }else if(title=='修改账号'){
                    var send_data={};
                    send_data.reg_username=nowUser;
                    send_data.reg_company_alipay=$('.new-zhanghao').val();
                    //向后台传值 
                    ajaxTo('supplierAccountManagerController/updateSupplierVo.action',JSON.stringify(send_data),function(){
                        $('.basic-company-zhi').text($('.new-zhanghao').val()); //支付宝账号
                        $('.dialogTip').remove();
                    });   
                }else if(title=='修改信息'){
                    var send_data={};
                    send_data.reg_username=nowUser;
                    send_data.reg_company_phone=$('.new-change-phone').val();  //座机电话
                    send_data.reg_company_cellphone=$('.new-yewuPhone').val();       //业务联系电话
                    send_data.reg_company_receive_message=$('.new-recieve-phone').val();    //接收短信手机

                    //向后台传值 
                    ajaxTo('supplierAccountManagerController/updateSupplierVo.action',JSON.stringify(send_data),function(){
                        $('.basic-company-z').text($('.new-change-phone').val()); //座机电话
                        $('.basic-company-y').text($('.new-yewuPhone').val()); //业务联系电话
                        $('.basic-company-d').text($('.new-recieve-phone').val()); //接收短信手机
                        $('.dialogTip').remove();
                    });
                }else if(title=='修改号码'){
                    var send_data={};
                    send_data.reg_username=nowUser;
                    send_data.pay_phone=$('.new-validate-num').val();  //支付验证手机号码
                    //向后台传值 
                    ajaxTo('supplierAccountManagerController/updateSupplierVo.action',JSON.stringify(send_data),function(){
                        $(".tel").val($('.new-validate-num').val());
                        $('.dialogTip').remove();
                    });
                }

             e.stopPropagation();
         });
      }
  }

  //创建弹窗
  function createDialog( data ){
      var wrap=$( "<div class='dialog dialogTip'>" );
      //弹窗的标题
      var op=$("<p>");
      op.html( data.title );
      //弹窗底部的按钮
      var obtn=$( "<div class='dialog-btn'>" );
      obtn.html( '<input type="button" value="取消" class="btn-del"><input type="button" value="确定" class="btn-ok">' );
      //弹窗的内容
      var phone = $(".if-pas-count span").eq(1).html();
      var datPhone = phone.substr(0,3) + "****" + phone.substr(7);
      var fixedStr=" <li><span>短信验证</span><span>发送至<span class='pas-phone'>"+ datPhone +"</span><span class='pas-btn'><input type='button' class='getvalidate' value='获取验证码'/></span></span></li><li><span>输入验证码</span><span><input class='validate-num' type='text'></span></li> ";
      var oul=$("<ul class='dialog-list'>");
      oul.html( data.content + fixedStr );

      wrap.append( op );
      wrap.append( oul );
      wrap.append( obtn );

      $("#main-wrap").append( wrap );

      //设置弹窗的位置
      wrap.css( "top",($(window).height()-wrap.height())/2+ $(window).scrollTop() );

      //设置密码是否可见
      var isPassw = false;   //false表示密码不可见
      $(".pas-sh").on("click",function(){
          if( !isPassw ){
              $(this).css("background-position","20px");
              $(this).prev().get(0).type="text";
              isPassw = true;
          }else{
              $(this).css("background-position","0px");
              $(this).prev().get(0).type="password";
              isPassw = false;
          }
          
      });

      $(".btn-del").on("click",function(){
        wrap.remove();
      });
  }

  //获取弹窗里面ul的内容列表
  function getCont( tar ){
      var str;
      switch( tar.val() ){
          case "修改密码":
              str="<li><span>输入新密码</span><span><input class='newPassword' type='password'/><span class='pas-sh'></span></span></li>";
              break;
          case "修改银行卡":
              str="<li><span>银行账户</span><span><input class='new-back-username' type='text'/></span></li><li><span>银行卡号</span><span><input class='new-back-num' type='text'/></span></li><li><span>开户行名称</span><span><input class='new-back-name' type='text'></span></li>";
              break;
          case "修改账号":

              str="<li><span>支付宝账户</span><span><input class='new-zhanghao' type='text'></span></li>"

              break;   
          case "修改信息":
              str="<li><span>座机电话</span><span><input class='new-change-phone' type='text'/></span></li><li><span>业务联系电话</span><span><input class='new-yewuPhone' type='text'/></span></li><li><span>接收短信手机</span><span><input class='new-recieve-phone' type='text'></span></li>";
              break;
          case "修改号码":

              str="<li><span>支付验证号码</span><span><input class='new-validate-num'  type='text'></span></li>"

              break;         
      }
      return str;
  }
});