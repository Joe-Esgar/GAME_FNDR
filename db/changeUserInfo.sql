update users
set username = $1, profile_pic = $2
where user_id = $3;

select *
from users
where user_id = $3;