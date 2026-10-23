
package Automatic.Timetable.Management.System.controller;

import Automatic.Timetable.Management.System.entity.TimetableEntry;
import Automatic.Timetable.Management.System.repository.TimetableEntryRepository;
import Automatic.Timetable.Management.System.service.TimetableService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:5173")
public class TimetableController {

    private final TimetableService timetableService;
    private final TimetableEntryRepository entryRepository;

    public TimetableController(
            TimetableService timetableService,
            TimetableEntryRepository entryRepository) {
        this.timetableService = timetableService;
        this.entryRepository = entryRepository;
    }

    // Generate timetable automatically
    @PostMapping("/generate")
    public List<TimetableEntry> generateTimetable() {
        return timetableService.generateTimetable();
    }

    // Get the generated timetable
    @GetMapping
    public List<TimetableEntry> getTimetable() {
        return entryRepository.findAll();
    }
}
