
package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.TimetableEntry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimetableEntryRepository
        extends JpaRepository<TimetableEntry, Long> {
}
