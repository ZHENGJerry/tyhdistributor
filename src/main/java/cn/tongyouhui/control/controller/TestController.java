package cn.tongyouhui.control.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by ZL on 2017/3/23.
 */
@Controller
public class TestController {

    @RequestMapping(value = "Test")
    public String Test(HttpServletRequest request)throws Exception{
        return "sdasd";
    }
}
