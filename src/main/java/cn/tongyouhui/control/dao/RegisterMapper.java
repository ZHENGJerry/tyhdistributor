package cn.tongyouhui.control.dao;


import cn.tongyouhui.control.vo.ControlRegister;
import cn.tongyouhui.control.vo.LoginVo;

public interface RegisterMapper {
	//向登陆表中插入信息
	public void register_base_info(ControlRegister controlRegister);
	//向企业表中插入数据
	public void register_company_info(ControlRegister controlRegister);
	//向个人表中插入数据
	public void register_person_info(ControlRegister controlRegister);
	//根据用户名和密码判断用户是否存在
	public LoginVo login(LoginVo loginVo);
	//通过id查询信息_企业表
	public ControlRegister selectInfoByCompany(String log_username);
	//通过id查询信息_个人表
	public ControlRegister selectInfoByPerson(String log_username);
	//通过id查询login表
	public LoginVo getUserByUsername(String reg_username);
	//查询所有供应商的个数，公司和企业
	public Integer getNumByType();  
	//查询所有供应商的个数,个人的供销商
	public Integer getNumByTypePerson();

}