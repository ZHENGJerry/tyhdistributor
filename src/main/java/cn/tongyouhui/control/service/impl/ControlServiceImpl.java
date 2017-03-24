package cn.tongyouhui.control.service.impl;

import cn.tongyouhui.control.dao.RegisterMapper;
import cn.tongyouhui.control.service.ControlService;
import cn.tongyouhui.control.vo.ControlRegister;
import cn.tongyouhui.control.vo.LoginVo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ControlServiceImpl implements ControlService {
	@Resource
	RegisterMapper registerMapper;

	// 将数据插入到登录的表中
	@Override
	public void insertLoginInfo(ControlRegister controlRegister) {
		// 手动封装一些数据
		Date date = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String nowDate = sdf.format(date);
		controlRegister.setCreate_date(nowDate);
		//伪删除列数值默认为1
		controlRegister.setDel(1);
		// 判断是否是供应商，如果是则审核状态为0，其余为1，并查询当前所有供应商的个数，并进行顺序的记录
		if (controlRegister.getRole2().equals("我是供应商")) {
			//进入login_info_company中查询所有的供应商的个数
			Integer num=registerMapper.getNumByType();
			controlRegister.setNum(num+1);
			controlRegister.setState(0);
		} else {
			controlRegister.setState(1);
		}
		//将基本数据插入到login中
		registerMapper.register_base_info(controlRegister);
		//判断是企业还是个人
		if(controlRegister.getRole1().equals("我是企业")){
			// 将数据插入到company数据库中
			registerMapper.register_company_info(controlRegister);
		}else if(controlRegister.getRole1().equals("我是个人")){
			// 将数据插入到person中
			registerMapper.register_person_info(controlRegister);
		}
	}
	//根据用户名和密码查看该用户是否存在
	@Override
	public LoginVo login(LoginVo loginVo) {
		loginVo=registerMapper.login(loginVo);
		return loginVo;
	}
	//根据id和角色查看此用户的全部信息
	@Override
	public ControlRegister selectInfoByIdAndRole1(String log_username, String role1) {
		ControlRegister controlRegister = new ControlRegister(); 
		if(role1.equals("我是企业")){
			//从企业表查询
			controlRegister=registerMapper.selectInfoByCompany(log_username);
			controlRegister.setNum(registerMapper.getNumByType());
		}else{
			//从个人表查询
			controlRegister=registerMapper.selectInfoByPerson(log_username); 
			controlRegister.setNum(registerMapper.getNumByTypePerson());
		}
		
		return controlRegister;
	}
	//根据id查看是否可以注册
	@Override
	public LoginVo getUserByUsername(String reg_username) {
		LoginVo lv = new LoginVo();
		lv=registerMapper.getUserByUsername(reg_username);
		return lv;
	}
	//测试回去的返回个数
	

}
