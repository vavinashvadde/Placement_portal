package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Notification;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.service.NotificationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public ResponseEntity<Notification> saveNotification(@Valid @RequestBody Notification notification) {

        Notification savedNotification = notificationService.saveNotification(notification);

        return new ResponseEntity<>(savedNotification, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getAllNotifications() {

        return ResponseEntity.ok(notificationService.getAllNotifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notification> getNotification(@PathVariable Long id) {

        Notification notification = notificationService.getNotification(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification Not Found"));

        return ResponseEntity.ok(notification);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notification> updateNotification(@PathVariable Long id,
                                                           @Valid @RequestBody Notification notification) {

        notificationService.getNotification(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification Not Found"));

        notification.setNotificationId(id);

        Notification updatedNotification = notificationService.updateNotification(notification);

        return ResponseEntity.ok(updatedNotification);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNotification(@PathVariable Long id) {

        notificationService.getNotification(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification Not Found"));

        notificationService.deleteNotification(id);

        return ResponseEntity.ok("Notification Deleted Successfully");
    }
}