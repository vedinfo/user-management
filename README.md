  # node-user-management
  small user management service.


  **this api is used for  get data by user_id and phone no**
  
  GET/users/user_id/phone_no

  **this api is used for  get all data**
  
  GET/users

  **this api is used for single/bulk insert.**
  
  POST/users/insert
  
  **request body formate:**
  
  {"details" :[{"firstname" : "abc","lastname" : "xyz"},{"firstname" : "lmn"}] }
  
 
  **this api is used for single/bulk update users by filters.**
  
  PATCH/update
  
  **request body formate:**
  
 {"details" :[ {"filters":{"user_id" : "1","phone_no" : "253"},"data":{"firstname" : "abc"},"lastname" : "xyz"}}, {"user_id":"17","data":{"phone_no" : "123"}} ] }
 

  **this api is used for single/bulk update users by user_id.**
  
  PATCH/updatebyuserid 
  
  **request body formate: **
  
  { "details" :[ {"user_id":"16","data":{"firstname" : "abc"},"lastname" : "xyz"}}, {"user_id":"17","data":{"phone_no" : "123"}} ] }


   **this api is used for single/bulk delete users.**
  
   DELETE/multidel
  
   **request body formate:**
   
   { "details" :[ {"user_id":"1","phone_no" : "12345"}, {"user_id":"2","phone_no" : "12345"} ] }

