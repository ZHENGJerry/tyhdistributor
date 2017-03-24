package cn.tongyouhui.control.service;

import cn.tongyouhui.control.vo.ControlRegister;
import cn.tongyouhui.control.vo.LoginVo;

public interface ControlService {
	//将数据插入到表中
	public void insertLoginInfo(ControlRegister controlRegister);
	//根据用户名和密码查看该用户是否存在
	public LoginVo login(LoginVo loginVo);
	//根据id和角色查询用户
	public ControlRegister selectInfoByIdAndRole1(String log_username, String role1);
	//根据id查询是否可以注册
	public LoginVo getUserByUsername(String reg_username);

}
