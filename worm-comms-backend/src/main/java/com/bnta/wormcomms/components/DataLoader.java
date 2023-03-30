package com.bnta.wormcomms.components;

import com.bnta.wormcomms.models.Chat;
import com.bnta.wormcomms.models.Message;
import com.bnta.wormcomms.models.User;
import com.bnta.wormcomms.repositories.ChatRepo;
import com.bnta.wormcomms.repositories.UserRepo;
import com.bnta.wormcomms.repositories.MessageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {
    @Autowired
    ChatRepo chatRepo;
    @Autowired
    MessageRepo messageRepo;
    @Autowired
    UserRepo userRepo;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        User greg = new User("Greg", "greg@bnta.com");
        User hansine = new User("Hansine", "hansine@bnta.com");
        User james = new User("James", "james@bnta.com");
        Chat chat = new Chat();
        Message message1 = new Message(james, chat, "hello");
        Message message2 = new Message(greg, chat, "hi");
        userRepo.save(greg);
        userRepo.save(hansine);
        userRepo.save(james);
        chatRepo.save(chat);
        messageRepo.save(message1);
        messageRepo.save(message2);
    }
}
