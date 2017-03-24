package cn.tongyouhui.control.vo;

import java.io.Serializable;

//注册的pojo
public class ControlRegister implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -3453289638796145063L;
	private Integer num;//记录总供应商的个数
	private String reg_password;//密码
	private String idcardselect;//身份 例如：中文导游
	private String pass_file_img;//证件照片路径
	
	
	private String reg_username;	//id
	private String reg_company_name;//企业名称
	private String company_address_nationwide;//地区
	private String company_address_county;//省
	private String reg_company_address;//详情地址
	
	private String reg_company_phone;	//座机号码
	private String reg_company_cellphone;//手机号码_联系使用
	private String reg_company_administrator_phone;//管理员电话
	private String reg_company_administrator_name;//管理员姓名
	private String reg_company_bank;//银行账户名称
	
	private String reg_distributor_bank;//银行账户名称（个人）
	private String reg_distributor_bankcard;//银行卡号(个人)
	private String reg_distributor_bankcard_name;//开户行名称(个人)
	private String reg_distributor_alipay;//支付宝(个人)
	private String reg_distributor_receive_message;//手机号码接收短信(个人)
	
	private String reg_company_bankcard;	//银行卡号
	private String reg_company_bankcard_name;//开户行名称
	private String reg_company_alipay;//支付宝账户
	private String reg_company_receive_message;//手机号码，接收短信使用
	private String create_date;//创建日期
	
	private String role2;	//细分角色
	private String role1;//粗分角色
	private Integer state;//状态 0 代表未通过 1代表通过审核
	private String reg_email;//emali
	private Integer del;//伪删除列 默认为1 
	
	private String company_address_nationwide_num;//对应区号
	private String company_address_county_num;//对应省号
	
	private String show_ui_need;//前台所需
	public ControlRegister() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public String getShow_ui_need() {
		return show_ui_need;
	}

	public void setShow_ui_need(String show_ui_need) {
		this.show_ui_need = show_ui_need;
	}

	public String getReg_password() {
		return reg_password;
	}
	public void setReg_password(String reg_password) {
		this.reg_password = reg_password;
	}
	public String getIdcardselect() {
		return idcardselect;
	}
	public void setIdcardselect(String idcardselect) {
		this.idcardselect = idcardselect;
	}
	public String getPass_file_img() {
		return pass_file_img;
	}
	public void setPass_file_img(String pass_file_img) {
		this.pass_file_img = pass_file_img;
	}
	public String getReg_username() {
		return reg_username;
	}
	public void setReg_username(String reg_username) {
		this.reg_username = reg_username;
	}
	public String getReg_company_name() {
		return reg_company_name;
	}
	public void setReg_company_name(String reg_company_name) {
		this.reg_company_name = reg_company_name;
	}
	public String getCompany_address_nationwide() {
		return company_address_nationwide;
	}
	public void setCompany_address_nationwide(String company_address_nationwide) {
		this.company_address_nationwide = company_address_nationwide;
	}
	public String getCompany_address_county() {
		return company_address_county;
	}
	public void setCompany_address_county(String company_address_county) {
		this.company_address_county = company_address_county;
	}
	public String getReg_company_address() {
		return reg_company_address;
	}
	public void setReg_company_address(String reg_company_address) {
		this.reg_company_address = reg_company_address;
	}
	public String getReg_company_phone() {
		return reg_company_phone;
	}
	public void setReg_company_phone(String reg_company_phone) {
		this.reg_company_phone = reg_company_phone;
	}
	public String getReg_company_cellphone() {
		return reg_company_cellphone;
	}
	public void setReg_company_cellphone(String reg_company_cellphone) {
		this.reg_company_cellphone = reg_company_cellphone;
	}
	public String getReg_company_administrator_phone() {
		return reg_company_administrator_phone;
	}
	public void setReg_company_administrator_phone(String reg_company_administrator_phone) {
		this.reg_company_administrator_phone = reg_company_administrator_phone;
	}
	public String getReg_company_administrator_name() {
		return reg_company_administrator_name;
	}
	public void setReg_company_administrator_name(String reg_company_administrator_name) {
		this.reg_company_administrator_name = reg_company_administrator_name;
	}
	public String getReg_company_bank() {
		return reg_company_bank;
	}
	public void setReg_company_bank(String reg_company_bank) {
		this.reg_company_bank = reg_company_bank;
	}
	public String getReg_distributor_bank() {
		return reg_distributor_bank;
	}
	public void setReg_distributor_bank(String reg_distributor_bank) {
		this.reg_distributor_bank = reg_distributor_bank;
	}
	public String getReg_distributor_bankcard() {
		return reg_distributor_bankcard;
	}
	public void setReg_distributor_bankcard(String reg_distributor_bankcard) {
		this.reg_distributor_bankcard = reg_distributor_bankcard;
	}
	public String getReg_distributor_bankcard_name() {
		return reg_distributor_bankcard_name;
	}
	public void setReg_distributor_bankcard_name(String reg_distributor_bankcard_name) {
		this.reg_distributor_bankcard_name = reg_distributor_bankcard_name;
	}
	public String getReg_distributor_alipay() {
		return reg_distributor_alipay;
	}
	public void setReg_distributor_alipay(String reg_distributor_alipay) {
		this.reg_distributor_alipay = reg_distributor_alipay;
	}
	public String getReg_distributor_receive_message() {
		return reg_distributor_receive_message;
	}
	public void setReg_distributor_receive_message(String reg_distributor_receive_message) {
		this.reg_distributor_receive_message = reg_distributor_receive_message;
	}
	public String getReg_company_bankcard() {
		return reg_company_bankcard;
	}
	public void setReg_company_bankcard(String reg_company_bankcard) {
		this.reg_company_bankcard = reg_company_bankcard;
	}
	public String getReg_company_bankcard_name() {
		return reg_company_bankcard_name;
	}
	public void setReg_company_bankcard_name(String reg_company_bankcard_name) {
		this.reg_company_bankcard_name = reg_company_bankcard_name;
	}
	public String getReg_company_alipay() {
		return reg_company_alipay;
	}
	public void setReg_company_alipay(String reg_company_alipay) {
		this.reg_company_alipay = reg_company_alipay;
	}
	public String getReg_company_receive_message() {
		return reg_company_receive_message;
	}
	public void setReg_company_receive_message(String reg_company_receive_message) {
		this.reg_company_receive_message = reg_company_receive_message;
	}
	public String getCreate_date() {
		return create_date;
	}
	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}
	public String getRole2() {
		return role2;
	}
	public void setRole2(String role2) {
		this.role2 = role2;
	}
	public String getRole1() {
		return role1;
	}
	public void setRole1(String role1) {
		this.role1 = role1;
	}
	public Integer getState() {
		return state;
	}
	public void setState(Integer state) {
		this.state = state;
	}
	public String getReg_email() {
		return reg_email;
	}
	public void setReg_email(String reg_email) {
		this.reg_email = reg_email;
	}
	public Integer getDel() {
		return del;
	}
	public void setDel(Integer del) {
		this.del = del;
	}
	public String getCompany_address_nationwide_num() {
		return company_address_nationwide_num;
	}
	public void setCompany_address_nationwide_num(String company_address_nationwide_num) {
		this.company_address_nationwide_num = company_address_nationwide_num;
	}
	public String getCompany_address_county_num() {
		return company_address_county_num;
	}
	public void setCompany_address_county_num(String company_address_county_num) {
		this.company_address_county_num = company_address_county_num;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Integer getNum() {
		return num;
	}
	public void setNum(Integer num) {
		this.num = num;
	}
	@Override
	public String toString() {
		return "ControlRegister [num=" + num + ", reg_password=" + reg_password + ", idcardselect=" + idcardselect
				+ ", pass_file_img=" + pass_file_img + ", reg_username=" + reg_username + ", reg_company_name="
				+ reg_company_name + ", company_address_nationwide=" + company_address_nationwide
				+ ", company_address_county=" + company_address_county + ", reg_company_address=" + reg_company_address
				+ ", reg_company_phone=" + reg_company_phone + ", reg_company_cellphone=" + reg_company_cellphone
				+ ", reg_company_administrator_phone=" + reg_company_administrator_phone
				+ ", reg_company_administrator_name=" + reg_company_administrator_name + ", reg_company_bank="
				+ reg_company_bank + ", reg_distributor_bank=" + reg_distributor_bank + ", reg_distributor_bankcard="
				+ reg_distributor_bankcard + ", reg_distributor_bankcard_name=" + reg_distributor_bankcard_name
				+ ", reg_distributor_alipay=" + reg_distributor_alipay + ", reg_distributor_receive_message="
				+ reg_distributor_receive_message + ", reg_company_bankcard=" + reg_company_bankcard
				+ ", reg_company_bankcard_name=" + reg_company_bankcard_name + ", reg_company_alipay="
				+ reg_company_alipay + ", reg_company_receive_message=" + reg_company_receive_message + ", create_date="
				+ create_date + ", role2=" + role2 + ", role1=" + role1 + ", state=" + state + ", reg_email="
				+ reg_email + ", del=" + del + ", company_address_nationwide_num=" + company_address_nationwide_num
				+ ", company_address_county_num=" + company_address_county_num + "]";
	}
	
	
}
