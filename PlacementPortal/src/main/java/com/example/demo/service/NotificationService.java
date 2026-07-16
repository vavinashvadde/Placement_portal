package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import com.example.demo.entity.Notification;

public interface NotificationService {

    Notification saveNotification(Notification notification);

    List<Notification> getAllNotifications();

    Optional<Notification> getNotification(Long id);

    Notification updateNotification(Notification notification);

    void deleteNotification(Long id);

}