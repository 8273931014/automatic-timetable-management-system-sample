package Automatic.Timetable.Management.System.repository;

import Automatic.Timetable.Management.System.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
}