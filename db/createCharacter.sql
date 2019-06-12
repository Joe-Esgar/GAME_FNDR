insert into characters
    (character_name, character_class, description, bio, user_id)
values
    ($1, $2, $3, $4, $5);

select *
from characters
where user_id = $5
