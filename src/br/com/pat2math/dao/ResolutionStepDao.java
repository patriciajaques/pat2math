package br.com.pat2math.dao;

import org.springframework.stereotype.Repository;

import br.com.pat2math.repository.ResolutionStepRepository;
import br.com.pat2math.studentModel.ResolutionStep;

@Repository
public class ResolutionStepDao extends GenericDao<ResolutionStep> implements ResolutionStepRepository {

}