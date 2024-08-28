package com.mycalendar.myCalendar.model.dto;

import com.mycalendar.myCalendar.model.enums.TaskStatus;
import lombok.Data;

import java.util.List;

@Data
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private String startDate;
    private String endDate;
    private TaskStatus status;
    private List<SubtaskDTO> subtasks;
}
