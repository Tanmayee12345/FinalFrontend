package com.example.demoPractice.model;

import lombok.Data;

@Data
public class TimeSlotDTO {
    private String day;
    private String startTime;
    private String endTime;
    private String teacherName;
    private String courseName;
}
