package cn.tongyouhui.control.vo;

import java.io.Serializable;

//登录使用的pojo
public class LoginVo implements Serializable {
	private static final long serialVersionUID = -6249884171003760148L;
	/**
	 * 
	 */
	private String log_username;//用户名
	private String log_password;//密码
	private String log_validatenum;//短信验证
	private String reg_username;//
	private String reg_password;//
	private String role1;
	private String role2;
	private Integer state;
	//*******2017.3.11添加*****************
	private String reg_head_portrait;//头像
	private String login_id;//主键
	public String getLogin_id() {
		return login_id;
	}
	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}
	public String getReg_head_portrait() {
		return reg_head_portrait;
	}
	public void setReg_head_portrait(String reg_head_portrait) {
		this.reg_head_portrait = reg_head_portrait;
	}
	//*************************************
	public LoginVo() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getLog_username() {
		return log_username;
	}
	public void setLog_username(String log_username) {
		this.log_username = log_username;
	}
	public String getLog_password() {
		return log_password;
	}
	public void setLog_password(String log_password) {
		this.log_password = log_password;
	}
	public String getLog_validatenum() {
		return log_validatenum;
	}
	public void setLog_validatenum(String log_validatenum) {
		this.log_validatenum = log_validatenum;
	}
	public String getReg_username() {
		return reg_username;
	}
	public void setReg_username(String reg_username) {
		this.reg_username = reg_username;
	}
	public String getReg_password() {
		return reg_password;
	}
	public void setReg_password(String reg_password) {
		this.reg_password = reg_password;
	}
	public String getRole1() {
		return role1;
	}
	public void setRole1(String role1) {
		this.role1 = role1;
	}
	public String getRole2() {
		return role2;
	}
	public void setRole2(String role2) {
		this.role2 = role2;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	@Override
	public String toString() {
		return "LoginVo [log_username=" + log_username + ", log_password=" + log_password + ", log_validatenum="
				+ log_validatenum + ", reg_username=" + reg_username + ", reg_password=" + reg_password + ", role1="
				+ role1 + ", role2=" + role2 + ", state=" + state + "]";
	}
	
}
