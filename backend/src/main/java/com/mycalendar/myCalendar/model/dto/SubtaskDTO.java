package com.mycalendar.myCalendar.model.dto;

import com.mycalendar.myCalendar.model.enums.TaskStatus;
import lombok.Data;

@Data
public class SubtaskDTO {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
}
