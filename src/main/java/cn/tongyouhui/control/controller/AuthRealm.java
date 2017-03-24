package cn.tongyouhui.control.controller;

import cn.tongyouhui.control.service.ControlService;
import cn.tongyouhui.control.vo.LoginVo;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;

/**
 * 自定义的Realm域
 * @author Administrator
 *
 */
@Controller
public class AuthRealm extends AuthorizingRealm {
	@Resource
	ControlService controlService;
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection arg0) {
		// TODO Auto-generated method stub
		return null;
	}
	/**
	 * 认证 (登录)----用户名比较-------密码比较器
	 * 
	 * 参数：代表用户在界面输入的用户名和密码
	 * 
	 * 当返回值不为空时，程序会跳到密码比较器中，执行密码密码比较器的方法
	 * 当返回值为空时，就会出现异常（认证失败的异常）
	 */
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		//1.向下转型 
		UsernamePasswordToken upToken = (UsernamePasswordToken) token;
		
		//2.得到用户名
		String username = upToken.getUsername();//用户在界面输入的用户名
		System.out.println(username);
		//ControlServiceImpl controlServiceImpl = new ControlServiceImpl();
		//3.根据用户名，调用业务方法，查询用户名是否存在
		LoginVo loginVo = controlService.getUserByUsername(username);
		System.out.println(loginVo);
		
		if(loginVo!=null && loginVo.getState()!=0 ){
			return new SimpleAuthenticationInfo(loginVo,loginVo.getReg_password(),this.getName());
		}
		//如果返回为空，则会抛异常，表示登录失败，帐号或密码错误
		return null;
	}



}
