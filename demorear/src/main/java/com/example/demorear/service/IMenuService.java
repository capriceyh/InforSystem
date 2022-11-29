package com.example.demorear.service;

import com.example.demorear.entity.Menu;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author C~y~
 * @since 2022-09-29
 */
public interface IMenuService extends IService<Menu> {

    List<Menu> findMenus(String name);
}
