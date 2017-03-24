package cn.tongyouhui.control.util;/*package cn.tongyouhui.control.util;

import java.io.IOException;
import java.util.UUID;

import org.junit.Test;

import com.qiniu.common.QiniuException;
import com.qiniu.common.Zone;
import com.qiniu.http.Response;
import com.qiniu.storage.Configuration;
import com.qiniu.storage.UploadManager;
import com.qiniu.util.Auth;

public class UploadFiled {
	//String FilePath,String key
	@Test
    public static void upload(String FilePath) throws IOException {
		String substring = UUID.randomUUID().toString().substring(0, 18);
		String key=substring;
    	Auth auth = Auth.create("7qVwwPdf2eSQpudaQDm4_I3eeLEg102v6iSgbdRl","YYh1LRxfISkSUdYN95FTceUW7qEGu_Gc8_8lGeCJ");
        String uploadToken = auth.uploadToken("pics4luxian");
    	//第二种方式: 自动识别要上传的空间(bucket)的存储区域是华东、华北、华南。
        Zone z = Zone.autoZone();
        Configuration c = new Configuration(z);

        //创建上传对象
        UploadManager uploadManager = new UploadManager(c);
        try {
            //调用put方法上传
            Response res = uploadManager.put(FilePath, key, uploadToken);
            //打印返回的信息
            StringBuilder sb = new StringBuilder();
            sb.append("http://pics.ctripfair.com/");
            sb.append(substring);
            System.out.println(sb.toString());
        } catch (QiniuException e) {
            Response r = e.response;
            // 请求失败时打印的异常的信息
            System.out.println(r.toString());
            try {
                //响应的文本信息
                System.out.println(r.bodyString());
            } catch (QiniuException e1) {
                //ignore
            }
        }
    }
}
*/