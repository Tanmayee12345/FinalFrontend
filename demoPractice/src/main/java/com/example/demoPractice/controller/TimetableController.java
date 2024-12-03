package com.example.demoPractice.controller;

import com.example.demoPractice.model.TimeSlot;
import com.example.demoPractice.model.TimeSlotDTO;
import com.example.demoPractice.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timetable")
@CrossOrigin(origins = "http://localhost:4200")
public class TimetableController {

    @Autowired
    private ScheduleService scheduleService;

    /**
     * Endpoint to fetch the timetable for a specific class.
     *
     * @param classId ID of the class
     * @return Timetable for the specified class
     */
    @GetMapping("/class/{classId}")
    public ResponseEntity<List<TimeSlotDTO>> getTimetableForClass(@PathVariable String classId) {
        List<TimeSlotDTO> timetable = scheduleService.getTimetableForClass(classId);

        if (timetable.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(timetable);
    }

    /**
     * Endpoint to generate timetables for all classes.
     *
     * @return Timetables for all classes
     */
    @PostMapping("/create")
    public ResponseEntity<Map<String, List<TimeSlot>>> createTimetable() {
        Map<String, List<TimeSlot>> classTimetables = scheduleService.createSchedule();
        return ResponseEntity.ok(classTimetables);
    }
}
