insert into users
    (username, password, email)
values
    ($1, $2, $3);


select username, email, profile_pic, user_id
from users
where email = $3;