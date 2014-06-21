package br.com.pat2math.action;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import br.com.pat2math.studentModel.SignUpConfirmation;
import br.com.pat2math.studentModel.Student;

@Controller
@Transactional
@RequestMapping("/student")
public class SignUpConfirmationController {
	
	@PersistenceContext private EntityManager em;
	
	@RequestMapping("/{id}/confirm/{hash}")
	public String confirmSignUp(@PathVariable("id") Long id, @PathVariable("hash") String hash, Model model) {
		Student student = em.find(Student.class, id);
		SignUpConfirmation confirmation;
		
		CriteriaBuilder qb = em.getCriteriaBuilder();
		CriteriaQuery<SignUpConfirmation> c = qb.createQuery(SignUpConfirmation.class);
		Root<SignUpConfirmation> p = c.from(SignUpConfirmation.class);
		c.where(qb.equal(p.get("user").get("id"), qb.parameter(Long.class, "id")));
		
		TypedQuery<SignUpConfirmation> q = em.createQuery(c);
		q.setParameter("id", id);
		confirmation = q.getSingleResult();
		
		if(confirmation.getHash().equals(hash)) {
			student.activate();
		}
		
		model.addAttribute("confirmed", true);
		return "user.login";
	}
	
}