package cn.tongyouhui.control.util;

public class NumUtil {
	public static String getNum(String num){
		StringBuilder sb = new StringBuilder();
		if(num.length()==1){
			sb.append("00");
			sb.append(num);
		}else if(num.length()==2){
			sb.append("0");
			sb.append(num);
		}else{
			sb.append(num);
		}
		return sb.toString();
	}
}
