update users
set profile_pic = $1
where user_id = $2;

select *
from users