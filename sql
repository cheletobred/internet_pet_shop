DROP FUNCTION createUser(varchar,varchar,varchar,varchar,varchar);

CREATE OR REPLACE function createUser(name VARCHAR(30), email VARCHAR(30), sex enum_users_sex, password VARCHAR(30), role enum_users_role)
RETURNS integer AS $$
DECLARE
id int;
BEGIN
 INSERT INTO users(name, email, sex, password, role) VALUES (name, email, sex, password, role) RETURNING idUser into id;
 return id;
END;
$$ LANGUAGE plpgsql;


