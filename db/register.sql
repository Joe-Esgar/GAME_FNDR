insert into users
    (username, password, email, profile_pic)
values
    ($1, $2, $3, $4);


select username, email, profile_pic, user_id
from users
where email = $3;