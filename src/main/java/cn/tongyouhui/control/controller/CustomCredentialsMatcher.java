package cn.tongyouhui.control.controller;

import cn.tongyouhui.control.util.MD5Util;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authc.credential.SimpleCredentialsMatcher;

/**
 * 密码比较器
 * @author Administrator
 *
 */
public class CustomCredentialsMatcher extends SimpleCredentialsMatcher {
	/**
	 * 用于执行密码比较的方法
	 * 第一个参数：代表用户在界面输入的用户名和密码
	 * 第二个参数：代表了数据库中的密码
	 * 
	 */
	public boolean doCredentialsMatch(AuthenticationToken token, AuthenticationInfo info) {
		//向下转型
		UsernamePasswordToken uptoken = (UsernamePasswordToken) token;
		//获取用户输入的密码
		String password =new String(uptoken.getPassword());
		//将用户输入的密码进行加密
		String inputPwdEncrypt = MD5Util.md5(password);
		//将数据库中的密码与输入后加密的密码进行对比
		String dbPwd = info.getCredentials().toString();
		return super.equals(inputPwdEncrypt, dbPwd);
	}

}
