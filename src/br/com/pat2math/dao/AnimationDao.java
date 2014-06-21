package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;

import br.com.pat2math.repository.AnimationRepository;
import br.com.pat2math.studentModel.Animation;

@Repository
public class AnimationDao extends GenericDao<Animation> implements AnimationRepository {

}