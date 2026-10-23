
package Automatic.Timetable.Management.System.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "teaching_assignments")
public class TeachingAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long teacherId;
    private Long subjectId;
    private Long classId;

    private int lecturesPerWeek;

    public TeachingAssignment() {
    }

    public TeachingAssignment(Long teacherId, Long subjectId,
                              Long classId, int lecturesPerWeek) {
        this.teacherId = teacherId;
        this.subjectId = subjectId;
        this.classId = classId;
        this.lecturesPerWeek = lecturesPerWeek;
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

    public int getLecturesPerWeek() {
        return lecturesPerWeek;
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

    public void setLecturesPerWeek(int lecturesPerWeek) {
        this.lecturesPerWeek = lecturesPerWeek;
    }
}
