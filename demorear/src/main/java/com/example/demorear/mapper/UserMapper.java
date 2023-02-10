package com.example.demorear.mapper;

import com.example.demorear.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.mybatis.spring.annotation.MapperScan;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author C~y~
 * @since 2022-09-23
 */
@Mapper
public interface UserMapper extends BaseMapper<User> {

}
