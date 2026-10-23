
package Automatic.Timetable.Management.System.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "subjects")
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String code;
    private int weeklyLectures;

    public Subject() {
    }

    public Subject(String name, String code, int weeklyLectures) {
        this.name = name;
        this.code = code;
        this.weeklyLectures = weeklyLectures;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCode() {
        return code;
    }

    public int getWeeklyLectures() {
        return weeklyLectures;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setWeeklyLectures(int weeklyLectures) {
        this.weeklyLectures = weeklyLectures;
    }
}
