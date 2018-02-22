INSERT INTO users (email, name) VALUES ('kprostyakov@gmail.com','Kirill Prostyakov');
INSERT INTO posts (content, author) SELECT '<p>Hello world, this is result of SSR:</p><Picture src={"https://dummyimage.com/300x200/000000/cc33dd.png&text=Hiiii"}>some pic</Picture><Extra text="from data..."><p>from data shown in table:</p><Table src="http://samplecsvs.s3.amazonaws.com/SalesJan2009.csv">some table</Table></Extra>', id FROM users WHERE name = 'Kirill Prostyakov';
INSERT INTO tag_groups (name) VALUES ('testing');
INSERT INTO tags (name, tag_group) VALUES ('a tag', 'testing');
INSERT INTO posts_tags (tag_id, post_id) VALUES (1,1);
INSERT INTO tag_groups_users (tag_group_id, user_id) VALUES (1,1); 