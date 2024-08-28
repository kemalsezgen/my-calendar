package com.mycalendar.myCalendar.model.dto;

import com.mycalendar.myCalendar.model.entity.Subtask;
import lombok.Data;

import java.util.List;

@Data
public class CreateTaskRequest {
    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private List<Subtask> subtasks;
}
