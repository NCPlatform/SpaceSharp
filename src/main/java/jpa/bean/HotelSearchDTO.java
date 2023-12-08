package jpa.bean;

import java.util.Date;
import lombok.Data;

@Data
public class HotelSearchDTO {
    private String seqHotelCategory;
    private Date date;
    private String addr;
    private String searchValue;
    private Integer minPrice;
    private Integer maxPrice;
     

    @Override
    public String toString() {
        return "HotelSearchDTO{" +
                "seqHotelCategory='" + seqHotelCategory + '\'' +
                ", date=" + date +
                ", addr='" + addr + '\'' +
                ", searchValue='" + searchValue + '\'' +
                ", minPrice=" + minPrice +
                ", maxPrice=" + maxPrice +
                '}';
    }
}