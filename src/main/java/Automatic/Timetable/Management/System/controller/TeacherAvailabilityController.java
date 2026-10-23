
package Automatic.Timetable.Management.System.controller;

import Automatic.Timetable.Management.System.entity.TeacherAvailability;
import Automatic.Timetable.Management.System.repository.TeacherAvailabilityRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/teacher-availability")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherAvailabilityController {

    private final TeacherAvailabilityRepository repository;

    public TeacherAvailabilityController(
            TeacherAvailabilityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TeacherAvailability> getAll() {
        return repository.findAll();
    }

    @PostMapping
    public TeacherAvailability add(
            @RequestBody TeacherAvailability availability) {
        return repository.save(availability);
    }
}
