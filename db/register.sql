insert into users
    (username, password, email, profile_pic)
values
    ($1, $2, $3, $4);


select username, email, profile_pic
from users
where email = $3;