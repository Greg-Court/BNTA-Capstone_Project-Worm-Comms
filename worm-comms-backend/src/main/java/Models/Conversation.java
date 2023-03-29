package Models;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="conversations")
public class Conversation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "conversationId")
    private List<Message> messages;

    public Conversation() {
    }

    public Conversation(int id, List<Message> messages) {
        this.id = id;
        this.messages = messages;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }
}
