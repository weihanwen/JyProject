<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<base href="<%=basePath%>">
		
		<meta charset="utf-8" />
		<title></title>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="renderer" content="webkit">
		<meta name="description" content="overview & stats" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link href="css/bootstrap.min.css" rel="stylesheet" />
		<link href="css/bootstrap-responsive.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="css/font-awesome.min.css" />
		<!--[if IE 7]><link rel="stylesheet" href="css/font-awesome-ie7.min.css" /><![endif]-->
		<!--[if lt IE 9]><link rel="stylesheet" href="css/ace-ie.min.css" /><![endif]-->
		<!-- 下拉框 -->
		<link rel="stylesheet" href="css/chosen.css" />
		
		<link rel="stylesheet" href="css/ace.min.css" />
		<link rel="stylesheet" href="css/ace-responsive.min.css" />
		<link rel="stylesheet" href="css/ace-skins.min.css" />
		
		<link rel="stylesheet" href="css/datepicker.css" /><!-- 日期框 -->
		<script type="text/javascript" src="js/jquery-1.7.2.js"></script>
		<script type="text/javascript" src="js/jquery.tips.js"></script>
		
<script type="text/javascript">
	
	
	
	//保存
	function save(){
			if($("#clerk_name").val()==""){
			$("#clerk_name").tips({
				side:3,
	            msg:'请输入名字',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#clerk_name").focus();
			return false;
		}
		if($("#idnumber").val()==""){
			$("#idnumber").tips({
				side:3,
	            msg:'请输入身份证号',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#idnumber").focus();
			return false;
		}
		if($("#phone").val()==""){
			$("#phone").tips({
				side:3,
	            msg:'请输入电话',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#phone").focus();
			return false;
		}
		/* if($("#clerk_file_id").val()==""){
			$("#clerk_file_id").tips({
				side:3,
	            msg:'请输入唯一标示id',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#clerk_file_id").focus();
			return false;
		} */
		if($("#sp_file_id").val()==""){
			$("#sp_file_id").tips({
				side:3,
	            msg:'请输入服务商id',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#sp_file_id").focus();
			return false;
		}
		if($("#address").val()==""){
			$("#address").tips({
				side:3,
	            msg:'请输入地址',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#address").focus();
			return false;
		}
		if($("#open_statestatus").val()==""){
			$("#open_statestatus").tips({
				side:3,
	            msg:'请输入开启状态默认0-关闭：0-关闭，1-开启',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#open_statestatus").focus();
			return false;
		}
		if($("#username").val()==""){
			$("#username").tips({
				side:3,
	            msg:'请输入用户名',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#username").focus();
			return false;
		}
		if($("#password").val()==""){
			$("#password").tips({
				side:3,
	            msg:'请输入密码',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#password").focus();
			return false;
		}
		if($("#createdate").val()==""){
			$("#createdate").tips({
				side:3,
	            msg:'请输入创建时间',
	            bg:'#AE81FF',
	            time:2
	        });
			$("#createdate").focus();
			return false;
		}
		$("#Form").submit();
		$("#zhongxin").hide();
		$("#zhongxin2").show();
	}
	
</script>
	</head>
<body>
	<form action="clerk_file/${msg }.do" name="Form" id="Form" method="post">
		<input type="hidden" name="clerk_file_id" id="clerk_file_id" value="${pd.CLERK_FILE_ID}"/>
		<div id="zhongxin">
		<table>
			<tr>
				<td><input type="text" name="clerk_name" id="clerk_name" value="${pd.clerk_name}" maxlength="32" placeholder="这里输入名字" title="名字"/></td>
			</tr>
			<tr>
				<td><input type="text" name="idnumber" id="idnumber" value="${pd.idnumber}" maxlength="32" placeholder="这里输入身份证号" title="身份证号"/></td>
			</tr>
			<tr>
				<td><input type="text" name="phone" id="phone" value="${pd.phone}" maxlength="32" placeholder="这里输入电话" title="电话"/></td>
			</tr>
			<tr>
				<td><input type="text" name="sp_file_id" id="sp_file_id" value="${pd.sp_file_id}" maxlength="32" placeholder="这里输入服务商id" title="服务商id"/></td>
			</tr>
			<tr>
				<td><input type="text" name="address" id="address" value="${pd.address}" maxlength="32" placeholder="这里输入地址" title="地址"/></td>
			</tr>
			<tr>
				<td><input type="text" name="open_statestatus" id="open_statestatus" value="${pd.open_statestatus}" maxlength="32" placeholder="这里输入开启状态默认" title="开启状态默认0-关闭：0-关闭，1-开启"/></td>
			</tr>
			<tr>
				<td><input type="text" name="username" id="username" value="${pd.username}" maxlength="32" placeholder="这里输入用户名" title="用户名"/></td>
			</tr>
			<tr>
				<td><input type="text" name="password" id="password" value="${pd.password}" maxlength="32" placeholder="这里输入密码" title="密码"/></td>
			</tr>
			<tr>
				<td><input type="text" name="createdate" id="createdate" value="${pd.createdate}" maxlength="32" placeholder="这里输入创建时间" title="创建时间"/></td>
			</tr>
			<tr>
				<td style="text-align: center;">
					<a class="btn btn-mini btn-primary" onclick="save();">保存</a>
					<a class="btn btn-mini btn-danger" onclick="top.Dialog.close();">取消</a>
				</td>
			</tr>
		</table>
		</div>
		
		<div id="zhongxin2" class="center" style="display:none"><br/><br/><br/><br/><br/><img src="images/jiazai.gif" /><br/><h4 class="lighter block green">提交中...</h4></div>
		
	</form>
	
	
		<!-- 引入 -->
		<script type="text/javascript">window.jQuery || document.write("<script src='js/jquery-1.9.1.min.js'>\x3C/script>");</script>
		<script src="js/bootstrap.min.js"></script>
		<script src="js/ace-elements.min.js"></script>
		<script src="js/ace.min.js"></script>
		<script type="text/javascript" src="js/chosen.jquery.min.js"></script><!-- 下拉框 -->
		<script type="text/javascript" src="js/bootstrap-datepicker.min.js"></script><!-- 日期框 -->
		<script type="text/javascript">
		$(window.parent.hangge());
		$(function() {
			
			//单选框
			$(".chzn-select").chosen(); 
			$(".chzn-select-deselect").chosen({allow_single_deselect:true}); 
			
			//日期框
			$('.date-picker').datepicker();
			
		});
		
		</script>
</body>
</html>