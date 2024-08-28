package com.mycalendar.myCalendar.service;

import com.mycalendar.myCalendar.model.dto.CreateTaskRequest;
import com.mycalendar.myCalendar.model.dto.TaskDTO;

import java.util.List;

public interface TaskService {
    TaskDTO createTask(CreateTaskRequest createTaskRequest);
    List<TaskDTO> getTasks();
}
