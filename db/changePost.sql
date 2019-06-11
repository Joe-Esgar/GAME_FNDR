update posts
set content = $1
where post_id = $2;

select *
from posts