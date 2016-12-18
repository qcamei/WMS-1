package com.wms.bean;

import java.util.Date;

import com.baomidou.mybatisplus.annotations.IdType;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;

public class MakeInventory {
	
	@TableId(type = IdType.AUTO)
	@TableField(value = "mi_id")
    private Integer miId;

	@TableField(value = "mi_name")
    private String miName;

	@TableField(value = "mi_SKUmodel")
    private String miSkumodel;

	@TableField(value = "mi_num")
    private Double miNum;

	@TableField(value = "mi_names")
    private String miNames;

	@TableField(value = "mi_whid")
    private Integer miWhid;

	@TableField(value = "mi_time")
    private Date miTime;

    public Integer getMiId() {
        return miId;
    }

    public void setMiId(Integer miId) {
        this.miId = miId;
    }

    public String getMiName() {
        return miName;
    }

    public void setMiName(String miName) {
        this.miName = miName == null ? null : miName.trim();
    }

    public String getMiSkumodel() {
        return miSkumodel;
    }

    public void setMiSkumodel(String miSkumodel) {
        this.miSkumodel = miSkumodel == null ? null : miSkumodel.trim();
    }

    public Double getMiNum() {
        return miNum;
    }

    public void setMiNum(Double miNum) {
        this.miNum = miNum;
    }

    public String getMiNames() {
        return miNames;
    }

    public void setMiNames(String miNames) {
        this.miNames = miNames == null ? null : miNames.trim();
    }

    public Integer getMiWhid() {
        return miWhid;
    }

    public void setMiWhid(Integer miWhid) {
        this.miWhid = miWhid;
    }

    public Date getMiTime() {
        return miTime;
    }

    public void setMiTime(Date miTime) {
        this.miTime = miTime;
    }
}