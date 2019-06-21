select u.username, p.content, p.time_entered, c.character_name
from users u
    join posts p on p.user_id = u.user_id
    join characters c on c.character_id = p.character_id
where dungeon_id = $1
order by p.time_entered asc