package cn.tongyouhui.control.util;

import org.apache.commons.codec.binary.Base64;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Util {
	public static String md5(String str) {
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("MD5");
			byte[] input = str.getBytes();
			String output = Base64.encodeBase64String(md.digest(input));
			return output;
		} catch (NoSuchAlgorithmException e) {
			
			e.printStackTrace();
			return null;
		}
	}
/*	@Test
	public void demo1(){
		System.out.println(md5("123456"));
		
	}*/
}
