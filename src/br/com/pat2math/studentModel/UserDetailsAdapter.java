package br.com.pat2math.studentModel;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import br.com.pat2math.repository.TeacherRepository;

public class UserDetailsAdapter implements UserDetails {
	
	private static final long serialVersionUID = 6582601846914196598L;
	
	private TeacherRepository allTeachers;
	private User user;
	
	public UserDetailsAdapter(User user, TeacherRepository allTeachers) {
		this.allTeachers = allTeachers;
		this.user = user;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<GrantedAuthority> authorities = new HashSet<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(user.getRole()));
		return authorities;
	}

	public boolean isOwnerOfPlan(Long idPlan) {
		Teacher teacher = (Teacher) user;
		teacher = allTeachers.get(teacher.getId());
		return teacher.isOwnerOfPlan(idPlan);
	}
	
	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getEmail();
	}
	
	public Long getId() {
		return user.getId();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return user.isEnable();
	}
	
}