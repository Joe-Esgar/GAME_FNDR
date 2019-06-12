delete from characters
where character_id = $1;

select *
from characters
where user_id = $2
