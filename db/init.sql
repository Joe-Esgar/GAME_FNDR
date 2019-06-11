drop table if exists posts;
drop table if exists characters;
drop table if exists users;
drop table if exists dungeons;

create table users
(
    user_id serial primary key,
    username varchar(25) not null,
    password text not null,
    email varchar(64) not null,
    profile_pic text
)

create table characters
(
    character_id serial primary key,
    character_name varchar(32) not null,
    character_class varchar(32),
    description varchar(124),
    bio text,
    user_id integer references users(user_id)
)


create table posts
(
    post_id serial primary key,
    time_entered date default now(),
    content text not null,
    dungeon_id integer references dungeons(dungeon_id),
    user_id integer references users(user_id),
    character_id integer references characters(character_id)
)

create table dungeons
(
    dungeon_id serial primary key,
    dungeon_name varchar(64) not null,
    dungeon_address text not null
)