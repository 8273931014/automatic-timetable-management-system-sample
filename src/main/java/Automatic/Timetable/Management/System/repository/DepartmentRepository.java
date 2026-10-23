
package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository
        extends JpaRepository<Department, Long> {
}
