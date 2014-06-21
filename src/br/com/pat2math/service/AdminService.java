package br.com.pat2math.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.validation.Errors;
import br.com.pat2math.domainBase.Exercise;
import br.com.pat2math.domainBase.Video;
import br.com.pat2math.repository.ContentRepository;
import br.com.pat2math.repository.ExerciseRepository;
import br.com.pat2math.repository.VideoRepository;

@Repository
public class AdminService {
	@Autowired private ContentRepository contents;
	@Autowired private ExerciseRepository exercises;
	@Autowired private VideoRepository videos;
	
	public Video createVideo(Video video, Errors errors) {
		video.formatUrl();
		if(contents.getByName(video.getName()) != null) {
			errors.rejectValue("name", "error.duplicate",
					new String[] { video.getName() }, null);
		}
		return errors.hasErrors() ? null : (Video) contents.add(video);
	}
	
	public List<Video> showVideos() {
		return videos.getAll();
	}
	
	public Video showVideo(Long id) {
		return videos.get(id);
	}
	
	public void createExercise(Exercise exercise) {
		exercises.add(exercise);
	}
}