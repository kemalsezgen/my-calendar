package com.mycalendar.myCalendar.service.impl;

import com.mycalendar.myCalendar.mapper.TaskMapper;
import com.mycalendar.myCalendar.model.entity.Task;
import com.mycalendar.myCalendar.model.dto.CreateTaskRequest;
import com.mycalendar.myCalendar.model.dto.TaskDTO;
import com.mycalendar.myCalendar.model.enums.TaskStatus;
import com.mycalendar.myCalendar.repository.TaskRepository;
import com.mycalendar.myCalendar.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public TaskDTO createTask(CreateTaskRequest createTaskRequest) {
        Task task = new Task();
        task.setTitle(createTaskRequest.getTitle());
        task.setDescription(createTaskRequest.getDescription());
        task.setStartDate(createTaskRequest.getStartDate());
        task.setEndDate(createTaskRequest.getEndDate());
        task.setStatus(TaskStatus.NOT_STARTED);
        task.setSubtasks(createTaskRequest.getSubtasks());
        return TaskMapper.toTaskDTO(taskRepository.save(task));
    }

    @Override
    public List<TaskDTO> getTasks() {
        return taskRepository.findAll().stream().map(TaskMapper::toTaskDTO).collect(Collectors.toList());
    }
}
