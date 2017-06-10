package com.tianer.util.huanxin.api.impl;

import com.tianer.util.huanxin.api.RestAPI;
import com.tianer.util.huanxin.api.RestAPIInvoker;
import com.tianer.util.huanxin.comm.ClientContext;

 

 

 

 
 

public abstract class EasemobRestAPI implements RestAPI {
	
	private ClientContext context;
	
	private RestAPIInvoker invoker;

	public abstract String getResourceRootURI();
	
	public ClientContext getContext() {
		return context;
	}

	public void setContext(ClientContext context) {
		this.context = context;
	}

	public RestAPIInvoker getInvoker() {
		return invoker;
	}

	public void setInvoker(RestAPIInvoker invoker) {
		this.invoker = invoker;
	}
	
	
}
