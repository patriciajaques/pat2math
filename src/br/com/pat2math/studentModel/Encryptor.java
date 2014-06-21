package br.com.pat2math.studentModel;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Encryptor {
	
	public String encrypt(String word) {
		return encrypt(word, "SHA-1");
	}
	
	public String encrypt(String word, String algorithm) {
		try {
			MessageDigest md = MessageDigest.getInstance(algorithm);
			md.update(word.getBytes());
			return getStringHash(md.digest());
		} catch (NoSuchAlgorithmException e) {
			return null;
		}
	}
	
	public String getStringHash(byte[] bytes) {
		StringBuilder s = new StringBuilder();
		for (int i = 0; i < bytes.length; i++) {
			int parteAlta = ((bytes[i] >> 4) & 0xf) << 4;
		    int parteBaixa = bytes[i] & 0xf;
		    if (parteAlta == 0) s.append('0');
		    s.append(Integer.toHexString(parteAlta | parteBaixa));
		}
		return s.toString();
	}
	
}