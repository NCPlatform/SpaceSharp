package jpa.bean;

import java.sql.Timestamp;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReserveViewDTO {
	private Timestamp departure;
	private Timestamp arrival;
	private String user_name;
	private String room_name;
	private String owner_email;
	
    public ReserveViewDTO( String user_name,Timestamp departure, Timestamp arrival, String room_name, String owner_email) {
        this.departure = departure;
        this.arrival = arrival;
        this.user_name = user_name;
        this.room_name = room_name;
        this.owner_email = owner_email;
    }
}
