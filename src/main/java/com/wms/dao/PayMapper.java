package com.wms.dao;

import com.wms.bean.Pay;
import com.wms.bean.vo.IncomeVo;

public interface PayMapper {
    int deleteByPrimaryKey(Integer pid);

    int insert(Pay record);

    int insertSelective(Pay record);

    Pay selectByPrimaryKey(Integer pid);

    int updateByPrimaryKeySelective(Pay record);

    int updateByPrimaryKey(Pay record);
    
    IncomeVo selectByTime(String time);
}