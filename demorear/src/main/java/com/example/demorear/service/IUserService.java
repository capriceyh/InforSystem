package com.example.demorear.service;

import com.example.demorear.controller.dto.UserDTO;
import com.example.demorear.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author C~y~
 * @since 2022-09-23
 */
public interface IUserService extends IService<User> {

    UserDTO login(UserDTO userDTO);

    User register(UserDTO userDTO);
}
