package cn.tongyouhui.control.util;

public class OrderNum {
	
	/**
	 * 同步生成订单编号
	 * @author Zeal
	 * @return String
	 */
	public static synchronized String getOrderNumber(){
		return String.valueOf(System.currentTimeMillis());
	}

}
