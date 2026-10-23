
package Automatic.Timetable.Management.System.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "college_classes")
public class CollegeClass {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String section;
    private int semester;
    private int studentCount;

    public CollegeClass() {
    }

    public CollegeClass(String name, String section,
                        int semester, int studentCount) {
        this.name = name;
        this.section = section;
        this.semester = semester;
        this.studentCount = studentCount;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSection() {
        return section;
    }

    public int getSemester() {
        return semester;
    }

    public int getStudentCount() {
        return studentCount;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public void setSemester(int semester) {
        this.semester = semester;
    }

    public void setStudentCount(int studentCount) {
        this.studentCount = studentCount;
    }
}
