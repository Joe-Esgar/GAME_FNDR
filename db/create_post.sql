insert into posts
    (content, dungeon_id, user_id, character_id, time_entered)
values
    ($1, $2, $3, $4, $5);

select *
from posts
where user_id = $3
