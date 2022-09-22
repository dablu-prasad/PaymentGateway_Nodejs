
--create invoice table 
create table invoice(invoiceid int NOT NULL AUTO_INCREMENT PRIMARY KEY,externalID varchar2(20),createDate Date,updateDate Date,description varchar(256),customer_name varchar2(100),customer_email varchar(100),marchantid varchar2(20),amount varchar2(20),currency varchar2(20),status varchar2(20));