package com.tianer.util;

import java.security.MessageDigest;
import java.util.Date;

public class MD5 {

	public static String md5(String str) {
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(str.getBytes());
			byte b[] = md.digest();

			int i;

			StringBuffer buf = new StringBuffer("");
			for (int offset = 0; offset < b.length; offset++) {
				i = b[offset];
				if (i < 0)
					i += 256;
				if (i < 16)
					buf.append("0");
				buf.append(Integer.toHexString(i));
			}
			str = buf.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return str;
	}
	
	
	public static void main(String[] args) {
		String time=(new Date()).getTime()+"";
		System.out.println(time);
   		System.out.println(md5("321220"));
//   	685e8f4ebf16af3273236a72be80addf
 	}
}
