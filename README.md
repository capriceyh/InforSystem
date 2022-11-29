# InforSystem
demo为前端部分  
使用方式  
`cd demo`  
`npm run serve`  
此方法为开发环境  
要打包部署需调整为`npm run build`  
注意打包后的路径问题  
demorear为后端部分  
使用方式  
使用idea  
在idea中跑该springboot项目
# 成果展示  
## 登录注册  
![image](https://user-images.githubusercontent.com/88532910/204455274-f9eba8ac-6a4c-4f25-b022-dfb7477bdbad.png)
## 主页数据展示（使用echarts）
![image](https://user-images.githubusercontent.com/88532910/204455371-44ce6a91-a144-4b9f-8d20-9fc58d480181.png)
## 个人信息界面（点击图片可更改头像）  
![image](https://user-images.githubusercontent.com/88532910/204455423-e9c40c2e-3e73-4c03-aebd-993de39259a5.png)
## 用户管理界面（可根据名称、电话、地址查询）
![image](https://user-images.githubusercontent.com/88532910/204455484-01b2c583-ff48-4f21-83e1-cff3387b563d.png)
### 新增用户信息
![image](https://user-images.githubusercontent.com/88532910/204457289-00eb1130-b588-4ca0-adee-4297520cf786.png)
### 批量导入用户信息
![image](https://user-images.githubusercontent.com/88532910/204457519-339ba624-74bc-4041-bc68-2e29ea9d412a.png)
### 将所有用户信息导出
![image](https://user-images.githubusercontent.com/88532910/204457435-782da6d6-b81a-4cf8-8f02-94967eab7ddb.png)
## 角色管理界面  
![image](https://user-images.githubusercontent.com/88532910/204455575-98f7f643-6473-4b67-94b1-5fd94623910a.png)
### 为其分配菜单  
![image](https://user-images.githubusercontent.com/88532910/204455705-ba8d4f8d-d727-429e-af4a-1da92dc70354.png)
### 为其分配角色  
![image](https://user-images.githubusercontent.com/88532910/204455772-e014e0e8-8b0b-44b8-bbd2-6c05ef0df8fc.png)
## 文件管理（可上传和下载文件）
![image](https://user-images.githubusercontent.com/88532910/204457709-095561c8-c8b5-43d4-8e71-afa1670ca7a2.png)
## 菜单管理
![image](https://user-images.githubusercontent.com/88532910/204457837-90d0c6e4-db68-4a8c-b654-8b4879ea2384.png)
### 新增子菜单（需要有页面、路径）
![image](https://user-images.githubusercontent.com/88532910/204457911-01d75ca1-dca5-49fa-8a17-af1f15218dfb.png)
# 用到的数据库表和其对应的字段属性
## sys_user（负责记录用户信息）
![image](https://user-images.githubusercontent.com/88532910/204458819-fe3ea315-71b8-4af8-acbf-64291d61bb05.png)
## sys_file（负责文件上传与下载功能模块）
![image](https://user-images.githubusercontent.com/88532910/204459102-76842a76-dc21-438e-8d85-38acbd2d1de8.png)
## sys_role_menu（角色菜单关系表）
![image](https://user-images.githubusercontent.com/88532910/204459243-1fa538fc-89bc-4c64-95c7-4298266fcaca.png)
## sys_role（角色身份表）
![image](https://user-images.githubusercontent.com/88532910/204459461-f040222b-a774-47ef-8475-d738665822d8.png)
## sys_menu（负责菜单分配模块）
![image](https://user-images.githubusercontent.com/88532910/204459610-75bc6979-d4c4-4afd-bf95-a5dc6e692056.png)
## sys_dict（负责菜单与图标间对应关系--属于菜单分配模块）
![image](https://user-images.githubusercontent.com/88532910/204460005-8a841947-5526-4956-9705-238d8439b9ae.png)
