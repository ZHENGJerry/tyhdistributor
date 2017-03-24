package cn.tongyouhui.control.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CreateValidateUtil {
	public static String getOrderNo() {
		String orderNo = "";
		String trandNo = String.valueOf((Math.random() * 9 + 1) * 1000000);
		String sdf = new SimpleDateFormat("yyyyMMddHHMMSS").format(new Date());
		orderNo = trandNo.toString().substring(0, 4);
		orderNo = orderNo + sdf;
		return orderNo.substring(0, 4);
	}
}
