-- >>>>>>>>>>>>>>>> Join Queries

-- Select all users in a specified channel
Select *
From channel c, joins_channel j, "user" u
Where c.ChannelName = j.ChannelName and c.ServerID = j.ServerID and u.ID = j.UserID
      and c.ChannelName = "General" and c.ServerID = 1;

-- Select all users in a specified server
Select *
From "server" s, joins_server j, "user" u
Where s.ServerID = j.ServerID and u.ID = j.UserID
      and c.ServerID = 1;

-- User Information:
-- 1. Select profile associated to a UserID
Select *
From "profile" p, "user" u
Where p.UserID = u.ID;

