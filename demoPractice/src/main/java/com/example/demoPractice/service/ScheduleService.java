package com.example.demoPractice.service;

import com.example.demoPractice.model.TimeSlotDTO;
import com.example.demoPractice.model.ClassEntity;
import com.example.demoPractice.model.Teacher;
import com.example.demoPractice.model.Course;
import com.example.demoPractice.model.TimeSlot;
import com.example.demoPractice.repository.ClassRepository;
import com.example.demoPractice.repository.TeacherRepository;
import com.example.demoPractice.repository.CourseRepository;
import com.example.demoPractice.repository.TimeSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ClassRepository classRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    public Map<String, List<TimeSlot>> createSchedule() {
        // Fetch all classes, active teachers, and courses
        List<ClassEntity> classes = classRepository.findAll();
        List<Teacher> activeTeachers = teacherRepository.findAll().stream()
                .filter(Teacher::isActive)
                .toList();
        List<Course> courses = courseRepository.findAll();

        // Ensure there are active teachers and courses
        if (activeTeachers.isEmpty() || courses.isEmpty()) {
            throw new RuntimeException("No active teachers or courses available to create the schedule.");
        }

        // Days and time slots
        String[] days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
        String[] timeSlots = {
                "09:00-09:45", "10:00-10:45", "11:00-11:45", "12:00-12:45",
                "13:00-13:45", "14:00-14:45", "15:00-15:45", "16:00-16:45"
        };

        Map<String, Set<String>> teacherAssignments = new HashMap<>();
        Map<String, List<TimeSlot>> classTimetables = new HashMap<>();

        // Iterate through each class
        for (ClassEntity cls : classes) {
            List<TimeSlot> classTimetable = new ArrayList<>();
            for (String day : days) {
                List<String> availableTimeSlots = new ArrayList<>(Arrays.asList(timeSlots));
                Collections.shuffle(availableTimeSlots);

                for (Teacher teacher : activeTeachers) {
                    Course matchingCourse = courses.stream()
                            .filter(course -> course.getCourseName().equalsIgnoreCase(teacher.getCourseName()))
                            .findFirst()
                            .orElse(null);

                    if (matchingCourse == null) continue;

                    for (Iterator<String> iterator = availableTimeSlots.iterator(); iterator.hasNext(); ) {
                        String slot = iterator.next();
                        String[] times = slot.split("-");
                        String teacherSlotKey = teacher.getId() + "_" + day + "_" + slot;

                        if (teacherAssignments.containsKey(teacherSlotKey)) continue;

                        TimeSlot timeSlot = new TimeSlot();
                        timeSlot.setClassId(cls.getClassId());
                        timeSlot.setDay(day);
                        timeSlot.setStartTime(times[0]);
                        timeSlot.setEndTime(times[1]);
                        timeSlot.setTeacherId(teacher.getId());
                        timeSlot.setCourseId(matchingCourse.getCourseId());

                        timeSlotRepository.save(timeSlot);
                        classTimetable.add(timeSlot);

                        teacherAssignments.put(teacherSlotKey, new HashSet<>());
                        iterator.remove();

                        break;
                    }
                }
            }
            classTimetables.put(cls.getClassId(), classTimetable);
        }

        return classTimetables;
    }

    public List<TimeSlotDTO> getTimetableForClass(String classId) {
        List<TimeSlot> timeSlots = timeSlotRepository.findAll().stream()
                .filter(slot -> slot.getClassId().equals(classId))
                .toList();

        // Fetch teacher and course details
        Map<String, String> teacherMap = teacherRepository.findAll().stream()
                .collect(Collectors.toMap(Teacher::getId, Teacher::getName));
        Map<String, String> courseMap = courseRepository.findAll().stream()
                .collect(Collectors.toMap(Course::getCourseId, Course::getCourseName));

        // Map time slots to DTOs
        return timeSlots.stream().map(slot -> {
            TimeSlotDTO dto = new TimeSlotDTO();
            dto.setDay(slot.getDay());
            dto.setStartTime(slot.getStartTime());
            dto.setEndTime(slot.getEndTime());
            dto.setTeacherName(teacherMap.getOrDefault(slot.getTeacherId(), "Unknown"));
            dto.setCourseName(courseMap.getOrDefault(slot.getCourseId(), "Unknown"));
            return dto;
        }).toList();
    }
}
