package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.TeachingAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeachingAssignmentRepository
        extends JpaRepository<TeachingAssignment, Long> {
}