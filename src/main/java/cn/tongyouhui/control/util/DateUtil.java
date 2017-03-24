package cn.tongyouhui.control.util;

import java.text.SimpleDateFormat;
import java.util.Date;

//获取当前日期的util,并自定义日期格式
public class DateUtil {
	//获取时间并自己传入规定的格式
	public static String getDate(String format){
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		String nowTime = sdf.format(date);
		return nowTime;
	}
	//对两个时间格式的字符串进行比较,返回靠后的时间
	public static String getBigDate(String time1,String time2){
		if(time1.compareTo(time2)>0){
			return time1;
		}else{
			return time2;
		}
	}
}
