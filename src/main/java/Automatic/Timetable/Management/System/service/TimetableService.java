
package Automatic.Timetable.Management.System.service;

import Automatic.Timetable.Management.System.entity.*;
import Automatic.Timetable.Management.System.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class TimetableService {

    private final TeachingAssignmentRepository assignmentRepository;
    private final TimeSlotRepository timeSlotRepository;
    private final RoomRepository roomRepository;
    private final TimetableEntryRepository entryRepository;

    public TimetableService(
            TeachingAssignmentRepository assignmentRepository,
            TimeSlotRepository timeSlotRepository,
            RoomRepository roomRepository,
            TimetableEntryRepository entryRepository) {

        this.assignmentRepository = assignmentRepository;
        this.timeSlotRepository = timeSlotRepository;
        this.roomRepository = roomRepository;
        this.entryRepository = entryRepository;
    }

    @Transactional
    public List<TimetableEntry> generateTimetable() {

        List<TeachingAssignment> assignments =
                assignmentRepository.findAll();

        List<TimeSlot> slots = timeSlotRepository.findAll();
        List<Room> rooms = roomRepository.findAll();

        if (assignments.isEmpty()) {
            throw new IllegalStateException(
                    "Please add teaching assignments first.");
        }

        if (slots.isEmpty() || rooms.isEmpty()) {
            throw new IllegalStateException(
                    "Please add time slots and rooms first.");
        }

        List<TimetableEntry> scheduled = new ArrayList<>();

        for (TeachingAssignment assignment : assignments) {

            if (assignment.getLecturesPerWeek() <= 0) {
                throw new IllegalStateException(
                        "Lectures per week must be greater than zero.");
            }

            for (int i = 0;
                 i < assignment.getLecturesPerWeek(); i++) {

                boolean placed = false;

                for (TimeSlot slot : slots) {

                    for (Room room : rooms) {

                        if (hasConflict(
                                scheduled, assignment, slot, room)) {
                            continue;
                        }

                        TimetableEntry entry = new TimetableEntry();

                        entry.setTeacherId(assignment.getTeacherId());
                        entry.setSubjectId(assignment.getSubjectId());
                        entry.setClassId(assignment.getClassId());
                        entry.setRoomId(room.getId());
                        entry.setTimeSlotId(slot.getId());

                        scheduled.add(entry);
                        placed = true;
                        break;
                    }

                    if (placed) {
                        break;
                    }
                }

                if (!placed) {
                    throw new IllegalStateException(
                            "Not enough conflict-free slots for assignment ID "
                                    + assignment.getId()
                                    + ". Add more time slots or rooms.");
                }
            }
        }

        // Replace the previous timetable only after a new
        // timetable has been generated successfully.
        entryRepository.deleteAll();
        return entryRepository.saveAll(scheduled);
    }

    private boolean hasConflict(
            List<TimetableEntry> scheduled,
            TeachingAssignment assignment,
            TimeSlot slot,
            Room room) {

        for (TimetableEntry entry : scheduled) {

            if (!entry.getTimeSlotId().equals(slot.getId())) {
                continue;
            }

            // Teacher cannot teach two classes at once.
            if (entry.getTeacherId().equals(
                    assignment.getTeacherId())) {
                return true;
            }

            // A class cannot attend two lectures at once.
            if (entry.getClassId().equals(
                    assignment.getClassId())) {
                return true;
            }

            // A room cannot host two classes at once.
            if (entry.getRoomId().equals(room.getId())) {
                return true;
            }
        }

        return false;
    }
}
