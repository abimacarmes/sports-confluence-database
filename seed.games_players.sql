BEGIN;

INSERT INTO games
    (name, sport, location_name,address,players,date, image_link)

VALUES
    ('Pickup Soccer', 'Soccer','Central Technical School','725 Bathurst St, Toronto, ON M5S 2R5, Canada',8,'Wed Aug 8 2021 14:30'),
    ('Pickup Footbal', 'Football', 'Central Technical School','725 Bathurst St, Toronto, ON M5S 2R5, Canada',12,'Wed Aug 8 2021 14:30'),
    ('Pickup Frisbee', 'Frisbee', 'Central Technical School','725 Bathurst St, Toronto, ON M5S 2R5, Canada',6,'Wed Aug 8 2021 14:30')
;

INSERT INTO players
    (name, level, comment, game_id)

VALUES
    ('Jeff','Beginner','Ready for fun!',2),
    ('Ashley','Beginner','Excited to play!',3),
    ('Nathan','Beginner','Lets go!',1)
;

COMMIT;