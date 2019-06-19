insert into dungeons
    (dungeon_name, dungeon_address)
values
    ($1, $2);

select *
from dungeons
where dungeon_name = $1;
