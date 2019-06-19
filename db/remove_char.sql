delete from posts 
where character_id = $1;

delete from characters
where character_id = $1;

delete from posts
where character_id is null;

select *
from characters
where user_id = $2
