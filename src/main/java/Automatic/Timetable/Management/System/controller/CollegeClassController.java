
package Automatic.Timetable.Management.System.controller;

import Automatic.Timetable.Management.System.entity.CollegeClass;
import Automatic.Timetable.Management.System.repository.CollegeClassRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/classes")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000"
})
public class CollegeClassController {

    private final CollegeClassRepository classRepository;

    public CollegeClassController(
            CollegeClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    @GetMapping
    public List<CollegeClass> getAllClasses() {
        return classRepository.findAll();
    }

    @PostMapping
    public CollegeClass addClass(@RequestBody CollegeClass collegeClass) {
        return classRepository.save(collegeClass);
    }
}
