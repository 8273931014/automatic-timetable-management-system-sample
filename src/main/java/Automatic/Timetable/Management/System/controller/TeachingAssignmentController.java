package Automatic.Timetable.Management.System.controller;

import Automatic.Timetable.Management.System.entity.TeachingAssignment;
import Automatic.Timetable.Management.System.repository.TeachingAssignmentRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000"
})
public class TeachingAssignmentController {

    private final TeachingAssignmentRepository repository;

    public TeachingAssignmentController(
            TeachingAssignmentRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<TeachingAssignment> getAllAssignments() {
        return repository.findAll();
    }

    @PostMapping
    public TeachingAssignment addAssignment(
            @RequestBody TeachingAssignment assignment) {
        return repository.save(assignment);
    }

    @DeleteMapping("/{id}")
    public void deleteAssignment(@PathVariable Long id) {
        repository.deleteById(id);
    }
}