
package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.TeacherAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherAvailabilityRepository
        extends JpaRepository<TeacherAvailability, Long> {
}
