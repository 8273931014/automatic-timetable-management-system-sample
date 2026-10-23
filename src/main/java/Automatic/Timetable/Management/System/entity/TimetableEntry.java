
package Automatic.Timetable.Management.System.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "timetable_entries")
public class TimetableEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teacherId;
    private Long subjectId;
    private Long classId;
    private Long roomId;
    private Long timeSlotId;

    public TimetableEntry() {
    }

    public Long getId() {
        return id;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public Long getSubjectId() {
        return subjectId;
    }

    public Long getClassId() {
        return classId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public Long getTimeSlotId() {
        return timeSlotId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public void setSubjectId(Long subjectId) {
        this.subjectId = subjectId;
    }

    public void setClassId(Long classId) {
        this.classId = classId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public void setTimeSlotId(Long timeSlotId) {
        this.timeSlotId = timeSlotId;
    }
}
