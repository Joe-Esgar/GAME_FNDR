update users
set username = $1
where user_id = $2;

select *
from users