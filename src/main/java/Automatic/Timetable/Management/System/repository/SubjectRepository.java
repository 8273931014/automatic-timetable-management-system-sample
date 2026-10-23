
package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.Subject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository
        extends JpaRepository<Subject, Long> {
}
