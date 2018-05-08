package pat2math.internationalization;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.Locale;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

public class I18n {
	
	// metodo de teste para chamada de textos via ResourceBundle
	@RequestMapping(value = "newPatequation/getText", method = RequestMethod.GET, produces="text/plain; charset=UTF-8")
	public @ResponseBody String testeCabuloso(String key, String idioma, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response){
		Locale locale = new Locale(idioma.substring(0, 2), idioma.substring(3));
		ResourceBundle labels = ResourceBundle.getBundle("pat2math.i18n.IdiomBundle", locale);
		String value;
		value = labels.getString(key);
		return value;
	}
	
	public String[] getIdiomBundleArray(String idioma) {
		Locale locale = new Locale(idioma.substring(0, 2), idioma.substring(3));
		ResourceBundle labels = ResourceBundle.getBundle("pat2math.i18n.IdiomBundle", locale);
		Enumeration<String> bundleKeys = labels.getKeys();
		ArrayList<String> list = new ArrayList<>();
		while (bundleKeys.hasMoreElements()) {
			String key = (String) bundleKeys.nextElement();
			String value = labels.getString(key);
			list.add(value);
		}
		return (String[])list.toArray();
	}
	
}
	

